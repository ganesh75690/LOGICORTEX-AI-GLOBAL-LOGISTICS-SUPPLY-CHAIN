const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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

// Mock API endpoints for demo
app.get('/api/drivers', (req, res) => {
  res.json({
    drivers: [
      { id: 1, name: 'John Driver', status: 'active', location: 'Mumbai' },
      { id: 2, name: 'Sarah Driver', status: 'active', location: 'Delhi' },
      { id: 3, name: 'Mike Driver', status: 'inactive', location: 'Bangalore' }
    ]
  });
});

app.get('/api/routes', (req, res) => {
  res.json({
    routes: [
      { id: 1, origin: 'Mumbai', destination: 'Pune', status: 'active' },
      { id: 2, origin: 'Delhi', destination: 'Gurgaon', status: 'pending' },
      { id: 3, origin: 'Bangalore', destination: 'Chennai', status: 'completed' }
    ]
  });
});

app.get('/api/inventory', (req, res) => {
  res.json({
    inventory: [
      { sku: 'SKU001', quantity: 150, warehouse: 'Mumbai' },
      { sku: 'SKU002', quantity: 75, warehouse: 'Delhi' },
      { sku: 'SKU003', quantity: 200, warehouse: 'Bangalore' }
    ]
  });
});

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
    'Access-Control-Allow-Origin': process.env.FRONTEND_URL || 'http://localhost:5173',
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

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server running on port 8080`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Note: Using simplified server for demo`);
});

module.exports = app;
