import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RefreshCw, 
  Download, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock, 
  Bell, 
  BellOff,
  Zap,
  TrendingUp,
  Route,
  Package,
  Settings,
  Eye,
  CheckSquare,
  ArrowLeft,
  Menu
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Update {
  id: string;
  type: 'urgent' | 'warning' | 'normal' | 'info';
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  category: 'route' | 'supplier' | 'system' | 'maintenance';
  actionTaken?: boolean;
}

interface Props {
  onMenuToggle: () => void;
  onBack?: () => void;
}

export function UpdatesCenterScreen({ onMenuToggle, onBack }: Props) {
  const [updates, setUpdates] = useState<Update[]>([
    {
      id: '1',
      type: 'urgent',
      title: 'Route change for Zone A',
      message: 'Heavy congestion reported. Avoid main highway. Alternative route available through side streets.',
      timestamp: '10:30 AM',
      priority: 'high',
      category: 'route',
      actionTaken: false
    },
    {
      id: '2',
      type: 'normal',
      title: 'Supplier Update',
      message: 'New delivery slot added for Warehouse B. Additional capacity available for afternoon deliveries.',
      timestamp: '9:00 AM',
      priority: 'medium',
      category: 'supplier',
      actionTaken: false
    },
    {
      id: '3',
      type: 'info',
      title: 'System Info',
      message: 'Maintenance completed successfully. All systems operational and performance optimized.',
      timestamp: 'Yesterday',
      priority: 'low',
      category: 'maintenance',
      actionTaken: true
    },
    {
      id: '4',
      type: 'warning',
      title: 'Weather Alert',
      message: 'Light rain expected in Zone C between 2-4 PM. Plan for slightly longer delivery times.',
      timestamp: '8:45 AM',
      priority: 'medium',
      category: 'route',
      actionTaken: false
    }
  ]);

  const [currentVersion, setCurrentVersion] = useState('v1.2.0');
  const [latestVersion, setLatestVersion] = useState('v1.3.0');
  const [isUpdating, setIsUpdating] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'urgent': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'normal': return CheckCircle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getUpdateColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'border-red-500/50 bg-red-500/10';
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'normal': return 'border-green-500/50 bg-green-500/10';
      case 'info': return 'border-blue-500/50 bg-blue-500/10';
      default: return 'border-zinc-500/50 bg-zinc-500/10';
    }
  };

  const getUpdateTextColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'normal': return 'text-green-400';
      case 'info': return 'text-blue-400';
      default: return 'text-zinc-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'route': return Route;
      case 'supplier': return Package;
      case 'system': return Settings;
      case 'maintenance': return Zap;
      default: return Info;
    }
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // Simulate fetching updates
    setTimeout(() => {
      setUpdates(prev => [...prev]);
    }, 1000);
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    // Simulate update process
    setTimeout(() => {
      setCurrentVersion(latestVersion);
      setIsUpdating(false);
    }, 3000);
  };

  const handleAcknowledge = (updateId: string) => {
    setUpdates(prev => 
      prev.map(update => 
        update.id === updateId ? { ...update, actionTaken: true } : update
      )
    );
  };

  const handleViewImpact = (updateId: string) => {
    // Navigate to route impact analysis
    console.log('View route impact for update:', updateId);
  };

  const filteredUpdates = updates.filter(update => !update.actionTaken);

  return (
    <div className="h-full bg-zinc-950 text-white flex flex-col">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
            )}
            <div>
              <h1 className="text-lg font-semibold text-white">Updates & Notifications</h1>
              <p className="text-xs text-zinc-400">System updates and messages from operations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              title="Refresh updates"
            >
              <RefreshCw className="w-4 h-4 text-white" />
            </button>
            <button 
              onClick={onMenuToggle}
              className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              title="Menu"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* App Update Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Download className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">App Version</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-400">Current: {currentVersion}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-cyan-400">Latest: {latestVersion}</span>
                </div>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              currentVersion === latestVersion 
                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
            }`}>
              {currentVersion === latestVersion ? '🟢 Up to date' : '🟡 Update available'}
            </div>
          </div>
          
          {currentVersion !== latestVersion && (
            <div className="space-y-2">
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-xl text-sm font-medium text-white transition-colors flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Update Now
                  </>
                )}
              </button>
              <p className="text-xs text-zinc-400 text-center">
                Includes performance improvements & new AI features
              </p>
            </div>
          )}
        </motion.div>

        {/* AI Smart Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white">AI Insight</h4>
              <p className="text-xs text-zinc-300">
                AI detected 3 route changes today based on live conditions
              </p>
            </div>
          </div>
        </motion.div>

        {/* Operational Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Operational Updates
          </h2>
          
          <div className="space-y-3">
            <AnimatePresence>
              {filteredUpdates.map((update, index) => {
                const Icon = getUpdateIcon(update.type);
                const CategoryIcon = getCategoryIcon(update.category);
                
                return (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`border rounded-xl p-4 ${getUpdateColor(update.type)} backdrop-blur-lg`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900/50 flex items-center justify-center">
                          <Icon className={`w-5 h-5 ${getUpdateTextColor(update.type)}`} />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-sm font-semibold text-white mb-1">
                              {update.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs">
                              <CategoryIcon className="w-3 h-3 text-zinc-400" />
                              <span className="text-zinc-400">{update.timestamp}</span>
                            </div>
                          </div>
                          
                          <div className={`w-2 h-2 rounded-full ${
                            update.priority === 'high' ? 'bg-red-400' :
                            update.priority === 'medium' ? 'bg-yellow-400' :
                            'bg-blue-400'
                          }`} />
                        </div>
                        
                        <p className="text-sm text-zinc-300 mb-3">
                          {update.message}
                        </p>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewImpact(update.id)}
                            className="px-3 py-1.5 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-600 rounded-lg text-xs text-zinc-300 transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            View Impact
                          </button>
                          
                          {!update.actionTaken && (
                            <button
                              onClick={() => handleAcknowledge(update.id)}
                              className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg text-xs text-cyan-300 transition-colors flex items-center gap-1"
                            >
                              <CheckSquare className="w-3 h-3" />
                              Acknowledge
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {filteredUpdates.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-sm text-zinc-400">All updates acknowledged</p>
                <p className="text-xs text-zinc-500 mt-1">You're all caught up!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <button 
              title="View route impact analysis"
              className="p-3 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 rounded-lg text-left transition-colors"
            >
              <Route className="w-4 h-4 text-cyan-400 mb-2" />
              <p className="text-xs font-medium text-white">View Route Impact</p>
              <p className="text-[10px] text-zinc-400">Analyze changes</p>
            </button>
            <button 
              title="Acknowledge all updates"
              className="p-3 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 rounded-lg text-left transition-colors"
            >
              <CheckSquare className="w-4 h-4 text-green-400 mb-2" />
              <p className="text-xs font-medium text-white">Acknowledge All</p>
              <p className="text-[10px] text-zinc-400">Mark as read</p>
            </button>
          </div>
        </motion.div>

        {/* Notification Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center">
                {notificationsEnabled ? (
                  <Bell className="w-4 h-4 text-cyan-400" />
                ) : (
                  <BellOff className="w-4 h-4 text-zinc-400" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Notifications</h3>
                <p className="text-xs text-zinc-400">
                  {notificationsEnabled ? 'Active' : 'Muted'}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              aria-label={notificationsEnabled ? "Disable notifications" : "Enable notifications"}
              className={`w-12 h-6 rounded-full transition-colors ${
                notificationsEnabled 
                  ? 'bg-cyan-500 hover:bg-cyan-600' 
                  : 'bg-zinc-700 hover:bg-zinc-600'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                notificationsEnabled ? 'translate-x-3' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          
          <p className="text-xs text-zinc-400 mt-2">
            Receive real-time updates from operations team
          </p>
        </motion.div>
      </div>
    </div>
  );
}
