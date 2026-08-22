import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Globe, 
  TrendingUp, 
  Target, 
  Award, 
  Star, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Filter, 
  Search, 
  Shield, 
  Activity, 
  Zap, 
  LineChart 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { GlobalBenchmarkEngine } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 11
 * Global Benchmark Engine™ - Industry benchmark comparison
 */
export const GSINBenchmark: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [benchmark, setBenchmark] = useState<GlobalBenchmarkEngine | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'gap' | 'actions'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getBenchmark();
        setBenchmark(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!benchmark) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Analyzing Industry Benchmarks...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Industry Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Industry Benchmark</h3>
              <p className="text-sm text-slate-400">{benchmark.industryBenchmarks.industry}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">Sample Size</div>
            <div className="text-2xl font-bold text-white">{benchmark.industryBenchmarks.sampleSize}</div>
          </div>
        </div>
      </motion.div>

      {/* Current Position */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#00F5C4]" />
          Current Position
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Overall Score</div>
            <div className="text-3xl font-bold text-white">{benchmark.currentPosition.overall}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Percentile Rank</div>
            <div className="text-3xl font-bold text-green-400">{benchmark.currentPosition.percentileRank}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Competitive Tier</div>
            <div className="text-3xl font-bold text-purple-400">{benchmark.competitivePosition.tier}</div>
          </div>
        </div>
      </motion.div>

      {/* Competitive Position */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
          <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Advantages
          </h4>
          <ul className="space-y-2">
            {benchmark.competitivePosition.advantages.map((advantage, idx) => (
              <li key={idx} className="text-sm text-green-300 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {advantage}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-orange-500/10 backdrop-blur-xl border border-orange-500/30 rounded-xl p-4">
          <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Areas for Improvement
          </h4>
          <ul className="space-y-2">
            {benchmark.competitivePosition.disadvantages.map((disadvantage, idx) => (
              <li key={idx} className="text-sm text-orange-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {disadvantage}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Potential Business Growth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Potential Business Growth
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">If Top 10%</div>
            <div className="text-2xl font-bold text-green-400">+{benchmark.potentialBusinessGrowth.ifTop10Percent}%</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">If Top 25%</div>
            <div className="text-2xl font-bold text-blue-400">+{benchmark.potentialBusinessGrowth.ifTop25Percent}%</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">If Median</div>
            <div className="text-2xl font-bold text-yellow-400">+{benchmark.potentialBusinessGrowth.ifMedian}%</div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderImprovementGap = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Improvement Gap Analysis</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Overall Gap</div>
            <div className="text-3xl font-bold text-orange-400">{benchmark.improvementGap.overall}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Quick Wins</div>
            <div className="text-3xl font-bold text-green-400">{benchmark.improvementGap.quickWins.length}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Long-term Goals</div>
            <div className="text-3xl font-bold text-blue-400">{benchmark.improvementGap.longTermGoals.length}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-2">Priority Areas</div>
            <div className="space-y-2">
              {benchmark.improvementGap.priorityAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-red-300">
                  <AlertTriangle className="w-4 h-4" />
                  {area}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-2">Quick Wins</div>
            <div className="space-y-2">
              {benchmark.improvementGap.quickWins.map((win, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  {win}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderRecommendedActions = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Recommended Improvement Actions</h3>
      {benchmark.recommendedActions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Actions Yet</h3>
          <p className="text-slate-400">AI will recommend improvement actions based on benchmark analysis.</p>
        </motion.div>
      ) : (
        benchmark.recommendedActions.map((action, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                    {action.metric}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    action.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    action.difficulty === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {action.difficulty}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white capitalize">{action.metric}</h4>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Expected Improvement</div>
                <div className="text-2xl font-bold text-green-400">+{action.expectedImprovement}%</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-2">Actions</div>
                <div className="space-y-1">
                  {action.actions.map((act, aIdx) => (
                    <div key={aIdx} className="text-sm text-slate-300 flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-[#00F5C4] mt-0.5 flex-shrink-0" />
                      {act}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Timeline</div>
                <div className="text-lg font-bold text-white">{action.timeline}</div>
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
              <BarChart3 className="w-8 h-8 text-[#00F5C4]" />
              Global Benchmark Engine™
            </h1>
            <p className="text-slate-400 mt-1">Industry benchmark comparison and improvement analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">{benchmark.industryBenchmarks.industry}</span>
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
          { id: 'gap', label: 'Improvement Gap', icon: Target },
          { id: 'actions', label: 'Recommended Actions', icon: Zap }
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
        {selectedSection === 'gap' && (
          <motion.div
            key="gap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderImprovementGap()}
          </motion.div>
        )}
        {selectedSection === 'actions' && (
          <motion.div
            key="actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderRecommendedActions()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
