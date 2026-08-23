/**
 * DELIVERY TRUTH FABRIC AUDIT SERVICE
 * 
 * Comprehensive audit logging for all verification decisions,
 * evidence collection, anomalies, and trust assessments.
 */

import { DeliveryTrustAssessment, Anomaly, EvidenceRecord } from './deliveryTruthFabricService';
import { securityService } from './securityService';

export interface VerificationAuditRecord {
  auditId: string;
  verificationId: string;
  missionId: string;
  shipmentId: string;
  driverId: string;
  vehicleId: string;
  trustScore: number;
  evidenceConsistency: string;
  verificationStatus: string;
  evidenceIds: string[];
  evidenceCount: number;
  anomalies: Anomaly[];
  explanation: string;
  timestamp: Date;
  offlineEvidence: boolean;
  synchronized: boolean;
  decisionSource: 'automatic' | 'manual' | 'review';
  reviewerId?: string;
  ipAddress?: string;
  deviceId?: string;
}

export interface EvidenceAuditRecord {
  auditId: string;
  evidenceId: string;
  missionId: string;
  shipmentId: string;
  evidenceType: string;
  timestamp: Date;
  source: string;
  offlineCreated: boolean;
  integrityStatus: string;
  accessCount: number;
  lastAccessed?: Date;
}

export interface AnomalyAuditRecord {
  auditId: string;
  anomalyId: string;
  missionId: string;
  shipmentId: string;
  type: string;
  severity: string;
  description: string;
  evidenceIds: string[];
  timestamp: Date;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
}

class DeliveryTruthFabricAuditService {
  private verificationAudits: Map<string, VerificationAuditRecord> = new Map();
  private evidenceAudits: Map<string, EvidenceAuditRecord> = new Map();
  private anomalyAudits: Map<string, AnomalyAuditRecord> = new Map();

  /**
   * Log a verification decision
   */
  logVerificationDecision(assessment: DeliveryTrustAssessment, driverId: string, vehicleId: string): VerificationAuditRecord {
    const auditRecord: VerificationAuditRecord = {
      auditId: `AUD-VER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      verificationId: assessment.verificationId,
      missionId: assessment.missionId,
      shipmentId: assessment.shipmentId,
      driverId,
      vehicleId,
      trustScore: assessment.trustScore,
      evidenceConsistency: assessment.evidenceConsistency,
      verificationStatus: assessment.verificationStatus,
      evidenceIds: Object.keys(assessment.evidenceSummary),
      evidenceCount: Object.keys(assessment.evidenceSummary).length,
      anomalies: assessment.anomalies,
      explanation: assessment.explanation,
      timestamp: assessment.timestamp,
      offlineEvidence: assessment.offlineEvidence,
      synchronized: assessment.synchronized,
      decisionSource: 'automatic'
    };

    this.verificationAudits.set(auditRecord.verificationId, auditRecord);
    
    // Also log to security service
    securityService.logVerificationDecision({
      verificationId: auditRecord.verificationId,
      missionId: auditRecord.missionId,
      shipmentId: auditRecord.shipmentId,
      trustScore: auditRecord.trustScore,
      verificationStatus: auditRecord.verificationStatus,
      evidenceCount: auditRecord.evidenceCount,
      anomalies: auditRecord.anomalies.length,
      offlineEvidence: auditRecord.offlineEvidence
    });

    return auditRecord;
  }

  /**
   * Log evidence collection
   */
  logEvidenceCollection(evidence: EvidenceRecord): EvidenceAuditRecord {
    const auditRecord: EvidenceAuditRecord = {
      auditId: `AUD-EVI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      evidenceId: evidence.evidenceId,
      missionId: evidence.missionId,
      shipmentId: evidence.shipmentId,
      evidenceType: evidence.evidenceType,
      timestamp: evidence.timestamp,
      source: evidence.source,
      offlineCreated: evidence.offlineCreated,
      integrityStatus: evidence.integrityStatus,
      accessCount: 1
    };

    this.evidenceAudits.set(evidence.evidenceId, auditRecord);
    
    // Also log to security service
    securityService.logEvidenceCollection({
      evidenceId: evidence.evidenceId,
      evidenceType: evidence.evidenceType,
      missionId: evidence.missionId,
      source: evidence.source,
      offlineCreated: evidence.offlineCreated
    });

    return auditRecord;
  }

  /**
   * Log detected anomaly
   */
  logAnomaly(anomaly: Anomaly, missionId: string, shipmentId: string): AnomalyAuditRecord {
    const auditRecord: AnomalyAuditRecord = {
      auditId: `AUD-ANO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      anomalyId: `ANO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      missionId,
      shipmentId,
      type: anomaly.type,
      severity: anomaly.severity,
      description: anomaly.description,
      evidenceIds: anomaly.evidenceIds,
      timestamp: anomaly.timestamp,
      resolved: false
    };

    this.anomalyAudits.set(auditRecord.anomalyId, auditRecord);
    
    // Also log to security service
    securityService.logEvidenceAnomaly({
      type: anomaly.type,
      severity: anomaly.severity,
      description: anomaly.description,
      evidenceIds: anomaly.evidenceIds,
      missionId
    });

    return auditRecord;
  }

  /**
   * Log evidence access
   */
  logEvidenceAccess(evidenceId: string, accessType: 'view' | 'export' | 'review'): void {
    const audit = this.evidenceAudits.get(evidenceId);
    if (audit) {
      audit.accessCount++;
      audit.lastAccessed = new Date();
      
      securityService.logEvidenceAccess(evidenceId, audit.missionId, accessType);
    }
  }

  /**
   * Mark anomaly as resolved
   */
  resolveAnomaly(anomalyId: string, reviewerId: string): void {
    const audit = this.anomalyAudits.get(anomalyId);
    if (audit) {
      audit.resolved = true;
      audit.resolvedBy = reviewerId;
      audit.resolvedAt = new Date();
    }
  }

  /**
   * Get verification audit by ID
   */
  getVerificationAudit(verificationId: string): VerificationAuditRecord | undefined {
    return this.verificationAudits.get(verificationId);
  }

  /**
   * Get all verification audits for a mission
   */
  getMissionVerificationAudits(missionId: string): VerificationAuditRecord[] {
    return Array.from(this.verificationAudits.values()).filter(
      audit => audit.missionId === missionId
    );
  }

  /**
   * Get all anomalies for a mission
   */
  getMissionAnomalies(missionId: string): AnomalyAuditRecord[] {
    return Array.from(this.anomalyAudits.values()).filter(
      audit => audit.missionId === missionId
    );
  }

  /**
   * Get unresolved anomalies
   */
  getUnresolvedAnomalies(): AnomalyAuditRecord[] {
    return Array.from(this.anomalyAudits.values()).filter(
      audit => !audit.resolved
    );
  }

  /**
   * Get audit statistics
   */
  getAuditStatistics(): {
    totalVerifications: number;
    totalEvidenceRecords: number;
    totalAnomalies: number;
    unresolvedAnomalies: number;
    averageTrustScore: number;
    verifiedCount: number;
    needsReviewCount: number;
    exceptionCount: number;
    failedCount: number;
  } {
    const verifications = Array.from(this.verificationAudits.values());
    const anomalies = Array.from(this.anomalyAudits.values());

    const totalTrustScore = verifications.reduce((sum, v) => sum + v.trustScore, 0);
    const averageTrustScore = verifications.length > 0 ? totalTrustScore / verifications.length : 0;

    return {
      totalVerifications: verifications.length,
      totalEvidenceRecords: this.evidenceAudits.size,
      totalAnomalies: anomalies.length,
      unresolvedAnomalies: anomalies.filter(a => !a.resolved).length,
      averageTrustScore,
      verifiedCount: verifications.filter(v => v.verificationStatus === 'VERIFIED').length,
      needsReviewCount: verifications.filter(v => v.verificationStatus === 'NEEDS_REVIEW').length,
      exceptionCount: verifications.filter(v => v.verificationStatus === 'EXCEPTION').length,
      failedCount: verifications.filter(v => v.verificationStatus === 'FAILED').length
    };
  }

  /**
   * Export audit trail for decision replay
   */
  exportDecisionReplay(verificationId: string): {
    verification: VerificationAuditRecord | undefined;
    evidence: EvidenceAuditRecord[];
    anomalies: AnomalyAuditRecord[];
  } {
    const verification = this.getVerificationAudit(verificationId);
    
    if (!verification) {
      return {
        verification: undefined,
        evidence: [],
        anomalies: []
      };
    }

    const evidence = Array.from(this.evidenceAudits.values()).filter(
      audit => verification.evidenceIds.includes(audit.evidenceId)
    );

    const anomalies = Array.from(this.anomalyAudits.values()).filter(
      audit => verification.anomalies.some(a => audit.evidenceIds.includes(audit.evidenceId))
    );

    return {
      verification,
      evidence,
      anomalies
    };
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const deliveryTruthFabricAuditService = new DeliveryTruthFabricAuditService();
