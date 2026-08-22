import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Play, 
  Plus, 
  GitCompare, 
  TrendingUp, 
  AlertTriangle,
  DollarSign,
  Users,
  Package,
  Factory,
  Truck,
  Shield,
  ChevronRight,
  BarChart3,
  Target,
  Lightbulb,
  Activity,
  Calendar,
  Settings,
  Download,
  Share2
} from 'lucide-react';
import { SimulationEngine } from './SimulationEngine';
import { ScenarioCreator } from './ScenarioCreator';
import {
  DisruptionScenario,
  SimulationResult,
  TimeMachineDashboardData
} from '../../types/timeMachine';

/**
 * Supply Chain Time Machine Dashboard
 * Main interface for AI-powered supply chain simulation and prediction
 */
export const TimeMachineDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<TimeMachineDashboardData>({
    activeScenarios: [],
    recentSimulations: [],
    systemHealth: {
      digitalTwinSync: 98,
      modelAccuracy: 94,
      dataFreshness: 99
    },
    quickActions: {
      createScenario: true,
      runSimulation: true,
      compareScenarios: true,
      viewHistory: true
    }
  });

  const [selectedScenario, setSelectedScenario] = useState<DisruptionScenario | null>(null);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showScenarioCreator, setShowScenarioCreator] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'scenarios' | 'results' | 'comparison'>('overview');

  const simulationEngine = new SimulationEngine();

  // Mock data for demonstration
  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    const mockScenarios: DisruptionScenario[] = [
      {
        id: 'scenario_1',
        name: 'Port Closure Scenario',
        description: 'Simulate impact of Mumbai port closure due to labor strike',
        disruptionType: 'port_closure',
        severity: 'high',
        location: {
          type: 'port',
          id: 'port_mumbai',
          name: 'Mumbai Port',
          coordinates: { lat: 19.0134, lng: 72.8497 }
        },
        startTime: new Date(),
        estimatedDuration: 72,
        parameters: {
          strikeParticipation: 85,
          cargoBacklog: 5000
        },
        createdAt: new Date(),
        createdBy: 'admin'
      },
      {
        id: 'scenario_2',
        name: 'Supplier Failure Analysis',
        description: 'Impact assessment of primary supplier bankruptcy',
        disruptionType: 'supplier_failure',
        severity: 'critical',
        location: {
          type: 'supplier',
          id: 'supplier_global',
          name: 'Global Supplies Inc',
          coordinates: { lat: 1.3521, lng: 103.8198 }
        },
        startTime: new Date(),
        estimatedDuration: 168,
        parameters: {
          alternativeSuppliers: 2,
          inventoryCoverage: 14
        },
        createdAt: new Date(),
        createdBy: 'admin'
      }
    ];

    setDashboardData(prev => ({
      ...prev,
      activeScenarios: mockScenarios
    }));
  };

  const runSimulation = async (scenario: DisruptionScenario) => {
    setIsSimulating(true);
    setSelectedScenario(scenario);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = await simulationEngine.runSimulation(scenario);
    setSimulationResult(result);
    setIsSimulating(false);
    setActiveTab('results');
  };

  const createNewScenario = () => {
    setShowScenarioCreator(true);
  };

  const handleScenarioSave = (scenario: DisruptionScenario) => {
    setDashboardData(prev => ({
      ...prev,
      activeScenarios: [...prev.activeScenarios, scenario]
    }));
    setShowScenarioCreator(false);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Health Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] rounded-xl p-6 text-slate-900"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Supply Chain Time Machine
          </h2>
          <div className="flex gap-2">
            <button className="bg-slate-900/20 hover:bg-slate-900/30 px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
        <p className="text-slate-800 mb-4">
          AI-powered simulation engine for predicting future consequences of supply chain decisions
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Digital Twin Sync</div>
            <div className="text-2xl font-bold">{dashboardData.systemHealth.digitalTwinSync}%</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Model Accuracy</div>
            <div className="text-2xl font-bold">{dashboardData.systemHealth.modelAccuracy}%</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Data Freshness</div>
            <div className="text-2xl font-bold">{dashboardData.systemHealth.dataFreshness}%</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4"
      >
        <button
          onClick={createNewScenario}
          className="bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-[#00F5C4] rounded-xl p-6 text-center transition group"
        >
          <Plus className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-[#00F5C4] transition" />
          <div className="font-semibold text-slate-300 group-hover:text-[#00F5C4]">Create Scenario</div>
          <div className="text-sm text-slate-500">Design custom disruption</div>
        </button>

        <button
          onClick={() => dashboardData.activeScenarios.length > 0 && runSimulation(dashboardData.activeScenarios[0])}
          disabled={dashboardData.activeScenarios.length === 0}
          className="bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-green-400 rounded-xl p-6 text-center transition group disabled:opacity-50"
        >
          <Play className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-green-400 transition" />
          <div className="font-semibold text-slate-300 group-hover:text-green-400">Run Simulation</div>
          <div className="text-sm text-slate-500">Execute prediction engine</div>
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className="bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-purple-400 rounded-xl p-6 text-center transition group"
        >
          <GitCompare className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-purple-400 transition" />
          <div className="font-semibold text-slate-300 group-hover:text-purple-400">Compare Scenarios</div>
          <div className="text-sm text-slate-500">Side-by-side analysis</div>
        </button>

        <button
          onClick={() => setActiveTab('scenarios')}
          className="bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-orange-400 rounded-xl p-6 text-center transition group"
        >
          <Calendar className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-orange-400 transition" />
          <div className="font-semibold text-slate-300 group-hover:text-orange-400">View History</div>
          <div className="text-sm text-slate-500">Past simulations</div>
        </button>
      </motion.div>

      {/* Active Scenarios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Activity className="w-5 h-5 text-[#00F5C4]" />
          Active Scenarios
        </h3>
        {dashboardData.activeScenarios.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No active scenarios. Create your first scenario to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {dashboardData.activeScenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="border border-slate-700/30 rounded-lg p-4 hover:border-[#00F5C4] hover:bg-slate-700/30 transition cursor-pointer"
                onClick={() => runSimulation(scenario)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      scenario.severity === 'critical' ? 'bg-red-500' :
                      scenario.severity === 'high' ? 'bg-orange-500' :
                      scenario.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <div className="font-semibold text-white">{scenario.name}</div>
                      <div className="text-sm text-slate-400">{scenario.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      scenario.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                      scenario.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      scenario.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {scenario.severity}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-6">
      {simulationResult ? (
        <>
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                  <TrendingUp className="w-6 h-6 text-[#00F5C4]" />
                  Simulation Results
                </h2>
                <p className="text-slate-400">
                  {selectedScenario?.name} - Confidence: {simulationResult.predictedConsequences.confidence}%
                </p>
              </div>
              <div className="flex gap-2">
                <button className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 px-4 py-2 rounded-lg flex items-center gap-2 transition font-semibold">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="bg-slate-700/50 hover:bg-slate-600/50 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition border border-slate-600/30">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">Financial Impact</span>
                </div>
                <div className="text-2xl font-bold text-red-400">
                  ${Math.round(simulationResult.predictedConsequences.cascadingImpacts
                    .reduce((sum, impact) => sum + impact.financialImpact.totalEstimatedCost, 0) / 1000)}K
                </div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-orange-400">Customers Affected</span>
                </div>
                <div className="text-2xl font-bold text-orange-400">
                  {simulationResult.predictedConsequences.affectedCustomers.length}
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400">Inventory at Risk</span>
                </div>
                <div className="text-2xl font-bold text-yellow-400">
                  {simulationResult.predictedConsequences.inventoryDepletion.length} SKUs
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400">Avg Delay</span>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {Math.round(simulationResult.predictedConsequences.affectedCustomers
                    .reduce((sum, c) => sum + c.estimatedDelay, 0) / 
                    Math.max(1, simulationResult.predictedConsequences.affectedCustomers.length))}h
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cascading Impacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Cascading Impacts
            </h3>
            <div className="space-y-4">
              {simulationResult.predictedConsequences.cascadingImpacts.map((impact, index) => (
                <div key={index} className="border border-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getImpactIcon(impact.category)}
                      <span className="font-semibold capitalize text-white">{impact.category} Impact</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">
                        Confidence: {impact.estimatedImpact.confidence}%
                      </span>
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-[#00F5C4] h-2 rounded-full"
                          style={{ width: `${impact.estimatedImpact.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Affected Entities</div>
                      <div className="text-sm font-medium text-white">
                        {impact.affectedEntities.length} {impact.category}s
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Impact Timeline</div>
                      <div className="text-sm font-medium text-white">
                        {impact.estimatedImpact.timeline} hours
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Financial Impact</div>
                      <div className="text-sm font-medium text-white">
                        ${Math.round(impact.financialImpact.totalEstimatedCost / 1000)}K
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Operational Impact</div>
                      <div className="text-sm font-medium text-white">
                        {Math.round(impact.operationalImpact.productionCapacity)}% capacity
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recovery Strategies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              AI-Generated Recovery Strategies
            </h3>
            <div className="space-y-4">
              {simulationResult.recoveryStrategies.map((strategy, index) => {
                const ranking = simulationResult.strategyRankings.find(r => r.strategyId === strategy.id);
                return (
                  <div key={strategy.id} className="border border-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          ranking?.rank === 1 ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900' :
                          ranking?.rank === 2 ? 'bg-blue-500 text-white' :
                          'bg-slate-600 text-slate-300'
                        }`}>
                          {ranking?.rank || index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{strategy.name}</div>
                          <div className="text-sm text-slate-400">{strategy.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          strategy.riskLevel === 'low' ? 'bg-green-500/20 text-green-400' :
                          strategy.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {strategy.riskLevel} risk
                        </span>
                        <span className="text-sm font-medium text-[#00F5C4]">
                          {Math.round(ranking?.overallScore || 0)}% score
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-slate-400 mb-1">Cost</div>
                        <div className="text-sm font-medium text-white">${Math.round(strategy.estimatedCost / 1000)}K</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 mb-1">Time</div>
                        <div className="text-sm font-medium text-white">{strategy.estimatedTime}h</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 mb-1">Effectiveness</div>
                        <div className="text-sm font-medium text-white">{Math.round(strategy.effectiveness)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 mb-1">Sustainability</div>
                        <div className="text-sm font-medium text-white">{Math.round(strategy.sustainabilityScore)}%</div>
                      </div>
                    </div>

                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-sm text-slate-300">
                        <strong className="text-[#00F5C4]">AI Reasoning:</strong> {strategy.aiReasoning.whyRecommended}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Impact Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <Clock className="w-5 h-5 text-purple-400" />
              Impact Timeline
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700"></div>
              <div className="space-y-4">
                {simulationResult.predictedConsequences.timeline.events.map((event, index) => (
                  <div key={index} className="relative pl-10">
                    <div className={`absolute left-2 w-4 h-4 rounded-full ${
                      event.severity === 'critical' ? 'bg-red-500' :
                      event.severity === 'high' ? 'bg-orange-500' :
                      event.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-white">Hour {event.time}</span>
                        <span className="text-xs text-slate-400">
                          Confidence: {event.confidence}%
                        </span>
                      </div>
                      <div className="text-sm text-slate-300">{event.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <div className="text-center py-12 text-slate-400">
          <Clock className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <p className="text-lg">No simulation results available</p>
          <p className="text-sm">Select a scenario and run a simulation to see results</p>
        </div>
      )}
    </div>
  );

  const renderScenarios = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Scenario Library</h2>
          <button
            onClick={createNewScenario}
            className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 px-4 py-2 rounded-lg flex items-center gap-2 transition font-semibold"
          >
            <Plus className="w-4 h-4" />
            New Scenario
          </button>
        </div>

        <div className="space-y-3">
          {dashboardData.activeScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="border border-slate-700/30 rounded-lg p-4 hover:border-[#00F5C4] hover:bg-slate-700/30 transition cursor-pointer"
              onClick={() => runSimulation(scenario)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    scenario.severity === 'critical' ? 'bg-red-500' :
                    scenario.severity === 'high' ? 'bg-orange-500' :
                    scenario.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <div className="font-semibold text-white">{scenario.name}</div>
                    <div className="text-sm text-slate-400">{scenario.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    scenario.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    scenario.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    scenario.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {scenario.severity}
                  </span>
                  <span className="text-xs text-slate-400">
                    {scenario.estimatedDuration}h duration
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const getImpactIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      inventory: <Package className="w-5 h-5 text-blue-500" />,
      production: <Factory className="w-5 h-5 text-purple-500" />,
      logistics: <Truck className="w-5 h-5 text-green-500" />,
      financial: <DollarSign className="w-5 h-5 text-yellow-500" />,
      customer: <Users className="w-5 h-5 text-red-500" />,
      supplier: <Shield className="w-5 h-5 text-indigo-500" />,
      warehouse: <Factory className="w-5 h-5 text-orange-500" />
    };
    return icons[category] || <AlertTriangle className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Supply Chain Time Machine</h1>
        <p className="text-slate-400">AI-powered simulation engine for predicting future consequences of supply chain decisions</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
          { id: 'scenarios' as const, label: 'Scenarios', icon: Target },
          { id: 'results' as const, label: 'Results', icon: TrendingUp },
          { id: 'comparison' as const, label: 'Comparison', icon: GitCompare }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 font-semibold'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/30'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isSimulating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700">
              <div className="animate-spin w-12 h-12 border-4 border-[#00F5C4] border-t-transparent rounded-full mx-auto mb-4"></div>
              <div className="text-lg font-semibold mb-2 text-white">Running Simulation</div>
              <div className="text-slate-400">AI is analyzing future consequences...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'scenarios' && renderScenarios()}
        {activeTab === 'results' && renderResults()}
        {activeTab === 'comparison' && (
          <div className="text-center py-12 text-slate-400">
            <GitCompare className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <p className="text-lg">Scenario Comparison</p>
            <p className="text-sm">Select multiple scenarios to compare their predicted impacts</p>
          </div>
        )}
      </div>

      {/* Scenario Creator Modal */}
      <ScenarioCreator
        isOpen={showScenarioCreator}
        onClose={() => setShowScenarioCreator(false)}
        onSave={handleScenarioSave}
      />
    </div>
  );
};

export default TimeMachineDashboard;
