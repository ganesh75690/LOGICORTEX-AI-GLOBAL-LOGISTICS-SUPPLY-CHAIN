import { motion } from 'motion/react';
import { 
  XCircle, 
  AlertTriangle, 
  Shield,
  ArrowLeft,
  Menu,
  FileText,
  AlertOctagon
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';
import { DeliveryTrustAssessment } from '../services/deliveryTruthFabricService';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onReview: () => void;
  onReportIssue: () => void;
  trustAssessment: DeliveryTrustAssessment;
}

export function DeliveryException({ 
  onMenuToggle, 
  onBack,
  onReview,
  onReportIssue,
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
            <h1 className="text-lg font-bold text-white">Delivery Exception</h1>
            <p className="text-xs text-zinc-400">Verification Exception</p>
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
        {/* Exception Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center"
          >
            <XCircle className="w-10 h-10 text-red-400" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-2">DELIVERY EXCEPTION</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
              <span className="text-sm text-zinc-400">Delivery Trust</span>
              <span className="text-sm font-semibold text-red-400">{trustAssessment.trustScore} / 100</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-zinc-400">Verification Status</span>
              <span className="text-sm font-semibold text-red-400">EXCEPTION</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
            <Shield className="w-3 h-3" />
            <span>DELIVERY TRUTH FABRIC™</span>
          </div>
        </motion.div>

        {/* Reason */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertOctagon className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white mb-2">Exception Reason</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {trustAssessment.explanation}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Critical Anomalies */}
        {trustAssessment.anomalies.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4"
          >
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Critical Anomalies Detected
            </h3>
            
            <div className="space-y-3">
              {trustAssessment.anomalies.map((anomaly, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-zinc-400 mb-1">{anomaly.type} - {anomaly.severity.toUpperCase()}</p>
                    <p className="text-sm text-white">{anomaly.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Evidence Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
                  <Shield className="w-4 h-4 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button
            onClick={onReview}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Review Full Evidence
          </button>
          
          <button
            onClick={onReportIssue}
            className="w-full py-4 bg-zinc-800/50 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-5 h-5" />
            Report Issue
          </button>
        </motion.div>

        {/* Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-zinc-400 leading-relaxed">
              This delivery has been flagged for review due to evidence inconsistencies. The delivery will be reviewed by operations team to determine final verification status.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
