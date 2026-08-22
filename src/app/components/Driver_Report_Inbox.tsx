import { AlertTriangle, Clock, CheckCircle, Package, MapPin, User, Phone, Camera, Mic, Filter, Search, MoreVertical, MessageSquare, Truck, RefreshCw, Replace, Eye, Bell, Brain, TrendingUp, Navigation, Fuel, Wrench, X } from 'lucide-react';
import { useState } from 'react';

interface DriverReport {
  id: string;
  type: 'urgent' | 'pending' | 'resolved';
  category: 'vehicle' | 'route' | 'delivery' | 'maintenance' | 'other';
  title: string;
  description: string;
  location: string;
  driver: string;
  driverContact: string;
  time: string;
  vehicleId: string;
  route: string;
  status: 'pending' | 'in_progress' | 'resolved';
  evidenceImages?: string[];
  voiceNote?: string;
  aiInsight?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const mockDriverReports: DriverReport[] = [
  {
    id: 'DRV-001',
    type: 'urgent',
    category: 'vehicle',
    title: 'Engine Overheating',
    description: 'Vehicle temperature warning light came on during delivery',
    location: 'Highway NH-48, near Vapi',
    driver: 'Ramesh Kumar',
    driverContact: '+91-9876543210',
    time: '10:32 AM',
    vehicleId: 'VH-001',
    route: 'Mumbai to Ahmedabad',
    status: 'pending',
    priority: 'critical',
    evidenceImages: ['/api/placeholder/engine_temp.jpg'],
    aiInsight: 'High risk of engine damage - immediate service required'
  },
  {
    id: 'DRV-002',
    type: 'urgent',
    category: 'route',
    title: 'Road Blocked',
    description: 'Major accident blocking main highway - need alternative route',
    location: 'NH-44, near Pune',
    driver: 'Suresh Patel',
    driverContact: '+91-9876543211',
    time: '09:45 AM',
    vehicleId: 'VH-002',
    route: 'Pune to Hyderabad',
    status: 'in_progress',
    priority: 'high',
    voiceNote: '/api/audio/route_block.mp3',
    aiInsight: '3 alternative routes available - Route B recommended'
  },
  {
    id: 'DRV-003',
    type: 'pending',
    category: 'delivery',
    title: 'Customer Not Available',
    description: 'Customer not responding to calls for delivery',
    location: 'Industrial Area, Gandhinagar',
    driver: 'Mahesh Singh',
    driverContact: '+91-9876543212',
    time: '08:15 AM',
    vehicleId: 'VH-003',
    route: 'Ahmedabad Local',
    status: 'pending',
    priority: 'medium',
    aiInsight: 'Similar issue reported 2 times this month'
  },
  {
    id: 'DRV-004',
    type: 'pending',
    category: 'maintenance',
    title: 'Tire Pressure Low',
    description: 'Front left tire showing low pressure warning',
    location: 'Rest Stop, Surat',
    driver: 'Rajesh Verma',
    driverContact: '+91-9876543213',
    time: '07:30 AM',
    vehicleId: 'VH-004',
    route: 'Surat to Mumbai',
    status: 'resolved',
    priority: 'low',
    evidenceImages: ['/api/placeholder/tire_pressure.jpg'],
    aiInsight: 'Tire pressure normalized after inflation'
  },
  {
    id: 'DRV-005',
    type: 'urgent',
    category: 'other',
    title: 'Fuel Card Not Working',
    description: 'Unable to use company fuel card at petrol pump',
    location: 'BP Pump, Vadodara',
    driver: 'Amit Sharma',
    driverContact: '+91-9876543214',
    time: '06:45 AM',
    vehicleId: 'VH-005',
    route: 'Vadodara to Rajkot',
    status: 'in_progress',
    priority: 'high',
    aiInsight: 'Contact fleet manager for immediate fuel card replacement'
  }
];

export function DriverReportInbox() {
  const [selectedReport, setSelectedReport] = useState<DriverReport | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'urgent' | 'pending' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(new Date());
  const [showResolvedModal, setShowResolvedModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const filteredReports = mockDriverReports.filter(report => {
    const matchesFilter = filterType === 'all' || report.type === filterType;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.vehicleId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vehicle': return <Truck className="w-4 h-4" />;
      case 'route': return <Navigation className="w-4 h-4" />;
      case 'delivery': return <Package className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const handleReportClick = (report: DriverReport) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate API call to refresh data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real application, you would fetch fresh data from your API
    // For now, we'll just update the refresh time
    setLastRefreshTime(new Date());
    setIsRefreshing(false);
  };

  const handleMarkAsResolved = async () => {
    if (!selectedReport) return;
    
    // Simulate API call to mark report as resolved
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update the report status in the mock data
    selectedReport.status = 'resolved';
    selectedReport.type = 'resolved';
    
    setShowDetailModal(false);
    setShowResolvedModal(true);
    
    // Hide the success modal after 3 seconds
    setTimeout(() => setShowResolvedModal(false), 3000);
  };

  const handleAssignToTeam = () => {
    setShowDetailModal(false);
    setShowAssignModal(true);
  };

  const handleExportReport = () => {
    setShowDetailModal(false);
    setShowExportModal(true);
  };

  const confirmAssignToTeam = async () => {
    // Simulate API call to assign to team
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (selectedReport) {
      selectedReport.status = 'in_progress';
    }
    
    setShowAssignModal(false);
  };

  const confirmExportReport = () => {
    // In a real application, this would generate and download a PDF/Excel report
    const reportData = {
      id: selectedReport?.id,
      title: selectedReport?.title,
      description: selectedReport?.description,
      driver: selectedReport?.driver,
      vehicleId: selectedReport?.vehicleId,
      location: selectedReport?.location,
      time: selectedReport?.time,
      status: selectedReport?.status,
      priority: selectedReport?.priority,
      category: selectedReport?.category,
      aiInsight: selectedReport?.aiInsight
    };
    
    console.log('Exporting report:', reportData);
    
    // Create a simple text file download for demonstration
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `driver-report-${selectedReport?.id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    setShowExportModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Driver Report Inbox</h1>
          <p className="text-slate-400">Manage and track driver-reported issues and incidents</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
              isRefreshing 
                ? 'bg-slate-600 text-slate-300 cursor-not-allowed' 
                : 'bg-[#00F5C4] text-slate-900 hover:bg-[#00D4A8]'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          {lastRefreshTime && (
            <span className="text-xs text-slate-400">
              Last updated: {lastRefreshTime.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">2</h3>
              <p className="text-slate-400 text-sm">Urgent Reports</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">3</h3>
              <p className="text-slate-400 text-sm">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">1</h3>
              <p className="text-slate-400 text-sm">Resolved</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#00F5C4]/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-[#00F5C4]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">5</h3>
              <p className="text-slate-400 text-sm">AI Insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-white placeholder-slate-400 outline-none flex-1"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'all' 
                ? 'bg-[#00F5C4] text-slate-900' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('urgent')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'urgent' 
                ? 'bg-red-500 text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Urgent
          </button>
          <button
            onClick={() => setFilterType('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'pending' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterType('resolved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'resolved' 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            onClick={() => handleReportClick(report)}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-[#00F5C4]/50 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(report.type)}`}>
                    {report.type.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(report.priority)}`}>
                    {report.priority.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    {getCategoryIcon(report.category)}
                    <span className="text-xs">{report.category}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{report.title}</h3>
                <p className="text-slate-400 mb-4">{report.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{report.driver}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{report.driverContact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{report.vehicleId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{report.location}</span>
                  </div>
                </div>

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
                  onClick={(e) => e.stopPropagation()}
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedReport.title}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Report Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Report ID:</span>
                      <span className="text-white">{selectedReport.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getTypeColor(selectedReport.type)}`}>
                        {selectedReport.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Priority:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(selectedReport.priority)}`}>
                        {selectedReport.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-white">{selectedReport.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Time:</span>
                      <span className="text-white">{selectedReport.time}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Driver Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Driver:</span>
                      <span className="text-white">{selectedReport.driver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Contact:</span>
                      <span className="text-white">{selectedReport.driverContact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vehicle:</span>
                      <span className="text-white">{selectedReport.vehicleId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Route:</span>
                      <span className="text-white">{selectedReport.route}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-slate-300">{selectedReport.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Location</h3>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedReport.location}</span>
                  </div>
                </div>

                {selectedReport.aiInsight && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">AI Insight</h3>
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
                      <div className="flex items-start gap-3">
                        <Brain className="w-5 h-5 text-[#00F5C4] mt-1" />
                        <span className="text-slate-300">{selectedReport.aiInsight}</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedReport.evidenceImages && selectedReport.evidenceImages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Evidence Images</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedReport.evidenceImages.map((image, index) => (
                        <div key={index} className="bg-slate-800 rounded-lg p-3 border border-slate-600">
                          <div className="aspect-video bg-slate-700 rounded flex items-center justify-center">
                            <Camera className="w-8 h-8 text-slate-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
              <button 
                onClick={handleMarkAsResolved}
                className="flex-1 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-medium"
              >
                Mark as Resolved
              </button>
              <button 
                onClick={handleAssignToTeam}
                className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
              >
                Assign to Team
              </button>
              <button 
                onClick={handleExportReport}
                className="flex-1 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
              >
                Export Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark as Resolved Success Modal */}
      {showResolvedModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full mx-4 border border-slate-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Report Marked as Resolved</h3>
              <p className="text-slate-400 mb-6">
                Report {selectedReport?.id} has been successfully marked as resolved and closed.
              </p>
              <button
                onClick={() => setShowResolvedModal(false)}
                className="px-6 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign to Team Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full mx-4 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Assign to Team</h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Report Details
                </label>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
                  <p className="text-white font-medium">{selectedReport?.title}</p>
                  <p className="text-slate-400 text-sm mt-1">ID: {selectedReport?.id}</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="team-select" className="block text-sm font-medium text-slate-300 mb-2">
                  Select Team
                </label>
                <select id="team-select" className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-[#00F5C4] outline-none">
                  <option value="">Choose a team...</option>
                  <option value="maintenance">Maintenance Team</option>
                  <option value="logistics">Logistics Team</option>
                  <option value="support">Support Team</option>
                  <option value="emergency">Emergency Response</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="priority-select" className="block text-sm font-medium text-slate-300 mb-2">
                  Priority Level
                </label>
                <select id="priority-select" className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-[#00F5C4] outline-none">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea 
                  className="w-full p-3 bg-slate-800 text-white rounded-lg border border-slate-600 focus:border-[#00F5C4] outline-none resize-none"
                  rows={3}
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmAssignToTeam}
                className="flex-1 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-medium"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Report Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full mx-4 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Export Report</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Report to Export
                </label>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
                  <p className="text-white font-medium">{selectedReport?.title}</p>
                  <p className="text-slate-400 text-sm mt-1">ID: {selectedReport?.id}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Export Format
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-700">
                    <input type="radio" name="format" value="json" defaultChecked className="text-[#00F5C4]" />
                    <div>
                      <p className="text-white font-medium">JSON</p>
                      <p className="text-slate-400 text-xs">Structured data format</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-700">
                    <input type="radio" name="format" value="pdf" className="text-[#00F5C4]" />
                    <div>
                      <p className="text-white font-medium">PDF</p>
                      <p className="text-slate-400 text-xs">Printable document format</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-700">
                    <input type="radio" name="format" value="excel" className="text-[#00F5C4]" />
                    <div>
                      <p className="text-white font-medium">Excel</p>
                      <p className="text-slate-400 text-xs">Spreadsheet format</p>
                    </div>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Include Sections
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="text-[#00F5C4]" />
                    <span className="text-slate-300">Report Details</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="text-[#00F5C4]" />
                    <span className="text-slate-300">Driver Information</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="text-[#00F5C4]" />
                    <span className="text-slate-300">AI Insights</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="text-[#00F5C4]" />
                    <span className="text-slate-300">Evidence (if available)</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmExportReport}
                className="flex-1 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-medium"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
