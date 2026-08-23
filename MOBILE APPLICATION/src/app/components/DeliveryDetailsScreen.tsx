import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Phone, MessageSquare, Package, Clock, MapPin, AlertTriangle, TrendingUp, CheckCircle, User, Navigation, Zap } from 'lucide-react';
import { useState } from 'react';

interface PackageInfo {
  id: string;
  type: 'document' | 'parcel' | 'food' | 'fragile' | 'large';
  priority: 'high' | 'medium' | 'low';
  weight: string;
  dimensions: string;
  specialInstructions?: string;
}

interface DeliveryDetails {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  coordinates: { lat: number; lng: number };
  timeWindow: {
    start: string;
    end: string;
    preferred: string;
  };
  packages: PackageInfo[];
  deliveryRisk: {
    percentage: number;
    factors: string[];
    suggestion: string;
    bestTime: string;
  };
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  estimatedTime: string;
  actualTime?: string;
  notes?: string;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  delivery: DeliveryDetails;
  onCallCustomer: (phone: string) => void;
  onMessageCustomer: (phone: string) => void;
  onStartDelivery: (deliveryId: string) => void;
  onCompleteDelivery: (deliveryId: string) => void;
  onReschedule: (deliveryId: string) => void;
  onReorderStops: (deliveryId: string) => void;
}

export function DeliveryDetailsScreen({ 
  isVisible, 
  onClose, 
  delivery, 
  onCallCustomer, 
  onMessageCustomer,
  onStartDelivery,
  onCompleteDelivery,
  onReschedule,
  onReorderStops
}: Props) {
  const [showActionConfirmation, setShowActionConfirmation] = useState<'call' | 'message' | 'reschedule' | 'reorder' | null>(null);

  const getPackageIcon = (type: string) => {
    switch (type) {
      case 'document': return '📄';
      case 'parcel': return '📦';
      case 'food': return '🍱';
      case 'fragile': return '🏆';
      case 'large': return '📋';
      default: return '📦';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-zinc-400 bg-zinc-500/20 border-zinc-500/30';
    }
  };

  const getRiskColor = (percentage: number) => {
    if (percentage >= 70) return 'text-red-400 bg-red-500/20 border-red-500/30';
    if (percentage >= 40) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-green-400 bg-green-500/20 border-green-500/30';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-blue-400';
      case 'failed': return 'text-red-400';
      default: return 'text-zinc-400';
    }
  };

  const handleAction = (action: 'call' | 'message' | 'reschedule' | 'reorder') => {
    setShowActionConfirmation(action);
  };

  const confirmAction = () => {
    switch (showActionConfirmation) {
      case 'call':
        onCallCustomer(delivery.customerPhone);
        break;
      case 'message':
        onMessageCustomer(delivery.customerPhone);
        break;
      case 'reschedule':
        onReschedule(delivery.id);
        break;
      case 'reorder':
        onReorderStops(delivery.id);
        break;
    }
    setShowActionConfirmation(null);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="bg-zinc-900 border-t-4 border-cyan-500 rounded-t-3xl p-4 sm:p-6 max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-4 h-4 text-white" />
                </button>
                <div>
                  <h3 className="text-lg font-bold text-white">Delivery Details</h3>
                  <p className="text-xs text-cyan-400">Stop #{delivery.id}</p>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(delivery.status)} animate-pulse`} />
            </div>

            {/* Customer Info */}
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">{delivery.customerName}</h4>
                    <p className="text-xs text-zinc-400">{delivery.customerPhone}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(delivery.status)} bg-current/20`}>
                  {delivery.status}
                </span>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-zinc-300">{delivery.address}</p>
              </div>
            </div>

            {/* Time Window */}
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-zinc-400" />
                <h4 className="text-sm font-semibold text-white">Delivery Time Window</h4>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Available:</span>
                  <span className="text-sm text-white">{delivery.timeWindow.start} - {delivery.timeWindow.end}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Preferred:</span>
                  <span className="text-sm text-cyan-400">{delivery.timeWindow.preferred}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Estimated:</span>
                  <span className="text-sm text-white">{delivery.estimatedTime}</span>
                </div>
                {delivery.actualTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Actual:</span>
                    <span className="text-sm text-green-400">{delivery.actualTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Package Information */}
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-zinc-400" />
                <h4 className="text-sm font-semibold text-white">Package Information ({delivery.packages.length})</h4>
              </div>
              
              <div className="space-y-2">
                {delivery.packages.map((pkg, index) => (
                  <div key={pkg.id} className="flex items-center justify-between p-2 bg-zinc-900/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getPackageIcon(pkg.type)}</span>
                      <div>
                        <p className="text-xs text-white capitalize">{pkg.type}</p>
                        <p className="text-[10px] text-zinc-400">{pkg.weight} • {pkg.dimensions}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg border ${getPriorityColor(pkg.priority)}`}>
                      {pkg.priority}
                    </span>
                  </div>
                ))}
              </div>
              
              {delivery.packages.some(pkg => pkg.specialInstructions) && (
                <div className="mt-3 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <p className="text-xs text-yellow-400">
                    <strong>Special Instructions:</strong> {delivery.packages.find(pkg => pkg.specialInstructions)?.specialInstructions}
                  </p>
                </div>
              )}
            </div>

            {/* AI Risk Assessment */}
            <div className={`rounded-xl p-4 mb-4 border ${getRiskColor(delivery.deliveryRisk.percentage)}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-current/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-current" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white">Delivery Risk Assessment</h4>
                    <span className="text-lg font-bold text-current">{delivery.deliveryRisk.percentage}%</span>
                  </div>
                  
                  {/* Risk Factors */}
                  <div className="space-y-1 mb-3">
                    {delivery.deliveryRisk.factors.map((factor, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        <p className="text-xs text-zinc-300">{factor}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* AI Suggestion */}
                  <div className="bg-zinc-900/50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Zap className="w-3 h-3 text-cyan-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-cyan-400 mb-1">AI Suggestion</p>
                        <p className="text-xs text-zinc-300">{delivery.deliveryRisk.suggestion}</p>
                        <p className="text-xs text-green-400 mt-1">Best time: {delivery.deliveryRisk.bestTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Communication */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAction('call')}
                  className="py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-xl text-sm font-medium text-cyan-400 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Customer
                </button>
                <button
                  onClick={() => handleAction('message')}
                  className="py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-sm font-medium text-purple-400 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </button>
              </div>

              {/* Delivery Actions */}
              {delivery.status === 'pending' && (
                <button
                  onClick={() => onStartDelivery(delivery.id)}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-sm font-medium text-white transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Start Delivery
                </button>
              )}

              {delivery.status === 'in-progress' && (
                <button
                  onClick={() => onCompleteDelivery(delivery.id)}
                  className="w-full py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl text-sm font-medium text-white transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Complete Delivery
                </button>
              )}

              {/* AI Recommendations */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAction('reschedule')}
                  className="py-2.5 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-xl text-sm font-medium text-yellow-400 transition-all"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => handleAction('reorder')}
                  className="py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-sm font-medium text-purple-400 transition-all"
                >
                  Reorder Stops
                </button>
              </div>
            </div>

            {/* Notes */}
            {delivery.notes && (
              <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg">
                <p className="text-xs text-zinc-400 mb-1">Notes:</p>
                <p className="text-xs text-zinc-300">{delivery.notes}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Action Confirmation Modal */}
      <AnimatePresence>
        {showActionConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                Confirm {showActionConfirmation === 'call' ? 'Call' : showActionConfirmation === 'message' ? 'Message' : showActionConfirmation === 'reschedule' ? 'Reschedule' : 'Reorder Stops'}
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                {showActionConfirmation === 'call' && `Call ${delivery.customerName} at ${delivery.customerPhone}?`}
                {showActionConfirmation === 'message' && `Send a message to ${delivery.customerName}?`}
                {showActionConfirmation === 'reschedule' && 'Reschedule this delivery for a later time?'}
                {showActionConfirmation === 'reorder' && 'Reorder remaining stops to optimize the route?'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowActionConfirmation(null)}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-sm font-medium text-white transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
