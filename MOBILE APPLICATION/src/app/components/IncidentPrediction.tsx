import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, TrendingUp, Clock, Navigation, X, Brain, Zap } from 'lucide-react';

interface PredictedIncident {
  id: string;
  type: 'congestion' | 'delay' | 'weather' | 'accident';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timeUntil: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  suggestedAction: string;
  alternateRouteAvailable: boolean;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onAction: (action: 'reroute' | 'continue' | 'monitor') => void;
  incident: PredictedIncident;
}

export function IncidentPrediction({ isVisible, onClose, onAction, incident }: Props) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500/50 bg-red-500/10 text-red-400';
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
      case 'info': return 'border-blue-500/50 bg-blue-500/10 text-blue-400';
      default: return 'border-zinc-500/50 bg-zinc-500/10 text-zinc-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-zinc-400';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
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
            className="bg-zinc-900 border-t-4 border-yellow-500 rounded-t-3xl p-4 sm:p-6 max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-4 border-b ${getSeverityColor(incident.severity).split(' ')[0]} ${getSeverityColor(incident.severity).split(' ')[1]} ${getSeverityColor(incident.severity).split(' ')[2]}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">AI Prediction</h3>
                    <button
                      onClick={onClose}
                      className="w-6 h-6 rounded-lg bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                      title="Close prediction"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <p className="text-sm opacity-90">Incident detected before it happens</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Incident Details */}
              <div className="bg-zinc-800/30 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle className={`w-5 h-5 ${getSeverityColor(incident.severity).split(' ')[2]} mt-0.5`} />
                  <div>
                    <h4 className="text-sm font-semibold text-white">{incident.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1">{incident.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-zinc-900/50 rounded-lg p-2">
                    <p className="text-zinc-400 mb-1">Time Until</p>
                    <p className="text-white font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {incident.timeUntil}
                    </p>
                  </div>
                  <div className="bg-zinc-900/50 rounded-lg p-2">
                    <p className="text-zinc-400 mb-1">Confidence</p>
                    <p className={`font-medium ${getConfidenceColor(incident.confidence)}`}>
                      {incident.confidence}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Impact Assessment */}
              <div className="bg-zinc-800/30 rounded-xl p-4">
                <h5 className="text-sm font-semibold text-white mb-2">Impact Assessment</h5>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className={`w-4 h-4 ${getImpactColor(incident.impact)}`} />
                  <span className={`text-sm font-medium ${getImpactColor(incident.impact)}`}>
                    {incident.impact.toUpperCase()} IMPACT
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  This could affect your delivery timeline and customer satisfaction
                </p>
              </div>

              {/* AI Suggestion */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-purple-400 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-semibold text-white mb-1">AI Recommendation</h5>
                    <p className="text-xs text-zinc-300">{incident.suggestedAction}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                {incident.alternateRouteAvailable && (
                  <button
                    onClick={() => onAction('reroute')}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Take Alternate Route
                  </button>
                )}
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onAction('monitor')}
                    className="py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-zinc-300 transition-colors"
                  >
                    Monitor
                  </button>
                  <button
                    onClick={() => onAction('continue')}
                    className="py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-zinc-300 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
