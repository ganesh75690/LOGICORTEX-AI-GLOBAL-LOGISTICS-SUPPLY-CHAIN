# 🚀 Frontend-Backend Integration Guide

Maintenance note: refreshed on 2026-06-13.

## 📋 Prerequisites

1. **Backend Server**: Running at `http://localhost:8000`
2. **Frontend**: React application with TypeScript
3. **Authentication**: JWT tokens stored in localStorage

## 🔗 Integration Steps

### 1. Install Required Dependencies

```bash
npm install axios
npm install @types/node
```

### 2. Update Main App Component

Add the AuthProvider to your `src/app/App.tsx`:

```tsx
import { AuthProvider } from '../contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <YourAppComponents />
    </AuthProvider>
  );
}
```

### 3. Update Login Component

Replace mock login with real backend API:

```tsx
// In your login component
import { useAuth } from '../contexts/AuthContext';

const LoginComponent = () => {
  const { login, isLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      // Navigate to dashboard
    } else {
      // Show error
    }
  };

  // Use mock credentials for testing:
  // Email: admin@supplychain.com
  // Password: admin123
};
```

### 4. Update API Calls in Components

Replace mock data with real API calls:

```tsx
// Example for Inventory Management
import apiClient from '../api/api';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await apiClient.getInventory();
        if (response.success) {
          setInventory(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    // Your inventory component
  );
};
```

### 5. Add Real-time WebSocket Connections

```tsx
// Example for real-time alerts
import { useWebSocket } from '../hooks/useWebSocket';

const AlertsComponent = () => {
  const { isConnected, lastMessage, sendMessage } = useWebSocket(
    'ws://localhost:8000/ws/alerts/org_1',
    {
      onMessage: (message) => {
        if (message.type === 'alert') {
          // Handle real-time alert
          console.log('New alert:', message.data);
        }
      },
    }
  );

  return (
    <div>
      <div>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
      {/* Your alerts UI */}
    </div>
  );
};
```

## 🧪 Testing the Integration

### 1. Test Authentication

```bash
# Test login endpoint
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@supplychain.com",
    "password": "admin123"
  }'
```

### 2. Test API Endpoints

After login, you'll get a token. Use it to test other endpoints:

```bash
# Test organizations endpoint
curl -X GET "http://localhost:8000/api/v1/organizations/" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Test WebSocket Connection

Open browser console and connect to WebSocket:

```javascript
const ws = new WebSocket('ws://localhost:8000/ws/alerts/org_1');
ws.onmessage = (event) => console.log('Message:', JSON.parse(event.data));
```

## 🔧 Available API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/verify-otp` - Verify OTP
- `POST /api/v1/auth/logout` - Logout

### Organizations
- `GET /api/v1/organizations/` - List organizations
- `POST /api/v1/organizations/` - Create organization
- `GET /api/v1/organizations/{id}` - Get organization
- `PUT /api/v1/organizations/{id}` - Update organization
- `DELETE /api/v1/organizations/{id}` - Delete organization

### Drivers
- `GET /api/v1/drivers/` - List drivers
- `POST /api/v1/drivers/` - Create driver
- `GET /api/v1/drivers/{id}` - Get driver

### Vehicles
- `GET /api/v1/vehicles/` - List vehicles
- `POST /api/v1/vehicles/` - Create vehicle
- `GET /api/v1/vehicles/{id}` - Get vehicle

### Suppliers
- `GET /api/v1/suppliers/` - List suppliers
- `POST /api/v1/suppliers/` - Create supplier
- `GET /api/v1/suppliers/{id}` - Get supplier

### Inventory
- `GET /api/v1/inventory/` - List inventory items
- `POST /api/v1/inventory/` - Create inventory item
- `GET /api/v1/inventory/low-stock` - Get low stock items
- `GET /api/v1/inventory/{id}` - Get inventory item

### Routes
- `GET /api/v1/routes/` - List routes
- `POST /api/v1/routes/` - Create route
- `GET /api/v1/routes/{id}` - Get route

### AI Services
- `POST /api/v1/ai/demand-forecast` - Demand forecasting
- `POST /api/v1/ai/disruption-predict` - Disruption prediction
- `POST /api/v1/ai/route-optimize` - Route optimization
- `POST /api/v1/ai/natural-language-query` - Natural language query
- `POST /api/v1/ai/recommendations` - AI recommendations
- `POST /api/v1/ai/explainable-ai` - Explainable AI

### Analytics
- `GET /api/v1/analytics/overview` - Platform analytics
- `GET /api/v1/analytics/organization/{id}` - Organization analytics

### Alerts
- `GET /api/v1/alerts/` - List alerts
- `POST /api/v1/alerts/` - Create alert
- `PUT /api/v1/alerts/{id}/resolve` - Resolve alert

## 🌐 WebSocket Endpoints

### Real-time Alerts
- `ws://localhost:8000/ws/alerts/{connection_id}`

### Live Location Tracking
- `ws://localhost:8000/ws/location/{connection_id}`

### User Notifications
- `ws://localhost:8000/ws/notifications/{user_id}`

## 📱 Example Component Integration

### Updated Inventory Management Component

```tsx
import React, { useState, useEffect } from 'react';
import apiClient from '../api/api';
import { useAuth } from '../contexts/AuthContext';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchInventory();
    fetchLowStockItems();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await apiClient.getInventory();
      if (response.success) {
        setInventory(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLowStockItems = async () => {
    try {
      const response = await apiClient.getLowStockItems();
      if (response.success) {
        setLowStockItems(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch low stock items:', error);
    }
  };

  const createInventoryItem = async (itemData) => {
    try {
      const response = await apiClient.createInventoryItem(itemData);
      if (response.success) {
        fetchInventory(); // Refresh list
        return response.data;
      }
    } catch (error) {
      console.error('Failed to create inventory item:', error);
      throw error;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Inventory Management</h2>
      {/* Your existing UI components */}
      <div>Total Items: {inventory.length}</div>
      <div>Low Stock Alerts: {lowStockItems.length}</div>
    </div>
  );
};

export default InventoryManagement;
```

## 🔥 Firebase Integration

The backend uses real Firebase for authentication and real-time features. To use Firebase in the frontend:

```tsx
import firebaseConfig from '../firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Use Firebase Auth for additional features
```

## 🎯 Demo Credentials

For testing the integration:

- **Admin**: `admin@supplychain.com` / `admin123`
- **Driver**: `driver@supplychain.com` / `driver123`
- **Supplier**: `supplier@supplychain.com` / `supplier123`

## 🚀 Next Steps

1. **Update Components**: Replace mock data with API calls
2. **Add Error Handling**: Implement proper error boundaries
3. **Add Loading States**: Show loading indicators during API calls
4. **Implement Caching**: Cache API responses for better performance
5. **Add Real-time Features**: Connect to WebSocket endpoints
6. **Test Thoroughly**: Test all CRUD operations and real-time features

## 📞 Support

If you encounter any issues:

1. Check the backend server is running at `http://localhost:8000`
2. Verify the token is stored in localStorage after login
3. Check browser console for network errors
4. Test endpoints directly in Swagger UI: `http://localhost:8000/docs`

**🎉 Your frontend is now connected to the production-ready backend!**
