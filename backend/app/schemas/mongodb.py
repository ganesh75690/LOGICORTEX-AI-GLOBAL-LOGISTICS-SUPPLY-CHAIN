from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Dict, Any, List
from enum import Enum


class AlertType(str, Enum):
    DISRUPTION = "disruption"
    LOW_STOCK = "low_stock"
    ROUTE_CHANGE = "route_change"
    NEW_ORDER = "new_order"
    VEHICLE_MAINTENANCE = "vehicle_maintenance"
    WEATHER_ALERT = "weather_alert"
    ACCIDENT = "accident"


class AlertSeverity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class RealTimeAlert(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    organization_id: int
    alert_type: AlertType
    severity: AlertSeverity
    title: str
    message: str
    source: str  # system, user, ai
    metadata: Dict[str, Any] = Field(default_factory=dict)
    is_resolved: bool = False
    resolved_by: Optional[int] = None
    resolved_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True


class DriverLocation(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    driver_id: int
    organization_id: int
    vehicle_id: Optional[int] = None
    latitude: float
    longitude: float
    speed: Optional[float] = None
    heading: Optional[float] = None
    accuracy: Optional[float] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    
    class Config:
        populate_by_name = True


class LoginHistory(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: int
    organization_id: int
    email: str
    login_time: datetime = Field(default_factory=datetime.utcnow)
    logout_time: Optional[datetime] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    login_method: str = "password"  # password, otp, sso
    is_successful: bool = True
    failure_reason: Optional[str] = None
    
    class Config:
        populate_by_name = True


class AuditLog(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    organization_id: int
    user_id: int
    action: str  # create, update, delete, login, logout
    resource_type: str  # user, vehicle, order, etc.
    resource_id: Optional[int] = None
    old_values: Optional[Dict[str, Any]] = None
    new_values: Optional[Dict[str, Any]] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True


class NotificationType(str, Enum):
    ALERT = "alert"
    SYSTEM_UPDATE = "system_update"
    ORDER_UPDATE = "order_update"
    ROUTE_UPDATE = "route_update"
    INVENTORY_UPDATE = "inventory_update"


class Notification(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: int
    organization_id: int
    title: str
    message: str
    notification_type: NotificationType
    is_read: bool = False
    metadata: Dict[str, Any] = Field(default_factory=dict)
    expires_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    read_at: Optional[datetime] = None
    
    class Config:
        populate_by_name = True
