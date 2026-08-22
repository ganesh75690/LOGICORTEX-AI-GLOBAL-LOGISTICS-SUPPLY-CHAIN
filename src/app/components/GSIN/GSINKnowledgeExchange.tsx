import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Network, 
  Share2, 
  Award, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Zap, 
  Brain, 
  BarChart3, 
  Activity, 
  Filter, 
  Search, 
  Lightbulb,
  Package as PackageIcon
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { GlobalKnowledgeExchange } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 4
 * Global Knowledge Exchange™ - Flagship innovation for collective industrial learning
 */
export const GSINKnowledgeExchange: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [knowledgeExchange, setKnowledgeExchange] = useState<GlobalKnowledgeExchange | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'patterns' | 'collective' | 'contributions'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getKnowledgeExchange();
        setKnowledgeExchange(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!knowledgeExchange) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Connecting to Global Knowledge Exchange...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Collective Learning Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Network className="w-5 h-5 text-blue-400" />
          Collective Industrial Learning
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Total Patterns</div>
            <div className="text-2xl font-bold text-white">{knowledgeExchange.collectiveLearning.totalPatterns}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Validated Patterns</div>
            <div className="text-2xl font-bold text-green-400">{knowledgeExchange.collectiveLearning.validatedPatterns}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Learning Velocity</div>
            <div className="text-2xl font-bold text-blue-400">{knowledgeExchange.collectiveLearning.learningVelocity}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Adoption Rate</div>
            <div className="text-2xl font-bold text-purple-400">{knowledgeExchange.collectiveLearning.adoptionRate}%</div>
          </div>
        </div>
      </motion.div>

      {/* Industry Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#00F5C4]" />
          Industry Distribution
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(knowledgeExchange.collectiveLearning.industryDistribution).map(([industry, count], idx) => (
            <div key={industry} className="text-center">
              <div className="text-2xl font-bold text-white">{count}</div>
              <div className="text-xs text-slate-400">{industry}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-white">Anonymous</span>
          </div>
          <p className="text-xs text-slate-400">No confidential business information is ever shared</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-white">Validated</span>
          </div>
          <p className="text-xs text-slate-400">All patterns are validated before being recommended</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-white">Proven</span>
          </div>
          <p className="text-xs text-slate-400">Only proven successful patterns are shared</p>
        </div>
      </motion.div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4"
      >
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-green-400" />
          <div>
            <h4 className="text-sm font-bold text-white">Privacy Protected</h4>
            <p className="text-xs text-slate-300">Your confidential business information is never exposed. Only validated improvement patterns are anonymously shared.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderPatterns = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Knowledge Pattern Categories</h3>
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: 'Improvement Patterns', count: knowledgeExchange.improvementPatterns.length, icon: TrendingUp, color: 'green' },
          { name: 'Operational Strategies', count: knowledgeExchange.operationalStrategies.length, icon: Brain, color: 'blue' },
          { name: 'Quality Improvements', count: knowledgeExchange.qualityImprovements.length, icon: Award, color: 'purple' },
          { name: 'Production Optimizations', count: knowledgeExchange.productionOptimizations.length, icon: Activity, color: 'yellow' },
          { name: 'Waste Reductions', count: knowledgeExchange.wasteReductions.length, icon: Zap, color: 'orange' },
          { name: 'Energy Savings', count: knowledgeExchange.energySavings.length, icon: Lightbulb, color: 'cyan' },
          { name: 'Recovery Strategies', count: knowledgeExchange.recoveryStrategies.length, icon: Shield, color: 'red' },
          { name: 'Packaging Improvements', count: knowledgeExchange.packagingImprovements.length, icon: PackageIcon, color: 'pink' }
        ].map((category, idx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4 cursor-pointer hover:border-slate-600 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <category.icon className={`w-5 h-5 text-${category.color}-400`} />
              <span className="text-sm font-medium text-white">{category.name}</span>
            </div>
            <div className="text-2xl font-bold text-white">{category.count}</div>
            <div className="text-xs text-slate-400">patterns</div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderCollective = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Network className="w-5 h-5 text-blue-400" />
          Global Intelligence Metrics
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Overall Intelligence Score</div>
            <div className="text-2xl font-bold text-[#00F5C4]">{knowledgeExchange.collectiveLearning.overallIntelligenceScore}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Global Learning Velocity</div>
            <div className="text-2xl font-bold text-blue-400">{knowledgeExchange.collectiveLearning.globalLearningVelocity}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Innovation Rate</div>
            <div className="text-2xl font-bold text-purple-400">{knowledgeExchange.collectiveLearning.innovationRate}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Collaboration Index</div>
            <div className="text-2xl font-bold text-green-400">{knowledgeExchange.collectiveLearning.collaborationIndex}%</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-purple-400" />
          How It Works
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">1</div>
            <div>
              <div className="text-sm font-medium text-white">Anonymous Extraction</div>
              <div className="text-xs text-slate-400">AI anonymously extracts improvement patterns from your operations</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">2</div>
            <div>
              <div className="text-sm font-medium text-white">Validation</div>
              <div className="text-xs text-slate-400">Patterns are validated for effectiveness and repeatability</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">3</div>
            <div>
              <div className="text-sm font-medium text-white">Global Sharing</div>
              <div className="text-xs text-slate-400">Validated patterns are anonymously shared with similar suppliers worldwide</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">4</div>
            <div>
              <div className="text-sm font-medium text-white">Collective Learning</div>
              <div className="text-xs text-slate-400">Everyone benefits from collective industrial intelligence</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderContributions = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Your Contribution History</h3>
      {knowledgeExchange.contributionHistory.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Share2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Contributions Yet</h3>
          <p className="text-slate-400">Start contributing to the global knowledge exchange to help other suppliers improve.</p>
        </motion.div>
      ) : (
        knowledgeExchange.contributionHistory.map((contribution, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white">Pattern #{contribution.patternId}</div>
                <div className="text-xs text-slate-400">Contributed: {new Date(contribution.contributionDate).toLocaleDateString()}</div>
              </div>
              <div className="text-right">
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  contribution.validationStatus === 'Validated' ? 'bg-green-500/20 text-green-400' :
                  contribution.validationStatus === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {contribution.validationStatus}
                </div>
                <div className="text-xs text-slate-400 mt-1">Impact: {contribution.impact}</div>
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
              <Globe className="w-8 h-8 text-[#00F5C4]" />
              Global Knowledge Exchange™
            </h1>
            <p className="text-slate-400 mt-1">Flagship innovation for collective industrial learning</p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-300">Privacy Protected</span>
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
          { id: 'patterns', label: 'Patterns', icon: Network },
          { id: 'collective', label: 'Collective', icon: Share2 },
          { id: 'contributions', label: 'Contributions', icon: Award }
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
        {selectedSection === 'patterns' && (
          <motion.div
            key="patterns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderPatterns()}
          </motion.div>
        )}
        {selectedSection === 'collective' && (
          <motion.div
            key="collective"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderCollective()}
          </motion.div>
        )}
        {selectedSection === 'contributions' && (
          <motion.div
            key="contributions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderContributions()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
