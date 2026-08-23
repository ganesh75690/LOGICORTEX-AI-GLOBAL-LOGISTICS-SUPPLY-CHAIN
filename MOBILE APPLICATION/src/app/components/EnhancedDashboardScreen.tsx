import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  TrendingUp, 
  Clock, 
  Package, 
  Zap, 
  Menu, 
  ArrowLeft,
  Activity,
  MapPin,
  AlertTriangle,
  Users,
  Fuel,
  Star,
  Award,
  Target,
  Navigation,
  Calendar,
  BarChart3,
  Wind,
  Cloud,
  Phone,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import { MobileStatusBar } from './MobileStatusBar';
import { OfflineStatusIndicator } from './OfflineStatusIndicator';
import { MissionReadinessCard } from './MissionReadinessCard';
import { MissionRecoveryStatusCard } from './MissionRecoveryStatusCard';
import { FieldOperationsResilience } from './FieldOperationsResilience';
import { EmergencyStatusCard } from './EmergencyStatusCard';

interface Props {
  onStartDelivery: () => void;
  onMenuToggle: () => void;
  onBack?: () => void;
  onViewDriverHistory?: () => void;
  onViewSyncStatus?: () => void;
  onViewMissionReadiness?: () => void;
  onViewRecoveryTimeline?: () => void;
  onViewEmergencyStatus?: () => void;
  liveStats: LiveStats;
  alerts: Alert[];
  currentTime: Date;
}

interface LiveStats {
  currentSpeed: number;
  avgSpeed: number;
  fuelEfficiency: number;
  earnings: number;
  timeSaved: number;
  deliveriesCompleted: number;
}

interface Alert {
  id: string;
  type: 'traffic' | 'weather' | 'customer' | 'system';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  action?: string;
}

interface PerformanceMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: any;
}

export function EnhancedDashboardScreen({ onStartDelivery, onMenuToggle, onBack, onViewDriverHistory, onViewSyncStatus, onViewMissionReadiness, onViewRecoveryTimeline, onViewEmergencyStatus, liveStats, alerts, currentTime }: Props) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Debug: Check if alerts are being received
  console.log('Dashboard alerts:', alerts);

  const performanceMetrics: PerformanceMetric[] = [
    {
      label: 'On-Time Rate',
      value: '94%',
      change: '+3%',
      trend: 'up',
      icon: Clock,
    },
    {
      label: 'Customer Rating',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      icon: Star,
    },
    {
      label: 'Fuel Efficiency',
      value: `${liveStats.fuelEfficiency.toFixed(1)} km/l`,
      change: '+5%',
      trend: 'up',
      icon: Fuel,
    },
    {
      label: 'Daily Earnings',
      value: `₹${liveStats.earnings}`,
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-500/20 to-orange-500/20 border-red-500/50';
      case 'warning': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
      default: return 'from-cyan-500/20 to-blue-500/20 border-cyan-500/50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'traffic': return AlertTriangle;
      case 'weather': return Cloud;
      case 'customer': return Users;
      default: return Bell;
    }
  };

  return (
    <div className="h-full bg-zinc-950 overflow-y-auto overflow-x-hidden">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Hi, Ganesh 👋
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-green-400 font-medium">Active • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onViewSyncStatus}
              className="w-12 h-12 rounded-full bg-zinc-900/95 backdrop-blur-lg border border-zinc-800 flex items-center justify-center relative shadow-xl hover:border-cyan-500/50 transition-colors"
              title="View sync status"
            >
              <OfflineStatusIndicator />
            </button>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-12 h-12 rounded-full bg-zinc-900 border border-cyan-500/30 flex items-center justify-center relative" 
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-white" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </button>
            <button 
              onClick={onMenuToggle}
              className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center"
              title="Menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <>
              {/* Overlay */}
              <div 
                className="fixed inset-0 bg-black/20 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-20 right-6 w-80 bg-zinc-900/95 backdrop-blur-lg border border-cyan-500/30 rounded-2xl shadow-2xl z-50 max-h-96 overflow-hidden"
              >
              <div className="p-4 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                    title="Close notifications"
                  >
                    <ArrowLeft className="w-3 h-3 text-white rotate-180" />
                  </button>
                </div>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {alerts.length > 0 ? (
                  <div className="p-2 space-y-2">
                    {alerts.map((alert) => {
                      const Icon = getAlertIcon(alert.type);
                      return (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-3 bg-gradient-to-r ${getAlertColor(alert.severity)} rounded-xl border border-zinc-700/50`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-orange-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-white mb-1 truncate">
                                {alert.title}
                              </h4>
                              <p className="text-xs text-zinc-300 mb-2 line-clamp-2">
                                {alert.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-zinc-400">{alert.time}</span>
                                {alert.action && (
                                  <button className="text-xs text-cyan-400 font-medium hover:text-cyan-300">
                                    {alert.action}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                    <p className="text-sm text-zinc-400">No new notifications</p>
                    <p className="text-xs text-zinc-500 mt-1">You're all caught up!</p>
                  </div>
                )}
              </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Live Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white">Live Performance</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400">Real-time</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{Math.round(liveStats.currentSpeed)}</p>
              <p className="text-xs text-zinc-400">km/h</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{Math.round(liveStats.avgSpeed)}</p>
              <p className="text-xs text-zinc-400">avg km/h</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">+{liveStats.timeSaved}</p>
              <p className="text-xs text-zinc-400">min saved</p>
            </div>
          </div>
        </motion.div>

        {/* Alert Banner */}
        <AnimatePresence>
          {alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-4 bg-gradient-to-r ${getAlertColor(alerts[0].severity)} rounded-2xl`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const Icon = getAlertIcon(alerts[0].type);
                    return <Icon className="w-5 h-5 text-orange-400" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {alerts[0].title}
                  </h3>
                  <p className="text-xs text-orange-300 mb-2">
                    {alerts[0].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400">{alerts[0].time}</span>
                    {alerts[0].action && (
                      <button className="text-xs text-cyan-400 font-medium hover:text-cyan-300">
                        {alerts[0].action}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/50 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <Package className="w-5 h-5 text-cyan-400" />
              <span className="text-xs text-green-400 font-medium">+2 today</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{liveStats.deliveriesCompleted}</p>
            <p className="text-xs text-cyan-300">Completed</p>
            <div className="mt-2 w-full bg-zinc-800 rounded-full h-1">
              <div 
                className={`h-full bg-cyan-400 rounded-full transition-all duration-500 progress-bar-${Math.round((liveStats.deliveriesCompleted / 8) * 100 / 10) * 10}`}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400 font-medium">Top 8%</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">94%</p>
            <p className="text-xs text-green-300">On-time Rate</p>
            <div className="mt-2 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-1 w-4 rounded-full ${i < 4 ? 'bg-green-400' : 'bg-zinc-700'}`} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-white mb-3">Performance Metrics</h3>
          <div className="space-y-2">
            {performanceMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400">{metric.label}</p>
                        <p className="text-sm font-semibold text-white">{metric.value}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-zinc-400'}`} />
                      <span className={`text-xs font-medium ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-zinc-400'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* AI Recommendation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/50 rounded-2xl p-5"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-white">AI Predictive Intelligence</h3>
                <span className="px-2 py-0.5 bg-cyan-500/20 rounded text-[10px] font-medium text-cyan-300">
                  Real-time analysis
                </span>
              </div>
              <p className="text-sm text-zinc-300 mb-2">
                "We predict delivery risks before they happen"
              </p>
              <p className="text-xs text-zinc-400">
                System identifies high failure probability and optimizes routes automatically
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 bg-zinc-800/50 rounded-lg">
              <p className="text-xs text-zinc-400">Time Saved</p>
              <p className="text-sm font-bold text-green-400">+15 min</p>
            </div>
            <div className="text-center p-2 bg-zinc-800/50 rounded-lg">
              <p className="text-xs text-zinc-400">Fuel Saved</p>
              <p className="text-sm font-bold text-green-400">₹45</p>
            </div>
            <div className="text-center p-2 bg-zinc-800/50 rounded-lg">
              <p className="text-xs text-zinc-400">Risk Level</p>
              <p className="text-sm font-bold text-yellow-400">Low</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-sm font-semibold text-white transition-colors">
              Apply Route
            </button>
            <button className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-zinc-300 transition-colors">
              Dismiss
            </button>
          </div>
        </motion.div>

        {/* Mission Readiness Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-6"
        >
          <MissionReadinessCard
            score={96}
            driverReady={true}
            vehicleReady={true}
            routeReady={true}
            shipmentReady={true}
            onView={onViewMissionReadiness || (() => {})}
          />
        </motion.div>

        {/* Mission Recovery Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56 }}
          className="mb-6"
        >
          <MissionRecoveryStatusCard
            status="normal"
            affectedShipments={0}
            recommendedDriver=""
            delay={0}
            onView={onViewRecoveryTimeline || (() => {})}
          />
        </motion.div>

        {/* Field Operations Resilience Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.57 }}
          className="mb-6"
        >
          <FieldOperationsResilience
            gpsStatus="good"
            gpsAccuracy={18}
            networkStatus="connected"
            syncStatus="up_to_date"
            batteryLevel={72}
            isLowPowerMode={false}
          />
        </motion.div>

        {/* Emergency Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58 }}
          className="mb-6"
        >
          <EmergencyStatusCard
            isActive={false}
            onView={onViewEmergencyStatus || (() => {})}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-left hover:border-cyan-500/50 transition-colors">
              <MessageSquare className="w-5 h-5 text-cyan-400 mb-2" />
              <p className="text-sm font-medium text-white">AI Assistant</p>
              <p className="text-xs text-zinc-400">Get help</p>
            </button>
            <button className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-left hover:border-cyan-500/50 transition-colors">
              <Calendar className="w-5 h-5 text-purple-400 mb-2" />
              <p className="text-sm font-medium text-white">Schedule</p>
              <p className="text-xs text-zinc-400">View upcoming</p>
            </button>
            <button 
              onClick={onViewDriverHistory}
              className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-left hover:border-cyan-500/50 transition-colors"
            >
              <BarChart3 className="w-5 h-5 text-green-400 mb-2" />
              <p className="text-sm font-medium text-white">Driver History</p>
              <p className="text-xs text-zinc-400">View report</p>
            </button>
            <button className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-left hover:border-cyan-500/50 transition-colors">
              <Phone className="w-5 h-5 text-yellow-400 mb-2" />
              <p className="text-sm font-medium text-white">Support</p>
              <p className="text-xs text-zinc-400">Contact team</p>
            </button>
          </div>
        </motion.div>

        {/* Today's Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-white mb-3">Today's Summary</h3>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-400 mb-1">Total Distance</p>
                <p className="text-xl font-bold text-white">42.3 km</p>
                <p className="text-xs text-green-400">↑ 12% vs yesterday</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-1">Total Time</p>
                <p className="text-xl font-bold text-white">3h 20m</p>
                <p className="text-xs text-green-400">↑ 8% efficiency</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-1">Earnings</p>
                <p className="text-xl font-bold text-white">₹{liveStats.earnings}</p>
                <p className="text-xs text-green-400">↑ 15% vs avg</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-1">Rating</p>
                <div className="flex items-center gap-1">
                  <p className="text-xl font-bold text-white">4.8</p>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-xs text-zinc-400">12 reviews</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Start Delivery Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={onStartDelivery}
          className="w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-2xl text-lg font-bold text-white shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-3"
        >
          <Navigation className="w-5 h-5" />
          Start Delivery
        </motion.button>
      </div>
    </div>
  );
}
