// Supply Chain Time Machine Type Definitions

export type DisruptionType = 
  | 'supplier_failure'
  | 'port_closure'
  | 'factory_shutdown'
  | 'weather_disruption'
  | 'fuel_price_increase'
  | 'demand_spike'
  | 'customs_delay'
  | 'cyberattack'
  | 'labor_strike'
  | 'transportation_accident'
  | 'earthquake'
  | 'flood'
  | 'war'
  | 'pandemic'
  | 'warehouse_fire'
  | 'vehicle_breakdown';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export type ImpactCategory = 
  | 'inventory'
  | 'production'
  | 'logistics'
  | 'financial'
  | 'customer'
  | 'supplier'
  | 'warehouse';

export type RecoveryStrategyType = 
  | 'reroute'
  | 'alternate_supplier'
  | 'inventory_redistribution'
  | 'emergency_procurement'
  | 'production_scaling'
  | 'demand_management'
  | 'expedited_shipping'
  | 'buffer_stock_release';

export type RankingCriteria = 'cost' | 'time' | 'sustainability' | 'risk';

export interface DisruptionScenario {
  id: string;
  name: string;
  description: string;
  disruptionType: DisruptionType;
  severity: SeverityLevel;
  location: {
    type: 'supplier' | 'warehouse' | 'port' | 'route' | 'factory';
    id: string;
    name: string;
    coordinates?: { lat: number; lng: number };
  };
  startTime: Date;
  estimatedDuration: number; // in hours
  parameters: {
    [key: string]: number | string | boolean;
  };
  createdAt: Date;
  createdBy: string;
}

export interface CascadingImpact {
  category: ImpactCategory;
  affectedEntities: {
    id: string;
    name: string;
    type: string;
    impactSeverity: SeverityLevel;
  }[];
  estimatedImpact: {
    timeline: number; // hours until impact
    magnitude: number; // 0-100 scale
    confidence: number; // 0-100 confidence score
  };
  financialImpact: {
    immediateCost: number;
    ongoingCostPerHour: number;
    totalEstimatedCost: number;
  };
  operationalImpact: {
    productionCapacity: number; // percentage
    inventoryCoverage: number; // days
    deliveryDelays: number; // average hours
    customerImpact: number; // percentage of customers affected
  };
}

export interface PredictedConsequences {
  scenarioId: string;
  predictionTime: Date;
  confidence: number; // overall confidence score
  cascadingImpacts: CascadingImpact[];
  timeline: {
    hours: number;
    events: {
      time: number; // hours from start
      event: string;
      severity: SeverityLevel;
      confidence: number;
    }[];
  };
  affectedCustomers: {
    customerId: string;
    customerName: string;
    impactLevel: SeverityLevel;
    estimatedDelay: number;
    alternativeOptions: string[];
  }[];
  inventoryDepletion: {
    sku: string;
    currentStock: number;
    depletionRate: number;
    stockoutTime: number; // hours until stockout
    affectedWarehouses: string[];
  }[];
  productionInterruptions: {
    factoryId: string;
    factoryName: string;
    interruptionType: string;
    estimatedDuration: number;
    capacityReduction: number;
  }[];
}

export interface RecoveryStrategy {
  id: string;
  name: string;
  description: string;
  strategyType: RecoveryStrategyType;
  estimatedCost: number;
  estimatedTime: number; // hours to implement
  effectiveness: number; // 0-100
  confidence: number; // 0-100
  sustainabilityScore: number; // 0-100
  riskLevel: SeverityLevel;
  requirements: {
    resources: string[];
    approvals: string[];
    dependencies: string[];
  };
  expectedOutcomes: {
    costReduction: number;
    timeReduction: number;
    customerImpact: number;
    riskMitigation: number;
  };
  aiReasoning: {
    whyRecommended: string;
    supportingEvidence: string[];
    potentialDrawbacks: string[];
    alternativesConsidered: string[];
  };
}

export interface StrategyRanking {
  strategyId: string;
  rankings: {
    criteria: RankingCriteria;
    score: number;
    weight: number;
  }[];
  overallScore: number;
  rank: number;
  recommendation: 'primary' | 'secondary' | 'fallback';
}

export interface SimulationResult {
  id: string;
  scenarioId: string;
  timestamp: Date;
  predictedConsequences: PredictedConsequences;
  recoveryStrategies: RecoveryStrategy[];
  strategyRankings: StrategyRanking[];
  simulationMetadata: {
    executionTime: number;
    dataPointsAnalyzed: number;
    modelVersion: string;
    confidenceThreshold: number;
  };
}

export interface ScenarioComparison {
  scenarios: {
    scenario: DisruptionScenario;
    result: SimulationResult;
  }[];
  comparisonMetrics: {
    totalFinancialImpact: number[];
    totalCustomersAffected: number[];
    averageDelay: number[];
    recoveryTime: number[];
    bestStrategy: string[];
  };
  recommendation: {
    preferredScenario: string;
    reasoning: string;
    confidence: number;
  };
}

export interface SimulationReplay {
  resultId: string;
  currentTime: number; // hours into simulation
  playbackSpeed: number;
  events: {
    time: number;
    description: string;
    impact: CascadingImpact;
    activeStrategies: RecoveryStrategy[];
  }[];
  isPlaying: boolean;
}

export interface TimeMachineDashboardData {
  activeScenarios: DisruptionScenario[];
  recentSimulations: SimulationResult[];
  systemHealth: {
    digitalTwinSync: number;
    modelAccuracy: number;
    dataFreshness: number;
  };
  quickActions: {
    createScenario: boolean;
    runSimulation: boolean;
    compareScenarios: boolean;
    viewHistory: boolean;
  };
}
