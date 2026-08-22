import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  FileText,
  Download,
  Filter,
  Search,
  Calendar,
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ArrowUpDown,
  X,
  Eye,
  FileDown,
  Printer,
  Share2,
  Zap,
  Lock,
  Users,
  Truck,
  Package,
  FileCheck,
  FileSearch,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  CalendarDays,
  Filter as FilterIcon
} from 'lucide-react';

interface AuditActivity {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  record: string;
  change: string;
  severity: 'Normal' | 'Important' | 'Critical';
  status: 'Completed' | 'Pending' | 'Failed';
  details: string;
  previousValue?: string;
  newValue?: string;
  reason?: string;
}

interface Report {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  metrics: string[];
}

interface GeneratedReport {
  id: string;
  name: string;
  generatedBy: string;
  date: string;
  format: 'PDF' | 'CSV' | 'Excel';
  status: 'Ready' | 'Generating' | 'Failed';
}

interface AIInsight {
  id: string;
  type: 'performance' | 'utilization' | 'compliance' | 'delivery';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  recommendedAction: string;
}

const ActivityAuditReports = () => {
  const [activeTab, setActiveTab] = useState<'activity' | 'reports'>('activity');
  const [selectedActivity, setSelectedActivity] = useState<AuditActivity | null>(null);
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterModule, setFilterModule] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const auditActivities: AuditActivity[] = [
    {
      id: 'ACT-001',
      timestamp: '10:42 AM',
      user: 'Ravi Kumar',
      role: 'Fleet Manager',
      action: 'Driver Assigned',
      module: 'Drivers',
      record: 'DRV-1048',
      change: 'Unassigned → SHP-20481',
      severity: 'Normal',
      status: 'Completed',
      details: 'Driver assigned to shipment SHP-20481',
      previousValue: 'Unassigned',
      newValue: 'SHP-20481',
      reason: 'New shipment assignment'
    },
    {
      id: 'ACT-002',
      timestamp: '10:35 AM',
      user: 'Meena Shah',
      role: 'Fleet Manager',
      action: 'Vehicle Status Changed',
      module: 'Vehicles',
      record: 'GJ01AB4521',
      change: 'Available → Maintenance',
      severity: 'Important',
      status: 'Completed',
      details: 'Vehicle marked for scheduled maintenance',
      previousValue: 'Available',
      newValue: 'Maintenance',
      reason: 'Scheduled maintenance detected'
    },
    {
      id: 'ACT-003',
      timestamp: '10:21 AM',
      user: 'Arjun Patel',
      role: 'Operations',
      action: 'Shipment Updated',
      module: 'Shipments',
      record: 'SHP-20481',
      change: 'In Transit → Delivered',
      severity: 'Normal',
      status: 'Completed',
      details: 'Shipment marked as delivered',
      previousValue: 'In Transit',
      newValue: 'Delivered',
      reason: 'Delivery confirmed'
    },
    {
      id: 'ACT-004',
      timestamp: '09:58 AM',
      user: 'Ravi Kumar',
      role: 'Compliance Officer',
      action: 'Document Updated',
      module: 'Compliance',
      record: 'DOC-2091',
      change: 'Expired → Verified',
      severity: 'Critical',
      status: 'Completed',
      details: 'Compliance document renewed and verified',
      previousValue: 'Expired',
      newValue: 'Verified',
      reason: 'Document renewal completed'
    },
    {
      id: 'ACT-005',
      timestamp: '09:45 AM',
      user: 'Priya Singh',
      role: 'Operations',
      action: 'Shipment Created',
      module: 'Shipments',
      record: 'SHP-20482',
      change: 'New shipment created',
      severity: 'Normal',
      status: 'Completed',
      details: 'New shipment created for route Mumbai → Delhi',
      previousValue: 'None',
      newValue: 'SHP-20482',
      reason: 'New order received'
    },
    {
      id: 'ACT-006',
      timestamp: '09:30 AM',
      user: 'System',
      role: 'AI Agent',
      action: 'Vehicle Maintenance Alert',
      module: 'Vehicles',
      record: 'MH03EF1234',
      change: 'Maintenance Due',
      severity: 'Important',
      status: 'Completed',
      details: 'AI detected vehicle requires maintenance',
      previousValue: 'Healthy',
      newValue: 'Due',
      reason: 'AI-powered maintenance prediction'
    },
    {
      id: 'ACT-007',
      timestamp: '09:15 AM',
      user: 'Amit Patel',
      role: 'Fleet Manager',
      action: 'Driver Unassigned',
      module: 'Drivers',
      record: 'DRV-1049',
      change: 'SHP-20480 → Unassigned',
      severity: 'Normal',
      status: 'Completed',
      details: 'Driver unassigned after delivery completion',
      previousValue: 'SHP-20480',
      newValue: 'Unassigned',
      reason: 'Delivery completed'
    },
    {
      id: 'ACT-008',
      timestamp: '09:00 AM',
      user: 'System',
      role: 'Security',
      action: 'User Login',
      module: 'Security',
      record: 'USR-1048',
      change: 'Login successful',
      severity: 'Normal',
      status: 'Completed',
      details: 'User logged in from IP 192.168.1.100',
      previousValue: 'Logged out',
      newValue: 'Logged in',
      reason: 'User authentication'
    }
  ];

  const reports: Report[] = [
    {
      id: 'RPT-001',
      name: 'Supplier Performance Report',
      description: 'Overall supplier score, order fulfillment, on-time delivery, reliability trends',
      category: 'Performance',
      icon: BarChart3,
      metrics: ['94% Overall Score', '92% On-Time Delivery', '96% Reliability']
    },
    {
      id: 'RPT-002',
      name: 'Driver Performance Report',
      description: 'Deliveries completed, on-time percentage, performance scores, assignment history',
      category: 'Fleet',
      icon: Users,
      metrics: ['1,247 Deliveries', '94% On-Time', '89 Avg Score']
    },
    {
      id: 'RPT-003',
      name: 'Vehicle Utilization Report',
      description: 'Vehicle utilization, total trips, distance, idle time, maintenance periods',
      category: 'Fleet',
      icon: Truck,
      metrics: ['82% Utilization', '845 Trips', '124,500 km']
    },
    {
      id: 'RPT-004',
      name: 'Delivery Performance Report',
      description: 'Completed deliveries, delayed deliveries, failed deliveries, success rate',
      category: 'Operations',
      icon: Package,
      metrics: ['1,218 Completed', '29 Delayed', '97% Success Rate']
    },
    {
      id: 'RPT-005',
      name: 'Compliance Report',
      description: 'Valid documents, expiring documents, expired documents, compliance readiness',
      category: 'Compliance',
      icon: FileCheck,
      metrics: ['96% Ready', '2 Expiring', '0 Expired']
    }
  ];

  const generatedReports: GeneratedReport[] = [
    {
      id: 'GEN-001',
      name: 'Supplier Performance',
      generatedBy: 'Ravi Kumar',
      date: '10 Aug 2026',
      format: 'PDF',
      status: 'Ready'
    },
    {
      id: 'GEN-002',
      name: 'Driver Performance',
      generatedBy: 'Meena Shah',
      date: '09 Aug 2026',
      format: 'CSV',
      status: 'Ready'
    },
    {
      id: 'GEN-003',
      name: 'Vehicle Utilization',
      generatedBy: 'Arjun Patel',
      date: '08 Aug 2026',
      format: 'Excel',
      status: 'Ready'
    }
  ];

  const aiInsights: AIInsight[] = [
    {
      id: 'INS-001',
      type: 'utilization',
      severity: 'medium',
      title: 'Vehicle Utilization Alert',
      description: 'Vehicle utilization is below the supplier\'s recent average by 8%.',
      recommendedAction: 'Review route assignments and optimize fleet distribution'
    },
    {
      id: 'INS-002',
      type: 'performance',
      severity: 'low',
      title: 'Driver Availability Optimization',
      description: 'Driver availability is higher than current shipment demand.',
      recommendedAction: 'Consider proactive fleet assignment for upcoming peak periods'
    },
    {
      id: 'INS-003',
      type: 'compliance',
      severity: 'high',
      title: 'Compliance Document Expiry',
      description: 'Two compliance documents require attention within 15 days.',
      recommendedAction: 'Initiate renewal process for expiring documents immediately'
    },
    {
      id: 'INS-004',
      type: 'delivery',
      severity: 'low',
      title: 'Delivery Performance Improvement',
      description: 'On-time delivery performance has improved by 7% over the selected period.',
      recommendedAction: 'Maintain current operational practices and reward top performers'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Important': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Normal': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getInsightSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#00F5C4]" />
            {activeTab === 'activity' ? 'Activity & Audit History' : 'Reports & Analytics'}
          </h2>
          <p className="text-slate-400">
            {activeTab === 'activity'
              ? 'Track every important operational change with complete accountability and secure activity records.'
              : 'Turn supplier operations into clear, actionable performance intelligence.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:bg-slate-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'activity'
                ? 'text-[#00F5C4] border-b-2 border-[#00F5C4] bg-slate-700/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Activity & Audit
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'reports'
                ? 'text-[#00F5C4] border-b-2 border-[#00F5C4] bg-slate-700/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Reports & Analytics
          </button>
        </div>

        {/* Activity & Audit Tab */}
        {activeTab === 'activity' && (
          <div className="p-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-[#00F5C4]" />
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">2,486</div>
                <div className="text-sm text-slate-400">Total Activities</div>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <CalendarDays className="w-5 h-5 text-blue-400" />
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">184</div>
                <div className="text-sm text-slate-400">Today's Activities</div>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <TrendingDown className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-slate-400">Critical Actions</div>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">24</div>
                <div className="text-sm text-slate-400">Active Users</div>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="w-5 h-5 text-orange-400" />
                  <Zap className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-sm text-slate-400">Security Events</div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by user, driver, vehicle, shipment, or activity ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-[#00F5C4]"
                />
              </div>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00F5C4]"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00F5C4]"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="important">Important</option>
                <option value="normal">Normal</option>
              </select>
              <select
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00F5C4]"
              >
                <option value="all">All Modules</option>
                <option value="drivers">Drivers</option>
                <option value="vehicles">Vehicles</option>
                <option value="shipments">Shipments</option>
                <option value="compliance">Compliance</option>
                <option value="security">Security</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700">
                <FilterIcon className="w-4 h-4" />
                More Filters
              </button>
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 mb-6">
              <button className="px-3 py-1.5 bg-[#00F5C4] text-slate-900 rounded-lg text-sm font-medium">All</button>
              <button className="px-3 py-1.5 bg-slate-700/50 border border-slate-600 text-slate-400 rounded-lg text-sm hover:text-white">Today</button>
              <button className="px-3 py-1.5 bg-slate-700/50 border border-slate-600 text-slate-400 rounded-lg text-sm hover:text-white">Critical</button>
              <button className="px-3 py-1.5 bg-slate-700/50 border border-slate-600 text-slate-400 rounded-lg text-sm hover:text-white">Security</button>
              <button className="px-3 py-1.5 bg-slate-700/50 border border-slate-600 text-slate-400 rounded-lg text-sm hover:text-white">Compliance</button>
              <button className="px-3 py-1.5 bg-slate-700/50 border border-slate-600 text-slate-400 rounded-lg text-sm hover:text-white">Fleet</button>
              <button className="px-3 py-1.5 bg-slate-700/50 border border-slate-600 text-slate-400 rounded-lg text-sm hover:text-white">Shipments</button>
            </div>

            {/* Audit Activity Table */}
            <div className="bg-slate-700/30 border border-slate-600 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Timestamp</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Action</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Module</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Record</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Change</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Severity</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {auditActivities.map((activity) => (
                    <tr
                      key={activity.id}
                      onClick={() => setSelectedActivity(activity)}
                      className="hover:bg-slate-700/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-slate-300">{activity.timestamp}</td>
                      <td className="px-4 py-3 text-sm text-white font-medium">{activity.user}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{activity.role}</td>
                      <td className="px-4 py-3 text-sm text-white">{activity.action}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{activity.module}</td>
                      <td className="px-4 py-3 text-sm text-white font-medium">{activity.record}</td>
                      <td className="px-4 py-3 text-sm text-slate-300">{activity.change}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded border ${getSeverityColor(activity.severity)}`}>
                          {activity.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="p-1 hover:bg-slate-600 rounded">
                          <Eye className="w-4 h-4 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Security Indicator */}
            <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm">
              <Lock className="w-4 h-4" />
              <span>Protected Audit Trail</span>
              <span className="text-slate-600">•</span>
              <span>✓ Audit Trail Protected</span>
              <span className="text-slate-600">•</span>
              <span>Role-based access • Immutable records • Secure timestamps</span>
            </div>
          </div>
        )}

        {/* Reports & Analytics Tab */}
        {activeTab === 'reports' && (
          <div className="p-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="w-5 h-5 text-[#00F5C4]" />
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">94%</div>
                <div className="text-sm text-slate-400">Supplier Performance</div>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Package className="w-5 h-5 text-green-400" />
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">92%</div>
                <div className="text-sm text-slate-400">On-Time Delivery</div>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Truck className="w-5 h-5 text-blue-400" />
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">82%</div>
                <div className="text-sm text-slate-400">Fleet Utilization</div>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <FileCheck className="w-5 h-5 text-green-400" />
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">96%</div>
                <div className="text-sm text-slate-400">Compliance Readiness</div>
              </div>
            </div>

            {/* Report Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Report Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 hover:border-[#00F5C4]/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedReportType(report.name);
                      setShowReportGenerator(true);
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] rounded-lg flex items-center justify-center flex-shrink-0">
                        <report.icon className="w-5 h-5 text-slate-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-sm">{report.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">{report.description}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {report.metrics.map((metric, idx) => (
                        <div key={idx} className="text-xs text-slate-300">• {metric}</div>
                      ))}
                    </div>
                    <button className="w-full mt-3 px-3 py-2 bg-[#00F5C4] text-slate-900 rounded-lg text-sm font-medium hover:bg-[#00D4A8] transition-colors">
                      Generate Report
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-[#00F5C4]" />
                <h3 className="text-lg font-semibold text-white">AI-Generated Operational Insights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className={`p-4 rounded-lg border ${getInsightSeverityColor(insight.severity)}`}>
                    <div className="flex items-start gap-3 mb-2">
                      <Zap className="w-5 h-5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                        <p className="text-sm opacity-90">{insight.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex-1 px-3 py-1 bg-white/10 rounded text-sm font-medium hover:bg-white/20 transition-colors text-white">
                        View Details
                      </button>
                      <button className="flex-1 px-3 py-1 bg-white/10 rounded text-sm font-medium hover:bg-white/20 transition-colors text-white">
                        Take Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export History */}
            <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Export History</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:bg-slate-600">
                  <Download className="w-4 h-4" />
                  Export All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Report Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Generated By</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Format</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {generatedReports.map((report) => (
                      <tr key={report.id} className="hover:bg-slate-700/50">
                        <td className="px-4 py-3 text-sm text-white font-medium">{report.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-300">{report.generatedBy}</td>
                        <td className="px-4 py-3 text-sm text-slate-300">{report.date}</td>
                        <td className="px-4 py-3 text-sm text-slate-300">{report.format}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded border ${
                            report.status === 'Ready' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="p-1 hover:bg-slate-600 rounded">
                            <Download className="w-4 h-4 text-[#00F5C4]" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Activity Details</h3>
                    <p className="text-sm text-slate-400">{selectedActivity.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Timestamp</div>
                    <div className="text-sm text-white">{selectedActivity.timestamp}</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Status</div>
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(selectedActivity.status)}`}>
                      {selectedActivity.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">User</div>
                    <div className="text-sm text-white">{selectedActivity.user}</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Role</div>
                    <div className="text-sm text-white">{selectedActivity.role}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Module</div>
                    <div className="text-sm text-white">{selectedActivity.module}</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Record ID</div>
                    <div className="text-sm text-white">{selectedActivity.record}</div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Action</div>
                  <div className="text-sm text-white">{selectedActivity.action}</div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-2">Change Details</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-600/50 rounded p-2 text-center">
                      <div className="text-xs text-slate-400 mb-1">Previous</div>
                      <div className="text-sm text-white">{selectedActivity.previousValue}</div>
                    </div>
                    <div className="text-[#00F5C4]">
                      <ChevronDown className="w-5 h-5" />
                    </div>
                    <div className="flex-1 bg-slate-600/50 rounded p-2 text-center">
                      <div className="text-xs text-slate-400 mb-1">New</div>
                      <div className="text-sm text-white">{selectedActivity.newValue}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Reason</div>
                  <div className="text-sm text-white">{selectedActivity.reason}</div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Description</div>
                  <div className="text-sm text-white">{selectedActivity.details}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold">
                  View Record
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Generator Modal */}
      <AnimatePresence>
        {showReportGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReportGenerator(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Generate Report</h3>
                    <p className="text-sm text-slate-400">{selectedReportType}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReportGenerator(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Date Range</label>
                  <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Month</option>
                    <option>Last Quarter</option>
                    <option>Custom Range</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Filters (Optional)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <select className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                      <option>All Drivers</option>
                      <option>DRV-1048</option>
                      <option>DRV-1049</option>
                    </select>
                    <select className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00F5C4]">
                      <option>All Vehicles</option>
                      <option>GJ01AB4521</option>
                      <option>GJ02CD6789</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Export Format</label>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium">PDF</button>
                    <button className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">CSV</button>
                    <button className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">Excel</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold">
                  Generate Report
                </button>
                <button
                  onClick={() => setShowReportGenerator(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActivityAuditReports;