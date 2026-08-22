from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import random
import string


class FirebaseService:
    """Mock Firebase Service"""
    
    def __init__(self):
        self.api_key = "mock-firebase-key"
        self.active_sessions = {}
        self.otp_store = {}
        self.driver_locations = {}
        self.alert_subscriptions = {}
    
    async def otp_generation(self, contact: str, contact_type: str = "email") -> Dict[str, Any]:
        """Mock OTP Generation & Verification"""
        
        # Generate 6-digit OTP
        otp = ''.join(random.choices(string.digits, k=6))
        
        # Store OTP with expiry (10 minutes)
        expiry_time = datetime.utcnow() + timedelta(minutes=10)
        self.otp_store[contact] = {
            "otp": otp,
            "expiry": expiry_time,
            "attempts": 0,
            "contact_type": contact_type
        }
        
        # Mock sending OTP
        send_method = "email" if contact_type == "email" else "sms"
        
        return {
            "success": True,
            "message": f"OTP sent successfully via {send_method}",
            "contact": contact,
            "contact_type": contact_type,
            "send_method": send_method,
            "otp_id": f"otp_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}",
            "expires_in_minutes": 10,
            "max_attempts": 3,
            "generated_at": datetime.utcnow().isoformat(),
            "debug_otp": otp  # Only for demo purposes
        }
    
    async def otp_verification(self, contact: str, otp: str) -> Dict[str, Any]:
        """Mock OTP Verification"""
        
        stored_data = self.otp_store.get(contact)
        
        if not stored_data:
            return {
                "success": False,
                "message": "OTP not found or expired",
                "error": "invalid_otp"
            }
        
        # Check expiry
        if datetime.utcnow() > stored_data["expiry"]:
            del self.otp_store[contact]
            return {
                "success": False,
                "message": "OTP has expired",
                "error": "otp_expired"
            }
        
        # Check attempts
        if stored_data["attempts"] >= 3:
            del self.otp_store[contact]
            return {
                "success": False,
                "message": "Maximum attempts exceeded",
                "error": "max_attempts_exceeded"
            }
        
        # Verify OTP
        stored_data["attempts"] += 1
        
        if otp == stored_data["otp"]:
            del self.otp_store[contact]
            return {
                "success": True,
                "message": "OTP verified successfully",
                "verified_at": datetime.utcnow().isoformat(),
                "attempts_used": stored_data["attempts"]
            }
        else:
            remaining_attempts = 3 - stored_data["attempts"]
            return {
                "success": False,
                "message": f"Invalid OTP. {remaining_attempts} attempts remaining",
                "error": "invalid_otp",
                "attempts_used": stored_data["attempts"],
                "attempts_remaining": remaining_attempts
            }
    
    async def real_time_alerts(self, user_id: int, organization_id: int, alert_types: List[str]) -> Dict[str, Any]:
        """Mock Real-time Alerts Service"""
        
        # Subscribe user to alerts
        subscription_key = f"{organization_id}_{user_id}"
        self.alert_subscriptions[subscription_key] = {
            "user_id": user_id,
            "organization_id": organization_id,
            "subscribed_types": alert_types,
            "subscribed_at": datetime.utcnow(),
            "active": True
        }
        
        # Generate sample alerts
        sample_alerts = []
        for alert_type in alert_types[:3]:  # Limit to 3 sample alerts
            sample_alerts.append(self._generate_sample_alert(alert_type, organization_id))
        
        return {
            "subscription_id": subscription_key,
            "user_id": user_id,
            "organization_id": organization_id,
            "subscribed_types": alert_types,
            "sample_alerts": sample_alerts,
            "websocket_url": f"ws://localhost:8000/ws/alerts/{subscription_key}",
            "subscription_active": True,
            "message": "Successfully subscribed to real-time alerts"
        }
    
    async def live_location_tracking(self, driver_id: int, organization_id: int) -> Dict[str, Any]:
        """Mock Live Location Tracking"""
        
        # Generate initial location
        base_location = {
            "lat": 12.9716 + random.uniform(-0.5, 0.5),
            "lng": 77.5946 + random.uniform(-0.5, 0.5)
        }
        
        # Store driver location
        tracking_key = f"{organization_id}_{driver_id}"
        self.driver_locations[tracking_key] = {
            "driver_id": driver_id,
            "organization_id": organization_id,
            "current_location": base_location,
            "last_update": datetime.utcnow(),
            "tracking_active": True,
            "vehicle_id": random.randint(1, 100)
        }
        
        # Generate location history
        location_history = []
        for i in range(10):
            timestamp = datetime.utcnow() - timedelta(minutes=i * 5)
            location = {
                "lat": base_location["lat"] + random.uniform(-0.01, 0.01),
                "lng": base_location["lng"] + random.uniform(-0.01, 0.01),
                "timestamp": timestamp.isoformat(),
                "speed": random.uniform(20, 80),
                "heading": random.uniform(0, 360),
                "accuracy": random.uniform(5, 15)
            }
            location_history.append(location)
        
        return {
            "driver_id": driver_id,
            "organization_id": organization_id,
            "current_location": base_location,
            "last_update": datetime.utcnow().isoformat(),
            "tracking_active": True,
            "vehicle_id": self.driver_locations[tracking_key]["vehicle_id"],
            "location_history": location_history,
            "websocket_url": f"ws://localhost:8000/ws/location/{tracking_key}",
            "update_frequency": "30_seconds",
            "tracking_accuracy": "high"
        }
    
    async def session_management(self, user_id: int, action: str, session_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Mock Session Management"""
        
        session_key = f"session_{user_id}"
        
        if action == "login":
            # Create new session
            session_token = self._generate_session_token()
            session_info = {
                "user_id": user_id,
                "session_token": session_token,
                "created_at": datetime.utcnow(),
                "expires_at": datetime.utcnow() + timedelta(hours=24),
                "ip_address": session_data.get("ip_address", "192.168.1.100"),
                "user_agent": session_data.get("user_agent", "Mozilla/5.0"),
                "device_info": session_data.get("device_info", {}),
                "active": True
            }
            
            self.active_sessions[session_key] = session_info
            
            return {
                "success": True,
                "action": "login",
                "session_token": session_token,
                "expires_at": session_info["expires_at"].isoformat(),
                "session_duration_hours": 24,
                "message": "Session created successfully"
            }
        
        elif action == "logout":
            # Remove session
            if session_key in self.active_sessions:
                del self.active_sessions[session_key]
                return {
                    "success": True,
                    "action": "logout",
                    "message": "Session terminated successfully"
                }
            else:
                return {
                    "success": False,
                    "action": "logout",
                    "message": "No active session found",
                    "error": "session_not_found"
                }
        
        elif action == "verify":
            # Verify session
            session_info = self.active_sessions.get(session_key)
            if session_info and session_info["active"]:
                if datetime.utcnow() < session_info["expires_at"]:
                    return {
                        "success": True,
                        "action": "verify",
                        "session_valid": True,
                        "expires_at": session_info["expires_at"].isoformat(),
                        "time_remaining_hours": (session_info["expires_at"] - datetime.utcnow()).total_seconds() / 3600
                    }
                else:
                    # Session expired
                    del self.active_sessions[session_key]
                    return {
                        "success": False,
                        "action": "verify",
                        "session_valid": False,
                        "message": "Session expired",
                        "error": "session_expired"
                    }
            else:
                return {
                    "success": False,
                    "action": "verify",
                    "session_valid": False,
                    "message": "No active session found",
                    "error": "session_not_found"
                }
        
        else:
            return {
                "success": False,
                "message": "Invalid action",
                "error": "invalid_action"
            }
    
    async def push_notification(self, user_ids: List[int], notification_data: Dict[str, Any]) -> Dict[str, Any]:
        """Mock Push Notification Service"""
        
        notification_id = f"notif_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}"
        
        # Create notification
        notification = {
            "id": notification_id,
            "title": notification_data.get("title", "System Notification"),
            "body": notification_data.get("body", "You have a new notification"),
            "type": notification_data.get("type", "info"),
            "data": notification_data.get("data", {}),
            "created_at": datetime.utcnow().isoformat(),
            "priority": notification_data.get("priority", "normal"),
            "ttl": notification_data.get("ttl", 3600)  # Time to live in seconds
        }
        
        # Mock sending to users
        delivery_results = []
        for user_id in user_ids:
            delivery_results.append({
                "user_id": user_id,
                "delivered": random.choice([True, True, True, False]),  # 75% success rate
                "delivered_at": datetime.utcnow().isoformat() if random.random() > 0.25 else None,
                "device_token": f"token_{user_id}_{random.randint(1000, 9999)}"
            })
        
        successful_deliveries = len([r for r in delivery_results if r["delivered"]])
        
        return {
            "notification_id": notification_id,
            "notification": notification,
            "target_users": user_ids,
            "delivery_results": delivery_results,
            "successful_deliveries": successful_deliveries,
            "failed_deliveries": len(user_ids) - successful_deliveries,
            "delivery_rate": round((successful_deliveries / len(user_ids)) * 100, 1),
            "sent_at": datetime.utcnow().isoformat()
        }
    
    def _generate_sample_alert(self, alert_type: str, organization_id: int) -> Dict[str, Any]:
        """Generate sample alert for demonstration"""
        
        alert_templates = {
            "disruption": {
                "title": "Route Disruption Detected",
                "message": "Traffic accident detected on main route. Alternative routing recommended.",
                "severity": "high"
            },
            "low_stock": {
                "title": "Low Stock Alert",
                "message": "Item 'Electronic Components A' is below minimum threshold.",
                "severity": "medium"
            },
            "route_change": {
                "title": "Route Optimized",
                "message": "AI has found a more efficient route for active delivery.",
                "severity": "low"
            },
            "new_order": {
                "title": "New Order Received",
                "message": "High priority order received from customer ABC Corp.",
                "severity": "medium"
            },
            "vehicle_maintenance": {
                "title": "Vehicle Maintenance Due",
                "message": "Vehicle TR-001 requires scheduled maintenance.",
                "severity": "medium"
            }
        }
        
        template = alert_templates.get(alert_type, alert_templates["disruption"])
        
        return {
            "id": f"alert_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}_{random.randint(1000, 9999)}",
            "type": alert_type,
            "title": template["title"],
            "message": template["message"],
            "severity": template["severity"],
            "organization_id": organization_id,
            "created_at": datetime.utcnow().isoformat(),
            "requires_action": template["severity"] in ["high", "critical"],
            "metadata": {
                "source": "ai_system",
                "confidence": random.uniform(0.75, 0.95),
                "affected_entities": random.randint(1, 5)
            }
        }
    
    def _generate_session_token(self) -> str:
        """Generate mock session token"""
        return f"token_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}_{random.randint(10000, 99999)}"


# Initialize service
firebase_service = FirebaseService()
