import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Shield, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Activity, 
  BarChart3, 
  MapPin, 
  Package, 
  Truck, 
  Settings, 
  Brain, 
  Zap, 
  Lock, 
  Target, 
  Radar, 
  BookOpen, 
  Leaf, 
  RefreshCw, 
  XCircle, 
  X,
  ChevronRight,
  Layers,
  Database,
  Network,
  Globe2,
  Scan,
  FileCheck,
  Award,
  Flame,
  ShieldCheck,
  Sparkles,
  Gavel,
  Building2,
  FileQuestion,
  AlertOctagon,
  Briefcase,
  Workflow,
  Search,
  Menu,
  Sun,
  Moon,
  Calendar,
  ArrowUp,
  ArrowDown,
  LineChart
} from 'lucide-react';

import AIRegulationBrain from './AIRegulationBrain';
import PredictiveComplianceIntelligence from './PredictiveComplianceIntelligence';
import AutonomousDocumentIntelligence from './AutonomousDocumentIntelligence';
import ComplianceDigitalTwin from './ComplianceDigitalTwin';
import GlobalTradeRiskRadar from './GlobalTradeRiskRadar';
import AIComplianceCopilot from './AIComplianceCopilot';
import ComplianceConfidenceScore from './ComplianceConfidenceScore';
import GlobalSustainabilityValidator from './GlobalSustainabilityValidator';
import SelfHealingCompliance from './SelfHealingCompliance';
import ComplianceLearningMemory from './ComplianceLearningMemory';
import GlobalCompliancePassport from './GlobalCompliancePassport';
import AIRegulationChangeImpactAnalyzer from './AIRegulationChangeImpactAnalyzer';
import MultiCountryComplianceSimulator from './MultiCountryComplianceSimulator';
import GlobalComplianceSecurity from './GlobalComplianceSecurity';
import ExecutiveComplianceIntelligenceDashboard from './ExecutiveComplianceIntelligenceDashboard';

// Types
interface ComplianceScore {
  overall: number;
  customs: number;
  documentation: number;
  environmental: number;
  certification: number;
  border: number;
  trade: number;
}

interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: 'compliant' | 'at_risk' | 'non_compliant' | 'pending';
  complianceScore: number;
  departureDate: string;
  estimatedArrival: string;
  documents: Document[];
  regulations: Regulation[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'valid' | 'expired' | 'missing' | 'invalid';
  expiryDate: string;
  confidence: number;
}

interface Regulation {
  id: string;
  country: string;
  title: string;
  category: string;
  status: 'active' | 'upcoming' | 'expired';
  impact: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

interface RiskEvent {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  country: string;
  description: string;
  timestamp: string;
  affectedShipments: number;
}

interface CompliancePassport {
  shipmentId: string;
  complianceStatus: string;
  requiredRegulations: number;
  verifiedDocuments: number;
  countryRequirements: string[];
  inspectionHistory: Inspection[];
  certificationStatus: string;
  sustainabilityStatus: string;
  complianceConfidence: number;
  aiApprovalTimestamp: string;
  digitalSignature: string;
  riskScore: number;
}

interface Inspection {
  date: string;
  country: string;
  result: 'passed' | 'failed' | 'pending';
  issues: string[];
}

const GACIFCommandCenter = () => {
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [complianceScore, setComplianceScore] = useState<ComplianceScore>({
    overall: 87,
    customs: 92,
    documentation: 85,
    environmental: 90,
    certification: 88,
    border: 84,
    trade: 86
  });

  // Sample data
  const shipments: Shipment[] = [
    {
      id: 'SHP-001',
      trackingNumber: 'GACIF-2024-001',
      origin: 'Mumbai, India',
      destination: 'Los Angeles, USA',
      status: 'compliant',
      complianceScore: 94,
      departureDate: '2024-08-15',
      estimatedArrival: '2024-08-25',
      documents: [
        { id: 'DOC-001', name: 'Commercial Invoice', type: 'commercial', status: 'valid', expiryDate: '2024-12-31', confidence: 98 },
        { id: 'DOC-002', name: 'Packing List', type: 'packing', status: 'valid', expiryDate: '2024-12-31', confidence: 95 },
        { id: 'DOC-003', name: 'Bill of Lading', type: 'transport', status: 'valid', expiryDate: '2024-12-31', confidence: 97 }
      ],
      regulations: [
        { id: 'REG-001', country: 'USA', title: 'US Customs Regulations', category: 'Customs', status: 'active', impact: 'high', lastUpdated: '2024-08-01' }
      ]
    },
    {
      id: 'SHP-002',
      trackingNumber: 'GACIF-2024-002',
      origin: 'Shanghai, China',
      destination: 'Hamburg, Germany',
      status: 'at_risk',
      complianceScore: 72,
      departureDate: '2024-08-16',
      estimatedArrival: '2024-08-28',
      documents: [
        { id: 'DOC-004', name: 'Commercial Invoice', type: 'commercial', status: 'valid', expiryDate: '2024-12-31', confidence: 92 },
        { id: 'DOC-005', name: 'CE Certificate', type: 'certification', status: 'expired', expiryDate: '2024-07-15', confidence: 45 }
      ],
      regulations: [
        { id: 'REG-002', country: 'Germany', title: 'EU CE Marking Requirements', category: 'Certification', status: 'active', impact: 'high', lastUpdated: '2024-07-20' }
      ]
    },
    {
      id: 'SHP-003',
      trackingNumber: 'GACIF-2024-003',
      origin: 'Dubai, UAE',
      destination: 'London, UK',
      status: 'pending',
      complianceScore: 65,
      departureDate: '2024-08-18',
      estimatedArrival: '2024-08-30',
      documents: [
        { id: 'DOC-006', name: 'Commercial Invoice', type: 'commercial', status: 'valid', expiryDate: '2024-12-31', confidence: 88 },
        { id: 'DOC-007', name: 'Origin Certificate', type: 'certification', status: 'missing', expiryDate: '', confidence: 0 }
      ],
      regulations: [
        { id: 'REG-003', country: 'UK', title: 'UK Customs Declaration', category: 'Customs', status: 'active', impact: 'high', lastUpdated: '2024-08-05' }
      ]
    }
  ];

  const riskEvents: RiskEvent[] = [
    {
      id: 'RISK-001',
      type: 'Trade Restriction',
      severity: 'critical',
      country: 'Russia',
      description: 'New export restrictions on electronic components',
      timestamp: '2024-08-10 09:30',
      affectedShipments: 3
    },
    {
      id: 'RISK-002',
      type: 'Port Congestion',
      severity: 'high',
      country: 'Singapore',
      description: 'Major port congestion causing 2-3 day delays',
      timestamp: '2024-08-10 08:15',
      affectedShipments: 5
    },
    {
      id: 'RISK-003',
      type: 'Customs Policy Change',
      severity: 'medium',
      country: 'USA',
      description: 'Updated documentation requirements for electronic imports',
      timestamp: '2024-08-09 16:45',
      affectedShipments: 8
    }
  ];

  const modules = [
    { id: 'dashboard', label: 'Command Center', icon: BarChart3, color: 'from-blue-500 to-blue-600' },
    { id: 'regulation-brain', label: 'AI Regulation Brain', icon: Brain, color: 'from-purple-500 to-purple-600' },
    { id: 'predictive-intelligence', label: 'Predictive Intelligence', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { id: 'document-intelligence', label: 'Document Intelligence', icon: FileText, color: 'from-orange-500 to-orange-600' },
    { id: 'compliance-digital-twin', label: 'Compliance Digital Twin', icon: Globe2, color: 'from-cyan-500 to-cyan-600' },
    { id: 'trade-risk-radar', label: 'Trade Risk Radar', icon: Radar, color: 'from-red-500 to-red-600' },
    { id: 'ai-copilot', label: 'AI Compliance Copilot', icon: Sparkles, color: 'from-yellow-500 to-yellow-600' },
    { id: 'confidence-score', label: 'Confidence Score', icon: Target, color: 'from-indigo-500 to-indigo-600' },
    { id: 'sustainability-validator', label: 'Sustainability Validator', icon: Leaf, color: 'from-emerald-500 to-emerald-600' },
    { id: 'self-healing', label: 'Self-Healing Compliance', icon: RefreshCw, color: 'from-teal-500 to-teal-600' },
    { id: 'learning-memory', label: 'Compliance Learning Memory', icon: Database, color: 'from-violet-500 to-violet-600' },
    { id: 'compliance-passport', label: 'Compliance Passport', icon: Award, color: 'from-amber-500 to-amber-600' },
    { id: 'regulation-impact', label: 'Regulation Impact Analyzer', icon: Flame, color: 'from-rose-500 to-rose-600' },
    { id: 'multi-country-simulator', label: 'Multi-Country Simulator', icon: MapPin, color: 'from-lime-500 to-lime-600' },
    { id: 'compliance-security', label: 'Compliance Security', icon: ShieldCheck, color: 'from-slate-500 to-slate-600' },
    { id: 'executive-dashboard', label: 'Executive Intelligence', icon: Layers, color: 'from-pink-500 to-pink-600' }
  ];

  const getModuleComponent = (moduleId: string) => {
    switch (moduleId) {
      case 'dashboard':
        return <CommandCenterDashboard 
          complianceScore={complianceScore}
          shipments={shipments}
          riskEvents={riskEvents}
          onShipmentSelect={setSelectedShipment}
        />;
      case 'regulation-brain':
        return <AIRegulationBrain />;
      case 'predictive-intelligence':
        return <PredictiveComplianceIntelligence />;
      case 'document-intelligence':
        return <AutonomousDocumentIntelligence />;
      case 'compliance-digital-twin':
        return <ComplianceDigitalTwin />;
      case 'trade-risk-radar':
        return <GlobalTradeRiskRadar />;
      case 'ai-copilot':
        return <AIComplianceCopilot />;
      case 'confidence-score':
        return <ComplianceConfidenceScore />;
      case 'sustainability-validator':
        return <GlobalSustainabilityValidator />;
      case 'self-healing':
        return <SelfHealingCompliance />;
      case 'learning-memory':
        return <ComplianceLearningMemory />;
      case 'compliance-passport':
        return <GlobalCompliancePassport />;
      case 'regulation-impact':
        return <AIRegulationChangeImpactAnalyzer />;
      case 'multi-country-simulator':
        return <MultiCountryComplianceSimulator />;
      case 'compliance-security':
        return <GlobalComplianceSecurity />;
      case 'executive-dashboard':
        return <ExecutiveComplianceIntelligenceDashboard />;
      default:
        return <CommandCenterDashboard 
          complianceScore={complianceScore}
          shipments={shipments}
          riskEvents={riskEvents}
          onShipmentSelect={setSelectedShipment}
        />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-gray-50'} transition-colors`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-slate-900/80 backdrop-blur-xl border-slate-800' : 'bg-white/80 backdrop-blur-xl border-gray-200'} border-b px-6 py-4 sticky top-0 z-50`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">GACIF™</h1>
                <p className="text-xs text-slate-400">Global Autonomous Compliance Intelligence Fabric</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-200'} border`}>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>AI Active</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`w-72 ${darkMode ? 'bg-slate-900/80 backdrop-blur-xl border-slate-800' : 'bg-white/80 backdrop-blur-xl border-gray-200'} border-r min-h-screen sticky top-16 overflow-y-auto`}
            >
              <div className="p-4">
                <div className={`text-xs font-semibold uppercase tracking-wider mb-4 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                  Compliance Modules
                </div>
                <div className="space-y-1">
                  {modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeModule === module.id
                          ? `bg-gradient-to-r ${module.color} text-white shadow-lg`
                          : darkMode
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <module.icon className="w-5 h-5" />
                      <span className="font-medium">{module.label}</span>
                      {activeModule === module.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {getModuleComponent(activeModule)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// Command Center Dashboard Component
const CommandCenterDashboard = ({ 
  complianceScore, 
  shipments, 
  riskEvents, 
  onShipmentSelect 
}: any) => {
  const darkMode = true;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Compliance Command Center</h2>
          <p className="text-slate-400">Real-time autonomous compliance monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-200'} border`}>
            <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Last Updated:</span>
            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>2 min ago</span>
          </div>
        </div>
      </div>

      {/* Compliance Score Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Overall', value: complianceScore.overall, icon: Shield, color: 'from-blue-500 to-blue-600' },
          { label: 'Customs', value: complianceScore.customs, icon: Building2, color: 'from-green-500 to-green-600' },
          { label: 'Documentation', value: complianceScore.documentation, icon: FileText, color: 'from-orange-500 to-orange-600' },
          { label: 'Environmental', value: complianceScore.environmental, icon: Leaf, color: 'from-emerald-500 to-emerald-600' },
          { label: 'Certification', value: complianceScore.certification, icon: Award, color: 'from-purple-500 to-purple-600' },
          { label: 'Border', value: complianceScore.border, icon: MapPin, color: 'from-red-500 to-red-600' }
        ].map((score, idx) => (
          <motion.div
            key={score.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-4`}
          >
            <div className="flex items-center justify-between mb-2">
              <score.icon className={`w-5 h-5 bg-gradient-to-r ${score.color} bg-clip-text text-transparent`} />
              <span className={`text-xs px-2 py-1 rounded-full ${
                score.value >= 90 ? 'bg-green-500/20 text-green-400' :
                score.value >= 75 ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {score.value >= 90 ? 'Excellent' : score.value >= 75 ? 'Good' : 'At Risk'}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">{score.value}%</div>
            <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{score.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Shipment Status & Risk Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipments */}
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-400" />
            Active Shipments
          </h3>
          <div className="space-y-3">
            {shipments.map((shipment: Shipment, idx: number) => (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => onShipmentSelect(shipment)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  shipment.status === 'compliant' ? 'bg-green-500/10 border-green-500/30' :
                  shipment.status === 'at_risk' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  shipment.status === 'non_compliant' ? 'bg-red-500/10 border-red-500/30' :
                  'bg-slate-700/50 border-slate-600/50'
                } hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      shipment.status === 'compliant' ? 'bg-green-400' :
                      shipment.status === 'at_risk' ? 'bg-yellow-400' :
                      shipment.status === 'non_compliant' ? 'bg-red-400' :
                      'bg-slate-400'
                    }`} />
                    <span className="font-medium text-white">{shipment.trackingNumber}</span>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded ${
                    shipment.complianceScore >= 90 ? 'bg-green-500/20 text-green-400' :
                    shipment.complianceScore >= 75 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {shipment.complianceScore}% Compliant
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    {shipment.origin} → {shipment.destination}
                  </span>
                  <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    {shipment.estimatedArrival}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Risk Events */}
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Radar className="w-5 h-5 text-red-400" />
            Global Trade Risk Events
          </h3>
          <div className="space-y-3">
            {riskEvents.map((event: RiskEvent, idx: number) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-lg border ${
                  event.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                  event.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                  event.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  'bg-slate-700/50 border-slate-600/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${
                      event.severity === 'critical' ? 'text-red-400' :
                      event.severity === 'high' ? 'text-orange-400' :
                      event.severity === 'medium' ? 'text-yellow-400' :
                      'text-slate-400'
                    }`} />
                    <span className="font-medium text-white">{event.type}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    event.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    event.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    event.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {event.severity}
                  </span>
                </div>
                <p className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{event.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{event.country}</span>
                  <span className={`${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{event.affectedShipments} shipments affected</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          AI Compliance Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Certificate Renewal',
              description: 'CE Certificate for shipment SHP-002 expires in 5 days. Renew now to avoid customs delays.',
              priority: 'high',
              icon: Award
            },
            {
              title: 'Document Missing',
              description: 'Origin Certificate required for shipment SHP-003 to UK customs.',
              priority: 'critical',
              icon: FileQuestion
            },
            {
              title: 'Route Optimization',
              description: 'Alternative route via Singapore reduces compliance risk by 15% for upcoming EU shipments.',
              priority: 'medium',
              icon: Workflow
            }
          ].map((rec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-lg border ${
                rec.priority === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                rec.priority === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                'bg-blue-500/10 border-blue-500/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <rec.icon className={`w-4 h-4 ${
                  rec.priority === 'critical' ? 'text-red-400' :
                  rec.priority === 'high' ? 'text-orange-400' :
                  'text-blue-400'
                }`} />
                <span className="font-medium text-white">{rec.title}</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{rec.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other modules

export default GACIFCommandCenter;