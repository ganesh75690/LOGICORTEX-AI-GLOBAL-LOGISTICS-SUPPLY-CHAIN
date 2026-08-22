import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Brain, 
  Target, 
  Award, 
  Clock, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Lightbulb, 
  ArrowUp, 
  ArrowDown, 
  ArrowRight,
  RefreshCw, 
  Filter, 
  Search, 
  Calendar, 
  Globe, 
  Factory, 
  Package, 
  Truck, 
  DollarSign, 
  Star, 
  Flame, 
  Leaf, 
  Users, 
  Building2,
  PieChart,
  LineChart,
  Dna,
  Route,
  BookOpen,
  Network,
  ShieldCheck,
  Lock,
  Play
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { GSINDigitalTwin } from './GSINDigitalTwin';
import { GSINIntelligenceDNA } from './GSINIntelligenceDNA';
import { GSINKnowledgeExchange } from './GSINKnowledgeExchange';
import { GSINEvolutionMentor } from './GSINEvolutionMentor';
import { GSINFutureSimulator } from './GSINFutureSimulator';
import { GSINSelfHealing } from './GSINSelfHealing';
import { GSINInnovationLab } from './GSINInnovationLab';
import { GSINContinuousLearning } from './GSINContinuousLearning';
import { GSINEvolutionRoadmap } from './GSINEvolutionRoadmap';
import { GSINBenchmark } from './GSINBenchmark';
import { GSINSustainability } from './GSINSustainability';
import { GSINOpportunityDiscovery } from './GSINOpportunityDiscovery';
import { GSINIntelligenceMap } from './GSINIntelligenceMap';
import { GSINDigitalDeliveryPassport } from './GSINDigitalDeliveryPassport';
import { GSINADRE } from './GSINADRE';
import { GSINADCI } from './GSINADCI';
import { GSINTrustPrivacyFabric } from './GSINTrustPrivacyFabric';
import { GSINPrivacyPassport } from './GSINPrivacyPassport';
import { GlobalSupplierCommandCenter } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 1
 * Global Supplier Command Center - Premium enterprise dashboard
 */
export const GSINCommandCenter: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [commandCenter, setCommandCenter] = useState<GlobalSupplierCommandCenter | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'opportunities' | 'risks' | 'growth' | 'digital-twin' | 'intelligence-dna' | 'knowledge-exchange' | 'evolution-mentor' | 'future-simulator' | 'self-healing' | 'innovation-lab' | 'continuous-learning' | 'evolution-roadmap' | 'benchmark' | 'sustainability' | 'opportunity-discovery' | 'intelligence-map' | 'delivery-passport' | 'adre' | 'adci' | 'trust-privacy' | 'privacy-passport'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getCommandCenter();
        setCommandCenter(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!commandCenter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Global Supplier Intelligence Network...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Business Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#00F5C4]" />
          Business Health
        </h3>
        <div className="grid grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Overall</div>
            <div className="text-2xl font-bold text-white">{commandCenter.businessHealth.overallScore}</div>
            <div className={`text-xs mt-1 ${commandCenter.businessHealth.trend === 'improving' ? 'text-green-400' : commandCenter.businessHealth.trend === 'declining' ? 'text-red-400' : 'text-slate-400'}`}>
              {commandCenter.businessHealth.trend === 'improving' ? <ArrowUp className="w-3 h-3 inline" /> : commandCenter.businessHealth.trend === 'declining' ? <ArrowDown className="w-3 h-3 inline" /> : null}
              {commandCenter.businessHealth.trend}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Financial</div>
            <div className="text-2xl font-bold text-green-400">{commandCenter.businessHealth.financialHealth}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Operational</div>
            <div className="text-2xl font-bold text-blue-400">{commandCenter.businessHealth.operationalHealth}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Quality</div>
            <div className="text-2xl font-bold text-purple-400">{commandCenter.businessHealth.qualityHealth}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Delivery</div>
            <div className="text-2xl font-bold text-yellow-400">{commandCenter.businessHealth.deliveryHealth}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Sustainability</div>
            <div className="text-2xl font-bold text-emerald-400">{commandCenter.businessHealth.sustainabilityHealth}</div>
          </div>
        </div>
      </motion.div>

      {/* Intelligence Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#00F5C4]/20 to-[#00D4A8]/20 border border-[#00F5C4]/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#00F5C4]" />
              Supplier Intelligence Score
            </h3>
            <div className="flex items-center gap-8">
              <div>
                <div className="text-sm text-slate-400">Current Score</div>
                <div className="text-3xl font-bold text-[#00F5C4]">{commandCenter.intelligenceScore.currentScore}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Potential Score</div>
                <div className="text-3xl font-bold text-green-400">{commandCenter.intelligenceScore.potentialScore}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Improvement Rate</div>
                <div className="text-3xl font-bold text-blue-400">+{commandCenter.intelligenceScore.improvementRate}%</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Percentile Rank</div>
                <div className="text-3xl font-bold text-purple-400">{commandCenter.intelligenceScore.percentileRank}%</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Industry Benchmark</div>
            <div className="text-2xl font-bold text-white">{commandCenter.intelligenceScore.industryBenchmark}</div>
          </div>
        </div>
      </motion.div>

      {/* Innovation Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Innovation Score
        </h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Current Level</div>
            <div className="text-2xl font-bold text-white">{commandCenter.innovationScore.currentLevel}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Innovation Rate</div>
            <div className="text-2xl font-bold text-yellow-400">{commandCenter.innovationScore.innovationRate}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Patents</div>
            <div className="text-2xl font-bold text-purple-400">{commandCenter.innovationScore.patents}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Process Improvements</div>
            <div className="text-2xl font-bold text-blue-400">{commandCenter.innovationScore.processImprovements}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Technology Adoption</div>
            <div className="text-2xl font-bold text-green-400">{commandCenter.innovationScore.technologyAdoption}%</div>
          </div>
        </div>
      </motion.div>

      {/* Future Readiness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#00F5C4]" />
          Future Readiness
        </h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Technology</div>
            <div className="text-2xl font-bold text-blue-400">{commandCenter.futureReadiness.technologyReadiness}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Market</div>
            <div className="text-2xl font-bold text-green-400">{commandCenter.futureReadiness.marketReadiness}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Capability</div>
            <div className="text-2xl font-bold text-purple-400">{commandCenter.futureReadiness.capabilityReadiness}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Sustainability</div>
            <div className="text-2xl font-bold text-emerald-400">{commandCenter.futureReadiness.sustainabilityReadiness}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Overall</div>
            <div className="text-2xl font-bold text-[#00F5C4]">{commandCenter.futureReadiness.overallReadiness}</div>
          </div>
        </div>
      </motion.div>

      {/* Evolution Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Evolution Status
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900/50 rounded-lg px-4 py-2">
              <div className="text-xs text-slate-400 mb-1">Current Phase</div>
              <div className="text-lg font-bold text-white">{commandCenter.evolutionStatus.currentPhase}</div>
            </div>
            <ArrowRight className="w-6 h-6 text-purple-400" />
            <div className="bg-slate-900/50 rounded-lg px-4 py-2">
              <div className="text-xs text-slate-400 mb-1">Next Phase</div>
              <div className="text-lg font-bold text-green-400">{commandCenter.evolutionStatus.nextPhase}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Progress</div>
            <div className="text-2xl font-bold text-white">{commandCenter.evolutionStatus.progress}%</div>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${commandCenter.evolutionStatus.progress}%` }}
          />
        </div>
      </motion.div>

      {/* AI Executive Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#00F5C4]" />
          AI Executive Summary
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-slate-400 mb-2">Overall Assessment</div>
            <p className="text-sm text-slate-300 leading-relaxed">{commandCenter.executiveSummary.overallAssessment}</p>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-2">Evolution Path</div>
            <p className="text-sm text-slate-300 leading-relaxed">{commandCenter.executiveSummary.evolutionPath}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <div className="text-sm text-green-400 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Key Strengths
            </div>
            <ul className="space-y-1">
              {commandCenter.executiveSummary.keyStrengths.map((strength, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm text-yellow-400 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Key Opportunities
            </div>
            <ul className="space-y-1">
              {commandCenter.executiveSummary.keyOpportunities.map((opportunity, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                  <Lightbulb className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                  {opportunity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Today's AI Recommendations</h3>
      {commandCenter.recommendations.map((rec, idx) => (
        <motion.div
          key={rec.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                rec.priority === 'Critical' ? 'bg-red-500/20' : rec.priority === 'High' ? 'bg-orange-500/20' : 'bg-blue-500/20'
              }`}>
                {rec.priority === 'Critical' ? <AlertTriangle className="w-6 h-6 text-red-400" /> : 
                 rec.priority === 'High' ? <Zap className="w-6 h-6 text-orange-400" /> : 
                 <Lightbulb className="w-6 h-6 text-blue-400" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.category === 'Operational' ? 'bg-blue-500/20 text-blue-400' :
                    rec.category === 'Quality' ? 'bg-purple-500/20 text-purple-400' :
                    rec.category === 'Sustainability' ? 'bg-green-500/20 text-green-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {rec.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    rec.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">{rec.title}</h4>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#00F5C4]">{rec.confidence}%</div>
              <div className="text-xs text-slate-400">Confidence</div>
            </div>
          </div>
          <p className="text-sm text-slate-300 mb-4">{rec.description}</p>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Business Value</div>
              <div className="text-sm font-bold text-white">{rec.businessValue}</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">ROI</div>
              <div className="text-sm font-bold text-green-400">{rec.roi}</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Expected Growth</div>
              <div className="text-sm font-bold text-blue-400">+{rec.expectedGrowth}%</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Timeline</div>
              <div className="text-sm font-bold text-white">{rec.timeline}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderOpportunities = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Growth Opportunities</h3>
      {commandCenter.growthOpportunities.map((opp, idx) => (
        <motion.div
          key={opp.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">{opp.title}</h4>
              <p className="text-sm text-slate-300">{opp.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">${(opp.potentialValue / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-slate-400">Potential Value</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-900/50 rounded-lg px-3 py-2">
              <div className="text-xs text-slate-400">Complexity</div>
              <div className="text-sm font-bold text-white">{opp.implementationComplexity}/10</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg px-3 py-2">
              <div className="text-xs text-slate-400">Risk Level</div>
              <div className={`text-sm font-bold ${opp.riskLevel === 'Low' ? 'text-green-400' : opp.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                {opp.riskLevel}
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg px-3 py-2">
              <div className="text-xs text-slate-400">Category</div>
              <div className="text-sm font-bold text-white">{opp.category}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderRisks = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Business Risks</h3>
      {commandCenter.businessRisks.map((risk, idx) => (
        <motion.div
          key={risk.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                risk.severity === 'Critical' ? 'bg-red-500/20' : risk.severity === 'High' ? 'bg-orange-500/20' : 'bg-yellow-500/20'
              }`}>
                <AlertTriangle className={`w-6 h-6 ${
                  risk.severity === 'Critical' ? 'text-red-400' : risk.severity === 'High' ? 'text-orange-400' : 'text-yellow-400'
                }`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    risk.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    risk.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {risk.severity}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-slate-500/20 text-slate-400">
                    {risk.type}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">{risk.description}</h4>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-400">{risk.probability}%</div>
              <div className="text-xs text-slate-400">Probability</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Impact</div>
              <div className="text-sm font-bold text-white">{risk.impact}/10</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Time to Occur</div>
              <div className="text-sm font-bold text-white">{risk.timeToOccur}</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Mitigation</div>
              <div className="text-sm font-bold text-green-400">{risk.mitigationStrategy}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderGrowth = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white mb-4">Capability Growth</h3>
      {commandCenter.capabilityGrowth.map((growth, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">{growth.area}</h4>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-xs text-slate-400">Current</div>
                  <div className="text-xl font-bold text-white">{growth.currentLevel}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#00F5C4]" />
                <div>
                  <div className="text-xs text-slate-400">Target</div>
                  <div className="text-xl font-bold text-green-400">{growth.targetLevel}</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#00F5C4]">+{growth.growthRate}%</div>
              <div className="text-xs text-slate-400">Growth Rate</div>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-3 rounded-full transition-all duration-500"
              style={{ width: `${((growth.currentLevel / growth.targetLevel) * 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 mb-2">Achievements</div>
              <div className="flex flex-wrap gap-2">
                {growth.achievements.map((achievement, aIdx) => (
                  <span key={aIdx} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Time to Target</div>
              <div className="text-sm font-bold text-white">{growth.timeToTarget}</div>
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
              <Globe className="w-8 h-8 text-[#00F5C4]" />
              GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™)
            </h1>
            <p className="text-slate-400 mt-1">AI-powered supplier intelligence and evolution platform</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Intelligence Score: {commandCenter.intelligenceScore.currentScore}</span>
            </div>
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
          { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
          { id: 'opportunities', label: 'Opportunities', icon: TrendingUp },
          { id: 'risks', label: 'Risks', icon: AlertTriangle },
          { id: 'growth', label: 'Growth', icon: Activity },
          { id: 'digital-twin', label: 'Digital Twin', icon: Factory },
          { id: 'intelligence-dna', label: 'Intelligence DNA', icon: Dna },
          { id: 'knowledge-exchange', label: 'Knowledge Exchange', icon: Globe },
          { id: 'evolution-mentor', label: 'Evolution Mentor', icon: Brain },
          { id: 'future-simulator', label: 'Future Simulator', icon: Play },
          { id: 'self-healing', label: 'Self-Healing', icon: Shield },
          { id: 'innovation-lab', label: 'Innovation Lab', icon: Lightbulb },
          { id: 'continuous-learning', label: 'Continuous Learning', icon: BookOpen },
          { id: 'evolution-roadmap', label: 'Evolution Roadmap', icon: Route },
          { id: 'benchmark', label: 'Benchmark', icon: BarChart3 },
          { id: 'sustainability', label: 'Sustainability', icon: Leaf },
          { id: 'opportunity-discovery', label: 'Opportunity Discovery', icon: DollarSign },
          { id: 'intelligence-map', label: 'Intelligence Map', icon: Network },
          { id: 'delivery-passport', label: 'Delivery Passport', icon: ShieldCheck },
          { id: 'adre', label: 'ADRE™', icon: Activity },
          { id: 'adci', label: 'ADCI™', icon: ShieldCheck },
          { id: 'trust-privacy', label: 'Trust & Privacy', icon: Shield },
          { id: 'privacy-passport', label: 'Privacy Passport', icon: Lock }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
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
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderOverview()}
          </motion.div>
        )}
        {activeTab === 'recommendations' && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderRecommendations()}
          </motion.div>
        )}
        {activeTab === 'opportunities' && (
          <motion.div
            key="opportunities"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderOpportunities()}
          </motion.div>
        )}
        {activeTab === 'risks' && (
          <motion.div
            key="risks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderRisks()}
          </motion.div>
        )}
        {activeTab === 'growth' && (
          <motion.div
            key="growth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderGrowth()}
          </motion.div>
        )}
        {activeTab === 'digital-twin' && (
          <motion.div
            key="digital-twin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINDigitalTwin />
          </motion.div>
        )}
        {activeTab === 'intelligence-dna' && (
          <motion.div
            key="intelligence-dna"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINIntelligenceDNA />
          </motion.div>
        )}
        {activeTab === 'knowledge-exchange' && (
          <motion.div
            key="knowledge-exchange"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINKnowledgeExchange />
          </motion.div>
        )}
        {activeTab === 'evolution-mentor' && (
          <motion.div
            key="evolution-mentor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINEvolutionMentor />
          </motion.div>
        )}
        {activeTab === 'future-simulator' && (
          <motion.div
            key="future-simulator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINFutureSimulator />
          </motion.div>
        )}
        {activeTab === 'self-healing' && (
          <motion.div
            key="self-healing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINSelfHealing />
          </motion.div>
        )}
        {activeTab === 'innovation-lab' && (
          <motion.div
            key="innovation-lab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINInnovationLab />
          </motion.div>
        )}
        {activeTab === 'continuous-learning' && (
          <motion.div
            key="continuous-learning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINContinuousLearning />
          </motion.div>
        )}
        {activeTab === 'evolution-roadmap' && (
          <motion.div
            key="evolution-roadmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINEvolutionRoadmap />
          </motion.div>
        )}
        {activeTab === 'benchmark' && (
          <motion.div
            key="benchmark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINBenchmark />
          </motion.div>
        )}
        {activeTab === 'sustainability' && (
          <motion.div
            key="sustainability"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINSustainability />
          </motion.div>
        )}
        {activeTab === 'opportunity-discovery' && (
          <motion.div
            key="opportunity-discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINOpportunityDiscovery />
          </motion.div>
        )}
        {activeTab === 'intelligence-map' && (
          <motion.div
            key="intelligence-map"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINIntelligenceMap />
          </motion.div>
        )}
        {activeTab === 'delivery-passport' && (
          <motion.div
            key="delivery-passport"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINDigitalDeliveryPassport />
          </motion.div>
        )}
        {activeTab === 'adre' && (
          <motion.div
            key="adre"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINADRE />
          </motion.div>
        )}
        {activeTab === 'adci' && (
          <motion.div
            key="adci"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINADCI />
          </motion.div>
        )}
        {activeTab === 'trust-privacy' && (
          <motion.div
            key="trust-privacy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINTrustPrivacyFabric />
          </motion.div>
        )}
        {activeTab === 'privacy-passport' && (
          <motion.div
            key="privacy-passport"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GSINPrivacyPassport />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
