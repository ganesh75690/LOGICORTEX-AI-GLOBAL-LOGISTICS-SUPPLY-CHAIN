// Offline Storage Service with IndexedDB and localStorage fallback

interface OfflineData {
  driverProfile: any;
  deliveries: any[];
  alerts: any[];
  liveStats: any;
  routes: any[];
  tasks: any[];
  lastSyncTime: number;
}

interface SyncOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  endpoint: string;
  data: any;
  timestamp: number;
  retryCount: number;
}

class OfflineStorageService {
  private dbName = 'logisticsDriverDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;
  private isOnline = navigator.onLine;
  private syncQueue: SyncOperation[] = [];
  private syncCallbacks: ((online: boolean) => void)[] = [];

  constructor() {
    this.initDB();
    this.setupNetworkListeners();
    this.loadSyncQueue();
  }

  // Initialize IndexedDB
  private async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('deliveries')) {
          db.createObjectStore('deliveries', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('alerts')) {
          db.createObjectStore('alerts', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('routes')) {
          db.createObjectStore('routes', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('tasks')) {
          db.createObjectStore('tasks', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('syncQueue')) {
          db.createObjectStore('syncQueue', { keyPath: 'id' });
        }
        
        // New feature stores
        if (!db.objectStoreNames.contains('verifications')) {
          db.createObjectStore('verifications', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('incidents')) {
          db.createObjectStore('incidents', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('trustPassport')) {
          db.createObjectStore('trustPassport', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('missionReadiness')) {
          db.createObjectStore('missionReadiness', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('missionRecovery')) {
          db.createObjectStore('missionRecovery', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('recoveryTimeline')) {
          db.createObjectStore('recoveryTimeline', { keyPath: 'id' });
        }
        // Enterprise-grade features stores
        if (!db.objectStoreNames.contains('emergencyEvents')) {
          db.createObjectStore('emergencyEvents', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('fieldStatus')) {
          db.createObjectStore('fieldStatus', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('localizationConfig')) {
          db.createObjectStore('localizationConfig', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('conflicts')) {
          db.createObjectStore('conflicts', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('missionVersions')) {
          db.createObjectStore('missionVersions', { keyPath: 'id' });
        }
        // Delivery Truth Fabric stores
        if (!db.objectStoreNames.contains('evidenceRecords')) {
          db.createObjectStore('evidenceRecords', { keyPath: 'evidenceId' });
        }
        if (!db.objectStoreNames.contains('deliveryTrustAssessments')) {
          db.createObjectStore('deliveryTrustAssessments', { keyPath: 'verificationId' });
        }
        if (!db.objectStoreNames.contains('verificationTimeline')) {
          db.createObjectStore('verificationTimeline', { keyPath: 'id' });
        }
      };
    });
  }

  // Network connectivity detection
  private setupNetworkListeners(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.notifyNetworkChange(true);
      this.processSyncQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.notifyNetworkChange(false);
    });
  }

  private notifyNetworkChange(online: boolean): void {
    this.syncCallbacks.forEach(callback => callback(online));
  }

  // Subscribe to network status changes
  public onNetworkChange(callback: (online: boolean) => void): void {
    this.syncCallbacks.push(callback);
  }

  // Get current network status
  public isConnectionOnline(): boolean {
    return this.isOnline;
  }

  // Generic IndexedDB operations
  private async storeData(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  private async getData(storeName: string, key?: string): Promise<any> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      
      if (key) {
        const request = store.get(key);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      } else {
        const request = store.getAll();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      }
    });
  }

  // localStorage fallback for simple data
  private setLocalStorage(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn('localStorage not available:', error);
    }
  }

  private getLocalStorage(key: string): any {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn('localStorage read error:', error);
      return null;
    }
  }

  // Driver Profile operations
  public async saveDriverProfile(profile: any): Promise<void> {
    try {
      await this.storeData('driverProfile', profile);
      this.setLocalStorage('driverProfile', profile);
    } catch (error) {
      console.error('Failed to save driver profile:', error);
      this.setLocalStorage('driverProfile', profile);
    }
  }

  public async getDriverProfile(): Promise<any> {
    try {
      const profile = await this.getData('driverProfile', 'profile');
      return profile || this.getLocalStorage('driverProfile');
    } catch (error) {
      console.error('Failed to get driver profile:', error);
      return this.getLocalStorage('driverProfile');
    }
  }

  // Deliveries operations
  public async saveDeliveries(deliveries: any[]): Promise<void> {
    try {
      for (const delivery of deliveries) {
        await this.storeData('deliveries', delivery);
      }
      this.setLocalStorage('deliveries', deliveries);
    } catch (error) {
      console.error('Failed to save deliveries:', error);
      this.setLocalStorage('deliveries', deliveries);
    }
  }

  public async getDeliveries(): Promise<any[]> {
    try {
      const deliveries = await this.getData('deliveries');
      return deliveries || this.getLocalStorage('deliveries') || [];
    } catch (error) {
      console.error('Failed to get deliveries:', error);
      return this.getLocalStorage('deliveries') || [];
    }
  }

  // Alerts operations
  public async saveAlerts(alerts: any[]): Promise<void> {
    try {
      for (const alert of alerts) {
        await this.storeData('alerts', alert);
      }
      this.setLocalStorage('alerts', alerts);
    } catch (error) {
      console.error('Failed to save alerts:', error);
      this.setLocalStorage('alerts', alerts);
    }
  }

  public async getAlerts(): Promise<any[]> {
    try {
      const alerts = await this.getData('alerts');
      return alerts || this.getLocalStorage('alerts') || [];
    } catch (error) {
      console.error('Failed to get alerts:', error);
      return this.getLocalStorage('alerts') || [];
    }
  }

  // Live Stats operations
  public saveLiveStats(stats: any): void {
    this.setLocalStorage('liveStats', stats);
  }

  public getLiveStats(): any {
    return this.getLocalStorage('liveStats') || {
      currentSpeed: 0,
      avgSpeed: 42,
      fuelEfficiency: 15.2,
      earnings: 2450,
      timeSaved: 42,
      deliveriesCompleted: 3,
    };
  }

  // Sync Queue operations
  private async loadSyncQueue(): Promise<void> {
    try {
      const queue = await this.getData('syncQueue');
      this.syncQueue = queue || this.getLocalStorage('syncQueue') || [];
    } catch (error) {
      console.error('Failed to load sync queue:', error);
      this.syncQueue = this.getLocalStorage('syncQueue') || [];
    }
  }

  private async saveSyncQueue(): Promise<void> {
    try {
      for (const operation of this.syncQueue) {
        await this.storeData('syncQueue', operation);
      }
      this.setLocalStorage('syncQueue', this.syncQueue);
    } catch (error) {
      console.error('Failed to save sync queue:', error);
      this.setLocalStorage('syncQueue', this.syncQueue);
    }
  }

  public addToSyncQueue(operation: Omit<SyncOperation, 'id' | 'timestamp' | 'retryCount'>): void {
    const syncOp: SyncOperation = {
      ...operation,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      retryCount: 0,
    };

    this.syncQueue.push(syncOp);
    this.saveSyncQueue();

    if (this.isOnline) {
      this.processSyncQueue();
    }
  }

  private async processSyncQueue(): Promise<void> {
    if (!this.isOnline || this.syncQueue.length === 0) return;

    const operationsToProcess = [...this.syncQueue];
    
    for (const operation of operationsToProcess) {
      try {
        await this.syncOperation(operation);
        
        // Remove successful operation from queue
        this.syncQueue = this.syncQueue.filter(op => op.id !== operation.id);
        this.saveSyncQueue();
        
      } catch (error) {
        console.error('Sync operation failed:', error);
        
        // Increment retry count
        operation.retryCount++;
        
        // Remove operation if max retries exceeded
        if (operation.retryCount >= 3) {
          this.syncQueue = this.syncQueue.filter(op => op.id !== operation.id);
          this.saveSyncQueue();
        }
      }
    }
  }

  private async syncOperation(operation: SyncOperation): Promise<void> {
    // Simulate API call - replace with actual API endpoint
    const response = await fetch(operation.endpoint, {
      method: operation.type === 'create' ? 'POST' : 
             operation.type === 'update' ? 'PUT' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: operation.type !== 'delete' ? JSON.stringify(operation.data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Sync failed: ${response.statusText}`);
    }
  }

  // Get sync queue status
  public getSyncQueueStatus(): { pending: number; lastSyncTime: number } {
    return {
      pending: this.syncQueue.length,
      lastSyncTime: this.getLocalStorage('lastSyncTime') || 0,
    };
  }

  // Clear all offline data
  public async clearAllData(): Promise<void> {
    try {
      if (this.db) {
        const stores = ['deliveries', 'alerts', 'routes', 'tasks', 'syncQueue', 'verifications', 'incidents', 'trustPassport', 'missionReadiness', 'missionRecovery', 'recoveryTimeline', 'emergencyEvents', 'fieldStatus', 'localizationConfig', 'conflicts', 'missionVersions', 'evidenceRecords', 'deliveryTrustAssessments', 'verificationTimeline'];
        for (const storeName of stores) {
          const transaction = this.db.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          store.clear();
        }
      }
      
      // Clear localStorage
      const keys = ['driverProfile', 'deliveries', 'alerts', 'routes', 'tasks', 'syncQueue', 'liveStats', 'lastSyncTime', 'verifications', 'incidents', 'trustPassport', 'missionReadiness', 'missionRecovery', 'recoveryTimeline', 'emergencyEvents', 'fieldStatus', 'localizationConfig', 'conflicts', 'missionVersions'];
      keys.forEach(key => localStorage.removeItem(key));
      
      this.syncQueue = [];
    } catch (error) {
      console.error('Failed to clear offline data:', error);
    }
  }

  // ========== NEW FEATURE: Delivery Verification ==========
  
  public async saveVerification(verification: any): Promise<void> {
    try {
      await this.storeData('verifications', verification);
      this.setLocalStorage(`verification_${verification.id}`, verification);
    } catch (error) {
      console.error('Failed to save verification:', error);
      this.setLocalStorage(`verification_${verification.id}`, verification);
    }
  }

  public async getVerification(id: string): Promise<any> {
    try {
      const verification = await this.getData('verifications', id);
      return verification || this.getLocalStorage(`verification_${id}`);
    } catch (error) {
      console.error('Failed to get verification:', error);
      return this.getLocalStorage(`verification_${id}`);
    }
  }

  public async getAllVerifications(): Promise<any[]> {
    try {
      const verifications = await this.getData('verifications');
      return verifications || this.getLocalStorage('verifications') || [];
    } catch (error) {
      console.error('Failed to get all verifications:', error);
      return this.getLocalStorage('verifications') || [];
    }
  }

  // ========== DELIVERY TRUTH FABRIC ==========
  
  public async saveEvidenceRecord(evidence: any): Promise<void> {
    try {
      await this.storeData('evidenceRecords', evidence);
      this.setLocalStorage(`evidence_${evidence.evidenceId}`, evidence);
    } catch (error) {
      console.error('Failed to save evidence record:', error);
      this.setLocalStorage(`evidence_${evidence.evidenceId}`, evidence);
    }
  }

  public async getEvidenceRecord(evidenceId: string): Promise<any> {
    try {
      const evidence = await this.getData('evidenceRecords', evidenceId);
      return evidence || this.getLocalStorage(`evidence_${evidenceId}`);
    } catch (error) {
      console.error('Failed to get evidence record:', error);
      return this.getLocalStorage(`evidence_${evidenceId}`);
    }
  }

  public async getEvidenceByMission(missionId: string): Promise<any[]> {
    try {
      const allEvidence = await this.getAllData('evidenceRecords');
      return allEvidence.filter((e: any) => e.missionId === missionId);
    } catch (error) {
      console.error('Failed to get evidence by mission:', error);
      return [];
    }
  }

  public async saveDeliveryTrustAssessment(assessment: any): Promise<void> {
    try {
      await this.storeData('deliveryTrustAssessments', assessment);
      this.setLocalStorage(`assessment_${assessment.verificationId}`, assessment);
    } catch (error) {
      console.error('Failed to save delivery trust assessment:', error);
      this.setLocalStorage(`assessment_${assessment.verificationId}`, assessment);
    }
  }

  public async getDeliveryTrustAssessment(verificationId: string): Promise<any> {
    try {
      const assessment = await this.getData('deliveryTrustAssessments', verificationId);
      return assessment || this.getLocalStorage(`assessment_${verificationId}`);
    } catch (error) {
      console.error('Failed to get delivery trust assessment:', error);
      return this.getLocalStorage(`assessment_${verificationId}`);
    }
  }

  public async saveVerificationTimeline(timeline: any): Promise<void> {
    try {
      await this.storeData('verificationTimeline', timeline);
      this.setLocalStorage(`timeline_${timeline.id}`, timeline);
    } catch (error) {
      console.error('Failed to save verification timeline:', error);
      this.setLocalStorage(`timeline_${timeline.id}`, timeline);
    }
  }

  public async getVerificationTimeline(id: string): Promise<any> {
    try {
      const timeline = await this.getData('verificationTimeline', id);
      return timeline || this.getLocalStorage(`timeline_${id}`);
    } catch (error) {
      console.error('Failed to get verification timeline:', error);
      return this.getLocalStorage(`timeline_${id}`);
    }
  }

  // ========== NEW FEATURE: Incident Response ==========
  
  public async saveIncident(incident: any): Promise<void> {
    try {
      await this.storeData('incidents', incident);
      this.setLocalStorage(`incident_${incident.id}`, incident);
    } catch (error) {
      console.error('Failed to save incident:', error);
      this.setLocalStorage(`incident_${incident.id}`, incident);
    }
  }

  public async getIncident(id: string): Promise<any> {
    try {
      const incident = await this.getData('incidents', id);
      return incident || this.getLocalStorage(`incident_${id}`);
    } catch (error) {
      console.error('Failed to get incident:', error);
      return this.getLocalStorage(`incident_${id}`);
    }
  }

  public async getAllIncidents(): Promise<any[]> {
    try {
      const incidents = await this.getData('incidents');
      return incidents || this.getLocalStorage('incidents') || [];
    } catch (error) {
      console.error('Failed to get all incidents:', error);
      return this.getLocalStorage('incidents') || [];
    }
  }

  // ========== NEW FEATURE: Digital Trust Passport ==========
  
  public async saveTrustPassport(passport: any): Promise<void> {
    try {
      await this.storeData('trustPassport', passport);
      this.setLocalStorage('trustPassport', passport);
    } catch (error) {
      console.error('Failed to save trust passport:', error);
      this.setLocalStorage('trustPassport', passport);
    }
  }

  public async getTrustPassport(): Promise<any> {
    try {
      const passport = await this.getData('trustPassport', 'current');
      return passport || this.getLocalStorage('trustPassport');
    } catch (error) {
      console.error('Failed to get trust passport:', error);
      return this.getLocalStorage('trustPassport');
    }
  }

  // ========== NEW FEATURE: Mission Readiness ==========
  
  public async saveMissionReadiness(readiness: any): Promise<void> {
    try {
      await this.storeData('missionReadiness', readiness);
      this.setLocalStorage('missionReadiness', readiness);
    } catch (error) {
      console.error('Failed to save mission readiness:', error);
      this.setLocalStorage('missionReadiness', readiness);
    }
  }

  public async getMissionReadiness(): Promise<any> {
    try {
      const readiness = await this.getData('missionReadiness', 'current');
      return readiness || this.getLocalStorage('missionReadiness');
    } catch (error) {
      console.error('Failed to get mission readiness:', error);
      return this.getLocalStorage('missionReadiness');
    }
  }

  // ========== Mission Continuity Mode ==========
  
  public async getMissionContinuityStatus(): Promise<{
    hasOfflineMission: boolean;
    pendingVerifications: number;
    pendingIncidents: number;
    pendingRecoveries: number;
    lastSyncTime: number;
  }> {
    try {
      const verifications = await this.getAllVerifications();
      const incidents = await this.getAllIncidents();
      const recoveries = await this.getAllMissionRecoveries();
      
      return {
        hasOfflineMission: verifications.length > 0 || incidents.length > 0 || recoveries.length > 0,
        pendingVerifications: verifications.filter(v => !v.synced).length,
        pendingIncidents: incidents.filter(i => !i.synced).length,
        pendingRecoveries: recoveries.filter(r => !r.synced).length,
        lastSyncTime: this.getLocalStorage('lastSyncTime') || 0,
      };
    } catch (error) {
      console.error('Failed to get mission continuity status:', error);
      return {
        hasOfflineMission: false,
        pendingVerifications: 0,
        pendingIncidents: 0,
        pendingRecoveries: 0,
        lastSyncTime: 0,
      };
    }
  }

  // ========== NEW FEATURE: Mission Recovery & Handover ==========
  
  public async saveMissionRecovery(recovery: any): Promise<void> {
    try {
      await this.storeData('missionRecovery', recovery);
      this.setLocalStorage(`missionRecovery_${recovery.id}`, recovery);
    } catch (error) {
      console.error('Failed to save mission recovery:', error);
      this.setLocalStorage(`missionRecovery_${recovery.id}`, recovery);
    }
  }

  public async getMissionRecovery(id: string): Promise<any> {
    try {
      const recovery = await this.getData('missionRecovery', id);
      return recovery || this.getLocalStorage(`missionRecovery_${id}`);
    } catch (error) {
      console.error('Failed to get mission recovery:', error);
      return this.getLocalStorage(`missionRecovery_${id}`);
    }
  }

  public async getAllMissionRecoveries(): Promise<any[]> {
    try {
      const recoveries = await this.getData('missionRecovery');
      return recoveries || this.getLocalStorage('missionRecoveries') || [];
    } catch (error) {
      console.error('Failed to get all mission recoveries:', error);
      return this.getLocalStorage('missionRecoveries') || [];
    }
  }

  public async saveRecoveryTimeline(timeline: any): Promise<void> {
    try {
      await this.storeData('recoveryTimeline', timeline);
      this.setLocalStorage(`recoveryTimeline_${timeline.id}`, timeline);
    } catch (error) {
      console.error('Failed to save recovery timeline:', error);
      this.setLocalStorage(`recoveryTimeline_${timeline.id}`, timeline);
    }
  }

  public async getRecoveryTimeline(id: string): Promise<any> {
    try {
      const timeline = await this.getData('recoveryTimeline', id);
      return timeline || this.getLocalStorage(`recoveryTimeline_${id}`);
    } catch (error) {
      console.error('Failed to get recovery timeline:', error);
      return this.getLocalStorage(`recoveryTimeline_${id}`);
    }
  }

  public async getAllRecoveryTimelines(): Promise<any[]> {
    try {
      const timelines = await this.getData('recoveryTimeline');
      return timelines || this.getLocalStorage('recoveryTimelines') || [];
    } catch (error) {
      console.error('Failed to get all recovery timelines:', error);
      return this.getLocalStorage('recoveryTimelines') || [];
    }
  }

  // ========== ENTERPRISE-GRADE FEATURES ==========

  // Emergency Events
  public async saveEmergencyEvent(event: any): Promise<void> {
    try {
      await this.storeData('emergencyEvents', event);
      this.setLocalStorage(`emergency_${event.id}`, event);
    } catch (error) {
      console.error('Failed to save emergency event:', error);
      this.setLocalStorage(`emergency_${event.id}`, event);
    }
  }

  public async getEmergencyEvent(id: string): Promise<any> {
    try {
      const event = await this.getData('emergencyEvents', id);
      return event || this.getLocalStorage(`emergency_${id}`);
    } catch (error) {
      console.error('Failed to get emergency event:', error);
      return this.getLocalStorage(`emergency_${id}`);
    }
  }

  public async getAllEmergencyEvents(): Promise<any[]> {
    try {
      const events = await this.getData('emergencyEvents');
      return events || this.getLocalStorage('emergencies') || [];
    } catch (error) {
      console.error('Failed to get all emergency events:', error);
      return this.getLocalStorage('emergencies') || [];
    }
  }

  // Field Status
  public async saveFieldStatus(status: any): Promise<void> {
    try {
      await this.storeData('fieldStatus', status);
      this.setLocalStorage('fieldStatus', status);
    } catch (error) {
      console.error('Failed to save field status:', error);
      this.setLocalStorage('fieldStatus', status);
    }
  }

  public async getFieldStatus(): Promise<any> {
    try {
      const status = await this.getData('fieldStatus', 'current');
      return status || this.getLocalStorage('fieldStatus');
    } catch (error) {
      console.error('Failed to get field status:', error);
      return this.getLocalStorage('fieldStatus');
    }
  }

  // Localization Config
  public async saveLocalizationConfig(config: any): Promise<void> {
    try {
      await this.storeData('localizationConfig', config);
      this.setLocalStorage('localizationConfig', config);
    } catch (error) {
      console.error('Failed to save localization config:', error);
      this.setLocalStorage('localizationConfig', config);
    }
  }

  public async getLocalizationConfig(): Promise<any> {
    try {
      const config = await this.getData('localizationConfig', 'current');
      return config || this.getLocalStorage('localizationConfig');
    } catch (error) {
      console.error('Failed to get localization config:', error);
      return this.getLocalStorage('localizationConfig');
    }
  }

  // Conflicts
  public async saveConflict(conflict: any): Promise<void> {
    try {
      await this.storeData('conflicts', conflict);
      this.setLocalStorage(`conflict_${conflict.conflictId}`, conflict);
    } catch (error) {
      console.error('Failed to save conflict:', error);
      this.setLocalStorage(`conflict_${conflict.conflictId}`, conflict);
    }
  }

  public async getConflict(conflictId: string): Promise<any> {
    try {
      const conflict = await this.getData('conflicts', conflictId);
      return conflict || this.getLocalStorage(`conflict_${conflictId}`);
    } catch (error) {
      console.error('Failed to get conflict:', error);
      return this.getLocalStorage(`conflict_${conflictId}`);
    }
  }

  public async getAllConflicts(): Promise<any[]> {
    try {
      const conflicts = await this.getData('conflicts');
      return conflicts || this.getLocalStorage('conflicts') || [];
    } catch (error) {
      console.error('Failed to get all conflicts:', error);
      return this.getLocalStorage('conflicts') || [];
    }
  }

  // Mission Versions (Secure Handover Protocol)
  public async saveMissionVersion(version: any): Promise<void> {
    try {
      await this.storeData('missionVersions', version);
      this.setLocalStorage(`missionVersion_${version.missionId}_v${version.version}`, version);
    } catch (error) {
      console.error('Failed to save mission version:', error);
      this.setLocalStorage(`missionVersion_${version.missionId}_v${version.version}`, version);
    }
  }

  public async getMissionVersion(missionId: string, version: number): Promise<any> {
    try {
      const versionData = await this.getData('missionVersions', `${missionId}_v${version}`);
      return versionData || this.getLocalStorage(`missionVersion_${missionId}_v${version}`);
    } catch (error) {
      console.error('Failed to get mission version:', error);
      return this.getLocalStorage(`missionVersion_${missionId}_v${version}`);
    }
  }

  public async getLatestMissionVersion(missionId: string): Promise<any> {
    try {
      const versions = await this.getData('missionVersions');
      if (versions && Array.isArray(versions)) {
        const missionVersions = versions.filter((v: any) => v.missionId === missionId);
        if (missionVersions.length > 0) {
          return missionVersions.reduce((latest: any, current: any) => 
            current.version > latest.version ? current : latest
          );
        }
      }
      return null;
    } catch (error) {
      console.error('Failed to get latest mission version:', error);
      return null;
    }
  }
}

export const offlineStorage = new OfflineStorageService();
export default offlineStorage;
