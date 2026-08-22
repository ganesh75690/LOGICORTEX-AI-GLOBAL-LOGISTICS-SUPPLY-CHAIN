from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import List, Optional
import random
from datetime import datetime

router = APIRouter()
security = HTTPBearer()


class InventoryItemCreate(BaseModel):
    organization_id: int
    warehouse_id: int
    product_name: str
    sku: str
    description: Optional[str] = None
    category: Optional[str] = None
    current_stock: int = 0
    min_threshold: int = 10
    max_capacity: int = 1000
    unit_price: float
    supplier_id: Optional[int] = None


class InventoryItemResponse(BaseModel):
    id: int
    organization_id: int
    warehouse_id: int
    product_name: str
    sku: str
    description: Optional[str]
    category: Optional[str]
    current_stock: int
    min_threshold: int
    max_capacity: int
    unit_price: float
    supplier_id: Optional[int]
    total_value: float
    last_restocked: Optional[str]
    created_at: str
    updated_at: Optional[str]


# Mock data
inventory_db = {}
next_inventory_id = 1


@router.get("/", response_model=List[InventoryItemResponse])
async def get_inventory(token: str = Depends(security)):
    """Get all inventory items"""
    return list(inventory_db.values())


@router.post("/", response_model=InventoryItemResponse)
async def create_inventory_item(item: InventoryItemCreate, token: str = Depends(security)):
    """Create a new inventory item"""
    global next_inventory_id
    
    item_id = next_inventory_id
    next_inventory_id += 1
    
    new_item = {
        "id": item_id,
        "organization_id": item.organization_id,
        "warehouse_id": item.warehouse_id,
        "product_name": item.product_name,
        "sku": item.sku,
        "description": item.description,
        "category": item.category,
        "current_stock": item.current_stock,
        "min_threshold": item.min_threshold,
        "max_capacity": item.max_capacity,
        "unit_price": item.unit_price,
        "supplier_id": item.supplier_id,
        "total_value": item.current_stock * item.unit_price,
        "last_restocked": None,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": None
    }
    
    inventory_db[item_id] = new_item
    return new_item


@router.get("/low-stock", response_model=List[InventoryItemResponse])
async def get_low_stock_items(token: str = Depends(security)):
    """Get low stock items"""
    low_stock_items = []
    for item in inventory_db.values():
        if item["current_stock"] < item["min_threshold"]:
            low_stock_items.append(item)
    
    return low_stock_items


@router.get("/{item_id}", response_model=InventoryItemResponse)
async def get_inventory_item(item_id: int, token: str = Depends(security)):
    """Get inventory item by ID"""
    if item_id not in inventory_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inventory item not found"
        )
    
    return inventory_db[item_id]
