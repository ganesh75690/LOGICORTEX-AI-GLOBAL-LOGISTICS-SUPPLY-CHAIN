import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  ArrowLeft,
  Menu,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  User,
  Car,
  FileText,
  Award,
  Clock,
  Activity,
  Lock,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
}

interface TrustIndicator {
  name: string;
  status: 'verified' | 'attention' | 'not_ready';
  details?: string;
  expiry?: string;
}

interface VehicleInfo {
  id: string;
  status: 'ready' | 'attention' | 'not_ready';
  insurance: 'valid' | 'expiring' | 'expired';
  fitness: 'valid' | 'expiring' | 'expired';
  maintenance: 'healthy' | 'due' | 'overdue';
}

export function DigitalTrustPassportScreen({ 
  onMenuToggle, 
  onBack
}: Props) {
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Demo data
  const driverId = 'DRV-1048';
  const driverName = 'Raj Kumar';
  const overallStatus: 'ready' | 'attention' | 'not_ready' = 'ready';
  const readinessScore = 94;

  const trustIndicators: TrustIndicator[] = [
    { 
      name: 'Identity Verification', 
      status: 'verified',
      details: 'Government ID verified'
    },
    { 
      name: 'License Readiness', 
      status: 'verified',
      details: 'Valid until 2026-12-15'
    },
    { 
      name: 'Required Training', 
      status: 'attention',
      details: 'Refresher due in 45 days',
      expiry: '2025-09-30'
    },
    { 
      name: 'Vehicle Association', 
      status: 'verified',
      details: 'GJ01AB4521 linked'
    },
    { 
      name: 'Operational Readiness', 
      status: 'verified',
      details: 'All requirements met'
    },
    { 
      name: 'Compliance Status', 
      status: 'verified',
      details: 'All clearances current'
    },
  ];

  const vehicleInfo: VehicleInfo = {
    id: 'GJ01AB4521',
    status: 'ready',
    insurance: 'valid',
    fitness: 'valid',
    maintenance: 'healthy'
  };

  const scoreBreakdown = [
    { name: 'Identity Verification', score: 100 },
    { name: 'License Readiness', score: 100 },
    { name: 'Training', score: 92 },
    { name: 'Vehicle Readiness', score: 96 },
    { name: 'Compliance', score: 94 },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getStatusColor = (status: TrustIndicator['status']) => {
    switch (status) {
      case 'verified': return 'text-green-400';
      case 'attention': return 'text-yellow-400';
      case 'not_ready': return 'text-red-400';
    }
  };

  const getStatusBg = (status: TrustIndicator['status']) => {
    switch (status) {
      case 'verified': return 'bg-green-500/10 border-green-500/30';
      case 'attention': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'not_ready': return 'bg-red-500/10 border-red-500/30';
    }
  };

  const getStatusIcon = (status: TrustIndicator['status']) => {
    switch (status) {
      case 'verified': return CheckCircle2;
      case 'attention': return AlertTriangle;
      case 'not_ready': return XCircle;
    }
  };

  const maskSensitiveData = (data: string) => {
    if (showSensitiveData) return data;
    if (data.length <= 4) return 'XXXX';
    return data.substring(0, 2) + 'X'.repeat(data.length - 4) + data.substring(data.length - 2);
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
            <h1 className="text-lg font-bold text-white">Digital Trust Passport</h1>
            <p className="text-xs text-zinc-400">Secure Driver Identity Layer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
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
        {/* Driver Identity Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-1">Driver</p>
                <p className="text-lg font-bold text-white">{maskSensitiveData(driverId)}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              overallStatus === 'ready' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
              overallStatus === 'attention' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
              'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              {overallStatus === 'ready' ? '✓ OPERATIONALLY VERIFIED' :
               overallStatus === 'attention' ? '⚠ ATTENTION REQUIRED' :
               '✗ NOT READY'}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-zinc-400">Driver Name</p>
              <p className="text-sm text-white">{driverName}</p>
            </div>
            <button
              onClick={() => setShowSensitiveData(!showSensitiveData)}
              className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg transition-colors"
            >
              {showSensitiveData ? (
                <EyeOff className="w-4 h-4 text-zinc-400" />
              ) : (
                <Eye className="w-4 h-4 text-zinc-400" />
              )}
              <span className="text-xs text-zinc-400">
                {showSensitiveData ? 'Hide' : 'Show'} Details
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Lock className="w-3 h-3" />
            <span>Privacy-First Design • Data Minimization Applied</span>
          </div>
        </motion.div>

        {/* Driver Readiness Score */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Driver Readiness Score
            </h3>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{readinessScore}/100</p>
              <p className="text-xs text-zinc-400">Overall Score</p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-3">
            {scoreBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-400">{item.name}</span>
                  <span className="text-xs text-white">{item.score}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      item.score >= 95 ? 'bg-green-500' :
                      item.score >= 80 ? 'bg-cyan-500' :
                      item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Trust Indicators
          </h3>

          <div className="space-y-2">
            {trustIndicators.map((indicator, index) => {
              const StatusIcon = getStatusIcon(indicator.status);
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl ${getStatusBg(indicator.status)} border`}
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon className={`w-4 h-4 ${getStatusColor(indicator.status)}`} />
                    <div>
                      <p className="text-sm text-white font-medium">{indicator.name}</p>
                      {indicator.details && (
                        <p className="text-xs text-zinc-400">{indicator.details}</p>
                      )}
                    </div>
                  </div>
                  {indicator.expiry && (
                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                      <Clock className="w-3 h-3" />
                      <span>{indicator.expiry}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Vehicle Trust Link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Car className="w-4 h-4 text-cyan-400" />
            Vehicle Trust Link
          </h3>

          <div className="bg-zinc-800/30 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-zinc-400 mb-1">Driver</p>
                <p className="text-sm text-white">{maskSensitiveData(driverId)}</p>
              </div>
              <div className="w-px h-8 bg-zinc-700" />
              <div>
                <p className="text-xs text-zinc-400 mb-1">Vehicle</p>
                <p className="text-sm text-white">{vehicleInfo.id}</p>
              </div>
            </div>

            <div className={`px-3 py-2 rounded-lg text-center text-sm font-medium ${
              vehicleInfo.status === 'ready' ? 'bg-green-500/10 text-green-400' :
              vehicleInfo.status === 'attention' ? 'bg-yellow-500/10 text-yellow-400' :
              'bg-red-500/10 text-red-400'
            }`}>
              {vehicleInfo.status === 'ready' ? '✓ VEHICLE READY' :
               vehicleInfo.status === 'attention' ? '⚠ ATTENTION REQUIRED' :
               '✗ NOT READY'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-400">Insurance</span>
                {vehicleInfo.insurance === 'valid' ? (
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                ) : vehicleInfo.insurance === 'expiring' ? (
                  <AlertTriangle className="w-3 h-3 text-yellow-400" />
                ) : (
                  <XCircle className="w-3 h-3 text-red-400" />
                )}
              </div>
              <p className={`text-sm font-medium ${
                vehicleInfo.insurance === 'valid' ? 'text-green-400' :
                vehicleInfo.insurance === 'expiring' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {vehicleInfo.insurance === 'valid' ? 'Valid' :
                 vehicleInfo.insurance === 'expiring' ? 'Expiring' : 'Expired'}
              </p>
            </div>

            <div className="bg-zinc-800/30 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-400">Fitness</span>
                {vehicleInfo.fitness === 'valid' ? (
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                ) : vehicleInfo.fitness === 'expiring' ? (
                  <AlertTriangle className="w-3 h-3 text-yellow-400" />
                ) : (
                  <XCircle className="w-3 h-3 text-red-400" />
                )}
              </div>
              <p className={`text-sm font-medium ${
                vehicleInfo.fitness === 'valid' ? 'text-green-400' :
                vehicleInfo.fitness === 'expiring' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {vehicleInfo.fitness === 'valid' ? 'Valid' :
                 vehicleInfo.fitness === 'expiring' ? 'Expiring' : 'Expired'}
              </p>
            </div>

            <div className="bg-zinc-800/30 rounded-xl p-3 col-span-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-400">Maintenance</span>
                {vehicleInfo.maintenance === 'healthy' ? (
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                ) : vehicleInfo.maintenance === 'due' ? (
                  <AlertTriangle className="w-3 h-3 text-yellow-400" />
                ) : (
                  <XCircle className="w-3 h-3 text-red-400" />
                )}
              </div>
              <p className={`text-sm font-medium ${
                vehicleInfo.maintenance === 'healthy' ? 'text-green-400' :
                vehicleInfo.maintenance === 'due' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {vehicleInfo.maintenance === 'healthy' ? 'Healthy' :
                 vehicleInfo.maintenance === 'due' ? 'Due Soon' : 'Overdue'}
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Overall Mission Readiness</span>
              <span className="text-lg font-bold text-green-400">96%</span>
            </div>
          </div>
        </motion.div>

        {/* Privacy Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <Lock className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Privacy-First Design</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                This system verifies required attributes without unnecessarily exposing underlying personal data. 
                Sensitive information is masked by default and only shown when explicitly requested.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}