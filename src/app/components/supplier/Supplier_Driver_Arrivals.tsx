import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Truck, 
  Clock, 
  MapPin, 
  Navigation, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Activity, 
  Route, 
  Timer, 
  Radio, 
  Phone, 
  MessageCircle, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Zap,
  Calendar,
  Package,
  Fuel,
  Wrench,
  Battery,
  RefreshCw
} from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  phone: string;
  currentLocation: string;
  destination: string;
  estimatedArrival: number;
  actualArrival?: number;
  status: 'on-time' | 'delayed' | 'early' | 'in-transit' | 'offline';
  vehicleType: 'van' | 'truck' | 'motorcycle';
  currentLoad: number;
  maxCapacity: number;
  fuelLevel: number;
  lastUpdate: string;
  route: string[];
  delayReason?: string;
  efficiency: number;
  todayDeliveries: number;
  todayDistance: number;
}

interface RouteSegment {
  id: string;
  name: string;
  distance: number;
  estimatedTime: number;
  trafficLevel: 'low' | 'medium' | 'high' | 'severe';
  weatherCondition: 'clear' | 'rain' | 'fog' | 'storm';
}

interface ArrivalPrediction {
  driverId: string;
  predictedTime: number;
  confidence: number;
  factors: {
    traffic: number;
    weather: number;
    historical: number;
    current: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
}

const Supplier_Driver_Arrivals = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'drivers' | 'predictions' | 'routes'>('overview');
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);

  const drivers: Driver[] = [
    {
      id: 'driver-1',
      name: 'Raj Kumar',
      phone: '+91 98765 43210',
      currentLocation: 'Mumbai Central',
      destination: 'Warehouse A - Dadar',
      estimatedArrival: 12,
      actualArrival: 15,
      status: 'delayed',
      vehicleType: 'van',
      currentLoad: 8,
      maxCapacity: 12,
      fuelLevel: 75,
      lastUpdate: '2 min ago',
      route: ['Mumbai Central', 'Worli', 'Lower Parel', 'Dadar'],
      delayReason: 'Heavy traffic at Worli',
      efficiency: 85,
      todayDeliveries: 24,
      todayDistance: 45
    },
    {
      id: 'driver-2',
      name: 'Priya Sharma',
      phone: '+91 98765 43211',
      currentLocation: 'Pune Station',
      destination: 'Warehouse B - Kalyani Nagar',
      estimatedArrival: 25,
      status: 'on-time',
      vehicleType: 'truck',
      currentLoad: 15,
      maxCapacity: 20,
      fuelLevel: 60,
      lastUpdate: '1 min ago',
      route: ['Pune Station', 'Swargate', 'Fatima Nagar', 'Kalyani Nagar'],
      efficiency: 92,
      todayDeliveries: 18,
      todayDistance: 62
    },
    {
      id: 'driver-3',
      name: 'Amit Patel',
      phone: '+91 98765 43212',
      currentLocation: 'Thane West',
      destination: 'Warehouse D - Ghodbunder Road',
      estimatedArrival: 8,
      actualArrival: 6,
      status: 'early',
      vehicleType: 'motorcycle',
      currentLoad: 4,
      maxCapacity: 6,
      fuelLevel: 90,
      lastUpdate: '3 min ago',
      route: ['Thane West', 'Thane Station', 'Ghodbunder Road'],
      efficiency: 88,
      todayDeliveries: 32,
      todayDistance: 28
    },
    {
      id: 'driver-4',
      name: 'Sneha Reddy',
      phone: '+91 98765 43213',
      currentLocation: 'Nashik Road',
      destination: 'Warehouse C - Satpur',
      estimatedArrival: 35,
      status: 'in-transit',
      vehicleType: 'van',
      currentLoad: 10,
      maxCapacity: 15,
      fuelLevel: 45,
      lastUpdate: '5 min ago',
      route: ['Nashik Road', 'CBS', 'Satpur'],
      efficiency: 78,
      todayDeliveries: 15,
      todayDistance: 38
    }
  ];

  const arrivalPredictions: ArrivalPrediction[] = [
    {
      driverId: 'driver-1',
      predictedTime: 18,
      confidence: 85,
      factors: {
        traffic: 45,
        weather: 10,
        historical: 25,
        current: 20
      },
      riskLevel: 'high',
      recommendations: [
        'Consider rerouting via Eastern Express Highway',
        'Inform customer about 15-minute delay',
        'Prepare alternative loading dock'
      ]
    },
    {
      driverId: 'driver-2',
      predictedTime: 28,
      confidence: 92,
      factors: {
        traffic: 15,
        weather: 5,
        historical: 60,
        current: 20
      },
      riskLevel: 'low',
      recommendations: [
        'Maintain current route',
        'Prepare loading dock on time'
      ]
    },
    {
      driverId: 'driver-3',
      predictedTime: 6,
      confidence: 88,
      factors: {
        traffic: 10,
        weather: 5,
        historical: 50,
        current: 35
      },
      riskLevel: 'low',
      recommendations: [
        'Early arrival - can take additional orders',
        'Utilize extra time for vehicle check'
      ]
    },
    {
      driverId: 'driver-4',
      predictedTime: 42,
      confidence: 75,
      factors: {
        traffic: 35,
        weather: 20,
        historical: 30,
        current: 15
      },
      riskLevel: 'medium',
      recommendations: [
        'Monitor fuel levels',
        'Consider rest stop at Nashik',
        'Update customer if delay exceeds 10 minutes'
      ]
    }
  ];

  const routeSegments: RouteSegment[] = [
    {
      id: 'segment-1',
      name: 'Mumbai Central - Worli',
      distance: 8,
      estimatedTime: 15,
      trafficLevel: 'high',
      weatherCondition: 'clear'
    },
    {
      id: 'segment-2',
      name: 'Worli - Lower Parel',
      distance: 5,
      estimatedTime: 12,
      trafficLevel: 'medium',
      weatherCondition: 'clear'
    },
    {
      id: 'segment-3',
      name: 'Pune Station - Swargate',
      distance: 6,
      estimatedTime: 18,
      trafficLevel: 'medium',
      weatherCondition: 'rain'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'early': return 'text-green-400 bg-green-500/20';
      case 'on-time': return 'text-blue-400 bg-blue-500/20';
      case 'delayed': return 'text-red-400 bg-red-500/20';
      case 'in-transit': return 'text-yellow-400 bg-yellow-500/20';
      case 'offline': return 'text-slate-400 bg-slate-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getTrafficColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'severe': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'van': return <Truck className="w-4 h-4" />;
      case 'truck': return <Truck className="w-5 h-5" />;
      case 'motorcycle': return <Package className="w-3 h-3" />;
      default: return <Truck className="w-4 h-4" />;
    }
  };

  const handleDriverAction = (driverId: string, action: 'call' | 'message' | 'track') => {
    console.log(`${action} driver ${driverId}`);
  };

  const getArrivalStatus = (driver: Driver, prediction: ArrivalPrediction) => {
    const diff = prediction.predictedTime - driver.estimatedArrival;
    if (diff > 5) return { status: 'delayed', color: 'text-red-400', label: `+${diff} min delay` };
    if (diff < -5) return { status: 'early', color: 'text-green-400', label: `${Math.abs(diff)} min early` };
    return { status: 'on-time', color: 'text-blue-400', label: 'On time' };
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-400" />
          Driver Arrival Prediction Board
        </h1>
        <p className="text-slate-400">Real-time driver tracking and AI-powered arrival predictions</p>
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-between mb-6 bg-slate-800 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-green-400" />
            <span className="text-sm text-white">Live Tracking Active</span>
          </div>
          <div className="text-sm text-slate-400">
            Last updated: <span className="text-white">30 sec ago</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            Auto-refresh
          </label>
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="bg-slate-700 text-white text-sm px-3 py-1 rounded border border-slate-600"
            aria-label="Refresh interval"
          >
            <option value={30}>30 sec</option>
            <option value={60}>1 min</option>
            <option value={300}>5 min</option>
          </select>
          <button 
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            aria-label="Refresh data"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'drivers', label: 'Drivers', icon: Users },
          { id: 'predictions', label: 'Predictions', icon: Zap },
          { id: 'routes', label: 'Routes', icon: Route }
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
                  <Truck className="w-5 h-5 text-blue-400" />
                  <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded">Active</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{drivers.length}</h3>
                <p className="text-sm text-slate-400">Drivers on Road</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">Avg</span>
                </div>
                <h3 className="text-2xl font-bold text-white">20m</h3>
                <p className="text-sm text-slate-400">Avg Arrival Time</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">Alert</span>
                </div>
                <h3 className="text-2xl font-bold text-white">2</h3>
                <p className="text-sm text-slate-400">Delayed Drivers</p>
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded">AI</span>
                </div>
                <h3 className="text-2xl font-bold text-white">87%</h3>
                <p className="text-sm text-slate-400">Prediction Accuracy</p>
              </div>
            </div>

            {/* Critical Alerts */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Critical Arrival Alerts
              </h2>
              
              {drivers.filter(d => d.status === 'delayed').map((driver) => {
                const prediction = arrivalPredictions.find(p => p.driverId === driver.id);
                const arrivalStatus = getArrivalStatus(driver, prediction!);
                
                return (
                  <motion.div
                    key={driver.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          {getVehicleIcon(driver.vehicleType)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{driver.name}</h3>
                          <p className="text-sm text-red-300">{driver.delayReason}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-bold ${arrivalStatus.color}`}>
                          {prediction?.predictedTime} min
                        </div>
                        <div className="text-sm text-red-400">{arrivalStatus.label}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Upcoming Arrivals */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                Upcoming Arrivals (Next 30 min)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {drivers
                  .filter(d => d.estimatedArrival <= 30)
                  .sort((a, b) => a.estimatedArrival - b.estimatedArrival)
                  .map((driver) => {
                    const prediction = arrivalPredictions.find(p => p.driverId === driver.id);
                    const arrivalStatus = getArrivalStatus(driver, prediction!);
                    
                    return (
                      <div key={driver.id} className="bg-slate-800 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getVehicleIcon(driver.vehicleType)}
                            <span className="font-semibold text-white">{driver.name}</span>
                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(driver.status)}`}>
                              {driver.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${arrivalStatus.color}`}>
                              {prediction?.predictedTime} min
                            </div>
                            <div className="text-xs text-slate-400">{arrivalStatus.label}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Route:</span>
                            <span className="text-white">{driver.currentLocation} → {driver.destination}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Load:</span>
                            <span className="text-white">{driver.currentLoad}/{driver.maxCapacity}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Fuel:</span>
                            <span className={`font-medium ${
                              driver.fuelLevel > 50 ? 'text-green-400' : 
                              driver.fuelLevel > 25 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {driver.fuelLevel}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleDriverAction(driver.id, 'call')}
                            className="flex-1 px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <Phone className="w-3 h-3 inline mr-1" />
                            Call
                          </button>
                          <button
                            onClick={() => handleDriverAction(driver.id, 'message')}
                            className="flex-1 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <MessageCircle className="w-3 h-3 inline mr-1" />
                            Message
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
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
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              All Drivers Status
            </h2>
            
            <div className="space-y-4">
              {drivers.map((driver) => {
                const prediction = arrivalPredictions.find(p => p.driverId === driver.id);
                const arrivalStatus = getArrivalStatus(driver, prediction!);
                
                return (
                  <div key={driver.id} className="bg-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700 rounded-lg">
                          {getVehicleIcon(driver.vehicleType)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{driver.name}</h3>
                          <p className="text-sm text-slate-400">{driver.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(driver.status)}`}>
                          {driver.status}
                        </span>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${arrivalStatus.color}`}>
                            {prediction?.predictedTime} min
                          </div>
                          <div className="text-xs text-slate-400">{arrivalStatus.label}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Location & Route</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Current:</span>
                            <span className="text-white">{driver.currentLocation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Destination:</span>
                            <span className="text-white">{driver.destination}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Last Update:</span>
                            <span className="text-white">{driver.lastUpdate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Vehicle Status</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Load:</span>
                            <span className="text-white">{driver.currentLoad}/{driver.maxCapacity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Fuel:</span>
                            <span className={`font-medium ${
                              driver.fuelLevel > 50 ? 'text-green-400' : 
                              driver.fuelLevel > 25 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {driver.fuelLevel}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Efficiency:</span>
                            <span className="text-white">{driver.efficiency}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Today's Performance</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Deliveries:</span>
                            <span className="text-white">{driver.todayDeliveries}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Distance:</span>
                            <span className="text-white">{driver.todayDistance} km</span>
                          </div>
                          {driver.delayReason && (
                            <div className="flex justify-between">
                              <span className="text-slate-400">Delay:</span>
                              <span className="text-red-400">{driver.delayReason}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleDriverAction(driver.id, 'call')}
                        className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Phone className="w-4 h-4 inline mr-1" />
                        Call
                      </button>
                      <button
                        onClick={() => handleDriverAction(driver.id, 'message')}
                        className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 inline mr-1" />
                        Message
                      </button>
                      <button
                        onClick={() => handleDriverAction(driver.id, 'track')}
                        className="flex-1 px-3 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        <Navigation className="w-4 h-4 inline mr-1" />
                        Track
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              AI Arrival Predictions
            </h2>
            
            <div className="space-y-4">
              {arrivalPredictions.map((prediction) => {
                const driver = drivers.find(d => d.id === prediction.driverId);
                const arrivalStatus = getArrivalStatus(driver!, prediction);
                
                return (
                  <div key={prediction.driverId} className="bg-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700 rounded-lg">
                          {getVehicleIcon(driver!.vehicleType)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{driver!.name}</h3>
                          <p className="text-sm text-slate-400">{driver!.currentLocation} → {driver!.destination}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-bold ${arrivalStatus.color}`}>
                          {prediction.predictedTime} min
                        </div>
                        <div className="text-xs text-slate-400">Confidence: {prediction.confidence}%</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Prediction Factors</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Traffic:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-slate-700 rounded-full h-2">
                                <div 
                                  className="h-2 bg-orange-500 rounded-full"
                                  style={{ width: `${prediction.factors.traffic}%` }}
                                />
                              </div>
                              <span className="text-white">{prediction.factors.traffic}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Weather:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-slate-700 rounded-full h-2">
                                <div 
                                  className="h-2 bg-blue-500 rounded-full"
                                  style={{ width: `${prediction.factors.weather}%` }}
                                />
                              </div>
                              <span className="text-white">{prediction.factors.weather}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Historical:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-slate-700 rounded-full h-2">
                                <div 
                                  className="h-2 bg-purple-500 rounded-full"
                                  style={{ width: `${prediction.factors.historical}%` }}
                                />
                              </div>
                              <span className="text-white">{prediction.factors.historical}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Current:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-slate-700 rounded-full h-2">
                                <div 
                                  className="h-2 bg-green-500 rounded-full"
                                  style={{ width: `${prediction.factors.current}%` }}
                                />
                              </div>
                              <span className="text-white">{prediction.factors.current}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Risk Assessment & Recommendations</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Risk Level:</span>
                            <span className={`text-sm font-medium ${getRiskColor(prediction.riskLevel)}`}>
                              {prediction.riskLevel.toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm text-slate-400">Recommendations:</span>
                            <ul className="mt-1 space-y-1">
                              {prediction.recommendations.map((rec, index) => (
                                <li key={index} className="text-xs text-blue-400 ml-4">
                                  • {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Route className="w-5 h-5 text-purple-400" />
              Route Analysis
            </h2>
            
            <div className="space-y-4">
              {routeSegments.map((segment) => (
                <div key={segment.id} className="bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{segment.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${getTrafficColor(segment.trafficLevel)}`}>
                        {segment.trafficLevel} traffic
                      </span>
                      <span className="text-sm text-slate-400">
                        {segment.weatherCondition}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Distance:</span>
                      <span className="text-white">{segment.distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Est. Time:</span>
                      <span className="text-white">{segment.estimatedTime} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Speed:</span>
                      <span className="text-white">{Math.round(segment.distance / segment.estimatedTime * 60)} km/h</span>
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

export default Supplier_Driver_Arrivals;
