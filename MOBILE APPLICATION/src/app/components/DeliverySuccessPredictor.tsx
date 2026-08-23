import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Phone, RefreshCw, SkipForward, Clock, User, MapPin } from 'lucide-react';
import { useState } from 'react';

interface DeliveryRisk {
  id: string;
  customerName: string;
  address: string;
  riskPercentage: number;
  reasons: string[];
  timeWindow: string;
  customerPhone: string;
}

interface Props {
  risk: DeliveryRisk;
  onCallCustomer: () => void;
  onReschedule: () => void;
  onSkipAndReorder: () => void;
}

export function DeliverySuccessPredictor({ risk, onCallCustomer, onReschedule, onSkipAndReorder }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskColor = (percentage: number) => {
    if (percentage >= 70) return 'from-red-500/20 to-orange-500/20 border-red-500/50';
    if (percentage >= 40) return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
    return 'from-green-500/20 to-emerald-500/20 border-green-500/50';
  };

  const getRiskTextColor = (percentage: number) => {
    if (percentage >= 70) return 'text-red-400';
    if (percentage >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRiskLabel = (percentage: number) => {
    if (percentage >= 70) return 'High Risk';
    if (percentage >= 40) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${getRiskColor(risk.riskPercentage)} border rounded-xl p-3 shadow-xl`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center ${risk.riskPercentage >= 70 ? 'animate-pulse' : ''}`}>
            <AlertTriangle className={`w-4 h-4 ${getRiskTextColor(risk.riskPercentage)}`} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Delivery Risk</h3>
            <div className="flex items-center gap-2">
              <span className={`text-base font-bold ${getRiskTextColor(risk.riskPercentage)}`}>
                {risk.riskPercentage}%
              </span>
              <span className="text-xs text-zinc-400">chance unavailable</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ⌄
          </motion.div>
        </button>
      </div>

      {/* Customer Info */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <User className="w-3 h-3 text-zinc-400" />
          <span className="text-xs font-medium text-white">{risk.customerName}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-3 h-3 text-zinc-400" />
          <span className="text-xs text-zinc-300 truncate max-w-[200px]">{risk.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-zinc-400" />
          <span className="text-xs text-zinc-300">{risk.timeWindow}</span>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-zinc-700/50">
              <div className="mb-3">
                <p className="text-xs font-medium text-zinc-400 mb-2">Risk Factors:</p>
                <div className="space-y-1">
                  {risk.reasons.map((reason, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <span className="text-xs text-zinc-300">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-zinc-800/30 rounded-lg p-2">
                <p className="text-xs text-zinc-400">
                  <span className="font-medium">AI Recommendation:</span> Call customer 15 minutes before arrival to confirm availability.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-1.5 mt-3">
        <button
          onClick={onCallCustomer}
          className="py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg flex flex-col items-center gap-1 transition-colors"
        >
          <Phone className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] font-medium text-blue-400">Call</span>
        </button>
        <button
          onClick={onReschedule}
          className="py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg flex flex-col items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-3 h-3 text-purple-400" />
          <span className="text-[10px] font-medium text-purple-400">Reschedule</span>
        </button>
        <button
          onClick={onSkipAndReorder}
          className="py-1.5 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 rounded-lg flex flex-col items-center gap-1 transition-colors"
        >
          <SkipForward className="w-3 h-3 text-orange-400" />
          <span className="text-[10px] font-medium text-orange-400">Skip</span>
        </button>
      </div>

      {/* Risk Badge */}
      <div className="absolute top-2 right-2">
        <span className={`px-2 py-1 text-[10px] font-medium rounded-full ${
          risk.riskPercentage >= 70 ? 'bg-red-500/20 text-red-400' :
          risk.riskPercentage >= 40 ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {getRiskLabel(risk.riskPercentage)}
        </span>
      </div>
    </motion.div>
  );
}
