import { motion } from 'motion/react';
import { 
  Clock, 
  ArrowLeft,
  Menu,
  CheckCircle2,
  AlertCircle,
  Activity,
  Route,
  User,
  Package,
  TrendingUp,
  Download,
  Share2
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
}

interface TimelineEvent {
  time: string;
  event: string;
  icon: any;
  status: 'completed' | 'in_progress' | 'pending';
  details?: string;
}

export function IncidentTimelineScreen({ 
  onMenuToggle, 
  onBack
}: Props) {
  const timelineEvents: TimelineEvent[] = [
    { 
      time: '14:10', 
      event: 'Incident detected', 
      icon: AlertCircle, 
      status: 'completed',
      details: 'Traffic disruption detected on Highway 101'
    },
    { 
      time: '14:11', 
      event: 'AI analyzed alternatives', 
      icon: Activity, 
      status: 'completed',
      details: 'Evaluated 3 alternative routes and 2 stop reorderings'
    },
    { 
      time: '14:12', 
      event: 'New route generated', 
      icon: Route, 
      status: 'completed',
      details: 'Optimal route selected with 18 min time savings'
    },
    { 
      time: '14:12', 
      event: 'Driver notified', 
      icon: User, 
      status: 'completed',
      details: 'Push notification sent to driver mobile'
    },
    { 
      time: '14:13', 
      event: 'Supplier notified', 
      icon: Package, 
      status: 'completed',
      details: 'ETA update sent to supplier portal'
    },
    { 
      time: '14:14', 
      event: 'Mission resumed', 
      icon: CheckCircle2, 
      status: 'completed',
      details: 'Driver accepted new mission plan'
    },
    { 
      time: '14:15', 
      event: 'Decision logged', 
      icon: TrendingUp, 
      status: 'in_progress',
      details: 'Storing decision for AI learning'
    },
  ];

  const getStatusColor = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in_progress': return 'text-cyan-400';
      case 'pending': return 'text-zinc-500';
    }
  };

  const getStatusBg = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 border-green-500/30';
      case 'in_progress': return 'bg-cyan-500/20 border-cyan-500/30';
      case 'pending': return 'bg-zinc-500/20 border-zinc-500/30';
    }
  };

  const handleDownload = () => {
    console.log('Downloading incident timeline');
  };

  const handleShare = () => {
    console.log('Sharing incident timeline');
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
            <h1 className="text-lg font-bold text-white">Incident Timeline</h1>
            <p className="text-xs text-zinc-400">Decision Replay & Audit Trail</p>
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Incident Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">TRAFFIC DISRUPTION</h3>
              <p className="text-sm text-zinc-400 mb-2">Highway 101, Mile 42</p>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-orange-400 font-medium">MEDIUM SEVERITY</span>
                <span className="text-zinc-400">14:10 - 14:15</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Event Timeline
          </h3>

          <div className="space-y-0">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLast = index === timelineEvents.length - 1;
              
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-16 text-xs text-zinc-400 pt-1 flex-shrink-0">{event.time}</div>
                  
                  <div className="flex-1 pb-6 relative">
                    {!isLast && (
                      <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-zinc-800" />
                    )}
                    
                    <div className={`flex items-center gap-2 p-2 rounded-lg ${getStatusBg(event.status)} border`}>
                      <Icon className={`w-3 h-3 ${getStatusColor(event.status)}`} />
                      <div className="flex-1">
                        <p className="text-xs text-white font-medium">{event.event}</p>
                        {event.details && (
                          <p className="text-xs text-zinc-400 mt-0.5">{event.details}</p>
                        )}
                      </div>
                      {event.status === 'completed' && (
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                      )}
                      {event.status === 'in_progress' && (
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Outcome Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            Resolution Summary
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Time Saved</p>
              <p className="text-lg font-bold text-green-400">+18 min</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Stops Affected</p>
              <p className="text-lg font-bold text-white">3</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Resolution Time</p>
              <p className="text-lg font-bold text-white">4 min</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Driver Safety</p>
              <p className="text-lg font-bold text-green-400">Safe</p>
            </div>
          </div>

          <div className="p-3 bg-zinc-800/30 rounded-xl">
            <p className="text-xs text-zinc-300 leading-relaxed">
              AI successfully detected disruption, analyzed alternatives, and implemented optimal response plan. 
              Driver safety maintained while minimizing delivery impact.
            </p>
          </div>
        </motion.div>

        {/* AI Learning */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            AI Learning Impact
          </h3>

          <div className="space-y-2 text-xs text-zinc-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
              <span>Decision pattern stored for future incident prediction</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
              <span>Route optimization model updated with new traffic data</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
              <span>Driver response time integrated into capability model</span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={handleDownload}
            className="flex flex-col items-center gap-2 p-4 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800/50 rounded-xl transition-colors"
          >
            <Download className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-white">Download Report</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-2 p-4 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800/50 rounded-xl transition-colors"
          >
            <Share2 className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-white">Share</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}