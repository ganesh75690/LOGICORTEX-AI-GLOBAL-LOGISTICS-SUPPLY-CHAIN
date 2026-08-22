import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Target, 
  Zap, 
  Shield, 
  FileText, 
  Clock, 
  Activity, 
  Search, 
  Filter, 
  Eye, 
  Play, 
  Pause, 
  X,
  ChevronRight,
  Brain,
  Wrench,
  AlertOctagon,
  Settings,
  Lock,
  Unlock,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface ComplianceIssue {
  id: string;
  shipmentId: string;
  type: 'missing_document' | 'expired_certificate' | 'invalid_data' | 'regulation_violation' | 'data_inconsistency';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'detected' | 'analyzing' | 'healing' | 'resolved' | 'manual_required';
  description: string;
  rootCause: string;
  detectedAt: string;
  healingProgress: number;
  autoFixAvailable: boolean;
  estimatedRecoveryTime: string;
  businessImpact: string;
  solution: string;
  confidence: number;
}

const SelfHealingCompliance = () => {
  const [selectedIssue, setSelectedIssue] = useState<ComplianceIssue | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const complianceIssues: ComplianceIssue[] = [
    {
      id: 'ISSUE-001',
      shipmentId: 'SHP-002',
      type: 'expired_certificate',
      severity: 'critical',
      status: 'detected',
      description: 'CE Certificate expired on 2024-07-15',
      rootCause: 'Certificate renewal not initiated before expiry date',
      detectedAt: '2024-08-10 09:30',
      healingProgress: 0,
      autoFixAvailable: false,
      estimatedRecoveryTime: '10-14 days',
      businessImpact: 'High probability of customs rejection, estimated 5-7 day delay',
      solution: 'Manual intervention required: Contact notified body for certificate renewal',
      confidence: 98
    },
    {
      id: 'ISSUE-002',
      shipmentId: 'SHP-003',
      type: 'missing_document',
      severity: 'high',
      status: 'analyzing',
      description: 'Origin Certificate not uploaded for UK customs',
      rootCause: 'Document not included in initial shipment documentation',
      detectedAt: '2024-08-10 08:45',
      healingProgress: 45,
      autoFixAvailable: true,
      estimatedRecoveryTime: '2-3 days',
      businessImpact: 'UK customs requires Origin Certificate, potential 72-hour delay',
      solution: 'Auto-healing: Generate document request and notify supplier',
      confidence: 92
    },
    {
      id: 'ISSUE-003',
      shipmentId: 'SHP-004',
      type: 'invalid_data',
      severity: 'medium',
      status: 'healing',
      description: 'FDA declaration format does not meet new September 2024 requirements',
      rootCause: 'Documentation template not updated with new requirements',
      detectedAt: '2024-08-09 16:20',
      healingProgress: 75,
      autoFixAvailable: true,
      estimatedRecoveryTime: '4-6 hours',
      businessImpact: 'May require additional inspection or documentation update',
      solution: 'Auto-healing: Update FDA declaration template with new required fields',
      confidence: 88
    },
    {
      id: 'ISSUE-004',
      shipmentId: 'SHP-001',
      type: 'data_inconsistency',
      severity: 'low',
      status: 'resolved',
      description: 'Minor data inconsistency between invoice and packing list quantities',
      rootCause: 'Data entry error during document creation',
      detectedAt: '2024-08-09 14:15',
      healingProgress: 100,
      autoFixAvailable: true,
      estimatedRecoveryTime: 'Resolved',
      businessImpact: 'Minimal - corrected automatically',
      solution: 'Auto-healing: Synchronized quantities across documents',
      confidence: 95
    },
    {
      id: 'ISSUE-005',
      shipmentId: 'SHP-005',
      type: 'regulation_violation',
      severity: 'high',
      status: 'manual_required',
      description: 'Product may be subject to new Australian import restrictions',
      rootCause: 'Regulation change not incorporated into compliance check',
      detectedAt: '2024-08-09 11:30',
      healingProgress: 0,
      autoFixAvailable: false,
      estimatedRecoveryTime: '5-7 days',
      businessImpact: 'Potential shipment rejection or border detention',
      solution: 'Manual intervention required: Verify product against new restrictions',
      confidence: 78
    }
  ];

  const issueTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'missing_document', label: 'Missing Document' },
    { id: 'expired_certificate', label: 'Expired Certificate' },
    { id: 'invalid_data', label: 'Invalid Data' },
    { id: 'regulation_violation', label: 'Regulation Violation' },
    { id: 'data_inconsistency', label: 'Data Inconsistency' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'detected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'analyzing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'healing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'manual_required': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'missing_document': return <FileText className="w-4 h-4" />;
      case 'expired_certificate': return <AlertOctagon className="w-4 h-4" />;
      case 'invalid_data': return <AlertTriangle className="w-4 h-4" />;
      case 'regulation_violation': return <Shield className="w-4 h-4" />;
      case 'data_inconsistency': return <Activity className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredIssues = complianceIssues.filter(issue => {
    const matchesSearch = 
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || issue.severity === filterSeverity;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const activeIssues = complianceIssues.filter(i => i.status !== 'resolved').length;
  const resolvedIssues = complianceIssues.filter(i => i.status === 'resolved').length;
  const autoFixAvailable = complianceIssues.filter(i => i.autoFixAvailable).length;
  const avgConfidence = Math.round(complianceIssues.reduce((acc, i) => acc + i.confidence, 0) / complianceIssues.length);

  const triggerAutoHeal = (issue: ComplianceIssue) => {
    setSelectedIssue(issue);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-teal-400" />
            Self-Healing Compliance™
          </h2>
          <p className="text-slate-400">Automatic identification, root cause analysis, and recovery for compliance issues</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-400">AI Auto-Healing Active</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
            <Play className="w-4 h-4" />
            Run Diagnosis
          </button>
        </div>
      </div>

      {/* Self-Healing Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-xs text-slate-400">Active Issues</span>
          </div>
          <div className="text-2xl font-bold text-white">{activeIssues}</div>
          <div className="text-sm text-slate-400">Detected</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-xs text-slate-400">Resolved</span>
          </div>
          <div className="text-2xl font-bold text-white">{resolvedIssues}</div>
          <div className="text-sm text-slate-400">Auto-Healed</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-slate-400">Auto-Fix Available</span>
          </div>
          <div className="text-2xl font-bold text-white">{autoFixAvailable}</div>
          <div className="text-sm text-slate-400">Issues</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-slate-400">AI Confidence</span>
          </div>
          <div className="text-2xl font-bold text-white">{avgConfidence}%</div>
          <div className="text-sm text-slate-400">Average</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search compliance issues..."
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
            <option value="detected">Detected</option>
            <option value="analyzing">Analyzing</option>
            <option value="healing">Healing</option>
            <option value="resolved">Resolved</option>
            <option value="manual_required">Manual Required</option>
          </select>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Compliance Issues */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-teal-400" />
          Compliance Issues & Auto-Healing
        </h3>
        <div className="space-y-3">
          {filteredIssues.map((issue, idx) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedIssue(issue)}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-teal-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(issue.status)}`}>
                      {issue.status.replace('_', ' ')}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(issue.severity)}`}>
                      {issue.severity}
                    </span>
                    <span className="text-xs text-slate-400">{issue.type.replace('_', ' ')}</span>
                    <span className="text-xs text-slate-400">{issue.shipmentId}</span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{issue.description}</h4>
                  <p className="text-sm text-slate-400 mb-2">{issue.rootCause}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Detected: {issue.detectedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {issue.confidence}% confidence
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {issue.autoFixAvailable && issue.status !== 'resolved' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerAutoHeal(issue);
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      <Zap className="w-4 h-4" />
                      Auto-Fix
                    </button>
                  )}
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Healing Progress */}
              {issue.status === 'healing' && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Auto-Healing Progress</span>
                    <span className="text-xs text-white font-medium">{issue.healingProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all"
                      style={{ width: `${issue.healingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Business Impact */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Target className="w-3 h-3" />
                <span>Impact: {issue.businessImpact}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Issue Details Modal */}
      <AnimatePresence>
        {selectedIssue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIssue(null)}
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
                  <RefreshCw className="w-6 h-6 text-teal-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Compliance Issue Details</h3>
                    <p className="text-sm text-slate-400">{selectedIssue.shipmentId}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Status</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded border ${getStatusColor(selectedIssue.status)}`}>
                    {selectedIssue.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Severity</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${getSeverityColor(selectedIssue.severity)}`}>
                    {selectedIssue.severity}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">AI Confidence</div>
                  <div className="text-lg font-bold text-purple-400">{selectedIssue.confidence}%</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Auto-Fix Available</div>
                  <div className={`text-sm font-bold ${selectedIssue.autoFixAvailable ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedIssue.autoFixAvailable ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">Issue Description</div>
                <p className="text-sm text-white">{selectedIssue.description}</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">Root Cause Analysis</div>
                <p className="text-sm text-white">{selectedIssue.rootCause}</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">Business Impact</div>
                <p className="text-sm text-white">{selectedIssue.businessImpact}</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">AI Solution</div>
                <p className="text-sm text-white">{selectedIssue.solution}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Estimated Recovery</div>
                  <div className="text-sm text-white">{selectedIssue.estimatedRecoveryTime}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Detected At</div>
                  <div className="text-sm text-white">{selectedIssue.detectedAt}</div>
                </div>
              </div>

              {selectedIssue.status === 'healing' && (
                <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                  <div className="text-xs text-slate-400 mb-2">Healing Progress</div>
                  <div className="w-full bg-slate-600 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full transition-all"
                      style={{ width: `${selectedIssue.healingProgress}%` }}
                    />
                  </div>
                  <div className="text-center text-sm text-white mt-2">{selectedIssue.healingProgress}%</div>
                </div>
              )}

              <div className="flex gap-3">
                {selectedIssue.autoFixAvailable && selectedIssue.status !== 'resolved' ? (
                  <button className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    Execute Auto-Fix
                  </button>
                ) : (
                  <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    <Wrench className="w-4 h-4" />
                    Manual Intervention Required
                  </button>
                )}
                <button className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelfHealingCompliance;