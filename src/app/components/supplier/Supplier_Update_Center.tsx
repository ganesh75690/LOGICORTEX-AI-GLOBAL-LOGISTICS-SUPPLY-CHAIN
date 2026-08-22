import { useState } from 'react';
import { 
  Package, 
  Download, 
  Upload, 
  Settings, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  Truck, 
  Building, 
  Calendar, 
  BarChart3, 
  Activity,
  RefreshCw,
  Bell,
  Info,
  Brain,
  Shield,
  Database,
  Wifi,
  WifiOff
} from 'lucide-react';

interface SystemMessage {
  id: string;
  type: 'urgent' | 'feature' | 'maintenance' | 'info';
  title: string;
  message: string;
  timestamp: string;
}

interface FeatureControl {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  adminControlled: boolean;
}

interface UpdateImpact {
  metric: string;
  value: string;
  improvement: boolean;
}

const Supplier_Update_Center = () => {
  const [currentVersion, setCurrentVersion] = useState('v1.2.0');
  const [latestVersion, setLatestVersion] = useState('v1.3.0');
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'active' | 'syncing' | 'offline'>('active');
  const [lastSync, setLastSync] = useState('2 mins ago');

  const systemMessages: SystemMessage[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'Urgent Update',
      message: 'Warehouse B delay expected - plan accordingly',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      type: 'feature',
      title: 'Feature Update',
      message: 'New routing system enabled for your region',
      timestamp: '9:15 AM'
    },
    {
      id: '3',
      type: 'maintenance',
      title: 'Scheduled Maintenance',
      message: 'System maintenance planned for tonight 11 PM - 1 AM',
      timestamp: 'Yesterday'
    }
  ];

  const featureControls: FeatureControl[] = [
    {
      id: 'inventory-sync',
      name: 'Inventory Sync',
      description: 'Real-time inventory synchronization',
      enabled: true,
      adminControlled: true
    },
    {
      id: 'order-automation',
      name: 'Order Processing Automation',
      description: 'Automated order processing and routing',
      enabled: true,
      adminControlled: false
    },
    {
      id: 'notifications',
      name: 'Supplier Notifications',
      description: 'Receive real-time notifications',
      enabled: true,
      adminControlled: true
    },
    {
      id: 'delivery-coordination',
      name: 'Delivery Coordination',
      description: 'Coordinate delivery schedules',
      enabled: false,
      adminControlled: false
    }
  ];

  const updateImpacts: UpdateImpact[] = [
    { metric: 'Orders processed faster', value: '+18%', improvement: true },
    { metric: 'Errors reduced', value: '-12%', improvement: true },
    { metric: 'Delivery coordination', value: 'Improved', improvement: true },
    { metric: 'System uptime', value: '99.8%', improvement: true }
  ];

  const aiSuggestions = [
    {
      id: '1',
      message: 'High delay reports from your warehouse. Recommend enabling faster dispatch mode.',
      priority: 'high'
    },
    {
      id: '2',
      message: 'Your inventory sync frequency is lower than optimal. Consider increasing sync intervals.',
      priority: 'medium'
    }
  ];

  const handleUpdateNow = () => {
    setUpdateInProgress(true);
    // Simulate update process
    setTimeout(() => {
      setCurrentVersion(latestVersion);
      setUpdateInProgress(false);
      setLatestVersion('v1.4.0');
    }, 3000);
  };

  const handleFeatureToggle = (featureId: string) => {
    // Only allow toggle if not admin controlled
    const feature = featureControls.find(f => f.id === featureId);
    if (feature && !feature.adminControlled) {
      // Handle toggle logic here
      console.log(`Toggling feature: ${featureId}`);
    }
  };

  const handleApplySuggestion = (suggestionId: string) => {
    console.log(`Applying AI suggestion: ${suggestionId}`);
  };

  const getMessageIcon = (type: SystemMessage['type']) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'feature': return <Zap className="w-5 h-5 text-blue-500" />;
      case 'maintenance': return <Settings className="w-5 h-5 text-yellow-500" />;
      case 'info': return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSyncIcon = () => {
    switch (syncStatus) {
      case 'active': return <Wifi className="w-5 h-5 text-green-500" />;
      case 'syncing': return <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />;
      case 'offline': return <WifiOff className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* App Version Status */}
      <div className="bg-slate-800 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Package className="w-6 h-6 mr-2 text-blue-400" />
          System Version
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-slate-400">Current Version</p>
            <p className="text-2xl font-bold text-white">{currentVersion}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Latest Version</p>
            <p className="text-2xl font-bold text-green-400">{latestVersion}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              currentVersion === latestVersion ? 'bg-green-500' : 'bg-yellow-500'
            }`} />
            <span className="text-sm font-medium text-white">
              {currentVersion === latestVersion ? 'Up to Date' : 'Update Available'}
            </span>
          </div>
          {currentVersion !== latestVersion && (
            <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
              <p className="text-sm font-medium text-slate-300 mb-2">Release Notes:</p>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Improved inventory sync</li>
                <li>• Faster order processing</li>
                <li>• Bug fixes and performance improvements</li>
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={handleUpdateNow}
          disabled={updateInProgress || currentVersion === latestVersion}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {updateInProgress ? (
            <span className="flex items-center justify-center">
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Updating...
            </span>
          ) : (
            'Update Now'
          )}
        </button>
      </div>

      {/* Active Features */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-yellow-400" />
          Active Features
        </h2>
        <div className="space-y-4">
          {featureControls.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium text-white">{feature.name}</h3>
                  {feature.adminControlled && (
                    <span className="ml-2 text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">
                      Enabled by Admin
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400 mt-1">{feature.description}</p>
              </div>
              <button
                onClick={() => handleFeatureToggle(feature.id)}
                disabled={feature.adminControlled}
                aria-label={`Toggle ${feature.name} ${feature.enabled ? 'off' : 'on'}`}
                title={`${feature.adminControlled ? 'Admin controlled - ' : ''}${feature.name}: ${feature.enabled ? 'Enabled' : 'Disabled'}`}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  feature.enabled ? 'bg-blue-500' : 'bg-slate-600'
                } ${feature.adminControlled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    feature.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* System Messages */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Bell className="w-6 h-6 mr-2 text-purple-400" />
          System Messages
        </h2>
        <div className="space-y-3">
          {systemMessages.map((message) => (
            <div key={message.id} className="flex items-start p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors">
              <div className="mr-3 mt-1">
                {getMessageIcon(message.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{message.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{message.message}</p>
                <p className="text-xs text-slate-500 mt-2 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update Impact */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-green-400" />
          Update Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {updateImpacts.map((impact, index) => (
            <div key={index} className="p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">{impact.metric}</span>
                <div className="flex items-center">
                  {impact.improvement ? (
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                  )}
                  <span className={`font-bold ${
                    impact.improvement ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {impact.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-green-900/30 border border-green-700/50 rounded-lg">
          <p className="text-sm text-green-400">
            <strong>Value to Supplier:</strong> These improvements translate to faster order processing, 
            fewer errors, and better coordination with your delivery partners.
          </p>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Brain className="w-6 h-6 mr-2 text-indigo-400" />
          AI Suggestions
        </h2>
        <div className="space-y-4">
          {aiSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-4 bg-indigo-900/30 border border-indigo-700/50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-indigo-300">{suggestion.message}</p>
                </div>
                <button
                  onClick={() => handleApplySuggestion(suggestion.id)}
                  className="ml-4 px-4 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Apply Suggestion
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sync Status */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Database className="w-6 h-6 mr-2 text-blue-400" />
          Sync Status
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-center">
              {getSyncIcon()}
              <div className="ml-3">
                <p className="font-medium text-white">Data Sync</p>
                <p className="text-sm text-slate-400">
                  {syncStatus === 'active' ? 'Active' : syncStatus === 'syncing' ? 'Syncing...' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Last Sync</p>
              <p className="font-medium text-white">{lastSync}</p>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-300">Limited Control Notice</h3>
                <div className="mt-2 text-sm text-yellow-400">
                  <p className="mb-2">As a supplier, you can:</p>
                  <ul className="space-y-1 ml-4">
                    <li>✅ Apply updates to your system</li>
                    <li>✅ View system status</li>
                    <li>✅ Enable certain features</li>
                  </ul>
                  <p className="mt-2 mb-2">You cannot:</p>
                  <ul className="space-y-1 ml-4">
                    <li>❌ Control global rollout</li>
                    <li>❌ Deploy updates to all users</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplier_Update_Center;
