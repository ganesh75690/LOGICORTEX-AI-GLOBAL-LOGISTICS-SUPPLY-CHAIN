from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime

router = APIRouter()
security = HTTPBearer()


class SupplierCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    contact_person: Optional[str] = None
    lead_time_days: Optional[int] = None


class SupplierResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    country: Optional[str]
    postal_code: Optional[str]
    contact_person: Optional[str]
    lead_time_days: Optional[int]
    reliability_score: Optional[float]
    is_active: bool
    created_at: str
    updated_at: Optional[str]


# Mock data
suppliers_db = {}
next_supplier_id = 1


@router.get("/", response_model=List[SupplierResponse])
async def get_suppliers(token: str = Depends(security)):
    """Get all suppliers"""
    return list(suppliers_db.values())


@router.post("/", response_model=SupplierResponse)
async def create_supplier(supplier: SupplierCreate, token: str = Depends(security)):
    """Create a new supplier"""
    global next_supplier_id
    
    supplier_id = next_supplier_id
    next_supplier_id += 1
    
    new_supplier = {
        "id": supplier_id,
        "name": supplier.name,
        "email": supplier.email,
        "phone": supplier.phone,
        "address": supplier.address,
        "city": supplier.city,
        "state": supplier.state,
        "country": supplier.country,
        "postal_code": supplier.postal_code,
        "contact_person": supplier.contact_person,
        "lead_time_days": supplier.lead_time_days,
        "reliability_score": round(random.uniform(70, 95), 1),
        "is_active": True,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": None
    }
    
    suppliers_db[supplier_id] = new_supplier
    return new_supplier


@router.get("/{supplier_id}", response_model=SupplierResponse)
async def get_supplier(supplier_id: int, token: str = Depends(security)):
    """Get supplier by ID"""
    if supplier_id not in suppliers_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Supplier not found"
        )
    
    return suppliers_db[supplier_id]
