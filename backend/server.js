const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: require('./package.json').version
  });
});

// API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/drivers', driverRoutes);
// app.use('/api/suppliers', supplierRoutes);
// app.use('/api/routes', routeRoutes);
// app.use('/api/inventory', inventoryRoutes);
// app.use('/api/network-autopilot', networkAutopilotRoutes);

// GASDF Routes
const GASDFController = require('./controllers/gasdfController');
const gasdfController = new GASDFController();

app.get('/api/gasdf/briefing', (req, res) => gasdfController.getExecutiveBriefing(req, res));
app.get('/api/gasdf/dashboard', (req, res) => gasdfController.getDashboardData(req, res));
app.post('/api/gasdf/decisions', (req, res) => gasdfController.createDecision(req, res));
app.get('/api/gasdf/decisions', (req, res) => gasdfController.getAllDecisions(req, res));
app.get('/api/gasdf/decisions/:id', (req, res) => gasdfController.getDecision(req, res));
app.put('/api/gasdf/decisions/:id', (req, res) => gasdfController.updateDecision(req, res));
app.get('/api/gasdf/opportunities', (req, res) => gasdfController.getOpportunities(req, res));
app.get('/api/gasdf/opportunities/:id', (req, res) => gasdfController.getOpportunity(req, res));
app.get('/api/gasdf/learning', (req, res) => gasdfController.getLearningData(req, res));
app.post('/api/gasdf/learning', (req, res) => gasdfController.recordDecisionLearning(req, res));
app.post('/api/gasdf/decisions/:id/analyze', (req, res) => gasdfController.analyzeDecision(req, res));
app.get('/api/gasdf/decisions/:id/ripple', (req, res) => gasdfController.calculateRippleEffects(req, res));
app.get('/api/gasdf/decisions/:id/genome', (req, res) => gasdfController.generateDecisionGenome(req, res));
app.get('/api/gasdf/decisions/:id/consequences', (req, res) => gasdfController.calculateConsequences(req, res));
app.get('/api/gasdf/decisions/:id/harmony', (req, res) => gasdfController.generateDecisionHarmony(req, res));
app.get('/api/gasdf/decisions/:id/evolution', (req, res) => gasdfController.generateDecisionEvolution(req, res));
app.post('/api/gasdf/decisions/:id/approval', (req, res) => gasdfController.createApprovalRequest(req, res));
app.post('/api/gasdf/decisions/:id/approval/action', (req, res) => gasdfController.processApprovalAction(req, res));

// Network Autopilot WebSocket support
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection for Network Autopilot');
  
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      
      // Handle different WebSocket message types
      switch (data.type) {
        case 'subscribe_autopilot':
          // Subscribe to autopilot updates
          ws.autopilotSubscribed = true;
          ws.send(JSON.stringify({
            type: 'subscribed',
            message: 'Subscribed to autopilot updates'
          }));
          break;
          
        case 'unsubscribe_autopilot':
          ws.autopilotSubscribed = false;
          ws.send(JSON.stringify({
            type: 'unsubscribed',
            message: 'Unsubscribed from autopilot updates'
          }));
          break;
          
        default:
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Unknown message type'
          }));
      }
    } catch (error) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format'
      }));
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Function to broadcast autopilot updates to all connected clients
function broadcastAutopilotUpdate(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.autopilotSubscribed) {
      client.send(JSON.stringify({
        type: 'autopilot_update',
        data,
        timestamp: new Date().toISOString()
      }));
    }
  });
}

// Make broadcast function available globally
global.broadcastAutopilotUpdate = broadcastAutopilotUpdate;

// Server-Sent Events for real-time updates
app.get('/api/network-autopilot/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': process.env.FRONTEND_URL || 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true'
  });

  // Send initial connection message
  res.write('data: {"type":"connected","message":"Connected to Network Autopilot stream"}\n\n');

  // Set up interval to send periodic updates
  const interval = setInterval(() => {
    const data = {
      type: 'heartbeat',
      timestamp: new Date().toISOString(),
      status: 'active'
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 30000); // Send heartbeat every 30 seconds

  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

// Database connection (disabled for demo)
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartchain', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Connected to MongoDB');
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`WebSocket server running on port 8080`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Note: MongoDB connection disabled for demo`);
  });
// })
// .catch((error) => {
//   console.error('Database connection error:', error);
//   process.exit(1);
// });

// Error handling middleware
// app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM received, shutting down gracefully');
//   mongoose.connection.close(() => {
//     console.log('MongoDB connection closed');
//     process.exit(0);
//   });
// });

// process.on('SIGINT', () => {
//   console.log('SIGINT received, shutting down gracefully');
//   mongoose.connection.close(() => {
//     console.log('MongoDB connection closed');
//     process.exit(0);
//   });
// });

module.exports = app;
