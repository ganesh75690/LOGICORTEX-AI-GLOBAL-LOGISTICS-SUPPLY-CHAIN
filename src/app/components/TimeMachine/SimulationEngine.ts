import {
  DisruptionScenario,
  PredictedConsequences,
  CascadingImpact,
  RecoveryStrategy,
  StrategyRanking,
  SimulationResult,
  DisruptionType,
  SeverityLevel,
  ImpactCategory,
  RecoveryStrategyType,
  RankingCriteria
} from '../../types/timeMachine';

/**
 * Supply Chain Time Machine - Simulation Engine
 * Core engine for predicting future consequences of supply chain decisions
 */
export class SimulationEngine {
  private digitalTwinData: any;
  private historicalData: any;
  private modelVersion: string = '1.0.0';

  constructor(digitalTwinData?: any, historicalData?: any) {
    this.digitalTwinData = digitalTwinData || this.getMockDigitalTwinData();
    this.historicalData = historicalData || this.getMockHistoricalData();
  }

  /**
   * Run a complete simulation for a given scenario
   */
  async runSimulation(scenario: DisruptionScenario): Promise<SimulationResult> {
    const startTime = Date.now();
    
    // 1. Predict cascading impacts
    const predictedConsequences = await this.predictConsequences(scenario);
    
    // 2. Generate recovery strategies
    const recoveryStrategies = await this.generateRecoveryStrategies(scenario, predictedConsequences);
    
    // 3. Rank strategies by multiple criteria
    const strategyRankings = await this.rankStrategies(recoveryStrategies, predictedConsequences);
    
    const executionTime = Date.now() - startTime;
    
    return {
      id: this.generateId(),
      scenarioId: scenario.id,
      timestamp: new Date(),
      predictedConsequences,
      recoveryStrategies,
      strategyRankings,
      simulationMetadata: {
        executionTime,
        dataPointsAnalyzed: this.countDataPoints(),
        modelVersion: this.modelVersion,
        confidenceThreshold: 0.7
      }
    };
  }

  /**
   * Predict cascading impacts across the supply chain
   */
  private async predictConsequences(scenario: DisruptionScenario): Promise<PredictedConsequences> {
    const cascadingImpacts = await this.calculateCascadingImpacts(scenario);
    const timeline = await this.generateImpactTimeline(scenario, cascadingImpacts);
    const affectedCustomers = await this.identifyAffectedCustomers(scenario, cascadingImpacts);
    const inventoryDepletion = await this.predictInventoryDepletion(scenario, cascadingImpacts);
    const productionInterruptions = await this.predictProductionInterruptions(scenario, cascadingImpacts);
    
    const overallConfidence = this.calculateOverallConfidence(cascadingImpacts);

    return {
      scenarioId: scenario.id,
      predictionTime: new Date(),
      confidence: overallConfidence,
      cascadingImpacts,
      timeline,
      affectedCustomers,
      inventoryDepletion,
      productionInterruptions
    };
  }

  /**
   * Calculate cascading impacts across different categories
   */
  private async calculateCascadingImpacts(scenario: DisruptionScenario): Promise<CascadingImpact[]> {
    const impacts: CascadingImpact[] = [];
    
    // Inventory impact
    const inventoryImpact = await this.calculateInventoryImpact(scenario);
    if (inventoryImpact) impacts.push(inventoryImpact);
    
    // Production impact
    const productionImpact = await this.calculateProductionImpact(scenario);
    if (productionImpact) impacts.push(productionImpact);
    
    // Logistics impact
    const logisticsImpact = await this.calculateLogisticsImpact(scenario);
    if (logisticsImpact) impacts.push(logisticsImpact);
    
    // Financial impact
    const financialImpact = await this.calculateFinancialImpact(scenario);
    if (financialImpact) impacts.push(financialImpact);
    
    // Customer impact
    const customerImpact = await this.calculateCustomerImpact(scenario);
    if (customerImpact) impacts.push(customerImpact);
    
    // Supplier impact
    const supplierImpact = await this.calculateSupplierImpact(scenario);
    if (supplierImpact) impacts.push(supplierImpact);
    
    // Warehouse impact
    const warehouseImpact = await this.calculateWarehouseImpact(scenario);
    if (warehouseImpact) impacts.push(warehouseImpact);
    
    return impacts;
  }

  /**
   * Calculate inventory impact for a scenario
   */
  private async calculateInventoryImpact(scenario: DisruptionScenario): Promise<CascadingImpact | null> {
    const affectedWarehouses = this.findAffectedWarehouses(scenario);
    
    if (affectedWarehouses.length === 0) return null;

    const impactMagnitude = this.calculateImpactMagnitude(scenario, 'inventory');
    const stockoutTimeline = this.estimateStockoutTimeline(scenario, affectedWarehouses);

    return {
      category: 'inventory',
      affectedEntities: affectedWarehouses.map(wh => ({
        id: wh.id,
        name: wh.name,
        type: 'warehouse',
        impactSeverity: this.determineSeverity(impactMagnitude)
      })),
      estimatedImpact: {
        timeline: stockoutTimeline.hoursUntilStockout,
        magnitude: impactMagnitude,
        confidence: 85
      },
      financialImpact: {
        immediateCost: stockoutTimeline.immediateCost,
        ongoingCostPerHour: stockoutTimeline.hourlyCost,
        totalEstimatedCost: stockoutTimeline.totalCost
      },
      operationalImpact: {
        productionCapacity: 100 - (impactMagnitude * 0.8),
        inventoryCoverage: stockoutTimeline.daysOfInventory,
        deliveryDelays: stockoutTimeline.averageDelay,
        customerImpact: impactMagnitude * 0.6
      }
    };
  }

  /**
   * Calculate production impact for a scenario
   */
  private async calculateProductionImpact(scenario: DisruptionScenario): Promise<CascadingImpact | null> {
    const affectedFactories = this.findAffectedFactories(scenario);
    
    if (affectedFactories.length === 0) return null;

    const impactMagnitude = this.calculateImpactMagnitude(scenario, 'production');
    const capacityReduction = this.estimateCapacityReduction(scenario, affectedFactories);

    return {
      category: 'production',
      affectedEntities: affectedFactories.map(factory => ({
        id: factory.id,
        name: factory.name,
        type: 'factory',
        impactSeverity: this.determineSeverity(capacityReduction)
      })),
      estimatedImpact: {
        timeline: capacityReduction.hoursUntilStoppage,
        magnitude: capacityReduction.reductionPercentage,
        confidence: 82
      },
      financialImpact: {
        immediateCost: capacityReduction.immediateCost,
        ongoingCostPerHour: capacityReduction.hourlyLoss,
        totalEstimatedCost: capacityReduction.totalLoss
      },
      operationalImpact: {
        productionCapacity: 100 - capacityReduction.reductionPercentage,
        inventoryCoverage: capacityReduction.daysOfOutput,
        deliveryDelays: capacityReduction.averageDelay,
        customerImpact: capacityReduction.reductionPercentage * 0.7
      }
    };
  }

  /**
   * Calculate logistics impact for a scenario
   */
  private async calculateLogisticsImpact(scenario: DisruptionScenario): Promise<CascadingImpact | null> {
    const affectedRoutes = this.findAffectedRoutes(scenario);
    
    if (affectedRoutes.length === 0) return null;

    const impactMagnitude = this.calculateImpactMagnitude(scenario, 'logistics');
    const delayEstimates = this.estimateDeliveryDelays(scenario, affectedRoutes);

    return {
      category: 'logistics',
      affectedEntities: affectedRoutes.map(route => ({
        id: route.id,
        name: route.name,
        type: 'route',
        impactSeverity: this.determineSeverity(delayEstimates.averageDelay)
      })),
      estimatedImpact: {
        timeline: delayEstimates.maxDelay,
        magnitude: impactMagnitude,
        confidence: 88
      },
      financialImpact: {
        immediateCost: delayEstimates.reroutingCost,
        ongoingCostPerHour: delayEstimates.hourlyCost,
        totalEstimatedCost: delayEstimates.totalLogisticsCost
      },
      operationalImpact: {
        productionCapacity: 95,
        inventoryCoverage: 100,
        deliveryDelays: delayEstimates.averageDelay,
        customerImpact: (delayEstimates.averageDelay / 48) * 100 // percentage with >48hr delay
      }
    };
  }

  /**
   * Calculate financial impact for a scenario
   */
  private async calculateFinancialImpact(scenario: DisruptionScenario): Promise<CascadingImpact | null> {
    const allImpacts = await this.calculateCascadingImpacts(scenario);
    
    let totalImmediateCost = 0;
    let totalOngoingCost = 0;
    let totalEstimatedCost = 0;

    allImpacts.forEach(impact => {
      totalImmediateCost += impact.financialImpact.immediateCost;
      totalOngoingCost += impact.financialImpact.ongoingCostPerHour;
      totalEstimatedCost += impact.financialImpact.totalEstimatedCost;
    });

    return {
      category: 'financial',
      affectedEntities: [{
        id: 'enterprise',
        name: 'Enterprise Financials',
        type: 'financial',
        impactSeverity: this.determineSeverity(totalEstimatedCost / 1000000) // severity by millions
      }],
      estimatedImpact: {
        timeline: scenario.estimatedDuration,
        magnitude: Math.min(100, totalEstimatedCost / 10000), // scale to 0-100
        confidence: 90
      },
      financialImpact: {
        immediateCost: totalImmediateCost,
        ongoingCostPerHour: totalOngoingCost,
        totalEstimatedCost: totalEstimatedCost
      },
      operationalImpact: {
        productionCapacity: 100,
        inventoryCoverage: 100,
        deliveryDelays: 0,
        customerImpact: 0
      }
    };
  }

  /**
   * Calculate customer impact for a scenario
   */
  private async calculateCustomerImpact(scenario: DisruptionScenario): Promise<CascadingImpact | null> {
    const affectedCustomers = await this.identifyAffectedCustomers(scenario, []);
    
    if (affectedCustomers.length === 0) return null;

    const impactMagnitude = affectedCustomers.reduce((sum, customer) => 
      sum + (customer.impactLevel === 'critical' ? 100 : 
             customer.impactLevel === 'high' ? 75 :
             customer.impactLevel === 'medium' ? 50 : 25), 0) / affectedCustomers.length;

    return {
      category: 'customer',
      affectedEntities: affectedCustomers.map(customer => ({
        id: customer.customerId,
        name: customer.customerName,
        type: 'customer',
        impactSeverity: customer.impactLevel
      })),
      estimatedImpact: {
        timeline: Math.max(...affectedCustomers.map(c => c.estimatedDelay)),
        magnitude: impactMagnitude,
        confidence: 87
      },
      financialImpact: {
        immediateCost: impactMagnitude * 1000,
        ongoingCostPerHour: impactMagnitude * 50,
        totalEstimatedCost: impactMagnitude * 10000
      },
      operationalImpact: {
        productionCapacity: 100,
        inventoryCoverage: 100,
        deliveryDelays: Math.max(...affectedCustomers.map(c => c.estimatedDelay)),
        customerImpact: impactMagnitude
      }
    };
  }

  /**
   * Calculate supplier impact for a scenario
   */
  private async calculateSupplierImpact(scenario: DisruptionScenario): Promise<CascadingImpact | null> {
    const affectedSuppliers = this.findAffectedSuppliers(scenario);
    
    if (affectedSuppliers.length === 0) return null;

    const impactMagnitude = this.calculateImpactMagnitude(scenario, 'supplier');

    return {
      category: 'supplier',
      affectedEntities: affectedSuppliers.map(supplier => ({
        id: supplier.id,
        name: supplier.name,
        type: 'supplier',
        impactSeverity: this.determineSeverity(impactMagnitude)
      })),
      estimatedImpact: {
        timeline: scenario.estimatedDuration,
        magnitude: impactMagnitude,
        confidence: 84
      },
      financialImpact: {
        immediateCost: impactMagnitude * 5000,
        ongoingCostPerHour: impactMagnitude * 200,
        totalEstimatedCost: impactMagnitude * 20000
      },
      operationalImpact: {
        productionCapacity: 100 - impactMagnitude,
        inventoryCoverage: 100,
        deliveryDelays: impactMagnitude * 2,
        customerImpact: impactMagnitude * 0.5
      }
    };
  }

  /**
   * Calculate warehouse impact for a scenario
   */
  private async calculateWarehouseImpact(scenario: DisruptionScenario): Promise<CascadingImpact | null> {
    const affectedWarehouses = this.findAffectedWarehouses(scenario);
    
    if (affectedWarehouses.length === 0) return null;

    const impactMagnitude = this.calculateImpactMagnitude(scenario, 'warehouse');

    return {
      category: 'warehouse',
      affectedEntities: affectedWarehouses.map(warehouse => ({
        id: warehouse.id,
        name: warehouse.name,
        type: 'warehouse',
        impactSeverity: this.determineSeverity(impactMagnitude)
      })),
      estimatedImpact: {
        timeline: scenario.estimatedDuration,
        magnitude: impactMagnitude,
        confidence: 86
      },
      financialImpact: {
        immediateCost: impactMagnitude * 3000,
        ongoingCostPerHour: impactMagnitude * 150,
        totalEstimatedCost: impactMagnitude * 15000
      },
      operationalImpact: {
        productionCapacity: 100,
        inventoryCoverage: 100 - impactMagnitude,
        deliveryDelays: impactMagnitude * 4,
        customerImpact: impactMagnitude * 0.8
      }
    };
  }

  /**
   * Generate impact timeline with key events
   */
  private async generateImpactTimeline(
    scenario: DisruptionScenario, 
    impacts: CascadingImpact[]
  ): Promise<{ hours: number; events: any[] }> {
    const events = [];
    const duration = scenario.estimatedDuration;
    
    // Initial impact event
    events.push({
      time: 0,
      event: `${scenario.disruptionType} detected at ${scenario.location.name}`,
      severity: scenario.severity,
      confidence: 95
    });

    // Cascading impact events based on impact categories
    impacts.forEach(impact => {
      const impactTime = impact.estimatedImpact.timeline;
      if (impactTime > 0 && impactTime <= duration) {
        events.push({
          time: impactTime,
          event: `${impact.category} impact reaches critical threshold`,
          severity: this.determineSeverity(impact.estimatedImpact.magnitude),
          confidence: impact.estimatedImpact.confidence
        });
      }
    });

    // Inventory stockout events
    const stockoutEvents = this.generateStockoutEvents(scenario, duration);
    events.push(...stockoutEvents);

    // Recovery milestones
    const recoveryEvents = this.generateRecoveryEvents(scenario, duration);
    events.push(...recoveryEvents);

    // Sort by time
    events.sort((a, b) => a.time - b.time);

    return {
      hours: duration,
      events
    };
  }

  /**
   * Identify affected customers
   */
  private async identifyAffectedCustomers(
    scenario: DisruptionScenario,
    impacts: CascadingImpact[]
  ): Promise<any[]> {
    const allCustomers = this.digitalTwinData.customers || [];
    const affectedCustomers = [];

    allCustomers.forEach(customer => {
      const impactLevel = this.calculateCustomerImpactLevel(scenario, customer);
      if (impactLevel !== 'low') {
        affectedCustomers.push({
          customerId: customer.id,
          customerName: customer.name,
          impactLevel,
          estimatedDelay: this.estimateCustomerDelay(scenario, customer),
          alternativeOptions: this.generateAlternativeOptions(customer)
        });
      }
    });

    return affectedCustomers;
  }

  /**
   * Predict inventory depletion
   */
  private async predictInventoryDepletion(
    scenario: DisruptionScenario,
    impacts: CascadingImpact[]
  ): Promise<any[]> {
    const inventoryData = this.digitalTwinData.inventory || [];
    const depletionPredictions = [];

    inventoryData.forEach(item => {
      const depletionRate = this.calculateDepletionRate(scenario, item);
      const stockoutTime = this.calculateStockoutTime(item.currentStock, depletionRate);
      const affectedWarehouses = this.findAffectedWarehousesForSKU(item.sku, scenario);

      if (stockoutTime < 168) { // less than 7 days
        depletionPredictions.push({
          sku: item.sku,
          currentStock: item.currentStock,
          depletionRate,
          stockoutTime,
          affectedWarehouses
        });
      }
    });

    return depletionPredictions;
  }

  /**
   * Predict production interruptions
   */
  private async predictProductionInterruptions(
    scenario: DisruptionScenario,
    impacts: CascadingImpact[]
  ): Promise<any[]> {
    const factories = this.digitalTwinData.factories || [];
    const interruptions = [];

    factories.forEach(factory => {
      const interruption = this.estimateFactoryInterruption(scenario, factory);
      if (interruption.capacityReduction > 0) {
        interruptions.push({
          factoryId: factory.id,
          factoryName: factory.name,
          interruptionType: interruption.type,
          estimatedDuration: interruption.duration,
          capacityReduction: interruption.capacityReduction
        });
      }
    });

    return interruptions;
  }

  /**
   * Generate recovery strategies
   */
  private async generateRecoveryStrategies(
    scenario: DisruptionScenario,
    consequences: PredictedConsequences
  ): Promise<RecoveryStrategy[]> {
    const strategies: RecoveryStrategy[] = [];

    // Generate strategies based on disruption type and impacts
    const strategyTypes = this.determineRelevantStrategyTypes(scenario, consequences);
    
    for (const strategyType of strategyTypes) {
      const strategy = await this.generateStrategy(strategyType, scenario, consequences);
      if (strategy) {
        strategies.push(strategy);
      }
    }

    return strategies;
  }

  /**
   * Generate a specific recovery strategy
   */
  private async generateStrategy(
    strategyType: RecoveryStrategyType,
    scenario: DisruptionScenario,
    consequences: PredictedConsequences
  ): Promise<RecoveryStrategy | null> {
    const baseStrategy = this.getStrategyTemplate(strategyType);
    
    if (!baseStrategy) return null;

    const effectiveness = this.calculateEffectiveness(strategyType, scenario, consequences);
    const cost = this.calculateStrategyCost(strategyType, scenario, consequences);
    const time = this.calculateImplementationTime(strategyType, scenario);
    const sustainability = this.calculateSustainabilityScore(strategyType);

    return {
      id: this.generateId(),
      name: baseStrategy.name,
      description: baseStrategy.description,
      strategyType,
      estimatedCost: cost,
      estimatedTime: time,
      effectiveness,
      confidence: this.calculateStrategyConfidence(effectiveness, cost, time),
      sustainabilityScore: sustainability,
      riskLevel: this.calculateStrategyRisk(strategyType, scenario),
      requirements: baseStrategy.requirements,
      expectedOutcomes: this.calculateExpectedOutcomes(strategyType, consequences),
      aiReasoning: this.generateAIReasoning(strategyType, scenario, consequences)
    };
  }

  /**
   * Rank strategies by multiple criteria
   */
  private async rankStrategies(
    strategies: RecoveryStrategy[],
    consequences: PredictedConsequences
  ): Promise<StrategyRanking[]> {
    const criteria: RankingCriteria[] = ['cost', 'time', 'sustainability', 'risk'];
    const weights = {
      cost: 0.3,
      time: 0.3,
      sustainability: 0.2,
      risk: 0.2
    };

    const rankings = strategies.map(strategy => {
      const scores = criteria.map(criterion => {
        const score = this.calculateCriterionScore(strategy, criterion);
        return {
          criteria: criterion,
          score,
          weight: weights[criterion]
        };
      });

      const overallScore = scores.reduce((sum, s) => sum + (s.score * s.weight), 0);

      return {
        strategyId: strategy.id,
        rankings: scores,
        overallScore,
        rank: 0, // will be set after sorting
        recommendation: this.determineRecommendation(overallScore)
      };
    });

    // Sort by overall score and assign ranks
    rankings.sort((a, b) => b.overallScore - a.overallScore);
    rankings.forEach((ranking, index) => {
      ranking.rank = index + 1;
    });

    return rankings;
  }

  // Helper methods for calculations and data retrieval
  
  private calculateImpactMagnitude(scenario: DisruptionScenario, category: string): number {
    const severityMultiplier = {
      low: 0.25,
      medium: 0.5,
      high: 0.75,
      critical: 1.0
    };
    
    const categoryMultiplier = {
      inventory: 0.8,
      production: 0.9,
      logistics: 0.85,
      financial: 1.0,
      customer: 0.7,
      supplier: 0.75,
      warehouse: 0.8
    };

    return (severityMultiplier[scenario.severity] * categoryMultiplier[category]) * 100;
  }

  private determineSeverity(magnitude: number): SeverityLevel {
    if (magnitude >= 80) return 'critical';
    if (magnitude >= 60) return 'high';
    if (magnitude >= 40) return 'medium';
    return 'low';
  }

  private calculateOverallConfidence(impacts: CascadingImpact[]): number {
    if (impacts.length === 0) return 0;
    const avgConfidence = impacts.reduce((sum, impact) => 
      sum + impact.estimatedImpact.confidence, 0) / impacts.length;
    return Math.round(avgConfidence);
  }

  private generateId(): string {
    return `tm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private countDataPoints(): number {
    // Mock implementation - count digital twin data points
    return 1250;
  }

  // Mock data methods
  private getMockDigitalTwinData(): any {
    return {
      warehouses: [
        { id: 'wh1', name: 'Mumbai Warehouse', location: 'Mumbai', capacity: 10000 },
        { id: 'wh2', name: 'Delhi Warehouse', location: 'Delhi', capacity: 8000 },
        { id: 'wh3', name: 'Bangalore Warehouse', location: 'Bangalore', capacity: 12000 }
      ],
      factories: [
        { id: 'f1', name: 'Mumbai Factory', location: 'Mumbai', capacity: 5000 },
        { id: 'f2', name: 'Chennai Factory', location: 'Chennai', capacity: 4000 }
      ],
      suppliers: [
        { id: 's1', name: 'Global Supplies Inc', location: 'Singapore' },
        { id: 's2', name: 'Local Manufacturing', location: 'Pune' }
      ],
      customers: [
        { id: 'c1', name: 'Retail Corp', location: 'Mumbai' },
        { id: 'c2', name: 'Tech Solutions', location: 'Bangalore' },
        { id: 'c3', name: 'Auto Parts Ltd', location: 'Chennai' }
      ],
      inventory: [
        { sku: 'SKU001', currentStock: 1500, warehouse: 'wh1' },
        { sku: 'SKU002', currentStock: 800, warehouse: 'wh2' },
        { sku: 'SKU003', currentStock: 2000, warehouse: 'wh3' }
      ],
      routes: [
        { id: 'r1', name: 'Mumbai-Delhi Route', origin: 'Mumbai', destination: 'Delhi' },
        { id: 'r2', name: 'Chennai-Bangalore Route', origin: 'Chennai', destination: 'Bangalore' }
      ]
    };
  }

  private getMockHistoricalData(): any {
    return {
      disruptions: [],
      recoveries: [],
      outcomes: []
    };
  }

  // Additional helper methods (simplified for brevity)
  private findAffectedWarehouses(scenario: DisruptionScenario): any[] {
    return this.digitalTwinData.warehouses.filter((wh: any) => 
      wh.location === scenario.location.name || 
      Math.random() > 0.7 // random selection for demo
    );
  }

  private findAffectedFactories(scenario: DisruptionScenario): any[] {
    return this.digitalTwinData.factories.filter((f: any) => 
      f.location === scenario.location.name || 
      Math.random() > 0.8
    );
  }

  private findAffectedRoutes(scenario: DisruptionScenario): any[] {
    return this.digitalTwinData.routes.filter((r: any) => 
      r.origin === scenario.location.name || 
      r.destination === scenario.location.name ||
      Math.random() > 0.6
    );
  }

  private findAffectedSuppliers(scenario: DisruptionScenario): any[] {
    return this.digitalTwinData.suppliers.filter((s: any) => 
      s.location === scenario.location.name ||
      Math.random() > 0.7
    );
  }

  private estimateStockoutTimeline(scenario: any, warehouses: any[]): any {
    return {
      hoursUntilStockout: 48 + Math.random() * 72,
      immediateCost: 5000 + Math.random() * 10000,
      hourlyCost: 100 + Math.random() * 200,
      totalCost: 15000 + Math.random() * 30000,
      daysOfInventory: 3 + Math.random() * 5,
      averageDelay: 12 + Math.random() * 24
    };
  }

  private estimateCapacityReduction(scenario: any, factories: any[]): any {
    return {
      hoursUntilStoppage: 24 + Math.random() * 48,
      immediateCost: 8000 + Math.random() * 15000,
      hourlyLoss: 200 + Math.random() * 400,
      totalLoss: 25000 + Math.random() * 50000,
      reductionPercentage: 30 + Math.random() * 50,
      daysOfOutput: 2 + Math.random() * 4,
      averageDelay: 18 + Math.random() * 36
    };
  }

  private estimateDeliveryDelays(scenario: any, routes: any[]): any {
    return {
      maxDelay: 48 + Math.random() * 72,
      averageDelay: 24 + Math.random() * 36,
      reroutingCost: 3000 + Math.random() * 7000,
      hourlyCost: 150 + Math.random() * 300,
      totalLogisticsCost: 20000 + Math.random() * 40000
    };
  }

  private calculateCustomerImpactLevel(scenario: any, customer: any): SeverityLevel {
    const random = Math.random();
    if (random > 0.8) return 'critical';
    if (random > 0.6) return 'high';
    if (random > 0.4) return 'medium';
    return 'low';
  }

  private estimateCustomerDelay(scenario: any, customer: any): number {
    return 12 + Math.random() * 48;
  }

  private generateAlternativeOptions(customer: any): string[] {
    return ['Alternative supplier', 'Expedited shipping', 'Buffer stock release'];
  }

  private calculateDepletionRate(scenario: any, item: any): number {
    return 10 + Math.random() * 20;
  }

  private calculateStockoutTime(currentStock: number, depletionRate: number): number {
    return currentStock / depletionRate;
  }

  private findAffectedWarehousesForSKU(sku: string, scenario: any): string[] {
    return ['wh1', 'wh2'];
  }

  private estimateFactoryInterruption(scenario: any, factory: any): any {
    return {
      type: 'material_shortage',
      duration: 24 + Math.random() * 48,
      capacityReduction: 20 + Math.random() * 40
    };
  }

  private generateStockoutEvents(scenario: any, duration: number): any[] {
    return [
      {
        time: 48,
        event: 'First SKU reaches critical stock level',
        severity: 'high',
        confidence: 80
      },
      {
        time: 96,
        event: 'Multiple SKUs at stockout risk',
        severity: 'critical',
        confidence: 75
      }
    ];
  }

  private generateRecoveryEvents(scenario: any, duration: number): any[] {
    return [
      {
        time: duration * 0.5,
        event: 'Recovery strategies show 50% effectiveness',
        severity: 'medium',
        confidence: 70
      },
      {
        time: duration * 0.8,
        event: 'Normal operations expected to resume',
        severity: 'low',
        confidence: 65
      }
    ];
  }

  private determineRelevantStrategyTypes(scenario: any, consequences: any): RecoveryStrategyType[] {
    return ['reroute', 'alternate_supplier', 'inventory_redistribution', 'emergency_procurement'];
  }

  private getStrategyTemplate(type: RecoveryStrategyType): any {
    const templates = {
      reroute: {
        name: 'Reroute Logistics',
        description: 'Redirect shipments through alternative routes to avoid disruption',
        requirements: {
          resources: ['Alternative routes', 'Additional carriers'],
          approvals: ['Logistics Manager'],
          dependencies: ['Route availability']
        }
      },
      alternate_supplier: {
        name: 'Alternate Supplier Activation',
        description: 'Activate backup suppliers to maintain supply continuity',
        requirements: {
          resources: ['Backup supplier contracts', 'Quality verification'],
          approvals: ['Procurement Manager', 'Quality Assurance'],
          dependencies: ['Supplier capacity']
        }
      },
      inventory_redistribution: {
        name: 'Inventory Redistribution',
        description: 'Redistribute inventory from unaffected warehouses to cover shortages',
        requirements: {
          resources: ['Transportation', 'Warehouse capacity'],
          approvals: ['Warehouse Manager'],
          dependencies: ['Available inventory']
        }
      },
      emergency_procurement: {
        name: 'Emergency Procurement',
        description: 'Execute emergency procurement procedures for critical materials',
        requirements: {
          resources: ['Emergency budget', 'Supplier network'],
          approvals: ['CFO', 'Procurement Director'],
          dependencies: ['Market availability']
        }
      }
    };
    return templates[type];
  }

  private calculateEffectiveness(type: string, scenario: any, consequences: any): number {
    return 70 + Math.random() * 25;
  }

  private calculateStrategyCost(type: string, scenario: any, consequences: any): number {
    const baseCosts = {
      reroute: 15000,
      alternate_supplier: 25000,
      inventory_redistribution: 10000,
      emergency_procurement: 35000
    };
    return baseCosts[type] * (0.8 + Math.random() * 0.4);
  }

  private calculateImplementationTime(type: string, scenario: any): number {
    const baseTimes = {
      reroute: 12,
      alternate_supplier: 24,
      inventory_redistribution: 8,
      emergency_procurement: 36
    };
    return baseTimes[type] * (0.7 + Math.random() * 0.6);
  }

  private calculateSustainabilityScore(type: string): number {
    const scores = {
      reroute: 65,
      alternate_supplier: 70,
      inventory_redistribution: 80,
      emergency_procurement: 55
    };
    return scores[type] + Math.random() * 10;
  }

  private calculateStrategyConfidence(effectiveness: number, cost: number, time: number): number {
    return Math.min(95, (effectiveness + (100 - cost / 500) + (100 - time)) / 3);
  }

  private calculateStrategyRisk(type: string, scenario: any): SeverityLevel {
    const risks = {
      reroute: 'medium',
      alternate_supplier: 'high',
      inventory_redistribution: 'low',
      emergency_procurement: 'high'
    };
    return risks[type] as SeverityLevel;
  }

  private calculateExpectedOutcomes(type: string, consequences: any): any {
    return {
      costReduction: 30 + Math.random() * 20,
      timeReduction: 25 + Math.random() * 25,
      customerImpact: 40 + Math.random() * 30,
      riskMitigation: 50 + Math.random() * 30
    };
  }

  private generateAIReasoning(type: string, scenario: any, consequences: any): any {
    return {
      whyRecommended: `This ${type} strategy is recommended based on historical effectiveness for ${scenario.disruptionType} scenarios`,
      supportingEvidence: [
        '85% success rate in similar historical disruptions',
        'Aligns with current inventory levels and supplier capacity',
        'Minimal regulatory requirements for implementation'
      ],
      potentialDrawbacks: [
        'Requires coordination across multiple departments',
        'May have short-term cost implications'
      ],
      alternativesConsidered: ['Do nothing and absorb impact', 'Partial implementation with limited scope']
    };
  }

  private calculateCriterionScore(strategy: any, criterion: RankingCriteria): number {
    const scores = {
      cost: 100 - (strategy.estimatedCost / 500),
      time: 100 - (strategy.estimatedTime / 2),
      sustainability: strategy.sustainabilityScore,
      risk: strategy.riskLevel === 'low' ? 90 : strategy.riskLevel === 'medium' ? 70 : 50
    };
    return Math.max(0, Math.min(100, scores[criterion]));
  }

  private determineRecommendation(overallScore: number): 'primary' | 'secondary' | 'fallback' {
    if (overallScore >= 80) return 'primary';
    if (overallScore >= 60) return 'secondary';
    return 'fallback';
  }
}
