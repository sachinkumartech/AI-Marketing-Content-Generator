import time
from collections import defaultdict
from typing import Dict, List, Tuple
from fastapi import HTTPException, status, Request

class RateLimiter:
    """
    In-memory rate limiter tracking attempt timestamps for IP addresses and accounts.
    Enforces maximum failure thresholds within a configured time window.
    """
    def __init__(self, max_login_attempts: int = 5, lock_duration_seconds: int = 900, general_limit: int = 60, general_window_seconds: int = 60):
        self.max_login_attempts = max_login_attempts
        self.lock_duration_seconds = lock_duration_seconds
        self.general_limit = general_limit
        self.general_window_seconds = general_window_seconds
        
        # Structure: key -> List[timestamp]
        self._login_failures: Dict[str, List[float]] = defaultdict(list)
        self._general_requests: Dict[str, List[float]] = defaultdict(list)

    def _cleanup_old_timestamps(self, timestamps: List[float], window: int) -> List[float]:
        now = time.time()
        return [ts for ts in timestamps if now - ts < window]

    def check_login_rate_limit(self, ip: str, email: str):
        now = time.time()
        ip_key = f"ip:{ip}"
        email_key = f"email:{email.lower()}"

        # Clean old failure entries
        self._login_failures[ip_key] = self._cleanup_old_timestamps(self._login_failures[ip_key], self.lock_duration_seconds)
        self._login_failures[email_key] = self._cleanup_old_timestamps(self._login_failures[email_key], self.lock_duration_seconds)

        ip_failures = self._login_failures[ip_key]
        email_failures = self._login_failures[email_key]

        if len(ip_failures) >= self.max_login_attempts or len(email_failures) >= self.max_login_attempts:
            oldest_relevant = min(ip_failures + email_failures) if (ip_failures and email_failures) else (ip_failures or email_failures)[0]
            retry_after = int(self.lock_duration_seconds - (now - oldest_relevant))
            retry_after = max(1, retry_after)
            
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Too many failed login attempts. Account/IP temporarily locked. Please try again in {retry_after} seconds.",
                headers={"Retry-After": str(retry_after)}
            )

    def record_failed_login(self, ip: str, email: str):
        now = time.time()
        self._login_failures[f"ip:{ip}"].append(now)
        self._login_failures[f"email:{email.lower()}"].append(now)

    def reset_failed_logins(self, ip: str, email: str):
        self._login_failures.pop(f"ip:{ip}", None)
        self._login_failures.pop(f"email:{email.lower()}", None)

    def check_general_rate_limit(self, ip: str):
        now = time.time()
        ip_key = f"gen:{ip}"
        self._general_requests[ip_key] = self._cleanup_old_timestamps(self._general_requests[ip_key], self.general_window_seconds)
        
        if len(self._general_requests[ip_key]) >= self.general_limit:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Please slow down your requests.",
                headers={"Retry-After": str(self.general_window_seconds)}
            )
        self._general_requests[ip_key].append(now)

# Global rate limiter instance
rate_limiter = RateLimiter(max_login_attempts=5, lock_duration_seconds=900, general_limit=60)
