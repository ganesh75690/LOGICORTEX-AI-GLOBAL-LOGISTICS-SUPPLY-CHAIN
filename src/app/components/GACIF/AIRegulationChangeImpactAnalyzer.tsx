import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  AlertTriangle, 
  Calendar, 
  Target, 
  Globe, 
  Activity, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  X,
  ChevronRight,
  Zap,
  BookOpen,
  MapPin,
  Building2,
  FileText,
  BarChart3,
  Layers,
  ArrowRight,
  CheckCircle,
  AlertOctagon
} from 'lucide-react';

interface RegulationChange {
  id: string;
  title: string;
  type: 'new' | 'updated' | 'expiring';
  severity: 'critical' | 'high' | 'medium' | 'low';
  effectiveDate: string;
  gracePeriod: string;
  countries: string[];
  affectedRegions: string[];
  affectedShipments: number;
  financialImpact: 'critical' | 'high' | 'medium' | 'low';
  operationalImpact: 'critical' | 'high' | 'medium' | 'low';
  requiredActions: string[];
  documentChanges: string[];
  alternativeStrategies: string[];
  aiPrediction: string;
  confidence: number;
  status: 'monitoring' | 'analyzing' | 'mitigating' | 'resolved';
}

const AIRegulationChangeImpactAnalyzer = () => {
  const [selectedChange, setSelectedChange] = useState<RegulationChange | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const regulationChanges: RegulationChange[] = [
    {
      id: 'REG-CHANGE-001',
      title: 'US FDA Documentation Requirements Update',
      type: 'updated',
      severity: 'high',
      effectiveDate: '2024-09-01',
      gracePeriod: '30 days',
      countries: ['USA'],
      affectedRegions: ['North America'],
      affectedShipments: 8,
      financialImpact: 'medium',
      operationalImpact: 'medium',
      requiredActions: [
        'Update FDA declaration templates',
        'Add new required fields for medical devices',
        'Train compliance team on new requirements',
        'Update documentation workflow'
      ],
      documentChanges: [
        'FDA Declaration Form',
        'Product Classification',
        'Manufacturer Information',
        'Safety Data Sheets'
      ],
      alternativeStrategies: [
        'Use third-party compliance service',
        'Implement automated documentation system',
        'Pre-clear with FDA before shipping'
      ],
      aiPrediction: 'AI predicts 40% of current shipments will require documentation updates. Immediate action recommended to avoid delays after September 1.',
      confidence: 91,
      status: 'mitigating'
    },
    {
      id: 'REG-CHANGE-002',
      title: 'EU Environmental Packaging Requirements',
      type: 'new',
      severity: 'medium',
      effectiveDate: '2024-10-15',
      gracePeriod: '60 days',
      countries: ['Germany', 'France', 'Italy', 'Spain', 'Netherlands'],
      affectedRegions: ['European Union'],
      affectedShipments: 12,
      financialImpact: 'medium',
      operationalImpact: 'low',
      requiredActions: [
        'Switch to recyclable packaging materials',
        'Update packaging specifications',
        'Obtain environmental certification',
        'Document packaging materials'
      ],
      documentChanges: [
        'Packaging Declaration',
        'Material Safety Data',
        'Environmental Compliance Certificate',
        'Recycling Information'
      ],
      alternativeStrategies: [
        'Source eco-friendly packaging suppliers',
        'Implement packaging reduction program',
        'Use biodegradable materials'
      ],
      aiPrediction: 'AI predicts packaging changes will be required for 35% of EU shipments. 60-day grace period provides sufficient time for implementation.',
      confidence: 87,
      status: 'analyzing'
    },
    {
      id: 'REG-CHANGE-003',
      title: 'UK Post-Brexit Import Documentation',
      type: 'updated',
      severity: 'critical',
      effectiveDate: '2024-08-20',
      gracePeriod: '14 days',
      countries: ['UK'],
      affectedRegions: ['Europe'],
      affectedShipments: 5,
      financialImpact: 'high',
      operationalImpact: 'high',
      requiredActions: [
        'Obtain UK EORI numbers for all suppliers',
        'Update customs declarations',
        'Implement origin certification process',
        'Train logistics team on UK procedures'
      ],
      documentChanges: [
        'UK Customs Declaration',
        'Origin Certificate',
        'EORI Registration',
        'Supplier Documentation'
      ],
      alternativeStrategies: [
        'Use UK customs brokers',
        'Route through EU ports first',
        'Delay UK shipments until documentation ready'
      ],
      aiPrediction: 'Critical: 14-day grace period insufficient for full implementation. AI recommends immediate action to avoid shipment delays.',
      confidence: 95,
      status: 'mitigating'
    },
    {
      id: 'REG-CHANGE-004',
      title: 'China Import Certification Simplification',
      type: 'updated',
      severity: 'low',
      effectiveDate: '2024-09-30',
      gracePeriod: '45 days',
      countries: ['China'],
      affectedRegions: ['Asia'],
      affectedShipments: 3,
      financialImpact: 'low',
      operationalImpact: 'low',
      requiredActions: [
        'Review new simplified certification process',
        'Update documentation if beneficial',
        'Monitor implementation timeline'
      ],
      documentChanges: [
        'CCC Certification Process',
        'Import License Requirements',
        'Product Testing Documentation'
      ],
      alternativeStrategies: [
        'Wait for implementation details',
        'Maintain current documentation until confirmed'
      ],
      aiPrediction: 'Positive impact expected. Simplification may reduce certification time by 20-30%. Monitor for implementation details.',
      confidence: 82,
      status: 'monitoring'
    },
    {
      id: 'REG-CHANGE-005',
      title: 'Australia Electronic Component Restrictions',
      type: 'new',
      severity: 'high',
      effectiveDate: '2024-11-01',
      gracePeriod: '90 days',
      countries: ['Australia'],
      affectedRegions: ['Oceania'],
      affectedShipments: 4,
      financialImpact: 'high',
      operationalImpact: 'medium',
      requiredActions: [
        'Verify product compliance with new restrictions',
        'Obtain required certifications',
        'Update product specifications',
        'Implement compliance testing'
      ],
      documentChanges: [
        'Product Compliance Certificate',
        'Safety Testing Reports',
        'Technical Specifications',
        'Import Authorization'
      ],
      alternativeStrategies: [
        'Source alternative compliant products',
        'Apply for exemption if applicable',
        'Redirect shipments to other markets'
      ],
      aiPrediction: 'AI predicts 30% of electronic components may be affected. 90-day grace period allows for product verification and certification.',
      confidence: 88,
      status: 'analyzing'
    }
  ];

  const changeTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'new', label: 'New Regulation' },
    { id: 'updated', label: 'Updated Regulation' },
    { id: 'expiring', label: 'Expiring Regulation' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'updated': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'expiring': return 'bg-red-500/20 text-red-400 border-red-500/30';
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const filteredChanges = regulationChanges.filter(change => {
    const matchesSearch = 
      change.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.countries.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || change.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || change.severity === filterSeverity;
    return matchesSearch && matchesType && matchesSeverity;
  });

  const criticalChanges = regulationChanges.filter(c => c.severity === 'critical').length;
  const highChanges = regulationChanges.filter(c => c.severity === 'high').length;
  const totalAffectedShipments = regulationChanges.reduce((acc, c) => acc + c.affectedShipments, 0);
  const avgConfidence = Math.round(regulationChanges.reduce((acc, c) => acc + c.confidence, 0) / regulationChanges.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Flame className="w-6 h-6 text-rose-400" />
            AI Regulation Change Impact Analyzer™
          </h2>
          <p className="text-slate-400">Predict impact of regulatory changes and generate migration plans</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-400">AI Monitoring Active</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
            <Download className="w-4 h-4" />
            Export Analysis
          </button>
        </div>
      </div>

      {/* Impact Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-xs text-slate-400">Critical Changes</span>
          </div>
          <div className="text-2xl font-bold text-white">{criticalChanges}</div>
          <div className="text-sm text-slate-400">Requiring Action</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-slate-400">High Priority</span>
          </div>
          <div className="text-2xl font-bold text-white">{highChanges}</div>
          <div className="text-sm text-slate-400">Changes</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-slate-400">Affected Shipments</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalAffectedShipments}</div>
          <div className="text-sm text-slate-400">Total</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-purple-400" />
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
              placeholder="Search regulation changes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            {changeTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
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

      {/* Regulation Changes */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-rose-400" />
          Upcoming Regulation Changes
        </h3>
        <div className="space-y-3">
          {filteredChanges.map((change, idx) => (
            <motion.div
              key={change.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedChange(change)}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-rose-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(change.type)}`}>
                      {change.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(change.severity)}`}>
                      {change.severity}
                    </span>
                    <span className="text-xs text-slate-400">{change.status}</span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{change.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Effective: {change.effectiveDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Grace: {change.gracePeriod}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {change.countries.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {change.affectedShipments} shipments
                    </span>
                    <span className={`flex items-center gap-1 ${getImpactColor(change.financialImpact)}`}>
                      <DollarSign className="w-3 h-3" />
                      {change.financialImpact} financial impact
                    </span>
                    <span className={`flex items-center gap-1 ${getImpactColor(change.operationalImpact)}`}>
                      <Activity className="w-3 h-3" />
                      {change.operationalImpact} operational impact
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-400">{change.confidence}%</div>
                    <div className="text-xs text-slate-400">AI Confidence</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Change Details Modal */}
      <AnimatePresence>
        {selectedChange && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedChange(null)}
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
                  <Flame className="w-6 h-6 text-rose-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedChange.title}</h3>
                    <p className="text-sm text-slate-400">{selectedChange.countries.join(', ')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedChange(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Type</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded border ${getTypeColor(selectedChange.type)}`}>
                    {selectedChange.type}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Severity</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${getSeverityColor(selectedChange.severity)}`}>
                    {selectedChange.severity}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Effective Date</div>
                  <div className="text-sm text-white">{selectedChange.effectiveDate}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Grace Period</div>
                  <div className="text-sm text-white">{selectedChange.gracePeriod}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Financial Impact</div>
                  <div className={`text-sm font-bold ${getImpactColor(selectedChange.financialImpact)}`}>
                    {selectedChange.financialImpact}
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Operational Impact</div>
                  <div className={`text-sm font-bold ${getImpactColor(selectedChange.operationalImpact)}`}>
                    {selectedChange.operationalImpact}
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">AI Prediction</div>
                <p className="text-sm text-white">{selectedChange.aiPrediction}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    Required Actions
                  </h4>
                  <div className="space-y-2">
                    {selectedChange.requiredActions.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-white">
                        <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-400" />
                    Document Changes
                  </h4>
                  <div className="space-y-2">
                    {selectedChange.documentChanges.map((doc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-white">
                        <FileText className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        {doc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-400" />
                  Alternative Strategies
                </h4>
                <div className="space-y-2">
                  {selectedChange.alternativeStrategies.map((strategy, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-green-500/10 rounded border border-green-500/30">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-white">{strategy}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center gap-2">
                  <Target className="w-4 h-4" />
                  Create Migration Plan
                </button>
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

export default AIRegulationChangeImpactAnalyzer;