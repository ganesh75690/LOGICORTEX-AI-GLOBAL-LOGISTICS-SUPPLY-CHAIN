// Multi-Agent AI Debate Engine Type Definitions

export type AgentType = 
  | 'demand'
  | 'inventory'
  | 'finance'
  | 'route'
  | 'risk'
  | 'procurement'
  | 'sustainability'
  | 'operations';

export type AgentRole = 'specialist' | 'challenger' | 'moderator' | 'synthesizer';

export type DebateStatus = 'pending' | 'active' | 'paused' | 'completed' | 'consensus';

export type DecisionPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Agent {
  id: string;
  type: AgentType;
  name: string;
  avatar: string;
  role: AgentRole;
  specialty: string;
  confidence: number; // 0-100
  weight: number; // voting weight
  characteristics: {
    riskTolerance: 'low' | 'medium' | 'high';
    timeHorizon: 'short' | 'medium' | 'long';
    priority: string[];
  };
}

export interface AgentAnalysis {
  agentId: string;
  agentType: AgentType;
  timestamp: Date;
  analysis: {
    problemUnderstanding: string;
    keyFactors: string[];
    risks: {
      type: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      probability: number;
      impact: string;
    }[];
    opportunities: string[];
    constraints: string[];
  };
  recommendation: {
    action: string;
    rationale: string;
    expectedOutcomes: {
      positive: string[];
      negative: string[];
    };
    estimatedCost: number;
    estimatedTime: number;
    environmentalImpact: {
      carbonFootprint: number; // kg CO2
      energyConsumption: number; // kWh
      sustainabilityScore: number; // 0-100
    };
  };
  confidence: number; // 0-100
  supportingEvidence: {
    dataPoints: string[];
    historicalCases: string[];
    metrics: {
      name: string;
      value: number;
      unit: string;
      trend: 'increasing' | 'decreasing' | 'stable';
    }[];
  };
}

export interface AgentChallenge {
  id: string;
  challengerId: string;
  challengedAgentId: string;
  targetAnalysisId: string;
  timestamp: Date;
  challenge: {
    point: string;
    counterArgument: string;
    evidence: string[];
    suggestedAlternative: string;
  };
  response?: {
    rebuttal: string;
    acknowledgment: string;
    revisedRecommendation?: string;
  };
  resolved: boolean;
}

export interface DebateMessage {
  id: string;
  debateId: string;
  agentId: string;
  agentType: AgentType;
  timestamp: Date;
  messageType: 'analysis' | 'challenge' | 'response' | 'comment' | 'vote' | 'consensus';
  content: {
    message: string;
    data?: any;
    referencedMessageId?: string;
  };
  confidence: number;
  metadata?: {
    [key: string]: any;
  };
}

export interface Debate {
  id: string;
  title: string;
  description: string;
  problem: {
    category: string;
    severity: DecisionPriority;
    context: string;
    stakeholders: string[];
    timeline: {
      deadline: Date;
      milestones: { date: Date; description: string }[];
    };
  };
  status: DebateStatus;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  participants: Agent[];
  messages: DebateMessage[];
  voting: {
    votes: {
      agentId: string;
      recommendationId: string;
      weight: number;
      timestamp: Date;
    }[];
    consensus: {
      finalRecommendation: string;
      consensusScore: number; // 0-100
      agreementLevel: 'unanimous' | 'majority' | 'split' | 'no-consensus';
      participatingAgents: number;
      totalAgents: number;
    };
  };
  decision?: {
    finalDecision: string;
    implementationPlan: string;
    responsibleAgents: string[];
    successMetrics: string[];
    estimatedImpact: {
      financial: number;
      operational: number;
      environmental: number;
    };
  };
}

export interface AgentRecommendation {
  id: string;
  agentId: string;
  agentType: AgentType;
  debateId: string;
  timestamp: Date;
  recommendation: {
    action: string;
    priority: DecisionPriority;
    steps: string[];
    resources: {
      personnel: string[];
      equipment: string[];
      budget: number;
      timeline: number;
    };
    riskMitigation: string[];
  };
  analysis: {
    pros: string[];
    cons: string[];
    alternatives: string[];
  };
  metrics: {
    cost: number;
    time: number;
    quality: number;
    sustainability: number;
    risk: number;
  };
  confidence: number;
}

export interface ConsensusResult {
  debateId: string;
  timestamp: Date;
  finalRecommendation: string;
  consensusScore: number;
  agreementBreakdown: {
    unanimous: number;
    majority: number;
    split: number;
    noConsensus: number;
  };
  participatingAgents: {
    agentId: string;
    agentType: AgentType;
    vote: string;
    confidence: number;
    reasoning: string;
  }[];
  keyInsights: string[];
  remainingConcerns: string[];
  implementationStrategy: string;
}

export interface DecisionHistory {
  id: string;
  timestamp: Date;
  debateId: string;
  decision: string;
  outcome: {
    success: boolean;
    actualCost: number;
    actualTime: number;
    actualImpact: {
      financial: number;
      operational: number;
      environmental: number;
    };
    deviations: {
      planned: number;
      actual: number;
      variance: number;
      reason: string;
    }[];
  };
  lessonsLearned: string[];
  participatingAgents: string[];
  effectiveness: number; // 0-100
}

export interface DebateAnalytics {
  totalDebates: number;
  averageConsensusScore: number;
  agentPerformance: {
    agentId: string;
    agentType: AgentType;
    participationRate: number;
    averageConfidence: number;
    successRate: number;
    influenceScore: number;
  }[];
  consensusTrends: {
    date: Date;
    averageScore: number;
    debateCount: number;
  }[];
  decisionEffectiveness: {
    timeframe: string;
    averageSuccess: number;
    averageDeviation: number;
  }[];
}
