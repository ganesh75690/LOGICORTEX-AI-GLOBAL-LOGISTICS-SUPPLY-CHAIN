import { AlertTriangle, Clock, CheckCircle, Package, MapPin, User, Phone, Camera, Mic, Filter, Search, MoreVertical, MessageSquare, Truck, RefreshCw, Replace, Eye, Bell, Brain, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Report {
  id: string;
  type: 'urgent' | 'pending' | 'resolved';
  category: 'package' | 'warehouse' | 'delivery' | 'other';
  title: string;
  description: string;
  location: string;
  driver: string;
  driverContact: string;
  time: string;
  deliveryId: string;
  route: string;
  stopNumber: number;
  status: 'pending' | 'in_progress' | 'resolved';
  evidenceImages?: string[];
  voiceNote?: string;
  aiInsight?: string;
}

const mockReports: Report[] = [
  {
    id: 'RPT001',
    type: 'urgent',
    category: 'package',
    title: 'Package Damaged',
    description: 'Box damaged during loading at warehouse',
    location: 'Warehouse B',
    driver: 'Ganesh',
    driverContact: '+91-9876543210',
    time: '10:32 AM',
    deliveryId: 'DEL-2024-001',
    route: 'North Route - Stop 3',
    stopNumber: 3,
    status: 'pending',
    evidenceImages: ['/api/placeholder/damage1.jpg', '/api/placeholder/damage2.jpg'],
    aiInsight: '3 similar issues reported today from Warehouse B'
  },
  {
    id: 'RPT002',
    type: 'urgent',
    category: 'warehouse',
    title: 'Loading Dock Blocked',
    description: 'Loading dock 2 blocked by unauthorized vehicle',
    location: 'Warehouse A',
    driver: 'Raj Kumar',
    driverContact: '+91-9876543211',
    time: '09:45 AM',
    deliveryId: 'DEL-2024-002',
    route: 'South Route - Stop 1',
    stopNumber: 1,
    status: 'pending',
    aiInsight: 'High traffic pattern detected at Warehouse A this morning'
  },
  {
    id: 'RPT003',
    type: 'pending',
    category: 'delivery',
    title: 'Customer Not Available',
    description: 'Customer not responding to calls at delivery address',
    location: 'Customer Location - Downtown',
    driver: 'Priya Sharma',
    driverContact: '+91-9876543212',
    time: '11:15 AM',
    deliveryId: 'DEL-2024-003',
    route: 'East Route - Stop 2',
    stopNumber: 2,
    status: 'pending'
  },
  {
    id: 'RPT004',
    type: 'pending',
    category: 'package',
    title: 'Wrong Item Delivered',
    description: 'Customer received different product than ordered',
    location: 'Customer Location - Suburb',
    driver: 'Amit Patel',
    driverContact: '+91-9876543213',
    time: '08:30 AM',
    deliveryId: 'DEL-2024-004',
    route: 'West Route - Stop 4',
    stopNumber: 4,
    status: 'in_progress',
    evidenceImages: ['/api/placeholder/wrong-item.jpg']
  },
  {
    id: 'RPT005',
    type: 'pending',
    category: 'other',
    title: 'System Error in Scanner',
    description: 'Barcode scanner not working at checkpoint',
    location: 'Warehouse C',
    driver: 'Suresh Kumar',
    driverContact: '+91-9876543214',
    time: '07:20 AM',
    deliveryId: 'DEL-2024-005',
    route: 'Central Route - Stop 1',
    stopNumber: 1,
    status: 'resolved'
  }
];

const resolvedReports: Report[] = [
  {
    id: 'RPT006',
    type: 'resolved',
    category: 'package',
    title: 'Minor Box Damage',
    description: 'Small tear in packaging, contents safe',
    location: 'Warehouse A',
    driver: 'Old Driver',
    driverContact: '+91-9876543215',
    time: 'Yesterday',
    deliveryId: 'DEL-2024-006',
    route: 'North Route - Stop 2',
    stopNumber: 2,
    status: 'resolved'
  }
  // Add more resolved reports as needed
];

export default function SupplierReportInbox() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [reports, setReports] = useState<Report[]>([...mockReports, ...resolvedReports]);

  const filteredReports = reports.filter(report => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'urgent' && report.type === 'urgent') ||
      (selectedFilter === 'pending' && report.type === 'pending') ||
      (selectedFilter === 'resolved' && report.type === 'resolved') ||
      (selectedFilter === 'package' && report.category === 'package') ||
      (selectedFilter === 'warehouse' && report.category === 'warehouse');
    
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const stats = {
    new: reports.filter(r => r.type === 'urgent' || r.type === 'pending').length,
    urgent: reports.filter(r => r.type === 'urgent').length,
    pending: reports.filter(r => r.type === 'pending').length,
    resolved: reports.filter(r => r.type === 'resolved').length
  };

  const handleAction = (reportId: string, action: string) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    let statusUpdate: 'pending' | 'in_progress' | 'resolved' = 'pending';
    let note = '';

    switch (action) {
      case 'resolve':
        statusUpdate = 'resolved';
        note = 'Issue resolved successfully';
        break;
      case 'reattempt':
        statusUpdate = 'in_progress';
        note = 'Reattempt scheduled';
        break;
      case 'replace':
        statusUpdate = 'in_progress';
        note = 'Replacement item sent';
        break;
      case 'contact':
        statusUpdate = 'in_progress';
        note = 'Driver contacted';
        break;
    }

    setReports(prev => prev.map(r => 
      r.id === reportId 
        ? { ...r, status: statusUpdate, type: statusUpdate === 'resolved' ? 'resolved' as const : r.type }
        : r
    ));

    // Show feedback
    alert(`Action "${action}" completed. ${note}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'text-red-400 bg-red-400/20 border-red-400/50';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/50';
      case 'resolved': return 'text-green-400 bg-green-400/20 border-green-400/50';
      case 'in_progress': return 'text-blue-400 bg-blue-400/20 border-blue-400/50';
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent': return <AlertTriangle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <RefreshCw className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const openReportDetail = (report: Report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header with Summary Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Report Inbox</h1>
        
        {/* Summary Dashboard Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">New Reports</p>
                <p className="text-2xl font-bold text-white">{stats.new}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Urgent</p>
                <p className="text-2xl font-bold text-red-400">{stats.urgent}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'urgent', 'pending', 'resolved', 'package', 'warehouse'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-[#00F5C4] text-slate-900'
                    : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-600'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-2 border border-slate-600">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder-slate-400 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Report List */}
      <div className="space-y-4">
        {filteredReports.map(report => (
          <div
            key={report.id}
            onClick={() => openReportDetail(report)}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-[#00F5C4] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${getStatusColor(report.type)}`}>
                    {getStatusIcon(report.type)}
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                  </div>
                  <span className="text-slate-400 text-sm">{report.time}</span>
                  <span className="text-slate-400 text-sm">• {report.id}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-1">{report.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{report.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {report.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {report.driver}
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    {report.deliveryId}
                  </div>
                </div>

                {/* AI Insight */}
                {report.aiInsight && (
                  <div className="mt-3 p-2 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-2 text-sm">
                      <Brain className="w-4 h-4 text-[#00F5C4]" />
                      <span className="text-slate-300">{report.aiInsight}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="More options"
                >
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Detail Modal */}
      {showDetailModal && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Report Details</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Report Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🧾 Report Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Report ID:</span>
                    <span className="text-white">{selectedReport.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Issue Type:</span>
                    <span className="text-white">{selectedReport.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Description:</span>
                    <span className="text-white">{selectedReport.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time:</span>
                    <span className="text-white">{selectedReport.time}</span>
                  </div>
                </div>
              </div>

              {/* Context */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">📍 Context</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-white">{selectedReport.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Route:</span>
                    <span className="text-white">{selectedReport.route}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stop Number:</span>
                    <span className="text-white">{selectedReport.stopNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Delivery ID:</span>
                    <span className="text-white">{selectedReport.deliveryId}</span>
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">👤 Driver Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Name:</span>
                    <span className="text-white">{selectedReport.driver}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Contact:</span>
                    <button className="flex items-center gap-2 px-3 py-1 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors">
                      <Phone className="w-4 h-4" />
                      {selectedReport.driverContact}
                    </button>
                  </div>
                </div>
              </div>

              {/* Evidence */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">📸 Evidence</h3>
                <div className="space-y-3">
                  {selectedReport.evidenceImages && selectedReport.evidenceImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {selectedReport.evidenceImages.map((image, index) => (
                        <div key={index} className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedReport.voiceNote && (
                    <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
                      <Mic className="w-5 h-5 text-slate-400" />
                      <span className="text-sm text-slate-300">Voice note available</span>
                      <button className="ml-auto p-2 hover:bg-slate-600 rounded transition-colors">
                        ▶️
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">⚙️ Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleAction(selectedReport.id, 'resolve')}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Resolve Issue
                  </button>
                  <button
                    onClick={() => handleAction(selectedReport.id, 'reattempt')}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Request Reattempt
                  </button>
                  <button
                    onClick={() => handleAction(selectedReport.id, 'replace')}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    <Replace className="w-4 h-4" />
                    Replace Item
                  </button>
                  <button
                    onClick={() => handleAction(selectedReport.id, 'contact')}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Contact Driver
                  </button>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🔁 Status Update</h3>
                <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
                  {getStatusIcon(selectedReport.status)}
                  <span className="text-white">Status: {selectedReport.status.replace('_', ' ').toUpperCase()}</span>
                </div>
              </div>

              {/* Feedback Loop */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🔔 Feedback Loop</h3>
                <div className="flex items-center gap-2 p-3 bg-slate-700 rounded-lg">
                  <Bell className="w-4 h-4 text-[#00F5C4]" />
                  <span className="text-slate-300">Driver notified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
