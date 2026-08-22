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
  BarChart3, 
  TrendingUp, 
  Heart, 
  Cpu, 
  Factory, 
  DollarSign, 
  Package, 
  Truck, 
  Filter 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { SelfHealingSupplier } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 7
 * Self-Healing Supplier™ - Detect future problems before they occur
 */
export const GSINSelfHealing: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [selfHealing, setSelfHealing] = useState<SelfHealingSupplier | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'alerts' | 'preventive' | 'predictions'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getSelfHealing();
        setSelfHealing(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!selfHealing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Self-Healing Systems...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Healing Efficiency */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-400" />
              Self-Healing Efficiency
            </h3>
            <div className="text-4xl font-bold text-white">{selfHealing.healingEfficiency}%</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Prevention Success Rate</div>
            <div className="text-2xl font-bold text-green-400">{selfHealing.preventionSuccessRate}%</div>
          </div>
        </div>
      </motion.div>

      {/* Alert Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Machine Failures</span>
          </div>
          <div className="text-2xl font-bold text-white">{selfHealing.machineFailurePredictions.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Factory className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-slate-400">Capacity Issues</span>
          </div>
          <div className="text-2xl font-bold text-white">{selfHealing.capacityWarnings.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-slate-400">Quality Issues</span>
          </div>
          <div className="text-2xl font-bold text-white">{selfHealing.qualityPredictions.length}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Financial Risks</span>
          </div>
          <div className="text-2xl font-bold text-white">{selfHealing.financialPredictions.length}</div>
        </div>
      </motion.div>

      {/* Monitoring Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <div>
              <h3 className="text-lg font-bold text-white">Predictive Monitoring Active</h3>
              <p className="text-sm text-slate-400">AI continuously monitoring for potential issues</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">Last Updated</div>
            <div className="text-lg font-bold text-white">{new Date(selfHealing.lastUpdated).toLocaleTimeString()}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Predictive Alerts</h3>
      {selfHealing.alerts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Active Alerts</h3>
          <p className="text-slate-400">All systems are operating within normal parameters.</p>
        </motion.div>
      ) : (
        selfHealing.alerts.map((alert, idx) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`backdrop-blur-xl border rounded-xl p-4 ${
              alert.severity === 'Critical' ? 'bg-red-500/20 border-red-500/30' :
              alert.severity === 'High' ? 'bg-orange-500/20 border-orange-500/30' :
              alert.severity === 'Medium' ? 'bg-yellow-500/20 border-yellow-500/30' :
              'bg-blue-500/20 border-blue-500/30'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className={`w-6 h-6 ${
                  alert.severity === 'Critical' ? 'text-red-400' :
                  alert.severity === 'High' ? 'text-orange-400' :
                  alert.severity === 'Medium' ? 'text-yellow-400' :
                  'text-blue-400'
                }`} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      alert.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      alert.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      alert.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-slate-500/20 text-slate-400">
                      {alert.alertType}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white">{alert.description}</h4>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{alert.probability}%</div>
                <div className="text-xs text-slate-400">Probability</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Time to Occur</div>
                <div className="text-sm font-bold text-white">{alert.timeToOccur}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Predicted Loss</div>
                <div className="text-sm font-bold text-red-400">${alert.predictedLoss.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Confidence</div>
                <div className="text-sm font-bold text-green-400">{alert.confidence}%</div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderPreventive = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Preventive Actions</h3>
      {selfHealing.preventiveActions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Preventive Actions</h3>
          <p className="text-slate-400">AI will recommend preventive actions when potential issues are detected.</p>
        </motion.div>
      ) : (
        selfHealing.preventiveActions.map((action, idx) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    action.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    action.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {action.priority}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    action.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    action.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {action.status}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">{action.action}</h4>
                <p className="text-sm text-slate-400 mt-1">{action.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Effectiveness</div>
                <div className="text-lg font-bold text-green-400">{action.effectiveness}%</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Implementation Time</div>
                <div className="text-sm font-bold text-white">{action.implementationTime}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Cost</div>
                <div className="text-sm font-bold text-white">${action.cost.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Resources</div>
                <div className="text-sm font-bold text-white">{action.resources.length}</div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const renderPredictions = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Detailed Predictions</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-white">Machine Failures</span>
          </div>
          <div className="text-2xl font-bold text-white">{selfHealing.machineFailurePredictions.length}</div>
          <div className="text-xs text-slate-400">predictions</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Factory className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium text-white">Capacity Warnings</span>
          </div>
          <div className="text-2xl font-bold text-white">{selfHealing.capacityWarnings.length}</div>
          <div className="text-xs text-slate-400">warnings</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Truck className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-white">Delivery Predictions</span>
          </div>
          <div className="text-2xl font-bold text-white">{selfHealing.deliveryPredictions.length}</div>
          <div className="text-xs text-slate-400">predictions</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-white">Inventory Predictions</span>
          </div>
          <div className="text-2xl font-bold text-white">{selfHealing.inventoryPredictions.length}</div>
          <div className="text-xs text-slate-400">predictions</div>
        </div>
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
              <Shield className="w-8 h-8 text-[#00F5C4]" />
              Self-Healing Supplier™
            </h1>
            <p className="text-slate-400 mt-1">Detect future problems before they occur</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-sm text-slate-300">Predictive Monitoring</span>
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
          { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
          { id: 'preventive', label: 'Preventive', icon: Shield },
          { id: 'predictions', label: 'Predictions', icon: Activity }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSection(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedSection === tab.id
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
        {selectedSection === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderOverview()}
          </motion.div>
        )}
        {selectedSection === 'alerts' && (
          <motion.div
            key="alerts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderAlerts()}
          </motion.div>
        )}
        {selectedSection === 'preventive' && (
          <motion.div
            key="preventive"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderPreventive()}
          </motion.div>
        )}
        {selectedSection === 'predictions' && (
          <motion.div
            key="predictions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderPredictions()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
