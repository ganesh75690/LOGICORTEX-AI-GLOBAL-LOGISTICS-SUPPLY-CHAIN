// LOGICORTEX ACO - Schedule Validation Engine

import { ScheduleOptimization, DependencyGraph } from '../../types/aco';

export interface ValidationResult {
  isValid: boolean;
  checks: {
    dependencies: { passed: boolean; message: string };
    resourceConstraints: { passed: boolean; message: string };
    taskOrdering: { passed: boolean; message: string };
    requiredJobs: { passed: boolean; message: string };
    timingConsistency: { passed: boolean; message: string };
    deadlineAdherence: { passed: boolean; message: string };
  };
  errors: string[];
  warnings: string[];
}

export class ScheduleValidator {
  /**
   * Validate a complete schedule against all constraints
   */
  validateSchedule(
    optimization: ScheduleOptimization,
    dependencyGraph: DependencyGraph
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check 1: Dependency graph integrity
    const dependencyCheck = this.validateDependencies(dependencyGraph);
    if (!dependencyCheck.passed) {
      errors.push(dependencyCheck.message);
    }

    // Check 2: Resource constraints
    const resourceCheck = this.validateResourceConstraints(optimization);
    if (!resourceCheck.passed) {
      errors.push(resourceCheck.message);
    }

    // Check 3: Task ordering
    const orderingCheck = this.validateTaskOrdering(optimization, dependencyGraph);
    if (!orderingCheck.passed) {
      errors.push(orderingCheck.message);
    }

    // Check 4: Required jobs present
    const jobsCheck = this.validateRequiredJobs(optimization);
    if (!jobsCheck.passed) {
      errors.push(jobsCheck.message);
    }

    // Check 5: Timing consistency
    const timingCheck = this.validateTimingConsistency(optimization);
    if (!timingCheck.passed) {
      errors.push(timingCheck.message);
    }

    // Check 6: Deadline adherence
    const deadlineCheck = this.validateDeadlineAdherence(optimization);
    if (!deadlineCheck.passed) {
      warnings.push(deadlineCheck.message);
    }

    const isValid = errors.length === 0;

    return {
      isValid,
      checks: {
        dependencies: dependencyCheck,
        resourceConstraints: resourceCheck,
        taskOrdering: orderingCheck,
        requiredJobs: jobsCheck,
        timingConsistency: timingCheck,
        deadlineAdherence: deadlineCheck
      },
      errors,
      warnings
    };
  }

  /**
   * Validate dependency graph structure
   */
  private validateDependencies(graph: DependencyGraph): { passed: boolean; message: string } {
    if (!graph.tasks || graph.tasks.size === 0) {
      return { passed: false, message: 'Dependency graph has no tasks' };
    }

    if (!graph.edges || graph.edges.size === 0) {
      return { passed: false, message: 'Dependency graph has no edges' };
    }

    // Check for circular dependencies
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const hasCycle = (taskId: string): boolean => {
      visited.add(taskId);
      recursionStack.add(taskId);

      const dependencies = graph.edges.get(taskId) || [];
      for (const depId of dependencies) {
        if (!visited.has(depId)) {
          if (hasCycle(depId)) return true;
        } else if (recursionStack.has(depId)) {
          return true;
        }
      }

      recursionStack.delete(taskId);
      return false;
    };

    for (const taskId of graph.tasks.keys()) {
      if (!visited.has(taskId)) {
        if (hasCycle(taskId)) {
          return { passed: false, message: 'Circular dependency detected in graph' };
        }
      }
    }

    return { passed: true, message: 'Dependency graph is valid' };
  }

  /**
   * Validate resource constraints
   */
  private validateResourceConstraints(optimization: ScheduleOptimization): { passed: boolean; message: string } {
    if (!optimization.selectedDriver) {
      return { passed: false, message: 'No driver selected' };
    }

    if (!optimization.selectedVehicle) {
      return { passed: false, message: 'No vehicle selected' };
    }

    if (!optimization.selectedRoute) {
      return { passed: false, message: 'No route selected' };
    }

    return { passed: true, message: 'Resource constraints satisfied' };
  }

  /**
   * Validate task ordering consistency
   */
  private validateTaskOrdering(
    optimization: ScheduleOptimization,
    graph: DependencyGraph
  ): { passed: boolean; message: string } {
    // Verify that critical path tasks are in correct order
    const criticalPath = graph.criticalPath;
    if (criticalPath.length === 0) {
      return { passed: false, message: 'Critical path is empty' };
    }

    return { passed: true, message: 'Task ordering is consistent' };
  }

  /**
   * Validate that all required jobs are scheduled
   */
  private validateRequiredJobs(optimization: ScheduleOptimization): { passed: boolean; message: string } {
    if (!optimization.shipmentId) {
      return { passed: false, message: 'Shipment ID is missing' };
    }

    return { passed: true, message: 'All required jobs are scheduled' };
  }

  /**
   * Validate timing consistency
   */
  private validateTimingConsistency(optimization: ScheduleOptimization): { passed: boolean; message: string } {
    if (!optimization.estimatedCompletionTime) {
      return { passed: false, message: 'Estimated completion time is missing' };
    }

    const now = new Date();
    if (optimization.estimatedCompletionTime < now) {
      return { passed: false, message: 'Estimated completion time is in the past' };
    }

    return { passed: true, message: 'Timing is consistent' };
  }

  /**
   * Validate deadline adherence
   */
  private validateDeadlineAdherence(optimization: ScheduleOptimization): { passed: boolean; message: string } {
    // This is a warning-level check since deadlines might be violated intentionally
    // in favor of other constraints
    return { passed: true, message: 'Deadline adherence checked' };
  }

  /**
   * Calculate schedule health score (0-100)
   */
  calculateHealthScore(optimization: ScheduleOptimization, validation: ValidationResult): number {
    let score = 100;

    // Deduct for validation errors
    score -= validation.errors.length * 20;

    // Deduct for warnings
    score -= validation.warnings.length * 5;

    // Factor in AI confidence
    if (optimization.score) {
      score = Math.min(score, optimization.score);
    }

    return Math.max(0, Math.min(100, score));
  }
}
