import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Star, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  Filter, 
  Search, 
  Award, 
  BarChart3, 
  Calendar, 
  ArrowUp, 
  ArrowDown, 
  Activity, 
  Zap, 
  Shield, 
  Users, 
  Factory, 
  Truck, 
  Package, 
  Flame, 
  Building2, 
  Brain, 
  Wrench,
  Globe
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { OpportunityDiscovery, BusinessOpportunity } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 11
 * AI Business Opportunity Discovery™ - Continuous opportunity scanning
 */
export const SCEFOpportunityDiscovery: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [opportunityDiscovery, setOpportunityDiscovery] = useState<OpportunityDiscovery | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<BusinessOpportunity | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getOpportunityDiscovery();
        setOpportunityDiscovery(data);
        if (data.opportunities.length > 0) {
          setSelectedOpportunity(data.opportunities[0]);
        }
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  if (!opportunityDiscovery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Lightbulb className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Scanning for Opportunities...</div>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      production_expansion: Factory,
      new_product: Package,
      waste_reduction: Flame,
      delivery_optimization: Truck,
      capacity_increase: Activity,
      resource_allocation: Users,
      supplier_collaboration: Globe,
      warehouse_optimization: Building2,
      technology_upgrade: Brain,
      market_expansion: TrendingUp,
      process_improvement: Wrench,
      cost_reduction: DollarSign
    };
    return icons[category] || Lightbulb;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-400';
      case 'challenging': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-red-500/20 text-red-400';
    }
  };

  const renderOpportunityCard = (opp: BusinessOpportunity) => (
    <motion.div
      key={opp.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedOpportunity(opp)}
      className={`bg-slate-800/50 backdrop-blur-xl border-2 rounded-xl p-4 cursor-pointer transition-all ${
        selectedOpportunity?.id === opp.id 
          ? 'border-[#00F5C4] shadow-lg shadow-[#00F5C4]/20' 
          : 'border-slate-700/30 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {React.createElement(getCategoryIcon(opp.category), { 
            className: 'w-5 h-5 text-yellow-400' 
          })}
          <div>
            <span className="text-sm font-medium text-white capitalize">{opp.category.replace('_', ' ')}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-[#00F5C4]">{opp.confidence}%</div>
          <div className="text-xs text-slate-400">Confidence</div>
        </div>
      </div>

      <h4 className="text-lg font-bold text-white mb-2">{opp.title}</h4>
      <p className="text-sm text-slate-300 mb-3 line-clamp-2">{opp.description}</p>

      <div className="flex items-center justify-between text-xs mb-3">
        <span className={`px-2 py-1 rounded ${getDifficultyColor(opp.difficulty)}`}>
          {opp.difficulty}
        </span>
        <span className="text-slate-400">{opp.expectedROI}</span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">
          ${opp.implementation.investment.toLocaleString()} investment
        </span>
        <span className="text-green-400">
          ${opp.expectedBusinessValue.financial.toLocaleString()} value
        </span>
      </div>
    </motion.div>
  );

  const renderOpportunityDetail = () => {
    if (!selectedOpportunity) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {React.createElement(getCategoryIcon(selectedOpportunity.category), { 
              className: 'w-8 h-8 text-yellow-400' 
            })}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-slate-400 capitalize">{selectedOpportunity.category.replace('_', ' ')}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(selectedOpportunity.difficulty)}`}>
                  {selectedOpportunity.difficulty}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedOpportunity.title}</h3>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#00F5C4]">{selectedOpportunity.confidence}%</div>
            <div className="text-xs text-slate-400">Confidence</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <p className="text-sm text-slate-300 leading-relaxed">{selectedOpportunity.description}</p>
        </div>

        {/* Business Value */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 border border-yellow-500/30 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Expected Business Value</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-1">Financial</div>
              <div className="text-xl font-bold text-green-400">${selectedOpportunity.expectedBusinessValue.financial.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Operational</div>
              <div className="text-xl font-bold text-blue-400">{selectedOpportunity.expectedBusinessValue.operational}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Strategic</div>
              <div className="text-xl font-bold text-purple-400">{selectedOpportunity.expectedBusinessValue.strategic}</div>
            </div>
          </div>
        </div>

        {/* Implementation Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Complexity</div>
            <div className="text-lg font-bold text-white capitalize">{selectedOpportunity.implementation.complexity}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Timeline</div>
            <div className="text-lg font-bold text-white">{selectedOpportunity.implementation.timeline}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Investment</div>
            <div className="text-lg font-bold text-white">${selectedOpportunity.implementation.investment.toLocaleString()}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Expected ROI</div>
            <div className="text-lg font-bold text-[#00F5C4]">{selectedOpportunity.expectedROI}</div>
          </div>
        </div>

        {/* Business Impact */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Business Impact</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-2">Positive</div>
              <ul className="space-y-1">
                {selectedOpportunity.businessImpact.positive.map((impact, idx) => (
                  <li key={idx} className="text-xs text-green-300 flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    {impact}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-2">Negative</div>
              <ul className="space-y-1">
                {selectedOpportunity.businessImpact.negative.map((impact, idx) => (
                  <li key={idx} className="text-xs text-red-300 flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    {impact}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-2">Neutral</div>
              <ul className="space-y-1">
                {selectedOpportunity.businessImpact.neutral.map((impact, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <Activity className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    {impact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Required Resources</h4>
          <div className="flex flex-wrap gap-2">
            {selectedOpportunity.implementation.resources.map((resource, idx) => (
              <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                {resource}
              </span>
            ))}
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            Risk Factors
          </h4>
          <ul className="space-y-2">
            {selectedOpportunity.riskFactors.map((risk, idx) => (
              <li key={idx} className="text-sm text-red-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {risk}
              </li>
            ))}
          </ul>
        </div>

        {/* Success Factors */}
        <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Success Factors
          </h4>
          <ul className="space-y-2">
            {selectedOpportunity.successFactors.map((factor, idx) => (
              <li key={idx} className="text-sm text-green-300 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {factor}
              </li>
            ))}
          </ul>
        </div>

        {/* Dependencies */}
        {selectedOpportunity.dependencies.length > 0 && (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-white mb-2">Dependencies</h4>
            <div className="flex flex-wrap gap-2">
              {selectedOpportunity.dependencies.map((dep, idx) => (
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
              <Lightbulb className="w-8 h-8 text-[#00F5C4]" />
              AI Business Opportunity Discovery™
            </h1>
            <p className="text-slate-400 mt-1">Continuous opportunity scanning and analysis</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Total Value: ${opportunityDiscovery.totalEstimatedValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Discovery Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Total Opportunities</div>
          <div className="text-2xl font-bold text-white">{opportunityDiscovery.opportunities.length}</div>
        </div>
        <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Quick Wins</div>
          <div className="text-2xl font-bold text-green-400">{opportunityDiscovery.opportunities.filter(o => o.difficulty === 'easy').length}</div>
        </div>
        <div className="bg-purple-500/10 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Strategic Bets</div>
          <div className="text-2xl font-bold text-purple-400">{opportunityDiscovery.opportunities.filter(o => o.difficulty === 'challenging').length}</div>
        </div>
        <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Discovery Confidence</div>
          <div className="text-2xl font-bold text-blue-400">{opportunityDiscovery.confidence}%</div>
        </div>
      </motion.div>

      {/* Discovery Method */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Discovery Method</h3>
              <p className="text-sm text-slate-400">{opportunityDiscovery.discoveryMethod}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Discovered Opportunities</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-800/50 border border-slate-700/30 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="all">All Categories</option>
              <option value="production_expansion">Production Expansion</option>
              <option value="new_product">New Product</option>
              <option value="waste_reduction">Waste Reduction</option>
              <option value="delivery_optimization">Delivery Optimization</option>
              <option value="capacity_increase">Capacity Increase</option>
              <option value="resource_allocation">Resource Allocation</option>
              <option value="supplier_collaboration">Supplier Collaboration</option>
              <option value="warehouse_optimization">Warehouse Optimization</option>
              <option value="technology_upgrade">Technology Upgrade</option>
              <option value="market_expansion">Market Expansion</option>
              <option value="process_improvement">Process Improvement</option>
              <option value="cost_reduction">Cost Reduction</option>
            </select>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="bg-slate-800/50 border border-slate-700/30 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="challenging">Challenging</option>
              <option value="complex">Complex</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {opportunityDiscovery.opportunities
            .filter(opp => filterCategory === 'all' || opp.category === filterCategory)
            .filter(opp => filterDifficulty === 'all' || opp.difficulty === filterDifficulty)
            .map(opp => renderOpportunityCard(opp))}
        </div>
      </motion.div>

      {/* Selected Opportunity Detail */}
      {selectedOpportunity && renderOpportunityDetail()}
    </div>
  );
};
