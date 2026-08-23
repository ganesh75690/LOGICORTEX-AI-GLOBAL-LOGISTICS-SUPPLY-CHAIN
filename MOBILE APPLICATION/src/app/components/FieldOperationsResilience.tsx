import { motion } from 'motion/react';
import { 
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  BatteryWarning,
  MapPin,
  MapPinOff,
  RefreshCw,
  Navigation
} from 'lucide-react';

interface Props {
  gpsStatus: 'good' | 'limited' | 'unavailable';
  gpsAccuracy?: number;
  lastLocationTime?: string;
  networkStatus: 'connected' | 'limited' | 'offline';
  syncStatus: 'up_to_date' | 'syncing' | 'conflict' | 'offline';
  batteryLevel: number;
  isLowPowerMode: boolean;
  onEnableLowPowerMode?: () => void;
}

export function FieldOperationsResilience({
  gpsStatus,
  gpsAccuracy,
  lastLocationTime,
  networkStatus,
  syncStatus,
  batteryLevel,
  isLowPowerMode,
  onEnableLowPowerMode
}: Props) {
  const getGPSColor = () => {
    switch (gpsStatus) {
      case 'good': return 'text-green-400';
      case 'limited': return 'text-yellow-400';
      case 'unavailable': return 'text-red-400';
    }
  };

  const getGPSBg = () => {
    switch (gpsStatus) {
      case 'good': return 'bg-green-500/10 border-green-500/30';
      case 'limited': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'unavailable': return 'bg-red-500/10 border-red-500/30';
    }
  };

  const getNetworkColor = () => {
    switch (networkStatus) {
      case 'connected': return 'text-green-400';
      case 'limited': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
    }
  };

  const getNetworkBg = () => {
    switch (networkStatus) {
      case 'connected': return 'bg-green-500/10 border-green-500/30';
      case 'limited': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'offline': return 'bg-red-500/10 border-red-500/30';
    }
  };

  const getSyncColor = () => {
    switch (syncStatus) {
      case 'up_to_date': return 'text-green-400';
      case 'syncing': return 'text-cyan-400';
      case 'conflict': return 'text-orange-400';
      case 'offline': return 'text-red-400';
    }
  };

  const getSyncBg = () => {
    switch (syncStatus) {
      case 'up_to_date': return 'bg-green-500/10 border-green-500/30';
      case 'syncing': return 'bg-cyan-500/10 border-cyan-500/30';
      case 'conflict': return 'bg-orange-500/10 border-orange-500/30';
      case 'offline': return 'bg-red-500/10 border-red-500/30';
    }
  };

  const getBatteryColor = () => {
    if (batteryLevel > 50) return 'text-green-400';
    if (batteryLevel > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBatteryBg = () => {
    if (batteryLevel > 50) return 'bg-green-500/10 border-green-500/30';
    if (batteryLevel > 20) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  const getBatteryIcon = () => {
    if (batteryLevel > 50) return Battery;
    if (batteryLevel > 20) return BatteryLow;
    return BatteryWarning;
  };

  const BatteryIcon = getBatteryIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
    >
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <Navigation className="w-4 h-4 text-cyan-400" />
        FIELD STATUS
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {/* GPS Status */}
        <div className={`p-2 rounded-lg border ${getGPSBg()}`}>
          <div className="flex items-center gap-2 mb-1">
            {gpsStatus === 'good' ? (
              <MapPin className="w-3 h-3 text-green-400" />
            ) : (
              <MapPinOff className="w-3 h-3 text-yellow-400" />
            )}
            <span className="text-[10px] text-zinc-400">GPS</span>
          </div>
          <p className={`text-xs font-medium ${getGPSColor()}`}>
            {gpsStatus === 'good' ? 'GOOD' : gpsStatus === 'limited' ? 'LIMITED' : 'OFFLINE'}
          </p>
          {gpsAccuracy && gpsStatus === 'good' && (
            <p className="text-[10px] text-zinc-400">±{gpsAccuracy}m</p>
          )}
          {lastLocationTime && gpsStatus === 'limited' && (
            <p className="text-[10px] text-zinc-400">{lastLocationTime}</p>
          )}
        </div>

        {/* Network Status */}
        <div className={`p-2 rounded-lg border ${getNetworkBg()}`}>
          <div className="flex items-center gap-2 mb-1">
            {networkStatus === 'connected' ? (
              <Wifi className="w-3 h-3 text-green-400" />
            ) : (
              <WifiOff className="w-3 h-3 text-red-400" />
            )}
            <span className="text-[10px] text-zinc-400">NETWORK</span>
          </div>
          <p className={`text-xs font-medium ${getNetworkColor()}`}>
            {networkStatus === 'connected' ? 'CONNECTED' : networkStatus === 'limited' ? 'LIMITED' : 'OFFLINE'}
          </p>
          {networkStatus === 'offline' && (
            <p className="text-[10px] text-zinc-400">MISSION CONTINUITY: ACTIVE</p>
          )}
        </div>

        {/* Sync Status */}
        <div className={`p-2 rounded-lg border ${getSyncBg()}`}>
          <div className="flex items-center gap-2 mb-1">
            {syncStatus === 'syncing' ? (
              <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3 text-green-400" />
            )}
            <span className="text-[10px] text-zinc-400">SYNC</span>
          </div>
          <p className={`text-xs font-medium ${getSyncColor()}`}>
            {syncStatus === 'up_to_date' ? 'UP TO DATE' : syncStatus === 'syncing' ? 'SYNCING' : syncStatus === 'conflict' ? 'CONFLICT' : 'OFFLINE'}
          </p>
        </div>

        {/* Battery Status */}
        <div className={`p-2 rounded-lg border ${getBatteryBg()}`}>
          <div className="flex items-center gap-2 mb-1">
            <BatteryIcon className={`w-3 h-3 ${getBatteryColor()}`} />
            <span className="text-[10px] text-zinc-400">BATTERY</span>
          </div>
          <p className={`text-xs font-medium ${getBatteryColor()}`}>
            {batteryLevel}%
          </p>
          {batteryLevel <= 15 && onEnableLowPowerMode && !isLowPowerMode && (
            <button
              onClick={onEnableLowPowerMode}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 mt-1"
            >
              Enable Low Power
            </button>
          )}
          {isLowPowerMode && (
            <p className="text-[10px] text-cyan-400">LOW POWER MODE</p>
          )}
        </div>
      </div>

      {/* Location Status */}
      <div className="mt-3 p-2 bg-zinc-800/30 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation className="w-3 h-3 text-zinc-400" />
          <span className="text-[10px] text-zinc-400">LOCATION</span>
        </div>
        <span className="text-xs text-green-400">ACTIVE</span>
      </div>
    </motion.div>
  );
}