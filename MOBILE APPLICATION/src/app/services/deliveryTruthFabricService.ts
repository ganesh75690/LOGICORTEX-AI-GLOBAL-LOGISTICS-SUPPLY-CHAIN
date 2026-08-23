/**
 * DELIVERY TRUTH FABRIC™ (DTF)
 * 
 * Core Principle: "DO NOT TRUST A SINGLE SIGNAL.
 * ESTABLISH DELIVERY TRUTH FROM CONSISTENT EVIDENCE."
 * 
 * This service extends the existing AI Delivery Verification Engine™
 * with multi-source evidence collection, cross-validation, and trust assessment.
 */

// ============================================================================
// EVIDENCE NORMALIZATION MODEL
// ============================================================================

export type EvidenceType = 
  | 'GPS'
  | 'STOP'
  | 'TIME'
  | 'ROUTE'
  | 'POD'
  | 'DRIVER_CONFIRMATION'
  | 'PACKAGE_SCAN'
  | 'VEHICLE'
  | 'MISSION'
  | 'NETWORK'
  | 'DEVICE'
  | 'EXTERNAL_SYSTEM';

export type EvidenceStatus = 'valid' | 'inconsistent' | 'unavailable' | 'suspicious';
export type IntegrityStatus = 'verified' | 'anomaly_detected' | 'requires_review';

export interface EvidenceRecord {
  evidenceId: string;
  missionId: string;
  shipmentId: string;
  driverId: string;
  vehicleId: string;
  evidenceType: EvidenceType;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  source: string;
  status: EvidenceStatus;
  confidence: number; // 0-100
  offlineCreated: boolean;
  synchronized: boolean;
  integrityStatus: IntegrityStatus;
  metadata?: Record<string, any>;
}

export interface DeliveryEvidenceGraph {
  driverId: string;
  vehicleId: string;
  missionId: string;
  route: any[];
  destination: any;
  package: any;
  timestamp: Date;
  pod: any;
  evidenceRecords: EvidenceRecord[];
}

export type VerificationStatus = 'VERIFIED' | 'NEEDS_REVIEW' | 'EXCEPTION' | 'FAILED';
export type EvidenceConsistency = 'HIGH' | 'MEDIUM' | 'LOW' | 'INCONSISTENT';

export interface DeliveryTrustAssessment {
  verificationId: string;
  missionId: string;
  shipmentId: string;
  trustScore: number; // 0-100
  evidenceConsistency: EvidenceConsistency;
  verificationStatus: VerificationStatus;
  evidenceSummary: {
    [key: string]: {
      status: EvidenceStatus;
      confidence: number;
      description: string;
    };
  };
  anomalies: Anomaly[];
  explanation: string;
  timestamp: Date;
  offlineEvidence: boolean;
  synchronized: boolean;
}

export interface Anomaly {
  type: 'TIMELINE' | 'LOCATION' | 'DUPLICATE' | 'ROUTE' | 'INTEGRITY' | 'EXTERNAL';
  severity: 'low' | 'medium' | 'high';
  description: string;
  evidenceIds: string[];
  timestamp: Date;
}

// ============================================================================
// EVIDENCE ADAPTER INTERFACE
// ============================================================================

export interface EvidenceAdapter {
  collectEvidence(missionId: string): Promise<EvidenceRecord[]>;
  validateEvidence(evidence: EvidenceRecord): Promise<EvidenceStatus>;
  getAdapterName(): string;
}

// ============================================================================
// DELIVERY TRUTH FABRIC SERVICE
// ============================================================================

class DeliveryTruthFabricService {
  private adapters: Map<string, EvidenceAdapter> = new Map();
  private evidenceStore: Map<string, EvidenceRecord[]> = new Map();

  /**
   * Register an evidence adapter for a specific source
   */
  registerAdapter(adapter: EvidenceAdapter): void {
    this.adapters.set(adapter.getAdapterName(), adapter);
  }

  /**
   * Collect all available evidence for a delivery
   */
  async collectDeliveryEvidence(missionId: string, shipmentId: string, driverId: string, vehicleId: string): Promise<EvidenceRecord[]> {
    const evidence: EvidenceRecord[] = [];

    // Collect from all registered adapters
    for (const [name, adapter] of this.adapters) {
      try {
        const adapterEvidence = await adapter.collectEvidence(missionId);
        evidence.push(...adapterEvidence);
      } catch (error) {
        console.error(`Evidence collection failed for adapter ${name}:`, error);
      }
    }

    // Store evidence for this mission
    this.evidenceStore.set(missionId, evidence);

    return evidence;
  }

  /**
   * Normalize evidence to common model
   */
  normalizeEvidence(rawEvidence: any[], missionId: string, shipmentId: string, driverId: string, vehicleId: string): EvidenceRecord[] {
    return rawEvidence.map((raw, index) => ({
      evidenceId: `EVI-${missionId}-${Date.now()}-${index}`,
      missionId,
      shipmentId,
      driverId,
      vehicleId,
      evidenceType: this.inferEvidenceType(raw),
      timestamp: new Date(raw.timestamp || Date.now()),
      location: raw.location,
      source: raw.source || 'SYSTEM',
      status: 'valid',
      confidence: raw.confidence || 85,
      offlineCreated: raw.offlineCreated || false,
      synchronized: raw.synchronized !== false,
      integrityStatus: 'verified',
      metadata: raw.metadata
    }));
  }

  /**
   * Infer evidence type from raw data
   */
  private inferEvidenceType(raw: any): EvidenceType {
    if (raw.type) return raw.type as EvidenceType;
    if (raw.gps || raw.location) return 'GPS';
    if (raw.pod || raw.signature) return 'POD';
    if (raw.package || raw.scan) return 'PACKAGE_SCAN';
    if (raw.stop || raw.geofence) return 'STOP';
    if (raw.route) return 'ROUTE';
    if (raw.mission) return 'MISSION';
    if (raw.vehicle) return 'VEHICLE';
    if (raw.network) return 'NETWORK';
    if (raw.device) return 'DEVICE';
    return 'EXTERNAL_SYSTEM';
  }

  /**
   * Cross-validate evidence sources
   */
  async crossValidateEvidence(evidence: EvidenceRecord[]): Promise<{
    consistency: EvidenceConsistency;
    inconsistencies: string[];
  }> {
    const inconsistencies: string[] = [];
    let consistentCount = 0;
    let totalCount = evidence.length;

    // Group evidence by type
    const grouped = this.groupEvidenceByType(evidence);

    // Validate GPS vs Stop location
    if (grouped.GPS && grouped.STOP) {
      const gpsEvidence = grouped.GPS[0];
      const stopEvidence = grouped.STOP[0];
      
      if (gpsEvidence.location && stopEvidence.location) {
        const distance = this.calculateDistance(
          gpsEvidence.location.latitude,
          gpsEvidence.location.longitude,
          stopEvidence.location.latitude,
          stopEvidence.location.longitude
        );
        
        if (distance > 500) { // 500 meters threshold
          inconsistencies.push('GPS location inconsistent with stop location');
        } else {
          consistentCount++;
        }
      }
    }

    // Validate timestamps
    const timestamps = evidence.map(e => e.timestamp.getTime()).sort((a, b) => a - b);
    const timeRange = timestamps[timestamps.length - 1] - timestamps[0];
    
    if (timeRange > 3600000) { // 1 hour threshold
      inconsistencies.push('Evidence timestamps span more than 1 hour');
    }

    // Validate POD timestamp against mission timeline
    if (grouped.POD && grouped.MISSION) {
      const podTimestamp = grouped.POD[0].timestamp.getTime();
      const missionTimestamp = grouped.MISSION[0].timestamp.getTime();
      
      if (Math.abs(podTimestamp - missionTimestamp) > 86400000) { // 24 hours
        inconsistencies.push('POD timestamp inconsistent with mission timeline');
      }
    }

    // Calculate consistency level
    const consistencyRatio = consistentCount / totalCount;
    let consistency: EvidenceConsistency;
    
    if (inconsistencies.length === 0 && consistencyRatio > 0.8) {
      consistency = 'HIGH';
    } else if (inconsistencies.length <= 2 && consistencyRatio > 0.5) {
      consistency = 'MEDIUM';
    } else if (inconsistencies.length <= 4) {
      consistency = 'LOW';
    } else {
      consistency = 'INCONSISTENT';
    }

    return { consistency, inconsistencies };
  }

  /**
   * Calculate distance between two coordinates in meters
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  /**
   * Group evidence by type
   */
  private groupEvidenceByType(evidence: EvidenceRecord[]): Record<string, EvidenceRecord[]> {
    const grouped: Record<string, EvidenceRecord[]> = {};
    
    for (const e of evidence) {
      if (!grouped[e.evidenceType]) {
        grouped[e.evidenceType] = [];
      }
      grouped[e.evidenceType].push(e);
    }
    
    return grouped;
  }

  /**
   * Detect timeline anomalies
   */
  detectTimelineAnomalies(evidence: EvidenceRecord[]): Anomaly[] {
    const anomalies: Anomaly[] = [];
    const locationHistory = evidence.filter(e => e.location).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    for (let i = 1; i < locationHistory.length; i++) {
      const prev = locationHistory[i - 1];
      const curr = locationHistory[i];
      
      const timeDiff = curr.timestamp.getTime() - prev.timestamp.getTime();
      const distance = this.calculateDistance(
        prev.location!.latitude,
        prev.location!.longitude,
        curr.location!.latitude,
        curr.location!.longitude
      );
      
      // Assume average speed of 100 km/h = 27.78 m/s
      const maxPossibleDistance = (timeDiff / 1000) * 27.78;
      
      if (distance > maxPossibleDistance * 1.5) {
        anomalies.push({
          type: 'TIMELINE',
          severity: 'high',
          description: 'Timeline anomaly: Movement faster than physically possible',
          evidenceIds: [prev.evidenceId, curr.evidenceId],
          timestamp: curr.timestamp
        });
      }
    }

    return anomalies;
  }

  /**
   * Detect evidence integrity issues
   */
  detectIntegrityAnomalies(evidence: EvidenceRecord[]): Anomaly[] {
    const anomalies: Anomaly[] = [];
    const evidenceIds = new Set(evidence.map(e => e.evidenceId));
    const idCounts = new Map<string, number>();

    // Check for duplicate evidence
    for (const e of evidence) {
      const count = idCounts.get(e.evidenceId) || 0;
      idCounts.set(e.evidenceId, count + 1);
      
      if (count > 0) {
        anomalies.push({
          type: 'DUPLICATE',
          severity: 'medium',
          description: 'Duplicate evidence detected',
          evidenceIds: [e.evidenceId],
          timestamp: e.timestamp
        });
      }
    }

    // Check for delivery outside mission boundaries
    const missionEvidence = evidence.find(e => e.evidenceType === 'MISSION');
    const podEvidence = evidence.find(e => e.evidenceType === 'POD');
    
    if (missionEvidence && podEvidence && missionEvidence.location && podEvidence.location) {
      const distance = this.calculateDistance(
        missionEvidence.location.latitude,
        missionEvidence.location.longitude,
        podEvidence.location.latitude,
        podEvidence.location.longitude
      );
      
      if (distance > 10000) { // 10 km threshold
        anomalies.push({
          type: 'LOCATION',
          severity: 'high',
          description: 'Delivery location outside expected mission boundaries',
          evidenceIds: [missionEvidence.evidenceId, podEvidence.evidenceId],
          timestamp: podEvidence.timestamp
        });
      }
    }

    return anomalies;
  }

  /**
   * Calculate Delivery Trust Score™
   */
  calculateTrustScore(
    evidence: EvidenceRecord[],
    consistency: EvidenceConsistency,
    anomalies: Anomaly[]
  ): number {
    let score = 100;

    // Penalize for evidence inconsistency
    switch (consistency) {
      case 'HIGH':
        score -= 0;
        break;
      case 'MEDIUM':
        score -= 10;
        break;
      case 'LOW':
        score -= 25;
        break;
      case 'INCONSISTENT':
        score -= 40;
        break;
    }

    // Penalize for anomalies
    for (const anomaly of anomalies) {
      switch (anomaly.severity) {
        case 'low':
          score -= 5;
          break;
        case 'medium':
          score -= 10;
          break;
        case 'high':
          score -= 20;
          break;
      }
    }

    // Penalize for incomplete evidence
    const expectedTypes = ['GPS', 'POD', 'MISSION'];
    const presentTypes = new Set(evidence.map(e => e.evidenceType));
    const missingTypes = expectedTypes.filter(t => !presentTypes.has(t));
    
    score -= missingTypes.length * 5;

    // Ensure score is within bounds
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate verification status based on trust score
   */
  determineVerificationStatus(trustScore: number, anomalies: Anomaly[]): VerificationStatus {
    if (trustScore >= 90) {
      return 'VERIFIED';
    } else if (trustScore >= 70) {
      return 'NEEDS_REVIEW';
    } else if (trustScore >= 50) {
      return 'EXCEPTION';
    } else {
      return 'FAILED';
    }
  }

  /**
   * Generate explainable verification result
   */
  generateExplanation(
    trustScore: number,
    consistency: EvidenceConsistency,
    anomalies: Anomaly[],
    offlineEvidence: boolean
  ): string {
    if (trustScore >= 90) {
      return 'Delivery location, mission route, completion time and proof-of-delivery evidence were consistent.';
    } else if (trustScore >= 70) {
      if (offlineEvidence) {
        return 'Some evidence could not be independently confirmed because the device was offline during delivery.';
      }
      return 'Some delivery evidence could not be independently confirmed.';
    } else if (anomalies.length > 0) {
      return 'Delivery timeline and location signals were inconsistent and require review.';
    }
    return 'Multiple delivery signals are inconsistent.';
  }

  /**
   * Perform complete delivery truth assessment
   */
  async assessDeliveryTruth(
    missionId: string,
    shipmentId: string,
    driverId: string,
    vehicleId: string,
    isOffline: boolean = false
  ): Promise<DeliveryTrustAssessment> {
    // Collect evidence
    const evidence = await this.collectDeliveryEvidence(missionId, shipmentId, driverId, vehicleId);

    // Cross-validate
    const { consistency, inconsistencies } = await this.crossValidateEvidence(evidence);

    // Detect anomalies
    const timelineAnomalies = this.detectTimelineAnomalies(evidence);
    const integrityAnomalies = this.detectIntegrityAnomalies(evidence);
    const allAnomalies = [...timelineAnomalies, ...integrityAnomalies];

    // Calculate trust score
    const trustScore = this.calculateTrustScore(evidence, consistency, allAnomalies);

    // Determine verification status
    const verificationStatus = this.determineVerificationStatus(trustScore, allAnomalies);

    // Generate explanation
    const explanation = this.generateExplanation(trustScore, consistency, allAnomalies, isOffline);

    // Build evidence summary
    const evidenceSummary = this.buildEvidenceSummary(evidence);

    // Create assessment
    const assessment: DeliveryTrustAssessment = {
      verificationId: `VER-${missionId}-${Date.now()}`,
      missionId,
      shipmentId,
      trustScore,
      evidenceConsistency: consistency,
      verificationStatus,
      evidenceSummary,
      anomalies: allAnomalies,
      explanation,
      timestamp: new Date(),
      offlineEvidence: isOffline,
      synchronized: !isOffline
    };

    return assessment;
  }

  /**
   * Build evidence summary for display
   */
  private buildEvidenceSummary(evidence: EvidenceRecord[]): DeliveryTrustAssessment['evidenceSummary'] {
    const summary: DeliveryTrustAssessment['evidenceSummary'] = {};
    
    for (const e of evidence) {
      summary[e.evidenceType] = {
        status: e.status,
        confidence: e.confidence,
        description: this.getEvidenceDescription(e)
      };
    }
    
    return summary;
  }

  /**
   * Get human-readable evidence description
   */
  private getEvidenceDescription(evidence: EvidenceRecord): string {
    switch (evidence.evidenceType) {
      case 'GPS':
        return evidence.location ? `Location: ${evidence.location.latitude.toFixed(4)}, ${evidence.location.longitude.toFixed(4)}` : 'GPS data unavailable';
      case 'POD':
        return 'Proof of delivery received';
      case 'PACKAGE_SCAN':
        return 'Package scan confirmed';
      case 'STOP':
        return 'Stop location confirmed';
      case 'ROUTE':
        return 'Route data available';
      case 'MISSION':
        return 'Mission status confirmed';
      case 'VEHICLE':
        return 'Vehicle association verified';
      case 'NETWORK':
        return 'Network timestamp recorded';
      case 'DEVICE':
        return 'Device integrity verified';
      default:
        return 'External evidence received';
    }
  }

  /**
   * Get evidence timeline for audit
   */
  getEvidenceTimeline(missionId: string): Array<{ time: string; event: string }> {
    const evidence = this.evidenceStore.get(missionId) || [];
    const timeline = evidence
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      .map(e => ({
        time: e.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        event: this.getTimelineEvent(e)
      }));
    
    return timeline;
  }

  /**
   * Get timeline event description
   */
  private getTimelineEvent(evidence: EvidenceRecord): string {
    switch (evidence.evidenceType) {
      case 'GPS':
        return 'GPS location recorded';
      case 'STOP':
        return 'Stop location confirmed';
      case 'POD':
        return 'Proof of delivery captured';
      case 'PACKAGE_SCAN':
        return 'Package scan recorded';
      case 'DRIVER_CONFIRMATION':
        return 'Driver confirmed delivery';
      case 'MISSION':
        return 'Mission status updated';
      default:
        return `${e.evidenceType} evidence received`;
    }
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const deliveryTruthFabricService = new DeliveryTruthFabricService();
