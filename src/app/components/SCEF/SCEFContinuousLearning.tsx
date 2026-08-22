import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Brain, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  BookOpen, 
  Sparkles, 
  Target, 
  Award, 
  BarChart3, 
  Calendar, 
  RefreshCw, 
  Filter, 
  Search, 
  Star, 
  AlertTriangle, 
  Info, 
  ArrowUp, 
  ArrowDown, 
  Activity, 
  Zap, 
  Shield, 
  Users, 
  Book, 
  GraduationCap, 
  Lightbulb, 
  Flame,
  History
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { ContinuousLearningMemory, SupplierLearning } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 9
 * Continuous Learning Memory™ - Organizational learning from actions
 */
export const SCEFContinuousLearning: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [learningMemory, setLearningMemory] = useState<ContinuousLearningMemory | null>(null);
  const [selectedLearning, setSelectedLearning] = useState<SupplierLearning | null>(null);
  const [filterOutcome, setFilterOutcome] = useState<string>('all');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getLearningMemory();
        setLearningMemory(data);
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  if (!learningMemory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Database className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Loading Learning Memory...</div>
        </div>
      </div>
    );
  }

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'success': return CheckCircle;
      case 'failure': return XCircle;
      case 'partial': return AlertTriangle;
      default: return Info;
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'success': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'failure': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'partial': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const renderLearningCard = (learning: SupplierLearning) => (
    <motion.div
      key={learning.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedLearning(learning)}
      className={`bg-slate-800/50 backdrop-blur-xl border-2 rounded-xl p-4 cursor-pointer transition-all ${
        selectedLearning?.id === learning.id 
          ? 'border-[#00F5C4] shadow-lg shadow-[#00F5C4]/20' 
          : 'border-slate-700/30 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {React.createElement(getOutcomeIcon(learning.outcome), { 
            className: `w-5 h-5 ${learning.outcome === 'success' ? 'text-green-400' : learning.outcome === 'failure' ? 'text-red-400' : 'text-yellow-400'}` 
          })}
          <span className={`px-2 py-1 rounded text-xs font-medium border ${getOutcomeColor(learning.outcome)}`}>
            {learning.outcome}
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-[#00F5C4]">{learning.effectiveness}%</div>
          <div className="text-xs text-slate-400">Effectiveness</div>
        </div>
      </div>

      <h4 className="text-lg font-bold text-white mb-2">{learning.action}</h4>
      <p className="text-sm text-slate-300 mb-3 line-clamp-2">{learning.actionType}</p>

      <div className="flex items-center justify-between text-xs mb-3">
        <span className="text-slate-400">
          {new Date(learning.takenAt).toLocaleDateString()}
        </span>
        <span className={`font-medium ${learning.result.improvement > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {learning.result.improvement > 0 ? '+' : ''}{learning.result.improvement}%
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">Capability Growth:</span>
        <span className="text-purple-400">+{learning.capabilityEvolution.reduce((sum, gene) => sum + gene.after - gene.before, 0).toFixed(1)}%</span>
      </div>
    </motion.div>
  );

  const renderLearningDetail = () => {
    if (!selectedLearning) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {React.createElement(getOutcomeIcon(selectedLearning.outcome), { 
              className: `w-8 h-8 ${selectedLearning.outcome === 'success' ? 'text-green-400' : selectedLearning.outcome === 'failure' ? 'text-red-400' : 'text-yellow-400'}` 
            })}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-3 py-1 rounded text-sm font-medium border ${getOutcomeColor(selectedLearning.outcome)}`}>
                  {selectedLearning.outcome}
                </span>
                <span className="text-sm text-slate-400 capitalize">{selectedLearning.actionType}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{selectedLearning.action}</h3>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#00F5C4]">{selectedLearning.effectiveness}%</div>
            <div className="text-xs text-slate-400">Effectiveness</div>
          </div>
        </div>

        {/* Result Analysis */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Result Analysis</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-1">Before</div>
              <div className="text-xl font-bold text-white">{selectedLearning.result.before}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">After</div>
              <div className="text-xl font-bold text-green-400">{selectedLearning.result.after}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Improvement</div>
              <div className={`text-xl font-bold ${selectedLearning.result.improvement > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {selectedLearning.result.improvement > 0 ? '+' : ''}{selectedLearning.result.improvement}%
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            Metric: {selectedLearning.result.metric}
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-purple-400" />
            Lessons Learned
          </h4>
          <ul className="space-y-2">
            {selectedLearning.lessonsLearned.map((lesson, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                {lesson}
              </li>
            ))}
          </ul>
        </div>

        {/* Capability Evolution */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Capability Evolution</h4>
          <div className="space-y-2">
            {selectedLearning.capabilityEvolution.map((evolution, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 capitalize">{evolution.gene.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">{evolution.before} → {evolution.after}</span>
                  <span className={`text-sm font-medium ${evolution.after > evolution.before ? 'text-green-400' : 'text-red-400'}`}>
                    {evolution.after > evolution.before ? '+' : ''}{evolution.after - evolution.before}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Growth */}
        <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30 mb-4">
          <h4 className="text-sm font-semibold text-white mb-2">Performance Growth</h4>
          <div className="text-3xl font-bold text-green-400">+{selectedLearning.performanceGrowth}%</div>
        </div>

        {/* Recovery Strategy */}
        {selectedLearning.recoveryStrategy && (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
            <h4 className="text-sm font-semibold text-white mb-2">Recovery Strategy</h4>
            <p className="text-sm text-slate-300">{selectedLearning.recoveryStrategy}</p>
          </div>
        )}

        {/* Applicability */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
          <h4 className="text-sm font-semibold text-white mb-3">Applicability</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-1">Scenarios</div>
              <div className="flex flex-wrap gap-1">
                {selectedLearning.applicability.scenarios.map((scenario, idx) => (
                  <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                    {scenario}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Conditions</div>
              <div className="flex flex-wrap gap-1">
                {selectedLearning.applicability.conditions.map((condition, idx) => (
                  <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

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
              <Database className="w-8 h-8 text-[#00F5C4]" />
              Continuous Learning Memory™
            </h1>
            <p className="text-slate-400 mt-1">Organizational learning from every action</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-300">Knowledge Gain: {learningMemory.knowledgeGain}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Learning Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Total Actions</div>
          <div className="text-2xl font-bold text-white">{learningMemory.totalActionsTracked}</div>
        </div>
        <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Successful</div>
          <div className="text-2xl font-bold text-green-400">{learningMemory.successfulImprovements}</div>
        </div>
        <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Failed</div>
          <div className="text-2xl font-bold text-red-400">{learningMemory.failedImprovements}</div>
        </div>
        <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Avg Effectiveness</div>
          <div className="text-2xl font-bold text-blue-400">{learningMemory.averageEffectiveness}%</div>
        </div>
      </motion.div>

      {/* Learning Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Learning Timeline</h3>
        <div className="space-y-3">
          {learningMemory.learningTimeline.map((period, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <div className="w-24 text-sm font-medium text-white">{period.period}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">Actions: {period.actions}</span>
                  <span className="text-xs text-[#00F5C4]">Effectiveness: {period.effectiveness}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-[#00F5C4] h-2 rounded-full"
                    style={{ width: `${period.effectiveness}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Lessons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-purple-400" />
          Top Lessons Learned
        </h3>
        <div className="space-y-2">
          {learningMemory.topLessons.map((lesson, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded">
              <div className="flex-1">
                <p className="text-sm text-white mb-1">{lesson.lesson}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>Applicability: {lesson.applicability}%</span>
                  <span>Impact: {lesson.impact}%</span>
                  <span>Success Rate: {lesson.successRate}%</span>
                </div>
              </div>
              <Star className="w-4 h-4 text-yellow-400" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Capability Evolution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Capability Evolution by Gene</h3>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(learningMemory.capabilityEvolution.byGene).map(([gene, evolution]) => (
            <div key={gene} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-1 capitalize">{gene.replace('_', ' ')}</div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">{evolution.starting}</span>
                <ArrowUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white">{evolution.current}</span>
              </div>
              <div className={`text-sm font-bold ${evolution.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                +{evolution.growth}% growth
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Learning Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Learning Actions</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterOutcome}
              onChange={(e) => setFilterOutcome(e.target.value)}
              className="bg-slate-800/50 border border-slate-700/30 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="all">All Outcomes</option>
              <option value="success">Success</option>
              <option value="failure">Failure</option>
              <option value="partial">Partial</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, idx) => {
            const mockLearning: SupplierLearning = {
              id: `learning_${idx}`,
              supplierId: 'SUP-001',
              actionType: 'Process Optimization',
              action: `Process Improvement Initiative ${idx + 1}`,
              takenAt: new Date(Date.now() - (idx + 1) * 7 * 24 * 60 * 60 * 1000),
              outcome: idx % 3 === 0 ? 'success' : idx % 3 === 1 ? 'failure' : 'partial',
              result: {
                before: 70 + Math.random() * 10,
                after: 80 + Math.random() * 15,
                improvement: 10 + Math.random() * 15,
                metric: 'Efficiency'
              },
              lessonsLearned: ['Key lesson learned', 'Important insight', 'Best practice identified'],
              performanceGrowth: 10 + Math.random() * 20,
              capabilityEvolution: [
                { gene: 'quality', before: 75, after: 85 },
                { gene: 'delivery', before: 70, after: 80 }
              ],
              applicability: {
                scenarios: ['Production', 'Quality Control'],
                conditions: ['Staff training', 'Technology upgrade']
              },
              effectiveness: 70 + Math.random() * 25
            };
            return filterOutcome === 'all' || mockLearning.outcome === filterOutcome 
              ? renderLearningCard(mockLearning) 
              : null;
          }).filter(Boolean)}
        </div>
      </motion.div>

      {/* Future Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-[#00F5C4]/10 to-[#00D4A8]/10 border border-[#00F5C4]/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#00F5C4]" />
          Future Recommendations Based on Learning
        </h3>
        <div className="space-y-2">
          {learningMemory.futureRecommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded">
              <Sparkles className="w-4 h-4 text-[#00F5C4] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-300">{rec}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Selected Learning Detail */}
      {selectedLearning && renderLearningDetail()}
    </div>
  );
};
