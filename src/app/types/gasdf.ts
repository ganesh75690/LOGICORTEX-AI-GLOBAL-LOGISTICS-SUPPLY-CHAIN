// GLOBAL AUTONOMOUS SUPPLY CHAIN DECISION FABRIC (GASDF™) Type Definitions

// ============================================================================
// DECISION TYPES
// ============================================================================

export type DecisionType = 
  | 'supplier'
  | 'warehouse'
  | 'inventory'
  | 'shipment'
  | 'driver_allocation'
  | 'production'
  | 'procurement'
  | 'pricing'
  | 'expansion'
  | 'contraction'
  | 'diversification'
  | 'technology'
  | 'strategic';

export type DecisionPriority = 'low' | 'medium' | 'high' | 'critical';

export type DecisionStatus = 
  | 'draft'
  | 'analyzing'
  | 'pending_approval'
  | 'approved'
  | 'rejected'
  | 'implemented'
  | 'completed'
  | 'cancelled';

export type DecisionImpact = 'positive' | 'negative' | 'neutral' | 'mixed';

// ============================================================================
// MODULE 1: EXECUTIVE INTELLIGENCE BRIEFING
// ============================================================================

export interface ExecutiveBriefing {
  id: string;
  generatedAt: Date;
  businessHealth: {
    score: number; // 0-100
    trend: 'improving' | 'stable' | 'declining';
    keyMetrics: {
      revenue: { current: number; target: number; variance: number };
      profitability: { current: number; target: number; variance: number };
      efficiency: { current: number; target: number; variance: number };
      customerSatisfaction: { current: number; target: number; variance: number };
    };
  };
  businessStability: {
    score: number; // 0-100
    riskFactors: string[];
    resilienceFactors: string[];
  };
  criticalRisks: {
    id: string;
    category: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    likelihood: number; // 0-100
    impact: number; // 0-100
    recommendedActions: string[];
  }[];
  hiddenOpportunities: {
    id: string;
    category: string;
    description: string;
    estimatedValue: number;
    confidence: number; // 0-100
    implementationComplexity: 'low' | 'medium' | 'high';
  }[];
  pendingExecutiveDecisions: {
    id: string;
    title: string;
    category: string;
    urgency: DecisionPriority;
    deadline: Date;
    description: string;
  }[];
  strategicPriorities: {
    id: string;
    title: string;
    description: string;
    progress: number; // 0-100
    dueDate: Date;
    owner: string;
  }[];
  businessConfidence: {
    overall: number; // 0-100
    byCategory: {
      financial: number;
      operational: number;
      strategic: number;
      market: number;
    };
  };
  aiSummary: {
    executive: string;
    detailed: string;
    actionableInsights: string[];
    recommendedFocus: string[];
  };
}

// ============================================================================
// MODULE 2: DECISION RIPPLE INTELLIGENCE™
// ============================================================================

export interface RippleNode {
  id: string;
  type: 'supplier' | 'warehouse' | 'inventory' | 'transportation' | 'customer' | 'revenue' | 'brand' | 'resilience' | 'cost' | 'time';
  name: string;
  impact: {
    score: number; // -100 to 100
    magnitude: number; // 0-100
    confidence: number; // 0-100
  };
  metrics: {
    before: number;
    after: number;
    change: number;
    unit: string;
  };
  timing: {
    onset: number; // hours from decision
    peak: number; // hours from decision
    duration: number; // hours
  };
  affectedEntities: string[];
  secondaryRipples: string[]; // IDs of nodes this affects
}

export interface RippleEffect {
  id: string;
  decisionId: string;
  triggeredAt: Date;
  rootNode: RippleNode;
  ripplePath: RippleNode[];
  totalImpact: {
    financial: number;
    operational: number;
    customer: number;
    strategic: number;
  };
  propagationSpeed: 'immediate' | 'fast' | 'moderate' | 'slow';
  visualization: {
    nodes: RippleNode[];
    edges: {
      from: string;
      to: string;
      strength: number;
      type: 'direct' | 'indirect' | 'feedback';
    }[];
  };
}

// ============================================================================
// MODULE 3: DECISION GENOME™
// ============================================================================

export type GeneType = 
  | 'financial_health'
  | 'operational_stability'
  | 'supply_chain_resilience'
  | 'scalability'
  | 'customer_trust'
  | 'supplier_dependency'
  | 'carbon_impact'
  | 'compliance'
  | 'cyber_risk'
  | 'adaptability'
  | 'recovery_readiness'
  | 'innovation_potential'
  | 'market_position'
  | 'competitive_advantage'
  | 'strategic_alignment';

export interface DecisionGene {
  type: GeneType;
  name: string;
  score: number; // 0-100
  color: 'green' | 'yellow' | 'orange' | 'red';
  confidence: number; // 0-100
  historicalTrend: {
    current: number;
    previous: number;
    trend: 'improving' | 'stable' | 'declining';
    dataPoints: { date: Date; value: number }[];
  };
  aiExplanation: string;
  contributingFactors: string[];
  risks: string[];
  opportunities: string[];
  recommendations: string[];
}

export interface DecisionGenome {
  id: string;
  decisionId: string;
  generatedAt: Date;
  genes: DecisionGene[];
  overallHealth: number; // 0-100
  riskProfile: {
    overall: number; // 0-100
    byCategory: {
      financial: number;
      operational: number;
      strategic: number;
      compliance: number;
    };
  };
  strengthProfile: {
    overall: number; // 0-100
    topStrengths: string[];
    areasForImprovement: string[];
  };
  evolutionHistory: {
    timestamp: Date;
    genomeSnapshot: DecisionGene[];
    trigger: string;
  }[];
}

// ============================================================================
// MODULE 4: DECISION HARMONY™
// ============================================================================

export type HarmonyAgentType = 
  | 'finance'
  | 'inventory'
  | 'operations'
  | 'logistics'
  | 'risk'
  | 'sustainability'
  | 'procurement'
  | 'strategy'
  | 'customer';

export interface HarmonyAgentRecommendation {
  agentId: string;
  agentType: HarmonyAgentType;
  recommendation: string;
  confidence: number; // 0-100
  rationale: string;
  supportingData: {
    metric: string;
    value: number;
    context: string;
  }[];
  concerns: string[];
  alternatives: string[];
}

export interface DecisionHarmony {
  id: string;
  decisionId: string;
  generatedAt: Date;
  agentRecommendations: HarmonyAgentRecommendation[];
  consensus: {
    score: number; // 0-100
    level: 'unanimous' | 'strong' | 'moderate' | 'weak' | 'conflict';
    agreement: {
      unanimous: number;
      strong: number;
      moderate: number;
      weak: number;
      conflict: number;
    };
  };
  optimizedRecommendation: {
    action: string;
    priority: DecisionPriority;
    consensusScore: number;
    supportingReasons: string[];
    tradeoffs: {
      factor: string;
      impact: string;
      mitigation: string;
    }[];
    expectedBenefits: {
      category: string;
      description: string;
      confidence: number;
    }[];
    alternativeStrategies: {
      name: string;
      description: string;
      pros: string[];
      cons: string[];
      consensusScore: number;
    }[];
  };
  disagreements: {
    topic: string;
    agents: string[];
    nature: string;
    resolution: string;
  }[];
}

// ============================================================================
// MODULE 5: DECISION CONSEQUENCE ENGINE™
// ============================================================================

export type ConsequenceOrder = 'first' | 'second' | 'third';

export interface Consequence {
  id: string;
  order: ConsequenceOrder;
  category: string;
  description: string;
  impact: {
    financial: { impact: number; confidence: number; timeframe: string };
    operational: { impact: number; confidence: number; timeframe: string };
    customer: { impact: number; confidence: number; timeframe: string };
    strategic: { impact: number; confidence: number; timeframe: string };
  };
  likelihood: number; // 0-100
  timing: {
    onset: string; // e.g., "immediate", "1-3 months", "6-12 months"
    duration: string;
    peak: string;
  };
  affectedEntities: string[];
  mitigationStrategies: string[];
  dependencies: string[]; // IDs of other consequences this depends on
}

export interface DecisionConsequences {
  id: string;
  decisionId: string;
  generatedAt: Date;
  firstOrderConsequences: Consequence[];
  secondOrderConsequences: Consequence[];
  thirdOrderConsequences: Consequence[];
  totalImpact: {
    financial: { short: number; medium: number; long: number };
    operational: { short: number; medium: number; long: number };
    customer: { short: number; medium: number; long: number };
    strategic: { short: number; medium: number; long: number };
  };
  riskAssessment: {
    overall: number; // 0-100
    highRiskConsequences: string[];
    mitigationPriorities: string[];
  };
  timeline: {
    phase: string;
    consequences: Consequence[];
    timeframe: string;
  }[];
}

// ============================================================================
// MODULE 6: DECISION EVOLUTION ENGINE™
// ============================================================================

export interface StrategyVersion {
  version: number;
  name: string;
  description: string;
  generatedAt: Date;
  metrics: {
    cost: { score: number; target: number; improvement: number };
    resilience: { score: number; target: number; improvement: number };
    customerSatisfaction: { score: number; target: number; improvement: number };
    scalability: { score: number; target: number; improvement: number };
    carbonImpact: { score: number; target: number; improvement: number };
    operationalEfficiency: { score: number; target: number; improvement: number };
  };
  actions: string[];
  reasoning: string;
  improvementsFromPrevious: string[];
  confidence: number; // 0-100
}

export interface DecisionEvolution {
  id: string;
  decisionId: string;
  startedAt: Date;
  completedAt?: Date;
  versions: StrategyVersion[];
  optimalStrategy: StrategyVersion;
  evolutionPath: {
    fromVersion: number;
    toVersion: number;
    trigger: string;
    improvements: string[];
  }[];
  totalIterations: number;
  convergenceMetrics: {
    improvementRate: number;
    stabilityScore: number;
    confidenceInOptimal: number;
  };
}

// ============================================================================
// MODULE 7: STRATEGIC OPPORTUNITY DISCOVERY™
// ============================================================================

export type OpportunityCategory = 
  | 'inventory_redistribution'
  | 'supplier_diversification'
  | 'warehouse_optimization'
  | 'cost_reduction'
  | 'carbon_reduction'
  | 'fleet_optimization'
  | 'route_optimization'
  | 'demand_shifting'
  | 'capacity_expansion'
  | 'technology_upgrade'
  | 'market_expansion'
  | 'risk_mitigation';

export interface StrategicOpportunity {
  id: string;
  category: OpportunityCategory;
  title: string;
  description: string;
  businessValue: {
    financial: number;
    operational: number;
    strategic: number;
  };
  confidence: number; // 0-100
  estimatedSavings: {
    amount: number;
    currency: string;
    timeframe: string;
  };
  businessImpact: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  implementationComplexity: 'low' | 'medium' | 'high';
  requiredResources: {
    budget: number;
    personnel: string[];
    technology: string[];
    timeline: number; // months
  };
  riskFactors: string[];
  successFactors: string[];
  dependencies: string[];
  priority: DecisionPriority;
  discoveredAt: Date;
  expiresAt?: Date;
}

export interface OpportunityDiscovery {
  id: string;
  generatedAt: Date;
  opportunities: StrategicOpportunity[];
  topOpportunities: StrategicOpportunity[];
  quickWins: StrategicOpportunity[];
  strategicBets: StrategicOpportunity[];
  totalEstimatedValue: number;
  discoveryMethod: string;
  confidence: number;
}

// ============================================================================
// MODULE 8: CONTINUOUS LEARNING ENGINE™
// ============================================================================

export type LearningOutcome = 'success' | 'failure' | 'partial';

export interface DecisionLearning {
  id: string;
  decisionId: string;
  decisionType: DecisionType;
  madeAt: Date;
  outcome: LearningOutcome;
  actualImpact: {
    financial: { planned: number; actual: number; variance: number };
    operational: { planned: number; actual: number; variance: number };
    customer: { planned: number; actual: number; variance: number };
    strategic: { planned: number; actual: number; variance: number };
  };
  recoveryTime?: number; // in hours
  lessonsLearned: string[];
  decisionAccuracy: number; // 0-100
  predictiveAccuracy: {
    financial: number;
    operational: number;
    customer: number;
    strategic: number;
  };
  futureImprovements: string[];
  patterns: {
    successFactors: string[];
    failureFactors: string[];
    context: string[];
  };
  relatedDecisions: string[];
  knowledgeGain: number; // 0-100
}

export interface ContinuousLearning {
  id: string;
  generatedAt: Date;
  totalDecisionsTracked: number;
  successfulDecisions: number;
  failedDecisions: number;
  partialDecisions: number;
  averageAccuracy: number;
  averageRecoveryTime: number;
  learningTimeline: {
    period: string;
    decisions: number;
    accuracy: number;
    keyLearnings: string[];
  }[];
  topLessons: {
    lesson: string;
    applicability: number;
    impact: number;
  }[];
  predictionAccuracy: {
    byDecisionType: {
      [key in DecisionType]: number;
    };
    byMetric: {
      financial: number;
      operational: number;
      customer: number;
      strategic: number;
    };
  };
  improvementRecommendations: string[];
}

// ============================================================================
// MODULE 9: EXECUTIVE APPROVAL CENTER
// ============================================================================

export interface ApprovalRequest {
  id: string;
  decisionId: string;
  decision: {
    type: DecisionType;
    title: string;
    description: string;
    proposedBy: string;
    proposedAt: Date;
  };
  businessImpact: {
    summary: string;
    financial: number;
    operational: number;
    customer: number;
    strategic: number;
  };
  risk: {
    overall: number; // 0-100
    keyRisks: string[];
    mitigationStrategies: string[];
  };
  genome: DecisionGenome;
  rippleEffects: RippleEffect;
  consequences: DecisionConsequences;
  harmony: DecisionHarmony;
  confidence: number; // 0-100
  requiredApprovals: string[];
  currentApprovals: string[];
  createdAt: Date;
  deadline: Date;
  status: 'pending' | 'approved' | 'rejected' | 'returned_for_revision';
}

export interface ApprovalAction {
  approver: string;
  action: 'approve' | 'reject' | 'request_revision';
  timestamp: Date;
  comments?: string;
  requestedChanges?: string[];
}

// ============================================================================
// CORE DECISION OBJECT
// ============================================================================

export interface StrategicDecision {
  id: string;
  type: DecisionType;
  title: string;
  description: string;
  status: DecisionStatus;
  priority: DecisionPriority;
  context: {
    situation: string;
    drivers: string[];
    constraints: string[];
    stakeholders: string[];
  };
  proposedAction: {
    description: string;
    steps: string[];
    resources: {
      budget: number;
      personnel: string[];
      technology: string[];
      timeline: number;
    };
  };
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
  // AI Analysis Components
  genome?: DecisionGenome;
  rippleEffects?: RippleEffect;
  consequences?: DecisionConsequences;
  harmony?: DecisionHarmony;
  evolution?: DecisionEvolution;
  // Approval
  approvalRequest?: ApprovalRequest;
  // Implementation
  implementation?: {
    startedAt?: Date;
    completedAt?: Date;
    progress: number;
    milestones: {
      name: string;
      completed: boolean;
      completedAt?: Date;
    }[];
  };
  // Learning
  learning?: DecisionLearning;
}

// ============================================================================
// DASHBOARD DATA
// ============================================================================

export interface GASDFDashboardData {
  briefing: ExecutiveBriefing;
  activeDecisions: StrategicDecision[];
  pendingApprovals: ApprovalRequest[];
  opportunities: StrategicOpportunity[];
  learning: ContinuousLearning;
  systemHealth: {
    aiEngine: number; // 0-100
    dataFreshness: number; // 0-100
    modelAccuracy: number; // 0-100
    integrationStatus: number; // 0-100
  };
  quickActions: {
    createDecision: boolean;
    viewOpportunities: boolean;
    analyzeDecision: boolean;
    reviewApprovals: boolean;
  };
}
