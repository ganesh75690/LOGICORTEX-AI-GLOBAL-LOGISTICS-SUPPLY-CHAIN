import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  ArrowLeft,
  Menu,
  Clock,
  Package,
  Route,
  User,
  Car,
  XCircle,
  CheckCircle2,
  Phone,
  Loader2
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onReview: () => void;
  onContactOperations: () => void;
  onAcceptRecovery?: () => void;
  canAutonomousApprove?: boolean;
}

interface RecoveryTrigger {
  type: 'vehicle_breakdown' | 'driver_emergency' | 'driver_unavailable' | 'vehicle_safety' | 'critical_route' | 'operational_incapacity' | 'severe_delay' | 'mission_failure';
  severity: 'low' | 'medium' | 'high' | 'mission_critical';
  description: string;
  timestamp: string;
}

export function MissionRecoveryAlert({ 
  onMenuToggle, 
  onBack,
  onReview,
  onContactOperations,
  onAcceptRecovery,
  canAutonomousApprove = false
}: Props) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [recoveryTrigger, setRecoveryTrigger] = useState<RecoveryTrigger | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Demo data
  useEffect(() => {
    const mockTrigger: RecoveryTrigger = {
      type: 'vehicle_breakdown',
      severity: 'mission_critical',
      description: 'Vehicle VH-4521 experienced mechanical failure. Driver is safe but cannot continue the mission.',
      timestamp: '14:12'
    };

    const analysisSteps = [
      { progress: 20, message: 'Detecting incident type...' },
      { progress: 40, message: 'Assessing mission impact...' },
      { progress: 60, message: 'Identifying affected shipments...' },
      { progress: 80, message: 'Evaluating recovery options...' },
      { progress: 100, message: 'Mission recovery required' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < analysisSteps.length) {
        const step = analysisSteps[currentStep];
        setAnalysisProgress(step.progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setRecoveryTrigger(mockTrigger);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = () => {
    if (!recoveryTrigger) return 'text-zinc-400';
    switch (recoveryTrigger.severity) {
      case 'mission_critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
    }
  };

  const getSeverityBg = () => {
    if (!recoveryTrigger) return 'bg-zinc-500/10 border-zinc-500/30';
    switch (recoveryTrigger.severity) {
      case 'mission_critical': return 'bg-red-500/10 border-red-500/30';
      case 'high': return 'bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'bg-blue-500/10 border-blue-500/30';
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
            <h1 className="text-lg font-bold text-white">Mission Recovery</h1>
            <p className="text-xs text-zinc-400">Continuity Intelligence</p>
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
        {/* Analysis Progress */}
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 text-center"
          >
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Analyzing Mission Impact</h3>
            <p className="text-sm text-zinc-400 mb-4">
              {analysisProgress < 20 ? 'Detecting incident type...' :
               analysisProgress < 40 ? 'Assessing mission impact...' :
               analysisProgress < 60 ? 'Identifying affected shipments...' :
               analysisProgress < 80 ? 'Evaluating recovery options...' :
               'Mission recovery required'}
            </p>
            
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-cyan-500 to-red-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${analysisProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        {/* Recovery Required Alert */}
        {!isAnalyzing && recoveryTrigger && (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl border ${getSeverityBg()} rounded-2xl p-4`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-white mb-1">MISSION RECOVERY REQUIRED</h2>
                  <p className={`text-sm font-semibold ${getSeverityColor()}`}>
                    {recoveryTrigger.severity.toUpperCase()} IMPACT
                  </p>
                </div>
              </div>

              <div className="bg-zinc-800/30 rounded-xl p-3 mb-4">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {recoveryTrigger.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Clock className="w-3 h-3" />
                <span>Detected at {recoveryTrigger.timestamp}</span>
              </div>
            </motion.div>

            {/* Mission Impact Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
            >
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-cyan-400" />
                Mission Impact Analysis
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-400 mb-1">Mission ID</p>
                  <p className="text-sm text-white font-medium">MSN-20481</p>
                </div>
                <div className="bg-zinc-800/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-400 mb-1">Current Driver</p>
                  <p className="text-sm text-white font-medium">DRV-1048</p>
                </div>
                <div className="bg-zinc-800/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-400 mb-1">Vehicle</p>
                  <p className="text-sm text-white font-medium">VH-4521</p>
                </div>
                <div className="bg-zinc-800/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-400 mb-1">Remaining Stops</p>
                  <p className="text-sm text-white font-medium">8</p>
                </div>
                <div className="bg-zinc-800/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-400 mb-1">High Priority</p>
                  <p className="text-sm text-white font-medium">2</p>
                </div>
                <div className="bg-zinc-800/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-400 mb-1">Est. Delay</p>
                  <p className="text-sm text-orange-400 font-medium">+37 min</p>
                </div>
              </div>
            </motion.div>

            {/* AI Status */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Route className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">AI Recovery Analysis</h3>
                  <p className="text-xs text-zinc-400 mb-2">
                    LogiCortex AI is evaluating recovery options and will recommend the best course of action.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-xs text-cyan-400">Analysis in progress</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <button
                onClick={onReview}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Review Recovery Options
              </button>

              <button
                onClick={onContactOperations}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-white transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Contact Operations
              </button>

              {canAutonomousApprove && onAcceptRecovery && (
                <button
                  onClick={onAcceptRecovery}
                  className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-sm font-medium text-cyan-400 transition-colors"
                >
                  Accept Autonomous Recovery
                </button>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}