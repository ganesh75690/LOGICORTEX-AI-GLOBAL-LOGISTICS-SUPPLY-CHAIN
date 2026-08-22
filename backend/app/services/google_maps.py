from typing import Dict, Any, List
from datetime import datetime, timedelta
import random
import math


class GoogleMapsService:
    """Mock Google Maps API Service"""
    
    def __init__(self):
        self.api_key = "mock-maps-key"
    
    async def route_visualization(self, source: Dict[str, float], destination: Dict[str, float]) -> Dict[str, Any]:
        """Mock Route Visualization API"""
        
        # Generate realistic route coordinates
        coordinates = self._generate_route_coordinates(source, destination)
        
        # Calculate route metrics
        distance_km = self._calculate_distance(source, destination)
        estimated_time = distance_km / 60 * 60  # Assuming 60 km/h average speed
        
        return {
            "route_id": f"route_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "source": source,
            "destination": destination,
            "coordinates": coordinates,
            "distance_km": round(distance_km, 2),
            "estimated_time_minutes": int(estimated_time),
            "route_type": "fastest",
            "traffic_condition": random.choice(["light", "moderate", "heavy"]),
            "waypoints": [
                coordinates[i] for i in [0, len(coordinates)//4, len(coordinates)//2, 3*len(coordinates)//4, -1]
            ],
            "bounding_box": {
                "northeast": {
                    "lat": max(coord["lat"] for coord in coordinates),
                    "lng": max(coord["lng"] for coord in coordinates)
                },
                "southwest": {
                    "lat": min(coord["lat"] for coord in coordinates),
                    "lng": min(coord["lng"] for coord in coordinates)
                }
            },
            "generated_at": datetime.utcnow().isoformat()
        }
    
    async def risk_heatmap(self, region: Dict[str, Any]) -> Dict[str, Any]:
        """Mock Risk Heatmap API"""
        
        # Generate risk zones for the region
        center_lat = region.get("center_lat", 12.9716)
        center_lng = region.get("center_lng", 77.5946)
        radius_km = region.get("radius_km", 50)
        
        risk_zones = []
        
        # Generate multiple risk zones with different risk levels
        for i in range(random.randint(5, 12)):
            angle = random.uniform(0, 2 * math.pi)
            distance = random.uniform(5, radius_km)
            
            zone_lat = center_lat + (distance * math.cos(angle)) / 111.0
            zone_lng = center_lng + (distance * math.sin(angle)) / (111.0 * math.cos(math.radians(center_lat)))
            
            risk_level = random.choice(["low", "medium", "high", "critical"])
            risk_score = {
                "low": random.uniform(10, 30),
                "medium": random.uniform(30, 60),
                "high": random.uniform(60, 80),
                "critical": random.uniform(80, 95)
            }[risk_level]
            
            risk_zones.append({
                "zone_id": f"zone_{i+1}",
                "center": {"lat": zone_lat, "lng": zone_lng},
                "radius_km": random.uniform(3, 15),
                "risk_level": risk_level,
                "risk_score": risk_score,
                "risk_type": random.choice(["traffic", "weather", "accident_prone", "theft", "infrastructure"]),
                "active_hours": random.choice(["all_day", "rush_hours", "night_only"]),
                "description": f"{risk_level.title()} risk area due to {random.choice(['heavy traffic', 'poor lighting', 'accident history', 'weather conditions'])}",
                "mitigation_suggestions": [
                    "Use alternative routes when possible",
                    "Increase security measures",
                    "Monitor real-time conditions",
                    "Schedule deliveries outside high-risk periods"
                ]
            })
        
        return {
            "region": region,
            "risk_zones": risk_zones,
            "overall_risk_score": sum(zone["risk_score"] for zone in risk_zones) / len(risk_zones),
            "safe_routes": self._generate_safe_routes(center_lat, center_lng, risk_zones),
            "high_risk_areas": [zone for zone in risk_zones if zone["risk_level"] in ["high", "critical"]],
            "generated_at": datetime.utcnow().isoformat()
        }
    
    async def geo_fencing(self, driver_location: Dict[str, float], fence_config: Dict[str, Any]) -> Dict[str, Any]:
        """Mock Geo-fencing API"""
        
        driver_lat = driver_location["lat"]
        driver_lng = driver_location["lng"]
        
        fence_center = fence_config.get("center", {"lat": 12.9716, "lng": 77.5946})
        fence_radius = fence_config.get("radius_km", 10)
        
        # Calculate distance from fence center
        distance = self._calculate_distance(driver_location, fence_center)
        
        is_inside = distance <= fence_radius
        
        # Generate additional fence information
        fences = [
            {
                "fence_id": "main_warehouse",
                "name": "Main Warehouse Area",
                "center": fence_center,
                "radius_km": fence_radius,
                "is_inside": is_inside,
                "distance_from_center": round(distance, 2),
                "entry_time": datetime.utcnow().isoformat() if is_inside and random.random() > 0.7 else None,
                "exit_time": None,
                "duration_inside_minutes": random.randint(5, 120) if is_inside else 0
            }
        ]
        
        # Add additional fences
        for i in range(random.randint(1, 3)):
            fences.append({
                "fence_id": f"secondary_fence_{i+1}",
                "name": f"Secondary Zone {i+1}",
                "center": {
                    "lat": fence_center["lat"] + random.uniform(-0.1, 0.1),
                    "lng": fence_center["lng"] + random.uniform(-0.1, 0.1)
                },
                "radius_km": random.uniform(5, 20),
                "is_inside": random.choice([True, False]),
                "distance_from_center": round(random.uniform(0, 25), 2),
                "entry_time": None,
                "exit_time": None,
                "duration_inside_minutes": 0
            })
        
        return {
            "driver_location": driver_location,
            "timestamp": datetime.utcnow().isoformat(),
            "fences": fences,
            "summary": {
                "total_fences": len(fences),
                "fences_inside": len([f for f in fences if f["is_inside"]]),
                "closest_fence": min(fences, key=lambda f: f["distance_from_center"]),
                "status": "inside_fence" if is_inside else "outside_fence"
            },
            "alerts": [
                {
                    "type": "fence_breach" if not is_inside else "fence_entry",
                    "message": f"Driver has {'entered' if is_inside else 'exited'} the main warehouse area",
                    "severity": "info" if is_inside else "warning"
                }
            ] if random.random() > 0.8 else []
        }
    
    async def distance_eta(self, source: Dict[str, float], destination: Dict[str, float], transport_mode: str = "driving") -> Dict[str, Any]:
        """Mock Distance & ETA API"""
        
        distance_km = self._calculate_distance(source, destination)
        
        # Calculate ETA based on transport mode
        speed_kmh = {
            "driving": 60,
            "truck": 50,
            "motorcycle": 80,
            "walking": 5,
            "bicycling": 20
        }.get(transport_mode, 60)
        
        # Add traffic factor
        traffic_factor = random.uniform(1.0, 1.5)
        base_time_minutes = (distance_km / speed_kmh) * 60
        estimated_time_minutes = int(base_time_minutes * traffic_factor)
        
        # Generate alternative routes
        alternatives = []
        for i in range(2):
            alt_distance = distance_km * random.uniform(1.1, 1.4)
            alt_time = int((alt_distance / speed_kmh) * 60 * random.uniform(1.0, 1.3))
            
            alternatives.append({
                "route_id": f"alt_route_{i+1}",
                "distance_km": round(alt_distance, 2),
                "eta_minutes": alt_time,
                "route_type": random.choice(["scenic", "highway", "city_center"]),
                "traffic_condition": random.choice(["light", "moderate", "heavy"]),
                "tolls": random.choice([True, False]),
                "fuel_cost_estimate": round(alt_distance * random.uniform(8, 12), 2)
            })
        
        return {
            "source": source,
            "destination": destination,
            "transport_mode": transport_mode,
            "primary_route": {
                "distance_km": round(distance_km, 2),
                "eta_minutes": estimated_time_minutes,
                "traffic_factor": round(traffic_factor, 2),
                "fuel_cost_estimate": round(distance_km * random.uniform(8, 12), 2),
                "route_type": "fastest",
                "traffic_condition": "moderate",
                "tolls": False
            },
            "alternative_routes": alternatives,
            "traffic_conditions": {
                "current": "moderate",
                "typical_for_time": "moderate",
                "incidents": random.randint(0, 2),
                "construction_zones": random.randint(0, 1)
            },
            "estimated_arrival": (datetime.utcnow() + timedelta(minutes=estimated_time_minutes)).isoformat(),
            "confidence": random.uniform(0.85, 0.95),
            "generated_at": datetime.utcnow().isoformat()
        }
    
    def _generate_route_coordinates(self, source: Dict[str, float], destination: Dict[str, float]) -> List[Dict[str, float]]:
        """Generate realistic route coordinates"""
        coordinates = []
        
        # Add intermediate points to make route realistic
        num_points = random.randint(15, 25)
        
        for i in range(num_points):
            progress = i / (num_points - 1)
            
            # Add some curve to the route
            lat_offset = math.sin(progress * math.pi) * random.uniform(-0.02, 0.02)
            lng_offset = math.cos(progress * math.pi) * random.uniform(-0.02, 0.02)
            
            lat = source["lat"] + (destination["lat"] - source["lat"]) * progress + lat_offset
            lng = source["lng"] + (destination["lng"] - source["lng"]) * progress + lng_offset
            
            coordinates.append({"lat": lat, "lng": lng})
        
        return coordinates
    
    def _calculate_distance(self, point1: Dict[str, float], point2: Dict[str, float]) -> float:
        """Calculate distance between two points in kilometers"""
        lat1, lon1 = math.radians(point1["lat"]), math.radians(point1["lng"])
        lat2, lon2 = math.radians(point2["lat"]), math.radians(point2["lng"])
        
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.asin(math.sqrt(a))
        
        return 6371 * c  # Earth's radius in kilometers
    
    def _generate_safe_routes(self, center_lat: float, center_lng: float, risk_zones: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Generate safe routes avoiding high-risk areas"""
        safe_routes = []
        
        for i in range(3):
            route_points = []
            current_lat = center_lat + random.uniform(-0.05, 0.05)
            current_lng = center_lng + random.uniform(-0.05, 0.05)
            
            # Generate route points avoiding high-risk zones
            for j in range(random.randint(8, 15)):
                route_points.append({"lat": current_lat, "lng": current_lng})
                
                # Move towards destination while avoiding risk zones
                current_lat += random.uniform(-0.01, 0.01)
                current_lng += random.uniform(-0.01, 0.01)
            
            safe_routes.append({
                "route_id": f"safe_route_{i+1}",
                "name": f"Safe Route {i+1}",
                "coordinates": route_points,
                "risk_score": random.uniform(5, 25),
                "description": "Low-risk alternative route"
            })
        
        return safe_routes


# Initialize service
google_maps_service = GoogleMapsService()
