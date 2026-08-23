import { motion, AnimatePresence } from 'motion/react';
import { Brain, Zap, TrendingUp, Clock } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface AIExplanation {
  title: string;
  content: string;
  confidence: number;
  timeSaved: number;
  icon?: 'brain' | 'zap' | 'trending-up' | 'clock';
}

interface Props {
  explanation: AIExplanation;
  isVisible: boolean;
}

export function AIExplanationCard({ explanation, isVisible }: Props) {
  const getIcon = () => {
    switch (explanation.icon) {
      case 'brain': return Brain;
      case 'zap': return Zap;
      case 'trending-up': return TrendingUp;
      case 'clock': return Clock;
      default: return Brain;
    }
  };

  const Icon = getIcon();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute top-4 left-4 right-4 bg-gradient-to-br from-green-500/90 to-emerald-500/90 backdrop-blur-lg border border-green-400/50 rounded-xl p-4 shadow-2xl z-50"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
              >
                <Icon />
              </motion.div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white mb-1">AI Decision</h3>
              <p className="text-xs text-green-100 mb-2">{explanation.content}</p>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-zinc-300">Confidence:</span>
                  <span className="text-green-300 font-medium">{explanation.confidence}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-zinc-300">Time saved:</span>
                  <span className="text-green-300 font-bold">+{explanation.timeSaved} min</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
