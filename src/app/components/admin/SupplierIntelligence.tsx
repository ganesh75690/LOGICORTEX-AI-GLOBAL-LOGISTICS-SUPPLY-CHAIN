import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  Zap,
  Target,
  Shield,
  Globe,
  Truck,
  Users,
  Package,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  MoreVertical,
  X,
  ArrowUpDown,
  Clock,
  MapPin,
  FileText,
  Star,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Layers,
  PieChart,
  LineChart,
  RefreshCw,
  Lock,
  Award,
  Wrench,
  FileCheck,
  Scale,
  Radar,
  Bell,
  XCircle,
  Mail,
  Upload,
  DollarSign,
  Settings,
  Leaf,
  History
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  supplierId: string;
  region: string;
  category: string;
  activeShipments: number;
  onTimeRate: number;
  reliability: number;
  compliance: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  aiReadiness: number;
  status: 'ACTIVE' | 'INACTIVE' | 'UNDER_REVIEW' | 'AT_RISK' | 'PENDING_VERIFICATION' | 'UNDER_AI_REVIEW' | 'SUSPENDED';
  logo?: string;
  healthScore?: number;
  aiRecommendation?: string;
  approvalHistory?: ApprovalHistory[];
}

interface ApprovalHistory {
  id: string;
  action: string;
  adminUser: string;
  aiRecommendation: string;
  finalDecision: string;
  timestamp: string;
  reason: string;
}

interface AIPrediction {
  id: string;
  type: 'delivery' | 'capacity' | 'disruption' | 'compliance' | 'readiness';
  title: string;
  prediction: string;
  confidence: number;
  timeHorizon: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  reason: string;
  recommendedAction: string;
}

interface EarlyWarning {
  id: string;
  type: 'capacity' | 'delivery' | 'vehicle' | 'compliance' | 'volume';
  title: string;
  probability: number;
  expectedImpact: string;
  timeHorizon: string;
  recommendedAction: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface AIRecommendation {
  id: string;
  title: string;
  reason: string;
  expectedImpact: string;
  priority: 'low' | 'medium' | 'high';
  recommendedAction: string;
}

// Supplier Continuity Twin™ Interfaces
interface SupplierResilience {
  score: number;
  capacity: number;
  capacityUtilization: number;
  dependencyLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recoveryTime: number;
  alternativeSuppliers: number;
  criticalProducts: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  complianceStatus: 'VERIFIED' | 'PENDING' | 'EXPIRED';
}

interface DisruptionScenario {
  id: string;
  type: 'shutdown' | 'capacity_reduction' | 'raw_material_shortage' | 'quality_failure' | 'compliance_suspension' | 'transportation_disruption' | 'geopolitical_disruption' | 'demand_surge';
  severity: number;
  label: string;
}

interface ImpactAnalysis {
  supplierImpact: string;
  affectedProducts: number;
  inventoryImpact: string;
  affectedOrders: number;
  deliveryImpact: string;
  alternativeCapacity: number;
  recoveryTime: number;
  recoveryCost: number;
  networkRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  regionsAffected: string[];
}

interface DependencyNode {
  id: string;
  name: string;
  type: 'supplier' | 'product' | 'warehouse' | 'shipment' | 'region' | 'customer';
  critical: boolean;
}

interface AlternativeSupplier {
  id: string;
  name: string;
  availableCapacity: number;
  location: string;
  leadTime: number;
  complianceStatus: 'VERIFIED' | 'PENDING' | 'RISK';
  reliabilityScore: number;
  costImpact: number;
  distance: number;
  currentUtilization: number;
  resilienceScore: number;
  matchScore: number;
}

interface RecoveryStrategy {
  recommendation: string;
  confidence: number;
  expectedImpact: string;
  estimatedCost: number;
  recoveryTime: number;
  riskReduction: number;
  actions: string[];
}

interface ContinuityDecision {
  id: string;
  user: string;
  supplier: string;
  scenario: string;
  parameters: any;
  aiRecommendation: string;
  confidence: number;
  expectedImpact: string;
  humanDecision: 'APPROVED' | 'MODIFIED' | 'REJECTED';
  timestamp: string;
  finalOutcome: string;
}

const SupplierIntelligenceComponent = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showAddSupplierForm, setShowAddSupplierForm] = useState(false);
  const [activeFormSection, setActiveFormSection] = useState(1);

  // Supplier Continuity Twin™ State
  const [showContinuityTwin, setShowContinuityTwin] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<DisruptionScenario | null>(null);
  const [simulationSeverity, setSimulationSeverity] = useState(40);
  const [impactAnalysis, setImpactAnalysis] = useState<ImpactAnalysis | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showDependencyMap, setShowDependencyMap] = useState(false);
  const [alternativeSuppliers, setAlternativeSuppliers] = useState<AlternativeSupplier[]>([]);
  const [recoveryStrategy, setRecoveryStrategy] = useState<RecoveryStrategy | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [decisionHistory, setDecisionHistory] = useState<ContinuityDecision[]>([]);
  const [humanApprovalRequired, setHumanApprovalRequired] = useState(false);

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Apex Manufacturing',
      supplierId: 'SUP-1048',
      region: 'India',
      category: 'Manufacturing',
      activeShipments: 24,
      onTimeRate: 96,
      reliability: 94,
      compliance: 98,
      riskLevel: 'LOW',
      aiReadiness: 92,
      status: 'ACTIVE',
      healthScore: 94,
      aiRecommendation: 'Supplier performing above network average',
      approvalHistory: [
        {
          id: 'AH001',
          action: 'Initial Verification',
          adminUser: 'Admin01',
          aiRecommendation: 'Approve supplier',
          finalDecision: 'Approved',
          timestamp: '2026-08-10 10:30 AM',
          reason: 'Strong compliance and delivery reliability'
        }
      ]
    },
    {
      id: '2',
      name: 'Global Components Ltd.',
      supplierId: 'SUP-2071',
      region: 'Japan',
      category: 'Electronics',
      activeShipments: 18,
      onTimeRate: 88,
      reliability: 84,
      compliance: 91,
      riskLevel: 'MEDIUM',
      aiReadiness: 79,
      status: 'ACTIVE',
      healthScore: 82,
      aiRecommendation: 'Monitor delivery reliability',
      approvalHistory: [
        {
          id: 'AH002',
          action: 'Initial Verification',
          adminUser: 'Admin01',
          aiRecommendation: 'Approve with monitoring',
          finalDecision: 'Approved',
          timestamp: '2026-08-09 14:45 PM',
          reason: 'Good capacity but moderate risk'
        }
      ]
    },
    {
      id: '3',
      name: 'TechFlow Systems',
      supplierId: 'SUP-3092',
      region: 'Germany',
      category: 'Technology',
      activeShipments: 32,
      onTimeRate: 94,
      reliability: 91,
      compliance: 96,
      riskLevel: 'LOW',
      aiReadiness: 88,
      status: 'ACTIVE',
      healthScore: 91,
      aiRecommendation: 'High-performing supplier',
      approvalHistory: [
        {
          id: 'AH003',
          action: 'Initial Verification',
          adminUser: 'Admin02',
          aiRecommendation: 'Approve supplier',
          finalDecision: 'Approved',
          timestamp: '2026-08-08 09:15 AM',
          reason: 'Excellent technical capabilities'
        }
      ]
    },
    {
      id: '4',
      name: 'Pacific Logistics',
      supplierId: 'SUP-4156',
      region: 'Australia',
      category: 'Logistics',
      activeShipments: 15,
      onTimeRate: 82,
      reliability: 78,
      compliance: 85,
      riskLevel: 'HIGH',
      aiReadiness: 72,
      status: 'AT_RISK',
      healthScore: 68,
      aiRecommendation: 'Consider capacity reduction',
      approvalHistory: [
        {
          id: 'AH004',
          action: 'Risk Alert',
          adminUser: 'System',
          aiRecommendation: 'Reduce allocation',
          finalDecision: 'Marked At Risk',
          timestamp: '2026-08-12 11:20 AM',
          reason: 'Delivery reliability declining'
        }
      ]
    },
    {
      id: '5',
      name: 'Nordic Suppliers',
      supplierId: 'SUP-5223',
      region: 'Sweden',
      category: 'Manufacturing',
      activeShipments: 21,
      onTimeRate: 97,
      reliability: 95,
      compliance: 99,
      riskLevel: 'LOW',
      aiReadiness: 94,
      status: 'ACTIVE',
      healthScore: 97,
      aiRecommendation: 'Top-tier supplier',
      approvalHistory: [
        {
          id: 'AH005',
          action: 'Initial Verification',
          adminUser: 'Admin01',
          aiRecommendation: 'Approve supplier',
          finalDecision: 'Approved',
          timestamp: '2026-08-07 16:30 PM',
          reason: 'Outstanding performance metrics'
        }
      ]
    },
    {
      id: '6',
      name: 'Asia Pacific Partners',
      supplierId: 'SUP-6298',
      region: 'Singapore',
      category: 'Electronics',
      activeShipments: 28,
      onTimeRate: 90,
      reliability: 87,
      compliance: 93,
      riskLevel: 'MEDIUM',
      aiReadiness: 85,
      status: 'ACTIVE',
      healthScore: 86,
      aiRecommendation: 'Good performance overall',
      approvalHistory: [
        {
          id: 'AH006',
          action: 'Initial Verification',
          adminUser: 'Admin02',
          aiRecommendation: 'Approve supplier',
          finalDecision: 'Approved',
          timestamp: '2026-08-06 13:00 PM',
          reason: 'Strong regional presence'
        }
      ]
    },
    {
      id: '7',
      name: 'PENDING: New Electronics Corp',
      supplierId: 'SUP-PENDING-001',
      region: 'Korea',
      category: 'Electronics',
      activeShipments: 0,
      onTimeRate: 0,
      reliability: 0,
      compliance: 0,
      riskLevel: 'LOW',
      aiReadiness: 0,
      status: 'PENDING_VERIFICATION',
      healthScore: 0,
      aiRecommendation: 'Awaiting AI assessment'
    },
    {
      id: '8',
      name: 'PENDING: Global Logistics Hub',
      supplierId: 'SUP-PENDING-002',
      region: 'Canada',
      category: 'Logistics',
      activeShipments: 0,
      onTimeRate: 0,
      reliability: 0,
      compliance: 0,
      riskLevel: 'MEDIUM',
      aiReadiness: 0,
      status: 'UNDER_AI_REVIEW',
      healthScore: 0,
      aiRecommendation: 'AI analyzing business capability'
    }
  ];

  const aiPredictions: AIPrediction[] = [
    {
      id: 'PRED-001',
      type: 'delivery',
      title: 'Delivery Reliability Forecast',
      prediction: '92% probability of maintaining >90% on-time delivery over the next 14 days.',
      confidence: 92,
      timeHorizon: 'Next 14 days',
      risk: 'LOW',
      reason: 'Historical performance trend shows consistent delivery reliability.',
      recommendedAction: 'Maintain current allocation for priority shipments.'
    },
    {
      id: 'PRED-002',
      type: 'capacity',
      title: 'Capacity Forecast',
      prediction: 'Capacity utilization is expected to reach 87% within 7 days.',
      confidence: 87,
      timeHorizon: 'Next 7 days',
      risk: 'MEDIUM',
      reason: 'Current shipment volume is increasing faster than available fleet capacity.',
      recommendedAction: 'Consider allocating additional transport capacity.'
    },
    {
      id: 'PRED-003',
      type: 'disruption',
      title: 'Disruption Risk',
      prediction: 'Medium probability of delivery disruption detected for upcoming shipments.',
      confidence: 65,
      timeHorizon: 'Next 10 days',
      risk: 'MEDIUM',
      reason: 'Weather patterns and route congestion indicators suggest potential delays.',
      recommendedAction: 'Monitor closely and prepare contingency routes.'
    },
    {
      id: 'PRED-004',
      type: 'compliance',
      title: 'Compliance Forecast',
      prediction: 'No major compliance risk predicted for the next 30 days.',
      confidence: 95,
      timeHorizon: 'Next 30 days',
      risk: 'LOW',
      reason: 'All compliance documents are valid and up-to-date.',
      recommendedAction: 'Continue routine compliance monitoring.'
    },
    {
      id: 'PRED-005',
      type: 'readiness',
      title: 'Supplier Readiness',
      prediction: 'Supplier is predicted to remain operationally ready for high-priority shipments.',
      confidence: 89,
      timeHorizon: 'Next 21 days',
      risk: 'LOW',
      reason: 'Fleet and workforce metrics indicate strong operational readiness.',
      recommendedAction: 'Consider for priority shipment allocation.'
    }
  ];

  const earlyWarnings: EarlyWarning[] = [
    {
      id: 'WARN-001',
      type: 'capacity',
      title: 'Capacity pressure expected',
      probability: 78,
      expectedImpact: 'Potential delivery delays for 3-4 shipments',
      timeHorizon: 'Next 7 days',
      recommendedAction: 'Reallocate shipments or add temporary capacity',
      severity: 'medium'
    },
    {
      id: 'WARN-002',
      type: 'delivery',
      title: 'Delivery performance declining',
      probability: 65,
      expectedImpact: 'On-time rate may drop below 85%',
      timeHorizon: 'Next 14 days',
      recommendedAction: 'Investigate delivery bottlenecks and route optimization',
      severity: 'low'
    },
    {
      id: 'WARN-003',
      type: 'compliance',
      title: 'Compliance document expiry approaching',
      probability: 92,
      expectedImpact: 'Certification expires in 25 days',
      timeHorizon: 'Next 25 days',
      recommendedAction: 'Initiate renewal process immediately',
      severity: 'high'
    }
  ];

  // Supplier Continuity Twin™ Data
  const disruptionScenarios: DisruptionScenario[] = [
    { id: 'shutdown', type: 'shutdown', severity: 100, label: 'Supplier Shutdown' },
    { id: 'capacity-10', type: 'capacity_reduction', severity: 10, label: '10% Capacity Loss' },
    { id: 'capacity-20', type: 'capacity_reduction', severity: 20, label: '20% Capacity Loss' },
    { id: 'capacity-40', type: 'capacity_reduction', severity: 40, label: '40% Capacity Loss' },
    { id: 'capacity-60', type: 'capacity_reduction', severity: 60, label: '60% Capacity Loss' },
    { id: 'capacity-80', type: 'capacity_reduction', severity: 80, label: '80% Capacity Loss' },
    { id: 'raw-material', type: 'raw_material_shortage', severity: 50, label: 'Raw Material Shortage' },
    { id: 'quality', type: 'quality_failure', severity: 30, label: 'Quality Failure' },
    { id: 'compliance', type: 'compliance_suspension', severity: 70, label: 'Compliance Suspension' },
    { id: 'transport', type: 'transportation_disruption', severity: 40, label: 'Transportation Disruption' },
    { id: 'geopolitical', type: 'geopolitical_disruption', severity: 60, label: 'Geopolitical Disruption' },
    { id: 'demand', type: 'demand_surge', severity: 50, label: 'Sudden Demand Surge' }
  ];

  const demoResilience: SupplierResilience = {
    score: 87,
    capacity: 82,
    capacityUtilization: 78,
    dependencyLevel: 'HIGH',
    recoveryTime: 3.8,
    alternativeSuppliers: 4,
    criticalProducts: 7,
    riskLevel: 'MEDIUM',
    complianceStatus: 'VERIFIED'
  };

  const demoAlternativeSuppliers: AlternativeSupplier[] = [
    {
      id: 'ALT-001',
      name: 'TechFlow Systems',
      availableCapacity: 65,
      location: 'Germany',
      leadTime: 1.8,
      complianceStatus: 'VERIFIED',
      reliabilityScore: 91,
      costImpact: 12,
      distance: 4500,
      currentUtilization: 68,
      resilienceScore: 89,
      matchScore: 92
    },
    {
      id: 'ALT-002',
      name: 'Global Components Ltd.',
      availableCapacity: 45,
      location: 'Japan',
      leadTime: 2.4,
      complianceStatus: 'VERIFIED',
      reliabilityScore: 84,
      costImpact: 8,
      distance: 3200,
      currentUtilization: 72,
      resilienceScore: 82,
      matchScore: 85
    },
    {
      id: 'ALT-003',
      name: 'Apex Manufacturing',
      availableCapacity: 35,
      location: 'India',
      leadTime: 1.2,
      complianceStatus: 'VERIFIED',
      reliabilityScore: 94,
      costImpact: 5,
      distance: 2800,
      currentUtilization: 75,
      resilienceScore: 88,
      matchScore: 88
    }
  ];

  const demoDependencyNodes: DependencyNode[] = [
    { id: 'supplier', name: 'Selected Supplier', type: 'supplier', critical: true },
    { id: 'prod1', name: 'Product A', type: 'product', critical: true },
    { id: 'prod2', name: 'Product B', type: 'product', critical: true },
    { id: 'prod3', name: 'Product C', type: 'product', critical: false },
    { id: 'wh1', name: 'Warehouse Mumbai', type: 'warehouse', critical: true },
    { id: 'wh2', name: 'Warehouse Delhi', type: 'warehouse', critical: false },
    { id: 'ship1', name: 'Shipment #1245', type: 'shipment', critical: true },
    { id: 'ship2', name: 'Shipment #1246', type: 'shipment', critical: false },
    { id: 'reg1', name: 'North Region', type: 'region', critical: true },
    { id: 'reg2', name: 'South Region', type: 'region', critical: false },
    { id: 'cust1', name: 'Customer Operations', type: 'customer', critical: true }
  ];

  // Helper Functions
  const getResilienceColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const runSimulation = () => {
    if (!selectedSupplier || !selectedScenario) return;

    setIsSimulating(true);

    // Simulate AI processing
    setTimeout(() => {
      const severityFactor = selectedScenario.severity / 100;
      const newImpact: ImpactAnalysis = {
        supplierImpact: `${selectedScenario.label} - ${selectedScenario.severity}% severity`,
        affectedProducts: Math.ceil(7 * severityFactor),
        inventoryImpact: `Critical level in ${Math.ceil(3 * severityFactor)} days`,
        affectedOrders: Math.ceil(1240 * severityFactor),
        deliveryImpact: `${(2.4 * severityFactor).toFixed(1)} days delay`,
        alternativeCapacity: Math.round(65 * (1 - severityFactor * 0.3)),
        recoveryTime: Math.round(3.8 * (1 + severityFactor)),
        recoveryCost: Math.round(45000 * severityFactor),
        networkRisk: severityFactor > 0.7 ? 'CRITICAL' : severityFactor > 0.4 ? 'HIGH' : 'MEDIUM',
        regionsAffected: ['North', 'South', 'East'].slice(0, Math.ceil(3 * severityFactor))
      };

      setImpactAnalysis(newImpact);
      setAlternativeSuppliers(demoAlternativeSuppliers);

      const newStrategy: RecoveryStrategy = {
        recommendation: `${selectedSupplier.name} ${selectedScenario.label.toLowerCase()} detected. ${newImpact.affectedProducts} products are at risk and ${newImpact.affectedOrders} orders may be affected. TechFlow Systems and Global Components Ltd. can cover ${newImpact.alternativeCapacity}% of the projected shortage.`,
        confidence: 87,
        expectedImpact: `${newImpact.deliveryImpact} disruption avoided with ${newImpact.alternativeCapacity}% shortage coverage`,
        estimatedCost: newImpact.recoveryCost,
        recoveryTime: newImpact.recoveryTime,
        riskReduction: 65,
        actions: [
          `Redirect 35% of allocation to TechFlow Systems`,
          `Redirect 30% of allocation to Global Components Ltd.`,
          `Increase safety stock for critical products`,
          `Activate contingency shipping routes`
        ]
      };

      setRecoveryStrategy(newStrategy);
      setHumanApprovalRequired(true);
      setIsSimulating(false);
    }, 2000);
  };

  const approveRecovery = () => {
    if (!recoveryStrategy || !selectedSupplier) return;

    const newDecision: ContinuityDecision = {
      id: `DEC-${Date.now()}`,
      user: 'Admin01',
      supplier: selectedSupplier.name,
      scenario: selectedScenario?.label || 'Custom',
      parameters: { severity: simulationSeverity },
      aiRecommendation: recoveryStrategy.recommendation,
      confidence: recoveryStrategy.confidence,
      expectedImpact: recoveryStrategy.expectedImpact,
      humanDecision: 'APPROVED',
      timestamp: new Date().toISOString(),
      finalOutcome: 'Recovery strategy implemented successfully'
    };

    setDecisionHistory([newDecision, ...decisionHistory]);
    setHumanApprovalRequired(false);
    setIsMonitoring(true);
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  const aiRecommendations: AIRecommendation[] = [
    {
      id: 'REC-001',
      title: 'Increase Allocation for Priority Shipments',
      reason: 'Supplier SUP-1048 is performing above network average with 94% reliability.',
      expectedImpact: 'Estimated 15% improvement in overall network performance',
      priority: 'high',
      recommendedAction: 'Allocate 3-5 additional priority shipments to this supplier.'
    },
    {
      id: 'REC-002',
      title: 'Monitor Upcoming High-Priority Shipments',
      reason: 'Supplier SUP-2071 shows declining delivery reliability over the last 30 days.',
      expectedImpact: 'Risk mitigation for critical shipments',
      priority: 'medium',
      recommendedAction: 'Increase monitoring frequency and prepare contingency plans.'
    },
    {
      id: 'REC-003',
      title: 'Reallocate Selected Shipments',
      reason: 'Supplier SUP-3092 has excess available capacity with strong performance metrics.',
      expectedImpact: 'Optimized fleet utilization and reduced costs',
      priority: 'low',
      recommendedAction: 'Consider moving 2-3 shipments from high-utilization suppliers.'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'INACTIVE': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'UNDER_REVIEW': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'AT_RISK': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'PENDING_VERIFICATION': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'UNDER_AI_REVIEW': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'SUSPENDED': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Building2 className="w-6 h-6 text-[#00F5C4]" />
            Supplier Intelligence
          </h2>
          <p className="text-slate-400">Monitor supplier performance, operational health, risks and future readiness through AI-powered intelligence.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddSupplierForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Supplier
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:bg-slate-600 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-[#00F5C4]"
          />
        </div>
        <select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00F5C4]"
        >
          <option value="all">All Regions</option>
          <option value="india">India</option>
          <option value="japan">Japan</option>
          <option value="germany">Germany</option>
          <option value="australia">Australia</option>
          <option value="sweden">Sweden</option>
          <option value="singapore">Singapore</option>
        </select>
        <select
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
          className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00F5C4]"
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00F5C4]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="under_review">Under Review</option>
          <option value="at_risk">At Risk</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-5 h-5 text-[#00F5C4]" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">248</div>
          <div className="text-sm text-slate-400">Total Suppliers</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">231</div>
          <div className="text-sm text-slate-400">Active Suppliers</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5 text-[#00F5C4]" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">184</div>
          <div className="text-sm text-slate-400">High-Performing</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white">17</div>
          <div className="text-sm text-slate-400">At-Risk Suppliers</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-5 h-5 text-green-400" />
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">96%</div>
          <div className="text-sm text-slate-400">Compliance Ready</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 text-[#00F5C4]" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">91/100</div>
          <div className="text-sm text-slate-400">Avg Supplier Score</div>
        </div>
      </div>

      {/* Approval Status KPI */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">2</div>
          <div className="text-sm text-slate-400">Pending Verification</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-white">1</div>
          <div className="text-sm text-slate-400">Under AI Review</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">94%</div>
          <div className="text-sm text-slate-400">Approval Rate</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-5 h-5 text-[#00F5C4]" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">6</div>
          <div className="text-sm text-slate-400">Approvals This Week</div>
        </div>
      </div>

      {/* Supplier Directory */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#00F5C4]" />
            Supplier Directory
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Supplier ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Region</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Shipments</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">On-Time Rate</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Reliability</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Compliance</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk Level</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Readiness</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {suppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  onClick={() => setSelectedSupplier(supplier)}
                  className="hover:bg-slate-700/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-slate-900" />
                      </div>
                      <div className="font-medium text-white">{supplier.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-300">{supplier.supplierId}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{supplier.region}</td>
                  <td className="px-4 py-3 text-sm text-slate-300">{supplier.category}</td>
                  <td className="px-4 py-3 text-sm text-white font-medium">{supplier.activeShipments}</td>
                  <td className="px-4 py-3 text-sm text-white font-medium">{supplier.onTimeRate}%</td>
                  <td className="px-4 py-3 text-sm text-white font-medium">{supplier.reliability}/100</td>
                  <td className="px-4 py-3 text-sm text-white font-medium">{supplier.compliance}%</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded border ${getRiskColor(supplier.riskLevel)}`}>
                      {supplier.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            supplier.aiReadiness >= 90 ? 'bg-green-500' :
                            supplier.aiReadiness >= 75 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${supplier.aiReadiness}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{supplier.aiReadiness}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(supplier.status)}`}>
                      {supplier.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1 hover:bg-slate-600 rounded">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Supplier Forecast */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00F5C4]" />
            <h3 className="text-lg font-semibold text-white">AI Supplier Forecast</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="text-sm text-slate-400 mb-1">Projected Capacity Increase</div>
              <div className="text-2xl font-bold text-[#00F5C4]">+23%</div>
              <div className="text-xs text-slate-400 mt-1">Next 90 days</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="text-sm text-slate-400 mb-1">New Supplier Integrations</div>
              <div className="text-2xl font-bold text-purple-400">8</div>
              <div className="text-xs text-slate-400 mt-1">Pending review</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="text-sm text-slate-400 mb-1">Risk Reduction Potential</div>
              <div className="text-2xl font-bold text-green-400">-15%</div>
              <div className="text-xs text-slate-400 mt-1">With AI recommendations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approvals Panel */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#00F5C4]" />
              <h3 className="text-lg font-semibold text-white">Supplier Approval Panel</h3>
            </div>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">2 Pending</span>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {suppliers.filter(s => s.status === 'PENDING_VERIFICATION' || s.status === 'UNDER_AI_REVIEW').map((supplier) => (
            <div key={supplier.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-lg font-semibold text-white">{supplier.name}</div>
                  <div className="text-sm text-slate-400">{supplier.supplierId} • {supplier.region}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(supplier.status)}`}>
                  {supplier.status.replace('_', ' ')}
                </span>
              </div>

              {supplier.status === 'UNDER_AI_REVIEW' && (
                <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
                    <span className="text-sm font-medium text-purple-400">AI Assessment in Progress</span>
                  </div>
                  <div className="text-xs text-slate-400">Analyzing business capability, risk level, compliance, and performance potential...</div>
                </div>
              )}

              {supplier.status === 'PENDING_VERIFICATION' && (
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-slate-800/50 rounded p-2">
                      <div className="text-xs text-slate-400">AI Recommendation</div>
                      <div className="text-sm font-medium text-green-400">Approve</div>
                    </div>
                    <div className="bg-slate-800/50 rounded p-2">
                      <div className="text-xs text-slate-400">Risk Level</div>
                      <div className="text-sm font-medium text-yellow-400">Low</div>
                    </div>
                    <div className="bg-slate-800/50 rounded p-2">
                      <div className="text-xs text-slate-400">Compliance</div>
                      <div className="text-sm font-medium text-green-400">Verified ✓</div>
                    </div>
                    <div className="bg-slate-800/50 rounded p-2">
                      <div className="text-xs text-slate-400">Documents</div>
                      <div className="text-sm font-medium text-green-400">Complete ✓</div>
                    </div>
                  </div>
                  <div className="bg-[#00F5C4]/10 rounded-lg p-3 border border-[#00F5C4]/30">
                    <div className="text-sm text-slate-400 mb-1">AI Supplier Health Score™</div>
                    <div className="text-2xl font-bold text-[#00F5C4]">91/100</div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold">
                  Approve
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                  Request More Info
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approval History */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#00F5C4]" />
            <h3 className="text-lg font-semibold text-white">Approval History</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {suppliers.filter(s => s.approvalHistory && s.approvalHistory.length > 0).slice(0, 5).map((supplier) => (
              supplier.approvalHistory?.map((history, idx) => (
                <div key={`${supplier.id}-${idx}`} className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-sm font-medium text-white">{supplier.name}</div>
                      <div className="text-xs text-slate-400">{history.action}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      history.finalDecision === 'Approved' ? 'bg-green-500/20 text-green-400' :
                      history.finalDecision === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {history.finalDecision}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400">AI: </span>
                      <span className="text-slate-300">{history.aiRecommendation}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Admin: </span>
                      <span className="text-slate-300">{history.adminUser}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400">Time: </span>
                      <span className="text-slate-300">{history.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>
      </div>

      {/* AI Supplier Forecast */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00F5C4]" />
            <h3 className="text-lg font-semibold text-white">AI Supplier Forecast</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-slate-400 mb-4">Predictive intelligence generated from supplier operational patterns.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiPredictions.map((prediction) => (
              <div key={prediction.id} className={`p-4 rounded-lg border ${getRiskColor(prediction.risk)}`}>
                <div className="flex items-start gap-3 mb-3">
                  <Zap className="w-5 h-5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{prediction.title}</h4>
                    <p className="text-sm opacity-90">{prediction.prediction}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs mb-3">
                  <div className="flex justify-between">
                    <span className="opacity-75">Confidence:</span>
                    <span className="font-medium">{prediction.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Time Horizon:</span>
                    <span className="font-medium">{prediction.timeHorizon}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button className="flex-1 px-3 py-1 bg-white/10 rounded text-sm font-medium hover:bg-white/20 transition-colors text-white">
                    View Analysis
                  </button>
                  <button className="flex-1 px-3 py-1 bg-white/10 rounded text-sm font-medium hover:bg-white/20 transition-colors text-white">
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Early Warning System */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Supplier Early Warning</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {earlyWarnings.map((warning) => (
              <div key={warning.id} className={`p-4 rounded-lg border ${getSeverityColor(warning.severity)}`}>
                <div className="flex items-start gap-3 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{warning.title}</h4>
                    <p className="text-sm opacity-90">{warning.expectedImpact}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs mb-3">
                  <div className="flex justify-between">
                    <span className="opacity-75">Probability:</span>
                    <span className="font-medium">{warning.probability}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Time Horizon:</span>
                    <span className="font-medium">{warning.timeHorizon}</span>
                  </div>
                </div>
                <div className="text-xs opacity-90 mb-2">{warning.recommendedAction}</div>
              </div>
            ))}
            <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <h4 className="font-semibold text-sm text-green-400">No Critical Disruption Detected</h4>
                  <p className="text-sm opacity-90">All suppliers operating within normal parameters.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#00F5C4]" />
            <h3 className="text-lg font-semibold text-white">AI Recommended Actions</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {aiRecommendations.map((recommendation) => (
              <div key={recommendation.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{recommendation.title}</h4>
                    <p className="text-sm text-slate-400 mb-2">{recommendation.reason}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>Expected Impact: {recommendation.expectedImpact}</span>
                      <span className={`px-2 py-1 rounded ${
                        recommendation.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        recommendation.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {recommendation.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-300 mb-3">Recommended: {recommendation.recommendedAction}</div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-[#00F5C4] text-slate-900 rounded text-sm font-medium hover:bg-[#00D4A8] transition-colors">
                    Accept
                  </button>
                  <button className="px-3 py-1 bg-slate-600 text-white rounded text-sm font-medium hover:bg-slate-500 transition-colors">
                    Review
                  </button>
                  <button className="px-3 py-1 bg-slate-600 text-white rounded text-sm font-medium hover:bg-slate-500 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Indicator */}
      <div className="flex items-center gap-2 text-slate-500 text-sm">
        <Lock className="w-4 h-4" />
        <span>Supplier Intelligence Protected</span>
        <span className="text-slate-600">•</span>
        <span>Role-based access • Secure data • Audit logging</span>
      </div>

      {/* Supplier Detail Modal */}
      <AnimatePresence>
        {selectedSupplier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSupplier(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedSupplier.name}</h3>
                    <p className="text-sm text-slate-400">{selectedSupplier.supplierId}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSupplier(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Supplier Health Score */}
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">Supplier Health Score</h4>
                  <div className="text-3xl font-bold text-[#00F5C4]">92/100</div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">94</div>
                    <div className="text-xs text-slate-400">Reliability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">91</div>
                    <div className="text-xs text-slate-400">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">98</div>
                    <div className="text-xs text-slate-400">Compliance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">93</div>
                    <div className="text-xs text-slate-400">Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">89</div>
                    <div className="text-xs text-slate-400">Resilience</div>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#00F5C4]" />
                    Company Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Region</span>
                      <span className="text-white">{selectedSupplier.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Category</span>
                      <span className="text-white">{selectedSupplier.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status</span>
                      <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(selectedSupplier.status)}`}>
                        {selectedSupplier.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00F5C4]" />
                    Operational Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Shipments</span>
                      <span className="text-white">{selectedSupplier.activeShipments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">On-Time Rate</span>
                      <span className="text-white">{selectedSupplier.onTimeRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Reliability</span>
                      <span className="text-white">{selectedSupplier.reliability}/100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fleet & Workforce */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#00F5C4]" />
                    Fleet Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Vehicles</span>
                      <span className="text-white">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Available</span>
                      <span className="text-white">32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">In Transit</span>
                      <span className="text-white">11</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Utilization</span>
                      <span className="text-white">71%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#00F5C4]" />
                    Workforce
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Drivers</span>
                      <span className="text-white">38</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Available</span>
                      <span className="text-white">28</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">On Delivery</span>
                      <span className="text-white">10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Performance</span>
                      <span className="text-white">89/100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supplier Risk Intelligence */}
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00F5C4]" />
                  Supplier Risk Intelligence
                </h4>
                <div className="grid grid-cols-5 gap-4 mb-4">
                  <div className="text-center p-2 bg-slate-600/50 rounded">
                    <div className="text-sm font-medium text-green-400">LOW</div>
                    <div className="text-xs text-slate-400">Operational</div>
                  </div>
                  <div className="text-center p-2 bg-slate-600/50 rounded">
                    <div className="text-sm font-medium text-green-400">LOW</div>
                    <div className="text-xs text-slate-400">Delivery</div>
                  </div>
                  <div className="text-center p-2 bg-slate-600/50 rounded">
                    <div className="text-sm font-medium text-green-400">LOW</div>
                    <div className="text-xs text-slate-400">Compliance</div>
                  </div>
                  <div className="text-center p-2 bg-slate-600/50 rounded">
                    <div className="text-sm font-medium text-yellow-400">MEDIUM</div>
                    <div className="text-xs text-slate-400">Capacity</div>
                  </div>
                  <div className="text-center p-2 bg-slate-600/50 rounded">
                    <div className="text-sm font-medium text-green-400">LOW</div>
                    <div className="text-xs text-slate-400">Resilience</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Overall Supplier Risk Score</span>
                  <span className="text-2xl font-bold text-green-400">18/100</span>
                </div>
              </div>

              {/* Network Position */}
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#00F5C4]" />
                  Supplier Network Performance
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">On-Time Delivery</span>
                    <div className="flex items-center gap-4">
                      <span className="text-white">Supplier: 94%</span>
                      <span className="text-slate-500">Network: 88%</span>
                      <span className="text-[#00F5C4]">Top 10%: 96%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Reliability</span>
                    <div className="flex items-center gap-4">
                      <span className="text-white">Supplier: 94/100</span>
                      <span className="text-slate-500">Network: 85/100</span>
                      <span className="text-[#00F5C4]">Top 10%: 95/100</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Compliance</span>
                    <div className="flex items-center gap-4">
                      <span className="text-white">Supplier: 98%</span>
                      <span className="text-slate-500">Network: 92%</span>
                      <span className="text-[#00F5C4]">Top 10%: 99%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold">
                  View Full Profile
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                  Compare
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                  Monitor
                </button>
                <button
                  onClick={() => setShowContinuityTwin(true)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 rounded-lg hover:opacity-90 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Network className="w-4 h-4" />
                  Continuity Twin™
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Supplier Continuity Twin™ Modal */}
      <AnimatePresence>
        {showContinuityTwin && selectedSupplier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowContinuityTwin(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center shadow-lg">
                      <Network className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        Supplier Continuity Twin™
                      </h2>
                      <p className="text-sm text-slate-400">Know the impact before the supplier fails.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isMonitoring && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-lg border border-green-500/30">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400 font-medium">MONITORING ACTIVE</span>
                      </div>
                    )}
                    <button
                      onClick={() => setShowContinuityTwin(false)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Supplier Resilience Score */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">Supplier Resilience Score</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-center">
                      <div className={`text-3xl font-bold ${getResilienceColor(demoResilience.score)}`}>{demoResilience.score}</div>
                      <div className="text-xs text-slate-400 mt-1">Resilience Score</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-center">
                      <div className="text-3xl font-bold text-white">{demoResilience.capacity}%</div>
                      <div className="text-xs text-slate-400 mt-1">Capacity</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-center">
                      <div className="text-3xl font-bold text-white">{demoResilience.capacityUtilization}%</div>
                      <div className="text-xs text-slate-400 mt-1">Utilization</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-center">
                      <div className={`text-2xl font-bold ${getResilienceColor(demoResilience.dependencyLevel === 'HIGH' ? 50 : 80)}`}>{demoResilience.dependencyLevel}</div>
                      <div className="text-xs text-slate-400 mt-1">Dependency</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-center">
                      <div className="text-3xl font-bold text-white">{demoResilience.recoveryTime}</div>
                      <div className="text-xs text-slate-400 mt-1">Recovery (days)</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-center">
                      <div className="text-3xl font-bold text-white">{demoResilience.alternativeSuppliers}</div>
                      <div className="text-xs text-slate-400 mt-1">Alternatives</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-center">
                      <div className="text-3xl font-bold text-white">{demoResilience.criticalProducts}</div>
                      <div className="text-xs text-slate-400 mt-1">Critical Products</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-center">
                      <div className={`text-2xl font-bold ${getResilienceColor(demoResilience.riskLevel === 'MEDIUM' ? 50 : 80)}`}>{demoResilience.riskLevel}</div>
                      <div className="text-xs text-slate-400 mt-1">Risk Level</div>
                    </div>
                  </div>
                </div>

                {/* What-If Disruption Simulator */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Play className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">What-If Disruption Simulator</h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Select Disruption Scenario</label>
                      <select
                        value={selectedScenario?.id || ''}
                        onChange={(e) => {
                          const scenario = disruptionScenarios.find(s => s.id === e.target.value);
                          setSelectedScenario(scenario || null);
                        }}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00F5C4]"
                      >
                        <option value="">Select a scenario...</option>
                        {disruptionScenarios.map((scenario) => (
                          <option key={scenario.id} value={scenario.id}>
                            {scenario.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Severity: {simulationSeverity}%</label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="10"
                        value={simulationSeverity}
                        onChange={(e) => setSimulationSeverity(Number(e.target.value))}
                        className="w-full accent-[#00F5C4]"
                      />
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>10%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={runSimulation}
                    disabled={!selectedScenario || isSimulating}
                    className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 rounded-lg hover:opacity-90 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSimulating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Simulating Impact...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Simulate Disruption
                      </>
                    )}
                  </button>
                </div>

                {/* Impact Analysis */}
                {impactAnalysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <AlertOctagon className="w-5 h-5 text-orange-400" />
                      <h3 className="text-lg font-semibold text-white">Impact Analysis</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                        <div className="text-xs text-slate-400 mb-1">Products Affected</div>
                        <div className="text-2xl font-bold text-red-400">{impactAnalysis.affectedProducts}</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                        <div className="text-xs text-slate-400 mb-1">Orders at Risk</div>
                        <div className="text-2xl font-bold text-orange-400">{impactAnalysis.affectedOrders.toLocaleString()}</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                        <div className="text-xs text-slate-400 mb-1">Delivery Impact</div>
                        <div className="text-2xl font-bold text-yellow-400">{impactAnalysis.deliveryImpact}</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                        <div className="text-xs text-slate-400 mb-1">Recovery Cost</div>
                        <div className="text-2xl font-bold text-purple-400">₹{impactAnalysis.recoveryCost.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                        <div className="text-xs text-slate-400">Inventory Impact</div>
                        <div className="text-sm text-white mt-1">{impactAnalysis.inventoryImpact}</div>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                        <div className="text-xs text-slate-400">Alternative Capacity</div>
                        <div className="text-sm text-white mt-1">{impactAnalysis.alternativeCapacity}%</div>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                        <div className="text-xs text-slate-400">Recovery Time</div>
                        <div className="text-sm text-white mt-1">{impactAnalysis.recoveryTime} days</div>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                        <div className="text-xs text-slate-400">Network Risk</div>
                        <div className={`text-sm font-medium mt-1 ${getResilienceColor(impactAnalysis.networkRisk === 'CRITICAL' ? 20 : impactAnalysis.networkRisk === 'HIGH' ? 40 : 60)}`}>{impactAnalysis.networkRisk}</div>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600 md:col-span-2">
                        <div className="text-xs text-slate-400">Regions Affected</div>
                        <div className="text-sm text-white mt-1">{impactAnalysis.regionsAffected.join(', ')}</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Supplier Dependency Map */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-[#00F5C4]" />
                      <h3 className="text-lg font-semibold text-white">Supplier Dependency Map</h3>
                    </div>
                    <button
                      onClick={() => setShowDependencyMap(!showDependencyMap)}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {showDependencyMap ? 'Hide' : 'Show'} Details
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-8 bg-slate-700/30 rounded-lg border border-slate-600 min-h-[200px]">
                    {demoDependencyNodes.map((node, index) => (
                      <div key={node.id} className="flex items-center">
                        <div className={`px-3 py-2 rounded-lg border text-xs font-medium ${
                          node.critical
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : 'bg-slate-600/50 text-slate-300 border-slate-500/30'
                        }`}>
                          {node.name}
                        </div>
                        {index < demoDependencyNodes.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-slate-500 mx-2" />
                        )}
                      </div>
                    ))}
                  </div>
                  {showDependencyMap && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 space-y-2"
                    >
                      {demoDependencyNodes.map((node) => (
                        <div key={node.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg border border-slate-600">
                          <div className="flex items-center gap-2">
                            {node.critical && <AlertTriangle className="w-4 h-4 text-red-400" />}
                            <span className="text-sm text-white">{node.name}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            node.critical
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-slate-600/50 text-slate-400'
                          }`}>
                            {node.type.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Alternative Supplier Intelligence */}
                {alternativeSuppliers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-[#00F5C4]" />
                      <h3 className="text-lg font-semibold text-white">Alternative Supplier Intelligence</h3>
                    </div>
                    <div className="space-y-4">
                      {alternativeSuppliers.map((alt, index) => (
                        <div key={alt.id} className={`p-4 rounded-lg border ${index === 0 ? 'bg-[#00F5C4]/10 border-[#00F5C4]/30' : 'bg-slate-700/50 border-slate-600'}`}>
                          {index === 0 && (
                            <div className="flex items-center gap-2 mb-3">
                              <Star className="w-4 h-4 text-[#00F5C4]" />
                              <span className="text-sm font-semibold text-[#00F5C4]">RECOMMENDED ALTERNATIVE</span>
                            </div>
                          )}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <div className="text-xs text-slate-400">Supplier</div>
                              <div className="text-sm font-medium text-white">{alt.name}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-400">Match Score</div>
                              <div className={`text-sm font-bold ${index === 0 ? 'text-[#00F5C4]' : 'text-white'}`}>{alt.matchScore}%</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-400">Capacity Coverage</div>
                              <div className="text-sm text-white">{alt.availableCapacity}%</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-400">Compliance</div>
                              <div className={`text-sm font-medium ${alt.complianceStatus === 'VERIFIED' ? 'text-green-400' : 'text-yellow-400'}`}>{alt.complianceStatus}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-400">Lead Time</div>
                              <div className="text-sm text-white">{alt.leadTime} days</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-400">Reliability</div>
                              <div className="text-sm text-white">{alt.reliabilityScore}/100</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-400">Cost Impact</div>
                              <div className="text-sm text-white">+{alt.costImpact}%</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-400">Resilience</div>
                              <div className="text-sm text-white">{alt.resilienceScore}/100</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* AI Recovery Strategy */}
                {recoveryStrategy && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-[#00F5C4]/20 to-[#00D4A8]/20 rounded-xl p-6 border border-[#00F5C4]/30"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-[#00F5C4]" />
                      <h3 className="text-lg font-semibold text-white">AI Recovery Strategy</h3>
                      <span className="text-xs px-2 py-1 bg-[#00F5C4]/20 rounded text-[#00F5C4]">Confidence: {recoveryStrategy.confidence}%</span>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                        <div className="text-sm text-slate-400 mb-2">AI Recommendation</div>
                        <div className="text-white font-medium">{recoveryStrategy.recommendation}</div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600">
                          <div className="text-xs text-slate-400">Expected Impact</div>
                          <div className="text-sm text-white mt-1">{recoveryStrategy.expectedImpact}</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600">
                          <div className="text-xs text-slate-400">Estimated Cost</div>
                          <div className="text-sm text-white mt-1">₹{recoveryStrategy.estimatedCost.toLocaleString()}</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600">
                          <div className="text-xs text-slate-400">Recovery Time</div>
                          <div className="text-sm text-white mt-1">{recoveryStrategy.recoveryTime} days</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-600">
                          <div className="text-xs text-slate-400">Risk Reduction</div>
                          <div className="text-sm text-green-400 mt-1">{recoveryStrategy.riskReduction}%</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 mb-2">Recommended Actions</div>
                        <div className="space-y-2">
                          {recoveryStrategy.actions.map((action, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-slate-800/30 rounded-lg border border-slate-600">
                              <ArrowRight className="w-4 h-4 text-[#00F5C4] mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-white">{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {humanApprovalRequired && (
                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                          <div className="flex items-center gap-2 mb-3">
                            <Lock className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-400">HUMAN APPROVAL REQUIRED</span>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={approveRecovery}
                              className="flex-1 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold flex items-center justify-center gap-2"
                            >
                              <ClipboardCheck className="w-4 h-4" />
                              Approve Recovery Plan
                            </button>
                            <button
                              onClick={() => setHumanApprovalRequired(false)}
                              className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                            >
                              Modify Plan
                            </button>
                            <button
                              onClick={() => setHumanApprovalRequired(false)}
                              className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Continuous Monitoring Toggle */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isMonitoring ? 'bg-green-500/20' : 'bg-slate-700/50'}`}>
                        <Activity className={`w-5 h-5 ${isMonitoring ? 'text-green-400' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Continuous Monitoring</h3>
                        <p className="text-sm text-slate-400">Real-time supplier resilience tracking</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleMonitoring}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isMonitoring
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                          : 'bg-[#00F5C4] text-slate-900 hover:bg-[#00D4A8]'
                      }`}
                    >
                      {isMonitoring ? (
                        <>
                          <Pause className="w-4 h-4 inline mr-2" />
                          Stop Monitoring
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 inline mr-2" />
                          Start Monitoring
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Decision History */}
                {decisionHistory.length > 0 && (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <History className="w-5 h-5 text-[#00F5C4]" />
                      <h3 className="text-lg font-semibold text-white">Decision History</h3>
                    </div>
                    <div className="space-y-3">
                      {decisionHistory.map((decision) => (
                        <div key={decision.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">{decision.supplier}</span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-400">{decision.scenario}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              decision.humanDecision === 'APPROVED' ? 'bg-green-500/20 text-green-400' :
                              decision.humanDecision === 'MODIFIED' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {decision.humanDecision}
                            </span>
                          </div>
                          <div className="text-sm text-slate-400 mb-2">{decision.aiRecommendation}</div>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>Confidence: {decision.confidence}%</span>
                            <span>{new Date(decision.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Supplier Form Modal */}
      <AnimatePresence>
        {showAddSupplierForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddSupplierForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">ADD NEW SUPPLIER</h3>
                    <p className="text-sm text-slate-400">Complete all required fields marked with *</p>
                  </div>
                  <button
                    onClick={() => setShowAddSupplierForm(false)}
                    className="p-2 hover:bg-slate-700 rounded-lg"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* Section Navigation */}
                <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveFormSection(section)}
                      className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        activeFormSection === section
                          ? 'bg-[#00F5C4] text-slate-900'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Section 1: Company Information */}
                {activeFormSection === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#00F5C4]" />
                      1. Company Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Supplier Company Name *</label>
                        <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter company name" />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Supplier ID (Auto-generated)</label>
                        <input type="text" disabled value="SUP-XXXX" className="w-full bg-slate-600/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-400" />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Company Registration Number</label>
                        <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter registration number" />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Business Type</label>
                        <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                          <option>Manufacturer</option>
                          <option>Distributor</option>
                          <option>Logistics Provider</option>
                          <option>Raw Material Supplier</option>
                          <option>Service Provider</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Industry Category</label>
                        <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                          <option>Automotive</option>
                          <option>Electronics</option>
                          <option>Healthcare</option>
                          <option>FMCG</option>
                          <option>Manufacturing</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Company Logo Upload</label>
                        <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-[#00F5C4] transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-400">Click to upload logo</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 2: Contact Details */}
                {activeFormSection === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Mail className="w-5 h-5 text-[#00F5C4]" />
                      2. Contact Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Contact Person Name *</label>
                        <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter contact name" />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Designation</label>
                        <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter designation" />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Email Address *</label>
                        <input type="email" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter email" />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Phone Number *</label>
                        <input type="tel" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter phone number" />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Alternate Contact Number</label>
                        <input type="tel" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter alternate number" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-sm font-semibold text-white mb-3">Company Address</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Country *</label>
                          <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                            <option>India</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Germany</option>
                            <option>Japan</option>
                            <option>China</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">State/Province</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter state/province" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">City</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter city" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Postal Code</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter postal code" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm text-slate-400 mb-1">Address Line</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter full address" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 3: Business Capability */}
                {activeFormSection === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#00F5C4]" />
                      3. Business Capability
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Product Categories</label>
                        <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="e.g., Electronic Components" />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Products Supplied</label>
                        <textarea className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4] h-20" placeholder="List main products" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Monthly Production Capacity</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="e.g., 50,000 units/month" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Current Inventory Capacity</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter capacity" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Number of Warehouses</label>
                          <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter count" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Operating Regions</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="e.g., Asia, Europe" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 4: Logistics Network */}
                {activeFormSection === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Truck className="w-5 h-5 text-[#00F5C4]" />
                      4. Logistics Network
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Preferred Shipping Mode</label>
                        <div className="grid grid-cols-5 gap-2">
                          {['Road', 'Rail', 'Air', 'Sea', 'Multimodal'].map((mode) => (
                            <label key={mode} className="flex items-center gap-2 bg-slate-700/50 border border-slate-600 rounded-lg p-3 cursor-pointer hover:bg-slate-700">
                              <input type="checkbox" className="w-4 h-4 accent-[#00F5C4]" />
                              <span className="text-sm text-white">{mode}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Average Lead Time</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="e.g., 7 days" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Delivery Frequency</label>
                          <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Bi-weekly</option>
                            <option>Monthly</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Supported Delivery Regions</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter regions" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Warehouse Locations</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter locations" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 5: Compliance & Certifications */}
                {activeFormSection === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#00F5C4]" />
                      5. Compliance & Certifications ⭐
                    </h4>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600 mb-4">
                      <p className="text-sm text-slate-400">Important for your GACIF™ system</p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Business License Number</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter license number" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Tax Registration Number</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter tax number" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Import Export License</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter license number" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Compliance Certifications</label>
                        <div className="grid grid-cols-5 gap-2">
                          {['ISO 9001', 'ISO 14001', 'ISO 27001', 'GMP', 'Other'].map((cert) => (
                            <label key={cert} className="flex items-center gap-2 bg-slate-700/50 border border-slate-600 rounded-lg p-3 cursor-pointer hover:bg-slate-700">
                              <input type="checkbox" className="w-4 h-4 accent-[#00F5C4]" />
                              <span className="text-sm text-white">{cert}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">Certification Documents Upload</label>
                        <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-[#00F5C4] transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-400">Click to upload documents</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 6: Financial Details */}
                {activeFormSection === 6 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-[#00F5C4]" />
                      6. Financial Details
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Annual Revenue Range</label>
                          <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                            <option>Under $1M</option>
                            <option>$1M - $10M</option>
                            <option>$10M - $50M</option>
                            <option>$50M - $100M</option>
                            <option>Above $100M</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Payment Terms</label>
                          <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                            <option>Net 30</option>
                            <option>Net 60</option>
                            <option>Net 90</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Currency Supported</label>
                          <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                            <option>USD</option>
                            <option>EUR</option>
                            <option>INR</option>
                            <option>GBP</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Banking Details (Secure)</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter banking details" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 7: Performance Metrics */}
                {activeFormSection === 7 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#00F5C4]" />
                      7. Performance Metrics
                    </h4>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600 mb-4">
                      <p className="text-sm text-slate-400">For Supplier Intelligence AI</p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Expected Delivery Accuracy %</label>
                          <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="e.g., 95" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Quality Rating</label>
                          <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="e.g., 92" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Production Reliability</label>
                          <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="e.g., 90" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Previous Experience Years</label>
                          <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="e.g., 12" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm text-slate-400 mb-1">Existing Customer Base</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Describe customer base" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 8: Risk Profile */}
                {activeFormSection === 8 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-[#00F5C4]" />
                      8. Risk Profile ⭐
                    </h4>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600 mb-4">
                      <p className="text-sm text-slate-400">For Predictive Defense Layer</p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Primary Country</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter country" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Operational Regions</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter regions" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Dependency Level</label>
                          <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Alternative Supplier Available?</label>
                          <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Known Risk Factors</label>
                        <div className="grid grid-cols-5 gap-2">
                          {['Weather Risk', 'Political Risk', 'Supply Shortage', 'Transportation Risk', 'Compliance Risk'].map((risk) => (
                            <label key={risk} className="flex items-center gap-2 bg-slate-700/50 border border-slate-600 rounded-lg p-3 cursor-pointer hover:bg-slate-700">
                              <input type="checkbox" className="w-4 h-4 accent-[#00F5C4]" />
                              <span className="text-sm text-white">{risk}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 9: Technology Integration */}
                {activeFormSection === 9 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-[#00F5C4]" />
                      9. Technology Integration
                    </h4>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600 mb-4">
                      <p className="text-sm text-slate-400">For enterprise usage</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">ERP System</label>
                        <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                          <option>SAP</option>
                          <option>Oracle</option>
                          <option>Microsoft Dynamics</option>
                          <option>Custom ERP</option>
                          <option>None</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1">API Availability</label>
                        <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Real-time Data Sharing</label>
                        <div className="grid grid-cols-4 gap-2">
                          {['Inventory', 'Shipment', 'Production', 'Compliance'].map((option) => (
                            <label key={option} className="flex items-center gap-2 bg-slate-700/50 border border-slate-600 rounded-lg p-3 cursor-pointer hover:bg-slate-700">
                              <input type="checkbox" className="w-4 h-4 accent-[#00F5C4]" />
                              <span className="text-sm text-white">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 10: Sustainability */}
                {activeFormSection === 10 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-[#00F5C4]" />
                      10. Sustainability ⭐
                    </h4>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600 mb-4">
                      <p className="text-sm text-slate-400">For your Sustainability module</p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Carbon Emission Data Available</label>
                          <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Green Certifications</label>
                          <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="Enter certifications" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Renewable Energy Usage %</label>
                          <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="e.g., 45" />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-1">Sustainability Score</label>
                          <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00F5C4]" placeholder="e.g., 85" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 11: Documents */}
                {activeFormSection === 11 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#00F5C4]" />
                      11. Documents
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {['Business Registration', 'Tax Certificate', 'Compliance Certificates', 'Insurance Documents', 'Bank Verification', 'Product Documents'].map((doc) => (
                          <div key={doc} className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-[#00F5C4] transition-colors cursor-pointer">
                            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm text-slate-400">{doc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Section 12: AI Assessment */}
                {activeFormSection === 12 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#00F5C4]" />
                      12. AI Supplier Assessment (Auto Generated)
                    </h4>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600 mb-4">
                      <p className="text-sm text-slate-400">After submission, AI creates Supplier Health Score™</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#00F5C4]/20 to-[#00D4A8]/20 rounded-lg p-6 border border-[#00F5C4]/30">
                      <div className="text-center mb-4">
                        <div className="text-sm text-slate-400 mb-2">Supplier Health Score</div>
                        <div className="text-5xl font-bold text-[#00F5C4]">92 / 100</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-slate-400 mb-2">Strengths</div>
                          <div className="space-y-1">
                            <div className="text-sm text-green-400 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              High delivery reliability
                            </div>
                            <div className="text-sm text-green-400 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Strong compliance
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400 mb-2">Risks</div>
                          <div className="space-y-1">
                            <div className="text-sm text-yellow-400 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" />
                              Single warehouse dependency
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                        <div className="text-sm text-slate-400 mb-1">AI Recommendation</div>
                        <div className="text-white font-medium">Approve supplier with medium monitoring</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <button
                    onClick={() => setActiveFormSection(Math.max(1, activeFormSection - 1))}
                    disabled={activeFormSection === 1}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveFormSection(Math.min(12, activeFormSection + 1))}
                    disabled={activeFormSection === 12}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {activeFormSection === 12 ? 'Submit' : 'Next'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SupplierIntelligence = () => (
  <SupplierIntelligenceComponent />
);