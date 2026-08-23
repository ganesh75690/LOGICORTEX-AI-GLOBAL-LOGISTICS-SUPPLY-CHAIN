import { useState, useEffect } from 'react';
import { Map, BarChart3, Bell, ListTodo, MessageSquare, Menu, X, User, AlertTriangle, Shield, Package, MapPin, History, Settings } from 'lucide-react';

// Dashboard state interfaces
interface LiveStats {
  currentSpeed: number;
  avgSpeed: number;
  fuelEfficiency: number;
  earnings: number;
  timeSaved: number;
  deliveriesCompleted: number;
}

interface Alert {
  id: string;
  type: 'traffic' | 'weather' | 'customer' | 'system';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  action?: string;
}
import { SplashScreen } from './components/SplashScreen';
import { GetStartedScreen } from './components/GetStartedScreen';
import { LoginPhoneScreen } from './components/LoginPhoneScreen';
import { LoginOTPScreen } from './components/LoginOTPScreen';
import { DashboardHomeScreen } from './components/DashboardHomeScreen';
import { EnhancedDashboardScreen } from './components/EnhancedDashboardScreen';
import { OfflineStatusIndicator } from './components/OfflineStatusIndicator';
import { offlineStorage } from './services/offlineStorage';
import { RouteNormalScreen } from './components/RouteNormalScreen';
import { EnhancedRouteScreen } from './components/EnhancedRouteScreen';
import { LeafletRouteScreen } from './components/LeafletRouteScreen';
import { RouteDisruptionScreen } from './components/RouteDisruptionScreen';
import { RouteReroutedScreen } from './components/RouteReroutedScreen';
import { TasksScreen } from './components/TasksScreen';
import { EnhancedTasksScreen } from './components/EnhancedTasksScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { AIChatScreen } from './components/AIChatScreen';
import { EnhancedAIChatScreen } from './components/EnhancedAIChatScreen';
import { DriverHistoryReportScreen } from './components/DriverHistoryReportScreen';
import { DriverProfileScreen } from './components/DriverProfileScreen';
import { UpdatesCenterScreen } from './components/UpdatesCenterScreen';
import { SyncStatusScreen } from './components/SyncStatusScreen';
import { ReportIssueScreen } from './components/ReportIssueScreen';
// New feature imports
import { DeliveryVerificationScreen } from './components/DeliveryVerificationScreen';
import { DeliveryVerificationResult } from './components/DeliveryVerificationResult';
import { IncidentResponseScreen } from './components/IncidentResponseScreen';
import { IncidentTimelineScreen } from './components/IncidentTimelineScreen';
import { DigitalTrustPassportScreen } from './components/DigitalTrustPassportScreen';
import { MissionReadinessScreen } from './components/MissionReadinessScreen';
// Mission Recovery & Handover imports
import { MissionRecoveryAlert } from './components/MissionRecoveryAlert';
import { MissionImpactAnalysis } from './components/MissionImpactAnalysis';
import { RecoveryOptions } from './components/RecoveryOptions';
import { AIRecoveryRecommendation } from './components/AIRecoveryRecommendation';
import { HandoverPlan } from './components/HandoverPlan';
import { NewMissionHandover } from './components/NewMissionHandover';
import { RecoveryTimeline } from './components/RecoveryTimeline';
// Enterprise-grade features imports
import { EmergencyContinuityMode } from './components/EmergencyContinuityMode';
// Customer Portal imports
import { CustomerDeliveryDashboard } from './customer/CustomerDeliveryDashboard';
import { CustomerLiveTracking } from './customer/CustomerLiveTracking';
import { CustomerDeliveryTrust } from './customer/CustomerDeliveryTrust';
import { CustomerDeliveryHistory } from './customer/CustomerDeliveryHistory';
import { CustomerDeliveryPreferences } from './customer/CustomerDeliveryPreferences';

type AppFlow =
  | 'splash'
  | 'get-started'
  | 'login-phone'
  | 'login-otp'
  | 'dashboard-home'
  | 'enhanced-dashboard'
  | 'route-normal'
  | 'enhanced-route'
  | 'leaflet-route'
  | 'route-disruption'
  | 'route-rerouted'
  | 'tasks'
  | 'enhanced-tasks'
  | 'alerts'
  | 'chat'
  | 'enhanced-chat'
  | 'driver-history-report'
  | 'driver-profile'
  | 'updates-center'
  | 'sync-status'
  | 'report-issue'
  // New feature flows
  | 'mission-readiness'
  | 'digital-trust-passport'
  | 'delivery-verification'
  | 'delivery-verification-result'
  | 'incident-response'
  | 'incident-timeline'
  // Mission Recovery & Handover flows
  | 'mission-recovery-alert'
  | 'mission-impact-analysis'
  | 'recovery-options'
  | 'ai-recovery-recommendation'
  | 'handover-plan'
  | 'new-mission-handover'
  | 'recovery-timeline'
  // Enterprise-grade features flows
  | 'emergency-continuity-mode'
  // Customer Portal flows
  | 'customer-dashboard'
  | 'customer-live-tracking'
  | 'customer-delivery-trust'
  | 'customer-delivery-history'
  | 'customer-preferences';

export default function App() {
  const [currentFlow, setCurrentFlow] = useState<AppFlow>('splash');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  
  // Dashboard state - persists across navigation
  const [dashboardState, setDashboardState] = useState({
    liveStats: {
      currentSpeed: 0,
      avgSpeed: 42,
      fuelEfficiency: 15.2,
      earnings: 2450,
      timeSaved: 42,
      deliveriesCompleted: 3,
    },
    alerts: [
      {
        id: '1',
        type: 'traffic' as const,
        severity: 'critical' as const,
        title: 'Heavy Traffic on Highway 101',
        description: '15 min delay expected, alternative route available',
        time: '2 min ago',
        action: 'View Alternative',
      },
      {
        id: '2',
        type: 'weather' as const,
        severity: 'warning' as const,
        title: 'Rain Expected at 4 PM',
        description: 'Light rain may affect delivery times',
        time: '15 min ago',
      },
    ],
    currentTime: new Date(),
  });

  // Check for saved phone number and username on mount
  useEffect(() => {
    const savedPhone = localStorage.getItem('phoneNumber');
    const savedUsername = localStorage.getItem('username');
    const rememberMe = localStorage.getItem('rememberMe');
    if (savedPhone && rememberMe === 'true') {
      setPhoneNumber(savedPhone);
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
  }, []);

  // Load offline data on mount
  useEffect(() => {
    const loadOfflineData = async () => {
      try {
        // Load live stats from offline storage
        const savedStats = offlineStorage.getLiveStats();
        const savedAlerts = await offlineStorage.getAlerts();
        
        setDashboardState(prev => ({
          ...prev,
          liveStats: savedStats,
          alerts: savedAlerts.length > 0 ? savedAlerts : prev.alerts,
        }));
      } catch (error) {
        console.error('Failed to load offline data:', error);
      }
    };

    loadOfflineData();
  }, []);

  // Save data to offline storage when it changes
  useEffect(() => {
    offlineStorage.saveLiveStats(dashboardState.liveStats);
    offlineStorage.saveAlerts(dashboardState.alerts);
  }, [dashboardState.liveStats, dashboardState.alerts]);

  // Dashboard live updates - persists across navigation
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardState(prev => {
        const updatedStats = {
          ...prev.liveStats,
          currentSpeed: Math.max(0, Math.min(60, Math.round(prev.liveStats.currentSpeed + (Math.random() - 0.5) * 10))),
          avgSpeed: Math.max(30, Math.round(prev.liveStats.avgSpeed + (Math.random() - 0.5) * 2)),
          fuelEfficiency: Math.max(10, Number((prev.liveStats.fuelEfficiency + (Math.random() - 0.5) * 0.5).toFixed(1))),
          earnings: prev.liveStats.earnings + (Math.random() > 0.7 ? 25 : 0),
          timeSaved: prev.liveStats.timeSaved + (Math.random() > 0.8 ? 1 : 0),
          deliveriesCompleted: prev.liveStats.deliveriesCompleted + (Math.random() > 0.95 ? 1 : 0),
        };

        // Save to offline storage
        offlineStorage.saveLiveStats(updatedStats);
        
        // Note: Sync queue disabled to prevent rotation animation
        // In production, this would sync with backend periodically

        return {
          ...prev,
          liveStats: updatedStats,
          currentTime: new Date(),
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Flow handlers
  const handleSplashComplete = () => {
    console.log('App: Splash completed, moving to get-started');
    setCurrentFlow('get-started');
  };
  const handleGetStartedComplete = () => {
    console.log('App: Get started completed, moving to login-phone');
    setCurrentFlow('login-phone');
  };
  const handleSendOTP = (phone: string, username: string, rememberMe: boolean) => {
    setPhoneNumber(phone);
    // Store remember me preference and username
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('phoneNumber', phone);
      if (username) {
        localStorage.setItem('username', username);
      }
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('phoneNumber');
      localStorage.removeItem('username');
    }
    setCurrentFlow('login-otp');
  };
  const handleVerifyOTP = () => setCurrentFlow('enhanced-dashboard');
  const handleViewNormalDashboard = () => setCurrentFlow('dashboard-home');
  const handleBackToPhone = () => setCurrentFlow('login-phone');
  const handleNotYou = () => setCurrentFlow('login-phone');
  const handleStartDelivery = () => setCurrentFlow('mission-readiness');
  const handleViewNormalRoute = () => setCurrentFlow('route-normal');
  const handleViewEnhancedRoute = () => setCurrentFlow('enhanced-route');
  const handleSimulateDisruption = () => setCurrentFlow('route-disruption');
  const handleContinueToReroute = () => setCurrentFlow('route-rerouted');
  const handleViewTasks = () => setCurrentFlow('enhanced-tasks');
  const handleViewNormalTasks = () => setCurrentFlow('tasks');
  const handleViewAlerts = () => setCurrentFlow('alerts');
  const handleViewChat = () => setCurrentFlow('enhanced-chat');
  const handleViewNormalChat = () => setCurrentFlow('chat');
  const handleViewDriverHistory = () => setCurrentFlow('driver-history-report');
  const handleViewDriverProfile = () => setCurrentFlow('driver-profile');
  const handleViewUpdatesCenter = () => setCurrentFlow('updates-center');
  const handleViewSyncStatus = () => setCurrentFlow('sync-status');
  const handleViewReportIssue = () => setCurrentFlow('report-issue');
  
  // New feature handlers
  const handleViewMissionReadiness = () => setCurrentFlow('mission-readiness');
  const handleViewTrustPassport = () => setCurrentFlow('digital-trust-passport');
  const handleStartVerification = () => setCurrentFlow('delivery-verification');
  const handleVerificationComplete = () => setCurrentFlow('delivery-verification-result');
  const handleVerificationResultBack = () => setCurrentFlow('enhanced-dashboard');
  const handleStartIncidentResponse = () => setCurrentFlow('incident-response');
  const handleIncidentAccept = () => setCurrentFlow('leaflet-route');
  const handleIncidentReview = () => setCurrentFlow('incident-timeline');
  const handleIncidentTimelineBack = () => setCurrentFlow('incident-response');
  const handleMissionStart = () => setCurrentFlow('leaflet-route');
  
  // Mission Recovery & Handover handlers
  const handleStartMissionRecovery = () => setCurrentFlow('mission-recovery-alert');
  const handleViewRecoveryTimeline = () => setCurrentFlow('recovery-timeline');
  
  // Enterprise-grade features handlers
  const handleStartEmergencyMode = () => setCurrentFlow('emergency-continuity-mode');
  const handleViewEmergencyStatus = () => setCurrentFlow('emergency-continuity-mode');
  
  // Customer Portal handlers
  const handleStartCustomerPortal = () => setCurrentFlow('customer-dashboard');
  const handleTrackShipment = (shipmentId: string) => setCurrentFlow('customer-live-tracking');
  const handleViewDeliveryTrust = () => setCurrentFlow('customer-delivery-trust');
  const handleViewCustomerHistory = () => setCurrentFlow('customer-delivery-history');
  const handleViewCustomerPreferences = () => setCurrentFlow('customer-preferences');
  
  const handleSignOut = () => {
    setShowSignOutDialog(true);
  };

  const confirmSignOut = () => {
    // Clear stored user data
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('username');
    
    // Clear offline data
    offlineStorage.clearAllData();
    
    // Reset dashboard state
    setDashboardState({
      liveStats: {
        currentSpeed: 0,
        avgSpeed: 42,
        fuelEfficiency: 15.2,
        earnings: 2450,
        timeSaved: 42,
        deliveriesCompleted: 3,
      },
      alerts: [
        {
          id: '1',
          type: 'traffic' as const,
          severity: 'critical' as const,
          title: 'Heavy Traffic on Highway 101',
          description: '15 min delay expected, alternative route available',
          time: '2 min ago',
          action: 'View Alternative',
        },
        {
          id: '2',
          type: 'weather' as const,
          severity: 'warning' as const,
          title: 'Rain Expected at 4 PM',
          description: 'Light rain may affect delivery times',
          time: '15 min ago',
        },
      ],
      currentTime: new Date(),
    });
    
    // Navigate to get-started page
    setCurrentFlow('get-started');
    setIsSidebarOpen(false);
    setShowSignOutDialog(false);
  };

  const cancelSignOut = () => {
    setShowSignOutDialog(false);
  };
  
  const handleSidebarNavigate = (screen: NavScreen) => {
    setIsSidebarOpen(false);
    if (screen === 'dashboard') setCurrentFlow('dashboard-home');
    if (screen === 'route') handleViewEnhancedRoute();
    if (screen === 'alerts') handleViewAlerts();
    if (screen === 'tasks') handleViewTasks();
    if (screen === 'chat') handleViewChat();
    if (screen === 'report') handleViewDriverHistory();
    if (screen === 'report-issue') handleViewReportIssue();
    if (screen === 'profile') handleViewDriverProfile();
    if (screen === 'updates') handleViewUpdatesCenter();
    if (screen === 'mission-readiness') handleViewMissionReadiness();
    if (screen === 'trust-passport') handleViewTrustPassport();
    if (screen === 'customer-dashboard') setCurrentFlow('customer-dashboard');
    if (screen === 'customer-tracking') setCurrentFlow('customer-live-tracking');
    if (screen === 'customer-history') setCurrentFlow('customer-delivery-history');
    if (screen === 'customer-preferences') setCurrentFlow('customer-preferences');
  };

  // Render flow screens
  if (currentFlow === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (currentFlow === 'get-started') {
    return (
      <GetStartedScreen 
        onComplete={handleGetStartedComplete} 
      />
    );
  }

  if (currentFlow === 'login-phone') {
    return <LoginPhoneScreen onSendOTP={handleSendOTP} phoneNumber={phoneNumber} username={username} />;
  }

  if (currentFlow === 'login-otp') {
    return <LoginOTPScreen phone={phoneNumber} onVerify={handleVerifyOTP} onBack={handleBackToPhone} onNotYou={handleNotYou} />;
  }

  if (currentFlow === 'enhanced-dashboard') {
    // Debug: Log what's being passed to dashboard
    console.log('App passing to dashboard:', {
      liveStats: dashboardState.liveStats,
      alerts: dashboardState.alerts,
      currentTime: dashboardState.currentTime
    });
    
    return (
      <div className="size-full max-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
        <EnhancedDashboardScreen 
          onStartDelivery={handleStartDelivery} 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('login-otp')} 
          onViewDriverHistory={handleViewDriverHistory}
          onViewSyncStatus={handleViewSyncStatus}
          onViewMissionReadiness={handleViewMissionReadiness}
          onViewRecoveryTimeline={handleViewRecoveryTimeline}
          onViewEmergencyStatus={handleViewEmergencyStatus}
          liveStats={dashboardState.liveStats}
          alerts={dashboardState.alerts}
          currentTime={dashboardState.currentTime}
        />
        <SidebarNav activeScreen="dashboard" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
        
        {/* Sign Out Confirmation Dialog */}
        {showSignOutDialog && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-white mb-2">Sign Out</h3>
              <p className="text-sm text-zinc-400 mb-6">Are you sure you want to sign out? Your session data will be cleared.</p>
              <div className="flex gap-3">
                <button 
                  onClick={cancelSignOut}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmSignOut}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-medium text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentFlow === 'dashboard-home') {
    return (
      <div className="size-full max-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
        <DashboardHomeScreen onStartDelivery={handleStartDelivery} onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('login-otp')} onViewSyncStatus={handleViewSyncStatus} />
        <SidebarNav activeScreen="dashboard" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
        
        {/* Sign Out Confirmation Dialog */}
        {showSignOutDialog && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-white mb-2">Sign Out</h3>
              <p className="text-sm text-zinc-400 mb-6">Are you sure you want to sign out? Your session data will be cleared.</p>
              <div className="flex gap-3">
                <button 
                  onClick={cancelSignOut}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmSignOut}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-medium text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentFlow === 'leaflet-route') {
    return (
      <div className="size-full max-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
        <LeafletRouteScreen 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('dashboard-home')} 
          onSwitchToEnhancedMap={() => setCurrentFlow('enhanced-route')}
          onStartVerification={handleStartVerification}
          onStartIncidentResponse={handleStartIncidentResponse}
          onStartMissionRecovery={handleStartMissionRecovery}
          onStartEmergencyMode={handleStartEmergencyMode}
        />
        <SidebarNav activeScreen="route" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'enhanced-route') {
    return (
      <div className="size-full max-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
        <EnhancedRouteScreen 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('dashboard-home')} 
          onSwitchToRealMap={() => setCurrentFlow('leaflet-route')}
          onViewSyncStatus={handleViewSyncStatus}
        />
        <SidebarNav activeScreen="route" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
        
        {/* Sign Out Confirmation Dialog */}
        {showSignOutDialog && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-white mb-2">Sign Out</h3>
              <p className="text-sm text-zinc-400 mb-6">Are you sure you want to sign out? Your session data will be cleared.</p>
              <div className="flex gap-3">
                <button 
                  onClick={cancelSignOut}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmSignOut}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-medium text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentFlow === 'route-normal') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <RouteNormalScreen onSimulateDisruption={handleSimulateDisruption} onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('dashboard-home')} />
        <SidebarNav activeScreen="route" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'route-disruption') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <RouteDisruptionScreen onContinue={handleContinueToReroute} onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('dashboard-home')} />
        <SidebarNav activeScreen="route" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'route-rerouted') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <RouteReroutedScreen onViewTasks={handleViewTasks} onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('dashboard-home')} />
        <SidebarNav activeScreen="route" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'enhanced-tasks') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <EnhancedTasksScreen onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('dashboard-home')} />
        <SidebarNav activeScreen="tasks" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'tasks') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <TasksScreen onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('dashboard-home')} />
        <SidebarNav activeScreen="tasks" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'alerts') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <AlertsScreen onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('dashboard-home')} />
        <SidebarNav activeScreen="alerts" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'enhanced-chat') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <EnhancedAIChatScreen onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('dashboard-home')} />
        <SidebarNav activeScreen="chat" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'chat') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <AIChatScreen onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('dashboard-home')} />
        <SidebarNav activeScreen="chat" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'driver-history-report') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <DriverHistoryReportScreen onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('dashboard-home')} />
        <SidebarNav activeScreen="report" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'driver-profile') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <DriverProfileScreen onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('dashboard-home')} />
        <SidebarNav activeScreen="profile" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'updates-center') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <UpdatesCenterScreen onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('dashboard-home')} />
        <SidebarNav activeScreen="alerts" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'sync-status') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <SyncStatusScreen onMenuToggle={() => setIsSidebarOpen(true)} onBack={() => setCurrentFlow('enhanced-dashboard')} />
      </div>
    );
  }

  if (currentFlow === 'report-issue') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <ReportIssueScreen onBack={() => setCurrentFlow('enhanced-dashboard')} onSubmit={() => setCurrentFlow('enhanced-dashboard')} />
      </div>
    );
  }

  // New feature screens
  if (currentFlow === 'mission-readiness') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <MissionReadinessScreen 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('enhanced-dashboard')} 
          onStartMission={handleMissionStart}
          onViewTrustPassport={handleViewTrustPassport}
        />
        <SidebarNav activeScreen="mission-readiness" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'digital-trust-passport') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <DigitalTrustPassportScreen 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('mission-readiness')} 
        />
        <SidebarNav activeScreen="trust-passport" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'delivery-verification') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <DeliveryVerificationScreen 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('leaflet-route')} 
          onComplete={handleVerificationComplete}
        />
      </div>
    );
  }

  if (currentFlow === 'delivery-verification-result') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <DeliveryVerificationResult 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={handleVerificationResultBack}
          onHome={() => setCurrentFlow('enhanced-dashboard')}
          shipmentId="SHP-20481"
          confidenceScore={98}
          verificationTime="14:42"
        />
      </div>
    );
  }

  if (currentFlow === 'incident-response') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <IncidentResponseScreen 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('leaflet-route')} 
          onAccept={handleIncidentAccept}
          onReview={handleIncidentReview}
        />
      </div>
    );
  }

  if (currentFlow === 'incident-timeline') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <IncidentTimelineScreen 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={handleIncidentTimelineBack} 
        />
      </div>
    );
  }

  // Mission Recovery & Handover screens
  if (currentFlow === 'mission-recovery-alert') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <MissionRecoveryAlert 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('leaflet-route')} 
          onReview={() => setCurrentFlow('mission-impact-analysis')}
          onContactOperations={() => setCurrentFlow('enhanced-dashboard')}
          onAcceptRecovery={() => setCurrentFlow('handover-plan')}
        />
      </div>
    );
  }

  if (currentFlow === 'mission-impact-analysis') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <MissionImpactAnalysis 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('mission-recovery-alert')} 
          onNext={() => setCurrentFlow('recovery-options')}
        />
      </div>
    );
  }

  if (currentFlow === 'recovery-options') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <RecoveryOptions 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('mission-impact-analysis')} 
          onSelectOption={(optionId) => setCurrentFlow('ai-recovery-recommendation')}
        />
      </div>
    );
  }

  if (currentFlow === 'ai-recovery-recommendation') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <AIRecoveryRecommendation 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('recovery-options')} 
          onApprove={() => setCurrentFlow('handover-plan')}
          onModify={() => setCurrentFlow('recovery-options')}
          onReject={() => setCurrentFlow('leaflet-route')}
          selectedOption={{ driverId: 'DRV-2087', driverName: 'Priya Sharma', vehicleId: 'VH-1042', distance: 4.8, estimatedDelay: 12 }}
        />
      </div>
    );
  }

  if (currentFlow === 'handover-plan') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <HandoverPlan 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('ai-recovery-recommendation')} 
          onComplete={() => setCurrentFlow('new-mission-handover')}
        />
      </div>
    );
  }

  if (currentFlow === 'new-mission-handover') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <NewMissionHandover 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('handover-plan')} 
          onAccept={() => setCurrentFlow('leaflet-route')}
          onReject={() => setCurrentFlow('enhanced-dashboard')}
        />
      </div>
    );
  }

  if (currentFlow === 'recovery-timeline') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <RecoveryTimeline 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onBack={() => setCurrentFlow('enhanced-dashboard')} 
        />
      </div>
    );
  }

  // Emergency Continuity Mode
  if (currentFlow === 'emergency-continuity-mode') {
    return (
      <div className="size-full flex flex-col bg-zinc-950 relative">
        <EmergencyContinuityMode 
          onMenuToggle={() => setIsSidebarOpen(true)} 
          onCancel={() => setCurrentFlow('leaflet-route')} 
          onContactOperations={() => setCurrentFlow('enhanced-dashboard')}
          onStartMissionRecovery={handleStartMissionRecovery}
        />
      </div>
    );
  }

  // Customer Portal Flows
  if (currentFlow === 'customer-dashboard') {
    return (
      <div className="size-full max-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
        <CustomerDeliveryDashboard 
          onTrackShipment={handleTrackShipment}
          onViewHistory={handleViewCustomerHistory}
          onViewPreferences={handleViewCustomerPreferences}
          onMenuToggle={() => setIsSidebarOpen(true)}
          onNavigate={(screen) => handleSidebarNavigate(screen as NavScreen)}
        />
        <SidebarNav activeScreen="customer-dashboard" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'customer-live-tracking') {
    return (
      <div className="size-full max-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
        <CustomerLiveTracking 
          shipmentId="LX20481"
          onBack={handleStartCustomerPortal}
          onExplainDelivery={() => {}}
          onMenuToggle={() => setIsSidebarOpen(true)}
        />
        <SidebarNav activeScreen="customer-tracking" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'customer-delivery-trust') {
    return (
      <div className="size-full max-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
        <CustomerDeliveryTrust 
          shipmentId="LX20481"
          onBack={handleStartCustomerPortal}
        />
        <SidebarNav activeScreen="customer-dashboard" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'customer-delivery-history') {
    return (
      <div className="size-full max-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
        <CustomerDeliveryHistory 
          onBack={handleStartCustomerPortal}
          onMenuToggle={() => setIsSidebarOpen(true)}
        />
        <SidebarNav activeScreen="customer-history" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  if (currentFlow === 'customer-preferences') {
    return (
      <div className="size-full max-h-screen flex flex-col bg-zinc-950 relative overflow-hidden">
        <CustomerDeliveryPreferences 
          onBack={handleStartCustomerPortal}
          onMenuToggle={() => setIsSidebarOpen(true)}
        />
        <SidebarNav activeScreen="customer-preferences" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={handleSidebarNavigate} onSignOut={handleSignOut} />
      </div>
    );
  }

  return null;
}

type NavScreen = 'route' | 'dashboard' | 'alerts' | 'tasks' | 'chat' | 'report' | 'profile' | 'updates' | 'report-issue' | 'mission-readiness' | 'trust-passport' | 'customer-dashboard' | 'customer-tracking' | 'customer-history' | 'customer-preferences';

function SidebarNav({ activeScreen, isOpen, onClose, onNavigate, onSignOut }: { 
  activeScreen: NavScreen; 
  isOpen: boolean; 
  onClose: () => void;
  onNavigate: (screen: NavScreen) => void;
  onSignOut: () => void;
}) {
  const tabs = [
    { id: 'route' as const, icon: Map, label: 'Route' },
    { id: 'dashboard' as const, icon: BarChart3, label: 'Dashboard' },
    { id: 'alerts' as const, icon: Bell, label: 'Alerts', badge: 3 },
    { id: 'tasks' as const, icon: ListTodo, label: 'Tasks' },
    { id: 'chat' as const, icon: MessageSquare, label: 'AI Chat' },
    { id: 'report' as const, icon: BarChart3, label: 'Report' },
    { id: 'report-issue' as const, icon: AlertTriangle, label: 'Report Issue' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
    { id: 'updates' as const, icon: Bell, label: 'Updates', badge: 4 },
    { id: 'mission-readiness' as const, icon: BarChart3, label: 'Mission' },
    { id: 'trust-passport' as const, icon: Shield, label: 'Trust Passport' },
    { id: 'customer-dashboard' as const, icon: Package, label: 'Customer Portal' },
    { id: 'customer-tracking' as const, icon: MapPin, label: 'Live Tracking' },
    { id: 'customer-history' as const, icon: History, label: 'Delivery History' },
    { id: 'customer-preferences' as const, icon: Settings, label: 'Preferences' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`absolute top-0 left-0 h-full w-80 bg-zinc-900/98 backdrop-blur-xl border-r border-cyan-500/20 z-50 transform transition-transform duration-300 flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Logistics</h2>
              <p className="text-xs text-zinc-400">Smart Delivery System</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            title="Close menu"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Main</h3>
            <div className="space-y-1">
              {tabs.slice(0, 5).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeScreen === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => onNavigate(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-400 border-l-2 border-cyan-500'
                        : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-white'
                    }`}
                  >
                    <div className="relative">
                      <Icon className="w-4 h-4" />
                      {tab.badge && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{tab.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Support & Actions */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Support & Actions</h3>
            <div className="space-y-1">
              {tabs.slice(5, 11).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeScreen === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => onNavigate(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-400 border-l-2 border-cyan-500'
                        : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-white'
                    }`}
                  >
                    <div className="relative">
                      <Icon className="w-4 h-4" />
                      {tab.badge && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{tab.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Portal */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Customer Portal</h3>
            <div className="space-y-1">
              {tabs.slice(11, 15).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeScreen === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => onNavigate(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-400 border-l-2 border-cyan-500'
                        : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-white'
                    }`}
                  >
                    <div className="relative">
                      <Icon className="w-4 h-4" />
                      {tab.badge && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{tab.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800/50 flex-shrink-0">
          <div className="bg-zinc-800/30 rounded-xl p-4 mb-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Ganesh</p>
                <p className="text-zinc-400 text-xs">Professional Driver</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-zinc-900/50 rounded-lg py-2">
                <p className="text-white font-semibold text-xs">4.8</p>
                <p className="text-zinc-400 text-[10px]">Rating</p>
              </div>
              <div className="bg-zinc-900/50 rounded-lg py-2">
                <p className="text-white font-semibold text-xs">142</p>
                <p className="text-zinc-400 text-[10px]">Trips</p>
              </div>
              <div className="bg-zinc-900/50 rounded-lg py-2">
                <p className="text-white font-semibold text-xs">98%</p>
                <p className="text-zinc-400 text-[10px]">Success</p>
              </div>
            </div>
          </div>
          <button 
            onClick={onSignOut}
            className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-sm font-medium text-red-400 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}