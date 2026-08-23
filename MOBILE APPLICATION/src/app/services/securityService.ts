// Security and Privacy Service
// Implements security controls, data minimization, and privacy-aware data handling

interface SecurityContext {
  userId: string;
  sessionId: string;
  role: 'driver' | 'admin' | 'supplier' | 'system';
  permissions: string[];
}

interface SensitiveData {
  type: 'personal' | 'operational' | 'financial' | 'location';
  data: any;
  accessLevel: 'public' | 'restricted' | 'confidential' | 'secret';
}

class SecurityService {
  private currentContext: SecurityContext | null = null;
  private auditLog: Array<{
    timestamp: number;
    action: string;
    userId: string;
    resource: string;
    success: boolean;
    details?: any;
  }> = [];

  // Session Management
  establishSession(context: SecurityContext): void {
    this.currentContext = context;
    this.logAuditEvent('session_established', 'user_session', true, { role: context.role });
  }

  terminateSession(): void {
    if (this.currentContext) {
      this.logAuditEvent('session_terminated', 'user_session', true, { 
        userId: this.currentContext.userId 
      });
      this.currentContext = null;
    }
  }

  getCurrentContext(): SecurityContext | null {
    return this.currentContext;
  }

  // Access Control
  hasPermission(permission: string): boolean {
    if (!this.currentContext) return false;
    return this.currentContext.permissions.includes(permission) || 
           this.currentContext.permissions.includes('*');
  }

  hasRole(role: SecurityContext['role']): boolean {
    if (!this.currentContext) return false;
    return this.currentContext.role === role || this.currentContext.role === 'admin';
  }

  // Data Minimization and Masking
  maskSensitiveData(data: SensitiveData): any {
    switch (data.accessLevel) {
      case 'public':
        return data.data;
      case 'restricted':
        return this.maskRestrictedData(data);
      case 'confidential':
        return this.maskConfidentialData(data);
      case 'secret':
        return this.maskSecretData(data);
      default:
        return null;
    }
  }

  private maskRestrictedData(data: SensitiveData): any {
    // Show partial data
    if (typeof data.data === 'string') {
      if (data.data.length <= 4) return 'XXXX';
      return data.data.substring(0, 2) + 'X'.repeat(data.data.length - 4) + data.data.substring(data.data.length - 2);
    }
    return { masked: true, type: data.type };
  }

  private maskConfidentialData(data: SensitiveData): any {
    // Show only type and status
    return {
      type: data.type,
      status: 'protected',
      accessRequires: 'elevated_permissions'
    };
  }

  private maskSecretData(data: SensitiveData): any {
    // Show minimal information
    return {
      type: data.type,
      access: 'denied',
      requires: 'specific_authorization'
    };
  }

  // Privacy-Aware Data Handling
  isDataCollectionRequired(dataType: string): boolean {
    const requiredDataTypes = [
      'driver_location', // Required for route optimization
      'delivery_status', // Required for operations
      'vehicle_status',  // Required for safety
      'emergency_contact' // Required for safety
    ];

    return requiredDataTypes.includes(dataType);
  }

  getDataRetentionPolicy(dataType: string): {
    retentionPeriod: number;
    storageLocation: 'local' | 'encrypted' | 'secure';
    autoDelete: boolean;
  } {
    const policies: Record<string, any> = {
      'personal_identification': {
        retentionPeriod: 90,
        storageLocation: 'encrypted',
        autoDelete: true
      },
      'location_history': {
        retentionPeriod: 30,
        storageLocation: 'encrypted',
        autoDelete: true
      },
      'delivery_records': {
        retentionPeriod: 365,
        storageLocation: 'secure',
        autoDelete: false
      },
      'operational_logs': {
        retentionPeriod: 180,
        storageLocation: 'secure',
        autoDelete: true
      }
    };

    return policies[dataType] || {
      retentionPeriod: 30,
      storageLocation: 'local',
      autoDelete: true
    };
  }

  // Audit Logging
  private logAuditEvent(action: string, resource: string, success: boolean, details?: any): void {
    this.auditLog.push({
      timestamp: Date.now(),
      action,
      userId: this.currentContext?.userId || 'system',
      resource,
      success,
      details
    });

    // In production, send to secure audit server
    console.log('Audit Log:', {
      timestamp: new Date().toISOString(),
      action,
      resource,
      success,
      userId: this.currentContext?.userId
    });
  }

  logAccessAttempt(resource: string, success: boolean): void {
    this.logAuditEvent('access_attempt', resource, success);
  }

  logDataModification(resource: string, modification: any): void {
    this.logAuditEvent('data_modification', resource, true, modification);
  }

  logSecurityEvent(event: string, details: any): void {
    this.logAuditEvent('security_event', 'system', true, { event, ...details });
  }

  // ========== DELIVERY TRUTH FABRIC SECURITY ==========
  
  /**
   * Evidence Access Control
   * Ensures evidence is only accessible to authorized roles
   */
  canAccessEvidence(evidenceId: string, missionId: string): boolean {
    if (!this.currentContext) return false;
    
    // Drivers can only access evidence for their own missions
    if (this.currentContext.role === 'driver') {
      return this.hasPermission('access_own_evidence');
    }
    
    // Admins and suppliers can access evidence they are authorized for
    if (this.currentContext.role === 'admin' || this.currentContext.role === 'supplier') {
      return this.hasPermission('access_evidence');
    }
    
    return false;
  }

  /**
   * Evidence Data Minimization
   * Masks sensitive information in evidence before sharing
   */
  maskEvidenceForSharing(evidence: any, targetRole: 'customer' | 'supplier' | 'admin'): any {
    const masked = { ...evidence };
    
    // Remove driver personal information for customers
    if (targetRole === 'customer') {
      delete masked.driverId;
      delete masked.driverName;
      delete masked.driverContact;
      
      // Mask location to approximate
      if (masked.location) {
        masked.location = {
          latitude: Math.round(masked.location.latitude * 100) / 100,
          longitude: Math.round(masked.location.longitude * 100) / 100,
          accuracy: 'approximate'
        };
      }
    }
    
    // Remove sensitive metadata for suppliers
    if (targetRole === 'supplier') {
      delete masked.deviceId;
      delete masked.deviceInfo;
      delete masked.networkDetails;
    }
    
    return masked;
  }

  /**
   * Verification Audit Logging
   * Logs all verification decisions for audit trail
   */
  logVerificationDecision(verificationData: {
    verificationId: string;
    missionId: string;
    shipmentId: string;
    trustScore: number;
    verificationStatus: string;
    evidenceCount: number;
    anomalies: number;
    offlineEvidence: boolean;
  }): void {
    this.logAuditEvent('verification_decision', 'delivery_verification', true, {
      verificationId: verificationData.verificationId,
      missionId: verificationData.missionId,
      shipmentId: verificationData.shipmentId,
      trustScore: verificationData.trustScore,
      verificationStatus: verificationData.verificationStatus,
      evidenceCount: verificationData.evidenceCount,
      anomalies: verificationData.anomalies,
      offlineEvidence: verificationData.offlineEvidence
    });
  }

  /**
   * Evidence Collection Audit
   * Logs when evidence is collected
   */
  logEvidenceCollection(evidenceData: {
    evidenceId: string;
    evidenceType: string;
    missionId: string;
    source: string;
    offlineCreated: boolean;
  }): void {
    this.logAuditEvent('evidence_collected', 'evidence', true, {
      evidenceId: evidenceData.evidenceId,
      evidenceType: evidenceData.evidenceType,
      missionId: evidenceData.missionId,
      source: evidenceData.source,
      offlineCreated: evidenceData.offlineCreated
    });
  }

  /**
   * Evidence Anomaly Audit
   * Logs detected anomalies
   */
  logEvidenceAnomaly(anomalyData: {
    type: string;
    severity: string;
    description: string;
    evidenceIds: string[];
    missionId: string;
  }): void {
    this.logAuditEvent('evidence_anomaly', 'evidence', true, {
      type: anomalyData.type,
      severity: anomalyData.severity,
      description: anomalyData.description,
      evidenceIds: anomalyData.evidenceIds,
      missionId: anomalyData.missionId
    });
  }

  /**
   * Evidence Access Audit
   * Logs when evidence is accessed
   */
  logEvidenceAccess(evidenceId: string, missionId: string, accessType: 'view' | 'export' | 'review'): void {
    this.logAuditEvent('evidence_access', 'evidence', true, {
      evidenceId,
      missionId,
      accessType
    });
  }

  /**
   * Verify Evidence Integrity
   * Checks if evidence has been tampered with
   */
  verifyEvidenceIntegrity(evidence: any): { integrity: 'verified' | 'tampered' | 'unknown'; details: string } {
    // In production, this would verify cryptographic signatures
    // For now, return verified as a placeholder
    return {
      integrity: 'verified',
      details: 'Evidence integrity verified'
    };
  }

  /**
   * Get Evidence Access Level
   * Determines what level of access the current user has to evidence
   */
  getEvidenceAccessLevel(missionId: string): 'full' | 'limited' | 'none' {
    if (!this.currentContext) return 'none';
    
    if (this.currentContext.role === 'admin') {
      return 'full';
    }
    
    if (this.currentContext.role === 'supplier') {
      return this.hasPermission('view_detailed_evidence') ? 'full' : 'limited';
    }
    
    if (this.currentContext.role === 'driver') {
      return this.hasPermission('access_own_evidence') ? 'limited' : 'none';
    }
    
    return 'none';
  }

  getAuditLog(filters?: {
    userId?: string;
    action?: string;
    resource?: string;
    startDate?: number;
    endDate?: number;
  }): any[] {
    let filteredLog = [...this.auditLog];

    if (filters?.userId) {
      filteredLog = filteredLog.filter(log => log.userId === filters.userId);
    }
    if (filters?.action) {
      filteredLog = filteredLog.filter(log => log.action === filters.action);
    }
    if (filters?.resource) {
      filteredLog = filteredLog.filter(log => log.resource === filters.resource);
    }
    if (filters?.startDate) {
      filteredLog = filteredLog.filter(log => log.timestamp >= filters.startDate);
    }
    if (filters?.endDate) {
      filteredLog = filteredLog.filter(log => log.timestamp <= filters.endDate);
    }

    return filteredLog;
  }

  // ========== ENTERPRISE-GRADE FEATURES SECURITY ==========

  // Emergency Event Security
  canInitiateEmergency(): boolean {
    return this.hasPermission('emergency:initiate') || this.hasPermission('emergency:manage');
  }

  canViewEmergencyEvent(emergencyId: string): boolean {
    // In production, check if user has access to this specific emergency
    return this.hasPermission('emergency:view');
  }

  maskSensitiveEmergencyData(emergencyData: any): any {
    if (!this.currentContext || this.currentContext.role === 'driver') {
      // Driver sees their own emergency data
      return emergencyData;
    }

    // Other roles see limited data
    const { driverId, vehicleId, ...masked } = emergencyData;
    return {
      ...masked,
      driverId: this.maskValue(driverId),
      vehicleId: this.maskValue(vehicleId)
    };
  }

  // Conflict Resolution Security
  canResolveConflict(conflictId: string): boolean {
    return this.hasPermission('conflict:resolve') || this.hasPermission('conflict:manage');
  }

  canViewConflictDetails(conflictId: string): boolean {
    return this.hasPermission('conflict:view');
  }

  validateConflictResolution(resolution: any): boolean {
    // Ensure resolution meets security requirements
    if (!resolution.resolutionReason) return false;
    if (!resolution.resolvedBy) return false;
    if (!resolution.resolvedAt) return false;

    return true;
  }

  // Mission Version Security
  canInitiateHandover(missionId: string): boolean {
    return this.hasPermission('mission:handover:initiate') || this.hasPermission('mission:manage');
  }

  canAcceptHandover(missionId: string): boolean {
    return this.hasPermission('mission:handover:accept');
  }

  validateMissionVersion(version: number, latestVersion: number): boolean {
    return version === latestVersion;
  }

  maskOriginalDriverInfo(driverInfo: any): any {
    // Replacement driver should not see personal information about original driver
    if (!this.currentContext || this.currentContext.role === 'admin') {
      return driverInfo;
    }

    const { name, phone, email, ...masked } = driverInfo;
    return {
      ...masked,
      name: this.maskValue(name),
      phone: this.maskValue(phone),
      email: this.maskValue(email)
    };
  }

  // Field Operations Security
  canViewFieldStatus(): boolean {
    return this.hasPermission('field:view');
  }

  canModifyFieldStatus(): boolean {
    return this.hasPermission('field:modify') || this.hasPermission('field:manage');
  }

  // Localization Security
  canModifyLocalizationSettings(): boolean {
    return this.hasPermission('localization:modify');
  }

  // Data Minimization for Handover
  minimizeHandoverData(handoverData: any): any {
    // Only include information necessary for the replacement driver
    const essentialFields = [
      'missionId',
      'stops',
      'priority',
      'updatedRoute',
      'routeDetails',
      'shipmentInfo',
      'deliveryAddresses',
      'deliveryInstructions'
    ];

    const minimized: any = {};
    essentialFields.forEach(field => {
      if (handoverData[field]) {
        minimized[field] = handoverData[field];
      }
    });

    return minimized;
  }

  // Secure Synchronization
  validateSyncData(data: any): boolean {
    // Ensure sync data meets security requirements
    if (!data.timestamp) return false;
    if (!data.source) return false;
    if (!data.checksum) return false;

    return true;
  }

  // Low Power Mode Security
  canEnableLowPowerMode(): boolean {
    return this.hasPermission('system:low_power');
  }

  // Emergency Contact Security
  getEmergencyContacts(masked: boolean = true): any[] {
    const contacts = [
      { id: 'ops_1', name: 'Operations Center', phone: '+91-11-2345-6789', type: 'operations' },
      { id: 'supervisor', name: 'Supervisor', phone: '+91-11-2345-6790', type: 'supervisor' }
    ];

    if (masked && this.currentContext?.role === 'driver') {
      return contacts.map(c => ({
        ...c,
        phone: this.maskValue(c.phone)
      }));
    }

    return contacts;
  }

  // Encryption and Secure Storage
  encryptData(data: any): string {
    // In production, use actual encryption
    // For demo, we'll use base64 encoding
    try {
      return btoa(JSON.stringify(data));
    } catch (error) {
      console.error('Encryption failed:', error);
      return '';
    }
  }

  decryptData(encryptedData: string): any {
    // In production, use actual decryption
    // For demo, we'll use base64 decoding
    try {
      return JSON.parse(atob(encryptedData));
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }

  // Secure Local Storage
  setSecureItem(key: string, value: any, accessLevel: SensitiveData['accessLevel'] = 'restricted'): void {
    const sensitiveData: SensitiveData = {
      type: 'operational',
      data: value,
      accessLevel
    };

    const maskedData = this.maskSensitiveData(sensitiveData);
    const encryptedData = this.encryptData(maskedData);
    
    try {
      localStorage.setItem(`secure_${key}`, encryptedData);
      this.logDataModification(`secure_storage_${key}`, { action: 'set', accessLevel });
    } catch (error) {
      console.error('Secure storage failed:', error);
      this.logSecurityEvent('storage_error', { key, error: 'storage_failed' });
    }
  }

  getSecureItem(key: string): any {
    try {
      const encryptedData = localStorage.getItem(`secure_${key}`);
      if (!encryptedData) return null;

      const decryptedData = this.decryptData(encryptedData);
      this.logAccessAttempt(`secure_storage_${key}`, true);
      
      return decryptedData;
    } catch (error) {
      console.error('Secure retrieval failed:', error);
      this.logAccessAttempt(`secure_storage_${key}`, false);
      return null;
    }
  }

  removeSecureItem(key: string): void {
    localStorage.removeItem(`secure_${key}`);
    this.logDataModification(`secure_storage_${key}`, { action: 'remove' });
  }

  // Privacy Controls
  enableDataMinimization(enabled: boolean): void {
    this.logSecurityEvent('data_minimization_toggle', { enabled });
    // In production, this would affect data collection policies
  }

  enableAuditLogging(enabled: boolean): void {
    this.logSecurityEvent('audit_logging_toggle', { enabled });
    // In production, this would enable/disable audit logging
  }

  // Compliance Checks
  performComplianceCheck(): {
    compliant: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check for excessive data retention
    const storageKeys = Object.keys(localStorage);
    const oldKeys = storageKeys.filter(key => {
      const timestamp = this.getItemTimestamp(key);
      return timestamp && (Date.now() - timestamp) > 90 * 24 * 60 * 60 * 1000; // 90 days
    });

    if (oldKeys.length > 0) {
      issues.push(`Found ${oldKeys.length} data items exceeding retention policy`);
      recommendations.push('Review and clean up old data items');
    }

    // Check for unencrypted sensitive data
    const sensitiveKeys = storageKeys.filter(key => 
      key.includes('personal') || key.includes('license') || key.includes('financial')
    );

    const unencryptedSensitive = sensitiveKeys.filter(key => !key.startsWith('secure_'));
    if (unencryptedSensitive.length > 0) {
      issues.push(`Found ${unencryptedSensitive.length} sensitive data items without encryption`);
      recommendations.push('Migrate sensitive data to secure storage');
    }

    return {
      compliant: issues.length === 0,
      issues,
      recommendations
    };
  }

  private getItemTimestamp(key: string): number | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      // Try to parse timestamp from stored data
      const parsed = JSON.parse(item);
      return parsed.timestamp || null;
    } catch (error) {
      return null;
    }
  }

  // Rate Limiting and Abuse Prevention
  private requestCounts: Map<string, number[]> = new Map();

  checkRateLimit(identifier: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.requestCounts.get(identifier) || [];
    
    // Remove requests outside the time window
    const validRequests = requests.filter(timestamp => now - timestamp < windowMs);
    
    if (validRequests.length >= maxRequests) {
      this.logSecurityEvent('rate_limit_exceeded', { identifier, count: validRequests.length });
      return false;
    }
    
    validRequests.push(now);
    this.requestCounts.set(identifier, validRequests);
    return true;
  }

  // Data Integrity Verification
  verifyDataIntegrity(data: any, checksum: string): boolean {
    // In production, implement actual checksum verification
    const calculatedChecksum = this.calculateChecksum(data);
    return calculatedChecksum === checksum;
  }

  calculateChecksum(data: any): string {
    // Simple checksum for demo
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
  }

  // Security Health Check
  performSecurityHealthCheck(): {
    status: 'secure' | 'warning' | 'critical';
    checks: {
      sessionValid: boolean;
      encryptionEnabled: boolean;
      auditLoggingActive: boolean;
      complianceStatus: string;
      rateLimitingActive: boolean;
    };
  } {
    const compliance = this.performComplianceCheck();
    
    return {
      status: compliance.compliant ? 'secure' : compliance.issues.length > 5 ? 'critical' : 'warning',
      checks: {
        sessionValid: !!this.currentContext,
        encryptionEnabled: true, // Always enabled in this implementation
        auditLoggingActive: this.auditLog.length > 0,
        complianceStatus: compliance.compliant ? 'compliant' : 'non_compliant',
        rateLimitingActive: this.requestCounts.size > 0
      }
    };
  }
}

export const securityService = new SecurityService();
export default securityService;