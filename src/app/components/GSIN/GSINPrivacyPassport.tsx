import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Clock, 
  Globe, 
  Users, 
  Database, 
  Key, 
  CheckCircle, 
  AlertTriangle, 
  BarChart3, 
  Activity, 
  Fingerprint, 
  Settings, 
  Award 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { PrivacyPassport } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 14
 * Privacy Passport™ - Every shipment automatically carries a Privacy Passport
 */
export const GSINPrivacyPassport: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [privacyPassports, setPrivacyPassports] = useState<PrivacyPassport[]>([]);
  const [selectedPassport, setSelectedPassport] = useState<PrivacyPassport | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getPrivacyPassports();
        setPrivacyPassports(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (privacyPassports.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Loading Privacy Passports...</div>
        </div>
      </div>
    );
  }

  const filteredPassports = privacyPassports.filter(passport => {
    return passport.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           passport.passportId.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#00F5C4]" />
              Privacy Passport™
            </h1>
            <p className="text-slate-400 mt-1">Every shipment automatically carries a Privacy Passport</p>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-300">Privacy-Protected Data</span>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by shipment ID or passport ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400"
          />
        </div>
      </motion.div>

      {/* Passport Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        {filteredPassports.map((passport, idx) => (
          <motion.div
            key={passport.passportId}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPassport(passport)}
            className={`bg-slate-800/50 backdrop-blur-xl border-2 rounded-xl p-4 cursor-pointer transition-all ${
              selectedPassport?.passportId === passport.passportId 
                ? 'border-[#00F5C4] shadow-lg shadow-[#00F5C4]/20' 
                : 'border-slate-700/30 hover:border-slate-600'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-sm font-medium text-white">{passport.shipmentId}</div>
                  <div className="text-xs text-slate-400">{passport.passportId}</div>
                </div>
              </div>
              <Lock className="w-4 h-4 text-green-400" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Access Level</span>
                <span className="text-white">{passport.dataAccessControl.accessLevel}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Encryption</span>
                <span className="text-white">{passport.encryptionDetails.encryptionMethod}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Audit Entries</span>
                <span className="text-white">{passport.auditTrail.length}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Selected Passport Detail */}
      {selectedPassport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-sm text-slate-400">Shipment ID: {selectedPassport.shipmentId}</div>
                <h3 className="text-2xl font-bold text-white">{selectedPassport.passportId}</h3>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Last Updated</div>
              <div className="text-lg font-bold text-white">{new Date(selectedPassport.lastUpdated).toLocaleString()}</div>
            </div>
          </div>

          {/* Data Access Control */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
            <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              Data Access Control
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Access Level</div>
                <div className="text-sm font-bold text-white">{selectedPassport.dataAccessControl.accessLevel}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Authentication Required</div>
                <div className="text-sm font-bold text-white">{selectedPassport.dataAccessControl.authenticationRequired ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Multi-Factor Required</div>
                <div className="text-sm font-bold text-white">{selectedPassport.dataAccessControl.multiFactorRequired ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>

          {/* Data Visibility */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
            <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-400" />
              Data Visibility
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Default Visibility</div>
                <div className="text-sm font-bold text-white">{selectedPassport.dataVisibility.defaultVisibility}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Field-Level Visibility Rules</div>
                <div className="text-sm font-bold text-white">{selectedPassport.dataVisibility.fieldLevelVisibility.length}</div>
              </div>
            </div>
          </div>

          {/* Export Permissions */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
            <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-400" />
              Export Permissions
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Export Allowed</div>
                <div className="text-sm font-bold text-white">{selectedPassport.exportPermissions.exportAllowed ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Approval Required</div>
                <div className="text-sm font-bold text-white">{selectedPassport.exportPermissions.approvalRequired ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Audit Export</div>
                <div className="text-sm font-bold text-white">{selectedPassport.exportPermissions.auditExport ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>

          {/* Retention Policy */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
            <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              Retention Policy
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Retention Period</div>
                <div className="text-sm font-bold text-white">{selectedPassport.retentionPolicy.retentionPeriod}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Auto Delete</div>
                <div className="text-sm font-bold text-white">{selectedPassport.retentionPolicy.autoDelete ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Legal Hold</div>
                <div className="text-sm font-bold text-white">{selectedPassport.retentionPolicy.legalHold ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>

          {/* Regional Compliance */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
            <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
              Regional Compliance
            </h4>
            <div className="space-y-2">
              {selectedPassport.regionalCompliance.map((compliance, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-white">{compliance.region}</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    compliance.compliant ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {compliance.compliant ? 'Compliant' : 'Non-Compliant'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Encryption Details */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              <Key className="w-5 h-5 text-yellow-400" />
              Encryption Details
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Encryption Method</div>
                <div className="text-sm font-bold text-white">{selectedPassport.encryptionDetails.encryptionMethod}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Key Management</div>
                <div className="text-sm font-bold text-white">{selectedPassport.encryptionDetails.keyManagement}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Key Rotation</div>
                <div className="text-sm font-bold text-white">{selectedPassport.encryptionDetails.keyRotation}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Encryption Strength</div>
                <div className="text-sm font-bold text-white">{selectedPassport.encryptionDetails.encryptionStrength}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
