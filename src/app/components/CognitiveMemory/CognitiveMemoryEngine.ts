import {
  CognitiveMemory,
  Incident,
  Decision,
  Outcome,
  Lesson,
  MemorySearchQuery,
  MemorySearchResult,
  CaseRecommendation,
  KnowledgeGraph,
  KnowledgeGraphNode,
  MemoryTimeline,
  MemoryAnalytics,
  VectorEmbedding,
  MemoryType,
  IncidentSeverity,
  DecisionType
} from '../../types/cognitiveMemory';

/**
 * Cognitive Memory Engine
 * Stores organizational knowledge and enables AI to learn from past decisions
 */
export class CognitiveMemoryEngine {
  private memories: Map<string, CognitiveMemory>;
  private embeddings: Map<string, VectorEmbedding>;
  private knowledgeGraph: KnowledgeGraph;

  constructor() {
    this.memories = new Map();
    this.embeddings = new Map();
    this.knowledgeGraph = { nodes: [], edges: [] };
    this.initializeSampleData();
  }

  /**
   * Initialize with sample data for demonstration
   */
  private initializeSampleData(): void {
    // Sample incidents
    const portStrikeIncident: Incident = {
      id: 'incident_001',
      type: 'incident',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      createdBy: 'system',
      tags: ['port', 'strike', 'disruption', 'labor'],
      relatedMemories: [],
      title: 'Los Angeles Port Strike',
      description: 'Labor strike at LA port causing 40% reduction in cargo throughput',
      category: 'port_strike',
      severity: 'critical',
      location: {
        type: 'port',
        name: 'Los Angeles Port',
        coordinates: { lat: 33.7300, lng: -118.2728 }
      },
      timeline: {
        detectedAt: new Date('2024-01-15'),
        startedAt: new Date('2024-01-15'),
        resolvedAt: new Date('2024-01-22'),
        duration: 168 // 7 days
      },
      impact: {
        financial: 2500000,
        operational: 85,
        customer: 70,
        environmental: 30
      },
      affectedEntities: [
        { type: 'shipments', count: 450, details: ['Delayed shipments', 'Increased costs'] },
        { type: 'customers', count: 120, details: ['Delivery delays', 'Customer complaints'] }
      ],
      rootCauses: ['Labor dispute', 'Contract negotiations', 'Wage demands'],
      immediateActions: ['Activated alternative ports', 'Notified customers', 'Negotiated with union']
    };

    const supplierFailureIncident: Incident = {
      id: 'incident_002',
      type: 'incident',
      status: 'active',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10'),
      createdBy: 'system',
      tags: ['supplier', 'failure', 'quality', 'disruption'],
      relatedMemories: [],
      title: 'Key Supplier Quality Failure',
      description: 'Primary component supplier failed quality tests affecting 25% of production',
      category: 'supplier_failure',
      severity: 'high',
      location: {
        type: 'supplier',
        name: 'TechComponents Inc'
      },
      timeline: {
        detectedAt: new Date('2024-02-10'),
        startedAt: new Date('2024-02-08'),
        resolvedAt: new Date('2024-02-18'),
        duration: 240 // 10 days
      },
      impact: {
        financial: 1800000,
        operational: 75,
        customer: 60,
        environmental: 20
      },
      affectedEntities: [
        { type: 'production_lines', count: 3, details: ['Reduced output', 'Quality issues'] },
        { type: 'orders', count: 85, details: ['Delayed fulfillment', 'Partial shipments'] }
      ],
      rootCauses: ['Quality control failure', 'Lack of oversight', 'Supplier capacity issues'],
      immediateActions: ['Activated backup suppliers', 'Quality retesting', 'Supplier audit']
    };

    // Sample decisions
    const portStrikeDecision: Decision = {
      id: 'decision_001',
      type: 'decision',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      createdBy: 'ai_risk_agent',
      tags: ['port', 'rerouting', 'mitigation'],
      relatedMemories: ['incident_001'],
      title: 'Port Strike Mitigation - Alternative Ports',
      description: 'Reroute shipments through alternative ports to minimize disruption',
      decisionType: 'mitigation',
      context: {
        incidentId: 'incident_001',
        situation: 'LA port strike causing cargo backlog',
        constraints: ['Limited alternative port capacity', 'Increased transportation costs', 'Time sensitivity'],
        stakeholders: ['customers', 'suppliers', 'logistics partners'],
        urgency: 'critical'
      },
      reasoning: {
        primaryReason: 'Minimize customer impact by utilizing alternative port infrastructure',
        supportingFactors: [
          'Port of Oakland has available capacity',
          'Rail connections from Oakland to main distribution centers',
          'Previous successful use of alternative ports'
        ],
        alternativesConsidered: [
          {
            option: 'Wait for strike resolution',
            pros: ['No additional cost', 'Simpler logistics'],
            cons: ['Extended delays', 'Customer dissatisfaction', 'Inventory depletion'],
            rejected: true,
            reason: 'Too much customer impact'
          },
          {
            option: 'Air freight for critical shipments',
            pros: ['Fast delivery', 'Minimal delay'],
            cons: ['Very high cost', 'Limited capacity'],
            rejected: true,
            reason: 'Cost prohibitive for large volumes'
          },
          {
            option: 'Reroute through alternative ports',
            pros: ['Balanced cost and time', 'Scalable solution'],
            cons: ['Higher transportation costs', 'Complex coordination'],
            rejected: false
          }
        ],
        riskAssessment: [
          {
            risk: 'Alternative port congestion',
            probability: 0.4,
            impact: 'Moderate delays',
            mitigation: 'Diversify across multiple alternative ports'
          },
          {
            risk: 'Increased costs',
            probability: 0.8,
            impact: 'Budget overruns',
            mitigation: 'Negotiate volume discounts with carriers'
          }
        ]
      },
      action: {
        description: 'Reroute 60% of shipments through Oakland and 40% through Seattle',
        steps: [
          'Identify shipments for rerouting',
          'Contact alternative ports for capacity',
          'Update shipping schedules',
          'Notify customers of delays',
          'Monitor alternative port operations'
        ],
        resources: {
          personnel: ['logistics coordinators', 'customer service team'],
          equipment: ['additional trucking capacity', 'warehouse space'],
          budget: 450000,
          timeline: 72
        },
        responsibleAgents: ['route_agent', 'customer_service_agent']
      },
      expectedOutcomes: {
        financial: 450000,
        operational: 30,
        customer: 40,
        environmental: 15
      },
      confidence: 85
    };

    const supplierFailureDecision: Decision = {
      id: 'decision_002',
      type: 'decision',
      status: 'active',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10'),
      createdBy: 'ai_procurement_agent',
      tags: ['supplier', 'backup', 'quality'],
      relatedMemories: ['incident_002'],
      title: 'Supplier Failure - Activate Backup Suppliers',
      description: 'Activate pre-qualified backup suppliers to maintain production',
      decisionType: 'mitigation',
      context: {
        incidentId: 'incident_002',
        situation: 'Primary supplier quality failure affecting production',
        constraints: ['Limited backup supplier capacity', 'Quality requirements', 'Cost considerations'],
        stakeholders: ['production', 'customers', 'quality team'],
        urgency: 'high'
      },
      reasoning: {
        primaryReason: 'Maintain production quality and output through qualified backup suppliers',
        supportingFactors: [
          'Pre-qualified backup suppliers available',
          'Quality certifications verified',
          'Previous successful partnerships'
        ],
        alternativesConsidered: [
          {
            option: 'Work with failing supplier to fix quality',
            pros: ['Lower cost', 'Maintain relationship'],
            cons: ['Time to fix', 'Risk of continued issues'],
            rejected: true,
            reason: 'Too slow, production at risk'
          },
          {
            option: 'Reduce production output',
            pros: ['Lower cost', 'Simpler'],
            cons: ['Lost revenue', 'Customer dissatisfaction'],
            rejected: true,
            reason: 'Significant business impact'
          },
          {
            option: 'Activate backup suppliers',
            pros: ['Maintain quality', 'Faster resolution'],
            cons: ['Higher cost', 'Coordination effort'],
            rejected: false
          }
        ],
        riskAssessment: [
          {
            risk: 'Backup supplier capacity limits',
            probability: 0.3,
            impact: 'Production slowdown',
            mitigation: 'Diversify across multiple backup suppliers'
          },
          {
            risk: 'Quality differences',
            probability: 0.2,
            impact: 'Product consistency issues',
            mitigation: 'Strict quality testing and monitoring'
          }
        ]
      },
      action: {
        description: 'Activate 3 backup suppliers to cover 80% of component needs',
        steps: [
          'Qualify backup suppliers',
          'Place orders with backup suppliers',
          'Implement additional quality checks',
          'Monitor supplier performance',
          'Plan for gradual transition back to primary'
        ],
        resources: {
          personnel: ['procurement team', 'quality inspectors'],
          equipment: ['testing equipment', 'inspection stations'],
          budget: 320000,
          timeline: 96
        },
        responsibleAgents: ['procurement_agent', 'quality_agent']
      },
      expectedOutcomes: {
        financial: 320000,
        operational: 25,
        customer: 20,
        environmental: 10
      },
      confidence: 88
    };

    // Sample outcomes
    const portStrikeOutcome: Outcome = {
      id: 'outcome_001',
      type: 'outcome',
      status: 'active',
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-22'),
      createdBy: 'system',
      tags: ['success', 'port', 'mitigation'],
      relatedMemories: ['incident_001', 'decision_001'],
      title: 'Port Strike Mitigation Success',
      description: 'Alternative port strategy successfully minimized customer impact',
      linkedDecisionId: 'decision_001',
      linkedIncidentId: 'incident_001',
      outcomeStatus: 'success',
      actualImpact: {
        financial: 480000,
        operational: 35,
        customer: 25,
        environmental: 18
      },
      timeline: {
        startedAt: new Date('2024-01-15'),
        completedAt: new Date('2024-01-22'),
        actualDuration: 168
      },
      deviations: [
        { planned: 450000, actual: 480000, variance: 6.7, reason: 'Higher than expected port fees' },
        { planned: 72, actual: 84, variance: 16.7, reason: 'Coordination delays' }
      ],
      metrics: [
        { name: 'Customer Satisfaction', target: 75, actual: 82, achieved: true },
        { name: 'On-Time Delivery', target: 70, actual: 78, achieved: true },
        { name: 'Cost Control', target: 500000, actual: 480000, achieved: true }
      ],
      successFactors: [
        'Pre-existing relationships with alternative ports',
        'Rapid decision-making and execution',
        'Effective customer communication',
        'Flexibility in routing options'
      ],
      failureFactors: [
        'Higher than expected port fees',
        'Initial coordination delays',
        'Limited warehouse capacity at alternative ports'
      ]
    };

    const supplierFailureOutcome: Outcome = {
      id: 'outcome_002',
      type: 'outcome',
      status: 'active',
      createdAt: new Date('2024-02-18'),
      updatedAt: new Date('2024-02-18'),
      createdBy: 'system',
      tags: ['success', 'supplier', 'quality'],
      relatedMemories: ['incident_002', 'decision_002'],
      title: 'Supplier Backup Strategy Success',
      description: 'Backup supplier activation maintained production quality',
      linkedDecisionId: 'decision_002',
      linkedIncidentId: 'incident_002',
      outcomeStatus: 'success',
      actualImpact: {
        financial: 350000,
        operational: 30,
        customer: 22,
        environmental: 12
      },
      timeline: {
        startedAt: new Date('2024-02-10'),
        completedAt: new Date('2024-02-18'),
        actualDuration: 192
      },
      deviations: [
        { planned: 320000, actual: 350000, variance: 9.4, reason: 'Premium pricing for rush orders' },
        { planned: 96, actual: 108, variance: 12.5, reason: 'Additional quality testing time' }
      ],
      metrics: [
        { name: 'Production Output', target: 90, actual: 88, achieved: true },
        { name: 'Quality Rate', target: 98, actual: 99, achieved: true },
        { name: 'Customer Satisfaction', target: 85, actual: 87, achieved: true }
      ],
      successFactors: [
        'Pre-qualified backup suppliers',
        'Robust quality monitoring',
        'Clear communication with customers',
        'Flexible production scheduling'
      ],
      failureFactors: [
        'Higher costs from rush orders',
        'Extended timeline for quality testing',
        'Initial learning curve with new suppliers'
      ]
    };

    // Sample lessons
    const portStrikeLesson: Lesson = {
      id: 'lesson_001',
      type: 'lesson',
      status: 'active',
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
      createdBy: 'ai_system',
      tags: ['port', 'mitigation', 'best_practice'],
      relatedMemories: ['incident_001', 'decision_001', 'outcome_001'],
      title: 'Pre-Establish Alternative Port Relationships',
      description: 'Maintain relationships with multiple alternative ports to enable rapid response to disruptions',
      category: 'best_practice',
      source: {
        type: 'outcome',
        id: 'outcome_001'
      },
      lesson: 'Pre-establishing relationships with alternative ports significantly reduces response time and costs during port disruptions',
      context: 'LA port strike incident demonstrated the value of existing alternative port relationships',
      applicability: {
        scenarios: ['Port strikes', 'Port congestion', 'Natural disasters affecting ports'],
        conditions: ['Multiple port access points', 'Pre-existing carrier relationships', 'Flexible routing infrastructure'],
        limitations: ['May not work for highly specialized ports', 'Dependent on geographic proximity']
      },
      actionItems: [
        'Identify and qualify 3-5 alternative ports per region',
        'Maintain regular contact with alternative port operators',
        'Pre-negotiate capacity agreements for emergency use',
        'Include alternative port clauses in carrier contracts'
      ],
      effectiveness: 92,
      lastApplied: new Date('2024-01-25'),
      applicationCount: 3
    };

    const supplierLesson: Lesson = {
      id: 'lesson_002',
      type: 'lesson',
      status: 'active',
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-02-20'),
      createdBy: 'ai_system',
      tags: ['supplier', 'backup', 'quality'],
      relatedMemories: ['incident_002', 'decision_002', 'outcome_002'],
      title: 'Maintain Qualified Backup Supplier Network',
      description: 'Always maintain a network of pre-qualified backup suppliers to mitigate supplier failure risks',
      category: 'best_practice',
      source: {
        type: 'outcome',
        id: 'outcome_002'
      },
      lesson: 'A network of pre-qualified backup suppliers enables rapid response to quality failures while maintaining production quality',
      context: 'Supplier quality failure incident demonstrated the value of pre-qualified backup suppliers',
      applicability: {
        scenarios: ['Supplier quality failures', 'Supplier capacity issues', 'Supplier bankruptcy'],
        conditions: ['Critical components', 'Quality-sensitive products', 'Time-sensitive production'],
        limitations: ['Higher costs', 'Requires ongoing qualification effort']
      },
      actionItems: [
        'Qualify 2-3 backup suppliers per critical component',
        'Maintain regular quality audits of backup suppliers',
        'Keep backup suppliers informed of requirements',
        'Include backup supplier clauses in primary contracts'
      ],
      effectiveness: 88,
      lastApplied: new Date('2024-02-20'),
      applicationCount: 5
    };

    // Store all memories
    this.memories.set(portStrikeIncident.id, portStrikeIncident);
    this.memories.set(supplierFailureIncident.id, supplierFailureIncident);
    this.memories.set(portStrikeDecision.id, portStrikeDecision);
    this.memories.set(supplierFailureDecision.id, supplierFailureDecision);
    this.memories.set(portStrikeOutcome.id, portStrikeOutcome);
    this.memories.set(supplierFailureOutcome.id, supplierFailureOutcome);
    this.memories.set(portStrikeLesson.id, portStrikeLesson);
    this.memories.set(supplierLesson.id, supplierLesson);

    // Generate embeddings for semantic search
    this.generateEmbeddings();

    // Build knowledge graph
    this.buildKnowledgeGraph();
  }

  /**
   * Generate vector embeddings for semantic search
   * In production, this would use actual ML models like OpenAI embeddings
   */
  private generateEmbeddings(): void {
    this.memories.forEach((memory, id) => {
      const embedding = this.createMockEmbedding(memory);
      this.embeddings.set(id, {
        id: `embedding_${id}`,
        memoryId: id,
        vector: embedding,
        metadata: {
          type: memory.type,
          category: (memory as any).category,
          tags: memory.tags,
          createdAt: memory.createdAt
        }
      });
    });
  }

  /**
   * Create mock embedding (in production, use actual ML model)
   */
  private createMockEmbedding(memory: CognitiveMemory): number[] {
    // Create a pseudo-random but consistent embedding based on memory properties
    const text = `${memory.title} ${memory.description} ${memory.tags.join(' ')}`;
    const embedding: number[] = [];
    
    for (let i = 0; i < 128; i++) {
      // Use character codes to create consistent values
      const charCode = text.charCodeAt(i % text.length);
      const value = (Math.sin(charCode + i) + 1) / 2;
      embedding.push(value);
    }
    
    return embedding;
  }

  /**
   * Build knowledge graph from memories
   */
  private buildKnowledgeGraph(): void {
    const nodes: KnowledgeGraphNode[] = [];
    const edges: any[] = [];

    this.memories.forEach((memory, id) => {
      const node: KnowledgeGraphNode = {
        id,
        type: memory.type,
        label: memory.title,
        data: memory,
        connections: []
      };

      // Add connections based on relatedMemories
      memory.relatedMemories.forEach(relatedId => {
        const relatedMemory = this.memories.get(relatedId);
        if (relatedMemory) {
          const connectionType = this.getConnectionType(memory.type, relatedMemory.type);
          node.connections.push({
            to: relatedId,
            type: connectionType,
            strength: 0.8
          });
          edges.push({
            from: id,
            to: relatedId,
            type: connectionType,
            strength: 0.8
          });
        }
      });

      nodes.push(node);
    });

    this.knowledgeGraph = { nodes, edges };
  }

  /**
   * Determine connection type between memory types
   */
  private getConnectionType(fromType: MemoryType, toType: MemoryType): string {
    const typeMap: { [key: string]: { [key: string]: string } } = {
      incident: {
        decision: 'informed',
        outcome: 'resulted_in',
        lesson: 'taught'
      },
      decision: {
        incident: 'addressed',
        outcome: 'produced',
        lesson: 'informed'
      },
      outcome: {
        incident: 'resolved',
        decision: 'resulted_from',
        lesson: 'generated'
      },
      lesson: {
        incident: 'learned_from',
        decision: 'informed',
        outcome: 'derived_from'
      }
    };

    return typeMap[fromType]?.[toType] || 'related';
  }

  /**
   * Add a new memory to the system
   */
  addMemory(memory: CognitiveMemory): void {
    this.memories.set(memory.id, memory);
    
    // Generate embedding
    const embedding = this.createMockEmbedding(memory);
    this.embeddings.set(memory.id, {
      id: `embedding_${memory.id}`,
      memoryId: memory.id,
      vector: embedding,
      metadata: {
        type: memory.type,
        category: (memory as any).category,
        tags: memory.tags,
        createdAt: memory.createdAt
      }
    });

    // Rebuild knowledge graph
    this.buildKnowledgeGraph();
  }

  /**
   * Semantic search using vector embeddings
   */
  searchMemories(query: MemorySearchQuery): MemorySearchResult[] {
    const queryEmbedding = this.createQueryEmbedding(query.query);
    const results: MemorySearchResult[] = [];

    this.embeddings.forEach((embedding, id) => {
      const memory = this.memories.get(id);
      if (!memory) return;

      // Filter by type if specified
      if (query.type && memory.type !== query.type) return;

      // Filter by category if specified
      if (query.category && (memory as any).category !== query.category) return;

      // Filter by severity if specified
      if (query.severity && (memory as any).severity !== query.severity) return;

      // Filter by date range if specified
      if (query.dateRange) {
        if (memory.createdAt < query.dateRange.start || memory.createdAt > query.dateRange.end) return;
      }

      // Filter by tags if specified
      if (query.tags && query.tags.length > 0) {
        const hasAllTags = query.tags.every(tag => memory.tags.includes(tag));
        if (!hasAllTags) return;
      }

      // Calculate similarity
      const similarity = this.cosineSimilarity(queryEmbedding, embedding.vector);

      if (similarity >= (query.minSimilarity || 0.3)) {
        results.push({
          memory,
          similarity,
          relevance: this.calculateRelevance(similarity, memory),
          matchReasons: this.getMatchReasons(query, memory)
        });
      }
    });

    // Sort by similarity and limit results
    results.sort((a, b) => b.similarity - a.similarity);
    return results.slice(0, query.limit || 10);
  }

  /**
   * Create query embedding from text
   */
  private createQueryEmbedding(query: string): number[] {
    const embedding: number[] = [];
    for (let i = 0; i < 128; i++) {
      const charCode = query.charCodeAt(i % query.length);
      const value = (Math.sin(charCode + i) + 1) / 2;
      embedding.push(value);
    }
    return embedding;
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitude1 * magnitude2);
  }

  /**
   * Calculate relevance score
   */
  private calculateRelevance(similarity: number, memory: CognitiveMemory): string {
    if (similarity > 0.8) return 'highly_relevant';
    if (similarity > 0.6) return 'relevant';
    if (similarity > 0.4) return 'somewhat_relevant';
    return 'low_relevance';
  }

  /**
   * Get match reasons for search result
   */
  private getMatchReasons(query: MemorySearchQuery, memory: CognitiveMemory): string[] {
    const reasons: string[] = [];
    const queryLower = query.query.toLowerCase();

    if (memory.title.toLowerCase().includes(queryLower)) {
      reasons.push('Title match');
    }
    if (memory.description.toLowerCase().includes(queryLower)) {
      reasons.push('Description match');
    }
    if (memory.tags.some(tag => tag.toLowerCase().includes(queryLower))) {
      reasons.push('Tag match');
    }

    return reasons;
  }

  /**
   * Get case recommendations for a current incident
   */
  getCaseRecommendations(incidentDescription: string): CaseRecommendation {
    // Search for similar incidents
    const similarIncidents = this.searchMemories({
      query: incidentDescription,
      type: 'incident',
      minSimilarity: 0.4,
      limit: 5
    });

    const similarCases = similarIncidents
      .filter(result => result.memory.type === 'incident')
      .map(result => {
        const incident = result.memory as Incident;
        const decision = incident.relatedMemories
          .map(id => this.memories.get(id))
          .find(m => m?.type === 'decision') as Decision | undefined;
        const outcome = incident.relatedMemories
          .map(id => this.memories.get(id))
          .find(m => m?.type === 'outcome') as Outcome | undefined;

        return {
          incident,
          decision,
          outcome,
          similarity: result.similarity,
          matchReasons: result.matchReasons
        };
      });

    // Generate recommended actions
    const recommendedActions = similarCases
      .filter(c => c.decision && c.outcome?.outcomeStatus === 'success')
      .map(c => ({
        action: c.decision!.action.description,
        source: c.incident.title,
        confidence: c.similarity * (c.outcome?.outcomeStatus === 'success' ? 1 : 0.5),
        reasoning: c.decision!.reasoning.primaryReason
      }));

    // Get relevant lessons
    const lessons = similarCases
      .flatMap(c => c.incident.relatedMemories)
      .map(id => this.memories.get(id))
      .filter(m => m?.type === 'lesson') as Lesson[];

    // Generate overall recommendation
    const overallRecommendation = this.generateOverallRecommendation(similarCases, lessons);

    const confidence = similarCases.length > 0 
      ? similarCases.reduce((sum, c) => sum + c.similarity, 0) / similarCases.length 
      : 0;

    return {
      currentIncident: incidentDescription,
      similarCases,
      recommendedActions,
      lessons,
      overallRecommendation,
      confidence
    };
  }

  /**
   * Generate overall recommendation from similar cases
   */
  private generateOverallRecommendation(
    similarCases: any[],
    lessons: Lesson[]
  ): string {
    if (similarCases.length === 0) {
      return 'No similar historical cases found. Recommend documenting this incident for future learning.';
    }

    const successfulCases = similarCases.filter(c => c.outcome?.outcomeStatus === 'success');
    if (successfulCases.length > 0) {
      const topCase = successfulCases[0];
      return `Based on ${successfulCases.length} similar successful cases, particularly "${topCase.incident.title}", recommend following the proven mitigation strategy. Key lessons: ${lessons.map(l => l.lesson).slice(0, 2).join(', ')}.`;
    }

    return 'Similar cases found but with mixed success. Recommend careful evaluation of options and consider multiple approaches.';
  }

  /**
   * Get memory timeline
   */
  getMemoryTimeline(): MemoryTimeline[] {
    const timelines: MemoryTimeline[] = [];
    const sortedMemories = Array.from(this.memories.values())
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    sortedMemories.forEach((memory, index) => {
      const previous = index > 0 ? sortedMemories[index - 1].id : undefined;
      const next = index < sortedMemories.length - 1 ? sortedMemories[index + 1].id : undefined;

      timelines.push({
        memory,
        timestamp: memory.createdAt,
        connections: {
          previous: previous ? [previous] : [],
          next: next ? [next] : []
        }
      });
    });

    return timelines;
  }

  /**
   * Get knowledge graph
   */
  getKnowledgeGraph(): KnowledgeGraph {
    return this.knowledgeGraph;
  }

  /**
   * Get memory analytics
   */
  getAnalytics(): MemoryAnalytics {
    const memories = Array.from(this.memories.values());
    const memoriesByType: { [key in MemoryType]: number } = {
      incident: 0,
      decision: 0,
      outcome: 0,
      lesson: 0
    };

    memories.forEach(m => {
      memoriesByType[m.type]++;
    });

    const outcomes = memories.filter(m => m.type === 'outcome') as Outcome[];
    const successRate = outcomes.length > 0
      ? (outcomes.filter(o => o.outcomeStatus === 'success').length / outcomes.length) * 100
      : 0;

    const incidents = memories.filter(m => m.type === 'incident') as Incident[];
    const avgResolutionTime = incidents.length > 0
      ? incidents.reduce((sum, i) => sum + (i.timeline.duration || 0), 0) / incidents.length
      : 0;

    return {
      totalMemories: memories.length,
      memoriesByType,
      successRate,
      averageResolutionTime: avgResolutionTime,
      topCategories: [],
      learningTrends: [],
      effectiveness: {
        byDecisionType: {
          mitigation: 85,
          prevention: 78,
          recovery: 82,
          optimization: 90
        },
        byCategory: {}
      }
    };
  }

  /**
   * Get all memories
   */
  getAllMemories(): CognitiveMemory[] {
    return Array.from(this.memories.values());
  }

  /**
   * Get memory by ID
   */
  getMemoryById(id: string): CognitiveMemory | undefined {
    return this.memories.get(id);
  }
}
