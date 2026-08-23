import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, MapPin, Navigation, CheckCircle, AlertCircle, Circle } from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface DeliveryStop {
  id: string;
  address: string;
  customer: string;
  coordinates: { lat: number; lng: number };
  status: 'completed' | 'current' | 'pending' | 'risk';
  eta: string;
  priority: 'high' | 'medium' | 'low';
  packages: number;
  notes?: string;
}

interface RouteData {
  stops: DeliveryStop[];
  totalDistance: number;
  totalTime: number;
  currentTimeSaved: number;
  fuelSaved: number;
}

interface Props {
  routeData: RouteData;
  onBack: () => void;
  onCompleteStop: (stopId: string) => void;
  onNavigateToStop: (stopId: string) => void;
}

export function AllStopsScreen({ routeData, onBack, onCompleteStop, onNavigateToStop }: Props) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'current':
        return <Navigation className="w-5 h-5 text-cyan-500" />;
      case 'risk':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Circle className="w-5 h-5 text-zinc-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/30 bg-green-500/5';
      case 'current':
        return 'border-cyan-500/30 bg-cyan-500/5';
      case 'risk':
        return 'border-red-500/30 bg-red-500/5';
      default:
        return 'border-zinc-700 bg-zinc-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'current':
        return 'bg-cyan-500/20 text-cyan-400';
      case 'risk':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-zinc-700 text-zinc-400';
    }
  };

  return (
    <div className="h-full bg-zinc-950 text-white flex flex-col">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      {/* Header */}
      <div className="bg-zinc-900/95 backdrop-blur-lg border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              aria-label="Go back to previous screen"
              title="Go back"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-white">All Delivery Stops</h1>
              <p className="text-xs text-zinc-400">Route Overview</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-white">{routeData.stops.length} Stops</div>
            <div className="text-xs text-zinc-400">{routeData.totalDistance} km total</div>
          </div>
        </div>
      </div>

      {/* Route Summary Cards */}
      <div className="px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-zinc-800 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-400">
              {routeData.stops.filter(s => s.status === 'completed').length}
            </div>
            <div className="text-xs text-zinc-400">Completed</div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-cyan-400">
              {routeData.stops.filter(s => s.status === 'current').length}
            </div>
            <div className="text-xs text-zinc-400">In Progress</div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-zinc-400">
              {routeData.stops.filter(s => s.status === 'pending').length}
            </div>
            <div className="text-xs text-zinc-400">Pending</div>
          </div>
        </div>
      </div>

      {/* Stops List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {routeData.stops.map((stop, index) => (
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl border p-4 ${getStatusColor(stop.status)}`}
            >
              <div className="flex items-start gap-3">
                {/* Stop Number and Icon */}
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    stop.status === 'completed' ? 'bg-green-500' :
                    stop.status === 'current' ? 'bg-cyan-500' :
                    stop.status === 'risk' ? 'bg-red-500' :
                    'bg-zinc-600'
                  }`}>
                    {index + 1}
                  </div>
                  {getStatusIcon(stop.status)}
                </div>

                {/* Stop Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white truncate">{stop.customer}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(stop.status)}`}>
                      {stop.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-zinc-300 mb-3">{stop.address}</p>
                  
                  {/* Stop Info Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      <span className="text-xs text-zinc-400">{stop.eta}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      <span className="text-xs text-zinc-400 capitalize">{stop.priority}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-zinc-400">{stop.packages} pkg</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {stop.notes && (
                    <div className="p-2 bg-zinc-800/50 rounded-lg mb-3">
                      <p className="text-xs text-zinc-400">
                        <span className="font-medium">Note:</span> {stop.notes}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {stop.status === 'current' && (
                      <>
                        <button
                          onClick={() => onNavigateToStop(stop.id)}
                          className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-xs font-medium text-white transition-colors flex items-center justify-center gap-1"
                        >
                          <Navigation className="w-3 h-3" />
                          Navigate
                        </button>
                        <button
                          onClick={() => onCompleteStop(stop.id)}
                          className="flex-1 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-xs font-medium text-white transition-colors"
                        >
                          Mark Complete
                        </button>
                      </>
                    )}
                    {stop.status === 'pending' && (
                      <button
                        onClick={() => onNavigateToStop(stop.id)}
                        className="w-full py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-xs font-medium text-white transition-colors flex items-center justify-center gap-1"
                      >
                        <Navigation className="w-3 h-3" />
                        View on Map
                      </button>
                    )}
                    {stop.status === 'completed' && (
                      <button
                        onClick={() => onNavigateToStop(stop.id)}
                        className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-medium text-zinc-400 transition-colors flex items-center justify-center gap-1"
                      >
                        <MapPin className="w-3 h-3" />
                        View Location
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800 px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-zinc-400">Total Distance:</span>
              <span className="text-white font-medium ml-1">{routeData.totalDistance} km</span>
            </div>
            <div>
              <span className="text-zinc-400">Est. Time:</span>
              <span className="text-white font-medium ml-1">{routeData.totalTime} min</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-green-400 font-medium">⚡ {routeData.currentTimeSaved} min saved</div>
            <div className="text-xs text-zinc-400">AI optimized</div>
          </div>
        </div>
      </div>
    </div>
  );
}
