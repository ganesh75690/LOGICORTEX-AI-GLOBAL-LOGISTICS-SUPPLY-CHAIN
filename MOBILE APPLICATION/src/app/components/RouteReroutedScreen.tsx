import { motion } from 'motion/react';
import { CheckCircle, Clock, MapPin, Navigation, TrendingUp, Sparkles, ArrowLeft, Menu } from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onViewTasks: () => void;
  onMenuToggle: () => void;
  onBack?: () => void;
}

export function RouteReroutedScreen({ onViewTasks, onMenuToggle, onBack }: Props) {
  return (
    <div className="h-full bg-zinc-950 flex flex-col">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900/80 backdrop-blur-lg border-b border-green-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
            )}
            <button 
              onClick={onMenuToggle}
              className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              title="Menu"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
            <h2 className="font-semibold text-green-400">Route Optimized</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-medium">Back on Track</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        <svg className="w-full h-full" viewBox="0 0 400 600">
          <defs>
            <pattern id="grid-optimized" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34, 197, 94, 0.1)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="routeGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          <rect width="400" height="600" fill="url(#grid-optimized)" />

          {/* Old route (faded red) */}
          <path
            d="M 80 520 Q 120 450, 160 400 T 220 300 T 260 200 T 300 120"
            fill="none"
            stroke="rgba(239, 68, 68, 0.2)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* New optimized route (green) */}
          <motion.path
            d="M 80 520 Q 140 460, 200 420 T 280 340 T 320 240 T 340 140"
            fill="none"
            stroke="url(#routeGreen)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Animated moving dot */}
          <motion.circle
            cx="200"
            cy="420"
            r="6"
            fill="#10b981"
            animate={{
              cx: [80, 140, 200, 280, 320, 340],
              cy: [520, 460, 420, 340, 240, 140]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Stops */}
          {[
            { x: 80, y: 520, num: 1, status: 'completed' },
            { x: 200, y: 420, num: 2, status: 'current' },
            { x: 280, y: 340, num: 3, status: 'pending' },
            { x: 320, y: 240, num: 4, status: 'pending' },
            { x: 340, y: 140, num: 5, status: 'pending' },
          ].map((stop) => (
            <g key={stop.num}>
              <circle
                cx={stop.x}
                cy={stop.y}
                r="10"
                fill={
                  stop.status === 'completed' ? '#10b981' :
                  stop.status === 'current' ? '#22c55e' :
                  '#6366f1'
                }
                stroke="#fff"
                strokeWidth="2"
              />
              {stop.status === 'current' && (
                <motion.circle
                  cx={stop.x}
                  cy={stop.y}
                  r="15"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <text
                x={stop.x}
                y={stop.y + 4}
                textAnchor="middle"
                fill="#fff"
                fontSize="12"
                fontWeight="bold"
              >
                {stop.num}
              </text>
            </g>
          ))}

          {/* Success badge */}
          <motion.g
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <circle cx="200" cy="150" r="24" fill="#10b981" opacity="0.9" />
            <path d="M 190 150 L 198 158 L 210 142" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.g>
        </svg>

        {/* Updated ETA Badge */}
        <motion.div
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-cyan-500 px-4 py-2 rounded-full shadow-lg"
        >
          <p className="text-sm font-bold text-white text-center">
            New ETA: 9 min
            <span className="ml-2 text-xs opacity-90">(Saved 3 min)</span>
          </p>
        </motion.div>

        {/* Live Stats */}
        <div className="absolute top-16 left-4 right-4 flex gap-2 mt-4">
          <div className="flex-1 bg-zinc-900/90 backdrop-blur-md border border-green-500/50 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-[10px] text-zinc-400">Distance</p>
                <p className="text-xs font-semibold text-white">1.9 km</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-zinc-900/90 backdrop-blur-md border border-green-500/50 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-[10px] text-zinc-400">Time Saved</p>
                <p className="text-xs font-semibold text-green-400">14 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Explanation Card */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900/95 backdrop-blur-lg border-t border-green-500/30 p-5"
      >
        <div className="mb-4 bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/50 rounded-2xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-white">AI Route Optimization</h3>
                <span className="px-2 py-0.5 bg-green-500/20 rounded text-[10px] font-medium text-green-300">
                  87% confident
                </span>
              </div>
              <p className="text-xs text-zinc-300 mb-2">
                Route updated automatically based on live traffic data
              </p>
            </div>
          </div>

          {/* Why section */}
          <div className="p-3 bg-zinc-900/50 rounded-lg mb-3">
            <p className="text-[10px] text-zinc-400 mb-1 font-medium">Why this decision?</p>
            <p className="text-xs text-zinc-300">
              Heavy traffic detected on Main St. Alternative route via Highway 101 is clear and reduces delivery time by 14 minutes.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-zinc-900/50 rounded-lg p-2 text-center">
              <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">14 min</p>
              <p className="text-[9px] text-zinc-400">Saved</p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-2 text-center">
              <CheckCircle className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">87%</p>
              <p className="text-[9px] text-zinc-400">Confidence</p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-2 text-center">
              <MapPin className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-white">1.9 km</p>
              <p className="text-[9px] text-zinc-400">Distance</p>
            </div>
          </div>
        </div>

        <button
          onClick={onViewTasks}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 rounded-xl font-semibold text-white transition-all"
        >
          View Delivery Tasks
        </button>
      </motion.div>
    </div>
  );
}
