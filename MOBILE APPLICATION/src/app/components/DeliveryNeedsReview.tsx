import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Shield,
  ArrowLeft,
  Menu,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';
import { DeliveryTrustAssessment } from '../services/deliveryTruthFabricService';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onContinue: () => void;
  onReviewEvidence: () => void;
  trustAssessment: DeliveryTrustAssessment;
}

export function DeliveryNeedsReview({ 
  onMenuToggle, 
  onBack,
  onContinue,
  onReviewEvidence,
  trustAssessment
}: Props) {
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
            <h1 className="text-lg font-bold text-white">Delivery Verification</h1>
            <p className="text-xs text-zinc-400">Needs Review</p>
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
        {/* Warning Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center"
          >
            <AlertTriangle className="w-10 h-10 text-yellow-400" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-2">NEEDS REVIEW</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
              <span className="text-sm text-zinc-400">Delivery Trust</span>
              <span className="text-sm font-semibold text-yellow-400">{trustAssessment.trustScore} / 100</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-zinc-400">Verification Status</span>
              <span className="text-sm font-semibold text-yellow-400">NEEDS REVIEW</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
            <Shield className="w-3 h-3" />
            <span>DELIVERY TRUTH FABRIC™</span>
          </div>
        </motion.div>

        {/* Evidence Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4">Evidence Summary</h3>
          
          <div className="space-y-3">
            {Object.entries(trustAssessment.evidenceSummary).map(([type, data]) => (
              <div key={type} className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-zinc-400">{type}</p>
                  <p className="text-sm text-white">{data.description}</p>
                </div>
                {data.status === 'valid' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Explanation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white mb-2">Reason</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {trustAssessment.explanation}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Anomalies */}
        {trustAssessment.anomalies.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
          >
            <h3 className="text-sm font-semibold text-white mb-4">Detected Anomalies</h3>
            
            <div className="space-y-3">
              {trustAssessment.anomalies.map((anomaly, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-zinc-400 mb-1">{anomaly.type}</p>
                    <p className="text-sm text-white">{anomaly.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button
            onClick={onReviewEvidence}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Review Evidence
          </button>
          
          <button
            onClick={onContinue}
            className="w-full py-4 bg-zinc-800/50 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Continue Mission
          </button>
        </motion.div>
      </div>
    </div>
  );
}
