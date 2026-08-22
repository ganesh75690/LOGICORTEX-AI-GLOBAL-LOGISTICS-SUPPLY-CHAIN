import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Shield, 
  FileText, 
  CheckCircle, 
  Clock, 
  Globe, 
  Activity, 
  Target, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  X,
  ChevronRight,
  Zap,
  Lock,
  TreePine,
  MapPin,
  Calendar,
  BarChart3,
  AlertTriangle,
  Package,
  Truck,
  Building2,
  Gavel
} from 'lucide-react';

interface CompliancePassport {
  shipmentId: string;
  trackingNumber: string;
  complianceStatus: 'compliant' | 'at_risk' | 'non_compliant';
  requiredRegulations: number;
  verifiedDocuments: number;
  totalDocuments: number;
  countryRequirements: string[];
  inspectionHistory: Inspection[];
  certificationStatus: string;
  sustainabilityStatus: string;
  complianceConfidence: number;
  aiApprovalTimestamp: string;
  digitalSignature: string;
  riskScore: number;
  aiAnalysis: string;
  issues: PassportIssue[];
}

interface Inspection {
  date: string;
  country: string;
  result: 'passed' | 'failed' | 'pending';
  issues: string[];
  inspector: string;
}

interface PassportIssue {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  status: 'open' | 'resolved';
}

const GlobalCompliancePassport = () => {
  const [selectedPassport, setSelectedPassport] = useState<CompliancePassport | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const compliancePassports: CompliancePassport[] = [
    {
      shipmentId: 'SHP-001',
      trackingNumber: 'GACIF-2024-001',
      complianceStatus: 'compliant',
      requiredRegulations: 8,
      verifiedDocuments: 6,
      totalDocuments: 6,
      countryRequirements: ['USA Customs Regulations', 'FDA Requirements', 'Electronic Import Rules'],
      inspectionHistory: [
        {
          date: '2024-08-15',
          country: 'USA',
          result: 'passed',
          issues: [],
          inspector: 'US Customs - Los Angeles'
        }
      ],
      certificationStatus: 'All certifications valid',
      sustainabilityStatus: 'Compliant with carbon targets',
      complianceConfidence: 94,
      aiApprovalTimestamp: '2024-08-10 09:15:00',
      digitalSignature: 'SHA-256: a1b2c3d4e5f6...',
      riskScore: 15,
      aiAnalysis: 'Shipment meets all compliance requirements. High probability of smooth customs clearance. Documentation is complete and valid.',
      issues: []
    },
    {
      shipmentId: 'SHP-002',
      trackingNumber: 'GACIF-2024-002',
      complianceStatus: 'at_risk',
      requiredRegulations: 10,
      verifiedDocuments: 4,
      totalDocuments: 5,
      countryRequirements: ['EU CE Marking', 'German Customs', 'European Environmental Standards'],
      inspectionHistory: [
        {
          date: '2024-08-16',
          country: 'Germany',
          result: 'pending',
          issues: ['CE Certificate verification pending'],
          inspector: 'German Customs - Hamburg'
        }
      ],
      certificationStatus: 'CE Certificate expired - renewal in progress',
      sustainabilityStatus: 'Compliant with EU environmental standards',
      complianceConfidence: 72,
      aiApprovalTimestamp: '2024-08-10 08:30:00',
      digitalSignature: 'SHA-256: f6e5d4c3b2a1...',
      riskScore: 65,
      aiAnalysis: 'Shipment at risk due to expired CE certificate. Renewal in progress. Estimated 5-7 day delay if not resolved before border crossing.',
      issues: [
        {
          type: 'Expired Certificate',
          severity: 'critical',
          description: 'CE Certificate expired on 2024-07-15',
          status: 'open'
        }
      ]
    },
    {
      shipmentId: 'SHP-003',
      trackingNumber: 'GACIF-2024-003',
      complianceStatus: 'at_risk',
      requiredRegulations: 7,
      verifiedDocuments: 4,
      totalDocuments: 5,
      countryRequirements: ['UK Customs Declaration', 'Post-Brexit Documentation', 'Origin Certificate Required'],
      inspectionHistory: [],
      certificationStatus: 'Pending verification',
      sustainabilityStatus: 'Compliant with UK environmental standards',
      complianceConfidence: 65,
      aiApprovalTimestamp: '2024-08-10 07:45:00',
      digitalSignature: 'SHA-256: 9z8y7x6w5v4...',
      riskScore: 70,
      aiAnalysis: 'Shipment missing Origin Certificate required for UK customs. Document not uploaded. 72-hour delay expected if not resolved.',
      issues: [
        {
          type: 'Missing Document',
          severity: 'high',
          description: 'Origin Certificate not uploaded',
          status: 'open'
        }
      ]
    },
    {
      shipmentId: 'SHP-004',
      trackingNumber: 'GACIF-2024-004',
      complianceStatus: 'compliant',
      requiredRegulations: 9,
      verifiedDocuments: 5,
      totalDocuments: 5,
      countryRequirements: ['US FDA Requirements', 'Medical Device Regulations', 'Electronic Import Rules'],
      inspectionHistory: [],
      certificationStatus: 'FDA declaration updated for September 2024',
      sustainabilityStatus: 'Compliant with US environmental standards',
      complianceConfidence: 88,
      aiApprovalTimestamp: '2024-08-10 06:15:00',
      digitalSignature: 'SHA-256: 1a2b3c4d5e6f...',
      riskScore: 25,
      aiAnalysis: 'Shipment documentation updated to meet new FDA requirements. All certifications valid. Ready for shipment.',
      issues: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'at_risk': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'non_compliant': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-green-400';
    if (score <= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredPassports = compliancePassports.filter(passport => {
    const matchesSearch = 
      passport.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passport.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || passport.complianceStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const compliantPassports = compliancePassports.filter(p => p.complianceStatus === 'compliant').length;
  const atRiskPassports = compliancePassports.filter(p => p.complianceStatus === 'at_risk').length;
  const avgConfidence = Math.round(compliancePassports.reduce((acc, p) => acc + p.complianceConfidence, 0) / compliancePassports.length);
  const totalInspections = compliancePassports.reduce((acc, p) => acc + p.inspectionHistory.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400" />
            Global Compliance Passport™
          </h2>
          <p className="text-slate-400">AI-generated compliance passport for every shipment</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <Lock className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-400">Blockchain Secured</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
            <Download className="w-4 h-4" />
            Export Passports
          </button>
        </div>
      </div>

      {/* Passport Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs text-slate-400">Total Passports</span>
          </div>
          <div className="text-2xl font-bold text-white">{compliancePassports.length}</div>
          <div className="text-sm text-slate-400">Issued</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-xs text-slate-400">Compliant</span>
          </div>
          <div className="text-2xl font-bold text-white">{compliantPassports}</div>
          <div className="text-sm text-slate-400">Shipments</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-slate-400">At Risk</span>
          </div>
          <div className="text-2xl font-bold text-white">{atRiskPassports}</div>
          <div className="text-sm text-slate-400">Shipments</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-slate-400">Avg. Confidence</span>
          </div>
          <div className="text-2xl font-bold text-white">{avgConfidence}%</div>
          <div className="text-sm text-slate-400">AI Score</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search passports by shipment ID or tracking number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Status</option>
            <option value="compliant">Compliant</option>
            <option value="at_risk">At Risk</option>
            <option value="non_compliant">Non Compliant</option>
          </select>
        </div>
      </div>

      {/* Compliance Passports */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-400" />
          Active Compliance Passports
        </h3>
        <div className="space-y-3">
          {filteredPassports.map((passport, idx) => (
            <motion.div
              key={passport.shipmentId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedPassport(passport)}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-amber-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(passport.complianceStatus)}`}>
                      {passport.complianceStatus.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">{passport.shipmentId}</span>
                    <span className="text-xs text-slate-400">{passport.trackingNumber}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-2">
                    <div>
                      <div className="text-xs text-slate-400">Regulations</div>
                      <div className="text-sm font-medium text-white">{passport.requiredRegulations}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Documents</div>
                      <div className="text-sm font-medium text-white">{passport.verifiedDocuments}/{passport.totalDocuments}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Confidence</div>
                      <div className={`text-sm font-bold ${passport.complianceConfidence >= 90 ? 'text-green-400' : passport.complianceConfidence >= 75 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {passport.complianceConfidence}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Risk Score</div>
                      <div className={`text-sm font-bold ${getRiskColor(passport.riskScore)}`}>
                        {passport.riskScore}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {passport.aiApprovalTimestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      {passport.digitalSignature.substring(0, 20)}...
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Passport Details Modal */}
      <AnimatePresence>
        {selectedPassport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPassport(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Compliance Passport</h3>
                    <p className="text-sm text-slate-400">{selectedPassport.trackingNumber}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPassport(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Compliance Status</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded border ${getStatusColor(selectedPassport.complianceStatus)}`}>
                    {selectedPassport.complianceStatus.replace('_', ' ')}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Compliance Confidence</div>
                  <div className={`text-lg font-bold ${selectedPassport.complianceConfidence >= 90 ? 'text-green-400' : selectedPassport.complianceConfidence >= 75 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {selectedPassport.complianceConfidence}%
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Risk Score</div>
                  <div className={`text-lg font-bold ${getRiskColor(selectedPassport.riskScore)}`}>
                    {selectedPassport.riskScore}
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">AI Approval</div>
                  <div className="text-sm text-white">{selectedPassport.aiApprovalTimestamp}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Required Regulations</div>
                  <div className="text-lg font-bold text-white">{selectedPassport.requiredRegulations}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Verified Documents</div>
                  <div className="text-lg font-bold text-white">{selectedPassport.verifiedDocuments}/{selectedPassport.totalDocuments}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Inspections</div>
                  <div className="text-lg font-bold text-white">{selectedPassport.inspectionHistory.length}</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">Country Requirements</div>
                <div className="flex flex-wrap gap-2">
                  {selectedPassport.countryRequirements.map((req, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">AI Analysis</div>
                <p className="text-sm text-white">{selectedPassport.aiAnalysis}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Certification Status</div>
                  <div className="text-sm text-white">{selectedPassport.certificationStatus}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Sustainability Status</div>
                  <div className="text-sm text-white">{selectedPassport.sustainabilityStatus}</div>
                </div>
              </div>

              {selectedPassport.inspectionHistory.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    Inspection History
                  </h4>
                  <div className="space-y-2">
                    {selectedPassport.inspectionHistory.map((inspection, idx) => (
                      <div key={idx} className={`p-3 rounded-lg border ${
                        inspection.result === 'passed' ? 'bg-green-500/10 border-green-500/30' :
                        inspection.result === 'failed' ? 'bg-red-500/10 border-red-500/30' :
                        'bg-yellow-500/10 border-yellow-500/30'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">{inspection.country}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            inspection.result === 'passed' ? 'bg-green-500/20 text-green-400' :
                            inspection.result === 'failed' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {inspection.result}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">{inspection.date} • {inspection.inspector}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedPassport.issues.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    Open Issues
                  </h4>
                  <div className="space-y-2">
                    {selectedPassport.issues.map((issue, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-white">{issue.type}</span>
                          <span className="text-xs text-slate-400">{issue.severity}</span>
                        </div>
                        <p className="text-sm text-slate-300">{issue.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-1">Digital Signature</div>
                <div className="text-sm text-white font-mono">{selectedPassport.digitalSignature}</div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Passport
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Full Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalCompliancePassport;