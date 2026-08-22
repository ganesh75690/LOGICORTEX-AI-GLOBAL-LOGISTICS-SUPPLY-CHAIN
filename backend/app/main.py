from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from contextlib import asynccontextmanager
import uvicorn
import logging

from app.config import settings
from app.database.postgres import init_postgres
from app.database.mongodb import init_mongodb
from app.routers import auth, organizations, drivers, vehicles, suppliers, inventory, routes, ai_services, analytics, alerts, computer_vision, predictive_maintenance, smart_dispatch
from app.websocket.routes import router as websocket_router
from app.middleware.rate_limit import RateLimitMiddleware
from app.middleware.logging import LoggingMiddleware, SecurityLoggingMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        await init_postgres()
        print("✅ PostgreSQL connected successfully")
    except Exception as e:
        print(f"⚠️ PostgreSQL connection failed (continuing without database): {e}")
    
    try:
        await init_mongodb()
        print("✅ MongoDB connected successfully")
    except Exception as e:
        print(f"⚠️ MongoDB connection failed (continuing without database): {e}")
    
    print("🚀 Smart Supply Chain Platform Backend Started")
    yield
    # Shutdown
    print("🛑 Smart Supply Chain Platform Backend Stopped")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered Smart Supply Chain & Logistics Platform Backend",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Add middleware in correct order
# 1. Security logging (first to catch all requests)
app.add_middleware(SecurityLoggingMiddleware)

# 2. Rate limiting (before other processing)
app.add_middleware(
    RateLimitMiddleware,
    default_limits={
        "requests_per_minute": 60,
        "requests_per_hour": 1000,
        "requests_per_day": 10000
    },
    custom_limits={
        "/auth/": {
            "requests_per_minute": 10,
            "requests_per_hour": 100,
            "requests_per_day": 500
        },
        "/ai/": {
            "requests_per_minute": 30,
            "requests_per_hour": 500,
            "requests_per_day": 5000
        }
    }
)

# 3. Request/Response logging
app.add_middleware(LoggingMiddleware, log_level="INFO")

# 4. CORS Middleware (last before response)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID", "X-Process-Time", "X-RateLimit-*"]
)

# Security
security = HTTPBearer()

# Include Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(organizations.router, prefix="/api/v1/organizations", tags=["Organizations"])
app.include_router(drivers.router, prefix="/api/v1/drivers", tags=["Drivers"])
app.include_router(vehicles.router, prefix="/api/v1/vehicles", tags=["Vehicles"])
app.include_router(suppliers.router, prefix="/api/v1/suppliers", tags=["Suppliers"])
app.include_router(inventory.router, prefix="/api/v1/inventory", tags=["Inventory"])
app.include_router(routes.router, prefix="/api/v1/routes", tags=["Routes"])
app.include_router(ai_services.router, prefix="/api/v1/ai", tags=["AI Services"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics"])
app.include_router(alerts.router, prefix="/api/v1/alerts", tags=["Alerts"])
app.include_router(computer_vision.router, prefix="/api/v1/vision", tags=["Computer Vision AI"])
app.include_router(predictive_maintenance.router, prefix="/api/v1/maintenance", tags=["Predictive Maintenance"])
app.include_router(smart_dispatch.router, prefix="/api/v1", tags=["Smart Dispatch"])

# Include WebSocket routes
app.include_router(websocket_router, prefix="/ws", tags=["WebSockets"])


@app.get("/")
async def root():
    return {
        "message": "Smart Supply Chain Platform API",
        "version": settings.APP_VERSION,
        "status": "running"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "services": "operational"
    }


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
