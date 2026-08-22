// SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) Type Definitions

// ============================================================================
// CORE TYPES
// ============================================================================

export type CapabilityLevel = 'emerging' | 'developing' | 'competent' | 'advanced' | 'world-class';

export type GeneType = 
  | 'quality'
  | 'delivery'
  | 'innovation'
  | 'resilience'
  | 'scalability'
  | 'sustainability'
  | 'capacity'
  | 'risk'
  | 'future_readiness'
  | 'collaboration'
  | 'financial_stability'
  | 'technology_adoption';

export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export type OpportunityDifficulty = 'easy' | 'moderate' | 'challenging' | 'complex';

export type ImprovementStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

// ============================================================================
// MODULE 1: AI SUPPLIER COMMAND CENTER
// ============================================================================

export interface SupplierCommandCenter {
  id: string;
  supplierId: string;
  generatedAt: Date;
  businessHealth: {
    overallScore: number; // 0-100
    trend: 'improving' | 'stable' | 'declining';
    keyMetrics: {
      quality: { current: number; target: number; variance: number };
      delivery: { current: number; target: number; variance: number };
      capacity: { current: number; target: number; variance: number };
      sustainability: { current: number; target: number; variance: number };
    };
  };
  aiRecommendations: {
    id: string;
    priority: 'urgent' | 'high' | 'medium' | 'low';
    category: string;
    recommendation: string;
    expectedImpact: string;
    difficulty: OpportunityDifficulty;
    estimatedROI: string;
    implementationTime: string;
  }[];
  pendingImprovementTasks: {
    id: string;
    task: string;
    category: string;
    deadline: Date;
    progress: number; // 0-100
    priority: 'urgent' | 'high' | 'medium' | 'low';
  }[];
  currentCapabilityLevel: CapabilityLevel;
  futureCapabilityPrediction: {
    level: CapabilityLevel;
    confidence: number; // 0-100
    timeframe: string;
    keyDrivers: string[];
  };
  businessGrowth: {
    currentRevenue: number;
    predictedRevenue: number;
    growthRate: number;
    marketShare: number;
    newOpportunities: number;
  };
  riskAlerts: {
    id: string;
    type: string;
    severity: RiskSeverity;
    description: string;
    likelihood: number; // 0-100
    impact: number; // 0-100
    recommendedActions: string[];
  }[];
  sustainabilityStatus: {
    carbonScore: number; // 0-100
    energyEfficiency: number; // 0-100
    wasteReduction: number; // 0-100
    waterUsage: number; // 0-100
    greenCertifications: string[];
  };
  supplierEvolutionProgress: {
    currentLevel: CapabilityLevel;
    nextLevel: CapabilityLevel;
    progress: number; // 0-100
    milestones: {
      name: string;
      completed: boolean;
      completedAt?: Date;
    }[];
  };
  aiBusinessSummary: {
    executive: string;
    detailed: string;
    keyInsights: string[];
    recommendedFocus: string[];
  };
}

// ============================================================================
// MODULE 2: SUPPLIER DIGITAL TWIN™
// ============================================================================

export interface SupplierDigitalTwin {
  id: string;
  supplierId: string;
  lastUpdated: Date;
  realTimeData: {
    productionCapacity: {
      current: number;
      maximum: number;
      utilization: number; // 0-100
      efficiency: number; // 0-100
    };
    quality: {
      defectRate: number; // 0-100
      customerSatisfaction: number; // 0-100
      qualityScore: number; // 0-100
      complianceRate: number; // 0-100
    };
    inventory: {
      totalStock: number;
      turnoverRate: number;
      stockoutRate: number;
      holdingCost: number;
    };
    manufacturingSpeed: {
      cycleTime: number;
      throughput: number;
      efficiency: number; // 0-100
      bottleneck: string | null;
    };
    deliveryReliability: {
      onTimeRate: number; // 0-100
      averageLeadTime: number;
      fillRate: number; // 0-100
      carrierPerformance: number; // 0-100
    };
    financialStability: {
      cashFlow: number;
      profitMargin: number;
      debtRatio: number;
      liquidity: number;
    };
    risk: {
      overallRisk: number; // 0-100
      supplyRisk: number; // 0-100
      operationalRisk: number; // 0-100
      financialRisk: number; // 0-100
    };
    seasonality: {
      pattern: string[];
      peakMonths: number[];
      offPeakMonths: number[];
      forecastAccuracy: number; // 0-100
    };
    carbonEmissions: {
      totalEmissions: number;
      emissionsPerUnit: number;
      reductionTarget: number;
      currentProgress: number; // 0-100
    };
    operationalEfficiency: {
      overallEfficiency: number; // 0-100
      laborEfficiency: number; // 0-100
      machineEfficiency: number; // 0-100
      energyEfficiency: number; // 0-100
    };
    machineUtilization: {
      averageUtilization: number; // 0-100
      peakUtilization: number; // 0-100
      idleTime: number; // percentage
      maintenanceSchedule: string[];
    };
    employeeProductivity: {
      outputPerEmployee: number;
      efficiency: number; // 0-100
      trainingHours: number;
      skillLevel: number; // 0-100
    };
    supplyStability: {
      supplierReliability: number; // 0-100
      materialAvailability: number; // 0-100
      leadTimeConsistency: number; // 0-100
      backupSuppliers: number;
    };
  };
  predictions: {
    nextWeek: {
      production: number;
      quality: number;
      delivery: number;
      efficiency: number;
    };
    nextMonth: {
      production: number;
      quality: number;
      delivery: number;
      efficiency: number;
    };
    nextQuarter: {
      production: number;
      quality: number;
      delivery: number;
      efficiency: number;
    };
  };
}

// ============================================================================
// MODULE 3: SUPPLIER CAPABILITY GENOME™
// ============================================================================

export interface CapabilityGene {
  type: GeneType;
  name: string;
  currentScore: number; // 0-100
  confidence: number; // 0-100
  historicalTrend: {
    current: number;
    previous: number;
    trend: 'improving' | 'stable' | 'declining';
    dataPoints: { date: Date; value: number }[];
  };
  growthPrediction: {
    predictedScore: number;
    timeframe: string;
    confidence: number; // 0-100
    keyFactors: string[];
  };
  aiExplanation: string;
  priorityLevel: 'critical' | 'high' | 'medium' | 'low';
  evolutionRecommendation: string;
  contributingFactors: string[];
  risks: string[];
  opportunities: string[];
  benchmarks: {
    industryAverage: number;
    top10Percent: number;
    median: number;
  };
}

export interface SupplierCapabilityGenome {
  id: string;
  supplierId: string;
  generatedAt: Date;
  genes: CapabilityGene[];
  overallCapabilityScore: number; // 0-100
  capabilityLevel: CapabilityLevel;
  strengthProfile: {
    topStrengths: string[];
    areasForImprovement: string[];
    balancedGenes: string[];
  };
  evolutionPotential: {
    overall: number; // 0-100
    quickWins: string[];
    longTermInvestments: string[];
  };
  industryPosition: {
    percentile: number; // 0-100
    ranking: string;
    gapToTop: number;
  };
  evolutionHistory: {
    timestamp: Date;
    genomeSnapshot: CapabilityGene[];
    trigger: string;
  }[];
}

// ============================================================================
// MODULE 4: AI EVOLUTION MENTOR™
// ============================================================================

export interface MentorRecommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  businessImpact: {
    financial: string;
    operational: string;
    strategic: string;
  };
  difficulty: OpportunityDifficulty;
  implementationTime: string;
  expectedROI: string;
  expectedPerformanceGain: {
    quality: number; // percentage improvement
    delivery: number; // percentage improvement
    efficiency: number; // percentage improvement
    sustainability: number; // percentage improvement
  };
  steps: string[];
  resources: {
    budget: number;
    personnel: string[];
    technology: string[];
    timeline: number; // months
  };
  risks: string[];
  successFactors: string[];
  priority: 'urgent' | 'high' | 'medium' | 'low';
  personalizedReasoning: string;
  supportingData: {
    metric: string;
    currentValue: number;
    targetValue: number;
    gap: number;
  }[];
}

export interface EvolutionMentor {
  id: string;
  supplierId: string;
  generatedAt: Date;
  currentFocusAreas: string[];
  recommendations: MentorRecommendation[];
  mentorInsights: {
    topOpportunities: string[];
    quickWins: string[];
    strategicInvestments: string[];
    riskMitigations: string[];
  };
  learningPath: {
    phase: string;
    focusAreas: string[];
    expectedDuration: string;
    milestones: string[];
  };
  mentorScore: number; // 0-100 - how well supplier follows recommendations
}

// ============================================================================
// MODULE 5: FUTURE CAPABILITY SIMULATOR™
// ============================================================================

export type SimulationScenario = 
  | 'new_machine'
  | 'more_employees'
  | 'automation'
  | 'additional_warehouse'
  | 'alternative_supplier'
  | 'new_delivery_partner'
  | 'quality_upgrade'
  | 'packaging_upgrade'
  | 'production_expansion'
  | 'technology_upgrade'
  | 'process_optimization'
  | 'sustainability_initiative';

export interface SimulationParameters {
  scenario: SimulationScenario;
  investment: number;
  timeline: number; // months
  parameters: {
    [key: string]: number | string | boolean;
  };
}

export interface SimulationResult {
  id: string;
  scenario: SimulationScenario;
  parameters: SimulationParameters;
  generatedAt: Date;
  predictions: {
    futureCapacity: {
      current: number;
      projected: number;
      improvement: number;
    };
    futureProfit: {
      current: number;
      projected: number;
      improvement: number;
      roi: number;
    };
    futureDeliveryPerformance: {
      current: number;
      projected: number;
      improvement: number;
    };
    futureSustainability: {
      current: number;
      projected: number;
      improvement: number;
    };
    futureCustomerSatisfaction: {
      current: number;
      projected: number;
      improvement: number;
    };
    futureBusinessGrowth: {
      current: number;
      projected: number;
      improvement: number;
    };
  };
  risks: {
    type: string;
    likelihood: number;
    impact: string;
    mitigation: string;
  }[];
  confidence: number; // 0-100
  recommendation: string;
}

// ============================================================================
// MODULE 6: SELF-HEALING SUPPLIER™
// ============================================================================

export type HealingRiskType = 
  | 'machine_failure_pattern'
  | 'production_bottleneck'
  | 'quality_degradation'
  | 'capacity_saturation'
  | 'inventory_shortage'
  | 'delayed_dispatch'
  | 'financial_stress'
  | 'supply_risk'
  | 'employee_turnover'
  | 'technology_obsolescence';

export interface HealingRisk {
  id: string;
  type: HealingRiskType;
  severity: RiskSeverity;
  detectedAt: Date;
  description: string;
  pattern: string[];
  currentImpact: string;
  predictedImpact: string;
  likelihood: number; // 0-100
  timeToFailure?: string;
  preventiveRecommendations: string[];
  automaticActions: {
    action: string;
    automated: boolean;
    trigger: string;
  }[];
  status: 'detected' | 'analyzing' | 'mitigating' | 'resolved' | 'ignored';
}

export interface SelfHealingSupplier {
  id: string;
  supplierId: string;
  activeRisks: HealingRisk[];
  historicalRisks: HealingRisk[];
  healingMetrics: {
    risksDetected: number;
    risksPrevented: number;
    risksMitigated: number;
    automaticInterventions: number;
    preventionSuccessRate: number; // 0-100
  };
  systemHealth: {
    monitoringActive: boolean;
    predictionAccuracy: number; // 0-100
    responseTime: number; // minutes
    overallHealth: number; // 0-100
  };
}

// ============================================================================
// MODULE 7: SUPPLIER POTENTIAL INDEX™
// ============================================================================

export interface SupplierPotentialIndex {
  id: string;
  supplierId: string;
  calculatedAt: Date;
  currentCapability: {
    overall: number; // 0-100
    byCategory: {
      quality: number;
      delivery: number;
      innovation: number;
      resilience: number;
      scalability: number;
      sustainability: number;
    };
  };
  futureCapability: {
    overall: number; // 0-100
    byCategory: {
      quality: number;
      delivery: number;
      innovation: number;
      resilience: number;
      scalability: number;
      sustainability: number;
    };
  };
  improvementPotential: {
    overall: number; // 0-100
    quickWins: number; // 0-100
    longTerm: number; // 0-100
    byGene: {
      [key in GeneType]: number;
    };
  };
  businessGrowthOpportunity: {
    revenuePotential: number;
    marketExpansion: number;
    newCustomers: number;
    profitabilityImprovement: number;
  };
  longTermReadiness: {
    score: number; // 0-100
    innovationReadiness: number; // 0-100
    technologyReadiness: number; // 0-100
    marketReadiness: number; // 0-100
    operationalReadiness: number; // 0-100
  };
  potentialTrajectory: {
    current: CapabilityLevel;
    projected: CapabilityLevel;
    timeframe: string;
    keyMilestones: string[];
  };
}

// ============================================================================
// MODULE 8: SUSTAINABILITY TRANSFORMATION COACH™
// ============================================================================

export interface SustainabilityRecommendation {
  id: string;
  category: 'energy' | 'packaging' | 'carbon' | 'waste' | 'water' | 'resources' | 'logistics';
  title: string;
  description: string;
  currentCarbonScore: number; // 0-100
  futureCarbonScore: number; // 0-100
  potentialSavings: {
    amount: number;
    currency: string;
    timeframe: string;
  };
  businessBenefits: string[];
  implementation: {
    difficulty: OpportunityDifficulty;
    timeline: string;
    investment: number;
    expectedROI: string;
  };
  environmentalImpact: {
    carbonReduction: number; // kg CO2
    energySaving: number; // kWh
    waterSaving: number; // liters
    wasteReduction: number; // kg
  };
  priority: 'urgent' | 'high' | 'medium' | 'low';
}

export interface SustainabilityCoach {
  id: string;
  supplierId: string;
  generatedAt: Date;
  currentSustainabilityScore: number; // 0-100
  targetSustainabilityScore: number; // 0-100
  recommendations: SustainabilityRecommendation[];
  transformationProgress: {
    overall: number; // 0-100
    byCategory: {
      energy: number;
      packaging: number;
      carbon: number;
      waste: number;
      water: number;
      resources: number;
      logistics: number;
    };
  };
  certifications: {
    current: string[];
    recommended: string[];
    progress: {
      [key: string]: number; // 0-100
    };
  };
  complianceStatus: {
    compliant: boolean;
    gaps: string[];
    requirements: string[];
  };
}

// ============================================================================
// MODULE 9: CONTINUOUS LEARNING MEMORY™
// ============================================================================

export type LearningOutcome = 'success' | 'failure' | 'partial';

export interface SupplierLearning {
  id: string;
  supplierId: string;
  actionType: string;
  action: string;
  takenAt: Date;
  outcome: LearningOutcome;
  result: {
    before: number;
    after: number;
    improvement: number;
    metric: string;
  };
  lessonsLearned: string[];
  recoveryStrategy?: string;
  performanceGrowth: number; // 0-100
  capabilityEvolution: {
    gene: GeneType;
    before: number;
    after: number;
  }[];
  relatedActions: string[];
  applicability: {
    scenarios: string[];
    conditions: string[];
  };
  effectiveness: number; // 0-100
}

export interface ContinuousLearningMemory {
  id: string;
  supplierId: string;
  totalActionsTracked: number;
  successfulImprovements: number;
  failedImprovements: number;
  partialImprovements: number;
  averageEffectiveness: number;
  learningTimeline: {
    period: string;
    actions: number;
    effectiveness: number;
    keyLearnings: string[];
  }[];
  topLessons: {
    lesson: string;
    applicability: number;
    impact: number;
    successRate: number;
  }[];
  capabilityEvolution: {
    byGene: {
      [key in GeneType]: {
        current: number;
        starting: number;
        growth: number;
      };
    };
  };
  futureRecommendations: string[];
  knowledgeGain: number; // 0-100
}

// ============================================================================
// MODULE 10: SUPPLIER EVOLUTION ROADMAP™
// ============================================================================

export interface RoadmapMilestone {
  id: string;
  name: string;
  description: string;
  targetDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  progress: number; // 0-100
  dependencies: string[];
  actions: string[];
  expectedResults: string[];
  businessImpact: string;
  completedAt?: Date;
}

export interface SupplierEvolutionRoadmap {
  id: string;
  supplierId: string;
  generatedAt: Date;
  currentState: {
    capabilityLevel: CapabilityLevel;
    overallScore: number;
    keyMetrics: {
      [key: string]: number;
    };
  };
  nextCapabilityLevel: CapabilityLevel;
  recommendedActions: RoadmapMilestone[];
  expectedResults: {
    overallImprovement: number;
    byGene: {
      [key in GeneType]: number;
    };
  };
  businessImpact: {
    revenueGrowth: number;
    costReduction: number;
    efficiencyGain: number;
    marketExpansion: number;
  };
  futureCapability: {
    level: CapabilityLevel;
    score: number;
    timeframe: string;
  };
  timeline: {
    phase: string;
    duration: string;
    milestones: RoadmapMilestone[];
  }[];
}

// ============================================================================
// MODULE 11: AI BUSINESS OPPORTUNITY DISCOVERY™
// ============================================================================

export type OpportunityCategory = 
  | 'production_expansion'
  | 'new_product'
  | 'waste_reduction'
  | 'delivery_optimization'
  | 'capacity_increase'
  | 'resource_allocation'
  | 'supplier_collaboration'
  | 'warehouse_optimization'
  | 'technology_upgrade'
  | 'market_expansion'
  | 'process_improvement'
  | 'cost_reduction';

export interface BusinessOpportunity {
  id: string;
  category: OpportunityCategory;
  title: string;
  description: string;
  expectedBusinessValue: {
    financial: number;
    operational: number;
    strategic: number;
  };
  confidence: number; // 0-100
  difficulty: OpportunityDifficulty;
  expectedROI: string;
  businessImpact: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  implementation: {
    complexity: 'low' | 'medium' | 'high';
    timeline: string;
    investment: number;
    resources: string[];
  };
  riskFactors: string[];
  successFactors: string[];
  dependencies: string[];
  priority: 'urgent' | 'high' | 'medium' | 'low';
  discoveredAt: Date;
  expiresAt?: Date;
}

export interface OpportunityDiscovery {
  id: string;
  supplierId: string;
  generatedAt: Date;
  opportunities: BusinessOpportunity[];
  topOpportunities: BusinessOpportunity[];
  quickWins: BusinessOpportunity[];
  strategicBets: BusinessOpportunity[];
  totalEstimatedValue: number;
  discoveryMethod: string;
  confidence: number;
}

// ============================================================================
// MODULE 12: GLOBAL BENCHMARK ENGINE™
// ============================================================================

export interface BenchmarkData {
  industry: string;
  segment: string;
  metrics: {
    [key: string]: {
      top10Percent: number;
      top25Percent: number;
      median: number;
      bottom25Percent: number;
      average: number;
    };
  };
}

export interface SupplierBenchmark {
  id: string;
  supplierId: string;
  generatedAt: Date;
  currentPosition: {
    overall: number; // 0-100 percentile
    byGene: {
      [key in GeneType]: {
        current: number;
        percentile: number;
        gapToTop: number;
        gapToMedian: number;
      };
    };
  };
  industryBenchmarks: BenchmarkData;
  improvementGap: {
    overall: number;
    byGene: {
      [key in GeneType]: number;
    };
  };
  recommendedActions: {
    gene: GeneType;
    actions: string[];
    expectedImprovement: number;
    timeline: string;
  }[];
  potentialBusinessGrowth: {
    ifTop10Percent: number;
    ifTop25Percent: number;
    ifMedian: number;
  };
  competitivePosition: {
    ranking: string;
    tier: string;
    advantages: string[];
    disadvantages: string[];
  };
}

// ============================================================================
// MODULE 13: SMART KNOWLEDGE CENTER™
// ============================================================================

export type KnowledgeType = 
  | 'sop'
  | 'training_video'
  | 'best_practice'
  | 'industry_trend'
  | 'technology'
  | 'quality_standard'
  | 'sustainability_standard'
  | 'case_study'
  | 'tool'
  | 'framework';

export interface KnowledgeItem {
  id: string;
  type: KnowledgeType;
  title: string;
  description: string;
  category: string;
  relevance: number; // 0-100
  difficulty: OpportunityDifficulty;
  estimatedTime: string;
  content: {
    summary: string;
    keyPoints: string[];
    steps?: string[];
    resources?: string[];
  };
  applicability: {
    scenarios: string[];
    conditions: string[];
    prerequisites: string[];
  };
  businessImpact: string;
  effectiveness: number; // 0-100
  ratings: {
    average: number; // 0-5
    count: number;
  };
  lastUpdated: Date;
  personalizedReasoning: string;
}

export interface SmartKnowledgeCenter {
  id: string;
  supplierId: string;
  generatedAt: Date;
  personalizedRecommendations: KnowledgeItem[];
  recommendedSOPs: KnowledgeItem[];
  trainingVideos: KnowledgeItem[];
  bestPractices: KnowledgeItem[];
  industryTrends: KnowledgeItem[];
  newTechnologies: KnowledgeItem[];
  qualityStandards: KnowledgeItem[];
  sustainabilityStandards: KnowledgeItem[];
  learningPath: {
    currentLevel: CapabilityLevel;
    targetLevel: CapabilityLevel;
    recommendedLearning: KnowledgeItem[];
    timeline: string;
  };
  knowledgeGaps: {
    area: string;
    currentLevel: number;
    targetLevel: number;
    recommendedActions: KnowledgeItem[];
  }[];
}

// ============================================================================
// DASHBOARD DATA
// ============================================================================

export interface SCEFDashboardData {
  commandCenter: SupplierCommandCenter;
  digitalTwin: SupplierDigitalTwin;
  capabilityGenome: SupplierCapabilityGenome;
  evolutionMentor: EvolutionMentor;
  simulationResults: SimulationResult[];
  selfHealing: SelfHealingSupplier;
  potentialIndex: SupplierPotentialIndex;
  sustainabilityCoach: SustainabilityCoach;
  learningMemory: ContinuousLearningMemory;
  evolutionRoadmap: SupplierEvolutionRoadmap;
  opportunityDiscovery: OpportunityDiscovery;
  benchmark: SupplierBenchmark;
  knowledgeCenter: SmartKnowledgeCenter;
  systemHealth: {
    aiEngine: number; // 0-100
    dataFreshness: number; // 0-100
    modelAccuracy: number; // 0-100
    integrationStatus: number; // 0-100
  };
  quickActions: {
    simulateFuture: boolean;
    viewGenome: boolean;
    getRecommendations: boolean;
    checkRisks: boolean;
  };
}
