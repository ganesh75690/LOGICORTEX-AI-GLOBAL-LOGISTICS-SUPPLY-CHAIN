import { motion } from 'motion/react';
import { 
  Shield, 
  AlertTriangle, 
  ChevronRight,
  User,
  Package,
  Clock
} from 'lucide-react';

interface Props {
  status: 'normal' | 'recovery_required' | 'in_progress';
  affectedShipments?: number;
  recommendedDriver?: string;
  delay?: number;
  onView: () => void;
}

export function MissionRecoveryStatusCard({ 
  status, 
  affectedShipments = 0, 
  recommendedDriver = '', 
  delay = 0,
  onView 
}: Props) {
  const getStatusColor = () => {
    switch (status) {
      case 'normal': return 'text-green-400';
      case 'recovery_required': return 'text-red-400';
      case 'in_progress': return 'text-yellow-400';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'normal': return 'bg-green-500/10 border-green-500/30';
      case 'recovery_required': return 'bg-red-500/10 border-red-500/30';
      case 'in_progress': return 'bg-yellow-500/10 border-yellow-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 backdrop-blux-xl border border-zinc-800/50 rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Mission Recovery</h3>
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusBg()} ${getStatusColor()} border`}>
          {status === 'normal' ? 'NORMAL' : status === 'recovery_required' ? 'RECOVERY REQUIRED' : 'IN PROGRESS'}
        </div>
      </div>

      {status === 'normal' ? (
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span>All systems operational</span>
        </div>
      ) : (
        <div className="space-y-2">
          {status === 'recovery_required' && (
            <div className="flex items-center gap-2 text-xs text-red-400">
              <AlertTriangle className="w-3 h-3" />
              <span>🚨 {affectedShipments} shipments affected</span>
            </div>
          )}
          
          {recommendedDriver && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <User className="w-3 h-3" />
                <span>Recommended: {recommendedDriver}</span>
              </div>
            </div>
          )}
          
          {delay > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Clock className="w-3 h-3" />
                <span>Delay: +{delay} min</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <span className={`text-xs font-medium ${
          status === 'normal' ? 'text-green-400' : 'text-red-400'
        }`}>
          {status === 'normal' ? 'Status: Normal' : 'Status: Action Required'}
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