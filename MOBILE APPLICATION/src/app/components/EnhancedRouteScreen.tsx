import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Phone, MessageSquare, Package, Clock, MapPin, AlertTriangle, TrendingUp, CheckCircle, User, Navigation, Zap, Brain, Shield, Bell, AlertTriangle as AlertIcon, List, Menu } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { MobileStatusBar } from './MobileStatusBar';
import { AllStopsScreen } from './AllStopsScreen';
import { DeliverySuccessPredictor } from './DeliverySuccessPredictor';
import { AutoTaskSwap } from './AutoTaskSwap';
import { OfflineStatusIndicator } from './OfflineStatusIndicator';
import { AIExplanationCard } from './AIExplanationCard';
import { ToastNotification as ToastNotificationComponent } from './ToastNotification';
import type { ToastNotification } from './ToastNotification';
import { SafeStopAssistant } from './SafeStopAssistant';
import { ETAUpdateNotification } from './ETAUpdateNotification';
import { IncidentPrediction } from './IncidentPrediction';
import { SmartDeliveryOptimizer } from './SmartDeliveryOptimizer';
import { DeliveryDetailsScreen } from './DeliveryDetailsScreen';
// import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
// import L from 'leaflet';

interface DeliveryStop {
  id: string;
  address: string;
  customer: string;
  coordinates: { lat: number; lng: number };
  status: 'completed' | 'current' | 'pending' | 'risk';
  eta: string;
  priority: 'high' | 'medium' | 'low';
  packages: number;
  notes?: string;
}

interface RouteData {
  stops: DeliveryStop[];
  totalDistance: number;
  totalTime: number;
  currentTimeSaved: number;
  fuelSaved: number;
  riskZones: Array<{ center: { lat: number; lng: number }; radius: number; type: 'traffic' | 'weather' }>;
}

interface PredictiveAlert {
  id: string;
  type: 'delay' | 'traffic' | 'customer' | 'weather';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timeUntil: string;
  confidence: number;
  action?: string;
}

interface Props {
  onMenuToggle: () => void;
  onBack?: () => void;
  onSwitchToRealMap?: () => void;
  onViewSyncStatus?: () => void;
}

export function EnhancedRouteScreen({ onMenuToggle, onBack, onSwitchToRealMap, onViewSyncStatus }: Props) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showAllStops, setShowAllStops] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationStartTime, setNavigationStartTime] = useState<Date | null>(null);
  const [navigationTime, setNavigationTime] = useState(0);
  const [mapZoom, setMapZoom] = useState(13); // Default zoom level
  const [isZooming, setIsZooming] = useState(false);
  
  // AI Features State
  const [showTaskSwap, setShowTaskSwap] = useState(false);
  const [showSafeStop, setShowSafeStop] = useState(false);
  const [showETANotification, setShowETANotification] = useState(false);
  const [showIncidentPrediction, setShowIncidentPrediction] = useState(false);
  const [showSmartOptimizer, setShowSmartOptimizer] = useState(false);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [currentIssue, setCurrentIssue] = useState('');
  
  const [deliveryRisk, setDeliveryRisk] = useState({
    id: '1',
    customerName: 'Sarah Johnson',
    address: '123 Main St, Apt 4B, Downtown District',
    riskPercentage: 62,
    reasons: ['Past missed deliveries', 'Narrow time window (2-4 PM)', 'Customer often unavailable'],
    timeWindow: '2:00 PM - 4:00 PM',
    customerPhone: '+1 (555) 123-4567'
  });

  const [customerTimeWindows, setCustomerTimeWindows] = useState([
    {
      stopId: '3',
      customerName: 'Sarah Johnson',
      availableAfter: '2:00 PM',
      availableUntil: '4:00 PM',
      confidence: 85,
      reason: 'Customer works from home, available after lunch'
    },
    {
      stopId: '4',
      customerName: 'Mike Chen',
      availableAfter: '3:30 PM',
      availableUntil: '6:00 PM',
      confidence: 92,
      reason: 'Office schedule, available after work hours'
    },
    {
      stopId: '2',
      customerName: 'Emma Wilson',
      availableAfter: '1:00 PM',
      availableUntil: '5:00 PM',
      confidence: 78,
      reason: 'Flexible schedule, prefers afternoon deliveries'
    }
  ]);

  const [optimizedRoute, setOptimizedRoute] = useState({
    originalOrder: [1, 2, 3, 4, 5],
    newOrder: [1, 3, 4, 2, 5],
    timeSavings: 14,
    fuelSavings: '₹120',
    failedDeliveryReduction: 35,
    confidence: 87
  });

  const [taskSwap, setTaskSwap] = useState({
    id: 'swap-1',
    stopNumber: 4,
    originalAddress: '456 Oak Avenue, Suite 200',
    nearbyDriver: {
      name: 'Mike Chen',
      distance: 2.3,
      estimatedTime: 8,
      currentLoad: 3,
      efficiency: 94
    },
    timeSavings: 10,
    confidence: 87
  });

  // Auto-route change state
  const [isDisruption, setIsDisruption] = useState(false);
  const [isRerouting, setIsRerouting] = useState(false);
  const [showAIExplanation, setShowAIExplanation] = useState(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const [routeChanged, setRouteChanged] = useState(false);
  
  console.log('EnhancedRouteScreen rendering, mapLoaded:', mapLoaded);

  const handleNavigateToStop = useCallback((stopId: string) => {
    // Navigate back to map and focus on specific stop
    setShowAllStops(false);
    // Could add map focus logic here
  }, []);

  const handleCompleteStop = useCallback((stopId: string) => {
    // Complete the stop and navigate back to map
    completeStop(stopId);
    setShowAllStops(false);
  }, []);

  // AI Feature Handlers
  const handleSkipAndReorder = useCallback(() => {
    console.log('Skipping and reordering stops');
    // In a real app, this would reorder the route
    setShowTaskSwap(true); // Trigger task swap after skip
  }, []);

  const handleAcceptSwap = useCallback(() => {
    console.log('Accepted task swap');
    // In a real app, this would update the route
    setTimeout(() => setShowTaskSwap(false), 3000);
  }, []);

  const handleDeclineSwap = useCallback(() => {
    console.log('Declined task swap');
    setShowTaskSwap(false);
  }, []);

  const handleAcceptOptimization = useCallback(() => {
    console.log('Accepted route optimization');
    // In a real app, this would update the route order
    setTimeout(() => setShowSmartOptimizer(false), 2000);
  }, []);

  const handleDeclineOptimization = useCallback(() => {
    console.log('Declined route optimization');
    setShowSmartOptimizer(false);
  }, []);

  
  // Auto-route change handlers
  const simulateDisruption = useCallback(() => {
    setIsDisruption(true);
    setIsRerouting(true);
    
    // Show disruption banner
    setTimeout(() => {
      setIsRerouting(false);
    }, 2000);
    
    // Show AI explanation after rerouting
    setTimeout(() => {
      setShowAIExplanation(true);
      setRouteChanged(true);
      
      // Show success toast
      setToast({
        id: 'route-success',
        type: 'success',
        message: 'Route optimized successfully',
        duration: 3000
      });
      
      // Hide AI explanation after 5 seconds
      setTimeout(() => {
        setShowAIExplanation(false);
      }, 5000);
    }, 3000);
  }, []);

  const handleToastRemove = useCallback((id: string) => {
    setToast(prev => prev?.id === id ? null : prev);
  }, []);

  // Demo: Trigger task swap after delay (for demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Show task swap after 5 seconds for demo
      setShowTaskSwap(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleNavigation = useCallback(() => {
    setIsNavigating(prev => {
      if (!prev) {
        // Start navigation - zoom out to show full route, then zoom in to current segment
        setNavigationStartTime(new Date());
        setIsZooming(true);
        
        // First zoom out to show full route
        setMapZoom(11);
        setTimeout(() => {
          // Then zoom in to current navigation segment
          setMapZoom(15);
          setTimeout(() => {
            setIsZooming(false);
          }, 1000);
        }, 1000);
        
        console.log('Navigation started with zoom animation');
      } else {
        // Stop navigation - zoom back to default
        setNavigationStartTime(null);
        setNavigationTime(0);
        setIsZooming(true);
        
        // Zoom back to default view
        setMapZoom(13);
        setTimeout(() => {
          setIsZooming(false);
        }, 800);
        
        console.log('Navigation stopped with zoom animation');
      }
      return !prev;
    });
  }, []);

  // Navigation timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isNavigating && navigationStartTime) {
      interval = setInterval(() => {
        setNavigationTime(Math.floor((new Date().getTime() - navigationStartTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isNavigating, navigationStartTime]);
  const [routeData, setRouteData] = useState<RouteData>({
    stops: [
      {
        id: '1',
        address: '1234 Oak St, Apt 5B',
        customer: 'Sarah Johnson',
        coordinates: { lat: 28.5904, lng: 77.2000 },
        status: 'completed',
        eta: 'Completed',
        priority: 'high',
        packages: 2,
      },
      {
        id: '2',
        address: '4567 Elm Ave',
        customer: 'Sarah Johnson',
        coordinates: { lat: 28.6304, lng: 77.2177 },
        status: 'current',
        eta: '12 min',
        priority: 'high',
        packages: 1,
        notes: 'Call on arrival',
      },
      {
        id: '3',
        address: '7890 Pine Rd',
        customer: 'Mike Davis',
        coordinates: { lat: 28.5982, lng: 77.2306 },
        status: 'risk',
        eta: '24 min',
        priority: 'medium',
        packages: 3,
      },
      {
        id: '4',
        address: '3456 Maple Dr',
        customer: 'Robert Wilson',
        coordinates: { lat: 28.6228, lng: 77.2501 },
        status: 'pending',
        eta: '35 min',
        priority: 'low',
        packages: 1,
        notes: 'Leave at door',
      },
      {
        id: '5',
        address: '7890 Cedar Ln',
        customer: 'Lisa Anderson',
        coordinates: { lat: 28.6400, lng: 77.2800 },
        status: 'pending',
        eta: '45 min',
        priority: 'medium',
        packages: 2,
      },
    ],
    totalDistance: 12.3,
    totalTime: 45,
    currentTimeSaved: 14,
    fuelSaved: 120,
    riskZones: [
      { center: { lat: 28.6400, lng: 77.2800 }, radius: 80, type: 'traffic' },
      { center: { lat: 28.5904, lng: 77.2000 }, radius: 60, type: 'weather' },
    ],
  });

  const [predictiveAlerts, setPredictiveAlerts] = useState<PredictiveAlert[]>([
    {
      id: '1',
      type: 'delay',
      severity: 'critical',
      title: 'Delay Predicted at Stop 3',
      description: 'Heavy traffic will add 12 minutes to your route',
      timeUntil: 'in 12 min',
      confidence: 87,
      action: 'Auto-rerouting available',
    },
    {
      id: '2',
      type: 'customer',
      severity: 'warning',
      title: 'Customer Availability Risk',
      description: 'Stop #4 has 68% chance of failed delivery',
      timeUntil: 'in 23 min',
      confidence: 68,
    },
  ]);

  const [isSimulatingDisruption, setIsSimulatingDisruption] = useState(false);
  const [showAIDecision, setShowAIDecision] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [driverPosition, setDriverPosition] = useState({ lat: 28.6139, lng: 77.2090 });
  const [liveStats, setLiveStats] = useState({
    currentSpeed: 42,
    avgSpeed: 38,
    onTimePercentage: 94,
  });

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPosition(prev => {
        const currentStop = routeData.stops.find(s => s.status === 'current');
        if (!currentStop) return prev;

        // Simple animation towards next stop
        const dlat = currentStop.coordinates.lat - prev.lat;
        const dlng = currentStop.coordinates.lng - prev.lng;
        const distance = Math.sqrt(dlat * dlat + dlng * dlng);
        
        if (distance < 0.001) return prev;
        
        return {
          lat: prev.lat + dlat * 0.02,
          lng: prev.lng + dlng * 0.02,
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [routeData.stops]);

  // Delivery Details Handlers
  const handleShowDeliveryDetails = useCallback((stopId: string) => {
    const stop = routeData.stops.find(s => s.id === stopId);
    if (stop) {
      const deliveryDetails = {
        id: stop.id,
        customerName: stop.customer,
        customerPhone: '+1 (555) 123-4567',
        address: stop.address,
        coordinates: stop.coordinates,
        timeWindow: {
          start: '1:00 PM',
          end: '5:00 PM',
          preferred: '2:30 PM'
        },
        packages: [
          {
            id: `${stop.id}-pkg1`,
            type: 'parcel',
            priority: stop.priority,
            weight: '2.5 kg',
            dimensions: '30x20x15 cm',
            specialInstructions: stop.notes
          }
        ],
        deliveryRisk: {
          percentage: stopId === '3' ? 62 : 25,
          factors: stopId === '3' ? [
            'Past missed deliveries',
            'Narrow time window (2-4 PM)',
            'Customer often unavailable'
          ] : [
            'Normal delivery area',
            'Good accessibility'
          ],
          suggestion: stopId === '3' ? 
            'Try after 2 PM or reorder stops to optimize route efficiency' :
            'Proceed with normal delivery schedule',
          bestTime: stopId === '3' ? 'After 2:30 PM' : 'Any time during window'
        },
        status: stop.status,
        estimatedTime: stop.eta,
        notes: stop.notes
      };
      setSelectedDelivery(deliveryDetails);
      setShowDeliveryDetails(true);
    }
  }, [routeData.stops]);

  const handleCallCustomer = useCallback((phone: string) => {
    console.log('Calling customer:', phone);
    // In a real app, this would open the phone dialer
  }, []);

  const handleMessageCustomer = useCallback((phone: string) => {
    console.log('Messaging customer:', phone);
    // In a real app, this would open messaging app
  }, []);

  const handleStartDelivery = useCallback((deliveryId: string) => {
    console.log('Starting delivery:', deliveryId);
    // Update stop status to in-progress
    setRouteData(prev => ({
      ...prev,
      stops: prev.stops.map(stop => 
        stop.id === deliveryId 
          ? { ...stop, status: 'current' as const }
          : stop
      )
    }));
    setShowDeliveryDetails(false);
  }, []);

  const handleCompleteDelivery = useCallback((deliveryId: string) => {
    console.log('Completing delivery:', deliveryId);
    // Update stop status to completed
    setRouteData(prev => ({
      ...prev,
      stops: prev.stops.map(stop => 
        stop.id === deliveryId 
          ? { ...stop, status: 'completed' as const }
          : stop.id === String(parseInt(deliveryId) + 1) 
            ? { ...stop, status: 'current' as const }
            : stop
      )
    }));
    setShowDeliveryDetails(false);
  }, []);

  const handleReschedule = useCallback((deliveryId: string) => {
    console.log('Rescheduling delivery:', deliveryId);
    setShowDeliveryDetails(false);
  }, []);

  const handleReorderStops = useCallback((deliveryId: string) => {
    console.log('Reordering stops from:', deliveryId);
    setShowSmartOptimizer(true);
    setShowDeliveryDetails(false);
  }, []);

  // Wrapper functions for DeliverySuccessPredictor (no parameters expected)
  const handleCallCustomerFromRisk = useCallback(() => {
    handleCallCustomer(deliveryRisk.customerPhone);
  }, [deliveryRisk.customerPhone, handleCallCustomer]);

  const handleRescheduleFromRisk = useCallback(() => {
    console.log('Rescheduling delivery for:', deliveryRisk.customerName);
    // In a real app, this would open a rescheduling interface
  }, [deliveryRisk.customerName]);

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        currentSpeed: Math.max(0, Math.round(prev.currentSpeed + (Math.random() - 0.5) * 5)),
        avgSpeed: Math.max(0, Math.round(prev.avgSpeed + (Math.random() - 0.5) * 2)),
        onTimePercentage: Math.min(100, Math.max(85, Math.round(prev.onTimePercentage + (Math.random() - 0.5) * 1))),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const simulateOldDisruption = useCallback(() => {
    setIsSimulatingDisruption(true);
    
    // Add new risk zone
    setTimeout(() => {
      setRouteData(prev => ({
        ...prev,
        riskZones: [...prev.riskZones, {
          center: { lat: 28.6000, lng: 77.2200 },
          radius: 100,
          type: 'traffic' as const,
        }],
      }));
    }, 1000);

    // Show AI decision
    setTimeout(() => {
      setShowAIDecision(true);
    }, 2000);

    // Auto reroute
    setTimeout(() => {
      setRouteData(prev => ({
        ...prev,
        stops: prev.stops.map((stop, index) => {
          if (index === 2) {
            return { ...stop, coordinates: { lat: 28.5800, lng: 77.2400 } }; // Rerouted stop
          }
          return stop;
        }),
        currentTimeSaved: prev.currentTimeSaved + 8,
        fuelSaved: prev.fuelSaved + 45,
      }));
      setShowAIDecision(false);
      setIsSimulatingDisruption(false);
    }, 4000);
  }, []);

  const completeStop = useCallback((stopId: string) => {
    setRouteData(prev => ({
      ...prev,
      stops: prev.stops.map(stop => {
        if (stop.id === stopId) {
          return { ...stop, status: 'completed' as const, eta: 'Completed' };
        }
        if (stop.status === 'pending') {
          return { ...stop, status: 'current' as const };
        }
        return stop;
      }),
      currentTimeSaved: prev.currentTimeSaved + 8,
      fuelSaved: prev.fuelSaved + 45,
    }));
    setShowAIDecision(false);
    setIsSimulatingDisruption(false);
  }, []);

  
  // Show All Stops Screen
  if (showAllStops) {
    return (
      <AllStopsScreen
        routeData={routeData}
        onBack={() => setShowAllStops(false)}
        onCompleteStop={handleCompleteStop}
        onNavigateToStop={handleNavigateToStop}
      />
    );
  }

  // Show Main Map Screen
return (
  <div className="h-full max-h-screen bg-zinc-950 text-white flex flex-col overflow-hidden relative">
    {/* Mobile Status Bar */}
    <MobileStatusBar />
    
    {/* Top Info Bar - Driver Status */}
    <div className="px-4 py-2 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isSimulatingDisruption ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
            <span className={`font-medium ${isSimulatingDisruption ? 'text-red-400' : 'text-green-400'}`}>
              {isSimulatingDisruption ? 'Delay Risk' : 'On Track'}
            </span>
          </div>
          {isNavigating && (
            <div className="flex items-center gap-1">
              <Navigation className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span className="font-medium text-cyan-400">Navigating</span>
              <span className="text-zinc-400">•</span>
              <span className="font-medium text-cyan-400">
                {Math.floor(navigationTime / 60)}:{(navigationTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">Stops:</span>
            <span className="text-white font-medium">{routeData.stops.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">Done:</span>
            <span className="text-white font-medium">
              {routeData.stops.filter(s => s.status === 'completed').length}/{routeData.stops.length}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onViewSyncStatus}
            className="w-6 h-6 rounded bg-zinc-800/95 backdrop-blur-lg border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition-colors shadow-xl"
            title="View sync status"
          >
            <OfflineStatusIndicator />
          </button>
          <button 
            onClick={onMenuToggle}
            className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            title="Menu"
          >
            <Menu className="w-3 h-3 text-white" />
          </button>
          {onBack && (
            <button 
              onClick={onBack}
              className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-3 h-3 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>

    {/* AI Alert Banner - VERY IMPORTANT */}
    {predictiveAlerts.length > 0 && (
      <div className="px-4 py-2 bg-zinc-800 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white">{predictiveAlerts[0].title}</p>
            <p className="text-[10px] text-zinc-300">Impact: +12 min • {predictiveAlerts[0].confidence}% confident</p>
          </div>
        </div>
      </div>
    )}

    {/* Disruption Banner */}
    <AnimatePresence>
      {isDisruption && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="px-4 py-2 bg-zinc-800 border-b border-zinc-700"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 animate-pulse" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white">Heavy traffic ahead</p>
              <p className="text-[10px] text-zinc-300">
                {isRerouting ? 'Optimizing route...' : 'Delay predicted (+12 min)'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* AI Explanation Card */}
    <AIExplanationCard
      explanation={{
        title: 'AI Decision',
        content: 'Route updated due to traffic congestion',
        confidence: 87,
        timeSaved: 14,
        icon: 'brain'
      }}
      isVisible={showAIExplanation}
    />

    {/* Toast Notification */}
    <ToastNotificationComponent
      notification={toast}
      onRemove={handleToastRemove}
    />

    {/* Full Map View - MAIN AREA (70-80% screen) */}
    <div className={`flex-1 relative overflow-hidden bg-zinc-900 ${isNavigating ? 'ring-2 ring-cyan-500/50' : ''} ${isZooming ? 'transition-all duration-1000' : ''}`}>
      <iframe
        src={`https://www.openstreetmap.org/export/embed.html?bbox=77.1500%2C28.5500%2C77.2800%2C28.6800&layer=mapnik&zoom=${mapZoom}`}
        className={`w-full h-full border-0 ${isZooming ? 'transition-all duration-1000 ease-in-out' : ''}`}
        style={{ 
          transform: isZooming ? `scale(${mapZoom === 11 ? 0.92 : mapZoom === 15 ? 1.08 : 1})` : 'scale(1)',
          filter: isZooming ? 'brightness(1.1)' : 'brightness(1)',
        }}
        title="Delivery Route Map"
      />
      
      {/* Semi-transparent cover to hide attribution */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-900/80 via-zinc-900/40 to-transparent pointer-events-none"></div>
      
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => {
            setMapZoom(prev => Math.min(prev + 1, 18));
            setIsZooming(true);
            setTimeout(() => setIsZooming(false), 300);
          }}
          className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-all duration-200"
          title="Zoom in"
        >
          <span className="text-white font-bold text-lg">+</span>
        </button>
        <div className="w-10 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xs">{mapZoom}</span>
        </div>
        <button
          onClick={() => {
            setMapZoom(prev => Math.max(prev - 1, 1));
            setIsZooming(true);
            setTimeout(() => setIsZooming(false), 300);
          }}
          className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-all duration-200"
          title="Zoom out"
        >
          <span className="text-white font-bold text-lg">−</span>
        </button>
        <button
          onClick={() => {
            setMapZoom(isNavigating ? 15 : 13);
            setIsZooming(true);
            setTimeout(() => setIsZooming(false), 500);
          }}
          className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-all duration-200"
          title="Recenter"
        >
          <Navigation className="w-4 h-4 text-white" />
        </button>
      </div>
      
      {/* Zoom Animation Indicator */}
      {isZooming && (
        <div className="absolute bottom-4 right-4 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse" />
            <span className="text-xs text-zinc-300 font-medium">
              {mapZoom === 11 ? 'Showing route overview...' : 
               mapZoom === 15 ? 'Focusing on navigation...' : 
               'Adjusting zoom...'}
            </span>
          </div>
        </div>
      )}
      
      {/* Overlay markers for delivery stops */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Navigation route line */}
        {isNavigating && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <polyline
              points={routeData.stops
                .filter(stop => stop.status !== 'completed')
                .map((stop, index) => {
                  const x = ((stop.coordinates.lng - 77.1500) / (77.2800 - 77.1500)) * 100;
                  const y = ((28.6800 - stop.coordinates.lat) / (28.6800 - 28.5500)) * 100;
                  return `${x}%,${y}%`;
                })
                .join(' ')}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>
        )}
        
        {/* Delivery Points with Click Details */}
        {routeData.stops.map((stop, index) => {
          const x = ((stop.coordinates.lng - 77.1500) / (77.2800 - 77.1500)) * 100;
          const y = ((28.6800 - stop.coordinates.lat) / (28.6800 - 28.5500)) * 100;
          
          let bgColor = '#3b82f6'; // Default blue
          let size = 'w-8 h-8';
          
          if (stop.status === 'completed') {
            bgColor = '#10b981'; // Green
          } else if (stop.status === 'current') {
            bgColor = '#f59e0b'; // Yellow
            size = 'w-10 h-10'; // Bigger for current
          } else if (stop.status === 'risk') {
            bgColor = '#ef4444'; // Red
          }
          
          return (
            <div
              key={stop.id}
              className={`absolute ${size} rounded-full border-2 border-white flex items-center justify-center text-sm font-bold text-white cursor-pointer hover:scale-110 transition-all shadow-lg ${size === 'w-10 h-10' ? 'animate-pulse' : ''}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: bgColor,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleShowDeliveryDetails(stop.id)}
              title={`${stop.customer} • ${stop.eta}`}
            >
              {stop.status === 'completed' ? '✓' : (index + 1)}
            </div>
          );
        })}
      </div>

      {/* AI Decision Card - SUPER IMPORTANT */}
      <AnimatePresence>
        {showAIDecision && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-800 border border-zinc-700 rounded-2xl p-6 shadow-2xl max-w-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Auto-Rerouting</h3>
                <p className="text-xs text-zinc-400">Optimizing in real-time</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Route changed due to:</span>
                <span className="text-cyan-400">Heavy traffic</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Time saved:</span>
                <span className="text-green-400 font-medium">+8 minutes</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Fuel saved:</span>
                <span className="text-green-400 font-medium">₹45</span>
              </div>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">Optimization Impact</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-zinc-400">Original ETA:</span>
                  <span className="text-white ml-1">45 min</span>
                </div>
                <div>
                  <span className="text-zinc-400">New ETA:</span>
                  <span className="text-green-400 ml-1">37 min</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setShowAIDecision(false)}
                className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium text-white transition-colors"
              >
                Accept Route
              </button>
              <button 
                onClick={() => setShowAIDecision(false)}
                className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium text-white transition-colors"
              >
                Keep Original
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Status Card */}
      {isNavigating && (
        <div className="absolute top-4 left-4 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              <Navigation className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Navigation Active</h3>
              <p className="text-xs text-cyan-400">Next: {routeData.stops.find(s => s.status === 'current')?.customer}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-zinc-400">Distance:</span>
              <span className="text-white font-medium ml-1">3.2 km</span>
            </div>
            <div>
              <span className="text-zinc-400">ETA:</span>
              <span className="text-white font-medium ml-1">12 min</span>
            </div>
          </div>
        </div>
      )}

      {/* Live Impact Meter */}
      <div className="absolute bottom-4 left-4 bg-zinc-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-[10px] text-zinc-400">Time Saved</p>
            <p className="text-sm font-bold text-green-400">+{routeData.currentTimeSaved} min</p>
          </div>
          <div className="w-px h-6 bg-zinc-700" />
          <div className="text-center">
            <p className="text-[10px] text-zinc-400">Fuel Saved</p>
            <p className="text-sm font-bold text-green-400">₹{routeData.fuelSaved}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Control Panel - KEY AREA */}
    <div className="bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800 p-4 overflow-y-auto max-h-64">
      {/* Next Stop Info */}
      {routeData.stops.find(s => s.status === 'current') && (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-sm font-semibold text-white">Next Stop</h4>
              <p className="text-xs text-zinc-300">{routeData.stops.find(s => s.status === 'current')?.customer}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-cyan-400">12 min</p>
              <p className="text-xs text-zinc-400">3.2 km</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Delivery Success Predictor */}
      <DeliverySuccessPredictor
        risk={deliveryRisk}
        onCallCustomer={handleCallCustomerFromRisk}
        onReschedule={handleRescheduleFromRisk}
        onSkipAndReorder={handleSkipAndReorder}
      />

      {/* Main Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button 
          onClick={toggleNavigation}
          className={`py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
            isNavigating 
              ? 'bg-zinc-800 hover:bg-zinc-700' 
              : 'bg-zinc-800 hover:bg-zinc-700'
          }`}
        >
          <Navigation className={`w-4 h-4 ${isNavigating ? 'animate-pulse' : ''}`} />
          {isNavigating ? 'Stop Navigating' : 'Start Navigation'}
        </button>
        <button 
          onClick={() => completeStop(routeData.stops.find(s => s.status === 'current')?.id || '')}
          className="py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold text-white transition-all"
        >
          Mark Delivered
        </button>
      </div>

      {/* Smart Actions - Professional Layout */}
      <div className="space-y-3">
        {/* Primary Actions */}
        <div className="flex gap-2">
          <button
            onClick={simulateDisruption}
            disabled={isSimulatingDisruption}
            className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            {isSimulatingDisruption ? 'Simulating...' : 'Route Optimizer'}
          </button>
          <button 
            onClick={() => setShowAllStops(true)}
            className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-zinc-300 transition-all flex items-center justify-center gap-2"
          >
            <List className="w-4 h-4" />
            All Stops
          </button>
        </div>
        
        {/* AI Intelligence Suite */}
        <div className="bg-zinc-800/30 rounded-xl p-3">
          <div className="text-xs font-medium text-zinc-400 mb-2">AI Intelligence</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowSmartOptimizer(true)}
              className="py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-xs font-medium text-white transition-all flex items-center justify-center gap-1.5"
            >
              <Brain className="w-3 h-3" />
              Smart Optimize
            </button>
            <button
              onClick={() => {
                setCurrentIssue('Vehicle breakdown detected - engine warning light');
                setShowSafeStop(true);
              }}
              className="py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-xs font-medium text-white transition-all flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3 h-3" />
              Safe Stop
            </button>
            <button
              onClick={() => setShowETANotification(true)}
              className="py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-xs font-medium text-white transition-all flex items-center justify-center gap-1.5"
            >
              <Bell className="w-3 h-3" />
              ETA Update
            </button>
            <button
              onClick={() => setShowIncidentPrediction(true)}
              className="py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-xs font-medium text-white transition-all flex items-center justify-center gap-1.5"
            >
              <AlertIcon className="w-3 h-3" />
              Risk Alert
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Auto Task Swap */}
    <AutoTaskSwap
      swap={taskSwap}
      onAcceptSwap={handleAcceptSwap}
      onDeclineSwap={handleDeclineSwap}
      isVisible={showTaskSwap}
    />

    {/* Smart Delivery Optimizer */}
    <SmartDeliveryOptimizer
      isVisible={showSmartOptimizer}
      onClose={() => setShowSmartOptimizer(false)}
      onAcceptOptimization={handleAcceptOptimization}
      onDeclineOptimization={handleDeclineOptimization}
      timeWindows={customerTimeWindows}
      optimizedRoute={optimizedRoute}
    />

    {/* Delivery Details Screen */}
    {selectedDelivery && (
      <DeliveryDetailsScreen
        isVisible={showDeliveryDetails}
        onClose={() => setShowDeliveryDetails(false)}
        delivery={selectedDelivery}
        onCallCustomer={handleCallCustomer}
        onMessageCustomer={handleMessageCustomer}
        onStartDelivery={handleStartDelivery}
        onCompleteDelivery={handleCompleteDelivery}
        onReschedule={handleReschedule}
        onReorderStops={handleReorderStops}
      />
    )}

    {/* Safe Stop Assistant */}
    <SafeStopAssistant
      isVisible={showSafeStop}
      onClose={() => setShowSafeStop(false)}
      onStopSelect={(stop) => {
        setShowSafeStop(false);
      }}
      currentIssue={currentIssue}
    />

    {/* ETA Update Notification */}
    <ETAUpdateNotification
      isVisible={showETANotification}
      onClose={() => setShowETANotification(false)}
      oldETA="12:30 PM"
      newETA="12:45 PM"
      customerName="Sarah Johnson"
      delayMinutes={15}
      reason="Heavy traffic on Main Street"
    />

    {/* Incident Prediction */}
    <IncidentPrediction
      isVisible={showIncidentPrediction}
      onClose={() => setShowIncidentPrediction(false)}
      onAction={(action) => {
        console.log('Incident action:', action);
        setShowIncidentPrediction(false);
        if (action === 'reroute') {
          // Trigger reroute logic
        }
      }}
      incident={{
        id: 'incident-1',
        type: 'congestion',
        severity: 'warning',
        title: 'High Congestion Risk Detected',
        description: 'Traffic patterns indicate 80% chance of heavy congestion ahead',
        timeUntil: '15 min',
        confidence: 82,
        impact: 'medium',
        suggestedAction: 'Take alternate route via Highway 101 to avoid delays',
        alternateRouteAvailable: true
      }}
    />
  </div>
);
}
