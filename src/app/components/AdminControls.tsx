import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Route,
  Users,
  Package,
  CheckCircle,
  XCircle,
  X,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Truck,
  Warehouse,
  RefreshCw,
  Settings,
  Eye,
  Edit3,
  Play,
  Pause,
  Zap,
  MessageSquare,
  BarChart3,
  Target,
  Activity,
  Search,
  Filter,
  ChevronDown,
  Plus,
  Clock,
  Shield,
  Wrench,
  History
} from 'lucide-react';
import { AdminSimulation } from './AdminSimulation';
import { AdvancedAnalytics } from './AdvancedAnalytics';

interface AIDecision {
  id: string;
  type: 'route' | 'inventory' | 'resource';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedSavings: number;
  confidence: number;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ShipmentRoute {
  id: string;
  shipmentId: string;
  currentRoute: string;
  proposedRoute: string;
  reason: string;
  timeChange: string;
  costChange: string;
  status: 'active' | 'proposed' | 'changed';
}

interface Resource {
  id: string;
  type: 'driver' | 'vehicle';
  name: string;
  currentAssignment: string;
  availability: 'available' | 'busy' | 'maintenance';
  performance: number;
  location: string;
  skills?: string[];
  capacity?: number;
  fuelLevel?: number;
  licenseType?: string;
}

interface DisruptionAlert {
  id: string;
  type: 'traffic' | 'weather' | 'accident' | 'shortage' | 'mechanical';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string;
  affectedShipments: string[];
  estimatedDelay: string;
  recommendedAction: string;
  status: 'active' | 'handling' | 'resolved';
  timestamp: string;
}

interface CostOptimization {
  id: string;
  category: 'fuel' | 'labor' | 'maintenance' | 'routing' | 'inventory';
  title: string;
  currentCost: number;
  optimizedCost: number;
  savings: number;
  implementation: string;
  difficulty: 'easy' | 'medium' | 'complex';
  status: 'suggested' | 'in-progress' | 'implemented';
  impact: string;
}

interface InventoryItem {
  id: string;
  product: string;
  warehouse: string;
  currentStock: number;
  minThreshold: number;
  recommendedRestock: number;
  urgency: 'low' | 'medium' | 'high';
  lastUpdated: string;
}

interface AIAction {
  id: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  problem: string;
  aiRecommendation: string;
  confidence: number;
  status: 'pending' | 'approved' | 'rejected' | 'executed';
  timestamp: string;
}

interface DecisionHistory {
  id: string;
  recommendation: string;
  aiConfidence: number;
  adminDecision: string;
  executionStatus: string;
  timestamp: string;
}

export function AdminControls() {
  const [activeTab, setActiveTab] = useState<'ai-decisions' | 'routing' | 'resources' | 'inventory-management' | 'disruptions' | 'cost-optimization' | 'simulation' | 'coordination' | 'analytics' | 'optimization' | 'ai-action-center' | 'enterprise-integration'>('ai-decisions');
  const [showActionCenter, setShowActionCenter] = useState(false);
  const [selectedAction, setSelectedAction] = useState<AIAction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'driver' | 'vehicle'>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'busy' | 'maintenance'>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAIDecision, setSelectedAIDecision] = useState<AIDecision | null>(null);
  const [showAIDecisionModal, setShowAIDecisionModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<ShipmentRoute | null>(null);
  const [showRouteDetailsModal, setShowRouteDetailsModal] = useState(false);
  const [selectedDisruption, setSelectedDisruption] = useState<DisruptionAlert | null>(null);
  const [showDisruptionDetailsModal, setShowDisruptionDetailsModal] = useState(false);
  const [selectedOptimization, setSelectedOptimization] = useState<CostOptimization | null>(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressForm, setProgressForm] = useState({
    progressPercentage: 0,
    notes: '',
    issues: ''
  });
  
  // State for inventory management
  const [showAddInventoryForm, setShowAddInventoryForm] = useState(false);
  const [editingInventoryItem, setEditingInventoryItem] = useState<InventoryItem | null>(null);
  const [inventoryForm, setInventoryForm] = useState({
    product: '',
    warehouse: '',
    currentStock: 0,
    minThreshold: 0,
    recommendedRestock: 0,
    urgency: 'medium' as 'low' | 'medium' | 'high'
  });
  const [aiDecisions, setAIDecisions] = useState<AIDecision[]>([
    {
      id: '1',
      type: 'route',
      title: 'Optimize Route for Shipment #2847',
      description: 'AI suggests rerouting through Highway 101 to avoid traffic congestion on I-95',
      impact: 'high',
      estimatedSavings: 250,
      confidence: 92,
      timestamp: '2 mins ago',
      status: 'pending'
    },
    {
      id: '2',
      type: 'inventory',
      title: 'Restock Warehouse B - Product SKU-1234',
      description: 'Stock below threshold, recommend immediate restock of 150 units',
      impact: 'medium',
      estimatedSavings: 180,
      confidence: 88,
      timestamp: '5 mins ago',
      status: 'pending'
    },
    {
      id: '3',
      type: 'resource',
      title: 'Reassign Driver Mike to Route #892',
      description: 'Current driver delayed, suggest reassigning available driver for on-time delivery',
      impact: 'high',
      estimatedSavings: 320,
      confidence: 95,
      timestamp: '8 mins ago',
      status: 'pending'
    }
  ]);

  const [shipmentRoutes, setShipmentRoutes] = useState<ShipmentRoute[]>([
    {
      id: '1',
      shipmentId: 'SH-2847',
      currentRoute: 'I-95 North → Exit 24 → Warehouse A',
      proposedRoute: 'Highway 101 → Exit 15 → Warehouse A',
      reason: 'Traffic congestion on I-95',
      timeChange: '-25 minutes',
      costChange: '+₹12',
      status: 'proposed'
    },
    {
      id: '2',
      shipmentId: 'SH-2848',
      currentRoute: 'Route 66 → Distribution Center B',
      proposedRoute: 'I-80 → Distribution Center B',
      reason: 'Road construction on Route 66',
      timeChange: '-15 minutes',
      costChange: '+₹8',
      status: 'active'
    }
  ]);

  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      type: 'driver',
      name: 'Mike Johnson',
      currentAssignment: 'Route #891',
      availability: 'busy',
      performance: 94,
      location: 'Warehouse A',
      skills: ['Long-haul', 'Hazardous', 'Night-driving'],
      licenseType: 'Class A CDL'
    },
    {
      id: '2',
      type: 'driver',
      name: 'Sarah Chen',
      currentAssignment: 'Available',
      availability: 'available',
      performance: 91,
      location: 'Distribution Center B',
      skills: ['Local', 'Urban', 'Customer-service'],
      licenseType: 'Class B CDL'
    },
    {
      id: '3',
      type: 'driver',
      name: 'Robert Davis',
      currentAssignment: 'Available',
      availability: 'available',
      performance: 88,
      location: 'Warehouse C',
      skills: ['International', 'Customs', 'Multi-language'],
      licenseType: 'Class A CDL'
    },
    {
      id: '4',
      type: 'vehicle',
      name: 'Truck #VIN-1234',
      currentAssignment: 'Shipment #2847',
      availability: 'busy',
      performance: 87,
      location: 'En Route',
      capacity: 20000,
      fuelLevel: 75
    },
    {
      id: '5',
      type: 'vehicle',
      name: 'Van #VIN-5678',
      currentAssignment: 'Available',
      availability: 'available',
      performance: 92,
      location: 'Warehouse A',
      capacity: 5000,
      fuelLevel: 90
    },
    {
      id: '6',
      type: 'vehicle',
      name: 'Truck #VIN-9012',
      currentAssignment: 'Maintenance',
      availability: 'maintenance',
      performance: 85,
      location: 'Service Center',
      capacity: 25000,
      fuelLevel: 100
    }
  ]);

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      product: 'SKU-1234 - Electronics',
      warehouse: 'Warehouse A',
      currentStock: 45,
      minThreshold: 100,
      recommendedRestock: 150,
      urgency: 'high',
      lastUpdated: '1 hour ago'
    },
    {
      id: '2',
      product: 'SKU-5678 - Clothing',
      warehouse: 'Warehouse B',
      currentStock: 230,
      minThreshold: 200,
      recommendedRestock: 100,
      urgency: 'medium',
      lastUpdated: '2 hours ago'
    }
  ]);

  const [disruptionAlerts, setDisruptionAlerts] = useState<DisruptionAlert[]>([
    {
      id: '1',
      type: 'traffic',
      severity: 'high',
      title: 'Major Traffic Jam on I-95',
      description: 'Multi-car accident causing 5-mile backup, expect significant delays',
      location: 'I-95 North, Mile 42',
      affectedShipments: ['SH-2847', 'SH-2848', 'SH-2849'],
      estimatedDelay: '2-3 hours',
      recommendedAction: 'Reroute affected shipments via Highway 101',
      status: 'active',
      timestamp: '10 mins ago'
    },
    {
      id: '2',
      type: 'weather',
      severity: 'medium',
      title: 'Severe Weather Warning',
      description: 'Heavy rain and potential flooding in coastal areas',
      location: 'Coastal Route 1',
      affectedShipments: ['SH-2850', 'SH-2851'],
      estimatedDelay: '45-60 minutes',
      recommendedAction: 'Delay departures or use inland routes',
      status: 'active',
      timestamp: '25 mins ago'
    },
    {
      id: '3',
      type: 'mechanical',
      severity: 'critical',
      title: 'Vehicle Breakdown',
      description: 'Truck #VIN-9012 engine failure, requires immediate towing',
      location: 'Rest Area A-12',
      affectedShipments: ['SH-2852'],
      estimatedDelay: '4-6 hours',
      recommendedAction: 'Reassign cargo to available vehicle',
      status: 'handling',
      timestamp: '1 hour ago'
    }
  ]);

  const [costOptimizations, setCostOptimizations] = useState<CostOptimization[]>([
    {
      id: '1',
      category: 'fuel',
      title: 'Optimize Fuel Efficiency',
      currentCost: 45000,
      optimizedCost: 38000,
      savings: 7000,
      implementation: 'Implement eco-driving training and route optimization',
      difficulty: 'easy',
      status: 'suggested',
      impact: '15% reduction in fuel costs across fleet'
    },
    {
      id: '2',
      category: 'labor',
      title: 'Driver Schedule Optimization',
      currentCost: 62000,
      optimizedCost: 58000,
      savings: 4000,
      implementation: 'AI-powered scheduling to reduce overtime hours',
      difficulty: 'medium',
      status: 'in-progress',
      impact: 'Better work-life balance, 6% cost reduction'
    },
    {
      id: '3',
      category: 'routing',
      title: 'Dynamic Routing System',
      currentCost: 28000,
      optimizedCost: 22000,
      savings: 6000,
      implementation: 'Real-time traffic-based routing adjustments',
      difficulty: 'complex',
      status: 'suggested',
      impact: '21% reduction in delivery times and fuel usage'
    }
  ]);

  const [aiActions, setAiActions] = useState<AIAction[]>([
    {
      id: 'ACT001',
      priority: 'CRITICAL',
      problem: 'Europe warehouse stock decreasing',
      aiRecommendation: 'Increase inventory by 15%',
      confidence: 93,
      status: 'pending',
      timestamp: '2 hours ago'
    },
    {
      id: 'ACT002',
      priority: 'HIGH',
      problem: 'Supplier XYZ Components delivery reliability decreasing',
      aiRecommendation: 'Shift 20% allocation to backup supplier',
      confidence: 88,
      status: 'pending',
      timestamp: '4 hours ago'
    },
    {
      id: 'ACT003',
      priority: 'MEDIUM',
      problem: 'Route R-001 showing consistent delays',
      aiRecommendation: 'Implement alternative route scheduling',
      confidence: 76,
      status: 'pending',
      timestamp: '6 hours ago'
    }
  ]);

  const [decisionHistory, setDecisionHistory] = useState<DecisionHistory[]>([
    {
      id: 'DH001',
      recommendation: 'Change route for shipment SH-2852',
      aiConfidence: 92,
      adminDecision: 'Approved',
      executionStatus: 'Completed',
      timestamp: '1 hour ago'
    },
    {
      id: 'DH002',
      recommendation: 'Increase inventory at warehouse EU-001',
      aiConfidence: 87,
      adminDecision: 'Approved',
      executionStatus: 'In Progress',
      timestamp: '3 hours ago'
    },
    {
      id: 'DH003',
      recommendation: 'Reduce allocation to supplier SUP-1048',
      aiConfidence: 78,
      adminDecision: 'Rejected',
      executionStatus: 'Cancelled',
      timestamp: '5 hours ago'
    }
  ]);

  const handleAIDecision = (decisionId: string, action: 'approve' | 'reject') => {
    setAIDecisions(prev => prev.map(decision => 
      decision.id === decisionId 
        ? { ...decision, status: action === 'approve' ? 'approved' : 'rejected' }
        : decision
    ));
  };

  const handleRouteChange = (routeId: string, action: 'approve' | 'reject') => {
    setShipmentRoutes(prev => prev.map(route => 
      route.id === routeId 
        ? { ...route, status: action === 'approve' ? 'changed' : 'active' }
        : route
    ));
  };

  const handleInventoryRestock = (itemId: string, quantity: number) => {
    setInventory(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, currentStock: item.currentStock + quantity, lastUpdated: 'Just now' }
        : item
    ));
  };

  const handleDisruptionAction = (alertId: string, action: 'handle' | 'resolve') => {
    setDisruptionAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: action === 'handle' ? 'handling' : 'resolved' }
        : alert
    ));
  };

  const handleCostOptimization = (optimizationId: string, action: 'start' | 'complete') => {
    setCostOptimizations(prev => prev.map(opt => 
      opt.id === optimizationId 
        ? { ...opt, status: action === 'start' ? 'in-progress' : 'implemented' }
        : opt
    ));
  };

  const handleResourceAssignment = (resourceId: string, newAssignment: string) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? { ...resource, currentAssignment: newAssignment, availability: newAssignment === 'Available' ? 'available' : 'busy' }
        : resource
    ));
  };

  const handleViewAIDecisionDetails = (decision: AIDecision) => {
    setSelectedAIDecision(decision);
    setShowAIDecisionModal(true);
  };

  const handleViewRouteDetails = (route: ShipmentRoute) => {
    setSelectedRoute(route);
    setShowRouteDetailsModal(true);
  };

  const handleApplyRoute = (routeId: string) => {
    // First show the details modal
    const route = shipmentRoutes.find(r => r.id === routeId);
    if (route) {
      setSelectedRoute(route);
      setShowRouteDetailsModal(true);
    }
  };

  const handleViewDisruptionDetails = (disruption: DisruptionAlert) => {
    setSelectedDisruption(disruption);
    setShowDisruptionDetailsModal(true);
  };

  const handleStartHandling = (disruptionId: string) => {
    // First show the details modal
    const disruption = disruptionAlerts.find(d => d.id === disruptionId);
    if (disruption) {
      setSelectedDisruption(disruption);
      setShowDisruptionDetailsModal(true);
    }
  };

  const handleViewAnalysis = (optimization: CostOptimization) => {
    setSelectedOptimization(optimization);
    setShowAnalysisModal(true);
  };

  const handleUpdateProgress = (optimization: CostOptimization) => {
    setSelectedOptimization(optimization);
    setProgressForm({
      progressPercentage: 0,
      notes: '',
      issues: ''
    });
    setShowProgressModal(true);
  };

  const handleSubmitProgress = () => {
    if (selectedOptimization) {
      // Update the optimization with progress data
      setCostOptimizations(prev => prev.map(opt => 
        opt.id === selectedOptimization.id 
          ? { 
              ...opt, 
              // You could add a progress field to the interface if needed
              // For now, we'll just log the progress update
            }
          : opt
      ));
      
      // Reset and close modal
      setShowProgressModal(false);
      setProgressForm({
        progressPercentage: 0,
        notes: '',
        issues: ''
      });
    }
  };

  const filteredResources = resources.filter(resource => {
    const searchLower = searchTerm.toLowerCase();
    
    // Search filter
    const matchesSearch = (
      resource.name.toLowerCase().includes(searchLower) ||
      resource.type.toLowerCase().includes(searchLower) ||
      resource.currentAssignment.toLowerCase().includes(searchLower) ||
      resource.location.toLowerCase().includes(searchLower) ||
      resource.availability.toLowerCase().includes(searchLower) ||
      (resource.type === 'driver' && resource.skills?.some(skill => skill.toLowerCase().includes(searchLower))) ||
      (resource.type === 'vehicle' && resource.licenseType?.toLowerCase().includes(searchLower))
    );
    
    // Type filter
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    
    // Availability filter
    const matchesAvailability = availabilityFilter === 'all' || resource.availability === availabilityFilter;
    
    // Location filter
    const matchesLocation = locationFilter === 'all' || resource.location === locationFilter;
    
    return matchesSearch && matchesType && matchesAvailability && matchesLocation;
  });

  // Get unique locations for filter dropdown
  const uniqueLocations = Array.from(new Set(resources.map(r => r.location)));
  const hasActiveFilters = searchTerm || typeFilter !== 'all' || availabilityFilter !== 'all' || locationFilter !== 'all';

  const tabs = [
    { id: 'ai-decisions' as const, name: 'AI Decisions', icon: Brain, count: aiDecisions.filter(d => d.status === 'pending').length },
    { id: 'ai-action-center' as const, name: 'AI Action Center™', icon: Zap, count: aiActions.filter(a => a.status === 'pending').length },
    { id: 'enterprise-integration' as const, name: 'Enterprise Integration™', icon: Shield, count: 0 },
    { id: 'routing' as const, name: 'Manual Routing', icon: Route, count: shipmentRoutes.filter(r => r.status === 'proposed').length },
    { id: 'resources' as const, name: 'Resources', icon: Users, count: resources.filter(r => r.availability === 'available').length },
    { id: 'inventory-management' as const, name: 'Inventory', icon: Package, count: inventory.filter(i => i.urgency === 'high').length },
    { id: 'disruptions' as const, name: 'Disruptions', icon: AlertTriangle, count: disruptionAlerts.filter(d => d.status === 'active').length },
    { id: 'cost-optimization' as const, name: 'Cost Control', icon: TrendingUp, count: costOptimizations.filter(c => c.status === 'suggested').length },
    { id: 'simulation' as const, name: 'Simulation', icon: Activity, count: 0 },
    { id: 'analytics' as const, name: 'Analytics', icon: BarChart3, count: 0 }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-400" />
          Admin Control Center
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Real-time control</span>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-700/50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
              {tab.count > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'ai-decisions' && (
          <motion.div
            key="ai-decisions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {aiDecisions.filter(d => d.status === 'pending').map(decision => (
              <motion.div
                key={decision.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      decision.type === 'route' ? 'bg-blue-500/20' :
                      decision.type === 'inventory' ? 'bg-green-500/20' :
                      'bg-purple-500/20'
                    }`}>
                      {decision.type === 'route' ? <Route className="w-5 h-5 text-blue-400" /> :
                       decision.type === 'inventory' ? <Package className="w-5 h-5 text-green-400" /> :
                       <Users className="w-5 h-5 text-purple-400" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{decision.title}</h3>
                      <p className="text-slate-400 text-sm mb-2">{decision.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={`px-2 py-1 rounded ${
                          decision.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                          decision.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {decision.impact} impact
                        </span>
                        <span className="text-slate-400">₹{decision.estimatedSavings} savings</span>
                        <span className="text-slate-400">{decision.confidence}% confidence</span>
                        <span className="text-slate-500">{decision.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAIDecision(decision.id, 'approve')}
                    className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2 text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleAIDecision(decision.id, 'reject')}
                    className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2 text-sm"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button 
                    onClick={() => handleViewAIDecisionDetails(decision)}
                    title="View details" 
                    className="px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'ai-action-center' && (
          <motion.div
            key="ai-action-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#00F5C4]" />
                AI Action Center™
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">AI predictions → Actions</span>
              </div>
            </div>

            {aiActions.filter(a => a.status === 'pending').map((action) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-slate-800/50 rounded-lg p-4 border ${
                  action.priority === 'CRITICAL' ? 'border-red-500/50' :
                  action.priority === 'HIGH' ? 'border-orange-500/50' :
                  action.priority === 'MEDIUM' ? 'border-yellow-500/50' :
                  'border-slate-700/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${
                      action.priority === 'CRITICAL' ? 'text-red-400' :
                      action.priority === 'HIGH' ? 'text-orange-400' :
                      action.priority === 'MEDIUM' ? 'text-yellow-400' :
                      'text-slate-400'
                    }`} />
                    <div>
                      <h3 className="text-white font-medium">{action.problem}</h3>
                      <p className="text-slate-400 text-sm">{action.timestamp}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    action.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                    action.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                    action.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {action.priority}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="text-sm text-slate-400 mb-1">AI Recommendation</div>
                  <div className="text-white font-medium">{action.aiRecommendation}</div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">Confidence:</span>
                    <span className="text-sm font-bold text-[#00F5C4]">{action.confidence}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold">
                    Approve
                  </button>
                  <button className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                    Modify
                  </button>
                  <button className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                    Reject
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Decision History */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <History className="w-4 h-4 text-[#00F5C4]" />
                AI Decision History
              </h4>
              <div className="space-y-2">
                {decisionHistory.map((history) => (
                  <div key={history.id} className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm text-white font-medium">{history.recommendation}</div>
                        <div className="text-xs text-slate-400">{history.timestamp}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        history.adminDecision === 'Approved' ? 'bg-green-500/20 text-green-400' :
                        history.adminDecision === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {history.adminDecision}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400">AI Confidence: </span>
                        <span className="text-slate-300">{history.aiConfidence}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Status: </span>
                        <span className="text-slate-300">{history.executionStatus}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'enterprise-integration' && (
          <motion.div
            key="enterprise-integration"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#00F5C4]" />
                Enterprise Integration Hub™
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Connect with existing business systems</span>
              </div>
            </div>

            {/* Integration Dashboard */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium text-white">SAP ERP</span>
                  </div>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Connected ✓
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Sync:</span>
                    <span className="text-white">2 minutes ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Data Sharing:</span>
                    <span className="text-white">Inventory, Orders, Supplier Data</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Uptime:</span>
                    <span className="text-green-400">99.8%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium text-white">GPS Platform</span>
                  </div>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Connected ✓
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Sync:</span>
                    <span className="text-white">1 minute ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Data:</span>
                    <span className="text-white">Vehicle Location, Route Data</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Uptime:</span>
                    <span className="text-green-400">98.9%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Warehouse className="w-5 h-5 text-orange-400" />
                    <span className="text-sm font-medium text-white">WMS Platform</span>
                  </div>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Connected ✓
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Sync:</span>
                    <span className="text-white">5 minutes ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Data:</span>
                    <span className="text-white">Inventory, Storage, Capacity</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Uptime:</span>
                    <span className="text-green-400">99.2%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm font-medium text-white">TMS Platform</span>
                  </div>
                  <span className="text-xs text-yellow-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Warning
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Sync:</span>
                    <span className="text-white">15 minutes ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Data:</span>
                    <span className="text-white">Shipments, Routes, Fleet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Uptime:</span>
                    <span className="text-yellow-400">92.5%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* API Health Dashboard */}
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00F5C4]" />
                API Health Dashboard
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded p-3">
                  <div className="text-xs text-slate-400 mb-1">ERP Connection</div>
                  <div className="text-lg font-bold text-green-400">99.8%</div>
                  <div className="text-xs text-slate-400">uptime</div>
                </div>
                <div className="bg-slate-800/50 rounded p-3">
                  <div className="text-xs text-slate-400 mb-1">GPS Connection</div>
                  <div className="text-lg font-bold text-green-400">98.9%</div>
                  <div className="text-xs text-slate-400">uptime</div>
                </div>
                <div className="bg-slate-800/50 rounded p-3">
                  <div className="text-xs text-slate-400 mb-1">Supplier API</div>
                  <div className="text-lg font-bold text-yellow-400">87.2%</div>
                  <div className="text-xs text-slate-400">uptime</div>
                </div>
              </div>
              <div className="mt-3 bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                <div className="text-xs text-slate-400 mb-1">AI Recommendation</div>
                <div className="text-sm text-yellow-400">"Reconnect supplier API before next synchronization cycle."</div>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#00F5C4]" />
                Data Security Status
              </h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded p-3">
                  <div className="text-xs text-slate-400 mb-1">Encryption</div>
                  <div className="text-sm font-bold text-green-400">Active ✓</div>
                </div>
                <div className="bg-slate-800/50 rounded p-3">
                  <div className="text-xs text-slate-400 mb-1">API Auth</div>
                  <div className="text-sm font-bold text-green-400">Verified ✓</div>
                </div>
                <div className="bg-slate-800/50 rounded p-3">
                  <div className="text-xs text-slate-400 mb-1">Access Control</div>
                  <div className="text-sm font-bold text-green-400">Enabled ✓</div>
                </div>
                <div className="bg-slate-800/50 rounded p-3">
                  <div className="text-xs text-slate-400 mb-1">Data Privacy</div>
                  <div className="text-sm font-bold text-green-400">Protected ✓</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'routing' && (
          <motion.div
            key="routing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {shipmentRoutes.map(route => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-blue-400" />
                    <div>
                      <h3 className="text-white font-medium">{route.shipmentId}</h3>
                      <p className="text-slate-400 text-sm">{route.reason}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    route.status === 'proposed' ? 'bg-yellow-500/20 text-yellow-400' :
                    route.status === 'changed' ? 'bg-green-500/20 text-green-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {route.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Current Route</p>
                    <p className="text-sm text-slate-300">{route.currentRoute}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Proposed Route</p>
                    <p className="text-sm text-blue-400">{route.proposedRoute}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs mb-3">
                  <span className={`flex items-center gap-1 ${
                    route.timeChange.startsWith('-') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    {route.timeChange}
                  </span>
                  <span className={`flex items-center gap-1 ${
                    route.costChange.startsWith('+') ? 'text-red-400' : 'text-green-400'
                  }`}>
                    ₹{route.costChange}
                  </span>
                </div>

                {route.status === 'proposed' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApplyRoute(route.id)}
                      className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Play className="w-4 h-4" />
                      Apply Route
                    </button>
                    <button
                      onClick={() => handleRouteChange(route.id, 'reject')}
                      className="px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Pause className="w-4 h-4" />
                      Keep Current
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'resources' && (
          <motion.div
            key="resources"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-auto"
          >
            {/* Search and Filters */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 mb-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search resources by name, type, location, skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                  />
                </div>
                
                {/* Filter Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      hasActiveFilters 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-slate-700/50 text-slate-400 border border-slate-600/30 hover:bg-slate-700/70'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    )}
                  </button>
                  
                  <div className="text-sm text-slate-400">
                    {filteredResources.length} of {resources.length} resources
                  </div>
                </div>
              </div>
              
              {/* Filter Dropdowns */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 pt-4 border-t border-slate-700/30"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Type Filter */}
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Resource Type</label>
                        <select
                          title="Filter by resource type"
                          value={typeFilter}
                          onChange={(e) => setTypeFilter(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                        >
                          <option value="all">All Types</option>
                          <option value="driver">Drivers</option>
                          <option value="vehicle">Vehicles</option>
                        </select>
                      </div>
                      
                      {/* Availability Filter */}
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Availability</label>
                        <select
                          title="Filter by availability status"
                          value={availabilityFilter}
                          onChange={(e) => setAvailabilityFilter(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                        >
                          <option value="all">All Status</option>
                          <option value="available">Available</option>
                          <option value="busy">Busy</option>
                          <option value="maintenance">Maintenance</option>
                        </select>
                      </div>
                      
                      {/* Location Filter */}
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Location</label>
                        <select
                          title="Filter by location"
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                        >
                          <option value="all">All Locations</option>
                          {uniqueLocations.map(location => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setTypeFilter('all');
                            setAvailabilityFilter('all');
                            setLocationFilter('all');
                          }}
                          className="px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors text-sm"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50">
              {filteredResources.length > 0 ? (
                <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left p-4 text-sm font-medium text-slate-300">Resource</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-300">Type</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-300">Assignment</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-300">Location</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-300">Availability</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-300">Performance</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-300">Details</th>
                    <th className="text-center p-4 text-sm font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResources.map((resource, index) => (
                    <motion.tr
                      key={resource.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            resource.type === 'driver' ? 'bg-blue-500/20' : 'bg-green-500/20'
                          }`}>
                            {resource.type === 'driver' ? <Users className="w-4 h-4 text-blue-400" /> : <Truck className="w-4 h-4 text-green-400" />}
                          </div>
                          <span className="text-white font-medium">{resource.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          resource.type === 'driver' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                          {resource.type}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300 text-sm">{resource.currentAssignment}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <MapPin className="w-3 h-3" />
                          {resource.location}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          resource.availability === 'available' ? 'bg-green-500/20 text-green-400' :
                          resource.availability === 'busy' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {resource.availability}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full ${
                                resource.performance >= 90 ? 'bg-green-400' :
                                resource.performance >= 80 ? 'bg-yellow-400' :
                                'bg-red-400'
                              }`}
                              style={{ width: `${resource.performance}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-300">{resource.performance}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-slate-400">
                        {resource.type === 'driver' ? (
                          <div className="space-y-1">
                            <p>License: {resource.licenseType}</p>
                            <div className="flex flex-wrap gap-1">
                              {resource.skills?.map(skill => (
                                <span key={skill} className="px-1 py-0.5 bg-slate-700/50 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p>Capacity: {resource.capacity?.toLocaleString()} lbs</p>
                            <p>Fuel: {resource.fuelLevel}%</p>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            title="View resource details" 
                            onClick={() => {
                              setSelectedResource(resource);
                              setShowViewModal(true);
                            }}
                            className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded hover:bg-slate-700/70 transition-colors text-xs"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button 
                            title="Edit resource assignment" 
                            onClick={() => {
                              setSelectedResource(resource);
                              setShowEditModal(true);
                            }}
                            className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors text-xs"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Search className="w-12 h-12 text-slate-400 mb-4" />
                  <p className="text-slate-400 text-center">No resources found</p>
                  <p className="text-sm text-slate-500 text-center mt-2">
                    Try adjusting your search terms
                  </p>
                </div>
              )}
            </div>
            
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Available Resources</p>
                    <p className="text-2xl font-bold text-green-400">
                      {filteredResources.filter(r => r.availability === 'available').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Busy Resources</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {filteredResources.filter(r => r.availability === 'busy').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Avg Performance</p>
                    <p className="text-2xl font-bold text-purple-400">
                      {filteredResources.length > 0 ? Math.round(filteredResources.reduce((acc, r) => acc + r.performance, 0) / filteredResources.length) : 0}%
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Inventory Management Tab */}
        {activeTab === 'inventory-management' && (
          <motion.div
            key="inventory-management"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Header with Add Product Button */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white">Inventory Management</h3>
                <p className="text-sm text-slate-400 mt-1">Manage stock levels across all warehouses</p>
              </div>
              <button
                onClick={() => {
                  setEditingInventoryItem(null);
                  setInventoryForm({
                    product: '',
                    warehouse: 'Warehouse A',
                    currentStock: 0,
                    minThreshold: 100,
                    recommendedRestock: 200,
                    urgency: 'medium'
                  });
                  setShowAddInventoryForm(true);
                }}
                className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 mb-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search inventory items..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#00F5C4] transition-colors"
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingInventoryItem(null);
                      setInventoryForm({
                        product: '',
                        warehouse: 'Warehouse A',
                        currentStock: 0,
                        minThreshold: 100,
                        recommendedRestock: 200,
                        urgency: 'medium'
                      });
                      setShowAddInventoryForm(true);
                    }}
                    className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Product
                  </button>
                  
                  <button className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 text-slate-400 border border-slate-600/30 rounded-lg hover:bg-slate-700/70 transition-colors">
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                  
                  <button className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 text-slate-400 border border-slate-600/30 rounded-lg hover:bg-slate-700/70 transition-colors">
                    Download CSV
                  </button>
                </div>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-4 text-slate-400 font-medium">Product</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Warehouse</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Current Stock</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Min Threshold</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Recommended Restock</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Urgency</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Last Updated</th>
                      <th className="text-center p-4 text-slate-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item, index) => (
                      <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                        <td className="p-4">
                          <div>
                            <div className="text-white font-medium">{item.product}</div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">{item.warehouse}</td>
                        <td className="p-4">
                          <div className="text-white font-medium">{item.currentStock.toLocaleString()}</div>
                        </td>
                        <td className="p-4 text-slate-300">{item.minThreshold.toLocaleString()}</td>
                        <td className="p-4 text-slate-300">{item.recommendedRestock.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.urgency === 'high' ? 'bg-red-500/20 text-red-400' :
                            item.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {item.urgency}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400 text-sm">{item.lastUpdated}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => {
                                setEditingInventoryItem(item);
                                setInventoryForm({
                                  product: item.product,
                                  warehouse: item.warehouse,
                                  currentStock: item.currentStock,
                                  minThreshold: item.minThreshold,
                                  recommendedRestock: item.recommendedRestock,
                                  urgency: item.urgency
                                });
                                setShowAddInventoryForm(true);
                              }}
                              className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors text-xs"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleInventoryRestock(item.id, item.recommendedRestock)}
                              className="px-2 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors text-xs"
                            >
                              Restock
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Items</p>
                    <p className="text-2xl font-bold text-white">{inventory.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Critical Items</p>
                    <p className="text-2xl font-bold text-red-400">
                      {inventory.filter(i => i.urgency === 'high').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Low Stock Items</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {inventory.filter(i => i.currentStock < i.minThreshold).length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'disruptions' && (
          <motion.div
            key="disruptions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {disruptionAlerts.map(alert => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      alert.type === 'traffic' ? 'bg-red-500/20' :
                      alert.type === 'weather' ? 'bg-blue-500/20' :
                      alert.type === 'accident' ? 'bg-orange-500/20' :
                      alert.type === 'shortage' ? 'bg-yellow-500/20' :
                      'bg-purple-500/20'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 ${
                        alert.type === 'traffic' ? 'text-red-400' :
                        alert.type === 'weather' ? 'text-blue-400' :
                        alert.type === 'accident' ? 'text-orange-400' :
                        alert.type === 'shortage' ? 'text-yellow-400' :
                        'text-purple-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{alert.title}</h3>
                      <p className="text-slate-400 text-sm mb-2">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={`px-2 py-1 rounded ${
                          alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                          alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {alert.severity} severity
                        </span>
                        <span className="text-slate-400">{alert.estimatedDelay} delay</span>
                        <span className="text-slate-400">{alert.location}</span>
                        <span className="text-slate-500">{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    alert.status === 'active' ? 'bg-red-500/20 text-red-400' :
                    alert.status === 'handling' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {alert.status}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-1">Affected Shipments</p>
                  <div className="flex flex-wrap gap-1">
                    {alert.affectedShipments.map(shipment => (
                      <span key={shipment} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                        {shipment}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-1">Recommended Action</p>
                  <p className="text-sm text-blue-400">{alert.recommendedAction}</p>
                </div>

                {alert.status === 'active' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartHandling(alert.id)}
                      className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Play className="w-4 h-4" />
                      Start Handling
                    </button>
                    <button 
                      onClick={() => handleViewDisruptionDetails(alert)}
                      title="View disruption details" 
                      className="px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                )}

                {alert.status === 'handling' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDisruptionAction(alert.id, 'resolve')}
                      className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Resolved
                    </button>
                    <button 
                      title="Update disruption status" 
                      className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Settings className="w-4 h-4" />
                      Update Status
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'cost-optimization' && (
          <motion.div
            key="cost-optimization"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {costOptimizations.map(optimization => (
              <motion.div
                key={optimization.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      optimization.category === 'fuel' ? 'bg-green-500/20' :
                      optimization.category === 'labor' ? 'bg-blue-500/20' :
                      optimization.category === 'maintenance' ? 'bg-orange-500/20' :
                      optimization.category === 'routing' ? 'bg-purple-500/20' :
                      'bg-yellow-500/20'
                    }`}>
                      <TrendingUp className={`w-5 h-5 ${
                        optimization.category === 'fuel' ? 'text-green-400' :
                        optimization.category === 'labor' ? 'text-blue-400' :
                        optimization.category === 'maintenance' ? 'text-orange-400' :
                        optimization.category === 'routing' ? 'text-purple-400' :
                        'text-yellow-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{optimization.title}</h3>
                      <p className="text-slate-400 text-sm mb-2">{optimization.impact}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={`px-2 py-1 rounded ${
                          optimization.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                          optimization.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {optimization.difficulty}
                        </span>
                        <span className="text-green-400">${optimization.savings} savings</span>
                        <span className={`px-2 py-1 rounded ${
                          optimization.status === 'suggested' ? 'bg-blue-500/20 text-blue-400' :
                          optimization.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {optimization.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Current Cost</p>
                    <p className="text-lg font-medium text-red-400">${optimization.currentCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Optimized Cost</p>
                    <p className="text-lg font-medium text-green-400">${optimization.optimizedCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Savings</p>
                    <p className="text-lg font-medium text-blue-400">${optimization.savings.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-1">Implementation</p>
                  <p className="text-sm text-slate-300">{optimization.implementation}</p>
                </div>

                {optimization.status === 'suggested' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCostOptimization(optimization.id, 'start')}
                      className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Play className="w-4 h-4" />
                      Start Implementation
                    </button>
                    <button 
                      onClick={() => handleViewAnalysis(optimization)}
                      title="View cost optimization analysis" 
                      className="px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View Analysis
                    </button>
                  </div>
                )}

                {optimization.status === 'in-progress' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCostOptimization(optimization.id, 'complete')}
                      className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Complete
                    </button>
                    <button 
                      onClick={() => handleUpdateProgress(optimization)}
                      title="Update optimization progress" 
                      className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Settings className="w-4 h-4" />
                      Update Progress
                    </button>
                  </div>
                )}

                {optimization.status === 'implemented' && (
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Successfully Implemented
                    </div>
                    <button 
                      title="View optimization results" 
                      className="px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View Results
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'simulation' && (
          <motion.div
            key="simulation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <AdminSimulation />
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <AdvancedAnalytics />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* View Resource Modal */}
      <AnimatePresence>
        {showViewModal && selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Resource Details</h3>
                <button
                  title="Close modal"
                  onClick={() => setShowViewModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    selectedResource.type === 'driver' ? 'bg-blue-500/20' : 'bg-green-500/20'
                  }`}>
                    {selectedResource.type === 'driver' ? <Users className="w-8 h-8 text-blue-400" /> : <Truck className="w-8 h-8 text-green-400" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">{selectedResource.name}</h4>
                    <p className="text-sm text-slate-400">{selectedResource.type}</p>
                  </div>
                </div>
                
                {/* Status Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-1">Current Assignment</p>
                    <p className="text-white font-medium">{selectedResource.currentAssignment}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-1">Availability</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      selectedResource.availability === 'available' ? 'bg-green-500/20 text-green-400' :
                      selectedResource.availability === 'busy' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {selectedResource.availability}
                    </span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-1">Location</p>
                    <p className="text-white font-medium">{selectedResource.location}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <p className="text-sm text-slate-400 mb-1">Performance</p>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${
                            selectedResource.performance >= 90 ? 'bg-green-400' :
                            selectedResource.performance >= 80 ? 'bg-yellow-400' :
                            'bg-red-400'
                          }`}
                          style={{ width: `${selectedResource.performance}%` }}
                        />
                      </div>
                      <span className="text-white font-medium">{selectedResource.performance}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Detailed Info */}
                {selectedResource.type === 'driver' ? (
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-white mb-3">Driver Information</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">License Type:</span>
                        <span className="text-sm text-white">{selectedResource.licenseType}</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-400">Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedResource.skills?.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-white mb-3">Vehicle Information</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Capacity:</span>
                        <span className="text-sm text-white">{selectedResource.capacity?.toLocaleString()} lbs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Fuel Level:</span>
                        <span className="text-sm text-white">{selectedResource.fuelLevel}%</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setShowEditModal(true);
                    }}
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    Edit Assignment
                  </button>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-4 py-2 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Edit Resource Modal */}
      <AnimatePresence>
        {showEditModal && selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Edit Assignment</h3>
                <button
                  title="Close modal"
                  onClick={() => setShowEditModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Resource</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedResource.type === 'driver' ? 'bg-blue-500/20' : 'bg-green-500/20'
                    }`}>
                      {selectedResource.type === 'driver' ? <Users className="w-5 h-5 text-blue-400" /> : <Truck className="w-5 h-5 text-green-400" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{selectedResource.name}</p>
                      <p className="text-sm text-slate-400">{selectedResource.type}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">New Assignment</label>
                  <input
                    type="text"
                    defaultValue={selectedResource.currentAssignment}
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                    placeholder="Enter new assignment..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Availability Status</label>
                  <select title="Select availability status" className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent">
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                
                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => {
                      // Update the resource in the array
                      setResources(prev => prev.map(r => 
                        r.id === selectedResource.id 
                          ? { ...r, currentAssignment: 'Updated Assignment', availability: 'busy' }
                          : r
                      ));
                      setShowEditModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Inventory Form Modal */}
      {showAddInventoryForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingInventoryItem ? 'Edit Inventory Item' : 'Add New Product'}
                  </h2>
                  <p className="text-slate-400 mt-1">
                    {editingInventoryItem ? 'Update inventory information' : 'Enter complete product details for inventory management'}
                  </p>
                </div>
                <button 
                  onClick={() => setShowAddInventoryForm(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close inventory form"
                  title="Close inventory form"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={inventoryForm.product}
                      onChange={(e) => setInventoryForm({...inventoryForm, product: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="e.g., Circuit Board A"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="warehouse-select" className="block text-sm font-medium text-slate-300 mb-2">Warehouse *</label>
                    <select
                      id="warehouse-select"
                      value={inventoryForm.warehouse}
                      onChange={(e) => setInventoryForm({...inventoryForm, warehouse: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      required
                    >
                      <option value="Warehouse A">Warehouse A</option>
                      <option value="Warehouse B">Warehouse B</option>
                      <option value="Warehouse C">Warehouse C</option>
                      <option value="Warehouse D">Warehouse D</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Current Stock *</label>
                    <input
                      type="number"
                      value={inventoryForm.currentStock}
                      onChange={(e) => setInventoryForm({...inventoryForm, currentStock: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Minimum Threshold *</label>
                    <input
                      type="number"
                      value={inventoryForm.minThreshold}
                      onChange={(e) => setInventoryForm({...inventoryForm, minThreshold: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="100"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Recommended Restock *</label>
                    <input
                      type="number"
                      value={inventoryForm.recommendedRestock}
                      onChange={(e) => setInventoryForm({...inventoryForm, recommendedRestock: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="200"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="urgency-level" className="block text-sm font-medium text-slate-300 mb-2">Urgency Level *</label>
                    <select
                      id="urgency-level"
                      value={inventoryForm.urgency}
                      onChange={(e) => setInventoryForm({...inventoryForm, urgency: e.target.value as 'low' | 'medium' | 'high'})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-700/50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddInventoryForm(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Inventory form submitted:', inventoryForm);
                    // Here you would typically save the inventory item
                    if (editingInventoryItem) {
                      // Update existing item
                      setInventory(prev => prev.map(item => 
                        item.id === editingInventoryItem.id 
                          ? { ...item, ...inventoryForm, lastUpdated: 'Just now' }
                          : item
                      ));
                    } else {
                      // Add new item
                      const newItem: InventoryItem = {
                        id: Date.now().toString(),
                        ...inventoryForm,
                        lastUpdated: 'Just now'
                      };
                      setInventory(prev => [...prev, newItem]);
                    }
                    setShowAddInventoryForm(false);
                    setEditingInventoryItem(null);
                  }}
                  className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors"
                >
                  {editingInventoryItem ? 'Update Item' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disruption Details Modal */}
      {showDisruptionDetailsModal && selectedDisruption && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Disruption Alert Details</h2>
              <button
                onClick={() => setShowDisruptionDetailsModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Disruption Information */}
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    {selectedDisruption.title}
                  </h3>
                  <p className="text-slate-300 mb-4">{selectedDisruption.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Alert ID:</span>
                      <span className="text-white font-medium">DIS-{selectedDisruption.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type:</span>
                      <span className="text-white capitalize">{selectedDisruption.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Severity:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        selectedDisruption.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                        selectedDisruption.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        selectedDisruption.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {selectedDisruption.severity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        selectedDisruption.status === 'active' ? 'bg-red-500/20 text-red-400' :
                        selectedDisruption.status === 'handling' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {selectedDisruption.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timestamp:</span>
                      <span className="text-white">{selectedDisruption.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#00F5C4]" />
                    Location Information
                  </h4>
                  <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                    <p className="text-slate-300">{selectedDisruption.location}</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3">Affected Shipments</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDisruption.affectedShipments.map(shipment => (
                      <span key={shipment} className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded border border-slate-600">
                        {shipment}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Impact Analysis */}
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-orange-400" />
                    Impact Analysis
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Estimated Delay:</span>
                      <span className="text-orange-400 font-medium">{selectedDisruption.estimatedDelay}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Affected Shipments:</span>
                      <span className="text-white font-medium">{selectedDisruption.affectedShipments.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Priority Level:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        selectedDisruption.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                        selectedDisruption.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {selectedDisruption.severity.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-[#00F5C4]" />
                    AI Analysis & Recommendations
                  </h4>
                  <div className="space-y-3 text-slate-300">
                    <div>
                      <h5 className="text-white font-medium mb-2">Recommended Action:</h5>
                      <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                        <p className="text-blue-400">{selectedDisruption.recommendedAction}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-2">AI Assessment:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Real-time traffic analysis applied</li>
                        <li>• Alternative routes calculated</li>
                        <li>• Resource availability checked</li>
                        <li>• Customer impact assessed</li>
                        <li>• Cost implications evaluated</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3">Handling Procedures</h4>
                  <div className="space-y-3 text-slate-300">
                    <div>
                      <h5 className="text-white font-medium mb-2">Immediate Actions:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Alert all affected drivers</li>
                        <li>• Update customer notifications</li>
                        <li>• Activate contingency plans</li>
                        <li>• Notify support teams</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-2">Follow-up Required:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Monitor situation updates</li>
                        <li>• Track delivery adjustments</li>
                        <li>• Document resolution process</li>
                        <li>• Update system records</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
              {selectedDisruption.status === 'active' && (
                <>
                  <button
                    onClick={() => {
                      handleDisruptionAction(selectedDisruption.id, 'handle');
                      setShowDisruptionDetailsModal(false);
                    }}
                    className="flex-1 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start Handling
                  </button>
                  <button
                    onClick={() => {
                      handleDisruptionAction(selectedDisruption.id, 'resolve');
                      setShowDisruptionDetailsModal(false);
                    }}
                    className="flex-1 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Resolved
                  </button>
                </>
              )}
              {selectedDisruption.status === 'handling' && (
                <button
                  onClick={() => {
                    handleDisruptionAction(selectedDisruption.id, 'resolve');
                    setShowDisruptionDetailsModal(false);
                  }}
                  className="flex-1 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Resolved
                </button>
              )}
              <button
                onClick={() => setShowDisruptionDetailsModal(false)}
                className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Route Details Modal */}
      {showRouteDetailsModal && selectedRoute && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Route Change Details</h2>
              <button
                onClick={() => setShowRouteDetailsModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Route Information */}
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-400" />
                    {selectedRoute.shipmentId}
                  </h3>
                  <p className="text-slate-300 mb-4">{selectedRoute.reason}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Route ID:</span>
                      <span className="text-white font-medium">RT-{selectedRoute.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        selectedRoute.status === 'proposed' ? 'bg-yellow-500/20 text-yellow-400' :
                        selectedRoute.status === 'changed' ? 'bg-green-500/20 text-green-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {selectedRoute.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3">Current Route</h4>
                  <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                    <p className="text-slate-300">{selectedRoute.currentRoute}</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3">Proposed Route</h4>
                  <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                    <p className="text-blue-400">{selectedRoute.proposedRoute}</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Impact Analysis */}
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Impact Analysis
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Time Change:</span>
                      <span className={`flex items-center gap-1 font-medium ${
                        selectedRoute.timeChange.startsWith('-') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <TrendingUp className="w-3 h-3" />
                        {selectedRoute.timeChange}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Cost Change:</span>
                      <span className={`flex items-center gap-1 font-medium ${
                        selectedRoute.costChange.startsWith('+') ? 'text-red-400' : 'text-green-400'
                      }`}>
                        ₹{selectedRoute.costChange}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#00F5C4]" />
                    Route Details
                  </h4>
                  <div className="space-y-3 text-slate-300">
                    <div>
                      <h5 className="text-white font-medium mb-2">Route Analysis:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Current route: {selectedRoute.currentRoute.includes('I-95') ? 'Highway with heavy traffic' : 'Standard route'}</li>
                        <li>• Proposed route: {selectedRoute.proposedRoute.includes('Highway 101') ? 'Alternative highway with less traffic' : 'Optimized route'}</li>
                        <li>• Traffic conditions: Real-time analysis applied</li>
                        <li>• Road conditions: All routes clear and passable</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-2">Benefits:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Reduced travel time by {selectedRoute.timeChange.replace('-', '')}</li>
                        <li>• Improved fuel efficiency</li>
                        <li>• Lower risk of delays</li>
                        <li>• Better delivery time predictions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3">Implementation Notes</h4>
                  <div className="space-y-3 text-slate-300">
                    <div>
                      <h5 className="text-white font-medium mb-2">Driver Instructions:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Notify driver of route change immediately</li>
                        <li>• Update GPS navigation system</li>
                        <li>• Provide new route documentation</li>
                        <li>• Confirm estimated arrival time</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-2">System Updates:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Update shipment tracking system</li>
                        <li>• Notify customer of ETA change</li>
                        <li>• Adjust warehouse scheduling</li>
                        <li>• Update logistics dashboard</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
              <button
                onClick={() => {
                  handleRouteChange(selectedRoute.id, 'approve');
                  setShowRouteDetailsModal(false);
                }}
                className="flex-1 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Apply Route Change
              </button>
              <button
                onClick={() => {
                  handleRouteChange(selectedRoute.id, 'reject');
                  setShowRouteDetailsModal(false);
                }}
                className="flex-1 py-2 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Pause className="w-4 h-4" />
                Keep Current Route
              </button>
              <button
                onClick={() => setShowRouteDetailsModal(false)}
                className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Decision Details Modal */}
      {showAIDecisionModal && selectedAIDecision && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">AI Decision Details</h2>
              <button
                onClick={() => setShowAIDecisionModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Decision Info */}
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    {selectedAIDecision.type === 'route' ? <Route className="w-5 h-5 text-blue-400" /> :
                     selectedAIDecision.type === 'inventory' ? <Package className="w-5 h-5 text-green-400" /> :
                     <Users className="w-5 h-5 text-purple-400" />}
                    {selectedAIDecision.title}
                  </h3>
                  <p className="text-slate-300 mb-4">{selectedAIDecision.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Decision ID:</span>
                      <span className="text-white font-medium">AI-{selectedAIDecision.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type:</span>
                      <span className="text-white capitalize">{selectedAIDecision.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        selectedAIDecision.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        selectedAIDecision.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedAIDecision.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timestamp:</span>
                      <span className="text-white">{selectedAIDecision.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3">Impact Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Impact Level:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        selectedAIDecision.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                        selectedAIDecision.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {selectedAIDecision.impact}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated Savings:</span>
                      <span className="text-green-400 font-medium">₹{selectedAIDecision.estimatedSavings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Confidence:</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-700 rounded-full h-2 max-w-[100px]">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedAIDecision.confidence >= 90 ? 'bg-green-500' :
                              selectedAIDecision.confidence >= 70 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${selectedAIDecision.confidence}%` }}
                          />
                        </div>
                        <span className="text-white text-sm">{selectedAIDecision.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - AI Analysis */}
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-[#00F5C4]" />
                    AI Analysis & Reasoning
                  </h4>
                  <div className="space-y-3 text-slate-300">
                    <div>
                      <h5 className="text-white font-medium mb-2">Data Sources Analyzed:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Real-time traffic patterns</li>
                        <li>• Historical performance data</li>
                        <li>• Current inventory levels</li>
                        <li>• Resource availability</li>
                        <li>• Weather conditions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-2">Key Factors:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Cost optimization potential</li>
                        <li>• Time efficiency gains</li>
                        <li>• Resource utilization</li>
                        <li>• Risk assessment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-3">Implementation Plan</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-white font-medium mb-2">Recommended Actions:</h5>
                      <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
                        <li>Review and validate AI recommendation</li>
                        <li>Check resource availability</li>
                        <li>Communicate with relevant teams</li>
                        <li>Execute implementation</li>
                        <li>Monitor results and feedback</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-2">Expected Timeline:</h5>
                      <div className="text-sm text-slate-300">
                        <p>• Immediate: Decision review (5-10 mins)</p>
                        <p>• Short-term: Implementation (1-2 hours)</p>
                        <p>• Long-term: Full integration (24-48 hours)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
              <button
                onClick={() => {
                  handleAIDecision(selectedAIDecision.id, 'approve');
                  setShowAIDecisionModal(false);
                }}
                className="flex-1 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Approve Decision
              </button>
              <button
                onClick={() => {
                  handleAIDecision(selectedAIDecision.id, 'reject');
                  setShowAIDecisionModal(false);
                }}
                className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject Decision
              </button>
              <button
                onClick={() => setShowAIDecisionModal(false)}
                className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cost Optimization Analysis Modal */}
      {showAnalysisModal && selectedOptimization && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Cost Optimization Analysis</h2>
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current vs Optimized Costs */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Cost Comparison</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Current Cost</span>
                    <span className="text-xl font-bold text-red-400">${selectedOptimization.currentCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Optimized Cost</span>
                    <span className="text-xl font-bold text-green-400">${selectedOptimization.optimizedCost.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-slate-700 my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Total Savings</span>
                    <span className="text-xl font-bold text-blue-400">${selectedOptimization.savings.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Implementation Details */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Implementation Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-slate-400 text-sm">Category</span>
                    <p className="text-white font-medium capitalize">{selectedOptimization.category}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Difficulty</span>
                    <p className="text-white font-medium capitalize">{selectedOptimization.difficulty}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">Implementation Plan</span>
                    <p className="text-slate-300 text-sm">{selectedOptimization.implementation}</p>
                  </div>
                </div>
              </div>

              {/* Impact Analysis */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 lg:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4">Impact Analysis</h3>
                <p className="text-slate-300">{selectedOptimization.impact}</p>
              </div>

              {/* ROI Calculation */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 lg:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4">Return on Investment</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {Math.round((selectedOptimization.savings / selectedOptimization.currentCost) * 100)}%
                    </div>
                    <div className="text-slate-400 text-sm">Cost Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {selectedOptimization.difficulty === 'easy' ? '1-2' : 
                       selectedOptimization.difficulty === 'medium' ? '3-6' : '6-12'} months
                    </div>
                    <div className="text-slate-400 text-sm">Payback Period</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      {Math.round(selectedOptimization.savings * 12 / (selectedOptimization.difficulty === 'easy' ? 1 : 
                       selectedOptimization.difficulty === 'medium' ? 3 : 6))}%
                    </div>
                    <div className="text-slate-400 text-sm">Annual ROI</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
              <button
                onClick={() => {
                  handleCostOptimization(selectedOptimization.id, 'start');
                  setShowAnalysisModal(false);
                }}
                className="flex-1 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Implementation
              </button>
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Update Modal */}
      {showProgressModal && selectedOptimization && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-2xl w-full mx-4 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Update Progress</h2>
              <button
                onClick={() => setShowProgressModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Optimization Info */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-2">{selectedOptimization.title}</h3>
                <p className="text-slate-400 text-sm">{selectedOptimization.category} • {selectedOptimization.difficulty}</p>
              </div>

              {/* Progress Percentage */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Progress Percentage
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progressForm.progressPercentage}
                    onChange={(e) => setProgressForm(prev => ({ ...prev, progressPercentage: parseInt(e.target.value) }))}
                    className="w-full"
                    title="Adjust progress percentage"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">0%</span>
                    <span className="text-xl font-bold text-blue-400">{progressForm.progressPercentage}%</span>
                    <span className="text-slate-400 text-sm">100%</span>
                  </div>
                </div>
              </div>

              {/* Progress Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Progress Notes
                </label>
                <textarea
                  value={progressForm.notes}
                  onChange={(e) => setProgressForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-[#00F5C4] outline-none resize-none"
                  rows={3}
                  placeholder="Describe what has been accomplished..."
                />
              </div>

              {/* Issues/Blockers */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Issues or Blockers
                </label>
                <textarea
                  value={progressForm.issues}
                  onChange={(e) => setProgressForm(prev => ({ ...prev, issues: e.target.value }))}
                  className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-[#00F5C4] outline-none resize-none"
                  rows={3}
                  placeholder="Any challenges or blockers encountered..."
                />
              </div>

              {/* Current Status */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Current Status</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm capitalize">
                    {selectedOptimization.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
              <button
                onClick={handleSubmitProgress}
                className="flex-1 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors font-medium"
              >
                Update Progress
              </button>
              <button
                onClick={() => setShowProgressModal(false)}
                className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
