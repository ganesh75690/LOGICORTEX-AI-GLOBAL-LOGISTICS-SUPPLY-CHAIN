import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar,
  Clock,
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Plus,
  Edit,
  Brain,
  TrendingUp,
  Users,
  RefreshCw,
  X
} from 'lucide-react';

interface Holiday {
  id: string;
  date: string;
  reason: 'public_holiday' | 'maintenance' | 'personal';
  status: 'active' | 'cancelled';
}

interface WorkingHours {
  openingTime: string;
  closingTime: string;
  timezone: string;
}

export function Supplier_Availability_Management() {
  const [isOperational, setIsOperational] = useState(true);
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [showWorkingHoursModal, setShowWorkingHoursModal] = useState(false);
  const [showImpactModal, setShowImpactModal] = useState(false);
  
  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: '1', date: '2024-01-26', reason: 'public_holiday', status: 'active' },
    { id: '2', date: '2024-08-15', reason: 'public_holiday', status: 'active' },
    { id: '3', date: '2024-12-25', reason: 'public_holiday', status: 'active' }
  ]);

  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    openingTime: '09:00',
    closingTime: '19:00',
    timezone: 'IST'
  });

  const [holidayForm, setHolidayForm] = useState({
    date: '',
    reason: 'public_holiday' as 'public_holiday' | 'maintenance' | 'personal'
  });

  const [tempWorkingHours, setTempWorkingHours] = useState(workingHours);

  const affectedDeliveries = 12;
  const downtimeDays = 2;
  const impactLevel = 'minimal';

  const handleToggleAvailability = () => {
    if (!isOperational) {
      setShowImpactModal(true);
    } else {
      setIsOperational(!isOperational);
    }
  };

  const handleAddHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!holidayForm.date) return;

    const newHoliday: Holiday = {
      id: Date.now().toString(),
      date: holidayForm.date,
      reason: holidayForm.reason,
      status: 'active'
    };

    setHolidays(prev => [...prev, newHoliday].sort((a, b) => a.date.localeCompare(b.date)));
    setHolidayForm({ date: '', reason: 'public_holiday' });
    setShowHolidayModal(false);
    setShowImpactModal(true);
  };

  const handleSaveWorkingHours = () => {
    setWorkingHours(tempWorkingHours);
    setShowWorkingHoursModal(false);
  };

  const handleNotifyDrivers = () => {
    console.log('Notifying drivers about schedule changes...');
    setShowImpactModal(false);
  };

  const handleRescheduleDeliveries = () => {
    console.log('Rescheduling affected deliveries...');
    setShowImpactModal(false);
  };

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case 'public_holiday': return 'Public Holiday';
      case 'maintenance': return 'Maintenance';
      case 'personal': return 'Personal';
      default: return reason;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            Availability Management
          </h1>
          <p className="text-slate-300">Manage working days, holidays, and operational availability</p>
        </div>

        {/* Availability Status Card */}
        <div className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border ${isOperational ? 'border-green-500/30' : 'border-red-500/30'} mb-8`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isOperational ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {isOperational ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">
                  Status: {isOperational ? '🟢 Active / Operational' : '🔴 Closed (Holiday Mode)'}
                </h2>
                <p className="text-slate-300">
                  {isOperational ? 'Currently accepting deliveries' : 'Temporarily closed for holidays'}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleToggleAvailability}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isOperational ? <ToggleLeft className="w-5 h-5" /> : <ToggleRight className="w-5 h-5" />}
              {isOperational ? 'Mark as Closed' : 'Mark as Open'}
            </button>
          </div>
        </div>

        {/* Holiday Calendar */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Holiday Schedule</h2>
            <button
              onClick={() => setShowHolidayModal(true)}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Holiday
            </button>
          </div>
          
          <div className="space-y-3">
            {holidays.map((holiday) => (
              <div key={holiday.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{formatDate(holiday.date)} – Closed</div>
                    <div className="text-sm text-slate-400">{getReasonLabel(holiday.reason)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 rounded-lg transition-colors" aria-label="Edit holiday">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors" aria-label="Delete holiday">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Working Hours</h2>
                <div className="text-sm text-slate-300">
                  Opening Time: {workingHours.openingTime} | Closing Time: {workingHours.closingTime}
                </div>
                <div className="text-xs text-slate-400">Timezone: {workingHours.timezone}</div>
              </div>
            </div>
            
            <button
              onClick={() => setShowWorkingHoursModal(true)}
              className="px-4 py-2 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Schedule
            </button>
          </div>
        </div>

        {/* Auto Adjustment Card */}
        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4 mb-8 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Auto Adjustment</h3>
              <p className="text-sm text-slate-300">System will reroute deliveries to nearby suppliers during closure</p>
            </div>
            <RefreshCw className="w-5 h-5 text-blue-400 ml-auto" />
          </div>
        </div>

        {/* Availability Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-slate-300">Downtime this month</span>
            </div>
            <div className="text-2xl font-bold text-white">{downtimeDays} days</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-slate-300">Impact on deliveries</span>
            </div>
            <div className="text-2xl font-bold text-white capitalize">{impactLevel}</div>
          </div>
        </div>

        {/* Notifications Sync */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-300">Drivers and admin will be notified of schedule changes</span>
          </div>
        </div>

        {/* Add Holiday Modal */}
        <AnimatePresence>
          {showHolidayModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowHolidayModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Add Holiday</h3>
                
                <form onSubmit={handleAddHoliday} className="space-y-4">
                  <div>
                    <label htmlFor="holiday-date" className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                    <input
                      type="date"
                      id="holiday-date"
                      value={holidayForm.date}
                      onChange={(e) => setHolidayForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="holiday-reason" className="block text-sm font-medium text-slate-300 mb-2">Reason</label>
                    <select
                      id="holiday-reason"
                      value={holidayForm.reason}
                      onChange={(e) => setHolidayForm(prev => ({ ...prev, reason: e.target.value as any }))}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="public_holiday">Public Holiday</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowHolidayModal(false)}
                      className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Add Holiday
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Working Hours Modal */}
        <AnimatePresence>
          {showWorkingHoursModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowWorkingHoursModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Edit Working Hours</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="opening-time" className="block text-sm font-medium text-slate-300 mb-2">Opening Time</label>
                    <input
                      type="time"
                      id="opening-time"
                      value={tempWorkingHours.openingTime}
                      onChange={(e) => setTempWorkingHours(prev => ({ ...prev, openingTime: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="closing-time" className="block text-sm font-medium text-slate-300 mb-2">Closing Time</label>
                    <input
                      type="time"
                      id="closing-time"
                      value={tempWorkingHours.closingTime}
                      onChange={(e) => setTempWorkingHours(prev => ({ ...prev, closingTime: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowWorkingHoursModal(false)}
                      className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveWorkingHours}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Impact Notification Modal */}
        <AnimatePresence>
          {showImpactModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowImpactModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 max-w-md w-full border border-yellow-500/30"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Schedule Change Impact</h3>
                  <p className="text-slate-300 mb-4">
                    ⚠️ {affectedDeliveries} deliveries may be affected
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleNotifyDrivers}
                    className="w-full px-4 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Notify Drivers
                  </button>
                  
                  <button
                    onClick={handleRescheduleDeliveries}
                    className="w-full px-4 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reschedule Deliveries
                  </button>
                  
                  <button
                    onClick={() => setShowImpactModal(false)}
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
