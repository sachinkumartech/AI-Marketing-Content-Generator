import logging
from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from app.models.models import User
from app.schemas.schemas import UserCreate, UserLogin, UserResponse, Token
from app.auth.auth import get_password_hash, verify_password, create_access_token, get_current_user
from app.config.config import settings
from app.auth.rate_limiter import rate_limiter

logger = logging.getLogger(__name__)
router = APIRouter()

def get_client_ip(request: Request) -> str:
    try:
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            return forwarded.split(",")[0].strip()
        if request.client and request.client.host:
            return request.client.host
    except Exception:
        pass
    return "127.0.0.1"

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, request: Request):
    client_ip = get_client_ip(request)
    try:
        rate_limiter.check_general_rate_limit(client_ip)
    except HTTPException:
        raise
    except Exception:
        pass

    try:
        db_user = await User.find_one(User.email == user_in.email)
        if db_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A user with this email address already exists."
            )
        
        hashed_pw = get_password_hash(user_in.password)
        new_user = User(
            email=user_in.email,
            hashed_password=hashed_pw,
            full_name=user_in.full_name
        )
        await new_user.insert()
        return UserResponse(id=str(new_user.id), email=new_user.email, full_name=new_user.full_name)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration exception: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Registration failed: {str(e)}"
        )

@router.post("/login")
async def login(user_in: UserLogin, request: Request, response: Response):
    client_ip = get_client_ip(request)
    
    try:
        # 1. Enforce Rate Limiting before verifying credentials
        rate_limiter.check_login_rate_limit(client_ip, user_in.email)
    except HTTPException:
        raise
    except Exception:
        pass

    try:
        user = await User.find_one(User.email == user_in.email)
        if not user or not verify_password(user_in.password, user.hashed_password):
            # 2. Record failed login attempt on invalid credentials
            rate_limiter.record_failed_login(client_ip, user_in.email)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # 3. Reset failed attempts counter on successful login
        rate_limiter.reset_failed_logins(client_ip, user_in.email)

        access_token = create_access_token(data={"sub": user.email, "user_id": str(user.id)})
        is_prod = settings.ENVIRONMENT.lower() == "production"
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=is_prod,
            samesite="lax",
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )
        return {
            "message": "Successfully logged in",
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": str(user.id),
                "email": user.email,
                "full_name": user.full_name
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login exception: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Login error: {str(e)}"
        )

@router.post("/logout")
async def logout(response: Response):
    is_prod = settings.ENVIRONMENT.lower() == "production"
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=is_prod,
        samesite="lax",
    )
    return {"message": "Successfully logged out"}
@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return UserResponse(id=str(current_user.id), email=current_user.email, full_name=current_user.full_name)
