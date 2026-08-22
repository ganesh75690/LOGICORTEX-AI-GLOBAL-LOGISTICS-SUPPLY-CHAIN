from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime

router = APIRouter()
security = HTTPBearer()


class AlertCreate(BaseModel):
    organization_id: int
    alert_type: str
    severity: str
    title: str
    message: str
    source: str = "system"
    metadata: Optional[dict] = None


class AlertResponse(BaseModel):
    id: str
    organization_id: int
    alert_type: str
    severity: str
    title: str
    message: str
    source: str
    metadata: Optional[dict]
    is_resolved: bool
    resolved_by: Optional[int]
    resolved_at: Optional[str]
    created_at: str


# Mock data
alerts_db = {}


@router.get("/", response_model=List[AlertResponse])
async def get_alerts(token: str = Depends(security)):
    """Get all alerts"""
    return list(alerts_db.values())


@router.post("/", response_model=AlertResponse)
async def create_alert(alert: AlertCreate, token: str = Depends(security)):
    """Create a new alert"""
    alert_id = f"alert_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}_{random.randint(1000, 9999)}"
    
    new_alert = {
        "id": alert_id,
        "organization_id": alert.organization_id,
        "alert_type": alert.alert_type,
        "severity": alert.severity,
        "title": alert.title,
        "message": alert.message,
        "source": alert.source,
        "metadata": alert.metadata or {},
        "is_resolved": False,
        "resolved_by": None,
        "resolved_at": None,
        "created_at": datetime.utcnow().isoformat()
    }
    
    alerts_db[alert_id] = new_alert
    return new_alert


@router.get("/{alert_id}", response_model=AlertResponse)
async def get_alert(alert_id: str, token: str = Depends(security)):
    """Get alert by ID"""
    if alert_id not in alerts_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    
    return alerts_db[alert_id]


@router.put("/{alert_id}/resolve")
async def resolve_alert(alert_id: str, token: str = Depends(security)):
    """Resolve an alert"""
    if alert_id not in alerts_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found"
        )
    
    alerts_db[alert_id]["is_resolved"] = True
    alerts_db[alert_id]["resolved_by"] = 1  # Mock user ID
    alerts_db[alert_id]["resolved_at"] = datetime.utcnow().isoformat()
    
    return {
        "message": "Alert resolved successfully",
        "alert_id": alert_id
    }
