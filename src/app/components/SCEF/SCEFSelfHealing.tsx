import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  RefreshCw, 
  Activity, 
  Zap, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Heart, 
  Scan, 
  Warning, 
  Info, 
  Play, 
  Pause, 
  X, 
  ChevronRight, 
  ChevronDown,
  Brain,
  Factory,
  Wrench,
  AlertCircle,
  Bug,
  Flame,
  Droplets,
  Zap as ZapIcon,
  Users,
  DollarSign,
  Package,
  Truck,
  History
} from 'lucide-react';
import { SCEFEngine } from './SCEFEngine';
import { SelfHealingSupplier, HealingRisk } from '../../types/scef';

/**
 * SUPPLIER CAPABILITY EVOLUTION FABRIC (SCEF™) - Module 6
 * Self-Healing Supplier™ - Preventive risk detection and mitigation
 */
export const SCEFSelfHealing: React.FC = () => {
  const engineRef = useRef<SCEFEngine | null>(null);
  const [selfHealing, setSelfHealing] = useState<SelfHealingSupplier | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<HealingRisk | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new SCEFEngine();
        const data = engineRef.current.getSelfHealing();
        setSelfHealing(data);
        if (data.activeRisks.length > 0) {
          setSelectedRisk(data.activeRisks[0]);
        }
      } catch (error) {
        console.error('Error initializing SCEF engine:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isMonitoring) return;
    
    const interval = setInterval(() => {
      if (engineRef.current) {
        const data = engineRef.current.getSelfHealing();
        setSelfHealing(data);
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [isMonitoring]);

  if (!selfHealing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Self-Healing System...</div>
        </div>
      </div>
    );
  }

  const getRiskIcon = (type: string) => {
    const icons: Record<string, any> = {
      machine_failure_pattern: Wrench,
      production_bottleneck: Factory,
      quality_degradation: AlertCircle,
      capacity_saturation: Activity,
      inventory_shortage: Package,
      delayed_dispatch: Truck,
      financial_stress: DollarSign,
      supply_risk: Package,
      employee_turnover: Users,
      technology_obsolescence: ZapIcon
    };
    return icons[type] || AlertTriangle;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'detected': return 'bg-blue-500/20 text-blue-400';
      case 'analyzing': return 'bg-yellow-500/20 text-yellow-400';
      case 'mitigating': return 'bg-orange-500/20 text-orange-400';
      case 'resolved': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const renderRiskCard = (risk: HealingRisk) => (
    <motion.div
      key={risk.id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedRisk(risk)}
      className={`bg-slate-800/50 backdrop-blur-xl border-2 rounded-xl p-4 cursor-pointer transition-all ${
        selectedRisk?.id === risk.id 
          ? 'border-[#00F5C4] shadow-lg shadow-[#00F5C4]/20' 
          : 'border-slate-700/30 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {React.createElement(getRiskIcon(risk.type), { 
            className: `w-5 h-5 ${risk.severity === 'critical' ? 'text-red-400' : risk.severity === 'high' ? 'text-orange-400' : 'text-yellow-400'}` 
          })}
          <div>
            <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(risk.severity)}`}>
              {risk.severity}
            </span>
            <span className="text-sm font-medium text-white ml-2 capitalize">
              {risk.type.replace('_', ' ')}
            </span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(risk.status)}`}>
          {risk.status}
        </span>
      </div>

      <p className="text-sm text-slate-300 mb-3 line-clamp-2">{risk.description}</p>

      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
        <div className="bg-slate-900/50 rounded p-2">
          <div className="text-slate-400 mb-1">Likelihood</div>
          <div className="text-white font-medium">{risk.likelihood}%</div>
        </div>
        <div className="bg-slate-900/50 rounded p-2">
          <div className="text-slate-400 mb-1">Time to Failure</div>
          <div className="text-white font-medium">{risk.timeToFailure || 'N/A'}</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">
          Detected: {new Date(risk.detectedAt).toLocaleDateString()}
        </span>
        <span className="text-red-400">
          {risk.predictedImpact}
        </span>
      </div>
    </motion.div>
  );

  const renderRiskDetail = () => {
    if (!selectedRisk) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {React.createElement(getRiskIcon(selectedRisk.type), { 
              className: `w-8 h-8 ${selectedRisk.severity === 'critical' ? 'text-red-400' : selectedRisk.severity === 'high' ? 'text-orange-400' : 'text-yellow-400'}` 
            })}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-3 py-1 rounded text-sm font-medium border ${getSeverityColor(selectedRisk.severity)}`}>
                  {selectedRisk.severity}
                </span>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(selectedRisk.status)}`}>
                  {selectedRisk.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white capitalize">
                {selectedRisk.type.replace('_', ' ')}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">Detected</div>
            <div className="text-lg font-bold text-white">
              {new Date(selectedRisk.detectedAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <p className="text-sm text-slate-300 leading-relaxed">{selectedRisk.description}</p>
        </div>

        {/* Impact Analysis */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
            <div className="text-sm text-slate-400 mb-1">Current Impact</div>
            <p className="text-sm text-red-300">{selectedRisk.currentImpact}</p>
          </div>
          <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
            <div className="text-sm text-slate-400 mb-1">Predicted Impact</div>
            <p className="text-sm text-orange-300">{selectedRisk.predictedImpact}</p>
          </div>
        </div>

        {/* Pattern Detection */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Scan className="w-4 h-4 text-blue-400" />
            Detected Pattern
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedRisk.pattern.map((pattern, idx) => (
              <span key={idx} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                {pattern}
              </span>
            ))}
          </div>
        </div>

        {/* Preventive Recommendations */}
        <div className="bg-gradient-to-r from-[#00F5C4]/10 to-[#00D4A8]/10 rounded-lg p-4 border border-[#00F5C4]/30 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00F5C4]" />
            Preventive Recommendations
          </h4>
          <ul className="space-y-2">
            {selectedRisk.preventiveRecommendations.map((rec, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#00F5C4] mt-0.5 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Automatic Actions */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            Automatic Actions
          </h4>
          <div className="space-y-2">
            {selectedRisk.automaticActions.map((action, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2 bg-slate-800/50 rounded">
                <div className={`w-2 h-2 rounded-full mt-2 ${action.automated ? 'bg-green-400' : 'bg-yellow-400'}`} />
                <div className="flex-1">
                  <div className="text-sm text-white">{action.action}</div>
                  <div className="text-xs text-slate-400">
                    Trigger: {action.trigger} • {action.automated ? 'Automated' : 'Manual approval required'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 font-bold flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            Start Mitigation
          </button>
          <button className="flex-1 py-3 rounded-lg bg-slate-700 text-white font-bold flex items-center justify-center gap-2">
            <X className="w-4 h-4" />
            Ignore Risk
          </button>
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
              <Shield className="w-8 h-8 text-[#00F5C4]" />
              Self-Healing Supplier™
            </h1>
            <p className="text-slate-400 mt-1">Preventive risk detection and automatic mitigation</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isMonitoring 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/30'
              }`}
            >
              {isMonitoring ? <Activity className="w-4 h-4 animate-pulse" /> : <Pause className="w-4 h-4" />}
              {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
            </button>
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
            <span className="text-sm text-slate-400">Monitoring Active</span>
            <div className={`w-2 h-2 rounded-full ${selfHealing.systemHealth.monitoringActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
          </div>
          <div className="text-lg font-bold text-white capitalize">
            {selfHealing.systemHealth.monitoringActive ? 'Yes' : 'No'}
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Prediction Accuracy</div>
          <div className="text-lg font-bold text-[#00F5C4]">{selfHealing.systemHealth.predictionAccuracy}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Response Time</div>
          <div className="text-lg font-bold text-blue-400">{selfHealing.systemHealth.responseTime} min</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Overall Health</div>
          <div className="text-lg font-bold text-green-400">{selfHealing.systemHealth.overallHealth}%</div>
        </div>
      </motion.div>

      {/* Healing Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Risks Detected</div>
          <div className="text-2xl font-bold text-blue-400">{selfHealing.healingMetrics.risksDetected}</div>
        </div>
        <div className="bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Risks Prevented</div>
          <div className="text-2xl font-bold text-green-400">{selfHealing.healingMetrics.risksPrevented}</div>
        </div>
        <div className="bg-orange-500/10 backdrop-blur-xl border border-orange-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Risks Mitigated</div>
          <div className="text-2xl font-bold text-orange-400">{selfHealing.healingMetrics.risksMitigated}</div>
        </div>
        <div className="bg-purple-500/10 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4">
          <div className="text-sm text-slate-400 mb-1">Auto Interventions</div>
          <div className="text-2xl font-bold text-purple-400">{selfHealing.healingMetrics.automaticInterventions}</div>
        </div>
      </motion.div>

      {/* Prevention Success Rate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-green-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Prevention Success Rate</h3>
              <p className="text-sm text-slate-400">AI-powered risk prevention effectiveness</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-400">{selfHealing.healingMetrics.preventionSuccessRate}%</div>
          </div>
        </div>
      </motion.div>

      {/* Active Risks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          Active Risks ({selfHealing.activeRisks.length})
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {selfHealing.activeRisks.map(risk => renderRiskCard(risk))}
        </div>
      </motion.div>

      {/* Selected Risk Detail */}
      {selectedRisk && renderRiskDetail()}

      {/* Historical Risks */}
      {selfHealing.historicalRisks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-slate-400" />
            Historical Risks ({selfHealing.historicalRisks.length})
          </h3>
          <div className="space-y-2">
            {selfHealing.historicalRisks.map((risk, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {React.createElement(getRiskIcon(risk.type), { 
                      className: 'w-4 h-4 text-slate-400' 
                    })}
                    <div>
                      <div className="text-sm font-medium text-white capitalize">
                        {risk.type.replace('_', ' ')}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(risk.detectedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(risk.status)}`}>
                    {risk.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
