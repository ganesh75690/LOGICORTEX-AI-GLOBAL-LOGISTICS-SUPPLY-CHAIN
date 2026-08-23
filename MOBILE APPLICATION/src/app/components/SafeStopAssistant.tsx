import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Fuel, Coffee, Car, Navigation, AlertTriangle, X } from 'lucide-react';

interface SafeStop {
  id: string;
  type: 'parking' | 'fuel' | 'rest' | 'service';
  name: string;
  distance: number;
  eta: string;
  rating?: number;
  services: string[];
  coordinates: { lat: number; lng: number };
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onStopSelect: (stop: SafeStop) => void;
  currentIssue: string;
}

export function SafeStopAssistant({ isVisible, onClose, onStopSelect, currentIssue }: Props) {
  const safeStops: SafeStop[] = [
    {
      id: '1',
      type: 'parking',
      name: 'City Mall Parking',
      distance: 0.3,
      eta: '2 min',
      rating: 4.5,
      services: ['24/7', 'Security', 'Restrooms'],
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: '2',
      type: 'fuel',
      name: 'HP Fuel Station',
      distance: 0.5,
      eta: '3 min',
      rating: 4.2,
      services: ['Fuel', 'Air', 'Store'],
      coordinates: { lat: 12.9726, lng: 77.5956 }
    },
    {
      id: '3',
      type: 'rest',
      name: 'Highway Cafe',
      distance: 0.8,
      eta: '5 min',
      rating: 4.7,
      services: ['Food', 'Restrooms', 'WiFi'],
      coordinates: { lat: 12.9736, lng: 77.5966 }
    },
    {
      id: '4',
      type: 'service',
      name: 'Mechanic Shop',
      distance: 1.2,
      eta: '7 min',
      rating: 4.0,
      services: ['Repair', 'Tow Service'],
      coordinates: { lat: 12.9746, lng: 77.5976 }
    }
  ];

  const getStopIcon = (type: string) => {
    switch (type) {
      case 'parking': return MapPin;
      case 'fuel': return Fuel;
      case 'rest': return Coffee;
      case 'service': return Car;
      default: return MapPin;
    }
  };

  const getStopColor = (type: string) => {
    switch (type) {
      case 'parking': return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      case 'fuel': return 'text-green-400 bg-green-500/20 border-green-500/50';
      case 'rest': return 'text-purple-400 bg-purple-500/20 border-purple-500/50';
      case 'service': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getStopEmoji = (type: string) => {
    switch (type) {
      case 'parking': return '🅿️';
      case 'fuel': return '⛽';
      case 'rest': return '☕';
      case 'service': return '🔧';
      default: return '📍';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="bg-zinc-900 border-t-4 border-red-500 rounded-t-3xl p-4 sm:p-6 max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-zinc-800 pb-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Safe Stop Assistant</h3>
                    <p className="text-sm text-zinc-400">AI-suggested safe locations nearby</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close Safe Stop Assistant"
                  className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Issue Alert */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Issue Detected</p>
                    <p className="text-xs text-red-400">{currentIssue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Safe Stops List */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <h4 className="text-sm font-semibold text-zinc-300 mb-4">Recommended Safe Stops</h4>
              <div className="space-y-3">
                {safeStops.map((stop, index) => {
                  const Icon = getStopIcon(stop.type);
                  
                  return (
                    <motion.button
                      key={stop.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => onStopSelect(stop)}
                      className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 text-left hover:bg-zinc-800 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${getStopColor(stop.type)} border flex items-center justify-center flex-shrink-0`}>
                          <span className="text-lg">{getStopEmoji(stop.type)}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h5 className="text-sm font-semibold text-white">{stop.name}</h5>
                              <div className="flex items-center gap-2 text-xs text-zinc-400">
                                <span>{stop.distance} km away</span>
                                <span>•</span>
                                <span>{stop.eta}</span>
                                {stop.rating && (
                                  <>
                                    <span>•</span>
                                    <span className="text-yellow-400">⭐ {stop.rating}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <Navigation className="w-4 h-4 text-cyan-400" />
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {stop.services.map((service, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-zinc-700/50 rounded text-xs text-zinc-300"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-zinc-800 pt-4 mt-4">
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">AI Recommendation</p>
                    <p className="text-xs text-zinc-300">
                      Based on your current issue and traffic conditions, City Mall Parking is the safest and closest option with 24/7 security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
