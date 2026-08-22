from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime

router = APIRouter()
security = HTTPBearer()


class VehicleCreate(BaseModel):
    organization_id: int
    driver_id: Optional[int] = None
    registration_number: str
    make: str
    model: str
    year: int
    vehicle_type: str
    capacity: float
    fuel_type: str


class VehicleResponse(BaseModel):
    id: int
    organization_id: int
    driver_id: Optional[int]
    registration_number: str
    make: str
    model: str
    year: int
    vehicle_type: str
    capacity: float
    fuel_type: str
    status: str
    current_location_lat: Optional[float]
    current_location_lng: Optional[float]
    created_at: str
    updated_at: Optional[str]


# Mock data
vehicles_db = {}
next_vehicle_id = 1


@router.get("/", response_model=List[VehicleResponse])
async def get_vehicles(token: str = Depends(security)):
    """Get all vehicles"""
    return list(vehicles_db.values())


@router.post("/", response_model=VehicleResponse)
async def create_vehicle(vehicle: VehicleCreate, token: str = Depends(security)):
    """Create a new vehicle"""
    global next_vehicle_id
    
    vehicle_id = next_vehicle_id
    next_vehicle_id += 1
    
    new_vehicle = {
        "id": vehicle_id,
        "organization_id": vehicle.organization_id,
        "driver_id": vehicle.driver_id,
        "registration_number": vehicle.registration_number,
        "make": vehicle.make,
        "model": vehicle.model,
        "year": vehicle.year,
        "vehicle_type": vehicle.vehicle_type,
        "capacity": vehicle.capacity,
        "fuel_type": vehicle.fuel_type,
        "status": "active",
        "current_location_lat": None,
        "current_location_lng": None,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": None
    }
    
    vehicles_db[vehicle_id] = new_vehicle
    return new_vehicle


@router.get("/{vehicle_id}", response_model=VehicleResponse)
async def get_vehicle(vehicle_id: int, token: str = Depends(security)):
    """Get vehicle by ID"""
    if vehicle_id not in vehicles_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found"
        )
    
    return vehicles_db[vehicle_id]
