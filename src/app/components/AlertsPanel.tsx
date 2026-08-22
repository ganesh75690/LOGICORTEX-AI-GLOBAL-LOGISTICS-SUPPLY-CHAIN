import { AlertTriangle, Info, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  action?: string;
}

const mockAlerts: Alert[] = [
  {
    id: 'A001',
    type: 'critical',
    title: 'Route R002 Delayed',
    message: 'Heavy traffic detected on Highway 101. ETA increased by 45 minutes.',
    timestamp: '2 min ago',
    action: 'Reroute'
  },
  {
    id: 'A002',
    type: 'warning',
    title: 'Low Inventory Alert',
    message: 'Warehouse B stock dropping below threshold for SKU-7845.',
    timestamp: '15 min ago',
    action: 'Reorder'
  },
  {
    id: 'A003',
    type: 'info',
    title: 'Weather Update',
    message: 'Rain expected in downtown district in 2 hours.',
    timestamp: '32 min ago'
  },
  {
    id: 'A004',
    type: 'success',
    title: 'Route Optimized',
    message: 'R003 rerouted successfully. Saved 30 minutes and ₹120 in fuel.',
    timestamp: '1 hour ago'
  },
  {
    id: 'A005',
    type: 'warning',
    title: 'Driver Availability',
    message: '3 drivers approaching max hours. Schedule rotation needed.',
    timestamp: '2 hours ago',
    action: 'Schedule'
  }
];

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState<string>('all');

  // Auto-generate new alerts every few seconds
  useEffect(() => {
    const alertTemplates = [
      {
        type: 'critical' as const,
        titles: ['Route Delay Detected', 'System Overload', 'Critical Inventory Low', 'Network Disruption'],
        messages: [
          'Heavy traffic on Route R005 causing significant delays',
          'AI processing load exceeding 90% capacity',
          'Warehouse A stock below 15% threshold',
          'Communication link unstable with Driver D003'
        ]
      },
      {
        type: 'warning' as const,
        titles: ['Weather Alert', 'Driver Fatigue', 'Equipment Maintenance', 'Demand Spike'],
        messages: [
          'Rain expected in northern region within 2 hours',
          'Driver D007 approaching maximum work hours',
          'Vehicle V012 requires maintenance check',
          'Unexpected demand surge in Zone B'
        ]
      },
      {
        type: 'info' as const,
        titles: ['Route Optimized', 'Inventory Update', 'Schedule Change', 'System Update'],
        messages: [
          'AI found faster route for R008 - saves 15 minutes',
          'Warehouse C inventory levels updated',
          'Delivery schedule adjusted for tomorrow',
          'System performance improved by 12%'
        ]
      },
      {
        type: 'success' as const,
        titles: ['Delivery Completed', 'Cost Savings', 'Efficiency Improved', 'Goal Achieved'],
        messages: [
          'All morning deliveries completed on time',
          'Saved ₹2,340 in fuel costs this week',
          'Route efficiency increased by 18%',
          'Monthly delivery target achieved 3 days early'
        ]
      }
    ];

    const generateNewAlert = () => {
      const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
      const titleIndex = Math.floor(Math.random() * template.titles.length);
      const messageIndex = Math.floor(Math.random() * template.messages.length);
      
      const newAlert: Alert = {
        id: `A${Date.now()}`,
        type: template.type,
        title: template.titles[titleIndex],
        message: template.messages[messageIndex],
        timestamp: 'Just now',
        action: template.type === 'critical' ? 'Investigate' : 
                template.type === 'warning' ? 'Review' : 
                template.type === 'info' ? 'View' : undefined
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep max 10 alerts
    };

    // Generate first alert after 3 seconds, then every 5-8 seconds
    const initialDelay = setTimeout(generateNewAlert, 3000);
    
    const interval = setInterval(() => {
      generateNewAlert();
    }, Math.random() * 3000 + 5000); // Random interval between 5-8 seconds

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  const getAlertConfig = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
      case 'warning':
        return { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
      case 'info':
        return { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
      case 'success':
        return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const filteredAlerts = filter === 'all'
    ? alerts
    : alerts.filter(a => a.type === filter);

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">Real-Time Alerts</h2>
          <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
            {alerts.length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'critical', 'warning', 'info', 'success'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.map((alert, idx) => {
            const config = getAlertConfig(alert.type);
            const Icon = config.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-4 rounded-lg border ${config.bg} ${config.border} backdrop-blur-sm`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{alert.title}</h3>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="text-slate-500 hover:text-slate-300 transition-colors"
                        aria-label={`Dismiss alert: ${alert.title}`}
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                      {alert.action && (
                        <button className={`px-3 py-1 rounded text-xs font-medium ${config.color} bg-white/5 hover:bg-white/10 transition-colors`}>
                          {alert.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
