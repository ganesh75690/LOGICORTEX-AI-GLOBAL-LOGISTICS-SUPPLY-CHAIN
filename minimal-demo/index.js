const express = require('express');
const app = express();
app.use(express.json());

// Simple AI prediction endpoint for supply chain optimization
app.post('/predict', async (req, res) => {
  try {
    const { data } = req.body;
    
    // Mock AI prediction logic (replace with real ML model later)
    const predictions = {
      // Supply chain optimization predictions
      route_optimization: {
        efficiency: Math.random() * 0.4 + 0.6, // 60-100%
        estimated_savings: Math.random() * 25 + 5, // 5-30%
        confidence: Math.random() * 0.3 + 0.7 // 70-100%
      },
      inventory_management: {
        optimal_stock_level: Math.floor(Math.random() * 1000) + 100,
        reorder_point: Math.floor(Math.random() * 200) + 50,
        stockout_risk: Math.random() * 0.3, // 0-30% risk
        confidence: Math.random() * 0.3 + 0.7
      },
      demand_forecasting: {
        next_period_demand: Math.floor(Math.random() * 500) + 100,
        trend: ['increasing', 'stable', 'decreasing'][Math.floor(Math.random() * 3)],
        seasonality_factor: Math.random() * 0.5 + 0.8,
        confidence: Math.random() * 0.3 + 0.7
      }
    };
    
    const response = {
      status: 'success',
      timestamp: new Date().toISOString(),
      input_data: data,
      predictions: predictions,
      recommendations: [
        "Consider increasing safety stock for high-demand items",
        "Optimize delivery routes to reduce fuel costs",
        "Monitor supplier performance metrics closely",
        "Implement automated reorder triggers"
      ],
      processing_time_ms: Math.floor(Math.random() * 100) + 50,
      model_version: "v1.0-demo"
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Prediction failed',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'supply-chain-ai-demo',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Root endpoint with API info
app.get('/', (req, res) => {
  res.json({
    service: 'Smart Supply Chain AI Demo',
    version: '1.0.0',
    endpoints: {
      'POST /predict': 'AI predictions for supply chain optimization',
      'GET /health': 'Service health check',
      'GET /': 'API information'
    },
    usage_example: {
      predict: {
        method: 'POST',
        url: '/predict',
        body: {
          data: {
            current_inventory: 500,
            demand_forecast: 750,
            supplier_lead_time: 7,
            transport_cost: 150
          }
        }
      }
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Supply Chain AI Demo running on port ${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   POST /predict - AI predictions`);
  console.log(`   GET  /health  - Health check`);
  console.log(`   GET  /        - API info`);
});
