import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  Shield,
  History,
  Settings,
  User,
  Menu
} from 'lucide-react';

interface Shipment {
  id: string;
  status: 'confirmed' | 'dispatched' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'delayed' | 'disrupted';
  eta: string;
  etaWindow: string;
  confidence: number;
  priority: number;
  destination: string;
  progress: number;
}

interface Props {
  onTrackShipment: (shipmentId: string) => void;
  onViewHistory: () => void;
  onViewPreferences: () => void;
  onMenuToggle: () => void;
  onNavigate: (screen: string) => void;
}

export function CustomerDeliveryDashboard({ 
  onTrackShipment, 
  onViewHistory, 
  onViewPreferences, 
  onMenuToggle,
  onNavigate
}: Props) {
  const [activeShipments] = useState<Shipment[]>([
    {
      id: 'LX20481',
      status: 'out_for_delivery',
      eta: '16:32',
      etaWindow: '16:20–16:40',
      confidence: 94,
      priority: 2,
      destination: 'Home - 123 Sector 45, Gurugram',
      progress: 75
    },
    {
      id: 'LX20482',
      status: 'in_transit',
      eta: '18:45',
      etaWindow: '18:30–19:00',
      confidence: 87,
      priority: 1,
      destination: 'Office - Tech Park, Noida',
      progress: 45
    }
  ]);

  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case 'confirmed': return 'text-blue-400';
      case 'dispatched': return 'text-cyan-400';
      case 'in_transit': return 'text-purple-400';
      case 'out_for_delivery': return 'text-green-400';
      case 'delivered': return 'text-emerald-400';
      case 'delayed': return 'text-yellow-400';
      case 'disrupted': return 'text-orange-400';
    }
  };

  const getStatusBg = (status: Shipment['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500/10 border-blue-500/30';
      case 'dispatched': return 'bg-cyan-500/10 border-cyan-500/30';
      case 'in_transit': return 'bg-purple-500/10 border-purple-500/30';
      case 'out_for_delivery': return 'bg-green-500/10 border-green-500/30';
      case 'delivered': return 'bg-emerald-500/10 border-emerald-500/30';
      case 'delayed': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'disrupted': return 'bg-orange-500/10 border-orange-500/30';
    }
  };

  const getStatusLabel = (status: Shipment['status']) => {
    switch (status) {
      case 'confirmed': return 'Order Confirmed';
      case 'dispatched': return 'Shipment Dispatched';
      case 'in_transit': return 'In Transit';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'delayed': return 'Delayed';
      case 'disrupted': return 'Disrupted';
    }
  };

  const getProgressSteps = (progress: number) => {
    const steps = [
      { label: 'Order Confirmed', complete: progress >= 20 },
      { label: 'Shipment Dispatched', complete: progress >= 40 },
      { label: 'In Transit', complete: progress >= 60 },
      { label: 'Out for Delivery', complete: progress >= 80 },
      { label: 'Delivered', complete: progress >= 100 }
    ];
    return steps;
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                MY DELIVERIES
              </h1>
              <p className="text-sm text-zinc-400">
                Customer Delivery Intelligence & Trust Portal™
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('customer-preferences')}
              className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              title="Preferences"
            >
              <Settings className="w-5 h-5 text-zinc-400" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Deliveries */}
      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">ACTIVE DELIVERIES</h2>
        
        {activeShipments.map((shipment) => (
          <motion.div
            key={shipment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-zinc-900/50 backdrop-blur-xl border rounded-2xl p-4 md:p-6 cursor-pointer hover:border-cyan-500/50 transition-all ${getStatusBg(shipment.status)}`}
            onClick={() => onTrackShipment(shipment.id)}
          >
            {/* Shipment Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    SHIPMENT #{shipment.id}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getStatusColor(shipment.status)}`}>
                      {getStatusLabel(shipment.status)}
                    </span>
                    {shipment.status === 'disrupted' && (
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            </div>

            {/* ETA and Confidence */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-zinc-400 mb-1">ETA</p>
                <p className="text-lg font-bold text-white">{shipment.eta}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-1">Window</p>
                <p className="text-sm text-white">{shipment.etaWindow}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-1">AI Confidence</p>
                <p className="text-lg font-bold text-cyan-400">{shipment.confidence}%</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400 mb-1">Priority</p>
                <p className={`text-sm font-medium ${shipment.priority === 2 ? 'text-orange-400' : 'text-green-400'}`}>
                  {shipment.priority === 2 ? 'High' : 'Normal'}
                </p>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-center gap-2 mb-4 p-3 bg-zinc-800/30 rounded-xl">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <p className="text-sm text-white">{shipment.destination}</p>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Progress</span>
                <span>{shipment.progress}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs mt-2">
                {getProgressSteps(shipment.progress).map((step, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    {step.complete ? (
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border-2 border-zinc-600" />
                )}
                <span className={`hidden md:inline ${step.complete ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  {step.label}
                </span>
              </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <button
          onClick={() => onNavigate('customer-history')}
          className="p-4 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl text-left hover:border-cyan-500/50 transition-all"
        >
          <History className="w-6 h-6 text-cyan-400 mb-2" />
          <p className="text-sm font-medium text-white">Delivery History</p>
          <p className="text-xs text-zinc-400">View past deliveries</p>
        </button>
        <button
          onClick={() => onNavigate('customer-preferences')}
          className="p-4 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl text-left hover:border-cyan-500/50 transition-all"
        >
          <Settings className="w-6 h-6 text-purple-400 mb-2" />
          <p className="text-sm font-medium text-white">Preferences</p>
          <p className="text-xs text-zinc-400">Delivery settings</p>
        </button>
        <button className="p-4 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl text-left hover:border-cyan-500/50 transition-all">
          <Shield className="w-6 h-6 text-orange-400 mb-2" />
          <p className="text-sm font-medium text-white">Report Issue</p>
          <p className="text-xs text-zinc-400">Delivery problem</p>
        </button>
      </div>

      {/* Trust Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 md:p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">
              DELIVERY INTELLIGENCE & TRUST
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Your delivery should never feel like a black box. Track, predict, understand, and verify your shipments with transparent AI-powered logistics intelligence.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}