import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  CheckCircle, 
  Clock,
  Edit,
  Trash2,
  RefreshCw,
  X,
  Brain,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Settings,
  Save,
  Plus,
  Trash,
  Truck,
  Search,
  Ban,
  ArrowRight
} from 'lucide-react';
import { AdminDriverManagement } from '../admin/AdminDriverManagement';
import { SupplierDriverManagement } from './SupplierDriverManagement';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  role: 'manager' | 'operator';
  status: 'active' | 'pending' | 'inactive';
}

interface Invite {
  id: string;
  email: string;
  role: 'manager' | 'operator';
  status: 'pending';
}

interface WorkingHours {
  id: string;
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'national' | 'custom';
}

interface Location {
  id: string;
  name: string;
  address: string;
  isPrimary: boolean;
  contactNumber: string;
}

export function Supplier_Team_Management() {
  const [activeTab, setActiveTab] = useState<'members' | 'invites' | 'availability' | 'drivers'>('members');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    role: 'operator' as 'manager' | 'operator'
  });

  const [teamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Rahul Sharma', email: 'rahul@company.com', contactNumber: '+91 98765 43210', address: '123 Main St, Mumbai, Maharashtra 400001', role: 'operator', status: 'active' },
    { id: '2', name: 'Priya Patel', email: 'priya@company.com', contactNumber: '+91 98765 43211', address: '456 Park Ave, Mumbai, Maharashtra 400002', role: 'manager', status: 'active' },
    { id: '3', name: 'Amit Kumar', email: 'amit@company.com', contactNumber: '+91 98765 43212', address: '789 Market Rd, Mumbai, Maharashtra 400003', role: 'operator', status: 'active' },
    { id: '4', name: 'Sneha Reddy', email: 'sneha@company.com', contactNumber: '+91 98765 43213', address: '321 Commerce St, Mumbai, Maharashtra 400004', role: 'operator', status: 'active' },
    { id: '5', name: 'Vikram Singh', email: 'vikram@company.com', contactNumber: '+91 98765 43214', address: '654 Business Ave, Mumbai, Maharashtra 400005', role: 'operator', status: 'active' },
    { id: '6', name: 'Neha Gupta', email: 'neha@company.com', contactNumber: '+91 98765 43215', address: '987 Industrial Area, Mumbai, Maharashtra 400006', role: 'manager', status: 'active' },
  ]);

  const [pendingInvites] = useState<Invite[]>([
    { id: '1', email: 'newoperator@company.com', role: 'operator', status: 'pending' },
    { id: '2', email: 'manager2@company.com', role: 'manager', status: 'pending' },
  ]);

  // Availability Management State
  const [availabilityActiveTab, setAvailabilityActiveTab] = useState<'working-hours' | 'holidays' | 'locations'>('working-hours');
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    { id: '1', day: 'Monday', isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { id: '2', day: 'Tuesday', isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { id: '3', day: 'Wednesday', isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { id: '4', day: 'Thursday', isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { id: '5', day: 'Friday', isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { id: '6', day: 'Saturday', isOpen: false, openTime: '09:00', closeTime: '14:00' },
    { id: '7', day: 'Sunday', isOpen: false, openTime: '09:00', closeTime: '14:00' },
  ]);

  const [holidays, setHolidays] = useState<Holiday[]>([
    { id: '1', name: 'Republic Day', date: '2024-01-26', type: 'national' },
    { id: '2', name: 'Independence Day', date: '2024-08-15', type: 'national' },
    { id: '3', name: 'Gandhi Jayanti', date: '2024-10-02', type: 'national' },
    { id: '4', name: 'Diwali', date: '2024-11-01', type: 'custom' },
  ]);

  const [locations, setLocations] = useState<Location[]>([
    { id: '1', name: 'Main Warehouse', address: '123 Industrial Area, Mumbai, Maharashtra 400001', isPrimary: true, contactNumber: '+91 98765 43210' },
    { id: '2', name: 'Distribution Center A', address: '456 Commerce St, Mumbai, Maharashtra 400002', isPrimary: false, contactNumber: '+91 98765 43211' },
  ]);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
    setInviteForm({ name: '', email: '', contactNumber: '', address: '', role: 'operator' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'inactive': return 'text-slate-400 bg-slate-600/20';
      default: return 'text-slate-400 bg-slate-600/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-3 h-3" />;
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'inactive': return <X className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  // Availability Management Helper Functions
  const updateWorkingHours = (id: string, field: keyof WorkingHours, value: any) => {
    setWorkingHours(prev => 
      prev.map(hour => 
        hour.id === id ? { ...hour, [field]: value } : hour
      )
    );
  };

  const addHoliday = () => {
    const newHoliday: Holiday = {
      id: Date.now().toString(),
      name: '',
      date: '',
      type: 'custom'
    };
    setHolidays(prev => [...prev, newHoliday]);
  };

  const updateHoliday = (id: string, field: keyof Holiday, value: any) => {
    setHolidays(prev => 
      prev.map(holiday => 
        holiday.id === id ? { ...holiday, [field]: value } : holiday
      )
    );
  };

  const deleteHoliday = (id: string) => {
    setHolidays(prev => prev.filter(holiday => holiday.id !== id));
  };

  const addLocation = () => {
    const newLocation: Location = {
      id: Date.now().toString(),
      name: '',
      address: '',
      isPrimary: false,
      contactNumber: ''
    };
    setLocations(prev => [...prev, newLocation]);
  };

  const updateLocation = (id: string, field: keyof Location, value: any) => {
    if (field === 'isPrimary' && value) {
      // If setting a new primary, uncheck all others
      setLocations(prev => 
        prev.map(location => ({
          ...location,
          isPrimary: location.id === id
        }))
      );
    } else {
      setLocations(prev => 
        prev.map(location => 
          location.id === id ? { ...location, [field]: value } : location
        )
      );
    }
  };

  const deleteLocation = (id: string) => {
    setLocations(prev => prev.filter(location => location.id !== id));
  };

  const activeCount = teamMembers.filter(m => m.status === 'active').length;
  const pendingCount = teamMembers.filter(m => m.status === 'pending').length;

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h1 className="text-2xl font-bold text-white mb-2">Team Management</h1>
          <p className="text-slate-400">Manage your team members and their permissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">{teamMembers.length}</span>
            </div>
            <h3 className="text-lg font-semibold text-white">Total Team</h3>
            <p className="text-sm text-slate-400">All team members</p>
          </div>
          
          <div className="bg-slate-800 rounded-xl px-4 py-3 border border-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-slate-300">Active</span>
              <span className="text-lg font-bold text-white">{activeCount}</span>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl px-4 py-3 border border-slate-700">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-slate-300">Pending</span>
              <span className="text-lg font-bold text-white">{pendingCount}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-800 rounded-xl p-2 border border-slate-700">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('members')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'members'
                  ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Team Members
            </button>
            <button
              onClick={() => setActiveTab('invites')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'invites'
                  ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Invitations
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'availability'
                  ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Availability
            </button>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'drivers'
                  ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Truck className="w-4 h-4 inline mr-2" />
              Drivers
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'members' && (
          <div>
            {/* AI Insight Card */}
            <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-xl p-4 mb-8 border border-blue-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Staff Recommendation</h3>
                  <p className="text-sm text-slate-400">2 more staff needed for current workload</p>
                </div>
                <TrendingUp className="w-5 h-5 text-blue-400 ml-auto" />
              </div>
            </div>

            {/* Invite New Member Card */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Invite Team Member</h2>
              
              <form onSubmit={handleSendInvite} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={inviteForm.name}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, name: e.target.value }))}
                    className="px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  
                  <input
                    type="email"
                    placeholder="Email"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                    className="px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    value={inviteForm.contactNumber}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                    className="px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, role: e.target.value as any }))}
                    className="px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select role"
                  >
                    <option value="">Select Role (Optional)</option>
                    <option value="manager">Manager</option>
                    <option value="operator">Operator</option>
                  </select>
                </div>
                
                <div>
                  <textarea
                    placeholder="Address"
                    value={inviteForm.address}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black rounded-lg hover:from-[#00D4A8] hover:to-[#00F5C4] transition-all flex items-center gap-2 font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  Send Invite
                </button>
              </form>
            </div>

            {/* Team Members List */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Team Members</h2>
              
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          <div className="text-sm text-slate-400">{member.email}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(member.status)}`}>
                          {getStatusIcon(member.status)}
                          <span className="capitalize">{member.status}</span>
                        </div>
                        
                        <div className="text-sm text-slate-300 capitalize">{member.role}</div>
                        
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors" aria-label="Edit member">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" aria-label="Remove member">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Contact:</span>
                        <span className="text-slate-300">{member.contactNumber}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-slate-500">Address:</span>
                        <span className="text-slate-300">{member.address}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'invites' && (
          <div>
            {/* Pending Invites */}
            {pendingInvites.length > 0 && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Pending Invites</h2>
                
                <div className="space-y-3">
                  {pendingInvites.map((invite) => (
                    <div key={invite.id} className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{invite.email}</div>
                          <div className="text-sm text-slate-400">Role: {invite.role}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-1">
                          <RefreshCw className="w-3 h-3" />
                          Resend
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1">
                          <X className="w-3 h-3" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'availability' && (
          <div className="space-y-6">
            {/* Availability Header */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Availability Management</h2>
              <p className="text-slate-400">Manage working hours, holidays, and operational locations</p>
            </div>

            {/* Availability Sub-tabs */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setAvailabilityActiveTab('working-hours')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    availabilityActiveTab === 'working-hours'
                      ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  Working Hours
                </button>
                <button
                  onClick={() => setAvailabilityActiveTab('holidays')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    availabilityActiveTab === 'holidays'
                      ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Holidays
                </button>
                <button
                  onClick={() => setAvailabilityActiveTab('locations')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    availabilityActiveTab === 'locations'
                      ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Locations
                </button>
              </div>
            </div>

            {/* Working Hours Tab */}
            {availabilityActiveTab === 'working-hours' && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Working Hours Configuration</h3>
                <div className="space-y-3">
                  {workingHours.map((hour) => (
                    <div key={hour.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="flex items-center gap-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hour.isOpen}
                            onChange={(e) => updateWorkingHours(hour.id, 'isOpen', e.target.checked)}
                            className="sr-only peer"
                            aria-label={`Toggle ${hour.day} working hours`}
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                        <span className="font-medium text-white">{hour.day}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <label htmlFor={`open-time-${hour.id}`} className="text-slate-400 text-sm">Open:</label>
                          <input
                            id={`open-time-${hour.id}`}
                            type="time"
                            value={hour.openTime}
                            onChange={(e) => updateWorkingHours(hour.id, 'openTime', e.target.value)}
                            disabled={!hour.isOpen}
                            className="px-3 py-1 border border-slate-600 rounded bg-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label htmlFor={`close-time-${hour.id}`} className="text-slate-400 text-sm">Close:</label>
                          <input
                            id={`close-time-${hour.id}`}
                            type="time"
                            value={hour.closeTime}
                            onChange={(e) => updateWorkingHours(hour.id, 'closeTime', e.target.value)}
                            disabled={!hour.isOpen}
                            className="px-3 py-1 border border-slate-600 rounded bg-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black rounded-lg hover:from-[#00D4A8] hover:to-[#00F5C4] transition-all font-medium flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Working Hours
                  </button>
                </div>
              </div>
            )}

            {/* Holidays Tab */}
            {availabilityActiveTab === 'holidays' && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Holiday Schedule</h3>
                  <button
                    onClick={addHoliday}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Holiday
                  </button>
                </div>
                <div className="space-y-3">
                  {holidays.map((holiday) => (
                    <div key={holiday.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${holiday.type === 'national' ? 'bg-red-400' : 'bg-blue-400'}`}></div>
                        <div>
                          <input
                            type="text"
                            value={holiday.name}
                            onChange={(e) => updateHoliday(holiday.id, 'name', e.target.value)}
                            className="font-medium text-white bg-transparent border-b border-slate-600 focus:border-blue-500 focus:outline-none"
                            placeholder="Holiday name"
                          />
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="date"
                              value={holiday.date}
                              onChange={(e) => updateHoliday(holiday.id, 'date', e.target.value)}
                              className="px-2 py-1 border border-slate-600 rounded bg-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              title="Holiday date"
                              aria-label="Holiday date"
                            />
                            <span className="text-xs px-2 py-1 rounded bg-slate-600 text-slate-300">
                              {holiday.type === 'national' ? 'National' : 'Custom'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => deleteHoliday(holiday.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          aria-label="Delete holiday"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black rounded-lg hover:from-[#00D4A8] hover:to-[#00F5C4] transition-all font-medium flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Holidays
                  </button>
                </div>
              </div>
            )}

            {/* Locations Tab */}
            {availabilityActiveTab === 'locations' && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Operational Locations</h3>
                  <button
                    onClick={addLocation}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Location
                  </button>
                </div>
                <div className="space-y-3">
                  {locations.map((location) => (
                    <div key={location.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <input
                              type="text"
                              value={location.name}
                              onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                              className="font-medium text-white bg-transparent border-b border-slate-600 focus:border-blue-500 focus:outline-none"
                              placeholder="Location name"
                            />
                            {location.isPrimary && (
                              <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30">
                                Primary
                              </span>
                            )}
                          </div>
                          <input
                            type="text"
                            value={location.address}
                            onChange={(e) => updateLocation(location.id, 'address', e.target.value)}
                            className="w-full text-slate-300 bg-transparent border-b border-slate-600 focus:border-blue-500 focus:outline-none mb-2"
                            placeholder="Full address"
                          />
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <input
                              type="tel"
                              value={location.contactNumber}
                              onChange={(e) => updateLocation(location.id, 'contactNumber', e.target.value)}
                              className="text-slate-300 bg-transparent border-b border-slate-600 focus:border-blue-500 focus:outline-none"
                              placeholder="Contact number"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 text-sm text-slate-300">
                            <input
                              type="checkbox"
                              checked={location.isPrimary}
                              onChange={(e) => updateLocation(location.id, 'isPrimary', e.target.checked)}
                              className="rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                            />
                            Primary
                          </label>
                          <button
                            onClick={() => deleteLocation(location.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            aria-label="Delete location"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black rounded-lg hover:from-[#00D4A8] hover:to-[#00F5C4] transition-all font-medium flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Locations
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'drivers' && (
          <div>
            {/* Check user role and render appropriate driver management */}
            {(() => {
              // In a real app, you'd get this from auth context
              const userRole = localStorage.getItem('userRole') || 'admin';
              
              if (userRole === 'admin') {
                return <AdminDriverManagement />;
              } else {
                return <SupplierDriverManagement />;
              }
            })()}
          </div>
        )}

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowSuccessModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 rounded-xl p-6 max-w-sm w-full border border-slate-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Invite Sent!</h3>
                  <p className="text-slate-400 mb-4">Link shared successfully</p>
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black rounded-lg hover:from-[#00D4A8] hover:to-[#00F5C4] transition-all font-medium"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
