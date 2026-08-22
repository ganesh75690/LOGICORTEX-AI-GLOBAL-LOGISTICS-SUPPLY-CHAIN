import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Network, 
  Share2, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Target, 
  Filter, 
  Search, 
  Brain, 
  Zap, 
  Users, 
  Building2, 
  Star, 
  ArrowUp, 
  ArrowDown, 
  Shield, 
  Leaf, 
  Database 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { GlobalIndustrialIntelligenceMap } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 14
 * Global Industrial Intelligence Map™ - Interactive intelligence visualization
 */
export const GSINIntelligenceMap: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [intelligenceMap, setIntelligenceMap] = useState<GlobalIndustrialIntelligenceMap | null>(null);
  const [selectedView, setSelectedView] = useState<'network' | 'flow' | 'evolution' | 'learning' | 'growth'>('network');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getIntelligenceMap();
        setIntelligenceMap(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!intelligenceMap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Loading Intelligence Map...</div>
        </div>
      </div>
    );
  }

  const renderNetwork = () => (
    <div className="space-y-6">
      {/* Global Intelligence Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-4 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-slate-400">Overall Intelligence</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.overallIntelligenceScore}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Learning Velocity</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.globalLearningVelocity}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-400">Innovation Rate</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.innovationRate}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Share2 className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Collaboration Index</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.collaborationIndex}%</div>
        </div>
      </motion.div>

      {/* Intelligence Nodes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Network className="w-5 h-5 text-[#00F5C4]" />
          Intelligence Network
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Knowledge Flows</div>
            <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.knowledgeFlows.length}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Innovation Adoptions</div>
            <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.innovationAdoptions.length}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-sm text-slate-400 mb-1">Anonymous Recommendations</div>
            <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.anonymousRecommendations.length}</div>
          </div>
        </div>
      </motion.div>

      {/* Node Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-5 gap-4"
      >
        <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Suppliers</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.supplierGrowth.length}</div>
        </div>
        <div className="bg-purple-500/10 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-slate-400">Knowledge</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.nodes.filter((n: any) => n.type === 'Knowledge').length}</div>
        </div>
        <div className="bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-400">Innovations</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.nodes.filter((n: any) => n.type === 'Innovation').length}</div>
        </div>
        <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Patterns</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.nodes.filter((n: any) => n.type === 'Pattern').length}</div>
        </div>
        <div className="bg-orange-500/10 backdrop-blur-xl border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-slate-400">Insights</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceMap.mapData.nodes.filter((n: any) => n.type === 'Insight').length}</div>
        </div>
      </motion.div>
    </div>
  );

  const renderFlow = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Knowledge Flow</h3>
      {intelligenceMap.mapData.knowledgeFlows.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Share2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Knowledge Flow Data</h3>
          <p className="text-slate-400">AI will track knowledge flow between suppliers in the network.</p>
        </motion.div>
      ) : (
        intelligenceMap.mapData.knowledgeFlows.map((flow, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold flex-shrink-0">
                  {flow.source.charAt(0)}
                </div>
                <div>
                  <div className="text-sm text-slate-400">From: {flow.source}</div>
                  <div className="text-sm text-slate-400">To: {flow.destination}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Impact</div>
                <div className="text-lg font-bold text-green-400">{flow.impact}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-xs text-slate-400">Type: {flow.knowledgeType}</div>
              <div className="text-xs text-slate-400">Flow Rate: {flow.flowRate}</div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderEvolution = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Capability Evolution</h3>
      {intelligenceMap.mapData.capabilityEvolutions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <TrendingUp className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Evolution Data</h3>
          <p className="text-slate-400">AI will track capability evolution across the network.</p>
        </motion.div>
      ) : (
        intelligenceMap.mapData.capabilityEvolutions.map((evolution, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white">{evolution.capability}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-slate-400">Current: {evolution.currentLevel}%</span>
                  <ArrowUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Evolution Rate: {evolution.evolutionRate}%</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Industry Benchmark</div>
                <div className="text-lg font-bold text-white">{evolution.industryBenchmark}%</div>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                style={{ width: `${evolution.currentLevel}%` }}
              />
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderLearning = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Learning Progress</h3>
      {intelligenceMap.mapData.learningProgress.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Learning Data</h3>
          <p className="text-slate-400">AI will track learning progress across the network.</p>
        </motion.div>
      ) : (
        intelligenceMap.mapData.learningProgress.map((progress, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white">{progress.learningArea}</h4>
                <div className="text-sm text-slate-400 mt-1">{progress.industry}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#00F5C4]">{progress.progress}%</div>
                <div className="text-xs text-slate-400">Progress</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-slate-400">Velocity: {progress.velocity}%</div>
              <div className="text-xs text-slate-400">Leaders: {progress.leaders.length}</div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderGrowth = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Supplier Growth</h3>
      {intelligenceMap.mapData.supplierGrowth.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Growth Data</h3>
          <p className="text-slate-400">AI will track supplier growth across the network.</p>
        </motion.div>
      ) : (
        intelligenceMap.mapData.supplierGrowth.map((growth, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white">{growth.supplierId}</h4>
                <div className="text-sm text-slate-400 mt-1">Stage: {growth.growthStage}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">+{growth.growthRate}%</div>
                <div className="text-xs text-slate-400">Growth Rate</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {growth.capabilities.map((cap, cIdx) => (
                <span key={cIdx} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                  {cap}
                </span>
              ))}
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
              <Globe className="w-8 h-8 text-[#00F5C4]" />
              Global Industrial Intelligence Map™
            </h1>
            <p className="text-slate-400 mt-1">Interactive intelligence visualization and knowledge flow</p>
          </div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">Real-time Intelligence</span>
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
          { id: 'network', label: 'Network', icon: Network },
          { id: 'flow', label: 'Knowledge Flow', icon: Share2 },
          { id: 'evolution', label: 'Evolution', icon: TrendingUp },
          { id: 'learning', label: 'Learning', icon: Brain },
          { id: 'growth', label: 'Growth', icon: Users }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedView(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedView === tab.id
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
        {selectedView === 'network' && (
          <motion.div
            key="network"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderNetwork()}
          </motion.div>
        )}
        {selectedView === 'flow' && (
          <motion.div
            key="flow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderFlow()}
          </motion.div>
        )}
        {selectedView === 'evolution' && (
          <motion.div
            key="evolution"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderEvolution()}
          </motion.div>
        )}
        {selectedView === 'learning' && (
          <motion.div
            key="learning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderLearning()}
          </motion.div>
        )}
        {selectedView === 'growth' && (
          <motion.div
            key="growth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderGrowth()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
