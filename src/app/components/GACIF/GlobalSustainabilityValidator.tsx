import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  TreePine, 
  Droplets, 
  Wind, 
  Recycle, 
  Zap, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Target, 
  Globe, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Search, 
  Filter, 
  Eye, 
  X,
  ChevronRight,
  Award,
  Factory,
  Truck,
  Package,
  Flame,
  Snowflake
} from 'lucide-react';

interface SustainabilityMetric {
  id: string;
  name: string;
  category: 'carbon' | 'packaging' | 'material' | 'waste' | 'energy' | 'certification';
  score: number;
  target: number;
  status: 'compliant' | 'at_risk' | 'non_compliant';
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  description: string;
  issues: SustainabilityIssue[];
  recommendations: string[];
}

interface SustainabilityIssue {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  impact: string;
  solution: string;
}

const GlobalSustainabilityValidator = () => {
  const [selectedMetric, setSelectedMetric] = useState<SustainabilityMetric | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const sustainabilityMetrics: SustainabilityMetric[] = [
    {
      id: 'CARBON-001',
      name: 'Carbon Compliance',
      category: 'carbon',
      score: 92,
      target: 95,
      status: 'at_risk',
      trend: 'up',
      icon: Flame,
      color: 'from-red-500 to-red-600',
      description: 'Carbon footprint and emissions compliance',
      issues: [
        {
          type: 'Emissions Exceed Target',
          severity: 'medium',
          description: 'Current emissions 8% above quarterly target',
          impact: 'May affect carbon credit allocation',
          solution: 'Optimize logistics routes and reduce air freight usage'
        }
      ],
      recommendations: [
        'Increase sea freight ratio from 60% to 75%',
        'Implement route optimization software',
        'Consider carbon offset programs'
      ]
    },
    {
      id: 'PACK-001',
      name: 'Packaging Compliance',
      category: 'packaging',
      score: 88,
      target: 90,
      status: 'at_risk',
      trend: 'up',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      description: 'Packaging material and recycling compliance',
      issues: [
        {
          type: 'Plastic Usage',
          severity: 'medium',
          description: 'Plastic packaging 5% above sustainable target',
          impact: 'Environmental regulations compliance risk',
          solution: 'Switch to biodegradable alternatives'
        }
      ],
      recommendations: [
        'Source recycled cardboard suppliers',
        'Implement returnable packaging systems',
        'Reduce packaging size by 15%'
      ]
    },
    {
      id: 'MAT-001',
      name: 'Material Restrictions',
      category: 'material',
      score: 95,
      target: 95,
      status: 'compliant',
      trend: 'stable',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      description: 'Restricted materials and hazardous substances compliance',
      issues: [],
      recommendations: [
        'Continue current material sourcing practices',
        'Monitor regulatory updates for new restrictions'
      ]
    },
    {
      id: 'WASTE-001',
      name: 'Waste Management',
      category: 'waste',
      score: 90,
      target: 90,
      status: 'compliant',
      trend: 'up',
      icon: Recycle,
      color: 'from-green-500 to-green-600',
      description: 'Waste disposal and recycling compliance',
      issues: [],
      recommendations: [
        'Maintain current recycling programs',
        'Expand e-waste recycling initiatives'
      ]
    },
    {
      id: 'ENERGY-001',
      name: 'Energy Efficiency',
      category: 'energy',
      score: 85,
      target: 90,
      status: 'at_risk',
      trend: 'up',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Energy consumption and renewable energy usage',
      issues: [
        {
          type: 'Energy Consumption',
          severity: 'medium',
          description: 'Energy consumption 5% above efficiency target',
          impact: 'Higher operational costs and environmental impact',
          solution: 'Implement energy-efficient equipment and processes'
        }
      ],
      recommendations: [
        'Install solar panels at warehouses',
        'Upgrade to LED lighting systems',
        'Implement smart energy management'
      ]
    },
    {
      id: 'CERT-001',
      name: 'Green Certifications',
      category: 'certification',
      score: 78,
      target: 85,
      status: 'at_risk',
      trend: 'down',
      icon: Award,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Environmental certifications and green logistics standards',
      issues: [
        {
          type: 'Certification Expiry',
          severity: 'high',
          description: 'ISO 14001 certification expires in 45 days',
          impact: 'Loss of green certification status',
          solution: 'Initiate renewal process immediately'
        }
      ],
      recommendations: [
        'Renew ISO 14001 certification',
        'Pursue additional green logistics certifications',
        'Maintain documentation for audits'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'carbon', label: 'Carbon' },
    { id: 'packaging', label: 'Packaging' },
    { id: 'material', label: 'Material' },
    { id: 'waste', label: 'Waste' },
    { id: 'energy', label: 'Energy' },
    { id: 'certification', label: 'Certification' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'at_risk': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'non_compliant': return 'bg-red-500/20 text-red-400 border-red-500/30';
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

  const filteredMetrics = sustainabilityMetrics.filter(metric => {
    const matchesSearch = 
      metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      metric.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || metric.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || metric.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const overallScore = Math.round(sustainabilityMetrics.reduce((acc, m) => acc + m.score, 0) / sustainabilityMetrics.length);
  const compliantMetrics = sustainabilityMetrics.filter(m => m.status === 'compliant').length;
  const atRiskMetrics = sustainabilityMetrics.filter(m => m.status === 'at_risk').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Leaf className="w-6 h-6 text-emerald-400" />
            Global Sustainability Validator™
          </h2>
          <p className="text-slate-400">Validate carbon compliance, packaging standards, and environmental regulations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <TreePine className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-400">Live Validation</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            <CheckCircle className="w-4 h-4" />
            Run Validation
          </button>
        </div>
      </div>

      {/* Sustainability Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <span className="text-xs text-slate-400">Overall Score</span>
          </div>
          <div className="text-2xl font-bold text-white">{overallScore}%</div>
          <div className="text-sm text-slate-400">Sustainability</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-xs text-slate-400">Compliant</span>
          </div>
          <div className="text-2xl font-bold text-white">{compliantMetrics}</div>
          <div className="text-sm text-slate-400">Metrics</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-slate-400">At Risk</span>
          </div>
          <div className="text-2xl font-bold text-white">{atRiskMetrics}</div>
          <div className="text-sm text-slate-400">Metrics</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-5 h-5 text-red-400" />
            <span className="text-xs text-slate-400">Carbon Offset</span>
          </div>
          <div className="text-2xl font-bold text-white">245t</div>
          <div className="text-sm text-slate-400">CO2e Year</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search sustainability metrics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
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

      {/* Sustainability Metrics */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-400" />
          Sustainability Compliance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMetrics.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedMetric(metric)}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-emerald-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">{metric.name}</h4>
                    <p className="text-xs text-slate-400">{metric.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-400" /> :
                   metric.trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-400" /> :
                   <Activity className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(metric.status)}`}>
                    {metric.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">{metric.category}</span>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    metric.score >= 90 ? 'text-green-400' :
                    metric.score >= 75 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {metric.score}%
                  </div>
                  <div className="text-xs text-slate-400">Target: {metric.target}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.score >= 90 ? 'bg-green-500' :
                      metric.score >= 75 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>

              {metric.issues.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-orange-400">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{metric.issues.length} issue(s) detected</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Metric Details Modal */}
      <AnimatePresence>
        {selectedMetric && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMetric(null)}
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
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedMetric.color} flex items-center justify-center`}>
                    <selectedMetric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedMetric.name}</h3>
                    <p className="text-sm text-slate-400">{selectedMetric.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Current Score</div>
                  <div className={`text-2xl font-bold ${
                    selectedMetric.score >= 90 ? 'text-green-400' :
                    selectedMetric.score >= 75 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {selectedMetric.score}%
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Target Score</div>
                  <div className="text-2xl font-bold text-white">{selectedMetric.target}%</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Status</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded border ${getStatusColor(selectedMetric.status)}`}>
                    {selectedMetric.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {selectedMetric.issues.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    Detected Issues
                  </h4>
                  <div className="space-y-2">
                    {selectedMetric.issues.map((issue, idx) => (
                      <div key={idx} className={`p-3 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-medium text-white">{issue.type}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            issue.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                            issue.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                            issue.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-1">{issue.description}</p>
                        <p className="text-xs text-slate-400 mb-1">Impact: {issue.impact}</p>
                        <p className="text-xs text-green-400">Solution: {issue.solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" />
                  AI Recommendations
                </h4>
                <div className="space-y-2">
                  {selectedMetric.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-slate-600/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-white">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
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

export default GlobalSustainabilityValidator;