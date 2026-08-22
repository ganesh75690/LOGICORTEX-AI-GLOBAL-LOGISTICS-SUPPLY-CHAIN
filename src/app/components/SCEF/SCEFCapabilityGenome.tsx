import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dna, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Shield,
  Truck,
  DollarSign,
  Leaf,
  Target,
  Users,
  Zap,
  BarChart3,
  RefreshCw,
  Star,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Gauge,
  Brain,
  CheckCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  Award,
  Flame,
  Cpu,
  Building2,
  HeartHandshake,
  Layers,
  Scale
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { SupplierCapabilityGenome, CapabilityGene } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 3
 * Supplier Capability Genome™ - Flagship innovation with 12-gene analysis
 */
export const SCEFCapabilityGenome: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [genome, setGenome] = useState<SupplierCapabilityGenome | null>(null);
  const [selectedGene, setSelectedGene] = useState<CapabilityGene | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'radial' | 'timeline'>('grid');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getCapabilityGenome();
        setGenome(data);
        setSelectedGene(data.genes[0]);
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  if (!genome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Dna className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Analyzing Capability Genome...</div>
        </div>
      </div>
    );
  }

  const getGeneIcon = (type: string) => {
    const icons: Record<string, any> = {
      quality: Shield,
      delivery: Truck,
      innovation: Lightbulb,
      resilience: Activity,
      scalability: Building2,
      sustainability: Leaf,
      capacity: Target,
      risk: AlertTriangle,
      future_readiness: Brain,
      collaboration: HeartHandshake,
      financial_stability: DollarSign,
      technology_adoption: Cpu
    };
    return icons[type] || Star;
  };

  const getGeneColor = (score: number) => {
    if (score >= 85) return 'from-green-500 to-green-600';
    if (score >= 70) return 'from-blue-500 to-blue-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getGeneTextColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const renderGeneCard = (gene: CapabilityGene) => (
    <motion.div
      key={gene.type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setSelectedGene(gene)}
      className={`bg-slate-800/50 backdrop-blur-xl border-2 rounded-xl p-4 cursor-pointer transition-all ${
        selectedGene?.type === gene.type 
          ? 'border-[#00F5C4] shadow-lg shadow-[#00F5C4]/20' 
          : 'border-slate-700/30 hover:border-slate-600'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {React.createElement(getGeneIcon(gene.type), { 
            className: `w-5 h-5 ${getGeneTextColor(gene.currentScore)}` 
          })}
          <span className="text-sm font-medium text-white">{gene.name}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${
          gene.priorityLevel === 'critical' ? 'bg-red-500/20 text-red-400' :
          gene.priorityLevel === 'high' ? 'bg-orange-500/20 text-orange-400' :
          'bg-yellow-500/20 text-yellow-400'
        }`}>
          {gene.priorityLevel}
        </span>
      </div>
      
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-400">Current Score</span>
          <span className={`text-lg font-bold ${getGeneTextColor(gene.currentScore)}`}>
            {gene.currentScore}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${getGeneColor(gene.currentScore)}`}
            style={{ width: `${gene.currentScore}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-slate-900/50 rounded p-2">
          <div className="text-slate-400 mb-1">Trend</div>
          <div className={`flex items-center gap-1 ${
            gene.historicalTrend.trend === 'improving' ? 'text-green-400' :
            gene.historicalTrend.trend === 'declining' ? 'text-red-400' :
            'text-slate-400'
          }`}>
            {gene.historicalTrend.trend === 'improving' ? <ArrowUp className="w-3 h-3" /> :
             gene.historicalTrend.trend === 'declining' ? <ArrowDown className="w-3 h-3" /> :
             <Activity className="w-3 h-3" />}
            <span className="capitalize">{gene.historicalTrend.trend}</span>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded p-2">
          <div className="text-slate-400 mb-1">Confidence</div>
          <div className="text-white font-medium">{gene.confidence}%</div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Predicted</span>
          <span className={`font-medium ${getGeneTextColor(gene.growthPrediction.predictedScore)}`}>
            {gene.growthPrediction.predictedScore}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const renderGeneDetail = () => {
    if (!selectedGene) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {React.createElement(getGeneIcon(selectedGene.type), { 
              className: `w-8 h-8 ${getGeneTextColor(selectedGene.currentScore)}` 
            })}
            <div>
              <h3 className="text-xl font-bold text-white">{selectedGene.name}</h3>
              <p className="text-sm text-slate-400 capitalize">{selectedGene.type} Gene</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getGeneTextColor(selectedGene.currentScore)}`}>
              {selectedGene.currentScore}
            </div>
            <div className="text-xs text-slate-400">Current Score</div>
          </div>
        </div>

        {/* AI Explanation */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-[#00F5C4]" />
            <span className="text-sm font-semibold text-white">AI Analysis</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{selectedGene.aiExplanation}</p>
        </div>

        {/* Evolution Recommendation */}
        <div className="bg-gradient-to-r from-[#00F5C4]/10 to-[#00D4A8]/10 rounded-lg p-4 border border-[#00F5C4]/30 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-[#00F5C4]" />
            <span className="text-sm font-semibold text-white">Evolution Recommendation</span>
          </div>
          <p className="text-sm text-slate-300">{selectedGene.evolutionRecommendation}</p>
        </div>

        {/* Historical Trend */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Historical Trend</h4>
          <div className="flex items-end gap-2 h-24">
            {selectedGene.historicalTrend.dataPoints.slice(-6).map((point, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div 
                  className={`w-full rounded-t bg-gradient-to-t ${getGeneColor(point.value)}`}
                  style={{ height: `${point.value}%` }}
                />
                <div className="text-xs text-slate-500 mt-1">
                  {new Date(point.date).toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Prediction */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Growth Prediction</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-1">Predicted Score</div>
              <div className={`text-xl font-bold ${getGeneTextColor(selectedGene.growthPrediction.predictedScore)}`}>
                {selectedGene.growthPrediction.predictedScore}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Timeframe</div>
              <div className="text-xl font-bold text-white">{selectedGene.growthPrediction.timeframe}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Confidence</div>
              <div className="text-xl font-bold text-white">{selectedGene.growthPrediction.confidence}%</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Improvement</div>
              <div className={`text-xl font-bold ${
                selectedGene.growthPrediction.predictedScore > selectedGene.currentScore 
                  ? 'text-green-400' 
                  : 'text-red-400'
              }`}>
                {selectedGene.growthPrediction.predictedScore > selectedGene.currentScore ? '+' : ''}
                {selectedGene.growthPrediction.predictedScore - selectedGene.currentScore}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xs text-slate-400 mb-2">Key Drivers</div>
            <div className="flex flex-wrap gap-2">
              {selectedGene.growthPrediction.keyFactors.map((factor, idx) => (
                <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Benchmarks */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Industry Benchmarks</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Top 10%</span>
              <span className="text-sm font-medium text-green-400">{selectedGene.benchmarks.top10Percent}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${selectedGene.benchmarks.top10Percent}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Industry Average</span>
              <span className="text-sm font-medium text-blue-400">{selectedGene.benchmarks.industryAverage}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${selectedGene.benchmarks.industryAverage}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Your Score</span>
              <span className={`text-sm font-medium ${getGeneTextColor(selectedGene.currentScore)}`}>
                {selectedGene.currentScore}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${getGeneColor(selectedGene.currentScore)}`}
                style={{ width: `${selectedGene.currentScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Contributing Factors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-white mb-2">Contributing Factors</h4>
            <ul className="space-y-1">
              {selectedGene.contributingFactors.map((factor, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-white mb-2">Opportunities</h4>
            <ul className="space-y-1">
              {selectedGene.opportunities.map((opportunity, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <Sparkles className="w-3 h-3 text-[#00F5C4] mt-0.5 flex-shrink-0" />
                  {opportunity}
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
              <Dna className="w-8 h-8 text-[#00F5C4]" />
              Supplier Capability Genome™
            </h1>
            <p className="text-slate-400 mt-1">12-gene analysis for comprehensive capability evolution</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <Award className="w-4 h-4 text-[#00F5C4]" />
              <span className="text-sm text-slate-300">Overall: {genome.overallCapabilityScore}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-300 capitalize">{genome.capabilityLevel}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overall Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Overall Score</div>
          <div className="text-2xl font-bold text-[#00F5C4]">{genome.overallCapabilityScore}</div>
          <div className="text-xs text-slate-500">Out of 100</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Capability Level</div>
          <div className="text-2xl font-bold text-white capitalize">{genome.capabilityLevel}</div>
          <div className="text-xs text-slate-500">Current Status</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Industry Position</div>
          <div className="text-2xl font-bold text-purple-400">{genome.industryPosition.percentile}%</div>
          <div className="text-xs text-slate-500">{genome.industryPosition.ranking}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Evolution Potential</div>
          <div className="text-2xl font-bold text-blue-400">{genome.evolutionPotential.overall}%</div>
          <div className="text-xs text-slate-500">Growth Capacity</div>
        </div>
      </motion.div>

      {/* Strength Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-white">Top Strengths</span>
          </div>
          <div className="space-y-1">
            {genome.strengthProfile.topStrengths.map((strength, idx) => (
              <div key={idx} className="text-xs text-green-300 flex items-center gap-2">
                <CheckCircle className="w-3 h-3" />
                {strength}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold text-white">Balanced Genes</span>
          </div>
          <div className="space-y-1">
            {genome.strengthProfile.balancedGenes.map((gene, idx) => (
              <div key={idx} className="text-xs text-yellow-300 flex items-center gap-2">
                <Activity className="w-3 h-3" />
                {gene}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-sm font-semibold text-white">Areas for Improvement</span>
          </div>
          <div className="space-y-1">
            {genome.strengthProfile.areasForImprovement.map((area, idx) => (
              <div key={idx} className="text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Gene Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">12 Capability Genes</h3>
        <div className="grid grid-cols-4 gap-4">
          {genome.genes.map(gene => renderGeneCard(gene))}
        </div>
      </motion.div>

      {/* Selected Gene Detail */}
      {selectedGene && renderGeneDetail()}
    </div>
  );
};
