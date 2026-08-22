// LOGICORTEX ACO - Autonomous Critical-path Optimizer Main Engine

import {
  Shipment,
  Driver,
  Vehicle,
  Route,
  PerformanceMetrics,
  ACOEngineResult,
  ScheduleOptimization
} from '../../types/aco';
import { BenchmarkDatasetGenerator } from './BenchmarkDatasetGenerator';
import { DependencyGraphEngine } from './DependencyGraphEngine';
import { ParallelExecutionEngine } from './ParallelExecutionEngine';
import { ScheduleOptimizer } from './ScheduleOptimizer';

export class ACOEngine {
  private graphEngine: DependencyGraphEngine;
  private parallelEngine: ParallelExecutionEngine;
  private scheduleOptimizer: ScheduleOptimizer;
  private datasetGenerator: BenchmarkDatasetGenerator;

  constructor() {
    this.graphEngine = new DependencyGraphEngine();
    this.parallelEngine = new ParallelExecutionEngine(this.graphEngine);
    this.scheduleOptimizer = new ScheduleOptimizer();
    this.datasetGenerator = new BenchmarkDatasetGenerator();
  }

  /**
   * Validate inputs before scheduling
   */
  private validateInputs(
    shipment: Shipment,
    drivers: Driver[],
    vehicles: Vehicle[],
    routes: Route[]
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate shipment
    if (!shipment || !shipment.id) {
      errors.push('Invalid shipment: missing ID');
    }
    if (!shipment.origin || typeof shipment.origin !== 'string') {
      errors.push('Invalid shipment: missing or invalid origin');
    }
    if (!shipment.destination || typeof shipment.destination !== 'string') {
      errors.push('Invalid shipment: missing or invalid destination');
    }
    if (shipment.weight <= 0 || shipment.weight > 100000) {
      errors.push('Invalid shipment: weight must be between 0 and 100,000 kg');
    }
    if (shipment.volume <= 0 || shipment.volume > 1000) {
      errors.push('Invalid shipment: volume must be between 0 and 1,000 m³');
    }
    if (!shipment.deadline || shipment.deadline <= new Date()) {
      errors.push('Invalid shipment: deadline must be in the future');
    }
    if (!shipment.timeWindow || !shipment.timeWindow.start || !shipment.timeWindow.end) {
      errors.push('Invalid shipment: missing time window');
    }
    if (shipment.timeWindow.start >= shipment.timeWindow.end) {
      errors.push('Invalid shipment: time window start must be before end');
    }

    // Validate drivers
    if (!Array.isArray(drivers) || drivers.length === 0) {
      errors.push('Invalid drivers: must provide at least one driver');
    }
    drivers.forEach((driver, index) => {
      if (!driver.id) {
        errors.push(`Invalid driver at index ${index}: missing ID`);
      }
      if (!driver.name) {
        errors.push(`Invalid driver at index ${index}: missing name`);
      }
      if (driver.maxCapacity <= 0 || driver.maxCapacity > 100000) {
        errors.push(`Invalid driver ${driver.id}: capacity must be between 0 and 100,000 kg`);
      }
      if (driver.currentLoad < 0 || driver.currentLoad > driver.maxCapacity) {
        errors.push(`Invalid driver ${driver.id}: current load exceeds capacity`);
      }
      if (driver.efficiency < 0 || driver.efficiency > 100) {
        errors.push(`Invalid driver ${driver.id}: efficiency must be between 0 and 100`);
      }
    });

    // Validate vehicles
    if (!Array.isArray(vehicles) || vehicles.length === 0) {
      errors.push('Invalid vehicles: must provide at least one vehicle');
    }
    vehicles.forEach((vehicle, index) => {
      if (!vehicle.id) {
        errors.push(`Invalid vehicle at index ${index}: missing ID`);
      }
      if (!vehicle.type || !['truck', 'van', 'motorcycle'].includes(vehicle.type)) {
        errors.push(`Invalid vehicle ${vehicle.id}: invalid type`);
      }
      if (vehicle.capacity <= 0 || vehicle.capacity > 100000) {
        errors.push(`Invalid vehicle ${vehicle.id}: capacity must be between 0 and 100,000 kg`);
      }
      if (vehicle.fuelLevel < 0 || vehicle.fuelLevel > 100) {
        errors.push(`Invalid vehicle ${vehicle.id}: fuel level must be between 0 and 100`);
      }
    });

    // Validate routes
    if (!Array.isArray(routes) || routes.length === 0) {
      errors.push('Invalid routes: must provide at least one route');
    }
    routes.forEach((route, index) => {
      if (!route.id) {
        errors.push(`Invalid route at index ${index}: missing ID`);
      }
      if (!route.origin || !route.destination) {
        errors.push(`Invalid route ${route.id}: missing origin or destination`);
      }
      if (route.distance <= 0 || route.distance > 10000) {
        errors.push(`Invalid route ${route.id}: distance must be between 0 and 10,000 km`);
      }
      if (route.estimatedTravelTime <= 0 || route.estimatedTravelTime > 10000) {
        errors.push(`Invalid route ${route.id}: travel time must be between 0 and 10,000 minutes`);
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Main entry point - optimize scheduling for a shipment
   */
  async optimizeScheduling(
    shipment: Shipment,
    drivers: Driver[],
    vehicles: Vehicle[],
    routes: Route[],
    useParallel: boolean = true
  ): Promise<ACOEngineResult> {
    const errors: string[] = [];

    // Validate inputs first
    const validation = this.validateInputs(shipment, drivers, vehicles, routes);
    if (!validation.valid) {
      return {
        success: false,
        optimizedSchedule: {} as ScheduleOptimization,
        dependencyGraph: this.graphEngine.buildSchedulingGraph(shipment.id),
        performanceMetrics: this.createPerformanceMetrics('round2', useParallel, 0),
        explanation: 'Input validation failed',
        errors: validation.errors
      };
    }

    try {
      // Build dependency graph
      const dependencyGraph = this.graphEngine.buildSchedulingGraph(shipment.id);
      this.parallelEngine.setDependencyGraph(dependencyGraph);

      // Execute scheduling tasks
      if (useParallel) {
        await this.parallelEngine.executeParallel();
      } else {
        await this.parallelEngine.executeSequential();
      }

      // Optimize schedule
      const optimization = this.scheduleOptimizer.optimizeSchedule(shipment, drivers, vehicles, routes);

      if (!optimization) {
        errors.push('No feasible schedule found');
        return {
          success: false,
          optimizedSchedule: {} as ScheduleOptimization,
          dependencyGraph,
          performanceMetrics: this.createPerformanceMetrics('round2', useParallel, 0),
          explanation: 'No feasible schedule could be generated with available resources',
          errors
        };
      }

      // Calculate performance metrics
      const metrics = this.createPerformanceMetrics('round2', useParallel, this.parallelEngine.getTotalExecutionTime());

      return {
        success: true,
        optimizedSchedule: optimization,
        dependencyGraph,
        performanceMetrics: metrics,
        explanation: this.generateExplanation(optimization, dependencyGraph, useParallel),
        errors
      };
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Unknown error occurred');
      return {
        success: false,
        optimizedSchedule: {} as ScheduleOptimization,
        dependencyGraph: this.graphEngine.buildSchedulingGraph(shipment.id),
        performanceMetrics: this.createPerformanceMetrics('round2', useParallel, 0),
        explanation: 'Scheduling optimization failed',
        errors
      };
    }
  }

  /**
   * Run Round 1 baseline (sequential execution)
   */
  async runRound1Baseline(
    shipment: Shipment,
    drivers: Driver[],
    vehicles: Vehicle[],
    routes: Route[]
  ): Promise<PerformanceMetrics> {
    // Resources are validated but not used in baseline measurement
    // This ensures consistency with optimized version
    if (drivers.length === 0 || vehicles.length === 0 || routes.length === 0) {
      throw new Error('Insufficient resources for scheduling');
    }

    const dependencyGraph = this.graphEngine.buildSchedulingGraph(shipment.id);
    this.parallelEngine.setDependencyGraph(dependencyGraph);

    // Execute sequentially (Round 1 baseline)
    await this.parallelEngine.executeSequential();

    const executionResults = this.parallelEngine.getExecutionResults();
    const taskBreakdown = this.calculateTaskBreakdown(executionResults);

    return {
      round: 'round1',
      totalShipments: 1,
      schedulingStartTime: performance.now(),
      schedulingEndTime: performance.now(),
      totalDuration: this.parallelEngine.getTotalExecutionTime(),
      criticalPathDuration: this.parallelEngine.getCriticalPathExecutionTime(),
      sequentialTasks: executionResults.size,
      parallelTasks: 0,
      dispatchReadyTime: this.parallelEngine.getTotalExecutionTime(),
      taskBreakdown
    };
  }

  /**
   * Run Round 2 optimized (parallel execution)
   */
  async runRound2Optimized(
    shipment: Shipment,
    drivers: Driver[],
    vehicles: Vehicle[],
    routes: Route[]
  ): Promise<PerformanceMetrics> {
    // Resources are validated but not used in baseline measurement
    // This ensures consistency with optimized version
    if (drivers.length === 0 || vehicles.length === 0 || routes.length === 0) {
      throw new Error('Insufficient resources for scheduling');
    }

    const dependencyGraph = this.graphEngine.buildSchedulingGraph(shipment.id);
    this.parallelEngine.setDependencyGraph(dependencyGraph);

    // Execute in parallel (Round 2 optimized)
    await this.parallelEngine.executeParallel();

    const executionResults = this.parallelEngine.getExecutionResults();
    const taskBreakdown = this.calculateTaskBreakdown(executionResults);
    const stats = this.parallelEngine.getTaskExecutionStats();

    return {
      round: 'round2',
      totalShipments: 1,
      schedulingStartTime: performance.now(),
      schedulingEndTime: performance.now(),
      totalDuration: this.parallelEngine.getTotalExecutionTime(),
      criticalPathDuration: this.parallelEngine.getCriticalPathExecutionTime(),
      sequentialTasks: stats.sequential,
      parallelTasks: stats.parallel,
      dispatchReadyTime: this.parallelEngine.getTotalExecutionTime(),
      taskBreakdown
    };
  }

  /**
   * Run benchmark comparison between Round 1 and Round 2
   */
  async runBenchmark(
    scale: 'small' | 'medium' | 'large',
    iterations: number = 5
  ): Promise<{ round1: PerformanceMetrics[]; round2: PerformanceMetrics[]; improvement: number }> {
    const dataset = this.datasetGenerator.generateDataset(scale);
    const round1Results: PerformanceMetrics[] = [];
    const round2Results: PerformanceMetrics[] = [];

    for (let i = 0; i < iterations; i++) {
      const shipment = dataset.shipments[i % dataset.shipments.length];

      // Run Round 1
      const r1 = await this.runRound1Baseline(shipment, dataset.drivers, dataset.vehicles, dataset.routes);
      round1Results.push(r1);

      // Reset graph for Round 2
      this.graphEngine.reset();

      // Run Round 2
      const r2 = await this.runRound2Optimized(shipment, dataset.drivers, dataset.vehicles, dataset.routes);
      round2Results.push(r2);

      // Reset for next iteration
      this.graphEngine.reset();
    }

    // Calculate average improvement
    const avgR1Duration = round1Results.reduce((sum, r) => sum + r.totalDuration, 0) / round1Results.length;
    const avgR2Duration = round2Results.reduce((sum, r) => sum + r.totalDuration, 0) / round2Results.length;
    const improvement = ((avgR1Duration - avgR2Duration) / avgR1Duration) * 100;

    return {
      round1: round1Results,
      round2: round2Results,
      improvement
    };
  }

  /**
   * Create performance metrics object
   */
  private createPerformanceMetrics(
    round: 'round1' | 'round2',
    useParallel: boolean,
    totalDuration: number
  ): PerformanceMetrics {
    const executionResults = this.parallelEngine.getExecutionResults();
    const taskBreakdown = this.calculateTaskBreakdown(executionResults);
    const stats = useParallel ? this.parallelEngine.getTaskExecutionStats() : { parallel: 0, sequential: executionResults.size };

    return {
      round,
      totalShipments: 1,
      schedulingStartTime: performance.now(),
      schedulingEndTime: performance.now(),
      totalDuration,
      criticalPathDuration: this.parallelEngine.getCriticalPathExecutionTime(),
      sequentialTasks: stats.sequential,
      parallelTasks: stats.parallel,
      dispatchReadyTime: totalDuration,
      taskBreakdown
    };
  }

  /**
   * Calculate task breakdown for metrics
   */
  private calculateTaskBreakdown(executionResults: Map<string, any>): PerformanceMetrics['taskBreakdown'] {
    const breakdown: PerformanceMetrics['taskBreakdown'] = {
      inventoryCheck: 0,
      driverCheck: 0,
      vehicleCheck: 0,
      routeOptimization: 0,
      validation: 0,
      dispatch: 0
    };

    for (const [taskId, result] of executionResults) {
      if (taskId.includes('inventory')) breakdown.inventoryCheck = result.duration;
      else if (taskId.includes('driver')) breakdown.driverCheck = result.duration;
      else if (taskId.includes('vehicle')) breakdown.vehicleCheck = result.duration;
      else if (taskId.includes('route')) breakdown.routeOptimization = result.duration;
      else if (taskId.includes('validation')) breakdown.validation = result.duration;
      else if (taskId.includes('dispatch')) breakdown.dispatch = result.duration;
    }

    return breakdown;
  }

  /**
   * Generate explanation for the optimization result
   */
  private generateExplanation(
    optimization: ScheduleOptimization,
    dependencyGraph: any,
    useParallel: boolean
  ): string {
    const criticalPath = dependencyGraph.criticalPath;
    const criticalPathDuration = dependencyGraph.criticalPathDuration;

    let explanation = `Schedule optimized for shipment ${optimization.shipmentId}. `;
    explanation += `Critical path: ${criticalPath.join(' → ')} (${criticalPathDuration.toFixed(0)}ms). `;
    explanation += `Selected driver: ${optimization.selectedDriver.name} (${optimization.selectedDriver.efficiency}% efficiency). `;
    explanation += `Selected vehicle: ${optimization.selectedVehicle.id} (${optimization.selectedVehicle.type}). `;
    explanation += `Selected route: ${optimization.selectedRoute.id} (${optimization.selectedRoute.estimatedTravelTime} min). `;

    if (useParallel) {
      explanation += `Independent tasks (inventory, driver, vehicle checks) executed in parallel, reducing wait time.`;
    } else {
      explanation += `Tasks executed sequentially following dependency order.`;
    }

    return explanation;
  }

  /**
   * Get dataset generator for external use
   */
  getDatasetGenerator(): BenchmarkDatasetGenerator {
    return this.datasetGenerator;
  }

  /**
   * Get dependency graph engine for external use
   */
  getGraphEngine(): DependencyGraphEngine {
    return this.graphEngine;
  }

  /**
   * Get schedule optimizer for external use
   */
  getScheduleOptimizer(): ScheduleOptimizer {
    return this.scheduleOptimizer;
  }
}
