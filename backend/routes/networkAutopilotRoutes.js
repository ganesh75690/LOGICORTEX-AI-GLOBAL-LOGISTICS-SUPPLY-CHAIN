const express = require('express');
const router = express.Router();
const networkAutopilotController = require('../controllers/networkAutopilotController');

// Middleware for authentication and authorization
const authenticateToken = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');

// Get current autopilot status and recent optimizations
router.get('/status', authenticateToken, networkAutopilotController.getStatus);

// Start the autopilot system
router.post('/start', authenticateToken, requireAdmin, networkAutopilotController.startAutopilot);

// Stop the autopilot system
router.post('/stop', authenticateToken, requireAdmin, networkAutopilotController.stopAutopilot);

// Trigger manual optimization
router.post('/optimize', authenticateToken, requireAdmin, networkAutopilotController.triggerOptimization);

// Get optimization history with pagination
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const NetworkAutopilot = require('../models/NetworkAutopilot');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const type = req.query.type;
    const status = req.query.status;
    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    // Build query
    const query = {};
    if (type) query.type = type;
    if (status) query.status = status;
    if (startDate || endDate) {
      query.proposedAt = {};
      if (startDate) query.proposedAt.$gte = startDate;
      if (endDate) query.proposedAt.$lte = endDate;
    }

    const optimizations = await NetworkAutopilot.find(query)
      .sort({ proposedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('relatedDrivers', 'name currentLoad')
      .populate('relatedRoutes', 'routeNumber status')
      .populate('relatedSuppliers', 'name location');

    const total = await NetworkAutopilot.countDocuments(query);

    res.json({
      optimizations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error getting optimization history:', error);
    res.status(500).json({ message: 'Failed to get optimization history' });
  }
});

// Get optimization statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const NetworkAutopilot = require('../models/NetworkAutopilot');
    
    const stats = await NetworkAutopilot.getOptimizationStats();
    const performanceMetrics = await NetworkAutopilot.getPerformanceMetrics();
    const trends = await NetworkAutopilot.getOptimizationTrends(30);

    res.json({
      stats,
      performanceMetrics,
      trends,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error getting optimization stats:', error);
    res.status(500).json({ message: 'Failed to get optimization stats' });
  }
});

// Get pending optimizations
router.get('/pending', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const NetworkAutopilot = require('../models/NetworkAutopilot');
    const pendingOptimizations = await NetworkAutopilot.getPendingOptimizations();

    res.json({
      pendingOptimizations,
      count: pendingOptimizations.length
    });
  } catch (error) {
    console.error('Error getting pending optimizations:', error);
    res.status(500).json({ message: 'Failed to get pending optimizations' });
  }
});

// Apply optimization manually
router.post('/apply/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const NetworkAutopilot = require('../models/NetworkAutopilot');
    const optimization = await NetworkAutopilot.findById(req.params.id);

    if (!optimization) {
      return res.status(404).json({ message: 'Optimization not found' });
    }

    if (optimization.status !== 'proposed') {
      return res.status(400).json({ message: 'Optimization cannot be applied' });
    }

    const performanceMetrics = req.body.performanceMetrics || {};
    await optimization.applyOptimization(performanceMetrics);

    res.json({
      message: 'Optimization applied successfully',
      optimization
    });
  } catch (error) {
    console.error('Error applying optimization:', error);
    res.status(500).json({ message: 'Failed to apply optimization' });
  }
});

// Reject optimization
router.post('/reject/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const NetworkAutopilot = require('../models/NetworkAutopilot');
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: 'Rejection reason is required' });
    }

    const optimization = await NetworkAutopilot.rejectOptimization(req.params.id, reason);

    if (!optimization) {
      return res.status(404).json({ message: 'Optimization not found' });
    }

    res.json({
      message: 'Optimization rejected successfully',
      optimization
    });
  } catch (error) {
    console.error('Error rejecting optimization:', error);
    res.status(500).json({ message: 'Failed to reject optimization' });
  }
});

// Get optimization details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const NetworkAutopilot = require('../models/NetworkAutopilot');
    const optimization = await NetworkAutopilot.findById(req.params.id)
      .populate('relatedDrivers', 'name currentLoad location')
      .populate('relatedRoutes', 'routeNumber status waypoints')
      .populate('relatedSuppliers', 'name location contactInfo');

    if (!optimization) {
      return res.status(404).json({ message: 'Optimization not found' });
    }

    res.json(optimization);
  } catch (error) {
    console.error('Error getting optimization details:', error);
    res.status(500).json({ message: 'Failed to get optimization details' });
  }
});

// Get optimization types summary
router.get('/types/summary', authenticateToken, async (req, res) => {
  try {
    const NetworkAutopilot = require('../models/NetworkAutopilot');
    
    const summary = await NetworkAutopilot.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          applied: {
            $sum: {
              $cond: [{ $eq: ['$status', 'applied'] }, 1, 0]
            }
          },
          rejected: {
            $sum: {
              $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0]
            }
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ['$status', 'proposed'] }, 1, 0]
            }
          },
          avgImpact: {
            $avg: {
              $add: ['$impact.onTime', '$impact.fuel', '$impact.cost']
            }
          },
          lastOptimization: { $max: '$proposedAt' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      types: summary,
      totalTypes: summary.length
    });
  } catch (error) {
    console.error('Error getting optimization types summary:', error);
    res.status(500).json({ message: 'Failed to get optimization types summary' });
  }
});

// Get network efficiency metrics
router.get('/efficiency', authenticateToken, async (req, res) => {
  try {
    const NetworkAutopilot = require('../models/NetworkAutopilot');
    const Driver = require('../models/Driver');
    const Route = require('../models/Route');

    // Get current network state
    const totalDrivers = await Driver.countDocuments({ status: 'active' });
    const activeRoutes = await Route.countDocuments({ status: 'pending' });
    const completedRoutes = await Route.countDocuments({ status: 'completed' });

    // Get recent optimizations impact
    const recentOptimizations = await NetworkAutopilot.find({ 
      status: 'applied',
      appliedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
    });

    const totalImpact = recentOptimizations.reduce((acc, opt) => {
      acc.onTime += opt.impact.onTime;
      acc.fuel += Math.abs(opt.impact.fuel);
      acc.cost += Math.abs(opt.impact.cost);
      return acc;
    }, { onTime: 0, fuel: 0, cost: 0 });

    // Calculate efficiency score
    const baseEfficiency = 85;
    const improvementScore = recentOptimizations.length > 0 
      ? (totalImpact.onTime / recentOptimizations.length) * 0.1 
      : 0;
    const networkEfficiency = Math.min(99, baseEfficiency + improvementScore);

    res.json({
      networkState: {
        totalDrivers,
        activeRoutes,
        completedRoutes,
        utilizationRate: totalDrivers > 0 ? (activeRoutes / totalDrivers * 100).toFixed(1) : 0
      },
      recentImpact: {
        optimizationsCount: recentOptimizations.length,
        totalImpact,
        avgImpact: recentOptimizations.length > 0 ? {
          onTime: (totalImpact.onTime / recentOptimizations.length).toFixed(1),
          fuel: (totalImpact.fuel / recentOptimizations.length).toFixed(1),
          cost: (totalImpact.cost / recentOptimizations.length).toFixed(1)
        } : { onTime: 0, fuel: 0, cost: 0 }
      },
      networkEfficiency: networkEfficiency.toFixed(1),
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error getting network efficiency metrics:', error);
    res.status(500).json({ message: 'Failed to get network efficiency metrics' });
  }
});

// Export optimization data
router.get('/export', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const NetworkAutopilot = require('../models/NetworkAutopilot');
    const { format = 'json', startDate, endDate, type } = req.query;

    // Build query
    const query = {};
    if (type) query.type = type;
    if (startDate || endDate) {
      query.proposedAt = {};
      if (startDate) query.proposedAt.$gte = new Date(startDate);
      if (endDate) query.proposedAt.$lte = new Date(endDate);
    }

    const optimizations = await NetworkAutopilot.find(query)
      .sort({ proposedAt: -1 })
      .populate('relatedDrivers', 'name')
      .populate('relatedRoutes', 'routeNumber')
      .populate('relatedSuppliers', 'name');

    if (format === 'csv') {
      // Convert to CSV
      const csv = convertToCSV(optimizations);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=network-autopilot-${Date.now()}.csv`);
      res.send(csv);
    } else {
      // Return JSON
      res.json({
        data: optimizations,
        count: optimizations.length,
        exportedAt: new Date()
      });
    }
  } catch (error) {
    console.error('Error exporting optimization data:', error);
    res.status(500).json({ message: 'Failed to export optimization data' });
  }
});

// Helper function to convert to CSV
function convertToCSV(data) {
  const headers = [
    'ID', 'Type', 'Title', 'Status', 'Impact (On-Time)', 
    'Impact (Fuel)', 'Impact (Cost)', 'Affected Drivers', 
    'Affected Routes', 'Affected Suppliers', 'Proposed At', 'Applied At'
  ];

  const csvRows = [headers.join(',')];

  data.forEach(opt => {
    const row = [
      opt._id,
      opt.type,
      `"${opt.title}"`,
      opt.status,
      opt.impact.onTime,
      opt.impact.fuel,
      opt.impact.cost,
      opt.affected.drivers,
      opt.affected.routes,
      opt.affected.suppliers,
      opt.proposedAt.toISOString(),
      opt.appliedAt ? opt.appliedAt.toISOString() : ''
    ];
    csvRows.push(row.join(','));
  });

  return csvRows.join('\n');
}

module.exports = router;
