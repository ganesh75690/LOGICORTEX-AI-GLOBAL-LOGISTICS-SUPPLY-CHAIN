// Intelligent Offline Conflict Resolution Service
// Handles data conflicts between local offline changes and server updates

interface ConflictData {
  conflictId: string;
  entityType: 'shipment' | 'mission' | 'route' | 'driver_status';
  entityId: string;
  localVersion: number;
  serverVersion: number;
  localData: any;
  serverData: any;
  localTimestamp: number;
  serverTimestamp: number;
  conflictType: 'status_mismatch' | 'data_mismatch' | 'version_conflict' | 'concurrent_modification';
}

interface ConflictResolution {
  conflictId: string;
  resolution: 'server_authoritative' | 'local_preserved' | 'manual_review' | 'merged';
  resolvedData: any;
  resolutionReason: string;
  resolvedBy: 'system' | 'driver' | 'operations';
  resolvedAt: number;
}

class ConflictResolutionService {
  private conflicts: ConflictData[] = [];
  private resolutions: ConflictResolution[] = [];

  // Conflict Detection
  detectConflict(
    entityType: ConflictData['entityType'],
    entityId: string,
    localData: any,
    serverData: any
  ): ConflictData | null {
    // Compare data to detect conflicts
    const conflictType = this.identifyConflictType(localData, serverData);
    
    if (!conflictType) return null;

    const conflict: ConflictData = {
      conflictId: `conflict_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      entityType,
      entityId,
      localVersion: localData.version || 1,
      serverVersion: serverData.version || 1,
      localData,
      serverData,
      localTimestamp: localData.timestamp || Date.now(),
      serverTimestamp: serverData.timestamp || Date.now(),
      conflictType
    };

    this.conflicts.push(conflict);
    return conflict;
  }

  private identifyConflictType(local: any, server: any): ConflictData['conflictType'] | null {
    // Check for status mismatch
    if (local.status !== server.status) {
      return 'status_mismatch';
    }

    // Check for data mismatch
    if (JSON.stringify(local) !== JSON.stringify(server)) {
      return 'data_mismatch';
    }

    // Check for version conflict
    if (local.version !== server.version) {
      return 'version_conflict';
    }

    // Check for concurrent modification
    if (local.timestamp && server.timestamp && Math.abs(local.timestamp - server.timestamp) < 5000) {
      return 'concurrent_modification';
    }

    return null;
  }

  // Conflict Resolution Strategies
  resolveConflict(
    conflictId: string,
    strategy: 'server_authoritative' | 'local_preserved' | 'manual_review' | 'merged',
    resolvedBy: 'system' | 'driver' | 'operations' = 'system'
  ): ConflictResolution {
    const conflict = this.conflicts.find(c => c.conflictId === conflictId);
    if (!conflict) {
      throw new Error(`Conflict not found: ${conflictId}`);
    }

    let resolvedData: any;
    let resolutionReason: string;

    switch (strategy) {
      case 'server_authoritative':
        resolvedData = conflict.serverData;
        resolutionReason = 'Server update retained - server authoritative policy';
        break;

      case 'local_preserved':
        resolvedData = conflict.localData;
        resolutionReason = 'Local driver evidence preserved - critical event protection';
        break;

      case 'manual_review':
        // Requires human intervention - mark for review
        resolvedData = { ...conflict.serverData, requiresReview: true };
        resolutionReason = 'Conflict flagged for manual review by operations';
        break;

      case 'merged':
        resolvedData = this.mergeData(conflict.localData, conflict.serverData);
        resolutionReason = 'Data merged - preserving critical elements from both versions';
        break;
    }

    const resolution: ConflictResolution = {
      conflictId,
      resolution: strategy,
      resolvedData,
      resolutionReason,
      resolvedBy,
      resolvedAt: Date.now()
    };

    this.resolutions.push(resolution);
    
    // Remove resolved conflict
    this.conflicts = this.conflicts.filter(c => c.conflictId !== conflictId);

    return resolution;
  }

  private mergeData(local: any, server: any): any {
    // Intelligent merge strategy
    const merged = { ...server };

    // Preserve local critical events
    if (local.deliveryEvidence && !server.deliveryEvidence) {
      merged.deliveryEvidence = local.deliveryEvidence;
    }

    if (local.gpsLocation && !server.gpsLocation) {
      merged.gpsLocation = local.gpsLocation;
    }

    if (local.timestamp && local.timestamp > server.timestamp) {
      merged.timestamp = local.timestamp;
    }

    // Use server status unless local is 'delivered' and server is not
    if (local.status === 'delivered' && server.status !== 'delivered') {
      merged.status = local.status;
    }

    // Increment version
    merged.version = Math.max(local.version, server.version) + 1;

    return merged;
  }

  // Get all pending conflicts
  getPendingConflicts(): ConflictData[] {
    return [...this.conflicts];
  }

  // Get conflict by ID
  getConflict(conflictId: string): ConflictData | null {
    return this.conflicts.find(c => c.conflictId === conflictId) || null;
  }

  // Get resolution history
  getResolutionHistory(): ConflictResolution[] {
    return [...this.resolutions];
  }

  // Auto-resolve based on predefined rules
  autoResolveConflict(conflictId: string): ConflictResolution {
    const conflict = this.getConflict(conflictId);
    if (!conflict) {
      throw new Error(`Conflict not found: ${conflictId}`);
    }

    // Auto-resolution rules
    let strategy: ConflictResolution['resolution'];

    // Rule 1: If local status is 'delivered', preserve local (critical event protection)
    if (conflict.localData.status === 'delivered' && conflict.serverData.status !== 'delivered') {
      strategy = 'local_preserved';
    }
    // Rule 2: If server version is higher, use server (server authoritative)
    else if (conflict.serverVersion > conflict.localVersion) {
      strategy = 'server_authoritative';
    }
    // Rule 3: If conflict is concurrent modification, preserve local
    else if (conflict.conflictType === 'concurrent_modification') {
      strategy = 'local_preserved';
    }
    // Rule 4: Default to server authoritative
    else {
      strategy = 'server_authoritative';
    }

    return this.resolveConflict(conflictId, strategy, 'system');
  }

  // Store conflict in offline storage
  async storeConflict(conflict: ConflictData): Promise<void> {
    try {
      const existing = localStorage.getItem('conflicts');
      const conflicts = existing ? JSON.parse(existing) : [];
      conflicts.push(conflict);
      localStorage.setItem('conflicts', JSON.stringify(conflicts));
    } catch (error) {
      console.error('Failed to store conflict:', error);
    }
  }

  // Load conflicts from offline storage
  async loadConflicts(): Promise<void> {
    try {
      const existing = localStorage.getItem('conflicts');
      if (existing) {
        this.conflicts = JSON.parse(existing);
      }
    } catch (error) {
      console.error('Failed to load conflicts:', error);
    }
  }

  // Clear resolved conflicts
  clearResolvedConflicts(): void {
    this.conflicts = [];
    localStorage.removeItem('conflicts');
  }

  // Get conflict statistics
  getConflictStats(): {
    total: number;
    resolved: number;
    pending: number;
    byType: Record<string, number>;
  } {
    return {
      total: this.resolutions.length + this.conflicts.length,
      resolved: this.resolutions.length,
      pending: this.conflicts.length,
      byType: this.conflicts.reduce((acc, c) => {
        acc[c.conflictType] = (acc[c.conflictType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }
}

export const conflictResolutionService = new ConflictResolutionService();
export default conflictResolutionService;