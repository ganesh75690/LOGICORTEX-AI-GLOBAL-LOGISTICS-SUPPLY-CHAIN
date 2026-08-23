import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Clock, CheckCircle, X, Smartphone } from 'lucide-react';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  oldETA: string;
  newETA: string;
  customerName: string;
  delayMinutes: number;
  reason: string;
}

export function ETAUpdateNotification({ 
  isVisible, 
  onClose, 
  oldETA, 
  newETA, 
  customerName, 
  delayMinutes,
  reason 
}: Props) {
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
            className="bg-zinc-900 border-t-4 border-green-500 rounded-t-3xl p-4 sm:p-6 max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-green-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">ETA Updated & Shared</h4>
                  <button
                    onClick={onClose}
                    className="w-6 h-6 rounded-lg bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                    aria-label="Close notification"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-3 h-3 text-green-400" />
                    <p className="text-xs text-zinc-300">
                      <span className="text-white font-medium">{customerName}</span> notified automatically
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      <span className="text-zinc-400 line-through">{oldETA}</span>
                    </div>
                    <span className="text-green-400">→</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 font-medium">{newETA}</span>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-800/50 rounded-lg p-2">
                    <p className="text-xs text-zinc-300">
                      <span className="text-zinc-400">Reason:</span> {reason}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <p className="text-xs text-green-400">
                    Customer received real-time update
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
