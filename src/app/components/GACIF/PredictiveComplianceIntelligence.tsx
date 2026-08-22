import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Target, 
  Activity, 
  BarChart3, 
  Shield, 
  FileText, 
  Globe, 
  Calendar, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Zap, 
  CheckCircle, 
  XCircle, 
  Info, 
  ChevronRight,
  Sparkles,
  Brain,
  LineChart,
  Filter,
  Search
} from 'lucide-react';

interface PredictiveRisk {
  id: string;
  shipmentId: string;
  shipmentName: string;
  riskType: 'document_expiry' | 'regulation_change' | 'compliance_deadline' | 'customs_policy' | 'country_restriction' | 'inspection_probability';
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  probability: number;
  businessImpact: 'critical' | 'high' | 'medium' | 'low';
  estimatedDelay: string;
  confidenceScore: number;
  riskTimeline: string;
  recommendedAction: string;
  aiExplanation: string;
  affectedCountries: string[];
  priority: number;
}

interface RiskPrediction {
  timeframe: string;
  totalRisks: number;
  criticalRisks: number;
  highRisks: number;
  mediumRisks: number;
  lowRisks: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  trendPercentage: number;
}

const PredictiveComplianceIntelligence = () => {
  const [selectedRisk, setSelectedRisk] = useState<PredictiveRisk | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('all');
  const [filterRiskType, setFilterRiskType] = useState<string>('all');
  const [showDetails, setShowDetails] = useState(false);

  const predictiveRisks: PredictiveRisk[] = [
    {
      id: 'RISK-001',
      shipmentId: 'SHP-002',
      shipmentName: 'Electronic Components - China to Germany',
      riskType: 'document_expiry',
      riskLevel: 'critical',
      probability: 92,
      businessImpact: 'critical',
      estimatedDelay: '5-7 days',
      confidenceScore: 94,
      riskTimeline: '2024-08-20',
      recommendedAction: 'Renew CE Certificate immediately. Estimated processing time: 10-14 days.',
      aiExplanation: 'CE Certificate expires on 2024-08-15. Current shipment ETA is 2024-08-28. If not renewed, customs will reject shipment. Historical data shows 95% rejection rate for expired certificates.',
      affectedCountries: ['Germany', 'France', 'Italy'],
      priority: 1
    },
    {
      id: 'RISK-002',
      shipmentId: 'SHP-003',
      shipmentName: 'Industrial Equipment - Dubai to UK',
      riskType: 'compliance_deadline',
      riskLevel: 'high',
      probability: 78,
      businessImpact: 'high',
      estimatedDelay: '2-3 days',
      confidenceScore: 87,
      riskTimeline: '2024-08-18',
      recommendedAction: 'Submit Origin Certificate before departure. Processing time: 2-3 days.',
      aiExplanation: 'UK customs requires Origin Certificate for industrial equipment. Current documentation missing. Without this, clearance time increases by 72 hours on average.',
      affectedCountries: ['UK'],
      priority: 2
    },
    {
      id: 'RISK-003',
      shipmentId: 'SHP-004',
      shipmentName: 'Medical Devices - India to USA',
      riskType: 'customs_policy',
      riskLevel: 'high',
      probability: 71,
      businessImpact: 'high',
      estimatedDelay: '3-5 days',
      confidenceScore: 82,
      riskTimeline: '2024-08-25',
      recommendedAction: 'Update FDA declaration to include new requirements effective from September 2024.',
      aiExplanation: 'US FDA has updated documentation requirements for medical devices. Current FDA declaration may not meet new standards. AI predicts 40% chance of additional inspection.',
      affectedCountries: ['USA'],
      priority: 3
    },
    {
      id: 'RISK-004',
      shipmentId: 'SHP-005',
      shipmentName: 'Automotive Parts - Japan to Australia',
      riskType: 'country_restriction',
      riskLevel: 'medium',
      probability: 65,
      businessImpact: 'medium',
      estimatedDelay: '1-2 days',
      confidenceScore: 79,
      riskTimeline: '2024-09-01',
      recommendedAction: 'Verify if any components are subject to new Australian import restrictions.',
      aiExplanation: 'Australia has implemented new restrictions on certain automotive components. AI analysis suggests 30% chance this shipment contains restricted items.',
      affectedCountries: ['Australia'],
      priority: 4
    },
    {
      id: 'RISK-005',
      shipmentId: 'SHP-006',
      shipmentName: 'Chemical Products - Singapore to EU',
      riskType: 'regulation_change',
      riskLevel: 'medium',
      probability: 58,
      businessImpact: 'medium',
      estimatedDelay: '2-4 days',
      confidenceScore: 75,
      riskTimeline: '2024-09-15',
      recommendedAction: 'Review REACH compliance for new chemical classification requirements.',
      aiExplanation: 'EU REACH regulation updated classification for certain chemicals. Current documentation may not reflect new classification. AI recommends review before shipment.',
      affectedCountries: ['Germany', 'France', 'Netherlands', 'Belgium'],
      priority: 5
    },
    {
      id: 'RISK-006',
      shipmentId: 'SHP-007',
      shipmentName: 'Electronics - Taiwan to Canada',
      riskType: 'inspection_probability',
      riskLevel: 'low',
      probability: 45,
      businessImpact: 'low',
      estimatedDelay: '1 day',
      confidenceScore: 71,
      riskTimeline: '2024-08-30',
      recommendedAction: 'Ensure all documentation is complete to minimize inspection probability.',
      aiExplanation: 'AI inspection model predicts 45% probability of customs inspection based on shipment characteristics. Complete documentation reduces inspection probability to 15%.',
      affectedCountries: ['Canada'],
      priority: 6
    }
  ];

  const riskPredictions: RiskPrediction[] = [
    {
      timeframe: 'Next 7 Days',
      totalRisks: 3,
      criticalRisks: 1,
      highRisks: 2,
      mediumRisks: 0,
      lowRisks: 0,
      trend: 'increasing',
      trendPercentage: 15
    },
    {
      timeframe: 'Next 30 Days',
      totalRisks: 8,
      criticalRisks: 2,
      highRisks: 3,
      mediumRisks: 2,
      lowRisks: 1,
      trend: 'increasing',
      trendPercentage: 22
    },
    {
      timeframe: 'Next 90 Days',
      totalRisks: 15,
      criticalRisks: 3,
      highRisks: 5,
      mediumRisks: 4,
      lowRisks: 3,
      trend: 'stable',
      trendPercentage: 5
    }
  ];

  const riskTypes = [
    { id: 'all', label: 'All Risk Types' },
    { id: 'document_expiry', label: 'Document Expiry' },
    { id: 'regulation_change', label: 'Regulation Change' },
    { id: 'compliance_deadline', label: 'Compliance Deadline' },
    { id: 'customs_policy', label: 'Customs Policy' },
    { id: 'country_restriction', label: 'Country Restriction' },
    { id: 'inspection_probability', label: 'Inspection Probability' }
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'document_expiry': return <FileText className="w-4 h-4" />;
      case 'regulation_change': return <Gavel className="w-4 h-4" />;
      case 'compliance_deadline': return <Clock className="w-4 h-4" />;
      case 'customs_policy': return <Shield className="w-4 h-4" />;
      case 'country_restriction': return <Globe className="w-4 h-4" />;
      case 'inspection_probability': return <Activity className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredRisks = predictiveRisks.filter(risk => {
    const matchesSearch = 
      risk.shipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.aiExplanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterRiskLevel === 'all' || risk.riskLevel === filterRiskLevel;
    const matchesType = filterRiskType === 'all' || risk.riskType === filterRiskType;
    return matchesSearch && matchesLevel && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
            Predictive Compliance Intelligence™
          </h2>
          <p className="text-slate-400">AI-powered future compliance risk prediction and analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-400">AI Model: v2.4</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-400">Live Predictions</span>
          </div>
        </div>
      </div>

      {/* Risk Prediction Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {riskPredictions.map((prediction, idx) => (
          <motion.div
            key={prediction.timeframe}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-lg font-semibold text-white">{prediction.timeframe}</span>
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                prediction.trend === 'increasing' ? 'text-red-400' :
                prediction.trend === 'decreasing' ? 'text-green-400' :
                'text-slate-400'
              }`}>
                {prediction.trend === 'increasing' ? <ArrowUp className="w-4 h-4" /> : 
                 prediction.trend === 'decreasing' ? <ArrowDown className="w-4 h-4" /> : 
                 <Activity className="w-4 h-4" />}
                {prediction.trendPercentage}%
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Total Risks</span>
                <span className="text-lg font-bold text-white">{prediction.totalRisks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-400">Critical</span>
                <span className="text-sm font-bold text-red-400">{prediction.criticalRisks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-400">High</span>
                <span className="text-sm font-bold text-orange-400">{prediction.highRisks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-yellow-400">Medium</span>
                <span className="text-sm font-bold text-yellow-400">{prediction.mediumRisks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-400">Low</span>
                <span className="text-sm font-bold text-green-400">{prediction.lowRisks}</span>
              </div>
            </div>
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
              placeholder="Search risks by shipment name or AI explanation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400"
            />
          </div>
          <select
            value={filterRiskLevel}
            onChange={(e) => setFilterRiskLevel(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterRiskType}
            onChange={(e) => setFilterRiskType(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            {riskTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Predictive Risks List */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <LineChart className="w-5 h-5 text-green-400" />
          AI Predicted Compliance Risks
        </h3>
        <div className="space-y-3">
          {filteredRisks.map((risk, idx) => (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedRisk(risk)}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-green-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getRiskLevelColor(risk.riskLevel)}`}>
                      {risk.riskLevel}
                    </span>
                    <span className="text-xs text-slate-400">{risk.riskType.replace('_', ' ')}</span>
                    <span className="text-xs text-slate-400">#{risk.priority}</span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{risk.shipmentName}</h4>
                  <p className="text-sm text-slate-400 mb-2">{risk.aiExplanation}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {risk.probability}% probability
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Est. delay: {risk.estimatedDelay}
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {risk.confidenceScore}% confidence
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">{risk.probability}%</div>
                    <div className="text-xs text-slate-400">Probability</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Risk Details Modal */}
      <AnimatePresence>
        {selectedRisk && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRisk(null)}
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
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Risk Analysis Details</h3>
                    <p className="text-sm text-slate-400">{selectedRisk.shipmentName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRisk(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Risk Level</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded border ${getRiskLevelColor(selectedRisk.riskLevel)}`}>
                    {selectedRisk.riskLevel}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Risk Type</div>
                  <div className="text-sm text-white">{selectedRisk.riskType.replace('_', ' ')}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Probability</div>
                  <div className="text-lg font-bold text-orange-400">{selectedRisk.probability}%</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">AI Confidence</div>
                  <div className="text-lg font-bold text-purple-400">{selectedRisk.confidenceScore}%</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">AI Explanation</div>
                <p className="text-sm text-white">{selectedRisk.aiExplanation}</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">Recommended Action</div>
                <p className="text-sm text-white">{selectedRisk.recommendedAction}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Business Impact</div>
                  <div className="text-sm font-bold text-white capitalize">{selectedRisk.businessImpact}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Estimated Delay</div>
                  <div className="text-sm font-bold text-white">{selectedRisk.estimatedDelay}</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">Risk Timeline</div>
                <div className="text-sm text-white">{selectedRisk.riskTimeline}</div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">Affected Countries</div>
                <div className="flex flex-wrap gap-2">
                  {selectedRisk.affectedCountries.map((country, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-slate-600 rounded text-white">
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Take Action
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

export default PredictiveComplianceIntelligence;