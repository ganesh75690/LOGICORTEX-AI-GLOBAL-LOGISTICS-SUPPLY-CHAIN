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
  Network,
  Dna,
  Layers,
  Sparkles,
  Globe,
  Award,
  FileText,
  Play,
  Pause,
  X
} from 'lucide-react';
import { GASDFEngine } from './GASDFEngine';
import {
  GASDFDashboardData,
  ExecutiveBriefing,
  StrategicDecision,
  StrategicOpportunity,
  ApprovalRequest,
  DecisionGenome,
  RippleEffect,
  DecisionConsequences,
  DecisionHarmony,
  DecisionEvolution
} from '../../types/gasdf';

/**
 * GLOBAL AUTONOMOUS SUPPLY CHAIN DECISION FABRIC (GASDF™) Dashboard
 * Enterprise-grade AI decision intelligence platform
 */
export const GASDFDashboard: React.FC = () => {
  const engineRef = useRef<GASDFEngine | null>(null);
  const [dashboardData, setDashboardData] = useState<GASDFDashboardData | null>(null);
  const [activeTab, setActiveTab] = useState<'briefing' | 'decisions' | 'opportunities' | 'learning' | 'approvals'>('briefing');
  const [selectedDecision, setSelectedDecision] = useState<StrategicDecision | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<StrategicOpportunity | null>(null);
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showGenome, setShowGenome] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [showConsequences, setShowConsequences] = useState(false);
  const [showHarmony, setShowHarmony] = useState(false);
  const [showEvolution, setShowEvolution] = useState(false);

  useEffect(() => {
    // Initialize GASDF engine once
    if (!engineRef.current) {
      try {
        engineRef.current = new GASDFEngine();
        const data = engineRef.current.getDashboardData();
        setDashboardData(data);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing GASDF engine:', error);
        setIsInitialized(true);
      }
    }
  }, []);

  if (!isInitialized || !dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing GASDF™ Engine...</div>
        </div>
      </div>
    );
  }

  const analyzeDecision = async (decisionId: string) => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const decision = engineRef.current?.getDecision(decisionId);
    if (decision) {
      setSelectedDecision(decision);
    }
    setIsAnalyzing(false);
  };

  const createNewDecision = () => {
    const newDecision = engineRef.current?.createDecision({
      type: 'warehouse',
      title: 'Warehouse Expansion - Mumbai',
      description: 'Expand Mumbai warehouse by 50,000 sq ft to handle projected Q4 demand growth',
      status: 'analyzing',
      priority: 'high',
      context: {
        situation: 'Current warehouse capacity at 85% utilization with projected growth of 25% in Q4',
        drivers: ['Market expansion', 'E-commerce growth', 'Seasonal demand'],
        constraints: ['Budget limit of $5M', 'Timeline of 6 months', 'Regulatory approvals'],
        stakeholders: ['Operations', 'Finance', 'Customers', 'Suppliers']
      },
      proposedAction: {
        description: 'Construct 50,000 sq ft expansion with automated systems',
        steps: [
          'Site selection and acquisition',
          'Design and planning',
          'Permit acquisition',
          'Construction',
          'System installation',
          'Testing and commissioning'
        ],
        resources: {
          budget: 4500000,
          personnel: ['Project Manager', 'Construction Team', 'Systems Engineer'],
          technology: ['Warehouse Management System', 'Automation Equipment'],
          timeline: 6
        }
      },
      createdBy: 'admin'
    });
    
    if (newDecision) {
      const data = engineRef.current?.getDashboardData();
      setDashboardData(data);
      setSelectedDecision(newDecision);
    }
  };

  const renderExecutiveBriefing = () => (
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
            Executive Intelligence Briefing
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
          AI-powered executive intelligence for strategic decision-making
        </p>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Business Health</div>
            <div className="text-2xl font-bold">{dashboardData.briefing.businessHealth.score}%</div>
            <div className="text-xs text-slate-600 capitalize">{dashboardData.briefing.businessHealth.trend}</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Business Stability</div>
            <div className="text-2xl font-bold">{dashboardData.briefing.businessStability.score}%</div>
            <div className="text-xs text-slate-600">Resilient</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Business Confidence</div>
            <div className="text-2xl font-bold">{dashboardData.briefing.businessConfidence.overall}%</div>
            <div className="text-xs text-slate-600">High</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Critical Risks</div>
            <div className="text-2xl font-bold">{dashboardData.briefing.criticalRisks.length}</div>
            <div className="text-xs text-slate-600">Active</div>
          </div>
        </div>
      </motion.div>

      {/* AI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-[#00F5C4]" />
          AI Executive Summary
        </h3>
        <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
          <p className="text-slate-300 leading-relaxed">{dashboardData.briefing.aiSummary.executive}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-400 mb-2">Actionable Insights</h4>
            <ul className="space-y-2">
              {dashboardData.briefing.aiSummary.actionableInsights.map((insight, idx) => (
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
              {dashboardData.briefing.aiSummary.recommendedFocus.map((focus, idx) => (
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
        {Object.entries(dashboardData.briefing.businessHealth.keyMetrics).map(([key, metric]) => (
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

      {/* Critical Risks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          Critical Risks
        </h3>
        <div className="space-y-3">
          {dashboardData.briefing.criticalRisks.map((risk) => (
            <div key={risk.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    risk.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    risk.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {risk.severity.toUpperCase()}
                  </span>
                  <span className="text-white font-medium">{risk.category}</span>
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

      {/* Hidden Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Hidden Opportunities
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {dashboardData.briefing.hiddenOpportunities.map((opp) => (
            <div key={opp.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-start justify-between mb-2">
                <span className="text-white font-medium">{opp.category}</span>
                <span className="text-[#00F5C4] font-bold">${(opp.estimatedValue / 1000000).toFixed(1)}M</span>
              </div>
              <p className="text-slate-300 text-sm mb-3">{opp.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Confidence: {opp.confidence}%</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  opp.implementationComplexity === 'low' ? 'bg-green-500/20 text-green-400' :
                  opp.implementationComplexity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {opp.implementationComplexity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pending Executive Decisions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Clock className="w-5 h-5 text-[#00F5C4]" />
          Pending Executive Decisions
        </h3>
        <div className="space-y-3">
          {dashboardData.briefing.pendingExecutiveDecisions.map((decision) => (
            <div key={decision.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 flex items-center justify-between">
              <div>
                <div className="text-white font-medium mb-1">{decision.title}</div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span>{decision.category}</span>
                  <span>•</span>
                  <span>Deadline: {new Date(decision.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  decision.urgency === 'critical' ? 'bg-red-500/20 text-red-400' :
                  decision.urgency === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {decision.urgency.toUpperCase()}
                </span>
                <button className="text-[#00F5C4] hover:text-[#00D4A8] transition">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Strategic Priorities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Target className="w-5 h-5 text-purple-400" />
          Strategic Priorities
        </h3>
        <div className="space-y-4">
          {dashboardData.briefing.strategicPriorities.map((priority) => (
            <div key={priority.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-white font-medium mb-1">{priority.title}</div>
                  <div className="text-sm text-slate-400">{priority.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#00F5C4]">{priority.progress}%</div>
                  <div className="text-xs text-slate-400">Owner: {priority.owner}</div>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-2 rounded-full transition-all"
                  style={{ width: `${priority.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-sm text-slate-400">
                <span>Due: {new Date(priority.dueDate).toLocaleDateString()}</span>
                <span>{Math.ceil((new Date(priority.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderDecisionGenome = (genome: DecisionGenome) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2 text-white">
          <Dna className="w-5 h-5 text-[#00F5C4]" />
          Decision Genome™
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#00F5C4]">{genome.overallHealth}%</div>
          <div className="text-xs text-slate-400">Overall Health</div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {genome.genes.map((gene) => (
          <div key={gene.type} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">{gene.name}</span>
              <div className={`w-3 h-3 rounded-full ${
                gene.color === 'green' ? 'bg-green-400' :
                gene.color === 'yellow' ? 'bg-yellow-400' :
                gene.color === 'orange' ? 'bg-orange-400' :
                'bg-red-400'
              }`} />
            </div>
            <div className="text-xl font-bold text-white mb-1">{gene.score}</div>
            <div className="text-xs text-slate-400 mb-2">Confidence: {gene.confidence}%</div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all ${
                  gene.color === 'green' ? 'bg-green-400' :
                  gene.color === 'yellow' ? 'bg-yellow-400' :
                  gene.color === 'orange' ? 'bg-orange-400' :
                  'bg-red-400'
                }`}
                style={{ width: `${gene.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
          <h4 className="text-sm font-semibold text-slate-400 mb-3">Risk Profile</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Overall</span>
              <span className="text-white">{genome.riskProfile.overall}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Financial</span>
              <span className="text-white">{genome.riskProfile.byCategory.financial}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Operational</span>
              <span className="text-white">{genome.riskProfile.byCategory.operational}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Strategic</span>
              <span className="text-white">{genome.riskProfile.byCategory.strategic}%</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
          <h4 className="text-sm font-semibold text-slate-400 mb-3">Strength Profile</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Overall</span>
              <span className="text-white">{genome.strengthProfile.overall}%</span>
            </div>
            <div className="text-xs text-slate-400 mt-2">Top Strengths:</div>
            {genome.strengthProfile.topStrengths.map((strength, idx) => (
              <div key={idx} className="text-xs text-[#00F5C4]">• {strength}</div>
            ))}
            <div className="text-xs text-slate-400 mt-2">Areas for Improvement:</div>
            {genome.strengthProfile.areasForImprovement.map((area, idx) => (
              <div key={idx} className="text-xs text-orange-400">• {area}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRippleEffects = (ripple: RippleEffect) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2 text-white">
          <Network className="w-5 h-5 text-[#00F5C4]" />
          Decision Ripple Intelligence™
        </h3>
        <div className="text-right">
          <div className="text-sm text-slate-400">Propagation Speed</div>
          <div className="text-lg font-bold text-white capitalize">{ripple.propagationSpeed}</div>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">Total Impact</h4>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Financial</div>
            <div className="text-xl font-bold text-white">{ripple.totalImpact.financial.toFixed(0)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Operational</div>
            <div className="text-xl font-bold text-white">{ripple.totalImpact.operational.toFixed(0)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Customer</div>
            <div className="text-xl font-bold text-white">{ripple.totalImpact.customer.toFixed(0)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Strategic</div>
            <div className="text-xl font-bold text-white">{ripple.totalImpact.strategic.toFixed(0)}</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">Ripple Path</h4>
        <div className="space-y-3">
          {ripple.ripplePath.map((node, idx) => (
            <div key={node.id} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-bold">
                {idx + 1}
              </div>
              <div className="flex-1 bg-slate-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium">{node.name}</span>
                  <span className={`text-sm ${node.impact.score >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {node.impact.score >= 0 ? '+' : ''}{node.impact.score}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>Onset: {node.timing.onset}h</span>
                  <span>Peak: {node.timing.peak}h</span>
                  <span>Duration: {node.timing.duration}h</span>
                </div>
              </div>
              {idx < ripple.ripplePath.length - 1 && (
                <ArrowRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConsequences = (consequences: DecisionConsequences) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2 text-white">
          <Layers className="w-5 h-5 text-[#00F5C4]" />
          Decision Consequence Engine™
        </h3>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">Total Impact by Timeframe</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-2">Short-term (0-3 months)</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Financial</span>
                <span className="text-white">{consequences.totalImpact.financial.short}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Operational</span>
                <span className="text-white">{consequences.totalImpact.operational.short}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Customer</span>
                <span className="text-white">{consequences.totalImpact.customer.short}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-2">Medium-term (3-12 months)</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Financial</span>
                <span className="text-white">{consequences.totalImpact.financial.medium}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Operational</span>
                <span className="text-white">{consequences.totalImpact.operational.medium}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Customer</span>
                <span className="text-white">{consequences.totalImpact.customer.medium}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-2">Long-term (1-3 years)</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Financial</span>
                <span className="text-white">{consequences.totalImpact.financial.long}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Operational</span>
                <span className="text-white">{consequences.totalImpact.operational.long}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Customer</span>
                <span className="text-white">{consequences.totalImpact.customer.long}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-400 mb-3">First Order Consequences</h4>
          <div className="space-y-2">
            {consequences.firstOrderConsequences.map((consequence) => (
              <div key={consequence.id} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                <div className="text-xs text-slate-400 mb-1">{consequence.category}</div>
                <div className="text-sm text-white mb-2">{consequence.description}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Likelihood: {consequence.likelihood}%</span>
                  <span className="text-slate-400">{consequence.timing.onset}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-400 mb-3">Second Order Consequences</h4>
          <div className="space-y-2">
            {consequences.secondOrderConsequences.slice(0, 3).map((consequence) => (
              <div key={consequence.id} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                <div className="text-xs text-slate-400 mb-1">{consequence.category}</div>
                <div className="text-sm text-white mb-2">{consequence.description}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Likelihood: {consequence.likelihood}%</span>
                  <span className="text-slate-400">{consequence.timing.onset}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-400 mb-3">Third Order Consequences</h4>
          <div className="space-y-2">
            {consequences.thirdOrderConsequences.map((consequence) => (
              <div key={consequence.id} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                <div className="text-xs text-slate-400 mb-1">{consequence.category}</div>
                <div className="text-sm text-white mb-2">{consequence.description}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Likelihood: {consequence.likelihood}%</span>
                  <span className="text-slate-400">{consequence.timing.onset}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHarmony = (harmony: DecisionHarmony) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2 text-white">
          <Activity className="w-5 h-5 text-[#00F5C4]" />
          Decision Harmony™
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#00F5C4]">{harmony.consensus.score}%</div>
          <div className="text-xs text-slate-400">Consensus Score</div>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">Agent Agreement Breakdown</h4>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{harmony.consensus.agreement.strong}</div>
            <div className="text-xs text-slate-400">Strong</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{harmony.consensus.agreement.moderate}</div>
            <div className="text-xs text-slate-400">Moderate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{harmony.consensus.agreement.weak}</div>
            <div className="text-xs text-slate-400">Weak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{harmony.consensus.agreement.conflict}</div>
            <div className="text-xs text-slate-400">Conflict</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">Optimized Recommendation</h4>
        <div className="text-white mb-4">{harmony.optimizedRecommendation.action}</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-xs text-slate-400 mb-2">Supporting Reasons</h5>
            <ul className="space-y-1">
              {harmony.optimizedRecommendation.supportingReasons.map((reason, idx) => (
                <li key={idx} className="text-xs text-slate-300">• {reason}</li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs text-slate-400 mb-2">Expected Benefits</h5>
            <ul className="space-y-1">
              {harmony.optimizedRecommendation.expectedBenefits.map((benefit, idx) => (
                <li key={idx} className="text-xs text-slate-300">
                  <span className="text-[#00F5C4]">{benefit.category}:</span> {benefit.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">Agent Recommendations</h4>
        <div className="space-y-2">
          {harmony.agentRecommendations.map((agent) => (
            <div key={agent.agentId} className="bg-slate-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium capitalize">{agent.agentType}</span>
                <span className="text-sm text-[#00F5C4]">{agent.confidence}%</span>
              </div>
              <div className="text-xs text-slate-300">{agent.recommendation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEvolution = (evolution: DecisionEvolution) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2 text-white">
          <TrendingUp className="w-5 h-5 text-[#00F5C4]" />
          Decision Evolution Engine™
        </h3>
        <div className="text-right">
          <div className="text-sm text-slate-400">Total Iterations</div>
          <div className="text-lg font-bold text-white">{evolution.totalIterations}</div>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">Strategy Evolution</h4>
        <div className="space-y-3">
          {evolution.versions.map((version) => (
            <div key={version.version} className={`rounded-lg p-4 border ${
              version.version === evolution.versions.length 
                ? 'border-[#00F5C4] bg-[#00F5C4]/10' 
                : 'border-slate-700/50 bg-slate-800/50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-white font-bold">{version.name}</div>
                  <div className="text-xs text-slate-400">{version.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#00F5C4]">{version.confidence}%</div>
                  <div className="text-xs text-slate-400">Confidence</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Cost</div>
                  <div className="text-sm text-white">{version.metrics.cost.score}/90</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Resilience</div>
                  <div className="text-sm text-white">{version.metrics.resilience.score}/90</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Customer</div>
                  <div className="text-sm text-white">{version.metrics.customerSatisfaction.score}/95</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">Convergence Metrics</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Improvement Rate</div>
            <div className="text-xl font-bold text-white">{evolution.convergenceMetrics.improvementRate}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Stability Score</div>
            <div className="text-xl font-bold text-white">{evolution.convergenceMetrics.stabilityScore}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Confidence in Optimal</div>
            <div className="text-xl font-bold text-white">{evolution.convergenceMetrics.confidenceInOptimal}%</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDecisionsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Strategic Decisions</h2>
        <button
          onClick={createNewDecision}
          className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          New Decision
        </button>
      </div>

      {selectedDecision ? (
        <div className="space-y-6">
          {/* Decision Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedDecision.title}</h3>
                <p className="text-slate-400">{selectedDecision.description}</p>
              </div>
              <button
                onClick={() => setSelectedDecision(null)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${
                selectedDecision.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                selectedDecision.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {selectedDecision.priority}
              </span>
              <span className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${
                selectedDecision.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                selectedDecision.status === 'analyzing' ? 'bg-blue-500/20 text-blue-400' :
                'bg-slate-500/20 text-slate-400'
              }`}>
                {selectedDecision.status}
              </span>
            </div>
          </motion.div>

          {/* Analysis Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowGenome(!showGenome)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                showGenome 
                  ? 'bg-[#00F5C4] text-slate-900' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Dna className="w-4 h-4 inline mr-2" />
              Genome
            </button>
            <button
              onClick={() => setShowRipple(!showRipple)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                showRipple 
                  ? 'bg-[#00F5C4] text-slate-900' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Network className="w-4 h-4 inline mr-2" />
              Ripple Effects
            </button>
            <button
              onClick={() => setShowConsequences(!showConsequences)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                showConsequences 
                  ? 'bg-[#00F5C4] text-slate-900' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-4 h-4 inline mr-2" />
              Consequences
            </button>
            <button
              onClick={() => setShowHarmony(!showHarmony)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                showHarmony 
                  ? 'bg-[#00F5C4] text-slate-900' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Activity className="w-4 h-4 inline mr-2" />
              Harmony
            </button>
            <button
              onClick={() => setShowEvolution(!showEvolution)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                showEvolution 
                  ? 'bg-[#00F5C4] text-slate-900' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Evolution
            </button>
          </div>

          <AnimatePresence>
            {showGenome && selectedDecision.genome && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
              >
                {renderDecisionGenome(selectedDecision.genome)}
              </motion.div>
            )}
            {showRipple && selectedDecision.rippleEffects && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
              >
                {renderRippleEffects(selectedDecision.rippleEffects)}
              </motion.div>
            )}
            {showConsequences && selectedDecision.consequences && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
              >
                {renderConsequences(selectedDecision.consequences)}
              </motion.div>
            )}
            {showHarmony && selectedDecision.harmony && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
              >
                {renderHarmony(selectedDecision.harmony)}
              </motion.div>
            )}
            {showEvolution && selectedDecision.evolution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
              >
                {renderEvolution(selectedDecision.evolution)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {dashboardData.activeDecisions.length === 0 ? (
            <div className="col-span-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center">
              <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Active Decisions</h3>
              <p className="text-slate-400 mb-4">Create a new strategic decision to begin AI analysis</p>
              <button
                onClick={createNewDecision}
                className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Create First Decision
              </button>
            </div>
          ) : (
            dashboardData.activeDecisions.map((decision) => (
              <motion.div
                key={decision.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedDecision(decision)}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 cursor-pointer hover:border-[#00F5C4] transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{decision.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                    decision.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                    decision.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {decision.priority}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">{decision.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                    decision.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                    decision.status === 'analyzing' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {decision.status}
                  </span>
                  <ArrowRight className="w-5 h-5 text-slate-400" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );

  const renderOpportunitiesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Strategic Opportunities</h2>
        <div className="text-right">
          <div className="text-sm text-slate-400">Total Value</div>
          <div className="text-xl font-bold text-[#00F5C4]">
            ${(dashboardData.opportunities.reduce((sum, opp) => sum + opp.estimatedSavings.amount, 0) / 1000000).toFixed(1)}M
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {dashboardData.opportunities.map((opportunity) => (
          <motion.div
            key={opportunity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 hover:border-[#00F5C4] transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs text-slate-400 capitalize">{opportunity.category.replace('_', ' ')}</span>
                <h3 className="text-lg font-bold text-white">{opportunity.title}</h3>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-[#00F5C4]">
                  ${(opportunity.estimatedSavings.amount / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-slate-400">{opportunity.estimatedSavings.timeframe}</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">{opportunity.description}</p>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Confidence:</span>
                <span className="text-sm text-white font-medium">{opportunity.confidence}%</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                opportunity.implementationComplexity === 'low' ? 'bg-green-500/20 text-green-400' :
                opportunity.implementationComplexity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {opportunity.implementationComplexity}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center">
                <div className="text-xs text-slate-400">Financial</div>
                <div className="text-sm text-white">{opportunity.businessValue.financial}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-400">Operational</div>
                <div className="text-sm text-white">{opportunity.businessValue.operational}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-400">Strategic</div>
                <div className="text-sm text-white">{opportunity.businessValue.strategic}</div>
              </div>
            </div>
            <button className="w-full bg-slate-700/50 hover:bg-slate-700 text-white py-2 rounded-lg text-sm transition">
              View Details
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLearningTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Continuous Learning</h2>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Total Decisions</div>
          <div className="text-2xl font-bold text-white">{dashboardData.learning.totalDecisionsTracked}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Success Rate</div>
          <div className="text-2xl font-bold text-green-400">
            {Math.round((dashboardData.learning.successfulDecisions / dashboardData.learning.totalDecisionsTracked) * 100)}%
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Avg Accuracy</div>
          <div className="text-2xl font-bold text-[#00F5C4]">{dashboardData.learning.averageAccuracy}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Avg Recovery</div>
          <div className="text-2xl font-bold text-white">{dashboardData.learning.averageRecoveryTime}h</div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Award className="w-5 h-5 text-[#00F5C4]" />
          Top Lessons Learned
        </h3>
        <div className="space-y-3">
          {dashboardData.learning.topLessons.map((lesson, idx) => (
            <div key={idx} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-start justify-between mb-2">
                <p className="text-white">{lesson.lesson}</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-slate-400">Applicability: {lesson.applicability}%</span>
                  <span className="text-[#00F5C4]">Impact: {lesson.impact}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 text-white">Learning Timeline</h3>
        <div className="space-y-3">
          {dashboardData.learning.learningTimeline.map((period) => (
            <div key={period.period} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{period.period}</span>
                <div className="flex gap-4 text-sm">
                  <span className="text-slate-400">{period.decisions} decisions</span>
                  <span className="text-[#00F5C4]">{period.accuracy}% accuracy</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {period.keyLearnings.map((learning, idx) => (
                  <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                    {learning}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApprovalsTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Executive Approval Center</h2>

      {dashboardData.pendingApprovals.length === 0 ? (
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center">
          <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Pending Approvals</h3>
          <p className="text-slate-400">All decisions have been processed</p>
        </div>
      ) : (
        <div className="space-y-4">
          {dashboardData.pendingApprovals.map((approval) => (
            <motion.div
              key={approval.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{approval.decision.title}</h3>
                  <p className="text-slate-400 text-sm">{approval.decision.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#00F5C4]">{approval.confidence}%</div>
                  <div className="text-xs text-slate-400">Confidence</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Financial Impact</div>
                  <div className="text-lg font-bold text-white">{approval.businessImpact.financial}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Operational Impact</div>
                  <div className="text-lg font-bold text-white">{approval.businessImpact.operational}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Customer Impact</div>
                  <div className="text-lg font-bold text-white">{approval.businessImpact.customer}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Strategic Impact</div>
                  <div className="text-lg font-bold text-white">{approval.businessImpact.strategic}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="w-4 h-4" />
                  Deadline: {new Date(approval.deadline).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 transition">
                    <ThumbsDown className="w-4 h-4" />
                    Reject
                  </button>
                  <button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 transition">
                    <ThumbsUp className="w-4 h-4" />
                    Approve
                  </button>
                  <button className="bg-[#00F5C4]/20 hover:bg-[#00F5C4]/30 text-[#00F5C4] px-4 py-2 rounded-lg flex items-center gap-2 transition">
                    <Eye className="w-4 h-4" />
                    Review
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
              <Globe className="w-8 h-8 text-[#00F5C4]" />
              GLOBAL AUTONOMOUS SUPPLY CHAIN DECISION FABRIC™
            </h1>
            <p className="text-slate-400 mt-1">Enterprise AI Decision Intelligence Platform</p>
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
        className="flex gap-2 mb-6"
      >
        <button
          onClick={() => setActiveTab('briefing')}
          className={`px-6 py-3 rounded-xl font-medium transition ${
            activeTab === 'briefing'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Brain className="w-4 h-4 inline mr-2" />
          Executive Briefing
        </button>
        <button
          onClick={() => setActiveTab('decisions')}
          className={`px-6 py-3 rounded-xl font-medium transition ${
            activeTab === 'decisions'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Decisions
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-6 py-3 rounded-xl font-medium transition ${
            activeTab === 'opportunities'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Lightbulb className="w-4 h-4 inline mr-2" />
          Opportunities
        </button>
        <button
          onClick={() => setActiveTab('learning')}
          className={`px-6 py-3 rounded-xl font-medium transition ${
            activeTab === 'learning'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Award className="w-4 h-4 inline mr-2" />
          Learning
        </button>
        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-6 py-3 rounded-xl font-medium transition ${
            activeTab === 'approvals'
              ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Shield className="w-4 h-4 inline mr-2" />
          Approvals
        </button>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'briefing' && (
          <motion.div
            key="briefing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderExecutiveBriefing()}
          </motion.div>
        )}
        {activeTab === 'decisions' && (
          <motion.div
            key="decisions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderDecisionsTab()}
          </motion.div>
        )}
        {activeTab === 'opportunities' && (
          <motion.div
            key="opportunities"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderOpportunitiesTab()}
          </motion.div>
        )}
        {activeTab === 'learning' && (
          <motion.div
            key="learning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderLearningTab()}
          </motion.div>
        )}
        {activeTab === 'approvals' && (
          <motion.div
            key="approvals"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderApprovalsTab()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
