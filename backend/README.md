# Smart Supply Chain Platform Backend

Maintenance note: refreshed on 2026-06-13.

A comprehensive demo/prototype backend for an AI-powered Smart Supply Chain & Logistics Platform built with FastAPI and Python.

## 🚀 Features

### 🤖 AI Services (Mock Implementation)
- **Google Vertex AI**: Demand forecasting, disruption prediction, route optimization, anomaly detection
- **Google Gemini**: Natural language queries, AI recommendations, explainable AI
- **Google Maps API**: Route visualization, risk heatmaps, geo-fencing, distance & ETA
- **Firebase**: OTP verification, real-time alerts, live location tracking, session management
- **BigQuery**: Platform analytics, organization reports, demand analytics, driver performance

### 📊 Database Architecture
- **PostgreSQL**: Main data storage (organizations, users, vehicles, routes, orders, inventory, suppliers, warehouses, transactions)
- **MongoDB**: Real-time data & logs (alerts, driver locations, login history, audit logs, notifications)

### 🔐 Authentication & Security
- JWT-based authentication
- OTP verification system
- Session management
- Multi-role access control (admin, driver, supplier)

### 📡 API Endpoints
- Authentication: Login, OTP verification, logout, session management
- Organizations: CRUD operations for organizations
- Drivers: Driver management and tracking
- Vehicles: Vehicle fleet management
- Suppliers: Supplier relationship management
- Inventory: Stock management and tracking
- Routes: Route planning and optimization
- AI Services: All Google services mock implementations
- Analytics: Comprehensive analytics and reporting
- Alerts: Real-time alert management

## 🛠 Tech Stack

- **Backend**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL + MongoDB
- **Authentication**: JWT + OTP (Firebase)
- **Real-time**: WebSocket support + Firebase Realtime Database
- **Caching**: Redis with intelligent cache strategies
- **Rate Limiting**: Advanced rate limiting per endpoint
- **Logging**: Structured logging with security monitoring
- **Mock Services**: All Google services (no real credentials needed)
- **Documentation**: Auto-generated OpenAPI/Swagger docs
- **Containerization**: Docker + Docker Compose
- **Production Ready**: Full middleware stack

## 📋 Prerequisites

- Python 3.8+
- PostgreSQL 12+
- MongoDB 4.4+
- Redis (optional, for caching)

## 🚀 Quick Start

### Option 1: Docker (Recommended for Demo)

```bash
# Clone and navigate to backend
cd backend

# Start all services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

### Option 2: Manual Setup

#### 1. Clone and Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 3. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your configuration (see `.env.example` for all options).

#### 4. Start Required Services

```bash
# Start Redis (for caching)
redis-server

# Start PostgreSQL
createdb supply_chain_db

# Start MongoDB
mongod
```

#### 5. Run the Application

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### 🔥 Firebase Real Demo Setup

The backend includes real Firebase integration:

1. **Service Account**: `firebase_service_account.json` already configured
2. **Frontend Config**: Use `firebase-config.js` in your React app
3. **Real-time Features**: 
   - OTP verification via Firebase Auth
   - Real-time alerts via Firestore
   - Live location tracking via Realtime Database
   - Session management with Firebase tokens

## 📚 API Documentation

Once running, visit:
- **Swagger UI**: `http://localhost:8000/docs` - Interactive API documentation
- **ReDoc**: `http://localhost:8000/redoc` - Alternative documentation view
- **OpenAPI JSON**: `http://localhost:8000/openapi.json` - Raw API schema

### 🚀 New Features Included

#### **🔥 Real-time WebSockets**
```javascript
// Connect to real-time alerts
const ws = new WebSocket('ws://localhost:8000/ws/alerts/org_1');

// Connect to live location tracking
const locationWs = new WebSocket('ws://localhost:8000/ws/location/driver_123');
```

#### **⚡ Redis Caching**
- Intelligent cache strategies for API responses
- Automatic cache invalidation
- Performance monitoring

#### **🛡️ Advanced Rate Limiting**
- Per-endpoint rate limits
- IP and user-based tracking
- Customizable limits (auth: 10/min, AI: 30/min)

#### **📝 Comprehensive Logging**
- Structured JSON logging
- Security event monitoring
- Request/response tracking
- Business event logging

#### **🔧 Production Features**
- Docker containerization
- Health checks
- Graceful shutdown
- Environment-based configuration

## 🔑 Authentication

### Login Flow

1. **Regular Login**:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@supplychain.com",
    "password": "admin123"
  }'
```

2. **OTP Verification** (if required):
```bash
curl -X POST "http://localhost:8000/api/v1/auth/verify-otp" \
  -H "Content-Type: application/json" \
  -d '{
    "contact": "admin@supplychain.com",
    "otp": "123456"
  }'
```

### Mock Users

- **Admin**: `admin@supplychain.com` / `admin123`
- **Driver**: `driver@supplychain.com` / `driver123`
- **Supplier**: `supplier@supplychain.com` / `supplier123`

## 🤖 AI Services Examples

### Demand Forecasting

```bash
curl -X POST "http://localhost:8000/api/v1/ai/demand-forecast" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "PROD-001",
    "date_range": {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31"
    }
  }'
```

### Route Optimization

```bash
curl -X POST "http://localhost:8000/api/v1/ai/route-optimize" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "source": {"lat": 12.9716, "lng": 77.5946},
    "destination": {"lat": 13.0827, "lng": 80.2707},
    "constraints": {
      "avoid_tolls": false,
      "prefer_highways": true
    }
  }'
```

### Natural Language Query

```bash
curl -X POST "http://localhost:8000/api/v1/ai/natural-language-query" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is our current inventory status?",
    "organization_context": {
      "organization_id": 1,
      "role": "admin"
    }
  }'
```

## 📊 Analytics Examples

### Platform Analytics

```bash
curl -X GET "http://localhost:8000/api/v1/analytics/overview?start_date=2024-01-01&end_date=2024-01-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Organization Reports

```bash
curl -X GET "http://localhost:8000/api/v1/analytics/organization/1?start_date=2024-01-01&end_date=2024-01-31" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🏗 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application
│   ├── config.py               # Configuration settings
│   ├── database/
│   │   ├── postgres.py         # PostgreSQL connection
│   │   └── mongodb.py          # MongoDB connection
│   ├── models/
│   │   ├── __init__.py
│   │   └── postgres.py         # SQLAlchemy models
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── mongodb.py          # Pydantic schemas
│   ├── services/
│   │   ├── __init__.py
│   │   ├── vertex_ai.py        # Google Vertex AI mock
│   │   ├── gemini.py           # Google Gemini mock
│   │   ├── google_maps.py      # Google Maps mock
│   │   ├── firebase.py         # Firebase mock
│   │   └── bigquery.py         # BigQuery mock
│   └── routers/
│       ├── __init__.py
│       ├── auth.py             # Authentication endpoints
│       ├── ai_services.py      # AI services endpoints
│       ├── analytics.py        # Analytics endpoints
│       ├── alerts.py           # Alerts endpoints
│       ├── organizations.py    # Organization endpoints
│       ├── drivers.py          # Driver endpoints
│       ├── vehicles.py         # Vehicle endpoints
│       ├── suppliers.py        # Supplier endpoints
│       ├── inventory.py        # Inventory endpoints
│       └── routes.py           # Route endpoints
├── requirements.txt
├── .env
└── README.md
```

## 🧪 Testing

```bash
# Run tests (when implemented)
pytest

# Run with coverage
pytest --cov=app
```

## 🚀 Deployment

### Docker (Recommended)

```bash
# Build image
docker build -t supply-chain-backend .

# Run container
docker run -p 8000:8000 supply-chain-backend
```

### Manual Deployment

```bash
# Install production dependencies
pip install -r requirements.txt

# Run with production server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_URL` | PostgreSQL connection string | Required |
| `MONGODB_URL` | MongoDB connection string | Required |
| `SECRET_KEY` | JWT secret key | Required |
| `DEBUG` | Debug mode | `True` |
| `CORS_ORIGINS` | Allowed CORS origins | `["http://localhost:3000"]` |

### Google Services (Mock)

All Google services use mock implementations - no real API keys required:

- `GOOGLE_VERTEX_AI_API_KEY`: Mock Vertex AI key
- `GOOGLE_GEMINI_API_KEY`: Mock Gemini key  
- `GOOGLE_MAPS_API_KEY`: Mock Maps key
- `FIREBASE_API_KEY`: Mock Firebase key
- `BIGQUERY_API_KEY`: Mock BigQuery key

## 📈 Monitoring & Logging

### Health Check

```bash
curl http://localhost:8000/health
```

### Application Logs

The application provides structured logging for:
- API requests and responses
- Database operations
- AI service calls
- Error tracking
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/docs`
- Review the example requests in this README

## 🎯 Demo Notes

This is a **demo/prototype** for a national-level hackathon. All AI/ML responses are simulated with realistic mock data. No real credentials or external services are required.

### Key Features for Demo:
- ✅ Complete API with all endpoints
- ✅ Realistic mock AI responses
- ✅ Database persistence
- ✅ Authentication flow
- ✅ Real-time features (WebSocket ready)
- ✅ Comprehensive documentation
- ✅ Easy setup and deployment

Perfect for demonstrating supply chain innovation and AI integration! 🚀
