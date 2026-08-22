import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  MapPin, 
  Clock, 
  Zap, 
  BarChart3, 
  Radio, 
  Shield, 
  Eye, 
  Bell, 
  Navigation,
  Compass,
  Radar,
  Wind,
  CloudRain,
  Users,
  Package,
  Truck,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Target,
  Gauge
} from 'lucide-react';

interface RiskEvent {
  id: string;
  type: 'delay' | 'demand_spike' | 'supply_shortage' | 'traffic' | 'weather' | 'equipment' | 'staff' | 'quality';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string;
  zone: string;
  detectedAt: string;
  estimatedImpact: string;
  probability: number;
  timeframe: string;
  affectedOperations: string[];
  mitigationActions: string[];
  status: 'active' | 'monitoring' | 'resolved';
}

interface RiskTrend {
  type: string;
  current: number;
  previous: number;
  trend: 'rising' | 'stable' | 'falling';
  prediction: number;
}

interface RiskZone {
  id: string;
  name: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  activeRisks: number;
  totalRisks: number;
  mainRisks: string[];
  coordinates: { x: number; y: number };
}

const Supplier_Risk_Radar = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'zones' | 'trends'>('overview');
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [autoMonitor, setAutoMonitor] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState('high');

  const riskEvents: RiskEvent[] = [
    {
      id: 'risk-1',
      type: 'traffic',
      severity: 'high',
      title: 'Major Traffic Congestion - Western Express Highway',
      description: 'Accident reported causing 45-min delays on main supply route',
      location: 'Western Express Highway, Mumbai',
      zone: 'Zone A',
      detectedAt: '10 min ago',
      estimatedImpact: '15+ delayed deliveries, 2-hour total delay',
      probability: 85,
      timeframe: 'Next 2-3 hours',
      affectedOperations: ['Delivery', 'Warehouse Operations', 'Customer Service'],
      mitigationActions: [
        'Reroute affected deliveries via Eastern Express',
        'Inform customers about delays',
        'Adjust warehouse loading schedules'
      ],
      status: 'active'
    },
    {
      id: 'risk-2',
      type: 'demand_spike',
      severity: 'critical',
      title: 'Unprecedented Demand Surge - Commercial District',
      description: 'Order volume increased by 200% in last hour, exceeding capacity',
      location: 'Commercial District, Zone D',
      zone: 'Zone D',
      detectedAt: '15 min ago',
      estimatedImpact: 'System overload, potential service degradation',
      probability: 95,
      timeframe: 'Next 4-6 hours',
      affectedOperations: ['Order Processing', 'Inventory', 'Delivery'],
      mitigationActions: [
        'Activate backup warehouse capacity',
        'Prioritize high-value orders',
        'Request additional driver resources'
      ],
      status: 'active'
    },
    {
      id: 'risk-3',
      type: 'weather',
      severity: 'medium',
      title: 'Heavy Rainfall Forecast - Pune Region',
      description: 'Meteorological department predicts severe rainfall affecting road conditions',
      location: 'Pune Region',
      zone: 'Zone B',
      detectedAt: '1 hour ago',
      estimatedImpact: 'Reduced delivery speeds, potential route closures',
      probability: 70,
      timeframe: 'Next 6-8 hours',
      affectedOperations: ['Delivery', 'Transportation'],
      mitigationActions: [
        'Prepare alternative indoor storage',
        'Waterproof packaging preparation',
        'Driver safety briefing'
      ],
      status: 'monitoring'
    },
    {
      id: 'risk-4',
      type: 'equipment',
      severity: 'medium',
      title: 'Forklift Malfunction - Warehouse C',
      description: 'Critical equipment failure affecting loading operations',
      location: 'Warehouse C, Nashik',
      zone: 'Zone C',
      detectedAt: '30 min ago',
      estimatedImpact: '50% reduction in loading capacity',
      probability: 100,
      timeframe: 'Next 2-4 hours',
      affectedOperations: ['Loading', 'Dispatch'],
      mitigationActions: [
        'Deploy backup forklift',
        'Manual loading procedures',
        'Schedule urgent maintenance'
      ],
      status: 'active'
    },
    {
      id: 'risk-5',
      type: 'supply_shortage',
      severity: 'high',
      title: 'Raw Material Shortage - Electronics Components',
      description: 'Supplier reports inventory shortage affecting production',
      location: 'Multiple Locations',
      zone: 'All Zones',
      detectedAt: '2 hours ago',
      estimatedImpact: 'Production delays, order fulfillment issues',
      probability: 80,
      timeframe: 'Next 24-48 hours',
      affectedOperations: ['Production', 'Order Fulfillment'],
      mitigationActions: [
        'Activate alternative suppliers',
        'Prioritize existing inventory',
        'Communicate with customers'
      ],
      status: 'monitoring'
    }
  ];

  const riskTrends: RiskTrend[] = [
    { type: 'Traffic Delays', current: 75, previous: 60, trend: 'rising', prediction: 85 },
    { type: 'Demand Spikes', current: 90, previous: 45, trend: 'rising', prediction: 95 },
    { type: 'Weather Issues', current: 30, previous: 25, trend: 'stable', prediction: 35 },
    { type: 'Equipment Failures', current: 45, previous: 50, trend: 'falling', prediction: 40 },
    { type: 'Staff Shortages', current: 20, previous: 30, trend: 'falling', prediction: 15 }
  ];

  const riskZones: RiskZone[] = [
    {
      id: 'zone-a',
      name: 'Zone A - Mumbai Central',
      riskLevel: 'high',
      activeRisks: 3,
      totalRisks: 8,
      mainRisks: ['Traffic', 'Weather', 'Demand'],
      coordinates: { x: 50, y: 30 }
    },
    {
      id: 'zone-b',
      name: 'Zone B - Pune Region',
      riskLevel: 'medium',
      activeRisks: 2,
      totalRisks: 5,
      mainRisks: ['Weather', 'Supply'],
      coordinates: { x: 70, y: 60 }
    },
    {
      id: 'zone-c',
      name: 'Zone C - Nashik Industrial',
      riskLevel: 'medium',
      activeRisks: 2,
      totalRisks: 4,
      mainRisks: ['Equipment', 'Staff'],
      coordinates: { x: 30, y: 70 }
    },
    {
      id: 'zone-d',
      name: 'Zone D - Commercial District',
      riskLevel: 'critical',
      activeRisks: 4,
      totalRisks: 10,
      mainRisks: ['Demand', 'Delivery', 'Quality'],
      coordinates: { x: 60, y: 40 }
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'delay': return <Clock className="w-4 h-4" />;
      case 'demand_spike': return <TrendingUp className="w-4 h-4" />;
      case 'supply_shortage': return <Package className="w-4 h-4" />;
      case 'traffic': return <Truck className="w-4 h-4" />;
      case 'weather': return <CloudRain className="w-4 h-4" />;
      case 'equipment': return <AlertCircle className="w-4 h-4" />;
      case 'staff': return <Users className="w-4 h-4" />;
      case 'quality': return <Shield className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getZoneColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500/30 border-red-500';
      case 'high': return 'bg-orange-500/30 border-orange-500';
      case 'medium': return 'bg-yellow-500/30 border-yellow-500';
      case 'low': return 'bg-green-500/30 border-green-500';
      default: return 'bg-slate-500/30 border-slate-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="w-3 h-3 text-red-400" />;
      case 'stable': return <Activity className="w-3 h-3 text-yellow-400" />;
      case 'falling': return <TrendingUp className="w-3 h-3 text-green-400 rotate-180" />;
      default: return <Activity className="w-3 h-3 text-slate-400" />;
    }
  };

  const overallRiskScore = riskEvents.reduce((acc, risk) => {
    const score = risk.severity === 'critical' ? 100 : 
                 risk.severity === 'high' ? 75 : 
                 risk.severity === 'medium' ? 50 : 25;
    return acc + (score * (risk.probability / 100));
  }, 0) / riskEvents.length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Radar className="w-6 h-6 text-blue-400" />
          Supply Risk Radar
        </h1>
        <p className="text-slate-400">Real-time risk monitoring and predictive analytics for supply chain operations</p>
      </div>

      {/* Risk Overview Alert */}
      <div className={`mb-6 p-4 rounded-xl border ${
        overallRiskScore > 75 ? 'bg-red-500/10 border-red-500/30' : 
        overallRiskScore > 50 ? 'bg-orange-500/10 border-orange-500/30' : 
        overallRiskScore > 25 ? 'bg-yellow-500/10 border-yellow-500/30' : 
        'bg-green-500/10 border-green-500/30'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {overallRiskScore > 75 ? <AlertTriangle className="w-5 h-5 text-red-400" /> : 
             overallRiskScore > 50 ? <AlertCircle className="w-5 h-5 text-orange-400" /> : 
             overallRiskScore > 25 ? <AlertCircle className="w-5 h-5 text-yellow-400" /> : 
             <CheckCircle className="w-5 h-5 text-green-400" />}
            <div>
              <h3 className={`font-semibold ${
                overallRiskScore > 75 ? 'text-red-400' : 
                overallRiskScore > 50 ? 'text-orange-400' : 
                overallRiskScore > 25 ? 'text-yellow-400' : 'text-green-400'
              }`}>
                Overall Risk Level: {Math.round(overallRiskScore)}%
              </h3>
              <p className="text-sm text-slate-400">
                {overallRiskScore > 75 ? 'Critical risk level - Immediate attention required' : 
                 overallRiskScore > 50 ? 'High risk level - Monitor closely' : 
                 overallRiskScore > 25 ? 'Moderate risk level - Normal operations' : 
                 'Low risk level - All systems normal'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={autoMonitor}
                onChange={(e) => setAutoMonitor(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              Auto-monitor
            </label>
            <label className="flex items-center gap-2">
              <span className="text-sm text-slate-300">Alert Threshold:</span>
              <select
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                className="bg-slate-700 text-white text-sm px-3 py-1 rounded border border-slate-600"
              >
                <option value="low">Low alerts</option>
                <option value="medium">Medium alerts</option>
                <option value="high">High alerts</option>
                <option value="critical">Critical only</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'events', label: 'Risk Events', icon: AlertTriangle },
          { id: 'zones', label: 'Risk Zones', icon: MapPin },
          { id: 'trends', label: 'Trends', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-slate-700 text-blue-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Risk Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">Active</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{riskEvents.filter(r => r.status === 'active').length}</h3>
                <p className="text-sm text-slate-400">Active Risks</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="w-5 h-5 text-orange-400" />
                  <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded">High</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{riskEvents.filter(r => r.severity === 'high' || r.severity === 'critical').length}</h3>
                <p className="text-sm text-slate-400">High Severity</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded">Watch</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{riskEvents.filter(r => r.status === 'monitoring').length}</h3>
                <p className="text-sm text-slate-400">Monitoring</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">Clear</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{riskEvents.filter(r => r.status === 'resolved').length}</h3>
                <p className="text-sm text-slate-400">Resolved Today</p>
              </div>
            </div>

            {/* Risk Zones Map */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-400" />
                Risk Zones Overview
              </h2>
              
              <div className="bg-slate-800 rounded-xl p-6">
                <div className="relative h-64 bg-slate-900/50 rounded-lg mb-4">
                  {/* Simplified zone visualization */}
                  {riskZones.map((zone) => (
                    <div
                      key={zone.id}
                      className={`absolute w-16 h-16 rounded-lg border-2 ${getZoneColor(zone.riskLevel)} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
                      style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
                    >
                      <div className="text-center">
                        <div className="text-xs font-bold text-white">{zone.name.split(' ')[1]}</div>
                        <div className="text-xs text-white">{zone.activeRisks}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {riskZones.map((zone) => (
                    <div key={zone.id} className="bg-slate-900/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white text-sm">{zone.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(zone.riskLevel)}`}>
                          {zone.riskLevel}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        <div className="flex justify-between mb-1">
                          <span>Active Risks:</span>
                          <span className="text-white">{zone.activeRisks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Main Issues:</span>
                          <span className="text-white">{zone.mainRisks.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Critical Risk Events */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Critical Risk Events
              </h2>
              
              {riskEvents
                .filter(r => r.severity === 'critical' || r.severity === 'high')
                .slice(0, 3)
                .map((risk) => (
                  <motion.div
                    key={risk.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`bg-slate-800 rounded-xl p-4 border-l-4 ${getSeverityColor(risk.severity).split(' ')[2]}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getRiskIcon(risk.type)}
                          <h3 className="font-semibold text-white">{risk.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(risk.severity)}`}>
                            {risk.severity}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{risk.description}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {risk.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {risk.detectedAt}
                          </span>
                          <span className="flex items-center gap-1">
                            <Gauge className="w-3 h-3" />
                            {risk.probability}% probability
                          </span>
                        </div>
                        <p className="text-sm text-orange-400 mt-2">💡 {risk.estimatedImpact}</p>
                      </div>
                      
                      <div className="ml-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          risk.status === 'active' ? 'bg-red-500/20 text-red-400' : 
                          risk.status === 'monitoring' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {risk.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Risk Events Tab */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              All Risk Events
            </h2>
            
            <div className="space-y-4">
              {riskEvents.map((risk) => (
                <motion.div
                  key={risk.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: riskEvents.indexOf(risk) * 0.1 }}
                  className={`bg-slate-800 rounded-xl p-4 border-l-4 ${getSeverityColor(risk.severity).split(' ')[2]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getRiskIcon(risk.type)}
                        <h3 className="font-semibold text-white">{risk.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(risk.severity)}`}>
                          {risk.severity}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          risk.status === 'active' ? 'bg-red-500/20 text-red-400' : 
                          risk.status === 'monitoring' ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {risk.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{risk.description}</p>
                      <p className="text-sm text-orange-400 mb-2">💡 {risk.estimatedImpact}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Location:</span>
                          <span className="text-white ml-2">{risk.location}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Timeframe:</span>
                          <span className="text-white ml-2">{risk.timeframe}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Probability:</span>
                          <span className={`text-white ml-2 font-medium ${
                            risk.probability > 80 ? 'text-red-400' : 
                            risk.probability > 60 ? 'text-orange-400' : 
                            risk.probability > 40 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {risk.probability}%
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Detected:</span>
                          <span className="text-white ml-2">{risk.detectedAt}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-sm text-slate-400">Affected Operations:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {risk.affectedOperations.map((op, index) => (
                            <span key={index} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                              {op}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-sm text-slate-400">Mitigation Actions:</span>
                        <ul className="mt-1 space-y-1">
                          {risk.mitigationActions.map((action, index) => (
                            <li key={index} className="text-xs text-blue-400 ml-4">
                              • {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Risk Zones Tab */}
        {activeTab === 'zones' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" />
              Risk Zones Analysis
            </h2>
            
            <div className="space-y-4">
              {riskZones.map((zone) => (
                <div key={zone.id} className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{zone.name}</h3>
                    <span className={`text-sm px-3 py-1 rounded ${getSeverityColor(zone.riskLevel)}`}>
                      {zone.riskLevel}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-3">Risk Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Active Risks:</span>
                          <span className="text-sm text-white font-medium">{zone.activeRisks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Total Risks:</span>
                          <span className="text-sm text-white">{zone.totalRisks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Risk Level:</span>
                          <span className={`text-sm font-medium ${getSeverityColor(zone.riskLevel)}`}>
                            {zone.riskLevel.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-3">Main Risk Types</h4>
                      <div className="space-y-2">
                        {zone.mainRisks.map((risk, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {getRiskIcon(risk.toLowerCase())}
                            <span className="text-sm text-white capitalize">{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-3">Zone Events</h4>
                      <div className="space-y-2">
                        {riskEvents
                          .filter(r => r.zone === zone.name.split(' ')[0] + ' ' + zone.name.split(' ')[2])
                          .slice(0, 3)
                          .map((event) => (
                            <div key={event.id} className="bg-slate-900/50 rounded-lg p-2">
                              <div className="flex items-center gap-2">
                                {getRiskIcon(event.type)}
                                <span className="text-xs text-white">{event.title}</span>
                                <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(event.severity)}`}>
                                  {event.severity}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Risk Trends Analysis
            </h2>
            
            <div className="space-y-4">
              {riskTrends.map((trend) => (
                <div key={trend.type} className="bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">{trend.type}</h3>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(trend.trend)}
                      <span className={`text-sm font-medium ${
                        trend.trend === 'rising' ? 'text-red-400' : 
                        trend.trend === 'stable' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {trend.trend}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{trend.current}</div>
                      <div className="text-xs text-slate-400">Current</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-400">{trend.previous}</div>
                      <div className="text-xs text-slate-400">Previous</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        trend.prediction > trend.current ? 'text-orange-400' : 'text-green-400'
                      }`}>
                        {trend.prediction}
                      </div>
                      <div className="text-xs text-slate-400">Predicted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-400 mb-2">Change</div>
                      <div className={`text-lg font-bold ${
                        trend.current > trend.previous ? 'text-red-400' : 
                        trend.current < trend.previous ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {trend.current > trend.previous ? '+' : ''}{trend.current - trend.previous}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="flex h-2">
                      <div 
                        className="bg-slate-500 h-2"
                        style={{ width: `${(trend.previous / Math.max(trend.current, trend.previous)) * 100}%` }}
                      />
                      <div 
                        className={`h-2 ${
                          trend.trend === 'rising' ? 'bg-red-500' : 
                          trend.trend === 'stable' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.abs(trend.current - trend.previous) / Math.max(trend.current, trend.previous) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Supplier_Risk_Radar;
