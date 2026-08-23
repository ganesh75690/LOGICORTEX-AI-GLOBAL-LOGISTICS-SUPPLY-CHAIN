import { motion } from 'motion/react';
import { 
  ArrowLeft,
  CheckCircle2,
  Shield,
  Clock,
  MapPin,
  Award,
  FileText,
  Download
} from 'lucide-react';

interface Props {
  shipmentId: string;
  onBack: () => void;
}

interface VerificationData {
  shipmentId: string;
  deliveredAt: string;
  destination: string;
  verificationItems: {
    icon: any;
    label: string;
    verified: boolean;
  }[];
  verificationConfidence: number;
  handoverConfirmed: boolean;
  podAvailable: boolean;
}

export function CustomerDeliveryTrust({ shipmentId, onBack }: Props) {
  const verificationData: VerificationData = {
    shipmentId,
    deliveredAt: '16:38',
    destination: '123 Sector 45, Gurugram',
    verificationItems: [
      { icon: MapPin, label: 'Destination verified', verified: true },
      { icon: Clock, label: 'Delivery time recorded', verified: true },
      { icon: Shield, label: 'Route consistency checked', verified: true },
      { icon: Award, label: 'Delivery evidence received', verified: true },
      { icon: CheckCircle2, label: 'Handover confirmed', verified: true }
    ],
    verificationConfidence: 98,
    handoverConfirmed: true,
    podAvailable: true
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/50 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">DELIVERY VERIFIED</h1>
            <p className="text-xs text-zinc-400">SHIPMENT #{shipmentId}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Success Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">DELIVERY COMPLETE</h2>
          <p className="text-sm text-zinc-300">Your shipment has been successfully delivered and verified</p>
        </motion.div>

        {/* Delivery Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4">DELIVERY SUMMARY</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Delivered At</span>
              <span className="text-sm text-white font-medium">{verificationData.deliveredAt}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Destination</span>
              <span className="text-sm text-white">{verificationData.destination}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-xs text-zinc-400">Handover Status</span>
              <span className="text-sm text-green-400 font-medium">Confirmed</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-zinc-400">Shipment ID</span>
              <span className="text-sm text-white">{verificationData.shipmentId}</span>
            </div>
          </div>
        </motion.div>

        {/* Verification Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4">VERIFICATION CHECKLIST</h3>
          
          <div className="space-y-3">
            {verificationData.verificationItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.verified ? 'bg-green-500/20' : 'bg-zinc-800/50'
                  }`}>
                    <Icon className={`w-4 h-4 ${item.verified ? 'text-green-400' : 'text-zinc-400'}`} />
                  </div>
                  <span className={`text-sm ${item.verified ? 'text-white' : 'text-zinc-400'}`}>
                    {item.label}
                  </span>
                  {item.verified && (
                    <CheckCircle2 className="w-4 h-4 text-green-400 ml-auto" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Verification Confidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-white">VERIFICATION CONFIDENCE</span>
            </div>
            <span className="text-2xl font-bold text-cyan-400">{verificationData.verificationConfidence}%</span>
          </div>
          <p className="text-xs text-zinc-400">
            Based on destination verification, delivery time recording, route consistency check, delivery evidence, and handover confirmation.
          </p>
        </motion.div>

        {/* Proof of Delivery */}
        {verificationData.podAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Proof of Delivery</h4>
                  <p className="text-xs text-zinc-400">Digital delivery receipt available</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center hover:bg-cyan-500/30 transition-colors">
                <Download className="w-5 h-5 text-cyan-400" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Trust Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your delivery has been verified through the AI Delivery Verification Engine™. This ensures your shipment was delivered to the correct location, at the confirmed time, with proper handover documentation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}