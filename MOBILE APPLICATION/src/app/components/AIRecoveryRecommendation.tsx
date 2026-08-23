import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Menu,
  Star,
  User,
  Car,
  Clock,
  Package,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Info,
  XCircle,
  Loader2
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onApprove: () => void;
  onModify: () => void;
  onReject: () => void;
  selectedOption: any;
}

interface RecoveryScore {
  driverSuitability: number;
  vehicleSuitability: number;
  routeCompatibility: number;
  missionContinuity: number;
  estimatedDelay: number;
  overall: number;
}

export function AIRecoveryRecommendation({ 
  onMenuToggle, 
  onBack,
  onApprove,
  onModify,
  onReject,
  selectedOption
}: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const recoveryScore: RecoveryScore = {
    driverSuitability: 96,
    vehicleSuitability: 98,
    routeCompatibility: 92,
    missionContinuity: 95,
    estimatedDelay: 89,
    overall: 94
  };

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onApprove();
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-cyan-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-orange-400';
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
            <h1 className="text-lg font-bold text-white">AI Recovery Recommendation</h1>
            <p className="text-xs text-zinc-400">Intelligent Mission Recovery</p>
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
        {/* AI Recommendation Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-500/10 to-green-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-green-600 flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white mb-1">AI RECOVERY RECOMMENDATION</h2>
              <p className="text-xs text-zinc-400">
                Based on AI analysis of {selectedOption?.driverName || 'eligible driver'} and vehicle compatibility
              </p>
            </div>
          </div>

          <div className="bg-zinc-800/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-white leading-relaxed">
              Transfer the remaining 8 stops to Driver {selectedOption?.driverId || 'DRV-2087'} using Vehicle {selectedOption?.vehicleId || 'VH-1042'}.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-zinc-800/30 rounded-xl">
              <Clock className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-400">+12 min</p>
              <p className="text-[10px] text-zinc-400">Expected Delay</p>
            </div>
            <div className="text-center p-3 bg-zinc-800/30 rounded-xl">
              <Shield className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-cyan-400">94%</p>
              <p className="text-[10px] text-zinc-400">Recovery Confidence</p>
            </div>
            <div className="text-center p-3 bg-zinc-800/30 rounded-xl">
              <Package className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">2/2</p>
              <p className="text-[10px] text-zinc-400">Priority Preserved</p>
            </div>
          </div>
        </motion.div>

        {/* Recovery Confidence Score */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <div className="text-center mb-4">
            <p className="text-xs text-zinc-400 mb-2">RECOVERY CONFIDENCE SCORE</p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="text-5xl font-bold text-white mb-2"
            >
              {recoveryScore.overall}%
            </motion.div>
            <p className="text-sm text-cyan-400 font-medium">HIGH CONFIDENCE</p>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-3">
            {Object.entries(recoveryScore).filter(([key]) => key !== 'overall').map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-zinc-800 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${value >= 90 ? 'bg-green-500' : value >= 80 ? 'bg-cyan-500' : value >= 70 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${getScoreColor(value as number)}`}>{value}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Explanation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl transition-colors"
          >
            <Info className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white">Why was this driver recommended?</span>
          </button>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-3 bg-zinc-800/30 rounded-xl"
            >
              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedOption?.driverId || 'DRV-2087'} was selected because the driver is closest to the affected mission, has a compatible vehicle, satisfies readiness requirements, and minimizes expected delivery delay.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Recovery Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            Replacement Driver Summary
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Driver</span>
              <span className="text-sm text-white">{selectedOption?.driverName || 'Priya Sharma'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Vehicle</span>
              <span className="text-sm text-white">{selectedOption?.vehicleId || 'VH-1042'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Distance</span>
              <span className="text-sm text-white">{selectedOption?.distance || 4.8} km</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-zinc-400">Estimated Delay</span>
              <span className="text-sm text-green-400">+{selectedOption?.estimatedDelay || 12} min</span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          {isProcessing ? (
            <button
              disabled
              className="w-full py-4 bg-zinc-800 rounded-2xl text-base font-medium text-zinc-400 flex items-center justify-center gap-2"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing Handover...
            </button>
          ) : (
            <>
              <button
                onClick={handleApprove}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Approve Handover
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onModify}
                  className="py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-white transition-colors"
                >
                  Modify
                </button>
                <button
                  onClick={onReject}
                  className="py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-white transition-colors"
                >
                  Reject
                </button>
              </div>
            </>
          )}
        </motion.div>

        {/* Important Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Important Notice</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                This action will transfer the mission to a new driver. The original driver will be notified and all systems will be synchronized. This action is logged for audit purposes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}