/**
 * SUPPLIER WEB INTEGRATION SERVICE
 * 
 * Sends verification results to Supplier Web.
 * Supplier receives delivery status, trust score, evidence consistency,
 * verification result, exceptions, review requirement, and audit reference.
 * Does not expose unnecessary driver data.
 */

import { DeliveryTrustAssessment } from './deliveryTruthFabricService';
import { securityService } from './securityService';

export interface SupplierWebPayload {
  shipmentId: string;
  deliveryStatus: string;
  trustScore: number;
  evidenceConsistency: string;
  verificationResult: string;
  hasExceptions: boolean;
  requiresReview: boolean;
  auditReference: string;
  verificationTimestamp: string;
  offlineEvidence: boolean;
  // No driver personal data exposed
}

export interface SupplierWebResponse {
  success: boolean;
  messageId: string;
  timestamp: string;
  status: string;
}

class SupplierWebIntegrationService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    // In production, these would come from environment variables
    this.baseUrl = 'https://api.supplier-web.example.com';
    this.apiKey = '';
  }

  /**
   * Send verification result to Supplier Web
   */
  async sendVerificationResult(
    assessment: DeliveryTrustAssessment,
    shipmentId: string
  ): Promise<SupplierWebResponse> {
    // Mask data for supplier - remove driver personal information
    const maskedAssessment = securityService.maskEvidenceForSharing(assessment, 'supplier');

    const payload: SupplierWebPayload = {
      shipmentId,
      deliveryStatus: this.mapVerificationStatusToDeliveryStatus(assessment.verificationStatus),
      trustScore: assessment.trustScore,
      evidenceConsistency: assessment.evidenceConsistency,
      verificationResult: assessment.verificationStatus,
      hasExceptions: assessment.anomalies.length > 0,
      requiresReview: assessment.verificationStatus === 'NEEDS_REVIEW' || assessment.verificationStatus === 'EXCEPTION',
      auditReference: assessment.verificationId,
      verificationTimestamp: assessment.timestamp.toISOString(),
      offlineEvidence: assessment.offlineEvidence
    };

    try {
      // Log the integration attempt
      securityService.logAuditEvent('supplier_web_sync', 'verification', true, {
        shipmentId,
        verificationId: assessment.verificationId,
        trustScore: assessment.trustScore
      });

      // In production, this would be an actual API call
      // const response = await fetch(`${this.baseUrl}/api/delivery-verification`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${this.apiKey}`
      //   },
      //   body: JSON.stringify(payload)
      // });

      // For now, simulate successful response
      console.log('Supplier Web Integration:', payload);

      return {
        success: true,
        messageId: `MSG-${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'received'
      };
    } catch (error) {
      console.error('Supplier Web integration failed:', error);
      
      securityService.logAuditEvent('supplier_web_sync', 'verification', false, {
        shipmentId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      return {
        success: false,
        messageId: '',
        timestamp: new Date().toISOString(),
        status: 'failed'
      };
    }
  }

  /**
   * Send batch verification results (for multiple deliveries)
   */
  async sendBatchVerificationResults(
    assessments: Array<{ assessment: DeliveryTrustAssessment; shipmentId: string }>
  ): Promise<SupplierWebResponse[]> {
    const responses: SupplierWebResponse[] = [];

    for (const { assessment, shipmentId } of assessments) {
      const response = await this.sendVerificationResult(assessment, shipmentId);
      responses.push(response);
    }

    return responses;
  }

  /**
   * Send aggregate intelligence (for supplier dashboard)
   */
  async sendAggregateIntelligence(stats: {
    totalDeliveries: number;
    verifiedDeliveries: number;
    needsReviewDeliveries: number;
    exceptionDeliveries: number;
    averageTrustScore: number;
    totalAnomalies: number;
    dateRange: string;
  }): Promise<{ success: boolean; timestamp: string }> {
    try {
      console.log('Supplier Web Aggregate Intelligence:', stats);

      securityService.logAuditEvent('supplier_web_aggregate', 'intelligence', true, {
        dateRange: stats.dateRange,
        totalDeliveries: stats.totalDeliveries
      });

      return {
        success: true,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Supplier Web aggregate intelligence failed:', error);
      
      return {
        success: false,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Map verification status to delivery status
   */
  private mapVerificationStatusToDeliveryStatus(status: string): string {
    switch (status) {
      case 'VERIFIED':
        return 'DELIVERED_VERIFIED';
      case 'NEEDS_REVIEW':
        return 'DELIVERED_PENDING_REVIEW';
      case 'EXCEPTION':
        return 'DELIVERED_EXCEPTION';
      case 'FAILED':
        return 'DELIVERY_FAILED';
      default:
        return 'UNKNOWN';
    }
  }

  /**
   * Request supplier-specific evidence adapter configuration
   */
  async getEvidenceAdapterConfiguration(supplierId: string): Promise<{
    enabledAdapters: string[];
    requiredEvidenceTypes: string[];
    customValidationRules: any[];
  }> {
    // In production, this would fetch supplier-specific configuration
    return {
      enabledAdapters: ['GPS', 'POD', 'PACKAGE_SCAN', 'MISSION'],
      requiredEvidenceTypes: ['POD', 'MISSION'],
      customValidationRules: []
    };
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const supplierWebIntegrationService = new SupplierWebIntegrationService();
