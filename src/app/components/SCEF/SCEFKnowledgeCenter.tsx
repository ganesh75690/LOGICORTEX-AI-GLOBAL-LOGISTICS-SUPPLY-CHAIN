import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  Video, 
  FileText, 
  Lightbulb, 
  Target, 
  Star, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  RefreshCw, 
  Filter, 
  Search, 
  Award, 
  Calendar, 
  ArrowRight, 
  Play, 
  Download, 
  Bookmark, 
  ExternalLink, 
  Shield, 
  Brain, 
  Flame, 
  Leaf, 
  Wrench, 
  Users, 
  Building2, 
  Package, 
  Truck, 
  Factory,
  Zap,
  Globe,
  Award as AwardIcon
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { SmartKnowledgeCenter, KnowledgeItem } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 13
 * Smart Knowledge Center™ - AI-powered personalized learning hub
 */
export const SCEFKnowledgeCenter: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [knowledgeCenter, setKnowledgeCenter] = useState<SmartKnowledgeCenter | null>(null);
  const [selectedKnowledge, setSelectedKnowledge] = useState<KnowledgeItem | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getKnowledgeCenter();
        setKnowledgeCenter(data);
        if (data.personalizedRecommendations.length > 0) {
          setSelectedKnowledge(data.personalizedRecommendations[0]);
        }
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  if (!knowledgeCenter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Loading Knowledge Center...</div>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      sop: FileText,
      training_video: Video,
      best_practice: Star,
      industry_trend: TrendingUp,
      technology: Brain,
      quality_standard: Shield,
      sustainability_standard: Leaf,
      case_study: BookOpen,
      tool: Wrench,
      framework: Building2
    };
    return icons[type] || BookOpen;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sop': return 'bg-blue-500/20 text-blue-400';
      case 'training_video': return 'bg-purple-500/20 text-purple-400';
      case 'best_practice': return 'bg-green-500/20 text-green-400';
      case 'industry_trend': return 'bg-yellow-500/20 text-yellow-400';
      case 'technology': return 'bg-orange-500/20 text-orange-400';
      case 'quality_standard': return 'bg-red-500/20 text-red-400';
      case 'sustainability_standard': return 'bg-emerald-500/20 text-emerald-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const renderKnowledgeCard = (knowledge: KnowledgeItem) => (
    <motion.div
      key={knowledge.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedKnowledge(knowledge)}
      className={`bg-slate-800/50 backdrop-blur-xl border-2 rounded-xl p-4 cursor-pointer transition-all ${
        selectedKnowledge?.id === knowledge.id 
          ? 'border-[#00F5C4] shadow-lg shadow-[#00F5C4]/20' 
          : 'border-slate-700/30 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {React.createElement(getTypeIcon(knowledge.type), { 
            className: 'w-5 h-5 text-yellow-400' 
          })}
          <div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(knowledge.type)}`}>
              {knowledge.type.replace('_', ' ')}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">{knowledge.ratings.average}</span>
          </div>
          <div className="text-xs text-slate-400">{knowledge.ratings.count} ratings</div>
        </div>
      </div>

      <h4 className="text-lg font-bold text-white mb-2">{knowledge.title}</h4>
      <p className="text-sm text-slate-300 mb-3 line-clamp-2">{knowledge.description}</p>

      <div className="flex items-center justify-between text-xs mb-3">
        <span className="text-slate-400 capitalize">{knowledge.category}</span>
        <span className="text-[#00F5C4]">{knowledge.relevance}% relevant</span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className={`px-2 py-1 rounded ${knowledge.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' : knowledge.difficulty === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-orange-500/20 text-orange-400'}`}>
          {knowledge.difficulty}
        </span>
        <span className="text-slate-400">{knowledge.estimatedTime}</span>
      </div>
    </motion.div>
  );

  const renderKnowledgeDetail = () => {
    if (!selectedKnowledge) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {React.createElement(getTypeIcon(selectedKnowledge.type), { 
              className: 'w-8 h-8 text-yellow-400' 
            })}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-3 py-1 rounded text-sm font-medium ${getTypeColor(selectedKnowledge.type)}`}>
                  {selectedKnowledge.type.replace('_', ' ')}
                </span>
                <span className="text-sm text-slate-400 capitalize">{selectedKnowledge.category}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedKnowledge.title}</h3>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-2xl font-bold">{selectedKnowledge.ratings.average}</span>
            </div>
            <div className="text-xs text-slate-400">{selectedKnowledge.ratings.count} ratings</div>
          </div>
        </div>

        {/* Personalized Reasoning */}
        <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-white">AI Personalized Reasoning</span>
          </div>
          <p className="text-sm text-slate-300">{selectedKnowledge.personalizedReasoning}</p>
        </div>

        {/* Description */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <p className="text-sm text-slate-300 leading-relaxed">{selectedKnowledge.description}</p>
        </div>

        {/* Content Summary */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Content Summary</h4>
          <p className="text-sm text-slate-300 mb-3">{selectedKnowledge.content.summary}</p>
          <div className="space-y-2">
            <div className="text-xs text-slate-400 mb-1">Key Points</div>
            <ul className="space-y-1">
              {selectedKnowledge.content.keyPoints.map((point, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00F5C4] mt-0.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          {selectedKnowledge.content.steps && (
            <div className="mt-3">
              <div className="text-xs text-slate-400 mb-2">Implementation Steps</div>
              <ol className="space-y-1">
                {selectedKnowledge.content.steps.map((step, idx) => (
                  <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-[#00F5C4] font-bold">{idx + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Relevance</div>
            <div className="text-xl font-bold text-[#00F5C4]">{selectedKnowledge.relevance}%</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Difficulty</div>
            <div className="text-xl font-bold text-white capitalize">{selectedKnowledge.difficulty}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Time Required</div>
            <div className="text-xl font-bold text-white">{selectedKnowledge.estimatedTime}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Effectiveness</div>
            <div className="text-xl font-bold text-green-400">{selectedKnowledge.effectiveness}%</div>
          </div>
        </div>

        {/* Applicability */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Applicability</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-2">Scenarios</div>
              <div className="flex flex-wrap gap-2">
                {selectedKnowledge.applicability.scenarios.map((scenario, idx) => (
                  <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                    {scenario}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-2">Conditions</div>
              <div className="flex flex-wrap gap-2">
                {selectedKnowledge.applicability.conditions.map((condition, idx) => (
                  <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Business Impact */}
        <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30 mb-4">
          <h4 className="text-sm font-semibold text-white mb-2">Business Impact</h4>
          <p className="text-sm text-slate-300">{selectedKnowledge.businessImpact}</p>
        </div>

        {/* Resources */}
        {selectedKnowledge.content.resources && (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-white mb-3">Additional Resources</h4>
            <div className="flex flex-wrap gap-2">
              {selectedKnowledge.content.resources.map((resource, idx) => (
                <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                  {resource}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Last Updated */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Last Updated: {new Date(selectedKnowledge.lastUpdated).toLocaleDateString()}</span>
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
              <BookOpen className="w-8 h-8 text-[#00F5C4]" />
              Smart Knowledge Center™
            </h1>
            <p className="text-slate-400 mt-1">AI-powered personalized learning hub</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-300">Target: {knowledgeCenter.learningPath.targetLevel}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Learning Path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-purple-400" />
          Learning Path
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900/50 rounded-lg px-4 py-2">
              <div className="text-xs text-slate-400 mb-1">Current Level</div>
              <div className="text-lg font-bold text-white capitalize">{knowledgeCenter.learningPath.currentLevel}</div>
            </div>
            <ArrowRight className="w-6 h-6 text-purple-400" />
            <div className="bg-slate-900/50 rounded-lg px-4 py-2">
              <div className="text-xs text-slate-400 mb-1">Target Level</div>
              <div className="text-lg font-bold text-green-400 capitalize">{knowledgeCenter.learningPath.targetLevel}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">Timeline</div>
            <div className="text-lg font-bold text-white">{knowledgeCenter.learningPath.timeline}</div>
          </div>
        </div>
      </motion.div>

      {/* Knowledge Gaps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Knowledge Gaps Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          {knowledgeCenter.knowledgeGaps.map((gap, idx) => (
            <div key={idx} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{gap.area}</span>
                <span className="text-xs text-slate-400">Gap: {gap.targetLevel - gap.currentLevel}%</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1">
                  <div className="text-xs text-slate-400 mb-1">Current</div>
                  <div className="text-sm font-bold text-white">{gap.currentLevel}%</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00F5C4]" />
                <div className="flex-1">
                  <div className="text-xs text-slate-400 mb-1">Target</div>
                  <div className="text-sm font-bold text-green-400">{gap.targetLevel}%</div>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-[#00F5C4] h-2 rounded-full"
                  style={{ width: `${gap.currentLevel}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Personalized Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Personalized Recommendations</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-800/50 border border-slate-700/30 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="all">All Types</option>
              <option value="sop">SOPs</option>
              <option value="training_video">Training Videos</option>
              <option value="best_practice">Best Practices</option>
              <option value="industry_trend">Industry Trends</option>
              <option value="technology">Technologies</option>
              <option value="quality_standard">Quality Standards</option>
              <option value="sustainability_standard">Sustainability Standards</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {knowledgeCenter.personalizedRecommendations
            .filter(k => filterType === 'all' || k.type === filterType)
            .map(knowledge => renderKnowledgeCard(knowledge))}
        </div>
      </motion.div>

      {/* Selected Knowledge Detail */}
      {selectedKnowledge && renderKnowledgeDetail()}
    </div>
  );
};
