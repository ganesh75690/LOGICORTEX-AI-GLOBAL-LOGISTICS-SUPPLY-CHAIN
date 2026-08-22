import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  Activity, 
  Target, 
  Shield, 
  Zap, 
  Award, 
  Database, 
  RefreshCw 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { ContinuousLearningMemory } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 9
 * Continuous Learning Memory™ - Remember every action and improvement
 */
export const GSINContinuousLearning: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [continuousLearning, setContinuousLearning] = useState<ContinuousLearningMemory | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'successful' | 'failed' | 'lessons' | 'evolution'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getContinuousLearning();
        setContinuousLearning(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!continuousLearning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Loading Learning Memory...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Learning Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-4 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Learning Velocity</span>
          </div>
          <div className="text-2xl font-bold text-white">{continuousLearning.learningVelocity}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Knowledge Retention</span>
          </div>
          <div className="text-2xl font-bold text-white">{continuousLearning.knowledgeRetention}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-slate-400">Application Rate</span>
          </div>
          <div className="text-2xl font-bold text-white">{continuousLearning.applicationRate}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-400">Total Records</span>
          </div>
          <div className="text-2xl font-bold text-white">{continuousLearning.learningRecords.length}</div>
        </div>
      </motion.div>

      {/* Memory Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4"
      >
        <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Successful</span>
          </div>
          <div className="text-2xl font-bold text-white">{continuousLearning.successfulImprovements.length}</div>
        </div>
        <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="text-sm text-slate-400">Failed</span>
          </div>
          <div className="text-2xl font-bold text-white">{continuousLearning.failedImprovements.length}</div>
        </div>
        <div className="bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-400">Lessons</span>
          </div>
          <div className="text-2xl font-bold text-white">{continuousLearning.lessonsLearned.length}</div>
        </div>
        <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Recovery Plans</span>
          </div>
          <div className="text-2xl font-bold text-white">{continuousLearning.recoveryPlans.length}</div>
        </div>
      </motion.div>

      {/* Last Updated */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-[#00F5C4] animate-spin" />
            <div>
              <h3 className="text-lg font-bold text-white">Continuous Learning Active</h3>
              <p className="text-sm text-slate-400">AI continuously learns from every action and improvement</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">Last Updated</div>
            <div className="text-lg font-bold text-white">{new Date(continuousLearning.lastUpdated).toLocaleString()}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderSuccessful = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Successful Improvements</h3>
      {continuousLearning.successfulImprovements.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Successes Yet</h3>
          <p className="text-slate-400">AI will record successful improvements for future reference.</p>
        </motion.div>
      ) : (
        continuousLearning.successfulImprovements.map((improvement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white">{improvement.improvementType}</h4>
                <p className="text-sm text-slate-400 mt-1">{improvement.technique}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Repeatability</div>
                <div className="text-lg font-bold text-green-400">{improvement.repeatability}%</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Original State</div>
                <div className="text-sm text-white">{improvement.originalState}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Improved State</div>
                <div className="text-sm text-green-400">{improvement.improvedState}</div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderFailed = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Failed Improvements</h3>
      {continuousLearning.failedImprovements.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Failures Yet</h3>
          <p className="text-slate-400">AI will record failed improvements to learn valuable lessons.</p>
        </motion.div>
      ) : (
        continuousLearning.failedImprovements.map((improvement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white">{improvement.improvementType}</h4>
                <p className="text-sm text-slate-400 mt-1">{improvement.approach}</p>
              </div>
              <div className={`px-3 py-1 rounded text-sm font-medium ${improvement.preventable ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-500/20 text-slate-400'}`}>
                {improvement.preventable ? 'Preventable' : 'Not Preventable'}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-2">Failure Reason</div>
              <p className="text-sm text-red-300">{improvement.failureReason}</p>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Lessons Learned</h3>
      {continuousLearning.lessonsLearned.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Lessons Yet</h3>
          <p className="text-slate-400">AI will extract lessons from every action and improvement.</p>
        </motion.div>
      ) : (
        continuousLearning.lessonsLearned.map((lesson, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white">{lesson.situation}</h4>
                <p className="text-sm text-slate-400 mt-1">{lesson.lesson}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Impact</div>
                <div className="text-lg font-bold text-white">{lesson.impact}/10</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-slate-400">Applicability:</div>
              <div className="flex flex-wrap gap-1">
                {lesson.applicability.map((app, aIdx) => (
                  <span key={aIdx} className="text-xs bg-slate-900/50 text-slate-300 px-2 py-1 rounded">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderEvolution = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Supplier Evolution</h3>
      {continuousLearning.supplierEvolution.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <TrendingUp className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Evolution Data Yet</h3>
          <p className="text-slate-400">AI will track supplier evolution over time.</p>
        </motion.div>
      ) : (
        continuousLearning.supplierEvolution.map((evolution, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white">{evolution.evolutionPhase}</h4>
                <p className="text-sm text-slate-400 mt-1">Next: {evolution.nextEvolutionPhase}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-2">Capabilities Gained</div>
                <div className="flex flex-wrap gap-1">
                  {evolution.capabilitiesGained.map((cap, cIdx) => (
                    <span key={cIdx} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-2">Key Milestones</div>
                <div className="flex flex-wrap gap-1">
                  {evolution.keyMilestones.map((milestone, mIdx) => (
                    <span key={mIdx} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {milestone}
                    </span>
                  ))}
                </div>
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
              <Brain className="w-8 h-8 text-[#00F5C4]" />
              Continuous Learning Memory™
            </h1>
            <p className="text-slate-400 mt-1">Remember every action and improvement</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm text-slate-300">Learning Active</span>
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
          { id: 'successful', label: 'Successful', icon: CheckCircle },
          { id: 'failed', label: 'Failed', icon: XCircle },
          { id: 'lessons', label: 'Lessons', icon: Lightbulb },
          { id: 'evolution', label: 'Evolution', icon: TrendingUp }
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
        {selectedSection === 'successful' && (
          <motion.div
            key="successful"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderSuccessful()}
          </motion.div>
        )}
        {selectedSection === 'failed' && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderFailed()}
          </motion.div>
        )}
        {selectedSection === 'lessons' && (
          <motion.div
            key="lessons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderLessons()}
          </motion.div>
        )}
        {selectedSection === 'evolution' && (
          <motion.div
            key="evolution"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderEvolution()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
