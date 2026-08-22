// Cognitive Memory Engine Type Definitions

export type MemoryType = 'incident' | 'decision' | 'outcome' | 'lesson';

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export type DecisionType = 'mitigation' | 'prevention' | 'recovery' | 'optimization';

export type OutcomeStatus = 'success' | 'partial' | 'failure';

export type MemoryStatus = 'active' | 'archived' | 'deprecated';

export interface CognitiveMemory {
  id: string;
  type: MemoryType;
  status: MemoryStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // 'user' or 'ai_agent_name'
  tags: string[];
  relatedMemories: string[]; // IDs of related memories
  vectorEmbedding?: number[]; // For semantic search
}

export interface Incident extends CognitiveMemory {
  type: 'incident';
  title: string;
  description: string;
  category: string; // e.g., 'port_strike', 'natural_disaster', 'supplier_failure'
  severity: IncidentSeverity;
  location: {
    type: 'port' | 'warehouse' | 'route' | 'factory' | 'supplier';
    name: string;
    coordinates?: { lat: number; lng: number };
  };
  timeline: {
    detectedAt: Date;
    startedAt: Date;
    resolvedAt?: Date;
    duration?: number; // in hours
  };
  impact: {
    financial: number; // estimated cost
    operational: number; // operational impact score 0-100
    customer: number; // customer impact score 0-100
    environmental: number; // environmental impact score 0-100
  };
  affectedEntities: {
    type: string;
    count: number;
    details: string[];
  }[];
  rootCauses: string[];
  immediateActions: string[];
}

export interface Decision extends CognitiveMemory {
  type: 'decision';
  title: string;
  description: string;
  decisionType: DecisionType;
  context: {
    incidentId?: string; // Link to incident if decision was made in response
    situation: string;
    constraints: string[];
    stakeholders: string[];
    urgency: 'low' | 'medium' | 'high' | 'critical';
  };
  reasoning: {
    primaryReason: string;
    supportingFactors: string[];
    alternativesConsidered: {
      option: string;
      pros: string[];
      cons: string[];
      rejected: boolean;
      reason?: string;
    }[];
    riskAssessment: {
      risk: string;
      probability: number;
      impact: string;
      mitigation: string;
    }[];
  };
  action: {
    description: string;
    steps: string[];
    resources: {
      personnel: string[];
      equipment: string[];
      budget: number;
      timeline: number; // hours
    };
    responsibleAgents: string[];
  };
  expectedOutcomes: {
    financial: number;
    operational: number;
    customer: number;
    environmental: number;
  };
  confidence: number; // 0-100
}

export interface Outcome extends CognitiveMemory {
  type: 'outcome';
  title: string;
  description: string;
  linkedDecisionId: string;
  linkedIncidentId?: string;
  outcomeStatus: OutcomeStatus;
  actualImpact: {
    financial: number;
    operational: number;
    customer: number;
    environmental: number;
  };
  timeline: {
    startedAt: Date;
    completedAt: Date;
    actualDuration: number;
  };
  deviations: {
    planned: number;
    actual: number;
    variance: number;
    reason: string;
  }[];
  metrics: {
    name: string;
    target: number;
    actual: number;
    achieved: boolean;
  }[];
  successFactors: string[];
  failureFactors: string[];
}

export interface Lesson extends CognitiveMemory {
  type: 'lesson';
  title: string;
  description: string;
  category: 'best_practice' | 'warning' | 'insight' | 'optimization';
  source: {
    type: 'incident' | 'decision' | 'outcome';
    id: string;
  };
  lesson: string;
  context: string;
  applicability: {
    scenarios: string[];
    conditions: string[];
    limitations: string[];
  };
  actionItems: string[];
  effectiveness: number; // 0-100 based on historical application
  lastApplied?: Date;
  applicationCount: number;
}

export interface MemorySearchQuery {
  query: string;
  type?: MemoryType;
  category?: string;
  severity?: IncidentSeverity;
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  minSimilarity?: number; // 0-1
  limit?: number;
}

export interface MemorySearchResult {
  memory: CognitiveMemory;
  similarity: number; // 0-1
  relevance: string;
  matchReasons: string[];
}

export interface CaseRecommendation {
  currentIncident: string;
  similarCases: {
    incident: Incident;
    decision?: Decision;
    outcome?: Outcome;
    similarity: number;
    matchReasons: string[];
  }[];
  recommendedActions: {
    action: string;
    source: string; // Which case this came from
    confidence: number;
    reasoning: string;
  }[];
  lessons: Lesson[];
  overallRecommendation: string;
  confidence: number;
}

export interface KnowledgeGraphNode {
  id: string;
  type: 'incident' | 'decision' | 'outcome' | 'lesson';
  label: string;
  data: CognitiveMemory;
  connections: {
    to: string;
    type: 'caused' | 'resolved' | 'resulted_in' | 'informed' | 'related';
    strength: number; // 0-1
  }[];
}

export interface KnowledgeGraph {
  nodes: KnowledgeGraphNode[];
  edges: {
    from: string;
    to: string;
    type: string;
    strength: number;
  }[];
}

export interface MemoryTimeline {
  memory: CognitiveMemory;
  timestamp: Date;
  connections: {
    previous: string[];
    next: string[];
  };
}

export interface MemoryAnalytics {
  totalMemories: number;
  memoriesByType: {
    [key in MemoryType]: number;
  };
  successRate: number;
  averageResolutionTime: number;
  topCategories: {
    category: string;
    count: number;
    avgSeverity: number;
  }[];
  learningTrends: {
    date: Date;
    lessonsLearned: number;
    successRate: number;
  }[];
  effectiveness: {
    byDecisionType: {
      [key in DecisionType]: number;
    };
    byCategory: {
      [key: string]: number;
    };
  };
}

export interface VectorEmbedding {
  id: string;
  memoryId: string;
  vector: number[];
  metadata: {
    type: MemoryType;
    category?: string;
    tags: string[];
    createdAt: Date;
  };
}
