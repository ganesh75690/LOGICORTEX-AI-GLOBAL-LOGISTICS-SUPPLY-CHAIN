from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from typing import List, Optional
from datetime import datetime, timedelta
import asyncio
from pydantic import BaseModel

from app.database.postgres import get_postgres_session
from app.services.ai_dispatch_service import AIDispatchService
from app.services.driver_service import DriverService
from app.services.notification_service import NotificationService

router = APIRouter(prefix="/smart-dispatch", tags=["Smart Dispatch"])

# Pydantic Models
class DemandZone(BaseModel):
    id: str
    name: str
    demand: int
    demand_trend: str
    urgency: str
    estimated_orders: int
    time_window: str

class Driver(BaseModel):
    id: str
    name: str
    status: str
    location: str
    estimated_arrival: int
    current_load: int
    max_capacity: int
    efficiency: int
    coordinates: Optional[dict] = None

class DispatchSuggestion(BaseModel):
    id: str
    type: str
    priority: str
    title: str
    description: str
    impact: str
    estimated_time: str
    packages: int
    drivers: List[str]
    zone: str
    created_at: datetime
    expires_at: datetime

class DispatchAction(BaseModel):
    suggestion_id: str
    action: str  # 'start', 'delay', 'split'
    notes: Optional[str] = None

class DispatchResponse(BaseModel):
    success: bool
    message: str
    action_id: Optional[str] = None
    estimated_completion: Optional[datetime] = None

# Service Instances
ai_dispatch_service = AIDispatchService()
driver_service = DriverService()
notification_service = NotificationService()

@router.get("/zones", response_model=List[DemandZone])
async def get_demand_zones():
    """Get current demand zones with real-time data"""
    try:
        zones = await ai_dispatch_service.get_demand_zones()
        return zones
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch demand zones: {str(e)}")

@router.get("/drivers", response_model=List[Driver])
async def get_drivers(search: Optional[str] = None, status: Optional[str] = None):
    """Get drivers with optional filtering"""
    try:
        drivers = await driver_service.get_drivers(search=search, status=status)
        return drivers
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch drivers: {str(e)}")

@router.get("/suggestions", response_model=List[DispatchSuggestion])
async def get_dispatch_suggestions(
    zone_id: Optional[str] = None,
    priority: Optional[str] = None,
    limit: int = 10
):
    """Get AI-powered dispatch suggestions"""
    try:
        suggestions = await ai_dispatch_service.get_dispatch_suggestions(
            zone_id=zone_id,
            priority=priority,
            limit=limit
        )
        return suggestions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch suggestions: {str(e)}")

@router.post("/suggestions/{suggestion_id}/action", response_model=DispatchResponse)
async def execute_dispatch_action(
    suggestion_id: str,
    action: DispatchAction,
    background_tasks: BackgroundTasks
):
    """Execute a dispatch action (start, delay, split)"""
    try:
        # Validate suggestion exists
        suggestion = await ai_dispatch_service.get_suggestion_by_id(suggestion_id)
        if not suggestion:
            raise HTTPException(status_code=404, detail="Suggestion not found")
        
        # Execute action
        result = await ai_dispatch_service.execute_action(
            suggestion_id=suggestion_id,
            action=action.action,
            notes=action.notes
        )
        
        # Send notifications in background
        background_tasks.add_task(
            notification_service.send_dispatch_notification,
            suggestion,
            action.action
        )
        
        return DispatchResponse(
            success=True,
            message=f"Dispatch {action.action} action executed successfully",
            action_id=result.get("action_id"),
            estimated_completion=result.get("estimated_completion")
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to execute action: {str(e)}")

@router.get("/analytics/overview")
async def get_dispatch_analytics():
    """Get dispatch analytics overview"""
    try:
        analytics = await ai_dispatch_service.get_analytics_overview()
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch analytics: {str(e)}")

@router.get("/driver/{driver_id}/location")
async def get_driver_location(driver_id: str):
    """Get real-time driver location"""
    try:
        location = await driver_service.get_driver_location(driver_id)
        if not location:
            raise HTTPException(status_code=404, detail="Driver not found")
        return location
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch driver location: {str(e)}")

@router.post("/driver/{driver_id}/track")
async def enable_driver_tracking(driver_id: str, background_tasks: BackgroundTasks):
    """Enable real-time tracking for a driver"""
    try:
        # Start tracking in background
        background_tasks.add_task(
            driver_service.start_real_time_tracking,
            driver_id
        )
        
        return {"success": True, "message": "Real-time tracking enabled"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to enable tracking: {str(e)}")

@router.get("/performance/metrics")
async def get_performance_metrics():
    """Get dispatch performance metrics"""
    try:
        metrics = await ai_dispatch_service.get_performance_metrics()
        return metrics
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch metrics: {str(e)}")

@router.post("/recalculate")
async def recalculate_dispatch(background_tasks: BackgroundTasks):
    """Trigger AI dispatch recalculation"""
    try:
        # Run recalculation in background
        background_tasks.add_task(ai_dispatch_service.recalculate_dispatch)
        
        return {"success": True, "message": "Dispatch recalculation started"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start recalculation: {str(e)}")

@router.get("/alerts/critical")
async def get_critical_alerts():
    """Get critical dispatch alerts"""
    try:
        alerts = await ai_dispatch_service.get_critical_alerts()
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch alerts: {str(e)}")

@router.get("/timeline/{driver_id}")
async def get_driver_timeline(driver_id: str, hours: int = 24):
    """Get driver dispatch timeline"""
    try:
        timeline = await driver_service.get_driver_timeline(driver_id, hours)
        return timeline
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch timeline: {str(e)}")
