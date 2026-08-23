import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Menu,
  User,
  Car,
  Package,
  Clock,
  CheckCircle2,
  Route,
  AlertTriangle,
  Share2,
  Download
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onComplete: () => void;
}

interface HandoverPlan {
  originalDriver: string;
  replacementDriver: string;
  originalVehicle: string;
  replacementVehicle: string;
  remainingStops: number;
  transferredShipments: number;
  priorityShipments: number;
  updatedETA: string;
  expectedDelay: number;
  handoverStatus: 'ready' | 'in_progress' | 'completed';
}

export function HandoverPlan({ onMenuToggle, onBack, onComplete }: Props) {
  const handoverPlan: HandoverPlan = {
    originalDriver: 'DRV-1048',
    replacementDriver: 'DRV-2087',
    originalVehicle: 'VH-4521',
    replacementVehicle: 'VH-1042',
    remainingStops: 8,
    transferredShipments: 8,
    priorityShipments: 2,
    updatedETA: '16:42',
    expectedDelay: 12,
    handoverStatus: 'ready'
  };

  const handleShare = () => {
    console.log('Sharing handover plan');
  };

  const handleDownload = () => {
    console.log('Downloading handover plan');
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
            <h1 className="text-lg font-bold text-white">Mission Handover Plan</h1>
            <p className="text-xs text-zinc-400">Authorized Recovery Transfer</p>
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
        {/* Handover Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">HANDOVER APPROVED</h2>
              <p className="text-xs text-zinc-400">Mission transfer authorized and ready</p>
            </div>
          </div>

          <div className={`px-3 py-2 rounded-lg text-center ${
            handoverPlan.handoverStatus === 'ready' ? 'bg-green-500/20 text-green-400' :
            handoverPlan.handoverStatus === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-cyan-500/20 text-cyan-400'
          }`}>
            <span className="text-sm font-medium">
              {handoverPlan.handoverStatus === 'ready' ? '✓ READY TO TRANSFER' :
               handoverPlan.handoverStatus === 'in_progress' ? '⏳ TRANSFER IN PROGRESS' :
               '✓ TRANSFER COMPLETED'}
            </span>
          </div>
        </motion.div>

        {/* Driver Transfer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            Driver Transfer
          </h3>

          <div className="flex items-center justify-between">
            <div className="text-center p-3 bg-zinc-800/30 rounded-xl flex-1">
              <p className="text-xs text-zinc-400 mb-1">Original Driver</p>
              <p className="text-sm text-white font-medium">{handoverPlan.originalDriver}</p>
            </div>
            
            <div className="px-4">
              <ArrowLeft className="w-5 h-5 text-zinc-600 rotate-180" />
            </div>
            
            <div className="text-center p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex-1">
              <p className="text-xs text-zinc-400 mb-1">Replacement Driver</p>
              <p className="text-sm text-cyan-400 font-medium">{handoverPlan.replacementDriver}</p>
            </div>
          </div>
        </motion.div>

        {/* Vehicle Transfer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Car className="w-4 h-4 text-cyan-400" />
            Vehicle Transfer
          </h3>

          <div className="flex items-center justify-between">
            <div className="text-center p-3 bg-zinc-800/30 rounded-xl flex-1">
              <p className="text-xs text-zinc-400 mb-1">Original Vehicle</p>
              <p className="text-sm text-white font-medium">{handoverPlan.originalVehicle}</p>
            </div>
            
            <div className="px-4">
              <ArrowLeft className="w-5 h-5 text-zinc-600 rotate-180" />
            </div>
            
            <div className="text-center p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex-1">
              <p className="text-xs text-zinc-400 mb-1">Replacement Vehicle</p>
              <p className="text-sm text-cyan-400 font-medium">{handoverPlan.replacementVehicle}</p>
            </div>
          </div>
        </motion.div>

        {/* Mission Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-cyan-400" />
            Mission Details
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Remaining Stops</p>
              <p className="text-xl font-bold text-white">{handoverPlan.remainingStops}</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Transferred Shipments</p>
              <p className="text-xl font-bold text-white">{handoverPlan.transferredShipments}</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Priority Shipments</p>
              <p className="text-xl font-bold text-orange-400">{handoverPlan.priorityShipments}</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Updated ETA</p>
              <p className="text-xl font-bold text-green-400">{handoverPlan.updatedETA}</p>
            </div>
          </div>
        </motion.div>

        {/* Timing Impact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Timing Impact
          </h3>

          <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-xl">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-xs text-zinc-400">Expected Delay</p>
                <p className="text-sm text-orange-400 font-medium">+{handoverPlan.expectedDelay} minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs text-green-400">Within acceptable range</span>
            </div>
          </div>
        </motion.div>

        {/* System Synchronization */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            System Synchronization
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Driver Mobile</span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Supplier Web</span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-zinc-400">Admin Web</span>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
          </div>

          <p className="text-xs text-zinc-500 mt-4 text-center">
            All systems will be notified upon handover completion
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-2 p-4 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800/50 rounded-xl transition-colors"
          >
            <Share2 className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-white">Share Plan</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="flex flex-col items-center gap-2 p-4 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800/50 rounded-xl transition-colors"
          >
            <Download className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-white">Download</span>
          </button>
        </motion.div>
      </div>

      {/* Complete Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-4 border-t border-zinc-800/50"
      >
        <button
          onClick={onComplete}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
        >
          <Route className="w-5 h-5" />
          Execute Handover
        </button>
      </motion.div>
    </div>
  );
}