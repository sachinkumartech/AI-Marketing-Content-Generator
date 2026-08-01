import sys
import os
import logging
import traceback
import asyncio
from contextlib import asynccontextmanager

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie

from app.config.config import settings
from app.routers import social_router, auth_router, advertisement_router, email_router
from app.models.models import User, SocialMediaHistory, AdvertisementHistory, EmailHistory
from app.database.session import init_db, close_db, db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("main")

db_init_lock = None
db_initialized = False

async def initialize_db_if_needed():
    global db_initialized, db_init_lock
    if db_init_lock is None:
        db_init_lock = asyncio.Lock()
    if not db_initialized:
        async with db_init_lock:
            if not db_initialized:
                try:
                    # Initialize Motor client
                    await init_db()
                    
                    # Initialize Beanie
                    await init_beanie(
                        database=db.client.get_database("ai_marketing_generator"),
                        document_models=[User, SocialMediaHistory, AdvertisementHistory, EmailHistory]
                    )
                    
                    # Seed default user for public access bypass with secure bcrypt hash
                    existing_user = await User.find_one(User.email == "admin@aethera.ai")
                    if not existing_user:
                        from app.auth.auth import get_password_hash
                        new_user = User(
                            email="admin@aethera.ai",
                            hashed_password=get_password_hash("Password123!"),
                            full_name="Default Marketer"
                        )
                        await new_user.insert()
                    elif not existing_user.hashed_password.startswith("$2"):
                        from app.auth.auth import get_password_hash
                        existing_user.hashed_password = get_password_hash("Password123!")
                        await existing_user.save()
                        
                    db_initialized = True
                except Exception as e:
                    logger.error(f"Database initialization error: {e}")
                    raise

@asynccontextmanager
async def lifespan(app: FastAPI):
    await initialize_db_if_needed()
    yield
    # Close Motor client
    await close_db()


app = FastAPI(
    title="AI Marketing Agent - Content Generator API",
    description="Backend API for AI Marketing Content Generator Module",
    version="1.0.0",
    lifespan=lifespan
)

@app.middleware("http")
async def ensure_db_middleware(request: Request, call_next):
    try:
        await initialize_db_if_needed()
    except Exception as e:
        logger.warning(f"Database initialization unavailable: {e}. Proceeding with request.")
    return await call_next(request)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Log detailed traceback internally for debugging
    tb = traceback.format_exc()
    logger.error(f"Unhandled Exception on {request.method} {request.url.path}: {str(exc)}\n{tb}")
    
    # Hide internal tracebacks, exception details, and auth credentials from public API responses
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An internal server error occurred. Please try again later.",
            "status": "error"
        }
    )

# Configure CORS securely from settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(social_router.router, prefix="/api/social-media", tags=["Social Media Generator"])
app.include_router(advertisement_router.router, prefix="/api/advertisement", tags=["Advertisement Generator"])
app.include_router(email_router.router, prefix="/api/email", tags=["Email Generator"])

@app.get("/")
def read_root():
    return {"status": "healthy", "service": "Aethera AI API Service"}
