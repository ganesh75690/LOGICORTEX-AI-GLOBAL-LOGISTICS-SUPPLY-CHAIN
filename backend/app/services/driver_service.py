from typing import List, Dict, Optional
from datetime import datetime, timedelta
import asyncio
import random

class DriverService:
    def __init__(self):
        self.driver_locations = {}
        self.tracking_active = {}
        self.driver_timeline = {}
    
    async def get_drivers(self, search: Optional[str] = None, status: Optional[str] = None) -> List[Dict]:
        """Get drivers with optional filtering"""
        
        # Base driver data
        drivers = [
            {
                "id": "driver-1",
                "name": "Raj Kumar",
                "status": "available",
                "location": "Zone A",
                "estimated_arrival": 8,
                "current_load": 8,
                "max_capacity": 15,
                "efficiency": 92,
                "coordinates": {"lat": 40.7128, "lng": -74.0060},
                "phone": "+1-555-0101",
                "vehicle_type": "Van",
                "rating": 4.8,
                "total_deliveries": 247
            },
            {
                "id": "driver-2",
                "name": "Priya Sharma",
                "status": "delayed",
                "location": "Zone B",
                "estimated_arrival": 25,
                "current_load": 12,
                "max_capacity": 15,
                "efficiency": 85,
                "coordinates": {"lat": 34.0522, "lng": -118.2437},
                "phone": "+1-555-0102",
                "vehicle_type": "Truck",
                "rating": 4.6,
                "total_deliveries": 189
            },
            {
                "id": "driver-3",
                "name": "Amit Patel",
                "status": "available",
                "location": "Zone A",
                "estimated_arrival": 8,
                "current_load": 6,
                "max_capacity": 15,
                "efficiency": 88,
                "coordinates": {"lat": 40.7128, "lng": -74.0060},
                "phone": "+1-555-0103",
                "vehicle_type": "Van",
                "rating": 4.7,
                "total_deliveries": 203
            },
            {
                "id": "driver-4",
                "name": "Sneha Reddy",
                "status": "busy",
                "location": "Zone D",
                "estimated_arrival": 15,
                "current_load": 14,
                "max_capacity": 15,
                "efficiency": 95,
                "coordinates": {"lat": 29.7604, "lng": -95.3698},
                "phone": "+1-555-0104",
                "vehicle_type": "Truck",
                "rating": 4.9,
                "total_deliveries": 312
            }
        ]
        
        # Apply search filter
        if search:
            search_lower = search.lower()
            drivers = [
                driver for driver in drivers
                if (search_lower in driver["name"].lower() or
                    search_lower in driver["location"].lower() or
                    search_lower in driver["status"].lower() or
                    search_lower in driver["id"].lower())
            ]
        
        # Apply status filter
        if status:
            drivers = [driver for driver in drivers if driver["status"] == status]
        
        # Add real-time data
        for driver in drivers:
            driver.update(await self._get_real_time_data(driver["id"]))
        
        return drivers
    
    async def _get_real_time_data(self, driver_id: str) -> Dict:
        """Get real-time driver data"""
        base_data = {
            "last_updated": datetime.now(),
            "battery_level": random.randint(60, 100),
            "signal_strength": random.randint(3, 5),
            "speed": random.randint(0, 45) if random.random() > 0.3 else 0,
            "heading": random.randint(0, 359)
        }
        
        # Add location tracking if active
        if driver_id in self.tracking_active and self.tracking_active[driver_id]:
            base_data["real_time_location"] = self.driver_locations.get(driver_id)
        
        return base_data
    
    async def get_driver_location(self, driver_id: str) -> Optional[Dict]:
        """Get driver's current location"""
        drivers = await self.get_drivers()
        driver = next((d for d in drivers if d["id"] == driver_id), None)
        
        if not driver:
            return None
        
        location = {
            "driver_id": driver_id,
            "name": driver["name"],
            "coordinates": driver["coordinates"],
            "location": driver["location"],
            "last_updated": datetime.now(),
            "accuracy": random.uniform(5, 15),
            "altitude": random.uniform(0, 100)
        }
        
        # Add real-time tracking data if available
        if driver_id in self.driver_locations:
            location.update(self.driver_locations[driver_id])
        
        return location
    
    async def start_real_time_tracking(self, driver_id: str):
        """Start real-time tracking for a driver"""
        self.tracking_active[driver_id] = True
        
        # Simulate real-time location updates
        async def update_location():
            while self.tracking_active.get(driver_id, False):
                # Simulate location movement
                current_loc = self.driver_locations.get(driver_id, {"lat": 40.7128, "lng": -74.0060})
                
                # Add small random movement
                new_loc = {
                    "lat": current_loc["lat"] + random.uniform(-0.001, 0.001),
                    "lng": current_loc["lng"] + random.uniform(-0.001, 0.001),
                    "timestamp": datetime.now(),
                    "speed": random.randint(0, 45),
                    "heading": random.randint(0, 359)
                }
                
                self.driver_locations[driver_id] = new_loc
                await asyncio.sleep(5)  # Update every 5 seconds
        
        # Start background task
        asyncio.create_task(update_location())
    
    async def stop_real_time_tracking(self, driver_id: str):
        """Stop real-time tracking for a driver"""
        self.tracking_active[driver_id] = False
    
    async def get_driver_timeline(self, driver_id: str, hours: int = 24) -> List[Dict]:
        """Get driver's dispatch timeline"""
        
        # Generate timeline data
        timeline_events = []
        now = datetime.now()
        
        # Recent events
        events = [
            {
                "time": "09:00",
                "action": "Started shift",
                "location": "Zone A",
                "status": "completed",
                "details": "Daily route planning completed"
            },
            {
                "time": "09:30",
                "action": "Pickup packages",
                "location": "Warehouse A",
                "status": "completed",
                "details": "Loaded 8 packages for delivery"
            },
            {
                "time": "10:15",
                "action": "Delivery",
                "location": "Zone A",
                "status": "completed",
                "details": "Delivered 3 packages successfully"
            },
            {
                "time": "11:00",
                "action": "Break",
                "location": "Zone A",
                "status": "in-progress",
                "details": "Scheduled 15-minute break"
            },
            {
                "time": "11:30",
                "action": "Route optimization",
                "location": "Zone A",
                "status": "pending",
                "details": "AI system optimizing remaining route"
            }
        ]
        
        for event in events:
            timeline_events.append({
                "driver_id": driver_id,
                "timestamp": now.replace(hour=int(event["time"].split(":")[0]), 
                                      minute=int(event["time"].split(":")[1])),
                "action": event["action"],
                "location": event["location"],
                "status": event["status"],
                "details": event["details"],
                "estimated_duration": random.randint(5, 30)
            })
        
        return sorted(timeline_events, key=lambda x: x["timestamp"], reverse=True)
    
    async def update_driver_status(self, driver_id: str, status: str) -> bool:
        """Update driver status"""
        # In a real implementation, this would update the database
        return True
    
    async def get_driver_performance(self, driver_id: str) -> Dict:
        """Get driver performance metrics"""
        return {
            "driver_id": driver_id,
            "efficiency_score": random.uniform(0.75, 0.95),
            "on_time_rate": random.uniform(0.85, 0.98),
            "customer_rating": random.uniform(4.0, 5.0),
            "total_deliveries": random.randint(150, 350),
            "average_delivery_time": random.randint(15, 35),
            "fuel_efficiency": random.uniform(8.5, 12.5),
            "safety_score": random.uniform(0.90, 1.0),
            "productivity_score": random.uniform(0.80, 0.95)
        }
    
    async def assign_driver_to_route(self, driver_id: str, route_id: str) -> Dict:
        """Assign driver to a specific route"""
        return {
            "driver_id": driver_id,
            "route_id": route_id,
            "assigned_at": datetime.now(),
            "estimated_completion": datetime.now() + timedelta(hours=random.randint(2, 6)),
            "packages_assigned": random.randint(5, 15),
            "estimated_distance": random.uniform(10, 50)
        }
