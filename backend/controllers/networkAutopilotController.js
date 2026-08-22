const NetworkAutopilot = require('../models/NetworkAutopilot');
// const Driver = require('../models/Driver');
// const Route = require('../models/Route');
// const Supplier = require('../models/Supplier');

class NetworkAutopilotController {
  constructor() {
    this.isRunning = false;
    this.optimizationInterval = null;
    this.stats = {
      totalOptimizations: 0,
      avgOnTimeImprovement: 0,
      avgFuelReduction: 0,
      costSavings: 0,
      networkEfficiency: 0,
      lastOptimization: null
    };
  }

  // Start the autopilot system
  async startAutopilot(req, res) {
    try {
      if (this.isRunning) {
        return res.status(400).json({ 
          message: 'Autopilot is already running' 
        });
      }

      this.isRunning = true;
      this.startOptimizationLoop();

      res.json({ 
        message: 'Network Autopilot started',
        status: 'running',
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error starting autopilot:', error);
      res.status(500).json({ message: 'Failed to start autopilot' });
    }
  }

  // Stop the autopilot system
  async stopAutopilot(req, res) {
    try {
      if (!this.isRunning) {
        return res.status(400).json({ 
          message: 'Autopilot is not running' 
        });
      }

      this.isRunning = false;
      if (this.optimizationInterval) {
        clearInterval(this.optimizationInterval);
        this.optimizationInterval = null;
      }

      res.json({ 
        message: 'Network Autopilot stopped',
        status: 'stopped',
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error stopping autopilot:', error);
      res.status(500).json({ message: 'Failed to stop autopilot' });
    }
  }

  // Manual optimization trigger
  async triggerOptimization(req, res) {
    try {
      const optimization = await this.performOptimization();
      
      res.json({
        message: 'Manual optimization completed',
        optimization,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error triggering manual optimization:', error);
      res.status(500).json({ message: 'Failed to trigger optimization' });
    }
  }

  // Get current autopilot status
  async getStatus(req, res) {
    try {
      const recentOptimizations = await NetworkAutopilot.getRecentOptimizations(10);
      const currentStats = await this.calculateNetworkStats();

      res.json({
        status: this.isRunning ? 'running' : 'stopped',
        stats: currentStats,
        recentOptimizations,
        lastOptimization: this.stats.lastOptimization
      });
    } catch (error) {
      console.error('Error getting autopilot status:', error);
      res.status(500).json({ message: 'Failed to get status' });
    }
  }

  // Start the continuous optimization loop
  startOptimizationLoop() {
    this.optimizationInterval = setInterval(async () => {
      if (this.isRunning) {
        try {
          await this.performOptimization();
        } catch (error) {
          console.error('Error in optimization loop:', error);
        }
      }
    }, 8000); // Run every 8 seconds
  }

  // Perform a single optimization
  async performOptimization() {
    const optimizationTypes = ['rebalance', 'reroute', 'efficiency', 'congestion'];
    const randomType = optimizationTypes[Math.floor(Math.random() * optimizationTypes.length)];
    
    let optimization;
    
    switch (randomType) {
      case 'rebalance':
        optimization = await this.optimizeRebalance();
        break;
      case 'reroute':
        optimization = await this.optimizeReroute();
        break;
      case 'efficiency':
        optimization = await this.optimizeEfficiency();
        break;
      case 'congestion':
        optimization = await this.optimizeCongestion();
        break;
    }

    // Save optimization to database
    const savedOptimization = await NetworkAutopilot.create(optimization);
    
    // Apply the optimization after 3 seconds
    setTimeout(async () => {
      await this.applyOptimization(savedOptimization);
    }, 3000);

    // Update stats
    this.stats.totalOptimizations++;
    this.stats.lastOptimization = new Date();

    return savedOptimization;
  }

  // Rebalance optimization - redistribute deliveries to nearby drivers
  async optimizeRebalance() {
    const drivers = await Driver.find({ status: 'active' });
    const routes = await Route.find({ status: 'pending' }).populate('assignedDriver');

    // Find drivers with capacity and routes that can be reassigned
    const availableDrivers = drivers.filter(driver => driver.currentLoad < driver.maxCapacity);
    const rebalanceableRoutes = routes.filter(route => 
      route.assignedDriver && route.assignedDriver.currentLoad > route.assignedDriver.maxCapacity * 0.8
    );

    if (availableDrivers.length > 0 && rebalanceableRoutes.length > 0) {
      const routeToRebalance = rebalanceableRoutes[0];
      const targetDriver = availableDrivers[0];

      return {
        type: 'rebalance',
        title: 'Rebalanced 2 stops to nearby driver',
        description: `Driver ${targetDriver.id} took over 2 deliveries from ${routeToRebalance.assignedDriver.id} for optimal route efficiency`,
        impact: {
          onTime: Math.floor(Math.random() * 15) + 5,
          fuel: -(Math.floor(Math.random() * 12) + 3),
          cost: -(Math.floor(Math.random() * 8) + 2)
        },
        affected: {
          drivers: 2,
          routes: 3,
          suppliers: 0
        },
        details: {
          originalDriver: routeToRebalance.assignedDriver.id,
          newDriver: targetDriver.id,
          reassignedStops: 2
        }
      };
    }

    return null;
  }

  // Reroute optimization - avoid congestion and traffic
  async optimizeReroute() {
    const routes = await Route.find({ status: 'pending' });
    
    // Simulate traffic detection
    const congestedRoutes = routes.filter(route => 
      Math.random() > 0.7 // 30% chance of congestion
    );

    if (congestedRoutes.length > 0) {
      const routeToReroute = congestedRoutes[0];
      
      return {
        type: 'reroute',
        title: 'Rerouted around congestion',
        description: `Detected traffic congestion on ${routeToReroute.mainHighway}, rerouted 3 deliveries through alternate routes`,
        impact: {
          onTime: Math.floor(Math.random() * 20) + 10,
          fuel: Math.floor(Math.random() * 8) - 2,
          cost: Math.floor(Math.random() * 6) - 1
        },
        affected: {
          drivers: 3,
          routes: 3,
          suppliers: 2
        },
        details: {
          congestionPoint: routeToReroute.mainHighway,
          alternateRoute: `Alt-${Date.now()}`,
          affectedDeliveries: 3
        }
      };
    }

    return null;
  }

  // Efficiency optimization - consolidate pickups and loads
  async optimizeEfficiency() {
    const suppliers = await Supplier.find({ status: 'active' });
    const routes = await Route.find({ status: 'pending' });

    // Find opportunities for consolidation
    const supplierPickups = {};
    routes.forEach(route => {
      if (!supplierPickups[route.supplier]) {
        supplierPickups[route.supplier] = [];
      }
      supplierPickups[route.supplier].push(route);
    });

    const consolidationOpportunities = Object.entries(supplierPickups)
      .filter(([supplier, supplierRoutes]) => supplierRoutes.length >= 2);

    if (consolidationOpportunities.length > 0) {
      const [supplierId, supplierRoutes] = consolidationOpportunities[0];
      
      return {
        type: 'efficiency',
        title: 'Supplier load optimization',
        description: `Consolidated 2 pickups from ${supplierId} into single route`,
        impact: {
          onTime: Math.floor(Math.random() * 12) + 5,
          fuel: -(Math.floor(Math.random() * 15) + 5),
          cost: -(Math.floor(Math.random() * 10) + 3)
        },
        affected: {
          drivers: 1,
          routes: 2,
          suppliers: 1
        },
        details: {
          supplier: supplierId,
          consolidatedPickups: 2,
          originalRoutes: supplierRoutes.length
        }
      };
    }

    return null;
  }

  // Congestion optimization - preemptive traffic avoidance
  async optimizeCongestion() {
    const routes = await Route.find({ status: 'pending' });
    
    // Simulate AI-based traffic prediction
    const predictedCongestion = routes.filter(route => 
      Math.random() > 0.8 // 20% chance of predicted congestion
    );

    if (predictedCongestion.length > 0) {
      const routeToOptimize = predictedCongestion[0];
      
      return {
        type: 'congestion',
        title: 'Avoided traffic bottleneck',
        description: `AI detected impending congestion on ${routeToOptimize.mainHighway}, preemptively rerouted ${Math.floor(Math.random() * 3) + 1} vehicles`,
        impact: {
          onTime: Math.floor(Math.random() * 18) + 8,
          fuel: Math.floor(Math.random() * 6) - 1,
          cost: Math.floor(Math.random() * 4) - 1
        },
        affected: {
          drivers: Math.floor(Math.random() * 4) + 1,
          routes: Math.floor(Math.random() * 3) + 1,
          suppliers: 0
        },
        details: {
          predictedCongestion: routeToOptimize.mainHighway,
          confidence: Math.floor(Math.random() * 20) + 80,
          reroutedVehicles: Math.floor(Math.random() * 3) + 1
        }
      };
    }

    return null;
  }

  // Apply optimization to the system
  async applyOptimization(optimization) {
    try {
      // Update optimization status to applied
      await NetworkAutopilot.findByIdAndUpdate(optimization._id, { 
        status: 'applied',
        appliedAt: new Date()
      });

      // Apply actual changes based on optimization type
      switch (optimization.type) {
        case 'rebalance':
          await this.applyRebalance(optimization.details);
          break;
        case 'reroute':
          await this.applyReroute(optimization.details);
          break;
        case 'efficiency':
          await this.applyEfficiency(optimization.details);
          break;
        case 'congestion':
          await this.applyCongestion(optimization.details);
          break;
      }

      console.log(`Applied optimization: ${optimization.title}`);
    } catch (error) {
      console.error('Error applying optimization:', error);
    }
  }

  // Apply rebalance changes
  async applyRebalance(details) {
    // Update driver loads
    await Driver.findByIdAndUpdate(details.originalDriver, {
      $inc: { currentLoad: -2 }
    });
    
    await Driver.findByIdAndUpdate(details.newDriver, {
      $inc: { currentLoad: 2 }
    });

    // Update route assignments
    await Route.updateMany(
      { assignedDriver: details.originalDriver },
      { assignedDriver: details.newDriver }
    );
  }

  // Apply reroute changes
  async applyReroute(details) {
    await Route.updateMany(
      { mainHighway: details.congestionPoint },
      { 
        mainHighway: details.alternateRoute,
        routeOptimized: true,
        optimizedAt: new Date()
      }
    );
  }

  // Apply efficiency changes
  async applyEfficiency(details) {
    // Consolidate routes for the supplier
    const supplierRoutes = await Route.find({ supplier: details.supplier });
    
    if (supplierRoutes.length >= 2) {
      // Keep the first route and mark others as consolidated
      await Route.findByIdAndUpdate(supplierRoutes[1]._id, {
        status: 'consolidated',
        consolidatedInto: supplierRoutes[0]._id,
        consolidatedAt: new Date()
      });
    }
  }

  // Apply congestion changes
  async applyCongestion(details) {
    // Update routes to avoid predicted congestion
    await Route.updateMany(
      { mainHighway: details.predictedCongestion },
      { 
        mainHighway: `Alt-${Date.now()}`,
        routeOptimized: true,
        optimizedAt: new Date(),
        avoidanceReason: 'Predicted congestion'
      }
    );
  }

  // Calculate network statistics
  async calculateNetworkStats() {
    try {
      const allOptimizations = await NetworkAutopilot.find({ status: 'applied' });
      
      if (allOptimizations.length === 0) {
        return {
          totalOptimizations: 0,
          avgOnTimeImprovement: 0,
          avgFuelReduction: 0,
          costSavings: 0,
          networkEfficiency: 85 // Base efficiency
        };
      }

      const totalOnTime = allOptimizations.reduce((sum, opt) => sum + opt.impact.onTime, 0);
      const totalFuel = allOptimizations.reduce((sum, opt) => sum + Math.abs(opt.impact.fuel), 0);
      const totalCost = allOptimizations.reduce((sum, opt) => sum + Math.abs(opt.impact.cost), 0);

      return {
        totalOptimizations: allOptimizations.length,
        avgOnTimeImprovement: (totalOnTime / allOptimizations.length).toFixed(1),
        avgFuelReduction: (totalFuel / allOptimizations.length).toFixed(1),
        costSavings: totalCost * 100, // Convert to actual currency
        networkEfficiency: Math.min(95, 85 + (allOptimizations.length * 0.1)).toFixed(1)
      };
    } catch (error) {
      console.error('Error calculating network stats:', error);
      return this.stats;
    }
  }
}

module.exports = new NetworkAutopilotController();
