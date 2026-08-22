import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Award, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  BarChart3, 
  BookOpen, 
  Zap, 
  Shield, 
  DollarSign, 
  Truck, 
  Factory, 
  Users 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { AIEvolutionMentor } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 5
 * AI Evolution Mentor™ - Personalized AI business consultant
 */
export const GSINEvolutionMentor: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [evolutionMentor, setEvolutionMentor] = useState<AIEvolutionMentor | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'plans' | 'coaching' | 'capability' | 'operations'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getEvolutionMentor();
        setEvolutionMentor(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!evolutionMentor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing AI Evolution Mentor...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Evolution Strategy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          Overall Evolution Strategy
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">{evolutionMentor.overallEvolutionStrategy}</p>
      </motion.div>

      {/* Priority Focus Areas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#00F5C4]" />
          Priority Focus Areas
        </h3>
        <div className="space-y-3">
          {evolutionMentor.priorityFocusAreas.map((area, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-slate-900/50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-[#00F5C4]/20 flex items-center justify-center text-[#00F5C4] font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <span className="text-sm text-white">{area}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mentor Capabilities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Improvement Plans</span>
          </div>
          <div className="text-2xl font-bold text-white">{evolutionMentor.improvementPlans.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Business Coaching</span>
          </div>
          <div className="text-2xl font-bold text-white">{evolutionMentor.businessCoaching.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-400">Capability Dev</span>
          </div>
          <div className="text-2xl font-bold text-white">{evolutionMentor.capabilityDevelopment.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Factory className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-slate-400">Operations</span>
          </div>
          <div className="text-2xl font-bold text-white">{evolutionMentor.operationalImprovements.length}</div>
        </div>
      </motion.div>
    </div>
  );

  const renderPlans = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Personalized Improvement Plans</h3>
      {evolutionMentor.improvementPlans.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Lightbulb className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Plans Yet</h3>
          <p className="text-slate-400">AI will generate personalized improvement plans based on your current capabilities and goals.</p>
        </motion.div>
      ) : (
        evolutionMentor.improvementPlans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{plan.title}</h4>
                <p className="text-sm text-slate-400">{plan.objective}</p>
              </div>
              <div className={`px-3 py-1 rounded text-sm font-medium ${
                plan.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                plan.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                'bg-slate-500/20 text-slate-400'
              }`}>
                {plan.status}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">ROI</div>
                <div className="text-sm font-bold text-green-400">{plan.roi}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Expected Growth</div>
                <div className="text-sm font-bold text-blue-400">+{plan.expectedGrowth}%</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Confidence</div>
                <div className="text-sm font-bold text-purple-400">{plan.confidence}%</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Timeline</div>
                <div className="text-sm font-bold text-white">{plan.timeline}</div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderCoaching = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Business Coaching</h3>
      {evolutionMentor.businessCoaching.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Coaching Yet</h3>
          <p className="text-slate-400">AI will provide personalized business coaching based on your specific needs.</p>
        </motion.div>
      ) : (
        evolutionMentor.businessCoaching.map((coaching, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{coaching.area}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Current: {coaching.currentLevel}%</span>
                  <ArrowRight className="w-4 h-4 text-[#00F5C4]" />
                  <span className="text-sm text-green-400">Target: {coaching.targetLevel}%</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {coaching.coachingTopics.map((topic, tIdx) => (
                <span key={tIdx} className="text-xs bg-slate-900/50 text-slate-300 px-2 py-1 rounded">
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderCapability = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Capability Development</h3>
      {evolutionMentor.capabilityDevelopment.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Zap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Development Plans Yet</h3>
          <p className="text-slate-400">AI will create capability development plans based on your evolution goals.</p>
        </motion.div>
      ) : (
        evolutionMentor.capabilityDevelopment.map((capability, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{capability.capability}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Current: {capability.currentScore}%</span>
                  <ArrowRight className="w-4 h-4 text-[#00F5C4]" />
                  <span className="text-sm text-green-400">Target: {capability.targetScore}%</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Expected Improvement</div>
                <div className="text-lg font-bold text-white">+{capability.expectedImprovement}%</div>
              </div>
            </div>
            <div className="text-sm text-slate-400 mb-2">Timeline: {capability.timeline}</div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderOperations = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Operational Improvements</h3>
      {evolutionMentor.operationalImprovements.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Factory className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Improvements Yet</h3>
          <p className="text-slate-400">AI will suggest operational improvements based on your current performance.</p>
        </motion.div>
      ) : (
        evolutionMentor.operationalImprovements.map((improvement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{improvement.process}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Current: {improvement.currentEfficiency}%</span>
                  <ArrowRight className="w-4 h-4 text-[#00F5C4]" />
                  <span className="text-sm text-green-400">Target: {improvement.targetEfficiency}%</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Expected ROI</div>
                <div className="text-lg font-bold text-green-400">{improvement.expectedROI}%</div>
              </div>
            </div>
            <div className="text-sm text-slate-400">Investment: ${improvement.investmentRequired.toLocaleString()}</div>
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
              AI Evolution Mentor™
            </h1>
            <p className="text-slate-400 mt-1">Personalized AI business consultant for continuous evolution</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">AI-Powered Coaching</span>
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
          { id: 'plans', label: 'Plans', icon: BookOpen },
          { id: 'coaching', label: 'Coaching', icon: Users },
          { id: 'capability', label: 'Capability', icon: Zap },
          { id: 'operations', label: 'Operations', icon: Factory }
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
        {selectedSection === 'plans' && (
          <motion.div
            key="plans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderPlans()}
          </motion.div>
        )}
        {selectedSection === 'coaching' && (
          <motion.div
            key="coaching"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderCoaching()}
          </motion.div>
        )}
        {selectedSection === 'capability' && (
          <motion.div
            key="capability"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderCapability()}
          </motion.div>
        )}
        {selectedSection === 'operations' && (
          <motion.div
            key="operations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderOperations()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
