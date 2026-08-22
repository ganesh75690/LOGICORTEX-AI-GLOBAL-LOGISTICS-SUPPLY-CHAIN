import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Cloud, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Car, 
  AlertTriangle, 
  Newspaper, 
  Zap,
  Activity,
  MapPin,
  Clock,
  Eye,
  Satellite,
  Radio,
  Bell
} from 'lucide-react';

interface IntelligenceItem {
  id: string;
  type: 'weather' | 'traffic' | 'news' | 'alert';
  title: string;
  description: string;
  location?: string;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
  source: string;
  priority: number;
  details?: {
    temperature?: number;
    conditions?: string;
    windSpeed?: number;
    trafficLevel?: 'light' | 'moderate' | 'heavy' | 'severe';
    delayMinutes?: number;
    affectedRoutes?: string[];
    newsCategory?: string;
  };
}

export function LiveExternalIntelligence() {
  const [intelligenceItems, setIntelligenceItems] = useState<IntelligenceItem[]>([
    {
      id: '1',
      type: 'weather',
      title: 'Heavy Rain Warning',
      description: 'Severe thunderstorms expected in metro area with potential flooding',
      location: 'Boston Metro',
      impact: 'high',
      timestamp: new Date().toISOString(),
      source: 'National Weather Service',
      priority: 1,
      details: {
        temperature: 68,
        conditions: 'Heavy Rain',
        windSpeed: 25,
        affectedRoutes: ['I-95', 'Highway 1', 'Route 128']
      }
    },
    {
      id: '2',
      type: 'traffic',
      title: 'Major Protest Disruption',
      description: 'Large protest blocking downtown intersections, expect significant delays',
      location: 'Downtown Boston',
      impact: 'high',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      source: 'Traffic Management System',
      priority: 2,
      details: {
        trafficLevel: 'severe',
        delayMinutes: 45,
        affectedRoutes: ['Main Street', '5th Avenue', 'Central Plaza']
      }
    },
    {
      id: '3',
      type: 'news',
      title: 'Port Worker Strike Announced',
      description: 'Union announces 24-hour strike affecting all cargo operations',
      location: 'Port of Boston',
      impact: 'medium',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      source: 'Reuters News',
      priority: 3,
      details: {
        newsCategory: 'Labor',
        affectedRoutes: ['Port Access Road', 'Cargo Terminal A', 'Container Yard B']
      }
    },
    {
      id: '4',
      type: 'weather',
      title: 'Wind Advisory',
      description: 'Strong winds expected, secure outdoor equipment and high-profile vehicles',
      location: 'Coastal Highway 1',
      impact: 'medium',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      source: 'Weather Service',
      priority: 4,
      details: {
        windSpeed: 45,
        conditions: 'Windy',
        affectedRoutes: ['Highway 1', 'Coastal Route 1A']
      }
    },
    {
      id: '5',
      type: 'traffic',
      title: 'Multi-Vehicle Accident',
      description: 'Accident involving 3 vehicles, lane closures in effect',
      location: 'I-93 Northbound',
      impact: 'medium',
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      source: 'Highway Patrol',
      priority: 5,
      details: {
        trafficLevel: 'heavy',
        delayMinutes: 20,
        affectedRoutes: ['I-93 North', 'Exit 15', 'Exit 16']
      }
    },
    {
      id: '6',
      type: 'alert',
      title: 'Road Construction Update',
      description: 'New lane closures for bridge maintenance project',
      location: 'Route 2 Bridge',
      impact: 'low',
      timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
      source: 'DOT Updates',
      priority: 6,
      details: {
        trafficLevel: 'moderate',
        delayMinutes: 10,
        affectedRoutes: ['Route 2 Eastbound', 'Bridge Access Road']
      }
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'weather' | 'traffic' | 'news' | 'alert'>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      setIntelligenceItems(prev => {
        const newItems = [...prev];
        
        // Randomly update timestamps to simulate live data
        if (Math.random() > 0.7) {
          const randomIndex = Math.floor(Math.random() * newItems.length);
          newItems[randomIndex] = {
            ...newItems[randomIndex],
            timestamp: new Date().toISOString()
          };
        }
        
        return newItems.sort((a, b) => b.priority - a.priority);
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather': return CloudRain;
      case 'traffic': return Car;
      case 'news': return Newspaper;
      case 'alert': return AlertTriangle;
      default: return Activity;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'weather': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'traffic': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'news': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'alert': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getTrafficIcon = (level?: string) => {
    switch (level) {
      case 'light': return '🟢';
      case 'moderate': return '🟡';
      case 'heavy': return '🟠';
      case 'severe': return '🔴';
      default: return '⚪';
    }
  };

  const getWeatherIcon = (conditions?: string) => {
    switch (conditions?.toLowerCase()) {
      case 'heavy rain': return '⛈️';
      case 'rain': return '🌧️';
      case 'windy': return '💨';
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      default: return '🌤️';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const filteredItems = filter === 'all' 
    ? intelligenceItems 
    : intelligenceItems.filter(item => item.type === filter);

  const filters = [
    { id: 'all', label: 'All Sources', icon: Globe, count: intelligenceItems.length },
    { id: 'weather', label: 'Weather', icon: Cloud, count: intelligenceItems.filter(i => i.type === 'weather').length },
    { id: 'traffic', label: 'Traffic', icon: Car, count: intelligenceItems.filter(i => i.type === 'traffic').length },
    { id: 'news', label: 'News', icon: Newspaper, count: intelligenceItems.filter(i => i.type === 'news').length },
    { id: 'alert', label: 'Alerts', icon: AlertTriangle, count: intelligenceItems.filter(i => i.type === 'alert').length }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <Satellite className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Live External Intelligence</h3>
            <p className="text-xs text-slate-400">Real-time weather, traffic, and news feeds</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">Live</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto mb-3">
          {filters.map(f => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  filter === f.id
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-3 h-3" />
                {f.label}
                {f.count > 0 && (
                  <span className="ml-1 text-xs">({f.count})</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Auto-refresh toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              autoRefresh
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Radio className="w-3 h-3" />
            Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
          </button>
          <span className="text-xs text-slate-500">
            Updates every 30 seconds
          </span>
        </div>
      </div>

      {/* Intelligence Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {filteredItems.map(item => {
            const Icon = getTypeIcon(item.type);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">{item.title}</h4>
                      <p className="text-slate-400 text-xs">{item.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getImpactColor(item.impact)}`}>
                      {item.impact}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-3">{item.description}</p>

                {item.location && (
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                )}

                {/* Specific Details */}
                {item.details && (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {item.details.temperature && (
                      <div className="flex items-center gap-2 text-xs">
                        <Thermometer className="w-3 h-3 text-blue-400" />
                        <span className="text-slate-300">{item.details.temperature}°F</span>
                      </div>
                    )}
                    {item.details.windSpeed && (
                      <div className="flex items-center gap-2 text-xs">
                        <Wind className="w-3 h-3 text-blue-400" />
                        <span className="text-slate-300">{item.details.windSpeed} mph</span>
                      </div>
                    )}
                    {item.details.trafficLevel && (
                      <div className="flex items-center gap-2 text-xs">
                        <Car className="w-3 h-3 text-red-400" />
                        <span className="text-slate-300">
                          {getTrafficIcon(item.details.trafficLevel)} {item.details.trafficLevel}
                        </span>
                      </div>
                    )}
                    {item.details.delayMinutes && (
                      <div className="flex items-center gap-2 text-xs">
                        <Clock className="w-3 h-3 text-orange-400" />
                        <span className="text-slate-300">{item.details.delayMinutes} min delay</span>
                      </div>
                    )}
                    {item.details.conditions && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-lg">{getWeatherIcon(item.details.conditions)}</span>
                        <span className="text-slate-300">{item.details.conditions}</span>
                      </div>
                    )}
                    {item.details.newsCategory && (
                      <div className="flex items-center gap-2 text-xs">
                        <Newspaper className="w-3 h-3 text-purple-400" />
                        <span className="text-slate-300">{item.details.newsCategory}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Affected Routes */}
                {item.details?.affectedRoutes && (
                  <div className="mb-3">
                    <p className="text-xs text-slate-500 mb-1">Affected Routes:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.details.affectedRoutes.map((route, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                          {route}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimestamp(item.timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>Priority {item.priority}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span>Live intelligence feeds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-3 h-3" />
            <span>Auto-updates enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
