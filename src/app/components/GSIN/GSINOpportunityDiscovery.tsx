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
  Package as PackageIcon, 
  Flame, 
  Building2, 
  Brain, 
  Wrench,
  Globe
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { AIBusinessOpportunityDiscovery } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 13
 * AI Business Opportunity Discovery™ - Continuously discover business opportunities
 */
export const GSINOpportunityDiscovery: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [opportunityDiscovery, setOpportunityDiscovery] = useState<AIBusinessOpportunityDiscovery | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getOpportunityDiscovery();
        setOpportunityDiscovery(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
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
      capacity_expansion: Factory,
      new_product: PackageIcon,
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

  const renderOpportunityCard = (opp: any) => (
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
          {React.createElement(getCategoryIcon(opp.opportunityType), { 
            className: 'w-5 h-5 text-yellow-400' 
          })}
          <div>
            <span className="text-sm font-medium text-white capitalize">{opp.opportunityType.replace('_', ' ')}</span>
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
        <span className="text-slate-400">{opp.opportunityType}</span>
        <span className="text-[#00F5C4]">{opp.confidence}% relevant</span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className={`px-2 py-1 rounded ${opp.implementationDifficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : opp.implementationDifficulty === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-orange-500/20 text-orange-400'}`}>
          {opp.implementationDifficulty}
        </span>
        <span className="text-slate-400">{opp.businessImpact}</span>
      </div>
    </motion.div>
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
              <Lightbulb className="w-8 h-8 text-[#00F5C4]" />
              AI Business Opportunity Discovery™
            </h1>
            <p className="text-slate-400 mt-1">Continuously discover business opportunities and growth potential</p>
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
        className="grid grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Total Opportunities</div>
          <div className="text-2xl font-bold text-white">{opportunityDiscovery.opportunities.length}</div>
        </div>
        <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Quick Wins</div>
          <div className="text-2xl font-bold text-green-400">{opportunityDiscovery.opportunities.filter((o: any) => o.implementationDifficulty === 'Easy').length}</div>
        </div>
        <div className="bg-purple-500/10 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Strategic Bets</div>
          <div className="text-2xl font-bold text-purple-400">{opportunityDiscovery.opportunities.filter((o: any) => o.implementationDifficulty === 'Challenging').length}</div>
        </div>
        <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Discovery Confidence</div>
          <div className="text-2xl font-bold text-blue-400">{opportunityDiscovery.discoveryConfidence}%</div>
        </div>
      </motion.div>

      {/* Discovery Method */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
        transition={{ delay: 0.2 }}
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
              <option value="capacity_expansion">Capacity Expansion</option>
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
              <option value="new_product">New Product</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {opportunityDiscovery.opportunities
            .filter((opp: any) => filterCategory === 'all' || opp.opportunityType === filterCategory)
            .map((opp: any) => renderOpportunityCard(opp))}
        </div>
      </motion.div>

      {/* Selected Opportunity Detail */}
      {selectedOpportunity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              {React.createElement(getCategoryIcon(selectedOpportunity.opportunityType), { 
                className: 'w-8 h-8 text-yellow-400' 
              })}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-400 capitalize">{selectedOpportunity.opportunityType.replace('_', ' ')}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${selectedOpportunity.implementationDifficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : selectedOpportunity.implementationDifficulty === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-orange-500/20 text-orange-400'}`}>
                    {selectedOpportunity.implementationDifficulty}
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

          {/* Business Impact */}
          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30 mb-4">
            <h4 className="text-sm font-semibold text-white mb-3">Business Impact</h4>
            <p className="text-sm text-slate-300">{selectedOpportunity.businessImpact}</p>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-1">Risk Level</div>
              <div className="text-lg font-bold text-white capitalize">{selectedOpportunity.riskLevel}</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-1">Market Potential</div>
              <div className="text-lg font-bold text-green-400">{selectedOpportunity.marketPotential}%</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-1">Competitive Advantage</div>
              <div className="text-lg font-bold text-purple-400">{selectedOpportunity.competitiveAdvantage}</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
