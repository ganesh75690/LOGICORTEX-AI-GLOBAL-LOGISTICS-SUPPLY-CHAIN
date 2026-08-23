import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Shield,
  ArrowLeft,
  Menu,
  Share2,
  Download,
  Home,
  Activity,
  Layers
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';
import { DeliveryTrustAssessment, EvidenceConsistency } from '../services/deliveryTruthFabricService';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onHome: () => void;
  shipmentId: string;
  confidenceScore: number;
  verificationTime: string;
  trustAssessment?: DeliveryTrustAssessment;
}

export function DeliveryVerificationResult({ 
  onMenuToggle, 
  onBack,
  onHome,
  shipmentId,
  confidenceScore,
  verificationTime,
  trustAssessment
}: Props) {
  const handleShare = () => {
    console.log('Sharing verification result');
  };

  const handleDownload = () => {
    console.log('Downloading verification report');
  };

  const getConsistencyColor = (consistency: EvidenceConsistency) => {
    switch (consistency) {
      case 'HIGH': return 'text-green-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'LOW': return 'text-orange-400';
      case 'INCONSISTENT': return 'text-red-400';
    }
  };

  const getConsistencyLabel = (consistency: EvidenceConsistency) => {
    switch (consistency) {
      case 'HIGH': return 'HIGH';
      case 'MEDIUM': return 'MEDIUM';
      case 'LOW': return 'LOW';
      case 'INCONSISTENT': return 'INCONSISTENT';
    }
  };

  return (
    <div className="size-full flex flex-col bg-zinc-950">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Verification Complete</h1>
            <p className="text-xs text-zinc-400">Delivery Verified Successfully</p>
          </div>
        </div>
        <button 
          onClick={onMenuToggle}
          className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Success Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-2">✓ DELIVERY VERIFIED</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
              <span className="text-sm text-zinc-400">Shipment</span>
              <span className="text-sm font-semibold text-white">{shipmentId}</span>
            </div>
            {trustAssessment ? (
              <>
                <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                  <span className="text-sm text-zinc-400">Delivery Trust</span>
                  <span className="text-sm font-semibold text-cyan-400">{trustAssessment.trustScore} / 100</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                  <span className="text-sm text-zinc-400">Evidence Consistency</span>
                  <span className={`text-sm font-semibold ${getConsistencyColor(trustAssessment.evidenceConsistency)}`}>
                    {getConsistencyLabel(trustAssessment.evidenceConsistency)}
                  </span>
                </div>
                {trustAssessment.offlineEvidence && (
                  <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                    <span className="text-sm text-zinc-400">Evidence</span>
                    <span className="text-sm font-semibold text-yellow-400">OFFLINE</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                  <span className="text-sm text-zinc-400">Confidence</span>
                  <span className="text-sm font-semibold text-green-400">{confidenceScore}%</span>
                </div>
              </>
            )}
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-zinc-400">Time</span>
              <span className="text-sm font-semibold text-white">{verificationTime}</span>
            </div>
          </div>

          {trustAssessment && (
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 mb-2">
              <Layers className="w-3 h-3" />
              <span>DELIVERY TRUTH FABRIC™</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
            <Shield className="w-3 h-3" />
            <span>AI-Powered Verification</span>
          </div>
        </motion.div>

        {/* Verification Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4">Verification Details</h3>
          
          {trustAssessment ? (
            <div className="space-y-3">
              {Object.entries(trustAssessment.evidenceSummary).map(([type, data]) => (
                <div key={type} className="flex items-start gap-3">
                  <Activity className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-zinc-400">{type}</p>
                    <p className="text-sm text-white">{data.description}</p>
                  </div>
                  {data.status === 'valid' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  ) : (
                    <Shield className="w-4 h-4 text-yellow-400" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-zinc-400">Location Verified</p>
                  <p className="text-sm text-white">Driver within destination geofence</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-zinc-400">Timestamp Verified</p>
                  <p className="text-sm text-white">Arrival within expected window</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-zinc-400">Route Consistency</p>
                  <p className="text-sm text-white">Route matches planned path</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
            </div>
          )}
        </motion.div>

        {/* DTF Explanation */}
        {trustAssessment && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-2">DELIVERY TRUTH</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {trustAssessment.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* System Sync Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4">System Synchronization</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Driver Mobile</span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Supplier Web</span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Admin Web</span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
          </div>

          <p className="text-xs text-zinc-500 mt-4 text-center">
            All systems updated with verified delivery status
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-2 p-4 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800/50 rounded-xl transition-colors"
          >
            <Share2 className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-white">Share</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="flex flex-col items-center gap-2 p-4 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800/50 rounded-xl transition-colors"
          >
            <Download className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-white">Download</span>
          </button>
        </motion.div>
      </div>

      {/* Home Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-4 border-t border-zinc-800/50"
      >
        <button
          onClick={onHome}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Return to Dashboard
        </button>
      </motion.div>
    </div>
  );
}