import html
import re
from typing import Any, Union, Dict, List

# Regex patterns for HTML/Script sanitization
HTML_TAG_RE = re.compile(r'<[^>]*>', re.IGNORECASE)
SCRIPT_TAG_RE = re.compile(r'<\s*script[^>]*>.*?<\s*/\s*script\s*>', re.IGNORECASE | re.DOTALL)
EVENT_HANDLER_RE = re.compile(r'on\w+\s*=\s*["\'][^"\']*["\']', re.IGNORECASE)
JS_PROTOCOL_RE = re.compile(r'javascript:\s*', re.IGNORECASE)

# AI Prompt Injection Mitigation Patterns
PROMPT_INJECTION_PATTERNS = [
    re.compile(r'ignore\s+(all\s+)?(previous|above|prior)\s+(instructions|prompts|rules)', re.IGNORECASE),
    re.compile(r'disregard\s+(all\s+)?(previous|above|prior)\s+(instructions|prompts|rules)', re.IGNORECASE),
    re.compile(r'system\s*:\s*', re.IGNORECASE),
    re.compile(r'human\s*:\s*', re.IGNORECASE),
    re.compile(r'assistant\s*:\s*', re.IGNORECASE),
]

def sanitize_input(value: Any) -> Any:
    """
    Sanitizes string inputs to prevent XSS, HTML injection, control char attacks,
    and prompt injection attempts. Passes through non-string values unchanged.
    """
    if not isinstance(value, str):
        return value

    # Remove null bytes and dangerous control characters (except newline, carriage return, tab)
    value = re.sub(r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]', '', value)

    # Strip script blocks
    value = SCRIPT_TAG_RE.sub('', value)

    # Strip event handlers (e.g. onerror=, onload=)
    value = EVENT_HANDLER_RE.sub('', value)

    # Strip javascript: protocol references
    value = JS_PROTOCOL_RE.sub('', value)

    # Escape HTML special characters for safe output/storage
    value = html.escape(value, quote=True)

    # Neutralize AI Prompt Injection phrases
    for pattern in PROMPT_INJECTION_PATTERNS:
        value = pattern.sub('[filtered_instruction]', value)

    # Trim leading/trailing whitespace
    return value.strip()

def sanitize_dict_or_list(data: Union[Dict, List, Any]) -> Any:
    """
    Recursively sanitizes all string elements in a dict, list, or string.
    """
    if isinstance(data, dict):
        return {k: sanitize_dict_or_list(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [sanitize_dict_or_list(item) for item in data]
    elif isinstance(data, str):
        return sanitize_input(data)
    return data
