import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft,
  Menu,
  Package,
  Route,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Shield,
  User,
  Car,
  Loader2,
  XCircle
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onAccept: () => void;
  onReject: () => void;
  missionVersion?: number;
  latestServerVersion?: number;
}

interface MissionHandover {
  missionId: string;
  stops: number;
  priority: number;
  updatedRoute: boolean;
  reason: string;
  aiRecovery: boolean;
  originalDriver: string;
  replacementDriver: string;
  missionVersion: number;
  latestServerVersion: number;
}

export function NewMissionHandover({ onMenuToggle, onBack, onAccept, onReject, missionVersion, latestServerVersion }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [checklistComplete, setChecklistComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const missionHandover: MissionHandover = {
    missionId: 'MSN-20481',
    stops: 8,
    priority: 2,
    updatedRoute: true,
    reason: 'Vehicle incident - Original driver VH-4521 experienced mechanical failure',
    aiRecovery: true,
    originalDriver: 'DRV-1048',
    replacementDriver: 'DRV-2087',
    missionVersion: missionVersion || 12,
    latestServerVersion: latestServerVersion || 12
  };

  const [isVersionOutdated, setIsVersionOutdated] = useState(
    missionHandover.missionVersion < missionHandover.latestServerVersion
  );

  const checklistItems = [
    { id: 'driver', label: 'Driver verified', icon: User },
    { id: 'vehicle', label: 'Vehicle verified', icon: Car },
    { id: 'mission', label: 'Mission received', icon: Package },
    { id: 'shipments', label: 'Shipment list synchronized', icon: Package },
    { id: 'route', label: 'Route synchronized', icon: Route },
    { id: 'priority', label: 'Priority stops identified', icon: AlertTriangle },
    { id: 'instructions', label: 'Delivery instructions synchronized', icon: Shield },
    { id: 'safety', label: 'Safety requirements reviewed', icon: CheckCircle2 },
  ];

  useEffect(() => {
    // Simulate checklist verification
    const interval = setInterval(() => {
      if (currentStep < checklistItems.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        clearInterval(interval);
        setChecklistComplete(true);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleAccept = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onAccept();
    }, 2000);
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
            <h1 className="text-lg font-bold text-white">New Mission Handover</h1>
            <p className="text-xs text-zinc-400">Incoming Mission Transfer</p>
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
        {/* Mission Transferred Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">MISSION TRANSFERRED</h2>
              <p className="text-xs text-zinc-400">New mission assignment for recovery execution</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Mission ID</span>
              <span className="text-sm text-white font-medium">{missionHandover.missionId}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Stops</span>
              <span className="text-sm text-white font-medium">{missionHandover.stops}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Priority</span>
              <span className="text-sm text-orange-400 font-medium">{missionHandover.priority} High Priority</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-zinc-400">Updated Route</span>
              <span className="text-sm text-green-400 font-medium">Available</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-zinc-400">Mission Version</span>
              <span className="text-sm text-cyan-400 font-medium">v{missionHandover.missionVersion}</span>
            </div>
          </div>
        </motion.div>

        {/* Version Validation */}
        {isVersionOutdated && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-orange-500/10 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">MISSION VERSION OUTDATED</h3>
                <p className="text-xs text-zinc-300">
                  This mission has been updated. Please synchronize before accepting.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                // Simulate sync
                setIsVersionOutdated(false);
                missionHandover.missionVersion = missionHandover.latestServerVersion;
              }}
              className="w-full py-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-xl text-sm font-medium text-orange-400 transition-colors"
            >
              SYNC MISSION
            </button>
          </motion.div>
        )}

        {/* Handover Reason */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            Transfer Reason
          </h3>
          <div className="bg-zinc-800/30 rounded-xl p-3">
            <p className="text-xs text-zinc-300 leading-relaxed">
              {missionHandover.reason}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <span className="text-xs text-cyan-400">AI Recovery Recommended</span>
          </div>
        </motion.div>

        {/* Driver Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            Driver Information
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Original Driver</span>
              <span className="text-sm text-zinc-400">{missionHandover.originalDriver}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-zinc-400">Replacement Driver</span>
              <span className="text-sm text-cyan-400 font-medium">You (DRV-2087)</span>
            </div>
          </div>
        </motion.div>

        {/* Handover Checklist */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Handover Checklist
          </h3>

          <div className="space-y-2">
            {checklistItems.map((item, index) => {
              const Icon = item.icon;
              const isComplete = index < currentStep;
              const isCurrent = index === currentStep;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 py-2"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isComplete ? 'bg-green-500/20' : isCurrent ? 'bg-cyan-500/20' : 'bg-zinc-800/50'
                  }`}>
                    {isComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4 text-zinc-600" />
                    )}
                  </div>
                  <span className={`text-sm ${isComplete ? 'text-green-400' : 'text-zinc-400'}`}>
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {checklistComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-center"
            >
              <p className="text-sm text-green-400 font-medium">✓ READY TO CONTINUE</p>
            </motion.div>
          )}
        </motion.div>

        {/* Privacy Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Privacy Notice</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                You will only receive information necessary to execute this mission. Original driver's private information is protected.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {isProcessing ? (
            <button
              disabled
              className="w-full py-4 bg-zinc-800 rounded-2xl text-base font-medium text-zinc-400 flex items-center justify-center gap-2"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              Accepting Mission...
            </button>
          ) : (
            <>
              <button
                onClick={handleAccept}
                disabled={!checklistComplete || isVersionOutdated}
                className={`w-full py-4 rounded-2xl text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                  checklistComplete && !isVersionOutdated
                    ? 'bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white' 
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                Accept Mission
              </button>

              <button
                onClick={onReject}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-white transition-colors"
              >
                Decline Mission
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}