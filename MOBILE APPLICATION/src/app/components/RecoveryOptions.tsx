import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft,
  Menu,
  User,
  Car,
  MapPin,
  CheckCircle2,
  Star,
  Clock,
  AlertTriangle,
  Shield,
  ChevronRight,
  Info
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onSelectOption: (optionId: string) => void;
}

interface RecoveryOption {
  id: string;
  driverId: string;
  driverName: string;
  vehicleId: string;
  vehicleType: string;
  distance: number;
  missionCompatibility: number;
  readiness: number;
  estimatedDelay: number;
  recoveryConfidence: number;
  isRecommended: boolean;
  reason: string;
  trustValidation: {
    identity: boolean;
    license: boolean;
    training: boolean;
    compliance: boolean;
    vehicle: boolean;
    eligibility: boolean;
  };
  vehicleValidation: {
    available: boolean;
    capacity: boolean;
    insurance: boolean;
    fitness: boolean;
    maintenance: boolean;
    compatible: boolean;
  };
}

export function RecoveryOptions({ onMenuToggle, onBack, onSelectOption }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Demo data
  const recoveryOptions: RecoveryOption[] = [
    {
      id: 'OPT-A',
      driverId: 'DRV-2087',
      driverName: 'Priya Sharma',
      vehicleId: 'VH-1042',
      vehicleType: 'Van',
      distance: 4.8,
      missionCompatibility: 98,
      readiness: 96,
      estimatedDelay: 12,
      recoveryConfidence: 94,
      isRecommended: true,
      reason: 'Closest eligible driver with compatible vehicle capacity and highest mission readiness.',
      trustValidation: {
        identity: true,
        license: true,
        training: true,
        compliance: true,
        vehicle: true,
        eligibility: true
      },
      vehicleValidation: {
        available: true,
        capacity: true,
        insurance: true,
        fitness: true,
        maintenance: true,
        compatible: true
      }
    },
    {
      id: 'OPT-B',
      driverId: 'DRV-3021',
      driverName: 'Amit Patel',
      vehicleId: 'VH-1108',
      vehicleType: 'Truck',
      distance: 7.2,
      missionCompatibility: 91,
      readiness: 89,
      estimatedDelay: 21,
      recoveryConfidence: 86,
      isRecommended: false,
      reason: 'Suitable alternative with good capacity but slightly longer travel time.',
      trustValidation: {
        identity: true,
        license: true,
        training: true,
        compliance: true,
        vehicle: true,
        eligibility: true
      },
      vehicleValidation: {
        available: true,
        capacity: true,
        insurance: true,
        fitness: true,
        maintenance: true,
        compatible: true
      }
    },
    {
      id: 'OPT-C',
      driverId: 'DRV-4156',
      driverName: 'Rahul Singh',
      vehicleId: 'VH-2095',
      vehicleType: 'Van',
      distance: 12.5,
      missionCompatibility: 88,
      readiness: 85,
      estimatedDelay: 28,
      recoveryConfidence: 81,
      isRecommended: false,
      reason: 'Good readiness score but distance may impact timing.',
      trustValidation: {
        identity: true,
        license: true,
        training: false,
        compliance: true,
        vehicle: true,
        eligibility: true
      },
      vehicleValidation: {
        available: true,
        capacity: true,
        insurance: true,
        fitness: true,
        maintenance: false,
        compatible: true
      }
    }
  ];

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    onSelectOption(optionId);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-cyan-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-500/10 border-green-500/30';
    if (confidence >= 80) return 'bg-cyan-500/10 border-cyan-500/30';
    if (confidence >= 70) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-orange-500/10 border-orange-500/30';
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
            <h1 className="text-lg font-bold text-white">Recovery Options</h1>
            <p className="text-xs text-zinc-400">AI-Generated Alternatives</p>
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
        {/* AI Analysis Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white mb-1">AI Recovery Analysis</h3>
              <p className="text-xs text-zinc-400">
                {recoveryOptions.length} eligible drivers found. Ranked by recovery confidence score.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recovery Options */}
        {recoveryOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-zinc-900/50 backdrop-blur-xl border rounded-2xl p-4 ${
              option.isRecommended ? 'border-cyan-500/50' : 'border-zinc-800/50'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  option.isRecommended ? 'bg-cyan-500/20' : 'bg-zinc-800/50'
                }`}>
                  {option.isRecommended ? (
                    <Star className="w-6 h-6 text-cyan-400" />
                  ) : (
                    <User className="w-6 h-6 text-zinc-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{option.driverName}</h3>
                    {option.isRecommended && (
                      <span className="px-2 py-0.5 bg-cyan-500/20 rounded text-[10px] font-medium text-cyan-300">
                        AI RECOMMENDED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">{option.driverId} • {option.vehicleType}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-lg text-center ${getConfidenceBg(option.recoveryConfidence)} border`}>
                <p className={`text-lg font-bold ${getConfidenceColor(option.recoveryConfidence)}`}>
                  {option.recoveryConfidence}%
                </p>
                <p className="text-[10px] text-zinc-400">Confidence</p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="text-center p-2 bg-zinc-800/30 rounded-lg">
                <MapPin className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
                <p className="text-sm font-semibold text-white">{option.distance}km</p>
                <p className="text-[10px] text-zinc-400">Distance</p>
              </div>
              <div className="text-center p-2 bg-zinc-800/30 rounded-lg">
                <Shield className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
                <p className="text-sm font-semibold text-white">{option.missionCompatibility}%</p>
                <p className="text-[10px] text-zinc-400">Compatible</p>
              </div>
              <div className="text-center p-2 bg-zinc-800/30 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
                <p className="text-sm font-semibold text-white">{option.readiness}%</p>
                <p className="text-[10px] text-zinc-400">Ready</p>
              </div>
              <div className="text-center p-2 bg-zinc-800/30 rounded-lg">
                <Clock className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
                <p className="text-sm font-semibold text-white">+{option.estimatedDelay}m</p>
                <p className="text-[10px] text-zinc-400">Delay</p>
              </div>
            </div>

            {/* AI Reasoning */}
            <div className="mb-4 p-3 bg-zinc-800/30 rounded-xl">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {option.reason}
                </p>
              </div>
            </div>

            {/* Trust & Vehicle Validation */}
            <div className="mb-4 p-3 bg-zinc-800/30 rounded-xl">
              <p className="text-xs text-zinc-400 mb-2">Validation Status</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {option.trustValidation.identity && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                    {option.trustValidation.license && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                    {option.trustValidation.training && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                  </div>
                  <span className="text-[10px] text-zinc-400">Trust</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {option.vehicleValidation.available && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                    {option.vehicleValidation.capacity && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                    {option.vehicleValidation.compatible && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                  </div>
                  <span className="text-[10px] text-zinc-400">Vehicle</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowDetails(showDetails === option.id ? null : option.id)}
                className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-medium text-white transition-colors"
              >
                {showDetails === option.id ? 'Hide' : 'View'} Details
              </button>
              <button
                onClick={() => handleSelectOption(option.id)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  option.isRecommended 
                    ? 'bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white' 
                    : 'bg-zinc-700 hover:bg-zinc-600 text-white'
                }`}
              >
                Select
              </button>
            </div>

            {/* Detailed Validation */}
            <AnimatePresence>
              {showDetails === option.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 bg-zinc-800/50 rounded-xl"
                >
                  <p className="text-xs font-semibold text-white mb-2">Trust Validation</p>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {option.trustValidation.identity ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">Identity</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {option.trustValidation.license ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">License</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {option.trustValidation.training ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">Training</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {option.trustValidation.compliance ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">Compliance</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {option.trustValidation.vehicle ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">Vehicle</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {option.trustValidation.eligibility ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">Eligible</span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-white mb-2">Vehicle Validation</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-1">
                      {option.vehicleValidation.available ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">Available</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {option.vehicleValidation.capacity ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">Capacity</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {option.vehicleValidation.insurance ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">Insurance</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {option.vehicleValidation.fitness ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">Fitness</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {option.vehicleValidation.maintenance ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">Maintenance</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {option.vehicleValidation.compatible ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-yellow-400" />}
                      <span className="text-[10px] text-zinc-400">Compatible</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}