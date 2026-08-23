import { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Clock, Navigation, Zap, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Stop {
  id: string;
  address: string;
  lat: number;
  lng: number;
  status: 'pending' | 'current' | 'completed';
  eta: string;
  priority: 'high' | 'medium' | 'low';
}

interface Alert {
  id: string;
  type: 'delay' | 'traffic' | 'weather' | 'route-change';
  message: string;
  confidence: number;
}

interface AIDecision {
  id: string;
  title: string;
  description: string;
  confidence: number;
  timeSaved?: string;
  reason: string;
}

export function RouteMapScreen() {
  const [stops, setStops] = useState<Stop[]>([
    { id: '1', address: '1234 Oak St', lat: 37.7749, lng: -122.4194, status: 'completed', eta: 'Completed', priority: 'high' },
    { id: '2', address: '5678 Elm Ave', lat: 37.7849, lng: -122.4094, status: 'current', eta: '2:15 PM', priority: 'high' },
    { id: '3', address: '9012 Pine Rd', lat: 37.7949, lng: -122.3994, status: 'pending', eta: '2:45 PM', priority: 'medium' },
    { id: '4', address: '3456 Maple Dr', lat: 37.8049, lng: -122.3894, status: 'pending', eta: '3:20 PM', priority: 'low' },
    { id: '5', address: '7890 Cedar Ln', lat: 37.8149, lng: -122.3794, status: 'pending', eta: '4:00 PM', priority: 'medium' },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', type: 'delay', message: 'Traffic delay predicted ahead', confidence: 87 },
  ]);

  const [aiDecision, setAiDecision] = useState<AIDecision | null>(null);
  const [showDisruptionModal, setShowDisruptionModal] = useState(false);
  const [routeAnimation, setRouteAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRouteAnimation(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const simulateDisruption = () => {
    setShowDisruptionModal(false);

    setTimeout(() => {
      setAlerts(prev => [...prev, {
        id: Date.now().toString(),
        type: 'traffic',
        message: 'Major traffic on current route',
        confidence: 92
      }]);
    }, 500);

    setTimeout(() => {
      setAiDecision({
        id: Date.now().toString(),
        title: 'Route Optimization Available',
        description: 'Alternative route detected with better ETA',
        confidence: 94,
        timeSaved: '15 mins',
        reason: 'Heavy traffic detected on Main St. Alternative route via Highway 101 is clear with 15 min time saving.'
      });
    }, 1500);

    setTimeout(() => {
      const newStops = [...stops];
      newStops[2].eta = '2:35 PM';
      newStops[3].eta = '3:05 PM';
      setStops(newStops);
    }, 2500);
  };

  const acceptAIDecision = () => {
    setAiDecision(null);
    setAlerts(prev => prev.filter(a => a.type !== 'traffic'));
  };

  return (
    <div className="h-full flex flex-col bg-zinc-950 text-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900/80 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-cyan-400">Active Route</h2>
            <p className="text-xs text-zinc-400">5 stops remaining</p>
          </div>
          <button
            onClick={() => setShowDisruptionModal(true)}
            className="px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/50 text-purple-300 text-xs font-medium hover:bg-purple-500/30 transition-colors"
          >
            <Zap className="w-3 h-3 inline mr-1" />
            Simulate
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        {/* Stylized Map */}
        <svg className="w-full h-full" viewBox="0 0 400 600">
          {/* Grid Pattern */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          <rect width="400" height="600" fill="url(#grid)" />

          {/* Traffic Zone (Red Risk Area) */}
          <motion.circle
            cx="250"
            cy="300"
            r="60"
            fill="rgba(239, 68, 68, 0.15)"
            stroke="rgba(239, 68, 68, 0.4)"
            strokeWidth="1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Route Path */}
          <motion.path
            d="M 100 500 Q 150 400, 200 350 T 250 250 T 280 150"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />

          {/* Animated Route Pulse */}
          <motion.circle
            cx="200"
            cy="350"
            r="4"
            fill="#06b6d4"
            animate={{
              cx: [100, 150, 200, 250, 280],
              cy: [500, 400, 350, 250, 150]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Stops */}
          {stops.map((stop, idx) => {
            const x = 100 + idx * 45;
            const y = 500 - idx * 87.5;

            return (
              <g key={stop.id}>
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill={
                    stop.status === 'completed' ? '#10b981' :
                    stop.status === 'current' ? '#06b6d4' :
                    '#6366f1'
                  }
                  stroke={
                    stop.status === 'current' ? '#06b6d4' : 'transparent'
                  }
                  strokeWidth="2"
                />
                {stop.status === 'current' && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    opacity="0.6"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <text
                  x={x}
                  y={y + 20}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="500"
                >
                  {idx + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Stats Overlay */}
        <div className="absolute top-4 left-4 right-4 flex gap-2">
          <div className="flex-1 bg-zinc-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-[10px] text-zinc-400">Next Stop</p>
                <p className="text-xs font-semibold text-white">2.3 mi</p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-zinc-900/90 backdrop-blur-md border border-purple-500/30 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-[10px] text-zinc-400">ETA</p>
                <p className="text-xs font-semibold text-white">2:15 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <AnimatePresence>
        {alerts.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="px-4 pb-2"
          >
            {alerts.map(alert => (
              <div
                key={alert.id}
                className="mb-2 p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl"
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-orange-300">{alert.message}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      Confidence: {alert.confidence}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Decision Card */}
      <AnimatePresence>
        {aiDecision && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="px-4 pb-2"
          >
            <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-semibold text-white">{aiDecision.title}</h3>
                </div>
                <span className="px-2 py-0.5 bg-cyan-500/20 rounded text-[10px] font-medium text-cyan-300">
                  {aiDecision.confidence}% confident
                </span>
              </div>

              <p className="text-sm text-zinc-300 mb-2">{aiDecision.description}</p>

              {aiDecision.timeSaved && (
                <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-300 font-medium">
                    Save {aiDecision.timeSaved}
                  </span>
                </div>
              )}

              <div className="mb-3 p-2 bg-zinc-900/50 rounded-lg">
                <p className="text-[10px] text-zinc-400 mb-1">Why this decision?</p>
                <p className="text-xs text-zinc-300">{aiDecision.reason}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={acceptAIDecision}
                  className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-semibold text-white transition-colors"
                >
                  Accept Route
                </button>
                <button
                  onClick={() => setAiDecision(null)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium text-zinc-300 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stop List Preview */}
      <div className="px-4 py-3 bg-zinc-900/80 backdrop-blur-lg border-t border-cyan-500/20 max-h-48 overflow-y-auto">
        <h3 className="text-xs font-semibold text-cyan-400 mb-2">Upcoming Stops</h3>
        <div className="space-y-2">
          {stops.filter(s => s.status !== 'completed').map((stop, idx) => (
            <div
              key={stop.id}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                stop.status === 'current'
                  ? 'bg-cyan-500/10 border border-cyan-500/30'
                  : 'bg-zinc-800/50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                stop.status === 'current'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-zinc-700 text-zinc-400'
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{stop.address}</p>
                <p className="text-[10px] text-zinc-400">{stop.eta}</p>
              </div>
              <MapPin className={`w-4 h-4 ${
                stop.priority === 'high' ? 'text-red-400' :
                stop.priority === 'medium' ? 'text-yellow-400' :
                'text-green-400'
              }`} />
            </div>
          ))}
        </div>
      </div>

      {/* Disruption Modal */}
      <AnimatePresence>
        {showDisruptionModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setShowDisruptionModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-zinc-900 border border-purple-500/50 rounded-2xl p-6 z-50"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Simulate Disruption</h3>
              <p className="text-sm text-zinc-400 mb-6">
                This will trigger a traffic event and demonstrate AI route optimization in real-time.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={simulateDisruption}
                  className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl font-semibold text-white transition-colors"
                >
                  Start Simulation
                </button>
                <button
                  onClick={() => setShowDisruptionModal(false)}
                  className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-medium text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
