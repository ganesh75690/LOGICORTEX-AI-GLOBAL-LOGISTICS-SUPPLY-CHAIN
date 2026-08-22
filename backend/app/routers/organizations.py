from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime

router = APIRouter()
security = HTTPBearer()


class OrganizationCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    industry: Optional[str] = None
    size: Optional[str] = None


class OrganizationUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    industry: Optional[str] = None
    size: Optional[str] = None
    is_active: Optional[bool] = None


class OrganizationResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    country: Optional[str]
    postal_code: Optional[str]
    industry: Optional[str]
    size: Optional[str]
    is_active: bool
    created_at: str
    updated_at: Optional[str]


# Mock data storage
organizations_db = {}
next_org_id = 1


@router.get("/", response_model=List[OrganizationResponse])
async def get_organizations(token: str = Depends(security)):
    """Get all organizations"""
    return list(organizations_db.values())


@router.post("/", response_model=OrganizationResponse)
async def create_organization(org: OrganizationCreate, token: str = Depends(security)):
    """Create a new organization"""
    global next_org_id
    
    org_id = next_org_id
    next_org_id += 1
    
    organization = {
        "id": org_id,
        "name": org.name,
        "email": org.email,
        "phone": org.phone,
        "address": org.address,
        "city": org.city,
        "state": org.state,
        "country": org.country,
        "postal_code": org.postal_code,
        "industry": org.industry,
        "size": org.size,
        "is_active": True,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": None
    }
    
    organizations_db[org_id] = organization
    return organization


@router.get("/{org_id}", response_model=OrganizationResponse)
async def get_organization(org_id: int, token: str = Depends(security)):
    """Get organization by ID"""
    if org_id not in organizations_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found"
        )
    
    return organizations_db[org_id]


@router.put("/{org_id}", response_model=OrganizationResponse)
async def update_organization(org_id: int, org_update: OrganizationUpdate, token: str = Depends(security)):
    """Update organization"""
    if org_id not in organizations_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found"
        )
    
    organization = organizations_db[org_id]
    
    # Update fields
    if org_update.name is not None:
        organization["name"] = org_update.name
    if org_update.email is not None:
        organization["email"] = org_update.email
    if org_update.phone is not None:
        organization["phone"] = org_update.phone
    if org_update.address is not None:
        organization["address"] = org_update.address
    if org_update.city is not None:
        organization["city"] = org_update.city
    if org_update.state is not None:
        organization["state"] = org_update.state
    if org_update.country is not None:
        organization["country"] = org_update.country
    if org_update.postal_code is not None:
        organization["postal_code"] = org_update.postal_code
    if org_update.industry is not None:
        organization["industry"] = org_update.industry
    if org_update.size is not None:
        organization["size"] = org_update.size
    if org_update.is_active is not None:
        organization["is_active"] = org_update.is_active
    
    organization["updated_at"] = datetime.utcnow().isoformat()
    
    return organization


@router.delete("/{org_id}")
async def delete_organization(org_id: int, token: str = Depends(security)):
    """Delete organization"""
    if org_id not in organizations_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Organization not found"
        )
    
    del organizations_db[org_id]
    
    return {
        "message": "Organization deleted successfully",
        "organization_id": org_id
    }
