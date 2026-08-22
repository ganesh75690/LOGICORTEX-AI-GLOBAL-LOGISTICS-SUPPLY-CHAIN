import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  CheckCircle,
  Clock,
  DollarSign,
  Zap,
  Shield,
  Star,
  Award,
  RefreshCw,
  ArrowRight,
  Play,
  BookOpen,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Sparkles,
  Brain,
  GraduationCap,
  Calendar,
  BarChart3,
  FileText,
  Settings,
  Filter,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { EvolutionMentor, MentorRecommendation } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 4
 * AI Evolution Mentor™ - Personalized AI Business Consultant
 */
export const SCEFEvolutionMentor: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [mentor, setMentor] = useState<EvolutionMentor | null>(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState<MentorRecommendation | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getEvolutionMentor();
        setMentor(data);
        if (data.recommendations.length > 0) {
          setSelectedRecommendation(data.recommendations[0]);
        }
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing AI Evolution Mentor...</div>
        </div>
      </div>
    );
  }

  const filteredRecommendations = mentor.recommendations.filter(rec => {
    if (filterCategory !== 'all' && rec.category !== filterCategory) return false;
    if (filterPriority !== 'all' && rec.priority !== filterPriority) return false;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-400';
      case 'challenging': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-red-500/20 text-red-400';
    }
  };

  const renderRecommendationCard = (rec: MentorRecommendation) => (
    <motion.div
      key={rec.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedRecommendation(rec)}
      className={`bg-slate-800/50 backdrop-blur-xl border-2 rounded-xl p-4 cursor-pointer transition-all ${
        selectedRecommendation?.id === rec.id 
          ? 'border-[#00F5C4] shadow-lg shadow-[#00F5C4]/20' 
          : 'border-slate-700/30 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
            {rec.priority}
          </span>
          <span className="text-sm font-medium text-white">{rec.category}</span>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-[#00F5C4]">{rec.expectedROI}</div>
        </div>
      </div>

      <h4 className="text-lg font-bold text-white mb-2">{rec.title}</h4>
      <p className="text-sm text-slate-300 mb-3 line-clamp-2">{rec.description}</p>

      <div className="flex items-center justify-between text-xs">
        <span className={`px-2 py-1 rounded ${getDifficultyColor(rec.difficulty)}`}>
          {rec.difficulty}
        </span>
        <span className="text-slate-400">{rec.implementationTime}</span>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Quality Impact</span>
          <span className="text-green-400">+{rec.expectedPerformanceGain.quality}%</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-slate-400">Delivery Impact</span>
          <span className="text-blue-400">+{rec.expectedPerformanceGain.delivery}%</span>
        </div>
      </div>
    </motion.div>
  );

  const renderRecommendationDetail = () => {
    if (!selectedRecommendation) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded text-sm font-medium border ${getPriorityColor(selectedRecommendation.priority)}`}>
                {selectedRecommendation.priority}
              </span>
              <span className="text-sm text-slate-400">{selectedRecommendation.category}</span>
            </div>
            <h3 className="text-2xl font-bold text-white">{selectedRecommendation.title}</h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#00F5C4]">{selectedRecommendation.expectedROI}</div>
            <div className="text-xs text-slate-400">Expected ROI</div>
          </div>
        </div>

        {/* Personalized Reasoning */}
        <div className="bg-gradient-to-r from-[#00F5C4]/10 to-[#00D4A8]/10 rounded-lg p-4 border border-[#00F5C4]/30 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-[#00F5C4]" />
            <span className="text-sm font-semibold text-white">AI Personalized Reasoning</span>
          </div>
          <p className="text-sm text-slate-300">{selectedRecommendation.personalizedReasoning}</p>
        </div>

        {/* Description */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <p className="text-sm text-slate-300 leading-relaxed">{selectedRecommendation.description}</p>
        </div>

        {/* Business Impact */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Financial Impact</div>
            <p className="text-sm text-white">{selectedRecommendation.businessImpact.financial}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Operational Impact</div>
            <p className="text-sm text-white">{selectedRecommendation.businessImpact.operational}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Strategic Impact</div>
            <p className="text-sm text-white">{selectedRecommendation.businessImpact.strategic}</p>
          </div>
        </div>

        {/* Expected Performance Gains */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Expected Performance Gains</h4>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-1">Quality</div>
              <div className="text-xl font-bold text-green-400">+{selectedRecommendation.expectedPerformanceGain.quality}%</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Delivery</div>
              <div className="text-xl font-bold text-blue-400">+{selectedRecommendation.expectedPerformanceGain.delivery}%</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Efficiency</div>
              <div className="text-xl font-bold text-yellow-400">+{selectedRecommendation.expectedPerformanceGain.efficiency}%</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Sustainability</div>
              <div className="text-xl font-bold text-emerald-400">+{selectedRecommendation.expectedPerformanceGain.sustainability}%</div>
            </div>
          </div>
        </div>

        {/* Implementation Steps */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Implementation Steps</h4>
          <div className="space-y-2">
            {selectedRecommendation.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#00F5C4]/20 text-[#00F5C4] flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Required */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Resources Required</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-1">Budget</div>
              <div className="text-lg font-bold text-white">${selectedRecommendation.resources.budget.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Timeline</div>
              <div className="text-lg font-bold text-white">{selectedRecommendation.resources.timeline} months</div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-slate-400 mb-1">Personnel</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedRecommendation.resources.personnel.map((person, idx) => (
                  <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                    {person}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-slate-400 mb-1">Technology</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedRecommendation.resources.technology.map((tech, idx) => (
                  <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Data */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Supporting Data</h4>
          <div className="space-y-2">
            {selectedRecommendation.supportingData.map((data, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                <span className="text-sm text-slate-300">{data.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">{data.currentValue} → {data.targetValue}</span>
                  <span className={`text-sm font-medium ${data.gap > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {data.gap > 0 ? `+${data.gap}` : data.gap}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risks and Success Factors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Risks
            </h4>
            <ul className="space-y-1">
              {selectedRecommendation.risks.map((risk, idx) => (
                <li key={idx} className="text-xs text-red-300 flex items-start gap-2">
                  <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Success Factors
            </h4>
            <ul className="space-y-1">
              {selectedRecommendation.successFactors.map((factor, idx) => (
                <li key={idx} className="text-xs text-green-300 flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  {factor}
                </li>
              ))}
            </ul>
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
              <Users className="w-8 h-8 text-[#00F5C4]" />
              AI Evolution Mentor™
            </h1>
            <p className="text-slate-400 mt-1">Your personalized AI Business Consultant</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Mentor Score: {mentor.mentorScore}%</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-300">{mentor.learningPath.phase}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mentor Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Top Opportunities</div>
          <div className="text-lg font-bold text-white">{mentor.mentorInsights.topOpportunities.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Quick Wins</div>
          <div className="text-lg font-bold text-green-400">{mentor.mentorInsights.quickWins.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Strategic Investments</div>
          <div className="text-lg font-bold text-purple-400">{mentor.mentorInsights.strategicInvestments.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Risk Mitigations</div>
          <div className="text-lg font-bold text-orange-400">{mentor.mentorInsights.riskMitigations.length}</div>
        </div>
      </motion.div>

      {/* Learning Path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Current Learning Path</h3>
              <p className="text-sm text-slate-400">{mentor.learningPath.phase} • {mentor.learningPath.expectedDuration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Focus Areas:</span>
            <div className="flex gap-2">
              {mentor.learningPath.focusAreas.map((area, idx) => (
                <span key={idx} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 mb-6"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-800/50 border border-slate-700/30 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option value="all">All Categories</option>
            {Array.from(new Set(mentor.recommendations.map(r => r.category))).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-slate-800/50 border border-slate-700/30 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </motion.div>

      {/* Recommendations Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">AI Recommendations ({filteredRecommendations.length})</h3>
        <div className="grid grid-cols-3 gap-4">
          {filteredRecommendations.map(rec => renderRecommendationCard(rec))}
        </div>
      </motion.div>

      {/* Selected Recommendation Detail */}
      {selectedRecommendation && renderRecommendationDetail()}
    </div>
  );
};
