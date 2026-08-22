import { Brain, Sparkles, TrendingUp, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface Recommendation {
  id: string;
  type: 'route' | 'inventory' | 'resource' | 'cost';
  title: string;
  description: string;
  impact: {
    metric: string;
    value: string;
  };
  confidence: number;
  reasoning: string;
  priority: 'high' | 'medium' | 'low';
}

const mockRecommendations: Recommendation[] = [
  {
    id: 'REC001',
    type: 'route',
    title: 'Switch Route R002 to Alternative Path',
    description: 'Reroute via Highway 280 to avoid congestion on 101',
    impact: { metric: 'Time Saved', value: '2h 15m' },
    confidence: 94,
    reasoning: 'Real-time traffic analysis shows 40% slower speeds on current route. Historical data indicates alternative saves avg 2.1 hours during peak times.',
    priority: 'high'
  },
  {
    id: 'REC002',
    type: 'inventory',
    title: 'Reorder SKU-7845 to Warehouse B',
    description: 'Current stock dropping to 12% of optimal level',
    impact: { metric: 'Stockout Risk', value: '-85%' },
    confidence: 89,
    reasoning: 'Demand forecast predicts 300% spike in next 72 hours based on seasonal patterns. Current trajectory reaches zero stock in 18 hours.',
    priority: 'high'
  },
  {
    id: 'REC003',
    type: 'resource',
    title: 'Optimize Driver Allocation for Zone 3',
    description: 'Reassign 2 drivers from Zone 1 to cover surge',
    impact: { metric: 'Coverage', value: '+45%' },
    confidence: 76,
    reasoning: 'Zone 3 showing 3x normal demand. Zone 1 operating at 60% capacity. Reallocation maintains both zones above 85% efficiency.',
    priority: 'medium'
  },
  {
    id: 'REC004',
    type: 'cost',
    title: 'Consolidate Shipments to Distribution Center',
    description: 'Combine 4 partial loads into 2 full loads',
    impact: { metric: 'Fuel Saved', value: '₹340' },
    confidence: 92,
    reasoning: 'Current loads at 45-60% capacity. Consolidation reduces trips by 50% with minimal 15-minute delay per shipment.',
    priority: 'medium'
  }
];

export function AIRecommendations() {
  const [selectedRec, setSelectedRec] = useState<string | null>(null);
  const [appliedRecs, setAppliedRecs] = useState<Set<string>>(new Set());

  const getPriorityConfig = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high': return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
      case 'medium': return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
      case 'low': return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
    }
  };

  const getTypeIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'route': return '🚛';
      case 'inventory': return '📦';
      case 'resource': return '👥';
      case 'cost': return '💰';
    }
  };

  const applyRecommendation = (id: string) => {
    setAppliedRecs(new Set([...appliedRecs, id]));
    setTimeout(() => setSelectedRec(null), 1000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Brain className="w-6 h-6 text-purple-400" />
            <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h2 className="text-lg font-semibold text-white">AI Recommendations</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <Zap className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-purple-400 font-medium">Auto-Optimize ON</span>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {mockRecommendations.map((rec, idx) => {
          const priorityConfig = getPriorityConfig(rec.priority);
          const isApplied = appliedRecs.has(rec.id);
          const isExpanded = selectedRec === rec.id;

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div
                className={`rounded-lg border backdrop-blur-sm transition-all cursor-pointer ${
                  isApplied
                    ? 'bg-green-500/10 border-green-500/30'
                    : isExpanded
                    ? 'bg-slate-700/50 border-slate-600/50'
                    : 'bg-slate-800/30 border-slate-700/30 hover:bg-slate-700/40'
                }`}
                onClick={() => setSelectedRec(isExpanded ? null : rec.id)}
              >
                {/* Main Content */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{getTypeIcon(rec.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-sm font-semibold text-white">{rec.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityConfig.color} ${priorityConfig.bg} whitespace-nowrap`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-3">{rec.description}</p>

                      {/* Impact & Confidence */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <div>
                            <div className="text-xs text-slate-500">{rec.impact.metric}</div>
                            <div className="text-sm font-bold text-green-400">{rec.impact.value}</div>
                          </div>
                        </div>
                        <div className="h-8 w-px bg-slate-700" />
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Confidence</div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${rec.confidence}%` }}
                                transition={{ delay: idx * 0.1 + 0.3, duration: 0.8 }}
                                className={`h-full ${
                                  rec.confidence >= 90 ? 'bg-green-500' :
                                  rec.confidence >= 70 ? 'bg-blue-500' : 'bg-yellow-500'
                                }`}
                              />
                            </div>
                            <span className="text-sm font-bold text-white">{rec.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Reasoning */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-3"
                          >
                            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                              <div className="flex items-start gap-2">
                                <Brain className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <div className="text-xs text-slate-500 mb-1">AI Reasoning</div>
                                  <p className="text-xs text-slate-300">{rec.reasoning}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Actions */}
                      {!isApplied ? (
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applyRecommendation(rec.id);
                            }}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2 group"
                          >
                            <span>Apply Recommendation</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="px-4 py-2 bg-slate-700/50 text-slate-300 text-xs font-medium rounded-lg hover:bg-slate-700 transition-colors"
                          >
                            Dismiss
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <Sparkles className="w-4 h-4 animate-pulse" />
                          <span>Applied Successfully</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
