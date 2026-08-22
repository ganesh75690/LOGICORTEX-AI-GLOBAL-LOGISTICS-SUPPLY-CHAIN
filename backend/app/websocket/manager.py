from typing import Dict, List, Set
from fastapi import WebSocket, WebSocketDisconnect
import json
import asyncio
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class ConnectionManager:
    """WebSocket connection manager for real-time alerts"""
    
    def __init__(self):
        # Store active connections by user/organization
        self.active_connections: Dict[str, Set[WebSocket]] = {}
        # Store connection metadata
        self.connection_metadata: Dict[WebSocket, Dict] = {}
        
    async def connect(self, websocket: WebSocket, connection_id: str, metadata: Dict = None):
        """Accept and store WebSocket connection"""
        await websocket.accept()
        
        if connection_id not in self.active_connections:
            self.active_connections[connection_id] = set()
        
        self.active_connections[connection_id].add(websocket)
        self.connection_metadata[websocket] = {
            "connection_id": connection_id,
            "connected_at": datetime.utcnow().isoformat(),
            "metadata": metadata or {}
        }
        
        logger.info(f"WebSocket connected: {connection_id}")
        
        # Send welcome message
        await self.send_personal_message(websocket, {
            "type": "connection_established",
            "message": "Connected to real-time alerts",
            "connection_id": connection_id,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    def disconnect(self, websocket: WebSocket):
        """Remove WebSocket connection"""
        metadata = self.connection_metadata.get(websocket)
        if metadata:
            connection_id = metadata["connection_id"]
            
            if connection_id in self.active_connections:
                self.active_connections[connection_id].discard(websocket)
                if not self.active_connections[connection_id]:
                    del self.active_connections[connection_id]
            
            del self.connection_metadata[websocket]
            logger.info(f"WebSocket disconnected: {connection_id}")
    
    async def send_personal_message(self, websocket: WebSocket, message: Dict):
        """Send message to specific WebSocket"""
        try:
            await websocket.send_text(json.dumps(message))
        except Exception as e:
            logger.error(f"Error sending personal message: {e}")
            self.disconnect(websocket)
    
    async def broadcast_to_connection(self, connection_id: str, message: Dict):
        """Broadcast message to all connections with specific ID"""
        if connection_id in self.active_connections:
            disconnected = []
            for connection in self.active_connections[connection_id].copy():
                try:
                    await connection.send_text(json.dumps(message))
                except Exception as e:
                    logger.error(f"Error broadcasting to {connection_id}: {e}")
                    disconnected.append(connection)
            
            # Remove disconnected connections
            for connection in disconnected:
                self.disconnect(connection)
    
    async def broadcast_to_organization(self, organization_id: int, message: Dict):
        """Broadcast message to all connections in an organization"""
        org_connection_id = f"org_{organization_id}"
        await self.broadcast_to_connection(org_connection_id, message)
    
    async def broadcast_to_user(self, user_id: int, message: Dict):
        """Broadcast message to specific user"""
        user_connection_id = f"user_{user_id}"
        await self.broadcast_to_connection(user_connection_id, message)
    
    async def broadcast_alert(self, alert_data: Dict):
        """Broadcast alert to relevant users"""
        organization_id = alert_data.get("organization_id")
        user_ids = alert_data.get("user_ids", [])
        
        # Broadcast to organization
        if organization_id:
            await self.broadcast_to_organization(organization_id, {
                "type": "alert",
                "data": alert_data,
                "timestamp": datetime.utcnow().isoformat()
            })
        
        # Broadcast to specific users
        for user_id in user_ids:
            await self.broadcast_to_user(user_id, {
                "type": "alert",
                "data": alert_data,
                "timestamp": datetime.utcnow().isoformat()
            })
    
    async def broadcast_location_update(self, driver_id: int, location_data: Dict):
        """Broadcast driver location update"""
        await self.broadcast_to_connection(f"driver_{driver_id}", {
            "type": "location_update",
            "driver_id": driver_id,
            "data": location_data,
            "timestamp": datetime.utcnow().isoformat()
        })
    
    async def broadcast_system_notification(self, notification: Dict):
        """Broadcast system-wide notification"""
        message = {
            "type": "system_notification",
            "data": notification,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        # Send to all active connections
        all_connections = set()
        for connections in self.active_connections.values():
            all_connections.update(connections)
        
        disconnected = []
        for connection in all_connections:
            try:
                await connection.send_text(json.dumps(message))
            except Exception as e:
                logger.error(f"Error broadcasting system notification: {e}")
                disconnected.append(connection)
        
        # Remove disconnected connections
        for connection in disconnected:
            self.disconnect(connection)
    
    def get_connection_stats(self) -> Dict:
        """Get connection statistics"""
        total_connections = sum(len(conns) for conns in self.active_connections.values())
        
        return {
            "total_connections": total_connections,
            "active_connection_ids": list(self.active_connections.keys()),
            "connections_per_id": {
                conn_id: len(conns) for conn_id, conns in self.active_connections.items()
            },
            "timestamp": datetime.utcnow().isoformat()
        }
    
    def get_connection_details(self) -> List[Dict]:
        """Get detailed connection information"""
        details = []
        for websocket, metadata in self.connection_metadata.items():
            details.append({
                **metadata,
                "is_connected": websocket in sum(self.active_connections.values(), set())
            })
        return details


# Global connection manager instance
manager = ConnectionManager()
