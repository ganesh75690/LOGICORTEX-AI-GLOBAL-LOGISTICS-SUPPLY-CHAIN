import { Brain, TrendingUp, RefreshCw, Sparkles, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const learningProgress = [
  { week: 'Week 1', accuracy: 78, decisions: 120 },
  { week: 'Week 2', accuracy: 82, decisions: 340 },
  { week: 'Week 3', accuracy: 85, decisions: 680 },
  { week: 'Week 4', accuracy: 88, decisions: 1240 },
  { week: 'Week 5', accuracy: 91, decisions: 2100 },
  { week: 'Week 6', accuracy: 94, decisions: 3450 },
];

const feedbackCycles = [
  { id: 1, type: 'Route Optimization', feedback: 'User confirmed 12min savings', improvement: '+3.2%', status: 'applied' },
  { id: 2, type: 'Demand Forecast', feedback: 'Actual demand matched prediction', improvement: '+1.8%', status: 'applied' },
  { id: 3, type: 'Inventory Reorder', feedback: 'Stockout prevented successfully', improvement: '+2.4%', status: 'applied' },
  { id: 4, type: 'Traffic Prediction', feedback: 'Delay prediction was accurate', improvement: '+4.1%', status: 'training' },
];

const learningInsights = [
  { 
    id: 'LI001', 
    metric: 'ETA Accuracy', 
    before: '78%', 
    after: '94%', 
    improvement: '+16%', 
    period: '6 weeks',
    impact: 'Reduced customer complaints by 45%'
  },
  { 
    id: 'LI002', 
    metric: 'Demand Prediction', 
    before: '82%', 
    after: '91%', 
    improvement: '+9%', 
    period: '4 weeks',
    impact: 'Inventory costs reduced by 22%'
  },
  { 
    id: 'LI003', 
    metric: 'Route Optimization', 
    before: '71%', 
    after: '89%', 
    improvement: '+18%', 
    period: '8 weeks',
    impact: 'Fuel efficiency improved by 15%'
  },
  { 
    id: 'LI004', 
    metric: 'Risk Detection', 
    before: '65%', 
    after: '87%', 
    improvement: '+22%', 
    period: '5 weeks',
    impact: 'Disruptions prevented: 23'
  }
];

const retrainingStatus = {
  status: 'active',
  currentModel: 'v3.2.1',
  nextRetraining: '2h 15m',
  dataPointsCollected: 8947,
  targetDataPoints: 10000,
  lastRetraining: '2 days ago',
  improvement: '+4.3% accuracy',
  estimatedTime: '45 min'
};

export function SelfLearning() {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Brain className="w-6 h-6 text-pink-400" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-1 -right-1"
            >
              <RefreshCw className="w-3 h-3 text-pink-400" />
            </motion.div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Self-Learning Feedback System</h2>
            <p className="text-xs text-slate-400">Continuous model improvement through real-world outcomes</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-500/10 border border-pink-500/30">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span className="text-xs text-pink-400 font-medium">Learning Active</span>
        </div>
      </div>

      {/* Learning Progress Chart */}
      <div className="mb-6 bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Model Improvement Over Time</h3>
            <p className="text-sm text-slate-400">Accuracy increases as the system learns from feedback</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-pink-400">+16%</div>
            <div className="text-xs text-slate-400">Accuracy Gain</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={learningProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: '#ec4899', r: 5 }}
              name="Prediction Accuracy %"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
            <div className="text-xs text-slate-400 mb-1">Data Points Learned</div>
            <div className="text-xl font-bold text-white">8,930</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
            <div className="text-xs text-slate-400 mb-1">Feedback Cycles</div>
            <div className="text-xl font-bold text-white">247</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center">
            <div className="text-xs text-slate-400 mb-1">Model Versions</div>
            <div className="text-xl font-bold text-white">v6.2</div>
          </div>
        </div>
      </div>

      {/* Recent Feedback Cycles */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Recent Feedback Integration</h3>
        </div>

        <div className="space-y-3">
          {feedbackCycles.map((cycle, idx) => (
            <motion.div
              key={cycle.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">{cycle.type}</h4>
                  <p className="text-xs text-slate-400">{cycle.feedback}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-green-400">{cycle.improvement}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    cycle.status === 'applied'
                      ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                      : 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400'
                  }`}>
                    {cycle.status}
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: cycle.status === 'applied' ? '100%' : '75%' }}
                  transition={{ delay: idx * 0.1 + 0.3, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Learning Insights */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">AI Learning Insights</h3>
          <div className="ml-auto px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs text-purple-400">
            Active Improvements: 4
          </div>
        </div>

        <div className="space-y-3">
          {learningInsights.map((insight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-white">{insight.metric}</div>
                  <div className="text-xs text-slate-400">Improved over {insight.period}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{insight.before}</span>
                  <span className="text-purple-400">→</span>
                  <span className="text-sm font-bold text-green-400">{insight.after}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 font-medium">
                    {insight.improvement}
                  </span>
                  <span className="text-xs text-slate-400">improvement</span>
                </div>
                <div className="text-xs text-purple-400">{insight.impact}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Auto-Retraining Status */}
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/30">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="w-5 h-5 text-green-400 animate-spin" />
          <h3 className="text-sm font-semibold text-white">Auto-Retraining Status</h3>
          <div className="ml-auto px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-xs text-green-400">
            {retrainingStatus.status.toUpperCase()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Current Model</span>
                <span className="text-sm font-mono text-green-400">{retrainingStatus.currentModel}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Last Retraining</span>
                <span className="text-sm text-white">{retrainingStatus.lastRetraining}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Next Retraining</span>
                <span className="text-sm font-bold text-yellow-400">{retrainingStatus.nextRetraining}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-2">Data Collection Progress</div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">{retrainingStatus.dataPointsCollected.toLocaleString()} / {retrainingStatus.targetDataPoints.toLocaleString()}</span>
                <span className="text-sm font-bold text-green-400">{Math.round((retrainingStatus.dataPointsCollected / retrainingStatus.targetDataPoints) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(retrainingStatus.dataPointsCollected / retrainingStatus.targetDataPoints) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-3">Expected Improvements</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Accuracy Gain</span>
                  <span className="text-sm font-bold text-green-400">{retrainingStatus.improvement}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Est. Training Time</span>
                  <span className="text-sm font-bold text-blue-400">{retrainingStatus.estimatedTime}</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
              <div className="text-xs text-slate-400 mb-2">Retraining Benefits</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-white">Improved ETA predictions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-xs text-white">Better demand forecasting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span className="text-xs text-white">Enhanced risk detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span className="text-xs text-white">Optimized resource allocation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Mechanisms */}
      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-pink-400" />
          <h3 className="text-sm font-semibold text-white">Learning Mechanisms</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Pattern Recognition',
              desc: 'Identifies new trends and adapts decision-making logic',
              icon: '🧠',
              color: 'from-purple-500 to-pink-600'
            },
            {
              title: 'Outcome Validation',
              desc: 'Compares predictions with actual results to refine models',
              icon: '✓',
              color: 'from-green-500 to-emerald-600'
            },
            {
              title: 'User Feedback',
              desc: 'Incorporates driver and admin confirmations into training',
              icon: '👤',
              color: 'from-blue-500 to-cyan-600'
            }
          ].map((mechanism, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 overflow-hidden group hover:border-slate-600/50 transition-all"
            >
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${mechanism.color} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`} />
              <div className="relative">
                <div className="text-3xl mb-3">{mechanism.icon}</div>
                <h4 className="text-sm font-semibold text-white mb-2">{mechanism.title}</h4>
                <p className="text-xs text-slate-400">{mechanism.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/50">
        <div className="text-center">
          <div className="text-lg font-bold text-pink-400">24/7</div>
          <div className="text-xs text-slate-400">Learning Cycle</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">+16%</div>
          <div className="text-xs text-slate-400">Accuracy Gain</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">8.9K</div>
          <div className="text-xs text-slate-400">Data Points</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-400">v6.2</div>
          <div className="text-xs text-slate-400">Model Version</div>
        </div>
      </div>
    </div>
  );
}
