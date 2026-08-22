import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Rocket, 
  Zap, 
  Brain, 
  Users, 
  DollarSign, 
  BarChart3, 
  Gauge, 
  Star, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Activity, 
  Shield, 
  Truck, 
  Leaf, 
  Building2, 
  Package, 
  Flame, 
  Droplets,
  Factory,
  Clock,
  Calendar,
  Target as TargetIcon
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { SupplierPotentialIndex } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 7
 * Supplier Potential Index™ - Future potential over current performance
 */
export const SCEFPotentialIndex: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [potentialIndex, setPotentialIndex] = useState<SupplierPotentialIndex | null>(null);

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getPotentialIndex();
        setPotentialIndex(data);
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  if (!potentialIndex) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Calculating Potential Index...</div>
        </div>
      </div>
    );
  }

  const renderCapabilityComparison = (label: string, current: number, future: number, icon: any) => (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
      <div className="flex items-center gap-2 mb-3">
        {React.createElement(icon, { className: 'w-4 h-4 text-slate-400' })}
        <span className="text-sm text-slate-400">{label}</span>
      </div>
      <div className="flex items-end justify-between mb-2">
        <div>
          <div className="text-xs text-slate-500">Current</div>
          <div className="text-lg font-bold text-white">{current}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Future</div>
          <div className={`text-lg font-bold ${future > current ? 'text-green-400' : 'text-red-400'}`}>
            {future}
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
        <div 
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${current}%` }}
        />
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${future > current ? 'bg-green-500' : 'bg-red-500'}`}
          style={{ width: `${future}%` }}
        />
      </div>
      <div className={`text-sm font-medium mt-2 ${future > current ? 'text-green-400' : 'text-red-400'}`}>
        {future > current ? '+' : ''}{future - current} improvement
      </div>
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
              <TrendingUp className="w-8 h-8 text-[#00F5C4]" />
              Supplier Potential Index™
            </h1>
            <p className="text-slate-400 mt-1">Future potential over current performance</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Potential: {potentialIndex.improvementPotential.overall}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overall Potential Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Overall Potential Score</h3>
              <p className="text-sm text-slate-400">Your capacity for future growth and improvement</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-purple-400">{potentialIndex.improvementPotential.overall}%</div>
            <div className="text-sm text-slate-400 mt-1">Growth Capacity</div>
          </div>
        </div>
      </motion.div>

      {/* Current vs Future Capability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Current vs Future Capability</h3>
        <div className="grid grid-cols-3 gap-4">
          {renderCapabilityComparison('Quality', potentialIndex.currentCapability.byCategory.quality, potentialIndex.futureCapability.byCategory.quality, Shield)}
          {renderCapabilityComparison('Delivery', potentialIndex.currentCapability.byCategory.delivery, potentialIndex.futureCapability.byCategory.delivery, Truck)}
          {renderCapabilityComparison('Innovation', potentialIndex.currentCapability.byCategory.innovation, potentialIndex.futureCapability.byCategory.innovation, Brain)}
          {renderCapabilityComparison('Resilience', potentialIndex.currentCapability.byCategory.resilience, potentialIndex.futureCapability.byCategory.resilience, Activity)}
          {renderCapabilityComparison('Scalability', potentialIndex.currentCapability.byCategory.scalability, potentialIndex.futureCapability.byCategory.scalability, Building2)}
          {renderCapabilityComparison('Sustainability', potentialIndex.currentCapability.byCategory.sustainability, potentialIndex.futureCapability.byCategory.sustainability, Leaf)}
        </div>
      </motion.div>

      {/* Overall Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-white mb-4">Current Capability</h4>
          <div className="text-4xl font-bold text-white mb-2">{potentialIndex.currentCapability.overall}</div>
          <div className="text-sm text-slate-400">Overall Score</div>
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="text-sm text-slate-400">Capability Level</div>
            <div className="text-lg font-bold text-blue-400 capitalize">{potentialIndex.potentialTrajectory.current}</div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-white mb-4">Future Capability</h4>
          <div className="text-4xl font-bold text-green-400 mb-2">{potentialIndex.futureCapability.overall}</div>
          <div className="text-sm text-slate-400">Overall Score</div>
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="text-sm text-slate-400">Capability Level</div>
            <div className="text-lg font-bold text-green-400 capitalize">{potentialIndex.potentialTrajectory.projected}</div>
          </div>
        </div>
      </motion.div>

      {/* Improvement Potential by Gene */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Improvement Potential by Gene</h3>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(potentialIndex.improvementPotential.byGene).map(([gene, potential]) => (
            <div key={gene} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-1 capitalize">{gene.replace('_', ' ')}</div>
              <div className={`text-2xl font-bold ${potential > 15 ? 'text-green-400' : potential > 10 ? 'text-blue-400' : 'text-yellow-400'}`}>
                {potential}%
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${potential > 15 ? 'bg-green-500' : potential > 10 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                  style={{ width: `${potential}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Business Growth Opportunity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-400" />
          Business Growth Opportunity
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Revenue Potential</div>
            <div className="text-2xl font-bold text-green-400">${(potentialIndex.businessGrowthOpportunity.revenuePotential / 1000).toFixed(0)}K</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Market Expansion</div>
            <div className="text-2xl font-bold text-blue-400">{potentialIndex.businessGrowthOpportunity.marketExpansion}%</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">New Customers</div>
            <div className="text-2xl font-bold text-purple-400">{potentialIndex.businessGrowthOpportunity.newCustomers}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Profitability Improvement</div>
            <div className="text-2xl font-bold text-yellow-400">{potentialIndex.businessGrowthOpportunity.profitabilityImprovement}%</div>
          </div>
        </div>
      </motion.div>

      {/* Long-Term Readiness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-purple-400" />
          Long-Term Readiness
        </h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Overall</div>
            <div className="text-xl font-bold text-white">{potentialIndex.longTermReadiness.score}%</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Innovation</div>
            <div className="text-xl font-bold text-blue-400">{potentialIndex.longTermReadiness.innovationReadiness}%</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Technology</div>
            <div className="text-xl font-bold text-green-400">{potentialIndex.longTermReadiness.technologyReadiness}%</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Market</div>
            <div className="text-xl font-bold text-yellow-400">{potentialIndex.longTermReadiness.marketReadiness}%</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Operational</div>
            <div className="text-xl font-bold text-purple-400">{potentialIndex.longTermReadiness.operationalReadiness}%</div>
          </div>
        </div>
      </motion.div>

      {/* Potential Trajectory */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TargetIcon className="w-5 h-5 text-[#00F5C4]" />
          Potential Trajectory
        </h3>
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="text-sm text-slate-400 mb-2">Current Level</div>
            <div className="text-2xl font-bold text-white capitalize">{potentialIndex.potentialTrajectory.current}</div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <ArrowUp className="w-8 h-8 text-[#00F5C4]" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-slate-400 mb-2">Projected Level</div>
            <div className="text-2xl font-bold text-green-400 capitalize">{potentialIndex.potentialTrajectory.projected}</div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-slate-400 mb-2">Timeframe</div>
            <div className="text-2xl font-bold text-white">{potentialIndex.potentialTrajectory.timeframe}</div>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-sm text-slate-400 mb-2">Key Milestones</div>
          <div className="flex flex-wrap gap-2">
            {potentialIndex.potentialTrajectory.keyMilestones.map((milestone, idx) => (
              <span key={idx} className="text-xs bg-[#00F5C4]/20 text-[#00F5C4] px-3 py-1 rounded-full">
                {milestone}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
