import { motion } from 'motion/react';
import { Wifi, WifiOff, Cloud, CloudOff, RefreshCw, CheckCircle } from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export function OfflineStatusIndicator() {
  const networkStatus = useNetworkStatus();

  const getConnectionColor = () => {
    if (!networkStatus.isOnline) return 'text-red-400';
    if (networkStatus.pendingSyncs > 0) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getConnectionText = () => {
    if (!networkStatus.isOnline) return 'Offline';
    if (networkStatus.pendingSyncs > 0) return `Syncing (${networkStatus.pendingSyncs})`;
    return 'Online';
  };

  const getConnectionIcon = () => {
    if (!networkStatus.isOnline) return WifiOff;
    if (networkStatus.pendingSyncs > 0) return RefreshCw;
    return Wifi;
  };

  const formatLastSync = (timestamp: number) => {
    if (!timestamp) return 'Never';
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const Icon = getConnectionIcon();

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={networkStatus.pendingSyncs > 0 ? { rotate: 360 } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={getConnectionColor()}
      >
        <Icon className="w-5 h-5" />
      </motion.div>
      
      {/* Pending sync indicator */}
      {networkStatus.pendingSyncs > 0 && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-[8px] font-bold text-zinc-900">
            {networkStatus.pendingSyncs > 9 ? '9+' : networkStatus.pendingSyncs}
          </span>
        </div>
      )}
      
      {/* Offline indicator */}
      {!networkStatus.isOnline && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse" />
      )}
    </div>
  );
}
