import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Activity,
  AlertTriangle,
  Heart,
  Zap,
  TrendingUp,
  Clock,
  Network,
  Lock,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
  Thermometer,
  DollarSign,
  Truck,
  Factory,
  Warehouse,
  Users,
  Settings,
  X,
  BarChart3,
  Target,
  ShieldAlert,
  Radar,
  MapPin,
  Eye,
  Wrench,
  History,
  Globe,
  Cloud,
  CloudRain,
  Calendar,
  Navigation
} from 'lucide-react';
import { ImmuneSystemEngine } from './ImmuneSystemEngine';
import {
  SupplyChainNode,
  Anomaly,
  AnomalyType,
  AnomalySeverity,
  Threat,
  RecoveryWorkflow,
  ImmuneSystemHealth,
  WeakestNode,
  SelfHealingTimeline,
  ImmuneSystemAlert
} from '../../types/immuneSystem';

interface PredictiveRisk {
  id: string;
  type: 'supplier' | 'vehicle' | 'delivery' | 'inventory' | 'route' | 'compliance' | 'demand';
  risk: string;
  probability: number;
  expectedImpact: string;
  timePrediction: string;
  recommendedActions: string[];
}

interface RiskHeatmapData {
  region: string;
  supplierRisk: 'low' | 'medium' | 'high';
  routeRisk: 'low' | 'medium' | 'high';
  inventoryRisk: 'low' | 'medium' | 'high';
}

interface LearningHistory {
  id: string;
  disruption: string;
  actionTaken: string;
  result: string;
  improvement: number;
  date: string;
}

const predictiveRisks: PredictiveRisk[] = [
  {
    id: 'RISK001',
    type: 'supplier',
    risk: 'Supplier delivery reliability decreasing',
    probability: 82,
    expectedImpact: '340 shipments affected',
    timePrediction: 'Within 7 days',
    recommendedActions: [
      'Reduce dependency',
      'Activate alternative supplier',
      'Increase inventory buffer'
    ]
  },
  {
    id: 'RISK002',
    type: 'vehicle',
    risk: 'Vehicle shortage predicted',
    probability: 78,
    expectedImpact: '120 deliveries delayed',
    timePrediction: 'Within 5 days',
    recommendedActions: [
      'Assign backup vehicles',
      'Optimize routes',
      'Rebalance workload'
    ]
  },
  {
    id: 'RISK003',
    type: 'delivery',
    risk: 'Delivery delays forecast',
    probability: 65,
    expectedImpact: '15% on-time rate reduction',
    timePrediction: 'Within 10 days',
    recommendedActions: [
      'Adjust delivery windows',
      'Increase lead time buffer',
      'Communicate with customers'
    ]
  }
];

const riskHeatmapData: RiskHeatmapData[] = [
  { region: 'Asia Pacific', supplierRisk: 'medium', routeRisk: 'high', inventoryRisk: 'low' },
  { region: 'North America', supplierRisk: 'low', routeRisk: 'medium', inventoryRisk: 'medium' },
  { region: 'Europe', supplierRisk: 'low', routeRisk: 'low', inventoryRisk: 'low' },
  { region: 'South America', supplierRisk: 'high', routeRisk: 'medium', inventoryRisk: 'high' }
];

const learningHistory: LearningHistory[] = [
  {
    id: 'LH001',
    disruption: 'Port closure in Mumbai',
    actionTaken: 'Activated backup supplier from Chennai',
    result: 'Delivery delays reduced from 8 days to 3 days',
    improvement: 62,
    date: '2 weeks ago'
  },
  {
    id: 'LH002',
    disruption: 'Vehicle fleet shortage',
    actionTaken: 'Implemented dynamic routing optimization',
    result: 'Fleet utilization increased by 18%',
    improvement: 45,
    date: '1 month ago'
  },
  {
    id: 'LH003',
    disruption: 'Demand surge during festival',
    actionTaken: 'Increased safety stock levels',
    result: 'Stockout incidents reduced by 90%',
    improvement: 85,
    date: '2 months ago'
  }
];

/**
 * Immune System Dashboard
 * Enterprise UI for autonomous supply chain immune system
 */
export const ImmuneSystemDashboard: React.FC = () => {
  const immuneSystemRef = useRef<ImmuneSystemEngine | null>(null);
  const [systemHealth, setSystemHealth] = useState<ImmuneSystemHealth | null>(null);
  const [nodes, setNodes] = useState<SupplyChainNode[]>([]);
  const [weakestNodes, setWeakestNodes] = useState<WeakestNode[]>([]);
  const [currentThreats, setCurrentThreats] = useState<Threat[]>([]);
  const [alerts, setAlerts] = useState<ImmuneSystemAlert[]>([]);
  const [selfHealingTimelines, setSelfHealingTimelines] = useState<SelfHealingTimeline[]>([]);
  const [selectedNode, setSelectedNode] = useState<SupplyChainNode | null>(null);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'nodes' | 'threats' | 'healing' | 'alerts' | 'predictive' | 'external-risk'>('overview');
  const [isInitialized, setIsInitialized] = useState(false);
  const hasInitialized = useRef(false);
  const [showPredictiveRadar, setShowPredictiveRadar] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

  useEffect(() => {
    // Initialize immune system once
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      
      try {
        immuneSystemRef.current = new ImmuneSystemEngine();
        console.log('Immune System initialized');
        const health = immuneSystemRef.current.getSystemHealth();
        const allNodes = immuneSystemRef.current.getAllNodes();
        const weakNodes = immuneSystemRef.current.getWeakestNodes();
        const threats = immuneSystemRef.current.getCurrentThreats();
        const systemAlerts = immuneSystemRef.current.getAlerts();
        const timelines = immuneSystemRef.current.getSelfHealingTimelines();
        
        console.log('System Health:', health);
        console.log('Nodes:', allNodes);
        console.log('Weakest Nodes:', weakNodes);
        
        setSystemHealth(health);
        setNodes(allNodes);
        setWeakestNodes(weakNodes);
        setCurrentThreats(threats);
        setAlerts(systemAlerts);
        setSelfHealingTimelines(timelines);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing Immune System:', error);
        setIsInitialized(true);
      }
    }
  }, []);

  const simulateAnomaly = (type: AnomalyType) => {
    if (!immuneSystemRef.current) return;
    setIsSimulating(true);
    
    const anomaly = immuneSystemRef.current.simulateAnomaly(type);
    
    setTimeout(() => {
      setSystemHealth(immuneSystemRef.current.getSystemHealth());
      setCurrentThreats(immuneSystemRef.current.getCurrentThreats());
      setAlerts(immuneSystemRef.current.getAlerts());
      setWeakestNodes(immuneSystemRef.current.getWeakestNodes());
      setIsSimulating(false);
    }, 1000);
  };

  const isolateNode = (nodeId: string) => {
    if (!immuneSystemRef.current) return;
    immuneSystemRef.current.isolateNode(nodeId);
    setNodes(immuneSystemRef.current.getAllNodes());
    setSystemHealth(immuneSystemRef.current.getSystemHealth());
  };

  const activateRecovery = (anomalyId: string) => {
    if (!immuneSystemRef.current) return;
    immuneSystemRef.current.activateRecovery(anomalyId);
    setCurrentThreats(immuneSystemRef.current.getCurrentThreats());
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-slate-400">Loading Immune System...</div>
      </div>
    );
  }

  if (!systemHealth || nodes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-slate-400">System initialization failed. Please refresh the page.</div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Health Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] rounded-xl p-6 text-slate-900"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Autonomous Immune System
          </h2>
          <div className="flex gap-2">
            <button className="bg-slate-900/20 hover:bg-slate-900/30 px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
        <p className="text-slate-800 mb-4">
          AI-powered autonomous protection for your supply chain - detects, diagnoses, isolates, and heals
        </p>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700 mb-1">Health Score</div>
            <div className="text-3xl font-bold">{systemHealth?.overallHealthScore.toFixed(0) || 0}</div>
            <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-2 rounded-full"
                style={{ width: `${systemHealth?.overallHealthScore || 0}%` }}
              />
            </div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700 mb-1">Immunity Score</div>
            <div className="text-3xl font-bold">{systemHealth?.overallImmunityScore.toFixed(0) || 0}</div>
            <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: `${systemHealth?.overallImmunityScore || 0}%` }}
              />
            </div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700 mb-1">Active Threats</div>
            <div className="text-3xl font-bold">{systemHealth?.activeThreats || 0}</div>
            <div className="text-xs text-slate-600 mt-2">Currently mitigating</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700 mb-1">Healed Incidents</div>
            <div className="text-3xl font-bold">{systemHealth?.healedIncidents || 0}</div>
            <div className="text-xs text-slate-600 mt-2">Self-healed successfully</div>
          </div>
        </div>
      </motion.div>

      {/* Node Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Network className="w-5 h-5 text-[#00F5C4]" />
          Node Status Overview
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm text-slate-400">Healthy</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{systemHealth?.nodeHealth.healthy || 0}</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-sm text-slate-400">Compromised</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{systemHealth?.nodeHealth.compromised || 0}</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-slate-400">Isolated</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{systemHealth?.nodeHealth.isolated || 0}</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-slate-400">Recovering</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{systemHealth?.nodeHealth.recovering || 0}</div>
          </div>
        </div>
      </motion.div>

      {/* Weakest Nodes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <ShieldAlert className="w-5 h-5 text-red-400" />
          Weakest Nodes
        </h3>
        <div className="space-y-3">
          {weakestNodes.slice(0, 5).map((weakNode, index) => (
            <div
              key={index}
              onClick={() => setSelectedNode(weakNode.node)}
              className="border border-slate-700/30 rounded-lg p-4 hover:border-red-400 transition cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getNodeIcon(weakNode.node.type)}
                  <div>
                    <div className="font-semibold text-white">{weakNode.node.name}</div>
                    <div className="text-sm text-slate-400 capitalize">{weakNode.node.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">Vulnerability</div>
                  <div className="text-xl font-bold text-red-400">{weakNode.vulnerabilityScore.toFixed(0)}%</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {weakNode.vulnerabilities.slice(0, 3).map((vuln, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
                    {vuln}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Simulation Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <AlertTriangle className="w-5 h-5 text-purple-400" />
          Simulate Anomaly
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { type: 'demand' as AnomalyType, label: 'Demand', icon: Users },
            { type: 'supplier' as AnomalyType, label: 'Supplier', icon: Factory },
            { type: 'inventory' as AnomalyType, label: 'Inventory', icon: Warehouse },
            { type: 'route' as AnomalyType, label: 'Route', icon: Truck },
            { type: 'warehouse' as AnomalyType, label: 'Warehouse', icon: Warehouse },
            { type: 'cyber' as AnomalyType, label: 'Cyber', icon: ShieldAlert },
            { type: 'temperature' as AnomalyType, label: 'Temperature', icon: Thermometer },
            { type: 'cost' as AnomalyType, label: 'Cost', icon: DollarSign }
          ].map((item) => (
            <button
              key={item.type}
              onClick={() => simulateAnomaly(item.type)}
              disabled={isSimulating}
              className="bg-slate-700/30 border border-slate-600 hover:border-[#00F5C4] rounded-lg p-4 text-center transition disabled:opacity-50"
            >
              <item.icon className="w-6 h-6 mx-auto mb-2 text-slate-400" />
              <div className="text-sm font-medium text-white">{item.label}</div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderNodes = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Network className="w-5 h-5 text-[#00F5C4]" />
          All Supply Chain Nodes
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {nodes.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`border rounded-lg p-4 transition cursor-pointer ${
                node.status === 'healthy' ? 'border-green-500/30 bg-green-500/10' :
                node.status === 'compromised' ? 'border-red-500/30 bg-red-500/10' :
                node.status === 'isolated' ? 'border-yellow-500/30 bg-yellow-500/10' :
                'border-blue-500/30 bg-blue-500/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getNodeIcon(node.type)}
                  <div>
                    <div className="font-semibold text-white">{node.name}</div>
                    <div className="text-sm text-slate-400 capitalize">{node.type}</div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                  node.status === 'healthy' ? 'bg-green-500/20 text-green-400' :
                  node.status === 'compromised' ? 'bg-red-500/20 text-red-400' :
                  node.status === 'isolated' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {node.status}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Health</div>
                  <div className="text-sm font-medium text-white">{node.healthScore.toFixed(0)}%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Immunity</div>
                  <div className="text-sm font-medium text-white">{node.immunityScore.toFixed(0)}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderThreats = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          Current Threats
        </h3>
        {currentThreats.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No active threats detected
          </div>
        ) : (
          <div className="space-y-4">
            {currentThreats.map((threat) => (
              <div
                key={threat.id}
                onClick={() => setSelectedThreat(threat)}
                className="border border-slate-700/30 rounded-lg p-4 hover:border-red-400 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="font-semibold text-white capitalize">{threat.type}</div>
                      <div className="text-sm text-slate-400">{new Date(threat.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      threat.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                      threat.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {threat.severity}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      threat.status === 'active' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {threat.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Financial Impact</div>
                    <div className="text-sm font-medium text-white">${Math.round(threat.estimatedImpact.financial).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Operational Impact</div>
                    <div className="text-sm font-medium text-white">{threat.estimatedImpact.operational.toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Customer Impact</div>
                    <div className="text-sm font-medium text-white">{threat.estimatedImpact.customer.toFixed(0)}%</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => activateRecovery(threat.anomalyId)}
                    className="flex-1 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Activate Recovery
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderHealing = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <RefreshCw className="w-5 h-5 text-blue-400" />
          Self-Healing Timeline
        </h3>
        {selfHealingTimelines.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No self-healing incidents recorded yet
          </div>
        ) : (
          <div className="space-y-4">
            {selfHealingTimelines.map((timeline, index) => (
              <div key={index} className="border border-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-slate-400">Incident ID: {timeline.incidentId}</div>
                  <div className="flex items-center gap-2">
                    {timeline.preventedCascadingFailure && (
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                        Cascading Failure Prevented
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Detected</div>
                    <div className="text-sm text-white">{timeline.detectedAt.toLocaleString()}</div>
                  </div>
                  {timeline.recoveryCompletedAt && (
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Healed</div>
                      <div className="text-sm text-white">{timeline.recoveryCompletedAt.toLocaleString()}</div>
                    </div>
                  )}
                </div>
                {timeline.healingDuration && (
                  <div className="mt-3 text-sm text-slate-400">
                    Healing Duration: {timeline.healingDuration} minutes
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <AlertCircle className="w-5 h-5 text-yellow-400" />
          System Alerts
        </h3>
        <div className="space-y-3">
          {alerts.slice(-10).reverse().map((alert, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${
                alert.severity === 'critical' ? 'border-red-500/30 bg-red-500/10' :
                alert.severity === 'high' ? 'border-orange-500/30 bg-orange-500/10' :
                'border-yellow-500/30 bg-yellow-500/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="font-medium text-white capitalize">{alert.type.replace('_', ' ')}</div>
                    <div className="text-sm text-slate-400">{alert.message}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  {alert.timestamp.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderPredictive = () => (
    <div className="space-y-6">
      {/* Early Warning Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Radar className="w-5 h-5 text-[#00F5C4]" />
            Early Warning Radar
          </h3>
          <button
            onClick={() => setShowPredictiveRadar(!showPredictiveRadar)}
            className="flex items-center gap-2 px-3 py-2 bg-[#00F5C4]/10 border border-[#00F5C4]/30 rounded-lg text-[#00F5C4] text-sm hover:bg-[#00F5C4]/20 transition-colors"
          >
            <Eye className="w-4 h-4" />
            {showPredictiveRadar ? 'Hide' : 'Show'}
          </button>
        </div>

        {showPredictiveRadar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Risk Prediction Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {predictiveRisks.map((risk) => (
                <div
                  key={risk.id}
                  onClick={() => setSelectedRisk(risk.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedRisk === risk.id
                      ? 'bg-slate-700/50 border-[#00F5C4]/50'
                      : 'bg-slate-800/30 border-slate-600/30 hover:bg-slate-700/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-white">⚠ Future Risk Detected</span>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-slate-400 mb-1">Risk</div>
                    <div className="text-sm text-white">{risk.risk}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <div className="text-xs text-slate-400">Probability</div>
                      <div className="text-sm font-bold text-yellow-400">{risk.probability}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Time Prediction</div>
                      <div className="text-sm text-white">{risk.timePrediction}</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs text-slate-400 mb-1">Expected Impact</div>
                    <div className="text-sm text-slate-300">{risk.expectedImpact}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Recommended Actions</div>
                    <ul className="space-y-1">
                      {risk.recommendedActions.map((action, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-[#00F5C4]">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Risk Heatmap */}
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00F5C4]" />
                Global Risk Map
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400">
                      <th className="text-left pb-2">Region</th>
                      <th className="text-center pb-2">Supplier Risk</th>
                      <th className="text-center pb-2">Route Risk</th>
                      <th className="text-center pb-2">Inventory Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskHeatmapData.map((data, idx) => (
                      <tr key={idx} className="border-t border-slate-600">
                        <td className="py-2 text-white">{data.region}</td>
                        <td className="py-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs ${
                            data.supplierRisk === 'low' ? 'bg-green-500/20 text-green-400' :
                            data.supplierRisk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {data.supplierRisk.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs ${
                            data.routeRisk === 'low' ? 'bg-green-500/20 text-green-400' :
                            data.routeRisk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {data.routeRisk.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs ${
                            data.inventoryRisk === 'low' ? 'bg-green-500/20 text-green-400' :
                            data.inventoryRisk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {data.inventoryRisk.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Automatic Recovery Suggestions */}
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#00F5C4]" />
                Automatic Recovery Suggestions
              </h4>
              <div className="space-y-3">
                {predictiveRisks.slice(0, 2).map((risk) => (
                  <div key={risk.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white font-medium">{risk.risk}</span>
                      <span className="text-xs text-slate-400">{risk.expectedImpact}</span>
                    </div>
                    <div className="mb-2">
                      <div className="text-xs text-slate-400 mb-1">Solution</div>
                      <div className="text-sm text-slate-300">{risk.recommendedActions[0]}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Recovery Probability</span>
                      <span className="text-sm font-bold text-[#00F5C4]">{risk.probability - 5}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning History */}
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <History className="w-4 h-4 text-[#00F5C4]" />
                Self-Learning History
              </h4>
              <div className="space-y-2">
                {learningHistory.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white font-medium">{item.disruption}</span>
                      <span className="text-xs text-slate-400">{item.date}</span>
                    </div>
                    <div className="text-xs text-slate-400 mb-1">Action: {item.actionTaken}</div>
                    <div className="text-xs text-slate-400 mb-1">Result: {item.result}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Improvement</span>
                      <span className="text-sm font-bold text-green-400">+{item.improvement}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );

  const renderExternalRisk = () => (
    <div className="space-y-6">
      {/* External Risk Intelligence Radar™ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#00F5C4]" />
            External Risk Intelligence Radar™
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Monitoring external events affecting supply chain</span>
          </div>
        </div>

        {/* Global Risk Radar */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-white">⚠ RISK DETECTED</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-xs text-slate-400">Region</div>
              <div className="text-sm text-white">Europe</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Event</div>
              <div className="text-sm text-white">Port congestion</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Probability</div>
              <div className="text-sm font-bold text-yellow-400">82%</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Expected Delay</div>
              <div className="text-sm text-white">3 days</div>
            </div>
          </div>
          <div className="mb-3">
            <div className="text-xs text-slate-400">Affected Shipments</div>
            <div className="text-sm text-white">540</div>
          </div>
          <div className="bg-[#00F5C4]/10 rounded-lg p-3 border border-[#00F5C4]/30">
            <div className="text-xs text-slate-400 mb-1">AI Recommendation</div>
            <div className="text-sm text-[#00F5C4]">
              - Activate alternate routes<br />
              - Increase inventory<br />
              - Notify suppliers
            </div>
          </div>
        </div>

        {/* Risk Prediction Timeline */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#00F5C4]" />
            Risk Prediction Timeline
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-16 text-center">
                <div className="text-sm font-bold text-red-400">Today</div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-white font-medium">Risk detected</div>
                <div className="text-xs text-slate-400">Port congestion identified in Europe</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-16 text-center">
                <div className="text-sm font-bold text-yellow-400">+3 days</div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-white font-medium">Possible delay</div>
                <div className="text-xs text-slate-400">Shipments may experience delays</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-16 text-center">
                <div className="text-sm font-bold text-orange-400">+7 days</div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-white font-medium">Operational impact</div>
                <div className="text-xs text-slate-400">Inventory levels may be affected</div>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-green-500/10 rounded-lg p-3 border border-green-500/30">
            <div className="text-xs text-slate-400 mb-1">AI Prevention Plan</div>
            <div className="text-sm text-green-400">AI-generated prevention plan ready for execution</div>
          </div>
        </div>

        {/* External Factors Monitoring */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Weather</span>
            </div>
            <div className="text-xs text-slate-400">Monitoring severe weather events</div>
            <div className="text-sm text-green-400 mt-1">2 active alerts</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">Political Events</span>
            </div>
            <div className="text-xs text-slate-400">Monitoring political stability</div>
            <div className="text-sm text-green-400 mt-1">Stable</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-white">Traffic Disruption</span>
            </div>
            <div className="text-xs text-slate-400">Monitoring traffic conditions</div>
            <div className="text-sm text-yellow-400 mt-1">1 active disruption</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-white">Market Changes</span>
            </div>
            <div className="text-xs text-slate-400">Monitoring market volatility</div>
            <div className="text-sm text-green-400 mt-1">Stable</div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const getNodeIcon = (type: string) => {
    const icons: { [key: string]: any } = {
      supplier: <Factory className="w-5 h-5 text-blue-400" />,
      warehouse: <Warehouse className="w-5 h-5 text-orange-400" />,
      route: <Truck className="w-5 h-5 text-green-400" />,
      factory: <Factory className="w-5 h-5 text-purple-400" />,
      port: <Activity className="w-5 h-5 text-cyan-400" />,
      system: <Shield className="w-5 h-5 text-pink-400" />,
      customer: <Users className="w-5 h-5 text-yellow-400" />
    };
    return icons[type] || <Activity className="w-5 h-5 text-slate-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Autonomous Immune System</h1>
        <p className="text-slate-400">AI-powered self-healing supply chain protection inspired by human immune system</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'overview' as const, label: 'Overview', icon: Activity },
          { id: 'nodes' as const, label: 'Nodes', icon: Network },
          { id: 'threats' as const, label: 'Threats', icon: AlertTriangle },
          { id: 'healing' as const, label: 'Self-Healing', icon: RefreshCw },
          { id: 'alerts' as const, label: 'Alerts', icon: AlertCircle },
          { id: 'predictive' as const, label: 'Predictive Defense', icon: Radar },
          { id: 'external-risk' as const, label: 'External Risk Radar', icon: Globe }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 font-semibold'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/30'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'nodes' && renderNodes()}
        {activeTab === 'threats' && renderThreats()}
        {activeTab === 'healing' && renderHealing()}
        {activeTab === 'alerts' && renderAlerts()}
        {activeTab === 'predictive' && renderPredictive()}
        {activeTab === 'external-risk' && renderExternalRisk()}
      </div>

      {/* Node Detail Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getNodeIcon(selectedNode.type)}
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedNode.name}</h3>
                      <p className="text-sm text-slate-400 capitalize">{selectedNode.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Health Score</div>
                    <div className="text-2xl font-bold text-[#00F5C4]">{selectedNode.healthScore.toFixed(0)}%</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Immunity Score</div>
                    <div className="text-2xl font-bold text-purple-400">{selectedNode.immunityScore.toFixed(0)}%</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-slate-400 mb-2">Vulnerabilities</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.vulnerabilities.map((vuln, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
                        {vuln}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-slate-400 mb-2">Dependencies</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.dependencies.map((dep, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    isolateNode(selectedNode.id);
                    setSelectedNode(null);
                  }}
                  className="w-full bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500/30 transition"
                >
                  Isolate Node
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImmuneSystemDashboard;
