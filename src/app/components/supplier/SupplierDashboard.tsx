import { TrendingUp, Package, AlertTriangle, BarChart3, Calendar, Bell, Settings, LogOut, Truck, Menu, X, User, Camera, Upload, Brain, Calculator, Map, Activity, CheckCircle, Clock, Zap, RefreshCw, Users, MessageCircle, DollarSign, TrendingDown, Info, Shield, Database, Wifi, WifiOff, Globe, Network, PackageCheck, Languages, ChevronDown, ShieldCheck, FileText, Globe2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

// Import new components
import InventoryManagement from './InventoryManagement';
import DemandForecast from './DemandForecast';
import RestockingPlanner from './RestockingPlanner';
import WarehouseDistribution from './WarehouseDistribution';
import AlertsNotifications from './AlertsNotifications';
import AnalyticsDashboard from './AnalyticsDashboard';
import AIAssistant from './AIAssistant';
import SupplierReportInbox from './Supplier_Report_Inbox';
import Supplier_Smart_Dispatch from './Supplier_Smart_Dispatch';
import SupplierParcelTracking from './SupplierParcelTracking';
import { Supplier_Team_Management } from './Supplier_Team_Management';
import { SCEFCommandCenter } from '../SCEF/SCEFCommandCenter';
import { GSINCommandCenter } from '../GSIN/GSINCommandCenter';
import GACIFCommandCenter from '../GACIF/GACIFCommandCenter';
import DriversAndVehicles from './DriversAndVehicles';
import ActivityAuditReports from './ActivityAuditReports';
import GlobalShipmentReadiness from '../GlobalShipmentReadiness';

const demandForecast = [
  { month: 'Jan', actual: 2400, predicted: 2300 },
  { month: 'Feb', actual: 1398, predicted: 1500 },
  { month: 'Mar', actual: 3800, predicted: 3600 },
  { month: 'Apr', actual: 3908, predicted: 4100 },
  { month: 'May', predicted: 4800 },
  { month: 'Jun', predicted: 5200 },
];

const inventoryTrend = [
  { date: 'Week 1', level: 4500 },
  { date: 'Week 2', level: 4200 },
  { date: 'Week 3', level: 3800 },
  { date: 'Week 4', level: 3200 },
  { date: 'Week 5', level: 2800 },
  { date: 'Week 6', level: 2400 },
];

type NotificationKey = 'newOrderAlerts' | 'lowStockAlerts' | 'demandForecastAlerts' | 'paymentAlerts';

interface ProductInsight {
  sku: string;
  name: string;
  currentDemand: number;
  predictedDemand: number;
  trend: 'up' | 'down' | 'stable';
  recommendedOrder: number;
  leadTime: string;
  stockLevel: number;
  minStock: number;
  maxStock: number;
}

interface SupplierDashboardProps {
  onLogout: () => void;
}

const mockProducts: ProductInsight[] = [
  { sku: 'SKU-7845', name: 'Circuit Board A', currentDemand: 120, predictedDemand: 340, trend: 'up', recommendedOrder: 500, leadTime: '3-5 days', stockLevel: 150, minStock: 200, maxStock: 800 },
  { sku: 'SKU-2341', name: 'Brake Pads', currentDemand: 450, predictedDemand: 480, trend: 'up', recommendedOrder: 300, leadTime: '2-3 days', stockLevel: 180, minStock: 250, maxStock: 600 },
  { sku: 'SKU-9012', name: 'Steel Rods', currentDemand: 2100, predictedDemand: 1900, trend: 'down', recommendedOrder: 0, leadTime: '7-10 days', stockLevel: 4500, minStock: 1000, maxStock: 5000 },
  { sku: 'SKU-5678', name: 'LED Bulbs', currentDemand: 890, predictedDemand: 920, trend: 'up', recommendedOrder: 200, leadTime: '1-2 days', stockLevel: 45, minStock: 100, maxStock: 400 },
];

const lowStockAlerts = [
  { id: 'ALERT001', sku: 'SKU-5678', productName: 'LED Bulbs', currentStock: 45, minStock: 100, urgency: 'critical', timeAgo: '2 hours ago', impact: 'Potential stockout in 3 days' },
  { id: 'ALERT002', sku: 'SKU-2341', productName: 'Brake Pads', currentStock: 180, minStock: 250, urgency: 'high', timeAgo: '5 hours ago', impact: 'Low stock buffer detected' },
  { id: 'ALERT003', sku: 'SKU-7845', productName: 'Circuit Board A', currentStock: 150, minStock: 200, urgency: 'medium', timeAgo: '1 day ago', impact: 'Stock below optimal level' },
];

const restockingPlans = [
  { 
    id: 'PLAN001', 
    sku: 'SKU-5678', 
    productName: 'LED Bulbs', 
    orderQuantity: 500, 
    urgency: 'critical',
    estimatedCost: '₹45,000',
    supplier: 'Lighting Solutions Ltd',
    expectedDelivery: '2024-04-25',
    reason: 'Critical stock level - immediate replenishment required'
  },
  { 
    id: 'PLAN002', 
    sku: 'SKU-2341', 
    productName: 'Brake Pads', 
    orderQuantity: 300, 
    urgency: 'high',
    estimatedCost: '₹78,000',
    supplier: 'Auto Parts Co.',
    expectedDelivery: '2024-04-24',
    reason: 'High demand trend - maintain safety stock'
  },
  { 
    id: 'PLAN003', 
    sku: 'SKU-7845', 
    productName: 'Circuit Board A', 
    orderQuantity: 500, 
    urgency: 'medium',
    estimatedCost: '₹1,20,000',
    supplier: 'Electronics Manufacturing',
    expectedDelivery: '2024-04-26',
    reason: 'Demand spike predicted - proactive ordering'
  },
];

const warehouseDistribution = [
  { id: 'WH001', name: 'Mumbai Warehouse', capacity: 10000, currentStock: 7500, utilization: 75, region: 'West' },
  { id: 'WH002', name: 'Delhi Warehouse', capacity: 8000, currentStock: 6200, utilization: 78, region: 'North' },
  { id: 'WH003', name: 'Bangalore Warehouse', capacity: 12000, currentStock: 8900, utilization: 74, region: 'South' },
  { id: 'WH004', name: 'Kolkata Warehouse', capacity: 6000, currentStock: 4800, utilization: 80, region: 'East' },
];


type SidebarItem = {
  id: 'overview' | 'inventory' | 'parcel-tracking' | 'smart-dispatch' | 'scef' | 'gsin' | 'gacif' | 'global-readiness' | 'forecasting' | 'restocking' | 'warehouses' | 'reports' | 'alerts' | 'analytics' | 'team-management' | 'ai-assistant' | 'drivers-vehicles' | 'activity-audit' | 'profile';
  label: string;
  icon: any;
  color: string;
};

export function SupplierDashboard({ onLogout }: SupplierDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'parcel-tracking' | 'smart-dispatch' | 'scef' | 'gsin' | 'gacif' | 'global-readiness' | 'forecasting' | 'restocking' | 'warehouses' | 'reports' | 'alerts' | 'analytics' | 'team-management' | 'ai-assistant' | 'drivers-vehicles' | 'activity-audit' | 'profile'>('overview');
  const [currentVersion, setCurrentVersion] = useState('v1.2.0');
  const [latestVersion, setLatestVersion] = useState('v1.3.0');
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'active' | 'syncing' | 'offline'>('active');
  const [lastSync, setLastSync] = useState('2 mins ago');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showDocumentsDialog, setShowDocumentsDialog] = useState(false);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  const [showPerformanceDialog, setShowPerformanceDialog] = useState(false);
  const [systemLanguage, setSystemLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Minimal software updates data for overview
  const systemMessages: { id: string; type: 'urgent' | 'feature' | 'maintenance' | 'info'; title: string; timestamp: string }[] = [
    { id: '1', type: 'urgent', title: 'Urgent Update', timestamp: '10:30 AM' },
    { id: '2', type: 'feature', title: 'Feature Update', timestamp: '9:15 AM' }
  ];

  const handleUpdateNow = () => {
    setUpdateInProgress(true);
    setTimeout(() => {
      setCurrentVersion(latestVersion);
      setUpdateInProgress(false);
      setLatestVersion('v1.4.0');
    }, 3000);
  };

  const getMessageIcon = (type: 'urgent' | 'feature' | 'maintenance' | 'info') => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'feature': return <Zap className="w-4 h-4 text-blue-500" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSyncIcon = () => {
    switch (syncStatus) {
      case 'active': return <Wifi className="w-4 h-4 text-green-500" />;
      case 'syncing': return <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />;
      case 'offline': return <WifiOff className="w-4 h-4 text-red-500" />;
    }
  };

  const [profileData, setProfileData] = useState({
    // Section 1 - Basic Info
    supplierId: 'SUP-2024-001',
    companyName: 'Global Supply Solutions Ltd',
    industryType: 'Manufacturer',
    contactPerson: 'Rajesh Kumar',
    designation: 'Supply Chain Manager',
    email: 'contact@globalsupply.com',
    phone: '+91 98765 43210',
    alternatePhone: '+91 98765 43211',
    website: 'www.globalsupply.com',
    
    // Section 2 - Business Details
    businessRegNumber: 'ROC-MH-2024-001',
    gstNumber: '27AAAPG1234C1ZV',
    panNumber: 'AAAPG1234C',
    yearEstablished: '2015',
    companySize: 'Medium',
    annualSupplyCapacity: '50000 units',
    
    // Section 3 - Location Info
    headquartersAddress: '123 Industrial Area, Phase 2',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    pinCode: '400001',
    warehouseLocations: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
    serviceableRegions: ['West India', 'North India', 'South India', 'East India'],
    preferredLanguage: 'English',
    alternateLanguage: 'Hindi',
    
    // Section 4 - Supply Details
    productCategories: ['Electronics', 'Automotive Parts', 'Industrial Components'],
    topProducts: ['Circuit Boards', 'Brake Pads', 'Steel Rods', 'LED Bulbs'],
    minimumOrderQuantity: '100 units',
    leadTime: '7 days',
    preferredPaymentTerms: 'Net 30 days',
    
    // Section 5 - Documents
    documents: {
      businessRegistration: true,
      gstCertificate: true,
      isoCertifications: ['ISO 9001:2015', 'ISO 14001:2015'],
      bankDetails: 'HDFC Bank, Account: ****1234'
    },
    
    // Section 6 - Performance Stats
    overallRating: 4.8,
    onTimeDeliveryRate: 97.8,
    orderFulfillmentRate: 99.2,
    returnRejectionRate: 1.2,
    totalOrdersCompleted: 1250,
    activeSince: '2024-01-15',
    
    // Section 7 - Notification Preferences
    notifications: {
      newOrderAlerts: true,
      lowStockAlerts: true,
      demandForecastAlerts: false,
      paymentAlerts: true,
      preferredChannel: 'Both'
    },
    
    // Section 8 - Security Settings
    lastLogin: '2024-04-24 14:30:00',
    activeSessions: 2,
    
    // Section 9 - Bank & Payment Info
    bankName: 'HDFC Bank',
    accountNumber: '****1234',
    ifscCode: 'HDFC0001234',
    paymentMethodPreference: 'Bank Transfer',
    
    // WOW Additions
    aiSupplyHealthScore: 87,
    verifiedBadge: true
  });

  const sidebarItems: SidebarItem[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'inventory', label: 'Inventory', icon: Package, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'parcel-tracking', label: 'Parcel Tracking', icon: PackageCheck, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'smart-dispatch', label: 'Smart Dispatch', icon: Truck, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'scef', label: 'SCEF™ AI', icon: Globe, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'gsin', label: 'GSIN™ Network', icon: Network, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'gacif', label: 'GACIF™ Compliance', icon: ShieldCheck, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'global-readiness', label: 'Global Shipment Readiness™', icon: Globe2, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'forecasting', label: 'Demand Forecast', icon: Brain, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'restocking', label: 'Restocking Planner', icon: Calculator, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'warehouses', label: 'Distributions', icon: Map, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'reports', label: 'Report Inbox', icon: AlertTriangle, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'alerts', label: 'Alerts & Notifications', icon: Bell, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'analytics', label: 'Analytics', icon: Activity, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'team-management', label: 'Team Management', icon: Users, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: MessageCircle, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'drivers-vehicles', label: 'Drivers & Vehicles', icon: Users, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'activity-audit', label: 'Activity & Audit', icon: FileText, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'profile', label: 'Profile', icon: User, color: 'from-[#00F5C4] to-[#00D4A8]' },
  ];

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 flex flex-col min-h-screen"
          >
            {/* Logo & Header */}
            <div className="p-6 border-b border-slate-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">LogiCortex AI</h1>
                  <p className="text-xs text-slate-400">Supplier Planning & Inventory</p>
                </div>
              </div>
            </div>

            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-slate-800/50 bg-slate-800/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center shadow-lg flex-shrink-0">
                  <User className="w-5 h-5 text-slate-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">John Smith</div>
                  <div className="text-xs text-slate-400 truncate">Global Supply Chain Co.</div>
                  <div className="text-xs text-slate-500 mt-1">Last login: 2 hours ago</div>
                  <div className="text-xs text-slate-500">10/8/2026 • 9:29:18 am</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r ' + item.color + ' text-black shadow-lg shadow-[#00F5C4]/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-slate-800/50 mt-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center shadow-lg flex-shrink-0">
                  <Package className="w-6 h-6 text-slate-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">Supplier User</div>
                  <div className="text-xs text-[#00F5C4] font-medium truncate">Planning & Inventory</div>
                </div>
              </div>
              <button 
                onClick={() => setShowLogoutDialog(true)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Header */}
        <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                aria-label="Toggle sidebar"
                title="Toggle sidebar"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h2 className="text-xl font-semibold text-white capitalize">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Overview'}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                title="Notifications"
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
              
              {/* System Status Indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">System Active</span>
              </div>
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                  title="Select Language"
                  aria-label="Select Language"
                >
                  <Languages className="w-4 h-4" />
                  <span className="text-sm font-medium">{systemLanguage}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showLanguageDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
                    <div className="p-2">
                      {['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Arabic', 'Portuguese', 'Russian'].map((language) => (
                        <button
                          key={language}
                          onClick={() => {
                            setSystemLanguage(language);
                            setShowLanguageDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            systemLanguage === language 
                              ? 'bg-[#00F5C4]/20 text-[#00F5C4]' 
                              : 'text-slate-300 hover:bg-slate-800/50'
                          }`}
                        >
                          {language}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors" title="Settings" aria-label="Settings">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-16 right-6 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl z-50">
            <div className="p-4 border-b border-slate-700/50">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">New order received</p>
                    <p className="text-xs text-slate-400 mt-1">Order #12345 has been placed</p>
                    <p className="text-xs text-slate-500 mt-2">2 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Inventory updated</p>
                    <p className="text-xs text-slate-400 mt-1">Stock levels have been refreshed</p>
                    <p className="text-xs text-slate-500 mt-2">1 hour ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Low stock alert</p>
                    <p className="text-xs text-slate-400 mt-1">Item SKU-789 is running low</p>
                    <p className="text-xs text-slate-500 mt-2">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-700/50">
              <button className="w-full py-2 px-4 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-medium text-sm">
                Mark all as read
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 p-6 min-h-screen">
          <div className="max-w-7xl mx-auto h-full">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Section 1 - Welcome Bar */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div>
                        <h1 className="text-2xl font-bold text-white">"Welcome Sir / Madam"</h1>
                        <p className="text-slate-400">Global Supply Chain Co.</p>
                      </div>
                    </div>
                                      </div>
                </div>

                {/* Section 2 - KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <Package className="w-8 h-8 text-blue-400" />
                      <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">+12%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">1,247</h3>
                    <p className="text-slate-400 text-sm">Total Orders Received</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                      <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">+8%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">1,189</h3>
                    <p className="text-slate-400 text-sm">Orders Fulfilled</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="w-8 h-8 text-yellow-400" />
                      <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">-5%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">58</h3>
                    <p className="text-slate-400 text-sm">Pending Orders</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                      <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">+3</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">12</h3>
                    <p className="text-slate-400 text-sm">Low Stock Items</p>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-8 h-8 text-[#00F5C4]" />
                      <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">+2.1%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">94.3%</h3>
                    <p className="text-slate-400 text-sm">Month's Performance</p>
                  </div>
                </div>

                {/* Section 3 - Inventory Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h2 className="text-lg font-semibold text-white mb-4">Current Stock Levels</h2>
                    <div className="space-y-3">
                      {mockProducts.slice(0, 5).map((product, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-white">{product.name}</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                product.stockLevel >= product.minStock ? 'bg-green-500/20 text-green-400' :
                                product.stockLevel >= product.minStock * 0.5 ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {product.stockLevel >= product.minStock ? 'HEALTHY' :
                                 product.stockLevel >= product.minStock * 0.5 ? 'LOW' : 'CRITICAL'}
                              </span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  product.stockLevel >= product.minStock ? 'bg-green-500' :
                                  product.stockLevel >= product.minStock * 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min((product.stockLevel / product.maxStock) * 100, 100)}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                              <span>{product.stockLevel} units</span>
                              <span>{product.maxStock} max</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h2 className="text-lg font-semibold text-white mb-4">AI Restock Suggestions</h2>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <div className="flex items-start gap-3">
                          <Brain className="w-5 h-5 text-[#00F5C4] mt-0.5" />
                          <div>
                            <p className="text-sm text-white mb-1">Order 200 units of Circuit Board A</p>
                            <p className="text-xs text-slate-400">Critical stock level - reorder immediately</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <div className="flex items-start gap-3">
                          <Brain className="w-5 h-5 text-yellow-400 mt-0.5" />
                          <div>
                            <p className="text-sm text-white mb-1">Increase Microcontroller B stock by 100 units</p>
                            <p className="text-xs text-slate-400">Based on 7-day demand forecast</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <div className="flex items-start gap-3">
                          <Brain className="w-5 h-5 text-blue-400 mt-0.5" />
                          <div>
                            <p className="text-sm text-white mb-1">Reduce Sensor Module C reorder to 300 units</p>
                            <p className="text-xs text-slate-400">Demand trending downward</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4 - Demand Forecast */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Demand Forecast</h2>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-slate-700 text-slate-300 rounded text-sm hover:bg-slate-600" aria-label="Show 7 days forecast" title="7 Days">7 Days</button>
                      <button className="px-3 py-1 bg-[#00F5C4] text-slate-900 rounded text-sm" aria-label="Show 15 days forecast" title="15 Days">15 Days</button>
                      <button className="px-3 py-1 bg-slate-700 text-slate-300 rounded text-sm hover:bg-slate-600" aria-label="Show 30 days forecast" title="30 Days">30 Days</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={demandForecast}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                          <XAxis dataKey="month" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                            labelStyle={{ color: '#f1f5f9' }}
                          />
                          <Line type="monotone" dataKey="actual" stroke="#00F5C4" strokeWidth={2} />
                          <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white mb-3">High Demand Products</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                          <span className="text-sm text-white">Circuit Board A</span>
                          <span className="text-xs text-green-400">+45%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                          <span className="text-sm text-white">Power Supply Units</span>
                          <span className="text-xs text-green-400">+32%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                          <span className="text-sm text-white">Microcontroller B</span>
                          <span className="text-xs text-yellow-400">+18%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5 - Active Orders */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Active Orders</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Order ID</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Product</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Quantity</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Deadline</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Status</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400 uppercase">Priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: 'ORD-001', product: 'Circuit Board A', quantity: 500, deadline: '2024-01-25', status: 'Processing', priority: 'Urgent' },
                          { id: 'ORD-002', product: 'Microcontroller B', quantity: 300, deadline: '2024-01-26', status: 'Dispatched', priority: 'Normal' },
                          { id: 'ORD-003', product: 'Sensor Module C', quantity: 150, deadline: '2024-01-27', status: 'Processing', priority: 'Normal' }
                        ].map((order, index) => (
                          <tr key={index} className="border-b border-slate-700">
                            <td className="py-3 px-4 text-sm text-white">{order.id}</td>
                            <td className="py-3 px-4 text-sm text-white">{order.product}</td>
                            <td className="py-3 px-4 text-sm text-white">{order.quantity}</td>
                            <td className="py-3 px-4 text-sm text-white">{order.deadline}</td>
                            <td className="py-3 px-4">
                              <span className={`text-xs px-2 py-1 rounded ${
                                order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                                order.status === 'Dispatched' ? 'bg-purple-500/20 text-purple-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`text-xs px-2 py-1 rounded ${
                                order.priority === 'Urgent' ? 'bg-red-500/20 text-red-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {order.priority}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 6 - Alerts & Notifications */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Alerts & Notifications</h2>
                  <div className="space-y-3">
                    {[
                      { type: 'low-stock', message: 'Circuit Board A is critically low - only 45 units remaining', time: '2 hours ago' },
                      { type: 'new-order', message: 'New order ORD-004 received for 200 units', time: '1 hour ago' },
                      { type: 'urgent-restock', message: 'Urgent restock needed for Microcontroller B', time: '30 mins ago' },
                      { type: 'deadline', message: 'Order ORD-001 deadline approaching in 2 days', time: '15 mins ago' }
                    ].map((alert, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <div className={`p-2 rounded-lg ${
                          alert.type === 'low-stock' ? 'bg-red-500/20' :
                          alert.type === 'new-order' ? 'bg-green-500/20' :
                          alert.type === 'urgent-restock' ? 'bg-yellow-500/20' :
                          'bg-blue-500/20'
                        }`}>
                          {alert.type === 'low-stock' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                          {alert.type === 'new-order' && <Package className="w-4 h-4 text-green-400" />}
                          {alert.type === 'urgent-restock' && <Zap className="w-4 h-4 text-yellow-400" />}
                          {alert.type === 'deadline' && <Calendar className="w-4 h-4 text-blue-400" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white mb-1">{alert.message}</p>
                          <p className="text-xs text-slate-400">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section7 - Performance Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h2 className="text-lg font-semibold text-white mb-4">Performance Metrics</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">On-time Delivery Rate</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-700 rounded-full">
                            <div className="w-[94%] h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-green-400 font-medium">94%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Order Fulfillment Rate</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-700 rounded-full">
                            <div className="w-[89%] h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-blue-400 font-medium">89%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Returns Rate</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-700 rounded-full">
                            <div className="w-[3.2%] h-2 bg-red-500 rounded-full"></div>
                          </div>
                          <span className="text-red-400 font-medium">3.2%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Rejection Rate</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-700 rounded-full">
                            <div className="w-[1.8%] h-2 bg-yellow-500 rounded-full"></div>
                          </div>
                          <span className="text-yellow-400 font-medium">1.8%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h2 className="text-lg font-semibold text-white mb-4">Monthly Performance Trend</h2>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={inventoryTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                        <XAxis dataKey="date" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                          labelStyle={{ color: '#f1f5f9' }}
                        />
                        <Line type="monotone" dataKey="level" stroke="#00F5C4" strokeWidth={2} name="Stock Level" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Section 8 - AI Recommendations */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
                  <h2 className="text-lg font-semibold text-white mb-4">AI Recommendations</h2>
                  <div className="space-y-3">
                    {[
                      { id: 1, type: 'stock-up', message: 'Stock up Circuit Board A - demand spike expected in 5 days', priority: 'high' },
                      { id: 2, type: 'supplier', message: 'Delay in raw material - plan alternate supplier', priority: 'medium' },
                      { id: 3, type: 'reduce-stock', message: 'Reduce Sensor Module C stock - demand dropping', priority: 'low' }
                    ].map((rec, index) => (
                      <div key={rec.id} className="flex items-start gap-3 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                        <div className={`p-2 rounded-lg ${
                          rec.priority === 'high' ? 'bg-red-500/20' :
                          rec.priority === 'medium' ? 'bg-yellow-500/20' :
                          'bg-green-500/20'
                        }`}>
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white mb-2">{rec.message}</p>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-[#00F5C4] text-slate-900 rounded text-sm hover:bg-[#00D4A8]" aria-label="Apply recommendation" title="Apply recommendation">
                              Apply
                            </button>
                            <button className="px-3 py-1 bg-slate-600 text-slate-300 rounded text-sm hover:bg-slate-500" aria-label="Dismiss recommendation" title="Dismiss recommendation">
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WOW Addition - Quick Actions & Live Chat */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <button className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex flex-col items-center gap-2" aria-label="Restock Now" title="Restock Now">
                        <RefreshCw className="w-6 h-6 text-[#00F5C4]" />
                        <span className="text-xs text-white">Restock Now</span>
                      </button>
                      <button className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex flex-col items-center gap-2" aria-label="Confirm Order" title="Confirm Order">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className="text-xs text-white">Confirm Order</span>
                      </button>
                      <button className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex flex-col items-center gap-2" aria-label="Contact Admin" title="Contact Admin">
                        <Users className="w-6 h-6 text-blue-400" />
                        <span className="text-xs text-white">Contact Admin</span>
                      </button>
                      <button className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex flex-col items-center gap-2" aria-label="View Reports" title="View Reports">
                        <BarChart3 className="w-6 h-6 text-purple-400" />
                        <span className="text-xs text-white">View Reports</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h2 className="text-lg font-semibold text-white mb-4">Supply Health Score</h2>
                    <div className="text-center">
                      <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                        <svg className="transform -rotate-90 w-32 h-32">
                          <circle cx="64" cy="64" r="56" stroke="#475569" strokeWidth="12" fill="none" />
                          <circle cx="64" cy="64" r="56" stroke="#00F5C4" strokeWidth="12" fill="none" 
                            strokeDasharray={`${2 * Math.PI * 56 * 0.87} ${2 * Math.PI * 56}`}
                            strokeLinecap="round" />
                        </svg>
                        <div className="absolute">
                          <span className="text-3xl font-bold text-white">87</span>
                          <span className="text-lg text-slate-400">/100</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">Overall Supply Chain Health</p>
                      <div className="flex gap-2 justify-center">
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Excellent</span>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">+5%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Chat Button */}
                <div className="fixed bottom-6 right-6 z-40">
                  <button 
                    onClick={() => setActiveTab('ai-assistant')}
                    className="p-4 bg-[#00F5C4] text-slate-900 rounded-full shadow-lg hover:bg-[#00D4A8] transition-all hover:scale-110 flex items-center gap-2" 
                    aria-label="Live Chat" 
                    title="Open AI Assistant"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">Live Chat</span>
                  </button>
                </div>

                {/* Software Updates Section */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                      <RefreshCw className="w-5 h-5 text-blue-400" />
                      System Updates
                    </h2>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentVersion === latestVersion 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {currentVersion === latestVersion ? 'Up to Date' : 'Update Available'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Version Info */}
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-white">Version</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Current</span>
                          <span className="text-white font-medium">{currentVersion}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Latest</span>
                          <span className="text-green-400 font-medium">{latestVersion}</span>
                        </div>
                      </div>
                      {currentVersion !== latestVersion && (
                        <button
                          onClick={handleUpdateNow}
                          disabled={updateInProgress}
                          className="w-full mt-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors disabled:bg-slate-600"
                        >
                          {updateInProgress ? 'Updating...' : 'Update'}
                        </button>
                      )}
                    </div>

                    {/* Sync Status */}
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-white">Sync Status</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Data Sync</span>
                          <div className="flex items-center gap-1">
                            {getSyncIcon()}
                            <span className="text-white">
                              {syncStatus === 'active' ? 'Active' : syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Last Sync</span>
                          <span className="text-white">{lastSync}</span>
                        </div>
                      </div>
                    </div>

                    {/* System Messages */}
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-white">Messages</span>
                      </div>
                      <div className="space-y-1">
                        {systemMessages.slice(0, 2).map((message) => (
                          <div key={message.id} className="flex items-center gap-1 text-xs">
                            <div>{getMessageIcon(message.type)}</div>
                            <span className="text-slate-300 truncate">{message.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        )}

        {/* Inventory Management Tab */}
        {activeTab === 'inventory' && <InventoryManagement />}

        {/* Parcel Tracking Tab */}
        {activeTab === 'parcel-tracking' && <SupplierParcelTracking />}

        {/* Smart Dispatch Tab */}
        {activeTab === 'smart-dispatch' && <Supplier_Smart_Dispatch />}

        {/* SCEF™ AI Tab */}
        {activeTab === 'scef' && <SCEFCommandCenter />}

        {/* Demand Forecast Tab */}
        {activeTab === 'forecasting' && <DemandForecast />}

        {/* Restocking Planner Tab */}
        {activeTab === 'restocking' && <RestockingPlanner />}

        {/* Warehouse Distribution Tab */}
        {activeTab === 'warehouses' && <WarehouseDistribution />}

        {/* Report Inbox Tab */}
        {activeTab === 'reports' && <SupplierReportInbox />}

        {/* Alerts & Notifications Tab */}
        {activeTab === 'alerts' && <AlertsNotifications />}

        {/* Analytics Dashboard Tab */}
        {activeTab === 'analytics' && <AnalyticsDashboard />}

        {/* Team Management Tab */}
        {activeTab === 'team-management' && <Supplier_Team_Management />}

        {/* AI Assistant Tab */}
        {activeTab === 'ai-assistant' && <AIAssistant />}

        {/* Drivers & Vehicles Tab */}
        {activeTab === 'drivers-vehicles' && <DriversAndVehicles />}

        {/* Activity & Audit Tab */}
        {activeTab === 'activity-audit' && <ActivityAuditReports />}

        {/* GSIN™ Network Tab */}
        {activeTab === 'gsin' && <GSINCommandCenter />}

        {/* GACIF™ Compliance Tab */}
        {activeTab === 'gacif' && <GACIFCommandCenter />}

        {/* Global Shipment Readiness™ Tab */}
        {activeTab === 'global-readiness' && <GlobalShipmentReadiness />}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Profile Header with WOW Features */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Package className="w-6 h-6 text-[#00F5C4]" />
                    🏭 Supplier Profile
                  </h3>
                  {profileData.verifiedBadge && (
                    <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium border border-green-500/30 flex items-center gap-1">
                      <span className="text-green-400">✅</span>
                      Verified
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors flex items-center gap-2"
                >
                  {isEditingProfile ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Quick Edit
                    </>
                  )}
                </button>
              </div>
              
              {/* AI Supply Health Score */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">AI Supply Health Score</div>
                      <div className="text-sm text-slate-300">Overall performance analysis</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{profileData.aiSupplyHealthScore}/100</div>
                    <div className="text-sm text-green-400">Excellent</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-300">
                  💡 <strong>Improvement Tips:</strong> Focus on reducing lead time by 2 days and expanding warehouse coverage in East India.
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg">
                    {userPhoto ? (
                      <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center">
                        <Package className="w-12 h-12 text-slate-900" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <label htmlFor="photo-upload" className="cursor-pointer flex items-center justify-center" aria-label="Upload company photo">
                      <Camera className="w-8 h-8 text-white" />
                      <span className="sr-only">Upload company photo</span>
                    </label>
                    <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <label htmlFor="company-name-input" className="sr-only">Company Name</label>
                    {isEditingProfile ? (
                      <input
                        id="company-name-input"
                        type="text"
                        value={profileData.companyName}
                        onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
                        className="text-2xl font-bold text-white bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-[#00F5C4]"
                        placeholder="Enter company name"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-white">{profileData.companyName}</h2>
                    )}
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs font-medium">
                      ID: {profileData.supplierId}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span>Active Since {profileData.activeSince}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⭐</span>
                      <span>{profileData.overallRating}/5.0 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1 - Basic Info */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#00F5C4]" />
                Section 1 — Basic Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Industry Type', value: profileData.industryType, key: 'industryType' },
                  { label: 'Contact Person', value: profileData.contactPerson, key: 'contactPerson' },
                  { label: 'Designation', value: profileData.designation, key: 'designation' },
                  { label: 'Email ID', value: profileData.email, key: 'email', type: 'email' },
                  { label: 'Phone Number', value: profileData.phone, key: 'phone', type: 'tel' },
                  { label: 'Alternate Phone', value: profileData.alternatePhone, key: 'alternatePhone', type: 'tel' },
                  { label: 'Website URL', value: profileData.website, key: 'website' },
                  { label: 'Preferred Language', value: profileData.preferredLanguage, key: 'preferredLanguage', type: 'select', options: ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Arabic', 'Portuguese', 'Russian'] },
                  { label: 'Alternate Language', value: profileData.alternateLanguage, key: 'alternateLanguage', type: 'select', options: ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Arabic', 'Portuguese', 'Russian', 'None'] }
                ].map((field) => (
                  <div key={field.key} className="space-y-1">
                    <label htmlFor={field.key} className="text-sm font-medium text-slate-400">{field.label}</label>
                    {isEditingProfile ? (
                      field.type === 'select' ? (
                        <select
                          id={field.key}
                          value={field.value}
                          onChange={(e) => setProfileData({...profileData, [field.key]: e.target.value})}
                          className="w-full text-white font-medium bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00F5C4]"
                        >
                          {field.options?.map((option) => (
                            <option key={option} value={option} className="bg-slate-800">{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.key}
                          type={field.type || 'text'}
                          value={field.value}
                          onChange={(e) => setProfileData({...profileData, [field.key]: e.target.value})}
                          className="w-full text-white font-medium bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00F5C4]"
                        />
                      )
                    ) : (
                      <div className="text-white font-medium">{field.value}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2 - Business Details */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#00F5C4]" />
                Section 2 — Business Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Business Registration Number', value: profileData.businessRegNumber, key: 'businessRegNumber' },
                  { label: 'GST Number', value: profileData.gstNumber, key: 'gstNumber' },
                  { label: 'PAN Number', value: profileData.panNumber, key: 'panNumber' },
                  { label: 'Year of Establishment', value: profileData.yearEstablished, key: 'yearEstablished' },
                  { label: 'Company Size', value: profileData.companySize, key: 'companySize' },
                  { label: 'Annual Supply Capacity', value: profileData.annualSupplyCapacity, key: 'annualSupplyCapacity' }
                ].map((field) => (
                  <div key={field.key} className="space-y-1">
                    <label htmlFor={field.key} className="text-sm font-medium text-slate-400">{field.label}</label>
                    {isEditingProfile ? (
                      <input
                        id={field.key}
                        type="text"
                        value={field.value}
                        onChange={(e) => setProfileData({...profileData, [field.key]: e.target.value})}
                        className="w-full text-white font-medium bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00F5C4]"
                      />
                    ) : (
                      <div className="text-white font-medium">{field.value}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 - Location Info */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-[#00F5C4]" />
                Section 3 — Location Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[
                    { label: 'Headquarters Address', value: profileData.headquartersAddress, key: 'headquartersAddress' },
                    { label: 'City', value: profileData.city, key: 'city' },
                    { label: 'State', value: profileData.state, key: 'state' },
                    { label: 'Country', value: profileData.country, key: 'country' },
                    { label: 'PIN Code', value: profileData.pinCode, key: 'pinCode' }
                  ].map((field) => (
                    <div key={field.key} className="space-y-1">
                      <label htmlFor={field.key} className="text-sm font-medium text-slate-400">{field.label}</label>
                      {isEditingProfile ? (
                        <input
                          id={field.key}
                          type="text"
                          value={field.value}
                          onChange={(e) => setProfileData({...profileData, [field.key]: e.target.value})}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          className="w-full text-white font-medium bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00F5C4]"
                        />
                      ) : (
                        <div className="text-white font-medium">{field.value}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-400 block mb-2">Warehouse Locations</label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.warehouseLocations.map((location, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30">
                          📍 {location}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400 block mb-2">Serviceable Regions/Zones</label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.serviceableRegions.map((region, index) => (
                        <span key={index} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium border border-green-500/30">
                          🌍 {region}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 - Supply Details */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#00F5C4]" />
                Section 4 — Supply Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-400 block mb-2">Product Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.productCategories.map((category, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium border border-purple-500/30">
                          📦 {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400 block mb-2">Top Products</label>
                    <div className="grid grid-cols-2 gap-2">
                      {profileData.topProducts.map((product, index) => (
                        <div key={index} className="px-3 py-2 bg-slate-700/50 rounded-lg border border-slate-600 text-sm text-white">
                          🏆 {product}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Minimum Order Quantity', value: profileData.minimumOrderQuantity, key: 'minimumOrderQuantity' },
                    { label: 'Lead Time', value: profileData.leadTime, key: 'leadTime' },
                    { label: 'Preferred Payment Terms', value: profileData.preferredPaymentTerms, key: 'preferredPaymentTerms' }
                  ].map((field) => (
                    <div key={field.key} className="space-y-1">
                      <label htmlFor={field.key} className="text-sm font-medium text-slate-400">{field.label}</label>
                      {isEditingProfile ? (
                        <input
                          id={field.key}
                          type="text"
                          value={field.value}
                          onChange={(e) => setProfileData({...profileData, [field.key]: e.target.value})}
                          className="w-full text-white font-medium bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00F5C4]"
                        />
                      ) : (
                        <div className="text-white font-medium">{field.value}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 5 - Documents */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#00F5C4]" />
                Section 5 — Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${profileData.documents.businessRegistration ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {profileData.documents.businessRegistration ? '✓' : '✗'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Business Registration Certificate</div>
                        <div className="text-xs text-slate-400">{profileData.documents.businessRegistration ? 'Verified' : 'Pending'}</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-[#00F5C4] text-slate-900 rounded text-xs font-medium" aria-label="Upload business registration certificate" title="Upload business registration certificate">Upload</button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${profileData.documents.gstCertificate ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {profileData.documents.gstCertificate ? '✓' : '✗'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">GST Certificate</div>
                        <div className="text-xs text-slate-400">{profileData.documents.gstCertificate ? 'Verified' : 'Pending'}</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-[#00F5C4] text-slate-900 rounded text-xs font-medium" aria-label="Upload GST certificate" title="Upload GST certificate">Upload</button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-white mb-2">Quality Certifications</div>
                    <div className="flex flex-wrap gap-2">
                      {profileData.documents.isoCertifications.map((cert, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30">
                          🏅 {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="text-sm font-medium text-white mb-1">Bank Details</div>
                    <div className="text-xs text-slate-400">{profileData.documents.bankDetails}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 - Performance Stats */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#00F5C4]" />
                Section 6 — Performance Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Overall Rating</span>
                    <span className="text-yellow-400">⭐</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{profileData.overallRating}/5.0</div>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">On-time Delivery</span>
                    <span className="text-green-400">📈</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">{profileData.onTimeDeliveryRate}%</div>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Order Fulfillment</span>
                    <span className="text-blue-400">✓</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">{profileData.orderFulfillmentRate}%</div>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Return Rate</span>
                    <span className="text-red-400">↘️</span>
                  </div>
                  <div className="text-2xl font-bold text-red-400">{profileData.returnRejectionRate}%</div>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Total Orders</span>
                    <span className="text-purple-400">📊</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">{profileData.totalOrdersCompleted}</div>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Active Since</span>
                    <span className="text-[#00F5C4]">📅</span>
                  </div>
                  <div className="text-sm font-bold text-[#00F5C4]">{profileData.activeSince}</div>
                </div>
              </div>
            </div>

            {/* Section 7 - Notification Preferences */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#00F5C4]" />
                Section 7 — Notification Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {[
                    { key: 'newOrderAlerts' as NotificationKey, label: 'New order alerts', icon: '📦' },
                    { key: 'lowStockAlerts' as NotificationKey, label: 'Low stock alerts', icon: '⚠️' },
                    { key: 'demandForecastAlerts' as NotificationKey, label: 'Demand forecast alerts', icon: '📈' },
                    { key: 'paymentAlerts' as NotificationKey, label: 'Payment alerts', icon: '💰' }
                  ].map((alert) => (
                    <div key={alert.key} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{alert.icon}</span>
                        <span className="text-sm font-medium text-white">{alert.label}</span>
                      </div>
                      <label htmlFor={`notification-${alert.key}`} className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id={`notification-${alert.key}`}
                          checked={profileData.notifications[alert.key]}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            notifications: {...profileData.notifications, [alert.key]: e.target.checked}
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00F5C4]"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-slate-400 block mb-2">Preferred Channel</label>
                    <div className="flex gap-2">
                      {['Email', 'SMS', 'Both'].map((channel) => (
                        <button
                          key={channel}
                          onClick={() => setProfileData({...profileData, notifications: {...profileData.notifications, preferredChannel: channel}})}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            profileData.notifications.preferredChannel === channel
                              ? 'bg-[#00F5C4] text-slate-900'
                              : 'bg-slate-700/50 text-white hover:bg-slate-700'
                          }`}
                        >
                          {channel === 'Both' ? '📧📱 Both' : channel === 'Email' ? '📧 Email' : '📱 SMS'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8 - Security Settings */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00F5C4]" />
                Section 8 — Security Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="text-sm font-medium text-white mb-1">Last Login</div>
                    <div className="text-xs text-slate-400">{profileData.lastLogin}</div>
                  </div>
                  <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="text-sm font-medium text-white mb-1">Active Sessions</div>
                    <div className="text-xs text-slate-400">{profileData.activeSessions} devices</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="text-sm font-medium text-white mb-1">Change Password</div>
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium border border-blue-500/30" aria-label="Update password" title="Update password">Update Password</button>
                  </div>
                  <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="text-sm font-medium text-white mb-1">2FA Settings</div>
                    <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium border border-green-500/30" aria-label="Enable two-factor authentication" title="Enable two-factor authentication">Enable 2FA</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9 - Bank & Payment Info */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#00F5C4]" />
                Section 9 — Bank & Payment Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Bank Name', value: profileData.bankName, key: 'bankName' },
                  { label: 'Account Number', value: profileData.accountNumber, key: 'accountNumber' },
                  { label: 'IFSC Code', value: profileData.ifscCode, key: 'ifscCode' },
                  { label: 'Payment Method Preference', value: profileData.paymentMethodPreference, key: 'paymentMethodPreference' }
                ].map((field) => (
                  <div key={field.key} className="space-y-1">
                    <label htmlFor={field.key} className="text-sm font-medium text-slate-400">{field.label}</label>
                    {isEditingProfile ? (
                      <input
                        id={field.key}
                        type="text"
                        value={field.value}
                        onChange={(e) => setProfileData({...profileData, [field.key]: e.target.value})}
                        className="w-full text-white font-medium bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00F5C4]"
                      />
                    ) : (
                      <div className="text-white font-medium">{field.value}</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                <button className="w-full px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors" aria-label="View invoice history" title="View invoice history">
                  📄 View Invoice History
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button 
                    onClick={() => setShowDocumentsDialog(true)}
                    className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                    aria-label="Manage documents"
                    title="Manage documents"
                  >
                    📁 Manage Documents
                  </button>
                  <button 
                    onClick={() => setShowSecurityDialog(true)}
                    className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg font-medium border border-orange-500/30 hover:bg-orange-500/30 transition-colors"
                    aria-label="Security settings"
                    title="Security settings"
                  >
                    🔒 Security Settings
                  </button>
                  <button 
                    onClick={() => setShowPerformanceDialog(true)}
                    className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium border border-green-500/30 hover:bg-green-500/30 transition-colors"
                    aria-label="View full performance report"
                    title="View full performance report"
                  >
                    📊 View Full Performance Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
          </div>
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <AnimatePresence>
        {showLogoutDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowLogoutDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <LogOut className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Confirm Logout</h3>
                  <p className="text-sm text-slate-400">Are you sure you want to logout?</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutDialog(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700/70 transition-colors"
                  aria-label="Cancel logout"
                  title="Cancel logout"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setShowLogoutDialog(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition-colors"
                  aria-label="Confirm logout"
                  title="Confirm logout"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Documents Management Dialog */}
        <AnimatePresence>
          {showDocumentsDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowDocumentsDialog(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                    📁 Manage Documents
                  </h3>
                  <button
                    onClick={() => setShowDocumentsDialog(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label="Close documents dialog"
                    title="Close documents dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-medium text-white mb-2">📋 Business Documents</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex items-center justify-between">
                          <span>GST Registration</span>
                          <span className="text-green-400">✓ Verified</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>PAN Card</span>
                          <span className="text-green-400">✓ Verified</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Trade License</span>
                          <span className="text-yellow-400">⚠ Pending</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-medium text-white mb-2">📦 Supply Chain Docs</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex items-center justify-between">
                          <span>Quality Certificates</span>
                          <span className="text-green-400">✓ Active</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Insurance Policy</span>
                          <span className="text-green-400">✓ Active</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Warehouse Agreements</span>
                          <span className="text-green-400">✓ Active</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-colors">
                      📤 Upload New Document
                    </button>
                    <button className="flex-1 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg font-medium hover:bg-slate-700/70 transition-colors">
                      📥 Download All
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security Settings Dialog */}
        <AnimatePresence>
          {showSecurityDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowSecurityDialog(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                    🔒 Security Settings
                  </h3>
                  <button
                    onClick={() => setShowSecurityDialog(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label="Close security dialog"
                    title="Close security dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-medium text-white mb-4">🔐 Authentication</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-slate-400">Add an extra layer of security</p>
                        </div>
                        <button className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm border border-orange-500/30 hover:bg-orange-500/30">
                          Enable
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Password Strength</p>
                          <p className="text-sm text-slate-400">Current: Strong</p>
                        </div>
                        <button className="px-3 py-1 bg-slate-600/50 text-slate-300 rounded-lg text-sm hover:bg-slate-600/70">
                          Change
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-medium text-white mb-4">📱 Session Management</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Active Sessions</p>
                          <p className="text-sm text-slate-400">2 devices currently logged in</p>
                        </div>
                        <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm border border-red-500/30 hover:bg-red-500/30">
                          View All
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Login Alerts</p>
                          <p className="text-sm text-slate-400">Get notified of new logins</p>
                        </div>
                        <label htmlFor="login-notifications" className="relative inline-flex items-center cursor-pointer">
                          <span className="sr-only">Get notified of new logins</span>
                          <input 
                            type="checkbox" 
                            id="login-notifications"
                            className="sr-only peer" 
                            defaultChecked 
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg font-medium border border-orange-500/30 hover:bg-orange-500/30 transition-colors">
                      💾 Save Changes
                    </button>
                    <button className="flex-1 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg font-medium hover:bg-slate-700/70 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Performance Report Dialog */}
        <AnimatePresence>
          {showPerformanceDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowPerformanceDialog(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                    📊 Full Performance Report
                  </h3>
                  <button
                    onClick={() => setShowPerformanceDialog(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label="Close performance dialog"
                    title="Close performance dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-sm">Overall Score</span>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">94.5%</div>
                      <div className="text-xs text-green-400">+2.3% from last month</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-sm">On-Time Delivery</span>
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">98.2%</div>
                      <div className="text-xs text-blue-400">156/159 orders</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-sm">Quality Rating</span>
                        <Activity className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-2xl font-bold text-white">4.8/5.0</div>
                      <div className="text-xs text-purple-400">Based on 89 reviews</div>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-medium text-white mb-4">📈 Monthly Performance Trends</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={demandForecast}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                        <Area type="monotone" dataKey="actual" stroke="#00f5c4" fill="#00f5c4" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-medium text-white mb-4">🎯 Key Metrics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-slate-400 text-sm">Avg. Lead Time</p>
                        <p className="text-lg font-semibold text-white">3.2 days</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Order Accuracy</p>
                        <p className="text-lg font-semibold text-white">99.1%</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Return Rate</p>
                        <p className="text-lg font-semibold text-white">1.2%</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Response Time</p>
                        <p className="text-lg font-semibold text-white">1.8 hrs</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium border border-green-500/30 hover:bg-green-500/30 transition-colors" aria-label="Export performance report" title="Export performance report">
                      📥 Export Report
                    </button>
                    <button className="flex-1 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg font-medium hover:bg-slate-700/70 transition-colors" aria-label="Email performance report" title="Email performance report">
                      📧 Email Report
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

                </AnimatePresence>
      </AnimatePresence>
    </div>
  );
}
