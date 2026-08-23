import { motion } from 'motion/react';
import { Clock, AlertTriangle, TrendingUp, CheckCircle, ArrowRight, Zap, Brain } from 'lucide-react';

interface AIDecision {
  id: string;
  timestamp: string;
  problem: string;
  action: string;
  result: string;
  impact: {
    timeSaved: number;
    efficiency: number;
    costReduction: number;
  };
  type: 'route' | 'delivery' | 'fleet' | 'prediction';
}

interface Props {
  decisions: AIDecision[];
}

export function DecisionReplay({ decisions }: Props) {
  const getDecisionIcon = (type: string) => {
    switch (type) {
      case 'route': return TrendingUp;
      case 'delivery': return CheckCircle;
      case 'fleet': return Zap;
      case 'prediction': return Brain;
      default: return AlertTriangle;
    }
  };

  const getDecisionColor = (type: string) => {
    switch (type) {
      case 'route': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/50';
      case 'delivery': return 'from-green-500/20 to-emerald-500/20 border-green-500/50';
      case 'fleet': return 'from-purple-500/20 to-pink-500/20 border-purple-500/50';
      case 'prediction': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
      default: return 'from-zinc-500/20 to-gray-500/20 border-zinc-500/50';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">AI Decisions Today</h3>
          <p className="text-xs text-zinc-400">Every decision tracked with measurable impact</p>
        </div>
      </div>

      {/* Decision Cards */}
      <div className="space-y-3">
        {decisions.slice(0, 3).map((decision, index) => {
          const Icon = getDecisionIcon(decision.type);
          
          return (
            <motion.div
              key={decision.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${getDecisionColor(decision.type)} border rounded-xl p-4`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      <span className="text-xs text-zinc-400">{formatTime(decision.timestamp)}</span>
                    </div>
                    <p className="text-sm font-medium text-white">{decision.problem}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-400">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-medium">+{decision.impact.timeSaved}min</span>
                  </div>
                </div>
              </div>

              {/* Decision Flow */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                    <AlertTriangle className="w-2 h-2 text-red-400" />
                  </div>
                  <span className="text-xs text-zinc-300">{decision.problem}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-zinc-500" />
                  <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                    <Zap className="w-2 h-2 text-blue-400" />
                  </div>
                  <span className="text-xs text-zinc-300">{decision.action}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-zinc-500" />
                  <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                    <CheckCircle className="w-2 h-2 text-green-400" />
                  </div>
                  <span className="text-xs text-green-300 font-medium">{decision.result}</span>
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-700/50">
                <div className="text-center">
                  <p className="text-lg font-bold text-green-400">+{decision.impact.timeSaved}</p>
                  <p className="text-xs text-zinc-400">Minutes Saved</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-400">+{decision.impact.efficiency}%</p>
                  <p className="text-xs text-zinc-400">Efficiency</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-purple-400">-${decision.impact.costReduction}</p>
                  <p className="text-xs text-zinc-400">Cost Saved</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/50 rounded-xl p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-2xl font-bold text-white">
                {decisions.reduce((sum, d) => sum + d.impact.timeSaved, 0)}
              </span>
            </div>
            <p className="text-xs text-zinc-400">Total Minutes Saved Today</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-2xl font-bold text-white">{decisions.length}</span>
            </div>
            <p className="text-xs text-zinc-400">AI Decisions Made</p>
          </div>
        </div>
      </div>
    </div>
  );
}
