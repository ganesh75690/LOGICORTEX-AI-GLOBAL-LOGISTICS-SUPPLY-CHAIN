from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import random
from datetime import datetime, timedelta

router = APIRouter()
security = HTTPBearer()


class PlatformAnalyticsResponse(BaseModel):
    total_deliveries: int
    cost_saved: int
    efficiency_percentage: float
    average_daily_deliveries: float
    average_daily_cost_saved: float
    total_vehicles: int
    total_drivers: int
    active_organizations: int


class OrganizationAnalyticsResponse(BaseModel):
    organization_id: int
    organization_name: str
    financial_metrics: Dict[str, Any]
    operational_metrics: Dict[str, Any]
    customer_metrics: Dict[str, Any]
    inventory_metrics: Dict[str, Any]
    performance_ranking: Dict[str, Any]


@router.get("/overview", response_model=PlatformAnalyticsResponse)
async def get_platform_analytics(
    start_date: str,
    end_date: str,
    token: str = Depends(security)
):
    """Get platform overview analytics"""
    # Generate mock analytics data
    start = datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.strptime(end_date, "%Y-%m-%d")
    days_diff = (end - start).days + 1
    
    total_deliveries = random.randint(5000, 15000) * days_diff
    cost_saved = random.randint(50000000, 200000000) * days_diff
    efficiency_percentage = random.uniform(78, 94)
    
    return PlatformAnalyticsResponse(
        total_deliveries=total_deliveries,
        cost_saved=cost_saved,
        efficiency_percentage=round(efficiency_percentage, 1),
        average_daily_deliveries=round(total_deliveries / days_diff),
        average_daily_cost_saved=round(cost_saved / days_diff),
        total_vehicles=random.randint(150, 200),
        total_drivers=random.randint(180, 250),
        active_organizations=random.randint(25, 45)
    )


@router.get("/organization/{org_id}", response_model=OrganizationAnalyticsResponse)
async def get_organization_analytics(
    org_id: int,
    start_date: str,
    end_date: str,
    token: str = Depends(security)
):
    """Get organization-specific analytics"""
    start = datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.strptime(end_date, "%Y-%m-%d")
    days_diff = (end - start).days + 1
    
    org_deliveries = random.randint(100, 800) * days_diff
    org_revenue = random.randint(2000000, 15000000) * days_diff
    org_costs = org_revenue * random.uniform(0.6, 0.8)
    
    return OrganizationAnalyticsResponse(
        organization_id=org_id,
        organization_name=f"Organization {org_id}",
        financial_metrics={
            "total_revenue": org_revenue,
            "total_costs": org_costs,
            "net_profit": org_revenue - org_costs,
            "profit_margin": round(((org_revenue - org_costs) / org_revenue) * 100, 1),
            "average_order_value": round(org_revenue / org_deliveries),
            "cost_per_delivery": round(org_costs / org_deliveries)
        },
        operational_metrics={
            "total_deliveries": org_deliveries,
            "on_time_delivery_rate": round(random.uniform(85, 96), 1),
            "average_delivery_time": random.randint(25, 45),
            "vehicle_utilization": round(random.uniform(70, 92), 1),
            "driver_utilization": round(random.uniform(65, 90), 1)
        },
        customer_metrics={
            "customer_satisfaction_score": round(random.uniform(3.8, 4.7), 2),
            "total_customers": random.randint(500, 2000),
            "new_customers": random.randint(20, 80),
            "retention_rate": round(random.uniform(85, 95), 1)
        },
        inventory_metrics={
            "inventory_turnover": random.uniform(8, 15),
            "stockout_rate": round(random.uniform(2, 8), 1),
            "carrying_cost": random.randint(500000, 2000000)
        },
        performance_ranking={
            "industry_position": random.randint(1, 10),
            "total_companies": 50,
            "percentile": round(random.uniform(70, 95), 1)
        }
    )
