from typing import Dict, Any, List
from datetime import datetime, timedelta
import random


class BigQueryService:
    """Mock Google BigQuery Service"""
    
    def __init__(self):
        self.api_key = "mock-bigquery-key"
    
    async def platform_analytics(self, date_range: Dict[str, str]) -> Dict[str, Any]:
        """Mock Platform Analytics API"""
        
        start_date = datetime.strptime(date_range["start_date"], "%Y-%m-%d")
        end_date = datetime.strptime(date_range["end_date"], "%Y-%m-%d")
        days_diff = (end_date - start_date).days + 1
        
        # Generate realistic platform metrics
        total_deliveries = random.randint(5000, 15000) * days_diff
        cost_saved = random.randint(50000000, 200000000) * days_diff  # ₹50K - ₹200K per day
        efficiency_percentage = random.uniform(78, 94)
        
        # Generate trend data
        daily_metrics = []
        for i in range(days_diff):
            current_date = start_date + timedelta(days=i)
            daily_deliveries = random.randint(150, 500)
            daily_cost_saved = daily_deliveries * random.randint(800, 2500)
            daily_efficiency = efficiency_percentage + random.uniform(-5, 5)
            
            daily_metrics.append({
                "date": current_date.strftime("%Y-%m-%d"),
                "deliveries": daily_deliveries,
                "cost_saved": daily_cost_saved,
                "efficiency": round(daily_efficiency, 1),
                "active_vehicles": random.randint(80, 120),
                "active_drivers": random.randint(90, 130)
            })
        
        return {
            "date_range": date_range,
            "summary": {
                "total_deliveries": total_deliveries,
                "cost_saved": cost_saved,
                "efficiency_percentage": round(efficiency_percentage, 1),
                "average_daily_deliveries": round(total_deliveries / days_diff),
                "average_daily_cost_saved": round(cost_saved / days_diff),
                "total_vehicles": random.randint(150, 200),
                "total_drivers": random.randint(180, 250),
                "active_organizations": random.randint(25, 45)
            },
            "trends": {
                "delivery_growth": round(random.uniform(-5, 15), 1),
                "cost_savings_growth": round(random.uniform(8, 25), 1),
                "efficiency_improvement": round(random.uniform(-2, 8), 1)
            },
            "daily_metrics": daily_metrics,
            "top_performing_metrics": {
                "best_day_deliveries": max(d["deliveries"] for d in daily_metrics),
                "best_day_cost_saved": max(d["cost_saved"] for d in daily_metrics),
                "best_efficiency_day": max(daily_metrics, key=lambda x: x["efficiency"])["date"]
            },
            "generated_at": datetime.utcnow().isoformat()
        }
    
    async def organization_reports(self, organization_id: int, date_range: Dict[str, str]) -> Dict[str, Any]:
        """Mock Organization Reports API"""
        
        start_date = datetime.strptime(date_range["start_date"], "%Y-%m-%d")
        end_date = datetime.strptime(date_range["end_date"], "%Y-%m-%d")
        days_diff = (end_date - start_date).days + 1
        
        # Generate organization-specific metrics
        org_deliveries = random.randint(100, 800) * days_diff
        org_revenue = random.randint(2000000, 15000000) * days_diff  # ₹2M - ₹15M per day
        org_costs = org_revenue * random.uniform(0.6, 0.8)
        org_profit = org_revenue - org_costs
        
        # Performance metrics
        on_time_delivery_rate = random.uniform(85, 96)
        customer_satisfaction = random.uniform(3.8, 4.7)
        vehicle_utilization = random.uniform(70, 92)
        
        return {
            "organization_id": organization_id,
            "organization_name": f"Organization {organization_id}",
            "date_range": date_range,
            "financial_metrics": {
                "total_revenue": org_revenue,
                "total_costs": org_costs,
                "net_profit": org_profit,
                "profit_margin": round((org_profit / org_revenue) * 100, 1),
                "average_order_value": round(org_revenue / org_deliveries),
                "cost_per_delivery": round(org_costs / org_deliveries)
            },
            "operational_metrics": {
                "total_deliveries": org_deliveries,
                "on_time_delivery_rate": round(on_time_delivery_rate, 1),
                "average_delivery_time": random.randint(25, 45),
                "vehicle_utilization": round(vehicle_utilization, 1),
                "driver_utilization": round(vehicle_utilization * 0.95, 1),
                "fuel_efficiency": random.uniform(8, 12)  # km per liter
            },
            "customer_metrics": {
                "customer_satisfaction_score": round(customer_satisfaction, 2),
                "total_customers": random.randint(500, 2000),
                "new_customers": random.randint(20, 80),
                "retention_rate": round(random.uniform(85, 95), 1),
                "complaint_resolution_time": random.randint(2, 8)  # hours
            },
            "inventory_metrics": {
                "inventory_turnover": random.uniform(8, 15),
                "stockout_rate": round(random.uniform(2, 8), 1),
                "carrying_cost": random.randint(500000, 2000000),
                "safety_stock_level": random.uniform(15, 25)
            },
            "performance_ranking": {
                "industry_position": random.randint(1, 10),
                "total_companies": 50,
                "percentile": round(random.uniform(70, 95), 1),
                "key_strengths": [
                    "On-time delivery performance",
                    "Cost efficiency",
                    "Customer satisfaction"
                ],
                "improvement_areas": [
                    "Inventory optimization",
                    "Route planning",
                    "Technology adoption"
                ]
            },
            "generated_at": datetime.utcnow().isoformat()
        }
    
    async def demand_analytics(self, product_category: str, date_range: Dict[str, str]) -> Dict[str, Any]:
        """Mock Demand Analytics API"""
        
        start_date = datetime.strptime(date_range["start_date"], "%Y-%m-%d")
        end_date = datetime.strptime(date_range["end_date"], "%Y-%m-%d")
        
        # Generate demand trends
        demand_data = []
        total_demand = 0
        
        current_date = start_date
        while current_date <= end_date:
            # Add seasonal patterns and trends
            base_demand = random.randint(100, 500)
            seasonal_factor = 1 + 0.3 * (current_date.timetuple().tm_yday / 365) * 3.14159 / 180
            trend_factor = 1 + (current_date - start_date).days * 0.01  # Growth trend
            
            daily_demand = int(base_demand * seasonal_factor * trend_factor)
            total_demand += daily_demand
            
            demand_data.append({
                "date": current_date.strftime("%Y-%m-%d"),
                "demand": daily_demand,
                "predicted_demand": int(daily_demand * random.uniform(0.9, 1.1)),
                "actual_demand": daily_demand if random.random() > 0.2 else int(daily_demand * random.uniform(0.8, 1.2)),
                "confidence": round(random.uniform(0.75, 0.95), 2)
            })
            
            current_date += timedelta(days=1)
        
        # Calculate analytics
        avg_demand = total_demand / len(demand_data)
        peak_demand = max(d["demand"] for d in demand_data)
        min_demand = min(d["demand"] for d in demand_data)
        
        # Seasonal analysis
        monthly_demand = {}
        for data in demand_data:
            month = datetime.strptime(data["date"], "%Y-%m-%d").strftime("%B")
            if month not in monthly_demand:
                monthly_demand[month] = 0
            monthly_demand[month] += data["demand"]
        
        return {
            "product_category": product_category,
            "date_range": date_range,
            "demand_summary": {
                "total_demand": total_demand,
                "average_daily_demand": round(avg_demand),
                "peak_demand": peak_demand,
                "minimum_demand": min_demand,
                "demand_volatility": round(((peak_demand - min_demand) / avg_demand) * 100, 1)
            },
            "forecast_accuracy": round(random.uniform(82, 94), 1),
            "demand_trends": {
                "growth_rate": round(random.uniform(-5, 20), 1),
                "seasonality": "high" if max(monthly_demand.values()) / min(monthly_demand.values()) > 2 else "moderate",
                "trend_direction": random.choice(["increasing", "stable", "decreasing"])
            },
            "monthly_breakdown": monthly_demand,
            "demand_factors": [
                {
                    "factor": "Seasonal Demand",
                    "impact": round(random.uniform(15, 35), 1),
                    "description": "Seasonal variations affect demand patterns"
                },
                {
                    "factor": "Market Conditions",
                    "impact": round(random.uniform(10, 25), 1),
                    "description": "Economic conditions influence purchasing behavior"
                },
                {
                    "factor": "Promotional Activities",
                    "impact": round(random.uniform(5, 20), 1),
                    "description": "Marketing campaigns drive demand spikes"
                }
            ],
            "recommendations": [
                "Increase inventory during peak demand months",
                "Implement demand forecasting for better planning",
                "Consider dynamic pricing strategies",
                "Monitor market trends for early warnings"
            ],
            "daily_demand_data": demand_data,
            "generated_at": datetime.utcnow().isoformat()
        }
    
    async def driver_performance_reports(self, driver_id: int, date_range: Dict[str, str]) -> Dict[str, Any]:
        """Mock Driver Performance Reports API"""
        
        start_date = datetime.strptime(date_range["start_date"], "%Y-%m-%d")
        end_date = datetime.strptime(date_range["end_date"], "%Y-%m-%d")
        days_diff = (end_date - start_date).days + 1
        
        # Generate driver performance metrics
        total_deliveries = random.randint(10, 35) * days_diff
        on_time_deliveries = int(total_deliveries * random.uniform(0.85, 0.98))
        total_distance = random.randint(200, 600) * days_diff  # km
        total_fuel_consumed = total_distance / random.uniform(8, 12)  # liters
        
        # Performance scores
        delivery_score = (on_time_deliveries / total_deliveries) * 100
        efficiency_score = random.uniform(75, 95)
        safety_score = random.uniform(80, 98)
        customer_score = random.uniform(3.5, 4.8)
        
        overall_score = (delivery_score * 0.4 + efficiency_score * 0.3 + safety_score * 0.2 + (customer_score * 20) * 0.1)
        
        return {
            "driver_id": driver_id,
            "driver_name": f"Driver {driver_id}",
            "date_range": date_range,
            "performance_summary": {
                "overall_score": round(overall_score, 1),
                "delivery_score": round(delivery_score, 1),
                "efficiency_score": round(efficiency_score, 1),
                "safety_score": round(safety_score, 1),
                "customer_score": round(customer_score, 2),
                "rank_in_organization": random.randint(1, 25),
                "total_drivers": random.randint(40, 80)
            },
            "delivery_metrics": {
                "total_deliveries": total_deliveries,
                "on_time_deliveries": on_time_deliveries,
                "on_time_rate": round(delivery_score, 1),
                "average_deliveries_per_day": round(total_deliveries / days_diff, 1),
                "failed_deliveries": total_deliveries - on_time_deliveries,
                "average_delivery_time": random.randint(20, 40)  # minutes
            },
            "efficiency_metrics": {
                "total_distance_km": total_distance,
                "average_distance_per_delivery": round(total_distance / total_deliveries, 1),
                "fuel_efficiency": round(total_distance / total_fuel_consumed, 2),
                "total_fuel_consumed": round(total_fuel_consumed, 1),
                "vehicle_utilization": round(random.uniform(70, 95), 1),
                "idle_time_percentage": round(random.uniform(5, 20), 1)
            },
            "safety_metrics": {
                "safety_incidents": random.randint(0, 3),
                "traffic_violations": random.randint(0, 5),
                "accidents": random.randint(0, 1),
                "safety_training_completed": True,
                "last_safety_training": (datetime.utcnow() - timedelta(days=random.randint(30, 180))).isoformat()
            },
            "customer_feedback": {
                "average_rating": round(customer_score, 2),
                "total_ratings": random.randint(50, 200),
                "positive_feedback_percentage": round(random.uniform(85, 98), 1),
                "complaints_resolved": random.randint(8, 25),
                "complaints_pending": random.randint(0, 3)
            },
            "performance_trends": {
                "delivery_score_trend": round(random.uniform(-5, 8), 1),
                "efficiency_trend": round(random.uniform(-3, 6), 1),
                "customer_rating_trend": round(random.uniform(-0.2, 0.5), 2)
            },
            "recommendations": [
                "Focus on improving on-time delivery performance",
                "Consider route optimization training",
                "Maintain excellent customer service standards",
                "Continue safe driving practices"
            ] if overall_score < 85 else [
                "Maintain current performance standards",
                "Consider mentoring junior drivers",
                "Share best practices with team"
            ],
            "generated_at": datetime.utcnow().isoformat()
        }


# Initialize service
bigquery_service = BigQueryService()
