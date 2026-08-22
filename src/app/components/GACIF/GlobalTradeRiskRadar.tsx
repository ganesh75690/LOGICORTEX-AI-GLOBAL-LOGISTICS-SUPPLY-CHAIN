import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, 
  AlertTriangle, 
  Globe, 
  Shield, 
  Activity, 
  Clock, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  Search, 
  Eye, 
  Zap, 
  Target, 
  X,
  ChevronRight,
  Navigation,
  Flame,
  Cloud,
  Lock,
  Ban,
  Ship,
  Plane,
  Truck,
  Train,
  AlertOctagon,
  Calendar,
  BarChart3,
  Layers
} from 'lucide-react';

interface TradeRiskEvent {
  id: string;
  type: 'trade_restriction' | 'sanctions' | 'port_congestion' | 'political_event' | 'natural_disaster' | 'weather' | 'transportation_restriction' | 'customs_rules' | 'border_closure';
  severity: 'critical' | 'high' | 'medium' | 'low';
  country: string;
  region: string;
  description: string;
  timestamp: string;
  affectedShipments: number;
  aiRiskScore: number;
  aiRecommendation: string;
  affectedRoutes: string[];
  estimatedDuration: string;
  businessImpact: 'critical' | 'high' | 'medium' | 'low';
  alternativeRoutes: string[];
}

const GlobalTradeRiskRadar = () => {
  const [selectedEvent, setSelectedEvent] = useState<TradeRiskEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');

  const tradeRiskEvents: TradeRiskEvent[] = [
    {
      id: 'RISK-001',
      type: 'trade_restriction',
      severity: 'critical',
      country: 'Russia',
      region: 'Eastern Europe',
      description: 'New export restrictions on electronic components and semiconductors effective immediately',
      timestamp: '2024-08-10 09:30',
      affectedShipments: 3,
      aiRiskScore: 95,
      aiRecommendation: 'Re-route affected shipments through alternative ports. Consider delaying shipments to affected regions until restrictions are clarified.',
      affectedRoutes: ['St. Petersburg', 'Moscow', 'Novorossiysk'],
      estimatedDuration: 'Indefinite',
      businessImpact: 'critical',
      alternativeRoutes: ['Via Turkey', 'Via Georgia', 'Via Finland']
    },
    {
      id: 'RISK-002',
      type: 'port_congestion',
      severity: 'high',
      country: 'Singapore',
      region: 'Southeast Asia',
      description: 'Major port congestion causing 2-3 day delays for all shipments',
      timestamp: '2024-08-10 08:15',
      affectedShipments: 5,
      aiRiskScore: 82,
      aiRecommendation: 'Consider alternative ports in Malaysia or Thailand. Implement buffer time for shipments through Singapore.',
      affectedRoutes: ['Singapore Port', 'Tanjong Pagar', 'Jurong Port'],
      estimatedDuration: '7-14 days',
      businessImpact: 'high',
      alternativeRoutes: ['Port Klang', 'Bangkok Port', 'Laem Chabang']
    },
    {
      id: 'RISK-003',
      type: 'customs_rules',
      severity: 'medium',
      country: 'USA',
      region: 'North America',
      description: 'Updated documentation requirements for electronic imports effective September 2024',
      timestamp: '2024-08-09 16:45',
      affectedShipments: 8,
      aiRiskScore: 68,
      aiRecommendation: 'Update documentation templates to include new required fields. Train customs brokers on new requirements.',
      affectedRoutes: ['Los Angeles', 'New York', 'Chicago'],
      estimatedDuration: 'Permanent',
      businessImpact: 'medium',
      alternativeRoutes: ['Same routes, updated documentation']
    },
    {
      id: 'RISK-004',
      type: 'sanctions',
      severity: 'critical',
      country: 'Iran',
      region: 'Middle East',
      description: 'New trade sanctions affecting multiple sectors including electronics and automotive',
      timestamp: '2024-08-09 14:20',
      affectedShipments: 2,
      aiRiskScore: 92,
      aiRecommendation: 'Immediately review all shipments to/from Iran. Ensure compliance with new sanctions before proceeding.',
      affectedRoutes: ['Bandar Abbas', 'Chabahar'],
      estimatedDuration: 'Indefinite',
      businessImpact: 'critical',
      alternativeRoutes: ['No alternatives - suspend operations']
    },
    {
      id: 'RISK-005',
      type: 'weather',
      severity: 'medium',
      country: 'Philippines',
      region: 'Southeast Asia',
      description: 'Typhoon warnings affecting maritime routes in the Philippine Sea',
      timestamp: '2024-08-09 12:00',
      affectedShipments: 4,
      aiRiskScore: 75,
      aiRecommendation: 'Delay shipments in affected areas. Monitor weather updates closely. Consider rerouting through northern routes.',
      affectedRoutes: ['Manila', 'Cebu', 'Davao'],
      estimatedDuration: '3-5 days',
      businessImpact: 'medium',
      alternativeRoutes: ['Via Hong Kong', 'Via Taiwan']
    },
    {
      id: 'RISK-006',
      type: 'political_event',
      severity: 'high',
      country: 'France',
      region: 'Western Europe',
      description: 'Industrial strikes affecting transportation and logistics networks',
      timestamp: '2024-08-08 18:30',
      affectedShipments: 6,
      aiRiskScore: 78,
      aiRecommendation: 'Implement contingency plans for French shipments. Consider alternative routes through neighboring countries.',
      affectedRoutes: ['Paris', 'Marseille', 'Lyon'],
      estimatedDuration: '5-7 days',
      businessImpact: 'high',
      alternativeRoutes: ['Via Belgium', 'Via Switzerland', 'Via Spain']
    },
    {
      id: 'RISK-007',
      type: 'transportation_restriction',
      severity: 'medium',
      country: 'Germany',
      region: 'Western Europe',
      description: 'Temporary truck weight restrictions on major highways',
      timestamp: '2024-08-08 15:45',
      affectedShipments: 3,
      aiRiskScore: 65,
      aiRecommendation: 'Adjust truck loads to meet new weight restrictions. Consider rail alternatives for heavy shipments.',
      affectedRoutes: ['A1', 'A3', 'A7 Highways'],
      estimatedDuration: '2-3 weeks',
      businessImpact: 'medium',
      alternativeRoutes: ['Rail freight', 'Alternative highways', 'River transport']
    },
    {
      id: 'RISK-008',
      type: 'natural_disaster',
      severity: 'high',
      country: 'Japan',
      region: 'East Asia',
      description: 'Earthquake affecting port operations in northern Japan',
      timestamp: '2024-08-07 20:00',
      affectedShipments: 4,
      aiRiskScore: 85,
      aiRecommendation: 'Divert shipments to alternative Japanese ports. Monitor infrastructure recovery progress.',
      affectedRoutes: ['Sendai', 'Niigata', 'Hakodate'],
      estimatedDuration: '2-4 weeks',
      businessImpact: 'high',
      alternativeRoutes: ['Tokyo', 'Yokohama', 'Osaka']
    }
  ];

  const riskTypes = [
    { id: 'all', label: 'All Risk Types' },
    { id: 'trade_restriction', label: 'Trade Restriction' },
    { id: 'sanctions', label: 'Sanctions' },
    { id: 'port_congestion', label: 'Port Congestion' },
    { id: 'political_event', label: 'Political Event' },
    { id: 'natural_disaster', label: 'Natural Disaster' },
    { id: 'weather', label: 'Weather' },
    { id: 'transportation_restriction', label: 'Transportation Restriction' },
    { id: 'customs_rules', label: 'Customs Rules' },
    { id: 'border_closure', label: 'Border Closure' }
  ];

  const regions = [
    { id: 'all', label: 'All Regions' },
    { id: 'North America', label: 'North America' },
    { id: 'South America', label: 'South America' },
    { id: 'Europe', label: 'Europe' },
    { id: 'Middle East', label: 'Middle East' },
    { id: 'Asia', label: 'Asia' },
    { id: 'Africa', label: 'Africa' },
    { id: 'Oceania', label: 'Oceania' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'trade_restriction': return <Ban className="w-4 h-4" />;
      case 'sanctions': return <Lock className="w-4 h-4" />;
      case 'port_congestion': return <Ship className="w-4 h-4" />;
      case 'political_event': return <AlertOctagon className="w-4 h-4" />;
      case 'natural_disaster': return <Cloud className="w-4 h-4" />;
      case 'weather': return <Cloud className="w-4 h-4" />;
      case 'transportation_restriction': return <Truck className="w-4 h-4" />;
      case 'customs_rules': return <Shield className="w-4 h-4" />;
      case 'border_closure': return <Ban className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getTransportIcon = (route: string) => {
    if (route.toLowerCase().includes('port') || route.toLowerCase().includes('sea')) return <Ship className="w-3 h-3" />;
    if (route.toLowerCase().includes('airport') || route.toLowerCase().includes('air')) return <Plane className="w-3 h-3" />;
    if (route.toLowerCase().includes('highway') || route.toLowerCase().includes('truck')) return <Truck className="w-3 h-3" />;
    if (route.toLowerCase().includes('rail') || route.toLowerCase().includes('train')) return <Train className="w-3 h-3" />;
    return <Navigation className="w-3 h-3" />;
  };

  const filteredEvents = tradeRiskEvents.filter(event => {
    const matchesSearch = 
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || event.severity === filterSeverity;
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesRegion = filterRegion === 'all' || event.region === filterRegion;
    return matchesSearch && matchesSeverity && matchesType && matchesRegion;
  });

  const criticalEvents = tradeRiskEvents.filter(e => e.severity === 'critical').length;
  const highEvents = tradeRiskEvents.filter(e => e.severity === 'high').length;
  const totalAffectedShipments = tradeRiskEvents.reduce((acc, e) => acc + e.affectedShipments, 0);
  const avgRiskScore = Math.round(tradeRiskEvents.reduce((acc, e) => acc + e.aiRiskScore, 0) / tradeRiskEvents.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Radar className="w-6 h-6 text-red-400" />
            Global Trade Risk Radar™
          </h2>
          <p className="text-slate-400">Real-time monitoring of worldwide trade events and risks</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-400">Live Monitoring</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            <Layers className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-xs text-slate-400">Critical</span>
          </div>
          <div className="text-2xl font-bold text-white">{criticalEvents}</div>
          <div className="text-sm text-slate-400">Active Risks</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-slate-400">High Priority</span>
          </div>
          <div className="text-2xl font-bold text-white">{highEvents}</div>
          <div className="text-sm text-slate-400">Active Risks</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Ship className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-slate-400">Affected</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalAffectedShipments}</div>
          <div className="text-sm text-slate-400">Shipments</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-slate-400">Avg. Risk Score</span>
          </div>
          <div className="text-2xl font-bold text-white">{avgRiskScore}</div>
          <div className="text-sm text-slate-400">AI Analysis</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search risks by description, country, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400"
            />
          </div>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            {riskTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>{region.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Risk Events List */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-400" />
          Active Trade Risk Events
        </h3>
        <div className="space-y-3">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedEvent(event)}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-red-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </span>
                    <span className="text-xs text-slate-400">{event.type.replace('_', ' ')}</span>
                    <span className="text-xs text-slate-400">{event.country}</span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{event.description}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.region}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {event.affectedShipments} shipments affected
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      event.aiRiskScore >= 80 ? 'text-red-400' :
                      event.aiRiskScore >= 60 ? 'text-orange-400' :
                      'text-yellow-400'
                    }`}>
                      {event.aiRiskScore}
                    </div>
                    <div className="text-xs text-slate-400">Risk Score</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Radar className="w-6 h-6 text-red-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Trade Risk Event Details</h3>
                    <p className="text-sm text-slate-400">{selectedEvent.country} • {selectedEvent.region}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Severity</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded border ${getSeverityColor(selectedEvent.severity)}`}>
                    {selectedEvent.severity}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Risk Type</div>
                  <div className="text-sm text-white">{selectedEvent.type.replace('_', ' ')}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">AI Risk Score</div>
                  <div className={`text-lg font-bold ${
                    selectedEvent.aiRiskScore >= 80 ? 'text-red-400' :
                    selectedEvent.aiRiskScore >= 60 ? 'text-orange-400' :
                    'text-yellow-400'
                  }`}>
                    {selectedEvent.aiRiskScore}
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Business Impact</div>
                  <div className="text-sm font-bold text-white capitalize">{selectedEvent.businessImpact}</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">Event Description</div>
                <p className="text-sm text-white">{selectedEvent.description}</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">AI Recommendation</div>
                <p className="text-sm text-white">{selectedEvent.aiRecommendation}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-2">Affected Routes</div>
                  <div className="space-y-2">
                    {selectedEvent.affectedRoutes.map((route, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-slate-600/50 rounded">
                        {getTransportIcon(route)}
                        <span className="text-sm text-white">{route}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-2">Alternative Routes</div>
                  <div className="space-y-2">
                    {selectedEvent.alternativeRoutes.map((route, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-green-500/10 rounded border border-green-500/30">
                        <Navigation className="w-3 h-3 text-green-400" />
                        <span className="text-sm text-white">{route}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Estimated Duration</div>
                  <div className="text-sm text-white">{selectedEvent.estimatedDuration}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Affected Shipments</div>
                  <div className="text-sm text-white">{selectedEvent.affectedShipments}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  <Target className="w-4 h-4" />
                  Take Action
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  Monitor
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalTradeRiskRadar;