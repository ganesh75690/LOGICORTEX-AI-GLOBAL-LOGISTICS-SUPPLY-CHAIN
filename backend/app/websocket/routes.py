from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from typing import Dict, Any
import json
import logging
import asyncio
from datetime import datetime

from app.websocket.manager import manager
from app.services.firebase_real import real_firebase_service

router = APIRouter()
security = HTTPBearer()
logger = logging.getLogger(__name__)


@router.websocket("/ws/alerts/{connection_id}")
async def websocket_alerts(websocket: WebSocket, connection_id: str):
    """WebSocket endpoint for real-time alerts"""
    try:
        # Extract metadata from connection_id
        # Format: "org_{organization_id}" or "user_{user_id}"
        metadata = {}
        if connection_id.startswith("org_"):
            metadata["type"] = "organization"
            metadata["organization_id"] = connection_id.replace("org_", "")
        elif connection_id.startswith("user_"):
            metadata["type"] = "user"
            metadata["user_id"] = connection_id.replace("user_", "")
        elif connection_id.startswith("driver_"):
            metadata["type"] = "driver"
            metadata["driver_id"] = connection_id.replace("driver_", "")
        
        await manager.connect(websocket, connection_id, metadata)
        
        try:
            while True:
                # Receive message from client
                data = await websocket.receive_text()
                message = json.loads(data)
                
                # Handle different message types
                await handle_websocket_message(websocket, connection_id, message)
                
        except WebSocketDisconnect:
            manager.disconnect(websocket)
            logger.info(f"WebSocket disconnected: {connection_id}")
            
    except Exception as e:
        logger.error(f"WebSocket error for {connection_id}: {e}")
        manager.disconnect(websocket)


@router.websocket("/ws/location/{connection_id}")
async def websocket_location(websocket: WebSocket, connection_id: str):
    """WebSocket endpoint for live location tracking"""
    try:
        metadata = {"type": "location_tracking"}
        await manager.connect(websocket, connection_id, metadata)
        
        try:
            while True:
                # Receive location updates
                data = await websocket.receive_text()
                location_data = json.loads(data)
                
                # Broadcast location to subscribers
                if connection_id.startswith("driver_"):
                    driver_id = int(connection_id.replace("driver_", ""))
                    await manager.broadcast_location_update(driver_id, location_data)
                
        except WebSocketDisconnect:
            manager.disconnect(websocket)
            logger.info(f"Location WebSocket disconnected: {connection_id}")
            
    except Exception as e:
        logger.error(f"Location WebSocket error for {connection_id}: {e}")
        manager.disconnect(websocket)


@router.websocket("/ws/notifications/{user_id}")
async def websocket_notifications(websocket: WebSocket, user_id: int):
    """WebSocket endpoint for user notifications"""
    try:
        connection_id = f"user_{user_id}"
        metadata = {"type": "notifications", "user_id": user_id}
        await manager.connect(websocket, connection_id, metadata)
        
        try:
            while True:
                # Keep connection alive and handle incoming messages
                data = await websocket.receive_text()
                message = json.loads(data)
                
                # Handle notification-specific messages
                if message.get("type") == "ping":
                    await manager.send_personal_message(websocket, {
                        "type": "pong",
                        "timestamp": datetime.utcnow().isoformat()
                    })
                
        except WebSocketDisconnect:
            manager.disconnect(websocket)
            logger.info(f"Notifications WebSocket disconnected: user_{user_id}")
            
    except Exception as e:
        logger.error(f"Notifications WebSocket error for user_{user_id}: {e}")
        manager.disconnect(websocket)


async def handle_websocket_message(websocket: WebSocket, connection_id: str, message: Dict[str, Any]):
    """Handle incoming WebSocket messages"""
    message_type = message.get("type")
    
    if message_type == "subscribe":
        # Handle subscription to specific alert types
        alert_types = message.get("alert_types", [])
        metadata = manager.connection_metadata.get(websocket, {})
        metadata["subscribed_alerts"] = alert_types
        
        await manager.send_personal_message(websocket, {
            "type": "subscription_confirmed",
            "alert_types": alert_types,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    elif message_type == "unsubscribe":
        # Handle unsubscription
        alert_types = message.get("alert_types", [])
        metadata = manager.connection_metadata.get(websocket, {})
        current_subscriptions = metadata.get("subscribed_alerts", [])
        
        # Remove specified alert types
        updated_subscriptions = [t for t in current_subscriptions if t not in alert_types]
        metadata["subscribed_alerts"] = updated_subscriptions
        
        await manager.send_personal_message(websocket, {
            "type": "unsubscription_confirmed",
            "alert_types": alert_types,
            "remaining_subscriptions": updated_subscriptions,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    elif message_type == "ping":
        # Handle ping/pong for connection health check
        await manager.send_personal_message(websocket, {
            "type": "pong",
            "timestamp": datetime.utcnow().isoformat()
        })
    
    elif message_type == "get_connection_info":
        # Send connection information
        metadata = manager.connection_metadata.get(websocket, {})
        await manager.send_personal_message(websocket, {
            "type": "connection_info",
            "connection_id": connection_id,
            "metadata": metadata,
            "stats": manager.get_connection_stats(),
            "timestamp": datetime.utcnow().isoformat()
        })
    
    else:
        # Handle unknown message types
        await manager.send_personal_message(websocket, {
            "type": "error",
            "message": f"Unknown message type: {message_type}",
            "timestamp": datetime.utcnow().isoformat()
        })


@router.get("/ws/stats")
async def get_websocket_stats():
    """Get WebSocket connection statistics"""
    return {
        "success": True,
        "data": manager.get_connection_stats()
    }


@router.get("/ws/connections")
async def get_websocket_connections():
    """Get detailed WebSocket connection information"""
    return {
        "success": True,
        "data": manager.get_connection_details()
    }


# Helper functions for broadcasting alerts
async def broadcast_alert_to_organization(organization_id: int, alert_data: Dict[str, Any]):
    """Broadcast alert to all users in an organization"""
    await manager.broadcast_to_organization(organization_id, {
        "type": "alert",
        "data": alert_data,
        "timestamp": datetime.utcnow().isoformat()
    })


async def broadcast_alert_to_user(user_id: int, alert_data: Dict[str, Any]):
    """Broadcast alert to specific user"""
    await manager.broadcast_to_user(user_id, {
        "type": "alert",
        "data": alert_data,
        "timestamp": datetime.utcnow().isoformat()
    })


async def broadcast_system_wide_notification(notification: Dict[str, Any]):
    """Broadcast system-wide notification"""
    await manager.broadcast_system_notification(notification)
