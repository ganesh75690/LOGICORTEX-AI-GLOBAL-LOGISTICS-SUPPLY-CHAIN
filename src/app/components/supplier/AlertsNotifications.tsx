import { Bell, AlertTriangle, AlertCircle, CheckCircle, Clock, TrendingUp, Package, Truck, Filter, Search, BellRing, X, Settings, ChevronRight, Activity, Brain, Zap } from 'lucide-react';
import { useState } from 'react';

interface Alert {
  id: string;
  type: 'low_stock' | 'high_demand' | 'delayed_shipment' | 'quality_issue' | 'price_change' | 'supplier_issue';
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'acknowledged' | 'resolved';
  timestamp: string;
  source: string;
  affectedItems: {
    sku: string;
    name: string;
    quantity?: number;
    location?: string;
  }[];
  recommendedActions: string[];
  estimatedImpact: string;
  deadline?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  lowStockThreshold: number;
  highDemandThreshold: number;
  delayedShipmentAlerts: boolean;
  priceChangeAlerts: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: 'ALT001',
    type: 'low_stock',
    title: 'Critical Stock Level - LED Bulbs',
    description: 'LED Bulbs (SKU-5678) have reached critically low stock levels across multiple warehouses',
    severity: 'critical',
    status: 'active',
    timestamp: '2024-04-24T09:15:00Z',
    source: 'Automated Inventory Monitor',
    affectedItems: [
      { sku: 'SKU-5678', name: 'LED Bulbs', quantity: 45, location: 'North Warehouse' },
      { sku: 'SKU-5678', name: 'LED Bulbs', quantity: 23, location: 'East Warehouse' }
    ],
    recommendedActions: [
      'Immediate restock order recommended',
      'Transfer stock from West Warehouse (300 units available)',
      'Contact backup supplier for expedited shipping'
    ],
    estimatedImpact: 'Potential stockout in 3 days, affecting 12 pending orders',
    deadline: '2024-04-26'
  },
  {
    id: 'ALT002',
    type: 'high_demand',
    title: 'Unusual Demand Spike - Circuit Boards',
    description: 'Circuit Board A showing 180% increase in demand compared to forecast',
    severity: 'high',
    status: 'active',
    timestamp: '2024-04-24T07:30:00Z',
    source: 'AI Demand Predictor',
    affectedItems: [
      { sku: 'SKU-7845', name: 'Circuit Board A', quantity: 340 }
    ],
    recommendedActions: [
      'Increase safety stock by 40%',
      'Review recent customer orders for patterns',
      'Consider production capacity increase'
    ],
    estimatedImpact: 'Revenue opportunity of ₹45,000 if demand can be met'
  },
  {
    id: 'ALT003',
    type: 'delayed_shipment',
    title: 'Shipment Delay - Steel Rods',
    description: 'Shipment from Steel Suppliers Inc delayed by 2 days due to weather conditions',
    severity: 'medium',
    status: 'acknowledged',
    timestamp: '2024-04-23T14:45:00Z',
    source: 'Logistics Tracker',
    affectedItems: [
      { sku: 'SKU-9012', name: 'Steel Rods', quantity: 500, location: 'South Warehouse' }
    ],
    recommendedActions: [
      'Update customer delivery dates',
      'Consider alternative shipping routes',
      'Monitor weather conditions'
    ],
    estimatedImpact: '3 customer orders affected, minimal financial impact'
  },
  {
    id: 'ALT004',
    type: 'price_change',
    title: 'Price Increase Notification - Brake Pads',
    description: 'Supplier AutoParts Direct announced 8% price increase effective next month',
    severity: 'medium',
    status: 'active',
    timestamp: '2024-04-24T11:20:00Z',
    source: 'LogiCortex AI Supplier Portal',
    affectedItems: [
      { sku: 'SKU-2341', name: 'Brake Pads' }
    ],
    recommendedActions: [
      'Review current contracts',
      'Negotiate volume discounts',
      'Consider alternative suppliers'
    ],
    estimatedImpact: 'Monthly cost increase of ₹3,600 at current volumes'
  },
  {
    id: 'ALT005',
    type: 'supplier_issue',
    title: 'Supplier Performance Alert - LightTech Solutions',
    description: 'Supplier reliability dropped below threshold (85% on-time delivery)',
    severity: 'low',
    status: 'resolved',
    timestamp: '2024-04-22T16:00:00Z',
    source: 'Supplier Performance Monitor',
    affectedItems: [
      { sku: 'SKU-5678', name: 'LED Bulbs' }
    ],
    recommendedActions: [
      'Schedule performance review meeting',
      'Implement contingency plans',
      'Monitor next 5 deliveries closely'
    ],
    estimatedImpact: 'Potential supply chain disruptions if not addressed'
  }
];

const mockSettings: NotificationSettings = {
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  lowStockThreshold: 20,
  highDemandThreshold: 150,
  delayedShipmentAlerts: true,
  priceChangeAlerts: true
};

export default function AlertsNotifications() {
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [settings, setSettings] = useState(mockSettings);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_stock': return <Package className="w-5 h-5" />;
      case 'high_demand': return <TrendingUp className="w-5 h-5" />;
      case 'delayed_shipment': return <Truck className="w-5 h-5" />;
      case 'quality_issue': return <AlertCircle className="w-5 h-5" />;
      case 'price_change': return <AlertTriangle className="w-5 h-5" />;
      case 'supplier_issue': return <AlertTriangle className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'high': return 'bg-orange-400/20 text-orange-400 border-orange-400/30';
      case 'medium': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'low': return 'bg-green-400/20 text-green-400 border-green-400/30';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400';
      case 'acknowledged': return 'text-yellow-400';
      case 'resolved': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'low_stock': return 'text-blue-400';
      case 'high_demand': return 'text-green-400';
      case 'delayed_shipment': return 'text-orange-400';
      case 'quality_issue': return 'text-red-400';
      case 'price_change': return 'text-purple-400';
      case 'supplier_issue': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = selectedFilter === 'all' || alert.type === selectedFilter || alert.status === selectedFilter;
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSeverity && matchesSearch;
  });

  const activeAlertsCount = alerts.filter(a => a.status === 'active').length;
  const criticalAlertsCount = alerts.filter(a => a.severity === 'critical' && a.status === 'active').length;

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'acknowledged' as const }
        : alert
    ));
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' as const }
        : alert
    ));
  };

  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2 bg-[#00F5C4]/20 rounded-lg">
              <Bell className="w-6 h-6 text-[#00F5C4]" />
            </div>
            {criticalAlertsCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">{criticalAlertsCount}</span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Alerts & Notifications</h2>
            <p className="text-slate-400">Real-time monitoring and intelligent alerts system</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors">
            Mark All Read
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Active Alerts</span>
            <BellRing className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white">{activeAlertsCount}</div>
          <div className="text-xs text-slate-500">Require attention</div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Critical</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-red-400">{criticalAlertsCount}</div>
          <div className="text-xs text-slate-500">Immediate action needed</div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Acknowledged</span>
            <Clock className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {mockAlerts.filter(a => a.status === 'acknowledged').length}
          </div>
          <div className="text-xs text-slate-500">Being processed</div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Resolved</span>
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">
            {mockAlerts.filter(a => a.status === 'resolved').length}
          </div>
          <div className="text-xs text-slate-500">Completed today</div>
        </div>
      </div>

      {/* AI Health Score & Risk Prediction */}
      <div className="bg-gradient-to-r from-cyan-900/30 via-blue-900/20 to-slate-900 rounded-2xl p-6 border border-cyan-500/30">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Supply Chain Health Score</h3>
            <p className="text-slate-300">AI-powered overall efficiency monitoring</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">94/100</div>
            <div className="text-sm text-slate-400">Overall Health</div>
            <div className="text-xs text-green-400 mt-2">↑ 3 points vs last month</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">72hrs</div>
            <div className="text-sm text-slate-400">Early Warning</div>
            <div className="text-xs text-green-400 mt-2">↑ 12hrs improvement</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">95.2%</div>
            <div className="text-sm text-slate-400">AI Accuracy</div>
            <div className="text-xs text-green-400 mt-2">↑ 2.3% vs last month</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">23%</div>
            <div className="text-sm text-slate-400">Cost Reduction</div>
            <div className="text-xs text-green-400 mt-2">↑ 5.1% vs last month</div>
          </div>
        </div>

        <div className="bg-red-900/30 rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-red-400" />
            <div className="flex-1">
              <div className="text-white font-medium">AI Risk Prediction Active</div>
              <div className="text-slate-300 text-sm">Monitoring 1,247 data points for potential disruptions • Next scan in 4 minutes</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Notification Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                aria-label="Close notification settings"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-medium">Notification Channels</h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300">Email Notifications</span>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                      className="w-5 h-5 text-[#00F5C4] bg-slate-600 border-slate-500 rounded focus:ring-[#00F5C4]"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300">SMS Notifications</span>
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                      className="w-5 h-5 text-[#00F5C4] bg-slate-600 border-slate-500 rounded focus:ring-[#00F5C4]"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300">Push Notifications</span>
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})}
                      className="w-5 h-5 text-[#00F5C4] bg-slate-600 border-slate-500 rounded focus:ring-[#00F5C4]"
                    />
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-white font-medium">Alert Thresholds</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <label htmlFor="lowStockThreshold" className="text-slate-300 text-sm block mb-2">Low Stock Threshold (%)</label>
                    <input
                      id="lowStockThreshold"
                      type="number"
                      value={settings.lowStockThreshold}
                      onChange={(e) => setSettings({...settings, lowStockThreshold: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                    />
                  </div>
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <label htmlFor="highDemandThreshold" className="text-slate-300 text-sm block mb-2">High Demand Threshold (%)</label>
                    <input
                      id="highDemandThreshold"
                      type="number"
                      value={settings.highDemandThreshold}
                      onChange={(e) => setSettings({...settings, highDemandThreshold: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-700">
              <button 
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#00F5C4]"
              />
            </div>
          </div>
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
            aria-label="Filter by alert type"
          >
            <option value="all">All Types</option>
            <option value="low_stock">Low Stock</option>
            <option value="high_demand">High Demand</option>
            <option value="delayed_shipment">Delayed Shipment</option>
            <option value="quality_issue">Quality Issue</option>
            <option value="price_change">Price Change</option>
            <option value="supplier_issue">Supplier Issue</option>
          </select>
          
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
            aria-label="Filter by severity"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)} border`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className={`text-sm font-medium ${getTypeColor(alert.type)}`}>
                      {alert.type.replace('_', ' ')}
                    </span>
                    <span className={`text-sm font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-3">{alert.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <span>Source: {alert.source}</span>
                    <span>•</span>
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    {alert.deadline && (
                      <>
                        <span>•</span>
                        <span className="text-red-400">Deadline: {alert.deadline}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Affected Items</h4>
                      <div className="space-y-1">
                        {alert.affectedItems.map((item, index) => (
                          <div key={index} className="text-slate-400 text-sm">
                            • {item.name} ({item.sku})
                            {item.quantity && ` - ${item.quantity} units`}
                            {item.location && ` • ${item.location}`}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Recommended Actions</h4>
                      <div className="space-y-1">
                        {alert.recommendedActions.map((action, index) => (
                          <div key={index} className="text-slate-400 text-sm">
                            • {action}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-slate-400 text-sm">
                      <strong>Estimated Impact:</strong> {alert.estimatedImpact}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              {alert.status === 'active' && (
                <button 
                  onClick={() => handleAcknowledge(alert.id)}
                  className="px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
                >
                  Acknowledge
                </button>
              )}
              {alert.status === 'acknowledged' && (
                <button 
                  onClick={() => handleResolve(alert.id)}
                  className="px-4 py-2 bg-green-400 text-slate-900 rounded-lg font-medium hover:bg-green-300 transition-colors"
                >
                  Mark Resolved
                </button>
              )}
              <button 
                onClick={() => handleViewDetails(alert)}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Details Modal */}
      {showDetailsModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-slate-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedAlert.severity === 'critical' ? 'bg-red-500/20' :
                  selectedAlert.severity === 'high' ? 'bg-orange-500/20' :
                  selectedAlert.severity === 'medium' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                }`}>
                  {getAlertIcon(selectedAlert.type)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedAlert.title}</h3>
                  <p className="text-slate-400 text-sm">Alert ID: {selectedAlert.id}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close details modal"
                title="Close details modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Alert Overview */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Alert Overview</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-400 text-sm">Severity:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedAlert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                          selectedAlert.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          selectedAlert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {selectedAlert.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-400 text-sm">Status:</span>
                        <span className={`text-sm font-medium ${getStatusColor(selectedAlert.status)}`}>
                          {selectedAlert.status.charAt(0).toUpperCase() + selectedAlert.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">Source:</span>
                        <span className="text-white text-sm">{selectedAlert.source}</span>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400 text-sm">Created:</span>
                        <span className="text-white text-sm">{new Date(selectedAlert.timestamp).toLocaleString()}</span>
                      </div>
                      {selectedAlert.deadline && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          <span className="text-slate-400 text-sm">Deadline:</span>
                          <span className="text-white text-sm">{selectedAlert.deadline}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <p className="text-slate-300">{selectedAlert.description}</p>
                  </div>
                </div>

                {/* Affected Items */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Affected Items</h4>
                  <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-900/50 border-b border-slate-700">
                          <tr>
                            <th className="text-left p-3 text-slate-400 font-medium">SKU</th>
                            <th className="text-left p-3 text-slate-400 font-medium">Product Name</th>
                            <th className="text-left p-3 text-slate-400 font-medium">Quantity</th>
                            <th className="text-left p-3 text-slate-400 font-medium">Location</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                          {selectedAlert.affectedItems.map((item, index) => (
                            <tr key={index}>
                              <td className="p-3 text-slate-300 font-medium">{item.sku}</td>
                              <td className="p-3 text-white">{item.name}</td>
                              <td className="p-3 text-slate-300">{item.quantity || '-'}</td>
                              <td className="p-3 text-slate-300">{item.location || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Recommended Actions */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Recommended Actions</h4>
                  <div className="space-y-2">
                    {selectedAlert.recommendedActions.map((action, index) => (
                      <div key={index} className="flex items-start gap-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                        <div className="w-6 h-6 rounded-full bg-[#00F5C4]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[#00F5C4] text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-slate-300">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estimated Impact */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Estimated Impact</h4>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <p className="text-slate-300">{selectedAlert.estimatedImpact}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-700">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  {selectedAlert.status === 'active' && (
                    <button
                      onClick={() => {
                        handleAcknowledge(selectedAlert.id);
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
                    >
                      Acknowledge Alert
                    </button>
                  )}
                  {selectedAlert.status === 'acknowledged' && (
                    <button
                      onClick={() => {
                        handleResolve(selectedAlert.id);
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-green-400 text-slate-900 rounded-lg font-medium hover:bg-green-300 transition-colors"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
