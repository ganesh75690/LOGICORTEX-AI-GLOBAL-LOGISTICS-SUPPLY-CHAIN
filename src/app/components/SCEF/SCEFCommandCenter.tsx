import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target, 
  Activity,
  BarChart3,
  Zap,
  Shield,
  CheckCircle,
  Clock,
  ChevronRight,
  ChevronDown,
  Plus,
  Settings,
  Eye,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  ArrowRight,
  Award,
  Globe,
  Leaf,
  DollarSign,
  Users,
  Calendar,
  Play,
  Pause,
  X,
  Star,
  Sparkles,
  Rocket,
  Gauge,
  FileText,
  Database,
  Dna
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { SCEFDigitalTwin } from './SCEFDigitalTwin';
import { SCEFCapabilityGenome } from './SCEFCapabilityGenome';
import { SCEFEvolutionMentor } from './SCEFEvolutionMentor';
import { SCEFFutureSimulator } from './SCEFFutureSimulator';
import { SCEFSelfHealing } from './SCEFSelfHealing';
import { SCEFPotentialIndex } from './SCEFPotentialIndex';
import { SCEFSustainabilityCoach } from './SCEFSustainabilityCoach';
import { SCEFContinuousLearning } from './SCEFContinuousLearning';
import { SCEFEvolutionRoadmap } from './SCEFEvolutionRoadmap';
import { SCEFOpportunityDiscovery } from './SCEFOpportunityDiscovery';
import { SCEFBenchmark } from './SCEFBenchmark';
import { SCEFKnowledgeCenter } from './SCEFKnowledgeCenter';
import {
  SCEFDashboardData,
  SupplierCommandCenter,
  CapabilityLevel
} from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) Command Center Dashboard
 * Enterprise AI intelligence layer for suppliers
 */
export const SCEFCommandCenter: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [dashboardData, setDashboardData] = useState<SCEFDashboardData | null>(null);
  const [activeTab, setActiveTab] = useState<'command' | 'twin' | 'genome' | 'mentor' | 'simulator' | 'healing' | 'potential' | 'sustainability' | 'learning' | 'roadmap' | 'opportunities' | 'benchmark' | 'knowledge'>('command');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize SCEF engine once
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getDashboardData();
        setDashboardData(data);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
        setIsInitialized(true);
      }
    }
  }, []);

  if (!isInitialized || !dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing SCEF™ Engine...</div>
        </div>
      </div>
    );
  }

  const commandCenter = dashboardData.commandCenter;

  const renderCommandCenter = () => (
    <div className="space-y-6">
      {/* Business Health Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] rounded-xl p-6 text-slate-900"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6" />
            AI Supplier Command Center
          </h2>
          <div className="flex gap-2">
            <button className="bg-slate-900/20 hover:bg-slate-900/30 px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="bg-slate-900/20 hover:bg-slate-900/30 px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
        <p className="text-slate-800 mb-4">
          AI-powered business intelligence for continuous supplier capability evolution
        </p>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Business Health</div>
            <div className="text-2xl font-bold">{commandCenter.businessHealth.overallScore}%</div>
            <div className="text-xs text-slate-600 capitalize">{commandCenter.businessHealth.trend}</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Capability Level</div>
            <div className="text-2xl font-bold capitalize">{commandCenter.currentCapabilityLevel}</div>
            <div className="text-xs text-slate-600">Current Status</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Growth Rate</div>
            <div className="text-2xl font-bold">{commandCenter.businessGrowth.growthRate}%</div>
            <div className="text-xs text-slate-600">Revenue Growth</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Evolution Progress</div>
            <div className="text-2xl font-bold">{commandCenter.supplierEvolutionProgress.progress}%</div>
            <div className="text-xs text-slate-600">To {commandCenter.supplierEvolutionProgress.nextLevel}</div>
          </div>
        </div>
      </motion.div>

      {/* AI Business Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-[#00F5C4]" />
          AI Business Summary
        </h3>
        <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
          <p className="text-slate-300 leading-relaxed">{commandCenter.aiBusinessSummary.executive}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-400 mb-2">Key Insights</h4>
            <ul className="space-y-2">
              {commandCenter.aiBusinessSummary.keyInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-[#00F5C4] mt-0.5 flex-shrink-0" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-400 mb-2">Recommended Focus</h4>
            <ul className="space-y-2">
              {commandCenter.aiBusinessSummary.recommendedFocus.map((focus, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <Target className="w-4 h-4 text-[#00F5C4] mt-0.5 flex-shrink-0" />
                  {focus}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-4"
      >
        {Object.entries(commandCenter.businessHealth.keyMetrics).map(([key, metric]) => (
          <div key={key} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
            <div className="text-sm text-slate-400 capitalize mb-2">{key}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-white">{metric.current}</div>
              <div className={`text-sm ${metric.variance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {metric.variance >= 0 ? '+' : ''}{metric.variance}%
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
              <div 
                className="bg-[#00F5C4] h-2 rounded-full transition-all"
                style={{ width: `${(metric.current / metric.target) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          AI Recommendations
        </h3>
        <div className="space-y-3">
          {commandCenter.aiRecommendations.map((rec) => (
            <div key={rec.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                    rec.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                    rec.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {rec.priority}
                  </span>
                  <span className="text-white font-medium">{rec.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#00F5C4] font-medium">{rec.expectedROI}</div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-3">{rec.recommendation}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Impact: {rec.expectedImpact}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  rec.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                  rec.difficulty === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {rec.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pending Improvement Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Clock className="w-5 h-5 text-blue-400" />
          Pending Improvement Tasks
        </h3>
        <div className="space-y-3">
          {commandCenter.pendingImprovementTasks.map((task) => (
            <div key={task.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-white font-medium mb-1">{task.task}</div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span>{task.category}</span>
                    <span>•</span>
                    <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#00F5C4]">{task.progress}%</div>
                  <div className="text-xs text-slate-400">Complete</div>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-2 rounded-full transition-all"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Risk Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          Risk Alerts
        </h3>
        <div className="space-y-3">
          {commandCenter.riskAlerts.map((risk) => (
            <div key={risk.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                    risk.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    risk.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {risk.severity}
                  </span>
                  <span className="text-white font-medium">{risk.type}</span>
                </div>
                <div className="flex gap-4 text-sm text-slate-400">
                  <span>Likelihood: {risk.likelihood}%</span>
                  <span>Impact: {risk.impact}%</span>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-3">{risk.description}</p>
              <div className="flex flex-wrap gap-2">
                {risk.recommendedActions.map((action, idx) => (
                  <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                    {action}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Sustainability Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Leaf className="w-5 h-5 text-green-400" />
          Sustainability Status
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Carbon Score</div>
            <div className="text-xl font-bold text-white">{commandCenter.sustainabilityStatus.carbonScore}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Energy Efficiency</div>
            <div className="text-xl font-bold text-white">{commandCenter.sustainabilityStatus.energyEfficiency}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Waste Reduction</div>
            <div className="text-xl font-bold text-white">{commandCenter.sustainabilityStatus.wasteReduction}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Water Usage</div>
            <div className="text-xl font-bold text-white">{commandCenter.sustainabilityStatus.waterUsage}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-xs text-slate-400 mb-2">Green Certifications</div>
          <div className="flex flex-wrap gap-2">
            {commandCenter.sustainabilityStatus.greenCertifications.map((cert, idx) => (
              <span key={idx} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Evolution Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Rocket className="w-5 h-5 text-purple-400" />
          Supplier Evolution Progress
        </h3>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress to {commandCenter.supplierEvolutionProgress.nextLevel}</span>
            <span className="text-sm text-[#00F5C4]">{commandCenter.supplierEvolutionProgress.progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-3 rounded-full transition-all"
              style={{ width: `${commandCenter.supplierEvolutionProgress.progress}%` }}
            />
          </div>
        </div>
        <div className="space-y-2">
          {commandCenter.supplierEvolutionProgress.milestones.map((milestone, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                milestone.completed 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-slate-700 text-slate-400'
              }`}>
                {milestone.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <div className={`text-sm ${milestone.completed ? 'text-green-400' : 'text-slate-300'}`}>
                  {milestone.name}
                </div>
                {milestone.completedAt && (
                  <div className="text-xs text-slate-500">
                    Completed: {new Date(milestone.completedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Future Capability Prediction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Award className="w-5 h-5 text-[#00F5C4]" />
          Future Capability Prediction
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-1">Current Level</div>
            <div className="text-xl font-bold text-white capitalize">{commandCenter.currentCapabilityLevel}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-1">Predicted Level</div>
            <div className="text-xl font-bold text-[#00F5C4] capitalize">{commandCenter.futureCapabilityPrediction.level}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-slate-400 mb-2">Confidence: {commandCenter.futureCapabilityPrediction.confidence}%</div>
          <div className="text-sm text-slate-400 mb-1">Timeframe: {commandCenter.futureCapabilityPrediction.timeframe}</div>
          <div className="text-sm text-slate-400">Key Drivers:</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {commandCenter.futureCapabilityPrediction.keyDrivers.map((driver, idx) => (
              <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                {driver}
              </span>
            ))}
          </div>
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
              <Globe className="w-8 h-8 text-[#00F5C4]" />
              SUPPLIER CAPABILITY EVOLUTION FABRIC™
            </h1>
            <p className="text-slate-400 mt-1">AI-powered supplier transformation platform</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-slate-300">AI Engine Active</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">AI Engine</span>
            <span className="text-[#00F5C4]">{dashboardData.systemHealth.aiEngine}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-[#00F5C4] h-2 rounded-full transition-all"
              style={{ width: `${dashboardData.systemHealth.aiEngine}%` }}
            />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Data Freshness</span>
            <span className="text-[#00F5C4]">{dashboardData.systemHealth.dataFreshness}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-[#00F5C4] h-2 rounded-full transition-all"
              style={{ width: `${dashboardData.systemHealth.dataFreshness}%` }}
            />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Model Accuracy</span>
            <span className="text-[#00F5C4]">{dashboardData.systemHealth.modelAccuracy}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-[#00F5C4] h-2 rounded-full transition-all"
              style={{ width: `${dashboardData.systemHealth.modelAccuracy}%` }}
            />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Integration</span>
            <span className="text-[#00F5C4]">{dashboardData.systemHealth.integrationStatus}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-[#00F5C4] h-2 rounded-full transition-all"
              style={{ width: `${dashboardData.systemHealth.integrationStatus}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 mb-6 overflow-x-auto"
      >
        <button
          onClick={() => setActiveTab('command')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'command'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Brain className="w-4 h-4 inline mr-2" />
          Command Center
        </button>
        <button
          onClick={() => setActiveTab('twin')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'twin'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Globe className="w-4 h-4 inline mr-2" />
          Digital Twin
        </button>
        <button
          onClick={() => setActiveTab('genome')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'genome'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Dna className="w-4 h-4 inline mr-2" />
          Capability Genome
        </button>
        <button
          onClick={() => setActiveTab('mentor')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'mentor'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Evolution Mentor
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'simulator'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Play className="w-4 h-4 inline mr-2" />
          Simulator
        </button>
        <button
          onClick={() => setActiveTab('healing')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'healing'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Shield className="w-4 h-4 inline mr-2" />
          Self-Healing
        </button>
        <button
          onClick={() => setActiveTab('potential')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'potential'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-2" />
          Potential Index
        </button>
        <button
          onClick={() => setActiveTab('sustainability')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'sustainability'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Leaf className="w-4 h-4 inline mr-2" />
          Sustainability
        </button>
        <button
          onClick={() => setActiveTab('learning')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'learning'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Database className="w-4 h-4 inline mr-2" />
          Learning Memory
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'roadmap'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Calendar className="w-4 h-4 inline mr-2" />
          Roadmap
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'opportunities'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Lightbulb className="w-4 h-4 inline mr-2" />
          Opportunities
        </button>
        <button
          onClick={() => setActiveTab('benchmark')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'benchmark'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <BarChart3 className="w-4 h-4 inline mr-2" />
          Benchmark
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`px-6 py-3 rounded-xl font-medium transition whitespace-nowrap ${
            activeTab === 'knowledge'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Knowledge Center
        </button>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'command' && (
          <motion.div
            key="command"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderCommandCenter()}
          </motion.div>
        )}
        {activeTab === 'twin' && (
          <motion.div
            key="twin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFDigitalTwin />
          </motion.div>
        )}
        {activeTab === 'genome' && (
          <motion.div
            key="genome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFCapabilityGenome />
          </motion.div>
        )}
        {activeTab === 'mentor' && (
          <motion.div
            key="mentor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFEvolutionMentor />
          </motion.div>
        )}
        {activeTab === 'simulator' && (
          <motion.div
            key="simulator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFFutureSimulator />
          </motion.div>
        )}
        {activeTab === 'healing' && (
          <motion.div
            key="healing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFSelfHealing />
          </motion.div>
        )}
        {activeTab === 'potential' && (
          <motion.div
            key="potential"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFPotentialIndex />
          </motion.div>
        )}
        {activeTab === 'sustainability' && (
          <motion.div
            key="sustainability"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFSustainabilityCoach />
          </motion.div>
        )}
        {activeTab === 'learning' && (
          <motion.div
            key="learning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFContinuousLearning />
          </motion.div>
        )}
        {activeTab === 'roadmap' && (
          <motion.div
            key="roadmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFEvolutionRoadmap />
          </motion.div>
        )}
        {activeTab === 'opportunities' && (
          <motion.div
            key="opportunities"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFOpportunityDiscovery />
          </motion.div>
        )}
        {activeTab === 'benchmark' && (
          <motion.div
            key="benchmark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFBenchmark />
          </motion.div>
        )}
        {activeTab === 'knowledge' && (
          <motion.div
            key="knowledge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SCEFKnowledgeCenter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
