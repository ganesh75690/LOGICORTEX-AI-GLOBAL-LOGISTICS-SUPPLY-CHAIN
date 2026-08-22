import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Building, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Truck, 
  Users, 
  Activity, 
  Zap, 
  RefreshCw, 
  ArrowUpDown,
  Scale,
  Warehouse,
  Route,
  MapPin
} from 'lucide-react';

interface WarehouseData {
  id: string;
  name: string;
  location: string;
  currentLoad: number;
  capacity: number;
  utilization: number;
  status: 'optimal' | 'warning' | 'critical' | 'available';
  processingSpeed: number;
  avgProcessingTime: number;
  activeOrders: number;
  queueLength: number;
  staffCount: number;
  efficiency: number;
}

interface LoadBalancingSuggestion {
  id: string;
  type: 'redirect' | 'reallocate' | 'priority' | 'split';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  fromWarehouse: string;
  toWarehouse: string;
  ordersCount: number;
  estimatedImprovement: string;
  timeToImplement: string;
  impact: 'low' | 'medium' | 'high';
}

interface OrderFlow {
  id: string;
  source: string;
  destination: string;
  volume: number;
  status: 'normal' | 'delayed' | 'redirected';
  estimatedTime: number;
}

const Supplier_Load_Balancer = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'warehouses' | 'suggestions' | 'flow'>('overview');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [isBalancing, setIsBalancing] = useState(false);
  const [autoBalanceEnabled, setAutoBalanceEnabled] = useState(false);

  const warehouses: WarehouseData[] = [
    {
      id: 'wh-a',
      name: 'Warehouse A - Mumbai Central',
      location: 'Mumbai, Maharashtra',
      currentLoad: 850,
      capacity: 1000,
      utilization: 85,
      status: 'warning',
      processingSpeed: 45,
      avgProcessingTime: 12,
      activeOrders: 127,
      queueLength: 23,
      staffCount: 24,
      efficiency: 78
    },
    {
      id: 'wh-b',
      name: 'Warehouse B - Pune East',
      location: 'Pune, Maharashtra',
      currentLoad: 420,
      capacity: 800,
      utilization: 53,
      status: 'available',
      processingSpeed: 38,
      avgProcessingTime: 8,
      activeOrders: 68,
      queueLength: 5,
      staffCount: 18,
      efficiency: 92
    },
    {
      id: 'wh-c',
      name: 'Warehouse C - Nashik Industrial',
      location: 'Nashik, Maharashtra',
      currentLoad: 920,
      capacity: 900,
      utilization: 102,
      status: 'critical',
      processingSpeed: 52,
      avgProcessingTime: 18,
      activeOrders: 145,
      queueLength: 38,
      staffCount: 22,
      efficiency: 65
    },
    {
      id: 'wh-d',
      name: 'Warehouse D - Thane Logistics',
      location: 'Thane, Maharashtra',
      currentLoad: 380,
      capacity: 600,
      utilization: 63,
      status: 'optimal',
      processingSpeed: 35,
      avgProcessingTime: 10,
      activeOrders: 52,
      queueLength: 8,
      staffCount: 15,
      efficiency: 88
    }
  ];

  const loadBalancingSuggestions: LoadBalancingSuggestion[] = [
    {
      id: 'suggestion-1',
      type: 'redirect',
      priority: 'critical',
      title: 'Critical: Redirect Orders from Warehouse C',
      description: 'Warehouse C is overloaded at 102% capacity. Immediate redirection required',
      fromWarehouse: 'Warehouse C',
      toWarehouse: 'Warehouse B',
      ordersCount: 45,
      estimatedImprovement: 'Reduce processing time by 35%',
      timeToImplement: '5 min',
      impact: 'high'
    },
    {
      id: 'suggestion-2',
      type: 'reallocate',
      priority: 'high',
      title: 'Reallocate Staff - Warehouse A',
      description: 'Move 4 staff members from Warehouse A to Warehouse C to handle overflow',
      fromWarehouse: 'Warehouse A',
      toWarehouse: 'Warehouse C',
      ordersCount: 0,
      estimatedImprovement: 'Increase capacity by 15%',
      timeToImplement: '30 min',
      impact: 'medium'
    },
    {
      id: 'suggestion-3',
      type: 'split',
      priority: 'medium',
      title: 'Split Large Order Batch - Warehouse A',
      description: 'Split incoming batch of 80 orders between Warehouse A and Warehouse D',
      fromWarehouse: 'Warehouse A',
      toWarehouse: 'Warehouse D',
      ordersCount: 40,
      estimatedImprovement: 'Reduce queue time by 25%',
      timeToImplement: '10 min',
      impact: 'medium'
    }
  ];

  const orderFlows: OrderFlow[] = [
    { id: 'flow-1', source: 'Mumbai Zone', destination: 'Warehouse A', volume: 35, status: 'delayed', estimatedTime: 25 },
    { id: 'flow-2', source: 'Pune Zone', destination: 'Warehouse B', volume: 22, status: 'normal', estimatedTime: 12 },
    { id: 'flow-3', source: 'Nashik Zone', destination: 'Warehouse C', volume: 48, status: 'delayed', estimatedTime: 30 },
    { id: 'flow-4', source: 'Thane Zone', destination: 'Warehouse D', volume: 18, status: 'normal', estimatedTime: 10 }
  ];

  const handleBalancingAction = (suggestionId: string, action: 'apply' | 'reject') => {
    setIsBalancing(true);
    setSelectedSuggestion(suggestionId);
    
    setTimeout(() => {
      setIsBalancing(false);
      setSelectedSuggestion(null);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'warning': return 'text-orange-400 bg-orange-500/20';
      case 'optimal': return 'text-green-400 bg-green-500/20';
      case 'available': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 100) return 'text-red-400';
    if (utilization > 85) return 'text-orange-400';
    if (utilization > 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <Zap className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getFlowStatusColor = (status: string) => {
    switch (status) {
      case 'delayed': return 'text-red-400 bg-red-500/20';
      case 'redirected': return 'text-blue-400 bg-blue-500/20';
      case 'normal': return 'text-green-400 bg-green-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const overallSystemHealth = warehouses.reduce((acc, wh) => {
    const score = wh.status === 'critical' ? 0 : 
                 wh.status === 'warning' ? 50 : 
                 wh.status === 'optimal' ? 85 : 100;
    return acc + score;
  }, 0) / warehouses.length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Scale className="w-6 h-6 text-blue-400" />
          Warehouse Load Balancer
        </h1>
        <p className="text-slate-400">AI-powered workload distribution across warehouse network</p>
      </div>

      {/* System Health Alert */}
      <div className={`mb-6 p-4 rounded-xl border ${
        overallSystemHealth < 50 ? 'bg-red-500/10 border-red-500/30' : 
        overallSystemHealth < 75 ? 'bg-yellow-500/10 border-yellow-500/30' : 
        'bg-green-500/10 border-green-500/30'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {overallSystemHealth < 50 ? <AlertTriangle className="w-5 h-5 text-red-400" /> : 
             overallSystemHealth < 75 ? <Clock className="w-5 h-5 text-yellow-400" /> : 
             <CheckCircle className="w-5 h-5 text-green-400" />}
            <div>
              <h3 className={`font-semibold ${
                overallSystemHealth < 50 ? 'text-red-400' : 
                overallSystemHealth < 75 ? 'text-yellow-400' : 'text-green-400'
              }`}>
                System Health: {Math.round(overallSystemHealth)}%
              </h3>
              <p className="text-sm text-slate-400">
                {overallSystemHealth < 50 ? 'Critical load imbalance detected' : 
                 overallSystemHealth < 75 ? 'Some warehouses require attention' : 
                 'All warehouses operating optimally'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={autoBalanceEnabled}
                onChange={(e) => setAutoBalanceEnabled(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              Auto-balance
            </label>
            <button 
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Refresh load balancing data"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'warehouses', label: 'Warehouses', icon: Warehouse },
          { id: 'suggestions', label: 'AI Suggestions', icon: Zap },
          { id: 'flow', label: 'Order Flow', icon: Route }
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
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Warehouse className="w-5 h-5 text-blue-400" />
                  <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded">Total</span>
                </div>
                <h3 className="text-2xl font-bold text-white">4</h3>
                <p className="text-sm text-slate-400">Warehouses</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Package className="w-5 h-5 text-green-400" />
                  <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">Active</span>
                </div>
                <h3 className="text-2xl font-bold text-white">2,570</h3>
                <p className="text-sm text-slate-400">Total Orders</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded">Avg</span>
                </div>
                <h3 className="text-2xl font-bold text-white">76%</h3>
                <p className="text-sm text-slate-400">Utilization</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded">Avg</span>
                </div>
                <h3 className="text-2xl font-bold text-white">12m</h3>
                <p className="text-sm text-slate-400">Processing Time</p>
              </div>
            </div>

            {/* Warehouse Status Overview */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-green-400" />
                Warehouse Status Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {warehouses.map((warehouse) => (
                  <div key={warehouse.id} className="bg-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{warehouse.name}</h3>
                        <p className="text-sm text-slate-400">{warehouse.location}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(warehouse.status)}`}>
                        {warehouse.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-400">Utilization</span>
                          <span className={`font-medium ${getUtilizationColor(warehouse.utilization)}`}>
                            {warehouse.utilization}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              warehouse.utilization > 100 ? 'bg-red-500' : 
                              warehouse.utilization > 85 ? 'bg-orange-500' : 
                              warehouse.utilization > 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(warehouse.utilization, 100)}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-slate-400">Orders:</span>
                          <span className="text-white ml-1">{warehouse.activeOrders}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Queue:</span>
                          <span className="text-white ml-1">{warehouse.queueLength}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Staff:</span>
                          <span className="text-white ml-1">{warehouse.staffCount}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Efficiency:</span>
                          <span className={`text-white ml-1 ${
                            warehouse.efficiency > 85 ? 'text-green-400' : 
                            warehouse.efficiency > 75 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {warehouse.efficiency}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Actions */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Recommended Actions
              </h2>
              
              {loadBalancingSuggestions.slice(0, 2).map((suggestion) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-800 rounded-xl p-4 border-l-4 border-orange-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getPriorityIcon(suggestion.priority)}
                        <h3 className="font-semibold text-white">{suggestion.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(suggestion.priority)}`}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{suggestion.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <ArrowRight className="w-3 h-3" />
                          {suggestion.fromWarehouse} → {suggestion.toWarehouse}
                        </span>
                        {suggestion.ordersCount > 0 && (
                          <span className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {suggestion.ordersCount} orders
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {suggestion.timeToImplement}
                        </span>
                      </div>
                      <p className="text-sm text-green-400 mt-2">💡 {suggestion.estimatedImprovement}</p>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleBalancingAction(suggestion.id, 'apply')}
                        disabled={isBalancing && selectedSuggestion === suggestion.id}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors disabled:bg-slate-600"
                      >
                        {isBalancing && selectedSuggestion === suggestion.id ? 'Applying...' : 'Apply'}
                      </button>
                      <button
                        onClick={() => handleBalancingAction(suggestion.id, 'reject')}
                        className="px-3 py-1 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Warehouses Tab */}
        {activeTab === 'warehouses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Warehouse className="w-5 h-5 text-blue-400" />
              Detailed Warehouse Analysis
            </h2>
            
            <div className="space-y-4">
              {warehouses.map((warehouse) => (
                <div key={warehouse.id} className="bg-slate-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{warehouse.name}</h3>
                      <p className="text-sm text-slate-400">{warehouse.location}</p>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded ${getStatusColor(warehouse.status)}`}>
                      {warehouse.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-3">Capacity & Load</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Current Load</span>
                          <span className="text-sm text-white">{warehouse.currentLoad}/{warehouse.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Utilization</span>
                          <span className={`text-sm font-medium ${getUtilizationColor(warehouse.utilization)}`}>
                            {warehouse.utilization}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              warehouse.utilization > 100 ? 'bg-red-500' : 
                              warehouse.utilization > 85 ? 'bg-orange-500' : 
                              warehouse.utilization > 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(warehouse.utilization, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-3">Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Processing Speed</span>
                          <span className="text-sm text-white">{warehouse.processingSpeed} ord/hr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Avg Time</span>
                          <span className="text-sm text-white">{warehouse.avgProcessingTime} min</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Efficiency</span>
                          <span className={`text-sm font-medium ${
                            warehouse.efficiency > 85 ? 'text-green-400' : 
                            warehouse.efficiency > 75 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {warehouse.efficiency}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-3">Operations</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Active Orders</span>
                          <span className="text-sm text-white">{warehouse.activeOrders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Queue Length</span>
                          <span className={`text-sm font-medium ${
                            warehouse.queueLength > 30 ? 'text-red-400' : 
                            warehouse.queueLength > 15 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {warehouse.queueLength}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-400">Staff Count</span>
                          <span className="text-sm text-white">{warehouse.staffCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Suggestions Tab */}
        {activeTab === 'suggestions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              All Load Balancing Suggestions
            </h2>
            
            <div className="space-y-4">
              {loadBalancingSuggestions.map((suggestion) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: loadBalancingSuggestions.indexOf(suggestion) * 0.1 }}
                  className="bg-slate-800 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getPriorityIcon(suggestion.priority)}
                        <h3 className="font-semibold text-white">{suggestion.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(suggestion.priority)}`}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{suggestion.description}</p>
                      <p className="text-sm text-green-400 mb-3">💡 {suggestion.estimatedImprovement}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <ArrowRight className="w-3 h-3" />
                          {suggestion.fromWarehouse} → {suggestion.toWarehouse}
                        </span>
                        {suggestion.ordersCount > 0 && (
                          <span className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {suggestion.ordersCount} orders
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {suggestion.timeToImplement}
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          {suggestion.impact} impact
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleBalancingAction(suggestion.id, 'apply')}
                        disabled={isBalancing && selectedSuggestion === suggestion.id}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors disabled:bg-slate-600"
                      >
                        {isBalancing && selectedSuggestion === suggestion.id ? 'Applying...' : 'Apply'}
                      </button>
                      <button
                        onClick={() => handleBalancingAction(suggestion.id, 'reject')}
                        className="px-3 py-1 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Order Flow Tab */}
        {activeTab === 'flow' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Route className="w-5 h-5 text-purple-400" />
              Order Flow Analysis
            </h2>
            
            <div className="space-y-4">
              {orderFlows.map((flow) => (
                <div key={flow.id} className="bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-white">{flow.source}</span>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-white">{flow.destination}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400">
                          <Package className="w-3 h-3 inline mr-1" />
                          {flow.volume} orders
                        </span>
                        <span className={`text-sm ${
                          flow.status === 'delayed' ? 'text-red-400' : 
                          flow.status === 'redirected' ? 'text-blue-400' : 'text-green-400'
                        }`}>
                          <Clock className="w-3 h-3 inline mr-1" />
                          {flow.estimatedTime} min
                        </span>
                      </div>
                    </div>
                    
                    <span className={`text-xs px-2 py-1 rounded ${getFlowStatusColor(flow.status)}`}>
                      {flow.status}
                    </span>
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

export default Supplier_Load_Balancer;
