import { motion, AnimatePresence } from 'motion/react';
import { Users, MapPin, Clock, CheckCircle, X, ArrowRight, Zap, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface TaskSwap {
  id: string;
  stopNumber: number;
  originalAddress: string;
  nearbyDriver: {
    name: string;
    distance: number;
    estimatedTime: number;
    currentLoad: number;
    efficiency: number;
  };
  timeSavings: number;
  confidence: number;
}

interface Props {
  swap: TaskSwap;
  onAcceptSwap: () => void;
  onDeclineSwap: () => void;
  isVisible: boolean;
}

export function AutoTaskSwap({ swap, onAcceptSwap, onDeclineSwap, isVisible }: Props) {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
    onAcceptSwap();
  };

  const handleDecline = () => {
    onDeclineSwap();
  };

  return (
    <AnimatePresence>
      {isVisible && !isAccepted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="bg-zinc-900 border-t-4 border-cyan-500 rounded-t-3xl p-4 sm:p-6 max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Smart Collaboration</h3>
                  <p className="text-xs text-cyan-400">Fleet Intelligence</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>

            {/* Alert Content */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-4 mb-4 border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Stop {swap.stopNumber} Optimization</p>
                  <p className="text-xs text-zinc-300">Nearby driver available</p>
                </div>
              </div>
              
              {/* Time Comparison */}
              <div className="bg-zinc-800/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-400">Current estimate</span>
                  <span className="text-sm font-bold text-red-400">{swap.nearbyDriver.estimatedTime + 15} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Optimized estimate</span>
                  <span className="text-sm font-bold text-green-400">{swap.nearbyDriver.estimatedTime} min</span>
                </div>
                <div className="mt-2 pt-2 border-t border-zinc-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-400">You save</span>
                    <span className="text-lg font-bold text-green-400">+{swap.timeSavings} min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Card */}
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{swap.nearbyDriver.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{swap.nearbyDriver.name}</p>
                  <p className="text-xs text-green-400">Partner Driver • {swap.nearbyDriver.efficiency}% efficient</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <MapPin className="w-3 h-3" />
                    <span>{swap.nearbyDriver.distance} km</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-zinc-300">Light load • Available now</span>
                </div>
                <span className="text-cyan-400 font-medium">{swap.confidence}% match</span>
              </div>
            </div>

            {/* Location */}
            <div className="bg-zinc-800/30 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-xs text-zinc-400 mb-1">Delivery location</p>
                  <p className="text-xs text-white">{swap.originalAddress}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAccept}
                className="py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-2xl font-bold text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg"
              >
                <CheckCircle className="w-5 h-5" />
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl font-bold text-zinc-300 transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg"
              >
                <X className="w-5 h-5" />
                Decline
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Success Confirmation */}
      <AnimatePresence>
        {isAccepted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto bg-green-500/20 border border-green-500/50 rounded-xl p-4 shadow-xl z-50"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm font-medium text-white">Task reassigned</p>
                <p className="text-xs text-green-400">You saved {swap.timeSavings} minutes</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
