import { motion } from 'motion/react';
import { 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  User,
  Car,
  Route,
  Package
} from 'lucide-react';

interface Props {
  score: number;
  driverReady: boolean;
  vehicleReady: boolean;
  routeReady: boolean;
  shipmentReady: boolean;
  onView: () => void;
}

export function MissionReadinessCard({ 
  score,
  driverReady,
  vehicleReady,
  routeReady,
  shipmentReady,
  onView
}: Props) {
  const overallReady = driverReady && vehicleReady && routeReady && shipmentReady;

  const getScoreColor = () => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = () => {
    if (score >= 90) return 'bg-green-500/10 border-green-500/30';
    if (score >= 70) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Mission Readiness</h3>
        </div>
        <div className={`px-2 py-1 rounded-lg text-sm font-bold ${getScoreColor()} ${getScoreBg()} border`}>
          {score}%
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            driverReady ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {driverReady ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400" />
            )}
          </div>
          <User className={`w-3 h-3 ${driverReady ? 'text-green-400' : 'text-red-400'}`} />
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            vehicleReady ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {vehicleReady ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400" />
            )}
          </div>
          <Car className={`w-3 h-3 ${vehicleReady ? 'text-green-400' : 'text-red-400'}`} />
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            routeReady ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {routeReady ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400" />
            )}
          </div>
          <Route className={`w-3 h-3 ${routeReady ? 'text-green-400' : 'text-red-400'}`} />
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            shipmentReady ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            {shipmentReady ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400" />
            )}
          </div>
          <Package className={`w-3 h-3 ${shipmentReady ? 'text-green-400' : 'text-red-400'}`} />
        </div>
      </div>

      {/* Status Text */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${
          overallReady ? 'text-green-400' : 'text-yellow-400'
        }`}>
          {overallReady ? 'READY' : 'ATTENTION'}
        </span>
        <button
          onClick={onView}
          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          View
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}