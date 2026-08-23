import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle,
  X,
  Phone,
  MapPin,
  User,
  Car,
  Package,
  CheckCircle2,
  Clock,
  Shield,
  Navigation
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onMenuToggle: () => void;
  onCancel: () => void;
  onContactOperations: () => void;
  onStartMissionRecovery: () => void;
}

interface EmergencyEvent {
  type: 'medical' | 'accident' | 'vehicle_breakdown' | 'unsafe_location' | 'security_threat' | 'road_blockage' | 'driver_unable' | 'other';
  timestamp: number;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  missionId: string;
  driverId: string;
  vehicleId: string;
  affectedShipments: number;
}

export function EmergencyContinuityMode({ 
  onMenuToggle, 
  onCancel, 
  onContactOperations, 
  onStartMissionRecovery 
}: Props) {
  const [emergencyType, setEmergencyType] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [isCapturingLocation, setIsCapturingLocation] = useState(true);
  const [activeMission, setActiveMission] = useState<string>('MSN-20481');
  const [driverId] = useState('DRV-1048');
  const [vehicleId] = useState('VH-4521');
  const [affectedShipments] = useState(8);

  // Simulate GPS location capture
  useEffect(() => {
    const captureLocation = () => {
      setIsCapturingLocation(true);
      setTimeout(() => {
        setLocation({
          lat: 28.6328,
          lng: 77.2197,
          accuracy: 18
        });
        setIsCapturingLocation(false);
      }, 1500);
    };

    captureLocation();
  }, []);

  const emergencyTypes = [
    { id: 'medical', label: 'Medical Emergency', icon: AlertTriangle, color: 'red' },
    { id: 'accident', label: 'Accident', icon: AlertTriangle, color: 'red' },
    { id: 'vehicle_breakdown', label: 'Vehicle Breakdown', icon: Car, color: 'orange' },
    { id: 'unsafe_location', label: 'Unsafe Location', icon: MapPin, color: 'orange' },
    { id: 'security_threat', label: 'Security Threat', icon: Shield, color: 'red' },
    { id: 'road_blockage', label: 'Road Blockage', icon: Navigation, color: 'yellow' },
    { id: 'driver_unable', label: 'Driver Unable to Continue', icon: User, color: 'orange' },
    { id: 'other', label: 'Other Emergency', icon: AlertTriangle, color: 'red' },
  ];

  const handleEmergencyTypeSelect = (type: string) => {
    setEmergencyType(type);
  };

  const handleConfirmEmergency = () => {
    console.log('Emergency confirmed:', emergencyType, location);
    // In production, this would:
    // 1. Store emergency event in offline storage
    // 2. Log to security service
    // 3. Notify authorized operations
    // 4. Trigger mission recovery if required
  };

  return (
    <div className="size-full flex flex-col bg-zinc-950">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">EMERGENCY MODE</h1>
            <p className="text-xs text-red-400">DRIVER SAFETY CONTINUITY</p>
          </div>
        </div>
        <button 
          onClick={onCancel}
          className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Status Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-white">STATUS: ACTIVE</span>
            </div>
            <span className="text-xs text-zinc-400">
              {new Date().toLocaleTimeString()}
            </span>
          </div>

          {/* Location */}
          <div className="mb-4 p-3 bg-zinc-800/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span className="text-xs text-zinc-400">LOCATION</span>
            </div>
            {isCapturingLocation ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-zinc-600 border-t-cyan-400 rounded-full animate-spin" />
                <span className="text-sm text-zinc-400">Capturing GPS...</span>
              </div>
            ) : location ? (
              <div>
                <p className="text-sm text-white font-mono">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  Accuracy: ±{location.accuracy}m
                </p>
              </div>
            ) : (
              <p className="text-sm text-red-400">Location unavailable</p>
            )}
          </div>

          {/* Mission Info */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 bg-zinc-800/30 rounded-lg text-center">
              <Package className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
              <p className="text-xs text-zinc-400">Mission</p>
              <p className="text-sm text-white font-medium">{activeMission}</p>
            </div>
            <div className="p-2 bg-zinc-800/30 rounded-lg text-center">
              <User className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
              <p className="text-xs text-zinc-400">Driver</p>
              <p className="text-sm text-white font-medium">{driverId}</p>
            </div>
            <div className="p-2 bg-zinc-800/30 rounded-lg text-center">
              <Car className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
              <p className="text-xs text-zinc-400">Vehicle</p>
              <p className="text-sm text-white font-medium">{vehicleId}</p>
            </div>
          </div>
        </motion.div>

        {/* Emergency Type Selection */}
        {!emergencyType && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
          >
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              SELECT EMERGENCY TYPE
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {emergencyTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => handleEmergencyTypeSelect(type.id)}
                    className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                      type.color === 'red' 
                        ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20' 
                        : type.color === 'orange'
                        ? 'bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20'
                        : 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      type.color === 'red' ? 'text-red-400' :
                      type.color === 'orange' ? 'text-orange-400' :
                      'text-yellow-400'
                    }`} />
                    <span className="text-xs text-white text-center">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Emergency Confirmed */}
        {emergencyType && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">EMERGENCY CONFIRMED</h3>
                <p className="text-xs text-zinc-400">
                  {emergencyTypes.find(t => t.id === emergencyType)?.label}
                </p>
              </div>
            </div>

            <div className="p-3 bg-zinc-800/30 rounded-xl mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-zinc-400" />
                <span className="text-xs text-zinc-400">SAFETY STATUS</span>
              </div>
              <p className="text-sm text-orange-400 font-medium">ATTENTION REQUIRED</p>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
                <span>Location captured and stored</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
                <span>Active mission identified: {activeMission}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
                <span>{affectedShipments} shipments protected</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
                <span>Authorized operations notified</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {!emergencyType ? (
            <button
              onClick={handleConfirmEmergency}
              disabled={!emergencyType}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AlertTriangle className="w-5 h-5" />
              CONFIRM EMERGENCY
            </button>
          ) : (
            <>
              <button
                onClick={onContactOperations}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                CONTACT OPERATIONS
              </button>

              <button
                onClick={onStartMissionRecovery}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-white transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                START MISSION RECOVERY
              </button>
            </>
          )}

          <button
            onClick={onCancel}
            className="w-full py-3 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 rounded-xl text-sm font-medium text-zinc-300 transition-colors"
          >
            CANCEL EMERGENCY
          </button>
        </motion.div>

        {/* Important Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Emergency Protocol</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Your location and mission status have been captured. This information will be shared with authorized operations personnel. 
                In a real emergency, enterprise emergency contacts can be configured for automatic notification.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}