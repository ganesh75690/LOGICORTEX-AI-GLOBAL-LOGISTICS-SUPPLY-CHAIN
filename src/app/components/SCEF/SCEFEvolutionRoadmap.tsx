import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Target, 
  Award, 
  Rocket, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  TrendingUp, 
  BarChart3, 
  Star, 
  Sparkles, 
  Activity, 
  Zap, 
  DollarSign, 
  Users, 
  RefreshCw, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronDown,
  MapPin,
  Flag,
  Route,
  Milestone
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { SupplierEvolutionRoadmap, RoadmapMilestone } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 10
 * Supplier Evolution Roadmap™ - AI-generated evolution roadmap
 */
export const SCEFEvolutionRoadmap: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [roadmap, setRoadmap] = useState<SupplierEvolutionRoadmap | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<RoadmapMilestone | null>(null);

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getEvolutionRoadmap();
        setRoadmap(data);
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Generating Evolution Roadmap...</div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'delayed': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const renderMilestoneCard = (milestone: RoadmapMilestone) => (
    <motion.div
      key={milestone.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedMilestone(milestone)}
      className={`bg-slate-800/50 backdrop-blur-xl border-2 rounded-xl p-4 cursor-pointer transition-all ${
        selectedMilestone?.id === milestone.id 
          ? 'border-[#00F5C4] shadow-lg shadow-[#00F5C4]/20' 
          : 'border-slate-700/30 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(milestone.status)}`}>
            {milestone.status}
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-[#00F5C4]">{milestone.progress}%</div>
          <div className="text-xs text-slate-400">Progress</div>
        </div>
      </div>

      <h4 className="text-lg font-bold text-white mb-2">{milestone.name}</h4>
      <p className="text-sm text-slate-300 mb-3 line-clamp-2">{milestone.description}</p>

      <div className="flex items-center justify-between text-xs mb-3">
        <span className="text-slate-400">
          Target: {new Date(milestone.targetDate).toLocaleDateString()}
        </span>
        {milestone.completedAt && (
          <span className="text-green-400">
            Completed: {new Date(milestone.completedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${
            milestone.status === 'completed' ? 'bg-green-500' : 
            milestone.status === 'in_progress' ? 'bg-blue-500' : 
            'bg-slate-500'
          }`}
          style={{ width: `${milestone.progress}%` }}
        />
      </div>
    </motion.div>
  );

  const renderMilestoneDetail = () => {
    if (!selectedMilestone) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              selectedMilestone.status === 'completed' ? 'bg-green-500/20' :
              selectedMilestone.status === 'in_progress' ? 'bg-blue-500/20' :
              'bg-slate-500/20'
            }`}>
              {selectedMilestone.status === 'completed' ? <CheckCircle className="w-6 h-6 text-green-400" /> :
               selectedMilestone.status === 'in_progress' ? <Clock className="w-6 h-6 text-blue-400" /> :
               <Flag className="w-6 h-6 text-slate-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-3 py-1 rounded text-sm font-medium border ${getStatusColor(selectedMilestone.status)}`}>
                  {selectedMilestone.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedMilestone.name}</h3>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#00F5C4]">{selectedMilestone.progress}%</div>
            <div className="text-xs text-slate-400">Progress</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <p className="text-sm text-slate-300 leading-relaxed">{selectedMilestone.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm text-[#00F5C4]">{selectedMilestone.progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full ${
                selectedMilestone.status === 'completed' ? 'bg-green-500' : 
                selectedMilestone.status === 'in_progress' ? 'bg-blue-500' : 
                'bg-slate-500'
              }`}
              style={{ width: `${selectedMilestone.progress}%` }}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Target Date</div>
            <div className="text-lg font-bold text-white">
              {new Date(selectedMilestone.targetDate).toLocaleDateString()}
            </div>
          </div>
          {selectedMilestone.completedAt && (
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-1">Completed Date</div>
              <div className="text-lg font-bold text-green-400">
                {new Date(selectedMilestone.completedAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Required Actions</h4>
          <ul className="space-y-2">
            {selectedMilestone.actions.map((action, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-[#00F5C4] mt-0.5 flex-shrink-0" />
                {action}
              </li>
            ))}
          </ul>
        </div>

        {/* Expected Results */}
        <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Expected Results</h4>
          <ul className="space-y-2">
            {selectedMilestone.expectedResults.map((result, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                {result}
              </li>
            ))}
          </ul>
        </div>

        {/* Business Impact */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-2">Business Impact</h4>
          <p className="text-sm text-slate-300">{selectedMilestone.businessImpact}</p>
        </div>

        {/* Dependencies */}
        {selectedMilestone.dependencies.length > 0 && (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-white mb-2">Dependencies</h4>
            <div className="flex flex-wrap gap-2">
              {selectedMilestone.dependencies.map((dep, idx) => (
                <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                  {dep}
                </span>
              ))}
            </div>
          </div>
        )}
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
              <Calendar className="w-8 h-8 text-[#00F5C4]" />
              Supplier Evolution Roadmap™
            </h1>
            <p className="text-slate-400 mt-1">AI-generated strategic evolution path</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <Rocket className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-300">Target: {roadmap.futureCapability.level}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current vs Future State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
          <div className="text-sm text-slate-400 mb-2">Current State</div>
          <div className="text-2xl font-bold text-white mb-1 capitalize">{roadmap.currentState.capabilityLevel}</div>
          <div className="text-3xl font-bold text-[#00F5C4]">{roadmap.currentState.overallScore}</div>
          <div className="text-xs text-slate-400">Overall Score</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
          <div className="text-sm text-slate-400 mb-2">Future State</div>
          <div className="text-2xl font-bold text-white mb-1 capitalize">{roadmap.futureCapability.level}</div>
          <div className="text-3xl font-bold text-green-400">{roadmap.futureCapability.score}</div>
          <div className="text-xs text-slate-400">Overall Score</div>
        </div>
      </motion.div>

      {/* Overall Improvement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Overall Improvement</h3>
              <p className="text-sm text-slate-400">Expected capability enhancement</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-400">+{roadmap.expectedResults.overallImprovement}%</div>
          </div>
        </div>
      </motion.div>

      {/* Expected Results by Gene */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Expected Results by Gene</h3>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(roadmap.expectedResults.byGene).map(([gene, improvement]) => (
            <div key={gene} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-1 capitalize">{gene.replace('_', ' ')}</div>
              <div className={`text-2xl font-bold ${improvement > 10 ? 'text-green-400' : improvement > 5 ? 'text-blue-400' : 'text-yellow-400'}`}>
                +{improvement}%
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Business Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Revenue Growth</div>
          <div className="text-2xl font-bold text-green-400">+{roadmap.businessImpact.revenueGrowth}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Cost Reduction</div>
          <div className="text-2xl font-bold text-blue-400">-{roadmap.businessImpact.costReduction}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Efficiency Gain</div>
          <div className="text-2xl font-bold text-purple-400">+{roadmap.businessImpact.efficiencyGain}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Market Expansion</div>
          <div className="text-2xl font-bold text-yellow-400">+{roadmap.businessImpact.marketExpansion}%</div>
        </div>
      </motion.div>

      {/* Timeline Phases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Evolution Timeline</h3>
        <div className="space-y-4">
          {roadmap.timeline.map((phase, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center text-slate-900 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{phase.phase}</h4>
                    <p className="text-sm text-slate-400">{phase.duration}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {phase.milestones.map((milestone, mIdx) => (
                  <div key={mIdx} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Milestone className="w-4 h-4 text-[#00F5C4]" />
                      <span className="text-sm font-medium text-white">{milestone.name}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Target: {new Date(milestone.targetDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* All Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">All Milestones</h3>
        <div className="grid grid-cols-3 gap-4">
          {roadmap.recommendedActions.map(milestone => renderMilestoneCard(milestone))}
        </div>
      </motion.div>

      {/* Selected Milestone Detail */}
      {selectedMilestone && renderMilestoneDetail()}
    </div>
  );
};
