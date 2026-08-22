import { Leaf, TrendingDown, Droplets, Zap, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const carbonData = [
  { month: 'Jan', baseline: 450, optimized: 380 },
  { month: 'Feb', baseline: 420, optimized: 340 },
  { month: 'Mar', baseline: 480, optimized: 360 },
  { month: 'Apr', baseline: 440, optimized: 320 },
  { month: 'May', baseline: 460, optimized: 310 },
  { month: 'Jun', baseline: 490, optimized: 300 },
];

const emissionBreakdown = [
  { name: 'Transportation', value: 45, color: '#ef4444' },
  { name: 'Warehousing', value: 25, color: '#f59e0b' },
  { name: 'Packaging', value: 20, color: '#3b82f6' },
  { name: 'Other', value: 10, color: '#94a3b8' },
];

const fuelConsumptionData = [
  { month: 'Jan', consumption: 4500, optimized: 3800, saved: 700 },
  { month: 'Feb', consumption: 4200, optimized: 3400, saved: 800 },
  { month: 'Mar', consumption: 4800, optimized: 3600, saved: 1200 },
  { month: 'Apr', consumption: 4400, optimized: 3200, saved: 1200 },
  { month: 'May', consumption: 4600, optimized: 3100, saved: 1500 },
  { month: 'Jun', consumption: 4900, optimized: 3000, saved: 1900 },
];

const ecoRoutes = [
  { id: 'R001', route: 'Mumbai → Delhi', traditional: '850km', eco: '790km', fuelSaved: '45L', co2Saved: '117kg', score: 92 },
  { id: 'R002', route: 'Bangalore → Hyderabad', traditional: '570km', eco: '520km', fuelSaved: '28L', co2Saved: '73kg', score: 88 },
  { id: 'R003', route: 'Kolkata → Jaipur', traditional: '1450km', eco: '1380km', fuelSaved: '52L', co2Saved: '135kg', score: 95 },
  { id: 'R004', route: 'Chennai → Pune', traditional: '1100km', eco: '1020km', fuelSaved: '65L', co2Saved: '169kg', score: 90 },
];

const deliveryScores = [
  { id: 'D001', deliveryId: 'DEL-7845', vehicle: 'Truck-7', route: 'Mumbai → Delhi', score: 92, factors: ['Eco-route', 'Optimal load', 'Off-peak delivery'] },
  { id: 'D002', deliveryId: 'DEL-7846', vehicle: 'Truck-12', route: 'Bangalore → Hyderabad', score: 88, factors: ['Fuel-efficient driving', 'Consolidated load'] },
  { id: 'D003', deliveryId: 'DEL-7847', vehicle: 'Truck-3', route: 'Kolkata → Jaipur', score: 95, factors: ['Eco-route', 'Reduced idle time', 'Optimal speed'] },
  { id: 'D004', deliveryId: 'DEL-7848', vehicle: 'Truck-9', route: 'Chennai → Pune', score: 90, factors: ['Alternative route', 'Weather optimization'] },
];

const sustainabilityMetrics = [
  { label: 'Carbon Saved', value: '1,240 kg', change: -28.5, icon: Leaf, color: 'from-green-500 to-emerald-600' },
  { label: 'Fuel Efficiency', value: '+15.3%', change: 15.3, icon: Droplets, color: 'from-blue-500 to-cyan-600' },
  { label: 'Energy Optimized', value: '847 kWh', change: 12.8, icon: Zap, color: 'from-yellow-500 to-orange-600' },
  { label: 'Green Score', value: '94/100', change: 8.2, icon: Award, color: 'from-purple-500 to-pink-600' },
];

export function SustainabilityDashboard() {
  const totalReduction = carbonData.reduce((acc, curr) => acc + (curr.baseline - curr.optimized), 0);

  return (
    <div className="space-y-6">
      {/* Header Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sustainabilityMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group overflow-hidden"
            >
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all">
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${metric.color} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.change < 0 ? 'text-green-400' : 'text-blue-400'
                    }`}>
                      <TrendingDown className="w-4 h-4" />
                      <span>{Math.abs(metric.change)}%</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-slate-400">{metric.label}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Emissions Trend */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Carbon Emissions Trend</h3>
              <p className="text-sm text-slate-400">AI-optimized vs. baseline operations</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">-{totalReduction}kg</div>
              <div className="text-xs text-slate-400">Total Reduction</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={carbonData}>
              <defs>
                <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="baseline"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#colorBaseline)"
                name="Baseline CO₂"
              />
              <Area
                type="monotone"
                dataKey="optimized"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#colorOptimized)"
                name="Optimized CO₂"
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="text-xs text-red-400 mb-1">Baseline Avg</div>
              <div className="text-lg font-bold text-white">455 kg/month</div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="text-xs text-green-400 mb-1">Optimized Avg</div>
              <div className="text-lg font-bold text-white">335 kg/month</div>
            </div>
          </div>
        </div>

        {/* Emission Breakdown */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-6">Emission Sources Breakdown</h3>

          <div className="flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={emissionBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {emissionBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {emissionBreakdown.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-white">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{item.value}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Fuel Consumption Analytics */}
      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-start gap-3 mb-4">
          <Droplets className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Fuel Consumption Analytics</h3>
            <p className="text-sm text-slate-400 mb-4">
              AI-optimized fuel consumption patterns and savings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={fuelConsumptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area type="monotone" dataKey="consumption" stackId="1" stroke="#ef4444" fill="#ef4444/50" />
                <Area type="monotone" dataKey="optimized" stackId="1" stroke="#22c55e" fill="#22c55e/50" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            <div className="text-sm font-medium text-white mb-2">Monthly Fuel Savings</div>
            {fuelConsumptionData.slice(-3).map((month, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                <div>
                  <div className="text-sm text-white">{month.month}</div>
                  <div className="text-xs text-slate-400">{month.optimized}L vs {month.consumption}L</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-400">{month.saved}L saved</div>
                  <div className="text-xs text-green-400">{Math.round((month.saved / month.consumption) * 100)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Eco-Friendly Routes */}
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/30">
        <div className="flex items-start gap-3 mb-4">
          <Leaf className="w-6 h-6 text-green-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Eco-Friendly Route Optimization</h3>
            <p className="text-sm text-slate-400 mb-4">
              AI-suggested environmentally conscious routing alternatives
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {ecoRoutes.map((route, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-white">{route.route}</div>
                  <div className="text-xs text-slate-400">Route ID: {route.id}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Green Score:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    route.score >= 90 ? 'bg-green-500/20 text-green-400' :
                    route.score >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {route.score}/100
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="text-center p-2 rounded bg-slate-800/50">
                  <div className="text-slate-400">Traditional</div>
                  <div className="text-white font-medium">{route.traditional}</div>
                </div>
                <div className="text-center p-2 rounded bg-slate-800/50">
                  <div className="text-slate-400">Eco Route</div>
                  <div className="text-green-400 font-medium">{route.eco}</div>
                </div>
                <div className="text-center p-2 rounded bg-slate-800/50">
                  <div className="text-slate-400">Fuel Saved</div>
                  <div className="text-blue-400 font-medium">{route.fuelSaved}</div>
                </div>
                <div className="text-center p-2 rounded bg-slate-800/50">
                  <div className="text-slate-400">CO₂ Reduced</div>
                  <div className="text-green-400 font-medium">{route.co2Saved}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Green Delivery Scores */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-start gap-3 mb-4">
          <Award className="w-6 h-6 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Green Delivery Performance Scores</h3>
            <p className="text-sm text-slate-400 mb-4">
              Real-time environmental impact scoring for each delivery
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliveryScores.map((delivery, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-white">{delivery.deliveryId}</div>
                  <div className="text-xs text-slate-400">{delivery.vehicle} • {delivery.route}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                  delivery.score >= 90 ? 'bg-green-500/20 text-green-400' :
                  delivery.score >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {delivery.score}/100
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 mb-2">Green Factors:</div>
                <div className="flex flex-wrap gap-1">
                  {delivery.factors.map((factor, factorIdx) => (
                    <span key={factorIdx} className="text-xs px-2 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Green Initiatives */}
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/30">
        <div className="flex items-start gap-3 mb-4">
          <Leaf className="w-6 h-6 text-green-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">AI-Driven Green Initiatives</h3>
            <p className="text-sm text-slate-400 mb-4">
              Our multi-agent AI system continuously optimizes operations for minimum environmental impact
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Route Optimization', desc: 'AI reduces travel distance by 18%', impact: '-320kg CO₂' },
            { title: 'Load Consolidation', desc: 'Smart packing reduces trips by 22%', impact: '-450kg CO₂' },
            { title: 'Predictive Maintenance', desc: 'Optimal vehicle health saves 12% fuel', impact: '-280kg CO₂' }
          ].map((initiative, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50"
            >
              <h4 className="text-sm font-semibold text-white mb-2">{initiative.title}</h4>
              <p className="text-xs text-slate-400 mb-3">{initiative.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-400">Environmental Impact</span>
                <span className="text-sm font-bold text-green-400">{initiative.impact}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
