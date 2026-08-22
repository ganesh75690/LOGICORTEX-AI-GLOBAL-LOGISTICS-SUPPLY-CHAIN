import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Thermometer, 
  Droplets, 
  Sun, 
  Lock, 
  FileText, 
  Activity, 
  BarChart3, 
  Search, 
  Filter, 
  Calendar, 
  Truck, 
  Building2, 
  User, 
  Award, 
  Fingerprint 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { DigitalDeliveryPassport } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 6
 * Digital Delivery Passport™ - Every shipment automatically receives a Digital Delivery Passport
 */
export const GSINDigitalDeliveryPassport: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [passports, setPassports] = useState<DigitalDeliveryPassport[]>([]);
  const [selectedPassport, setSelectedPassport] = useState<DigitalDeliveryPassport | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getDigitalDeliveryPassports();
        setPassports(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (passports.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Loading Digital Delivery Passports...</div>
        </div>
      </div>
    );
  }

  const filteredPassports = passports.filter(passport => {
    const matchesSearch = passport.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         passport.passportId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         passport.securityLevel.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
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
              Digital Delivery Passport™
            </h1>
            <p className="text-slate-400 mt-1">Every shipment automatically receives a Digital Delivery Passport</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
              <Package className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Total Passports: {passports.length}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 mb-6"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by shipment ID or passport ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-800/50 border border-slate-700/30 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">All Security Levels</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
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
                <Shield className="w-5 h-5 text-[#00F5C4]" />
                <div>
                  <div className="text-sm font-medium text-white">{passport.shipmentId}</div>
                  <div className="text-xs text-slate-400">{passport.passportId}</div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                passport.securityLevel === 'Critical' ? 'bg-red-500/20 text-red-400' :
                passport.securityLevel === 'High' ? 'bg-orange-500/20 text-orange-400' :
                passport.securityLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {passport.securityLevel}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Package Condition</span>
                <span className="text-white">{passport.packageCondition.currentCondition}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Fragility</span>
                <span className="text-white">{passport.packageCondition.fragility}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Priority</span>
                <span className="text-white">{passport.deliveryPriority.level}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">AI Confidence</span>
                <span className="text-[#00F5C4]">{passport.aiConfidenceScore}%</span>
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
              <Shield className="w-8 h-8 text-[#00F5C4]" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-400">Shipment ID: {selectedPassport.shipmentId}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedPassport.securityLevel === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    selectedPassport.securityLevel === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    selectedPassport.securityLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {selectedPassport.securityLevel}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">{selectedPassport.passportId}</h3>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#00F5C4]">{selectedPassport.aiConfidenceScore}%</div>
              <div className="text-xs text-slate-400">AI Confidence</div>
            </div>
          </div>

          {/* Package Identity */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
            <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-blue-400" />
              Package Identity
            </h4>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Package ID</div>
                <div className="text-sm font-bold text-white">{selectedPassport.packageIdentity.packageId}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Barcode</div>
                <div className="text-sm font-bold text-white">{selectedPassport.packageIdentity.barcode}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Weight</div>
                <div className="text-sm font-bold text-white">{selectedPassport.packageIdentity.weight}kg</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Material</div>
                <div className="text-sm font-bold text-white">{selectedPassport.packageIdentity.material}</div>
              </div>
            </div>
          </div>

          {/* Handling Rules */}
          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg p-4 border border-orange-500/30 mb-4">
            <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Handling Rules
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Orientation</div>
                <div className="text-sm font-bold text-white">{selectedPassport.handlingRules.orientation}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Stacking Limit</div>
                <div className="text-sm font-bold text-white">{selectedPassport.handlingRules.stackingLimit}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Temperature Range</div>
                <div className="text-sm font-bold text-white">
                  {selectedPassport.handlingRules.temperatureRange.min}°{selectedPassport.handlingRules.temperatureRange.unit} - {selectedPassport.handlingRules.temperatureRange.max}°{selectedPassport.handlingRules.temperatureRange.unit}
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Requirements */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-lg p-4 border border-cyan-500/30 mb-4">
            <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-cyan-400" />
              Environmental Requirements
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Temperature Required</div>
                <div className="text-sm font-bold text-white">{selectedPassport.environmentalRequirements.temperature.required ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Humidity Required</div>
                <div className="text-sm font-bold text-white">{selectedPassport.environmentalRequirements.humidity.required ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Light Sensitive</div>
                <div className="text-sm font-bold text-white">{selectedPassport.environmentalRequirements.light.sensitive ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Air Quality Required</div>
                <div className="text-sm font-bold text-white">{selectedPassport.environmentalRequirements.airQuality.required ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>

          {/* Customer Preferences */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
            <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              Customer Preferences
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Contact on Arrival</div>
                <div className="text-sm font-bold text-white">{selectedPassport.customerPreferences.contactOnArrival ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Signature Required</div>
                <div className="text-sm font-bold text-white">{selectedPassport.customerPreferences.signatureRequired ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Photo Proof</div>
                <div className="text-sm font-bold text-white">{selectedPassport.customerPreferences.photoProof ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-md font-bold text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-400" />
              Required Documents
            </h4>
            <div className="space-y-2">
              {selectedPassport.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-white">{doc.type}</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    doc.status === 'Verified' ? 'bg-green-500/20 text-green-400' :
                    doc.status === 'Uploaded' ? 'bg-blue-500/20 text-blue-400' :
                    doc.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {doc.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
