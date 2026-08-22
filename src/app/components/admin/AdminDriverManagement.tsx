import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, 
  Users, 
  Truck, 
  Building, 
  Search, 
  Ban,
  CheckCircle,
  XCircle,
  ArrowRight,
  Mail,
  Phone,
  X,
  Send
} from 'lucide-react';
import { Driver, Supplier, DriverAssignment, getPermissionsForRole } from '../../../types/driver';

export function AdminDriverManagement() {
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      organization_id: 'ORG-7842',
      supplier_id: 'SUP-123',
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
      supplier_id: undefined, // Org-only driver
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
      supplier_id: 'SUP-456',
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

  const [suppliers] = useState<Supplier[]>([
    {
      id: 'SUP-123',
      organization_id: 'ORG-7842',
      name: 'Global Logistics Ltd',
      email: 'contact@globallogistics.com',
      phone: '+91 22 1234 5678',
      status: 'active',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: 'SUP-456',
      organization_id: 'ORG-7842',
      name: 'Fast Transport Co',
      email: 'info@fasttransport.com',
      phone: '+91 33 8765 4321',
      status: 'active',
      created_at: '2024-01-15T00:00:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [supplierFilter, setSupplierFilter] = useState<'all' | string>('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [permissions] = useState(getPermissionsForRole('admin'));
  const [inviteForm, setInviteForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    supplierId: ''
  });

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = `${driver.first_name} ${driver.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    
    const matchesSupplier = supplierFilter === 'all' || 
                           (supplierFilter === 'none' && !driver.supplier_id) ||
                           driver.supplier_id === supplierFilter;

    return matchesSearch && matchesStatus && matchesSupplier;
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

  const getVehicleIcon = (type: string) => {
    return <Truck className="w-4 h-4" />;
  };

  const getSupplierName = (supplierId?: string) => {
    if (!supplierId) return 'Organization Only';
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier?.name || 'Unknown Supplier';
  };

  const handleReassignDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setShowReassignModal(true);
  };

  const handleToggleDriverStatus = (driverId: string) => {
    setDrivers(prev => prev.map(driver => 
      driver.id === driverId 
        ? { ...driver, status: driver.status === 'active' ? 'inactive' : 'active' }
        : driver
    ));
  };

  const handleInviteDriver = () => {
    console.log('Inviting driver:', inviteForm);
    // Here you would send the invite to your API
    setShowInviteModal(false);
    setInviteForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      supplierId: ''
    });
  };

  const handleCancelInvite = () => {
    setShowInviteModal(false);
    setInviteForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      supplierId: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Driver Management</h1>
          <p className="text-slate-300">Manage all drivers in your organization</p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Invite Driver
          </button>

          {/* Search */}
          <div className="flex-1 min-w-[200px] max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
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

          <select
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            title="Filter by supplier"
            aria-label="Filter by supplier"
          >
            <option value="all">All Suppliers</option>
            <option value="none">Organization Only</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Assigned To</th>
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
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">{getSupplierName(driver.supplier_id)}</span>
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
                        {permissions.canReassignDrivers && (
                          <button
                            onClick={() => handleReassignDriver(driver)}
                            className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors"
                            title="Reassign Driver"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                        {permissions.canDisableAccounts && (
                          <button
                            onClick={() => handleToggleDriverStatus(driver.id)}
                            className="p-2 text-yellow-400 hover:bg-yellow-400/20 rounded-lg transition-colors"
                            title={driver.status === 'active' ? 'Disable Driver' : 'Enable Driver'}
                          >
                            {driver.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reassign Driver Modal */}
        {showReassignModal && selectedDriver && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Reassign Driver</h3>
              <p className="text-slate-300 mb-6">
                Reassign {selectedDriver!.first_name} {selectedDriver!.last_name} to:
              </p>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-left hover:bg-slate-700/70 transition-colors">
                  <div className="font-medium text-white">Organization Only</div>
                  <div className="text-sm text-slate-400">Remove from current supplier</div>
                </button>
                
                {suppliers.map(supplier => (
                  <button key={supplier.id} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-left hover:bg-slate-700/70 transition-colors">
                    <div className="font-medium text-white">{supplier.name}</div>
                    <div className="text-sm text-slate-400">{supplier.email}</div>
                  </button>
                ))}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowReassignModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white hover:bg-slate-700/70 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowReassignModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Reassign
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Invite Driver Modal */}
        <AnimatePresence>
          {showInviteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 max-w-lg w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Invite New Driver</h3>
                <button
                  onClick={handleCancelInvite}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Close invite form"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleInviteDriver(); }}>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={inviteForm.firstName}
                      onChange={(e) => setInviteForm(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="John"
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
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="driver@example.com"
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
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                {/* Supplier Assignment */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Assign to Supplier (Optional)
                  </label>
                  <select
                    value={inviteForm.supplierId}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, supplierId: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    title="Assign driver to supplier"
                    aria-label="Assign driver to supplier"
                  >
                    <option value="">Organization Only</option>
                    {suppliers.map(supplier => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancelInvite}
                    className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 text-white rounded-lg hover:bg-slate-700/70 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Invite
                  </button>
                </div>
              </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 
