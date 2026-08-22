from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

# MongoDB client
client = None
database = None


async def init_mongodb():
    """Initialize MongoDB connection"""
    try:
        global client, database
        client = AsyncIOMotorClient(settings.MONGODB_URL)
        database = client.supply_chain_realtime
        
        # Create indexes for collections
        await database.real_time_alerts.create_index("organization_id")
        await database.driver_locations.create_index("driver_id")
        await database.login_history.create_index("user_id")
        await database.audit_logs.create_index("timestamp")
        await database.notifications.create_index("user_id")
        
        print("✅ MongoDB database initialized")
    except Exception as e:
        print(f"⚠️ MongoDB initialization failed: {e}")
        # Don't raise exception for demo purposes


async def get_mongodb_db():
    """Get MongoDB database instance"""
    return database


async def get_mongodb_collection(collection_name: str):
    """Get MongoDB collection"""
    return database[collection_name]
