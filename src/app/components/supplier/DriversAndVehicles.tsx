import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Truck,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  Search,
  Bell,
  User,
  Settings,
  MoreVertical,
  Plus,
  Filter,
  ArrowUpDown,
  FileText,
  Wrench,
  Car,
  MapPin,
  Phone,
  IdCard,
  Star,
  Activity,
  Award,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronRight,
  ChevronDown,
  Package,
  Navigation,
  Fuel,
  Calendar,
  CreditCard,
  FileCheck,
  Lock,
  Globe,
  Wifi,
  BarChart3,
  Target,
  AlertCircle,
  CheckSquare,
  AlertOctagon
} from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  driverId: string;
  phone: string;
  assignedVehicle: string;
  licenseStatus: 'Valid' | 'Expiring' | 'Expired';
  availability: 'AVAILABLE' | 'ON_DELIVERY' | 'OFF_DUTY' | 'UNAVAILABLE' | 'ATTENTION_REQUIRED';
  currentAssignment: string;
  safetyScore: number;
  documentStatus: 'Verified' | 'Pending' | 'Expired';
  licenseExpiry: string;
  experience: string;
  totalDeliveries: number;
  completedDeliveries: number;
  failedDeliveries: number;
  onTimePercentage: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface Vehicle {
  id: string;
  registrationNumber: string;
  vehicleType: 'Truck' | 'Van' | 'Container' | 'Pickup';
  capacity: string;
  assignedDriver: string;
  status: 'AVAILABLE' | 'ON_DELIVERY' | 'MAINTENANCE' | 'UNAVAILABLE' | 'ATTENTION_REQUIRED';
  location: string;
  maintenance: 'Healthy' | 'Due' | 'Overdue';
  insurance: 'Valid' | 'Expiring' | 'Expired';
  fitness: 'Valid' | 'Expiring' | 'Expired';
  utilization: number;
  manufacturer: string;
  model: string;
  year: number;
  fuelType: string;
  totalTrips: number;
  totalDistance: string;
  lastService: string;
  nextService: string;
}

interface AIInsight {
  id: string;
  type: 'maintenance' | 'performance' | 'compliance' | 'utilization' | 'availability';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  recommendedAction: string;
}

const DriversAndVehicles = () => {
  const [activeTab, setActiveTab] = useState<'drivers' | 'vehicles'>('drivers');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showSmartAssignment, setShowSmartAssignment] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const drivers: Driver[] = [
    {
      id: '1',
      name: 'Raj Kumar',
      driverId: 'DRV-1048',
      phone: '+91 •••• ••7812',
      assignedVehicle: 'GJ01AB4521',
      licenseStatus: 'Valid',
      availability: 'AVAILABLE',
      currentAssignment: 'TRIP-2048',
      safetyScore: 94,
      documentStatus: 'Verified',
      licenseExpiry: '2025-12-15',
      experience: '8 years',
      totalDeliveries: 1247,
      completedDeliveries: 1218,
      failedDeliveries: 12,
      onTimePercentage: 97,
      riskLevel: 'LOW'
    },
    {
      id: '2',
      name: 'Amit Patel',
      driverId: 'DRV-1049',
      phone: '+91 •••• ••3456',
      assignedVehicle: 'GJ02CD6789',
      licenseStatus: 'Valid',
      availability: 'ON_DELIVERY',
      currentAssignment: 'TRIP-2049',
      safetyScore: 89,
      documentStatus: 'Verified',
      licenseExpiry: '2025-08-20',
      experience: '5 years',
      totalDeliveries: 892,
      completedDeliveries: 845,
      failedDeliveries: 23,
      onTimePercentage: 94,
      riskLevel: 'LOW'
    },
    {
      id: '3',
      name: 'Suresh Singh',
      driverId: 'DRV-1050',
      phone: '+91 •••• ••9012',
      assignedVehicle: 'MH03EF1234',
      licenseStatus: 'Expiring',
      availability: 'AVAILABLE',
      currentAssignment: 'None',
      safetyScore: 82,
      documentStatus: 'Pending',
      licenseExpiry: '2024-11-30',
      experience: '3 years',
      totalDeliveries: 456,
      completedDeliveries: 412,
      failedDeliveries: 18,
      onTimePercentage: 90,
      riskLevel: 'MEDIUM'
    },
    {
      id: '4',
      name: 'Prakash Mehta',
      driverId: 'DRV-1051',
      phone: '+91 •••• ••5678',
      assignedVehicle: 'KA04GH5678',
      licenseStatus: 'Valid',
      availability: 'OFF_DUTY',
      currentAssignment: 'None',
      safetyScore: 91,
      documentStatus: 'Verified',
      licenseExpiry: '2026-03-10',
      experience: '6 years',
      totalDeliveries: 1012,
      completedDeliveries: 978,
      failedDeliveries: 15,
      onTimePercentage: 96,
      riskLevel: 'LOW'
    },
    {
      id: '5',
      name: 'Vikram Joshi',
      driverId: 'DRV-1052',
      phone: '+91 •••• ••2345',
      assignedVehicle: 'TN05IJ9012',
      licenseStatus: 'Valid',
      availability: 'ON_DELIVERY',
      currentAssignment: 'TRIP-2050',
      safetyScore: 87,
      documentStatus: 'Verified',
      licenseExpiry: '2025-09-25',
      experience: '4 years',
      totalDeliveries: 678,
      completedDeliveries: 623,
      failedDeliveries: 21,
      onTimePercentage: 91,
      riskLevel: 'LOW'
    }
  ];

  const vehicles: Vehicle[] = [
    {
      id: '1',
      registrationNumber: 'GJ01AB4521',
      vehicleType: 'Truck',
      capacity: '5 Ton',
      assignedDriver: 'Raj Kumar',
      status: 'AVAILABLE',
      location: 'Ahmedabad Depot',
      maintenance: 'Healthy',
      insurance: 'Valid',
      fitness: 'Valid',
      utilization: 82,
      manufacturer: 'Tata Motors',
      model: 'Signa 4018',
      year: 2022,
      fuelType: 'Diesel',
      totalTrips: 845,
      totalDistance: '124,500 km',
      lastService: '2024-09-15',
      nextService: '2024-12-15'
    },
    {
      id: '2',
      registrationNumber: 'GJ02CD6789',
      vehicleType: 'Truck',
      capacity: '8 Ton',
      assignedDriver: 'Amit Patel',
      status: 'ON_DELIVERY',
      location: 'Route: Mumbai → Pune',
      maintenance: 'Healthy',
      insurance: 'Valid',
      fitness: 'Valid',
      utilization: 91,
      manufacturer: 'BharatBenz',
      model: '2828',
      year: 2021,
      fuelType: 'Diesel',
      totalTrips: 678,
      totalDistance: '98,200 km',
      lastService: '2024-08-20',
      nextService: '2024-11-20'
    },
    {
      id: '3',
      registrationNumber: 'MH03EF1234',
      vehicleType: 'Van',
      capacity: '2 Ton',
      assignedDriver: 'Suresh Singh',
      status: 'MAINTENANCE',
      location: 'Mumbai Workshop',
      maintenance: 'Due',
      insurance: 'Valid',
      fitness: 'Valid',
      utilization: 45,
      manufacturer: 'Maruti Suzuki',
      model: 'Eeco Cargo',
      year: 2020,
      fuelType: 'Petrol',
      totalTrips: 423,
      totalDistance: '45,600 km',
      lastService: '2024-06-10',
      nextService: '2024-09-10'
    },
    {
      id: '4',
      registrationNumber: 'KA04GH5678',
      vehicleType: 'Container',
      capacity: '15 Ton',
      assignedDriver: 'Prakash Mehta',
      status: 'AVAILABLE',
      location: 'Bangalore Hub',
      maintenance: 'Healthy',
      insurance: 'Expiring',
      fitness: 'Valid',
      utilization: 78,
      manufacturer: 'Ashok Leyland',
      model: '4018',
      year: 2023,
      fuelType: 'Diesel',
      totalTrips: 312,
      totalDistance: '56,800 km',
      lastService: '2024-07-25',
      nextService: '2024-10-25'
    },
    {
      id: '5',
      registrationNumber: 'TN05IJ9012',
      vehicleType: 'Truck',
      capacity: '6 Ton',
      assignedDriver: 'Vikram Joshi',
      status: 'ON_DELIVERY',
      location: 'Route: Chennai → Bangalore',
      maintenance: 'Healthy',
      insurance: 'Valid',
      fitness: 'Valid',
      utilization: 88,
      manufacturer: 'Tata Motors',
      model: 'Signa 2815',
      year: 2022,
      fuelType: 'Diesel',
      totalTrips: 567,
      totalDistance: '82,300 km',
      lastService: '2024-08-05',
      nextService: '2024-11-05'
    }
  ];

  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'maintenance',
      severity: 'high',
      title: 'Vehicle Maintenance Due',
      description: 'Vehicle MH03EF1234 is approaching scheduled maintenance.',
      recommendedAction: 'Service before next long-distance assignment'
    },
    {
      id: '2',
      type: 'performance',
      severity: 'medium',
      title: 'Driver Performance Excellence',
      description: 'Driver DRV-1048 has maintained a 94% on-time rate over the last 30 trips.',
      recommendedAction: 'Consider for premium routes and high-priority deliveries'
    },
    {
      id: '3',
      type: 'compliance',
      severity: 'high',
      title: 'Document Expiry Alert',
      description: '3 vehicles have compliance documents expiring within 15 days.',
      recommendedAction: 'Renew insurance and fitness certificates immediately'
    },
    {
      id: '4',
      type: 'availability',
      severity: 'medium',
      title: 'Available Workforce',
      description: '6 drivers are available but currently unassigned.',
      recommendedAction: 'Review pending shipments and optimize fleet utilization'
    },
    {
      id: '5',
      type: 'utilization',
      severity: 'low',
      title: 'Fleet Utilization Trend',
      description: 'Vehicle utilization has decreased by 8% this week.',
      recommendedAction: 'Analyze route efficiency and optimize assignment strategy'
    }
  ];

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ON_DELIVERY': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'OFF_DUTY': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'UNAVAILABLE': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'ATTENTION_REQUIRED': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'HIGH': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-[#00F5C4]" />
            Drivers & Vehicles
          </h2>
          <p className="text-slate-400">Manage driver availability, vehicle readiness and delivery operations from one intelligent workspace.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddDriver(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Driver
          </button>
          <button
            onClick={() => setShowAddVehicle(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold"
          >
            <Plus className="w-4 h-4" />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-[#00F5C4]" />
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">128</div>
          <div className="text-sm text-slate-400">Active workforce</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">94</div>
          <div className="text-sm text-slate-400">Ready for assignment</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-orange-400" />
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white">26</div>
          <div className="text-sm text-slate-400">Currently executing trips</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Truck className="w-5 h-5 text-[#00F5C4]" />
            <CheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">86</div>
          <div className="text-sm text-slate-400">Registered fleet</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Car className="w-5 h-5 text-[#00F5C4]" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">61</div>
          <div className="text-sm text-slate-400">Ready for dispatch</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <AlertOctagon className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white">7</div>
          <div className="text-sm text-slate-400">Documents, maintenance or compliance issues</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('drivers')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'drivers'
                ? 'text-[#00F5C4] border-b-2 border-[#00F5C4] bg-slate-700/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Drivers
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'vehicles'
                ? 'text-[#00F5C4] border-b-2 border-[#00F5C4] bg-slate-700/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Vehicles
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'drivers' ? 'Driver' : 'Vehicle'} / Registration Number`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-[#00F5C4]"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00F5C4]"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="on_delivery">On Delivery</option>
              <option value="maintenance">Maintenance</option>
              <option value="attention">Attention Required</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
          </div>
        </div>

        {/* Drivers Table */}
        {activeTab === 'drivers' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Driver ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">License Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Availability</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Safety Score</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Documents</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {drivers.map((driver) => (
                  <tr
                    key={driver.id}
                    onClick={() => setSelectedDriver(driver)}
                    className="hover:bg-slate-700/50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-slate-900" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{driver.name}</div>
                          <div className="text-sm text-slate-400">{driver.experience}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{driver.driverId}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{driver.phone}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{driver.assignedVehicle}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded border ${
                        driver.licenseStatus === 'Valid' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        driver.licenseStatus === 'Expiring' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {driver.licenseStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded border ${getAvailabilityColor(driver.availability)}`}>
                        {driver.availability.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{driver.currentAssignment}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              driver.safetyScore >= 90 ? 'bg-green-500' :
                              driver.safetyScore >= 75 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${driver.safetyScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-white">{driver.safetyScore}/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded border ${
                        driver.documentStatus === 'Verified' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        driver.documentStatus === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {driver.documentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-slate-700 rounded-lg">
                        <MoreVertical className="w-5 h-5 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Vehicles Table */}
        {activeTab === 'vehicles' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Registration Number</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Vehicle Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Location/Route</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Maintenance</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Insurance</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Fitness</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Utilization</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {vehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="hover:bg-slate-700/50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] rounded-lg flex items-center justify-center">
                          <Truck className="w-5 h-5 text-slate-900" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{vehicle.vehicleType}</div>
                          <div className="text-sm text-slate-400">{vehicle.manufacturer} {vehicle.model}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">{vehicle.registrationNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{vehicle.vehicleType}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{vehicle.capacity}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{vehicle.assignedDriver}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded border ${getAvailabilityColor(vehicle.status)}`}>
                        {vehicle.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{vehicle.location}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded border ${
                        vehicle.maintenance === 'Healthy' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        vehicle.maintenance === 'Due' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {vehicle.maintenance}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded border ${
                        vehicle.insurance === 'Valid' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        vehicle.insurance === 'Expiring' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {vehicle.insurance}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded border ${
                        vehicle.fitness === 'Valid' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        vehicle.fitness === 'Expiring' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {vehicle.fitness}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              vehicle.utilization >= 80 ? 'bg-green-500' :
                              vehicle.utilization >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${vehicle.utilization}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-white">{vehicle.utilization}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-slate-700 rounded-lg">
                        <MoreVertical className="w-5 h-5 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* AI Fleet Intelligence */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00F5C4]" />
            <h2 className="text-lg font-semibold text-white">AI Fleet Intelligence</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className={`p-4 rounded-lg border ${getSeverityColor(insight.severity)}`}>
                <div className="flex items-start gap-3 mb-3">
                  <Zap className="w-5 h-5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{insight.title}</h3>
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
      </div>

      {/* Smart Assignment */}
      <div className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Smart Assignment</h2>
            <p className="text-slate-700">AI-powered driver and vehicle recommendation based on availability, capacity, and performance</p>
          </div>
          <button
            onClick={() => setShowSmartAssignment(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold"
          >
            <Target className="w-5 h-5" />
            Get Recommendation
          </button>
        </div>
      </div>

      {/* Bottom Operational Summary */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Fleet Readiness</h2>
          <span className="text-sm text-slate-400">Last updated: 2 minutes ago</span>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Drivers Ready</span>
              <span className="text-sm font-semibold text-white">94/128</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-[#00F5C4] h-2 rounded-full" style={{ width: '73%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Vehicles Ready</span>
              <span className="text-sm font-semibold text-white">61/86</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-[#00F5C4] h-2 rounded-full" style={{ width: '71%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Compliance Ready</span>
              <span className="text-sm font-semibold text-white">91%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-[#00F5C4] h-2 rounded-full" style={{ width: '91%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Fleet Utilization</span>
              <span className="text-sm font-semibold text-white">82%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-[#00F5C4] h-2 rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500">Protected by LogiCortex AI Trust Layer</span>
        </div>
      </div>

      {/* Driver Detail Modal */}
      <AnimatePresence>
        {selectedDriver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDriver(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedDriver.name}</h3>
                    <p className="text-sm text-slate-400">{selectedDriver.driverId}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDriver(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Driver Profile</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Full Name</span>
                      <span className="text-white">{selectedDriver.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Driver ID</span>
                      <span className="text-white">{selectedDriver.driverId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phone</span>
                      <span className="text-white">{selectedDriver.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">License Category</span>
                      <span className="text-white">Heavy Vehicle</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">License Expiry</span>
                      <span className="text-white">{selectedDriver.licenseExpiry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Experience</span>
                      <span className="text-white">{selectedDriver.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Operational Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Assignment</span>
                      <span className="text-white">{selectedDriver.currentAssignment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Assigned Vehicle</span>
                      <span className="text-white">{selectedDriver.assignedVehicle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Deliveries</span>
                      <span className="text-white">{selectedDriver.totalDeliveries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Completed</span>
                      <span className="text-white">{selectedDriver.completedDeliveries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Failed</span>
                      <span className="text-white">{selectedDriver.failedDeliveries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">On-Time %</span>
                      <span className="text-white">{selectedDriver.onTimePercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">AI Driver Intelligence</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Safety Score</span>
                        <span className="font-semibold text-white">{selectedDriver.safetyScore}/100</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className="bg-[#00F5C4] h-2 rounded-full" style={{ width: `${selectedDriver.safetyScore}%` }} />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Reliability Score</span>
                      <span className="font-semibold text-white">92/100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Delivery Performance</span>
                      <span className="font-semibold text-white">88/100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Risk Level</span>
                      <span className={`font-semibold ${getRiskColor(selectedDriver.riskLevel)}`}>{selectedDriver.riskLevel}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Documents</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-slate-600/50 rounded">
                      <span className="text-slate-400">Driving License</span>
                      <span className="text-green-400 font-medium">Valid</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-600/50 rounded">
                      <span className="text-slate-400">Identity Verification</span>
                      <span className="text-green-400 font-medium">Verified</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-600/50 rounded">
                      <span className="text-slate-400">Insurance Documents</span>
                      <span className="text-green-400 font-medium">Valid</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-600/50 rounded">
                      <span className="text-slate-400">Training Records</span>
                      <span className="text-green-400 font-medium">Completed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold">
                  View Full Profile
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                  Edit Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vehicle Detail Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVehicle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedVehicle.registrationNumber}</h3>
                    <p className="text-sm text-slate-400">{selectedVehicle.vehicleType}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Vehicle Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Registration Number</span>
                      <span className="text-white">{selectedVehicle.registrationNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vehicle Type</span>
                      <span className="text-white">{selectedVehicle.vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Manufacturer</span>
                      <span className="text-white">{selectedVehicle.manufacturer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Model</span>
                      <span className="text-white">{selectedVehicle.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Year</span>
                      <span className="text-white">{selectedVehicle.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Capacity</span>
                      <span className="text-white">{selectedVehicle.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fuel Type</span>
                      <span className="text-white">{selectedVehicle.fuelType}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Operational Health</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Status</span>
                      <span className="text-white">{selectedVehicle.status.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Assigned Driver</span>
                      <span className="text-white">{selectedVehicle.assignedDriver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Trips</span>
                      <span className="text-white">{selectedVehicle.totalTrips}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Distance</span>
                      <span className="text-white">{selectedVehicle.totalDistance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Utilization Rate</span>
                      <span className="text-white">{selectedVehicle.utilization}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Maintenance Intelligence</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Service</span>
                      <span className="text-white">{selectedVehicle.lastService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Next Service</span>
                      <span className="text-white">{selectedVehicle.nextService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Maintenance Status</span>
                      <span className="text-white">{selectedVehicle.maintenance}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Compliance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Registration Validity</span>
                      <span className="text-green-400 font-medium">Valid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Insurance Validity</span>
                      <span className={`font-medium ${selectedVehicle.insurance === 'Valid' ? 'text-green-400' : 'text-yellow-400'}`}>{selectedVehicle.insurance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fitness Certificate</span>
                      <span className="text-green-400 font-medium">Valid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Permit Status</span>
                      <span className="text-green-400 font-medium">Valid</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg hover:bg-[#00D4A8] transition-colors font-semibold">
                  View Full Profile
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                  Edit Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DriversAndVehicles;