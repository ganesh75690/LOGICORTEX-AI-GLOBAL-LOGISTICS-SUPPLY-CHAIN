import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Menu,
  Clock,
  AlertTriangle,
  Activity,
  Route,
  User,
  CheckCircle2,
  Package,
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

export function RecoveryTimeline({ onMenuToggle, onBack }: Props) {
  const timelineEvents: TimelineEvent[] = [
    { 
      time: '14:12', 
      event: 'Vehicle incident detected', 
      icon: AlertTriangle, 
      status: 'completed',
      details: 'VH-4521 mechanical failure at Mile 42, Highway 101'
    },
    { 
      time: '14:13', 
      event: 'Mission impact analyzed', 
      icon: Activity, 
      status: 'completed',
      details: '8 shipments affected, 2 high-priority at risk'
    },
    { 
      time: '14:14', 
      event: 'Recovery candidates evaluated', 
      icon: User, 
      status: 'completed',
      details: '5 eligible drivers found within 15km radius'
    },
    { 
      time: '14:15', 
      event: 'AI recommends DRV-2087', 
      icon: Activity, 
      status: 'completed',
      details: '94% recovery confidence, +12min expected delay'
    },
    { 
      time: '14:16', 
      event: 'Handover approved', 
      icon: CheckCircle2, 
      status: 'completed',
      details: 'Human authorization granted for mission transfer'
    },
    { 
      time: '14:18', 
      event: 'Replacement driver receives mission', 
      icon: User, 
      status: 'completed',
      details: 'DRV-2087 accepted mission MSN-20481'
    },
    { 
      time: '14:25', 
      event: 'Mission resumed', 
      icon: Route, 
      status: 'completed',
      details: 'Handover checklist complete, route synchronized'
    },
    { 
      time: '16:32', 
      event: 'Recovered delivery completed', 
      icon: Package, 
      status: 'completed',
      details: 'All 8 shipments verified with 98% confidence'
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
    console.log('Downloading recovery timeline');
  };

  const handleShare = () => {
    console.log('Sharing recovery timeline');
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
            <h1 className="text-lg font-bold text-white">Recovery Timeline</h1>
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
        {/* Recovery Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">MISSION RECOVERY COMPLETED</h3>
              <p className="text-xs text-zinc-400">
                Successfully transferred mission from DRV-1048 to DRV-2087
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 bg-zinc-800/30 rounded-lg">
              <p className="text-xs text-zinc-400">Time Saved</p>
              <p className="text-sm font-bold text-green-400">+25 min</p>
            </div>
            <div className="text-center p-2 bg-zinc-800/30 rounded-lg">
              <p className="text-xs text-zinc-400">Delay Impact</p>
              <p className="text-sm font-bold text-cyan-400">+12 min</p>
            </div>
            <div className="text-center p-2 bg-zinc-800/30 rounded-lg">
              <p className="text-xs text-zinc-400">Success Rate</p>
              <p className="text-sm font-bold text-green-400">98%</p>
            </div>
          </div>

          <div className="p-3 bg-zinc-800/30 rounded-xl">
            <p className="text-xs text-zinc-300 leading-relaxed">
              AI successfully detected disruption, analyzed alternatives, and implemented optimal recovery plan. 
              Driver safety maintained while minimizing delivery impact. All recovered deliveries verified.
            </p>
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
            Recovery Timeline
          </h3>

          <div className="space-y-0">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLast = index === timelineEvents.length - 1;
              
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-16 text-xs text-zinc-400 pt-1.5 flex-shrink-0">{event.time}</div>
                  
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

        {/* Recovery Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            Recovery Statistics
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Total Recovery Time</p>
              <p className="text-lg font-bold text-white">4 min</p>
              <p className="text-xs text-green-400">Excellent</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">AI Response Time</p>
              <p className="text-lg font-bold text-white">30 sec</p>
              <p className="text-xs text-cyan-400">Fast</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Drivers Evaluated</p>
              <p className="text-lg font-bold text-white">5</p>
              <p className="text-xs text-zinc-400">Available</p>
            </div>
            <div className="bg-zinc-800/30 rounded-xl p-3">
              <p className="text-xs text-zinc-400 mb-1">Best Confidence</p>
              <p className="text-lg font-bold text-cyan-400">94%</p>
              <p className="text-xs text-zinc-400">Score</p>
            </div>
          </div>
        </motion.div>

        {/* AI Learning Impact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            AI Learning Impact
          </h3>

          <div className="space-y-2 text-xs text-zinc-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
              <span>Recovery pattern stored for future incident prediction</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
              <span>Driver response time integrated into capability model</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
              <span>Route optimization model updated with recovery data</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
              <span>Trust validation patterns refined for future matching</span>
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