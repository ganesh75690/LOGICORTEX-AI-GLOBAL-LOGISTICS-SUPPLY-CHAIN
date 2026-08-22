import {
  SupplyChainNode,
  Anomaly,
  AnomalyType,
  AnomalySeverity,
  NodeStatus,
  SpreadPrediction,
  Threat,
  RecoveryWorkflow,
  ImmuneSystemHealth,
  WeakestNode,
  SelfHealingTimeline,
  LearningData,
  ImmuneSystemAlert,
  DetectionRule,
  CascadingFailureModel
} from '../../../types/immuneSystem';

/**
 * Autonomous Supply Chain Immune System
 * Inspired by human immune system - detects, diagnoses, isolates, and heals
 */
export class ImmuneSystemEngine {
  private nodes: Map<string, SupplyChainNode>;
  private anomalies: Map<string, Anomaly>;
  private threats: Map<string, Threat>;
  private recoveryWorkflows: Map<string, RecoveryWorkflow>;
  private learningData: Map<string, LearningData>;
  private alerts: ImmuneSystemAlert[];
  private detectionRules: DetectionRule[];
  private selfHealingTimelines: SelfHealingTimeline[];

  constructor() {
    this.nodes = new Map();
    this.anomalies = new Map();
    this.threats = new Map();
    this.recoveryWorkflows = new Map();
    this.learningData = new Map();
    this.alerts = [];
    this.detectionRules = [];
    this.selfHealingTimelines = [];
    this.initializeNodes();
    this.initializeDetectionRules();
    this.initializeLearningData();
  }

  /**
   * Initialize supply chain nodes
   */
  private initializeNodes(): void {
    const nodeConfigs = [
      {
        id: 'supplier_001',
        type: 'supplier' as const,
        name: 'TechComponents Inc',
        location: { type: 'facility', region: 'North America' },
        dependencies: ['factory_001', 'factory_002']
      },
      {
        id: 'supplier_002',
        type: 'supplier' as const,
        name: 'GlobalParts Ltd',
        location: { type: 'facility', region: 'Asia Pacific' },
        dependencies: ['factory_001']
      },
      {
        id: 'warehouse_001',
        type: 'warehouse' as const,
        name: 'East Coast Distribution Center',
        location: { type: 'facility', region: 'North America' },
        dependencies: ['supplier_001', 'factory_001']
      },
      {
        id: 'warehouse_002',
        type: 'warehouse' as const,
        name: 'West Coast Distribution Center',
        location: { type: 'facility', region: 'North America' },
        dependencies: ['supplier_002', 'factory_002']
      },
      {
        id: 'route_001',
        type: 'route' as const,
        name: 'LA to NYC Main Route',
        location: { type: 'route', region: 'North America' },
        dependencies: ['warehouse_001', 'warehouse_002']
      },
      {
        id: 'route_002',
        type: 'route' as const,
        name: 'Trans-Pacific Shipping Route',
        location: { type: 'route', region: 'Pacific' },
        dependencies: ['supplier_002', 'warehouse_002']
      },
      {
        id: 'factory_001',
        type: 'factory' as const,
        name: 'Main Assembly Plant',
        location: { type: 'facility', region: 'North America' },
        dependencies: ['supplier_001', 'supplier_002']
      },
      {
        id: 'factory_002',
        type: 'factory' as const,
        name: 'Secondary Assembly Plant',
        location: { type: 'facility', region: 'Europe' },
        dependencies: ['supplier_001']
      },
      {
        id: 'port_001',
        type: 'port' as const,
        name: 'Los Angeles Port',
        location: { type: 'port', region: 'North America', coordinates: { lat: 33.7300, lng: -118.2728 } },
        dependencies: ['route_001', 'route_002']
      },
      {
        id: 'system_001',
        type: 'system' as const,
        name: 'ERP System',
        location: { type: 'virtual', region: 'Global' },
        dependencies: ['factory_001', 'factory_002', 'warehouse_001', 'warehouse_002']
      }
    ];

    nodeConfigs.forEach(config => {
      this.nodes.set(config.id, {
        ...config,
        status: 'healthy',
        healthScore: 85 + Math.random() * 15,
        immunityScore: 70 + Math.random() * 25,
        vulnerabilities: this.generateVulnerabilities(config.type),
        metrics: this.generateNodeMetrics(config.type),
        lastUpdated: new Date()
      });
    });
  }

  /**
   * Generate vulnerabilities for a node
   */
  private generateVulnerabilities(nodeType: string): string[] {
    const vulnerabilityMap: { [key: string]: string[] } = {
      supplier: ['quality_variance', 'capacity_constraints', 'financial_instability', 'geopolitical_risk'],
      warehouse: ['capacity_overflow', 'temperature_excursions', 'equipment_failure', 'labor_shortages'],
      route: ['traffic_congestion', 'weather_events', 'fuel_price_volatility', 'driver_shortages'],
      factory: ['equipment_breakdown', 'supply_shortages', 'quality_issues', 'labor_disputes'],
      port: ['strikes', 'congestion', 'weather_events', 'customs_delays'],
      system: ['cyber_attacks', 'software_bugs', 'data_corruption', 'hardware_failures'],
      customer: ['demand_volatility', 'payment_delays', 'contract_disputes', 'quality_complaints']
    };
    return vulnerabilityMap[nodeType] || ['unknown_vulnerability'];
  }

  /**
   * Generate metrics for a node
   */
  private generateNodeMetrics(nodeType: string): { [key: string]: number } {
    const metrics: { [key: string]: { [key: string]: any } } = {
      supplier: {
        quality_score: 92 + Math.random() * 8,
        on_time_delivery: 88 + Math.random() * 12,
        capacity_utilization: 75 + Math.random() * 20,
        financial_health: 80 + Math.random() * 15
      },
      warehouse: {
        inventory_turnover: 8 + Math.random() * 4,
        capacity_utilization: 65 + Math.random() * 25,
        temperature_stability: 95 + Math.random() * 5,
        order_accuracy: 97 + Math.random() * 3
      },
      route: {
        on_time_delivery: 85 + Math.random() * 12,
        fuel_efficiency: 28 + Math.random() * 4,
        route_optimization: 75 + Math.random() * 20,
        cost_per_mile: 2 + Math.random() * 1
      },
      factory: {
        production_efficiency: 82 + Math.random() * 13,
        quality_rate: 95 + Math.random() * 4,
        equipment_uptime: 92 + Math.random() * 7,
        labor_productivity: 85 + Math.random() * 12
      },
      port: {
        throughput_utilization: 70 + Math.random() * 25,
        vessel_turnaround: 48 + Math.random() * 24,
        customs_clearance: 85 + Math.random() * 12,
        congestion_level: 30 + Math.random() * 40
      },
      system: {
        uptime: 99.5 + Math.random() * 0.5,
        response_time: 50 + Math.random() * 100,
        error_rate: 0.01 + Math.random() * 0.1,
        security_score: 85 + Math.random() * 12
      },
      customer: {
        satisfaction_score: 88 + Math.random() * 10,
        order_frequency: 5 + Math.random() * 5,
        payment_reliability: 95 + Math.random() * 5,
        contract_value: 10000 + Math.random() * 90000
      }
    };
    return metrics[nodeType] || {};
  }

  /**
   * Initialize detection rules
   */
  private initializeDetectionRules(): void {
    this.detectionRules = [
      {
        id: 'rule_001',
        anomalyType: 'demand',
        nodeType: 'customer',
        metric: 'order_frequency',
        threshold: 50,
        deviationThreshold: 30,
        response: 'alert',
        enabled: true
      },
      {
        id: 'rule_002',
        anomalyType: 'supplier',
        nodeType: 'supplier',
        metric: 'quality_score',
        threshold: 85,
        deviationThreshold: 15,
        response: 'mitigate',
        enabled: true
      },
      {
        id: 'rule_003',
        anomalyType: 'inventory',
        nodeType: 'warehouse',
        metric: 'capacity_utilization',
        threshold: 90,
        deviationThreshold: 20,
        response: 'isolate',
        enabled: true
      },
      {
        id: 'rule_004',
        anomalyType: 'route',
        nodeType: 'route',
        metric: 'on_time_delivery',
        threshold: 70,
        deviationThreshold: 20,
        response: 'mitigate',
        enabled: true
      },
      {
        id: 'rule_005',
        anomalyType: 'warehouse',
        nodeType: 'warehouse',
        metric: 'temperature_stability',
        threshold: 90,
        deviationThreshold: 10,
        response: 'auto_recover',
        enabled: true
      },
      {
        id: 'rule_006',
        anomalyType: 'cyber',
        nodeType: 'system',
        metric: 'security_score',
        threshold: 70,
        deviationThreshold: 20,
        response: 'isolate',
        enabled: true
      },
      {
        id: 'rule_007',
        anomalyType: 'cost',
        nodeType: 'route',
        metric: 'cost_per_mile',
        threshold: 3.5,
        deviationThreshold: 40,
        response: 'alert',
        enabled: true
      }
    ];
  }

  /**
   * Initialize learning data
   */
  private initializeLearningData(): void {
    const learningPatterns: LearningData[] = [
      {
        anomalyType: 'demand',
        pattern: 'sudden_demand_spike',
        severity: 'high',
        rootCause: 'seasonal_demand_increase',
        mitigationStrategy: 'increase_inventory_buffers',
        effectiveness: 85,
        occurrenceCount: 12,
        lastOccurrence: new Date('2024-01-15'),
        preventionRecommendation: 'pre-position inventory based on demand forecasting'
      },
      {
        anomalyType: 'supplier',
        pattern: 'quality_variance',
        severity: 'critical',
        rootCause: 'supplier_process_degradation',
        mitigationStrategy: 'activate_backup_suppliers',
        effectiveness: 92,
        occurrenceCount: 8,
        lastOccurrence: new Date('2024-02-10'),
        preventionRecommendation: 'implement stricter quality monitoring and supplier audits'
      },
      {
        anomalyType: 'route',
        pattern: 'delivery_delays',
        severity: 'medium',
        rootCause: 'traffic_congestion',
        mitigationStrategy: 'dynamic_rerouting',
        effectiveness: 78,
        occurrenceCount: 25,
        lastOccurrence: new Date('2024-01-20'),
        preventionRecommendation: 'use predictive traffic analysis for route planning'
      },
      {
        anomalyType: 'warehouse',
        pattern: 'temperature_excursion',
        severity: 'high',
        rootCause: 'equipment_malfunction',
        mitigationStrategy: 'activate_backup_cooling',
        effectiveness: 95,
        occurrenceCount: 3,
        lastOccurrence: new Date('2024-03-01'),
        preventionRecommendation: 'implement predictive maintenance for HVAC systems'
      },
      {
        anomalyType: 'cyber',
        pattern: 'unusual_access_patterns',
        severity: 'critical',
        rootCause: 'external_attack',
        mitigationStrategy: 'isolate_affected_systems',
        effectiveness: 88,
        occurrenceCount: 2,
        lastOccurrence: new Date('2024-02-28'),
        preventionRecommendation: 'implement zero-trust architecture and continuous monitoring'
      }
    ];

    learningPatterns.forEach(pattern => {
      this.learningData.set(`${pattern.anomalyType}_${pattern.pattern}`, pattern);
    });
  }

  /**
   * Detect anomalies across all nodes
   */
  detectAnomalies(): Anomaly[] {
    const detectedAnomalies: Anomaly[] = [];

    this.nodes.forEach((node, nodeId) => {
      const nodeMetrics = node.metrics;
      
      this.detectionRules.forEach(rule => {
        if (rule.nodeType === node.type && rule.enabled) {
          const metricValue = nodeMetrics[rule.metric];
          if (metricValue) {
            const baseline = this.getBaselineMetric(rule.metric, node.type);
            const deviation = Math.abs((metricValue - baseline) / baseline) * 100;

            if (deviation > rule.deviationThreshold) {
              const anomaly: Anomaly = {
                id: `anomaly_${Date.now()}_${nodeId}`,
                type: rule.anomalyType,
                severity: this.calculateSeverity(deviation, rule.threshold),
                nodeId,
                nodeName: node.name,
                detectedAt: new Date(),
                description: this.generateAnomalyDescription(rule.anomalyType, node.name, metricValue, baseline),
                metrics: {
                  [rule.metric]: {
                    current: metricValue,
                    baseline,
                    deviation,
                    threshold: rule.threshold
                  }
                },
                spreadPrediction: this.predictSpread(nodeId, rule.anomalyType),
                affectedNodes: this.getAffectedNodes(nodeId),
                isolated: false,
                status: 'active'
              };

              detectedAnomalies.push(anomaly);
              this.anomalies.set(anomaly.id, anomaly);
              this.diagnoseRootCause(anomaly);
            }
          }
        }
      });
    });

    return detectedAnomalies;
  }

  /**
   * Get baseline metric for comparison
   */
  private getBaselineMetric(metric: string, nodeType: string): number {
    const baselines: { [key: string]: { [key: string]: number } } = {
      supplier: { quality_score: 95, on_time_delivery: 95, capacity_utilization: 80, financial_health: 90 },
      warehouse: { inventory_turnover: 10, capacity_utilization: 75, temperature_stability: 98, order_accuracy: 99 },
      route: { on_time_delivery: 95, fuel_efficiency: 30, route_optimization: 85, cost_per_mile: 2.5 },
      factory: { production_efficiency: 90, quality_rate: 98, equipment_uptime: 97, labor_productivity: 90 },
      port: { throughput_utilization: 75, vessel_turnaround: 48, customs_clearance: 95, congestion_level: 35 },
      system: { uptime: 99.9, response_time: 75, error_rate: 0.01, security_score: 95 },
      customer: { satisfaction_score: 92, order_frequency: 8, payment_reliability: 98, contract_value: 50000 }
    };
    return baselines[nodeType]?.[metric] || 0;
  }

  /**
   * Calculate severity based on deviation
   */
  private calculateSeverity(deviation: number, threshold: number): AnomalySeverity {
    if (deviation > threshold * 2) return 'critical';
    if (deviation > threshold * 1.5) return 'high';
    if (deviation > threshold) return 'medium';
    return 'low';
  }

  /**
   * Generate anomaly description
   */
  private generateAnomalyDescription(type: AnomalyType, nodeName: string, current: number, baseline: number): string {
    const descriptions: { [key in AnomalyType]: string } = {
      demand: `Demand anomaly detected at ${nodeName}. Current: ${current.toFixed(1)}, Baseline: ${baseline.toFixed(1)}`,
      supplier: `Supplier anomaly detected at ${nodeName}. Quality deviation: ${((current - baseline) / baseline * 100).toFixed(1)}%`,
      inventory: `Inventory anomaly detected at ${nodeName}. Capacity: ${current.toFixed(1)}%, Baseline: ${baseline.toFixed(1)}%`,
      route: `Route anomaly detected at ${nodeName}. Performance: ${current.toFixed(1)}%, Baseline: ${baseline.toFixed(1)}%`,
      warehouse: `Warehouse anomaly detected at ${nodeName}. Metric deviation: ${((current - baseline) / baseline * 100).toFixed(1)}%`,
      cyber: `Cyber anomaly detected at ${nodeName}. Security score: ${current.toFixed(1)}, Baseline: ${baseline.toFixed(1)}`,
      temperature: `Temperature anomaly detected at ${nodeName}. Stability: ${current.toFixed(1)}%, Baseline: ${baseline.toFixed(1)}%`,
      cost: `Cost anomaly detected at ${nodeName}. Current: ${current.toFixed(2)}, Baseline: ${baseline.toFixed(2)}`
    };
    return descriptions[type];
  }

  /**
   * Predict spread of anomaly
   */
  private predictSpread(nodeId: string, anomalyType: AnomalyType): SpreadPrediction {
    const node = this.nodes.get(nodeId);
    if (!node) return 'none';

    const dependentNodes = node.dependencies.length;
    const vulnerabilityScore = (100 - node.immunityScore) / 100;

    if (dependentNodes === 0) return 'none';
    if (dependentNodes <= 2 && vulnerabilityScore < 0.3) return 'localized';
    if (dependentNodes <= 4 && vulnerabilityScore < 0.5) return 'regional';
    return 'global';
  }

  /**
   * Get affected nodes
   */
  private getAffectedNodes(nodeId: string): string[] {
    const node = this.nodes.get(nodeId);
    return node?.dependencies || [];
  }

  /**
   * Diagnose root cause
   */
  private diagnoseRootCause(anomaly: Anomaly): void {
    const learningPattern = this.learningData.get(`${anomaly.type}_*`);
    if (learningPattern) {
      anomaly.rootCause = learningPattern.rootCause;
    } else {
      const rootCauses: { [key in AnomalyType]: string[] } = {
        demand: ['seasonal_pattern', 'market_shift', 'competitor_action', 'external_event'],
        supplier: ['quality_degradation', 'capacity_issues', 'financial_problems', 'geopolitical_factors'],
        inventory: ['demand_mismatch', 'supply_disruption', 'forecasting_error', 'operational_issues'],
        route: ['traffic_congestion', 'weather_events', 'equipment_failure', 'labor_issues'],
        warehouse: ['equipment_failure', 'climate_control', 'capacity_issues', 'staff_shortages'],
        cyber: ['external_attack', 'malware', 'insider_threat', 'system_vulnerability'],
        temperature: ['equipment_malfunction', 'weather_events', 'power_outage', 'sensor_error'],
        cost: ['fuel_price_increase', 'labor_costs', 'inflation', 'supplier_pricing']
      };
      anomaly.rootCause = rootCauses[anomaly.type][Math.floor(Math.random() * rootCauses[anomaly.type].length)];
    }
  }

  /**
   * Isolate affected node
   */
  isolateNode(nodeId: string): boolean {
    const node = this.nodes.get(nodeId);
    if (!node) return false;

    node.status = 'isolated';
    node.lastUpdated = new Date();

    // Create isolation workflow
    const workflow: RecoveryWorkflow = {
      id: `workflow_isolate_${nodeId}_${Date.now()}`,
      anomalyId: '',
      type: 'isolation',
      status: 'in_progress',
      steps: [
        {
          id: 'step_1',
          action: 'Disconnect from network',
          status: 'completed',
          startedAt: new Date(),
          completedAt: new Date()
        },
        {
          id: 'step_2',
          action: 'Reroute dependencies',
          status: 'in_progress',
          startedAt: new Date()
        },
        {
          id: 'step_3',
          action: 'Quarantine affected data',
          status: 'pending'
        }
      ],
      automated: true,
      triggeredBy: 'system',
      startedAt: new Date(),
      effectiveness: 0
    };

    this.recoveryWorkflows.set(workflow.id, workflow);
    this.createAlert('isolation_activated', 'high', `Node ${node.name} isolated due to anomaly`, nodeId);
    return true;
  }

  /**
   * Activate recovery workflow
   */
  activateRecovery(anomalyId: string): RecoveryWorkflow {
    const anomaly = this.anomalies.get(anomalyId);
    if (!anomaly) throw new Error('Anomaly not found');

    const learningPattern = this.learningData.get(`${anomaly.type}_*`);
    const strategy = learningPattern?.mitigationStrategy || 'standard_recovery';

    const workflow: RecoveryWorkflow = {
      id: `workflow_recovery_${anomalyId}_${Date.now()}`,
      anomalyId,
      type: 'recovery',
      status: 'in_progress',
      steps: [
        {
          id: 'step_1',
          action: 'Assess impact',
          status: 'completed',
          startedAt: new Date(),
          completedAt: new Date()
        },
        {
          id: 'step_2',
          action: strategy,
          status: 'in_progress',
          startedAt: new Date()
        },
        {
          id: 'step_3',
          action: 'Monitor recovery',
          status: 'pending'
        },
        {
          id: 'step_4',
          action: 'Verify resolution',
          status: 'pending'
        }
      ],
      automated: true,
      triggeredBy: 'ai',
      startedAt: new Date(),
      effectiveness: 0
    };

    this.recoveryWorkflows.set(workflow.id, workflow);
    return workflow;
  }

  /**
   * Predict cascading failure
   */
  predictCascadingFailure(sourceNodeId: string): CascadingFailureModel {
    const sourceNode = this.nodes.get(sourceNodeId);
    if (!sourceNode) throw new Error('Node not found');

    const vulnerableNodes = Array.from(this.nodes.values()).filter(
      node => node.immunityScore < 60 && sourceNode.dependencies.includes(node.id)
    );

    const propagationProbability = vulnerableNodes.length / Math.max(1, sourceNode.dependencies.length);
    const propagationSpeed = 1 + Math.random() * 3; // nodes per hour
    const estimatedNodesAffected = vulnerableNodes.length + sourceNode.dependencies.length;
    const estimatedTimeToImpact = estimatedNodesAffected / propagationSpeed;

    return {
      sourceNodeId,
      propagationProbability,
      propagationSpeed,
      estimatedNodesAffected,
      estimatedTimeToImpact,
      criticalPath: [sourceNodeId, ...sourceNode.dependencies],
      preventionActions: [
        'Isolate source node',
        'Boost immunity of dependent nodes',
        'Activate backup systems',
        'Divert traffic to alternative paths'
      ]
    };
  }

  /**
   * Prevent cascading failure
   */
  preventCascadingFailure(threatId: string): boolean {
    const threat = this.threats.get(threatId);
    if (!threat) return false;

    const cascadeModel = this.predictCascadingFailure(threat.propagationPath[0]);
    
    // Execute prevention actions
    cascadeModel.preventionActions.forEach(action => {
      if (action === 'Isolate source node') {
        this.isolateNode(cascadeModel.sourceNodeId);
      }
    });

    this.createAlert('prevention_success', 'high', 'Cascading failure prevented', cascadeModel.sourceNodeId);
    return true;
  }

  /**
   * Get overall system health
   */
  getSystemHealth(): ImmuneSystemHealth {
    const nodes = Array.from(this.nodes.values());
    const healthy = nodes.filter(n => n.status === 'healthy').length;
    const compromised = nodes.filter(n => n.status === 'compromised').length;
    const isolated = nodes.filter(n => n.status === 'isolated').length;
    const recovering = nodes.filter(n => n.status === 'recovering').length;

    const overallHealthScore = nodes.reduce((sum, n) => sum + n.healthScore, 0) / nodes.length;
    const overallImmunityScore = nodes.reduce((sum, n) => sum + n.immunityScore, 0) / nodes.length;
    const systemVulnerability = 100 - overallImmunityScore;

    return {
      overallHealthScore,
      overallImmunityScore,
      nodeHealth: { healthy, compromised, isolated, recovering },
      systemVulnerability,
      activeThreats: this.threats.size,
      recoveringIncidents: this.recoveryWorkflows.size,
      healedIncidents: this.selfHealingTimelines.length,
      lastUpdate: new Date()
    };
  }

  /**
   * Get weakest nodes
   */
  getWeakestNodes(limit: number = 5): WeakestNode[] {
    const nodes = Array.from(this.nodes.values());
    const sorted = nodes.sort((a, b) => a.immunityScore - b.immunityScore);

    return sorted.slice(0, limit).map(node => ({
      node,
      vulnerabilityScore: 100 - node.immunityScore,
      vulnerabilities: node.vulnerabilities,
      riskFactors: node.vulnerabilities.map(v => `Low ${v.replace('_', ' ')} immunity`),
      recommendedActions: [
        'Increase monitoring frequency',
        'Implement redundancy',
        'Upgrade security measures',
        'Strengthen dependency relationships'
      ]
    }));
  }

  /**
   * Get self-healing timelines
   */
  getSelfHealingTimelines(): SelfHealingTimeline[] {
    return this.selfHealingTimelines;
  }

  /**
   * Get current threats
   */
  getCurrentThreats(): Threat[] {
    return Array.from(this.threats.values()).filter(t => t.status === 'active');
  }

  /**
   * Create alert
   */
  private createAlert(
    type: ImmuneSystemAlert['type'],
    severity: AnomalySeverity,
    message: string,
    nodeId?: string,
    anomalyId?: string
  ): void {
    const alert: ImmuneSystemAlert = {
      id: `alert_${Date.now()}`,
      type,
      severity,
      message,
      nodeId,
      anomalyId,
      timestamp: new Date(),
      acknowledged: false
    };
    this.alerts.push(alert);
  }

  /**
   * Get alerts
   */
  getAlerts(): ImmuneSystemAlert[] {
    return this.alerts;
  }

  /**
   * Simulate anomaly detection (for demo)
   */
  simulateAnomaly(anomalyType: AnomalyType, nodeId?: string): Anomaly {
    const targetNodeId = nodeId || Array.from(this.nodes.keys())[Math.floor(Math.random() * this.nodes.size)];
    const node = this.nodes.get(targetNodeId);
    if (!node) throw new Error('Node not found');

    const anomaly: Anomaly = {
      id: `anomaly_sim_${Date.now()}`,
      type: anomalyType,
      severity: Math.random() > 0.5 ? 'high' : 'medium',
      nodeId: targetNodeId,
      nodeName: node.name,
      detectedAt: new Date(),
      description: `Simulated ${anomalyType} anomaly at ${node.name}`,
      metrics: {},
      spreadPrediction: this.predictSpread(targetNodeId, anomalyType),
      affectedNodes: this.getAffectedNodes(targetNodeId),
      isolated: false,
      status: 'active'
    };

    this.anomalies.set(anomaly.id, anomaly);
    this.diagnoseRootCause(anomaly);

    // Create threat
    const threat: Threat = {
      id: `threat_${anomaly.id}`,
      anomalyId: anomaly.id,
      type: 'anomaly',
      severity: anomaly.severity,
      status: 'active',
      createdAt: new Date(),
      estimatedImpact: {
        financial: 100000 + Math.random() * 500000,
        operational: 50 + Math.random() * 40,
        customer: 30 + Math.random() * 50
      },
      propagationPath: [targetNodeId, ...node.dependencies]
    };

    this.threats.set(threat.id, threat);
    this.createAlert('anomaly_detected', anomaly.severity, anomaly.description, targetNodeId, anomaly.id);

    return anomaly;
  }

  /**
   * Get all nodes
   */
  getAllNodes(): SupplyChainNode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Get node by ID
   */
  getNodeById(id: string): SupplyChainNode | undefined {
    return this.nodes.get(id);
  }
}
