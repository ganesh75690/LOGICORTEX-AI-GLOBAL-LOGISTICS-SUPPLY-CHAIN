import { motion, AnimatePresence } from 'motion/react';
import { Clock, Users, ArrowRight, CheckCircle, AlertTriangle, X, TrendingUp, Brain } from 'lucide-react';

interface CustomerTimeWindow {
  stopId: string;
  customerName: string;
  availableAfter: string;
  availableUntil: string;
  confidence: number;
  reason: string;
}

interface OptimizedRoute {
  originalOrder: number[];
  newOrder: number[];
  timeSavings: number;
  fuelSavings: string;
  failedDeliveryReduction: number;
  confidence: number;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onAcceptOptimization: () => void;
  onDeclineOptimization: () => void;
  timeWindows: CustomerTimeWindow[];
  optimizedRoute: OptimizedRoute;
}

export function SmartDeliveryOptimizer({ 
  isVisible, 
  onClose, 
  onAcceptOptimization, 
  onDeclineOptimization,
  timeWindows,
  optimizedRoute 
}: Props) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500/20 border-green-500/30';
    if (confidence >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="bg-zinc-900 border-t-4 border-purple-500 rounded-t-3xl p-4 sm:p-6 max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Smart Delivery Window</h3>
                  <p className="text-xs text-purple-400">AI Time Optimizer</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            </div>

            {/* AI Insight */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 mb-4 border border-purple-500/30">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">AI Optimization Detected</h4>
                  <p className="text-xs text-zinc-300">
                    Customer availability patterns suggest better route ordering
                  </p>
                </div>
              </div>
              
              <div className={`rounded-lg p-3 border ${getConfidenceBg(optimizedRoute.confidence)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white">Decision Confidence</span>
                  <span className={`text-xs font-bold ${getConfidenceColor(optimizedRoute.confidence)}`}>
                    {optimizedRoute.confidence}%
                  </span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-1.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${optimizedRoute.confidence}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className={`h-full rounded-full ${
                      optimizedRoute.confidence >= 80 ? 'bg-green-400' : 
                      optimizedRoute.confidence >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Customer Time Windows */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white mb-3">Customer Availability Analysis</h4>
              <div className="space-y-2">
                {timeWindows.map((window, index) => (
                  <motion.div
                    key={window.stopId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className={`rounded-lg p-3 border ${getConfidenceBg(window.confidence)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{window.stopId}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{window.customerName}</p>
                          <p className="text-xs text-zinc-400">{window.reason}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold ${getConfidenceColor(window.confidence)}`}>
                        {window.confidence}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      <span className="text-zinc-300">Available: {window.availableAfter} - {window.availableUntil}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Route Comparison */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white mb-3">Route Optimization Impact</h4>
              <div className="bg-zinc-800/50 rounded-xl p-3">
                <div className="space-y-3">
                  {/* Route Order */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-400">Original:</span>
                      <div className="flex items-center gap-1">
                        {optimizedRoute.originalOrder.map((stop, idx) => (
                          <div key={idx} className="w-5 h-5 rounded bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                            <span className="text-xs text-red-400">{stop}</span>
                          </div>
                        ))}
                        <ArrowRight className="w-3 h-3 text-zinc-400 mx-1" />
                        {optimizedRoute.newOrder.map((stop, idx) => (
                          <div key={idx} className="w-5 h-5 rounded bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                            <span className="text-xs text-green-400">{stop}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-zinc-900/50 rounded-lg py-2">
                      <p className="text-green-400 font-semibold text-xs">+{optimizedRoute.timeSavings}m</p>
                      <p className="text-zinc-400 text-[10px]">Time Saved</p>
                    </div>
                    <div className="bg-zinc-900/50 rounded-lg py-2">
                      <p className="text-green-400 font-semibold text-xs">{optimizedRoute.fuelSavings}</p>
                      <p className="text-zinc-400 text-[10px]">Fuel Saved</p>
                    </div>
                    <div className="bg-zinc-900/50 rounded-lg py-2">
                      <p className="text-green-400 font-semibold text-xs">-{optimizedRoute.failedDeliveryReduction}%</p>
                      <p className="text-zinc-400 text-[10px]">Failed Risk</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onDeclineOptimization}
                className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-zinc-300 transition-colors"
              >
                Keep Original
              </button>
              <button
                onClick={onAcceptOptimization}
                className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-sm font-medium text-white transition-all"
              >
                Apply Optimization
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
