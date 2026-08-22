import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dna, 
  BookOpen, 
  Award, 
  Shield, 
  Zap, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Brain, 
  Lightbulb, 
  Factory, 
  Package, 
  Truck, 
  Activity, 
  BarChart3 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { SupplierIntelligenceDNA } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 3
 * Supplier Intelligence DNA™ - Living organizational DNA
 */
export const GSINIntelligenceDNA: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [intelligenceDNA, setIntelligenceDNA] = useState<SupplierIntelligenceDNA | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'practices' | 'knowledge' | 'improvements' | 'strategies'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getIntelligenceDNA();
        setIntelligenceDNA(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!intelligenceDNA) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Dna className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Analyzing Intelligence DNA...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* DNA Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Dna className="w-5 h-5 text-purple-400" />
              Intelligence DNA Score
            </h3>
            <div className="text-4xl font-bold text-white">{intelligenceDNA.evolutionScore}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Evolution Level</div>
            <div className="text-2xl font-bold text-green-400">Advanced</div>
          </div>
        </div>
      </motion.div>

      {/* Strength & Improvement Areas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Strength Areas
          </h4>
          <div className="space-y-2">
            {intelligenceDNA.strengthAreas.map((strength, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-green-300">
                <CheckCircle className="w-4 h-4" />
                {strength}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-orange-500/10 backdrop-blur-xl border border-orange-500/30 rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-400" />
            Improvement Areas
          </h4>
          <div className="space-y-2">
            {intelligenceDNA.improvementAreas.map((area, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-orange-300">
                <Lightbulb className="w-4 h-4" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* DNA Components Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-400">Best Practices</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceDNA.bestPractices.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Knowledge</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceDNA.operationalKnowledge.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Quality</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceDNA.qualityImprovements.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-slate-400">Strategies</span>
          </div>
          <div className="text-2xl font-bold text-white">{intelligenceDNA.recoveryStrategies.length}</div>
        </div>
      </motion.div>
    </div>
  );

  const renderPractices = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Best Practices</h3>
      {intelligenceDNA.bestPractices.map((practice, idx) => (
        <motion.div
          key={practice.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                  {practice.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-bold">{practice.successRate}%</span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-white">{practice.description}</h4>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Adoption</div>
              <div className="text-lg font-bold text-white">{practice.adoptionCount}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300">Effectiveness: {practice.effectiveness}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Last: {new Date(practice.lastApplied).toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderKnowledge = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Operational Knowledge</h3>
      {intelligenceDNA.operationalKnowledge.map((knowledge, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">{knowledge.process}</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm text-slate-400">Expertise:</div>
                <div className="text-lg font-bold text-blue-400">{knowledge.expertise}%</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-2">Optimizations</div>
              <div className="space-y-1">
                {knowledge.optimization.map((opt, oIdx) => (
                  <div key={oIdx} className="text-sm text-slate-300 flex items-start gap-2">
                    <TrendingUp className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    {opt}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-2">Improvements</div>
              <div className="space-y-1">
                {knowledge.improvements.map((imp, iIdx) => (
                  <div key={iIdx} className="text-sm text-slate-300 flex items-start gap-2">
                    <Zap className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                    {imp}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderImprovements = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Quality Improvements</h3>
      {intelligenceDNA.qualityImprovements.map((improvement, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">{improvement.technique}</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-300">Success: {improvement.successRate}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-300">Defect Reduction: {improvement.defectReduction}%</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Implementation</div>
              <div className="text-lg font-bold text-white">{improvement.implementationTime}</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-2">Lessons Learned</div>
            <div className="flex flex-wrap gap-2">
              {improvement.lessons.map((lesson, lIdx) => (
                <span key={lIdx} className="text-xs bg-slate-900/50 text-slate-300 px-2 py-1 rounded">
                  {lesson}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderStrategies = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Recovery Strategies</h3>
      {intelligenceDNA.recoveryStrategies.map((strategy, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">{strategy.scenario}</h4>
              <p className="text-sm text-slate-300 mb-2">{strategy.strategy}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-300">Success: {strategy.successRate}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-300">Recovery: {strategy.averageRecoveryTime}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-2">Key Success Factors</div>
            <div className="flex flex-wrap gap-2">
              {strategy.keyFactors.map((factor, fIdx) => (
                <span key={fIdx} className="text-xs bg-slate-900/50 text-slate-300 px-2 py-1 rounded">
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
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
              <Dna className="w-8 h-8 text-[#00F5C4]" />
              Supplier Intelligence DNA™
            </h1>
            <p className="text-slate-400 mt-1">Living organizational DNA that evolves forever</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm text-slate-300">Evolving</span>
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
          { id: 'practices', label: 'Best Practices', icon: Award },
          { id: 'knowledge', label: 'Knowledge', icon: Brain },
          { id: 'improvements', label: 'Quality', icon: Shield },
          { id: 'strategies', label: 'Strategies', icon: Zap }
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
        {selectedSection === 'practices' && (
          <motion.div
            key="practices"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderPractices()}
          </motion.div>
        )}
        {selectedSection === 'knowledge' && (
          <motion.div
            key="knowledge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderKnowledge()}
          </motion.div>
        )}
        {selectedSection === 'improvements' && (
          <motion.div
            key="improvements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderImprovements()}
          </motion.div>
        )}
        {selectedSection === 'strategies' && (
          <motion.div
            key="strategies"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderStrategies()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
