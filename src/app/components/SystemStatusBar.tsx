import { useState, useEffect } from 'react';
import { Clock, Wifi, Activity, Server } from 'lucide-react';

export function SystemStatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [latency, setLatency] = useState(42);
  const [systemLoad, setSystemLoad] = useState(67);
  const [connectionStatus, setConnectionStatus] = useState<'excellent' | 'good' | 'poor'>('excellent');

  useEffect(() => {
    // Update clock every second
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate latency changes
    const latencyInterval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 20) + 35);
    }, 3000);

    // Simulate system load changes
    const loadInterval = setInterval(() => {
      setSystemLoad(Math.floor(Math.random() * 30) + 55);
    }, 4000);

    // Simulate connection status changes
    const connectionInterval = setInterval(() => {
      const statuses: ('excellent' | 'good' | 'poor')[] = ['excellent', 'good', 'excellent'];
      setConnectionStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 8000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(latencyInterval);
      clearInterval(loadInterval);
      clearInterval(connectionInterval);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return 'text-green-400';
    if (latency < 100) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConnectionColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getLoadColor = (load: number) => {
    if (load < 70) return 'text-green-400';
    if (load < 85) return 'text-yellow-400';
    return 'text-red-400';
  };

  
  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-lg">
      {/* Live Clock */}
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-[#00F5C4]" />
        <span className="text-sm text-white font-mono">
          {formatTime(currentTime)}
        </span>
      </div>

      {/* Latency Meter */}
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-[#00F5C4]" />
        <span className={`text-sm font-mono ${getLatencyColor(latency)}`}>
          {latency}
        </span>
      </div>

      {/* System Load */}
      <div className="flex items-center gap-2">
        <Server className="w-4 h-4 text-[#00F5C4]" />
        <div className="flex items-center gap-1">
          <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                systemLoad < 70 ? 'bg-green-400' :
                systemLoad < 85 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${systemLoad}%` }}
            />
          </div>
          <span className={`text-xs font-mono ${getLoadColor(systemLoad)}`}>
            {systemLoad}%
          </span>
        </div>
      </div>

      {/* Connection Status */}
      <div className="flex items-center gap-2">
        <Wifi className={`w-4 h-4 ${getConnectionColor(connectionStatus)}`} />
        <span className={`text-xs font-medium ${getConnectionColor(connectionStatus)}`}>
          {connectionStatus.toUpperCase()}
        </span>
      </div>

      {/* Live Indicator */}
      <div className="flex items-center gap-2 ml-auto">
        <div className="w-2 h-2 bg-[#00F5C4] rounded-full animate-pulse" />
        <span className="text-xs text-[#00F5C4] font-medium">LIVE</span>
      </div>
    </div>
  );
}
