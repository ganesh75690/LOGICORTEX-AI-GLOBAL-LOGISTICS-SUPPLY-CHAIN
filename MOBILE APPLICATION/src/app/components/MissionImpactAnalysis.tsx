import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Menu,
  Package,
  Route,
  User,
  Car,
  Clock,
  AlertTriangle,
  MapPin,
  Calendar,
  Activity
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onNext: () => void;
}

interface MissionImpact {
  missionId: string;
  currentDriver: string;
  currentVehicle: string;
  currentLocation: string;
  remainingStops: number;
  affectedShipments: number;
  highPriorityShipments: number;
  deliveryDeadlines: string;
  currentETA: string;
  expectedDelay: number;
  missionRisk: 'low' | 'medium' | 'high' | 'critical';
}

export function MissionImpactAnalysis({ onMenuToggle, onBack, onNext }: Props) {
  const missionImpact: MissionImpact = {
    missionId: 'MSN-20481',
    currentDriver: 'DRV-1048',
    currentVehicle: 'VH-4521',
    currentLocation: 'Mile 42, Highway 101',
    remainingStops: 8,
    affectedShipments: 8,
    highPriorityShipments: 2,
    deliveryDeadlines: '16:20',
    currentETA: '16:20',
    expectedDelay: 37,
    missionRisk: 'high'
  };

  const getRiskColor = () => {
    switch (missionImpact.missionRisk) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
    }
  };

  const getRiskBg = () => {
    switch (missionImpact.missionRisk) {
      case 'critical': return 'bg-red-500/10 border-red-500/30';
      case 'high': return 'bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'bg-green-500/10 border-green-500/30';
    }
  };

  return (
    <div className="size-full flex flex-col bg-zinc-950">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Mission Impact Analysis</h1>
            <p className="text-xs text-zinc-400">AI Recovery Intelligence</p>
          </div>
        </div>
        <button 
          onClick={onMenuToggle}
          className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Mission Status Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border ${getRiskBg()} rounded-2xl p-4`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">MISSION IMPACT</h2>
                <p className={`text-sm font-semibold ${getRiskColor()}`}>
                  {missionImpact.missionRisk.toUpperCase()} IMPACT
                </p>
              </div>
            </div>
            <span className="text-xs text-zinc-400">14:12</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Mission ID</p>
              <p className="text-sm text-white font-medium">{missionImpact.missionId}</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Current Driver</p>
              <p className="text-sm text-white font-medium">{missionImpact.currentDriver}</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Vehicle</p>
              <p className="text-sm text-white font-medium">{missionImpact.currentVehicle}</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Location</p>
              <p className="text-sm text-white font-medium">{missionImpact.currentLocation}</p>
            </div>
          </div>
        </motion.div>

        {/* Shipment Impact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-cyan-400" />
            Shipment Impact
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-zinc-800/30 rounded-xl">
              <p className="text-2xl font-bold text-white">{missionImpact.remainingStops}</p>
              <p className="text-xs text-zinc-400">Remaining Stops</p>
            </div>
            <div className="text-center p-3 bg-zinc-800/30 rounded-xl">
              <p className="text-2xl font-bold text-orange-400">{missionImpact.affectedShipments}</p>
              <p className="text-xs text-zinc-400">Affected</p>
            </div>
            <div className="text-center p-3 bg-zinc-800/30 rounded-xl">
              <p className="text-2xl font-bold text-red-400">{missionImpact.highPriorityShipments}</p>
              <p className="text-xs text-zinc-400">High Priority</p>
            </div>
          </div>
        </motion.div>

        {/* Timing Impact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Timing Impact
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-xl">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-400">Original ETA</p>
                  <p className="text-sm text-white">{missionImpact.currentETA}</p>
                </div>
              </div>
              <span className="text-sm text-zinc-400">16:20</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="text-xs text-zinc-400">Expected Delay</p>
                  <p className="text-sm text-orange-400 font-medium">+{missionImpact.expectedDelay} min</p>
                </div>
              </div>
              <span className="text-sm text-orange-400">~16:57</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-xl">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-400">Deadline Status</p>
                  <p className="text-sm text-white">{missionImpact.deliveryDeadlines}</p>
                </div>
              </div>
              <span className="text-xs text-yellow-400">At Risk</span>
            </div>
          </div>
        </motion.div>

        {/* AI Analysis Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            AI Analysis Summary
          </h3>

          <div className="space-y-2 text-xs text-zinc-300">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5" />
              <span>8 shipments require recovery action</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5" />
              <span>2 high-priority shipments at risk of deadline breach</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5" />
              <span>37-minute delay expected without recovery</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5" />
              <span>5 eligible drivers available for recovery</span>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 border-t border-zinc-800/50"
        >
          <button
            onClick={onNext}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
          >
            <Route className="w-5 h-5" />
            View Recovery Options
          </button>
        </motion.div>
      </div>
    </div>
  );
}