import { useState, useEffect } from 'react';
import { offlineStorage } from '../services/offlineStorage';

interface NetworkStatus {
  isOnline: boolean;
  isOffline: boolean;
  connectionType?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  pendingSyncs: number;
  lastSyncTime: number;
}

export function useNetworkStatus(): NetworkStatus {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    isOffline: !navigator.onLine,
    pendingSyncs: 0,
    lastSyncTime: 0,
  });

  useEffect(() => {
    // Get initial sync status
    const syncStatus = offlineStorage.getSyncQueueStatus();
    setNetworkStatus(prev => ({
      ...prev,
      pendingSyncs: syncStatus.pending,
      lastSyncTime: syncStatus.lastSyncTime,
    }));

    // Update connection info if available
    const updateConnectionInfo = () => {
      const connection = (navigator as any).connection || 
                       (navigator as any).mozConnection || 
                       (navigator as any).webkitConnection;

      if (connection) {
        setNetworkStatus(prev => ({
          ...prev,
          connectionType: connection.type,
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
        }));
      }
    };

    updateConnectionInfo();

    // Listen for network changes
    const handleNetworkChange = (online: boolean) => {
      setNetworkStatus(prev => ({
        ...prev,
        isOnline: online,
        isOffline: !online,
      }));

      // Update sync status when coming online
      if (online) {
        const syncStatus = offlineStorage.getSyncQueueStatus();
        setNetworkStatus(prev => ({
          ...prev,
          pendingSyncs: syncStatus.pending,
          lastSyncTime: syncStatus.lastSyncTime,
        }));
      }
    };

    // Listen for connection changes
    const handleConnectionChange = () => {
      updateConnectionInfo();
    };

    // Subscribe to offline storage network changes
    offlineStorage.onNetworkChange(handleNetworkChange);

    // Listen for connection API changes if available
    const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
    
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    // Periodic sync status update
    const syncInterval = setInterval(() => {
      const syncStatus = offlineStorage.getSyncQueueStatus();
      setNetworkStatus(prev => ({
        ...prev,
        pendingSyncs: syncStatus.pending,
        lastSyncTime: syncStatus.lastSyncTime,
      }));
    }, 5000); // Update every 5 seconds

    return () => {
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
      clearInterval(syncInterval);
    };
  }, []);

  return networkStatus;
}
