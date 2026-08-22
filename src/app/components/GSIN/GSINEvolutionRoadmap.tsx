import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Route, 
  Target, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Award, 
  Activity, 
  AlertTriangle, 
  Shield, 
  Calendar, 
  Users, 
  DollarSign 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { SupplierEvolutionRoadmap } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 10
 * Supplier Evolution Roadmap™ - AI-generated strategic evolution path
 */
export const GSINEvolutionRoadmap: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [evolutionRoadmap, setEvolutionRoadmap] = useState<SupplierEvolutionRoadmap | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'phases' | 'milestones' | 'timeline'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getEvolutionRoadmap();
        setEvolutionRoadmap(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!evolutionRoadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Route className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Generating Evolution Roadmap...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Current Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Current Evolution Status
            </h3>
            <div className="text-4xl font-bold text-white">{evolutionRoadmap.currentLevel}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Overall Progress</div>
            <div className="text-2xl font-bold text-green-400">{evolutionRoadmap.overallProgress}%</div>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 mt-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${evolutionRoadmap.overallProgress}%` }}
          />
        </div>
      </motion.div>

      {/* Evolution Path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Route className="w-5 h-5 text-[#00F5C4]" />
          Evolution Path
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900/50 rounded-lg px-4 py-2">
              <div className="text-xs text-slate-400 mb-1">Current Phase</div>
              <div className="text-lg font-bold text-white">{evolutionRoadmap.currentPhase?.phase || 'N/A'}</div>
            </div>
            <ArrowRight className="w-6 h-6 text-[#00F5C4]" />
            <div className="bg-slate-900/50 rounded-lg px-4 py-2">
              <div className="text-xs text-slate-400 mb-1">Next Phase</div>
              <div className="text-lg font-bold text-green-400">{evolutionRoadmap.nextPhase?.phase || 'N/A'}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">Timeline</div>
            <div className="text-lg font-bold text-white">{evolutionRoadmap.timeline}</div>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-slate-400">Phases</span>
          </div>
          <div className="text-2xl font-bold text-white">{evolutionRoadmap.evolutionPhases.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-400">Milestones</span>
          </div>
          <div className="text-2xl font-bold text-white">{evolutionRoadmap.evolutionPhases.reduce((acc, phase) => acc + phase.milestones.length, 0)}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Timeline</span>
          </div>
          <div className="text-2xl font-bold text-white">{evolutionRoadmap.timeline}</div>
        </div>
      </motion.div>
    </div>
  );

  const renderPhases = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Evolution Phases</h3>
      {evolutionRoadmap.evolutionPhases.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Route className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Phases Yet</h3>
          <p className="text-slate-400">AI will generate evolution phases based on your current capabilities and goals.</p>
        </motion.div>
      ) : (
        evolutionRoadmap.evolutionPhases.map((phase, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00F5C4]/20 flex items-center justify-center text-[#00F5C4] font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{phase.phase}</h4>
                  <p className="text-sm text-slate-400">{phase.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Duration</div>
                <div className="text-lg font-bold text-white">{phase.duration}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-2">Capabilities</div>
                <div className="flex flex-wrap gap-1">
                  {phase.capabilities.map((cap, cIdx) => (
                    <span key={cIdx} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-2">Objectives</div>
                <div className="flex flex-wrap gap-1">
                  {phase.objectives.map((obj, oIdx) => (
                    <span key={oIdx} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      {obj}
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

  const renderMilestones = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Evolution Milestones</h3>
      {evolutionRoadmap.evolutionPhases.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Milestones Yet</h3>
          <p className="text-slate-400">AI will generate milestones for each evolution phase.</p>
        </motion.div>
      ) : (
        evolutionRoadmap.evolutionPhases.map((phase, pIdx) => (
          <div key={pIdx} className="mb-6">
            <h4 className="text-md font-bold text-white mb-3">{phase.phase}</h4>
            {phase.milestones.map((milestone, mIdx) => (
              <motion.div
                key={mIdx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: mIdx * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-lg p-3 mb-2"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00F5C4]" />
                  <span className="text-sm text-white">{milestone.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ))
      )}
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Expected Outcomes
        </h3>
        <div className="space-y-2">
          {evolutionRoadmap.expectedOutcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              {outcome}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
          <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            Success Factors
          </h4>
          <div className="space-y-2">
            {evolutionRoadmap.successFactors.map((factor, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-green-300">
                <CheckCircle className="w-3 h-3" />
                {factor}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-xl p-4">
          <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Risk Factors
          </h4>
          <div className="space-y-2">
            {evolutionRoadmap.riskFactors.map((risk, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-red-300">
                <AlertTriangle className="w-3 h-3" />
                {risk}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
      >
        <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" />
          Resource Requirements
        </h4>
        <div className="flex flex-wrap gap-2">
          {evolutionRoadmap.resourceRequirements.map((resource, idx) => (
            <span key={idx} className="text-xs bg-slate-900/50 text-slate-300 px-2 py-1 rounded">
              {resource}
            </span>
          ))}
        </div>
      </motion.div>
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
              <Route className="w-8 h-8 text-[#00F5C4]" />
              Supplier Evolution Roadmap™
            </h1>
            <p className="text-slate-400 mt-1">AI-generated strategic evolution path</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">Strategic Planning</span>
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
          { id: 'phases', label: 'Phases', icon: Route },
          { id: 'milestones', label: 'Milestones', icon: Award },
          { id: 'timeline', label: 'Timeline', icon: Calendar }
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
        {selectedSection === 'phases' && (
          <motion.div
            key="phases"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderPhases()}
          </motion.div>
        )}
        {selectedSection === 'milestones' && (
          <motion.div
            key="milestones"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderMilestones()}
          </motion.div>
        )}
        {selectedSection === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderTimeline()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
