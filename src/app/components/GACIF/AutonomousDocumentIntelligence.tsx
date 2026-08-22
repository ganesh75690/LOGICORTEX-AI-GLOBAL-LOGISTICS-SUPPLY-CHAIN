import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  FileCheck, 
  FileQuestion, 
  Award, 
  Shield, 
  Sparkles, 
  Target, 
  Zap, 
  AlertOctagon,
  Scan,
  File,
  ChevronRight,
  X,
  BarChart3,
  PieChart
} from 'lucide-react';

interface Document {
  id: string;
  shipmentId: string;
  name: string;
  type: 'commercial_invoice' | 'packing_list' | 'bill_of_lading' | 'certificate' | 'origin_certificate' | 'shipping_label' | 'dangerous_goods' | 'insurance' | 'customs_declaration';
  status: 'valid' | 'expired' | 'missing' | 'invalid' | 'duplicate' | 'inconsistent';
  expiryDate: string;
  uploadDate: string;
  fileSize: string;
  aiConfidence: number;
  aiAnalysis: string;
  issues: DocumentIssue[];
  confidenceScore: number;
  verified: boolean;
}

interface DocumentIssue {
  type: 'missing_field' | 'invalid_format' | 'expired' | 'duplicate' | 'inconsistent' | 'signature_missing';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  field: string;
  recommendedAction: string;
}

const AutonomousDocumentIntelligence = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const documents: Document[] = [
    {
      id: 'DOC-001',
      shipmentId: 'SHP-001',
      name: 'Commercial Invoice - SHP-001',
      type: 'commercial_invoice',
      status: 'valid',
      expiryDate: '2024-12-31',
      uploadDate: '2024-08-10',
      fileSize: '245 KB',
      aiConfidence: 98,
      aiAnalysis: 'Document is complete and valid. All required fields are present with correct formatting. HS Code classification is accurate.',
      issues: [],
      confidenceScore: 98,
      verified: true
    },
    {
      id: 'DOC-002',
      shipmentId: 'SHP-001',
      name: 'Packing List - SHP-001',
      type: 'packing_list',
      status: 'valid',
      expiryDate: '2024-12-31',
      uploadDate: '2024-08-10',
      fileSize: '180 KB',
      aiConfidence: 95,
      aiAnalysis: 'Packing list matches invoice exactly. Item descriptions are consistent with product specifications.',
      issues: [],
      confidenceScore: 95,
      verified: true
    },
    {
      id: 'DOC-003',
      shipmentId: 'SHP-002',
      name: 'CE Certificate - SHP-002',
      type: 'certificate',
      status: 'expired',
      expiryDate: '2024-07-15',
      uploadDate: '2024-07-01',
      fileSize: '520 KB',
      aiConfidence: 100,
      aiAnalysis: 'Certificate expired on 2024-07-15. This will cause customs rejection. Immediate renewal required.',
      issues: [
        {
          type: 'expired',
          severity: 'critical',
          description: 'Certificate has expired',
          field: 'expiry_date',
          recommendedAction: 'Renew CE Certificate from notified body'
        }
      ],
      confidenceScore: 45,
      verified: false
    },
    {
      id: 'DOC-004',
      shipmentId: 'SHP-003',
      name: 'Origin Certificate - SHP-003',
      type: 'origin_certificate',
      status: 'missing',
      expiryDate: '',
      uploadDate: '',
      fileSize: '0 KB',
      aiConfidence: 0,
      aiAnalysis: 'Origin Certificate is required for UK customs. Document not found in shipment.',
      issues: [
        {
          type: 'missing_field',
          severity: 'critical',
          description: 'Origin Certificate not uploaded',
          field: 'document',
          recommendedAction: 'Upload Origin Certificate from issuing authority'
        }
      ],
      confidenceScore: 0,
      verified: false
    },
    {
      id: 'DOC-005',
      shipmentId: 'SHP-001',
      name: 'Bill of Lading - SHP-001',
      type: 'bill_of_lading',
      status: 'valid',
      expiryDate: '2024-12-31',
      uploadDate: '2024-08-10',
      fileSize: '320 KB',
      aiConfidence: 97,
      aiAnalysis: 'Bill of Lading is properly endorsed by carrier. Consignment details match other documents.',
      issues: [],
      confidenceScore: 97,
      verified: true
    },
    {
      id: 'DOC-006',
      shipmentId: 'SHP-004',
      name: 'FDA Declaration - SHP-004',
      type: 'customs_declaration',
      status: 'invalid',
      expiryDate: '2024-12-31',
      uploadDate: '2024-08-08',
      fileSize: '410 KB',
      aiConfidence: 78,
      aiAnalysis: 'FDA declaration does not meet new September 2024 requirements. Updated documentation needed.',
      issues: [
        {
          type: 'invalid_format',
          severity: 'high',
          description: 'Declaration format does not match new FDA requirements',
          field: 'declaration_format',
          recommendedAction: 'Update FDA declaration to include new required fields'
        }
      ],
      confidenceScore: 78,
      verified: false
    }
  ];

  const documentTypes = [
    { id: 'all', label: 'All Document Types' },
    { id: 'commercial_invoice', label: 'Commercial Invoice' },
    { id: 'packing_list', label: 'Packing List' },
    { id: 'bill_of_lading', label: 'Bill of Lading' },
    { id: 'certificate', label: 'Certificate' },
    { id: 'origin_certificate', label: 'Origin Certificate' },
    { id: 'shipping_label', label: 'Shipping Label' },
    { id: 'dangerous_goods', label: 'Dangerous Goods' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'customs_declaration', label: 'Customs Declaration' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'expired': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'missing': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'invalid': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'duplicate': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'inconsistent': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'commercial_invoice': return <FileText className="w-4 h-4" />;
      case 'packing_list': return <FileCheck className="w-4 h-4" />;
      case 'bill_of_lading': return <File className="w-4 h-4" />;
      case 'certificate': return <Award className="w-4 h-4" />;
      case 'origin_certificate': return <Shield className="w-4 h-4" />;
      case 'shipping_label': return <Scan className="w-4 h-4" />;
      case 'dangerous_goods': return <AlertOctagon className="w-4 h-4" />;
      case 'insurance': return <Target className="w-4 h-4" />;
      case 'customs_declaration': return <Gavel className="w-4 h-4" />;
      default: return <FileQuestion className="w-4 h-4" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.shipmentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const validDocuments = documents.filter(d => d.status === 'valid').length;
  const invalidDocuments = documents.filter(d => d.status !== 'valid').length;
  const overallHealth = Math.round((validDocuments / documents.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-orange-400" />
            Autonomous Document Intelligence™
          </h2>
          <p className="text-slate-400">AI-powered automatic document inspection and validation</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Document Health Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <FileCheck className="w-5 h-5 text-green-400" />
            <span className="text-xs text-slate-400">Valid</span>
          </div>
          <div className="text-2xl font-bold text-white">{validDocuments}</div>
          <div className="text-sm text-slate-400">Documents</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="text-xs text-slate-400">Issues</span>
          </div>
          <div className="text-2xl font-bold text-white">{invalidDocuments}</div>
          <div className="text-sm text-slate-400">Documents</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-slate-400">AI Accuracy</span>
          </div>
          <div className="text-2xl font-bold text-white">96%</div>
          <div className="text-sm text-slate-400">Average</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-slate-400">Health Score</span>
          </div>
          <div className="text-2xl font-bold text-white">{overallHealth}%</div>
          <div className="text-sm text-slate-400">Overall</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents by name or shipment ID..."
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
            <option value="valid">Valid</option>
            <option value="expired">Expired</option>
            <option value="missing">Missing</option>
            <option value="invalid">Invalid</option>
            <option value="duplicate">Duplicate</option>
            <option value="inconsistent">Inconsistent</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            {documentTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Scan className="w-5 h-5 text-orange-400" />
          Document Inspection Results
        </h3>
        <div className="space-y-3">
          {filteredDocuments.map((document, idx) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedDocument(document)}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-orange-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(document.status)}`}>
                      {document.status}
                    </span>
                    <span className="text-xs text-slate-400">{document.type.replace('_', ' ')}</span>
                    <span className="text-xs text-slate-400">{document.shipmentId}</span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{document.name}</h4>
                  <p className="text-sm text-slate-400 mb-2">{document.aiAnalysis}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Uploaded: {document.uploadDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {document.fileSize}
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {document.aiConfidence}% AI confidence
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      document.confidenceScore >= 90 ? 'text-green-400' :
                      document.confidenceScore >= 70 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {document.confidenceScore}%
                    </div>
                    <div className="text-xs text-slate-400">Confidence</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Document Details Modal */}
      <AnimatePresence>
        {selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDocument(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-orange-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedDocument.name}</h3>
                    <p className="text-sm text-slate-400">{selectedDocument.shipmentId}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Status</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded border ${getStatusColor(selectedDocument.status)}`}>
                    {selectedDocument.status}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Document Type</div>
                  <div className="text-sm text-white">{selectedDocument.type.replace('_', ' ')}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">AI Confidence</div>
                  <div className="text-lg font-bold text-purple-400">{selectedDocument.aiConfidence}%</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Verified</div>
                  <div className={`text-sm font-bold ${selectedDocument.verified ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedDocument.verified ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">AI Analysis</div>
                <p className="text-sm text-white">{selectedDocument.aiAnalysis}</p>
              </div>

              {selectedDocument.issues.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                  <div className="text-xs text-slate-400 mb-2">Detected Issues</div>
                  <div className="space-y-2">
                    {selectedDocument.issues.map((issue, idx) => (
                      <div key={idx} className={`p-3 rounded-lg border ${
                        issue.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                        issue.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                        issue.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                        'bg-slate-600/10 border-slate-500/30'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className={`w-4 h-4 ${
                            issue.severity === 'critical' ? 'text-red-400' :
                            issue.severity === 'high' ? 'text-orange-400' :
                            issue.severity === 'medium' ? 'text-yellow-400' :
                            'text-slate-400'
                          }`} />
                          <span className="text-sm font-medium text-white">{issue.type.replace('_', ' ')}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            issue.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                            issue.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                            issue.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-1">{issue.description}</p>
                        <p className="text-xs text-slate-400">Field: {issue.field}</p>
                        <p className="text-xs text-green-400 mt-1">Solution: {issue.recommendedAction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Upload Date</div>
                  <div className="text-sm text-white">{selectedDocument.uploadDate}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">File Size</div>
                  <div className="text-sm text-white">{selectedDocument.fileSize}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Auto-Correct
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Document
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutonomousDocumentIntelligence;