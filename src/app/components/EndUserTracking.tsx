import { Package, MapPin, Clock, CheckCircle, Navigation, Phone, Star, Bell, History, AlertTriangle, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface TrackingStep {
  id: string;
  title: string;
  timestamp: string;
  status: 'completed' | 'active' | 'pending';
  location: string;
}

const trackingSteps: TrackingStep[] = [
  { id: '1', title: 'Order Placed', timestamp: 'Apr 21, 10:30 AM', status: 'completed', location: 'Online Store' },
  { id: '2', title: 'Package Prepared', timestamp: 'Apr 21, 2:15 PM', status: 'completed', location: 'Warehouse A' },
  { id: '3', title: 'In Transit', timestamp: 'Apr 22, 8:45 AM', status: 'active', location: 'En Route to City Hub' },
  { id: '4', title: 'Out for Delivery', timestamp: 'Expected 2:30 PM', status: 'pending', location: 'Local Hub' },
  { id: '5', title: 'Delivered', timestamp: 'Expected 3:15 PM', status: 'pending', location: 'Your Address' },
];

const notifications = [
  { id: 'N001', type: 'info', message: 'Your package is out for delivery', time: '10 min ago', read: false },
  { id: 'N002', type: 'warning', message: 'Delivery delayed due to traffic', time: '2 hours ago', read: true },
  { id: 'N003', type: 'success', message: 'Package picked up from warehouse', time: '5 hours ago', read: true },
  { id: 'N004', type: 'info', message: 'Order confirmed and processed', time: '1 day ago', read: true },
];

const deliveryHistory = [
  {
    id: 'DH001',
    orderNumber: 'ORD-2024-03-8921',
    date: '2024-03-15',
    items: 'Electronics (2 items)',
    status: 'delivered',
    deliveredTo: 'Home Address',
    rating: 5,
    feedback: 'Fast delivery, excellent packaging'
  },
  {
    id: 'DH002', 
    orderNumber: 'ORD-2024-03-7845',
    date: '2024-03-10',
    items: 'Books (3 items)',
    status: 'delivered',
    deliveredTo: 'Office Address',
    rating: 4,
    feedback: 'Good service, on time'
  },
  {
    id: 'DH003',
    orderNumber: 'ORD-2024-03-6723',
    date: '2024-03-05',
    items: 'Clothing (4 items)',
    status: 'delivered',
    deliveredTo: 'Home Address',
    rating: 5,
    feedback: 'Very satisfied with the delivery'
  }
];

export function EndUserTracking() {
  const [showDriverInfo, setShowDriverInfo] = useState(false);
  const [activeTab, setActiveTab] = useState<'tracking' | 'notifications' | 'history'>('tracking');

  const activeStep = trackingSteps.find(s => s.status === 'active');

  return (
    <div className="max-w-2xl mx-auto">
      {/* Order Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 mb-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm opacity-90 mb-1">Order #ORD-2024-04-7845</div>
            <h1 className="text-3xl font-bold mb-2">Track Your Delivery</h1>
            <p className="text-sm opacity-90">2 items • Estimated delivery today</p>
          </div>
          <Package className="w-12 h-12 opacity-80" />
        </div>

        {/* Live ETA */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">AI-Powered Live ETA</div>
              <div className="text-2xl font-bold">2:47 PM</div>
              <div className="text-xs opacity-75 mt-1">Updated 30 seconds ago</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90 mb-1">Distance Remaining</div>
              <div className="text-xl font-bold">4.2 km</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Map */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Live Location</h2>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-medium">Tracking Active</span>
          </div>
        </div>

        {/* Simplified Map Visualization */}
        <div className="relative h-64 bg-slate-900 rounded-xl overflow-hidden mb-4">
          <svg className="w-full h-full opacity-20">
            <defs>
              <pattern id="trackingGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgb(148, 163, 184)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#trackingGrid)" />
          </svg>

          {/* Route Line */}
          <svg className="absolute inset-0">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#22c55e" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#94a3b8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M 20% 80% L 80% 20%"
              stroke="url(#routeGradient)"
              strokeWidth="4"
              fill="none"
              className="drop-shadow-lg"
            />
            {/* Delivery Vehicle */}
            <circle cx="60%" cy="40%" r="8" fill="#22c55e" className="drop-shadow-xl">
              <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Your Location */}
          <div className="absolute bottom-[20%] right-[20%] flex items-center gap-2 bg-blue-500/90 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-sm">
            <MapPin className="w-4 h-4" />
            <span>Your Location</span>
          </div>

          {/* Driver Location */}
          <div className="absolute top-[40%] left-[60%] flex items-center gap-2 bg-green-500/90 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-sm">
            <Navigation className="w-4 h-4" />
            <span>Driver</span>
          </div>
        </div>

        {/* Driver Info */}
        <motion.button
          onClick={() => setShowDriverInfo(!showDriverInfo)}
          className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600/50 hover:bg-slate-700 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
              JS
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-semibold text-white">John Smith</div>
              <div className="text-xs text-slate-400">Your delivery driver</div>
            </div>
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>4.9</span>
            </div>
            <Phone className="w-5 h-5 text-blue-400" />
          </div>
        </motion.button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-t-2xl shadow-lg">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'tracking' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            Live Tracking
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'notifications' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Bell className="w-4 h-4 inline mr-2" />
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-2 right-4 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'history' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <History className="w-4 h-4 inline mr-2" />
            Delivery History
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'tracking' && (
            <div>
              {/* Tracking Steps */}
              <div className="relative">
                {trackingSteps.map((step, idx) => (
                  <div key={step.id} className="flex items-start gap-4 mb-8 last:mb-0">
                    {/* Status Icon */}
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'active' ? 'bg-blue-500 animate-pulse' :
                        'bg-gray-300'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : step.status === 'active' ? (
                          <Navigation className="w-5 h-5 text-white animate-spin" />
                        ) : (
                          <Clock className="w-5 h-5 text-white" />
                        )}
                      </div>
                      {idx < trackingSteps.length - 1 && (
                        <div className={`absolute top-10 left-5 w-0.5 h-16 ${
                          idx < trackingSteps.findIndex(s => s.status === 'active') ? 'bg-blue-500' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-sm font-semibold ${
                          step.status === 'active' ? 'text-blue-600' : 
                          step.status === 'completed' ? 'text-gray-900' : 
                          'text-gray-500'
                        }`}>
                          {step.title}
                        </h3>
                        <span className="text-xs text-gray-500">{step.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-500">{step.location}</p>

                      {step.status === 'active' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-200"
                        >
                          <div className="flex items-start gap-2">
                            <Navigation className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs text-blue-600 font-medium mb-1">Live Update</div>
                              <p className="text-xs text-gray-600">
                                Driver is on Main Street, approximately 8 minutes away. Traffic conditions are light.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-3">
              {notifications.map(notification => (
                <div key={notification.id} className={`p-4 rounded-lg border ${
                  notification.type === 'success' ? 'bg-green-50 border-green-200' :
                  notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                } ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}>
                      {notification.type === 'success' ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : notification.type === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-white" />
                      ) : (
                        <Bell className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {deliveryHistory.map(delivery => (
                <div key={delivery.id} className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{delivery.orderNumber}</h4>
                      <p className="text-xs text-gray-500">{delivery.date}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{delivery.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="text-gray-900">{delivery.items}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivered to:</span>
                      <span className="text-gray-900">{delivery.deliveredTo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-green-600 font-medium">{delivery.status}</span>
                    </div>
                  </div>
                  {delivery.feedback && (
                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                      "{delivery.feedback}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Star className="w-5 h-5 text-white" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">AI-Powered Delivery Intelligence</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0">•</span>
                <span>Your delivery has been optimized for the fastest route with 96% confidence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0">•</span>
                <span>Real-time traffic monitoring is actively adjusting ETA every 30 seconds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0">•</span>
                <span>You'll receive a notification 5 minutes before driver arrival</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
