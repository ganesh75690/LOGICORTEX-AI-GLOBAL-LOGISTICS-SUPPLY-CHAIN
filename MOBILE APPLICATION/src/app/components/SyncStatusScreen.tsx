import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Package, 
  AlertTriangle,
  Users,
  Cloud,
  CloudOff,
  Trash2,
  Settings
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { MobileStatusBar } from './MobileStatusBar';
import { offlineStorage } from '../services/offlineStorage';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

interface SyncOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  endpoint: string;
  data: any;
  timestamp: number;
  retryCount: number;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
}

interface Props {
  onBack: () => void;
  onMenuToggle: () => void;
}

export function SyncStatusScreen({ onBack, onMenuToggle }: Props) {
  const networkStatus = useNetworkStatus();
  const [syncOperations, setSyncOperations] = useState<SyncOperation[]>([]);
  const [isForceSyncing, setIsForceSyncing] = useState(false);

  // Load sync operations
  useEffect(() => {
    const loadSyncOperations = async () => {
      try {
        const syncStatus = offlineStorage.getSyncQueueStatus();
        // In a real app, you'd get detailed operations from the storage
        // For now, we'll simulate some operations
        const mockOperations: SyncOperation[] = [
          {
            id: '1',
            type: 'update',
            endpoint: '/api/driver/stats',
            data: { earnings: 2475, deliveries: 4 },
            timestamp: Date.now() - 30000,
            retryCount: 0,
            status: networkStatus.isOnline ? 'syncing' : 'pending'
          },
          {
            id: '2',
            type: 'create',
            endpoint: '/api/deliveries',
            data: { id: 'DEL-123', status: 'completed' },
            timestamp: Date.now() - 120000,
            retryCount: 1,
            status: 'pending'
          },
          {
            id: '3',
            type: 'update',
            endpoint: '/api/alerts',
            data: { id: 'ALT-456', acknowledged: true },
            timestamp: Date.now() - 300000,
            retryCount: 0,
            status: 'completed'
          }
        ];
        setSyncOperations(mockOperations);
      } catch (error) {
        console.error('Failed to load sync operations:', error);
      }
    };

    loadSyncOperations();
    
    // Update sync status periodically
    const interval = setInterval(() => {
      loadSyncOperations();
    }, 5000);

    return () => clearInterval(interval);
  }, [networkStatus.isOnline]);

  const handleForceSync = async () => {
    setIsForceSyncing(true);
    try {
      // Simulate force sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update operations status
      setSyncOperations(prev => 
        prev.map(op => 
          networkStatus.isOnline 
            ? { ...op, status: 'completed' as const }
            : op
        )
      );
    } catch (error) {
      console.error('Force sync failed:', error);
    } finally {
      setIsForceSyncing(false);
    }
  };

  const handleClearSyncQueue = async () => {
    try {
      await offlineStorage.clearAllData();
      setSyncOperations([]);
    } catch (error) {
      console.error('Failed to clear sync queue:', error);
    }
  };

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'create': return Package;
      case 'update': return RefreshCw;
      case 'delete': return Trash2;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'syncing': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-zinc-400';
    }
  };

  const formatTimestamp = (timestamp: number) => {
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

  const completedOperations = syncOperations.filter(op => op.status === 'completed').length;
  const pendingOperations = syncOperations.filter(op => op.status === 'pending').length;
  const failedOperations = syncOperations.filter(op => op.status === 'failed').length;

  return (
    <div className="h-full bg-zinc-950 text-white flex flex-col">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-white">Sync Status</h1>
              <p className="text-xs text-zinc-400">Offline data synchronization</p>
            </div>
          </div>
          <button 
            onClick={onMenuToggle}
            className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            aria-label="Menu"
          >
            <Settings className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          
          {/* Connection Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${
              networkStatus.isOnline 
                ? 'from-green-500/20 to-emerald-500/20 border-green-500/50' 
                : 'from-red-500/20 to-orange-500/20 border-red-500/50'
            } border rounded-2xl p-4`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center ${
                  networkStatus.isOnline ? 'animate-pulse' : ''
                }`}>
                  {networkStatus.isOnline ? (
                    <Wifi className="w-6 h-6 text-green-400" />
                  ) : (
                    <WifiOff className="w-6 h-6 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {networkStatus.isOnline ? 'Connected' : 'Offline Mode'}
                  </h3>
                  <p className="text-sm text-zinc-300">
                    {networkStatus.isOnline 
                      ? `• ${networkStatus.effectiveType?.toUpperCase() || 'Unknown'}` 
                      : '• Working offline'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{networkStatus.pendingSyncs}</p>
                <p className="text-xs text-zinc-400">Pending</p>
              </div>
            </div>

            {networkStatus.isOnline && networkStatus.downlink && (
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                <span>Speed: {networkStatus.downlink}Mbps</span>
                <span>Latency: {networkStatus.rtt}ms</span>
              </div>
            )}
          </motion.div>

          {/* Sync Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3"
          >
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 text-center">
              <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">{completedOperations}</p>
              <p className="text-xs text-zinc-400">Completed</p>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">{pendingOperations}</p>
              <p className="text-xs text-zinc-400">Pending</p>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 text-center">
              <AlertCircle className="w-5 h-5 text-red-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white">{failedOperations}</p>
              <p className="text-xs text-zinc-400">Failed</p>
            </div>
          </motion.div>

          {/* Sync Operations List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4"
          >
            <h3 className="text-sm font-semibold text-white mb-3">Sync Operations</h3>
            <div className="space-y-2">
              <AnimatePresence>
                {syncOperations.map((operation) => {
                  const Icon = getOperationIcon(operation.type);
                  return (
                    <motion.div
                      key={operation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg"
                    >
                      <div className={`w-8 h-8 rounded-full bg-zinc-700/50 flex items-center justify-center ${
                        operation.status === 'syncing' ? 'animate-spin' : ''
                      }`}>
                        <Icon className={`w-4 h-4 ${getStatusColor(operation.status)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white capitalize">
                            {operation.type}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            operation.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            operation.status === 'syncing' ? 'bg-yellow-500/20 text-yellow-400' :
                            operation.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                            'bg-zinc-500/20 text-zinc-400'
                          }`}>
                            {operation.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">{operation.endpoint}</p>
                        <p className="text-xs text-zinc-500">{formatTimestamp(operation.timestamp)}</p>
                      </div>
                      {operation.retryCount > 0 && (
                        <div className="text-xs text-yellow-400">
                          Retry: {operation.retryCount}/3
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            <button
              onClick={handleForceSync}
              disabled={!networkStatus.isOnline || isForceSyncing}
              className="py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-xl font-semibold text-white transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isForceSyncing ? 'animate-spin' : ''}`} />
              {isForceSyncing ? 'Syncing...' : 'Force Sync'}
            </button>
            <button
              onClick={handleClearSyncQueue}
              className="py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl font-semibold text-red-400 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Queue
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
