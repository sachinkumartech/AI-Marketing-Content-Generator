from fastapi import APIRouter, Depends, HTTPException, status, Request
from app.models.models import User
from app.schemas.schemas import UserCreate, UserLogin, UserResponse, Token
from app.auth.auth import get_password_hash, verify_password, create_access_token, get_current_user
from app.auth.rate_limiter import rate_limiter

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, request: Request):
    client_ip = request.client.host if request.client else "127.0.0.1"
    rate_limiter.check_general_rate_limit(client_ip)

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
    return new_user

@router.post("/login", response_model=Token)
async def login(user_in: UserLogin, request: Request):
    client_ip = request.client.host if request.client else "127.0.0.1"
    
    # 1. Enforce Rate Limiting before verifying credentials
    rate_limiter.check_login_rate_limit(client_ip, user_in.email)

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
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
