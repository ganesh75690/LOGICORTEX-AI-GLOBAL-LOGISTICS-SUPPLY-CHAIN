// LOGICORTEX ACO - Dependency Graph Engine

import { SchedulingTask, DependencyGraph } from '../../types/aco';

export class DependencyGraphEngine {
  private tasks: Map<string, SchedulingTask>;
  private edges: Map<string, string[]>;

  constructor() {
    this.tasks = new Map();
    this.edges = new Map();
  }

  /**
   * Build dependency graph for a shipment scheduling workflow
   * The workflow: Order → (Inventory, Driver, Vehicle) → Route → Validation → Dispatch
   */
  buildSchedulingGraph(shipmentId: string): DependencyGraph {
    this.tasks.clear();
    this.edges.clear();

    // Define task durations (in milliseconds) - realistic estimates
    const taskDurations = {
      inventory_check: 150,    // 150ms
      driver_check: 120,       // 120ms
      vehicle_check: 100,      // 100ms
      route_optimization: 400, // 400ms - typically the bottleneck
      validation: 80,          // 80ms
      dispatch: 50             // 50ms
    };

    // Create tasks
    const inventoryTask = this.createTask(
      `${shipmentId}-inventory`,
      'Inventory Check',
      'inventory_check',
      [],
      taskDurations.inventory_check
    );

    const driverTask = this.createTask(
      `${shipmentId}-driver`,
      'Driver Availability Check',
      'driver_check',
      [],
      taskDurations.driver_check
    );

    const vehicleTask = this.createTask(
      `${shipmentId}-vehicle`,
      'Vehicle Availability Check',
      'vehicle_check',
      [],
      taskDurations.vehicle_check
    );

    const routeTask = this.createTask(
      `${shipmentId}-route`,
      'Route Optimization',
      'route_optimization',
      [inventoryTask.id, driverTask.id, vehicleTask.id], // Depends on all three checks
      taskDurations.route_optimization
    );

    const validationTask = this.createTask(
      `${shipmentId}-validation`,
      'Time Window Validation',
      'validation',
      [routeTask.id],
      taskDurations.validation
    );

    const dispatchTask = this.createTask(
      `${shipmentId}-dispatch`,
      'Dispatch Ready',
      'dispatch',
      [validationTask.id],
      taskDurations.dispatch
    );

    // Build edges
    this.edges.set(inventoryTask.id, []);
    this.edges.set(driverTask.id, []);
    this.edges.set(vehicleTask.id, []);
    this.edges.set(routeTask.id, [inventoryTask.id, driverTask.id, vehicleTask.id]);
    this.edges.set(validationTask.id, [routeTask.id]);
    this.edges.set(dispatchTask.id, [validationTask.id]);

    // Calculate critical path
    const criticalPath = this.calculateCriticalPath();

    return {
      tasks: this.tasks,
      edges: this.edges,
      criticalPath: criticalPath.path,
      criticalPathDuration: criticalPath.duration
    };
  }

  private createTask(
    id: string,
    name: string,
    type: SchedulingTask['type'],
    dependencies: string[],
    duration: number
  ): SchedulingTask {
    const task: SchedulingTask = {
      id,
      name,
      type,
      dependencies,
      duration,
      status: 'pending',
      earliestStart: 0,
      earliestFinish: 0,
      latestStart: 0,
      latestFinish: 0,
      slack: 0,
      isCritical: false
    };

    this.tasks.set(id, task);
    return task;
  }

  /**
   * Calculate critical path using Critical Path Method (CPM)
   * Forward pass: Calculate earliest start (ES) and earliest finish (EF)
   * Backward pass: Calculate latest start (LS) and latest finish (LF)
   * Slack = LS - ES (or LF - EF)
   * Critical tasks have zero slack
   */
  private calculateCriticalPath(): { path: string[]; duration: number } {
    // Forward pass - calculate ES and EF
    const visited = new Set<string>();
    const calculateEarliest = (taskId: string): number => {
      if (visited.has(taskId)) {
        const task = this.tasks.get(taskId);
        return task ? task.earliestFinish : 0;
      }
      visited.add(taskId);

      const task = this.tasks.get(taskId);
      if (!task) return 0;

      const dependencies = this.edges.get(taskId) || [];
      let maxDependencyFinish = 0;

      for (const depId of dependencies) {
        const depFinish = calculateEarliest(depId);
        maxDependencyFinish = Math.max(maxDependencyFinish, depFinish);
      }

      task.earliestStart = maxDependencyFinish;
      task.earliestFinish = task.earliestStart + task.duration;

      return task.earliestFinish;
    };

    // Calculate earliest times for all tasks
    visited.clear();
    for (const taskId of this.tasks.keys()) {
      calculateEarliest(taskId);
    }

    // Find project completion time (max EF)
    let projectCompletion = 0;
    for (const task of this.tasks.values()) {
      projectCompletion = Math.max(projectCompletion, task.earliestFinish);
    }

    // Backward pass - calculate LS and LF
    const visitedLatest = new Set<string>();
    const calculateLatest = (taskId: string, projectEnd: number): number => {
      if (visitedLatest.has(taskId)) {
        const task = this.tasks.get(taskId);
        return task ? task.latestStart : projectEnd;
      }
      visitedLatest.add(taskId);

      const task = this.tasks.get(taskId);
      if (!task) return projectEnd;

      // Find tasks that depend on this one
      const dependents = [];
      for (const [otherTaskId, deps] of this.edges.entries()) {
        if (deps.includes(taskId)) {
          dependents.push(otherTaskId);
        }
      }

      if (dependents.length === 0) {
        // No dependents - this is an end task
        task.latestFinish = projectEnd;
      } else {
        // Latest finish is min of dependents' latest start
        let minDependentStart = Infinity;
        for (const depId of dependents) {
          const depTask = this.tasks.get(depId);
          if (depTask) {
            const depLatestStart = calculateLatest(depId, projectEnd);
            minDependentStart = Math.min(minDependentStart, depLatestStart);
          }
        }
        task.latestFinish = minDependentStart;
      }

      task.latestStart = task.latestFinish - task.duration;
      task.slack = task.latestStart - task.earliestStart;
      task.isCritical = Math.abs(task.slack) < 1; // Consider zero or near-zero slack as critical

      return task.latestStart;
    };

    // Calculate latest times for all tasks
    visitedLatest.clear();
    for (const taskId of this.tasks.keys()) {
      calculateLatest(taskId, projectCompletion);
    }

    // Extract critical path (tasks with zero slack in dependency order)
    const criticalPath: string[] = [];
    const visitedCritical = new Set<string>();

    const findCriticalPath = (taskId: string): void => {
      if (visitedCritical.has(taskId)) return;
      visitedCritical.add(taskId);

      const task = this.tasks.get(taskId);
      if (task && task.isCritical) {
        criticalPath.push(taskId);

        // Follow critical dependencies
        const dependencies = this.edges.get(taskId) || [];
        for (const depId of dependencies) {
          const depTask = this.tasks.get(depId);
          if (depTask && depTask.isCritical) {
            findCriticalPath(depId);
          }
        }
      }
    };

    // Start from end tasks (tasks with no dependents)
    const endTasks: string[] = [];
    for (const taskId of this.tasks.keys()) {
      const hasDependents = Array.from(this.edges.values()).some(d => d.includes(taskId));
      if (!hasDependents) {
        endTasks.push(taskId);
      }
    }

    // Find critical path from each end task
    for (const endTaskId of endTasks) {
      findCriticalPath(endTaskId);
    }

    // Reverse to get correct order (start to end)
    criticalPath.reverse();

    // Remove duplicates while preserving order
    const uniqueCriticalPath = Array.from(new Set(criticalPath));

    return {
      path: uniqueCriticalPath,
      duration: projectCompletion
    };
  }

  /**
   * Get tasks that can be executed in parallel (no dependencies between them)
   */
  getParallelizableTasks(): string[][] {
    const parallelGroups: string[][] = [];
    
    // Find all tasks with no dependencies (can start immediately)
    const independentTasks: string[] = [];
    for (const taskId of this.tasks.keys()) {
      const dependencies = this.edges.get(taskId) || [];
      if (dependencies.length === 0) {
        independentTasks.push(taskId);
      }
    }

    // If we have multiple independent tasks, they can run in parallel
    if (independentTasks.length > 1) {
      parallelGroups.push(independentTasks);
    }

    return parallelGroups;
  }

  /**
   * Update task status and timing
   */
  updateTaskStatus(taskId: string, status: SchedulingTask['status'], startTime?: number, endTime?: number): void {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = status;
      if (startTime !== undefined) task.startTime = startTime;
      if (endTime !== undefined) task.endTime = endTime;
    }
  }

  /**
   * Get task by ID
   */
  getTask(taskId: string): SchedulingTask | undefined {
    return this.tasks.get(taskId);
  }

  /**
   * Get all tasks
   */
  getAllTasks(): SchedulingTask[] {
    return Array.from(this.tasks.values());
  }

  /**
   * Reset graph for new scheduling run
   */
  reset(): void {
    this.tasks.clear();
    this.edges.clear();
  }
}
