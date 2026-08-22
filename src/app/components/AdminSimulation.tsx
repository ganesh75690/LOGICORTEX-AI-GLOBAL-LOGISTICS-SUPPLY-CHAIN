import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  AlertTriangle,
  BarChart3,
  Clock,
  DollarSign,
  Users,
  Truck,
  Package,
  Activity,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  ArrowRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, LineChart, Line } from 'recharts';

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  category: 'demand' | 'traffic' | 'weather' | 'resource' | 'cost';
  parameters: {
    demandSpike?: number;
    trafficIncrease?: number;
    weatherDelay?: number;
    driverShortage?: number;
    fuelCostIncrease?: number;
  };
  icon: string;
  difficulty: 'easy' | 'medium' | 'complex';
  estimatedTime: string;
}

interface SimulationResult {
  scenario: string;
  baseline: {
    cost: number;
    efficiency: number;
    deliveryTime: number;
    customerSatisfaction: number;
  };
  simulated: {
    cost: number;
    efficiency: number;
    deliveryTime: number;
    customerSatisfaction: number;
  };
  impact: {
    costChange: number;
    efficiencyChange: number;
    deliveryTimeChange: number;
    satisfactionChange: number;
  };
  recommendations: string[];
  risks: string[];
}

interface DecisionOption {
  id: string;
  title: string;
  description: string;
  impact: {
    cost: number;
    time: number;
    risk: 'low' | 'medium' | 'high';
    resources: string[];
  };
  probability: number;
  confidence: number;
}

export function AdminSimulation() {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'results' | 'decisions' | 'optimization'>('scenarios');
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [currentResult, setCurrentResult] = useState<SimulationResult | null>(null);
  const [optimizationsApplied, setOptimizationsApplied] = useState(false);
  const [appliedOptimizations, setAppliedOptimizations] = useState<string[]>([]);
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);

  const scenarios: SimulationScenario[] = [
    {
      id: 'demand-spike',
      name: 'Demand Surge Analysis',
      description: 'Simulate 200% spike in demand due to seasonal shopping or market events',
      category: 'demand',
      parameters: { demandSpike: 200 },
      icon: '📈',
      difficulty: 'medium',
      estimatedTime: '5 min'
    },
    {
      id: 'traffic-crisis',
      name: 'Traffic Crisis Scenario',
      description: 'Simulate major traffic congestion affecting 75% of delivery routes',
      category: 'traffic',
      parameters: { trafficIncrease: 75 },
      icon: '🚦',
      difficulty: 'complex',
      estimatedTime: '8 min'
    },
    {
      id: 'weather-disruption',
      name: 'Severe Weather Event',
      description: 'Simulate storm system causing 3-hour delays across multiple regions',
      category: 'weather',
      parameters: { weatherDelay: 180 },
      icon: '⛈️',
      difficulty: 'medium',
      estimatedTime: '6 min'
    },
    {
      id: 'driver-shortage',
      name: 'Driver Shortage Crisis',
      description: 'Simulate 40% reduction in available drivers due to illness or turnover',
      category: 'resource',
      parameters: { driverShortage: 40 },
      icon: '👥',
      difficulty: 'complex',
      estimatedTime: '7 min'
    },
    {
      id: 'fuel-cost-surge',
      name: 'Fuel Cost Increase',
      description: 'Simulate 50% increase in fuel costs affecting overall profitability',
      category: 'cost',
      parameters: { fuelCostIncrease: 50 },
      icon: '⛽',
      difficulty: 'easy',
      estimatedTime: '3 min'
    }
  ];

  const decisionOptions: DecisionOption[] = [
    {
      id: 'reroute-all',
      title: 'Reroute All Shipments',
      description: 'Automatically reroute all affected shipments to alternative routes',
      impact: { cost: 15000, time: 30, risk: 'medium', resources: ['AI System', 'Traffic Data'] },
      probability: 75,
      confidence: 85
    },
    {
      id: 'delay-shipments',
      title: 'Delay Non-Critical Shipments',
      description: 'Postpone non-urgent deliveries to prioritize critical ones',
      impact: { cost: 5000, time: 15, risk: 'low', resources: ['Manual Review'] },
      probability: 90,
      confidence: 95
    },
    {
      id: 'external-partners',
      title: 'Engage External Partners',
      description: 'Contract third-party logistics for overflow capacity',
      impact: { cost: 25000, time: 45, risk: 'high', resources: ['Partners', 'Legal'] },
      probability: 60,
      confidence: 70
    },
    {
      id: 'dynamic-pricing',
      title: 'Dynamic Pricing Adjustment',
      description: 'Implement surge pricing for high-demand routes',
      impact: { cost: -8000, time: 20, risk: 'medium', resources: ['Pricing Team'] },
      probability: 80,
      confidence: 75
    }
  ];

  const runSimulation = async (scenario: SimulationScenario) => {
    setIsRunning(true);
    setSelectedScenario(scenario);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate realistic simulation results
    const baseline = {
      cost: 100000,
      efficiency: 85,
      deliveryTime: 24,
      customerSatisfaction: 92
    };

    let simulated = { ...baseline };
    
    // Apply scenario-specific impacts
    switch (scenario.id) {
      case 'demand-spike':
        simulated.cost *= 1.8;
        simulated.efficiency *= 0.7;
        simulated.deliveryTime *= 1.5;
        simulated.customerSatisfaction *= 0.85;
        break;
      case 'traffic-crisis':
        simulated.cost *= 1.4;
        simulated.efficiency *= 0.6;
        simulated.deliveryTime *= 2.2;
        simulated.customerSatisfaction *= 0.75;
        break;
      case 'weather-disruption':
        simulated.cost *= 1.3;
        simulated.efficiency *= 0.65;
        simulated.deliveryTime *= 1.8;
        simulated.customerSatisfaction *= 0.80;
        break;
      case 'driver-shortage':
        simulated.cost *= 1.6;
        simulated.efficiency *= 0.55;
        simulated.deliveryTime *= 2.0;
        simulated.customerSatisfaction *= 0.70;
        break;
      case 'fuel-cost-surge':
        simulated.cost *= 1.5;
        simulated.efficiency *= 0.90;
        simulated.deliveryTime *= 1.1;
        simulated.customerSatisfaction *= 0.88;
        break;
    }

    const result: SimulationResult = {
      scenario: scenario.name,
      baseline,
      simulated,
      impact: {
        costChange: ((simulated.cost - baseline.cost) / baseline.cost) * 100,
        efficiencyChange: ((simulated.efficiency - baseline.efficiency) / baseline.efficiency) * 100,
        deliveryTimeChange: ((simulated.deliveryTime - baseline.deliveryTime) / baseline.deliveryTime) * 100,
        satisfactionChange: ((simulated.customerSatisfaction - baseline.customerSatisfaction) / baseline.customerSatisfaction) * 100
      },
      recommendations: generateRecommendations(scenario),
      risks: generateRisks(scenario)
    };

    setSimulationResults(prev => [...prev, result]);
    setCurrentResult(result);
    setIsRunning(false);
  };

  const generateRecommendations = (scenario: SimulationScenario): string[] => {
    const recommendations: Record<string, string[]> = {
      'demand-spike': [
        'Activate overflow warehouse capacity',
        'Implement dynamic pricing for premium delivery',
        'Engage temporary driver workforce',
        'Prioritize high-value customers'
      ],
      'traffic-crisis': [
        'Reroute shipments to secondary highways',
        'Extend delivery windows by 2-3 hours',
        'Coordinate with local traffic authorities',
        'Use alternative transport modes where possible'
      ],
      'weather-disruption': [
        'Delay non-essential shipments',
        'Preposition inventory in safe zones',
        'Communicate proactively with customers',
        'Activate weather contingency plans'
      ],
      'driver-shortage': [
        'Offer overtime incentives to existing drivers',
        'Engage third-party logistics providers',
        'Consolidate shipments for efficiency',
        'Temporarily reduce service levels'
      ],
      'fuel-cost-surge': [
        'Optimize routes for fuel efficiency',
        'Implement fuel surcharge pricing',
        'Consider alternative fuel vehicles',
        'Reduce empty miles through better planning'
      ]
    };
    
    return recommendations[scenario.id] || ['Monitor situation closely', 'Prepare contingency plans'];
  };

  const generateRisks = (scenario: SimulationScenario): string[] => {
    const risks: Record<string, string[]> = {
      'demand-spike': [
        'Inventory stockouts at key locations',
        'Customer satisfaction decline',
        'Increased operational costs',
        'System capacity overload'
      ],
      'traffic-crisis': [
        'Significant delivery delays',
        'Increased fuel consumption',
        'Driver fatigue and safety concerns',
        'Customer complaints and cancellations'
      ],
      'weather-disruption': [
        'Package damage or loss',
        'Extended delivery timelines',
        'Safety risks for drivers',
        'Reputational damage'
      ],
      'driver-shortage': [
        'Service level degradation',
        'Increased overtime costs',
        'Driver burnout',
        'Loss of market share'
      ],
      'fuel-cost-surge': [
        'Profit margin erosion',
        'Competitive disadvantage',
        'Pressure on pricing strategy',
        'Cash flow challenges'
      ]
    };
    
    return risks[scenario.id] || ['Unknown risks may arise', 'Monitor all metrics closely'];
  };

  const handleApplyOptimizations = () => {
    const optimizations = [
      'Route Consolidation',
      'Dynamic Scheduling', 
      'Load Balancing'
    ];
    
    setAppliedOptimizations(optimizations);
    setOptimizationsApplied(true);
    
    // Update current result with optimized metrics
    if (currentResult) {
      const optimizedResult = {
        ...currentResult,
        simulated: {
          ...currentResult.simulated,
          cost: currentResult.simulated.cost * 0.85, // 15% cost reduction
          efficiency: currentResult.simulated.efficiency * 1.12, // 12% efficiency increase
          deliveryTime: currentResult.simulated.deliveryTime * 0.92 // 8% faster delivery
        }
      };
      setCurrentResult(optimizedResult);
    }
  };

  const handleSelectDecision = (optionId: string) => {
    setSelectedDecision(optionId);
    
    // Find the selected option
    const selectedOption = decisionOptions.find(option => option.id === optionId);
    if (selectedOption) {
      // You could add additional logic here like:
      // - Update simulation results based on the decision
      // - Show a confirmation message
      // - Log the decision for analytics
      console.log('Decision selected:', selectedOption.title);
    }
  };

  const tabs = [
    { id: 'scenarios' as const, name: 'Scenarios', icon: Zap, count: 0 },
    { id: 'results' as const, name: 'Results', icon: BarChart3, count: simulationResults.length },
    { id: 'decisions' as const, name: 'Decisions', icon: Target, count: 0 },
    { id: 'optimization' as const, name: 'Optimization', icon: TrendingUp, count: 0 }
  ];

  const performanceData = currentResult ? [
    { metric: 'Cost', baseline: currentResult.baseline.cost, simulated: currentResult.simulated.cost },
    { metric: 'Efficiency', baseline: currentResult.baseline.efficiency, simulated: currentResult.simulated.efficiency },
    { metric: 'Delivery Time', baseline: currentResult.baseline.deliveryTime, simulated: currentResult.simulated.deliveryTime },
    { metric: 'Satisfaction', baseline: currentResult.baseline.customerSatisfaction, simulated: currentResult.simulated.customerSatisfaction }
  ] : [];

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Admin Simulation Center
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">What-if analysis</span>
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-700/50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
              {tab.count > 0 && (
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'scenarios' && (
          <motion.div
            key="scenarios"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarios.map(scenario => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: isRunning ? 1 : 1.02 }}
                  whileTap={{ scale: isRunning ? 1 : 0.98 }}
                  className={`bg-slate-800/50 rounded-lg p-4 border transition-all relative overflow-hidden ${
                    selectedScenario?.id === scenario.id && isRunning
                      ? 'border-purple-500/50 bg-purple-500/10 shadow-lg shadow-purple-500/20 cursor-default' 
                      : isRunning
                      ? 'border-slate-700/50 cursor-not-allowed opacity-50'
                      : 'border-slate-700/50 cursor-pointer hover:border-purple-500/50'
                  }`}
                  onClick={() => !isRunning && runSimulation(scenario)}
                >
                  {isRunning && selectedScenario?.id !== scenario.id && (
                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                      <div className="text-slate-400 text-xs font-medium">Simulation in Progress</div>
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div className="relative">
                      <div className="text-2xl">{scenario.icon}</div>
                      {selectedScenario?.id === scenario.id && isRunning && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="absolute -top-1 -right-1"
                        >
                          <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        </motion.div>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      scenario.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                      scenario.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {scenario.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-white font-medium mb-2">{scenario.name}</h3>
                  <p className="text-slate-400 text-sm mb-3">{scenario.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {scenario.estimatedTime}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded ${
                        scenario.category === 'demand' ? 'bg-blue-500/20 text-blue-400' :
                        scenario.category === 'traffic' ? 'bg-orange-500/20 text-orange-400' :
                        scenario.category === 'weather' ? 'bg-cyan-500/20 text-cyan-400' :
                        scenario.category === 'resource' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {scenario.category}
                      </span>
                      {selectedScenario?.id === scenario.id && isRunning && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30 flex items-center gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-purple-400 rounded-full"
                          />
                          Running
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {isRunning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-purple-500/10 rounded-lg p-6 border border-purple-500/30 text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-6 h-6 text-purple-400" />
                  </motion.div>
                  <span className="text-purple-400 font-medium">Running Simulation...</span>
                </div>
                <p className="text-slate-400 text-sm">Analyzing scenario: {selectedScenario?.name}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {simulationResults.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No simulation results yet</p>
                <p className="text-slate-500 text-sm mt-1">Run a scenario to see results</p>
              </div>
            ) : (
              <>
                {currentResult && (
                  <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                    <h3 className="text-white font-medium mb-4">{currentResult.scenario} - Impact Analysis</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-slate-400 text-sm mb-3">Performance Comparison</h4>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="metric" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                color: '#fff'
                              }}
                            />
                            <Legend />
                            <Bar dataKey="baseline" fill="#3b82f6" name="Baseline" />
                            <Bar dataKey="simulated" fill="#a855f7" name="Simulated" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div>
                        <h4 className="text-slate-400 text-sm mb-3">Impact Summary</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Cost Change</span>
                            <span className={`flex items-center gap-1 ${
                              currentResult.impact.costChange > 0 ? 'text-red-400' : 'text-green-400'
                            }`}>
                              {currentResult.impact.costChange > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                              {Math.abs(currentResult.impact.costChange).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Efficiency Change</span>
                            <span className={`flex items-center gap-1 ${
                              currentResult.impact.efficiencyChange > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {currentResult.impact.efficiencyChange > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                              {Math.abs(currentResult.impact.efficiencyChange).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Delivery Time Change</span>
                            <span className={`flex items-center gap-1 ${
                              currentResult.impact.deliveryTimeChange > 0 ? 'text-red-400' : 'text-green-400'
                            }`}>
                              {currentResult.impact.deliveryTimeChange > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                              {Math.abs(currentResult.impact.deliveryTimeChange).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Satisfaction Change</span>
                            <span className={`flex items-center gap-1 ${
                              currentResult.impact.satisfactionChange > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {currentResult.impact.satisfactionChange > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                              {Math.abs(currentResult.impact.satisfactionChange).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-slate-400 text-sm mb-3">Recommendations</h4>
                        <div className="space-y-2">
                          {currentResult.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300 text-sm">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-slate-400 text-sm mb-3">Risk Factors</h4>
                        <div className="space-y-2">
                          {currentResult.risks.map((risk, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300 text-sm">{risk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <h4 className="text-white font-medium">Previous Results</h4>
                  {simulationResults.slice().reverse().slice(1).map((result, index) => (
                    <div
                      key={index}
                      className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 cursor-pointer hover:border-purple-500/50 transition-all"
                      onClick={() => setCurrentResult(result)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{result.scenario}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${
                            result.impact.costChange > 0 ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {result.impact.costChange > 0 ? '+' : ''}{result.impact.costChange.toFixed(1)}% cost
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {activeTab === 'decisions' && (
          <motion.div
            key="decisions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">Decision Support Options</h3>
              <div className="space-y-4">
                {decisionOptions.map(option => (
                  <div key={option.id} className={`bg-slate-900/50 rounded-lg p-4 border transition-all ${
                    selectedDecision === option.id 
                      ? 'border-green-500/50 bg-green-500/5 shadow-lg shadow-green-500/10' 
                      : 'border-slate-700/50'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-medium">{option.title}</h4>
                          {selectedDecision === option.id && (
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                              ✓ Selected
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm">{option.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-purple-400">{option.probability}%</div>
                        <div className="text-xs text-slate-500">probability</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Cost Impact</p>
                        <p className={`text-sm font-medium ${
                          option.impact.cost > 0 ? 'text-red-400' : 'text-green-400'
                        }`}>
                          ₹{Math.abs(option.impact.cost).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Time to Implement</p>
                        <p className="text-sm font-medium text-blue-400">{option.impact.time} min</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Risk Level</p>
                        <p className={`text-sm font-medium ${
                          option.impact.risk === 'low' ? 'text-green-400' :
                          option.impact.risk === 'medium' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {option.impact.risk}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Confidence:</span>
                        <div className="flex items-center gap-1">
                          <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-400 rounded-full"
                              style={{ width: `${option.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs text-purple-400">{option.confidence}%</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleSelectDecision(option.id)}
                        className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
                          selectedDecision === option.id
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                        }`}
                      >
                        {selectedDecision === option.id ? '✓ Selected' : 'Select Option'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'optimization' && (
          <motion.div
            key="optimization"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">System Optimization Engine</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-slate-400 text-sm mb-3">Current Efficiency Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Route Optimization</span>
                      <span className="text-green-400 text-sm font-medium">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Resource Utilization</span>
                      <span className="text-yellow-400 text-sm font-medium">72%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Cost Efficiency</span>
                      <span className="text-green-400 text-sm font-medium">91%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Delivery Performance</span>
                      <span className="text-blue-400 text-sm font-medium">85%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-slate-400 text-sm mb-3">
                    {optimizationsApplied ? 'Applied Optimizations' : 'Optimization Opportunities'}
                  </h4>
                  <div className="space-y-2">
                    <div className={`flex items-center justify-between p-2 rounded-lg ${
                      optimizationsApplied ? 'bg-green-500/20 border border-green-500/30' : 'bg-green-500/10'
                    }`}>
                      <span className={`text-sm ${optimizationsApplied ? 'text-green-300' : 'text-green-400'}`}>
                        Route Consolidation {optimizationsApplied && '✓'}
                      </span>
                      <span className={`text-xs ${optimizationsApplied ? 'text-green-300' : 'text-green-400'}`}>
                        +12% efficiency
                      </span>
                    </div>
                    <div className={`flex items-center justify-between p-2 rounded-lg ${
                      optimizationsApplied ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-blue-500/10'
                    }`}>
                      <span className={`text-sm ${optimizationsApplied ? 'text-blue-300' : 'text-blue-400'}`}>
                        Dynamic Scheduling {optimizationsApplied && '✓'}
                      </span>
                      <span className={`text-xs ${optimizationsApplied ? 'text-blue-300' : 'text-blue-400'}`}>
                        +8% efficiency
                      </span>
                    </div>
                    <div className={`flex items-center justify-between p-2 rounded-lg ${
                      optimizationsApplied ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-purple-500/10'
                    }`}>
                      <span className={`text-sm ${optimizationsApplied ? 'text-purple-300' : 'text-purple-400'}`}>
                        Load Balancing {optimizationsApplied && '✓'}
                      </span>
                      <span className={`text-xs ${optimizationsApplied ? 'text-purple-300' : 'text-purple-400'}`}>
                        +15% efficiency
                      </span>
                    </div>
                  </div>
                  {optimizationsApplied && (
                    <div className="mt-3 p-2 bg-green-500/10 rounded-lg">
                      <p className="text-green-400 text-xs font-medium">All optimizations successfully applied!</p>
                      <p className="text-green-300 text-xs mt-1">Performance metrics updated with improvements</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium mb-1">Auto-Optimization Available</h4>
                    <p className="text-slate-400 text-sm">AI suggests 3 optimizations for immediate implementation</p>
                  </div>
                  <button 
                    onClick={handleApplyOptimizations}
                    disabled={optimizationsApplied}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      optimizationsApplied 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    {optimizationsApplied ? 'Optimizations Applied' : 'Apply Optimizations'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
