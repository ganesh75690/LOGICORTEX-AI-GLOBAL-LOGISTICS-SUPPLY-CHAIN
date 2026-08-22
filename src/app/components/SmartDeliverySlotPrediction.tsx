import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Clock, 
  MapPin, 
  Bell, 
  RefreshCw, 
  Truck, 
  User, 
  Home,
  CheckCircle,
  Navigation,
  Smartphone,
  Mail,
  Zap,
  TrendingUp,
  Activity,
  ArrowRight
} from 'lucide-react';

interface DeliveryPrediction {
  id: string;
  orderId: string;
  customerName: string;
  customerAddress: string;
  currentStatus: 'preparing' | 'out-for-delivery' | 'nearby' | 'delivered';
  predictedTimeWindow: {
    start: string;
    end: string;
    confidence: number;
  };
  realTimeUpdates: {
    driverName?: string;
    driverLocation?: string;
    estimatedMinutes?: number;
    trafficConditions?: 'light' | 'moderate' | 'heavy';
    weatherImpact?: 'none' | 'minor' | 'significant';
  };
  notifications: {
    sms: boolean;
    email: boolean;
    push: boolean;
  };
  accuracy: {
    historicalAccuracy: number;
    todayAccuracy: number;
    factors: string[];
  };
}

export function SmartDeliverySlotPrediction() {
  const [predictions, setPredictions] = useState<DeliveryPrediction[]>([
    {
      id: '1',
      orderId: 'ORD-2024-0042',
      customerName: 'Sarah Johnson',
      customerAddress: '123 Maple Street, Boston, MA 02108',
      currentStatus: 'out-for-delivery',
      predictedTimeWindow: {
        start: '4:10 PM',
        end: '4:25 PM',
        confidence: 94
      },
      realTimeUpdates: {
        driverName: 'Mike Chen',
        driverLocation: '2.3 miles away',
        estimatedMinutes: 12,
        trafficConditions: 'moderate',
        weatherImpact: 'none'
      },
      notifications: {
        sms: true,
        email: true,
        push: true
      },
      accuracy: {
        historicalAccuracy: 96,
        todayAccuracy: 98,
        factors: ['Real-time traffic', 'Weather conditions', 'Driver efficiency', 'Route optimization']
      }
    },
    {
      id: '2',
      orderId: 'ORD-2024-0043',
      customerName: 'Robert Williams',
      customerAddress: '456 Oak Avenue, Cambridge, MA 02138',
      currentStatus: 'preparing',
      predictedTimeWindow: {
        start: '5:45 PM',
        end: '6:15 PM',
        confidence: 87
      },
      realTimeUpdates: {
        estimatedMinutes: 125,
        trafficConditions: 'light',
        weatherImpact: 'minor'
      },
      notifications: {
        sms: true,
        email: false,
        push: true
      },
      accuracy: {
        historicalAccuracy: 94,
        todayAccuracy: 92,
        factors: ['Order preparation time', 'Warehouse efficiency', 'Route planning']
      }
    },
    {
      id: '3',
      orderId: 'ORD-2024-0044',
      customerName: 'Emily Davis',
      customerAddress: '789 Pine Road, Somerville, MA 02143',
      currentStatus: 'nearby',
      predictedTimeWindow: {
        start: '3:55 PM',
        end: '4:10 PM',
        confidence: 91
      },
      realTimeUpdates: {
        driverName: 'Lisa Rodriguez',
        driverLocation: '0.8 miles away',
        estimatedMinutes: 8,
        trafficConditions: 'heavy',
        weatherImpact: 'minor'
      },
      notifications: {
        sms: true,
        email: true,
        push: false
      },
      accuracy: {
        historicalAccuracy: 95,
        todayAccuracy: 96,
        factors: ['Traffic delays', 'Weather impact', 'Driver experience']
      }
    },
    {
      id: '4',
      orderId: 'ORD-2024-0045',
      customerName: 'Michael Brown',
      customerAddress: '321 Elm Street, Brookline, MA 02445',
      currentStatus: 'delivered',
      predictedTimeWindow: {
        start: '2:30 PM',
        end: '2:45 PM',
        confidence: 98
      },
      realTimeUpdates: {
        driverName: 'David Kim',
        estimatedMinutes: 0
      },
      notifications: {
        sms: true,
        email: true,
        push: true
      },
      accuracy: {
        historicalAccuracy: 98,
        todayAccuracy: 100,
        factors: ['Perfect timing', 'No delays', 'Optimal route']
      }
    }
  ]);

  const [autoUpdate, setAutoUpdate] = useState(true);
  const [selectedPrediction, setSelectedPrediction] = useState<DeliveryPrediction | null>(null);

  useEffect(() => {
    if (!autoUpdate) return;

    const interval = setInterval(() => {
      setPredictions(prev => prev.map(prediction => {
        // Simulate real-time updates
        const updated = { ...prediction };
        
        if (prediction.realTimeUpdates.estimatedMinutes && prediction.realTimeUpdates.estimatedMinutes > 0) {
          updated.realTimeUpdates.estimatedMinutes = Math.max(0, prediction.realTimeUpdates.estimatedMinutes - 1);
          
          // Update status based on time remaining
          if (prediction.realTimeUpdates.estimatedMinutes === 0 && prediction.currentStatus !== 'delivered') {
            updated.currentStatus = 'delivered';
            updated.predictedTimeWindow.confidence = 100;
          } else if (prediction.realTimeUpdates.estimatedMinutes <= 5 && prediction.currentStatus === 'out-for-delivery') {
            updated.currentStatus = 'nearby';
          }
        }
        
        return updated;
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [autoUpdate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'nearby': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'out-for-delivery': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'preparing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'nearby': return Navigation;
      case 'out-for-delivery': return Truck;
      case 'preparing': return Package;
      default: return Clock;
    }
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'light': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'heavy': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getWeatherColor = (weather: string) => {
    switch (weather) {
      case 'none': return 'text-green-400';
      case 'minor': return 'text-yellow-400';
      case 'significant': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const formatTimeWindow = (start: string, end: string) => {
    return `${start} – ${end}`;
  };

  const updateNotifications = (predictionId: string, type: 'sms' | 'email' | 'push') => {
    setPredictions(prev => prev.map(p => 
      p.id === predictionId 
        ? { ...p, notifications: { ...p.notifications, [type]: !p.notifications[type] } }
        : p
    ));
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Smart Delivery Slot Prediction</h3>
            <p className="text-xs text-slate-400">Real-time delivery time estimates for customers</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">Live</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-400">96%</div>
            <div className="text-xs text-slate-400">Accuracy Today</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-400">12</div>
            <div className="text-xs text-slate-400">Active Deliveries</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-purple-400">4.2</div>
            <div className="text-xs text-slate-400">Avg Minutes Early</div>
          </div>
        </div>

        {/* Auto-update toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoUpdate(!autoUpdate)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              autoUpdate
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${autoUpdate ? 'animate-spin' : ''}`} />
            Auto-update {autoUpdate ? 'ON' : 'OFF'}
          </button>
          <span className="text-xs text-slate-500">
            Updates every minute
          </span>
        </div>
      </div>

      {/* Predictions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {predictions.map(prediction => {
            const StatusIcon = getStatusIcon(prediction.currentStatus);
            return (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 cursor-pointer hover:bg-slate-800/70 transition-all"
                onClick={() => setSelectedPrediction(prediction)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(prediction.currentStatus)}`}>
                      <StatusIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{prediction.orderId}</h4>
                      <p className="text-slate-400 text-xs">{prediction.customerName}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${getStatusColor(prediction.currentStatus)}`}>
                    {prediction.currentStatus.replace('-', ' ')}
                  </div>
                </div>

                {/* Time Window */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span className="text-xs text-slate-500">Predicted Arrival</span>
                  </div>
                  <div className="text-lg font-bold text-blue-400">
                    {formatTimeWindow(prediction.predictedTimeWindow.start, prediction.predictedTimeWindow.end)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{prediction.predictedTimeWindow.confidence}% confidence</span>
                  </div>
                </div>

                {/* Real-time Updates */}
                {prediction.currentStatus !== 'delivered' && prediction.realTimeUpdates.estimatedMinutes !== undefined && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-slate-500">Real-time Updates</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {prediction.realTimeUpdates.driverName && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-300">{prediction.realTimeUpdates.driverName}</span>
                        </div>
                      )}
                      {prediction.realTimeUpdates.driverLocation && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-300">{prediction.realTimeUpdates.driverLocation}</span>
                        </div>
                      )}
                      {prediction.realTimeUpdates.estimatedMinutes > 0 && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-orange-400" />
                          <span className="text-slate-300">{prediction.realTimeUpdates.estimatedMinutes} min</span>
                        </div>
                      )}
                      {prediction.realTimeUpdates.trafficConditions && (
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          <span className={getTrafficColor(prediction.realTimeUpdates.trafficConditions)}>
                            {prediction.realTimeUpdates.trafficConditions} traffic
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Address */}
                <div className="mb-3">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Home className="w-3 h-3" />
                    <span>{prediction.customerAddress}</span>
                  </div>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Notifications:</span>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); updateNotifications(prediction.id, 'sms'); }}
                        className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                          prediction.notifications.sms 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-slate-700/50 text-slate-500'
                        }`}
                        aria-label="SMS notifications"
                      >
                        <Smartphone className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); updateNotifications(prediction.id, 'email'); }}
                        className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                          prediction.notifications.email 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-slate-700/50 text-slate-500'
                        }`}
                        aria-label="Email notifications"
                      >
                        <Mail className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); updateNotifications(prediction.id, 'push'); }}
                        className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                          prediction.notifications.push 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-slate-700/50 text-slate-500'
                        }`}
                        aria-label="Push notifications"
                      >
                        <Bell className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>{prediction.accuracy.todayAccuracy}% accurate</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Detailed Prediction Modal */}
      <AnimatePresence>
        {selectedPrediction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPrediction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{selectedPrediction.orderId}</h3>
                    <p className="text-slate-400">{selectedPrediction.customerName}</p>
                    <p className="text-slate-500 text-sm">{selectedPrediction.customerAddress}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPrediction(null)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
                    aria-label="Close details"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* Delivery Status */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-3">Delivery Status</h4>
                  <div className={`rounded-lg p-4 border ${getStatusColor(selectedPrediction.currentStatus)}`}>
                    <div className="flex items-center gap-3">
                      {(() => {
                        const StatusIcon = getStatusIcon(selectedPrediction.currentStatus);
                        return <StatusIcon className="w-6 h-6" />;
                      })()}
                      <div>
                        <div className="text-lg font-medium capitalize">
                          {selectedPrediction.currentStatus.replace('-', ' ')}
                        </div>
                        <div className="text-sm opacity-80">
                          {formatTimeWindow(selectedPrediction.predictedTimeWindow.start, selectedPrediction.predictedTimeWindow.end)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accuracy Metrics */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-3">Prediction Accuracy</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <p className="text-xs text-slate-500 mb-1">Historical Accuracy</p>
                      <p className="text-lg font-medium text-green-400">{selectedPrediction.accuracy.historicalAccuracy}%</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <p className="text-xs text-slate-500 mb-1">Today's Accuracy</p>
                      <p className="text-lg font-medium text-blue-400">{selectedPrediction.accuracy.todayAccuracy}%</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-slate-500 mb-2">Accuracy Factors:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedPrediction.accuracy.factors.map((factor, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Real-time Updates */}
                {selectedPrediction.currentStatus !== 'delivered' && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-white mb-3">Real-time Updates</h4>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 space-y-3">
                      {selectedPrediction.realTimeUpdates.driverName && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">Driver: {selectedPrediction.realTimeUpdates.driverName}</span>
                        </div>
                      )}
                      {selectedPrediction.realTimeUpdates.driverLocation && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">Location: {selectedPrediction.realTimeUpdates.driverLocation}</span>
                        </div>
                      )}
                      {selectedPrediction.realTimeUpdates.estimatedMinutes !== undefined && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-400" />
                          <span className="text-sm text-slate-300">ETA: {selectedPrediction.realTimeUpdates.estimatedMinutes} minutes</span>
                        </div>
                      )}
                      {selectedPrediction.realTimeUpdates.trafficConditions && (
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          <span className={`text-sm ${getTrafficColor(selectedPrediction.realTimeUpdates.trafficConditions)}`}>
                            Traffic: {selectedPrediction.realTimeUpdates.trafficConditions}
                          </span>
                        </div>
                      )}
                      {selectedPrediction.realTimeUpdates.weatherImpact && (
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span className={`text-sm ${getWeatherColor(selectedPrediction.realTimeUpdates.weatherImpact)}`}>
                            Weather Impact: {selectedPrediction.realTimeUpdates.weatherImpact}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notification Preferences */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Customer Notifications</h4>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className={`w-4 h-4 ${selectedPrediction.notifications.sms ? 'text-blue-400' : 'text-slate-500'}`} />
                        <Mail className={`w-4 h-4 ${selectedPrediction.notifications.email ? 'text-blue-400' : 'text-slate-500'}`} />
                        <Bell className={`w-4 h-4 ${selectedPrediction.notifications.push ? 'text-blue-400' : 'text-slate-500'}`} />
                        <span className="text-sm text-slate-300">
                          {[
                            selectedPrediction.notifications.sms && 'SMS',
                            selectedPrediction.notifications.email && 'Email',
                            selectedPrediction.notifications.push && 'Push'
                          ].filter(Boolean).join(', ') || 'No notifications'}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
