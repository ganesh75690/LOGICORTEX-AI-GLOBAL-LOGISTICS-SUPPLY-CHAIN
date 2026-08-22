import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Activity, 
  Target, 
  Search, 
  Filter, 
  Download, 
  X,
  ChevronRight,
  Zap,
  User,
  Database,
  FileText,
  Key,
  Fingerprint,
  Shield,
  AlertOctagon,
  Calendar,
  BarChart3,
  Settings,
  Users,
  Ban,
  Gavel
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'threat_detected' | 'access_granted' | 'access_denied' | 'data_protection' | 'tamper_attempt' | 'audit_log';
  severity: 'critical' | 'high' | 'medium' | 'low';
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  location: string;
  ipAddress: string;
  status: 'resolved' | 'investigating' | 'active';
  aiConfidence: number;
  aiAnalysis: string;
}

interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  description: string;
}

const GlobalComplianceSecurity = () => {
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const securityEvents: SecurityEvent[] = [
    {
      id: 'SEC-001',
      type: 'threat_detected',
      severity: 'high',
      user: 'System',
      action: 'AI detected unusual access pattern',
      resource: 'Compliance Database',
      timestamp: '2024-08-10 14:30',
      location: 'Mumbai, India',
      ipAddress: '192.168.1.100',
      status: 'investigating',
      aiConfidence: 92,
      aiAnalysis: 'Unusual access pattern detected from IP 192.168.1.100. 15 login attempts in 5 minutes. Pattern suggests potential brute force attack. AI recommends immediate IP blocking and user verification.'
    },
    {
      id: 'SEC-002',
      type: 'access_granted',
      severity: 'low',
      user: 'admin@gacif.com',
      action: 'Granted access to compliance dashboard',
      resource: 'GACIF Command Center',
      timestamp: '2024-08-10 14:25',
      location: 'New York, USA',
      ipAddress: '10.0.0.45',
      status: 'resolved',
      aiConfidence: 98,
      aiAnalysis: 'Standard admin access from verified location. No security concerns detected.'
    },
    {
      id: 'SEC-003',
      type: 'access_denied',
      severity: 'medium',
      user: 'unknown@external.com',
      action: 'Access denied - insufficient permissions',
      resource: 'Compliance Passport Database',
      timestamp: '2024-08-10 14:20',
      location: 'Unknown',
      ipAddress: '203.0.113.50',
      status: 'resolved',
      aiConfidence: 95,
      aiAnalysis: 'External access attempt denied. User lacks required permissions. IP address flagged for monitoring.'
    },
    {
      id: 'SEC-004',
      type: 'data_protection',
      severity: 'low',
      user: 'System',
      action: 'Automatic data encryption completed',
      resource: 'Compliance Documents',
      timestamp: '2024-08-10 14:15',
      location: 'System',
      ipAddress: 'Internal',
      status: 'resolved',
      aiConfidence: 100,
      aiAnalysis: 'Routine data protection operation. All compliance documents encrypted using AES-256.'
    },
    {
      id: 'SEC-005',
      type: 'audit_log',
      severity: 'low',
      user: 'compliance@gacif.com',
      action: 'Viewed compliance audit trail',
      resource: 'Audit Logs',
      timestamp: '2024-08-10 14:10',
      location: 'London, UK',
      ipAddress: '172.16.0.23',
      status: 'resolved',
      aiConfidence: 97,
      aiAnalysis: 'Authorized access to audit logs. Compliance officer access from verified location.'
    },
    {
      id: 'SEC-006',
      type: 'tamper_attempt',
      severity: 'critical',
      user: 'unknown',
      action: 'Tamper attempt detected on compliance record',
      resource: 'Shipment SHP-002 Compliance Data',
      timestamp: '2024-08-10 14:05',
      location: 'Unknown',
      ipAddress: '198.51.100.75',
      status: 'active',
      aiConfidence: 96,
      aiAnalysis: 'CRITICAL: Tamper attempt detected on compliance record SHP-002. Attempt to modify compliance score from 72% to 95%. AI has blocked attempt and initiated incident response protocol.'
    }
  ];

  const securityMetrics: SecurityMetric[] = [
    {
      id: 'threat-detection',
      name: 'Threat Detection',
      value: 96,
      trend: 'up',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      description: 'AI-powered threat detection accuracy'
    },
    {
      id: 'data-protection',
      name: 'Data Protection',
      value: 99,
      trend: 'stable',
      icon: Lock,
      color: 'from-blue-500 to-blue-600',
      description: 'Encryption and data protection coverage'
    },
    {
      id: 'audit-integrity',
      name: 'Audit Integrity',
      value: 98,
      trend: 'up',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      description: 'Immutable audit trail integrity'
    },
    {
      id: 'access-control',
      name: 'Access Control',
      value: 94,
      trend: 'stable',
      icon: Key,
      color: 'from-orange-500 to-orange-600',
      description: 'Role-based access control effectiveness'
    }
  ];

  const eventTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'threat_detected', label: 'Threat Detected' },
    { id: 'access_granted', label: 'Access Granted' },
    { id: 'access_denied', label: 'Access Denied' },
    { id: 'data_protection', label: 'Data Protection' },
    { id: 'tamper_attempt', label: 'Tamper Attempt' },
    { id: 'audit_log', label: 'Audit Log' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'threat_detected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'access_granted': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'access_denied': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'data_protection': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'tamper_attempt': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'audit_log': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'threat_detected': return <AlertOctagon className="w-4 h-4" />;
      case 'access_granted': return <CheckCircle className="w-4 h-4" />;
      case 'access_denied': return <Ban className="w-4 h-4" />;
      case 'data_protection': return <Lock className="w-4 h-4" />;
      case 'tamper_attempt': return <Shield className="w-4 h-4" />;
      case 'audit_log': return <FileText className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const filteredEvents = securityEvents.filter(event => {
    const matchesSearch = 
      event.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || event.severity === filterSeverity;
    return matchesSearch && matchesType && matchesSeverity;
  });

  const criticalEvents = securityEvents.filter(e => e.severity === 'critical').length;
  const activeThreats = securityEvents.filter(e => e.status === 'active').length;
  const avgConfidence = Math.round(securityEvents.reduce((acc, e) => acc + e.aiConfidence, 0) / securityEvents.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-slate-400" />
            Global Compliance Security™
          </h2>
          <p className="text-slate-400">AI-powered security, audit trails, and immutable compliance logs</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <Fingerprint className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-400">AI Security Active</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Audit Trail
          </button>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {securityMetrics.map((metric, idx) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`w-5 h-5 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
              <span className="text-xs text-slate-400">Live</span>
            </div>
            <div className="text-2xl font-bold text-white">{metric.value}%</div>
            <div className="text-sm text-slate-400">{metric.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Security Alerts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertOctagon className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium text-red-400">Critical Events</span>
          </div>
          <div className="text-2xl font-bold text-white">{criticalEvents}</div>
          <div className="text-sm text-slate-400">Require immediate attention</div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">Active Threats</span>
          </div>
          <div className="text-2xl font-bold text-white">{activeThreats}</div>
          <div className="text-sm text-slate-400">Currently being monitored</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search security events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
          >
            {eventTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
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
        </div>
      </div>

      {/* Security Events */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-slate-400" />
          Security Event Log
        </h3>
        <div className="space-y-3">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedEvent(event)}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-slate-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(event.type)}`}>
                      {event.type.replace('_', ' ')}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </span>
                    <span className="text-xs text-slate-400">{event.status}</span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{event.action}</h4>
                  <p className="text-sm text-slate-400 mb-2">{event.resource}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {event.user}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {event.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {event.aiConfidence}% confidence
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
                  <ShieldCheck className="w-6 h-6 text-slate-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Security Event Details</h3>
                    <p className="text-sm text-slate-400">{selectedEvent.id}</p>
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
                  <div className="text-xs text-slate-400 mb-1">Event Type</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded border ${getTypeColor(selectedEvent.type)}`}>
                    {selectedEvent.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Severity</div>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${getSeverityColor(selectedEvent.severity)}`}>
                    {selectedEvent.severity}
                  </span>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Status</div>
                  <div className="text-sm text-white">{selectedEvent.status}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">AI Confidence</div>
                  <div className="text-lg font-bold text-purple-400">{selectedEvent.aiConfidence}%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">User</div>
                  <div className="text-sm text-white">{selectedEvent.user}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Resource</div>
                  <div className="text-sm text-white">{selectedEvent.resource}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Location</div>
                  <div className="text-sm text-white">{selectedEvent.location}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">IP Address</div>
                  <div className="text-sm text-white font-mono">{selectedEvent.ipAddress}</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-2">AI Analysis</div>
                <p className="text-sm text-white">{selectedEvent.aiAnalysis}</p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-1">Timestamp</div>
                <div className="text-sm text-white">{selectedEvent.timestamp}</div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                  <Gavel className="w-4 h-4" />
                  Take Action
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalComplianceSecurity;