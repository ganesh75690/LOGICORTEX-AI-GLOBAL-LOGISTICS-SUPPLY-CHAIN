import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  Zap, 
  Factory, 
  Package, 
  Leaf, 
  Cpu, 
  Shield, 
  Truck, 
  BarChart3, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  Clock, 
  Target, 
  Flame, 
  Brain,
  Globe,
  BookOpen
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { SupplierInnovationLab } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 8
 * Supplier Innovation Lab™ - AI continuously discovers innovations
 */
export const GSINInnovationLab: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [innovationLab, setInnovationLab] = useState<SupplierInnovationLab | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'discoveries' | 'roadmap' | 'innovations'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getInnovationLab();
        setInnovationLab(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!innovationLab) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Lightbulb className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Innovation Lab...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Innovation Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Innovation Score
            </h3>
            <div className="text-4xl font-bold text-white">{innovationLab.innovationScore}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Implementation Rate</div>
            <div className="text-2xl font-bold text-green-400">{innovationLab.implementationRate}%</div>
          </div>
        </div>
      </motion.div>

      {/* Innovation Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Factory className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Manufacturing</span>
          </div>
          <div className="text-2xl font-bold text-white">{innovationLab.manufacturingInnovations.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Packaging</span>
          </div>
          <div className="text-2xl font-bold text-white">{innovationLab.packagingInnovations.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="text-sm text-slate-400">Energy</span>
          </div>
          <div className="text-2xl font-bold text-white">{innovationLab.energyOptimizations.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-slate-400">Automation</span>
          </div>
          <div className="text-2xl font-bold text-white">{innovationLab.automationOpportunities.length}</div>
        </div>
      </motion.div>

      {/* Discovery Sources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          Innovation Discovery Sources
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: 'Internal', icon: Factory, color: 'blue' },
            { name: 'Global Knowledge Exchange', icon: Globe, color: 'green' },
            { name: 'AI Generated', icon: Cpu, color: 'purple' },
            { name: 'Industry Research', icon: BookOpen, color: 'yellow' }
          ].map((source, idx) => (
            <div key={source.name} className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-3">
              <source.icon className={`w-5 h-5 text-${source.color}-400`} />
              <span className="text-sm text-white">{source.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderDiscoveries = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Innovation Discoveries</h3>
      {innovationLab.discoveries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Lightbulb className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Discoveries Yet</h3>
          <p className="text-slate-400">AI will continuously discover innovations from multiple sources.</p>
        </motion.div>
      ) : (
        innovationLab.discoveries.map((discovery, idx) => (
          <motion.div
            key={discovery.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400">
                    {discovery.innovationType}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    discovery.status === 'Implemented' ? 'bg-green-500/20 text-green-400' :
                    discovery.status === 'In Development' ? 'bg-blue-500/20 text-blue-400' :
                    discovery.status === 'Validated' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {discovery.status}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">{discovery.title}</h4>
                <p className="text-sm text-slate-400 mt-1">{discovery.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">{discovery.confidence}%</div>
                <div className="text-xs text-slate-400">Confidence</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Business Value</div>
                <div className="text-sm font-bold text-white">{discovery.businessValue}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Expected ROI</div>
                <div className="text-sm font-bold text-green-400">{discovery.expectedROI}%</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Investment</div>
                <div className="text-sm font-bold text-white">${discovery.investmentRequired.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Difficulty</div>
                <div className="text-sm font-bold text-white">{discovery.implementationComplexity}/10</div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderRoadmap = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Innovation Roadmap</h3>
      {!innovationLab.innovationRoadmap || Object.keys(innovationLab.innovationRoadmap).length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Roadmap Yet</h3>
          <p className="text-slate-400">AI will generate an innovation roadmap based on discovered opportunities.</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-slate-400 mb-1">Current Phase</div>
              <div className="text-2xl font-bold text-white">{innovationLab.innovationRoadmap.currentPhase}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400 mb-1">Timeline</div>
              <div className="text-2xl font-bold text-white">{innovationLab.innovationRoadmap.timeline}</div>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full"
              style={{ width: '45%' }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderInnovations = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Innovation Categories</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Factory className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-white">Manufacturing Methods</span>
          </div>
          <div className="text-2xl font-bold text-white">{innovationLab.manufacturingInnovations.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-white">Packaging Improvements</span>
          </div>
          <div className="text-2xl font-bold text-white">{innovationLab.packagingInnovations.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-white">Energy Optimizations</span>
          </div>
          <div className="text-2xl font-bold text-white">{innovationLab.energyOptimizations.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-white">Automation Opportunities</span>
          </div>
          <div className="text-2xl font-bold text-white">{innovationLab.automationOpportunities.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium text-white">Quality Improvements</span>
          </div>
          <div className="text-2xl font-bold text-white">{innovationLab.qualityInnovations.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Truck className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium text-white">Supply Chain Innovations</span>
          </div>
          <div className="text-2xl font-bold text-white">{innovationLab.supplyChainInnovations.length}</div>
        </div>
      </div>
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
              <Lightbulb className="w-8 h-8 text-[#00F5C4]" />
              Supplier Innovation Lab™
            </h1>
            <p className="text-slate-400 mt-1">AI continuously discovers innovations</p>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-300">AI-Powered Discovery</span>
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
          { id: 'discoveries', label: 'Discoveries', icon: Lightbulb },
          { id: 'roadmap', label: 'Roadmap', icon: Target },
          { id: 'innovations', label: 'Innovations', icon: Flame }
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
        {selectedSection === 'discoveries' && (
          <motion.div
            key="discoveries"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderDiscoveries()}
          </motion.div>
        )}
        {selectedSection === 'roadmap' && (
          <motion.div
            key="roadmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderRoadmap()}
          </motion.div>
        )}
        {selectedSection === 'innovations' && (
          <motion.div
            key="innovations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderInnovations()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
