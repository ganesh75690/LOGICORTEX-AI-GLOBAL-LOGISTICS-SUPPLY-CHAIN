import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Flame, 
  Droplets, 
  Wind, 
  Zap, 
  Truck, 
  Package, 
  Factory, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Award, 
  Target, 
  Star, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  BarChart3, 
  Calendar, 
  Play, 
  Pause, 
  Shield, 
  BookOpen, 
  Info, 
  Settings, 
  Filter
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { SustainabilityCoach, SustainabilityRecommendation } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 8
 * Sustainability Transformation Coach™ - Continuous sustainability improvement
 */
export const SCEFSustainabilityCoach: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [sustainabilityCoach, setSustainabilityCoach] = useState<SustainabilityCoach | null>(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState<SustainabilityRecommendation | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getSustainabilityCoach();
        setSustainabilityCoach(data);
        if (data.recommendations.length > 0) {
          setSelectedRecommendation(data.recommendations[0]);
        }
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  if (!sustainabilityCoach) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Sustainability Coach...</div>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      energy: Zap,
      packaging: Package,
      carbon: Flame,
      waste: Factory,
      water: Droplets,
      resources: Factory,
      logistics: Truck
    };
    return icons[category] || Leaf;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-400';
      case 'challenging': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-red-500/20 text-red-400';
    }
  };

  const renderRecommendationCard = (rec: SustainabilityRecommendation) => (
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
          {React.createElement(getCategoryIcon(rec.category), { 
            className: 'w-5 h-5 text-emerald-400' 
          })}
          <div>
            <span className="text-sm font-medium text-white capitalize">{rec.category}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(rec.difficulty)}`}>
          {rec.difficulty}
        </span>
      </div>

      <h4 className="text-lg font-bold text-white mb-2">{rec.title}</h4>
      <p className="text-sm text-slate-300 mb-3 line-clamp-2">{rec.description}</p>

      <div className="flex items-center justify-between text-xs mb-3">
        <span className="text-slate-400">Carbon Improvement</span>
        <span className="text-emerald-400">+{rec.futureCarbonScore - rec.currentCarbonScore}%</span>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">{rec.implementation.timeline}</span>
        <span className="text-[#00F5C4]">{rec.expectedROI}</span>
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
          <div className="flex items-center gap-3">
            {React.createElement(getCategoryIcon(selectedRecommendation.category), { 
              className: 'w-8 h-8 text-emerald-400' 
            })}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-slate-400 capitalize">{selectedRecommendation.category}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(selectedRecommendation.difficulty)}`}>
                  {selectedRecommendation.difficulty}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedRecommendation.title}</h3>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#00F5C4]">{selectedRecommendation.expectedROI}</div>
            <div className="text-xs text-slate-400">Expected ROI</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <p className="text-sm text-slate-300 leading-relaxed">{selectedRecommendation.description}</p>
        </div>

        {/* Carbon Score Progress */}
        <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-lg p-4 border border-emerald-500/30 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Carbon Score Improvement</h4>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Current</span>
                <span className="text-sm font-bold text-white">{selectedRecommendation.currentCarbonScore}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${selectedRecommendation.currentCarbonScore}%` }}
                />
              </div>
            </div>
            <ArrowUp className="w-5 h-5 text-emerald-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-400">Future</span>
                <span className="text-sm font-bold text-emerald-400">{selectedRecommendation.futureCarbonScore}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: `${selectedRecommendation.futureCarbonScore}%` }}
                />
              </div>
            </div>
          </div>
          <div className="text-sm text-emerald-400 font-medium">
            +{selectedRecommendation.futureCarbonScore - selectedRecommendation.currentCarbonScore}% improvement
          </div>
        </div>

        {/* Potential Savings */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Potential Savings</h4>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-green-400">
              ${selectedRecommendation.potentialSavings.amount.toLocaleString()}
            </div>
            <div className="text-sm text-slate-400">
              {selectedRecommendation.potentialSavings.currency} • {selectedRecommendation.potentialSavings.timeframe}
            </div>
          </div>
        </div>

        {/* Business Benefits */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3">Business Benefits</h4>
          <ul className="space-y-2">
            {selectedRecommendation.businessBenefits.map((benefit, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Implementation Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Difficulty</div>
            <div className={`text-lg font-bold ${getDifficultyColor(selectedRecommendation.difficulty)}`}>
              {selectedRecommendation.difficulty}
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Timeline</div>
            <div className="text-lg font-bold text-white">{selectedRecommendation.implementation.timeline}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Investment</div>
            <div className="text-lg font-bold text-white">${selectedRecommendation.implementation.investment.toLocaleString()}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">Expected ROI</div>
            <div className="text-lg font-bold text-[#00F5C4]">{selectedRecommendation.expectedROI}</div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-green-400" />
            Environmental Impact
          </h4>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-1">Carbon Reduction</div>
              <div className="text-lg font-bold text-green-400">{selectedRecommendation.environmentalImpact.carbonReduction} kg</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Energy Saving</div>
              <div className="text-lg font-bold text-yellow-400">{selectedRecommendation.environmentalImpact.energySaving} kWh</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Water Saving</div>
              <div className="text-lg font-bold text-blue-400">{selectedRecommendation.environmentalImpact.waterSaving} L</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Waste Reduction</div>
              <div className="text-lg font-bold text-purple-400">{selectedRecommendation.environmentalImpact.wasteReduction} kg</div>
            </div>
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
              <Leaf className="w-8 h-8 text-[#00F5C4]" />
              Sustainability Transformation Coach™
            </h1>
            <p className="text-slate-400 mt-1">Continuous sustainability improvement guidance</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-300">Target: {sustainabilityCoach.targetSustainabilityScore}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current vs Target */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
          <div className="text-sm text-slate-400 mb-2">Current Sustainability Score</div>
          <div className="text-4xl font-bold text-white mb-2">{sustainabilityCoach.currentSustainabilityScore}%</div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: `${sustainabilityCoach.currentSustainabilityScore}%` }}
            />
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6">
          <div className="text-sm text-slate-400 mb-2">Target Sustainability Score</div>
          <div className="text-4xl font-bold text-emerald-400 mb-2">{sustainabilityCoach.targetSustainabilityScore}%</div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-emerald-500 h-3 rounded-full"
              style={{ width: `${sustainabilityCoach.targetSustainabilityScore}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Transformation Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Transformation Progress</h3>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Overall Progress</span>
            <span className="text-sm text-emerald-400">{sustainabilityCoach.transformationProgress.overall}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full"
              style={{ width: `${sustainabilityCoach.transformationProgress.overall}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(sustainabilityCoach.transformationProgress.byCategory).map(([category, progress]) => (
            <div key={category} className="bg-slate-900/50 rounded p-2">
              <div className="text-xs text-slate-400 mb-1 capitalize">{category}</div>
              <div className="text-sm font-bold text-white">{progress}%</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Certifications</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-2">Current Certifications</div>
            <div className="flex flex-wrap gap-2">
              {sustainabilityCoach.certifications.current.map((cert, idx) => (
                <span key={idx} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                  {cert}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-2">Recommended Certifications</div>
            <div className="space-y-2">
              {sustainabilityCoach.certifications.recommended.map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">{cert}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${sustainabilityCoach.certifications.progress[cert] || 0}%` }}
                      />
                    </div>
                    <span className="text-xs text-emerald-400">{sustainabilityCoach.certifications.progress[cert] || 0}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">AI Recommendations</h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-800/50 border border-slate-700/30 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="all">All Categories</option>
              <option value="energy">Energy</option>
              <option value="packaging">Packaging</option>
              <option value="carbon">Carbon</option>
              <option value="waste">Waste</option>
              <option value="water">Water</option>
              <option value="resources">Resources</option>
              <option value="logistics">Logistics</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {sustainabilityCoach.recommendations
            .filter(rec => filterCategory === 'all' || rec.category === filterCategory)
            .map(rec => renderRecommendationCard(rec))}
        </div>
      </motion.div>

      {/* Selected Recommendation Detail */}
      {selectedRecommendation && renderRecommendationDetail()}
    </div>
  );
};
