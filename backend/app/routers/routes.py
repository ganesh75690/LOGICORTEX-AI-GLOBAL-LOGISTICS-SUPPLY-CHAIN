from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime

router = APIRouter()
security = HTTPBearer()


class RouteCreate(BaseModel):
    organization_id: int
    vehicle_id: int
    driver_id: int
    name: str
    origin_address: str
    origin_lat: float
    origin_lng: float
    destination_address: str
    destination_lat: float
    destination_lng: float
    distance_km: float
    estimated_duration_minutes: int


class RouteResponse(BaseModel):
    id: int
    organization_id: int
    vehicle_id: int
    driver_id: int
    name: str
    origin_address: str
    origin_lat: float
    origin_lng: float
    destination_address: str
    destination_lat: float
    destination_lng: float
    distance_km: float
    estimated_duration_minutes: int
    actual_duration_minutes: Optional[int]
    start_time: Optional[str]
    end_time: Optional[str]
    status: str
    created_at: str
    updated_at: Optional[str]


# Mock data
routes_db = {}
next_route_id = 1


@router.get("/", response_model=List[RouteResponse])
async def get_routes(token: str = Depends(security)):
    """Get all routes"""
    return list(routes_db.values())


@router.post("/", response_model=RouteResponse)
async def create_route(route: RouteCreate, token: str = Depends(security)):
    """Create a new route"""
    global next_route_id
    
    route_id = next_route_id
    next_route_id += 1
    
    new_route = {
        "id": route_id,
        "organization_id": route.organization_id,
        "vehicle_id": route.vehicle_id,
        "driver_id": route.driver_id,
        "name": route.name,
        "origin_address": route.origin_address,
        "origin_lat": route.origin_lat,
        "origin_lng": route.origin_lng,
        "destination_address": route.destination_address,
        "destination_lat": route.destination_lat,
        "destination_lng": route.destination_lng,
        "distance_km": route.distance_km,
        "estimated_duration_minutes": route.estimated_duration_minutes,
        "actual_duration_minutes": None,
        "start_time": None,
        "end_time": None,
        "status": "planned",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": None
    }
    
    routes_db[route_id] = new_route
    return new_route


@router.get("/{route_id}", response_model=RouteResponse)
async def get_route(route_id: int, token: str = Depends(security)):
    """Get route by ID"""
    if route_id not in routes_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Route not found"
        )
    
    return routes_db[route_id]
