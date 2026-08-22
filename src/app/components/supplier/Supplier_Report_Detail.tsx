import { AlertTriangle, Clock, CheckCircle, Package, MapPin, User, Phone, Camera, Mic, ArrowLeft, RefreshCw, Replace, Bell, Brain, Truck, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface ReportDetail {
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
  createdAt: string;
  updatedAt: string;
  resolutionNotes?: string;
}

interface SupplierReportDetailProps {
  report: ReportDetail;
  onBack: () => void;
  onAction: (reportId: string, action: string, notes?: string) => void;
}

export default function SupplierReportDetail({ report, onBack, onAction }: SupplierReportDetailProps) {
  const [actionNotes, setActionNotes] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    onAction(report.id, selectedAction, actionNotes);
    setShowActionModal(false);
    setActionNotes('');
    setSelectedAction('');
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

  const getActionConfig = (action: string) => {
    switch (action) {
      case 'resolve':
        return {
          title: 'Resolve Issue',
          icon: <CheckCircle className="w-5 h-5" />,
          color: 'bg-green-500 hover:bg-green-600',
          placeholder: 'Add resolution notes...'
        };
      case 'reattempt':
        return {
          title: 'Request Reattempt',
          icon: <RefreshCw className="w-5 h-5" />,
          color: 'bg-blue-500 hover:bg-blue-600',
          placeholder: 'Reattempt details...'
        };
      case 'replace':
        return {
          title: 'Replace Item',
          icon: <Replace className="w-5 h-5" />,
          color: 'bg-yellow-500 hover:bg-yellow-600',
          placeholder: 'Replacement information...'
        };
      case 'contact':
        return {
          title: 'Contact Driver',
          icon: <Phone className="w-5 h-5" />,
          color: 'bg-purple-500 hover:bg-purple-600',
          placeholder: 'Contact notes...'
        };
      default:
        return {
          title: 'Action',
          icon: <MessageSquare className="w-5 h-5" />,
          color: 'bg-slate-500 hover:bg-slate-600',
          placeholder: 'Action notes...'
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Inbox
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{report.title}</h1>
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 border ${getStatusColor(report.type)}`}>
                {getStatusIcon(report.type)}
                {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
              </div>
              <span className="text-slate-400">Report ID: {report.id}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-400">{report.time}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Information */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              🧾 Report Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm">Issue Type</label>
                <p className="text-white font-medium">{report.category.charAt(0).toUpperCase() + report.category.slice(1)}</p>
              </div>
              <div>
                <label className="text-slate-400 text-sm">Description</label>
                <p className="text-white">{report.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm">Reported Time</label>
                  <p className="text-white">{report.time}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Last Updated</label>
                  <p className="text-white">{report.updatedAt}</p>
                </div>
              </div>
              {report.resolutionNotes && (
                <div>
                  <label className="text-slate-400 text-sm">Resolution Notes</label>
                  <p className="text-green-400">{report.resolutionNotes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Context Information */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              📍 Context
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-slate-400" />
                <div>
                  <label className="text-slate-400 text-sm">Location</label>
                  <p className="text-white font-medium">{report.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-slate-400" />
                <div>
                  <label className="text-slate-400 text-sm">Delivery Information</label>
                  <p className="text-white font-medium">{report.deliveryId}</p>
                  <p className="text-slate-400 text-sm">{report.route} • Stop {report.stopNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              📸 Evidence
            </h2>
            <div className="space-y-4">
              {report.evidenceImages && report.evidenceImages.length > 0 && (
                <div>
                  <label className="text-slate-400 text-sm block mb-3">Images</label>
                  <div className="grid grid-cols-3 gap-3">
                    {report.evidenceImages.map((image, index) => (
                      <div key={index} className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center border border-slate-600">
                        <Camera className="w-8 h-8 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {report.voiceNote && (
                <div className="flex items-center gap-3 p-4 bg-slate-700 rounded-lg">
                  <Mic className="w-5 h-5 text-[#00F5C4]" />
                  <div className="flex-1">
                    <label className="text-slate-400 text-sm">Voice Note</label>
                    <p className="text-white">Duration: 0:45</p>
                  </div>
                  <button className="p-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors">
                    ▶️
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              ⚙️ Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleActionClick('resolve')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Resolve Issue
              </button>
              <button
                onClick={() => handleActionClick('reattempt')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Request Reattempt
              </button>
              <button
                onClick={() => handleActionClick('replace')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <Replace className="w-4 h-4" />
                Replace Item
              </button>
              <button
                onClick={() => handleActionClick('contact')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Contact Driver
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Driver Information */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              👤 Driver Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{report.driver}</p>
                  <p className="text-slate-400 text-sm">Delivery Driver</p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors">
                <Phone className="w-4 h-4" />
                {report.driverContact}
              </button>
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              🔁 Status Update
            </h2>
            <div className="space-y-4">
              <div className={`flex items-center gap-3 p-3 rounded-lg border ${getStatusColor(report.status)}`}>
                {getStatusIcon(report.status)}
                <span className="font-medium">
                  {report.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-slate-400">
                <p>Created: {report.createdAt}</p>
                <p>Updated: {report.updatedAt}</p>
              </div>
            </div>
          </div>

          {/* Feedback Loop */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              🔔 Feedback Loop
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-slate-700 rounded-lg">
                <Bell className="w-4 h-4 text-[#00F5C4]" />
                <span className="text-sm text-slate-300">Driver notified</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-700 rounded-lg">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-slate-300">Customer updated</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-700 rounded-lg">
                <Package className="w-4 h-4 text-green-400" />
                <span className="text-sm text-slate-300">Warehouse alerted</span>
              </div>
            </div>
          </div>

          {/* AI Insight */}
          {report.aiInsight && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                🧠 Smart Insight
              </h2>
              <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
                <Brain className="w-5 h-5 text-[#00F5C4]" />
                <span className="text-sm text-slate-300">{report.aiInsight}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Confirmation Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-slate-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              {getActionConfig(selectedAction).title}
            </h3>
            
            <div className="mb-4">
              <label className="text-slate-400 text-sm block mb-2">Action Notes (Optional)</label>
              <textarea
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder={getActionConfig(selectedAction).placeholder}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 outline-none focus:border-[#00F5C4] resize-none"
                rows={3}
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowActionModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${getActionConfig(selectedAction).color}`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
