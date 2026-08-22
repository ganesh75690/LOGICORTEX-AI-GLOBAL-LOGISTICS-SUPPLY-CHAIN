import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Package, 
  Truck, 
  Users, 
  Target, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  Activity,
  Brain,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Info,
  Gauge,
  Shield,
  Wind,
  Battery,
  X
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
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

interface OptimizationFactor {
  id: string;
  name: string;
  current: number;
  target: number;
  weight: number;
  impact: 'high' | 'medium' | 'low';
  status: 'optimal' | 'improving' | 'declining' | 'critical';
  trend: number;
  actions: string[];
}

interface OptimizationRule {
  id: string;
  name: string;
  description: string;
  category: 'cost' | 'speed' | 'reliability' | 'efficiency';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'inactive' | 'testing';
  performance: number;
  savings: number;
  lastRun: string;
  conditions: string[];
}

interface EfficiencyMetric {
  id: string;
  name: string;
  value: number;
  previous: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'cost' | 'speed' | 'reliability' | 'efficiency';
}

interface AutomationOpportunity {
  id: string;
  title: string;
  description: string;
  category: 'routing' | 'inventory' | 'scheduling' | 'maintenance' | 'pricing';
  impact: {
    cost: number;
    time: number;
    efficiency: number;
  };
  complexity: 'low' | 'medium' | 'high';
  status: 'available' | 'in-progress' | 'implemented';
  confidence: number;
}

export function SystemOptimization() {
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'automation' | 'metrics' | 'balance'>('overview');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedFactors, setSelectedFactors] = useState<string[]>(['cost', 'speed', 'reliability']);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null);
  const [ruleStatuses, setRuleStatuses] = useState<Record<string, 'active' | 'inactive' | 'testing'>>({});
  const [automationStatuses, setAutomationStatuses] = useState<Record<string, 'available' | 'in-progress' | 'implemented'>>({});
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    visible: boolean;
  }>({ message: '', type: 'info', visible: false });
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showImpactModal, setShowImpactModal] = useState(false);
  const [showAutoBalanceModal, setShowAutoBalanceModal] = useState(false);
  const [autoBalanceEnabled, setAutoBalanceEnabled] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  const [optimizationFactors] = useState<OptimizationFactor[]>([
    {
      id: '1',
      name: 'Cost Efficiency',
      current: 78,
      target: 85,
      weight: 30,
      impact: 'high',
      status: 'improving',
      trend: 5.2,
      actions: [
        'Optimize fuel consumption through route planning',
        'Reduce empty miles through better load consolidation',
        'Negotiate better supplier rates',
        'Implement predictive maintenance scheduling'
      ]
    },
    {
      id: '2',
      name: 'Delivery Speed',
      current: 82,
      target: 90,
      weight: 25,
      impact: 'high',
      status: 'improving',
      trend: 3.8,
      actions: [
        'Implement AI-powered route optimization',
        'Pre-position inventory closer to demand centers',
        'Use real-time traffic data for routing',
        'Optimize driver scheduling and availability'
      ]
    },
    {
      id: '3',
      name: 'Service Reliability',
      current: 91,
      target: 95,
      weight: 25,
      impact: 'medium',
      status: 'optimal',
      trend: 1.2,
      actions: [
        'Maintain current performance levels',
        'Monitor for early warning signs',
        'Continue preventive maintenance programs',
        'Keep backup resources available'
      ]
    },
    {
      id: '4',
      name: 'Resource Utilization',
      current: 74,
      target: 85,
      weight: 20,
      impact: 'medium',
      status: 'declining',
      trend: -2.1,
      actions: [
        'Improve vehicle and driver scheduling',
        'Balance workload across resources',
        'Implement dynamic resource allocation',
        'Reduce idle time through better planning'
      ]
    }
  ]);

  const [optimizationRules] = useState<OptimizationRule[]>([
    {
      id: '1',
      name: 'Dynamic Route Optimization',
      description: 'Automatically adjust routes based on real-time traffic and demand',
      category: 'speed',
      priority: 'critical',
      status: 'active',
      performance: 94,
      savings: 25000,
      lastRun: '2 hours ago',
      conditions: ['Traffic data available', 'GPS tracking active', 'AI models trained']
    },
    {
      id: '2',
      name: 'Load Consolidation Engine',
      description: 'Automatically combine shipments to maximize vehicle capacity',
      category: 'cost',
      priority: 'high',
      status: 'active',
      performance: 87,
      savings: 18000,
      lastRun: '1 hour ago',
      conditions: ['Multiple shipments available', 'Capacity data accurate', 'Time windows compatible']
    },
    {
      id: '3',
      name: 'Predictive Maintenance',
      description: 'Schedule maintenance based on vehicle usage patterns and sensor data',
      category: 'reliability',
      priority: 'medium',
      status: 'testing',
      performance: 78,
      savings: 12000,
      lastRun: '6 hours ago',
      conditions: ['IoT sensors active', 'Historical data sufficient', 'Maintenance slots available']
    },
    {
      id: '4',
      name: 'Dynamic Pricing',
      description: 'Adjust delivery pricing based on demand, capacity, and urgency',
      category: 'efficiency',
      priority: 'medium',
      status: 'inactive',
      performance: 0,
      savings: 35000,
      lastRun: 'Never',
      conditions: ['Market demand data', 'Competitor pricing', 'Customer willingness to pay']
    }
  ]);

  const [efficiencyMetrics] = useState<EfficiencyMetric[]>([
    { id: '1', name: 'Cost Per Delivery', value: 11.45, previous: 12.30, target: 10.50, unit: '₹', trend: 'down', category: 'cost' },
    { id: '2', name: 'Delivery Time', value: 2.6, previous: 2.8, target: 2.5, unit: 'hrs', trend: 'down', category: 'speed' },
    { id: '3', name: 'On-Time Rate', value: 94.2, previous: 92.8, target: 95, unit: '%', trend: 'up', category: 'reliability' },
    { id: '4', name: 'Vehicle Utilization', value: 76.8, previous: 74.2, target: 85, unit: '%', trend: 'up', category: 'efficiency' },
    { id: '5', name: 'Fuel Efficiency', value: 8.4, previous: 8.1, target: 9.0, unit: 'mpg', trend: 'up', category: 'efficiency' },
    { id: '6', name: 'Customer Satisfaction', value: 4.7, previous: 4.6, target: 4.8, unit: '★', trend: 'up', category: 'reliability' }
  ]);

  const [automationOpportunities] = useState<AutomationOpportunity[]>([
    {
      id: '1',
      title: 'Intelligent Load Planning',
      description: 'AI-powered system to automatically optimize load distribution across vehicles',
      category: 'routing',
      impact: { cost: 15000, time: 60, efficiency: 12 },
      complexity: 'medium',
      status: 'available',
      confidence: 92
    },
    {
      id: '2',
      title: 'Predictive Demand Forecasting',
      description: 'Machine learning models to predict demand patterns and optimize inventory',
      category: 'inventory',
      impact: { cost: 22000, time: 45, efficiency: 18 },
      complexity: 'high',
      status: 'in-progress',
      confidence: 85
    },
    {
      id: '3',
      title: 'Dynamic Driver Scheduling',
      description: 'Automated system to assign drivers based on availability, skills, and performance',
      category: 'scheduling',
      impact: { cost: 8000, time: 30, efficiency: 8 },
      complexity: 'low',
      status: 'available',
      confidence: 88
    },
    {
      id: '4',
      title: 'Smart Maintenance Scheduling',
      description: 'IoT-based predictive maintenance to minimize downtime and maximize uptime',
      category: 'maintenance',
      impact: { cost: 12000, time: 40, efficiency: 15 },
      complexity: 'medium',
      status: 'available',
      confidence: 79
    }
  ]);

  const tabs = [
    { id: 'overview' as const, name: 'Overview', icon: Gauge, count: 0 },
    { id: 'rules' as const, name: 'Rules', icon: Settings, count: optimizationRules.filter(r => r.status === 'active').length },
    { id: 'automation' as const, name: 'Automation', icon: Zap, count: automationOpportunities.filter(a => a.status === 'available').length },
    { id: 'metrics' as const, name: 'Metrics', icon: BarChart3, count: 0 },
    { id: 'balance' as const, name: 'Balance', icon: Activity, count: 0 }
  ];

  const calculateOverallEfficiency = () => {
    const weightedSum = optimizationFactors.reduce((sum, factor) => {
      return sum + (factor.current * factor.weight);
    }, 0);
    const totalWeight = optimizationFactors.reduce((sum, factor) => sum + factor.weight, 0);
    return weightedSum / totalWeight;
  };

  const calculatePotentialSavings = () => {
    return automationOpportunities
      .filter(opp => opp.status === 'available')
      .reduce((total, opp) => total + opp.impact.cost, 0);
  };

  const radarData = optimizationFactors.map(factor => ({
    subject: factor.name,
    value: factor.current,
    fullMark: 100
  }));

  const pieData = [
    { name: 'Cost', value: 30, color: '#10b981' },
    { name: 'Speed', value: 25, color: '#3b82f6' },
    { name: 'Reliability', value: 25, color: '#f59e0b' },
    { name: 'Efficiency', value: 20, color: '#8b5cf6' }
  ];

  const trendData = [
    { month: 'Jan', efficiency: 75, cost: 85, speed: 78, reliability: 88 },
    { month: 'Feb', efficiency: 77, cost: 83, speed: 80, reliability: 89 },
    { month: 'Mar', efficiency: 79, cost: 81, speed: 82, reliability: 90 },
    { month: 'Apr', efficiency: 81, cost: 79, speed: 84, reliability: 91 },
    { month: 'May', efficiency: 83, cost: 77, speed: 86, reliability: 92 },
    { month: 'Jun', efficiency: 85, cost: 75, speed: 88, reliability: 93 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500/20 text-green-400';
      case 'improving': return 'bg-blue-500/20 text-blue-400';
      case 'declining': return 'bg-red-500/20 text-red-400';
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'testing': return 'bg-yellow-500/20 text-yellow-400';
      case 'inactive': return 'bg-slate-500/20 text-slate-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error') => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const runOptimization = async () => {
    setIsOptimizing(true);
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsOptimizing(false);
    showNotification('Optimization completed successfully!', 'success');
  };

  const handleConfigureRule = (ruleId: string) => {
    const rule = optimizationRules.find(r => r.id === ruleId);
    setSelectedRule(ruleId);
    setModalContent(rule);
    setShowConfigureModal(true);
  };

  const handleViewLogs = (ruleId: string) => {
    const rule = optimizationRules.find(r => r.id === ruleId);
    setSelectedRule(ruleId);
    setModalContent({
      ...rule,
      logs: [
        { timestamp: '2024-01-15 14:32:10', level: 'INFO', message: 'Rule execution started' },
        { timestamp: '2024-01-15 14:32:15', level: 'SUCCESS', message: 'Route optimization completed successfully' },
        { timestamp: '2024-01-15 14:32:20', level: 'INFO', message: 'Cost savings calculated: ₹2,500' },
        { timestamp: '2024-01-15 14:32:25', level: 'WARNING', message: 'Traffic congestion detected on route A-3' },
        { timestamp: '2024-01-15 14:32:30', level: 'INFO', message: 'Alternative route suggested' },
        { timestamp: '2024-01-15 14:32:35', level: 'SUCCESS', message: 'Rule execution completed' }
      ]
    });
    setShowLogsModal(true);
  };

  const handleToggleRule = (ruleId: string) => {
    const rule = optimizationRules.find(r => r.id === ruleId);
    if (rule) {
      const newStatus = rule.status === 'active' ? 'inactive' : 'active';
      setRuleStatuses(prev => ({ ...prev, [ruleId]: newStatus }));
      showNotification(
        `${rule?.name} ${newStatus === 'active' ? 'enabled' : 'disabled'}`, 
        newStatus === 'active' ? 'success' : 'warning'
      );
    }
  };

  const handleViewDetails = (automationId: string) => {
    const automation = automationOpportunities.find(a => a.id === automationId);
    setSelectedAutomation(automationId);
    setModalContent(automation);
    setShowDetailsModal(true);
  };

  const handleAssessImpact = (automationId: string) => {
    const automation = automationOpportunities.find(a => a.id === automationId);
    if (automation) {
      setSelectedAutomation(automationId);
      setModalContent({
        ...automation,
        impactDetails: {
          costBreakdown: {
            implementation: automation.impact.cost * 0.3,
            training: automation.impact.cost * 0.2,
            maintenance: automation.impact.cost * 0.1,
            savings: automation.impact.cost * 0.4
          },
          timeBreakdown: {
            setup: automation.impact.time * 0.4,
            training: automation.impact.time * 0.3,
            integration: automation.impact.time * 0.3
          },
          riskFactors: [
            { factor: 'Technical Complexity', level: 'Medium' },
            { factor: 'User Adoption', level: 'Low' },
            { factor: 'System Integration', level: 'Medium' }
          ],
          roi: {
            paybackPeriod: '3-6 months',
            annualSavings: automation.impact.cost * 12,
            riskLevel: 'Low'
          }
        }
      });
      setShowImpactModal(true);
    }
  };

  const handleImplementAutomation = (automationId: string) => {
    const automation = automationOpportunities.find(a => a.id === automationId);
    setAutomationStatuses(prev => ({ ...prev, [automationId]: 'in-progress' }));
    showNotification(`Starting implementation: ${automation?.title}`, 'info');
    
    // Simulate implementation process
    setTimeout(() => {
      setAutomationStatuses(prev => ({ ...prev, [automationId]: 'implemented' }));
      showNotification(`Successfully implemented: ${automation?.title}`, 'success');
    }, 2000);
  };

  const handleAutoBalance = () => {
    if (autoBalanceEnabled) {
      setShowAutoBalanceModal(true);
    } else {
      setAutoBalanceEnabled(true);
      showNotification('Auto-Balance mode activated! AI is now optimizing your system.', 'success');
    }
  };

  const handleDisableAutoBalance = () => {
    setAutoBalanceEnabled(false);
    setShowAutoBalanceModal(false);
    showNotification('Auto-Balance mode deactivated.', 'warning');
  };

  const overallEfficiency = calculateOverallEfficiency();
  const potentialSavings = calculatePotentialSavings();

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Gauge className="w-5 h-5 text-green-400" />
          System Optimization Engine
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Auto-optimization active</span>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
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
                ? 'text-green-400 border-b-2 border-green-400'
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
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Overall Efficiency Score */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-6 border border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-medium mb-1">System Efficiency Score</h3>
                  <p className="text-slate-400 text-sm">Real-time optimization performance</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-400">{overallEfficiency.toFixed(1)}%</div>
                  <div className="text-xs text-green-400">+2.3% this week</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {optimizationFactors.map(factor => (
                  <div key={factor.id} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 text-sm">{factor.name}</span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(factor.status)}`}>
                        {factor.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-lg font-medium">{factor.current}%</span>
                      <span className={`text-xs flex items-center gap-1 ${
                        factor.trend > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {factor.trend > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {Math.abs(factor.trend)}%
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            factor.current >= factor.target ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${factor.current}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-medium">Auto-Optimization</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                <p className="text-slate-400 text-sm mb-3">AI-powered optimization running continuously</p>
                <button
                  onClick={runOptimization}
                  disabled={isOptimizing}
                  className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isOptimizing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Run Optimization
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-white font-medium">Potential Savings</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-3">Available automation opportunities</p>
                <div className="text-2xl font-bold text-green-400">₹{potentialSavings.toLocaleString()}/mo</div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium">Active Rules</span>
                  </div>
                  <span className="text-blue-400 text-sm font-medium">{optimizationRules.filter(r => r.status === 'active').length}</span>
                </div>
                <p className="text-slate-400 text-sm mb-3">Optimization rules currently running</p>
                <div className="text-2xl font-bold text-blue-400">{optimizationRules.reduce((sum, rule) => sum + rule.savings, 0).toLocaleString()}/mo</div>
              </div>
            </div>

            {/* Efficiency Radar */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">Efficiency Balance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                  <PolarRadiusAxis stroke="#334155" />
                  <Radar name="Current" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {activeTab === 'rules' && (
          <motion.div
            key="rules"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {optimizationRules.map(rule => (
              <div key={rule.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-medium">{rule.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(rule.priority)}`}>
                        {rule.priority}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(rule.status)}`}>
                        {rule.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{rule.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-purple-400" />
                        {rule.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-green-400" />
                        ₹{rule.savings.toLocaleString()}/mo
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-400" />
                        {rule.lastRun}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400 mb-1">{rule.performance}%</div>
                    <div className="text-xs text-slate-500">Performance</div>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-1">Conditions:</p>
                  <div className="flex flex-wrap gap-1">
                    {rule.conditions.map((condition, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleConfigureRule(rule.id)}
                      className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                    >
                      Configure
                    </button>
                    <button 
                      onClick={() => handleViewLogs(rule.id)}
                      className="px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors text-sm"
                    >
                      View Logs
                    </button>
                  </div>
                  <button 
                    onClick={() => handleToggleRule(rule.id)}
                    className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
                      (ruleStatuses[rule.id] || rule.status) === 'active' 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    }`}
                  >
                    {(ruleStatuses[rule.id] || rule.status) === 'active' ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'automation' && (
          <motion.div
            key="automation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {automationOpportunities.map(opp => (
              <div key={opp.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-medium">{opp.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        opp.complexity === 'low' ? 'bg-green-500/20 text-green-400' :
                        opp.complexity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {opp.complexity}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(opp.status)}`}>
                        {opp.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{opp.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Brain className="w-3 h-3 text-purple-400" />
                        {opp.confidence}% confidence
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-blue-400" />
                        {opp.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Cost Impact</p>
                    <p className="text-lg font-medium text-green-400">₹{opp.impact.cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Time Impact</p>
                    <p className="text-lg font-medium text-blue-400">{opp.impact.time}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Efficiency Impact</p>
                    <p className="text-lg font-medium text-purple-400">{opp.impact.efficiency}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleViewDetails(opp.id)}
                      className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleAssessImpact(opp.id)}
                      className="px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors text-sm"
                    >
                      Assess Impact
                    </button>
                  </div>
                  {(automationStatuses[opp.id] || opp.status) === 'available' && (
                    <button 
                      onClick={() => handleImplementAutomation(opp.id)}
                      disabled={automationStatuses[opp.id] === 'in-progress'}
                      className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
                        automationStatuses[opp.id] === 'in-progress'
                          ? 'bg-yellow-500/20 text-yellow-400 cursor-not-allowed'
                          : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                      }`}
                    >
                      {automationStatuses[opp.id] === 'in-progress' ? 'Implementing...' : 'Implement'}
                    </button>
                  )}
                  {(automationStatuses[opp.id] || opp.status) === 'in-progress' && (
                    <button 
                      disabled
                      className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg cursor-not-allowed text-sm"
                    >
                      Implementing...
                    </button>
                  )}
                  {(automationStatuses[opp.id] || opp.status) === 'implemented' && (
                    <button 
                      disabled
                      className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg cursor-not-allowed text-sm"
                    >
                      ✓ Implemented
                    </button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'metrics' && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Metrics Grid */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-white font-medium mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  {efficiencyMetrics.map(metric => (
                    <div key={metric.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm font-medium">{metric.name}</span>
                          <span className={`text-lg font-medium ${
                            metric.trend === 'up' ? 'text-green-400' :
                            metric.trend === 'down' ? 'text-red-400' :
                            'text-yellow-400'
                          }`}>
                            {metric.value}{metric.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500">Previous: {metric.previous}{metric.unit}</span>
                          <span className="text-slate-500">Target: {metric.target}{metric.unit}</span>
                        </div>
                      </div>
                      <div className={`ml-3 ${
                        metric.trend === 'up' ? 'text-green-400' :
                        metric.trend === 'down' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> :
                         metric.trend === 'down' ? <ArrowDown className="w-4 h-4" /> :
                         <Activity className="w-4 h-4" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trend Chart */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-white font-medium mb-4">Efficiency Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
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
                    <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="speed" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="reliability" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">Optimization Priority Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {activeTab === 'balance' && (
          <motion.div
            key="balance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/30">
              <h3 className="text-white font-medium mb-4">Cost-Speed-Reliability Balance</h3>
              <p className="text-slate-400 text-sm mb-4">AI algorithms continuously optimize the balance between cost, speed, and reliability based on business priorities</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Cost Priority</span>
                    <DollarSign className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-green-400 mb-1">35%</div>
                  <div className="text-xs text-green-400">Weight in optimization</div>
                  <div className="mt-2">
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '35%' }} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Speed Priority</span>
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">40%</div>
                  <div className="text-xs text-blue-400">Weight in optimization</div>
                  <div className="mt-2">
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Reliability Priority</span>
                    <Shield className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">25%</div>
                  <div className="text-xs text-purple-400">Weight in optimization</div>
                  <div className="mt-2">
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium mb-1">Balance Score</p>
                  <p className="text-slate-400 text-sm">Overall system balance efficiency</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-400">92%</div>
                  <div className="text-xs text-green-400">Optimal balance</div>
                </div>
              </div>
            </div>

            {/* Balance Controls */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">Balance Controls</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white text-sm font-medium">Cost Optimization Level</span>
                    <p className="text-slate-400 text-xs">Higher priority reduces costs but may affect speed</p>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="35"
                    className="w-32"
                    id="cost-optimization-level"
                    aria-label="Cost Optimization Level"
                    title="Adjust cost optimization priority (0-100%)"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white text-sm font-medium">Speed Optimization Level</span>
                    <p className="text-slate-400 text-xs">Higher priority improves speed but increases costs</p>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="40"
                    className="w-32"
                    id="speed-optimization-level"
                    aria-label="Speed Optimization Level"
                    title="Adjust speed optimization priority (0-100%)"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white text-sm font-medium">Reliability Optimization Level</span>
                    <p className="text-slate-400 text-xs">Higher priority ensures reliability but may reduce efficiency</p>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="25"
                    className="w-32"
                    id="reliability-optimization-level"
                    aria-label="Reliability Optimization Level"
                    title="Adjust reliability optimization priority (0-100%)"
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium mb-1">Auto-Balance Mode</h4>
                    <p className="text-slate-400 text-sm">AI automatically adjusts balance based on real-time conditions</p>
                  </div>
                  <button 
                    onClick={handleAutoBalance}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      autoBalanceEnabled 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    <Brain className={`w-4 h-4 ${autoBalanceEnabled ? 'animate-pulse' : ''}`} />
                    {autoBalanceEnabled ? 'Auto-Balance Active' : 'Enable Auto-Balance'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {notification.visible && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-50 max-w-sm"
          >
            <div className={`px-4 py-3 rounded-lg border shadow-lg flex items-center gap-3 ${
              notification.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
              notification.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' :
              notification.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
              'bg-blue-500/20 border-blue-500/30 text-blue-400'
            }`}>
              <div className="flex-shrink-0">
                {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'info' && <Info className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification(prev => ({ ...prev, visible: false }))}
                aria-label="Close notification"
                className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Configure Rule Modal */}
      <AnimatePresence>
        {showConfigureModal && modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-slate-900 rounded-xl p-6 max-w-2xl w-full mx-4 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Configure Rule</h2>
                <button
                  onClick={() => setShowConfigureModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{modalContent.name}</h3>
                  <p className="text-slate-400 text-sm">{modalContent.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                    <select 
                      className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600"
                      title="Select rule priority level"
                    >
                      <option value={modalContent.priority}>{modalContent.priority}</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Execution Frequency</label>
                    <select 
                      className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600"
                      title="Select execution frequency"
                    >
                      <option value="real-time">Real-time</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Conditions</label>
                  <div className="space-y-2">
                    {modalContent.conditions?.map((condition: string, index: number) => (
                      <label key={index} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="text-blue-500" />
                        <span className="text-slate-300">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setShowConfigureModal(false)}
                  className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowConfigureModal(false);
                    showNotification('Rule configuration saved successfully!', 'success');
                  }}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Logs Modal */}
      <AnimatePresence>
        {showLogsModal && modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-slate-900 rounded-xl p-6 max-w-3xl w-full mx-4 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Execution Logs</h2>
                <button
                  onClick={() => setShowLogsModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">{modalContent.name}</h3>
                <p className="text-slate-400 text-sm">Last run: {modalContent.lastRun}</p>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {modalContent.logs?.map((log: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-2 bg-slate-900/50 rounded">
                      <span className="text-xs text-slate-500 font-mono">{log.timestamp}</span>
                      <div className="flex-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          log.level === 'SUCCESS' ? 'bg-green-500/20 text-green-400' :
                          log.level === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400' :
                          log.level === 'ERROR' ? 'bg-red-500/20 text-red-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {log.level}
                        </span>
                        <p className="text-slate-300 text-sm mt-1">{log.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setShowLogsModal(false)}
                  className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowLogsModal(false);
                    showNotification('Logs exported successfully!', 'success');
                  }}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Export Logs
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Details Modal */}
      <AnimatePresence>
        {showDetailsModal && modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-slate-900 rounded-xl p-6 max-w-3xl w-full mx-4 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Automation Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{modalContent.title}</h3>
                  <p className="text-slate-400 text-sm">{modalContent.description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <p className="text-sm text-slate-400 mb-1">Cost Impact</p>
                    <p className="text-xl font-bold text-green-400">₹{modalContent.impact.cost.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <p className="text-sm text-slate-400 mb-1">Time Impact</p>
                    <p className="text-xl font-bold text-blue-400">{modalContent.impact.time}%</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <p className="text-sm text-slate-400 mb-1">Efficiency Impact</p>
                    <p className="text-xl font-bold text-purple-400">{modalContent.impact.efficiency}%</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-3">Implementation Requirements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-400" />
                      <span className="text-slate-300">AI/ML Models: {modalContent.confidence}% confidence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">Integration Level: {modalContent.complexity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-slate-300">Category: {modalContent.category}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-3">Expected Benefits</h4>
                  <ul className="space-y-1 text-slate-300">
                    <li className="flex items-center gap-2">
                      <ArrowUp className="w-4 h-4 text-green-400" />
                      Improved operational efficiency by {modalContent.impact.efficiency}%
                    </li>
                    <li className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      Monthly cost savings of ₹{modalContent.impact.cost.toLocaleString()}
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      Time reduction of {modalContent.impact.time}% in processing
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    showNotification('Implementation plan generated!', 'success');
                  }}
                  className="flex-1 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Generate Plan
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Impact Assessment Modal */}
      <AnimatePresence>
        {showImpactModal && modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-slate-900 rounded-xl p-6 max-w-4xl w-full mx-4 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Impact Assessment</h2>
                <button
                  onClick={() => setShowImpactModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{modalContent.title}</h3>
                  <p className="text-slate-400 text-sm">{modalContent.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Cost Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Implementation</span>
                        <span className="text-green-400">₹{modalContent.impactDetails.costBreakdown.implementation.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Training</span>
                        <span className="text-blue-400">₹{modalContent.impactDetails.costBreakdown.training.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Maintenance</span>
                        <span className="text-yellow-400">₹{modalContent.impactDetails.costBreakdown.maintenance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Expected Savings</span>
                        <span className="text-green-400 font-bold">₹{modalContent.impactDetails.costBreakdown.savings.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Time Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Setup</span>
                        <span className="text-blue-400">{modalContent.impactDetails.timeBreakdown.setup}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Training</span>
                        <span className="text-purple-400">{modalContent.impactDetails.timeBreakdown.training}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Integration</span>
                        <span className="text-yellow-400">{modalContent.impactDetails.timeBreakdown.integration}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Risk Factors</h4>
                    <div className="space-y-2">
                      {modalContent.impactDetails.riskFactors.map((risk: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-slate-300">{risk.factor}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            risk.level === 'Low' ? 'bg-green-500/20 text-green-400' :
                            risk.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {risk.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">ROI Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Payback Period</span>
                        <span className="text-green-400">{modalContent.impactDetails.roi.paybackPeriod}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Annual Savings</span>
                        <span className="text-green-400 font-bold">₹{modalContent.impactDetails.roi.annualSavings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Risk Level</span>
                        <span className="text-green-400">{modalContent.impactDetails.roi.riskLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setShowImpactModal(false)}
                  className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowImpactModal(false);
                    showNotification('Impact assessment saved!', 'success');
                  }}
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Approve Implementation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-Balance Details Modal */}
      <AnimatePresence>
        {showAutoBalanceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-slate-900 rounded-xl p-6 max-w-3xl w-full mx-4 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Auto-Balance Details</h2>
                <button
                  onClick={() => setShowAutoBalanceModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="w-6 h-6 text-green-400 animate-pulse" />
                    <h3 className="text-lg font-semibold text-green-400">Auto-Balance Status: ACTIVE</h3>
                  </div>
                  <p className="text-slate-300 text-sm">AI is continuously optimizing your system balance based on real-time data and conditions.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-white font-medium mb-3">Current Optimization</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Cost Priority</span>
                        <span className="text-green-400 font-medium">35%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Speed Priority</span>
                        <span className="text-blue-400 font-medium">40%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Reliability Priority</span>
                        <span className="text-purple-400 font-medium">25%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-white font-medium mb-3">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Efficiency</span>
                        <span className="text-green-400 font-medium">+12%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Cost Savings</span>
                        <span className="text-green-400 font-medium">₹18,500/mo</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Response Time</span>
                        <span className="text-blue-400 font-medium">2.3s</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-3">AI Decision History</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-slate-300 text-sm">Increased speed priority by 5% due to traffic congestion</p>
                        <p className="text-slate-500 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-slate-300 text-sm">Adjusted cost priority to optimize fuel consumption</p>
                        <p className="text-slate-500 text-xs">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-slate-300 text-sm">Enhanced reliability priority for weather conditions</p>
                        <p className="text-slate-500 text-xs">8 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-3">Active Conditions</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">High Traffic Volume</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Normal Weather</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Peak Hours</span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">Driver Availability: 85%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setShowAutoBalanceModal(false)}
                  className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleDisableAutoBalance}
                  className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Disable Auto-Balance
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
