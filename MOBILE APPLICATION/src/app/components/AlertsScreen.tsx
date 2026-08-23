import { AlertTriangle, Clock, TrendingUp, MapPin, Info, ArrowLeft, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { MobileStatusBar } from './MobileStatusBar';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  actionable?: boolean;
}

interface Props {
  onMenuToggle: () => void;
  onBack?: () => void;
}

export function AlertsScreen({ onMenuToggle, onBack }: Props) {
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'critical',
      title: 'Traffic Delay Predicted',
      description: 'Heavy traffic on Main St will add 12 minutes to your route',
      time: '2 min ago',
      actionable: true,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Customer Availability Risk',
      description: 'Stop #4 has 68% chance of failed delivery based on history',
      time: '5 min ago',
      actionable: true,
    },
    {
      id: '3',
      type: 'info',
      title: 'Route Optimized',
      description: 'AI adjusted your route sequence - saved 8 minutes',
      time: '12 min ago',
      actionable: false,
    },
    {
      id: '4',
      type: 'warning',
      title: 'Weather Alert',
      description: 'Light rain expected in 20 minutes in delivery zone',
      time: '15 min ago',
      actionable: false,
    },
    {
      id: '5',
      type: 'info',
      title: 'Efficiency Milestone',
      description: 'You\'re now in top 10% of drivers in your region',
      time: '1 hour ago',
      actionable: false,
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return AlertTriangle;
      case 'warning':
        return Clock;
      default:
        return Info;
    }
  };

  const getAlertColors = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/50',
          icon: 'text-red-400',
          badge: 'bg-red-500/20 text-red-300',
        };
      case 'warning':
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/50',
          icon: 'text-orange-400',
          badge: 'bg-orange-500/20 text-orange-300',
        };
      default:
        return {
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/30',
          icon: 'text-cyan-400',
          badge: 'bg-cyan-500/20 text-cyan-300',
        };
    }
  };

  return (
    <div className="h-full bg-zinc-950 text-white overflow-y-auto overflow-x-hidden">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
            )}
            <button 
              onClick={onMenuToggle}
              className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              title="Menu"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Alerts</h1>
          <p className="text-sm text-zinc-400">Priority notifications and predictions</p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-red-400">2</p>
            <p className="text-xs text-zinc-400">Critical</p>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-orange-400">1</p>
            <p className="text-xs text-zinc-400">Warning</p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-cyan-400">2</p>
            <p className="text-xs text-zinc-400">Info</p>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {alerts.map((alert, idx) => {
            const Icon = getAlertIcon(alert.type);
            const colors = getAlertColors(alert.type);

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${colors.bg} border ${colors.border} rounded-xl p-4`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <Icon className={`w-5 h-5 ${colors.icon} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{alert.title}</h3>
                      <span className={`px-2 py-0.5 ${colors.badge} rounded text-[10px] font-medium uppercase`}>
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 mb-2">{alert.description}</p>
                    <p className="text-[10px] text-zinc-500">{alert.time}</p>
                  </div>
                </div>

                {alert.actionable && (
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-white transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-xs font-semibold text-white transition-colors">
                      Take Action
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Predictive Insights */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Upcoming Predictions
          </h2>
          <div className="space-y-2">
            <div className="bg-zinc-900/80 border border-purple-500/30 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white mb-1">Stop Sequence Change</h3>
                  <p className="text-xs text-zinc-400 mb-2">
                    AI suggests swapping stops #3 and #4 to avoid school zone traffic
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-purple-500/20 rounded text-[10px] font-medium text-purple-300">
                      88% confident
                    </span>
                    <span className="text-[10px] text-green-400">+6 min saved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
