// LOGICORTEX ACO - Parallel Execution Engine

import { SchedulingTask, DependencyGraph } from '../../types/aco';
import { DependencyGraphEngine } from './DependencyGraphEngine';

export interface TaskExecutionResult {
  taskId: string;
  success: boolean;
  duration: number;
  startTime: number;
  endTime: number;
  error?: string;
}

export class ParallelExecutionEngine {
  private graphEngine: DependencyGraphEngine;
  private dependencyGraph: DependencyGraph;
  private executionResults: Map<string, TaskExecutionResult>;

  constructor(graphEngine: DependencyGraphEngine) {
    this.graphEngine = graphEngine;
    this.dependencyGraph = graphEngine.buildSchedulingGraph('temp'); // Will be replaced
    this.executionResults = new Map();
  }

  setDependencyGraph(graph: DependencyGraph): void {
    this.dependencyGraph = graph;
  }

  /**
   * Execute tasks in parallel where possible, respecting dependencies
   * This is the Round 2 optimized execution
   */
  async executeParallel(): Promise<Map<string, TaskExecutionResult>> {
    this.executionResults.clear();
    const startTime = performance.now();

    // Get all tasks
    const allTasks = Array.from(this.dependencyGraph.tasks.values());

    // Execute tasks in dependency order, parallelizing independent tasks
    await this.executeTasksWithParallelization(allTasks);

    const endTime = performance.now();
    console.log(`Parallel execution completed in ${(endTime - startTime).toFixed(2)}ms`);

    return this.executionResults;
  }

  /**
   * Execute tasks sequentially (Round 1 baseline)
   */
  async executeSequential(): Promise<Map<string, TaskExecutionResult>> {
    this.executionResults.clear();
    const startTime = performance.now();

    // Get all tasks in dependency order
    const executionOrder = this.getTopologicalOrder();

    for (const taskId of executionOrder) {
      await this.executeTask(taskId);
    }

    const endTime = performance.now();
    console.log(`Sequential execution completed in ${(endTime - startTime).toFixed(2)}ms`);

    return this.executionResults;
  }

  /**
   * Execute tasks with parallelization - independent tasks run concurrently
   */
  private async executeTasksWithParallelization(tasks: SchedulingTask[]): Promise<void> {
    const executed = new Set<string>();
    const executing = new Set<string>();

    const canExecute = (task: SchedulingTask): boolean => {
      if (executed.has(task.id) || executing.has(task.id)) return false;

      const dependencies = this.dependencyGraph.edges.get(task.id) || [];
      return dependencies.every(depId => executed.has(depId));
    };

    const executeReadyTasks = async (): Promise<void> => {
      const readyTasks = tasks.filter(task => canExecute(task));

      if (readyTasks.length === 0) {
        return;
      }

      // Mark as executing
      readyTasks.forEach(task => executing.add(task.id));

      // Execute ready tasks in parallel
      const promises = readyTasks.map(task => this.executeTask(task.id));
      await Promise.all(promises);

      // Mark as executed
      readyTasks.forEach(task => {
        executing.delete(task.id);
        executed.add(task.id);
      });

      // Check if more tasks can now execute
      if (executed.size < tasks.length) {
        await executeReadyTasks();
      }
    };

    await executeReadyTasks();
  }

  /**
   * Execute a single task with simulated work
   */
  private async executeTask(taskId: string): Promise<void> {
    const task = this.dependencyGraph.tasks.get(taskId);
    if (!task) return;

    const startTime = performance.now();
    this.graphEngine.updateTaskStatus(taskId, 'running', startTime);

    try {
      // Simulate task execution with actual duration
      await this.simulateTaskWork(task);

      const endTime = performance.now();
      const duration = endTime - startTime;

      this.graphEngine.updateTaskStatus(taskId, 'completed', startTime, endTime);

      this.executionResults.set(taskId, {
        taskId,
        success: true,
        duration,
        startTime,
        endTime
      });
    } catch (error) {
      const endTime = performance.now();
      this.graphEngine.updateTaskStatus(taskId, 'failed', startTime, endTime);

      this.executionResults.set(taskId, {
        taskId,
        success: false,
        duration: endTime - startTime,
        startTime,
        endTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Simulate actual task work based on task type
   */
  private async simulateTaskWork(task: SchedulingTask): Promise<void> {
    // Simulate realistic work based on task type
    const workSimulation = async () => {
      switch (task.type) {
        case 'inventory_check':
          // Simulate inventory database query
          await this.delay(task.duration * 0.8 + Math.random() * task.duration * 0.4);
          break;
        case 'driver_check':
          // Simulate driver availability check
          await this.delay(task.duration * 0.7 + Math.random() * task.duration * 0.6);
          break;
        case 'vehicle_check':
          // Simulate vehicle status check
          await this.delay(task.duration * 0.9 + Math.random() * task.duration * 0.2);
          break;
        case 'route_optimization':
          // Simulate route calculation (typically the longest)
          await this.delay(task.duration * 0.85 + Math.random() * task.duration * 0.3);
          break;
        case 'validation':
          // Simulate time window validation
          await this.delay(task.duration * 0.8 + Math.random() * task.duration * 0.4);
          break;
        case 'dispatch':
          // Simulate dispatch preparation
          await this.delay(task.duration * 0.9 + Math.random() * task.duration * 0.2);
          break;
        default:
          await this.delay(task.duration);
      }
    };

    await workSimulation();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get topological order of tasks for sequential execution
   */
  private getTopologicalOrder(): string[] {
    const visited = new Set<string>();
    const order: string[] = [];

    const visit = (taskId: string): void => {
      if (visited.has(taskId)) return;
      visited.add(taskId);

      const dependencies = this.dependencyGraph.edges.get(taskId) || [];
      for (const depId of dependencies) {
        visit(depId);
      }

      order.push(taskId);
    };

    for (const taskId of this.dependencyGraph.tasks.keys()) {
      visit(taskId);
    }

    return order;
  }

  /**
   * Get execution results
   */
  getExecutionResults(): Map<string, TaskExecutionResult> {
    return this.executionResults;
  }

  /**
   * Get total execution time
   */
  getTotalExecutionTime(): number {
    if (this.executionResults.size === 0) return 0;

    const startTimes = Array.from(this.executionResults.values()).map(r => r.startTime);
    const endTimes = Array.from(this.executionResults.values()).map(r => r.endTime);

    return Math.max(...endTimes) - Math.min(...startTimes);
  }

  /**
   * Get critical path execution time
   */
  getCriticalPathExecutionTime(): number {
    const criticalPath = this.dependencyGraph.criticalPath;
    if (criticalPath.length === 0) return 0;

    let totalTime = 0;
    for (const taskId of criticalPath) {
      const result = this.executionResults.get(taskId);
      if (result) {
        totalTime += result.duration;
      } else {
        const task = this.dependencyGraph.tasks.get(taskId);
        if (task) totalTime += task.duration;
      }
    }

    return totalTime;
  }

  /**
   * Count parallel vs sequential tasks
   */
  getTaskExecutionStats(): { parallel: number; sequential: number } {
    const parallelGroups = this.getParallelGroups();
    const parallelCount = parallelGroups.reduce((sum, group) => sum + group.length, 0);
    const sequentialCount = this.executionResults.size - parallelCount;

    return { parallel: parallelCount, sequential: sequentialCount };
  }

  /**
   * Identify which tasks were executed in parallel
   */
  private getParallelGroups(): string[][] {
    const groups: string[][] = [];
    const results = Array.from(this.executionResults.values());

    // Group tasks that executed within overlapping time windows
    const timeWindows = new Map<string, { start: number; end: number }>();

    for (const result of results) {
      timeWindows.set(result.taskId, { start: result.startTime, end: result.endTime });
    }

    const processed = new Set<string>();

    for (const taskId of timeWindows.keys()) {
      if (processed.has(taskId)) continue;

      const window = timeWindows.get(taskId)!;
      const group = [taskId];
      processed.add(taskId);

      for (const otherTaskId of timeWindows.keys()) {
        if (processed.has(otherTaskId)) continue;

        const otherWindow = timeWindows.get(otherTaskId)!;
        // Check if time windows overlap
        if (window.start < otherWindow.end && otherWindow.start < window.end) {
          group.push(otherTaskId);
          processed.add(otherTaskId);
        }
      }

      if (group.length > 1) {
        groups.push(group);
      }
    }

    return groups;
  }
}
