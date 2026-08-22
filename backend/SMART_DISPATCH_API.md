# Smart Dispatch Optimizer API Documentation

Maintenance note: refreshed on 2026-06-13.

## Overview
The Smart Dispatch Optimizer API provides AI-powered dispatch decision support, real-time driver tracking, and intelligent route optimization.

## Base URL
```
http://localhost:8000/api/v1/smart-dispatch
```

## Authentication
All endpoints require Bearer token authentication (except where noted).

## Endpoints

### Demand Zones
#### GET `/zones`
Get current demand zones with AI-powered predictions.

**Response:**
```json
[
  {
    "id": "zone-a",
    "name": "Zone A - Downtown",
    "demand": 85,
    "demand_trend": "rising",
    "urgency": "high",
    "estimated_orders": 12,
    "time_window": "Next 30 min",
    "ai_prediction": {
      "current": 85,
      "predicted": 110,
      "confidence": 0.92,
      "spike_probability": 0.29
    },
    "recommended_drivers": 3
  }
]
```

### Drivers
#### GET `/drivers`
Get drivers with optional filtering.

**Query Parameters:**
- `search` (optional): Search term for name, location, status, or ID
- `status` (optional): Filter by driver status (available, busy, delayed, offline)

**Response:**
```json
[
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
    "total_deliveries": 247,
    "last_updated": "2024-04-26T11:30:00Z",
    "battery_level": 85,
    "signal_strength": 4
  }
]
```

### Dispatch Suggestions
#### GET `/suggestions`
Get AI-powered dispatch suggestions.

**Query Parameters:**
- `zone_id` (optional): Filter by zone ID
- `priority` (optional): Filter by priority (critical, high, medium, low)
- `limit` (optional): Maximum number of suggestions (default: 10)

**Response:**
```json
[
  {
    "id": "suggestion-1",
    "type": "immediate",
    "priority": "critical",
    "title": "Immediate Dispatch Required - Zone D",
    "description": "High demand spike detected in commercial district",
    "impact": "Prevents 15+ delayed deliveries",
    "estimated_time": "5 min",
    "packages": 8,
    "drivers": ["driver-1", "driver-3"],
    "zone": "Zone D",
    "created_at": "2024-04-26T11:25:00Z",
    "expires_at": "2024-04-26T11:40:00Z",
    "ai_confidence": 0.92,
    "cost_savings": 450.00,
    "risk_score": 0.15
  }
]
```

### Execute Dispatch Action
#### POST `/suggestions/{suggestion_id}/action`
Execute a dispatch action (start, delay, split).

**Path Parameters:**
- `suggestion_id`: ID of the suggestion to act on

**Request Body:**
```json
{
  "action": "start",
  "notes": "Customer requested expedited delivery"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Dispatch start action executed successfully",
  "action_id": "action-1714134300",
  "estimated_completion": "2024-04-26T11:35:00Z"
}
```

### Driver Location
#### GET `/driver/{driver_id}/location`
Get real-time driver location.

**Path Parameters:**
- `driver_id`: ID of the driver

**Response:**
```json
{
  "driver_id": "driver-1",
  "name": "Raj Kumar",
  "coordinates": {"lat": 40.7128, "lng": -74.0060},
  "location": "Zone A",
  "last_updated": "2024-04-26T11:30:00Z",
  "accuracy": 8.5,
  "altitude": 25.3,
  "speed": 35,
  "heading": 45
}
```

### Enable Driver Tracking
#### POST `/driver/{driver_id}/track`
Enable real-time tracking for a driver.

**Path Parameters:**
- `driver_id`: ID of the driver

**Response:**
```json
{
  "success": true,
  "message": "Real-time tracking enabled"
}
```

### Analytics Overview
#### GET `/analytics/overview`
Get dispatch analytics overview.

**Response:**
```json
{
  "total_orders": 38,
  "active_drivers": 2,
  "average_delivery_time": 12,
  "on_time_rate": 0.94,
  "efficiency_score": 87,
  "zones_status": {
    "Zone A": {"status": "high_demand", "drivers_needed": 3},
    "Zone B": {"status": "moderate", "drivers_needed": 2},
    "Zone C": {"status": "low", "drivers_needed": 1},
    "Zone D": {"status": "critical", "drivers_needed": 4}
  },
  "ai_performance": {
    "suggestions_generated": 156,
    "accuracy_rate": 0.91,
    "user_acceptance_rate": 0.84,
    "cost_savings_total": 2847.50
  }
}
```

### Performance Metrics
#### GET `/performance/metrics`
Get detailed performance metrics.

**Response:**
```json
{
  "dispatch_efficiency": {
    "current": 0.89,
    "target": 0.92,
    "trend": "improving"
  },
  "driver_utilization": {
    "current": 0.76,
    "optimal": 0.80,
    "trend": "stable"
  },
  "cost_per_delivery": {
    "current": 12.45,
    "target": 11.80,
    "trend": "decreasing"
  },
  "ai_accuracy": {
    "prediction_accuracy": 0.91,
    "recommendation_relevance": 0.87,
    "error_rate": 0.09
  }
}
```

### Critical Alerts
#### GET `/alerts/critical`
Get critical dispatch alerts.

**Response:**
```json
[
  {
    "id": "alert-1",
    "type": "critical",
    "title": "High Demand in Zone D",
    "message": "Critical demand spike detected - immediate action required",
    "zone": "Zone D",
    "urgency": "immediate",
    "affected_orders": 15,
    "recommended_action": "Dispatch additional drivers",
    "created_at": "2024-04-26T11:25:00Z"
  }
]
```

### Driver Timeline
#### GET `/timeline/{driver_id}`
Get driver dispatch timeline.

**Path Parameters:**
- `driver_id`: ID of the driver

**Query Parameters:**
- `hours` (optional): Hours of history to fetch (default: 24)

**Response:**
```json
[
  {
    "driver_id": "driver-1",
    "timestamp": "2024-04-26T09:00:00Z",
    "action": "Started shift",
    "location": "Zone A",
    "status": "completed",
    "details": "Daily route planning completed",
    "estimated_duration": 15
  }
]
```

### Recalculate Dispatch
#### POST `/recalculate`
Trigger AI dispatch recalculation.

**Response:**
```json
{
  "success": true,
  "message": "Dispatch recalculation started"
}
```

## WebSocket Events

### Real-time Updates
Connect to `/ws/smart-dispatch` for real-time updates:

**Events:**
- `driver_location_update`: Driver location changes
- `dispatch_action_completed`: Action execution completed
- `new_suggestion`: New AI suggestion generated
- `critical_alert`: New critical alert
- `zone_demand_change`: Zone demand updated

**Example WebSocket Message:**
```json
{
  "type": "driver_location_update",
  "data": {
    "driver_id": "driver-1",
    "coordinates": {"lat": 40.7130, "lng": -74.0062},
    "timestamp": "2024-04-26T11:30:15Z"
  }
}
```

## Error Handling

### Standard Error Response
```json
{
  "detail": "Error message description",
  "status_code": 400,
  "error_code": "VALIDATION_ERROR"
}
```

### Common Error Codes
- `400`: Bad Request - Invalid input parameters
- `401`: Unauthorized - Missing or invalid authentication
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `429`: Rate Limit Exceeded - Too many requests
- `500`: Internal Server Error - Backend error

## Rate Limiting

- **60 requests per minute**
- **1000 requests per hour**
- **10000 requests per day**

## Integration Examples

### JavaScript/TypeScript
```typescript
// Get dispatch suggestions
const response = await fetch('/api/v1/smart-dispatch/suggestions?priority=critical&limit=5', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }
});
const suggestions = await response.json();

// Execute dispatch action
const actionResponse = await fetch('/api/v1/smart-dispatch/suggestions/suggestion-1/action', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    action: 'start',
    notes: 'Expedited delivery requested'
  })
});
```

### Python
```python
import requests

# Get driver location
response = requests.get(
    '/api/v1/smart-dispatch/driver/driver-1/location',
    headers={'Authorization': 'Bearer YOUR_TOKEN'}
)
driver_location = response.json()

# Enable driver tracking
response = requests.post(
    '/api/v1/smart-dispatch/driver/driver-1/track',
    headers={'Authorization': 'Bearer YOUR_TOKEN'}
)
```

## Testing

### Example cURL Commands
```bash
# Get demand zones
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/v1/smart-dispatch/zones

# Get drivers with search
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8000/api/v1/smart-dispatch/drivers?search=Raj"

# Execute dispatch action
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action": "start", "notes": "Urgent delivery"}' \
  http://localhost:8000/api/v1/smart-dispatch/suggestions/suggestion-1/action
```

## Features

### AI-Powered Capabilities
- **Demand Prediction**: ML-based demand forecasting
- **Route Optimization**: Intelligent route planning
- **Driver Assignment**: Optimal driver-to-order matching
- **Risk Assessment**: Real-time risk evaluation
- **Cost Optimization**: Automated cost reduction strategies

### Real-time Features
- **Live Driver Tracking**: GPS-based location monitoring
- **Dynamic Updates**: Real-time status changes
- **WebSocket Integration**: Instant notifications
- **Performance Monitoring**: Live metrics tracking

### Analytics & Reporting
- **Performance Metrics**: Comprehensive KPI tracking
- **Trend Analysis**: Historical data insights
- **Cost Analysis**: Financial impact assessment
- **Efficiency Reports**: Operational optimization insights
