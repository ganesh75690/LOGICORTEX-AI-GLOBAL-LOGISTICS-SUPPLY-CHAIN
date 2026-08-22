import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  BarChart3, 
  Fingerprint, 
  FileText, 
  Zap, 
  Users, 
  Building2, 
  Award, 
  Clock, 
  Database, 
  Flame, 
  ShieldCheck 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { GlobalTrustPrivacyFabric } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 13
 * Global Trust & Privacy Fabric™ - Self-defending AI security architecture
 */
export const GSINTrustPrivacyFabric: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [trustFabric, setTrustFabric] = useState<GlobalTrustPrivacyFabric | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'data-guardian' | 'trust-dna' | 'threat-detection' | 'security-dashboard'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getTrustPrivacyFabric();
        setTrustFabric(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!trustFabric) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Trust & Privacy Fabric...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Security Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Security Dashboard Score</h3>
              <p className="text-sm text-slate-400">Real-time security assessment</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-400">{trustFabric.realTimeSecurityDashboard.securityScore}%</div>
            <div className="text-xs text-slate-400">Security Score</div>
          </div>
        </div>
      </motion.div>

      {/* Trust DNA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Fingerprint className="w-5 h-5 text-purple-400" />
          Trust DNA
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-4xl font-bold text-white">{trustFabric.trustDNA.trustScore}</div>
            <div className="text-sm text-slate-400">Trust Score</div>
          </div>
          <div className={`px-4 py-2 rounded-lg text-lg font-bold ${
            trustFabric.trustDNA.trustLevel === 'High' ? 'bg-green-500/20 text-green-400' :
            trustFabric.trustDNA.trustLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            trustFabric.trustDNA.trustLevel === 'Low' ? 'bg-orange-500/20 text-orange-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {trustFabric.trustDNA.trustLevel}
          </div>
        </div>
        <div className="text-sm text-slate-400">Reputation Score: {trustFabric.trustDNA.reputationScore}</div>
      </motion.div>

      {/* Security Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-red-400" />
            <span className="text-sm text-slate-400">Active Threats</span>
          </div>
          <div className="text-2xl font-bold text-white">{trustFabric.realTimeSecurityDashboard.activeThreats}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Blocked Attacks</span>
          </div>
          <div className="text-2xl font-bold text-white">{trustFabric.realTimeSecurityDashboard.blockedAttacks}</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Detection Rate</span>
          </div>
          <div className="text-2xl font-bold text-white">{trustFabric.realTimeSecurityDashboard.performanceMetrics.detectionRate}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-400">Response Rate</span>
          </div>
          <div className="text-2xl font-bold text-white">{trustFabric.realTimeSecurityDashboard.performanceMetrics.responseRate}%</div>
        </div>
      </motion.div>
    </div>
  );

  const renderDataGuardian = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">AI Data Guardian</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-blue-400" />
            <div>
              <h4 className="text-lg font-bold text-white">Data Guardian Status</h4>
              <p className="text-sm text-slate-400">Active protection for sensitive data</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded text-sm font-medium ${
            trustFabric.aiDataGuardian.monitoringStatus === 'Active' ? 'bg-green-500/20 text-green-400' :
            trustFabric.aiDataGuardian.monitoringStatus === 'Enhanced' ? 'bg-blue-500/20 text-blue-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {trustFabric.aiDataGuardian.monitoringStatus}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Encryption Level</div>
            <div className="text-sm font-bold text-white">{trustFabric.aiDataGuardian.encryptionLevel}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Access Control</div>
            <div className="text-sm font-bold text-white">{trustFabric.aiDataGuardian.accessControlLevel}</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h4 className="text-md font-bold text-white mb-3">Protected Data Types</h4>
        <div className="flex flex-wrap gap-2">
          {trustFabric.aiDataGuardian.protectedDataTypes.map((type, idx) => (
            <span key={idx} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
              {type}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderThreatDetection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Autonomous Threat Detection</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Detection Accuracy</div>
            <div className="text-2xl font-bold text-green-400">{trustFabric.autonomousThreatDetection.detectionAccuracy}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Response Time</div>
            <div className="text-2xl font-bold text-blue-400">{trustFabric.autonomousThreatDetection.responseTime}ms</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Threats Detected</div>
            <div className="text-2xl font-bold text-orange-400">{trustFabric.autonomousThreatDetection.threatsDetected.length}</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h4 className="text-md font-bold text-white mb-3">Recent Threats</h4>
        {trustFabric.autonomousThreatDetection.threatsDetected.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <p className="text-slate-400">No threats detected</p>
          </div>
        ) : (
          <div className="space-y-2">
            {trustFabric.autonomousThreatDetection.threatsDetected.slice(0, 5).map((threat, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${
                    threat.severity === 'Critical' ? 'text-red-400' :
                    threat.severity === 'High' ? 'text-orange-400' :
                    threat.severity === 'Medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`} />
                  <span className="text-sm text-white">{threat.type}</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  threat.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                  threat.status === 'Investigating' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {threat.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderSecurityDashboard = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Real-Time Security Dashboard</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Security Score</div>
            <div className="text-2xl font-bold text-green-400">{trustFabric.realTimeSecurityDashboard.securityScore}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Active Threats</div>
            <div className="text-2xl font-bold text-red-400">{trustFabric.realTimeSecurityDashboard.activeThreats}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Blocked Attacks</div>
            <div className="text-2xl font-bold text-green-400">{trustFabric.realTimeSecurityDashboard.blockedAttacks}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">System Status</div>
            <div className="text-2xl font-bold text-blue-400">{trustFabric.realTimeSecurityDashboard.systemStatus}</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h4 className="text-md font-bold text-white mb-3">Performance Metrics</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Detection Rate</div>
            <div className="text-lg font-bold text-white">{trustFabric.realTimeSecurityDashboard.performanceMetrics.detectionRate}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Response Rate</div>
            <div className="text-lg font-bold text-white">{trustFabric.realTimeSecurityDashboard.performanceMetrics.responseRate}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">False Positive Rate</div>
            <div className="text-lg font-bold text-white">{trustFabric.realTimeSecurityDashboard.performanceMetrics.falsePositiveRate}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">System Uptime</div>
            <div className="text-lg font-bold text-white">{trustFabric.realTimeSecurityDashboard.performanceMetrics.systemUptime}%</div>
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
              <Shield className="w-8 h-8 text-[#00F5C4]" />
              Global Trust & Privacy Fabric™
            </h1>
            <p className="text-slate-400 mt-1">Self-defending AI security architecture</p>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-300">AI-Powered Security</span>
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
          { id: 'data-guardian', label: 'Data Guardian', icon: Lock },
          { id: 'threat-detection', label: 'Threat Detection', icon: AlertTriangle },
          { id: 'security-dashboard', label: 'Security Dashboard', icon: Activity }
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
        {selectedSection === 'data-guardian' && (
          <motion.div
            key="data-guardian"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderDataGuardian()}
          </motion.div>
        )}
        {selectedSection === 'threat-detection' && (
          <motion.div
            key="threat-detection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderThreatDetection()}
          </motion.div>
        )}
        {selectedSection === 'security-dashboard' && (
          <motion.div
            key="security-dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderSecurityDashboard()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
