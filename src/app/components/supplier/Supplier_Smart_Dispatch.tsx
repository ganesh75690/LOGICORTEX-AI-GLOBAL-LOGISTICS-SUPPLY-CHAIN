import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Package, 
  Truck, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Users, 
  Zap, 
  CheckCircle, 
  XCircle, 
  X,
  Search,
  ArrowRight, 
  Activity,
  Navigation,
  Radio,
  BarChart3,
  Timer,
  Route,
  Split,
  Package as PackageIcon,
  Check
} from 'lucide-react';
import { ACODashboard } from '../ACO/ACODashboard';

interface DemandZone {
  id: string;
  name: string;
  demand: number;
  demandTrend: 'rising' | 'stable' | 'falling';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  estimatedOrders: number;
  timeWindow: string;
}

interface Driver {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'delayed' | 'offline';
  location: string;
  estimatedArrival: number;
  currentLoad: number;
  maxCapacity: number;
  efficiency: number;
}

interface DispatchSuggestion {
  id: string;
  type: 'immediate' | 'delay' | 'split' | 'reroute';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string;
  estimatedTime: string;
  packages: number;
  drivers: string[];
  zone: string;
}

const Supplier_Smart_Dispatch = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'zones' | 'drivers' | 'suggestions' | 'aco'>('overview');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailSuggestion, setDetailSuggestion] = useState<DispatchSuggestion | null>(null);
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showDriverMap, setShowDriverMap] = useState(false);
  const [driverSearchTerm, setDriverSearchTerm] = useState('');

  // Custom marker icon for drivers
  const driverIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDlDNSAxNC4yNSAxMiAyMiAxMiAyMkMxMiAyMiAxOSAxNC4yNSAxOSA5QzE5IDUuMTMgMTUuODcgMiAxMiAyWiIgZmlsbD0iIzNGQjVDNCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjkiIHI9IjMiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  // Driver location coordinates (simulated)
  const getDriverCoordinates = (location: string) => {
    const coordinates: { [key: string]: [number, number] } = {
      'Zone A': [40.7128, -74.0060], // New York
      'Zone B': [34.0522, -118.2437], // Los Angeles
      'Zone C': [41.8781, -87.6298], // Chicago
      'Zone D': [29.7604, -95.3698], // Houston
    };
    return coordinates[location] || [40.7128, -74.0060]; // Default to NYC
  };

  const demandZones: DemandZone[] = [
    {
      id: 'zone-a',
      name: 'Zone A - Downtown',
      demand: 85,
      demandTrend: 'rising',
      urgency: 'high',
      estimatedOrders: 12,
      timeWindow: 'Next 30 min'
    },
    {
      id: 'zone-b',
      name: 'Zone B - Industrial',
      demand: 62,
      demandTrend: 'stable',
      urgency: 'medium',
      estimatedOrders: 8,
      timeWindow: 'Next 45 min'
    },
    {
      id: 'zone-c',
      name: 'Zone C - Residential',
      demand: 45,
      demandTrend: 'falling',
      urgency: 'low',
      estimatedOrders: 5,
      timeWindow: 'Next 60 min'
    },
    {
      id: 'zone-d',
      name: 'Zone D - Commercial',
      demand: 78,
      demandTrend: 'rising',
      urgency: 'critical',
      estimatedOrders: 15,
      timeWindow: 'Next 20 min'
    }
  ];

  const drivers: Driver[] = [
    {
      id: 'driver-1',
      name: 'Raj Kumar',
      status: 'available',
      location: 'Zone A',
      estimatedArrival: 5,
      currentLoad: 8,
      maxCapacity: 15,
      efficiency: 92
    },
    {
      id: 'driver-2',
      name: 'Priya Sharma',
      status: 'delayed',
      location: 'Zone B',
      estimatedArrival: 25,
      currentLoad: 12,
      maxCapacity: 15,
      efficiency: 78
    },
    {
      id: 'driver-3',
      name: 'Amit Patel',
      status: 'available',
      location: 'Zone A',
      estimatedArrival: 8,
      currentLoad: 6,
      maxCapacity: 15,
      efficiency: 88
    },
    {
      id: 'driver-4',
      name: 'Sneha Reddy',
      status: 'busy',
      location: 'Zone D',
      estimatedArrival: 15,
      currentLoad: 14,
      maxCapacity: 15,
      efficiency: 95
    }
  ];

  // Filter drivers based on search term
  const filteredDrivers = drivers.filter(driver => {
    const searchLower = driverSearchTerm.toLowerCase();
    return (
      driver.name.toLowerCase().includes(searchLower) ||
      driver.location.toLowerCase().includes(searchLower) ||
      driver.status.toLowerCase().includes(searchLower) ||
      driver.id.toLowerCase().includes(searchLower)
    );
  });

  const dispatchSuggestions: DispatchSuggestion[] = [
    {
      id: 'suggestion-1',
      type: 'immediate',
      priority: 'critical',
      title: 'Immediate Dispatch Required - Zone D',
      description: 'High demand spike detected in commercial district with critical urgency',
      impact: 'Prevents 15+ delayed deliveries, maintains 95% on-time rate',
      estimatedTime: '5 min',
      packages: 8,
      drivers: ['driver-4'],
      zone: 'Zone D'
    },
    {
      id: 'suggestion-2',
      type: 'split',
      priority: 'high',
      title: 'Split Batch - Zone A',
      description: 'Large order volume can be split between 2 available drivers',
      impact: 'Reduces individual load by 40%, improves delivery time by 20%',
      estimatedTime: '10 min',
      packages: 12,
      drivers: ['driver-1', 'driver-3'],
      zone: 'Zone A'
    },
    {
      id: 'suggestion-3',
      type: 'delay',
      priority: 'medium',
      title: 'Delay Dispatch - Zone B',
      description: 'Driver delay expected, better to wait for optimal routing',
      impact: 'Avoids routing conflicts, saves 15 min total delivery time',
      estimatedTime: '25 min',
      packages: 6,
      drivers: ['driver-2'],
      zone: 'Zone B'
    }
  ];

  const handleDispatchAction = (suggestionId: string, action: 'start' | 'delay' | 'split') => {
    setIsProcessing(true);
    setSelectedSuggestion(suggestionId);
    
    // Find the suggestion to show specific feedback
    const suggestion = dispatchSuggestions.find(s => s.id === suggestionId);
    
    // Simulate API call with specific action feedback
    setTimeout(() => {
      setIsProcessing(false);
      setSelectedSuggestion(null);
      
      // Show action completion feedback
      const actionMessages = {
        start: `✅ Dispatch started for ${suggestion?.title || 'shipment'} - ${suggestion?.packages || 0} packages on the way`,
        delay: `⏰ Dispatch delayed for ${suggestion?.title || 'shipment'} - Rescheduled for later delivery`,
        split: `📦 Shipment split for ${suggestion?.title || 'shipment'} - Divided into smaller batches`
      };
      
      // Show notification toast
      setNotification(actionMessages[action]);
      
      // Auto-hide notification after 4 seconds
      setTimeout(() => {
        setNotification(null);
      }, 4000);
      
      // You could also update the suggestions array to reflect the action taken
      // For now, we'll just log it
    }, 1500);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-500/20';
      case 'busy': return 'text-blue-400 bg-blue-500/20';
      case 'delayed': return 'text-red-400 bg-red-500/20';
      case 'offline': return 'text-slate-400 bg-slate-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
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

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-blue-500/30 shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-blue-500/50 bg-slate-800/50">
          <h1 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-400" />
            Smart Dispatch
          </h1>
          <p className="text-xs text-slate-400">AI-powered optimization</p>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'zones', label: 'Demand Zones', icon: MapPin },
            { id: 'drivers', label: 'Drivers', icon: Users },
            { id: 'suggestions', label: 'AI Suggestions', icon: Zap },
            { id: 'aco', label: 'ACO Optimizer', icon: Activity }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all mb-1 border border-slate-600/50 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg border-blue-500'
                  : 'bg-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-700 border-slate-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <AnimatePresence mode="wait">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Critical Alert */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-400 mb-1">Critical Dispatch Alert</h3>
                  <p className="text-sm text-red-300">
                    High demand detected in Zone D (next 30 min) - 3 drivers nearby, 2 delayed. 
                    Immediate action required to maintain service levels.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded">Live</span>
                </div>
                <h3 className="text-2xl font-bold text-white">38</h3>
                <p className="text-sm text-slate-400">Total Orders</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Truck className="w-5 h-5 text-green-400" />
                  <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">4</span>
                </div>
                <h3 className="text-2xl font-bold text-white">2</h3>
                <p className="text-sm text-slate-400">Available Drivers</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded">Avg</span>
                </div>
                <h3 className="text-2xl font-bold text-white">12m</h3>
                <p className="text-sm text-slate-400">Avg Delivery Time</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded">94%</span>
                </div>
                <h3 className="text-2xl font-bold text-white">94%</h3>
                <p className="text-sm text-slate-400">On-Time Rate</p>
              </div>
            </div>

            {/* Top Suggestions */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                AI Dispatch Suggestions
              </h2>
              
              {dispatchSuggestions.slice(0, 2).map((suggestion) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-800 rounded-xl p-4 border-l-4 border-blue-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getPriorityIcon(suggestion.priority)}
                        <h3 className="font-semibold text-white">{suggestion.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getUrgencyColor(suggestion.priority)}`}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{suggestion.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          {suggestion.packages} packages
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {suggestion.estimatedTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {suggestion.zone}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleDispatchAction(suggestion.id, 'start')}
                        disabled={isProcessing && selectedSuggestion === suggestion.id}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors disabled:bg-slate-600"
                      >
                        {isProcessing && selectedSuggestion === suggestion.id ? 'Processing...' : 'Start'}
                      </button>
                      <button
                        onClick={() => handleDispatchAction(suggestion.id, 'delay')}
                        className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Delay
                      </button>
                      <button
                        onClick={() => {
                          setDetailSuggestion(suggestion);
                          setShowDetails(true);
                        }}
                        className="px-3 py-1 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        Details
                      </button>
                      {suggestion.type === 'split' && (
                        <button
                          onClick={() => handleDispatchAction(suggestion.id, 'split')}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                          aria-label="Split shipment"
                        >
                          <Split className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Demand Zones Tab */}
        {activeTab === 'zones' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" />
              Demand Zones Analysis
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demandZones.map((zone) => (
                <div key={zone.id} className="bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{zone.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getUrgencyColor(zone.urgency)}`}>
                      {zone.urgency}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Demand Level</span>
                        <span className="text-white font-medium">{zone.demand}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            zone.demand > 80 ? 'bg-red-500' : 
                            zone.demand > 60 ? 'bg-orange-500' : 
                            zone.demand > 40 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${zone.demand}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-slate-400">Orders:</span>
                        <span className="text-white ml-1">{zone.estimatedOrders}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Time:</span>
                        <span className="text-white ml-1">{zone.timeWindow}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`w-3 h-3 ${
                        zone.demandTrend === 'rising' ? 'text-red-400' : 
                        zone.demandTrend === 'stable' ? 'text-yellow-400' : 'text-green-400'
                      }`} />
                      <span className="text-xs text-slate-400">
                        {zone.demandTrend === 'rising' ? 'Demand rising' : 
                         zone.demandTrend === 'stable' ? 'Stable demand' : 'Demand falling'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Drivers Tab */}
        {activeTab === 'drivers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Driver Status Board
              </h2>
              
              {/* Search Field */}
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search drivers by name, location, status..."
                  value={driverSearchTerm}
                  onChange={(e) => setDriverSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {driverSearchTerm && (
                  <button
                    onClick={() => setDriverSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-600 rounded"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3 text-slate-400" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Results count */}
            {driverSearchTerm && (
              <div className="text-sm text-slate-400 mb-4">
                Found {filteredDrivers.length} driver{filteredDrivers.length !== 1 ? 's' : ''} matching "{driverSearchTerm}"
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDrivers.map((driver) => (
                <div 
                  key={driver.id} 
                  className="bg-slate-800 rounded-xl p-4 cursor-pointer hover:bg-slate-700 transition-all hover:scale-[1.02] hover:shadow-lg border border-slate-700 hover:border-blue-500/50"
                  onClick={() => {
                    setSelectedDriver(driver);
                    setShowDriverDetails(true);
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{driver.name}</h3>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(driver.status)}`}>
                        {driver.status}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Location:</span>
                      <span className="text-white">{driver.location}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">ETA:</span>
                      <span className={`font-medium ${
                        driver.estimatedArrival > 20 ? 'text-red-400' : 
                        driver.estimatedArrival > 10 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {driver.estimatedArrival} min
                      </span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Load:</span>
                        <span className="text-white">{driver.currentLoad}/{driver.maxCapacity}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            driver.currentLoad > driver.maxCapacity * 0.8 ? 'bg-red-500' : 
                            driver.currentLoad > driver.maxCapacity * 0.6 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(driver.currentLoad / driver.maxCapacity) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Efficiency:</span>
                      <span className={`font-medium ${
                        driver.efficiency > 90 ? 'text-green-400' : 
                        driver.efficiency > 80 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {driver.efficiency}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Map Location Button */}
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDriver(driver);
                        setShowDriverMap(true);
                      }}
                      className="w-full px-3 py-2 bg-blue-500/20 text-blue-400 text-sm rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      View Map Location
                    </button>
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
              All AI Dispatch Suggestions
            </h2>
            
            <div className="space-y-4">
              {dispatchSuggestions.map((suggestion) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: dispatchSuggestions.indexOf(suggestion) * 0.1 }}
                  className="bg-slate-800 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getPriorityIcon(suggestion.priority)}
                        <h3 className="font-semibold text-white">{suggestion.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getUrgencyColor(suggestion.priority)}`}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{suggestion.description}</p>
                      <p className="text-sm text-green-400 mb-3">💡 {suggestion.impact}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          {suggestion.packages} packages
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {suggestion.estimatedTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {suggestion.zone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {suggestion.drivers.length} drivers
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleDispatchAction(suggestion.id, 'start')}
                        disabled={isProcessing && selectedSuggestion === suggestion.id}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors disabled:bg-slate-600"
                      >
                        {isProcessing && selectedSuggestion === suggestion.id ? 'Processing...' : 'Start'}
                      </button>
                      <button
                        onClick={() => handleDispatchAction(suggestion.id, 'delay')}
                        className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Delay
                      </button>
                      <button
                        onClick={() => {
                          setDetailSuggestion(suggestion);
                          setShowDetails(true);
                        }}
                        className="px-3 py-1 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        Details
                      </button>
                      {suggestion.type === 'split' && (
                        <button
                          onClick={() => handleDispatchAction(suggestion.id, 'split')}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                          aria-label="Split shipment"
                        >
                          <Split className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ACO Optimizer Tab */}
        {activeTab === 'aco' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ACODashboard />
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && detailSuggestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {getPriorityIcon(detailSuggestion.priority)}
                  {detailSuggestion.title}
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Description</h4>
                  <p className="text-white">{detailSuggestion.description}</p>
                </div>

                {/* Impact */}
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Expected Impact</h4>
                  <p className="text-green-400">{detailSuggestion.impact}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Priority</div>
                    <div className={`text-sm font-medium px-2 py-1 rounded ${getUrgencyColor(detailSuggestion.priority)}`}>
                      {detailSuggestion.priority}
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Packages</div>
                    <div className="text-sm font-medium text-white">{detailSuggestion.packages}</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Est. Time</div>
                    <div className="text-sm font-medium text-white">{detailSuggestion.estimatedTime}</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Zone</div>
                    <div className="text-sm font-medium text-white">{detailSuggestion.zone}</div>
                  </div>
                </div>

                {/* Drivers */}
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Assigned Drivers</h4>
                  <div className="flex gap-2">
                    {detailSuggestion.drivers.map((driverId, index) => (
                      <div key={driverId} className="bg-slate-700/50 px-3 py-1 rounded-lg text-sm text-white">
                        Driver {index + 1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => {
                      handleDispatchAction(detailSuggestion.id, 'start');
                      setShowDetails(false);
                    }}
                    disabled={isProcessing && selectedSuggestion === detailSuggestion.id}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-slate-600"
                  >
                    {isProcessing && selectedSuggestion === detailSuggestion.id ? 'Processing...' : 'Start Dispatch'}
                  </button>
                  <button
                    onClick={() => {
                      handleDispatchAction(detailSuggestion.id, 'delay');
                      setShowDetails(false);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Delay Dispatch
                  </button>
                  {detailSuggestion.type === 'split' && (
                    <button
                      onClick={() => {
                        handleDispatchAction(detailSuggestion.id, 'split');
                        setShowDetails(false);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Split Batch
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Driver Details Modal */}
      <AnimatePresence>
        {showDriverDetails && selectedDriver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setShowDriverDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-3xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    selectedDriver.status === 'available' ? 'bg-green-400' :
                    selectedDriver.status === 'busy' ? 'bg-blue-400' :
                    selectedDriver.status === 'delayed' ? 'bg-red-400' : 'bg-slate-400'
                  }`}></div>
                  <h3 className="text-xl font-bold text-white">{selectedDriver.name}</h3>
                  <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(selectedDriver.status)}`}>
                    {selectedDriver.status}
                  </span>
                </div>
                <button
                  onClick={() => setShowDriverDetails(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Close driver details"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Driver Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    Driver Information
                  </h4>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Driver ID:</span>
                      <span className="text-white font-mono">{selectedDriver.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Location:</span>
                      <span className="text-white">{selectedDriver.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className={`font-medium ${getStatusColor(selectedDriver.status)}`}>
                        {selectedDriver.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    Performance Metrics
                  </h4>
                  
                  <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-400">Efficiency:</span>
                        <span className={`font-bold ${
                          selectedDriver.efficiency > 90 ? 'text-green-400' : 
                          selectedDriver.efficiency > 80 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {selectedDriver.efficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            selectedDriver.efficiency > 90 ? 'bg-green-500' : 
                            selectedDriver.efficiency > 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${selectedDriver.efficiency}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-400">Current Load:</span>
                        <span className="text-white font-bold">{selectedDriver.currentLoad}/{selectedDriver.maxCapacity}</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            selectedDriver.currentLoad > selectedDriver.maxCapacity * 0.8 ? 'bg-red-500' : 
                            selectedDriver.currentLoad > selectedDriver.maxCapacity * 0.6 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(selectedDriver.currentLoad / selectedDriver.maxCapacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  Time & Availability
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-1">Estimated Arrival</div>
                    <div className={`text-xl font-bold ${
                      selectedDriver.estimatedArrival > 20 ? 'text-red-400' : 
                      selectedDriver.estimatedArrival > 10 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {selectedDriver.estimatedArrival} min
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-1">Available Capacity</div>
                    <div className="text-xl font-bold text-blue-400">
                      {selectedDriver.maxCapacity - selectedDriver.currentLoad}
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-1">Load Percentage</div>
                    <div className="text-xl font-bold text-white">
                      {Math.round((selectedDriver.currentLoad / selectedDriver.maxCapacity) * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-slate-700">
                <button
                  onClick={() => setShowDriverDetails(false)}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setNotification(`📞 Contact initiated with ${selectedDriver.name}`);
                    setShowDriverDetails(false);
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Contact Driver
                </button>
                <button
                  onClick={() => {
                    setNotification(`📍 Real-time tracking activated for ${selectedDriver.name}`);
                    setShowDriverDetails(false);
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Track Location
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Driver Map Modal */}
      <AnimatePresence>
        {showDriverMap && selectedDriver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDriverMap(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl max-w-4xl w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Map Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">{selectedDriver.name} - Live Location</h3>
                  <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedDriver.status)}`}>
                    {selectedDriver.status}
                  </span>
                </div>
                <button
                  onClick={() => setShowDriverMap(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Close map"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Map Container */}
              <div className="h-96 bg-slate-900">
                {typeof window !== 'undefined' && (
                  <MapContainer
                    center={getDriverCoordinates(selectedDriver.location)}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={getDriverCoordinates(selectedDriver.location)}
                      icon={driverIcon}
                    >
                      <Popup>
                        <div className="text-slate-800">
                          <h4 className="font-bold">{selectedDriver.name}</h4>
                          <p className="text-sm">Status: {selectedDriver.status}</p>
                          <p className="text-sm">Location: {selectedDriver.location}</p>
                          <p className="text-sm">ETA: {selectedDriver.estimatedArrival} min</p>
                          <p className="text-sm">Load: {selectedDriver.currentLoad}/{selectedDriver.maxCapacity}</p>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                )}
              </div>

              {/* Map Footer */}
              <div className="p-4 bg-slate-700/50 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">
                    Last updated: Just now • Real-time tracking enabled
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setNotification(`📍 Real-time tracking activated for ${selectedDriver.name}`);
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Refresh
                    </button>
                    <button
                      onClick={() => setShowDriverMap(false)}
                      className="px-3 py-1 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Supplier_Smart_Dispatch;
