import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Search, 
  Filter, 
  Globe, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Plus, 
  Download, 
  Upload, 
  BookOpen, 
  Layers, 
  Shield, 
  Leaf, 
  Building2, 
  Package, 
  Gavel, 
  Award,
  ChevronDown,
  ChevronRight,
  X,
  Edit,
  Trash2,
  Eye,
  Target,
  Zap,
  Database,
  Network
} from 'lucide-react';

interface Regulation {
  id: string;
  country: string;
  region: string;
  title: string;
  category: 'Customs' | 'Dangerous Goods' | 'Packaging' | 'Certification' | 'Product Restrictions' | 'Trade Agreements' | 'Sanctions' | 'Environmental' | 'Sustainability' | 'Documentation';
  status: 'active' | 'upcoming' | 'expired' | 'draft';
  impact: 'critical' | 'high' | 'medium' | 'low';
  lastUpdated: string;
  effectiveDate: string;
  expiryDate: string;
  description: string;
  requirements: string[];
  aiConfidence: number;
  aiAnalysis: string;
  relatedRegulations: string[];
  applicableShipments: number;
}

const AIRegulationBrain = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const categories = [
    { id: 'all', label: 'All Categories', icon: Layers },
    { id: 'Customs', label: 'Customs', icon: Building2 },
    { id: 'Dangerous Goods', label: 'Dangerous Goods', icon: Shield },
    { id: 'Packaging', label: 'Packaging', icon: Package },
    { id: 'Certification', label: 'Certification', icon: Award },
    { id: 'Product Restrictions', label: 'Product Restrictions', icon: AlertTriangle },
    { id: 'Trade Agreements', label: 'Trade Agreements', icon: Gavel },
    { id: 'Sanctions', label: 'Sanctions', icon: Target },
    { id: 'Environmental', label: 'Environmental', icon: Leaf },
    { id: 'Sustainability', label: 'Sustainability', icon: Zap },
    { id: 'Documentation', label: 'Documentation', icon: FileText }
  ];

  const countries = [
    { id: 'all', label: 'All Countries' },
    { id: 'USA', label: 'United States' },
    { id: 'UK', label: 'United Kingdom' },
    { id: 'Germany', label: 'Germany' },
    { id: 'France', label: 'France' },
    { id: 'China', label: 'China' },
    { id: 'India', label: 'India' },
    { id: 'Japan', label: 'Japan' },
    { id: 'UAE', label: 'United Arab Emirates' },
    { id: 'Singapore', label: 'Singapore' },
    { id: 'Australia', label: 'Australia' }
  ];

  const regulations: Regulation[] = [
    {
      id: 'REG-001',
      country: 'USA',
      region: 'North America',
      title: 'US Customs Import Regulations 2024',
      category: 'Customs',
      status: 'active',
      impact: 'critical',
      lastUpdated: '2024-08-01',
      effectiveDate: '2024-01-01',
      expiryDate: '2025-12-31',
      description: 'Comprehensive import regulations for electronic components entering the United States customs territory.',
      requirements: [
        'Valid Commercial Invoice with HS Code classification',
        'Packing List with detailed item descriptions',
        'Bill of Lading endorsed by carrier',
        'US Customs Form 7501 (Entry Summary)',
        'FCC Certification for radio frequency devices',
        'FDA Declaration for medical devices'
      ],
      aiConfidence: 98,
      aiAnalysis: 'This regulation applies to all electronic shipments valued over $2,500. AI predicts 99% compliance rate when all documentation is complete.',
      relatedRegulations: ['REG-002', 'REG-005'],
      applicableShipments: 156
    },
    {
      id: 'REG-002',
      country: 'Germany',
      region: 'European Union',
      title: 'EU CE Marking Requirements',
      category: 'Certification',
      status: 'active',
      impact: 'critical',
      lastUpdated: '2024-07-20',
      effectiveDate: '2024-01-01',
      expiryDate: '2025-12-31',
      description: 'CE marking requirements for electronic products sold in the European Union market.',
      requirements: [
        'Valid CE Certificate from notified body',
        'Technical documentation file',
        'Declaration of Conformity',
        'EU Type Examination Certificate',
        'Risk assessment documentation'
      ],
      aiConfidence: 95,
      aiAnalysis: 'CE marking is mandatory for most electronic products. AI detects 15% of shipments have expired certificates.',
      relatedRegulations: ['REG-001', 'REG-003'],
      applicableShipments: 89
    },
    {
      id: 'REG-003',
      country: 'UK',
      region: 'Europe',
      title: 'UK Customs Declaration Requirements',
      category: 'Customs',
      status: 'active',
      impact: 'high',
      lastUpdated: '2024-08-05',
      effectiveDate: '2024-01-01',
      expiryDate: '2025-12-31',
      description: 'Post-Brexit customs declaration requirements for goods entering the United Kingdom.',
      requirements: [
        'Customs Declaration (CDS)',
        'EORI Number registration',
        'Origin Certificate (where applicable)',
        'Import License for restricted goods',
        'Commodity Code classification'
      ],
      aiConfidence: 92,
      aiAnalysis: 'UK customs has implemented new electronic declaration system. AI predicts 20% improvement in clearance time.',
      relatedRegulations: ['REG-002'],
      applicableShipments: 67
    },
    {
      id: 'REG-004',
      country: 'China',
      region: 'Asia',
      title: 'China Import Certification Requirements',
      category: 'Certification',
      status: 'active',
      impact: 'high',
      lastUpdated: '2024-07-15',
      effectiveDate: '2024-01-01',
      expiryDate: '2025-12-31',
      description: 'Mandatory certification requirements for electronic products imported into China.',
      requirements: [
        'CCC (China Compulsory Certification)',
        'CQC Certification',
        'Product Quality License',
        'Import License for certain categories',
        'Quota allocation for restricted items'
      ],
      aiConfidence: 89,
      aiAnalysis: 'China CCC certification process takes 4-6 weeks. AI recommends starting process 3 months before shipment.',
      relatedRegulations: ['REG-005'],
      applicableShipments: 45
    },
    {
      id: 'REG-005',
      country: 'India',
      region: 'Asia',
      title: 'India DGFT Import Regulations',
      category: 'Customs',
      status: 'active',
      impact: 'medium',
      lastUpdated: '2024-08-03',
      effectiveDate: '2024-01-01',
      expiryDate: '2025-12-31',
      description: 'Directorate General of Foreign Trade import regulations for electronic components.',
      requirements: [
        'IEC Certificate for electrical equipment',
        'BIS Certification for mandatory products',
        'Import Authorization for restricted items',
        'AD Code registration',
        'Customs Bond registration'
      ],
      aiConfidence: 91,
      aiAnalysis: 'India has recently updated BIS certification requirements. AI identifies 12% non-compliance in recent shipments.',
      relatedRegulations: ['REG-001', 'REG-004'],
      applicableShipments: 34
    },
    {
      id: 'REG-006',
      country: 'UAE',
      region: 'Middle East',
      title: 'UAE ESMA Certification Requirements',
      category: 'Certification',
      status: 'active',
      impact: 'medium',
      lastUpdated: '2024-07-25',
      effectiveDate: '2024-01-01',
      expiryDate: '2025-12-31',
      description: 'Emirates Authority for Standardization and Metrology certification requirements.',
      requirements: [
        'ESMA Type Approval Certificate',
        'Quality Conformity Certificate',
        'Technical specifications document',
        'Test reports from accredited labs'
      ],
      aiConfidence: 87,
      aiAnalysis: 'UAE certification process is streamlined. AI estimates 95% first-time approval rate with proper documentation.',
      relatedRegulations: ['REG-007'],
      applicableShipments: 23
    },
    {
      id: 'REG-007',
      country: 'Singapore',
      region: 'Asia',
      title: 'Singapore Import Permit Requirements',
      category: 'Customs',
      status: 'active',
      impact: 'low',
      lastUpdated: '2024-08-02',
      effectiveDate: '2024-01-01',
      expiryDate: '2025-12-31',
      description: 'Import permit and controlled goods requirements for Singapore customs.',
      requirements: [
        'TradeNet import permit',
        'Certificate of Origin',
        'Controlled goods permit (if applicable)',
        'Customs In-Non-Payment account'
      ],
      aiConfidence: 94,
      aiAnalysis: 'Singapore has one of the most efficient customs systems. AI predicts 98% clearance within 24 hours.',
      relatedRegulations: ['REG-006'],
      applicableShipments: 18
    },
    {
      id: 'REG-008',
      country: 'USA',
      region: 'North America',
      title: 'US Environmental Protection Regulations',
      category: 'Environmental',
      status: 'upcoming',
      impact: 'high',
      lastUpdated: '2024-08-08',
      effectiveDate: '2024-09-01',
      expiryDate: '2025-12-31',
      description: 'New EPA regulations for electronic waste and recycling compliance.',
      requirements: [
        'EPA certification for hazardous materials',
        'Electronic waste disposal documentation',
        'Recycling compliance certificate',
        'Material safety data sheets'
      ],
      aiConfidence: 85,
      aiAnalysis: 'Upcoming regulation will affect 35% of electronic shipments. AI recommends preparing documentation now.',
      relatedRegulations: ['REG-001'],
      applicableShipments: 0
    }
  ];

  const filteredRegulations = regulations.filter(reg => {
    const matchesSearch = 
      reg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || reg.category === selectedCategory;
    const matchesCountry = selectedCountry === 'all' || reg.country === selectedCountry;
    const matchesStatus = selectedStatus === 'all' || reg.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesCountry && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'expired': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-400" />
            AI Global Regulation Brain™
          </h2>
          <p className="text-slate-400">Intelligent regulation knowledge engine for global compliance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <Upload className="w-4 h-4" />
            Import Rules
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Rules
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Regulation
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Regulations', value: regulations.length, icon: BookOpen, color: 'from-blue-500 to-blue-600' },
          { label: 'Active Regulations', value: regulations.filter(r => r.status === 'active').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'Upcoming Changes', value: regulations.filter(r => r.status === 'upcoming').length, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Countries Covered', value: countries.length - 1, icon: Globe, color: 'from-purple-500 to-purple-600' }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
              <span className="text-xs text-slate-400">Live</span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search regulations by title, description, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            {countries.map(country => (
              <option key={country.id} value={country.id}>{country.label}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="expired">Expired</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Regulations List */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-400" />
          Regulation Database
        </h3>
        <div className="space-y-3">
          {filteredRegulations.map((regulation, idx) => (
            <motion.div
              key={regulation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedRegulation(regulation)}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-purple-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(regulation.status)}`}>
                      {regulation.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getImpactColor(regulation.impact)}`}>
                      {regulation.impact} impact
                    </span>
                    <span className="text-xs text-slate-400">{regulation.country}</span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{regulation.title}</h4>
                  <p className="text-sm text-slate-400 mb-2">{regulation.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Network className="w-3 h-3" />
                      {regulation.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Updated: {regulation.lastUpdated}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {regulation.applicableShipments} shipments
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-400">{regulation.aiConfidence}%</div>
                    <div className="text-xs text-slate-400">AI Confidence</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Regulation Details Modal */}
      <AnimatePresence>
        {selectedRegulation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRegulation(null)}
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
                  <Brain className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedRegulation.title}</h3>
                    <p className="text-sm text-slate-400">{selectedRegulation.country} • {selectedRegulation.region}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRegulation(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Status</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded border ${getStatusColor(selectedRegulation.status)}`}>
                    {selectedRegulation.status}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Impact Level</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${getImpactColor(selectedRegulation.impact)}`}>
                    {selectedRegulation.impact}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">AI Confidence</div>
                  <div className="text-sm font-bold text-purple-400">{selectedRegulation.aiConfidence}%</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Applicable Shipments</div>
                  <div className="text-sm font-bold text-white">{selectedRegulation.applicableShipments}</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">AI Analysis</div>
                <p className="text-sm text-white">{selectedRegulation.aiAnalysis}</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">Requirements</div>
                <ul className="space-y-2">
                  {selectedRegulation.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Effective Date</div>
                  <div className="text-sm text-white">{selectedRegulation.effectiveDate}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Expiry Date</div>
                  <div className="text-sm text-white">{selectedRegulation.expiryDate}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Regulation
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View History
                </button>
                <button className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIRegulationBrain;