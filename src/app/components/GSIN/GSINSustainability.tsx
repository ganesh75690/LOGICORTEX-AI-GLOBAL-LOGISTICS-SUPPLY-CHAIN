import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Zap, 
  Package, 
  Truck, 
  Flame, 
  Recycle, 
  BarChart3, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUp, 
  ArrowDown, 
  Activity, 
  DollarSign, 
  Target, 
  Globe 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { SustainabilityTransformationEngine } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 12
 * Sustainability Transformation Engine™ - Generate sustainability improvements
 */
export const GSINSustainability: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [sustainabilityEngine, setSustainabilityEngine] = useState<SustainabilityTransformationEngine | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'carbon' | 'energy' | 'waste' | 'circular'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getSustainabilityEngine();
        setSustainabilityEngine(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!sustainabilityEngine) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Sustainability Engine...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overall Sustainability Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-400" />
              Overall Sustainability Score
            </h3>
            <div className="text-4xl font-bold text-white">{sustainabilityEngine.overallSustainabilityScore}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Transformation Progress</div>
            <div className="text-2xl font-bold text-green-400">{sustainabilityEngine.transformationProgress}%</div>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 mt-4">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${sustainabilityEngine.transformationProgress}%` }}
          />
        </div>
      </motion.div>

      {/* Sustainability Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#00F5C4]" />
          Sustainability Impact
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Current Impact</div>
            <div className="text-2xl font-bold text-white">{sustainabilityEngine.sustainabilityImpact.currentImpact}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Future Impact</div>
            <div className="text-2xl font-bold text-green-400">{sustainabilityEngine.sustainabilityImpact.futureImpact}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Improvement</div>
            <div className="text-2xl font-bold text-emerald-400">+{sustainabilityEngine.sustainabilityImpact.improvement}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Business Value</div>
            <div className="text-sm font-bold text-white">{sustainabilityEngine.sustainabilityImpact.businessValue}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Environmental Value</div>
            <div className="text-sm font-bold text-emerald-400">{sustainabilityEngine.sustainabilityImpact.environmentalValue}</div>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-slate-400">Carbon</span>
          </div>
          <div className="text-2xl font-bold text-white">{sustainabilityEngine.carbonReduction.reductionProgress}%</div>
          <div className="text-xs text-slate-400">reduction</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-400">Energy</span>
          </div>
          <div className="text-2xl font-bold text-white">{sustainabilityEngine.energyOptimization.reductionPercentage}%</div>
          <div className="text-xs text-slate-400">reduction</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Packaging</span>
          </div>
          <div className="text-2xl font-bold text-white">{sustainabilityEngine.packagingOptimization.materialReduction}%</div>
          <div className="text-xs text-slate-400">reduction</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Recycle className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Waste</span>
          </div>
          <div className="text-2xl font-bold text-white">{sustainabilityEngine.wasteReduction.reductionProgress}%</div>
          <div className="text-xs text-slate-400">reduction</div>
        </div>
      </motion.div>
    </div>
  );

  const renderCarbon = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Carbon Reduction</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Current Emissions</div>
            <div className="text-2xl font-bold text-white">{sustainabilityEngine.carbonReduction.currentEmissions}t</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Target Emissions</div>
            <div className="text-2xl font-bold text-green-400">{sustainabilityEngine.carbonReduction.targetEmissions}t</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Progress</div>
            <div className="text-2xl font-bold text-emerald-400">{sustainabilityEngine.carbonReduction.reductionProgress}%</div>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full"
            style={{ width: `${sustainabilityEngine.carbonReduction.reductionProgress}%` }}
          />
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-2">Reduction Strategies</div>
          <div className="flex flex-wrap gap-2">
            {sustainabilityEngine.carbonReduction.reductionStrategies.map((strategy, idx) => (
              <span key={idx} className="text-xs bg-slate-900/50 text-slate-300 px-2 py-1 rounded">
                {strategy}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderEnergy = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Energy Optimization</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Current Consumption</div>
            <div className="text-2xl font-bold text-white">{sustainabilityEngine.energyOptimization.currentConsumption}kWh</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Optimized Consumption</div>
            <div className="text-2xl font-bold text-green-400">{sustainabilityEngine.energyOptimization.optimizedConsumption}kWh</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Cost Savings</div>
            <div className="text-2xl font-bold text-green-400">${sustainabilityEngine.energyOptimization.costSavings.toLocaleString()}</div>
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-2">Optimization Areas</div>
          <div className="flex flex-wrap gap-2">
            {sustainabilityEngine.energyOptimization.optimizationAreas.map((area, idx) => (
              <span key={idx} className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                {area}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderWaste = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Waste Reduction</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Current Waste</div>
            <div className="text-2xl font-bold text-white">{sustainabilityEngine.wasteReduction.currentWaste}t</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Target Waste</div>
            <div className="text-2xl font-bold text-green-400">{sustainabilityEngine.wasteReduction.targetWaste}t</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Progress</div>
            <div className="text-2xl font-bold text-emerald-400">{sustainabilityEngine.wasteReduction.reductionProgress}%</div>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
            style={{ width: `${sustainabilityEngine.wasteReduction.reductionProgress}%` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-2">Reduction Strategies</div>
            <div className="flex flex-wrap gap-2">
              {sustainabilityEngine.wasteReduction.reductionStrategies.map((strategy, idx) => (
                <span key={idx} className="text-xs bg-slate-900/50 text-slate-300 px-2 py-1 rounded">
                  {strategy}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-2">Circular Economy Projects</div>
            <div className="flex flex-wrap gap-2">
              {sustainabilityEngine.wasteReduction.circularEconomyProjects.map((project, idx) => (
                <span key={idx} className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
                  {project}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderCircular = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Circular Economy Suggestions</h3>
      {sustainabilityEngine.circularEconomySuggestions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Recycle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Suggestions Yet</h3>
          <p className="text-slate-400">AI will generate circular economy suggestions based on your operations.</p>
        </motion.div>
      ) : (
        sustainabilityEngine.circularEconomySuggestions.map((suggestion, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white">{suggestion.initiative}</h4>
                <p className="text-sm text-slate-400 mt-1">{suggestion.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Environmental Impact</div>
                <div className="text-lg font-bold text-emerald-400">{suggestion.environmentalImpact}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Investment</div>
                <div className="text-sm font-bold text-white">${suggestion.investment.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Expected ROI</div>
                <div className="text-sm font-bold text-green-400">{suggestion.expectedROI}%</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Complexity</div>
                <div className="text-sm font-bold text-white">{suggestion.implementationComplexity}/10</div>
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
              <Leaf className="w-8 h-8 text-[#00F5C4]" />
              Sustainability Transformation Engine™
            </h1>
            <p className="text-slate-400 mt-1">Generate sustainability improvements and environmental value</p>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-slate-300">Environmental Focus</span>
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
          { id: 'carbon', label: 'Carbon', icon: Flame },
          { id: 'energy', label: 'Energy', icon: Zap },
          { id: 'waste', label: 'Waste', icon: Recycle },
          { id: 'circular', label: 'Circular', icon: Recycle }
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
        {selectedSection === 'carbon' && (
          <motion.div
            key="carbon"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderCarbon()}
          </motion.div>
        )}
        {selectedSection === 'energy' && (
          <motion.div
            key="energy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderEnergy()}
          </motion.div>
        )}
        {selectedSection === 'waste' && (
          <motion.div
            key="waste"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderWaste()}
          </motion.div>
        )}
        {selectedSection === 'circular' && (
          <motion.div
            key="circular"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderCircular()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
