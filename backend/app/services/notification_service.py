from typing import Dict, List, Optional
from datetime import datetime, timedelta
import asyncio
from dataclasses import dataclass

@dataclass
class Notification:
    id: str
    type: str
    title: str
    message: str
    recipient: str
    priority: str
    created_at: datetime
    read: bool = False
    metadata: Optional[Dict] = None

class NotificationService:
    def __init__(self):
        self.notifications = []
        self.notification_channels = ["email", "sms", "push", "websocket"]
    
    async def send_dispatch_notification(self, suggestion: Dict, action: str):
        """Send notification for dispatch action"""
        
        # Create notification message based on action
        messages = {
            "start": f"✅ Dispatch started for {suggestion['title']} - {suggestion['packages']} packages on the way",
            "delay": f"⏰ Dispatch delayed for {suggestion['title']} - Rescheduled for later delivery", 
            "split": f"📦 Shipment split for {suggestion['title']} - Divided into smaller batches"
        }
        
        notification = Notification(
            id=f"notif-{datetime.now().timestamp()}",
            type="dispatch_action",
            title=f"Dispatch {action.title()}",
            message=messages[action],
            recipient="dispatcher",
            priority="normal",
            created_at=datetime.now(),
            metadata={
                "suggestion_id": suggestion["id"],
                "action": action,
                "zone": suggestion["zone"],
                "drivers": suggestion["drivers"]
            }
        )
        
        # Send through multiple channels
        await self._send_notification(notification)
        
        return notification
    
    async def send_driver_alert(self, driver_id: str, alert_type: str, message: str):
        """Send alert to specific driver"""
        
        notification = Notification(
            id=f"driver-alert-{datetime.now().timestamp()}",
            type="driver_alert",
            title=f"Driver Alert: {alert_type}",
            message=message,
            recipient=driver_id,
            priority="high",
            created_at=datetime.now(),
            metadata={"alert_type": alert_type}
        )
        
        await self._send_notification(notification)
        return notification
    
    async def send_system_alert(self, alert_type: str, message: str, priority: str = "medium"):
        """Send system-wide alert"""
        
        notification = Notification(
            id=f"system-alert-{datetime.now().timestamp()}",
            type="system_alert",
            title=f"System Alert: {alert_type}",
            message=message,
            recipient="all",
            priority=priority,
            created_at=datetime.now(),
            metadata={"alert_type": alert_type}
        )
        
        await self._send_notification(notification)
        return notification
    
    async def _send_notification(self, notification: Notification):
        """Send notification through configured channels"""
        
        # Store notification
        self.notifications.append(notification)
        
        # Send through different channels based on priority and type
        if notification.priority == "critical":
            # Send through all channels for critical alerts
            await asyncio.gather(
                self._send_email(notification),
                self._send_sms(notification),
                self._send_push_notification(notification),
                self._send_websocket_notification(notification)
            )
        elif notification.priority == "high":
            # Send through email and push for high priority
            await asyncio.gather(
                self._send_email(notification),
                self._send_push_notification(notification),
                self._send_websocket_notification(notification)
            )
        else:
            # Send through websocket for normal priority
            await self._send_websocket_notification(notification)
    
    async def _send_email(self, notification: Notification):
        """Send email notification"""
        # Simulate email sending
        await asyncio.sleep(0.1)
        print(f"📧 Email sent: {notification.title}")
        return {"status": "sent", "channel": "email"}
    
    async def _send_sms(self, notification: Notification):
        """Send SMS notification"""
        # Simulate SMS sending
        await asyncio.sleep(0.2)
        print(f"📱 SMS sent: {notification.message}")
        return {"status": "sent", "channel": "sms"}
    
    async def _send_push_notification(self, notification: Notification):
        """Send push notification"""
        # Simulate push notification
        await asyncio.sleep(0.05)
        print(f"🔔 Push sent: {notification.title}")
        return {"status": "sent", "channel": "push"}
    
    async def _send_websocket_notification(self, notification: Notification):
        """Send websocket notification"""
        # Simulate websocket notification
        await asyncio.sleep(0.01)
        print(f"🌐 WebSocket sent: {notification.title}")
        return {"status": "sent", "channel": "websocket"}
    
    async def get_notifications(self, recipient: str, unread_only: bool = False) -> List[Dict]:
        """Get notifications for recipient"""
        
        filtered_notifications = [
            notif for notif in self.notifications 
            if notif.recipient == recipient or notif.recipient == "all"
        ]
        
        if unread_only:
            filtered_notifications = [n for n in filtered_notifications if not n.read]
        
        # Sort by creation time (newest first)
        filtered_notifications.sort(key=lambda x: x.created_at, reverse=True)
        
        return [
            {
                "id": notif.id,
                "type": notif.type,
                "title": notif.title,
                "message": notif.message,
                "priority": notif.priority,
                "created_at": notif.created_at.isoformat(),
                "read": notif.read,
                "metadata": notif.metadata
            }
            for notif in filtered_notifications
        ]
    
    async def mark_notification_read(self, notification_id: str) -> bool:
        """Mark notification as read"""
        
        for notification in self.notifications:
            if notification.id == notification_id:
                notification.read = True
                return True
        
        return False
    
    async def mark_all_notifications_read(self, recipient: str) -> int:
        """Mark all notifications as read for recipient"""
        
        count = 0
        for notification in self.notifications:
            if (notification.recipient == recipient or notification.recipient == "all") and not notification.read:
                notification.read = True
                count += 1
        
        return count
    
    async def get_notification_stats(self, recipient: str) -> Dict:
        """Get notification statistics"""
        
        user_notifications = [
            notif for notif in self.notifications 
            if notif.recipient == recipient or notif.recipient == "all"
        ]
        
        stats = {
            "total": len(user_notifications),
            "unread": len([n for n in user_notifications if not n.read]),
            "by_type": {},
            "by_priority": {}
        }
        
        # Count by type
        for notif in user_notifications:
            stats["by_type"][notif.type] = stats["by_type"].get(notif.type, 0) + 1
            stats["by_priority"][notif.priority] = stats["by_priority"].get(notif.priority, 0) + 1
        
        return stats
    
    async def cleanup_old_notifications(self, days: int = 30):
        """Clean up old notifications"""
        
        cutoff_date = datetime.now() - timedelta(days=days)
        original_count = len(self.notifications)
        
        self.notifications = [
            notif for notif in self.notifications 
            if notif.created_at > cutoff_date
        ]
        
        cleaned_count = original_count - len(self.notifications)
        
        return {
            "cleaned_count": cleaned_count,
            "remaining_count": len(self.notifications)
        }
