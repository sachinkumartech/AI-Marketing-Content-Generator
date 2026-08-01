import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from app.config.config import settings

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def init_db():
    db.client = AsyncIOMotorClient(
        settings.DATABASE_URL,
        tlsCAFile=certifi.where(),
        serverSelectionTimeoutMS=5000
    )
    # We will initialize beanie models in main.py

async def close_db():
    if db.client:
        db.client.close()
