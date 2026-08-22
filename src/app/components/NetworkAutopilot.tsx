import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Route, 
  Truck, 
  Package, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Activity,
  BarChart3,
  Settings,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface OptimizationEvent {
  id: string;
  type: 'rebalance' | 'reroute' | 'efficiency' | 'congestion';
  title: string;
  description: string;
  impact: {
    onTime: number;
    fuel: number;
    cost: number;
  };
  timestamp: Date;
  status: 'proposed' | 'applied' | 'rejected';
  affected: {
    drivers: number;
    routes: number;
    suppliers: number;
  };
}

export function NetworkAutopilot() {
  const [isRunning, setIsRunning] = useState(true);
  const [events, setEvents] = useState<OptimizationEvent[]>([
    {
      id: '1',
      type: 'rebalance',
      title: 'Rebalanced 2 stops to nearby driver',
      description: 'Driver DRV-7842 took over 2 deliveries from DRV-9231 for optimal route efficiency',
      impact: { onTime: 11, fuel: -8, cost: -5 },
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      status: 'applied',
      affected: { drivers: 2, routes: 3, suppliers: 0 }
    },
    {
      id: '2', 
      type: 'reroute',
      title: 'Rerouted around congestion',
      description: 'Detected traffic congestion on I-95, rerouted 3 deliveries through alternate routes',
      impact: { onTime: 15, fuel: 3, cost: 2 },
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'applied',
      affected: { drivers: 3, routes: 3, suppliers: 2 }
    },
    {
      id: '3',
      type: 'efficiency',
      title: 'Supplier load optimization',
      description: 'Consolidated 2 pickups from same supplier into single route',
      impact: { onTime: 8, fuel: -12, cost: -7 },
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      status: 'applied',
      affected: { drivers: 1, routes: 2, suppliers: 1 }
    }
  ]);

  const [stats, setStats] = useState({
    totalOptimizations: 147,
    avgOnTimeImprovement: 12.3,
    avgFuelReduction: 9.7,
    costSavings: 28450,
    networkEfficiency: 94.2,
    lastOptimization: new Date()
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Simulate new optimization events
      const eventTypes: OptimizationEvent['type'][] = ['rebalance', 'reroute', 'efficiency', 'congestion'];
      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      const newEvent: OptimizationEvent = {
        id: Date.now().toString(),
        type: randomType,
        title: generateEventTitle(randomType),
        description: generateEventDescription(randomType),
        impact: {
          onTime: Math.floor(Math.random() * 20) - 5,
          fuel: Math.floor(Math.random() * 15) - 10,
          cost: Math.floor(Math.random() * 10) - 5
        },
        timestamp: new Date(),
        status: 'proposed',
        affected: {
          drivers: Math.floor(Math.random() * 4) + 1,
          routes: Math.floor(Math.random() * 3) + 1,
          suppliers: Math.floor(Math.random() * 2)
        }
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      
      // Auto-apply after 3 seconds
      setTimeout(() => {
        setEvents(prev => prev.map(e => 
          e.id === newEvent.id ? { ...e, status: 'applied' } : e
        ));
        setStats(prev => ({
          ...prev,
          totalOptimizations: prev.totalOptimizations + 1,
          lastOptimization: new Date()
        }));
      }, 3000);

      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const generateEventTitle = (type: OptimizationEvent['type']) => {
    const titles = {
      rebalance: [
        'Rebalanced 2 stops to nearby driver',
        'Redistributed 3 deliveries across fleet',
        'Optimized driver workload balance'
      ],
      reroute: [
        'Rerouted around congestion',
        'Alternative route applied for traffic',
        'Dynamic routing for weather conditions'
      ],
      efficiency: [
        'Supplier load optimization',
        'Consolidated nearby pickups',
        'Warehouse efficiency improvement'
      ],
      congestion: [
        'Avoided traffic bottleneck',
        'Rerouted around accident zone',
        'Preemptive congestion avoidance'
      ]
    };
    return titles[type][Math.floor(Math.random() * titles[type].length)];
  };

  const generateEventDescription = (type: OptimizationEvent['type']) => {
    const descriptions = {
      rebalance: 'Driver DRV-{id} took over {count} deliveries for optimal route efficiency',
      reroute: 'Detected {issue} on {route}, rerouted {count} deliveries through alternate paths',
      efficiency: 'Consolidated {count} pickups from same supplier into single optimized route',
      congestion: 'AI detected impending congestion, preemptively rerouted {count} vehicles'
    };
    return descriptions[type];
  };

  const getEventIcon = (type: OptimizationEvent['type']) => {
    const icons = {
      rebalance: <Truck className="w-5 h-5" />,
      reroute: <Route className="w-5 h-5" />,
      efficiency: <Package className="w-5 h-5" />,
      congestion: <AlertCircle className="w-5 h-5" />
    };
    return icons[type];
  };

  const getEventColor = (type: OptimizationEvent['type']) => {
    const colors = {
      rebalance: 'from-blue-500 to-blue-600',
      reroute: 'from-orange-500 to-orange-600', 
      efficiency: 'from-green-500 to-green-600',
      congestion: 'from-yellow-500 to-yellow-600'
    };
    return colors[type];
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}h ago`;
  };

  const handleToggleAutopilot = () => {
    setIsRunning(!isRunning);
  };

  const handleManualOptimization = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStats(prev => ({
        ...prev,
        totalOptimizations: prev.totalOptimizations + 1,
        lastOptimization: new Date()
      }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/20">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Network Autopilot</h1>
                <p className="text-slate-400">Self-improving supply chain optimization system</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleToggleAutopilot}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  isRunning 
                    ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30' 
                    : 'bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause Autopilot
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Autopilot
                  </>
                )}
              </button>
              
              <button
                onClick={handleManualOptimization}
                disabled={isProcessing}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg font-semibold hover:bg-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Optimize Now
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-slate-300">
                {isRunning ? 'Autopilot Active' : 'Autopilot Paused'}
              </span>
            </div>
            <div className="text-slate-400">
              Last optimization: {formatTimeAgo(stats.lastOptimization)}
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">{stats.totalOptimizations}</span>
            </div>
            <div className="text-sm text-slate-300">Total Optimizations</div>
            <div className="text-xs text-slate-500 mt-1">All time</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400">+{stats.avgOnTimeImprovement}%</span>
            </div>
            <div className="text-sm text-slate-300">Avg On-Time Improvement</div>
            <div className="text-xs text-slate-500 mt-1">Performance gain</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-blue-400">-{stats.avgFuelReduction}%</span>
            </div>
            <div className="text-sm text-slate-300">Avg Fuel Reduction</div>
            <div className="text-xs text-slate-500 mt-1">Efficiency gain</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">${stats.costSavings.toLocaleString()}</span>
            </div>
            <div className="text-sm text-slate-300">Cost Savings</div>
            <div className="text-xs text-slate-500 mt-1">Monthly</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-orange-400" />
              <span className="text-2xl font-bold text-orange-400">{stats.networkEfficiency}%</span>
            </div>
            <div className="text-sm text-slate-300">Network Efficiency</div>
            <div className="text-xs text-slate-500 mt-1">Current score</div>
          </div>
        </div>

        {/* Recent Optimizations */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Recent Optimizations
            </h2>
            <div className="text-sm text-slate-400">
              Live updates every 8 seconds
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getEventColor(event.type)} flex items-center justify-center flex-shrink-0`}>
                        {getEventIcon(event.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-white">{event.title}</h3>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.status === 'applied' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {event.status === 'applied' ? 'Applied' : 'Proposed'}
                          </div>
                        </div>
                        
                        <p className="text-slate-300 text-sm mb-3">{event.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">+{event.impact.onTime}% on-time</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingDown className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400">-{Math.abs(event.impact.fuel)}% fuel</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400">
                              {event.affected.drivers} drivers, {event.affected.routes} routes
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <div className="text-xs text-slate-400">{formatTimeAgo(event.timestamp)}</div>
                      {event.status === 'applied' && (
                        <div className="flex items-center gap-1 mt-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-green-400">Success</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
