import { useState, useEffect } from 'react';
import { LayoutDashboard, Store, Brain, Menu, X, Layers, Bot, Leaf, RefreshCw, LogOut, Bell, User, BarChart3, Settings, Package, Gauge, Satellite, MessageCircle, Users, Truck, AlertTriangle, Clock, MessageSquare, Database, Shield, Globe, Building2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { LiveMap } from './components/LiveMap';
import { KPICards } from './components/KPICards';
import { AlertsPanel } from './components/AlertsPanel';
import { AIRecommendations } from './components/AIRecommendations';
import { InventoryDashboard } from './components/InventoryDashboard';
import { SupplierInterface } from './components/SupplierInterface';
import { SimulationEngine } from './components/SimulationEngine';
import { DigitalTwin } from './components/DigitalTwin';
import { MultiAgentAI } from './components/MultiAgentAI';
import { SustainabilityDashboard } from './components/SustainabilityDashboard';
import { SelfLearning } from './components/SelfLearning';
import { LoginPage } from './components/LoginPage';
import { WelcomePage } from './components/WelcomePage';
import { AdminControls } from './components/AdminControls';
import { InventoryManagement } from './components/InventoryManagement';
import { TeamCoordination } from './components/TeamCoordination';
import { SystemOptimization } from './components/SystemOptimization';
import { SystemStatusBar } from './components/SystemStatusBar';
import { DisruptionRadar } from './components/DisruptionRadar';
import { AdminProfile } from './components/AdminProfile';
import { AILogisticsCopilot } from './components/AILogisticsCopilot';
import { ExplainTheFuture } from './components/ExplainTheFuture';
import { LiveExternalIntelligence } from './components/LiveExternalIntelligence';
import { SmartDeliverySlotPrediction } from './components/SmartDeliverySlotPrediction';
import { ProfessionalIntro } from './components/ProfessionalIntro';
import { OTPVerificationPage } from './components/OTPVerificationPage';
import { VehicleDetailPage } from './components/VehicleDetailPage';
import { SupplierPortal } from './components/supplier';
import { Supplier_Team_Management } from './components/supplier/Supplier_Team_Management';
import { DriverReportInbox } from './components/Driver_Report_Inbox';
import { Admin_Software_Update_Center } from './components/Admin_Software_Update_Center';
import { NetworkAutopilot } from './components/NetworkAutopilot';
import { AIChat } from '../AIChat';
import { TimeMachineDashboard } from './components/TimeMachine/TimeMachineDashboard';
import { MultiAgentDebateDashboard } from './components/MultiAgentDebate/MultiAgentDebateDashboard';
import { CognitiveMemoryDashboard } from './components/CognitiveMemory/CognitiveMemoryDashboard';
import { ImmuneSystemDashboard } from './components/ImmuneSystem/ImmuneSystemDashboard';
import { GASDFDashboard } from './components/GASDF/GASDFDashboard';
import { SupplierIntelligence } from './components/admin/SupplierIntelligence';
import { ToastContainer } from './components/ui/Toast';

type View = 'admin' | 'supplier' | 'digital-twin' | 'multi-agent' | 'sustainability' | 'self-learning' | 'profile' | 'admin-controls' | 'inventory-management' | 'system-optimization' | 'ai-copilot' | 'team-coordination' | 'team-management' | 'vehicle-detail' | 'driver-reports' | 'software-update-center' | 'network-autopilot' | 'time-machine' | 'agent-debate' | 'cognitive-memory' | 'immune-system' | 'gasdf' | 'supplier-intelligence' | 'intro';

interface User {
  userId: string;
  email: string;
  role: string;
  name: string;
  loginTime?: number; // Optional timestamp for session management
}

const performanceData = [
  { time: '00:00', efficiency: 82, delays: 12, costs: 4500 },
  { time: '04:00', efficiency: 85, delays: 8, costs: 4200 },
  { time: '08:00', efficiency: 91, delays: 5, costs: 3800 },
  { time: '12:00', efficiency: 94, delays: 3, costs: 3500 },
  { time: '16:00', efficiency: 92, delays: 4, costs: 3700 },
  { time: '20:00', efficiency: 88, delays: 7, costs: 4100 },
];

export default function App() {
  const [activeView, setActiveView] = useState<View>('admin');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showExternalIntelligence, setShowExternalIntelligence] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  useEffect(() => {
    // Force login on every refresh for security
    // Remove any stored session and always show login page
    localStorage.removeItem('smartchain_user');
    setUser(null);
    setMounted(true);
  }, []);

  const handleLogin = (userData: User) => {
    // Store pending user data and show OTP verification
    setPendingUser(userData);
    setShowOTPVerification(true);
  };

  const handleOTPVerified = (userData: User) => {
    userData.loginTime = Date.now();
    setUser(userData);
    // Don't store in localStorage for demo security
    // localStorage.setItem('smartchain_user', JSON.stringify(userData));
    setShowOTPVerification(false);
    setPendingUser(null);
    
    // If user is supplier, skip welcome and go directly to supplier portal
    if (userData.role === 'supplier') {
      setHasSeenWelcome(true);
    }
  };

  const handleBackToLogin = () => {
    setShowOTPVerification(false);
    setPendingUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('smartchain_user');
    setUser(null);
    setHasSeenWelcome(false);
    setHasSeenIntro(false);
    // Redirect to login page after logout
    window.location.href = '/login';
  };

  const handleIntroProceed = () => {
    setHasSeenIntro(true);
  };

  const handleWelcomeProceed = () => {
    setHasSeenWelcome(true);
  };

  // Filter views based on user role
  const getAvailableViews = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'admin':
        return views;
      case 'supplier':
        return views.filter(v => ['supplier', 'team-management'].includes(v.id));
      default:
        return [];
    }
  };

  if (!mounted) return null;

  // Show intro page first if not seen yet
  if (!hasSeenIntro) {
    return <ProfessionalIntro onProceed={handleIntroProceed} />;
  }

  // Show OTP verification page if needed
  if (showOTPVerification && pendingUser) {
    return (
      <OTPVerificationPage
        email={pendingUser.email}
        role={pendingUser.role}
        userId={pendingUser.userId}
        name={pendingUser.name}
        onOTPVerified={handleOTPVerified}
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  // Show login page if not authenticated
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show welcome page if authenticated but haven't seen welcome yet
  if (!hasSeenWelcome) {
    return <WelcomePage onProceed={handleWelcomeProceed} />;
  }

  // Show supplier portal if user role is supplier
  if (user.role === 'supplier') {
    return <SupplierPortal onLogout={handleLogout} />;
  }

  const views = [
    { id: 'admin' as View, name: 'Dashboard', icon: LayoutDashboard, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'admin-controls' as View, name: 'Control Center', icon: Settings, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'inventory-management' as View, name: 'Inventory', icon: Package, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'system-optimization' as View, name: 'System Optimization', icon: Gauge, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'digital-twin' as View, name: 'Digital Twin', icon: Layers, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'multi-agent' as View, name: 'Multi-Agent AI', icon: Bot, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'agent-debate' as View, name: 'Agent Debate', icon: MessageSquare, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'cognitive-memory' as View, name: 'Cognitive Memory', icon: Database, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'immune-system' as View, name: 'Immune System', icon: Shield, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'sustainability' as View, name: 'Sustainability', icon: Leaf, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'self-learning' as View, name: 'Self-Learning', icon: RefreshCw, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'time-machine' as View, name: 'Time Machine', icon: Clock, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'supplier' as View, name: 'LogiCortex AI Supplier Portal', icon: Store, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'team-coordination' as View, name: 'Team Coordination', icon: Users, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'team-management' as View, name: 'Team Management', icon: Users, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'ai-copilot' as View, name: 'Logistics Assistant', icon: MessageCircle, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'vehicle-detail' as View, name: 'Vehicle Details', icon: Truck, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'driver-reports' as View, name: 'Driver Reports', icon: AlertTriangle, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'software-update-center' as View, name: 'Software Update Center', icon: RefreshCw, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'network-autopilot' as View, name: 'Network Autopilot', icon: Brain, color: 'from-purple-500 to-purple-600' },
    { id: 'gasdf' as View, name: 'GASDF™', icon: Globe, color: 'from-purple-500 to-purple-600' },
    { id: 'supplier-intelligence' as View, name: 'Supplier Intelligence', icon: Building2, color: 'from-[#00F5C4] to-[#00D4A8]' },
    { id: 'profile' as View, name: 'Admin Profile', icon: User, color: 'from-[#00F5C4] to-[#00D4A8]' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 flex flex-col"
          >
            {/* Logo & Header */}
            <div className="p-6 border-b border-slate-800/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">LogiCortex AI</h1>
                  <p className="text-xs text-slate-400">Supply Chain Intelligence</p>
                </div>
              </div>

              {/* User Info */}
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-xs text-slate-400 capitalize">{user.role}</div>
                  </div>
                </div>
                
                {/* Company Name */}
                <div className="mb-3 pb-2 border-b border-slate-700/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-xs text-slate-500">Company:</span>
                    <span className="text-xs font-medium text-cyan-300">LogiCortex Logistics Ltd.</span>
                  </div>
                </div>
                
                {/* Company Details */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-slate-500">Branch:</span>
                    <span className="text-slate-300">Mumbai HQ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-slate-500">Area:</span>
                    <span className="text-slate-300">Western Region</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span className="text-slate-500">Department:</span>
                    <span className="text-slate-300">Logistics Ops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <span className="text-slate-500">Zone:</span>
                    <span className="text-slate-300">Zone A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {getAvailableViews().map((view) => {
                const Icon = view.icon;
                const isActive = activeView === view.id;

                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r ' + view.color + ' text-black shadow-lg shadow-[#00F5C4]/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{view.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Footer Stats */}
            <div className="p-4 border-t border-slate-800/50">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-slate-400">System Status</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Active Routes</span>
                    <span className="text-white font-semibold">24</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Warehouses</span>
                    <span className="text-white font-semibold">8</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">AI Efficiency</span>
                    <span className="text-green-400 font-semibold">94.2%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="p-4 border-t border-slate-800/50">
              <button
                onClick={() => setShowLogoutDialog(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-slate-900/30 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {activeView === 'admin' ? 'Welcome' : views.find(v => v.id === activeView)?.name}
                </h2>
                <p className="text-sm text-slate-400">Real-time logistics intelligence platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SystemStatusBar />
              {/* External Intelligence Feed */}
              <div className="relative">
                <button 
                  onClick={() => setShowExternalIntelligence(!showExternalIntelligence)}
                  className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all" 
                  title="Live Intelligence Feed"
                >
                  <Satellite className="w-5 h-5" />
                </button>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>

              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all" 
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                </button>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              </div>
                          </div>
          </div>
        </header>

        {/* Notification Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-20 right-6 w-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl z-50"
            >
              <div className="p-4 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
                    aria-label="Close notifications"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {/* Notification Items */}
                <div className="p-4 space-y-3">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">High Priority Alert</div>
                        <div className="text-xs text-slate-400 mt-1">Route R002 delayed by 2 hours due to traffic congestion</div>
                        <div className="text-xs text-slate-500 mt-2">2 minutes ago</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">Inventory Warning</div>
                        <div className="text-xs text-slate-400 mt-1">Warehouse B capacity at 85% - consider redistribution</div>
                        <div className="text-xs text-slate-500 mt-2">15 minutes ago</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">System Update</div>
                        <div className="text-xs text-slate-400 mt-1">AI recommendations engine updated to v2.1</div>
                        <div className="text-xs text-slate-500 mt-2">1 hour ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-slate-700/50">
                <button className="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Mark all as read
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            {activeView === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Welcome Greeting */}
                <div className="bg-gradient-to-r from-[#00F5C4]/10 to-[#00D4A8]/10 rounded-xl p-6 border border-[#00F5C4]/20">
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Nice to see you Sir/Madam, hope you have a nice day
                  </h1>
                  <p className="text-slate-400">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                {/* KPI Cards */}
                <KPICards />

                {/* Live Map - Full Width */}
                <div className="h-[800px]">
                  <LiveMap />
                </div>

                {/* Performance Analytics & Real-Time Alerts - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Analytics */}
                  <div className="h-[400px]">
                    <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/30 h-full">
                      <div className="flex items-start gap-3 mb-4">
                        <BarChart3 className="w-6 h-6 text-green-400 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Performance Analytics</h3>
                          <p className="text-sm text-slate-400 mb-4">
                            Real-time performance metrics and trends
                          </p>
                        </div>
                      </div>

                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="time" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                color: '#fff'
                              }}
                            />
                            <Area type="monotone" dataKey="efficiency" stroke="#22c55e" fill="#22c55e/50" />
                            <Area type="monotone" dataKey="delays" stroke="#ef4444" fill="#ef4444/50" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Real-Time Alerts */}
                  <div className="h-[400px]">
                    <AlertsPanel />
                  </div>
                </div>

                {/* Disruption Radar - Below Map */}
                <div className="mt-6">
                  <DisruptionRadar />
                </div>

                {/* AI Recommendations */}
                <div className="mt-6">
                  <AIRecommendations />
                </div>

                {/* AI Chat Assistant */}
                <AIChat />

                {/* Integrated Dashboard with AI Recommendations & Inventory Status */}
                <div className="h-[900px]">
                  <InventoryDashboard />
                </div>
              </motion.div>
            )}

            {activeView === 'admin-controls' && (
              <motion.div
                key="admin-controls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <AdminControls />
                
                {/* Explain the Future Panel - Below Admin Controls */}
                <div className="h-[600px]">
                  <ExplainTheFuture />
                </div>
              </motion.div>
            )}

            {activeView === 'inventory-management' && (
              <motion.div
                key="inventory-management"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <InventoryManagement />
              </motion.div>
            )}

            {activeView === 'system-optimization' && (
              <motion.div
                key="system-optimization"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SystemOptimization />
              </motion.div>
            )}

            {activeView === 'ai-copilot' && (
              <motion.div
                key="ai-copilot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AILogisticsCopilot />
              </motion.div>
            )}

            {activeView === 'team-coordination' && (
              <motion.div
                key="team-coordination"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TeamCoordination />
              </motion.div>
            )}

            {activeView === 'team-management' && (
              <motion.div
                key="team-management"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Supplier_Team_Management />
              </motion.div>
            )}

            
            {activeView === 'supplier' && (
              <motion.div
                key="supplier"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <div className="lg:col-span-2">
                  <SupplierInterface />
                </div>
                <div className="lg:col-span-1">
                  <div className="h-[900px]">
                    <SmartDeliverySlotPrediction />
                  </div>
                </div>
              </motion.div>
            )}

            
            {activeView === 'digital-twin' && (
              <motion.div
                key="digital-twin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <DigitalTwin />
                
                {/* What-If Simulation Engine */}
                <div>
                  <SimulationEngine />
                </div>
              </motion.div>
            )}

            {activeView === 'multi-agent' && (
              <motion.div
                key="multi-agent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MultiAgentAI />
              </motion.div>
            )}

            {activeView === 'sustainability' && (
              <motion.div
                key="sustainability"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SustainabilityDashboard />
              </motion.div>
            )}

            {activeView === 'self-learning' && (
              <motion.div
                key="self-learning"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SelfLearning />
              </motion.div>
            )}

            
            {activeView === 'vehicle-detail' && (
              <motion.div
                key="vehicle-detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <VehicleDetailPage 
                  vehicle={{
                    id: 'VH-001',
                    registrationNumber: 'MH-12-AB-1234',
                    vehicleType: 'truck',
                    brand: 'Tata',
                    model: 'Ace',
                    capacity: {
                      weight: 1500,
                      volume: 8
                    },
                    fuelType: 'diesel',
                    status: 'active',
                    currentLocation: {
                      latitude: 19.0760,
                      longitude: 72.8777,
                      address: 'Mumbai, Maharashtra'
                    },
                    assignedDriver: {
                      id: 'DRV-001',
                      name: 'Rajesh Kumar',
                      phone: '+91 98765 43210',
                      licenseNumber: 'MH-12-2023-001234'
                    },
                    assignedRoute: 'Route A-001: Warehouse A → Distribution Center B',
                    currentSpeed: 65,
                    performance: {
                      totalTrips: 1247,
                      totalDistance: 45680,
                      fuelEfficiency: 12.5,
                      averageDeliveryTime: 45,
                      onTimeDeliveryRate: 94
                    },
                    maintenance: {
                      lastServiceDate: '2024-01-15',
                      nextServiceDue: '2024-04-15',
                      insuranceExpiry: '2024-12-31',
                      pollutionCertificateExpiry: '2024-11-30',
                      breakdownHistory: [
                        {
                          date: '2023-12-01',
                          issue: 'Engine Oil Leak',
                          cost: 2500,
                          daysDowntime: 2
                        },
                        {
                          date: '2023-09-15',
                          issue: 'Brake Pad Replacement',
                          cost: 1800,
                          daysDowntime: 1
                        }
                      ]
                    },
                    aiInsights: {
                      predictedMaintenanceAlert: true,
                      fuelConsumptionAnomaly: false,
                      riskScore: 25,
                      recommendations: [
                        'Schedule oil change in next 500km based on current usage patterns',
                        'Consider route optimization to improve fuel efficiency by 8%',
                        'Monitor tire pressure - currently 15% below optimal levels'
                      ]
                    }
                  }}
                  onBack={() => setActiveView('admin-controls')}
                />
              </motion.div>
            )}

            {activeView === 'driver-reports' && (
              <motion.div
                key="driver-reports"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DriverReportInbox />
              </motion.div>
            )}

            {activeView === 'software-update-center' && (
              <motion.div
                key="software-update-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Admin_Software_Update_Center />
              </motion.div>
            )}

            {activeView === 'network-autopilot' && (
              <motion.div
                key="network-autopilot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <NetworkAutopilot />
              </motion.div>
            )}

            {activeView === 'time-machine' && (
              <motion.div
                key="time-machine"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TimeMachineDashboard />
              </motion.div>
            )}

            {activeView === 'agent-debate' && (
              <motion.div
                key="agent-debate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MultiAgentDebateDashboard />
              </motion.div>
            )}

            {activeView === 'cognitive-memory' && (
              <motion.div
                key="cognitive-memory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CognitiveMemoryDashboard />
              </motion.div>
            )}

            {activeView === 'immune-system' && (
              <motion.div
                key="immune-system"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ImmuneSystemDashboard />
              </motion.div>
            )}

            {activeView === 'gasdf' && (
              <motion.div
                key="gasdf"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GASDFDashboard />
              </motion.div>
            )}

            {activeView === 'supplier-intelligence' && (
              <motion.div
                key="supplier-intelligence"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SupplierIntelligence />
              </motion.div>
            )}

            {activeView === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <AdminProfile />
              </motion.div>
            )}
          </AnimatePresence>
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
              transition={{ type: "spring", damping: 20 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 max-w-md w-full mx-4"
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
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowLogoutDialog(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* External Intelligence Feed Modal */}
      <AnimatePresence>
        {showExternalIntelligence && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExternalIntelligence(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-4xl h-[600px] max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full">
                <button
                  onClick={() => setShowExternalIntelligence(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
                  aria-label="Close external intelligence feed"
                >
                  ×
                </button>
                <LiveExternalIntelligence />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
