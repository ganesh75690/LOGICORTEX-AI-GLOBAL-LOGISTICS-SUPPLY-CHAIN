import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Clock, MapPin, Navigation, X, ArrowLeft, Menu } from 'lucide-react';
import { useState } from 'react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onContinue: () => void;
  onMenuToggle: () => void;
  onBack?: () => void;
}

export function RouteDisruptionScreen({ onContinue, onMenuToggle, onBack }: Props) {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="h-full bg-zinc-950 flex flex-col">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900/80 backdrop-blur-lg border-b border-red-500/30">
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
            <h2 className="font-semibold text-red-400">Route Disruption</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs text-red-400 font-medium">Delay Detected</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
        <svg className="w-full h-full" viewBox="0 0 400 600">
          <defs>
            <pattern id="grid-disruption" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(239, 68, 68, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>

          <rect width="400" height="600" fill="url(#grid-disruption)" />

          {/* Traffic risk zone */}
          <motion.ellipse
            cx="220"
            cy="300"
            rx="80"
            ry="60"
            fill="rgba(239, 68, 68, 0.15)"
            stroke="rgba(239, 68, 68, 0.5)"
            strokeWidth="2"
            strokeDasharray="5 5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Red route line (showing risk) */}
          <motion.path
            d="M 80 520 Q 120 450, 160 400 T 220 300 T 260 200 T 300 120"
            fill="none"
            stroke="#ef4444"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="8 4"
            animate={{
              strokeDashoffset: [0, -12],
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />

          {/* Stops */}
          {[
            { x: 80, y: 520, num: 1, status: 'completed' },
            { x: 160, y: 400, num: 2, status: 'current' },
            { x: 220, y: 300, num: 3, status: 'risk' },
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
                  stop.status === 'risk' ? '#ef4444' :
                  '#6366f1'
                }
                stroke="#fff"
                strokeWidth="2"
              />
              {stop.status === 'risk' && (
                <motion.circle
                  cx={stop.x}
                  cy={stop.y}
                  r="15"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
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

          {/* Warning icon on map */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <circle cx="220" cy="250" r="20" fill="#ef4444" opacity="0.9" />
            <text x="220" y="258" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold">!</text>
          </motion.g>
        </svg>

        {/* Live Stats - Updated */}
        <div className="absolute top-4 left-4 right-4 flex gap-2">
          <div className="flex-1 bg-zinc-900/90 backdrop-blur-md border border-red-500/50 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-red-400" />
              <div>
                <p className="text-[10px] text-zinc-400">Distance</p>
                <p className="text-xs font-semibold text-white">2.8 km</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-zinc-900/90 backdrop-blur-md border border-red-500/50 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400" />
              <div>
                <p className="text-[10px] text-zinc-400">Delayed ETA</p>
                <p className="text-xs font-semibold text-red-400">24 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Popup */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="absolute top-20 left-4 right-4 bg-zinc-900/95 backdrop-blur-lg border border-red-500/50 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">
                    Heavy Traffic Detected
                  </h3>
                  <p className="text-xs text-zinc-300">
                    Major congestion on your current route
                  </p>
                </div>
                <button
                  onClick={() => setShowAlert(false)}
                  className="text-zinc-400 hover:text-white"
                  aria-label="Close alert"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-zinc-900/95 backdrop-blur-lg border-t border-red-500/30 p-5"
      >
        {/* Alert Banner */}
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-300 mb-1">
                Delay Predicted
              </h3>
              <p className="text-xs text-zinc-400 mb-2">
                Traffic congestion will add approximately 12 minutes to your route
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-red-500/20 rounded text-xs font-medium text-red-300">
                  87% confidence
                </span>
                <span className="text-xs text-zinc-500">AI Prediction</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-semibold text-white transition-all"
        >
          Find Alternative Route
        </button>
      </motion.div>
    </div>
  );
}
