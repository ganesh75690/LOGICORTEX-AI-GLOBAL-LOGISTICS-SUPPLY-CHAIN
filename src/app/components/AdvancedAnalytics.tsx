import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Activity, 
  Target, 
  AlertTriangle,
  Brain,
  Zap,
  Clock,
  DollarSign,
  Package,
  Truck,
  Users,
  MapPin,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  Settings,
  ChevronUp,
  ChevronDown,
  Info,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

interface PredictiveInsight {
  id: string;
  title: string;
  description: string;
  category: 'demand' | 'supply' | 'operational' | 'financial' | 'risk';
  confidence: number;
  timeframe: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  trend: 'improving' | 'declining' | 'stable';
  recommendations: string[];
  metrics: {
    current: number;
    predicted: number;
    change: number;
  };
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: 'efficiency' | 'cost' | 'quality' | 'speed';
  unit: string;
}

interface Benchmark {
  id: string;
  name: string;
  current: number;
  industry: number;
  target: number;
  ranking: number;
  total: number;
  category: string;
}

interface RootCause {
  id: string;
  issue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  causes: string[];
  impact: string;
  solutions: string[];
  estimatedFixTime: string;
  cost: number;
}

interface EfficiencyTrend {
  date: string;
  overall: number;
  cost: number;
  speed: number;
  quality: number;
  reliability: number;
}

export function AdvancedAnalytics() {
  const [activeTab, setActiveTab] = useState<'predictive' | 'benchmarking' | 'rootcause' | 'trends' | 'insights'>('predictive');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [expandedInsights, setExpandedInsights] = useState<string[]>([]);

  const [predictiveInsights] = useState<PredictiveInsight[]>([
    {
      id: '1',
      title: 'Demand Surge Prediction',
      description: 'AI models predict 45% increase in demand for electronics in the next 2 weeks due to seasonal trends and market indicators',
      category: 'demand',
      confidence: 92,
      timeframe: '2 weeks',
      impact: 'high',
      trend: 'improving',
      recommendations: [
        'Increase inventory levels for electronic products by 60%',
        'Prepare additional delivery capacity in high-demand zones',
        'Coordinate with suppliers for expedited shipping options',
        'Implement dynamic pricing for premium delivery slots'
      ],
      metrics: {
        current: 1000,
        predicted: 1450,
        change: 45
      }
    },
    {
      id: '2',
      title: 'Route Optimization Opportunity',
      description: 'Machine learning analysis identifies potential 18% reduction in delivery times through route consolidation',
      category: 'operational',
      confidence: 87,
      timeframe: '1 month',
      impact: 'medium',
      trend: 'improving',
      recommendations: [
        'Implement AI-powered route optimization system',
        'Consolidate shipments in high-density areas',
        'Adjust delivery windows for better efficiency',
        'Train drivers on new routing protocols'
      ],
      metrics: {
        current: 24,
        predicted: 19.7,
        change: -18
      }
    },
    {
      id: '3',
      title: 'Supply Chain Risk Alert',
      description: 'Predictive models indicate 65% probability of supplier disruptions in Southeast Asia due to weather patterns',
      category: 'risk',
      confidence: 78,
      timeframe: '3-4 weeks',
      impact: 'high',
      trend: 'declining',
      recommendations: [
        'Diversify supplier base across different regions',
        'Increase safety stock for critical components',
        'Establish backup shipping routes',
        'Create contingency plans for key suppliers'
      ],
      metrics: {
        current: 95,
        predicted: 65,
        change: -30
      }
    },
    {
      id: '4',
      title: 'Cost Optimization Potential',
      description: 'Analysis reveals 12% cost reduction opportunity through fuel efficiency and load optimization',
      category: 'financial',
      confidence: 85,
      timeframe: '6 weeks',
      impact: 'medium',
      trend: 'improving',
      recommendations: [
        'Implement fuel-efficient routing algorithms',
        'Optimize load planning to reduce empty miles',
        'Negotiate better fuel rates with suppliers',
        'Invest in fuel-efficient vehicle fleet'
      ],
      metrics: {
        current: 100000,
        predicted: 88000,
        change: -12
      }
    }
  ]);

  const [performanceMetrics] = useState<PerformanceMetric[]>([
    { id: '1', name: 'On-Time Delivery Rate', value: 94.2, target: 95, change: 2.3, trend: 'up', category: 'quality', unit: '%' },
    { id: '2', name: 'Cost Per Delivery', value: 12.45, target: 11.50, change: -1.2, trend: 'down', category: 'cost', unit: '₹' },
    { id: '3', name: 'Vehicle Utilization', value: 78.5, target: 85, change: 4.7, trend: 'up', category: 'efficiency', unit: '%' },
    { id: '4', name: 'Average Delivery Time', value: 2.8, target: 2.5, change: -0.3, trend: 'down', category: 'speed', unit: 'hrs' },
    { id: '5', name: 'Customer Satisfaction', value: 4.6, target: 4.8, change: 0.2, trend: 'up', category: 'quality', unit: '★' },
    { id: '6', name: 'Fuel Efficiency', value: 8.2, target: 9.0, change: 0.8, trend: 'up', category: 'efficiency', unit: 'mpg' }
  ]);

  const [benchmarks] = useState<Benchmark[]>([
    { id: '1', name: 'Delivery Speed', current: 2.8, industry: 3.2, target: 2.5, ranking: 12, total: 50, category: 'Speed' },
    { id: '2', name: 'Cost Efficiency', current: 12.45, industry: 14.20, target: 11.50, ranking: 8, total: 50, category: 'Cost' },
    { id: '3', name: 'Reliability', current: 94.2, industry: 89.5, target: 95, ranking: 5, total: 50, category: 'Quality' },
    { id: '4', name: 'Technology Adoption', current: 87, industry: 72, target: 90, ranking: 3, total: 50, category: 'Innovation' },
    { id: '5', name: 'Sustainability', current: 76, industry: 68, target: 85, ranking: 15, total: 50, category: 'ESG' }
  ]);

  const [rootCauses] = useState<RootCause[]>([
    {
      id: '1',
      issue: 'Delayed Deliveries in Northeast Region',
      severity: 'high',
      causes: [
        'Insufficient driver coverage during peak hours',
        'Traffic congestion on primary routes',
        'Poor weather conditions affecting visibility',
        'Inadequate route planning algorithms'
      ],
      impact: 'Affecting 23% of deliveries in Northeast region, causing 2-3 hour delays and customer dissatisfaction',
      solutions: [
        'Hire 3 additional drivers for Northeast region',
        'Implement AI-powered route optimization',
        'Establish backup routes for high-traffic areas',
        'Provide drivers with weather alert systems'
      ],
      estimatedFixTime: '2 weeks',
      cost: 15000
    },
    {
      id: '2',
      issue: 'High Fuel Costs in West Coast Operations',
      severity: 'medium',
      causes: [
        'Inefficient routing causing excess mileage',
        'Older vehicle fleet with poor fuel economy',
        'Fuel price volatility in California',
        'Lack of fuel management system'
      ],
      impact: 'Fuel costs 18% above industry average, reducing profit margins by 3.2%',
      solutions: [
        'Implement route optimization software',
        'Phase in fuel-efficient vehicles',
        'Establish fuel hedging program',
        'Install fuel monitoring systems'
      ],
      estimatedFixTime: '6 weeks',
      cost: 45000
    },
    {
      id: '3',
      issue: 'Inventory Stockouts at Warehouse B',
      severity: 'critical',
      causes: [
        'Inaccurate demand forecasting',
        'Delayed supplier deliveries',
        'Insufficient safety stock levels',
        'Poor inventory management processes'
      ],
      impact: '35% increase in order cancellations, 15% customer loss rate, ₹25K daily revenue loss',
      solutions: [
        'Implement AI-powered demand forecasting',
        'Increase safety stock to 30 days',
        'Diversify supplier base',
        'Upgrade inventory management system'
      ],
      estimatedFixTime: '4 weeks',
      cost: 35000
    }
  ]);

  const [efficiencyTrends] = useState<EfficiencyTrend[]>([
    { date: 'Jan', overall: 82, cost: 75, speed: 78, quality: 85, reliability: 88 },
    { date: 'Feb', overall: 84, cost: 78, speed: 80, quality: 87, reliability: 89 },
    { date: 'Mar', overall: 83, cost: 76, speed: 82, quality: 86, reliability: 88 },
    { date: 'Apr', overall: 86, cost: 80, speed: 84, quality: 88, reliability: 90 },
    { date: 'May', overall: 87, cost: 82, speed: 85, quality: 89, reliability: 91 },
    { date: 'Jun', overall: 89, cost: 84, speed: 87, quality: 91, reliability: 93 }
  ]);

  const tabs = [
    { id: 'predictive' as const, name: 'Predictive', icon: Brain, count: predictiveInsights.filter(i => i.impact === 'critical').length },
    { id: 'benchmarking' as const, name: 'Benchmarking', icon: Target, count: 0 },
    { id: 'rootcause' as const, name: 'Root Cause', icon: AlertTriangle, count: rootCauses.filter(r => r.severity === 'critical').length },
    { id: 'trends' as const, name: 'Trends', icon: TrendingUp, count: 0 },
    { id: 'insights' as const, name: 'Insights', icon: Zap, count: 0 }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'demand': return 'bg-blue-500/20 text-blue-400';
      case 'supply': return 'bg-green-500/20 text-green-400';
      case 'operational': return 'bg-purple-500/20 text-purple-400';
      case 'financial': return 'bg-yellow-500/20 text-yellow-400';
      case 'risk': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const radarData = performanceMetrics.map(metric => ({
    subject: metric.name,
    value: (metric.value / metric.target) * 100,
    fullMark: 100
  }));

  const pieData = [
    { name: 'Efficiency', value: 35, color: '#3b82f6' },
    { name: 'Cost', value: 25, color: '#10b981' },
    { name: 'Quality', value: 25, color: '#f59e0b' },
    { name: 'Speed', value: 15, color: '#8b5cf6' }
  ];

  const toggleInsightExpansion = (insightId: string) => {
    setExpandedInsights(prev => 
      prev.includes(insightId) 
        ? prev.filter(id => id !== insightId)
        : [...prev, insightId]
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          Advanced Analytics & Insights
        </h2>
        <div className="flex items-center gap-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white"
            aria-label="Select timeframe for analytics"
            title="Select timeframe for analytics"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button 
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            aria-label="Refresh analytics data"
          >
            <RefreshCw className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-700/50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
              {tab.count > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'predictive' && (
          <motion.div
            key="predictive"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {predictiveInsights.map(insight => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-medium">{insight.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(insight.category)}`}>
                        {insight.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getImpactColor(insight.impact)}`}>
                        {insight.impact}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-3">{insight.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Brain className="w-3 h-3 text-purple-400" />
                        {insight.confidence}% confidence
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-400" />
                        {insight.timeframe}
                      </span>
                      <span className={`flex items-center gap-1 ${
                        insight.trend === 'improving' ? 'text-green-400' :
                        insight.trend === 'declining' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {insight.trend === 'improving' ? <TrendingUp className="w-3 h-3" /> :
                         insight.trend === 'declining' ? <TrendingDown className="w-3 h-3" /> :
                         <Activity className="w-3 h-3" />}
                        {insight.trend}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleInsightExpansion(insight.id)}
                    className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                  >
                    {expandedInsights.includes(insight.id) ? 
                      <ChevronUp className="w-4 h-4 text-slate-400" /> :
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    }
                  </button>
                </div>

                {/* Metrics Comparison */}
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Current</p>
                    <p className="text-lg font-medium text-white">{insight.metrics.current.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Predicted</p>
                    <p className={`text-lg font-medium ${
                      insight.metrics.change > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {insight.metrics.predicted.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Change</p>
                    <p className={`text-lg font-medium flex items-center gap-1 ${
                      insight.metrics.change > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {insight.metrics.change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      {Math.abs(insight.metrics.change)}%
                    </p>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedInsights.includes(insight.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-700/50 pt-3 mt-3"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-white font-medium mb-2">Recommendations</h4>
                          <div className="space-y-1">
                            {insight.recommendations.map((rec, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Action Timeline</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-400">Immediate</span>
                              <span className="text-blue-400">Assessment</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-400">1 week</span>
                              <span className="text-blue-400">Planning</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-400">2-4 weeks</span>
                              <span className="text-blue-400">Implementation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'benchmarking' && (
          <motion.div
            key="benchmarking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-white font-medium mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  {performanceMetrics.map(metric => (
                    <div key={metric.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-300 text-sm">{metric.name}</span>
                          <span className="text-white text-sm font-medium">{metric.value}{metric.unit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                metric.value >= metric.target ? 'bg-green-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500">Target: {metric.target}{metric.unit}</span>
                        </div>
                      </div>
                      <div className={`ml-3 ${
                        metric.trend === 'up' ? 'text-green-400' :
                        metric.trend === 'down' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> :
                         metric.trend === 'down' ? <TrendingDown className="w-4 h-4" /> :
                         <Activity className="w-4 h-4" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry Benchmarking */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-white font-medium mb-4">Industry Benchmarking</h3>
                <div className="space-y-3">
                  {benchmarks.map(benchmark => (
                    <div key={benchmark.id} className="p-3 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">{benchmark.name}</span>
                        <span className="text-xs text-green-400">#{benchmark.ranking}/{benchmark.total}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-slate-500">Current</p>
                          <p className="text-blue-400 font-medium">{benchmark.current}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Industry</p>
                          <p className="text-slate-400 font-medium">{benchmark.industry}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Target</p>
                          <p className="text-green-400 font-medium">{benchmark.target}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">Performance Radar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                  <PolarRadiusAxis stroke="#334155" />
                  <Radar name="Performance" dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {activeTab === 'rootcause' && (
          <motion.div
            key="rootcause"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {rootCauses.map(cause => (
              <div key={cause.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">{cause.issue}</h3>
                    <p className="text-slate-400 text-sm mb-3">{cause.impact}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className={`px-2 py-1 rounded ${
                        cause.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                        cause.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        cause.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {cause.severity} severity
                      </span>
                      <span className="text-slate-400">Fix time: {cause.estimatedFixTime}</span>
                      <span className="text-slate-400">Cost: ₹{cause.cost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Root Causes</h4>
                    <div className="space-y-1">
                      {cause.causes.map((rootCause, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{rootCause}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Solutions</h4>
                    <div className="space-y-1">
                      {cause.solutions.map((solution, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{solution}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'trends' && (
          <motion.div
            key="trends"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Efficiency Trends */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-white font-medium mb-4">Efficiency Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={efficiencyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="overall" stackId="1" stroke="#a855f7" fill="#a855f7" />
                    <Area type="monotone" dataKey="cost" stackId="1" stroke="#10b981" fill="#10b981" />
                    <Area type="monotone" dataKey="speed" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                    <Area type="monotone" dataKey="quality" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                    <Area type="monotone" dataKey="reliability" stackId="1" stroke="#ef4444" fill="#ef4444" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Category Distribution */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-white font-medium mb-4">Performance Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Long-term Trends */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">6-Month Performance Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">+23%</div>
                  <div className="text-slate-400 text-sm mb-1">Overall Efficiency</div>
                  <div className="text-xs text-slate-500">vs. 6 months ago</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">-18%</div>
                  <div className="text-slate-400 text-sm mb-1">Cost Reduction</div>
                  <div className="text-xs text-slate-500">vs. 6 months ago</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">+15%</div>
                  <div className="text-slate-400 text-sm mb-1">Customer Satisfaction</div>
                  <div className="text-xs text-slate-500">vs. 6 months ago</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-medium mb-1">AI-Powered Insights Summary</h3>
                  <p className="text-slate-400 text-sm">Automated analysis of your supply chain performance</p>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 text-sm">Live Analysis</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Efficiency Score</span>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">87%</div>
                  <div className="text-xs text-green-400">+5% this month</div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Risk Level</span>
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">Medium</div>
                  <div className="text-xs text-yellow-400">3 active risks</div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Opportunities</span>
                    <Zap className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">12</div>
                  <div className="text-xs text-purple-400">Ready to implement</div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Predicted Savings</span>
                    <DollarSign className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">₹45K</div>
                  <div className="text-xs text-green-400">Next 30 days</div>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="space-y-3">
              <h3 className="text-white font-medium">Key Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Route Optimization Success</h4>
                      <p className="text-slate-400 text-sm">AI routing has reduced delivery times by 18% in urban areas</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Supplier Risk Detected</h4>
                      <p className="text-slate-400 text-sm">Weather patterns suggest potential disruptions in 2 weeks</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Demand Growth Opportunity</h4>
                      <p className="text-slate-400 text-sm">Seasonal trends indicate 45% demand increase next month</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Cost Optimization Available</h4>
                      <p className="text-slate-400 text-sm">Fuel efficiency improvements could save ₹12K monthly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
