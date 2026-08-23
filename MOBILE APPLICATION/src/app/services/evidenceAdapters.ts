/**
 * GLOBAL EVIDENCE ADAPTER ARCHITECTURE
 * 
 * Allows different companies and regions to provide different evidence sources.
 * The core verification engine remains independent from any single country's
 * technology or logistics provider.
 */

import { EvidenceAdapter, EvidenceRecord, EvidenceType, EvidenceStatus } from './deliveryTruthFabricService';

// ============================================================================
// GPS ADAPTER
// ============================================================================

export class GPSAdapter implements EvidenceAdapter {
  async collectEvidence(missionId: string): Promise<EvidenceRecord[]> {
    // Simulate GPS evidence collection
    // In production, this would interface with the device's GPS/GNSS
    const evidence: EvidenceRecord[] = [
      {
        evidenceId: `GPS-${missionId}-${Date.now()}`,
        missionId,
        shipmentId: '',
        driverId: '',
        vehicleId: '',
        evidenceType: 'GPS',
        timestamp: new Date(),
        location: {
          latitude: 28.4595,
          longitude: 77.0266,
          accuracy: 10
        },
        source: 'GPS_ADAPTER',
        status: 'valid',
        confidence: 95,
        offlineCreated: false,
        synchronized: true,
        integrityStatus: 'verified',
        metadata: {
          provider: 'device_gnss',
          satelliteCount: 12,
          fixType: '3D'
        }
      }
    ];
    
    return evidence;
  }

  async validateEvidence(evidence: EvidenceRecord): Promise<EvidenceStatus> {
    // Validate GPS accuracy and integrity
    if (evidence.location && evidence.location.accuracy && evidence.location.accuracy > 100) {
      return 'inconsistent';
    }
    return 'valid';
  }

  getAdapterName(): string {
    return 'GPS_ADAPTER';
  }
}

// ============================================================================
// POD ADAPTER
// ============================================================================

export class PODAdapter implements EvidenceAdapter {
  async collectEvidence(missionId: string): Promise<EvidenceRecord[]> {
    // Simulate POD evidence collection
    // In production, this would interface with signature capture, photo, etc.
    const evidence: EvidenceRecord[] = [
      {
        evidenceId: `POD-${missionId}-${Date.now()}`,
        missionId,
        shipmentId: '',
        driverId: '',
        vehicleId: '',
        evidenceType: 'POD',
        timestamp: new Date(),
        source: 'POD_ADAPTER',
        status: 'valid',
        confidence: 98,
        offlineCreated: false,
        synchronized: true,
        integrityStatus: 'verified',
        metadata: {
          signatureType: 'digital',
          photoCaptured: true,
          recipientName: 'Verified Recipient'
        }
      }
    ];
    
    return evidence;
  }

  async validateEvidence(evidence: EvidenceRecord): Promise<EvidenceStatus> {
    // Validate POD integrity
    if (!evidence.metadata || !evidence.metadata.signatureType) {
      return 'inconsistent';
    }
    return 'valid';
  }

  getAdapterName(): string {
    return 'POD_ADAPTER';
  }
}

// ============================================================================
// PACKAGE SCAN ADAPTER
// ============================================================================

export class PackageScanAdapter implements EvidenceAdapter {
  async collectEvidence(missionId: string): Promise<EvidenceRecord[]> {
    // Simulate package scan evidence collection
    // In production, this would interface with barcode/QR scanners
    const evidence: EvidenceRecord[] = [
      {
        evidenceId: `SCAN-${missionId}-${Date.now()}`,
        missionId,
        shipmentId: '',
        driverId: '',
        vehicleId: '',
        evidenceType: 'PACKAGE_SCAN',
        timestamp: new Date(),
        source: 'PACKAGE_SCAN_ADAPTER',
        status: 'valid',
        confidence: 99,
        offlineCreated: false,
        synchronized: true,
        integrityStatus: 'verified',
        metadata: {
          scanType: 'barcode',
          packageId: 'PKG-20481',
          scanResult: 'confirmed'
        }
      }
    ];
    
    return evidence;
  }

  async validateEvidence(evidence: EvidenceRecord): Promise<EvidenceStatus> {
    // Validate package scan
    if (!evidence.metadata || !evidence.metadata.packageId) {
      return 'inconsistent';
    }
    return 'valid';
  }

  getAdapterName(): string {
    return 'PACKAGE_SCAN_ADAPTER';
  }
}

// ============================================================================
// VEHICLE ADAPTER
// ============================================================================

export class VehicleAdapter implements EvidenceAdapter {
  async collectEvidence(missionId: string): Promise<EvidenceRecord[]> {
    // Simulate vehicle evidence collection
    // In production, this would interface with vehicle telematics
    const evidence: EvidenceRecord[] = [
      {
        evidenceId: `VEH-${missionId}-${Date.now()}`,
        missionId,
        shipmentId: '',
        driverId: '',
        vehicleId: '',
        evidenceType: 'VEHICLE',
        timestamp: new Date(),
        source: 'VEHICLE_ADAPTER',
        status: 'valid',
        confidence: 90,
        offlineCreated: false,
        synchronized: true,
        integrityStatus: 'verified',
        metadata: {
          vehicleId: 'VH-20481',
          ignitionStatus: 'on',
          odometer: 15420
        }
      }
    ];
    
    return evidence;
  }

  async validateEvidence(evidence: EvidenceRecord): Promise<EvidenceStatus> {
    // Validate vehicle association
    if (!evidence.metadata || !evidence.metadata.vehicleId) {
      return 'inconsistent';
    }
    return 'valid';
  }

  getAdapterName(): string {
    return 'VEHICLE_ADAPTER';
  }
}

// ============================================================================
// STOP GEOFENCE ADAPTER
// ============================================================================

export class StopAdapter implements EvidenceAdapter {
  async collectEvidence(missionId: string): Promise<EvidenceRecord[]> {
    // Simulate stop geofence evidence collection
    const evidence: EvidenceRecord[] = [
      {
        evidenceId: `STOP-${missionId}-${Date.now()}`,
        missionId,
        shipmentId: '',
        driverId: '',
        vehicleId: '',
        evidenceType: 'STOP',
        timestamp: new Date(),
        location: {
          latitude: 28.4595,
          longitude: 77.0266,
          accuracy: 5
        },
        source: 'STOP_ADAPTER',
        status: 'valid',
        confidence: 92,
        offlineCreated: false,
        synchronized: true,
        integrityStatus: 'verified',
        metadata: {
          geofenceId: 'GF-20481',
          enteredAt: new Date(Date.now() - 300000),
          dwellTime: 300
        }
      }
    ];
    
    return evidence;
  }

  async validateEvidence(evidence: EvidenceRecord): Promise<EvidenceStatus> {
    // Validate stop location
    if (!evidence.location) {
      return 'inconsistent';
    }
    return 'valid';
  }

  getAdapterName(): string {
    return 'STOP_ADAPTER';
  }
}

// ============================================================================
// MISSION STATUS ADAPTER
// ============================================================================

export class MissionAdapter implements EvidenceAdapter {
  async collectEvidence(missionId: string): Promise<EvidenceRecord[]> {
    // Simulate mission status evidence collection
    const evidence: EvidenceRecord[] = [
      {
        evidenceId: `MSN-${missionId}-${Date.now()}`,
        missionId,
        shipmentId: '',
        driverId: '',
        vehicleId: '',
        evidenceType: 'MISSION',
        timestamp: new Date(),
        source: 'MISSION_ADAPTER',
        status: 'valid',
        confidence: 100,
        offlineCreated: false,
        synchronized: true,
        integrityStatus: 'verified',
        metadata: {
          missionStatus: 'in_progress',
          stopsCompleted: 3,
          stopsTotal: 5
        }
      }
    ];
    
    return evidence;
  }

  async validateEvidence(evidence: EvidenceRecord): Promise<EvidenceStatus> {
    // Validate mission status
    if (!evidence.metadata || !evidence.metadata.missionStatus) {
      return 'inconsistent';
    }
    return 'valid';
  }

  getAdapterName(): string {
    return 'MISSION_ADAPTER';
  }
}

// ============================================================================
// NETWORK TIMESTAMP ADAPTER
// ============================================================================

export class NetworkAdapter implements EvidenceAdapter {
  async collectEvidence(missionId: string): Promise<EvidenceRecord[]> {
    // Simulate network timestamp evidence collection
    const evidence: EvidenceRecord[] = [
      {
        evidenceId: `NET-${missionId}-${Date.now()}`,
        missionId,
        shipmentId: '',
        driverId: '',
        vehicleId: '',
        evidenceType: 'NETWORK',
        timestamp: new Date(),
        source: 'NETWORK_ADAPTER',
        status: 'valid',
        confidence: 95,
        offlineCreated: false,
        synchronized: true,
        integrityStatus: 'verified',
        metadata: {
          serverTimestamp: new Date(),
          latency: 45,
          connectionType: '4G'
        }
      }
    ];
    
    return evidence;
  }

  async validateEvidence(evidence: EvidenceRecord): Promise<EvidenceStatus> {
    // Validate network timestamp
    if (!evidence.metadata || !evidence.metadata.serverTimestamp) {
      return 'inconsistent';
    }
    return 'valid';
  }

  getAdapterName(): string {
    return 'NETWORK_ADAPTER';
  }
}

// ============================================================================
// DEVICE INTEGRITY ADAPTER
// ============================================================================

export class DeviceAdapter implements EvidenceAdapter {
  async collectEvidence(missionId: string): Promise<EvidenceRecord[]> {
    // Simulate device integrity evidence collection
    const evidence: EvidenceRecord[] = [
      {
        evidenceId: `DEV-${missionId}-${Date.now()}`,
        missionId,
        shipmentId: '',
        driverId: '',
        vehicleId: '',
        evidenceType: 'DEVICE',
        timestamp: new Date(),
        source: 'DEVICE_ADAPTER',
        status: 'valid',
        confidence: 90,
        offlineCreated: false,
        synchronized: true,
        integrityStatus: 'verified',
        metadata: {
          deviceId: 'DEV-20481',
          osVersion: 'Android 13',
          appVersion: '2.4.1',
          securityPatch: '2024-01-05'
        }
      }
    ];
    
    return evidence;
  }

  async validateEvidence(evidence: EvidenceRecord): Promise<EvidenceStatus> {
    // Validate device integrity
    if (!evidence.metadata || !evidence.metadata.deviceId) {
      return 'inconsistent';
    }
    return 'valid';
  }

  getAdapterName(): string {
    return 'DEVICE_ADAPTER';
  }
}

// ============================================================================
// EXTERNAL SYSTEM ADAPTER (TMS/WMS/ERP)
// ============================================================================

export class ExternalSystemAdapter implements EvidenceAdapter {
  async collectEvidence(missionId: string): Promise<EvidenceRecord[]> {
    // Simulate external system evidence collection
    // In production, this would interface with TMS, WMS, ERP systems
    const evidence: EvidenceRecord[] = [
      {
        evidenceId: `EXT-${missionId}-${Date.now()}`,
        missionId,
        shipmentId: '',
        driverId: '',
        vehicleId: '',
        evidenceType: 'EXTERNAL_SYSTEM',
        timestamp: new Date(),
        source: 'EXTERNAL_ADAPTER',
        status: 'valid',
        confidence: 85,
        offlineCreated: false,
        synchronized: true,
        integrityStatus: 'verified',
        metadata: {
          systemType: 'TMS',
          systemId: 'TMS-PROD-01',
          confirmationId: 'CONF-20481'
        }
      }
    ];
    
    return evidence;
  }

  async validateEvidence(evidence: EvidenceRecord): Promise<EvidenceStatus> {
    // Validate external system confirmation
    if (!evidence.metadata || !evidence.metadata.systemType) {
      return 'inconsistent';
    }
    return 'valid';
  }

  getAdapterName(): string {
    return 'EXTERNAL_ADAPTER';
  }
}

// ============================================================================
// ADAPTER REGISTRY
// ============================================================================

export class EvidenceAdapterRegistry {
  private adapters: Map<string, EvidenceAdapter> = new Map();

  registerAdapter(adapter: EvidenceAdapter): void {
    this.adapters.set(adapter.getAdapterName(), adapter);
  }

  getAdapter(name: string): EvidenceAdapter | undefined {
    return this.adapters.get(name);
  }

  getAllAdapters(): EvidenceAdapter[] {
    return Array.from(this.adapters.values());
  }

  registerDefaultAdapters(): void {
    this.registerAdapter(new GPSAdapter());
    this.registerAdapter(new PODAdapter());
    this.registerAdapter(new PackageScanAdapter());
    this.registerAdapter(new VehicleAdapter());
    this.registerAdapter(new StopAdapter());
    this.registerAdapter(new MissionAdapter());
    this.registerAdapter(new NetworkAdapter());
    this.registerAdapter(new DeviceAdapter());
    this.registerAdapter(new ExternalSystemAdapter());
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const evidenceAdapterRegistry = new EvidenceAdapterRegistry();
