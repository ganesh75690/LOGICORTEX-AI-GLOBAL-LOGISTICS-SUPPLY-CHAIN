import { motion } from 'motion/react';
import { 
  Shield, 
  AlertTriangle, 
  Phone,
  User,
  Package,
  Clock,
  ChevronRight
} from 'lucide-react';

interface Props {
  isActive: boolean;
  emergencyType?: string;
  location?: string;
  onView?: () => void;
}

export function EmergencyStatusCard({ isActive, emergencyType, location, onView }: Props) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">EMERGENCY MODE</h3>
            <p className="text-xs text-red-400">SAFETY CONTINUITY ACTIVE</p>
          </div>
        </div>
        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
      </div>

      <div className="space-y-2 mb-3">
        {emergencyType && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Type</span>
            <span className="text-white font-medium">{emergencyType}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Location</span>
            <span className="text-white font-medium">{location}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400">Status</span>
          <span className="text-red-400 font-medium">ATTENTION REQUIRED</span>
        </div>
      </div>

      <button
        onClick={onView}
        className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-xs font-medium text-red-400 transition-colors flex items-center justify-center gap-1"
      >
        <Shield className="w-3 h-3" />
        View Emergency Status
        <ChevronRight className="w-3 h-3" />
      </button>
    </motion.div>
  );
}