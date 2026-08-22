import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skeleton, SkeletonLoader } from './ui/skeleton';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';
import { Tooltip } from './ui/tooltip';
import { Breadcrumb } from './ui/breadcrumb';
import { UserProfile } from './ui/UserProfile';
import {
  Globe,
  Shield,
  FileText,
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
  Scan,
  FileCheck,
  Award,
  AlertOctagon,
  Briefcase,
  ArrowRight,
  RefreshCw,
  X,
  ChevronRight,
  ChevronDown,
  Database,
  Network,
  Calendar,
  FileQuestion,
  Gavel,
  Scale,
  Passport,
  Ship,
  Plane,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Info,
  Check,
  XCircle,
  Pause,
  Play,
  ClipboardCheck,
  History,
  Navigation,
  Filter,
  Search,
  Download,
  Eye,
  MoreVertical,
  Edit,
  Save,
  Building2,
  Globe2,
  Languages,
  Flag,
  Receipt,
  FileSearch,
  Layers,
  PieChart,
  LineChart,
  Wrench,
  AlertCircle,
  Ban,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Sun,
  Moon,
  Menu
} from 'lucide-react';
import { User } from 'lucide-react';

// Interfaces
interface ShipmentReadiness {
  score: number;
  status: 'READY' | 'READY_WITH_CAUTION' | 'NEEDS_REVIEW' | 'BLOCKED';
  documentationReadiness: number;
  customsReadiness: number;
  regulatoryReadiness: number;
  productClassification: string;
  restrictedGoodsStatus: 'CLEAN' | 'RESTRICTED' | 'CONTROLLED' | 'PROHIBITED';
  originCompliance: number;
  destinationCompliance: number;
  carrierReadiness: number;
  routeReadiness: number;
  estimatedBorderRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

interface InternationalShipment {
  id: string;
  trackingNumber: string;
  originCountry: string;
  destinationCountry: string;
  supplier: string;
  product: string;
  productCategory: string;
  hsCode: string;
  quantity: number;
  shipmentValue: number;
  currency: string;
  weight: number;
  transportMode: 'AIR' | 'SEA' | 'LAND' | 'RAIL';
  incoterm: string;
  carrier: string;
  expectedDeparture: string;
  expectedArrival: string;
}

interface DocumentStatus {
  id: string;
  name: string;
  type: 'commercial_invoice' | 'packing_list' | 'bill_of_lading' | 'air_waybill' | 'certificate_of_origin' | 'import_export_license' | 'insurance_certificate' | 'product_certificates' | 'dangerous_goods' | 'customs_declaration';
  status: 'valid' | 'expiring_soon' | 'missing' | 'invalid' | 'restricted';
  expiryDate: string | null;
  uploaded: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

interface CustomsReadiness {
  hsCodeStatus: 'VERIFIED' | 'PENDING' | 'INVALID';
  productClassification: string;
  customsDocumentation: number;
  originInformation: 'VERIFIED' | 'PENDING' | 'MISSING';
  destinationRequirements: string[];
  declaredValue: number;
  dutyTaxEstimate: number;
  clearanceRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  missingInformation: string[];
}

interface RegulatoryCheck {
  category: string;
  requirement: string;
  status: 'COMPLIANT' | 'NON_COMPLIANT' | 'PENDING' | 'EXEMPT';
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
}

interface TradeRisk {
  customsRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  regulatoryRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  documentationRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  routeRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  borderDelayRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  productRestrictionRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  geopoliticalRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  overallRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  primaryRisk: string;
  secondaryRisk: string;
}

interface BorderDelayPrediction {
  expectedClearance: string;
  potentialDelay: string;
  confidence: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  factors: string[];
}

interface AIRecommendation {
  readinessScore: number;
  issues: string[];
  recommendedAction: string;
  expectedResult: string;
  confidence: number;
}

interface DispatchGate {
  compliance: boolean;
  documents: boolean;
  customs: boolean;
  product: boolean;
  route: boolean;
  carrier: boolean;
  destination: boolean;
  overallStatus: 'READY' | 'REVIEW_REQUIRED' | 'BLOCKED';
}

interface ShipmentTimeline {
  stage: string;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  timestamp: string;
  responsible: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  evidence: string;
}

interface ReadinessAudit {
  id: string;
  user: string;
  shipment: string;
  countryPair: string;
  complianceCheck: string;
  documentChange: string;
  aiRecommendation: string;
  humanDecision: 'APPROVED' | 'REJECTED' | 'MODIFIED' | 'HELD';
  override: boolean;
  timestamp: string;
  finalOutcome: string;
}

interface CountryRoute {
  id: string;
  originCountry: string;
  destinationCountry: string;
  originFlag: string;
  destinationFlag: string;
  distance: string;
  estimatedTransitTime: string;
  averageCustomsClearance: string;
  dutyRate: string;
  tradeAgreement: string;
  requiredDocuments: string[];
  restrictedItems: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  readinessScore: number;
  activeShipments: number;
  commonIssues: string[];
  specialRequirements: string[];
}

const GlobalShipmentReadiness = () => {
  const [selectedShipment, setSelectedShipment] = useState<InternationalShipment | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<CountryRoute | null>(null);
  const [showReadinessModal, setShowReadinessModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [humanApprovalRequired, setHumanApprovalRequired] = useState(false);
  const [dispatchGate, setDispatchGate] = useState<DispatchGate | null>(null);
  const [auditHistory, setAuditHistory] = useState<ReadinessAudit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (window.addToast) {
        window.addToast('success', 'Global Shipment Readiness™ loaded successfully!');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter routes based on search and risk level
  const filteredRoutes = demoCountryRoutes.filter(route => {
    const matchesSearch = route.originCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.destinationCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.tradeAgreement.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'all' || route.riskLevel.toLowerCase() === filterRisk.toLowerCase();
    return matchesSearch && matchesRisk;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
      if (window.addToast) {
        window.addToast('success', 'Data refreshed successfully!');
      }
    }, 1000);
  };

  // Demo Data
  const demoShipment: InternationalShipment = {
    id: 'SHP-001',
    trackingNumber: 'INT-2024-IND-JPN-001',
    originCountry: 'India',
    destinationCountry: 'Japan',
    supplier: 'Apex Manufacturing',
    product: 'Electronic Components',
    productCategory: 'Electronics',
    hsCode: '8542.31.00',
    quantity: 500,
    shipmentValue: 125000,
    currency: 'USD',
    weight: 2500,
    transportMode: 'AIR',
    incoterm: 'DDP',
    carrier: 'DHL Express',
    expectedDeparture: '2024-04-20',
    expectedArrival: '2024-04-22'
  };

  const demoReadiness: ShipmentReadiness = {
    score: 72,
    status: 'NEEDS_REVIEW',
    documentationReadiness: 85,
    customsReadiness: 78,
    regulatoryReadiness: 88,
    productClassification: 'VERIFIED',
    restrictedGoodsStatus: 'CLEAN',
    originCompliance: 92,
    destinationCompliance: 65,
    carrierReadiness: 95,
    routeReadiness: 90,
    estimatedBorderRisk: 'MEDIUM'
  };

  const demoDocuments: DocumentStatus[] = [
    { id: 'DOC-001', name: 'Commercial Invoice', type: 'commercial_invoice', status: 'valid', expiryDate: null, uploaded: true, verificationStatus: 'verified' },
    { id: 'DOC-002', name: 'Packing List', type: 'packing_list', status: 'valid', expiryDate: null, uploaded: true, verificationStatus: 'verified' },
    { id: 'DOC-003', name: 'Air Waybill', type: 'air_waybill', status: 'valid', expiryDate: null, uploaded: true, verificationStatus: 'verified' },
    { id: 'DOC-004', name: 'Certificate of Origin', type: 'certificate_of_origin', status: 'missing', expiryDate: null, uploaded: false, verificationStatus: 'pending' },
    { id: 'DOC-005', name: 'Import License', type: 'import_export_license', status: 'valid', expiryDate: '2024-06-15', uploaded: true, verificationStatus: 'verified' },
    { id: 'DOC-006', name: 'Insurance Certificate', type: 'insurance_certificate', status: 'valid', expiryDate: '2024-12-31', uploaded: true, verificationStatus: 'verified' },
    { id: 'DOC-007', name: 'Product Certificates', type: 'product_certificates', status: 'valid', expiryDate: '2024-08-20', uploaded: true, verificationStatus: 'verified' },
    { id: 'DOC-008', name: 'Customs Declaration', type: 'customs_declaration', status: 'missing', expiryDate: null, uploaded: false, verificationStatus: 'pending' }
  ];

  const demoCustomsReadiness: CustomsReadiness = {
    hsCodeStatus: 'VERIFIED',
    productClassification: 'Electronic Components - HS 8542.31.00',
    customsDocumentation: 78,
    originInformation: 'VERIFIED',
    destinationRequirements: ['Import Permit Required', 'JIS Certification Required'],
    declaredValue: 125000,
    dutyTaxEstimate: 12500,
    clearanceRisk: 'MEDIUM',
    missingInformation: ['Certificate of Origin', 'Customs Declaration']
  };

  const demoRegulatoryChecks: RegulatoryCheck[] = [
    { category: 'Import Restrictions', requirement: 'Import License', status: 'COMPLIANT', risk: 'LOW', description: 'Valid import license for electronics category' },
    { category: 'Export Restrictions', requirement: 'Export Control', status: 'COMPLIANT', risk: 'LOW', description: 'No export restrictions applicable' },
    { category: 'Controlled Goods', requirement: 'Dual-Use Check', status: 'COMPLIANT', risk: 'LOW', description: 'Not on controlled goods list' },
    { category: 'Dangerous Goods', requirement: 'Hazard Classification', status: 'EXEMPT', risk: 'LOW', description: 'Non-hazardous shipment' },
    { category: 'Product Certifications', requirement: 'JIS Certification', status: 'PENDING', risk: 'MEDIUM', description: 'JIS certificate requires verification' },
    { category: 'Labeling Requirements', requirement: 'Japanese Labels', status: 'PENDING', risk: 'MEDIUM', description: 'Japanese language labels required' },
    { category: 'Documentation', requirement: 'Certificate of Origin', status: 'NON_COMPLIANT', risk: 'HIGH', description: 'Certificate of Origin missing' },
    { category: 'Destination Requirements', requirement: 'Customs Declaration', status: 'NON_COMPLIANT', risk: 'HIGH', description: 'Japanese customs declaration incomplete' }
  ];

  const demoTradeRisk: TradeRisk = {
    customsRisk: 'MEDIUM',
    regulatoryRisk: 'MEDIUM',
    documentationRisk: 'HIGH',
    routeRisk: 'LOW',
    borderDelayRisk: 'MEDIUM',
    productRestrictionRisk: 'LOW',
    geopoliticalRisk: 'LOW',
    overallRisk: 'MEDIUM',
    primaryRisk: 'Destination documentation requirement incomplete',
    secondaryRisk: 'Border congestion may increase estimated clearance time'
  };

  const demoBorderPrediction: BorderDelayPrediction = {
    expectedClearance: '18-30 hours',
    potentialDelay: '+8 hours',
    confidence: 87,
    riskLevel: 'MEDIUM',
    factors: ['Missing Certificate of Origin', 'Incomplete customs declaration', 'Moderate border congestion']
  };

  const demoAIRecommendation: AIRecommendation = {
    readinessScore: 72,
    issues: ['Certificate of Origin is missing', 'Destination documentation is incomplete'],
    recommendedAction: 'Complete both documents before dispatch',
    expectedResult: 'Readiness → 96/100, Customs risk → LOW',
    confidence: 92
  };

  const demoDispatchGate: DispatchGate = {
    compliance: true,
    documents: false,
    customs: false,
    product: true,
    route: true,
    carrier: true,
    destination: true,
    overallStatus: 'REVIEW_REQUIRED'
  };

  const demoTimeline: ShipmentTimeline[] = [
    { stage: 'ORDER CREATED', status: 'completed', timestamp: '2024-04-18 10:30 AM', responsible: 'System', risk: 'LOW', evidence: 'Order #12345 created' },
    { stage: 'DOCUMENTS CHECKED', status: 'completed', timestamp: '2024-04-18 11:00 AM', responsible: 'System', risk: 'LOW', evidence: '6/8 documents verified' },
    { stage: 'COMPLIANCE VALIDATED', status: 'completed', timestamp: '2024-04-18 11:30 AM', responsible: 'GACIF AI', risk: 'LOW', evidence: 'Compliance score: 88/100' },
    { stage: 'CUSTOMS REVIEW', status: 'in_progress', timestamp: '2024-04-18 12:00 PM', responsible: 'System', risk: 'MEDIUM', evidence: 'Customs readiness: 78/100' },
    { stage: 'SHIPMENT CLEARED', status: 'pending', timestamp: '-', responsible: 'Human', risk: 'MEDIUM', evidence: 'Awaiting approval' },
    { stage: 'DISPATCH AUTHORIZED', status: 'pending', timestamp: '-', responsible: 'Smart Dispatch', risk: 'LOW', evidence: 'Pending clearance' },
    { stage: 'IN TRANSIT', status: 'pending', timestamp: '-', responsible: 'Carrier', risk: 'LOW', evidence: 'Not yet dispatched' },
    { stage: 'BORDER CHECK', status: 'pending', timestamp: '-', responsible: 'Customs', risk: 'MEDIUM', evidence: 'Expected clearance: 18-30 hours' },
    { stage: 'DELIVERED', status: 'pending', timestamp: '-', responsible: 'Recipient', risk: 'LOW', evidence: 'ETA: 2024-04-22' }
  ];

  const demoCountryRoutes: CountryRoute[] = [
    {
      id: 'ROUTE-001',
      originCountry: 'India',
      destinationCountry: 'Japan',
      originFlag: '🇮🇳',
      destinationFlag: '🇯🇵',
      distance: '6,500 km',
      estimatedTransitTime: '5-7 days (Air)',
      averageCustomsClearance: '18-30 hours',
      dutyRate: '8.5%',
      tradeAgreement: 'India-Japan CEPA',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Air Waybill', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration'],
      restrictedItems: ['Dual-use electronics', 'Certain chemicals'],
      riskLevel: 'MEDIUM',
      readinessScore: 72,
      activeShipments: 45,
      commonIssues: ['Certificate of Origin delays', 'JIS certification requirements', 'Japanese labeling requirements'],
      specialRequirements: ['Japanese language documentation', 'JIS certification for electronics', 'Product registration for imports']
    },
    {
      id: 'ROUTE-002',
      originCountry: 'China',
      destinationCountry: 'United States',
      originFlag: '🇨🇳',
      destinationFlag: '🇺🇸',
      distance: '11,000 km',
      estimatedTransitTime: '15-20 days (Sea)',
      averageCustomsClearance: '24-48 hours',
      dutyRate: '10-25%',
      tradeAgreement: 'Phase One Trade Agreement',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration', 'FDA Certification (if applicable)'],
      restrictedItems: ['Certain technology products', 'Agricultural products', 'Pharmaceuticals'],
      riskLevel: 'HIGH',
      readinessScore: 65,
      activeShipments: 128,
      commonIssues: ['Tariff classification disputes', 'Product certification delays', 'Customs examination delays'],
      specialRequirements: ['FDA compliance for food/pharma', 'EPA certification for chemicals', 'CPSC certification for consumer goods']
    },
    {
      id: 'ROUTE-003',
      originCountry: 'Germany',
      destinationCountry: 'United Kingdom',
      originFlag: '🇩🇪',
      destinationFlag: '🇬🇧',
      distance: '1,200 km',
      estimatedTransitTime: '2-3 days (Land)',
      averageCustomsClearance: '4-8 hours',
      dutyRate: '0% (UK-EU TCA)',
      tradeAgreement: 'EU-UK Trade and Cooperation Agreement',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'CMR Note', 'Certificate of Origin', 'Insurance Certificate', 'Customs Declaration', 'Safety Standards Certificate'],
      restrictedItems: ['Agricultural products', 'Animal products'],
      riskLevel: 'LOW',
      readinessScore: 92,
      activeShipments: 89,
      commonIssues: ['RoHS compliance verification', 'CE marking requirements', 'Customs declaration changes post-Brexit'],
      specialRequirements: ['CE marking for electronics', 'RoHS compliance', 'REACH registration for chemicals']
    },
    {
      id: 'ROUTE-004',
      originCountry: 'Vietnam',
      destinationCountry: 'South Korea',
      originFlag: '🇻🇳',
      destinationFlag: '🇰🇷',
      distance: '3,200 km',
      estimatedTransitTime: '7-10 days (Sea)',
      averageCustomsClearance: '12-24 hours',
      dutyRate: '5.2%',
      tradeAgreement: 'Vietnam-Korea FTA',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration'],
      restrictedItems: ['Certain textiles', 'Electronic components'],
      riskLevel: 'MEDIUM',
      readinessScore: 78,
      activeShipments: 34,
      commonIssues: ['Certificate of Origin verification', 'KC certification requirements', 'Quality inspection delays'],
      specialRequirements: ['KC certification for electronics', 'Korean labeling requirements', 'Import permits for restricted items']
    },
    {
      id: 'ROUTE-005',
      originCountry: 'Brazil',
      destinationCountry: 'Argentina',
      originFlag: '🇧🇷',
      destinationFlag: '🇦🇷',
      distance: '2,800 km',
      estimatedTransitTime: '5-7 days (Land)',
      averageCustomsClearance: '24-36 hours',
      dutyRate: '14%',
      tradeAgreement: 'Mercosur',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'CMR Note', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Customs Declaration', 'Health Certificate (if applicable)'],
      restrictedItems: ['Automotive parts', 'Certain agricultural products'],
      riskLevel: 'MEDIUM',
      readinessScore: 68,
      activeShipments: 23,
      commonIssues: ['Import permit delays', 'Customs valuation disputes', 'Documentation language requirements'],
      specialRequirements: ['Spanish/Portuguese documentation', 'Mercosur certificate of origin', 'Health certificates for food products']
    },
    {
      id: 'ROUTE-006',
      originCountry: 'Singapore',
      destinationCountry: 'Australia',
      originFlag: '🇸🇬',
      destinationFlag: '🇦🇺',
      distance: '6,200 km',
      estimatedTransitTime: '8-12 days (Sea)',
      averageCustomsClearance: '12-24 hours',
      dutyRate: '0% (SAFTA)',
      tradeAgreement: 'Singapore-Australia FTA',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Insurance Certificate', 'Customs Declaration', 'Product Certificates'],
      restrictedItems: ['Biosecurity sensitive items', 'Agricultural products'],
      riskLevel: 'LOW',
      readinessScore: 88,
      activeShipments: 56,
      commonIssues: ['Biosecurity inspections', 'Product certification verification', 'Timber treatment requirements'],
      specialRequirements: ['Australian biosecurity clearance', 'Product safety certification', 'Timber treatment certificates']
    },
    {
      id: 'ROUTE-007',
      originCountry: 'United Arab Emirates',
      destinationCountry: 'India',
      originFlag: '🇦🇪',
      destinationFlag: '🇮🇳',
      distance: '2,600 km',
      estimatedTransitTime: '3-5 days (Air)',
      averageCustomsClearance: '8-16 hours',
      dutyRate: '10-15%',
      tradeAgreement: 'UAE-India CEPA',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Air Waybill', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Customs Declaration', 'Halal Certificate (if applicable)'],
      restrictedItems: ['Alcohol products', 'Certain media content'],
      riskLevel: 'LOW',
      readinessScore: 85,
      activeShipments: 67,
      commonIssues: ['Halal certification requirements', 'Product labeling in Arabic', 'Import permit processing'],
      specialRequirements: ['Arabic language documentation', 'Halal certification for food products', 'Product registration for imports']
    },
    {
      id: 'ROUTE-008',
      originCountry: 'Mexico',
      destinationCountry: 'Canada',
      originFlag: '🇲🇽',
      destinationFlag: '🇨🇦',
      distance: '4,500 km',
      estimatedTransitTime: '5-7 days (Land)',
      averageCustomsClearance: '12-24 hours',
      dutyRate: '0% (CUSMA)',
      tradeAgreement: 'CUSMA/USMCA',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'CMR Note', 'Certificate of Origin', 'Insurance Certificate', 'Customs Declaration', 'Product Certificates', 'NAFTA Certification'],
      restrictedItems: ['Agricultural products', 'Certain textiles'],
      riskLevel: 'LOW',
      readinessScore: 90,
      activeShipments: 41,
      commonIssues: ['CUSMA certificate verification', 'Product origin verification', 'Canadian safety standards'],
      specialRequirements: ['CUSMA certificate of origin', 'Canadian safety certification', 'Bilingual documentation']
    },
    {
      id: 'ROUTE-009',
      originCountry: 'Thailand',
      destinationCountry: 'European Union',
      originFlag: '🇹🇭',
      destinationFlag: '🇪🇺',
      distance: '9,500 km',
      estimatedTransitTime: '20-25 days (Sea)',
      averageCustomsClearance: '24-48 hours',
      dutyRate: '0-12% (EU-Thailand FTA)',
      tradeAgreement: 'EU-Thailand FTA',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration', 'CE Certification'],
      restrictedItems: ['Certain textiles', 'Automotive parts'],
      riskLevel: 'MEDIUM',
      readinessScore: 74,
      activeShipments: 38,
      commonIssues: ['CE certification delays', 'Product classification disputes', 'Customs examination'],
      specialRequirements: ['CE marking for electronics', 'EU product certification', 'REACH compliance for chemicals']
    },
    {
      id: 'ROUTE-010',
      originCountry: 'South Africa',
      destinationCountry: 'Nigeria',
      originFlag: '🇿🇦',
      destinationFlag: '🇳🇬',
      distance: '4,800 km',
      estimatedTransitTime: '7-10 days (Sea)',
      averageCustomsClearance: '24-48 hours',
      dutyRate: '20-35%',
      tradeAgreement: 'AfCFTA',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Customs Declaration', 'Product Certificates'],
      restrictedItems: ['Certain agricultural products', 'Pharmaceuticals'],
      riskLevel: 'HIGH',
      readinessScore: 58,
      activeShipments: 15,
      commonIssues: ['Import permit delays', 'Customs valuation disputes', 'Documentation requirements changes'],
      specialRequirements: ['AfCFTA certificate of origin', 'Product registration', 'Local agent requirements']
    },
    {
      id: 'ROUTE-011',
      originCountry: 'Turkey',
      destinationCountry: 'Russia',
      originFlag: '🇹🇷',
      destinationFlag: '🇷🇺',
      distance: '2,400 km',
      estimatedTransitTime: '4-6 days (Land)',
      averageCustomsClearance: '18-36 hours',
      dutyRate: '5-15%',
      tradeAgreement: 'Turkey-Russia Free Trade Agreement',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'CMR Note', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Customs Declaration', 'Product Certificates'],
      restrictedItems: ['Technology products', 'Certain chemicals'],
      riskLevel: 'HIGH',
      readinessScore: 62,
      activeShipments: 22,
      commonIssues: ['Sanctions compliance verification', 'Product certification delays', 'Customs documentation requirements'],
      specialRequirements: ['Russian language documentation', 'EAC certification for products', 'Sanctions compliance verification']
    },
    {
      id: 'ROUTE-012',
      originCountry: 'Indonesia',
      destinationCountry: 'China',
      originFlag: '🇮🇩',
      destinationFlag: '🇨🇳',
      distance: '3,800 km',
      estimatedTransitTime: '7-10 days (Sea)',
      averageCustomsClearance: '12-24 hours',
      dutyRate: '0-10% (ACFTA)',
      tradeAgreement: 'ASEAN-China FTA',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration'],
      restrictedItems: ['Natural resources', 'Certain agricultural products'],
      riskLevel: 'MEDIUM',
      readinessScore: 76,
      activeShipments: 52,
      commonIssues: ['Certificate of Origin verification', 'Product classification', 'Quality inspection requirements'],
      specialRequirements: ['ACFTA certificate of origin', 'Chinese product certification', 'Import permits for restricted items']
    },
    {
      id: 'ROUTE-013',
      originCountry: 'Poland',
      destinationCountry: 'France',
      originFlag: '🇵🇱',
      destinationFlag: '🇫🇷',
      distance: '1,500 km',
      estimatedTransitTime: '2-3 days (Land)',
      averageCustomsClearance: '4-6 hours',
      dutyRate: '0% (EU Single Market)',
      tradeAgreement: 'EU Single Market',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'CMR Note', 'Certificate of Origin', 'Insurance Certificate', 'Customs Declaration'],
      restrictedItems: ['Alcohol products', 'Tobacco products'],
      riskLevel: 'LOW',
      readinessScore: 95,
      activeShipments: 78,
      commonIssues: ['VAT documentation', 'Excise tax compliance', 'Temperature-controlled goods'],
      specialRequirements: ['EU compliance certificates', 'Temperature monitoring for perishables', 'VAT registration']
    },
    {
      id: 'ROUTE-014',
      originCountry: 'Malaysia',
      destinationCountry: 'United States',
      originFlag: '🇲🇾',
      destinationFlag: '🇺🇸',
      distance: '15,000 km',
      estimatedTransitTime: '18-22 days (Sea)',
      averageCustomsClearance: '24-48 hours',
      dutyRate: '0-17% (US-Malaysia FTA)',
      tradeAgreement: 'US-Malaysia FTA',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration', 'FDA Certification'],
      restrictedItems: ['Halal food products', 'Palm oil products'],
      riskLevel: 'MEDIUM',
      readinessScore: 71,
      activeShipments: 43,
      commonIssues: ['Halal certification verification', 'FDA approval delays', 'Palm oil sustainability documentation'],
      specialRequirements: ['US FDA compliance', 'Halal certification for food', 'Sustainability certificates for palm oil']
    },
    {
      id: 'ROUTE-015',
      originCountry: 'Chile',
      destinationCountry: 'China',
      originFlag: '🇨🇱',
      destinationFlag: '🇨🇳',
      distance: '19,000 km',
      estimatedTransitTime: '25-30 days (Sea)',
      averageCustomsClearance: '24-48 hours',
      dutyRate: '0% (Chile-China FTA)',
      tradeAgreement: 'Chile-China FTA',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration'],
      restrictedItems: ['Agricultural products', 'Mining products'],
      riskLevel: 'MEDIUM',
      readinessScore: 77,
      activeShipments: 31,
      commonIssues: ['Phytosanitary certificates', 'Mining export permits', 'Long transit time tracking'],
      specialRequirements: ['Phytosanitary certificates for agriculture', 'Mining export licenses', 'Quality inspection for copper']
    },
    {
      id: 'ROUTE-016',
      originCountry: 'Netherlands',
      destinationCountry: 'United States',
      originFlag: '🇳🇱',
      destinationFlag: '🇺🇸',
      distance: '7,200 km',
      estimatedTransitTime: '8-10 days (Air)',
      averageCustomsClearance: '12-24 hours',
      dutyRate: '0-5% (US-Netherlands Trade)',
      tradeAgreement: 'US-EU Trade Framework',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Air Waybill', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration', 'FDA Certification'],
      restrictedItems: ['Flower bulbs', 'Dairy products'],
      riskLevel: 'LOW',
      readinessScore: 89,
      activeShipments: 56,
      commonIssues: ['FDA approval for food products', 'Phytosanitary certificates', 'Cold chain compliance'],
      specialRequirements: ['FDA compliance for food', 'Phytosanitary certificates for plants', 'Temperature monitoring for perishables']
    },
    {
      id: 'ROUTE-017',
      originCountry: 'South Korea',
      destinationCountry: 'United States',
      originFlag: '🇰🇷',
      destinationFlag: '🇺🇸',
      distance: '11,000 km',
      estimatedTransitTime: '12-15 days (Sea)',
      averageCustomsClearance: '18-36 hours',
      dutyRate: '0% (KORUS FTA)',
      tradeAgreement: 'KORUS FTA',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration', 'FDA Certification'],
      restrictedItems: ['Electronics with encryption', 'Certain agricultural products'],
      riskLevel: 'LOW',
      readinessScore: 91,
      activeShipments: 72,
      commonIssues: ['Encryption technology export controls', 'FDA approval for food', 'KORUS certificate verification'],
      specialRequirements: ['Encryption technology export licenses', 'FDA compliance', 'KORUS certificate of origin']
    },
    {
      id: 'ROUTE-018',
      originCountry: 'Italy',
      destinationCountry: 'Germany',
      originFlag: '🇮🇹',
      destinationFlag: '🇩🇪',
      distance: '1,200 km',
      estimatedTransitTime: '1-2 days (Land)',
      averageCustomsClearance: '2-4 hours',
      dutyRate: '0% (EU Single Market)',
      tradeAgreement: 'EU Single Market',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'CMR Note', 'Certificate of Origin', 'Insurance Certificate', 'Customs Declaration'],
      restrictedItems: ['Luxury goods', 'Food products with protected designation'],
      riskLevel: 'LOW',
      readinessScore: 96,
      activeShipments: 95,
      commonIssues: ['Protected designation of origin documentation', 'VAT compliance', 'Customs valuation for luxury goods'],
      specialRequirements: ['Protected designation of origin certificates', 'VAT documentation', 'Customs valuation for luxury items']
    },
    {
      id: 'ROUTE-019',
      originCountry: 'Philippines',
      destinationCountry: 'Japan',
      originFlag: '🇵🇭',
      destinationFlag: '🇯🇵',
      distance: '3,100 km',
      estimatedTransitTime: '7-10 days (Sea)',
      averageCustomsClearance: '12-24 hours',
      dutyRate: '0% (Philippines-Japan EPA)',
      tradeAgreement: 'Philippines-Japan Economic Partnership Agreement',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration'],
      restrictedItems: ['Certain agricultural products', 'Mining products'],
      riskLevel: 'MEDIUM',
      readinessScore: 73,
      activeShipments: 28,
      commonIssues: ['Certificate of Origin verification', 'Agricultural quarantine requirements', 'Mining export permits'],
      specialRequirements: ['Agricultural quarantine certificates', 'Mining export licenses', 'Product certification requirements']
    },
    {
      id: 'ROUTE-020',
      originCountry: 'Egypt',
      destinationCountry: 'European Union',
      originFlag: '🇪🇬',
      destinationFlag: '🇪🇺',
      distance: '3,500 km',
      estimatedTransitTime: '10-14 days (Sea)',
      averageCustomsClearance: '18-36 hours',
      dutyRate: '0-27% (EU-Egypt Association Agreement)',
      tradeAgreement: 'EU-Egypt Association Agreement',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration', 'EUR.1 Certificate'],
      restrictedItems: ['Cotton products', 'Certain chemicals'],
      riskLevel: 'MEDIUM',
      readinessScore: 69,
      activeShipments: 35,
      commonIssues: ['EUR.1 certificate verification', 'Cotton export documentation', 'Chemical safety compliance'],
      specialRequirements: ['EUR.1 movement certificate', 'Cotton export licenses', 'Chemical safety documentation']
    },
    {
      id: 'ROUTE-021',
      originCountry: 'Bangladesh',
      destinationCountry: 'United Kingdom',
      originFlag: '🇧🇩',
      destinationFlag: '🇬🇧',
      distance: '8,200 km',
      estimatedTransitTime: '18-22 days (Sea)',
      averageCustomsClearance: '24-48 hours',
      dutyRate: '0% (Everything But Arms)',
      tradeAgreement: 'Everything But Arms (EBA)',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration', 'EBA Certificate'],
      restrictedItems: ['Textile products', 'Leather goods'],
      riskLevel: 'MEDIUM',
      readinessScore: 67,
      activeShipments: 42,
      commonIssues: ['EBA certificate verification', 'Textile quota requirements', 'Quality inspection delays'],
      specialRequirements: ['EBA certificate of origin', 'Textile quota documentation', 'Quality inspection for garments']
    },
    {
      id: 'ROUTE-022',
      originCountry: 'Colombia',
      destinationCountry: 'United States',
      originFlag: '🇨🇴',
      destinationFlag: '🇺🇸',
      distance: '4,200 km',
      estimatedTransitTime: '5-7 days (Air)',
      averageCustomsClearance: '12-24 hours',
      dutyRate: '0% (US-Colombia FTA)',
      tradeAgreement: 'US-Colombia Trade Promotion Agreement',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Air Waybill', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration', 'FDA Certification'],
      restrictedItems: ['Agricultural products', 'Coffee products'],
      riskLevel: 'LOW',
      readinessScore: 86,
      activeShipments: 38,
      commonIssues: ['FDA approval for food products', 'Coffee export permits', 'Agricultural quarantine requirements'],
      specialRequirements: ['FDA compliance for food', 'Coffee export licenses', 'Agricultural quarantine certificates']
    },
    {
      id: 'ROUTE-023',
      originCountry: 'Pakistan',
      destinationCountry: 'China',
      originFlag: '🇵🇰',
      destinationFlag: '🇨🇳',
      distance: '4,500 km',
      estimatedTransitTime: '10-14 days (Land)',
      averageCustomsClearance: '18-36 hours',
      dutyRate: '0-35% (China-Pakistan FTA)',
      tradeAgreement: 'China-Pakistan Free Trade Agreement',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'CMR Note', 'Certificate of Origin', 'Import License', 'Insurance Certificate', 'Product Certificates', 'Customs Declaration'],
      restrictedItems: ['Textile products', 'Agricultural products'],
      riskLevel: 'HIGH',
      readinessScore: 59,
      activeShipments: 25,
      commonIssues: ['Security clearance requirements', 'Certificate of Origin verification', 'Border crossing delays'],
      specialRequirements: ['Security clearance documentation', 'China-Pakistan FTA certificate', 'Border crossing permits']
    },
    {
      id: 'ROUTE-024',
      originCountry: 'New Zealand',
      destinationCountry: 'Australia',
      originFlag: '🇳🇿',
      destinationFlag: '🇦🇺',
      distance: '2,100 km',
      estimatedTransitTime: '3-5 days (Sea)',
      averageCustomsClearance: '6-12 hours',
      dutyRate: '0% (ANZCERTA)',
      tradeAgreement: 'Australia-New Zealand Closer Economic Relations',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Insurance Certificate', 'Customs Declaration', 'Product Certificates'],
      restrictedItems: ['Biosecurity sensitive items', 'Agricultural products'],
      riskLevel: 'LOW',
      readinessScore: 94,
      activeShipments: 48,
      commonIssues: ['Biosecurity inspections', 'Quarantine requirements', 'Product certification verification'],
      specialRequirements: ['Biosecurity clearance', 'Quarantine certificates', 'Trans-Tasman mutual recognition']
    },
    {
      id: 'ROUTE-025',
      originCountry: 'Sweden',
      destinationCountry: 'Norway',
      originFlag: '🇸🇪',
      destinationFlag: '🇳🇴',
      distance: '500 km',
      estimatedTransitTime: '1-2 days (Land)',
      averageCustomsClearance: '2-4 hours',
      dutyRate: '0% (EEA)',
      tradeAgreement: 'European Economic Area',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'CMR Note', 'Certificate of Origin', 'Insurance Certificate', 'Customs Declaration'],
      restrictedItems: ['Alcohol products', 'Tobacco products'],
      riskLevel: 'LOW',
      readinessScore: 97,
      activeShipments: 63,
      commonIssues: ['Alcohol tax documentation', 'Excise tax compliance', 'Temperature-controlled goods'],
      specialRequirements: ['Alcohol tax stamps', 'Excise tax documentation', 'Temperature monitoring for perishables']
    }
  ];

  // Helper Functions
  const getReadinessColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getReadinessBadge = (status: string) => {
    switch (status) {
      case 'READY': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'READY_WITH_CAUTION': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'NEEDS_REVIEW': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'BLOCKED': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getDocumentIcon = (status: string) => {
    switch (status) {
      case 'valid': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'expiring_soon': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'missing': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'invalid': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'restricted': return <Lock className="w-4 h-4 text-orange-400" />;
      default: return <FileQuestion className="w-4 h-4 text-slate-400" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-400 bg-green-500/20';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/20';
      case 'HIGH': return 'text-orange-400 bg-orange-500/20';
      case 'CRITICAL': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const calculateReadiness = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setDispatchGate(demoDispatchGate);
      setHumanApprovalRequired(true);
      setIsCalculating(false);
    }, 2000);
  };

  const approveDispatch = () => {
    if (!dispatchGate) return;

    const newAudit: ReadinessAudit = {
      id: `AUD-${Date.now()}`,
      user: 'Admin01',
      shipment: demoShipment.trackingNumber,
      countryPair: `${demoShipment.originCountry} → ${demoShipment.destinationCountry}`,
      complianceCheck: 'COMPLIANT',
      documentChange: 'Certificate of Origin added',
      aiRecommendation: demoAIRecommendation.recommendedAction,
      humanDecision: 'APPROVED',
      override: false,
      timestamp: new Date().toISOString(),
      finalOutcome: 'Shipment approved for dispatch'
    };

    setAuditHistory([newAudit, ...auditHistory]);
    setHumanApprovalRequired(false);
    setDispatchGate({
      ...dispatchGate,
      documents: true,
      customs: true,
      overallStatus: 'READY'
    });
  };

  const exportReport = () => {
    // Simulate export functionality
    if (window.addToast) {
      window.addToast('success', 'Shipment Readiness Report exported successfully!');
    } else {
      alert('Shipment Readiness Report exported successfully!');
    }
  };

  const handleRouteClick = (route: CountryRoute) => {
    setSelectedRoute(route);
    setShowRouteModal(true);
    if (window.addToast) {
      window.addToast('info', `Loading route details for ${route.originCountry} → ${route.destinationCountry}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Breadcrumb 
          items={[
            { label: 'Dashboard', onClick: () => window.addToast?.('info', 'Navigate to Dashboard') },
            { label: 'Global Shipment Readiness™' }
          ]}
        />
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-slate-700 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-800 rounded-lg border border-slate-700 p-4 mb-4"
          >
            <div className="space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowUserProfile(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors"
              >
                <User className="w-5 h-5" />
                Profile
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleRefresh();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDarkMode(!darkMode);
                  if (window.addToast) {
                    window.addToast('info', darkMode ? 'Switching to light mode' : 'Switching to dark mode');
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
          <SkeletonLoader message="Loading Global Shipment Readiness™..." />
        </div>
      )}

      {/* Real-Time International Operations Dashboard */}
      {!isLoading && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Real-Time International Operations Dashboard</h2>
              <p className="text-sm text-slate-400">Live global supply chain performance and risk monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-400">Last updated: 2 min ago</div>
            <RefreshCw className="w-4 h-4 text-[#00F5C4] cursor-pointer" />
          </div>
        </div>

        {/* International KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <Globe2 className="w-5 h-5 text-[#00F5C4]" />
              <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">+15%</span>
            </div>
            <Tooltip content="Currently active international shipments across all routes">
              <div className="text-2xl font-bold text-white">847</div>
              <div className="text-xs text-slate-400">Active International Shipments</div>
            </Tooltip>
          </div>

          <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">-12%</span>
            </div>
            <Tooltip content="Total cost savings through international route optimization">
              <div className="text-2xl font-bold text-white">$2.4M</div>
              <div className="text-xs text-slate-400">Cost Saved (USD)</div>
            </Tooltip>
          </div>

          <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">-8h</span>
            </div>
            <Tooltip content="Average time for international shipments to cross borders">
              <div className="text-2xl font-bold text-white">18.5h</div>
              <div className="text-xs text-slate-400">Avg. Cross-Border Time</div>
            </Tooltip>
          </div>

          <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">3 active</span>
            </div>
            <Tooltip content="International shipments delivered on time across all routes">
              <div className="text-2xl font-bold text-white">92%</div>
              <div className="text-xs text-slate-400">On-Time Delivery Rate</div>
            </Tooltip>
          </div>
        </div>

        {/* Multi-Currency & Time Zone Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-3">
              <Tooltip content="Live exchange rates for major currencies">
                <DollarSign className="w-5 h-5 text-[#00F5C4]" />
              </Tooltip>
              <h3 className="text-sm font-semibold text-white">Multi-Currency Exchange Rates</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">USD/EUR</span>
                <span className="text-sm text-white">0.92 €</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">USD/GBP</span>
                <span className="text-sm text-white">0.79 £</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">USD/JPY</span>
                <span className="text-sm text-white">149.82 ¥</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">USD/CNY</span>
                <span className="text-sm text-white">7.24 ¥</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">USD/INR</span>
                <span className="text-sm text-white">83.12 ₹</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-3">
              <Tooltip content="Current time in major business hubs worldwide">
                <Clock className="w-5 h-5 text-[#00F5C4]" />
              </Tooltip>
              <h3 className="text-sm font-semibold text-white">Global Time Zones</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">New York (USA)</span>
                <span className="text-sm text-white">10:30 AM EST</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">London (UK)</span>
                <span className="text-sm text-white">3:30 PM GMT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Singapore</span>
                <span className="text-sm text-white">10:30 PM SGT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Tokyo (Japan)</span>
                <span className="text-sm text-white">11:30 PM JST</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Mumbai (India)</span>
                <span className="text-sm text-white">8:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Performance & Risk Monitoring */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-3">
              <Tooltip content="Performance metrics by geographic region">
                <TrendingUp className="w-5 h-5 text-[#00F5C4]" />
              </Tooltip>
              <h3 className="text-sm font-semibold text-white">Regional Performance</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Asia-Pacific</span>
                  <span className="text-sm text-green-400">94%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Europe</span>
                  <span className="text-sm text-green-400">91%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">North America</span>
                  <span className="text-sm text-yellow-400">87%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Latin America</span>
                  <span className="text-sm text-yellow-400">82%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Africa</span>
                  <span className="text-sm text-orange-400">76%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-orange-400 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center gap-2 mb-3">
              <Tooltip content="Real-time risk monitoring across international routes">
                <AlertOctagon className="w-5 h-5 text-[#00F5C4]" />
              </Tooltip>
              <h3 className="text-sm font-semibold text-white">Global Risk Monitoring</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-red-500/10 rounded-lg p-2 border border-red-500/30">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <div className="flex-1">
                  <div className="text-sm text-white">China-USA Trade Tensions</div>
                  <div className="text-xs text-slate-400">High impact on electronics</div>
                </div>
                <span className="text-xs text-red-400">HIGH</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-500/10 rounded-lg p-2 border border-yellow-500/30">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <div className="flex-1">
                  <div className="text-sm text-white">Europe Weather Disruptions</div>
                  <div className="text-xs text-slate-400">Storm affecting air freight</div>
                </div>
                <span className="text-xs text-yellow-400">MEDIUM</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 rounded-lg p-2 border border-green-500/30">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <div className="flex-1">
                  <div className="text-sm text-white">Asia-Pacific Routes Stable</div>
                  <div className="text-xs text-slate-400">Normal operations</div>
                </div>
                <span className="text-xs text-green-400">LOW</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-500/10 rounded-lg p-2 border border-yellow-500/30">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <div className="flex-1">
                  <div className="text-sm text-white">Port Congestion - Singapore</div>
                  <div className="text-xs text-slate-400">2-3 day delays expected</div>
                </div>
                <span className="text-xs text-yellow-400">MEDIUM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Global Country Routes Overview */}
      {!isLoading && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center shadow-lg">
              <Globe2 className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Global Country Routes™</h2>
              <p className="text-sm text-slate-400">Monitor readiness and compliance across major international trade routes.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-white">Refresh</span>
            </button>
            <button
              onClick={() => setShowUserProfile(true)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-white">Profile</span>
            </button>
            <div className="text-xs text-slate-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg">
              <Filter className="w-4 h-4 text-slate-400" />
              <select 
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="bg-transparent text-sm text-white border-none outline-none"
              >
                <option value="all">All Routes</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm text-white border-none outline-none w-48"
              />
            </div>
            <button
              onClick={() => exportToCSV(demoCountryRoutes, 'country-routes')}
              className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-white">Export CSV</span>
            </button>
            <button
              onClick={() => exportToJSON(demoCountryRoutes, 'country-routes')}
              className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-white">Export JSON</span>
            </button>
          </div>
        </div>

        {/* Interactive World Map */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#00F5C4]" />
              <h3 className="text-lg font-semibold text-white">Interactive World Map</h3>
              <span className="text-xs px-2 py-1 bg-slate-700/50 rounded text-slate-400">25 Active Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-xs text-slate-400">Low Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-xs text-slate-400">Medium Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span className="text-xs text-slate-400">High Risk</span>
              </div>
            </div>
          </div>

          {/* World Map Container */}
          <div className="relative bg-slate-900/50 rounded-xl p-4 border border-slate-700" style={{ height: '400px' }}>
            {/* Simplified World Map Background */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                {/* Simplified world map outlines */}
                <path d="M150,150 Q200,100 250,150 T350,150 Q400,100 450,150 T550,150 Q600,100 650,150 T750,150 Q800,100 850,150" stroke="#00F5C4" fill="none" strokeWidth="2"/>
                <path d="M100,250 Q150,200 200,250 T300,250 Q350,200 400,250 T500,250 Q550,200 600,250 T700,250 Q750,200 800,250 T900,250" stroke="#00F5C4" fill="none" strokeWidth="2"/>
                <path d="M150,350 Q200,300 250,350 T350,350 Q400,300 450,350 T550,350 Q600,300 650,350 T750,350 Q800,300 850,350" stroke="#00F5C4" fill="none" strokeWidth="2"/>
              </svg>
            </div>

            {/* Interactive Country Points */}
            <div className="relative w-full h-full">
              {/* India */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '65%', top: '45%' }}
                onClick={() => handleRouteClick(demoCountryRoutes[0])}
              >
                <div className="w-4 h-4 rounded-full bg-[#00F5C4] animate-pulse"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  India 🇮🇳
                </div>
              </div>

              {/* Japan */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '85%', top: '35%' }}
                onClick={() => handleRouteClick(demoCountryRoutes[0])}
              >
                <div className="w-4 h-4 rounded-full bg-[#00F5C4] animate-pulse"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Japan 🇯🇵
                </div>
              </div>

              {/* China */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '75%', top: '40%' }}
                onClick={() => handleRouteClick(demoCountryRoutes[1])}
              >
                <div className="w-4 h-4 rounded-full bg-red-400 animate-pulse"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  China 🇨🇳
                </div>
              </div>

              {/* United States */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '20%', top: '35%' }}
                onClick={() => handleRouteClick(demoCountryRoutes[1])}
              >
                <div className="w-4 h-4 rounded-full bg-red-400 animate-pulse"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  USA 🇺🇸
                </div>
              </div>

              {/* Germany */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '50%', top: '30%' }}
                onClick={() => handleRouteClick(demoCountryRoutes[2])}
              >
                <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Germany 🇩🇪
                </div>
              </div>

              {/* United Kingdom */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '48%', top: '28%' }}
                onClick={() => handleRouteClick(demoCountryRoutes[2])}
              >
                <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  UK 🇬🇧
                </div>
              </div>

              {/* Brazil */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '32%', top: '65%' }}
                onClick={() => handleRouteClick(demoCountryRoutes[4])}
              >
                <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Brazil 🇧🇷
                </div>
              </div>

              {/* Singapore */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '70%', top: '55%' }}
                onClick={() => handleRouteClick(demoCountryRoutes[5])}
              >
                <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Singapore 🇸🇬
                </div>
              </div>

              {/* Australia */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '85%', top: '75%' }}
                onClick={() => handleRouteClick(demoCountryRoutes[5])}
              >
                <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Australia 🇦🇺
                </div>
              </div>

              {/* South Africa */}
              <div
                className="absolute cursor-pointer group"
                style={{ left: '55%', top: '80%' }}
                onClick={() => handleRouteClick(demoCountryRoutes[9])}
              >
                <div className="w-4 h-4 rounded-full bg-red-400 animate-pulse"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  South Africa 🇿🇦
                </div>
              </div>

              {/* Animated Route Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* India to Japan */}
                <line x1="65%" y1="45%" x2="85%" y2="35%" stroke="#00F5C4" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" opacity="0.6"/>
                {/* China to USA */}
                <line x1="75%" y1="40%" x2="20%" y2="35%" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" opacity="0.6"/>
                {/* Germany to UK */}
                <line x1="50%" y1="30%" x2="48%" y2="28%" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" opacity="0.6"/>
                {/* Singapore to Australia */}
                <line x1="70%" y1="55%" x2="85%" y2="75%" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" opacity="0.6"/>
              </svg>

              {/* Live Shipment Counters */}
              <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
                <div className="text-xs text-slate-400 mb-1">Live Shipments</div>
                <div className="text-2xl font-bold text-[#00F5C4]">847</div>
                <div className="text-xs text-green-400">+12 active today</div>
              </div>

              {/* Risk Alert */}
              <div className="absolute bottom-4 left-4 bg-red-500/20 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <div>
                    <div className="text-xs text-red-400 font-semibold">High Risk Alert</div>
                    <div className="text-xs text-white">China-USA route affected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Country Routes Table (Below Map) */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Route</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Distance</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Transit Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Customs</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Duty Rate</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Trade Agreement</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Readiness</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Active</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Risk</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.slice(0, 10).map((route) => (
                <tr
                  key={route.id}
                  onClick={() => handleRouteClick(route)}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{route.originFlag}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                      <span className="text-xl">{route.destinationFlag}</span>
                      <span className="text-sm text-white ml-2">{route.originCountry} → {route.destinationCountry}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-white">{route.distance}</td>
                  <td className="py-3 px-4 text-sm text-white">{route.estimatedTransitTime}</td>
                  <td className="py-3 px-4 text-sm text-white">{route.averageCustomsClearance}</td>
                  <td className="py-3 px-4 text-sm text-white">{route.dutyRate}</td>
                  <td className="py-3 px-4 text-sm text-white">{route.tradeAgreement}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-bold ${getReadinessColor(route.readinessScore)}`}>{route.readinessScore}%</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-white">{route.activeShipments}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${getRiskColor(route.riskLevel)}`}>{route.riskLevel}</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-[#00F5C4] hover:text-[#00D4A8] transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-4">
            <button className="text-sm text-[#00F5C4] hover:text-[#00D4A8] transition-colors">
              View all 25 routes →
            </button>
          </div>
        </div>
      </div>
      )}

      {!isLoading && (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        {/* International Shipment Dashboard Card */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Global Shipment Readiness™</h2>
              <p className="text-sm text-slate-400">Know whether a shipment is ready to cross the world before it moves.</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedShipment(demoShipment);
              setShowReadinessModal(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 rounded-lg hover:opacity-90 transition-colors font-semibold flex items-center gap-2"
          >
            <Scan className="w-4 h-4" />
            Check Readiness
          </button>
        </div>

        {/* Demo Shipment Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">Tracking Number</div>
            <div className="text-sm font-medium text-white">{demoShipment.trackingNumber}</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">Route</div>
            <div className="text-sm font-medium text-white">{demoShipment.originCountry} → {demoShipment.destinationCountry}</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">Transport Mode</div>
            <div className="text-sm font-medium text-white">{demoShipment.transportMode}</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">Value</div>
            <div className="text-sm font-medium text-white">${demoShipment.shipmentValue.toLocaleString()} {demoShipment.currency}</div>
          </div>
        </div>
      </div>
      )}

      {/* Global Shipment Readiness Modal */}
      <AnimatePresence>
        {showReadinessModal && selectedShipment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReadinessModal(false)}
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
                      <Globe className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Global Shipment Readiness™</h2>
                      <p className="text-sm text-slate-400">Know before it moves.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={exportReport}
                      className="px-3 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export Report
                    </button>
                    <button
                      onClick={() => setShowReadinessModal(false)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Shipment Readiness Score */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">Shipment Readiness Score</h3>
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getReadinessColor(demoReadiness.score)}`}>{demoReadiness.score}</div>
                      <div className="text-sm text-slate-400 mt-1">/ 100</div>
                      <div className={`mt-2 inline-block px-4 py-1 rounded-lg border ${getReadinessBadge(demoReadiness.status)}`}>
                        {demoReadiness.status.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Documentation</div>
                      <div className={`text-xl font-bold ${getReadinessColor(demoReadiness.documentationReadiness)}`}>{demoReadiness.documentationReadiness}%</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Customs</div>
                      <div className={`text-xl font-bold ${getReadinessColor(demoReadiness.customsReadiness)}`}>{demoReadiness.customsReadiness}%</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Regulatory</div>
                      <div className={`text-xl font-bold ${getReadinessColor(demoReadiness.regulatoryReadiness)}`}>{demoReadiness.regulatoryReadiness}%</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Origin</div>
                      <div className={`text-xl font-bold ${getReadinessColor(demoReadiness.originCompliance)}`}>{demoReadiness.originCompliance}%</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Destination</div>
                      <div className={`text-xl font-bold ${getReadinessColor(demoReadiness.destinationCompliance)}`}>{demoReadiness.destinationCompliance}%</div>
                    </div>
                  </div>
                </div>

                {/* International Shipment Profile */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">International Shipment Profile</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Origin Country</div>
                      <div className="text-sm font-medium text-white flex items-center gap-2">
                        <Flag className="w-4 h-4" />
                        {selectedShipment.originCountry}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Destination Country</div>
                      <div className="text-sm font-medium text-white flex items-center gap-2">
                        <Flag className="w-4 h-4" />
                        {selectedShipment.destinationCountry}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Supplier</div>
                      <div className="text-sm font-medium text-white">{selectedShipment.supplier}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Product</div>
                      <div className="text-sm font-medium text-white">{selectedShipment.product}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">HS Code</div>
                      <div className="text-sm font-medium text-white">{selectedShipment.hsCode}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Quantity</div>
                      <div className="text-sm font-medium text-white">{selectedShipment.quantity.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Shipment Value</div>
                      <div className="text-sm font-medium text-white">${selectedShipment.shipmentValue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Transport Mode</div>
                      <div className="text-sm font-medium text-white flex items-center gap-2">
                        {selectedShipment.transportMode === 'AIR' ? <Plane className="w-4 h-4" /> : <Ship className="w-4 h-4" />}
                        {selectedShipment.transportMode}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document Readiness */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">Document Readiness</h3>
                    <span className="text-xs px-2 py-1 bg-slate-700/50 rounded text-slate-400">Connected to GACIF™</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {demoDocuments.map((doc) => (
                      <div key={doc.id} className={`p-4 rounded-lg border ${doc.status === 'valid' ? 'bg-green-500/10 border-green-500/30' : doc.status === 'missing' ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-700/50 border-slate-600'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {getDocumentIcon(doc.status)}
                          <span className="text-sm font-medium text-white">{doc.name}</span>
                        </div>
                        <div className="text-xs text-slate-400">{doc.status.replace('_', ' ').toUpperCase()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customs Readiness */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Scale className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">Customs Readiness</h3>
                    <span className={`text-xl font-bold ${getReadinessColor(demoCustomsReadiness.customsDocumentation)}`}>{demoCustomsReadiness.customsDocumentation}%</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                      <div className="text-xs text-slate-400 mb-1">HS Code Status</div>
                      <div className="text-sm font-medium text-green-400">{demoCustomsReadiness.hsCodeStatus}</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                      <div className="text-xs text-slate-400 mb-1">Origin Information</div>
                      <div className="text-sm font-medium text-green-400">{demoCustomsReadiness.originInformation}</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                      <div className="text-xs text-slate-400 mb-1">Clearance Risk</div>
                      <div className={`text-sm font-medium ${getRiskColor(demoCustomsReadiness.clearanceRisk)}`}>{demoCustomsReadiness.clearanceRisk}</div>
                    </div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                    <div className="text-xs text-slate-400 mb-2">Missing Information</div>
                    <div className="space-y-1">
                      {demoCustomsReadiness.missingInformation.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-orange-400">
                          <AlertTriangle className="w-4 h-4" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cross-Border Regulatory Check */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Gavel className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">Cross-Border Regulatory Check</h3>
                  </div>
                  <div className="space-y-3">
                    {demoRegulatoryChecks.map((check, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${check.status === 'COMPLIANT' ? 'bg-green-500/10 border-green-500/30' : check.status === 'PENDING' ? 'bg-yellow-500/10 border-yellow-500/30' : check.status === 'NON_COMPLIANT' ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-700/50 border-slate-600'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {check.status === 'COMPLIANT' ? <CheckCircle className="w-4 h-4 text-green-400" /> : check.status === 'PENDING' ? <AlertTriangle className="w-4 h-4 text-yellow-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                            <span className="text-sm font-medium text-white">{check.category}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${getRiskColor(check.risk)}`}>{check.risk}</span>
                        </div>
                        <div className="text-sm text-slate-400">{check.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trade Risk Radar */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Radar className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">Trade Risk Radar</h3>
                    <span className={`text-xl font-bold ${getRiskColor(demoTradeRisk.overallRisk)}`}>{demoTradeRisk.overallRisk}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Customs Risk</div>
                      <div className={`text-sm font-medium ${getRiskColor(demoTradeRisk.customsRisk)}`}>{demoTradeRisk.customsRisk}</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Regulatory Risk</div>
                      <div className={`text-sm font-medium ${getRiskColor(demoTradeRisk.regulatoryRisk)}`}>{demoTradeRisk.regulatoryRisk}</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Documentation Risk</div>
                      <div className={`text-sm font-medium ${getRiskColor(demoTradeRisk.documentationRisk)}`}>{demoTradeRisk.documentationRisk}</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Border Delay Risk</div>
                      <div className={`text-sm font-medium ${getRiskColor(demoTradeRisk.borderDelayRisk)}`}>{demoTradeRisk.borderDelayRisk}</div>
                    </div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                    <div className="text-xs text-slate-400 mb-2">Primary Risk</div>
                    <div className="text-sm text-white">{demoTradeRisk.primaryRisk}</div>
                    <div className="text-xs text-slate-400 mt-2">Secondary Risk</div>
                    <div className="text-sm text-slate-300">{demoTradeRisk.secondaryRisk}</div>
                  </div>
                </div>

                {/* Border Delay Prediction */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">Border Delay Prediction</h3>
                    <span className="text-xs px-2 py-1 bg-slate-700/50 rounded text-slate-400">AI Prediction</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Expected Clearance</div>
                      <div className="text-2xl font-bold text-white">{demoBorderPrediction.expectedClearance}</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Potential Delay</div>
                      <div className="text-2xl font-bold text-orange-400">{demoBorderPrediction.potentialDelay}</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 text-center">
                      <div className="text-xs text-slate-400 mb-1">Confidence</div>
                      <div className="text-2xl font-bold text-[#00F5C4]">{demoBorderPrediction.confidence}%</div>
                    </div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                    <div className="text-xs text-slate-400 mb-2">Factors</div>
                    <div className="space-y-1">
                      {demoBorderPrediction.factors.map((factor, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                          <ArrowRight className="w-4 h-4 text-[#00F5C4]" />
                          {factor}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Shipment Readiness Copilot */}
                <div className="bg-gradient-to-br from-[#00F5C4]/20 to-[#00D4A8]/20 rounded-xl p-6 border border-[#00F5C4]/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">AI Shipment Readiness Copilot</h3>
                    <span className="text-xs px-2 py-1 bg-[#00F5C4]/20 rounded text-[#00F5C4]">Confidence: {demoAIRecommendation.confidence}%</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <div className="text-sm text-slate-400 mb-2">Readiness Assessment</div>
                      <div className="text-white font-medium">Shipment readiness is {demoAIRecommendation.readinessScore}/100.</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <div className="text-sm text-slate-400 mb-2">Issues Requiring Attention</div>
                      <div className="space-y-2">
                        {demoAIRecommendation.issues.map((issue, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm text-orange-400">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {issue}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <div className="text-sm text-slate-400 mb-2">Recommended Action</div>
                      <div className="text-white font-medium">{demoAIRecommendation.recommendedAction}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                      <div className="text-sm text-slate-400 mb-2">Expected Result</div>
                      <div className="text-green-400 font-medium">{demoAIRecommendation.expectedResult}</div>
                    </div>
                  </div>
                </div>

                {/* Pre-Dispatch Gate */}
                {dispatchGate && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck className="w-5 h-5 text-[#00F5C4]" />
                      <h3 className="text-lg font-semibold text-white">Pre-Dispatch Gate</h3>
                      <span className={`text-xl font-bold ${dispatchGate.overallStatus === 'READY' ? 'text-green-400' : dispatchGate.overallStatus === 'REVIEW_REQUIRED' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {dispatchGate.overallStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-4 mb-4">
                      <div className={`p-3 rounded-lg border text-center ${dispatchGate.compliance ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                        <div className="text-xs text-slate-400 mb-1">Compliance</div>
                        <div className="text-sm font-medium">{dispatchGate.compliance ? '✓' : '✕'}</div>
                      </div>
                      <div className={`p-3 rounded-lg border text-center ${dispatchGate.documents ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                        <div className="text-xs text-slate-400 mb-1">Documents</div>
                        <div className="text-sm font-medium">{dispatchGate.documents ? '✓' : '✕'}</div>
                      </div>
                      <div className={`p-3 rounded-lg border text-center ${dispatchGate.customs ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                        <div className="text-xs text-slate-400 mb-1">Customs</div>
                        <div className="text-sm font-medium">{dispatchGate.customs ? '✓' : '✕'}</div>
                      </div>
                      <div className={`p-3 rounded-lg border text-center ${dispatchGate.product ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                        <div className="text-xs text-slate-400 mb-1">Product</div>
                        <div className="text-sm font-medium">{dispatchGate.product ? '✓' : '✕'}</div>
                      </div>
                      <div className={`p-3 rounded-lg border text-center ${dispatchGate.route ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                        <div className="text-xs text-slate-400 mb-1">Route</div>
                        <div className="text-sm font-medium">{dispatchGate.route ? '✓' : '✕'}</div>
                      </div>
                      <div className={`p-3 rounded-lg border text-center ${dispatchGate.carrier ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                        <div className="text-xs text-slate-400 mb-1">Carrier</div>
                        <div className="text-sm font-medium">{dispatchGate.carrier ? '✓' : '✕'}</div>
                      </div>
                      <div className={`p-3 rounded-lg border text-center ${dispatchGate.destination ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                        <div className="text-xs text-slate-400 mb-1">Destination</div>
                        <div className="text-sm font-medium">{dispatchGate.destination ? '✓' : '✕'}</div>
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
                            onClick={approveDispatch}
                            className="flex-1 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold flex items-center justify-center gap-2"
                          >
                            <ClipboardCheck className="w-4 h-4" />
                            Approve Dispatch
                          </button>
                          <button
                            onClick={() => setHumanApprovalRequired(false)}
                            className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                          >
                            Request Correction
                          </button>
                          <button
                            onClick={() => setHumanApprovalRequired(false)}
                            className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                          >
                            Hold Shipment
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Real-Time Status Timeline */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <History className="w-5 h-5 text-[#00F5C4]" />
                      <h3 className="text-lg font-semibold text-white">Shipment Timeline</h3>
                    </div>
                    <button
                      onClick={() => setShowTimeline(!showTimeline)}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {showTimeline ? 'Hide' : 'Show'} Details
                    </button>
                  </div>
                  <div className="space-y-3">
                    {demoTimeline.map((stage, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stage.status === 'completed' ? 'bg-green-500/20' : stage.status === 'in_progress' ? 'bg-blue-500/20' : stage.status === 'blocked' ? 'bg-red-500/20' : 'bg-slate-700/50'}`}>
                          {stage.status === 'completed' ? <CheckCircle className="w-4 h-4 text-green-400" /> : stage.status === 'in_progress' ? <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" /> : stage.status === 'blocked' ? <Ban className="w-4 h-4 text-red-400" /> : <Clock className="w-4 h-4 text-slate-400" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white">{stage.stage}</span>
                            <span className={`text-xs px-2 py-1 rounded ${getRiskColor(stage.risk)}`}>{stage.risk}</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">{stage.timestamp} • {stage.responsible}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit History */}
                {auditHistory.length > 0 && (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Database className="w-5 h-5 text-[#00F5C4]" />
                      <h3 className="text-lg font-semibold text-white">Audit History</h3>
                    </div>
                    <div className="space-y-3">
                      {auditHistory.map((audit, index) => (
                        <div key={index} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">{audit.shipment}</span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-400">{audit.countryPair}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              audit.humanDecision === 'APPROVED' ? 'bg-green-500/20 text-green-400' :
                              audit.humanDecision === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {audit.humanDecision}
                            </span>
                          </div>
                          <div className="text-sm text-slate-400 mb-2">{audit.aiRecommendation}</div>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>Confidence: {audit.confidence}%</span>
                            <span>{new Date(audit.timestamp).toLocaleString()}</span>
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

      {/* Country Route Details Modal */}
      <AnimatePresence>
        {showRouteModal && selectedRoute && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRouteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{selectedRoute.originFlag}</span>
                      <ArrowRight className="w-6 h-6 text-slate-400" />
                      <span className="text-4xl">{selectedRoute.destinationFlag}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedRoute.originCountry} → {selectedRoute.destinationCountry}</h2>
                      <p className="text-sm text-slate-400">Route ID: {selectedRoute.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowRouteModal(false)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Route Overview Table */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Navigation className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">Route Overview</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-slate-700">
                          <td className="py-2 px-4 text-sm text-slate-400">Distance</td>
                          <td className="py-2 px-4 text-sm text-white">{selectedRoute.distance}</td>
                        </tr>
                        <tr className="border-b border-slate-700">
                          <td className="py-2 px-4 text-sm text-slate-400">Transit Time</td>
                          <td className="py-2 px-4 text-sm text-white">{selectedRoute.estimatedTransitTime}</td>
                        </tr>
                        <tr className="border-b border-slate-700">
                          <td className="py-2 px-4 text-sm text-slate-400">Customs Clearance</td>
                          <td className="py-2 px-4 text-sm text-white">{selectedRoute.averageCustomsClearance}</td>
                        </tr>
                        <tr className="border-b border-slate-700">
                          <td className="py-2 px-4 text-sm text-slate-400">Duty Rate</td>
                          <td className="py-2 px-4 text-sm text-white">{selectedRoute.dutyRate}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-sm text-slate-400">Trade Agreement</td>
                          <td className="py-2 px-4 text-sm text-white">{selectedRoute.tradeAgreement}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck className="w-5 h-5 text-[#00F5C4]" />
                      <h3 className="text-lg font-semibold text-white">Readiness Score</h3>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className={`text-5xl font-bold ${getReadinessColor(selectedRoute.readinessScore)}`}>{selectedRoute.readinessScore}</div>
                        <div className="text-sm text-slate-400 mt-1">/ 100</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xs text-slate-400 mb-1">Active Shipments</div>
                        <div className="text-xl font-bold text-white">{selectedRoute.activeShipments}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-400 mb-1">Risk Level</div>
                        <span className={`text-lg font-bold ${getRiskColor(selectedRoute.riskLevel)}`}>{selectedRoute.riskLevel}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-[#00F5C4]" />
                      <h3 className="text-lg font-semibold text-white">Trade Agreement</h3>
                    </div>
                    <div className="text-white font-medium mb-3">{selectedRoute.tradeAgreement}</div>
                    <div className="text-sm text-slate-400">This route is covered by the trade agreement, providing preferential duty rates and simplified customs procedures.</div>
                  </div>
                </div>

                {/* Required Documents Table */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">Required Documents</h3>
                    <span className="text-xs px-2 py-1 bg-slate-700/50 rounded text-slate-400">{selectedRoute.requiredDocuments.length} documents</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tbody>
                        {selectedRoute.requiredDocuments.map((doc, index) => (
                          <tr key={index} className="border-b border-slate-700 last:border-0">
                            <td className="py-2 px-4">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-sm text-white">{doc}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Issues and Requirements Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-[#00F5C4]" />
                      <h3 className="text-lg font-semibold text-white">Common Issues</h3>
                      <span className="text-xs px-2 py-1 bg-orange-500/20 rounded text-orange-400">{selectedRoute.commonIssues.length}</span>
                    </div>
                    <div className="space-y-2">
                      {selectedRoute.commonIssues.map((issue, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-white">
                          <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-[#00F5C4]" />
                      <h3 className="text-lg font-semibold text-white">Special Requirements</h3>
                      <span className="text-xs px-2 py-1 bg-blue-500/20 rounded text-blue-400">{selectedRoute.specialRequirements.length}</span>
                    </div>
                    <div className="space-y-2">
                      {selectedRoute.specialRequirements.map((requirement, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-white">
                          <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          <span>{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Restricted Items */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Ban className="w-5 h-5 text-[#00F5C4]" />
                    <h3 className="text-lg font-semibold text-white">Restricted Items</h3>
                    <span className="text-xs px-2 py-1 bg-red-500/20 rounded text-red-400">{selectedRoute.restrictedItems.length} items</span>
                  </div>
                  <div className="space-y-2">
                    {selectedRoute.restrictedItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-white">
                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRouteModal(false)}
                    className="flex-1 px-4 py-3 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Proceed with Route
                  </button>
                  <button
                    onClick={() => setShowRouteModal(false)}
                    className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Route Guide
                  </button>
                  <button
                    onClick={() => setShowRouteModal(false)}
                    className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact Support
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <UserProfile
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        onLogout={() => {
          setShowUserProfile(false);
          if (window.addToast) {
            window.addToast('success', 'Logged out successfully');
          }
        }}
      />
    </div>
  );
};

export default GlobalShipmentReadiness;
