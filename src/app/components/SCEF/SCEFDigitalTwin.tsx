import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Gauge,
  Zap,
  Shield,
  DollarSign,
  Truck,
  Users,
  Factory,
  Leaf,
  Clock,
  RefreshCw,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  BarChart3,
  LineChart as LineChartIcon,
  Target,
  Star,
  Sparkles,
  Brain,
  Cpu,
  Wrench,
  Package,
  Layers,
  Flame,
  Droplets,
  Wind,
  Heart,
  Scale
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { SupplierDigitalTwin } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 2
 * Supplier Digital Twin™ - Living AI Digital Twin for suppliers
 */
export const SCEFDigitalTwin: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [digitalTwin, setDigitalTwin] = useState<SupplierDigitalTwin | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'capacity' | 'quality' | 'inventory' | 'manufacturing' | 'delivery' | 'financial' | 'risk' | 'sustainability' | 'efficiency' | 'machine' | 'employee' | 'supply'>('capacity');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getDigitalTwin();
        setDigitalTwin(data);
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      if (engineRef.current) {
        const data = engineRef.current.getDigitalTwin();
        setDigitalTwin(data);
      }
    }, 5000); // Update every 5 seconds when live

    return () => clearInterval(interval);
  }, [isLive]);

  if (!digitalTwin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Globe className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Digital Twin...</div>
        </div>
      </div>
    );
  }

  const renderMetricCard = (title: string, value: number, icon: any, color: string, suffix: string = '') => (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {React.createElement(icon, { className: `w-5 h-5 ${color}` })}
          <span className="text-sm text-slate-400">{title}</span>
        </div>
        <span className={`text-xs ${value >= 80 ? 'text-green-400' : value >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
          {value >= 80 ? 'Excellent' : value >= 60 ? 'Good' : 'Needs Attention'}
        </span>
      </div>
      <div className="text-2xl font-bold text-white">
        {value}{suffix}
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
        <div 
          className={`h-2 rounded-full transition-all ${color.replace('text-', 'bg-')}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );

  const renderCapacitySection = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Factory className="w-6 h-6 text-blue-400" />
          Production Capacity
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {renderMetricCard('Current Output', digitalTwin.realTimeData.productionCapacity.current, Activity, 'text-blue-400')}
          {renderMetricCard('Maximum Capacity', digitalTwin.realTimeData.productionCapacity.maximum, Target, 'text-purple-400')}
          {renderMetricCard('Utilization', digitalTwin.realTimeData.productionCapacity.utilization, Gauge, 'text-green-400', '%')}
          {renderMetricCard('Efficiency', digitalTwin.realTimeData.productionCapacity.efficiency, Zap, 'text-yellow-400', '%')}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h4 className="text-lg font-bold text-white mb-4">Capacity Optimization Insights</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-1">Utilization Status</div>
            <div className={`text-lg font-bold ${digitalTwin.realTimeData.productionCapacity.utilization > 85 ? 'text-yellow-400' : 'text-green-400'}`}>
              {digitalTwin.realTimeData.productionCapacity.utilization > 85 ? 'Near Saturation' : 'Healthy'}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {digitalTwin.realTimeData.productionCapacity.utilization > 85 
                ? 'Consider capacity expansion' 
                : 'Optimal utilization level'}
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-1">Efficiency Rating</div>
            <div className={`text-lg font-bold ${digitalTwin.realTimeData.productionCapacity.efficiency > 85 ? 'text-green-400' : 'text-yellow-400'}`}>
              {digitalTwin.realTimeData.productionCapacity.efficiency > 85 ? 'High' : 'Moderate'}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {digitalTwin.realTimeData.productionCapacity.efficiency > 85 
                ? 'Excellent efficiency' 
                : 'Room for improvement'}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderQualitySection = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-400" />
          Quality Metrics
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {renderMetricCard('Quality Score', digitalTwin.realTimeData.quality.qualityScore, Star, 'text-green-400', '%')}
          {renderMetricCard('Customer Satisfaction', digitalTwin.realTimeData.quality.customerSatisfaction, CheckCircle, 'text-blue-400', '%')}
          {renderMetricCard('Compliance Rate', digitalTwin.realTimeData.quality.complianceRate, Shield, 'text-purple-400', '%')}
          {renderMetricCard('Defect Rate', digitalTwin.realTimeData.quality.defectRate, AlertTriangle, 'text-red-400', '%')}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h4 className="text-lg font-bold text-white mb-4">Quality Insights</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <span className="text-slate-300">Defect Rate Trend</span>
            <span className={`text-sm font-medium ${digitalTwin.realTimeData.quality.defectRate < 3 ? 'text-green-400' : 'text-yellow-400'}`}>
              {digitalTwin.realTimeData.quality.defectRate < 3 ? 'Below Industry Average' : 'Above Industry Average'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <span className="text-slate-300">Customer Satisfaction</span>
            <span className={`text-sm font-medium ${digitalTwin.realTimeData.quality.customerSatisfaction > 85 ? 'text-green-400' : 'text-yellow-400'}`}>
              {digitalTwin.realTimeData.quality.customerSatisfaction > 85 ? 'Excellent' : 'Good'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderManufacturingSection = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-orange-400" />
          Manufacturing Speed
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {renderMetricCard('Cycle Time', digitalTwin.realTimeData.manufacturingSpeed.cycleTime, Clock, 'text-orange-400', ' hrs')}
          {renderMetricCard('Throughput', digitalTwin.realTimeData.manufacturingSpeed.throughput, Activity, 'text-blue-400', ' units/hr')}
          {renderMetricCard('Efficiency', digitalTwin.realTimeData.manufacturingSpeed.efficiency, Zap, 'text-green-400', '%')}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h4 className="text-lg font-bold text-white mb-4">Bottleneck Analysis</h4>
        {digitalTwin.realTimeData.manufacturingSpeed.bottleneck ? (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-white font-medium">Bottleneck Detected</span>
            </div>
            <p className="text-slate-300 text-sm mb-2">{digitalTwin.realTimeData.manufacturingSpeed.bottleneck}</p>
            <p className="text-slate-400 text-xs">Recommendation: Consider adding capacity or optimizing scheduling at this station.</p>
          </div>
        ) : (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">No Bottlenecks Detected</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderDeliverySection = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Truck className="w-6 h-6 text-purple-400" />
          Delivery Reliability
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {renderMetricCard('On-Time Rate', digitalTwin.realTimeData.deliveryReliability.onTimeRate, CheckCircle, 'text-green-400', '%')}
          {renderMetricCard('Average Lead Time', digitalTwin.realTimeData.deliveryReliability.averageLeadTime, Clock, 'text-blue-400', ' days')}
          {renderMetricCard('Fill Rate', digitalTwin.realTimeData.deliveryReliability.fillRate, Package, 'text-purple-400', '%')}
          {renderMetricCard('Carrier Performance', digitalTwin.realTimeData.deliveryReliability.carrierPerformance, Star, 'text-yellow-400', '%')}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h4 className="text-lg font-bold text-white mb-4">Delivery Performance</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-1">On-Time Performance</div>
            <div className={`text-lg font-bold ${digitalTwin.realTimeData.deliveryReliability.onTimeRate > 90 ? 'text-green-400' : 'text-yellow-400'}`}>
              {digitalTwin.realTimeData.deliveryReliability.onTimeRate > 90 ? 'Excellent' : 'Needs Improvement'}
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-1">Lead Time Competitiveness</div>
            <div className={`text-lg font-bold ${digitalTwin.realTimeData.deliveryReliability.averageLeadTime < 5 ? 'text-green-400' : 'text-yellow-400'}`}>
              {digitalTwin.realTimeData.deliveryReliability.averageLeadTime < 5 ? 'Competitive' : 'Above Average'}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderFinancialSection = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-yellow-400" />
          Financial Stability
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {renderMetricCard('Cash Flow', digitalTwin.realTimeData.financialStability.cashFlow, DollarSign, 'text-green-400', 'K')}
          {renderMetricCard('Profit Margin', digitalTwin.realTimeData.financialStability.profitMargin, TrendingUp, 'text-blue-400', '%')}
          {renderMetricCard('Debt Ratio', digitalTwin.realTimeData.financialStability.debtRatio, Scale, 'text-purple-400')}
          {renderMetricCard('Liquidity', digitalTwin.realTimeData.financialStability.liquidity, Shield, 'text-yellow-400')}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h4 className="text-lg font-bold text-white mb-4">Financial Health Assessment</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <span className="text-slate-300">Financial Stability</span>
            <span className={`text-sm font-medium ${digitalTwin.realTimeData.financialStability.profitMargin > 10 ? 'text-green-400' : 'text-yellow-400'}`}>
              {digitalTwin.realTimeData.financialStability.profitMargin > 10 ? 'Strong' : 'Moderate'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <span className="text-slate-300">Debt Management</span>
            <span className={`text-sm font-medium ${digitalTwin.realTimeData.financialStability.debtRatio < 0.5 ? 'text-green-400' : 'text-yellow-400'}`}>
              {digitalTwin.realTimeData.financialStability.debtRatio < 0.5 ? 'Healthy' : 'Review Needed'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderSustainabilitySection = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-emerald-400" />
          Sustainability & Carbon Emissions
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {renderMetricCard('Total Emissions', digitalTwin.realTimeData.carbonEmissions.totalEmissions, Flame, 'text-red-400', ' tons')}
          {renderMetricCard('Emissions/Unit', digitalTwin.realTimeData.carbonEmissions.emissionsPerUnit, Droplets, 'text-orange-400', ' kg')}
          {renderMetricCard('Reduction Target', digitalTwin.realTimeData.carbonEmissions.reductionTarget, Target, 'text-green-400', '%')}
          {renderMetricCard('Progress', digitalTwin.realTimeData.carbonEmissions.currentProgress, TrendingUp, 'text-blue-400', '%')}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h4 className="text-lg font-bold text-white mb-4">Sustainability Progress</h4>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Carbon Reduction Progress</span>
            <span className="text-sm text-emerald-400">{digitalTwin.realTimeData.carbonEmissions.currentProgress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all"
              style={{ width: `${digitalTwin.realTimeData.carbonEmissions.currentProgress}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-1">Energy Efficiency</div>
            <div className="text-lg font-bold text-white">{digitalTwin.realTimeData.operationalEfficiency.energyEfficiency}%</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-1">Water Usage Score</div>
            <div className="text-lg font-bold text-white">{digitalTwin.realTimeData.operationalEfficiency.energyEfficiency}%</div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderPredictionsSection = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-violet-500/20 to-violet-600/20 border border-violet-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6 text-violet-400" />
          AI Predictions
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-2">Next Week</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Production</span>
                <span className="text-violet-400">{digitalTwin.predictions.nextWeek.production}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Quality</span>
                <span className="text-green-400">{digitalTwin.predictions.nextWeek.quality}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Delivery</span>
                <span className="text-blue-400">{digitalTwin.predictions.nextWeek.delivery}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Efficiency</span>
                <span className="text-yellow-400">{digitalTwin.predictions.nextWeek.efficiency}%</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-2">Next Month</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Production</span>
                <span className="text-violet-400">{digitalTwin.predictions.nextMonth.production}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Quality</span>
                <span className="text-green-400">{digitalTwin.predictions.nextMonth.quality}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Delivery</span>
                <span className="text-blue-400">{digitalTwin.predictions.nextMonth.delivery}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Efficiency</span>
                <span className="text-yellow-400">{digitalTwin.predictions.nextMonth.efficiency}%</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-2">Next Quarter</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Production</span>
                <span className="text-violet-400">{digitalTwin.predictions.nextQuarter.production}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Quality</span>
                <span className="text-green-400">{digitalTwin.predictions.nextQuarter.quality}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Delivery</span>
                <span className="text-blue-400">{digitalTwin.predictions.nextQuarter.delivery}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Efficiency</span>
                <span className="text-yellow-400">{digitalTwin.predictions.nextQuarter.efficiency}%</span>
              </div>
            </div>
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
              Supplier Digital Twin™
            </h1>
            <p className="text-slate-400 mt-1">Living AI representation of your business operations</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isLive 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/30'
              }`}
            >
              {isLive ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {isLive ? 'Live' : 'Paused'}
            </button>
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <RefreshCw className={`w-4 h-4 text-[#00F5C4] ${isLive ? 'animate-spin' : ''}`} />
              <span className="text-sm text-slate-300">
                Last Updated: {new Date(digitalTwin.lastUpdated).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metric Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6 overflow-x-auto"
      >
        <button
          onClick={() => setSelectedMetric('capacity')}
          className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
            selectedMetric === 'capacity'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Factory className="w-4 h-4 inline mr-2" />
          Capacity
        </button>
        <button
          onClick={() => setSelectedMetric('quality')}
          className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
            selectedMetric === 'quality'
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Shield className="w-4 h-4 inline mr-2" />
          Quality
        </button>
        <button
          onClick={() => setSelectedMetric('manufacturing')}
          className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
            selectedMetric === 'manufacturing'
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Cpu className="w-4 h-4 inline mr-2" />
          Manufacturing
        </button>
        <button
          onClick={() => setSelectedMetric('delivery')}
          className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
            selectedMetric === 'delivery'
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Truck className="w-4 h-4 inline mr-2" />
          Delivery
        </button>
        <button
          onClick={() => setSelectedMetric('financial')}
          className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
            selectedMetric === 'financial'
              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <DollarSign className="w-4 h-4 inline mr-2" />
          Financial
        </button>
        <button
          onClick={() => setSelectedMetric('sustainability')}
          className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
            selectedMetric === 'sustainability'
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Leaf className="w-4 h-4 inline mr-2" />
          Sustainability
        </button>
        <button
          onClick={() => setSelectedMetric('predictions')}
          className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
            selectedMetric === 'predictions'
              ? 'bg-gradient-to-r from-violet-500 to-violet-600 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          <Brain className="w-4 h-4 inline mr-2" />
          Predictions
        </button>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedMetric === 'capacity' && (
          <motion.div
            key="capacity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderCapacitySection()}
          </motion.div>
        )}
        {selectedMetric === 'quality' && (
          <motion.div
            key="quality"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderQualitySection()}
          </motion.div>
        )}
        {selectedMetric === 'manufacturing' && (
          <motion.div
            key="manufacturing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderManufacturingSection()}
          </motion.div>
        )}
        {selectedMetric === 'delivery' && (
          <motion.div
            key="delivery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderDeliverySection()}
          </motion.div>
        )}
        {selectedMetric === 'financial' && (
          <motion.div
            key="financial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderFinancialSection()}
          </motion.div>
        )}
        {selectedMetric === 'sustainability' && (
          <motion.div
            key="sustainability"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderSustainabilitySection()}
          </motion.div>
        )}
        {selectedMetric === 'predictions' && (
          <motion.div
            key="predictions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderPredictionsSection()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
