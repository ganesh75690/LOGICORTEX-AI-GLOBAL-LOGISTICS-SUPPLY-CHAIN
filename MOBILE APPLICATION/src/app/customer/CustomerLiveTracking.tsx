import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Package,
  MapPin,
  Clock,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Info,
  Lightbulb,
  Menu
} from 'lucide-react';

interface Props {
  shipmentId: string;
  onBack: () => void;
  onExplainDelivery: () => void;
  onMenuToggle: () => void;
}

interface TrackingData {
  shipmentId: string;
  status: 'on_the_way' | 'approaching' | 'arrived' | 'delivered';
  location: string;
  destination: string;
  distanceRemaining: number;
  eta: string;
  etaWindow: string;
  lastUpdate: string;
  confidence: number;
  isRecovering: boolean;
}

export function CustomerLiveTracking({ shipmentId, onBack, onExplainDelivery, onMenuToggle }: Props) {
  const [trackingData, setTrackingData] = useState<TrackingData>({
    shipmentId,
    status: 'on_the_way',
    location: 'Near Sector 46, Gurugram',
    destination: '123 Sector 45, Gurugram',
    distanceRemaining: 6.4,
    eta: '16:32',
    etaWindow: '16:20–16:40',
    lastUpdate: 'Just now',
    confidence: 94,
    isRecovering: false
  });

  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState('');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackingData(prev => ({
        ...prev,
        distanceRemaining: Math.max(0, prev.distanceRemaining - 0.1),
        lastUpdate: 'Just now'
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleExplainDelivery = () => {
    // Generate AI explanation
    const explanations = [
      "Your delivery is currently on the optimal route. Traffic conditions are normal, and we expect on-time arrival.",
      "We've identified a minor traffic delay ahead. LogiCortex AI has already adjusted the route to minimize impact.",
      "Your delivery is progressing smoothly. The driver is ahead of schedule for this segment of the route."
    ];
    setExplanation(explanations[Math.floor(Math.random() * explanations.length)]);
    setShowExplanation(true);
  };

  const getStatusColor = () => {
    switch (trackingData.status) {
      case 'on_the_way': return 'text-green-400';
      case 'approaching': return 'text-cyan-400';
      case 'arrived': return 'text-purple-400';
      case 'delivered': return 'text-emerald-400';
    }
  };

  const getStatusLabel = () => {
    switch (trackingData.status) {
      case 'on_the_way': return 'ON THE WAY';
      case 'approaching': return 'APPROACHING';
      case 'arrived': return 'ARRIVED';
      case 'delivered': return 'DELIVERED';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">LIVE TRACKING</h1>
              <p className="text-xs text-zinc-400">SHIPMENT #{shipmentId}</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors">
            <RefreshCw className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Simplified Map View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4 relative overflow-hidden"
        >
          {/* Simplified Map Representation */}
          <div className="h-48 md:h-64 bg-zinc-800/50 rounded-xl relative">
            {/* Route Line */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-32 bg-gradient-to-b from-cyan-500 to-purple-600 rounded-full opacity-50" />
            </div>
            
            {/* Current Location Marker */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
              <div className="w-8 h-8 rounded-full bg-cyan-500 border-4 border-cyan-300 animate-pulse" />
            </div>
            
            {/* Destination Marker */}
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
              <div className="w-8 h-8 rounded-full bg-purple-500 border-4 border-purple-300 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Distance Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900/90 px-3 py-1 rounded-full">
              <span className="text-xs text-white">{trackingData.distanceRemaining.toFixed(1)} km</span>
            </div>
          </div>

          {/* Map Legend */}
          <div className="flex items-center justify-center gap-4 mt-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              <span className="text-zinc-400">Current</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-zinc-400">Destination</span>
            </div>
          </div>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-zinc-900/50 backdrop-blur-xl border rounded-2xl p-4 ${
            trackingData.isRecovering 
              ? 'bg-orange-500/10 border-orange-500/30' 
              : 'border-zinc-800/50'
          }`}
        >
          {trackingData.isRecovering && (
            <div className="flex items-center gap-2 mb-3 p-2 bg-orange-500/10 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-orange-400">DELIVERY PLAN ADJUSTED</span>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Navigation className={`w-5 h-5 ${getStatusColor()}`} />
              <span className={`text-lg font-bold ${getStatusColor()}`}>
                {getStatusLabel()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <RefreshCw className="w-3 h-3 text-zinc-400 animate-spin" />
              <span className="text-xs text-zinc-400">{trackingData.lastUpdate}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-400 mb-1">ETA</p>
              <p className="text-2xl font-bold text-white">{trackingData.eta}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400 mb-1">Window</p>
              <p className="text-sm text-white">{trackingData.etaWindow}</p>
            </div>
          </div>
        </motion.div>

        {/* Explain My Delivery Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleExplainDelivery}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
        >
          <Lightbulb className="w-5 h-5" />
          EXPLAIN MY DELIVERY
        </motion.button>

        {/* AI Explanation */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-2">AI EXPLANATION</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {explanation}
                </p>
              </div>
              <button
                onClick={() => setShowExplanation(false)}
                className="w-6 h-6 rounded-lg bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        {/* Delivery Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4 space-y-3"
        >
          <h3 className="text-sm font-semibold text-white mb-3">DELIVERY DETAILS</h3>
          
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-zinc-400 mb-1">Destination</p>
              <p className="text-sm text-white">{trackingData.destination}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Package className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-zinc-400 mb-1">Shipment ID</p>
              <p className="text-sm text-white">{trackingData.shipmentId}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-zinc-400 mb-1">AI Confidence</p>
              <p className="text-sm text-cyan-400 font-medium">{trackingData.confidence}%</p>
              <p className="text-xs text-zinc-500">Based on current route conditions</p>
            </div>
          </div>
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-zinc-400 leading-relaxed">
              For your privacy, driver personal information is not displayed. You'll receive a delivery verification notification when your shipment arrives.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}