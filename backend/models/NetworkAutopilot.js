const mongoose = require('mongoose');

const networkAutopilotSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['rebalance', 'reroute', 'efficiency', 'congestion'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  impact: {
    onTime: {
      type: Number,
      required: true
    },
    fuel: {
      type: Number,
      required: true
    },
    cost: {
      type: Number,
      required: true
    }
  },
  affected: {
    drivers: {
      type: Number,
      required: true
    },
    routes: {
      type: Number,
      required: true
    },
    suppliers: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['proposed', 'applied', 'rejected'],
    default: 'proposed'
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  proposedAt: {
    type: Date,
    default: Date.now
  },
  appliedAt: {
    type: Date
  },
  rejectedAt: {
    type: Date
  },
  rejectedReason: {
    type: String
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 85
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  estimatedDuration: {
    type: Number, // in minutes
    default: 5
  },
  actualDuration: {
    type: Number // in minutes
  },
  performanceMetrics: {
    beforeOptimization: {
      avgDeliveryTime: Number,
      fuelConsumption: Number,
      costPerDelivery: Number,
      onTimeDeliveryRate: Number
    },
    afterOptimization: {
      avgDeliveryTime: Number,
      fuelConsumption: Number,
      costPerDelivery: Number,
      onTimeDeliveryRate: Number
    }
  },
  relatedDrivers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  }],
  relatedRoutes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route'
  }],
  relatedSuppliers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  }],
  createdBy: {
    type: String,
    default: 'autopilot'
  },
  tags: [{
    type: String
  }],
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Indexes for better performance
networkAutopilotSchema.index({ type: 1, status: 1 });
networkAutopilotSchema.index({ proposedAt: -1 });
networkAutopilotSchema.index({ appliedAt: -1 });
networkAutopilotSchema.index({ priority: 1, status: 1 });

// Static methods
networkAutopilotSchema.statics = {
  // Get recent optimizations
  async getRecentOptimizations(limit = 10) {
    return this.find()
      .sort({ proposedAt: -1 })
      .limit(limit)
      .populate('relatedDrivers', 'name currentLoad')
      .populate('relatedRoutes', 'routeNumber status')
      .populate('relatedSuppliers', 'name location');
  },

  // Get optimizations by type
  async getOptimizationsByType(type, limit = 20) {
    return this.find({ type })
      .sort({ proposedAt: -1 })
      .limit(limit);
  },

  // Get applied optimizations within date range
  async getAppliedOptimizations(startDate, endDate) {
    return this.find({
      status: 'applied',
      appliedAt: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ appliedAt: -1 });
  },

  // Get optimization statistics
  async getOptimizationStats() {
    const stats = await this.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          avgOnTime: { $avg: '$impact.onTime' },
          avgFuel: { $avg: '$impact.fuel' },
          avgCost: { $avg: '$impact.cost' }
        }
      }
    ]);

    const totalOptimizations = await this.countDocuments();
    const appliedOptimizations = await this.countDocuments({ status: 'applied' });

    return {
      totalOptimizations,
      appliedOptimizations,
      applicationRate: totalOptimizations > 0 ? (appliedOptimizations / totalOptimizations * 100).toFixed(1) : 0,
      byType: stats
    };
  },

  // Get performance metrics
  async getPerformanceMetrics() {
    const optimizations = await this.find({ 
      status: 'applied',
      'performanceMetrics.afterOptimization': { $exists: true }
    });

    if (optimizations.length === 0) {
      return null;
    }

    const totalBefore = optimizations.reduce((acc, opt) => {
      acc.avgDeliveryTime += opt.performanceMetrics.beforeOptimization.avgDeliveryTime || 0;
      acc.fuelConsumption += opt.performanceMetrics.beforeOptimization.fuelConsumption || 0;
      acc.costPerDelivery += opt.performanceMetrics.beforeOptimization.costPerDelivery || 0;
      acc.onTimeDeliveryRate += opt.performanceMetrics.beforeOptimization.onTimeDeliveryRate || 0;
      return acc;
    }, { avgDeliveryTime: 0, fuelConsumption: 0, costPerDelivery: 0, onTimeDeliveryRate: 0 });

    const totalAfter = optimizations.reduce((acc, opt) => {
      acc.avgDeliveryTime += opt.performanceMetrics.afterOptimization.avgDeliveryTime || 0;
      acc.fuelConsumption += opt.performanceMetrics.afterOptimization.fuelConsumption || 0;
      acc.costPerDelivery += opt.performanceMetrics.afterOptimization.costPerDelivery || 0;
      acc.onTimeDeliveryRate += opt.performanceMetrics.afterOptimization.onTimeDeliveryRate || 0;
      return acc;
    }, { avgDeliveryTime: 0, fuelConsumption: 0, costPerDelivery: 0, onTimeDeliveryRate: 0 });

    const count = optimizations.length;
    
    return {
      beforeOptimization: {
        avgDeliveryTime: totalBefore.avgDeliveryTime / count,
        fuelConsumption: totalBefore.fuelConsumption / count,
        costPerDelivery: totalBefore.costPerDelivery / count,
        onTimeDeliveryRate: totalBefore.onTimeDeliveryRate / count
      },
      afterOptimization: {
        avgDeliveryTime: totalAfter.avgDeliveryTime / count,
        fuelConsumption: totalAfter.fuelConsumption / count,
        costPerDelivery: totalAfter.costPerDelivery / count,
        onTimeDeliveryRate: totalAfter.onTimeDeliveryRate / count
      },
      improvements: {
        avgDeliveryTime: ((totalBefore.avgDeliveryTime - totalAfter.avgDeliveryTime) / count).toFixed(2),
        fuelConsumption: ((totalBefore.fuelConsumption - totalAfter.fuelConsumption) / count).toFixed(2),
        costPerDelivery: ((totalBefore.costPerDelivery - totalAfter.costPerDelivery) / count).toFixed(2),
        onTimeDeliveryRate: ((totalAfter.onTimeDeliveryRate - totalBefore.onTimeDeliveryRate) / count).toFixed(2)
      }
    };
  },

  // Get optimization trends
  async getOptimizationTrends(days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const dailyStats = await this.aggregate([
      {
        $match: {
          proposedAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$proposedAt" } },
            type: "$type"
          },
          count: { $sum: 1 },
          avgOnTime: { $avg: "$impact.onTime" },
          avgFuel: { $avg: "$impact.fuel" }
        }
      },
      {
        $sort: { "_id.date": 1 }
      }
    ]);

    return dailyStats;
  },

  // Get pending optimizations
  async getPendingOptimizations() {
    return this.find({ status: 'proposed' })
      .sort({ priority: -1, proposedAt: -1 })
      .populate('relatedDrivers', 'name currentLoad')
      .populate('relatedRoutes', 'routeNumber status');
  },

  // Reject optimization
  async rejectOptimization(id, reason) {
    return this.findByIdAndUpdate(id, {
      status: 'rejected',
      rejectedAt: new Date(),
      rejectedReason: reason
    });
  }
};

// Instance methods
networkAutopilotSchema.methods = {
  // Apply optimization
  async applyOptimization(performanceMetrics = {}) {
    this.status = 'applied';
    this.appliedAt = new Date();
    
    if (Object.keys(performanceMetrics).length > 0) {
      this.performanceMetrics = {
        beforeOptimization: performanceMetrics.before || {},
        afterOptimization: performanceMetrics.after || {}
      };
    }

    return this.save();
  },

  // Get duration
  getDuration() {
    if (this.appliedAt && this.proposedAt) {
      const duration = (this.appliedAt - this.proposedAt) / (1000 * 60); // in minutes
      return Math.round(duration * 100) / 100;
    }
    return null;
  },

  // Get efficiency score
  getEfficiencyScore() {
    const totalImpact = Math.abs(this.impact.onTime) + Math.abs(this.impact.fuel) + Math.abs(this.impact.cost);
    const maxPossibleImpact = 50; // Maximum possible impact score
    
    return Math.min(100, (totalImpact / maxPossibleImpact) * 100);
  },

  // To JSON with custom formatting
  toJSON() {
    const obj = this.toObject();
    obj.duration = this.getDuration();
    obj.efficiencyScore = this.getEfficiencyScore();
    return obj;
  }
};

// Virtual fields
networkAutopilotSchema.virtual('durationMinutes').get(function() {
  return this.getDuration();
});

networkAutopilotSchema.virtual('efficiencyScore').get(function() {
  return this.getEfficiencyScore();
});

// Pre-save middleware
networkAutopilotSchema.pre('save', function(next) {
  // Update related entities when optimization is applied
  if (this.isModified('status') && this.status === 'applied') {
    // This will be handled by the controller
  }
  next();
});

const NetworkAutopilot = mongoose.model('NetworkAutopilot', networkAutopilotSchema);

module.exports = NetworkAutopilot;
