import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Shield, 
  RefreshCw, 
  Play, 
  Pause, 
  RotateCcw, 
  Target, 
  Filter, 
  ChevronRight, 
  Info, 
  AlertCircle, 
  CheckSquare,
  Square,
  Brain,
  Wrench,
  Monitor,
  Smartphone,
  Server,
  Globe,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Cpu,
  HardDrive,
  Database,
  Cloud,
  CloudRain,
  GitBranch,
  GitMerge,
  GitCommit,
  Terminal,
  Code,
  Bug,
  WrenchIcon,
  Rocket,
  Send,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Timer,
  TimerOff,
  ZapOff,
  Power,
  PowerOff
} from 'lucide-react';

interface VersionInfo {
  version: string;
  releaseDate: string;
  status: 'current' | 'available' | 'beta' | 'deprecated';
  releaseNotes: string[];
  downloadCount: number;
  size: string;
  mandatory: boolean;
}

interface FeatureToggle {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  targetZones: string[];
  lastToggled: string;
  status: 'stable' | 'beta' | 'testing';
  dependencies: string[];
}

interface UpdateTarget {
  type: 'drivers' | 'suppliers' | 'all';
  count: number;
  affectedUsers: number;
}

interface RolloutStatus {
  version: string;
  delivered: number;
  installed: number;
  pending: number;
  failed: number;
  startTime: string;
  estimatedCompletion: string;
  status: 'in-progress' | 'completed' | 'failed' | 'paused';
}

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  errorRate: number;
  performance: number;
  activeConnections: number;
  serverLoad: number;
  memoryUsage: number;
}

interface AISuggestion {
  id: string;
  type: 'performance' | 'security' | 'bug' | 'feature';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  recommendation: string;
  impact: string;
  confidence: number;
  timestamp: string;
}

export function Admin_Software_Update_Center() {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'rollout' | 'tracking' | 'health'>('overview');
  const [selectedVersion, setSelectedVersion] = useState<VersionInfo | null>(null);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deployTarget, setDeployTarget] = useState<UpdateTarget>({ type: 'all', count: 0, affectedUsers: 0 });
  const [deployMode, setDeployMode] = useState<'immediate' | 'scheduled'>('immediate');
  const [deployType, setDeployType] = useState<'full' | 'background'>('full');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureToggle | null>(null);
  const [gradualRollout, setGradualRollout] = useState(true);
  const [autoRollback, setAutoRollback] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVersionDetails, setSelectedVersionDetails] = useState<VersionInfo | null>(null);

  // Mock data
  const currentVersion: VersionInfo = {
    version: 'v1.2.0',
    releaseDate: '2024-01-15',
    status: 'current',
    releaseNotes: [
      'Improved AI route optimization algorithms',
      'Enhanced real-time tracking accuracy',
      'Fixed memory leak in dashboard',
      'Added dark mode support'
    ],
    downloadCount: 15420,
    size: '45.2 MB',
    mandatory: false
  };

  const latestVersion: VersionInfo = {
    version: 'v1.3.0',
    releaseDate: '2024-02-01',
    status: 'available',
    releaseNotes: [
      'Revolutionary AI route optimization (40% faster)',
      'New delivery success predictor with 95% accuracy',
      'Auto task swap based on real-time conditions',
      'Offline mode improvements (syncs 3x faster)',
      'Enhanced security with end-to-end encryption',
      'Battery optimization for mobile devices'
    ],
    downloadCount: 8750,
    size: '52.8 MB',
    mandatory: false
  };

  const betaVersion: VersionInfo = {
    version: 'v1.4.0-beta',
    releaseDate: '2024-02-15',
    status: 'beta',
    releaseNotes: [
      'Voice-activated commands for drivers',
      'Augmented reality warehouse navigation',
      'Blockchain-based supply chain verification',
      'Predictive maintenance with IoT integration'
    ],
    downloadCount: 120,
    size: '61.3 MB',
    mandatory: false
  };

  const featureToggles: FeatureToggle[] = [
    {
      id: 'ai-route-optimization',
      name: 'AI Route Optimization',
      description: 'Machine learning algorithms for optimal route planning',
      enabled: true,
      rolloutPercentage: 100,
      targetZones: ['All'],
      lastToggled: '2024-01-20',
      status: 'stable',
      dependencies: ['telemetry-service', 'ml-engine']
    },
    {
      id: 'delivery-predictor',
      name: 'Delivery Success Predictor',
      description: 'AI-powered prediction of delivery success rates',
      enabled: true,
      rolloutPercentage: 100,
      targetZones: ['All'],
      lastToggled: '2024-01-18',
      status: 'stable',
      dependencies: ['prediction-api', 'historical-data']
    },
    {
      id: 'auto-task-swap',
      name: 'Auto Task Swap',
      description: 'Automatic task reassignment based on driver availability',
      enabled: true,
      rolloutPercentage: 75,
      targetZones: ['North', 'West'],
      lastToggled: '2024-02-05',
      status: 'beta',
      dependencies: ['task-manager', 'driver-tracking']
    },
    {
      id: 'offline-mode',
      name: 'Offline Mode',
      description: 'Enhanced offline functionality with sync queue',
      enabled: true,
      rolloutPercentage: 100,
      targetZones: ['All'],
      lastToggled: '2024-01-25',
      status: 'stable',
      dependencies: ['sync-service', 'local-storage']
    },
    {
      id: 'voice-commands',
      name: 'Voice Commands',
      description: 'Voice-activated system controls for drivers',
      enabled: false,
      rolloutPercentage: 10,
      targetZones: ['South'],
      lastToggled: '2024-02-10',
      status: 'testing',
      dependencies: ['speech-recognition', 'nlp-engine']
    }
  ];

  const rolloutStatus: RolloutStatus[] = [
    {
      version: 'v1.3.0',
      delivered: 80,
      installed: 65,
      pending: 20,
      failed: 5,
      startTime: '2024-02-01 14:30',
      estimatedCompletion: '2024-02-01 16:45',
      status: 'in-progress'
    },
    {
      version: 'v1.2.1',
      delivered: 100,
      installed: 98,
      pending: 1,
      failed: 1,
      startTime: '2024-01-20 10:00',
      estimatedCompletion: '2024-01-20 11:30',
      status: 'completed'
    }
  ];

  const systemHealth: SystemHealth = {
    status: 'healthy',
    uptime: '99.98%',
    errorRate: 0.02,
    performance: 98.5,
    activeConnections: 1247,
    serverLoad: 42,
    memoryUsage: 67
  };

  const aiSuggestions: AISuggestion[] = [
    {
      id: 'sync-errors',
      type: 'performance',
      severity: 'high',
      title: 'Offline Sync Errors Increased',
      description: 'Offline sync errors increased by 15% in Zone B',
      recommendation: 'Deploy update v1.3.0 to affected users in Zone B',
      impact: 'Expected to reduce sync errors by 80%',
      confidence: 92,
      timestamp: '2024-02-01 12:30'
    },
    {
      id: 'battery-drain',
      type: 'performance',
      severity: 'medium',
      title: 'Battery Drain Issue',
      description: 'Mobile app showing 12% higher battery consumption',
      recommendation: 'Enable battery optimization feature for Android users',
      impact: 'Expected to improve battery life by 25%',
      confidence: 87,
      timestamp: '2024-02-01 10:15'
    },
    {
      id: 'security-patch',
      type: 'security',
      severity: 'critical',
      title: 'Security Vulnerability Detected',
      description: 'Critical security patch available in v1.3.0',
      recommendation: 'Immediate mandatory rollout to all users',
      impact: 'Addresses potential data breach vulnerability',
      confidence: 99,
      timestamp: '2024-02-01 09:00'
    }
  ];

  // State for dynamic data
  const [featureTogglesState, setFeatureTogglesState] = useState<FeatureToggle[]>(featureToggles);
  const [rolloutStatuses, setRolloutStatuses] = useState<RolloutStatus[]>(rolloutStatus);

  const handleDeployUpdate = () => {
    setIsDeploying(true);
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false);
      setShowDeployModal(false);
    }, 3000);
  };

  const handleFeatureToggle = (featureId: string) => {
    setFeatureTogglesState(prev => 
      prev.map(feature => 
        feature.id === featureId 
          ? { ...feature, enabled: !feature.enabled, lastToggled: new Date().toISOString().split('T')[0] }
          : feature
      )
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      // Update some random data to show refresh effect
      setRolloutStatuses(prev => prev.map(status => ({
        ...status,
        delivered: Math.min(100, status.delivered + Math.floor(Math.random() * 5)),
        installed: Math.min(100, status.installed + Math.floor(Math.random() * 3))
      })));
    }, 2000);
  };

  const handleViewDetails = (version: VersionInfo) => {
    setSelectedVersionDetails(version);
    setShowDetailsModal(true);
  };

  const handleSaveFeatureChanges = () => {
    if (!selectedFeature) return;
    
    // Update the feature in state
    setFeatureTogglesState(prev => 
      prev.map(feature => 
        feature.id === selectedFeature.id ? selectedFeature : feature
      )
    );
    
    setShowFeatureModal(false);
    setSelectedFeature(null);
  };

  const handleRolloutControl = (version: string, action: 'pause' | 'stop' | 'view') => {
    switch (action) {
      case 'pause':
        setRolloutStatuses(prev => 
          prev.map(status => 
            status.version === version 
              ? { ...status, status: 'paused' as const }
              : status
          )
        );
        break;
      case 'stop':
        setRolloutStatuses(prev => 
          prev.map(status => 
            status.version === version 
              ? { ...status, status: 'failed' as const }
              : status
          )
        );
        break;
      case 'view':
        // Find and show details for this rollout
        const rollout = rolloutStatuses.find(r => r.version === version);
        if (rollout) {
          alert(`Rollout Details for ${version}:\nDelivered: ${rollout.delivered}%\nInstalled: ${rollout.installed}%\nPending: ${rollout.pending}%\nFailed: ${rollout.failed}%`);
        }
        break;
    }
  };

  const handleAdvancedSettings = () => {
    alert('Advanced Settings: Configure deployment parameters, API endpoints, and system preferences');
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'critical': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-400 bg-blue-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'critical': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <Package className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Admin Software & System Update Center</h1>
                  <p className="text-slate-400">Manage app versions, roll out features, and push live system updates</p>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeployModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Rocket className="w-4 h-4" />
                Deploy Update
              </button>
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
          {[
            { id: 'overview', label: 'Version Status', icon: Package },
            { id: 'features', label: 'Feature Control', icon: Zap },
            { id: 'rollout', label: 'Update Rollout', icon: Upload },
            { id: 'tracking', label: 'Rollout Tracking', icon: BarChart3 },
            { id: 'health', label: 'System Health', icon: Monitor }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Current Version Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Version Card */}
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Current Version</h3>
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Package className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-white">{currentVersion.version}</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Current</span>
                  </div>
                  <div className="text-slate-300 text-sm">
                    Released: {currentVersion.releaseDate}
                  </div>
                  <div className="text-slate-300 text-sm">
                    Size: {currentVersion.size}
                  </div>
                  <div className="text-slate-300 text-sm">
                    Downloads: {currentVersion.downloadCount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Latest Version Card */}
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Latest Version</h3>
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Download className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-white">{latestVersion.version}</span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">Available</span>
                  </div>
                  <div className="text-slate-300 text-sm">
                    Released: {latestVersion.releaseDate}
                  </div>
                  <div className="text-slate-300 text-sm">
                    Size: {latestVersion.size}
                  </div>
                  <div className="text-slate-300 text-sm">
                    Downloads: {latestVersion.downloadCount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Beta Version Card */}
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Beta Version</h3>
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <GitBranch className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-white">{betaVersion.version}</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Beta</span>
                  </div>
                  <div className="text-slate-300 text-sm">
                    Released: {betaVersion.releaseDate}
                  </div>
                  <div className="text-slate-300 text-sm">
                    Size: {betaVersion.size}
                  </div>
                  <div className="text-slate-300 text-sm">
                    Testers: {betaVersion.downloadCount}
                  </div>
                </div>
              </div>
            </div>

            {/* Release Notes */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Latest Release Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {latestVersion.releaseNotes.map((note, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{note}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDeployModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Rocket className="w-5 h-5" />
                  Rollout Update
                </button>
                <button 
                  onClick={() => handleViewDetails(latestVersion)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  View Details
                </button>
              </div>
            </div>

            {/* AI Smart Suggestions */}
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">AI Smart Update Suggestions</h3>
              </div>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(suggestion.severity)}`}>
                            {suggestion.severity.toUpperCase()}
                          </span>
                          <span className="text-slate-400 text-sm">{suggestion.timestamp}</span>
                        </div>
                        <h4 className="text-white font-medium mb-1">{suggestion.title}</h4>
                        <p className="text-slate-300 text-sm mb-2">{suggestion.description}</p>
                        <p className="text-slate-400 text-sm mb-2">
                          <strong>Recommendation:</strong> {suggestion.recommendation}
                        </p>
                        <p className="text-green-400 text-sm">
                          <strong>Impact:</strong> {suggestion.impact}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <div className="text-slate-400 text-sm">
                          {suggestion.confidence}% confidence
                        </div>
                        <button
                          onClick={() => setShowDeployModal(true)}
                          className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
                        >
                          Apply Fix
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Live Feature Control</h3>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Advanced Mode</span>
                  <button 
                    onClick={handleAdvancedSettings}
                    className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    aria-label="Advanced Settings"
                    title="Advanced Settings"
                  >
                    <Settings className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {featureTogglesState.map((feature) => (
                  <div key={feature.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleFeatureToggle(feature.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            feature.enabled ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          {feature.enabled ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                        </button>
                        <div>
                          <h4 className="text-white font-medium">{feature.name}</h4>
                          <p className="text-slate-400 text-sm">{feature.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          feature.status === 'stable' ? 'bg-green-500/20 text-green-400' :
                          feature.status === 'beta' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {feature.status}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedFeature(feature);
                            setShowFeatureModal(true);
                          }}
                          className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                          aria-label={`Configure ${feature.name} feature`}
                        >
                          <Settings className="w-4 h-4 text-slate-300" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-slate-400">
                          Status: <span className={feature.enabled ? 'text-green-400' : 'text-red-400'}>
                            {feature.enabled ? 'ON' : 'OFF'}
                          </span>
                        </span>
                        <span className="text-slate-400">
                          Rollout: <span className="text-blue-400">{feature.rolloutPercentage}%</span>
                        </span>
                        <span className="text-slate-400">
                          Zones: <span className="text-purple-400">{feature.targetZones.join(', ')}</span>
                        </span>
                      </div>
                      <span className="text-slate-500 text-xs">
                        Last toggled: {feature.lastToggled}
                      </span>
                    </div>
                    
                    {feature.enabled && feature.rolloutPercentage < 100 && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span>Beta Rollout Progress</span>
                          <span>{feature.rolloutPercentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${feature.rolloutPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Safe Deployment Mode */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Safe Deployment Mode</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Shield className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Gradual Rollout</h4>
                      <p className="text-slate-400 text-sm">Deploy updates incrementally to minimize risk</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setGradualRollout(!gradualRollout)}
                    className={`p-2 rounded-lg transition-colors ${
                      gradualRollout ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {gradualRollout ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <RotateCcw className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Auto Rollback on Failure</h4>
                      <p className="text-slate-400 text-sm">Automatically revert if critical errors detected</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAutoRollback(!autoRollback)}
                    className={`p-2 rounded-lg transition-colors ${
                      autoRollback ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {autoRollback ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rollout Tab */}
        {activeTab === 'rollout' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Push Update</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Target Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Target</label>
                  <div className="space-y-2">
                    {[
                      { type: 'drivers', label: 'Drivers', icon: Truck, count: 1247 },
                      { type: 'suppliers', label: 'Suppliers', icon: Building, count: 342 },
                      { type: 'all', label: 'All Users', icon: Users, count: 1589 }
                    ].map((target) => (
                      <button
                        key={target.type}
                        onClick={() => setDeployTarget({ type: target.type as any, count: target.count, affectedUsers: target.count })}
                        className={`w-full p-3 rounded-lg border transition-colors flex items-center gap-3 ${
                          deployTarget.type === target.type
                            ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                            : 'bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-800/50'
                        }`}
                      >
                        <target.icon className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">{target.label}</div>
                          <div className="text-sm opacity-75">{target.count} users</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mode Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Mode</label>
                  <div className="space-y-2">
                    {[
                      { mode: 'immediate', label: 'Immediate', icon: Zap, desc: 'Deploy right away' },
                      { mode: 'scheduled', label: 'Scheduled', icon: Calendar, desc: 'Deploy at specific time' }
                    ].map((mode) => (
                      <button
                        key={mode.mode}
                        onClick={() => setDeployMode(mode.mode as any)}
                        className={`w-full p-3 rounded-lg border transition-colors flex items-center gap-3 ${
                          deployMode === mode.mode
                            ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                            : 'bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-800/50'
                        }`}
                      >
                        <mode.icon className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">{mode.label}</div>
                          <div className="text-sm opacity-75">{mode.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {deployMode === 'scheduled' && (
                    <div className="mt-3">
                      <label htmlFor="scheduled-time" className="block text-sm font-medium text-slate-300 mb-2">
                        Scheduled Deployment Time
                      </label>
                      <input
                        id="scheduled-time"
                        type="datetime-local"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full p-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Select date and time"
                        title="Choose when to schedule the software deployment"
                      />
                    </div>
                  )}
                </div>

                {/* Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                  <div className="space-y-2">
                    {[
                      { type: 'full', label: 'Full App Update', icon: Download, desc: 'Requires restart' },
                      { type: 'background', label: 'Background Update', icon: RefreshCw, desc: 'No restart needed' }
                    ].map((type) => (
                      <button
                        key={type.type}
                        onClick={() => setDeployType(type.type as any)}
                        className={`w-full p-3 rounded-lg border transition-colors flex items-center gap-3 ${
                          deployType === type.type
                            ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                            : 'bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-800/50'
                        }`}
                      >
                        <type.icon className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm opacity-75">{type.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deploy Button */}
              <div className="mt-6 flex items-center justify-between">
                <div className="text-slate-400 text-sm">
                  This will affect <span className="text-white font-medium">{deployTarget.count}</span> users
                </div>
                <button
                  onClick={handleDeployUpdate}
                  disabled={isDeploying}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeploying ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      Deploy Update
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Rollout Status Tracking</h3>
              
              <div className="space-y-4">
                {rolloutStatuses.map((rollout) => (
                  <div key={rollout.version} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-medium text-white">Update {rollout.version}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          rollout.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                          rollout.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          rollout.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {rollout.status}
                        </span>
                      </div>
                      <div className="text-slate-400 text-sm">
                        Started: {rollout.startTime}
                      </div>
                    </div>
                    
                    {/* Progress Bars */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-green-400">Delivered: {rollout.delivered}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${rollout.delivered}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-blue-400">Installed: {rollout.installed}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${rollout.installed}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-yellow-400">Pending: {rollout.pending}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500 transition-all duration-300"
                            style={{ width: `${rollout.pending}%` }}
                          />
                        </div>
                      </div>
                      
                      {rollout.failed > 0 && (
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-red-400">Failed: {rollout.failed}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 transition-all duration-300"
                              style={{ width: `${rollout.failed}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
                      <span>Est. completion: {rollout.estimatedCompletion}</span>
                      <div className="flex items-center gap-2">
                        {rollout.status === 'in-progress' && (
                          <>
                            <button 
                              onClick={() => handleRolloutControl(rollout.version, 'pause')}
                              className="p-1 bg-slate-700 rounded hover:bg-slate-600 transition-colors"
                              aria-label="Pause rollout"
                              title="Pause rollout"
                            >
                              <Pause className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRolloutControl(rollout.version, 'stop')}
                              className="p-1 bg-slate-700 rounded hover:bg-slate-600 transition-colors"
                              aria-label="Stop rollout"
                              title="Stop rollout"
                            >
                              <Square className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => handleRolloutControl(rollout.version, 'view')}
                          className="p-1 bg-slate-700 rounded hover:bg-slate-600 transition-colors"
                          aria-label="View rollout details"
                          title="View rollout details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Health Tab */}
        {activeTab === 'health' && (
          <div className="space-y-6">
            {/* System Health Overview */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">System Health</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(systemHealth.status)}`}>
                  {systemHealth.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-slate-400 text-sm">Uptime</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{systemHealth.uptime}</div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-4 h-4 text-green-400" />
                    <span className="text-slate-400 text-sm">Error Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{systemHealth.errorRate}%</div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-slate-400 text-sm">Performance</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{systemHealth.performance}%</div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-400 text-sm">Active Connections</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{systemHealth.activeConnections}</div>
                </div>
              </div>
            </div>

            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Server Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-400">Server Load</span>
                      <span className="text-white">{systemHealth.serverLoad}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          systemHealth.serverLoad > 80 ? 'bg-red-500' :
                          systemHealth.serverLoad > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${systemHealth.serverLoad}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-400">Memory Usage</span>
                      <span className="text-white">{systemHealth.memoryUsage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          systemHealth.memoryUsage > 80 ? 'bg-red-500' :
                          systemHealth.memoryUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${systemHealth.memoryUsage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Post-Update Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">System Status</span>
                    <span className="text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Stable
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Errors</span>
                    <span className="text-green-400 flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" />
                      Reduced
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Performance</span>
                    <span className="text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Improved
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">User Satisfaction</span>
                    <span className="text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      98%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deploy Modal */}
      <AnimatePresence>
        {showDeployModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeployModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 rounded-xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <h2 className="text-2xl font-bold text-white">Deploy Update</h2>
                <button
                  onClick={() => setShowDeployModal(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close deploy modal"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <h3 className="text-lg font-medium text-white mb-2">Update Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Version:</span>
                        <span className="text-white">{latestVersion.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Size:</span>
                        <span className="text-white">{latestVersion.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target:</span>
                        <span className="text-white capitalize">{deployTarget.type} ({deployTarget.count} users)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Mode:</span>
                        <span className="text-white capitalize">{deployMode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Type:</span>
                        <span className="text-white capitalize">{deployType} update</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="text-yellow-400 font-medium mb-1">Deployment Warning</h4>
                        <p className="text-yellow-300 text-sm">
                          This action will update {deployTarget.count} users to version {latestVersion.version}. 
                          {deployType === 'full' && ' Users will need to restart their applications.'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleDeployUpdate}
                      disabled={isDeploying}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeploying ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Rocket className="w-5 h-5" />
                          Deploy Update
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setShowDeployModal(false)}
                      className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Settings Modal */}
      <AnimatePresence>
        {showFeatureModal && selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFeatureModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 rounded-xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <h2 className="text-2xl font-bold text-white">Feature Settings</h2>
                <button
                  onClick={() => setShowFeatureModal(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Close Feature Settings"
                  aria-label="Close Feature Settings"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">{selectedFeature.name}</h3>
                    <p className="text-slate-400 text-sm">{selectedFeature.description}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="rollout-percentage" className="block text-sm font-medium text-slate-300 mb-2">Rollout Percentage</label>
                      <input
                        id="rollout-percentage"
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={selectedFeature.rolloutPercentage}
                        onChange={(e) => setSelectedFeature({...selectedFeature, rolloutPercentage: parseInt(e.target.value)})}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>0%</span>
                        <span className="text-white font-medium">{selectedFeature.rolloutPercentage}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Target Zones</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['North', 'South', 'East', 'West', 'Central', 'All'].map((zone) => (
                          <label key={zone} className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 cursor-pointer hover:bg-slate-800/70 transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedFeature.targetZones.includes(zone)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedFeature({...selectedFeature, targetZones: [...selectedFeature.targetZones, zone]});
                                } else {
                                  setSelectedFeature({...selectedFeature, targetZones: selectedFeature.targetZones.filter(z => z !== zone)});
                                }
                              }}
                              className="rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                            />
                            <span className="text-slate-300 text-sm">{zone}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="feature-status" className="block text-sm font-medium text-slate-300 mb-2">Feature Status</label>
                      <select 
                        id="feature-status" 
                        value={selectedFeature.status}
                        onChange={(e) => setSelectedFeature({...selectedFeature, status: e.target.value as any})}
                        className="w-full p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="stable">Stable</option>
                        <option value="beta">Beta</option>
                        <option value="testing">Testing</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={handleSaveFeatureChanges}
                      className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setShowFeatureModal(false)}
                      className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Version Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedVersionDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 rounded-xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <h2 className="text-2xl font-bold text-white">Version Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Close version details"
                  aria-label="Close version details"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <h3 className="text-lg font-medium text-white mb-4">{selectedVersionDetails.version}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Release Date:</span>
                        <span className="text-white">{selectedVersionDetails.releaseDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          selectedVersionDetails.status === 'current' ? 'bg-green-500/20 text-green-400' :
                          selectedVersionDetails.status === 'available' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {selectedVersionDetails.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Size:</span>
                        <span className="text-white">{selectedVersionDetails.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Downloads:</span>
                        <span className="text-white">{selectedVersionDetails.downloadCount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Mandatory:</span>
                        <span className={selectedVersionDetails.mandatory ? 'text-red-400' : 'text-green-400'}>
                          {selectedVersionDetails.mandatory ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-lg font-medium text-white mb-3">Release Notes</h4>
                    <div className="space-y-2">
                      {selectedVersionDetails.releaseNotes.map((note, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setShowDeployModal(true);
                      }}
                      className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Deploy This Version
                    </button>
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
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
}
