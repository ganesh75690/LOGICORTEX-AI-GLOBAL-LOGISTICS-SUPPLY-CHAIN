import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package as PackageIcon, 
  Truck, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Users, 
  Zap, 
  CheckCircle, 
  XCircle, 
  X,
  Search,
  Activity,
  BarChart3,
  Timer,
  Route,
  Split,
  Check,
  PackageCheck
} from 'lucide-react';

interface DemandZone {
  id: string;
  name: string;
  demand: number;
  demandTrend: 'rising' | 'stable' | 'falling';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  estimatedOrders: number;
  timeWindow: string;
}

interface Driver {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'delayed' | 'offline';
  location: string;
  estimatedArrival: number;
  currentLoad: number;
  maxCapacity: number;
  efficiency: number;
}

interface Parcel {
  id: string;
  trackingNumber: string;
  destination: string;
  status: 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'failed';
  assignedDriver: string | null;
  deliveryTime: string | null;
  priority: 'low' | 'medium' | 'high' | 'critical';
  address: string;
  recipient: string;
}

interface DriverParcelMatch {
  driverId: string;
  driverName: string;
  parcels: Parcel[];
  deliveryStatus: {
    total: number;
    delivered: number;
    inTransit: number;
    pending: number;
    failed: number;
  };
  efficiency: number;
}

const SupplierParcelTracking = () => {
  const [parcelSearchTerm, setParcelSearchTerm] = useState('');
  const [parcelFilterStatus, setParcelFilterStatus] = useState<'all' | 'delivered' | 'in_transit' | 'pending' | 'failed'>('all');
  const [parcelFilterDriver, setParcelFilterDriver] = useState<string>('all');
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [showParcelDetails, setShowParcelDetails] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const drivers: Driver[] = [
    {
      id: 'driver-1',
      name: 'Raj Kumar',
      status: 'available',
      location: 'Zone A',
      estimatedArrival: 5,
      currentLoad: 8,
      maxCapacity: 15,
      efficiency: 92
    },
    {
      id: 'driver-2',
      name: 'Priya Sharma',
      status: 'delayed',
      location: 'Zone B',
      estimatedArrival: 25,
      currentLoad: 12,
      maxCapacity: 15,
      efficiency: 78
    },
    {
      id: 'driver-3',
      name: 'Amit Patel',
      status: 'available',
      location: 'Zone A',
      estimatedArrival: 8,
      currentLoad: 6,
      maxCapacity: 15,
      efficiency: 88
    },
    {
      id: 'driver-4',
      name: 'Sneha Reddy',
      status: 'busy',
      location: 'Zone D',
      estimatedArrival: 15,
      currentLoad: 14,
      maxCapacity: 15,
      efficiency: 95
    }
  ];

  const parcels: Parcel[] = [
    {
      id: 'pkg-001',
      trackingNumber: 'TRK-2024-001',
      destination: 'Zone A',
      status: 'in_transit',
      assignedDriver: 'driver-1',
      deliveryTime: '2024-01-15 10:30',
      priority: 'high',
      address: '123 Main St, Downtown',
      recipient: 'John Smith'
    },
    {
      id: 'pkg-002',
      trackingNumber: 'TRK-2024-002',
      destination: 'Zone A',
      status: 'delivered',
      assignedDriver: 'driver-1',
      deliveryTime: '2024-01-15 09:45',
      priority: 'medium',
      address: '456 Oak Ave, Industrial',
      recipient: 'Tech Corp'
    },
    {
      id: 'pkg-003',
      trackingNumber: 'TRK-2024-003',
      destination: 'Zone B',
      status: 'in_transit',
      assignedDriver: 'driver-2',
      deliveryTime: '2024-01-15 11:15',
      priority: 'critical',
      address: '789 Pine Rd, Commercial',
      recipient: 'Global Industries'
    },
    {
      id: 'pkg-004',
      trackingNumber: 'TRK-2024-004',
      destination: 'Zone D',
      status: 'delivered',
      assignedDriver: 'driver-4',
      deliveryTime: '2024-01-15 08:30',
      priority: 'high',
      address: '321 Elm St, Business Park',
      recipient: 'Supply Chain Co'
    },
    {
      id: 'pkg-005',
      trackingNumber: 'TRK-2024-005',
      destination: 'Zone A',
      status: 'pending',
      assignedDriver: null,
      deliveryTime: null,
      priority: 'medium',
      address: '654 Maple Dr, Residential',
      recipient: 'Home Delivery'
    },
    {
      id: 'pkg-006',
      trackingNumber: 'TRK-2024-006',
      destination: 'Zone C',
      status: 'pending',
      assignedDriver: null,
      deliveryTime: null,
      priority: 'low',
      address: '987 Cedar Ln, Residential',
      recipient: 'Local Business'
    }
  ];

  const driverParcelMatches: DriverParcelMatch[] = drivers.map(driver => {
    const driverParcels = parcels.filter(p => p.assignedDriver === driver.id);
    const deliveryStatus = {
      total: driverParcels.length,
      delivered: driverParcels.filter(p => p.status === 'delivered').length,
      inTransit: driverParcels.filter(p => p.status === 'in_transit').length,
      pending: driverParcels.filter(p => p.status === 'pending').length,
      failed: driverParcels.filter(p => p.status === 'failed').length
    };
    return {
      driverId: driver.id,
      driverName: driver.name,
      parcels: driverParcels,
      deliveryStatus,
      efficiency: driver.efficiency
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <PackageCheck className="w-8 h-8 text-[#00F5C4]" />
              Parcel Tracking
            </h1>
            <p className="text-slate-400 mt-1">Track and manage all parcels in real-time</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">Live Tracking</span>
          </div>
        </div>
      </motion.div>

      {/* Tracking Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-5 gap-4 mb-6"
      >
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <PackageIcon className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{parcels.length}</h3>
          <p className="text-sm text-slate-400">Total Parcels</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">Delivered</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{parcels.filter(p => p.status === 'delivered').length}</h3>
          <p className="text-sm text-slate-400">Delivered</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Timer className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded">In Transit</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{parcels.filter(p => p.status === 'in_transit').length}</h3>
          <p className="text-sm text-slate-400">In Transit</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded">Pending</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{parcels.filter(p => p.status === 'pending').length}</h3>
          <p className="text-sm text-slate-400">Pending</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">Failed</span>
          </div>
          <h3 className="text-2xl font-bold text-white">{parcels.filter(p => p.status === 'failed').length}</h3>
          <p className="text-sm text-slate-400">Failed</p>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800 rounded-xl p-4 mb-6"
      >
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by tracking number, address, or recipient..."
              value={parcelSearchTerm}
              onChange={(e) => setParcelSearchTerm(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400"
            />
          </div>
          <select
            value={parcelFilterStatus}
            onChange={(e) => setParcelFilterStatus(e.target.value as any)}
            className="bg-slate-700/50 border border-slate-600/30 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="in_transit">In Transit</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={parcelFilterDriver}
            onChange={(e) => setParcelFilterDriver(e.target.value)}
            className="bg-slate-700/50 border border-slate-600/30 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Drivers</option>
            {drivers.map(driver => (
              <option key={driver.id} value={driver.id}>{driver.name}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* All Parcels Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <PackageCheck className="w-5 h-5 text-blue-400" />
          All Parcels
        </h3>
        <div className="space-y-2">
          {parcels
            .filter(parcel => {
              const matchesSearch = 
                parcel.trackingNumber.toLowerCase().includes(parcelSearchTerm.toLowerCase()) ||
                parcel.address.toLowerCase().includes(parcelSearchTerm.toLowerCase()) ||
                parcel.recipient.toLowerCase().includes(parcelSearchTerm.toLowerCase());
              const matchesStatus = parcelFilterStatus === 'all' || parcel.status === parcelFilterStatus;
              const matchesDriver = parcelFilterDriver === 'all' || parcel.assignedDriver === parcelFilterDriver;
              return matchesSearch && matchesStatus && matchesDriver;
            })
            .map((parcel, idx) => (
              <motion.div
                key={parcel.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  setSelectedParcel(parcel);
                  setShowParcelDetails(true);
                }}
                className="flex items-center justify-between bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 hover:border-blue-500/50 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${
                    parcel.status === 'delivered' ? 'bg-green-400' :
                    parcel.status === 'in_transit' ? 'bg-orange-400' :
                    parcel.status === 'pending' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`} />
                  <div>
                    <div className="text-sm font-medium text-white">{parcel.trackingNumber}</div>
                    <div className="text-xs text-slate-400">{parcel.address}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded text-xs font-medium ${
                    parcel.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                    parcel.status === 'in_transit' ? 'bg-orange-500/20 text-orange-400' :
                    parcel.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {parcel.status.replace('_', ' ')}
                  </div>
                  <div className="text-xs text-slate-400">
                    {parcel.deliveryTime ? new Date(parcel.deliveryTime).toLocaleTimeString() : 'N/A'}
                  </div>
                  <div className={`px-3 py-1 rounded text-xs font-medium ${
                    parcel.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                    parcel.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    parcel.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {parcel.priority}
                  </div>
                  <div className="text-xs text-slate-400">
                    {parcel.assignedDriver ? drivers.find(d => d.id === parcel.assignedDriver)?.name : 'Unassigned'}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Driver-Parcel Matching */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800 rounded-xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <PackageCheck className="w-5 h-5 text-blue-400" />
          Driver-Parcel Intelligent Matching
        </h3>
        <div className="space-y-4">
          {driverParcelMatches.map((match, idx) => (
            <motion.div
              key={match.driverId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                    {match.driverName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{match.driverName}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">Efficiency: {match.efficiency}%</span>
                      <span className="text-sm text-slate-400">•</span>
                      <span className="text-sm text-slate-400">Parcels: {match.deliveryStatus.total}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{match.deliveryStatus.delivered}</div>
                    <div className="text-xs text-slate-400">Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">{match.deliveryStatus.inTransit}</div>
                    <div className="text-xs text-slate-400">In Transit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{match.deliveryStatus.pending}</div>
                    <div className="text-xs text-slate-400">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{match.deliveryStatus.failed}</div>
                    <div className="text-xs text-slate-400">Failed</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${(match.deliveryStatus.delivered / match.deliveryStatus.total) * 100}%` }}
                />
              </div>

              {/* Parcels List */}
              <div className="space-y-2">
                {match.parcels.length === 0 ? (
                  <div className="text-center py-4 text-slate-400">
                    No parcels assigned to this driver
                  </div>
                ) : (
                  match.parcels.map((parcel, pIdx) => (
                    <div 
                      key={parcel.id}
                      onClick={() => {
                        setSelectedParcel(parcel);
                        setShowParcelDetails(true);
                      }}
                      className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700/50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          parcel.status === 'delivered' ? 'bg-green-400' :
                          parcel.status === 'in_transit' ? 'bg-orange-400' :
                          parcel.status === 'pending' ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`} />
                        <div>
                          <div className="text-sm font-medium text-white">{parcel.trackingNumber}</div>
                          <div className="text-xs text-slate-400">{parcel.address}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          parcel.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                          parcel.status === 'in_transit' ? 'bg-orange-500/20 text-orange-400' :
                          parcel.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {parcel.status.replace('_', ' ')}
                        </div>
                        <div className="text-xs text-slate-400">
                          {parcel.deliveryTime ? new Date(parcel.deliveryTime).toLocaleTimeString() : 'N/A'}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          parcel.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                          parcel.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          parcel.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {parcel.priority}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Unassigned Parcels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-800 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <PackageIcon className="w-5 h-5 text-yellow-400" />
          Unassigned Parcels
        </h3>
        {parcels.filter(p => p.assignedDriver === null).length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            All parcels are assigned to drivers
          </div>
        ) : (
          <div className="space-y-2">
            {parcels.filter(p => p.assignedDriver === null).map((parcel, idx) => (
              <div
                key={parcel.id}
                onClick={() => {
                  setSelectedParcel(parcel);
                  setShowParcelDetails(true);
                }}
                className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <PackageIcon className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-sm font-medium text-white">{parcel.trackingNumber}</div>
                    <div className="text-xs text-slate-400">{parcel.address}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Zone: {parcel.destination}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    parcel.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                    parcel.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {parcel.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Parcel Details Modal */}
      <AnimatePresence>
        {showParcelDetails && selectedParcel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setShowParcelDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <PackageIcon className="w-6 h-6 text-blue-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedParcel.trackingNumber}</h3>
                    <p className="text-sm text-slate-400">Parcel Details</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowParcelDetails(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-1">Status</div>
                    <div className={`text-lg font-bold ${
                      selectedParcel.status === 'delivered' ? 'text-green-400' :
                      selectedParcel.status === 'in_transit' ? 'text-orange-400' :
                      selectedParcel.status === 'pending' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {selectedParcel.status.replace('_', ' ')}
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-1">Priority</div>
                    <div className={`text-lg font-bold ${
                      selectedParcel.priority === 'critical' ? 'text-red-400' :
                      selectedParcel.priority === 'high' ? 'text-orange-400' :
                      selectedParcel.priority === 'medium' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {selectedParcel.priority}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Recipient</div>
                  <div className="text-lg font-bold text-white">{selectedParcel.recipient}</div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Delivery Address</div>
                  <div className="text-sm text-white">{selectedParcel.address}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-1">Destination Zone</div>
                    <div className="text-lg font-bold text-white">{selectedParcel.destination}</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-1">Assigned Driver</div>
                    <div className="text-lg font-bold text-white">
                      {selectedParcel.assignedDriver ? drivers.find(d => d.id === selectedParcel.assignedDriver)?.name : 'Unassigned'}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Scheduled Delivery Time</div>
                  <div className="text-lg font-bold text-white">
                    {selectedParcel.deliveryTime ? new Date(selectedParcel.deliveryTime).toLocaleString() : 'Not scheduled'}
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => {
                      setNotification(`📍 Tracking started for ${selectedParcel.trackingNumber}`);
                      setShowParcelDetails(false);
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Track Parcel
                  </button>
                  <button
                    onClick={() => {
                      setNotification(`📞 Contact recipient for ${selectedParcel.trackingNumber}`);
                      setShowParcelDetails(false);
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Contact Recipient
                  </button>
                  <button
                    onClick={() => setShowParcelDetails(false)}
                    className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-6 right-6 bg-slate-800 border border-green-500/50 text-white p-4 rounded-lg shadow-xl max-w-sm z-50"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{notification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupplierParcelTracking;
