export interface NetworkAutopilotEvent {
  id: string;
  type: 'rebalance' | 'reroute' | 'efficiency' | 'congestion';
  title: string;
  description: string;
  impact: {
    onTime: number;
    fuel: number;
    cost: number;
  };
  affected: {
    drivers: number;
    routes: number;
    suppliers: number;
  };
  status: 'proposed' | 'applied' | 'rejected';
  timestamp: Date;
  proposedAt: Date;
  appliedAt?: Date;
  rejectedAt?: Date;
  rejectedReason?: string;
  details?: Record<string, any>;
  confidence?: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  estimatedDuration?: number;
  actualDuration?: number;
  performanceMetrics?: {
    beforeOptimization: {
      avgDeliveryTime: number;
      fuelConsumption: number;
      costPerDelivery: number;
      onTimeDeliveryRate: number;
    };
    afterOptimization: {
      avgDeliveryTime: number;
      fuelConsumption: number;
      costPerDelivery: number;
      onTimeDeliveryRate: number;
    };
  };
  relatedDrivers?: any[];
  relatedRoutes?: any[];
  relatedSuppliers?: any[];
  createdBy?: string;
  tags?: string[];
  notes?: string;
  duration?: number;
  efficiencyScore?: number;
}

export interface NetworkAutopilotStats {
  totalOptimizations: number;
  avgOnTimeImprovement: string;
  avgFuelReduction: string;
  costSavings: number;
  networkEfficiency: string;
  lastOptimization: Date | null;
}

export interface NetworkAutopilotConfig {
  isRunning: boolean;
  optimizationInterval: number; // in milliseconds
  maxConcurrentOptimizations: number;
  autoApplyDelay: number; // in milliseconds
  confidenceThreshold: number; // minimum confidence to apply
  enableRealTimeUpdates: boolean;
  notificationSettings: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  optimizationSettings: {
    enableRebalance: boolean;
    enableReroute: boolean;
    enableEfficiency: boolean;
    enableCongestion: boolean;
    weights: {
      rebalance: number;
      reroute: number;
      efficiency: number;
      congestion: number;
    };
  };
}

export interface NetworkAutopilotMetrics {
  networkState: {
    totalDrivers: number;
    activeRoutes: number;
    completedRoutes: number;
    utilizationRate: string;
  };
  recentImpact: {
    optimizationsCount: number;
    totalImpact: {
      onTime: number;
      fuel: number;
      cost: number;
    };
    avgImpact: {
      onTime: string;
      fuel: string;
      cost: string;
    };
  };
  networkEfficiency: string;
  timestamp: Date;
}

export interface OptimizationResult {
  success: boolean;
  optimization?: NetworkAutopilotEvent;
  error?: string;
  message?: string;
}

export interface OptimizationRequest {
  type: 'rebalance' | 'reroute' | 'efficiency' | 'congestion';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  targetDrivers?: string[];
  targetRoutes?: string[];
  targetSuppliers?: string[];
  constraints?: {
    maxDistance?: number;
    maxDuration?: number;
    maxCost?: number;
  };
}

export interface NetworkAutopilotHistory {
  optimizations: NetworkAutopilotEvent[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface OptimizationSummary {
  types: Array<{
    _id: string;
    count: number;
    applied: number;
    rejected: number;
    pending: number;
    avgImpact: number;
    lastOptimization: string;
  }>;
  totalTypes: number;
}

export interface PerformanceMetrics {
  beforeOptimization: {
    avgDeliveryTime: number;
    fuelConsumption: number;
    costPerDelivery: number;
    onTimeDeliveryRate: number;
  };
  afterOptimization: {
    avgDeliveryTime: number;
    fuelConsumption: number;
    costPerDelivery: number;
    onTimeDeliveryRate: number;
  };
  improvements: {
    avgDeliveryTime: string;
    fuelConsumption: string;
    costPerDelivery: string;
    onTimeDeliveryRate: string;
  };
}

export interface OptimizationTrends {
  date: string;
  type: string;
  count: number;
  avgOnTime: number;
  avgFuel: number;
}

export interface NetworkAutopilotSettings {
  config: NetworkAutopilotConfig;
  permissions: {
    canStart: boolean;
    canStop: boolean;
    canManualOptimize: boolean;
    canApplyOptimizations: boolean;
    canRejectOptimizations: boolean;
    canViewDetails: boolean;
    canExportData: boolean;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
}

export enum OptimizationStatus {
  PROPOSED = 'proposed',
  APPLIED = 'applied',
  REJECTED = 'rejected'
}

export enum OptimizationType {
  REBALANCE = 'rebalance',
  REROUTE = 'reroute',
  EFFICIENCY = 'efficiency',
  CONGESTION = 'congestion'
}

export enum OptimizationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface OptimizationFilter {
  type?: OptimizationType;
  status?: OptimizationStatus;
  priority?: OptimizationPriority;
  dateRange?: {
    start: Date;
    end: Date;
  };
  driverIds?: string[];
  routeIds?: string[];
  supplierIds?: string[];
}

export interface OptimizationExportOptions {
  format: 'json' | 'csv' | 'xlsx';
  dateRange?: {
    start: Date;
    end: Date;
  };
  type?: OptimizationType;
  includeDetails?: boolean;
  includeMetrics?: boolean;
}

export interface NetworkAutopilotWebSocketMessage {
  type: 'status_update' | 'new_optimization' | 'optimization_applied' | 'optimization_rejected' | 'metrics_update';
  data: any;
  timestamp: Date;
}

export interface RealTimeUpdate {
  event: NetworkAutopilotEvent;
  action: 'created' | 'updated' | 'applied' | 'rejected';
  timestamp: Date;
}

// Utility types
export type OptimizationTypeKey = keyof typeof OptimizationType;
export type OptimizationStatusKey = keyof typeof OptimizationStatus;
export type OptimizationPriorityKey = keyof typeof OptimizationPriority;
