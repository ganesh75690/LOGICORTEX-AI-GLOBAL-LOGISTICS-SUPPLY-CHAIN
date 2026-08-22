import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Globe, 
  TrendingUp, 
  Target, 
  Award, 
  Star, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Shield, 
  Activity, 
  Zap, 
  Users, 
  Factory, 
  Truck, 
  Package, 
  Flame, 
  Building2, 
  Brain, 
  Wrench,
  DollarSign,
  Leaf,
  PieChart,
  LineChart
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { SupplierBenchmark } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 12
 * Global Benchmark Engine™ - Industry benchmark comparison
 */
export const SCEFBenchmark: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [benchmark, setBenchmark] = useState<SupplierBenchmark | null>(null);
  const [selectedGene, setSelectedGene] = useState<string>('quality');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getBenchmark();
        setBenchmark(data);
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  if (!benchmark) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Analyzing Industry Benchmarks...</div>
        </div>
      </div>
    );
  }

  const genes = Object.keys(benchmark.currentPosition.byGene) as Array<keyof typeof benchmark.currentPosition.byGene>;

  const renderBenchmarkCard = (gene: string) => {
    const data = benchmark.currentPosition.byGene[gene];
    const gap = data.gapToTop;
    
    return (
      <motion.div
        key={gene}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedGene(gene)}
        className={`bg-slate-800/50 backdrop-blur-xl border-2 rounded-xl p-4 cursor-pointer transition-all ${
          selectedGene === gene 
            ? 'border-[#00F5C4] shadow-lg shadow-[#00F5C4]/20' 
            : 'border-slate-700/30 hover:border-slate-600'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white capitalize">{gene.replace('_', ' ')}</span>
          <span className="text-xs text-slate-400">{data.percentile}% percentile</span>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Your Score</span>
            <span className="text-white font-medium">{data.current}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${data.current}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Top 10%</span>
            <span className="text-green-400 font-medium">{benchmark.industryBenchmarks.metrics[gene as keyof typeof benchmark.industryBenchmarks.metrics]?.top10Percent || 0}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${benchmark.industryBenchmarks.metrics[gene as keyof typeof benchmark.industryBenchmarks.metrics]?.top10Percent || 0}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Gap to Top</span>
          <span className={`font-medium ${gap > 20 ? 'text-red-400' : gap > 10 ? 'text-yellow-400' : 'text-green-400'}`}>
            {gap}%
          </span>
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
              <BarChart3 className="w-8 h-8 text-[#00F5C4]" />
              Global Benchmark Engine™
            </h1>
            <p className="text-slate-400 mt-1">Industry benchmark comparison and improvement analysis</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">{benchmark.industryBenchmarks.industry}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overall Position */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
          <div className="text-sm text-slate-400 mb-2">Overall Position</div>
          <div className="text-4xl font-bold text-white">{benchmark.currentPosition.overall}%</div>
          <div className="text-sm text-slate-400 mt-1">Percentile</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
          <div className="text-sm text-slate-400 mb-2">Competitive Tier</div>
          <div className="text-2xl font-bold text-purple-400">{benchmark.competitivePosition.tier}</div>
          <div className="text-sm text-slate-400 mt-1">{benchmark.competitivePosition.ranking}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
          <div className="text-sm text-slate-400 mb-2">Improvement Gap</div>
          <div className="text-4xl font-bold text-orange-400">{benchmark.improvementGap.overall}%</div>
          <div className="text-sm text-slate-400 mt-1">To Top 10%</div>
        </div>
      </motion.div>

      {/* Competitive Position */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Competitive Position Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-2">Advantages</div>
            <ul className="space-y-2">
              {benchmark.competitivePosition.advantages.map((advantage, idx) => (
                <li key={idx} className="text-sm text-green-300 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {advantage}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-2">Areas for Improvement</div>
            <ul className="space-y-2">
              {benchmark.competitivePosition.disadvantages.map((disadvantage, idx) => (
                <li key={idx} className="text-sm text-red-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {disadvantage}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Potential Business Growth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Potential Business Growth at Different Performance Levels
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">If Top 10%</div>
            <div className="text-2xl font-bold text-green-400">+{benchmark.potentialBusinessGrowth.ifTop10Percent}%</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">If Top 25%</div>
            <div className="text-2xl font-bold text-blue-400">+{benchmark.potentialBusinessGrowth.ifTop25Percent}%</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">If Median</div>
            <div className="text-2xl font-bold text-yellow-400">+{benchmark.potentialBusinessGrowth.ifMedian}%</div>
          </div>
        </div>
      </motion.div>

      {/* Gene-wise Benchmarks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Capability Benchmarks by Gene</h3>
        <div className="grid grid-cols-4 gap-4">
          {genes.map(gene => renderBenchmarkCard(gene))}
        </div>
      </motion.div>

      {/* Recommended Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Recommended Improvement Actions</h3>
        <div className="space-y-3">
          {benchmark.recommendedActions.map((action, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center text-slate-900 font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white capitalize mb-1">{action.gene.replace('_', ' ')}</div>
                <div className="text-sm text-slate-400 mb-2">Focus on:</div>
                <ul className="space-y-1">
                  {action.actions.map((act, aIdx) => (
                    <li key={aIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-[#00F5C4] mt-0.5 flex-shrink-0" />
                      {act}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400 mb-1">Expected Improvement</div>
                <div className="text-2xl font-bold text-green-400">+{action.expectedImprovement}%</div>
                <div className="text-xs text-slate-400 mt-1">{action.timeline}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
