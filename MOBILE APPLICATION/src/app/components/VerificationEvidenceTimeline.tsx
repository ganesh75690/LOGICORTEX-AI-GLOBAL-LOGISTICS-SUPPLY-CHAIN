import { motion } from 'motion/react';
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowLeft,
  Menu
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface TimelineEvent {
  time: string;
  event: string;
  status: 'verified' | 'pending' | 'anomaly';
}

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  timeline: TimelineEvent[];
  verificationId: string;
}

export function VerificationEvidenceTimeline({ 
  onMenuToggle, 
  onBack,
  timeline,
  verificationId
}: Props) {
  const getStatusIcon = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'anomaly':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusColor = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'verified':
        return 'border-green-500/30 bg-green-500/10';
      case 'pending':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'anomaly':
        return 'border-red-500/30 bg-red-500/10';
    }
  };

  return (
    <div className="size-full flex flex-col bg-zinc-950">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Verification Timeline</h1>
            <p className="text-xs text-zinc-400">Evidence Timeline</p>
          </div>
        </div>
        <button 
          onClick={onMenuToggle}
          className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Verification ID */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4 mb-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-400 mb-1">Verification ID</p>
              <p className="text-sm font-semibold text-white">{verificationId}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-800" />

          {timeline.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-16 pb-6 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className={`absolute left-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                getStatusColor(event.status)
              }`}>
                {getStatusIcon(event.status)}
              </div>

              {/* Event Card */}
              <div className={`bg-zinc-900/50 backdrop-blur-xl border rounded-xl p-4 ${getStatusColor(event.status)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white mb-1">{event.event}</p>
                    <p className="text-xs text-zinc-400">{event.time}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 mt-6"
        >
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white mb-2">Timeline Summary</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                This timeline captures the sequence of evidence collection events for verification audit and decision replay. Each event is timestamped and associated with a verification status.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
