import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RefreshCw, 
  TrendingUp, 
  DollarSign, 
  Truck, 
  Leaf, 
  Users, 
  Target, 
  Factory, 
  Zap, 
  BarChart3, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ArrowUp, 
  ArrowDown, 
  Cpu, 
  Building2, 
  Package, 
  Wrench, 
  Flame, 
  Sparkles, 
  Gauge, 
  Calculator,
  Settings,
  Save,
  History
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { SimulationResult, SimulationParameters, SimulationScenario } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 5
 * Future Capability Simulator™ - Simulate future improvements
 */
export const SCEFFutureSimulator: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>('new_machine');
  const [investment, setInvestment] = useState<number>(100000);
  const [timeline, setTimeline] = useState<number>(12);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeResult, setActiveResult] = useState<SimulationResult | null>(null);

  const scenarios: { id: SimulationScenario; name: string; icon: any; description: string }[] = [
    { id: 'new_machine', name: 'New Machine', icon: Factory, description: 'Add new production machinery' },
    { id: 'more_employees', name: 'More Employees', icon: Users, description: 'Hire additional workforce' },
    { id: 'automation', name: 'Automation', icon: Cpu, description: 'Implement automation systems' },
    { id: 'additional_warehouse', name: 'Additional Warehouse', icon: Building2, description: 'Expand storage capacity' },
    { id: 'alternative_supplier', name: 'Alternative Supplier', icon: Package, description: 'Diversify supply base' },
    { id: 'new_delivery_partner', name: 'New Delivery Partner', icon: Truck, description: 'Partner with new carrier' },
    { id: 'quality_upgrade', name: 'Quality Upgrade', icon: Shield, description: 'Upgrade quality systems' },
    { id: 'packaging_upgrade', name: 'Packaging Upgrade', icon: Package, description: 'Improve packaging efficiency' },
    { id: 'production_expansion', name: 'Production Expansion', icon: Factory, description: 'Expand production facilities' },
    { id: 'technology_upgrade', name: 'Technology Upgrade', icon: Zap, description: 'Upgrade technology stack' },
    { id: 'process_optimization', name: 'Process Optimization', icon: Wrench, description: 'Optimize business processes' },
    { id: 'sustainability_initiative', name: 'Sustainability Initiative', icon: Leaf, description: 'Launch green initiatives' }
  ];

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  const runSimulation = () => {
    if (!engineRef.current) return;

    setIsSimulating(true);
    
    setTimeout(() => {
      const parameters: SimulationParameters = {
        scenario: selectedScenario,
        investment,
        timeline,
        parameters: {}
      };

      const result = engineRef.current.runSimulation(parameters);
      setSimulationResults([result, ...simulationResults]);
      setActiveResult(result);
      setIsSimulating(false);
    }, 2000);
  };

  const renderPredictionCard = (label: string, current: number, projected: number, icon: any, unit: string = '') => (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
      <div className="flex items-center gap-2 mb-2">
        {React.createElement(icon, { className: 'w-4 h-4 text-slate-400' })}
        <span className="text-sm text-slate-400">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs text-slate-500">Current</div>
          <div className="text-lg font-bold text-white">{current}{unit}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Projected</div>
          <div className={`text-lg font-bold ${projected > current ? 'text-green-400' : 'text-red-400'}`}>
            {projected}{unit}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className={`text-sm font-medium ${projected > current ? 'text-green-400' : 'text-red-400'}`}>
          {projected > current ? '+' : ''}{((projected - current) / current * 100).toFixed(1)}%
        </div>
      </div>
    </div>
  );

  const renderSimulationResult = (result: SimulationResult) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded text-sm font-medium bg-blue-500/20 text-blue-400 capitalize">
              {result.scenario.replace('_', ' ')}
            </span>
            <span className="text-sm text-slate-400">
              Investment: ${result.parameters.investment.toLocaleString()}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">Simulation Results</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#00F5C4]">{result.confidence}%</div>
          <div className="text-xs text-slate-400">Confidence</div>
        </div>
      </div>

      {/* Predictions */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {renderPredictionCard('Capacity', result.predictions.futureCapacity.current, result.predictions.futureCapacity.projected, Factory, ' units')}
        {renderPredictionCard('Profit', result.predictions.futureProfit.current, result.predictions.futureProfit.projected, DollarSign, 'K')}
        {renderPredictionCard('Delivery', result.predictions.futureDeliveryPerformance.current, result.predictions.futureDeliveryPerformance.projected, Truck, '%')}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {renderPredictionCard('Sustainability', result.predictions.futureSustainability.current, result.predictions.futureSustainability.projected, Leaf, '%')}
        {renderPredictionCard('Customer Satisfaction', result.predictions.futureCustomerSatisfaction.current, result.predictions.futureCustomerSatisfaction.projected, Users, '%')}
        {renderPredictionCard('Business Growth', result.predictions.futureBusinessGrowth.current, result.predictions.futureBusinessGrowth.projected, TrendingUp, '%')}
      </div>

      {/* ROI */}
      <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-400 mb-1">Expected ROI</div>
            <div className="text-2xl font-bold text-green-400">{result.predictions.futureProfit.roi}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Profit Improvement</div>
            <div className="text-2xl font-bold text-white">${result.predictions.futureProfit.improvement.toLocaleString()}K</div>
          </div>
        </div>
      </div>

      {/* Risks */}
      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-6">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-400" />
          Potential Risks
        </h4>
        <div className="space-y-2">
          {result.risks.map((risk, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2 bg-slate-800/50 rounded">
              <div className="flex-1">
                <div className="text-sm text-white">{risk.type}</div>
                <div className="text-xs text-slate-400">{risk.impact}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Likelihood</div>
                <div className="text-sm font-medium text-orange-400">{risk.likelihood}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gradient-to-r from-[#00F5C4]/10 to-[#00D4A8]/10 rounded-lg p-4 border border-[#00F5C4]/30">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#00F5C4]" />
          <span className="text-sm font-semibold text-white">AI Recommendation</span>
        </div>
        <p className="text-sm text-slate-300">{result.recommendation}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Play className="w-8 h-8 text-[#00F5C4]" />
              Future Capability Simulator™
            </h1>
            <p className="text-slate-400 mt-1">Simulate future improvements and predict outcomes</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <History className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">{simulationResults.length} Simulations</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Simulation Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Simulation Parameters</h3>
        
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Scenario Selection */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Scenario</label>
            <div className="grid grid-cols-2 gap-2">
              {scenarios.map(scenario => (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedScenario === scenario.id
                      ? 'border-[#00F5C4] bg-[#00F5C4]/10'
                      : 'border-slate-700/30 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {React.createElement(scenario.icon, { 
                      className: `w-4 h-4 ${selectedScenario === scenario.id ? 'text-[#00F5C4]' : 'text-slate-400'}` 
                    })}
                    <span className="text-xs font-medium text-white">{scenario.name}</span>
                  </div>
                  <div className="text-xs text-slate-400">{scenario.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Investment */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Investment Amount</label>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="bg-transparent text-white text-2xl font-bold w-full outline-none"
                  min="10000"
                  step="10000"
                />
              </div>
              <input
                type="range"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                min="10000"
                max="1000000"
                step="10000"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>$10K</span>
                <span>$1M</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Timeline (Months)</label>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={timeline}
                  onChange={(e) => setTimeline(Number(e.target.value))}
                  className="bg-transparent text-white text-2xl font-bold w-full outline-none"
                  min="3"
                  max="60"
                />
                <span className="text-slate-400">months</span>
              </div>
              <input
                type="range"
                value={timeline}
                onChange={(e) => setTimeline(Number(e.target.value))}
                min="3"
                max="60"
                step="3"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>3 mo</span>
                <span>60 mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Run Simulation Button */}
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            isSimulating
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 hover:opacity-90'
          }`}
        >
          {isSimulating ? (
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin" />
              Running Simulation...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Run Simulation
            </div>
          )}
        </button>
      </motion.div>

      {/* Simulation Results */}
      <AnimatePresence mode="wait">
        {activeResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderSimulationResult(activeResult)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simulation History */}
      {simulationResults.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Simulation History</h3>
          <div className="space-y-2">
            {simulationResults.slice(1).map((result, idx) => (
              <div
                key={idx}
                onClick={() => setActiveResult(result)}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-lg p-4 cursor-pointer hover:border-slate-600 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-white capitalize">
                      {result.scenario.replace('_', ' ')}
                    </div>
                    <div className="text-xs text-slate-400">
                      ${result.parameters.investment.toLocaleString()} • {result.parameters.timeline} months
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-green-400">
                      ROI: {result.predictions.futureProfit.roi}%
                    </div>
                    <div className="text-sm text-[#00F5C4]">
                      {result.confidence}% confidence
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
