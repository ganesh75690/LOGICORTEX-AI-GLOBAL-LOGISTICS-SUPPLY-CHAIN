import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  ArrowLeft,
  Menu,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  User,
  Car,
  Package,
  Route,
  Activity,
  Play,
  RefreshCw,
  Loader2,
  Info,
  Clock
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onStartMission: () => void;
  onViewTrustPassport: () => void;
}

interface ReadinessCheck {
  name: string;
  status: 'ready' | 'attention' | 'not_ready';
  details?: string;
  score: number;
}

interface MissionInfo {
  id: string;
  destination: string;
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
}

export function MissionReadinessScreen({ 
  onMenuToggle, 
  onBack,
  onStartMission,
  onViewTrustPassport
}: Props) {
  const [isChecking, setIsChecking] = useState(true);
  const [checkProgress, setCheckProgress] = useState(0);
  const [readinessChecks, setReadinessChecks] = useState<ReadinessCheck[]>([]);
  const [overallReadiness, setOverallReadiness] = useState(0);
  const [missionInfo, setMissionInfo] = useState<MissionInfo | null>(null);
  const [canStart, setCanStart] = useState(false);

  // Simulate mission readiness check
  useEffect(() => {
    const mockMissionInfo: MissionInfo = {
      id: 'MSN-2024-0813-001',
      destination: 'Mumbai Distribution Center',
      estimatedTime: '2h 15min',
      priority: 'high'
    };

    const mockChecks: ReadinessCheck[] = [
      { 
        name: 'Driver Readiness', 
        status: 'ready',
        details: 'All requirements verified',
        score: 94
      },
      { 
        name: 'Vehicle Readiness', 
        status: 'ready',
        details: 'Vehicle GJ01AB4521 ready',
        score: 96
      },
      { 
        name: 'Shipment Readiness', 
        status: 'ready',
        details: 'SHP-20481 ready for pickup',
        score: 100
      },
      { 
        name: 'Route Readiness', 
        status: 'ready',
        details: 'Optimal route calculated',
        score: 98
      },
    ];

    const checkSteps = [
      { progress: 25, check: mockChecks[0] },
      { progress: 50, check: mockChecks[1] },
      { progress: 75, check: mockChecks[2] },
      { progress: 100, check: mockChecks[3] },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < checkSteps.length) {
        const step = checkSteps[currentStep];
        setCheckProgress(step.progress);
        setReadinessChecks(prev => [...prev, step.check]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsChecking(false);
        setMissionInfo(mockMissionInfo);
        
        const avgScore = Math.round(mockChecks.reduce((acc, check) => acc + check.score, 0) / mockChecks.length);
        setOverallReadiness(avgScore);
        setCanStart(mockChecks.every(check => check.status === 'ready'));
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: ReadinessCheck['status']) => {
    switch (status) {
      case 'ready': return 'text-green-400';
      case 'attention': return 'text-yellow-400';
      case 'not_ready': return 'text-red-400';
    }
  };

  const getStatusBg = (status: ReadinessCheck['status']) => {
    switch (status) {
      case 'ready': return 'bg-green-500/10 border-green-500/30';
      case 'attention': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'not_ready': return 'bg-red-500/10 border-red-500/30';
    }
  };

  const getStatusIcon = (status: ReadinessCheck['status']) => {
    switch (status) {
      case 'ready': return CheckCircle2;
      case 'attention': return AlertTriangle;
      case 'not_ready': return XCircle;
    }
  };

  const getPriorityColor = (priority: MissionInfo['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/30';
    }
  };

  const handleRefresh = () => {
    setIsChecking(true);
    setCheckProgress(0);
    setReadinessChecks([]);
    setOverallReadiness(0);
    setCanStart(false);
    
    // Re-run check simulation
    setTimeout(() => {
      const mockChecks: ReadinessCheck[] = [
        { name: 'Driver Readiness', status: 'ready', details: 'All requirements verified', score: 94 },
        { name: 'Vehicle Readiness', status: 'ready', details: 'Vehicle GJ01AB4521 ready', score: 96 },
        { name: 'Shipment Readiness', status: 'ready', details: 'SHP-20481 ready for pickup', score: 100 },
        { name: 'Route Readiness', status: 'ready', details: 'Optimal route calculated', score: 98 },
      ];

      setReadinessChecks(mockChecks);
      setOverallReadiness(97);
      setCanStart(true);
      setIsChecking(false);
    }, 2400);
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
            <h1 className="text-lg font-bold text-white">Mission Readiness</h1>
            <p className="text-xs text-zinc-400">Pre-Flight System Check</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleRefresh}
            disabled={isChecking}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-white ${isChecking ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={onMenuToggle}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Checking Progress */}
        {isChecking && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 text-center"
          >
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Checking Mission Readiness</h3>
            <p className="text-sm text-zinc-400 mb-4">
              {checkProgress < 25 ? 'Verifying driver readiness...' :
               checkProgress < 50 ? 'Checking vehicle status...' :
               checkProgress < 75 ? 'Validating shipment information...' :
               'Calculating optimal route...'}
            </p>
            
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${checkProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        {/* Mission Info */}
        {!isChecking && missionInfo && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-zinc-400 mb-1">Mission ID</p>
                <p className="text-lg font-bold text-white">{missionInfo.id}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(missionInfo.priority)}`}>
                {missionInfo.priority.toUpperCase()} PRIORITY
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Route className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-xs text-zinc-400">Destination</p>
                  <p className="text-sm text-white">{missionInfo.destination}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-xs text-zinc-400">Estimated Time</p>
                  <p className="text-sm text-white">{missionInfo.estimatedTime}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Overall Readiness Score */}
        {!isChecking && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-br ${
              canStart ? 'from-green-500/10 to-cyan-500/10 border-green-500/30' : 'from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
            } backdrop-blur-xl border rounded-2xl p-6 text-center`}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-800/50 flex items-center justify-center">
              {canStart ? (
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-yellow-400" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              {canStart ? 'MISSION READY' : 'ATTENTION REQUIRED'}
            </h2>
            
            <div className="text-5xl font-bold text-white mb-2">
              {overallReadiness}%
            </div>
            
            <p className="text-sm text-zinc-400">
              {canStart ? 'All systems operational and ready for execution' : 'Some systems require attention before departure'}
            </p>
          </motion.div>
        )}

        {/* Readiness Checks */}
        {!isChecking && readinessChecks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
          >
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              System Checks
            </h3>

            <div className="space-y-3">
              {readinessChecks.map((check, index) => {
                const StatusIcon = getStatusIcon(check.status);
                const iconMap = {
                  'Driver Readiness': User,
                  'Vehicle Readiness': Car,
                  'Shipment Readiness': Package,
                  'Route Readiness': Route,
                };
                const ItemIcon = iconMap[check.name as keyof typeof iconMap] || Activity;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-xl ${getStatusBg(check.status)} border`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center">
                        <ItemIcon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{check.name}</p>
                        {check.details && (
                          <p className="text-xs text-zinc-400">{check.details}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-white">{check.score}%</span>
                      <StatusIcon className={`w-5 h-5 ${getStatusColor(check.status)}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Trust Passport Link */}
        {!isChecking && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
          >
            <button
              onClick={onViewTrustPassport}
              className="w-full flex items-center justify-between p-3 bg-zinc-800/30 hover:bg-zinc-700/30 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-cyan-400" />
                <div className="text-left">
                  <p className="text-sm text-white font-medium">View Digital Trust Passport</p>
                  <p className="text-xs text-zinc-400">Detailed verification status</p>
                </div>
              </div>
              <ArrowLeft className="w-4 h-4 text-zinc-400 rotate-180" />
            </button>
          </motion.div>
        )}

        {/* AI Intelligence Notice */}
        {!isChecking && canStart && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <Info className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">AI-Optimized Mission</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  This mission has been optimized using LOGICORTEX AI intelligence. 
                  Route, timing, and resource allocation have been calculated for maximum efficiency.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Warning for attention required */}
        {!isChecking && !canStart && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">Action Required</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Mission requires attention before departure. Please address the highlighted issues above 
                  to ensure safe and efficient operation.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Start Mission Button */}
      {!isChecking && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 border-t border-zinc-800/50"
        >
          <button
            onClick={onStartMission}
            disabled={!canStart}
            className={`w-full py-4 rounded-2xl text-base font-semibold transition-all flex items-center justify-center gap-2 ${
              canStart 
                ? 'bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white' 
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <Play className="w-5 h-5" />
            {canStart ? 'Start Mission' : 'Resolve Issues First'}
          </button>
        </motion.div>
      )}
    </div>
  );
}