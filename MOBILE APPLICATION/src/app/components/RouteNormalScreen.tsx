import { motion } from 'motion/react';
import { Navigation, Clock, MapPin, Zap, Menu, ArrowLeft } from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onSimulateDisruption: () => void;
  onMenuToggle: () => void;
  onBack?: () => void;
}

export function RouteNormalScreen({ onSimulateDisruption, onMenuToggle, onBack }: Props) {
  return (
    <div className="h-full bg-zinc-950 flex flex-col">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900/80 backdrop-blur-lg border-b border-cyan-500/20">
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
            <h2 className="font-semibold text-cyan-400">Active Route</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-medium">On Track</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        <svg className="w-full h-full" viewBox="0 0 400 600">
          <defs>
            <pattern id="grid-normal" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="routeBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          <rect width="400" height="600" fill="url(#grid-normal)" />

          {/* Blue route line */}
          <motion.path
            d="M 80 520 Q 120 450, 160 400 T 220 300 T 260 200 T 300 120"
            fill="none"
            stroke="url(#routeBlue)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Animated moving dot */}
          <motion.circle
            cx="160"
            cy="400"
            r="6"
            fill="#06b6d4"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              cx: [80, 120, 160, 220, 260, 300],
              cy: [520, 450, 400, 300, 200, 120]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Stops */}
          {[
            { x: 80, y: 520, num: 1, status: 'completed' },
            { x: 160, y: 400, num: 2, status: 'current' },
            { x: 220, y: 300, num: 3, status: 'pending' },
            { x: 260, y: 200, num: 4, status: 'pending' },
            { x: 300, y: 120, num: 5, status: 'pending' },
          ].map((stop) => (
            <g key={stop.num}>
              <circle
                cx={stop.x}
                cy={stop.y}
                r="10"
                fill={
                  stop.status === 'completed' ? '#10b981' :
                  stop.status === 'current' ? '#06b6d4' :
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
                  stroke="#06b6d4"
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
        </svg>

        {/* Live Stats */}
        <div className="absolute top-4 left-4 right-4 flex gap-2">
          <div className="flex-1 bg-zinc-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-[10px] text-zinc-400">Distance</p>
                <p className="text-xs font-semibold text-white">2.3 km</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-zinc-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-[10px] text-zinc-400">ETA</p>
                <p className="text-xs font-semibold text-white">12 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="bg-zinc-900/95 backdrop-blur-lg border-t border-cyan-500/20 p-5"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white mb-1">
              Next Stop: Warehouse B
            </h3>
            <p className="text-sm text-zinc-400 mb-2">
              5678 Elm Avenue, Sector 12
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white font-medium">ETA: 12 min</span>
              </div>
              <div className="px-2 py-1 bg-green-500/20 border border-green-500/50 rounded-lg">
                <span className="text-xs text-green-400 font-medium">On Track</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onSimulateDisruption}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Simulate Disruption
        </button>
      </motion.div>
    </div>
  );
}
