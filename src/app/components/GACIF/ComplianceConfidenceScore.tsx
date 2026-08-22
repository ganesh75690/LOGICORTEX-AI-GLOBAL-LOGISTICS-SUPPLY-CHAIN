import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  Shield, 
  FileText, 
  TreePine, 
  Award, 
  MapPin, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Zap,
  Globe,
  Truck,
  Building2,
  Package,
  RefreshCw,
  Download,
  Eye,
  X
} from 'lucide-react';

interface ConfidenceMetric {
  id: string;
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  icon: any;
  color: string;
  description: string;
  breakdown: {
    label: string;
    value: number;
    status: 'good' | 'warning' | 'critical';
  }[];
}

const ComplianceConfidenceScore = () => {
  const [selectedMetric, setSelectedMetric] = useState<ConfidenceMetric | null>(null);

  const confidenceMetrics: ConfidenceMetric[] = [
    {
      id: 'overall',
      name: 'Overall Compliance',
      score: 87,
      trend: 'up',
      trendValue: 5,
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      description: 'Combined confidence score across all compliance dimensions',
      breakdown: [
        { label: 'Documentation', value: 92, status: 'good' },
        { label: 'Regulations', value: 88, status: 'good' },
        { label: 'Certifications', value: 85, status: 'good' },
        { label: 'Risk Management', value: 82, status: 'warning' }
      ]
    },
    {
      id: 'customs',
      name: 'Customs Readiness',
      score: 92,
      trend: 'up',
      trendValue: 8,
      icon: Building2,
      color: 'from-green-500 to-green-600',
      description: 'Readiness for customs clearance procedures',
      breakdown: [
        { label: 'Documentation', value: 95, status: 'good' },
        { label: 'HS Codes', value: 90, status: 'good' },
        { label: 'Declarations', value: 91, status: 'good' },
        { label: 'Broker Readiness', value: 89, status: 'good' }
      ]
    },
    {
      id: 'documentation',
      name: 'Documentation Readiness',
      score: 85,
      trend: 'stable',
      trendValue: 0,
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      description: 'Completeness and validity of required documents',
      breakdown: [
        { label: 'Invoices', value: 98, status: 'good' },
        { label: 'Certificates', value: 78, status: 'warning' },
        { label: 'Packing Lists', value: 95, status: 'good' },
        { label: 'Origin Docs', value: 70, status: 'warning' }
      ]
    },
    {
      id: 'environmental',
      name: 'Environmental Readiness',
      score: 90,
      trend: 'up',
      trendValue: 12,
      icon: TreePine,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Compliance with environmental regulations',
      breakdown: [
        { label: 'Carbon Reporting', value: 92, status: 'good' },
        { label: 'Waste Management', value: 88, status: 'good' },
        { label: 'Material Restrictions', value: 90, status: 'good' },
        { label: 'Green Logistics', value: 85, status: 'good' }
      ]
    },
    {
      id: 'certification',
      name: 'Certification Readiness',
      score: 88,
      trend: 'down',
      trendValue: 3,
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      description: 'Status of required product certifications',
      breakdown: [
        { label: 'CE Marking', value: 72, status: 'warning' },
        { label: 'FDA Approval', value: 95, status: 'good' },
        { label: 'ISO Standards', value: 90, status: 'good' },
        { label: 'Industry Certs', value: 85, status: 'good' }
      ]
    },
    {
      id: 'border',
      name: 'Border Readiness',
      score: 84,
      trend: 'up',
      trendValue: 6,
      icon: MapPin,
      color: 'from-red-500 to-red-600',
      description: 'Preparedness for border crossing and inspection',
      breakdown: [
        { label: 'Inspection Prep', value: 82, status: 'warning' },
        { label: 'Border Documents', value: 88, status: 'good' },
        { label: 'Risk Assessment', value: 80, status: 'warning' },
        { label: 'Alternative Routes', value: 85, status: 'good' }
      ]
    },
    {
      id: 'trade',
      name: 'Trade Readiness',
      score: 86,
      trend: 'stable',
      trendValue: 0,
      icon: Globe,
      color: 'from-cyan-500 to-cyan-600',
      description: 'Overall trade compliance and risk management',
      breakdown: [
        { label: 'Sanctions Check', value: 95, status: 'good' },
        { label: 'Trade Agreements', value: 88, status: 'good' },
        { label: 'Export Controls', value: 82, status: 'warning' },
        { label: 'Risk Monitoring', value: 85, status: 'good' }
      ]
    }
  ];

  const GaugeChart = ({ score, color }: { score: number; color: string }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;
    
    return (
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-slate-700"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F5C4" />
              <stop offset="100%" stopColor="#00D4A8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{score}%</div>
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500/20 text-green-400';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400';
      case 'critical': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const overallScore = Math.round(confidenceMetrics.reduce((acc, m) => acc + m.score, 0) / confidenceMetrics.length);
  const averageTrend = Math.round(confidenceMetrics.reduce((acc, m) => acc + m.trendValue, 0) / confidenceMetrics.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Target className="w-6 h-6 text-indigo-400" />
            Compliance Confidence Score™
          </h2>
          <p className="text-slate-400">Enterprise-grade compliance metrics and confidence gauges</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh Scores
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Overall Score */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <GaugeChart score={overallScore} color="from-blue-500 to-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Overall Compliance Confidence</h3>
              <p className="text-slate-400 mb-4">Combined score across all compliance dimensions</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {averageTrend > 0 ? <TrendingUp className="w-4 h-4 text-green-400" /> : 
                   averageTrend < 0 ? <TrendingDown className="w-4 h-4 text-red-400" /> :
                   <Activity className="w-4 h-4 text-slate-400" />}
                  <span className={`text-sm font-medium ${
                    averageTrend > 0 ? 'text-green-400' :
                    averageTrend < 0 ? 'text-red-400' :
                    'text-slate-400'
                  }`}>
                    {averageTrend > 0 ? '+' : ''}{averageTrend}% this month
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-400">5/7 metrics improving</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">92%</div>
              <div className="text-xs text-slate-400">Customs Readiness</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">78%</div>
              <div className="text-xs text-slate-400">Certificate Validity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Confidence Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {confidenceMetrics.map((metric, idx) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedMetric(metric)}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 cursor-pointer hover:border-indigo-500/50 transition-all hover:bg-slate-700/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{metric.name}</h4>
                  <p className="text-xs text-slate-400">{metric.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {metric.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-400" /> :
                 metric.trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-400" /> :
                 <Activity className="w-4 h-4 text-slate-400" />}
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-400' :
                  metric.trend === 'down' ? 'text-red-400' :
                  'text-slate-400'
                }`}>
                  {metric.trendValue > 0 ? '+' : ''}{metric.trendValue}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <GaugeChart score={metric.score} color={metric.color} />
              <div className="text-right">
                <div className={`text-3xl font-bold ${
                  metric.score >= 90 ? 'text-green-400' :
                  metric.score >= 75 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {metric.score}%
                </div>
                <div className="text-xs text-slate-400">Confidence</div>
              </div>
            </div>

            <div className="space-y-2">
              {metric.breakdown.map((item, bIdx) => (
                <div key={bIdx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'good' ? 'bg-green-400' :
                      item.status === 'warning' ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`} />
                    <span className="text-sm text-slate-300">{item.label}</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    item.status === 'good' ? 'text-green-400' :
                    item.status === 'warning' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Metric Details Modal */}
      {selectedMetric && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMetric(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-2xl w-full shadow-2xl"
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

            <div className="flex items-center justify-center mb-6">
              <GaugeChart score={selectedMetric.score} color={selectedMetric.color} />
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">Score Breakdown</h4>
              <div className="space-y-3">
                {selectedMetric.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <span className="text-sm text-white">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.status === 'good' ? 'bg-green-500' :
                            item.status === 'warning' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${
                        item.status === 'good' ? 'text-green-400' :
                        item.status === 'warning' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {item.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export Metric
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ComplianceConfidenceScore;