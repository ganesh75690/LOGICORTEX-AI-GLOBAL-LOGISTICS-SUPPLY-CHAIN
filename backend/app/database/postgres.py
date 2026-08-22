from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Create async engine
engine = create_async_engine(
    settings.POSTGRES_URL,
    echo=settings.DEBUG,
    future=True
)

# Create async session factory
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Base class for models
Base = declarative_base()


async def init_postgres():
    """Initialize PostgreSQL database"""
    try:
        async with engine.begin() as conn:
            # Create all tables
            await conn.run_sync(Base.metadata.create_all)
        print("✅ PostgreSQL database initialized")
    except Exception as e:
        print(f"⚠️ PostgreSQL initialization failed: {e}")
        # Don't raise exception for demo purposes


async def get_postgres_session():
    """Get PostgreSQL session"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
