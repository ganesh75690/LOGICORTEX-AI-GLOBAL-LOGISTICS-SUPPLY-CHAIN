import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  Car, 
  Package, 
  Route, 
  Clock, 
  User, 
  BarChart3, 
  Award, 
  FileText, 
  Activity, 
  Target, 
  Zap, 
  Fingerprint, 
  Settings 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { AutonomousDeliveryCompletionIntelligence } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 8
 * Autonomous Delivery Completion Intelligence (ADCI™) - AI certifies every delivery
 */
export const GSINADCI: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [adci, setAdci] = useState<AutonomousDeliveryCompletionIntelligence | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'verification' | 'trust' | 'certificate'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getADCI();
        setAdci(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!adci) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <ShieldCheck className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Delivery Completion Intelligence...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Delivery Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Delivery Verification Status</h3>
              <p className="text-sm text-slate-400">AI has verified this delivery</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{adci.deliveryConfidenceScore}%</div>
            <div className="text-xs text-slate-400">Confidence Score</div>
          </div>
        </div>
      </motion.div>

      {/* Trust Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Delivery Trust Score
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-4xl font-bold text-white">{adci.deliveryTrustScore.overallScore}</div>
            <div className="text-sm text-slate-400">Overall Score</div>
          </div>
          <div className={`px-4 py-2 rounded-lg text-lg font-bold ${
            adci.deliveryTrustScore.trustLevel === 'High' ? 'bg-green-500/20 text-green-400' :
            adci.deliveryTrustScore.trustLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            adci.deliveryTrustScore.trustLevel === 'Low' ? 'bg-orange-500/20 text-orange-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {adci.deliveryTrustScore.trustLevel}
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Location</div>
            <div className="text-lg font-bold text-white">{adci.deliveryTrustScore.componentScores.location}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Behaviour</div>
            <div className="text-lg font-bold text-white">{adci.deliveryTrustScore.componentScores.behaviour}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Package</div>
            <div className="text-lg font-bold text-white">{adci.deliveryTrustScore.componentScores.package}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Route</div>
            <div className="text-lg font-bold text-white">{adci.deliveryTrustScore.componentScores.route}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Timing</div>
            <div className="text-lg font-bold text-white">{adci.deliveryTrustScore.componentScores.timing}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Sequence</div>
            <div className="text-lg font-bold text-white">{adci.deliveryTrustScore.componentScores.sequence}</div>
          </div>
        </div>
      </motion.div>

      {/* Anomalies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          Anomalies Detected
        </h3>
        {adci.anomalies.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <p className="text-slate-400">No anomalies detected</p>
          </div>
        ) : (
          <div className="space-y-2">
            {adci.anomalies.map((anomaly, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${
                    anomaly.severity === 'Critical' ? 'text-red-400' :
                    anomaly.severity === 'High' ? 'text-orange-400' :
                    anomaly.severity === 'Medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`} />
                  <span className="text-sm text-white">{anomaly.type}</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  anomaly.investigationStatus === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                  anomaly.investigationStatus === 'Investigating' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {anomaly.investigationStatus}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Verification Process</h3>
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-white">GPS Verification</span>
          </div>
          <div className="text-2xl font-bold text-white">{adci.verificationProcess.gpsVerification.confidence}%</div>
          <div className="text-xs text-slate-400">Confidence</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Car className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-white">Driver Behaviour</span>
          </div>
          <div className="text-2xl font-bold text-white">{adci.verificationProcess.driverBehaviourVerification.overallBehaviourScore}%</div>
          <div className="text-xs text-slate-400">Score</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-white">Package Verification</span>
          </div>
          <div className="text-2xl font-bold text-white">{adci.verificationProcess.packageVerification.packageScore}%</div>
          <div className="text-xs text-slate-400">Score</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Route className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium text-white">Route Consistency</span>
          </div>
          <div className="text-2xl font-bold text-white">{adci.verificationProcess.routeConsistencyVerification.overallConsistency}%</div>
          <div className="text-xs text-slate-400">Consistency</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-white">Time Consistency</span>
          </div>
          <div className="text-2xl font-bold text-white">{adci.verificationProcess.timeConsistencyVerification.acceptable ? 'Yes' : 'No'}</div>
          <div className="text-xs text-slate-400">Acceptable</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-white">Customer Confirmation</span>
          </div>
          <div className="text-2xl font-bold text-white">{adci.verificationProcess.customerConfirmation.confirmationReceived ? 'Yes' : 'No'}</div>
          <div className="text-xs text-slate-400">Received</div>
        </motion.div>
      </div>
    </div>
  );

  const renderCertificate = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Verified Delivery Certificate</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#00F5C4]/20 to-[#00D4A8]/20 border border-[#00F5C4]/30 rounded-xl p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-[#00F5C4]" />
            <div>
              <h4 className="text-xl font-bold text-white">{adci.verifiedDeliveryCertificate.certificateId}</h4>
              <p className="text-sm text-slate-400">Delivery ID: {adci.verifiedDeliveryCertificate.deliveryId}</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-lg text-lg font-bold ${
            adci.verifiedDeliveryCertificate.verificationStatus === 'Verified' ? 'bg-green-500/20 text-green-400' :
            adci.verifiedDeliveryCertificate.verificationStatus === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {adci.verifiedDeliveryCertificate.verificationStatus}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">AI Confidence</div>
            <div className="text-2xl font-bold text-[#00F5C4]">{adci.verifiedDeliveryCertificate.aiConfidence}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Verification Time</div>
            <div className="text-sm font-bold text-white">{new Date(adci.verifiedDeliveryCertificate.verificationTimestamp).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Expires At</div>
            <div className="text-sm font-bold text-white">{new Date(adci.verifiedDeliveryCertificate.expiresAt).toLocaleString()}</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <div className="text-xs text-slate-400 mb-2">Verification Components</div>
          <div className="flex flex-wrap gap-2">
            {adci.verifiedDeliveryCertificate.verificationComponents.map((component, idx) => (
              <span key={idx} className="text-xs bg-slate-900/50 text-slate-300 px-2 py-1 rounded">
                {component}
              </span>
            ))}
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
              <ShieldCheck className="w-8 h-8 text-[#00F5C4]" />
              Autonomous Delivery Completion Intelligence™
            </h1>
            <p className="text-slate-400 mt-1">AI certifies every delivery with comprehensive verification</p>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-300">AI-Powered Verification</span>
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
          { id: 'verification', label: 'Verification', icon: Settings },
          { id: 'certificate', label: 'Certificate', icon: Award }
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
        {selectedSection === 'verification' && (
          <motion.div
            key="verification"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderVerification()}
          </motion.div>
        )}
        {selectedSection === 'certificate' && (
          <motion.div
            key="certificate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderCertificate()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
