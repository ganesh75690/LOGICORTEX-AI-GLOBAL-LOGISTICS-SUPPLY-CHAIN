// LOGICORTEX ACO - Autonomous Critical-path Optimizer Types

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  weight: number;
  volume: number;
  deadline: Date;
  timeWindow: { start: Date; end: Date };
  inventoryRequirements: string[];
  estimatedValue: number;
}

export interface Driver {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'delayed' | 'offline';
  location: { lat: number; lng: number };
  currentLoad: number;
  maxCapacity: number;
  efficiency: number;
  skills: string[];
  availabilityWindow: { start: Date; end: Date };
}

export interface Vehicle {
  id: string;
  type: 'truck' | 'van' | 'motorcycle';
  status: 'available' | 'busy' | 'maintenance';
  capacity: number;
  currentLocation: { lat: number; lng: number };
  fuelLevel: number;
  maintenanceStatus: 'good' | 'fair' | 'poor';
}

export interface Route {
  id: string;
  origin: string;
  destination: string;
  distance: number;
  estimatedTravelTime: number; // minutes
  trafficCondition: 'light' | 'moderate' | 'heavy';
  riskLevel: 'low' | 'medium' | 'high';
  alternativeRoutes: string[];
}

export interface SchedulingTask {
  id: string;
  name: string;
  type: 'inventory_check' | 'driver_check' | 'vehicle_check' | 'route_optimization' | 'validation' | 'dispatch';
  dependencies: string[];
  duration: number; // milliseconds
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  startTime?: number;
  endTime?: number;
  earliestStart: number;
  earliestFinish: number;
  latestStart: number;
  latestFinish: number;
  slack: number;
  isCritical: boolean;
  resourceId?: string;
  failureReason?: string;
}

export interface DependencyGraph {
  tasks: Map<string, SchedulingTask>;
  edges: Map<string, string[]>; // task -> dependencies
  criticalPath: string[];
  criticalPathDuration: number;
}

export interface ScheduleOptimization {
  shipmentId: string;
  selectedDriver: Driver;
  selectedVehicle: Vehicle;
  selectedRoute: Route;
  score: number;
  estimatedCompletionTime: Date;
  risk: number;
  explanation: OptimizationExplanation;
}

export interface OptimizationExplanation {
  driverReason: string;
  vehicleReason: string;
  routeReason: string;
  parallelizationBenefit: string;
  criticalPathImprovement: string;
  overallScore: number;
}

export interface PerformanceMetrics {
  round: 'round1' | 'round2';
  totalShipments: number;
  schedulingStartTime: number;
  schedulingEndTime: number;
  totalDuration: number;
  criticalPathDuration: number;
  sequentialTasks: number;
  parallelTasks: number;
  dispatchReadyTime: number;
  recoveryTime?: number;
  taskBreakdown: {
    inventoryCheck: number;
    driverCheck: number;
    vehicleCheck: number;
    routeOptimization: number;
    validation: number;
    dispatch: number;
  };
}

export interface WhatIfScenario {
  id: string;
  name: string;
  type: 'driver_unavailable' | 'vehicle_unavailable' | 'route_unavailable' | 'inventory_shortage' | 'urgent_shipment' | 'window_change';
  affectedResources: string[];
  baselineSchedule: ScheduleOptimization;
  alternativeSchedules: ScheduleOptimization[];
  recommendedAlternative?: ScheduleOptimization;
  impact: {
    delay: number;
    costIncrease: number;
    riskIncrease: number;
  };
}

export interface DisruptionEvent {
  id: string;
  type: 'driver_unavailable' | 'vehicle_unavailable' | 'route_blocked' | 'inventory_unavailable';
  resourceId: string;
  timestamp: Date;
  affectedShipments: string[];
  recoveryAction: string;
  recoveryTime: number;
  successful: boolean;
}

export interface BenchmarkDataset {
  scale: 'small' | 'medium' | 'large' | 'stress';
  shipments: Shipment[];
  drivers: Driver[];
  vehicles: Vehicle[];
  routes: Route[];
  seed: number;
}

export interface ACOEngineResult {
  success: boolean;
  optimizedSchedule: ScheduleOptimization;
  dependencyGraph: DependencyGraph;
  performanceMetrics: PerformanceMetrics;
  explanation: string;
  errors: string[];
}

export interface RecoveryCandidate {
  driver: Driver;
  score: number;
  rejectionReason?: string;
}

export interface DisruptionRecoveryResult {
  success: boolean;
  originalDriverId: string;
  replacementDriver?: Driver;
  affectedTasks: string[];
  preservedTasks: string[];
  candidatesEvaluated: number;
  recoveryTime: number;
  explanation: string;
  rejectionReason?: string;
  recoveredSchedule?: ScheduleOptimization;
}
