import { Navigation, Phone, MapPin, Clock, AlertCircle, CheckCircle, Package } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Delivery {
  id: string;
  address: string;
  eta: string;
  status: 'next' | 'in-progress' | 'completed';
  packages: number;
  notes?: string;
}

const mockDeliveries: Delivery[] = [
  { id: 'D001', address: '1234 Market St, San Francisco', eta: '15 min', status: 'in-progress', packages: 3 },
  { id: 'D002', address: '5678 Mission St, San Francisco', eta: '35 min', status: 'next', packages: 2 },
  { id: 'D003', address: '9012 Valencia St, San Francisco', eta: '58 min', status: 'next', packages: 5, notes: 'Ring doorbell twice' },
  { id: 'D004', address: '3456 Folsom St, San Francisco', eta: '1h 22m', status: 'next', packages: 1 },
];

export function DriverMobileApp() {
  const [activeDelivery, setActiveDelivery] = useState('D001');
  const [routeAlert, setRouteAlert] = useState(true);

  return (
    <div className="max-w-sm mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
      {/* Phone Status Bar */}
      <div className="bg-slate-950 px-6 py-3 flex items-center justify-between text-xs text-slate-400">
        <span>9:41 AM</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 border border-slate-400 rounded-sm relative">
            <div className="absolute inset-0.5 bg-slate-400 rounded-sm" />
          </div>
        </div>
      </div>

      {/* App Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-blue-200">Driver Dashboard</div>
            <div className="text-2xl font-bold text-white mt-1">John Smith</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-xs text-blue-200">Deliveries</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">4.2h</div>
            <div className="text-xs text-blue-200">ETA</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">87%</div>
            <div className="text-xs text-blue-200">On-Time</div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {routeAlert && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white mb-1">Route Update Available</div>
              <div className="text-xs text-white/90 mb-3">Alternative route saves 30 minutes. Heavy traffic detected ahead.</div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#00F5C4] text-black text-xs font-medium rounded-lg">
                  Accept Reroute
                </button>
                <button
                  onClick={() => setRouteAlert(false)}
                  className="px-4 py-2 bg-white/20 text-white text-xs font-medium rounded-lg"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content Area */}
      <div className="bg-slate-900 px-6 py-6 space-y-4">
        {/* Current Delivery Card */}
        <div className="bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Navigation className="w-5 h-5 text-white" />
            <span className="text-sm text-white/90 font-medium">Current Delivery</span>
          </div>
          <div className="text-xl font-bold text-white mb-2">1234 Market St</div>
          <div className="text-sm text-white/80 mb-4">San Francisco, CA 94103</div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white">ETA: 15 min</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white">3 packages</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-3 bg-white text-[#00F5C4] text-sm font-medium rounded-xl flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" />
              Navigate
            </button>
            <button className="px-4 py-3 bg-white/20 text-white text-sm font-medium rounded-xl" title="Call Customer">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Upcoming Deliveries */}
        <div>
          <div className="text-sm font-semibold text-slate-400 mb-3">Upcoming Deliveries</div>
          <div className="space-y-3">
            {mockDeliveries.filter(d => d.status === 'next').map((delivery, idx) => (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800 rounded-xl p-4 border border-slate-700"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 flex-shrink-0">
                    {idx + 2}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white mb-1">{delivery.address}</div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{delivery.eta}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span>{delivery.packages} pkg{delivery.packages > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    {delivery.notes && (
                      <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-400">
                        📝 {delivery.notes}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-slate-950 px-6 py-4 flex items-center justify-around border-t border-slate-800">
        <button className="flex flex-col items-center gap-1">
          <Navigation className="w-5 h-5 text-blue-400" />
          <span className="text-xs text-blue-400">Routes</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Package className="w-5 h-5 text-slate-500" />
          <span className="text-xs text-slate-500">Deliveries</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <MapPin className="w-5 h-5 text-slate-500" />
          <span className="text-xs text-slate-500">Map</span>
        </button>
      </div>
    </div>
  );
}
