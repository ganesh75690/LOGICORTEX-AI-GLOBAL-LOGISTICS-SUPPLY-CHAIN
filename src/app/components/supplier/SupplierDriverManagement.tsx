import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  UserPlus, 
  Users, 
  Truck, 
  Search, 
  Ban,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Driver, getPermissionsForRole } from '../../../types/driver';

export function SupplierDriverManagement() {
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      organization_id: 'ORG-7842',
      supplier_id: 'SUP-123', // This supplier's drivers only
      first_name: 'Rajesh',
      last_name: 'Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      license_number: 'DL-2021-001234',
      vehicle_type: 'truck',
      status: 'active',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z',
      last_login: '2024-04-25T08:15:00Z'
    },
    {
      id: '2',
      organization_id: 'ORG-7842',
      supplier_id: 'SUP-123', // This supplier's drivers only
      first_name: 'Amit',
      last_name: 'Singh',
      email: 'amit.singh@email.com',
      phone: '+91 87654 32109',
      license_number: 'DL-2020-005678',
      vehicle_type: 'van',
      status: 'active',
      created_at: '2024-02-20T14:22:00Z',
      updated_at: '2024-02-20T14:22:00Z',
      last_login: '2024-04-24T16:45:00Z'
    },
    {
      id: '3',
      organization_id: 'ORG-7842',
      supplier_id: 'SUP-123', // This supplier's drivers only
      first_name: 'Vikram',
      last_name: 'Patel',
      email: 'vikram.patel@email.com',
      phone: '+91 76543 21098',
      license_number: 'DL-2019-009012',
      vehicle_type: 'motorcycle',
      status: 'inactive',
      created_at: '2023-12-10T09:15:00Z',
      updated_at: '2024-03-15T11:30:00Z',
      last_login: '2024-03-14T12:20:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [permissions] = useState(getPermissionsForRole('supplier', 'SUP-123'));
  const [inviteForm, setInviteForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = `${driver.first_name} ${driver.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'pending':
        return <div className="w-4 h-4 rounded-full border-2 border-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'inactive':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      default:
        return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
    }
  };

  const getVehicleIcon = (vehicleType: string) => {
    return <Truck className="w-4 h-4" />;
  };

  const handleAssignToDelivery = (driverId: string) => {
    // Implementation for assigning driver to delivery
    console.log('Assigning driver to delivery:', driverId);
  };

  // Handle invite form submission
  const handleInviteDriver = () => {
    console.log('Inviting driver:', inviteForm);
    // Here you would send the invite to your API
    setShowInviteModal(false);
    setInviteForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  };

  // Handle cancel
  const handleCancelInvite = () => {
    setShowInviteModal(false);
    setInviteForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Drivers</h1>
          <p className="text-slate-300">Manage drivers assigned to your deliveries</p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap gap-4 mb-6">
          {permissions.canInviteDrivers && (
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Invite Driver
            </button>
          )}

          {/* Search */}
          <div className="flex-1 min-w-[200px] max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search your drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            title="Filter by driver status"
            aria-label="Filter by driver status"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Drivers Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Driver</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Vehicle</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {driver.first_name} {driver.last_name}
                          </div>
                          <div className="text-slate-400 text-sm">
                            License: {driver.license_number}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-300">{driver.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-300">{driver.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getVehicleIcon(driver.vehicle_type)}
                        <span className="capitalize text-slate-300">{driver.vehicle_type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(driver.status)}`}>
                        {getStatusIcon(driver.status)}
                        <span className="capitalize">{driver.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAssignToDelivery(driver.id)}
                          className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-sm rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-1"
                          disabled={driver.status !== 'active'}
                        >
                          <ArrowRight className="w-3 h-3" />
                          Assign to Delivery
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredDrivers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No drivers found</h3>
            <p className="text-slate-400">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters or search terms'
                : 'Start by inviting your first driver'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && permissions.canInviteDrivers && (
              <button
                onClick={() => setShowInviteModal(true)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <UserPlus className="w-4 h-4" />
                Invite Your First Driver
              </button>
            )}
          </div>
        )}

        {/* Invite Driver Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Invite Driver</h3>
              <p className="text-slate-300 mb-6">
                Send an invitation to a new driver to join your team
              </p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleInviteDriver(); }}>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={inviteForm.firstName}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="John"
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={inviteForm.lastName}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Doe"
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={inviteForm.phone}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="driver@email.com"
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </form>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white hover:bg-slate-700/70 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Send Invite
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
