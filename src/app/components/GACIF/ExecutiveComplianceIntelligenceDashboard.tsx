import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Globe,
  TrendingUp,
  BarChart3,
  MapPin,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  Truck,
  Shield,
  FileText,
  Calendar,
  Download,
  Eye,
  Zap,
  ArrowUp,
  ArrowDown,
  Award,
  Flame,
  TreePine,
  Navigation,
  Building2,
  Users,
  PieChart,
  LineChart,
  Bell,
  Wrench,
  RefreshCw
} from 'lucide-react';

const ExecutiveComplianceIntelligenceDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedView, setSelectedView] = useState('overview');

  const executiveMetrics = [
    { label: 'Global Compliance Health', value: 87, trend: 5, icon: Shield, color: 'from-green-500 to-green-600' },
    { label: 'Shipment Readiness', value: 92, trend: 8, icon: Package, color: 'from-blue-500 to-blue-600' },
    { label: 'Compliance Confidence', value: 89, trend: 3, icon: Target, color: 'from-purple-500 to-purple-600' },
    { label: 'Risk Score', value: 28, trend: -12, icon: AlertTriangle, color: 'from-red-500 to-red-600' }
  ];

  const countryCompliance = [
    { country: 'USA', compliance: 94, shipments: 156, risk: 15 },
    { country: 'Germany', compliance: 88, shipments: 89, risk: 25 },
    { country: 'UK', compliance: 85, shipments: 67, risk: 30 },
    { country: 'China', compliance: 91, shipments: 45, risk: 20 },
    { country: 'Japan', compliance: 96, shipments: 34, risk: 12 },
    { country: 'Singapore', compliance: 98, shipments: 18, risk: 8 },
    { country: 'UAE', compliance: 82, shipments: 23, risk: 35 },
    { country: 'India', compliance: 86, shipments: 34, risk: 28 }
  ];

  const complianceTrends = [
    { period: 'Jan', value: 82 },
    { period: 'Feb', value: 84 },
    { period: 'Mar', value: 83 },
    { period: 'Apr', value: 86 },
    { period: 'May', value: 85 },
    { period: 'Jun', value: 88 },
    { period: 'Jul', value: 87 },
    { period: 'Aug', value: 89 }
  ];

  const upcomingRegulations = [
    { title: 'US FDA Documentation Update', effectiveDate: '2024-09-01', impact: 'high', affectedShipments: 8 },
    { title: 'EU Environmental Packaging', effectiveDate: '2024-10-15', impact: 'medium', affectedShipments: 12 },
    { title: 'UK Post-Brexit Import Rules', effectiveDate: '2024-08-20', impact: 'critical', affectedShipments: 5 }
  ];

  const aiInsights = [
    { title: 'Compliance Improvement', description: 'Overall compliance improved by 5% this month due to automated document validation', priority: 'high' },
    { title: 'Risk Reduction', description: 'Trade risk index decreased by 12% after implementing new monitoring protocols', priority: 'medium' },
    { title: 'Documentation Efficiency', description: 'AI-powered document processing reduced validation time by 40%', priority: 'high' }
  ];

  const complianceAlerts = [
    {
      id: 'CA001',
      supplier: 'ABC Manufacturing',
      issue: 'ISO Certificate expires in 20 days',
      affected: 12,
      aiRecommendation: 'Request renewal documents',
      severity: 'high'
    },
    {
      id: 'CA002',
      supplier: 'Global Components Ltd.',
      issue: 'Import Export License expires in 45 days',
      affected: 8,
      aiRecommendation: 'Schedule renewal process',
      severity: 'medium'
    },
    {
      id: 'CA003',
      supplier: 'TechFlow Systems',
      issue: 'Missing tax documentation',
      affected: 5,
      aiRecommendation: 'Request updated tax certificate',
      severity: 'high'
    }
  ];

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="w-4 h-4 text-green-400" />;
    if (trend < 0) return <ArrowDown className="w-4 h-4 text-red-400" />;
    return <Activity className="w-4 h-4 text-slate-400" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-400';
    if (trend < 0) return 'text-red-400';
    return 'text-slate-400';
  };

  const getComplianceColor = (value: number) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Layers className="w-6 h-6 text-pink-400" />
            Executive Compliance Intelligence Dashboard™
          </h2>
          <p className="text-slate-400">Comprehensive compliance analytics and executive insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Executive Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {executiveMetrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`w-5 h-5 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
              <div className="flex items-center gap-1">
                {getTrendIcon(metric.trend)}
                <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                  {metric.trend > 0 ? '+' : ''}{metric.trend}%
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metric.value}%</div>
            <div className="text-sm text-slate-400">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Country Heat Map */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-pink-400" />
          Country Compliance Heat Map
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {countryCompliance.map((country, idx) => (
            <motion.div
              key={country.country}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-semibold text-white">{country.country}</span>
                <div className={`w-3 h-3 rounded-full ${getComplianceColor(country.compliance)}`} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Compliance</span>
                  <span className={`font-bold ${country.compliance >= 90 ? 'text-green-400' : country.compliance >= 75 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {country.compliance}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Shipments</span>
                  <span className="text-white">{country.shipments}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Risk</span>
                  <span className={`font-bold ${country.risk <= 20 ? 'text-green-400' : country.risk <= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {country.risk}
                  </span>
                </div>
              </div>
              <div className="mt-3 w-full bg-slate-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getComplianceColor(country.compliance)}`}
                  style={{ width: `${country.compliance}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Compliance Trends */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-pink-400" />
            Compliance Trends
          </h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {complianceTrends.map((trend, idx) => (
              <motion.div
                key={trend.period}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-full bg-gradient-to-t from-pink-500 to-pink-400 rounded-t"
                  style={{ height: `${trend.value}%` }}
                />
                <span className="text-xs text-slate-400 mt-2">{trend.period}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shipment Status Distribution */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-pink-400" />
            Shipment Status Distribution
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Compliant', value: 65, color: 'bg-green-500' },
              { label: 'At Risk', value: 25, color: 'bg-yellow-500' },
              { label: 'Non Compliant', value: 10, color: 'bg-red-400' }
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-3 h-3 rounded-full {item.color}" />
                <span className="text-sm text-white flex-1">{item.label}</span>
                <span className="text-sm font-bold text-white">{item.value}%</span>
                <div className="w-24 bg-slate-700 rounded-full h-2">
                  <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Regulatory Changes */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          Upcoming Regulatory Changes
        </h3>
        <div className="space-y-3">
          {upcomingRegulations.map((reg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-orange-500/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      reg.impact === 'critical' ? 'bg-red-500/20 text-red-400' :
                      reg.impact === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {reg.impact}
                    </span>
                    <span className="text-xs text-slate-400">{reg.effectiveDate}</span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{reg.title}</h4>
                  <p className="text-sm text-slate-400">{reg.affectedShipments} shipments affected</p>
                </div>
                <AlertTriangle className={`w-5 h-5 ${
                  reg.impact === 'critical' ? 'text-red-400' :
                  reg.impact === 'high' ? 'text-orange-400' :
                  'text-yellow-400'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          AI Compliance Insights
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {aiInsights.map((insight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-lg border ${
                insight.priority === 'high' ? 'bg-blue-500/10 border-blue-500/30' :
                'bg-slate-700/50 border-slate-600/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className={`w-4 h-4 ${insight.priority === 'high' ? 'text-blue-400' : 'text-slate-400'}`} />
                <span className={`text-xs px-2 py-1 rounded ${
                  insight.priority === 'high' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {insight.priority}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-2">{insight.title}</h4>
              <p className="text-xs text-slate-400">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-xs text-slate-400">Clearance Rate</span>
          </div>
          <div className="text-xl font-bold text-white">96%</div>
          <div className="text-xs text-slate-400">First-time approval</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400">Avg. Clearance Time</span>
          </div>
          <div className="text-xl font-bold text-white">24h</div>
          <div className="text-xs text-slate-400">Global average</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TreePine className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400">Sustainability Score</span>
          </div>
          <div className="text-xl font-bold text-white">88%</div>
          <div className="text-xs text-slate-400">Environmental compliance</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-slate-400">Certification Rate</span>
          </div>
          <div className="text-xl font-bold text-white">94%</div>
          <div className="text-xs text-slate-400">Valid certifications</div>
        </div>
      </div>

      {/* Compliance Alert Engine */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#00F5C4]" />
          Compliance Alert Engine
        </h3>
        <div className="space-y-3">
          {complianceAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-slate-700/50 rounded-lg p-4 border ${
                alert.severity === 'high' ? 'border-red-500/50' :
                alert.severity === 'medium' ? 'border-yellow-500/50' :
                'border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${
                    alert.severity === 'high' ? 'text-red-400' :
                    alert.severity === 'medium' ? 'text-yellow-400' :
                    'text-slate-400'
                  }`} />
                  <span className="text-sm font-medium text-white">⚠ COMPLIANCE ALERT</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  alert.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                  alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {alert.severity.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <div className="text-xs text-slate-400">Supplier</div>
                  <div className="text-sm text-white">{alert.supplier}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Affected</div>
                  <div className="text-sm text-white">{alert.affected} suppliers</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-slate-400">Issue</div>
                <div className="text-sm text-white">{alert.issue}</div>
              </div>
              <div className="bg-[#00F5C4]/10 rounded-lg p-3 border border-[#00F5C4]/30">
                <div className="text-xs text-slate-400 mb-1">AI Recommendation</div>
                <div className="text-sm text-[#00F5C4]">{alert.aiRecommendation}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Automatic Compliance Score */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#00F5C4]" />
          Automatic Compliance Score
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-sm text-slate-400 mb-1">Compliance</div>
            <div className="text-2xl font-bold text-[#00F5C4]">96/100</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-sm text-slate-400 mb-1">Documents</div>
            <div className="text-2xl font-bold text-green-400">Complete ✓</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-sm text-slate-400 mb-1">Certifications</div>
            <div className="text-2xl font-bold text-green-400">Valid ✓</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-sm text-slate-400 mb-1">Risk</div>
            <div className="text-2xl font-bold text-yellow-400">Low</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveComplianceIntelligenceDashboard;