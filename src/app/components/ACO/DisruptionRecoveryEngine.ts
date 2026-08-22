// LOGICORTEX ACO - Disruption Recovery Engine

import {
  Shipment,
  Driver,
  Vehicle,
  Route,
  ScheduleOptimization,
  RecoveryCandidate,
  DisruptionRecoveryResult
} from '../../types/aco';
import { DependencyGraphEngine } from './DependencyGraphEngine';
import { ScheduleOptimizer } from './ScheduleOptimizer';

export class DisruptionRecoveryEngine {
  private graphEngine: DependencyGraphEngine;
  private scheduleOptimizer: ScheduleOptimizer;

  constructor() {
    this.graphEngine = new DependencyGraphEngine();
    this.scheduleOptimizer = new ScheduleOptimizer();
  }

  /**
   * Recover from driver unavailability disruption
   * Reuses existing ACO optimization logic
   */
  async recoverFromDriverDisruption(
    shipment: Shipment,
    unavailableDriverId: string,
    currentSchedule: ScheduleOptimization,
    allDrivers: Driver[],
    vehicles: Vehicle[],
    routes: Route[]
  ): Promise<DisruptionRecoveryResult> {
    const startTime = performance.now();

    // Step 1: Identify affected tasks
    const affectedTasks = this.identifyAffectedTasks(currentSchedule, unavailableDriverId);
    const preservedTasks = this.identifyPreservedTasks(currentSchedule, unavailableDriverId);

    // Step 2: Remove unavailable driver from candidate pool
    const availableDrivers = allDrivers.filter(d => d.id !== unavailableDriverId);

    // Step 3: Evaluate replacement candidates using existing optimizer
    const candidates = await this.evaluateReplacementCandidates(
      shipment,
      availableDrivers,
      vehicles,
      routes,
      currentSchedule
    );

    // Step 4: Find best valid candidate
    const validCandidates = candidates.filter(c => !c.rejectionReason);

    if (validCandidates.length === 0) {
      // No valid replacement found
      const endTime = performance.now();
      return {
        success: false,
        originalDriverId: unavailableDriverId,
        affectedTasks,
        preservedTasks,
        candidatesEvaluated: candidates.length,
        recoveryTime: endTime - startTime,
        explanation: this.generateFailureExplanation(candidates),
        rejectionReason: 'No valid replacement driver found'
      };
    }

    // Step 5: Select best candidate (highest score)
    const bestCandidate = validCandidates.sort((a, b) => b.score - a.score)[0];

    // Step 6: Rebuild schedule with replacement driver
    const recoveredSchedule = await this.rebuildSchedule(
      shipment,
      bestCandidate.driver,
      currentSchedule.selectedVehicle,
      currentSchedule.selectedRoute,
      vehicles,
      routes
    );

    // Step 7: Recalculate critical path for recovered schedule
    this.graphEngine.buildSchedulingGraph(shipment.id);

    const endTime = performance.now();

    return {
      success: true,
      originalDriverId: unavailableDriverId,
      replacementDriver: bestCandidate.driver,
      affectedTasks,
      preservedTasks,
      candidatesEvaluated: candidates.length,
      recoveryTime: endTime - startTime,
      explanation: this.generateRecoveryExplanation(bestCandidate, candidates.length),
      recoveredSchedule
    };
  }

  /**
   * Identify tasks affected by driver unavailability
   */
  private identifyAffectedTasks(_schedule: ScheduleOptimization, _driverId: string): string[] {
    return [
      'driver_check',
      'route_optimization',
      'time_window_validation',
      'dispatch'
    ];
  }

  /**
   * Identify tasks that can be preserved
   */
  private identifyPreservedTasks(_schedule: ScheduleOptimization, _driverId: string): string[] {
    return [
      'inventory_check',
      'shipment_validation',
      'vehicle_check'
    ];
  }

  /**
   * Evaluate replacement candidates using existing ScheduleOptimizer
   */
  private async evaluateReplacementCandidates(
    shipment: Shipment,
    drivers: Driver[],
    vehicles: Vehicle[],
    routes: Route[],
    currentSchedule: ScheduleOptimization
  ): Promise<RecoveryCandidate[]> {
    const candidates: RecoveryCandidate[] = [];

    for (const driver of drivers) {
      // Check basic constraints
      const rejectionReason = this.validateDriverConstraints(driver, shipment, currentSchedule);

      if (rejectionReason) {
        candidates.push({
          driver,
          score: 0,
          rejectionReason
        });
        continue;
      }

      // Use existing optimizer to score this candidate
      const optimization = this.scheduleOptimizer.optimizeSchedule(
        shipment,
        [driver],
        vehicles,
        routes
      );

      if (optimization && optimization.selectedDriver.id === driver.id) {
        candidates.push({
          driver,
          score: optimization.score,
          rejectionReason: undefined
        });
      } else {
        candidates.push({
          driver,
          score: 0,
          rejectionReason: 'Optimizer rejected this driver'
        });
      }
    }

    return candidates;
  }

  /**
   * Validate driver constraints before optimization
   */
  private validateDriverConstraints(
    driver: Driver,
    shipment: Shipment,
    currentSchedule: ScheduleOptimization
  ): string | null {
    // Check availability
    if (driver.status !== 'available') {
      return `Driver is ${driver.status}`;
    }

    // Check capacity
    if (driver.currentLoad + shipment.weight > driver.maxCapacity) {
      return `Insufficient capacity (${driver.currentLoad + shipment.weight}kg > ${driver.maxCapacity}kg)`;
    }

    // Check time window
    const now = new Date();
    if (now < driver.availabilityWindow.start || now > driver.availabilityWindow.end) {
      return 'Driver not available in required time window';
    }

    // Check if driver can meet deadline
    const route = currentSchedule.selectedRoute;
    const estimatedArrival = new Date(now.getTime() + route.estimatedTravelTime * 60 * 1000);
    if (estimatedArrival > shipment.deadline) {
      return 'Cannot meet delivery deadline';
    }

    return null; // Valid
  }

  /**
   * Rebuild schedule with replacement driver
   */
  private async rebuildSchedule(
    shipment: Shipment,
    replacementDriver: Driver,
    vehicle: Vehicle,
    route: Route,
    _vehicles: Vehicle[],
    _routes: Route[]
  ): Promise<ScheduleOptimization> {
    const optimization = this.scheduleOptimizer.optimizeSchedule(
      shipment,
      [replacementDriver],
      [vehicle],
      [route]
    );

    if (!optimization) {
      throw new Error('Failed to rebuild schedule with replacement driver');
    }

    return optimization;
  }

  /**
   * Generate explanation for successful recovery
   */
  private generateRecoveryExplanation(candidate: RecoveryCandidate, totalEvaluated: number): string {
    const driver = candidate.driver;
    return `Driver ${driver.id} (${driver.name}) selected as replacement. ` +
      `Evaluated ${totalEvaluated} candidates. ` +
      `Selected driver has ${driver.efficiency}% efficiency, ` +
      `adequate capacity (${driver.currentLoad}/${driver.maxCapacity}kg), ` +
      `and meets all scheduling constraints. ` +
      `Score: ${candidate.score.toFixed(1)}`;
  }

  /**
   * Generate explanation for recovery failure
   */
  private generateFailureExplanation(candidates: RecoveryCandidate[]): string {
    const reasons = candidates
      .filter(c => c.rejectionReason)
      .map(c => `${c.driver.id}: ${c.rejectionReason}`)
      .join('; ');

    return `No valid replacement driver found. Rejection reasons: ${reasons}`;
  }

  /**
   * Simulate driver unavailability for testing
   */
  simulateDriverUnavailable(driverId: string, drivers: Driver[]): Driver[] {
    return drivers.map(d => {
      if (d.id === driverId) {
        return { ...d, status: 'offline' as const };
      }
      return d;
    });
  }

  /**
   * Restore driver availability
   */
  restoreDriverAvailability(driverId: string, drivers: Driver[]): Driver[] {
    return drivers.map(d => {
      if (d.id === driverId) {
        return { ...d, status: 'available' as const };
      }
      return d;
    });
  }
}
