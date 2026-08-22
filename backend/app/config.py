from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # Database Configuration
    POSTGRES_URL: str
    MONGODB_URL: str
    
    # JWT Configuration
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Google Services (Mock)
    GOOGLE_VERTEX_AI_API_KEY: str
    GOOGLE_GEMINI_API_KEY: str
    GOOGLE_MAPS_API_KEY: str
    FIREBASE_API_KEY: str
    BIGQUERY_API_KEY: str
    
    # Firebase Real Demo Configuration
    FIREBASE_PROJECT_ID: str
    FIREBASE_SERVICE_ACCOUNT_PATH: str
    FIREBASE_DATABASE_URL: str
    FIREBASE_WEB_API_KEY: str
    
    # App Configuration
    APP_NAME: str = "Smart Supply Chain Platform"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # Redis Configuration
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Celery Configuration
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"
    
    class Config:
        env_file = ".env"


settings = Settings()
