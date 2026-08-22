import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RefreshCw, 
  TrendingUp, 
  DollarSign, 
  Factory, 
  Zap, 
  Shield, 
  BarChart3, 
  Activity, 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUp, 
  ArrowDown,
  Plus,
  Building2,
  Leaf,
  Users,
  Truck
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { FutureEvolutionSimulator } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 6
 * Future Evolution Simulator™ - Simulate future improvements
 */
export const GSINFutureSimulator: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [futureSimulator, setFutureSimulator] = useState<FutureEvolutionSimulator | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'scenarios' | 'historical'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getFutureSimulator();
        setFutureSimulator(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!futureSimulator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Future Simulator...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Accuracy Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          Prediction Accuracy
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-bold text-white">{futureSimulator.accuracyMetrics.predictionAccuracy}%</div>
            <div className="text-sm text-slate-400 mt-1">Model Accuracy</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">Last Updated</div>
            <div className="text-lg font-bold text-white">{new Date(futureSimulator.accuracyMetrics.lastUpdate).toLocaleDateString()}</div>
          </div>
        </div>
      </motion.div>

      {/* Available Scenarios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-[#00F5C4]" />
          Available Simulation Scenarios
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: 'Factory Expansion', icon: Factory, color: 'blue' },
            { name: 'Automation', icon: Zap, color: 'yellow' },
            { name: 'New Machines', icon: Activity, color: 'purple' },
            { name: 'More Employees', icon: Users, color: 'green' },
            { name: 'Additional Warehouse', icon: Building2, color: 'orange' },
            { name: 'Production Increase', icon: TrendingUp, color: 'cyan' },
            { name: 'Alternative Logistics', icon: Truck, color: 'pink' },
            { name: 'Custom Scenario', icon: Plus, color: 'gray' }
          ].map((scenario, idx) => (
            <motion.button
              key={scenario.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-900/50 border border-slate-700/30 rounded-xl p-4 hover:border-slate-600 transition-all cursor-pointer"
            >
              <scenario.icon className={`w-6 h-6 text-${scenario.color}-400 mx-auto mb-2`} />
              <div className="text-sm font-medium text-white text-center">{scenario.name}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Simulation Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-white">Future Profit</span>
          </div>
          <p className="text-xs text-slate-400">Predict future profitability based on simulation parameters</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Factory className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-white">Future Capacity</span>
          </div>
          <p className="text-xs text-slate-400">Simulate capacity changes and utilization rates</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-white">Sustainability</span>
          </div>
          <p className="text-xs text-slate-400">Predict environmental impact improvements</p>
        </div>
      </motion.div>
    </div>
  );

  const renderScenarios = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Simulation Scenarios</h3>
      {futureSimulator.scenarios.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Play className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Scenarios Yet</h3>
          <p className="text-slate-400">Create simulation scenarios to predict future outcomes of strategic decisions.</p>
        </motion.div>
      ) : (
        futureSimulator.scenarios.map((scenario, idx) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                    {scenario.type}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-bold">{scenario.confidence}%</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white">{scenario.name}</h4>
                <p className="text-sm text-slate-400 mt-1">{scenario.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Investment</div>
                <div className="text-sm font-bold text-white">${scenario.parameters.investment.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Timeframe</div>
                <div className="text-sm font-bold text-white">{scenario.parameters.timeframe}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Risk Level</div>
                <div className={`text-sm font-bold ${scenario.riskAssessment.overallRisk === 'Low' ? 'text-green-400' : scenario.riskAssessment.overallRisk === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                  {scenario.riskAssessment.overallRisk}
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderHistorical = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Historical Simulations</h3>
      {futureSimulator.historicalSimulations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <RefreshCw className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Historical Data</h3>
          <p className="text-slate-400">Run simulations to build historical data for accuracy tracking.</p>
        </motion.div>
      ) : (
        futureSimulator.historicalSimulations.map((simulation, idx) => (
          <motion.div
            key={simulation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">{simulation.name}</h4>
                <div className="text-sm text-slate-400">{simulation.type}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Confidence</div>
                <div className="text-lg font-bold text-white">{simulation.confidence}%</div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
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
              <Activity className="w-8 h-8 text-[#00F5C4]" />
              Future Evolution Simulator™
            </h1>
            <p className="text-slate-400 mt-1">Simulate future improvements and predict outcomes</p>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">AI-Powered Predictions</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6"
      >
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'scenarios', label: 'Scenarios', icon: Play },
          { id: 'historical', label: 'Historical', icon: RefreshCw }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSection(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedSection === tab.id
                ? 'bg-[#00F5C4] text-slate-900 font-medium'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedSection === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderOverview()}
          </motion.div>
        )}
        {selectedSection === 'scenarios' && (
          <motion.div
            key="scenarios"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderScenarios()}
          </motion.div>
        )}
        {selectedSection === 'historical' && (
          <motion.div
            key="historical"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderHistorical()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
