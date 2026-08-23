import { TrendingUp, Package, Clock, Zap, Award, Target } from 'lucide-react';
import { motion } from 'motion/react';

export function DashboardScreen() {
  const stats = [
    { label: 'Deliveries Today', value: '24', change: '+8%', icon: Package, color: 'cyan' },
    { label: 'On-Time Rate', value: '94%', change: '+3%', icon: Award, color: 'green' },
    { label: 'Avg Delivery Time', value: '18m', change: '-12%', icon: Clock, color: 'purple' },
    { label: 'Efficiency Score', value: '87', change: '+5', icon: Zap, color: 'yellow' },
  ];

  const aiInsights = [
    { title: 'Peak Performance', description: 'You\'re 23% faster than average in your zone', impact: 'positive' },
    { title: 'Traffic Pattern', description: 'Morning routes 15% faster than afternoon', impact: 'neutral' },
    { title: 'Fuel Efficiency', description: 'Current route saves 2.3L compared to standard', impact: 'positive' },
  ];

  const recentActivity = [
    { time: '2:45 PM', action: 'Delivered to 9012 Pine Rd', status: 'completed' },
    { time: '2:30 PM', action: 'Route optimized - 12 min saved', status: 'optimized' },
    { time: '2:15 PM', action: 'Delivered to 5678 Elm Ave', status: 'completed' },
    { time: '1:50 PM', action: 'Traffic alert - rerouted', status: 'alert' },
  ];

  return (
    <div className="h-full bg-zinc-950 text-white overflow-y-auto overflow-x-hidden">
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-sm text-zinc-400">Real-time performance metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const colorClasses = {
              cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/50 text-cyan-400',
              green: 'from-green-500/20 to-green-600/20 border-green-500/50 text-green-400',
              purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/50 text-purple-400',
              yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/50 text-yellow-400',
            }[stat.color];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${colorClasses} border rounded-xl p-4`}
              >
                <Icon className="w-5 h-5 mb-2" />
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-zinc-300 mb-1">{stat.label}</p>
                <p className={`text-xs font-medium ${
                  stat.change.startsWith('+') ? 'text-green-400' :
                  stat.change.startsWith('-') ? 'text-red-400' : 'text-zinc-400'
                }`}>
                  {stat.change} vs yesterday
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* AI Insights */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            AI Insights
          </h2>
          <div className="space-y-2">
            {aiInsights.map((insight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-zinc-900/80 border border-cyan-500/20 rounded-xl p-3"
              >
                <div className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    insight.impact === 'positive' ? 'bg-green-400' :
                    insight.impact === 'negative' ? 'bg-red-400' :
                    'bg-yellow-400'
                  }`} />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white mb-1">{insight.title}</h3>
                    <p className="text-xs text-zinc-400">{insight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-cyan-400 mb-3">Today's Performance</h2>
          <div className="bg-zinc-900/80 border border-cyan-500/20 rounded-xl p-4">
            <div className="flex items-end gap-1 h-32">
              {[65, 82, 78, 95, 88, 92, 87, 90].map((height, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.6 + idx * 0.05, duration: 0.4 }}
                  className="flex-1 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t"
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM'].map((time, idx) => (
                <span key={idx} className="text-[9px] text-zinc-500">{time}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-sm font-semibold text-cyan-400 mb-3">Recent Activity</h2>
          <div className="space-y-2">
            {recentActivity.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="flex items-center gap-3 bg-zinc-900/50 rounded-lg p-3"
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-400' :
                  activity.status === 'optimized' ? 'bg-cyan-400' :
                  'bg-orange-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white">{activity.action}</p>
                  <p className="text-[10px] text-zinc-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
