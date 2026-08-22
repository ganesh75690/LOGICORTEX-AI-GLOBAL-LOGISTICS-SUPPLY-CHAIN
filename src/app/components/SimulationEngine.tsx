import { Play, RotateCcw, TrendingUp, TrendingDown, Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  parameters: {
    trafficIncrease?: number;
    weatherDelay?: number;
    demandSpike?: number;
    driverShortage?: number;
  };
  icon: string;
}

const scenarios: SimulationScenario[] = [
  {
    id: 'traffic',
    name: 'Heavy Traffic Scenario',
    description: 'Simulate 50% increase in traffic congestion on major routes',
    parameters: { trafficIncrease: 50 },
    icon: '🚦'
  },
  {
    id: 'weather',
    name: 'Severe Weather Event',
    description: 'Simulate storm causing 2-hour delays across multiple zones',
    parameters: { weatherDelay: 120 },
    icon: '⛈️'
  },
  {
    id: 'demand',
    name: 'Demand Surge',
    description: 'Simulate 200% spike in demand due to seasonal shopping',
    parameters: { demandSpike: 200 },
    icon: '📈'
  },
  {
    id: 'shortage',
    name: 'Driver Shortage',
    description: 'Simulate 30% reduction in available drivers',
    parameters: { driverShortage: 30 },
    icon: '👥'
  }
];

const generateSimulationData = (scenario: string) => {
  const baseline = [
    { time: '0h', current: 100, optimized: 100, baseline: 100 },
    { time: '2h', current: 95, optimized: 98, baseline: 100 },
    { time: '4h', current: 88, optimized: 96, baseline: 100 },
    { time: '6h', current: 82, optimized: 94, baseline: 100 },
    { time: '8h', current: 75, optimized: 92, baseline: 100 },
    { time: '10h', current: 68, optimized: 90, baseline: 100 },
    { time: '12h', current: 62, optimized: 88, baseline: 100 },
  ];

  if (scenario === 'traffic') {
    return baseline.map((d, i) => ({
      ...d,
      current: Math.max(20, d.current - i * 8),
      optimized: Math.max(60, d.optimized - i * 3)
    }));
  }

  if (scenario === 'weather') {
    return baseline.map((d, i) => ({
      ...d,
      current: Math.max(30, d.current - i * 10),
      optimized: Math.max(70, d.optimized - i * 2)
    }));
  }

  if (scenario === 'demand') {
    return baseline.map((d, i) => ({
      ...d,
      current: Math.max(40, d.current - i * 12),
      optimized: Math.max(75, d.optimized - i * 4)
    }));
  }

  return baseline;
};

export function SimulationEngine() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runSimulation = (scenarioId: string) => {
    setIsRunning(true);
    setSelectedScenario(scenarioId);

    setTimeout(() => {
      const data = generateSimulationData(scenarioId);
      const currentFinal = data[data.length - 1].current;
      const optimizedFinal = data[data.length - 1].optimized;
      const improvement = ((optimizedFinal - currentFinal) / currentFinal * 100).toFixed(1);

      setResults({
        data,
        improvement: parseFloat(improvement),
        costSaved: Math.round(Math.random() * 5000 + 2000),
        timeSaved: Math.round(Math.random() * 180 + 60),
        efficiencyGain: parseFloat(improvement)
      });
      setIsRunning(false);
    }, 2000);
  };

  const resetSimulation = () => {
    setSelectedScenario(null);
    setResults(null);
    setIsRunning(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-semibold text-white">What-If Simulation Engine</h2>
        </div>
        {results && (
          <button
            onClick={resetSimulation}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>

      {!selectedScenario ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((scenario, idx) => (
            <motion.button
              key={scenario.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => runSimulation(scenario.id)}
              className="text-left p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-[#00F5C4]/50 hover:bg-slate-700/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{scenario.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00F5C4] transition-colors">
                    {scenario.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">{scenario.description}</p>
                  <div className="flex items-center gap-2 text-[#00F5C4] text-sm font-medium">
                    <Play className="w-4 h-4" />
                    <span>Run Simulation</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {isRunning ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#00F5C4] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-lg text-white font-medium">Running Simulation...</p>
              <p className="text-sm text-slate-400 mt-2">Analyzing disruption patterns and optimizing routes</p>
            </div>
          ) : results && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Results Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-green-400">Efficiency Gain</span>
                  </div>
                  <div className="text-3xl font-bold text-white">+{results.efficiencyGain}%</div>
                  <div className="text-xs text-slate-400 mt-1">with AI optimization</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-blue-400">Cost Saved</span>
                  </div>
                  <div className="text-3xl font-bold text-white">${(results.costSaved / 1000).toFixed(1)}K</div>
                  <div className="text-xs text-slate-400 mt-1">estimated savings</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-purple-400">Time Saved</span>
                  </div>
                  <div className="text-3xl font-bold text-white">{results.timeSaved}m</div>
                  <div className="text-xs text-slate-400 mt-1">across all routes</div>
                </div>
              </div>

              {/* Performance Comparison Chart */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={results.data}>
                    <defs>
                      <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="baseline"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      fill="url(#colorBaseline)"
                      name="Normal Operations"
                    />
                    <Area
                      type="monotone"
                      dataKey="current"
                      stroke="#ef4444"
                      strokeWidth={2}
                      fill="url(#colorCurrent)"
                      name="Without AI"
                    />
                    <Area
                      type="monotone"
                      dataKey="optimized"
                      stroke="#22c55e"
                      strokeWidth={2}
                      fill="url(#colorOptimized)"
                      name="With AI Optimization"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* AI Recommendations */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">AI Recommendations</h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0">•</span>
                        <span>Activate dynamic rerouting for all affected routes to minimize delay impact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0">•</span>
                        <span>Increase buffer inventory at warehouses by 15% to handle disruption spikes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0">•</span>
                        <span>Pre-position additional vehicles at strategic hubs for rapid deployment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0">•</span>
                        <span>Enable auto-decision mode to respond to disruptions within 30 seconds</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
