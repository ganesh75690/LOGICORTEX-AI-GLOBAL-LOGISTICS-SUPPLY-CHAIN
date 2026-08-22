import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Brain, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Activity, 
  TrendingUp, 
  BookOpen, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  X,
  ChevronRight,
  Target,
  Globe,
  FileText,
  Award,
  AlertTriangle,
  Layers,
  Zap,
  BarChart3,
  Calendar,
  MapPin
} from 'lucide-react';

interface ComplianceMemory {
  id: string;
  type: 'clearance' | 'rejection' | 'inspection' | 'documentation' | 'country_pattern' | 'best_practice';
  category: string;
  title: string;
  description: string;
  outcome: 'success' | 'failure' | 'partial';
  confidence: number;
  timestamp: string;
  shipmentId: string;
  country: string;
  lessons: string[];
  applicableTo: string[];
  aiInsight: string;
}

const ComplianceLearningMemory = () => {
  const [selectedMemory, setSelectedMemory] = useState<ComplianceMemory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterOutcome, setFilterOutcome] = useState<string>('all');

  const complianceMemories: ComplianceMemory[] = [
    {
      id: 'MEM-001',
      type: 'clearance',
      category: 'Customs',
      title: 'Successful US Customs Clearance - Electronics',
      description: 'Complete documentation and proper HS Code classification resulted in 24-hour clearance',
      outcome: 'success',
      confidence: 98,
      timestamp: '2024-08-08',
      shipmentId: 'SHP-001',
      country: 'USA',
      lessons: [
        'Accurate HS Code classification reduces inspection probability by 40%',
        'Complete commercial invoice with detailed descriptions is critical',
        'Bill of Lading endorsement must match carrier records'
      ],
      applicableTo: ['USA Shipments', 'Electronics', 'Air Freight'],
      aiInsight: 'Pattern identified: Shipments with complete documentation and accurate HS codes have 92% first-time clearance rate for US customs.'
    },
    {
      id: 'MEM-002',
      type: 'rejection',
      category: 'Certification',
      title: 'EU Customs Rejection - Expired CE Certificate',
      description: 'Shipment rejected due to expired CE certificate, resulting in 5-day delay',
      outcome: 'failure',
      confidence: 95,
      timestamp: '2024-08-05',
      shipmentId: 'SHP-002',
      country: 'Germany',
      lessons: [
        'CE Certificate expiry monitoring is critical for EU shipments',
        'Initiate renewal 30 days before expiry to avoid delays',
        'Notified body processing time: 10-14 days',
        '95% rejection rate for expired certificates'
      ],
      applicableTo: ['EU Shipments', 'Electronics', 'Sea Freight'],
      aiInsight: 'Critical pattern: EU customs automatically rejects shipments with expired certificates. Certificate validity check must be part of pre-shipment compliance review.'
    },
    {
      id: 'MEM-003',
      type: 'inspection',
      category: 'Documentation',
      title: 'UK Customs Inspection - Missing Origin Certificate',
      description: 'Additional inspection triggered by missing Origin Certificate, causing 72-hour delay',
      outcome: 'partial',
      confidence: 88,
      timestamp: '2024-08-03',
      shipmentId: 'SHP-003',
      country: 'UK',
      lessons: [
        'UK customs requires Origin Certificate for industrial equipment',
        'Missing certificates increase inspection probability by 35%',
        'Digital certificate submission preferred for faster processing',
        'Submit certificates 3-5 days before arrival'
      ],
      applicableTo: ['UK Shipments', 'Industrial Equipment', 'Sea Freight'],
      aiInsight: 'UK customs has strict documentation requirements. Origin Certificate is mandatory for industrial equipment post-Brexit. AI recommends including in compliance checklist.'
    },
    {
      id: 'MEM-004',
      type: 'documentation',
      category: 'Regulations',
      title: 'FDA Declaration Update Success',
      description: 'Updated FDA declaration format met new September 2024 requirements',
      outcome: 'success',
      confidence: 92,
      timestamp: '2024-08-01',
      shipmentId: 'SHP-004',
      country: 'USA',
      lessons: [
        'FDA documentation requirements change periodically',
        'Maintain updated templates for all destinations',
        'Subscribe to regulatory update notifications',
        'Test documentation changes on non-critical shipments first'
      ],
      applicableTo: ['USA Shipments', 'Medical Devices', 'Air Freight'],
      aiInsight: 'Proactive regulatory monitoring prevents compliance issues. FDA declaration updates were implemented successfully before deadline.'
    },
    {
      id: 'MEM-005',
      type: 'country_pattern',
      category: 'Regional',
      title: 'Singapore Customs Efficiency Pattern',
      description: 'Singapore customs consistently demonstrates 98% clearance within 24 hours for properly documented shipments',
      outcome: 'success',
      confidence: 96,
      timestamp: '2024-07-28',
      shipmentId: 'SHP-005',
      country: 'Singapore',
      lessons: [
        'Singapore has most efficient customs system in Asia',
        'TradeNet system enables electronic processing',
        'Complete documentation reduces clearance time to 12 hours average',
        'Consider Singapore as regional hub for Asia-Pacific distribution'
      ],
      applicableTo: ['Singapore Shipments', 'All Products', 'All Freight Modes'],
      aiInsight: 'Singapore customs pattern: 98% efficiency rate. Recommend using Singapore as regional distribution hub for Asia-Pacific operations.'
    },
    {
      id: 'MEM-006',
      type: 'best_practice',
      category: 'Process',
      title: 'Pre-Shipment Compliance Review Framework',
      description: 'Implemented 5-point compliance review reduced issues by 40%',
      outcome: 'success',
      confidence: 94,
      timestamp: '2024-07-25',
      shipmentId: 'Multiple',
      country: 'Global',
      lessons: [
        'Document validity check 7 days before shipment',
        'Regulation review for destination country',
        'Certificate expiry monitoring system',
        'Risk assessment for new routes',
        'Documentation quality control process'
      ],
      applicableTo: ['All Shipments', 'All Products', 'All Regions'],
      aiInsight: 'Pre-shipment compliance review reduced compliance issues by 40%. Framework should be standardized across all shipping operations.'
    }
  ];

  const memoryTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'clearance', label: 'Clearance' },
    { id: 'rejection', label: 'Rejection' },
    { id: 'inspection', label: 'Inspection' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'country_pattern', label: 'Country Pattern' },
    { id: 'best_practice', label: 'Best Practice' }
  ];

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'success': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'failure': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'partial': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'clearance': return <CheckCircle className="w-4 h-4" />;
      case 'rejection': return <XCircle className="w-4 h-4" />;
      case 'inspection': return <Activity className="w-4 h-4" />;
      case 'documentation': return <FileText className="w-4 h-4" />;
      case 'country_pattern': return <Globe className="w-4 h-4" />;
      case 'best_practice': return <Award className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const filteredMemories = complianceMemories.filter(memory => {
    const matchesSearch = 
      memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || memory.type === filterType;
    const matchesOutcome = filterOutcome === 'all' || memory.outcome === filterOutcome;
    return matchesSearch && matchesType && matchesOutcome;
  });

  const successMemories = complianceMemories.filter(m => m.outcome === 'success').length;
  const failureMemories = complianceMemories.filter(m => m.outcome === 'failure').length;
  const totalLessons = complianceMemories.reduce((acc, m) => acc + m.lessons.length, 0);
  const avgConfidence = Math.round(complianceMemories.reduce((acc, m) => acc + m.confidence, 0) / complianceMemories.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Database className="w-6 h-6 text-violet-400" />
            Compliance Learning Memory™
          </h2>
          <p className="text-slate-400">AI learns from every shipment to improve future compliance intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-400">AI Learning Active</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Memory
          </button>
        </div>
      </div>

      {/* Learning Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-slate-400">Total Memories</span>
          </div>
          <div className="text-2xl font-bold text-white">{complianceMemories.length}</div>
          <div className="text-sm text-slate-400">Recorded</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-xs text-slate-400">Success Patterns</span>
          </div>
          <div className="text-2xl font-bold text-white">{successMemories}</div>
          <div className="text-sm text-slate-400">Learned</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-red-400" />
            <span className="text-xs text-slate-400">Failure Patterns</span>
          </div>
          <div className="text-2xl font-bold text-white">{failureMemories}</div>
          <div className="text-sm text-slate-400">Avoided</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-slate-400">Lessons Learned</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalLessons}</div>
          <div className="text-sm text-slate-400">Total</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search compliance memories..."
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
            {memoryTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
          <select
            value={filterOutcome}
            onChange={(e) => setFilterOutcome(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Outcomes</option>
            <option value="success">Success</option>
            <option value="failure">Failure</option>
            <option value="partial">Partial</option>
          </select>
        </div>
      </div>

      {/* Compliance Memories */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-violet-400" />
          Compliance Learning Database
        </h3>
        <div className="space-y-3">
          {filteredMemories.map((memory, idx) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedMemory(memory)}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-violet-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getOutcomeColor(memory.outcome)}`}>
                      {memory.outcome}
                    </span>
                    <span className="text-xs text-slate-400">{memory.type.replace('_', ' ')}</span>
                    <span className="text-xs text-slate-400">{memory.category}</span>
                    <span className="text-xs text-slate-400">{memory.country}</span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{memory.title}</h4>
                  <p className="text-sm text-slate-400 mb-2">{memory.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {memory.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {memory.confidence}% confidence
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {memory.lessons.length} lessons
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      memory.outcome === 'success' ? 'text-green-400' :
                      memory.outcome === 'failure' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {memory.lessons.length}
                    </div>
                    <div className="text-xs text-slate-400">Lessons</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Memory Details Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMemory(null)}
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
                  <Database className="w-6 h-6 text-violet-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedMemory.title}</h3>
                    <p className="text-sm text-slate-400">{selectedMemory.shipmentId} • {selectedMemory.country}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Outcome</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded border ${getOutcomeColor(selectedMemory.outcome)}`}>
                    {selectedMemory.outcome}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Type</div>
                  <div className="text-sm text-white">{selectedMemory.type.replace('_', ' ')}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">AI Confidence</div>
                  <div className="text-lg font-bold text-purple-400">{selectedMemory.confidence}%</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Category</div>
                  <div className="text-sm text-white">{selectedMemory.category}</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">Description</div>
                <p className="text-sm text-white">{selectedMemory.description}</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">AI Insight</div>
                <p className="text-sm text-white">{selectedMemory.aiInsight}</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  Lessons Learned
                </h4>
                <div className="space-y-2">
                  {selectedMemory.lessons.map((lesson, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-slate-600/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-white">{lesson}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-400" />
                  Applicable To
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMemory.applicableTo.map((item, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-violet-500/20 text-violet-400 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Apply Learning
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

export default ComplianceLearningMemory;