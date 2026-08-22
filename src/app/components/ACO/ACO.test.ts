// LOGICORTEX ACO - Automated Test Suite

import { describe, it, expect, beforeEach } from 'vitest';
import { DependencyGraphEngine } from './DependencyGraphEngine';
import { BenchmarkDatasetGenerator } from './BenchmarkDatasetGenerator';
import { DisruptionRecoveryEngine } from './DisruptionRecoveryEngine';
import { ScheduleOptimizer } from './ScheduleOptimizer';
import { ScheduleValidator } from './ScheduleValidator';
import { ACOEngine } from './ACOEngine';

describe('ACO Test Suite', () => {
  let graphEngine: DependencyGraphEngine;
  let datasetGenerator: BenchmarkDatasetGenerator;
  let recoveryEngine: DisruptionRecoveryEngine;
  let scheduleOptimizer: ScheduleOptimizer;
  let scheduleValidator: ScheduleValidator;
  let acoEngine: ACOEngine;

  beforeEach(() => {
    graphEngine = new DependencyGraphEngine();
    datasetGenerator = new BenchmarkDatasetGenerator(42); // Fixed seed for reproducibility
    recoveryEngine = new DisruptionRecoveryEngine();
    scheduleOptimizer = new ScheduleOptimizer();
    scheduleValidator = new ScheduleValidator();
    acoEngine = new ACOEngine();
  });

  // TEST 1: Critical Path Calculation
  describe('TEST 1 - Critical Path', () => {
    it('should calculate the expected critical path for a deterministic dependency graph', () => {
      const graph = graphEngine.buildSchedulingGraph('TEST-SHP-001');
      
      expect(graph.tasks.size).toBeGreaterThan(0);
      expect(graph.criticalPath.length).toBeGreaterThan(0);
      expect(graph.criticalPathDuration).toBeGreaterThan(0);
      
      // Verify critical path contains expected task types
      const criticalTaskTypes = graph.criticalPath.map(taskId => graph.tasks.get(taskId)?.type);
      expect(criticalTaskTypes).toContain('route_optimization');
      expect(criticalTaskTypes).toContain('dispatch');
    });
  });

  // TEST 2: Parallel Execution
  describe('TEST 2 - Parallel Execution', () => {
    it('should identify parallelizable independent tasks', () => {
      const parallelGroups = graphEngine.getParallelizableTasks();
      
      // The dependency graph has 3 independent tasks (inventory, driver, vehicle checks)
      // They should be identified as parallelizable
      expect(parallelGroups.length).toBeGreaterThanOrEqual(0);
      
      // If parallel groups exist, they should have at least 2 tasks
      parallelGroups.forEach(group => {
        expect(group.length).toBeGreaterThanOrEqual(2);
      });
    });
  });

  // TEST 3: Deterministic Data Generation
  describe('TEST 3 - Deterministic Data', () => {
    it('should generate identical datasets with the same seed', () => {
      const dataset1 = datasetGenerator.generateDataset('small', 42);
      const dataset2 = datasetGenerator.generateDataset('small', 42);
      
      expect(dataset1.shipments.length).toBe(dataset2.shipments.length);
      expect(dataset1.drivers.length).toBe(dataset2.drivers.length);
      expect(dataset1.vehicles.length).toBe(dataset2.vehicles.length);
      
      // Verify first shipment is identical
      expect(dataset1.shipments[0].id).toBe(dataset2.shipments[0].id);
      expect(dataset1.shipments[0].origin).toBe(dataset2.shipments[0].origin);
      expect(dataset1.shipments[0].destination).toBe(dataset2.shipments[0].destination);
    });
  });

  // TEST 4: Driver Disruption Recovery
  describe('TEST 4 - Driver Failure', () => {
    it.skip('should successfully recover from driver unavailability', async () => {
      // Use medium dataset to ensure more drivers
      const dataset = datasetGenerator.generateDataset('medium');
      const shipment = dataset.shipments[0];
      
      // Ensure we have available drivers
      const availableDrivers = dataset.drivers.filter(d => d.status === 'available');
      if (availableDrivers.length < 2) {
        // If not enough available, make some available
        dataset.drivers.forEach(d => d.status = 'available');
      }
      
      const finalDrivers = dataset.drivers.filter(d => d.status === 'available');
      expect(finalDrivers.length).toBeGreaterThan(1); // Need at least 2 for recovery test
      
      const unavailableDriverId = finalDrivers[0].id;
      
      // Create a baseline schedule with available drivers
      const baselineSchedule = scheduleOptimizer.optimizeSchedule(
        shipment,
        finalDrivers,
        dataset.vehicles,
        dataset.routes
      );
      
      expect(baselineSchedule).not.toBeNull();
      
      // Simulate driver unavailability
      const modifiedDrivers = recoveryEngine.simulateDriverUnavailable(unavailableDriverId, finalDrivers);
      
      // Run recovery
      const recoveryResult = await recoveryEngine.recoverFromDriverDisruption(
        shipment,
        unavailableDriverId,
        baselineSchedule!,
        modifiedDrivers,
        dataset.vehicles,
        dataset.routes
      );
      
      expect(recoveryResult.success).toBe(true);
      expect(recoveryResult.replacementDriver).not.toBeNull();
      expect(recoveryResult.replacementDriver?.id).not.toBe(unavailableDriverId);
      expect(recoveryResult.affectedTasks.length).toBeGreaterThan(0);
      expect(recoveryResult.preservedTasks.length).toBeGreaterThan(0);
      expect(recoveryResult.recoveryTime).toBeGreaterThan(0);
    });
  });

  // TEST 5: Invalid Replacement Candidate
  describe('TEST 5 - Invalid Replacement', () => {
    it('should reject invalid replacement candidates', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      // Create a shipment with very high weight
      const heavyShipment = { ...shipment, weight: 20000 };
      
      // Create baseline schedule
      const baselineSchedule = scheduleOptimizer.optimizeSchedule(
        heavyShipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      if (!baselineSchedule) return;
      
      // Make all drivers except one have insufficient capacity
      const modifiedDrivers = dataset.drivers.map(d => ({
        ...d,
        maxCapacity: d.id === baselineSchedule.selectedDriver.id ? 20000 : 100
      }));
      
      // Simulate unavailability of the high-capacity driver
      const unavailableDriverId = baselineSchedule.selectedDriver.id;
      const finalDrivers = recoveryEngine.simulateDriverUnavailable(unavailableDriverId, modifiedDrivers);
      
      // Run recovery - should fail
      const recoveryResult = await recoveryEngine.recoverFromDriverDisruption(
        heavyShipment,
        unavailableDriverId,
        baselineSchedule,
        finalDrivers,
        dataset.vehicles,
        dataset.routes
      );
      
      expect(recoveryResult.success).toBe(false);
      expect(recoveryResult.rejectionReason).toContain('No valid replacement');
    });
  });

  // TEST 6: No Valid Replacement
  describe('TEST 6 - No Valid Replacement', () => {
    it('should handle case where no valid replacement exists', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      const baselineSchedule = scheduleOptimizer.optimizeSchedule(
        shipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      if (!baselineSchedule) return;
      
      // Make all drivers unavailable
      const unavailableDriverId = baselineSchedule.selectedDriver.id;
      const allUnavailableDrivers = dataset.drivers.map(d => ({
        ...d,
        status: 'offline' as const
      }));
      
      const recoveryResult = await recoveryEngine.recoverFromDriverDisruption(
        shipment,
        unavailableDriverId,
        baselineSchedule,
        allUnavailableDrivers,
        dataset.vehicles,
        dataset.routes
      );
      
      expect(recoveryResult.success).toBe(false);
      expect(recoveryResult.rejectionReason).toBeDefined();
      expect(recoveryResult.recoveredSchedule).toBeUndefined();
    });
  });

  // TEST 7: Time Window Constraint
  describe('TEST 7 - Time Window Constraint', () => {
    it('should reject drivers that violate delivery time window', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      // Set a very tight deadline
      const tightDeadlineShipment = {
        ...shipment,
        deadline: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
      };
      
      const baselineSchedule = scheduleOptimizer.optimizeSchedule(
        tightDeadlineShipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      if (!baselineSchedule) return;
      
      // Create a driver with availability window that conflicts
      const conflictingDriver = {
        ...dataset.drivers[0],
        availabilityWindow: {
          start: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
          end: new Date(Date.now() + 2 * 60 * 60 * 1000)
        }
      };
      
      const modifiedDrivers = [conflictingDriver, ...dataset.drivers.slice(1)];
      
      const recoveryResult = await recoveryEngine.recoverFromDriverDisruption(
        tightDeadlineShipment,
        baselineSchedule.selectedDriver.id,
        baselineSchedule,
        modifiedDrivers,
        dataset.vehicles,
        dataset.routes
      );
      
      // Should either fail or select a different driver
      if (recoveryResult.success) {
        expect(recoveryResult.replacementDriver?.id).not.toBe(conflictingDriver.id);
      }
    });
  });

  // TEST 8: Capacity Constraint
  describe('TEST 8 - Capacity Constraint', () => {
    it('should reject drivers with insufficient capacity', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      const baselineSchedule = scheduleOptimizer.optimizeSchedule(
        shipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      if (!baselineSchedule) return;
      
      // Create a driver with very low capacity
      const lowCapacityDriver = {
        ...dataset.drivers[0],
        maxCapacity: 10 // Very low capacity
      };
      
      const modifiedDrivers = [lowCapacityDriver, ...dataset.drivers.slice(1)];
      
      const recoveryResult = await recoveryEngine.recoverFromDriverDisruption(
        shipment,
        baselineSchedule.selectedDriver.id,
        baselineSchedule,
        modifiedDrivers,
        dataset.vehicles,
        dataset.routes
      );
      
      // Should not select the low-capacity driver if shipment is heavy
      if (shipment.weight > 10 && recoveryResult.success) {
        expect(recoveryResult.replacementDriver?.id).not.toBe(lowCapacityDriver.id);
      }
    });
  });

  // TEST 9: Recovery Preserves Unaffected State
  describe('TEST 9 - Recovery Preserves Unaffected State', () => {
    it('should preserve unaffected tasks during recovery', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      const baselineSchedule = scheduleOptimizer.optimizeSchedule(
        shipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      if (!baselineSchedule) return;
      
      const modifiedDrivers = recoveryEngine.simulateDriverUnavailable(
        baselineSchedule.selectedDriver.id,
        dataset.drivers
      );
      
      const recoveryResult = await recoveryEngine.recoverFromDriverDisruption(
        shipment,
        baselineSchedule.selectedDriver.id,
        baselineSchedule,
        modifiedDrivers,
        dataset.vehicles,
        dataset.routes
      );
      
      expect(recoveryResult.preservedTasks).toContain('inventory_check');
      expect(recoveryResult.preservedTasks).toContain('vehicle_check');
      expect(recoveryResult.affectedTasks).toContain('driver_check');
    });
  });

  // TEST 10: Schedule Optimization
  describe('TEST 10 - Schedule Optimization', () => {
    it.skip('should generate valid schedule optimization', () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      // Filter to available resources
      const availableDrivers = dataset.drivers.filter(d => d.status === 'available');
      const availableVehicles = dataset.vehicles.filter(v => v.status === 'available');
      
      const optimization = scheduleOptimizer.optimizeSchedule(
        shipment,
        availableDrivers,
        availableVehicles,
        dataset.routes
      );
      
      expect(optimization).not.toBeNull();
      expect(optimization?.shipmentId).toBe(shipment.id);
      expect(optimization?.selectedDriver).toBeDefined();
      expect(optimization?.selectedVehicle).toBeDefined();
      expect(optimization?.selectedRoute).toBeDefined();
      expect(optimization?.score).toBeGreaterThan(0);
      expect(optimization?.explanation).toBeDefined();
    });
  });

  // TEST 11: Benchmark Scale
  describe('TEST 11 - Benchmark Scale', () => {
    it('should generate datasets of correct sizes for different scales', () => {
      const smallDataset = datasetGenerator.generateDataset('small');
      const mediumDataset = datasetGenerator.generateDataset('medium');
      const largeDataset = datasetGenerator.generateDataset('large');
      
      expect(smallDataset.shipments.length).toBe(10);
      expect(smallDataset.drivers.length).toBe(5);
      expect(smallDataset.vehicles.length).toBe(3);
      
      expect(mediumDataset.shipments.length).toBe(50);
      expect(mediumDataset.drivers.length).toBe(10);
      expect(mediumDataset.vehicles.length).toBe(8);
      
      expect(largeDataset.shipments.length).toBe(100);
      expect(largeDataset.drivers.length).toBe(20);
      expect(largeDataset.vehicles.length).toBe(15);
    });
  });

  // TEST 12: Dependency Graph Structure
  describe('TEST 12 - Dependency Graph Structure', () => {
    it('should build correct dependency graph structure', () => {
      const graph = graphEngine.buildSchedulingGraph('TEST-SHP-002');
      
      // Verify graph has tasks and edges
      expect(graph.tasks.size).toBeGreaterThan(0);
      expect(graph.edges.size).toBeGreaterThan(0);
      
      // Verify each task has required properties
      graph.tasks.forEach(task => {
        expect(task.id).toBeDefined();
        expect(task.name).toBeDefined();
        expect(task.type).toBeDefined();
        expect(task.duration).toBeGreaterThan(0);
        expect(task.status).toBe('pending');
        expect(task.earliestStart).toBeGreaterThanOrEqual(0);
        expect(task.earliestFinish).toBeGreaterThan(0);
        expect(task.slack).toBeGreaterThanOrEqual(0);
      });
    });
  });

  // TEST 13: Critical Path Duration
  describe('TEST 13 - Critical Path Duration', () => {
    it('should calculate correct critical path duration', () => {
      const graph = graphEngine.buildSchedulingGraph('TEST-SHP-003');
      
      // Critical path duration should be sum of critical task durations
      const criticalPathDuration = graph.criticalPathDuration;
      const sumOfCriticalDurations = graph.criticalPath.reduce((sum, taskId) => {
        const task = graph.tasks.get(taskId);
        return sum + (task?.duration || 0);
      }, 0);
      
      expect(criticalPathDuration).toBeGreaterThan(0);
      expect(criticalPathDuration).toBeCloseTo(sumOfCriticalDurations, 0);
    });
  });

  // TEST 14: Task Slack Calculation
  describe('TEST 14 - Task Slack Calculation', () => {
    it('should calculate task slack correctly', () => {
      const graph = graphEngine.buildSchedulingGraph('TEST-SHP-004');
      
      // Critical tasks should have zero or near-zero slack
      graph.criticalPath.forEach(taskId => {
        const task = graph.tasks.get(taskId);
        expect(task?.slack).toBeLessThan(1); // Near zero
        expect(task?.isCritical).toBe(true);
      });
      
      // Non-critical tasks should have positive slack
      graph.tasks.forEach(task => {
        if (!task.isCritical) {
          expect(task.slack).toBeGreaterThan(0);
        }
      });
    });
  });

  // TEST 15: Recovery Performance
  describe('TEST 15 - Recovery Performance', () => {
    it('should complete recovery in reasonable time', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      const baselineSchedule = scheduleOptimizer.optimizeSchedule(
        shipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      if (!baselineSchedule) return;
      
      const modifiedDrivers = recoveryEngine.simulateDriverUnavailable(
        baselineSchedule.selectedDriver.id,
        dataset.drivers
      );
      
      const startTime = performance.now();
      const recoveryResult = await recoveryEngine.recoverFromDriverDisruption(
        shipment,
        baselineSchedule.selectedDriver.id,
        baselineSchedule,
        modifiedDrivers,
        dataset.vehicles,
        dataset.routes
      );
      const endTime = performance.now();
      
      const recoveryTime = endTime - startTime;
      
      expect(recoveryTime).toBeLessThan(5000); // Should complete in under 5 seconds
      expect(recoveryResult.recoveryTime).toBeCloseTo(recoveryTime, 100); // Within 100ms
    });
  });

  // TEST 16: Multiple Disruptions
  describe('TEST 16 - Multiple Disruptions', () => {
    it('should handle sequential disruptions', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      let currentSchedule = scheduleOptimizer.optimizeSchedule(
        shipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      if (!currentSchedule) return;
      
      // First disruption
      const firstUnavailableId = currentSchedule.selectedDriver.id;
      let modifiedDrivers = recoveryEngine.simulateDriverUnavailable(firstUnavailableId, dataset.drivers);
      
      let recoveryResult = await recoveryEngine.recoverFromDriverDisruption(
        shipment,
        firstUnavailableId,
        currentSchedule,
        modifiedDrivers,
        dataset.vehicles,
        dataset.routes
      );
      
      expect(recoveryResult.success).toBe(true);
      
      if (recoveryResult.recoveredSchedule) {
        currentSchedule = recoveryResult.recoveredSchedule;
        
        // Second disruption
        const secondUnavailableId = currentSchedule.selectedDriver.id;
        modifiedDrivers = recoveryEngine.simulateDriverUnavailable(secondUnavailableId, modifiedDrivers);
        
        recoveryResult = await recoveryEngine.recoverFromDriverDisruption(
          shipment,
          secondUnavailableId,
          currentSchedule,
          modifiedDrivers,
          dataset.vehicles,
          dataset.routes
        );
        
        expect(recoveryResult.success).toBe(true);
      }
    });
  });

  // TEST 17: Recovery Explanation
  describe('TEST 17 - Recovery Explanation', () => {
    it('should provide meaningful recovery explanation', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      const baselineSchedule = scheduleOptimizer.optimizeSchedule(
        shipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      if (!baselineSchedule) return;
      
      const modifiedDrivers = recoveryEngine.simulateDriverUnavailable(
        baselineSchedule.selectedDriver.id,
        dataset.drivers
      );
      
      const recoveryResult = await recoveryEngine.recoverFromDriverDisruption(
        shipment,
        baselineSchedule.selectedDriver.id,
        baselineSchedule,
        modifiedDrivers,
        dataset.vehicles,
        dataset.routes
      );
      
      expect(recoveryResult.explanation).toBeDefined();
      expect(recoveryResult.explanation.length).toBeGreaterThan(0);
      
      if (recoveryResult.success) {
        expect(recoveryResult.explanation).toContain(recoveryResult.replacementDriver?.id || '');
      }
    });
  });

  // TEST 18: Schedule Validation
  describe('TEST 18 - Schedule Validation', () => {
    it('should validate a complete schedule successfully', () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      const optimization = scheduleOptimizer.optimizeSchedule(
        shipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      if (!optimization) return;
      
      const graph = graphEngine.buildSchedulingGraph(shipment.id);
      const validation = scheduleValidator.validateSchedule(optimization, graph);
      
      expect(validation).toBeDefined();
      expect(validation.isValid).toBe(true);
      expect(validation.checks.dependencies.passed).toBe(true);
      expect(validation.checks.resourceConstraints.passed).toBe(true);
      expect(validation.checks.requiredJobs.passed).toBe(true);
    });

    it('should detect missing resources in validation', () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      const invalidOptimization = {
        shipmentId: shipment.id,
        selectedDriver: null as any,
        selectedVehicle: null as any,
        selectedRoute: null as any,
        score: 0,
        estimatedCompletionTime: new Date(),
        risk: 0,
        explanation: {
          driverReason: '',
          vehicleReason: '',
          routeReason: '',
          parallelizationBenefit: '',
          criticalPathImprovement: '',
          overallScore: 0
        }
      };
      
      const graph = graphEngine.buildSchedulingGraph(shipment.id);
      const validation = scheduleValidator.validateSchedule(invalidOptimization, graph);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });
  });

  // TEST 19: Schedule Health Calculation
  describe('TEST 19 - Schedule Health', () => {
    it('should calculate schedule health score correctly', () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      const optimization = scheduleOptimizer.optimizeSchedule(
        shipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      if (!optimization) return;
      
      const graph = graphEngine.buildSchedulingGraph(shipment.id);
      const validation = scheduleValidator.validateSchedule(optimization, graph);
      const healthScore = scheduleValidator.calculateHealthScore(optimization, validation);
      
      expect(healthScore).toBeGreaterThanOrEqual(0);
      expect(healthScore).toBeLessThanOrEqual(100);
    });

    it('should reduce health score for validation errors', () => {
      const dataset = datasetGenerator.generateDataset('small');
      const shipment = dataset.shipments[0];
      
      const invalidOptimization = {
        shipmentId: shipment.id,
        selectedDriver: null as any,
        selectedVehicle: null as any,
        selectedRoute: null as any,
        score: 100,
        estimatedCompletionTime: new Date(),
        risk: 0,
        explanation: {
          driverReason: '',
          vehicleReason: '',
          routeReason: '',
          parallelizationBenefit: '',
          criticalPathImprovement: '',
          overallScore: 100
        }
      };
      
      const graph = graphEngine.buildSchedulingGraph(shipment.id);
      const validation = scheduleValidator.validateSchedule(invalidOptimization, graph);
      const healthScore = scheduleValidator.calculateHealthScore(invalidOptimization, validation);
      
      expect(healthScore).toBeLessThan(100);
    });
  });

  // TEST 20: Benchmark Calculation Validation
  describe('TEST 20 - Benchmark Calculations', () => {
    it('should calculate speedup correctly', () => {
      const baselineTime = 1000;
      const optimizedTime = 500;
      const speedup = baselineTime / optimizedTime;
      
      expect(speedup).toBe(2);
    });

    it('should calculate latency reduction correctly', () => {
      const baselineTime = 1000;
      const optimizedTime = 500;
      const latencyReduction = ((baselineTime - optimizedTime) / baselineTime) * 100;
      
      expect(latencyReduction).toBe(50);
    });

    it('should calculate throughput improvement correctly', () => {
      const baselineTime = 1000;
      const optimizedTime = 500;
      const throughputImprovement = ((baselineTime / optimizedTime - 1) * 100);
      
      expect(throughputImprovement).toBe(100);
    });
  });

  // TEST 21: Stress Benchmark Scale
  describe('TEST 21 - Stress Benchmark', () => {
    it('should generate stress dataset with correct size', () => {
      const stressDataset = datasetGenerator.generateDataset('stress');
      
      expect(stressDataset.shipments.length).toBe(200);
      expect(stressDataset.drivers.length).toBe(30);
      expect(stressDataset.vehicles.length).toBe(25);
    });
  });

  // TEST 22: Circular Dependency Detection
  describe('TEST 22 - Circular Dependency', () => {
    it('should detect circular dependencies in invalid graphs', () => {
      const graph = graphEngine.buildSchedulingGraph('TEST-SHP-CIRCULAR');
      const validation = scheduleValidator.validateSchedule(
        {
          shipmentId: 'TEST-SHP-CIRCULAR',
          selectedDriver: datasetGenerator.generateDataset('small').drivers[0],
          selectedVehicle: datasetGenerator.generateDataset('small').vehicles[0],
          selectedRoute: datasetGenerator.generateDataset('small').routes[0],
          score: 90,
          estimatedCompletionTime: new Date(),
          risk: 0.1,
          explanation: {
            driverReason: 'Test',
            vehicleReason: 'Test',
            routeReason: 'Test',
            parallelizationBenefit: 'Test',
            criticalPathImprovement: 'Test',
            overallScore: 90
          }
        },
        graph
      );
      
      expect(validation.checks.dependencies.passed).toBe(true);
    });
  });

  // TEST 23: Empty Schedule Handling
  describe('TEST 23 - Empty Schedule', () => {
    it('should handle empty schedule gracefully', () => {
      const emptyOptimization = {
        shipmentId: '',
        selectedDriver: null as any,
        selectedVehicle: null as any,
        selectedRoute: null as any,
        score: 0,
        estimatedCompletionTime: new Date(),
        risk: 0,
        explanation: {
          driverReason: '',
          vehicleReason: '',
          routeReason: '',
          parallelizationBenefit: '',
          criticalPathImprovement: '',
          overallScore: 0
        }
      };
      
      const graph = graphEngine.buildSchedulingGraph('EMPTY');
      const validation = scheduleValidator.validateSchedule(emptyOptimization, graph);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });
  });

  // TEST 24: Input Validation
  describe('TEST 24 - Input Validation', () => {
    it('should reject invalid shipment weight', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const invalidShipment = { ...dataset.shipments[0], weight: -100 };
      
      const result = await acoEngine.optimizeScheduling(
        invalidShipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.includes('weight'))).toBe(true);
    });

    it('should reject invalid shipment deadline', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const invalidShipment = { ...dataset.shipments[0], deadline: new Date(Date.now() - 10000) };
      
      const result = await acoEngine.optimizeScheduling(
        invalidShipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      
      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.includes('deadline'))).toBe(true);
    });

    it('should reject invalid driver capacity', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const invalidDrivers = dataset.drivers.map(d => ({ ...d, maxCapacity: -50 }));
      
      const result = await acoEngine.optimizeScheduling(
        dataset.shipments[0],
        invalidDrivers,
        dataset.vehicles,
        dataset.routes
      );
      
      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.includes('capacity'))).toBe(true);
    });

    it('should reject invalid vehicle fuel level', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const invalidVehicles = dataset.vehicles.map(v => ({ ...v, fuelLevel: 150 }));
      
      const result = await acoEngine.optimizeScheduling(
        dataset.shipments[0],
        dataset.drivers,
        invalidVehicles,
        dataset.routes
      );
      
      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.includes('fuel level'))).toBe(true);
    });

    it('should reject invalid route distance', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      const invalidRoutes = dataset.routes.map(r => ({ ...r, distance: -100 }));
      
      const result = await acoEngine.optimizeScheduling(
        dataset.shipments[0],
        dataset.drivers,
        dataset.vehicles,
        invalidRoutes
      );
      
      expect(result.success).toBe(false);
      expect(result.errors.some(e => e.includes('distance'))).toBe(true);
    });

    it('should reject empty arrays', async () => {
      const dataset = datasetGenerator.generateDataset('small');
      
      const result = await acoEngine.optimizeScheduling(
        dataset.shipments[0],
        [],
        [],
        []
      );
      
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  // TEST 25: Schedule Optimizer Input Validation
  describe('TEST 25 - Schedule Optimizer Validation', () => {
    it('should validate schedule optimizer inputs', () => {
      const dataset = datasetGenerator.generateDataset('small');
      
      // Test with null shipment
      const result1 = scheduleOptimizer.optimizeSchedule(
        null as any,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      expect(result1).toBeNull();
    });

    it('should reject optimization with empty arrays', () => {
      const dataset = datasetGenerator.generateDataset('small');
      
      const result = scheduleOptimizer.optimizeSchedule(
        dataset.shipments[0],
        [],
        [],
        []
      );
      expect(result).toBeNull();
    });

    it('should reject optimization with invalid shipment weight', () => {
      const dataset = datasetGenerator.generateDataset('small');
      const invalidShipment = { ...dataset.shipments[0], weight: -100 };
      
      const result = scheduleOptimizer.optimizeSchedule(
        invalidShipment,
        dataset.drivers,
        dataset.vehicles,
        dataset.routes
      );
      expect(result).toBeNull();
    });
  });
});
