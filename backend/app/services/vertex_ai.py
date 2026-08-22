from typing import Dict, Any, List
from datetime import datetime, timedelta
import random
import math


class VertexAIService:
    """Mock Google Vertex AI Service"""
    
    def __init__(self):
        self.api_key = "mock-vertex-ai-key"
    
    async def demand_forecast(self, product_id: str, date_range: Dict[str, str]) -> Dict[str, Any]:
        """Mock Demand Forecasting API"""
        # Generate realistic mock demand data
        start_date = datetime.strptime(date_range["start_date"], "%Y-%m-%d")
        end_date = datetime.strptime(date_range["end_date"], "%Y-%m-%d")
        
        forecast_data = []
        current_date = start_date
        
        # Base demand with seasonal variation
        base_demand = random.randint(100, 500)
        
        while current_date <= end_date:
            # Add some randomness and seasonal patterns
            seasonal_factor = 1 + 0.3 * math.sin((current_date.timetuple().tm_yday / 365) * 2 * math.pi)
            daily_variation = random.uniform(0.8, 1.2)
            
            predicted_demand = int(base_demand * seasonal_factor * daily_variation)
            
            forecast_data.append({
                "date": current_date.strftime("%Y-%m-%d"),
                "predicted_demand": predicted_demand,
                "confidence_score": random.uniform(0.75, 0.95),
                "factors": {
                    "seasonal": seasonal_factor,
                    "historical": random.uniform(0.8, 1.2),
                    "market": random.uniform(0.9, 1.1)
                }
            })
            
            current_date += timedelta(days=1)
        
        return {
            "product_id": product_id,
            "forecast_period": f"{date_range['start_date']} to {date_range['end_date']}",
            "total_predicted_demand": sum(item["predicted_demand"] for item in forecast_data),
            "average_daily_demand": sum(item["predicted_demand"] for item in forecast_data) / len(forecast_data),
            "confidence_score": random.uniform(0.80, 0.92),
            "forecast_data": forecast_data,
            "recommendations": [
                "Increase stock levels during peak demand periods",
                "Consider safety stock of 15-20% above predicted demand",
                "Monitor competitor pricing and promotions"
            ]
        }
    
    async def disruption_prediction(self, route_id: str, weather: Dict[str, Any], traffic: Dict[str, Any]) -> Dict[str, Any]:
        """Mock Disruption Prediction API"""
        # Calculate risk score based on various factors
        weather_risk = 0
        if weather.get("condition") == "rain":
            weather_risk = 30
        elif weather.get("condition") == "snow":
            weather_risk = 60
        elif weather.get("condition") == "fog":
            weather_risk = 40
        
        traffic_risk = traffic.get("congestion_level", 0) * 20  # 0-5 scale
        
        # Time-based risk
        current_hour = datetime.now().hour
        time_risk = 0
        if 7 <= current_hour <= 9 or 17 <= current_hour <= 19:  # Rush hours
            time_risk = 25
        
        # Historical risk for this route
        historical_risk = random.uniform(5, 25)
        
        total_risk = min(95, weather_risk + traffic_risk + time_risk + historical_risk)
        
        risk_level = "low" if total_risk < 30 else "medium" if total_risk < 60 else "high" if total_risk < 80 else "critical"
        
        return {
            "route_id": route_id,
            "risk_score": int(total_risk),
            "risk_level": risk_level,
            "factors": {
                "weather": {
                    "condition": weather.get("condition", "clear"),
                    "risk_contribution": weather_risk,
                    "impact": "visibility and road conditions"
                },
                "traffic": {
                    "congestion_level": traffic.get("congestion_level", 0),
                    "risk_contribution": traffic_risk,
                    "impact": "delay probability"
                },
                "time": {
                    "current_hour": current_hour,
                    "risk_contribution": time_risk,
                    "impact": "traffic density"
                },
                "historical": {
                    "incident_rate": random.uniform(0.1, 0.8),
                    "risk_contribution": historical_risk,
                    "impact": "past performance"
                }
            },
            "predicted_disruptions": [
                {
                    "type": "delay",
                    "probability": random.uniform(0.1, 0.6),
                    "estimated_delay_minutes": random.randint(15, 120),
                    "confidence": random.uniform(0.7, 0.9)
                },
                {
                    "type": "reroute",
                    "probability": random.uniform(0.05, 0.3),
                    "alternative_routes": random.randint(1, 3),
                    "confidence": random.uniform(0.6, 0.85)
                }
            ],
            "mitigation_suggestions": [
                "Consider alternative routes if risk score exceeds 70",
                "Add buffer time for high-risk periods",
                "Monitor real-time weather updates",
                "Prepare contingency plans for critical deliveries"
            ]
        }
    
    async def route_optimization(self, source: Dict[str, float], destination: Dict[str, float], constraints: Dict[str, Any]) -> Dict[str, Any]:
        """Mock Route Optimization API"""
        # Generate mock optimized routes
        base_distance = random.uniform(50, 500)
        base_time = base_distance / 60 * 60  # Assuming 60 km/h average speed
        
        routes = []
        for i in range(3):  # Generate 3 route options
            efficiency_factor = 1 - (i * 0.1)  # Each route is progressively better
            optimized_distance = base_distance * efficiency_factor
            optimized_time = base_time * efficiency_factor
            
            routes.append({
                "route_id": f"route_opt_{i+1}",
                "name": f"Optimized Route {i+1}",
                "distance_km": round(optimized_distance, 2),
                "estimated_time_minutes": int(optimized_time),
                "fuel_cost_estimate": round(optimized_distance * random.uniform(8, 12), 2),  # ₹8-12 per km
                "traffic_level": random.choice(["low", "medium", "high"]),
                "road_quality": random.choice(["excellent", "good", "fair"]),
                "waypoints": [
                    {"lat": source["lat"] + (destination["lat"] - source["lat"]) * 0.25, "lng": source["lng"] + (destination["lng"] - source["lng"]) * 0.25},
                    {"lat": source["lat"] + (destination["lat"] - source["lat"]) * 0.5, "lng": source["lng"] + (destination["lng"] - source["lng"]) * 0.5},
                    {"lat": source["lat"] + (destination["lat"] - source["lat"]) * 0.75, "lng": source["lng"] + (destination["lng"] - source["lng"]) * 0.75}
                ],
                "constraints_satisfied": constraints,
                "optimization_score": round(100 - (i * 10), 1)
            })
        
        # Sort by optimization score
        routes.sort(key=lambda x: x["optimization_score"], reverse=True)
        
        return {
            "source": source,
            "destination": destination,
            "optimization_criteria": constraints,
            "recommended_route": routes[0],
            "alternative_routes": routes[1:],
            "optimization_metrics": {
                "distance_saved": round(routes[1]["distance_km"] - routes[0]["distance_km"], 2),
                "time_saved": routes[1]["estimated_time_minutes"] - routes[0]["estimated_time_minutes"],
                "cost_saved": round(routes[1]["fuel_cost_estimate"] - routes[0]["fuel_cost_estimate"], 2),
                "efficiency_improvement": round((routes[1]["distance_km"] - routes[0]["distance_km"]) / routes[1]["distance_km"] * 100, 1)
            },
            "generated_at": datetime.utcnow().isoformat()
        }
    
    async def anomaly_detection(self, login_data: Dict[str, Any], user_behavior: Dict[str, Any]) -> Dict[str, Any]:
        """Mock Anomaly Detection API"""
        # Analyze login patterns
        current_ip = login_data.get("ip_address", "")
        current_time = datetime.now()
        current_hour = current_time.hour
        
        # Check for unusual time
        unusual_time = current_hour < 6 or current_hour > 22
        time_risk = 30 if unusual_time else 0
        
        # Check for unusual location (mock IP geolocation)
        unusual_location = random.choice([True, False])  # Mock location check
        location_risk = 40 if unusual_location else 0
        
        # Check behavior patterns
        login_frequency = user_behavior.get("login_frequency", 1)
        device_fingerprint = login_data.get("device_fingerprint", "")
        usual_devices = user_behavior.get("usual_devices", [])
        
        device_risk = 25 if device_fingerprint not in usual_devices else 0
        frequency_risk = 20 if login_frequency < 0.5 else 0  # Infrequent login
        
        total_risk = time_risk + location_risk + device_risk + frequency_risk
        is_anomaly = total_risk > 50
        
        return {
            "user_id": login_data.get("user_id"),
            "analysis_timestamp": current_time.isoformat(),
            "is_anomaly": is_anomaly,
            "risk_score": min(100, total_risk),
            "risk_factors": {
                "unusual_time": {
                    "detected": unusual_time,
                    "risk_contribution": time_risk,
                    "current_hour": current_hour,
                    "usual_hours": user_behavior.get("usual_hours", [9, 10, 11, 14, 15, 16])
                },
                "unusual_location": {
                    "detected": unusual_location,
                    "risk_contribution": location_risk,
                    "current_ip": current_ip,
                    "usual_locations": user_behavior.get("usual_ips", ["192.168.1.1"])
                },
                "unusual_device": {
                    "detected": device_fingerprint not in usual_devices,
                    "risk_contribution": device_risk,
                    "current_device": device_fingerprint[:20] + "...",
                    "device_count": len(usual_devices)
                },
                "login_frequency": {
                    "current_frequency": login_frequency,
                    "risk_contribution": frequency_risk,
                    "pattern": "infrequent" if login_frequency < 0.5 else "normal"
                }
            },
            "recommendations": [
                "Require additional verification if anomaly detected",
                "Send security alert to user and admin",
                "Log the event for security audit",
                "Consider temporary account lock if high risk"
            ] if is_anomaly else [
                "Login appears normal",
                "Continue with standard authentication"
            ]
        }


# Initialize service
vertex_ai_service = VertexAIService()
