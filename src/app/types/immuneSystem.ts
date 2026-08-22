// Autonomous Supply Chain Immune System Type Definitions

export type AnomalyType = 
  | 'demand'
  | 'supplier'
  | 'inventory'
  | 'route'
  | 'warehouse'
  | 'cyber'
  | 'temperature'
  | 'cost';

export type AnomalySeverity = 'low' | 'medium' | 'high' | 'critical';

export type NodeStatus = 'healthy' | 'compromised' | 'isolated' | 'recovering' | 'immune';

export type SpreadPrediction = 'none' | 'localized' | 'regional' | 'global';

export type RecoveryStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export interface SupplyChainNode {
  id: string;
  type: 'supplier' | 'warehouse' | 'route' | 'factory' | 'port' | 'customer' | 'system';
  name: string;
  location: {
    type: string;
    coordinates?: { lat: number; lng: number };
    region: string;
  };
  status: NodeStatus;
  healthScore: number; // 0-100
  immunityScore: number; // 0-100
  vulnerabilities: string[];
  dependencies: string[]; // IDs of dependent nodes
  metrics: {
    [key: string]: number;
  };
  lastUpdated: Date;
}

export interface Anomaly {
  id: string;
  type: AnomalyType;
  severity: AnomalySeverity;
  nodeId: string;
  nodeName: string;
  detectedAt: Date;
  description: string;
  metrics: {
    [key: string]: {
      current: number;
      baseline: number;
      deviation: number;
      threshold: number;
    };
  };
  rootCause?: string;
  spreadPrediction: SpreadPrediction;
  affectedNodes: string[];
  isolated: boolean;
  status: 'active' | 'contained' | 'resolved';
}

export interface Threat {
  id: string;
  anomalyId: string;
  type: 'anomaly' | 'cascading_failure' | 'external_attack';
  severity: AnomalySeverity;
  status: 'active' | 'mitigating' | 'resolved';
  createdAt: Date;
  estimatedImpact: {
    financial: number;
    operational: number;
    customer: number;
  };
  propagationPath: string[]; // Node IDs in propagation order
}

export interface RecoveryWorkflow {
  id: string;
  anomalyId: string;
  type: 'isolation' | 'mitigation' | 'recovery' | 'prevention';
  status: RecoveryStatus;
  steps: {
    id: string;
    action: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    startedAt?: Date;
    completedAt?: Date;
    result?: string;
  }[];
  automated: boolean;
  triggeredBy: 'system' | 'ai' | 'human';
  startedAt: Date;
  completedAt?: Date;
  effectiveness: number; // 0-100
}

export interface ImmuneSystemHealth {
  overallHealthScore: number; // 0-100
  overallImmunityScore: number; // 0-100
  nodeHealth: {
    healthy: number;
    compromised: number;
    isolated: number;
    recovering: number;
  };
  systemVulnerability: number; // 0-100
  activeThreats: number;
  recoveringIncidents: number;
  healedIncidents: number;
  lastUpdate: Date;
}

export interface WeakestNode {
  node: SupplyChainNode;
  vulnerabilityScore: number; // 0-100
  vulnerabilities: string[];
  riskFactors: string[];
  recommendedActions: string[];
}

export interface SelfHealingTimeline {
  incidentId: string;
  detectedAt: Date;
  diagnosisCompletedAt: Date;
  isolationCompletedAt?: Date;
  recoveryStartedAt?: Date;
  recoveryCompletedAt?: Date;
  healingDuration?: number; // in minutes
  preventedCascadingFailure: boolean;
  nodesAffected: number;
  nodesSaved: number;
}

export interface LearningData {
  anomalyType: AnomalyType;
  pattern: string;
  severity: AnomalySeverity;
  rootCause: string;
  mitigationStrategy: string;
  effectiveness: number; // 0-100
  occurrenceCount: number;
  lastOccurrence: Date;
  preventionRecommendation: string;
}

export interface ImmuneSystemAlert {
  id: string;
  type: 'anomaly_detected' | 'threat_escalated' | 'isolation_activated' | 'recovery_completed' | 'prevention_success';
  severity: AnomalySeverity;
  message: string;
  nodeId?: string;
  anomalyId?: string;
  timestamp: Date;
  acknowledged: boolean;
  actionTaken?: string;
}

export interface DetectionRule {
  id: string;
  anomalyType: AnomalyType;
  nodeType: string;
  metric: string;
  threshold: number;
  deviationThreshold: number;
  response: 'alert' | 'isolate' | 'mitigate' | 'auto_recover';
  enabled: boolean;
}

export interface CascadingFailureModel {
  sourceNodeId: string;
  propagationProbability: number;
  propagationSpeed: number; // nodes per hour
  estimatedNodesAffected: number;
  estimatedTimeToImpact: number; // in hours
  criticalPath: string[]; // Node IDs
  preventionActions: string[];
}
