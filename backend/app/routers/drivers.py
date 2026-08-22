from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime

router = APIRouter()
security = HTTPBearer()


class DriverCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: Optional[str] = None
    organization_id: int
    vehicle_id: Optional[int] = None
    license_number: str


class DriverResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: Optional[str]
    organization_id: int
    vehicle_id: Optional[int]
    license_number: str
    is_active: bool
    created_at: str
    updated_at: Optional[str]


# Mock data
drivers_db = {}
next_driver_id = 1


@router.get("/", response_model=List[DriverResponse])
async def get_drivers(token: str = Depends(security)):
    """Get all drivers"""
    return list(drivers_db.values())


@router.post("/", response_model=DriverResponse)
async def create_driver(driver: DriverCreate, token: str = Depends(security)):
    """Create a new driver"""
    global next_driver_id
    
    driver_id = next_driver_id
    next_driver_id += 1
    
    new_driver = {
        "id": driver_id,
        "first_name": driver.first_name,
        "last_name": driver.last_name,
        "email": driver.email,
        "phone": driver.phone,
        "organization_id": driver.organization_id,
        "vehicle_id": driver.vehicle_id,
        "license_number": driver.license_number,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": None
    }
    
    drivers_db[driver_id] = new_driver
    return new_driver


@router.get("/{driver_id}", response_model=DriverResponse)
async def get_driver(driver_id: int, token: str = Depends(security)):
    """Get driver by ID"""
    if driver_id not in drivers_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Driver not found"
        )
    
    return drivers_db[driver_id]
