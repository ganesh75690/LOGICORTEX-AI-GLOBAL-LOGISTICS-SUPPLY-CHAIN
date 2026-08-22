import { Warehouse, Truck, Package, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Map, Activity, BarChart3, Route, Eye, X, Mail, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useState } from 'react';
import { SupplierMap } from './SupplierMap';

interface Warehouse {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  totalStock: number;
  capacity: number;
  utilizationRate: number;
  inboundTransfers: number;
  outboundTransfers: number;
  pendingShipments: number;
}

interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  fromWarehouse: string;
  toWarehouse: string;
  quantity: number;
  status: 'in-transit' | 'pending' | 'completed' | 'delayed';
  estimatedArrival: string;
  actualArrival?: string;
  priority: 'high' | 'medium' | 'low';
  transportMethod: 'truck' | 'rail' | 'air' | 'sea';
  cost: number;
}

interface TransferRoute {
  from: string;
  to: string;
  volume: number;
  frequency: string;
  avgTransitTime: string;
  efficiency: number;
}

const mockWarehouses: Warehouse[] = [
  {
    id: 'WH001',
    name: 'North Warehouse',
    location: 'Chicago, IL',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    totalStock: 7500,
    capacity: 10000,
    utilizationRate: 75,
    inboundTransfers: 12,
    outboundTransfers: 8,
    pendingShipments: 3
  },
  {
    id: 'WH002',
    name: 'South Warehouse',
    location: 'Austin, TX',
    coordinates: { lat: 30.2672, lng: -97.7431 },
    totalStock: 6200,
    capacity: 8000,
    utilizationRate: 77.5,
    inboundTransfers: 6,
    outboundTransfers: 15,
    pendingShipments: 2
  },
  {
    id: 'WH003',
    name: 'West Warehouse',
    location: 'Los Angeles, CA',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    totalStock: 9800,
    capacity: 12000,
    utilizationRate: 81.7,
    inboundTransfers: 9,
    outboundTransfers: 11,
    pendingShipments: 4
  },
  {
    id: 'WH004',
    name: 'East Warehouse',
    location: 'New York, NY',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    totalStock: 5400,
    capacity: 9000,
    utilizationRate: 60,
    inboundTransfers: 4,
    outboundTransfers: 7,
    pendingShipments: 1
  }
];

const mockStockMovements: StockMovement[] = [
  {
    id: 'MV001',
    productId: 'PRD001',
    productName: 'Circuit Board A',
    sku: 'SKU-7845',
    fromWarehouse: 'WH001',
    toWarehouse: 'WH003',
    quantity: 250,
    status: 'in-transit',
    estimatedArrival: '2024-04-26',
    priority: 'high',
    transportMethod: 'truck',
    cost: 1250
  },
  {
    id: 'MV002',
    productId: 'PRD002',
    productName: 'Brake Pads',
    sku: 'SKU-2341',
    fromWarehouse: 'WH002',
    toWarehouse: 'WH004',
    quantity: 150,
    status: 'pending',
    estimatedArrival: '2024-04-27',
    priority: 'medium',
    transportMethod: 'truck',
    cost: 450
  },
  {
    id: 'MV003',
    productId: 'PRD003',
    productName: 'Steel Rods',
    sku: 'SKU-9012',
    fromWarehouse: 'WH003',
    toWarehouse: 'WH001',
    quantity: 500,
    status: 'completed',
    estimatedArrival: '2024-04-24',
    actualArrival: '2024-04-24',
    priority: 'low',
    transportMethod: 'rail',
    cost: 890
  },
  {
    id: 'MV004',
    productId: 'PRD004',
    productName: 'LED Bulbs',
    sku: 'SKU-5678',
    fromWarehouse: 'WH004',
    toWarehouse: 'WH002',
    quantity: 300,
    status: 'delayed',
    estimatedArrival: '2024-04-25',
    priority: 'high',
    transportMethod: 'truck',
    cost: 675
  }
];

const mockTransferRoutes: TransferRoute[] = [
  { from: 'WH001', to: 'WH003', volume: 2500, frequency: 'Daily', avgTransitTime: '3 days', efficiency: 94 },
  { from: 'WH002', to: 'WH004', volume: 1800, frequency: 'Weekly', avgTransitTime: '2 days', efficiency: 91 },
  { from: 'WH003', to: 'WH001', volume: 2200, frequency: 'Bi-weekly', avgTransitTime: '4 days', efficiency: 88 },
  { from: 'WH004', to: 'WH002', volume: 1200, frequency: 'Monthly', avgTransitTime: '3 days', efficiency: 95 }
];

const distributionData = mockWarehouses.map(wh => ({
  name: wh.name.split(' ')[0],
  inbound: wh.inboundTransfers,
  outbound: wh.outboundTransfers,
  pending: wh.pendingShipments
}));

const efficiencyData = mockWarehouses.map(wh => ({
  name: wh.name.split(' ')[0],
  efficiency: wh.utilizationRate,
  target: 85
}));

const COLORS = ['#00F5C4', '#f59e0b', '#ef4444', '#3b82f6'];

export default function WarehouseDistribution() {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'overview' | 'movements' | 'routes'>('overview');
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedWarehouseDetails, setSelectedWarehouseDetails] = useState<any>(null);
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [warehouseToDelete, setWarehouseToDelete] = useState<Warehouse | null>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferForm, setTransferForm] = useState({
    productId: '',
    productName: '',
    sku: '',
    fromWarehouse: '',
    toWarehouse: '',
    quantity: '',
    priority: 'medium',
    transportMethod: 'truck',
    estimatedArrival: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'in-transit': return 'text-blue-400 bg-blue-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'delayed': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const handleWarehouseClick = (warehouse: any) => {
    setSelectedWarehouseDetails(warehouse);
    setShowWarehouseModal(true);
  };

  const handleSendMail = (warehouse: Warehouse, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    const subject = encodeURIComponent(`Inquiry about ${warehouse.name}`);
    const body = encodeURIComponent(`Dear Warehouse Manager,\n\nI would like to inquire about the status and operations at ${warehouse.name} located in ${warehouse.location}.\n\nPlease provide current information regarding:\n- Available capacity\n- Pending shipments\n- Transfer schedules\n- Any urgent matters\n\nThank you,\nSupply Chain Team`);
    window.open(`mailto:manager@warehouse.com?subject=${subject}&body=${body}`);
  };

  const handleDeleteWarehouse = (warehouse: Warehouse, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    setWarehouseToDelete(warehouse);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (warehouseToDelete) {
      // In a real app, this would make an API call to delete the warehouse
      console.log(`Deleting warehouse: ${warehouseToDelete.name} (${warehouseToDelete.id})`);
      // For now, we'll just show an alert
      alert(`Warehouse ${warehouseToDelete.name} has been deleted.`);
      setShowDeleteModal(false);
      setWarehouseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setWarehouseToDelete(null);
  };

  const handleTransferFormChange = (field: string, value: string) => {
    setTransferForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTransferSubmit = () => {
    // Validate required fields
    if (!transferForm.productName || !transferForm.sku || !transferForm.fromWarehouse || 
        !transferForm.toWarehouse || !transferForm.quantity || !transferForm.estimatedArrival) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate warehouses are different
    if (transferForm.fromWarehouse === transferForm.toWarehouse) {
      alert('Source and destination warehouses must be different');
      return;
    }

    // Validate quantity
    const quantity = parseInt(transferForm.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    // Create new transfer object
    const newTransfer: StockMovement = {
      id: `MV${Date.now()}`,
      productId: transferForm.productId || `PRD${Date.now()}`,
      productName: transferForm.productName,
      sku: transferForm.sku,
      fromWarehouse: transferForm.fromWarehouse,
      toWarehouse: transferForm.toWarehouse,
      quantity: quantity,
      status: 'pending',
      estimatedArrival: transferForm.estimatedArrival,
      priority: transferForm.priority as 'high' | 'medium' | 'low',
      transportMethod: transferForm.transportMethod as 'truck' | 'rail' | 'air' | 'sea',
      cost: calculateTransferCost(quantity, transferForm.transportMethod, transferForm.fromWarehouse, transferForm.toWarehouse)
    };

    // In a real application, this would make an API call
    console.log('New transfer created:', newTransfer);
    mockStockMovements.push(newTransfer);

    // Reset form and close modal
    setTransferForm({
      productId: '',
      productName: '',
      sku: '',
      fromWarehouse: '',
      toWarehouse: '',
      quantity: '',
      priority: 'medium',
      transportMethod: 'truck',
      estimatedArrival: ''
    });
    setShowTransferModal(false);

    alert(`Transfer created successfully! ${quantity} units of ${transferForm.productName} will be transferred from ${mockWarehouses.find(w => w.id === transferForm.fromWarehouse)?.name} to ${mockWarehouses.find(w => w.id === transferForm.toWarehouse)?.name}`);
  };

  const calculateTransferCost = (quantity: number, transportMethod: string, fromWarehouse: string, toWarehouse: string): number => {
    // Base cost per unit by transport method
    const baseCostPerUnit = {
      truck: 2.5,
      rail: 1.8,
      air: 8.5,
      sea: 1.2
    };

    // Distance multiplier (simplified - in real app would calculate actual distance)
    const distanceMultiplier = fromWarehouse !== toWarehouse ? 1.5 : 1.0;

    return Math.round(quantity * baseCostPerUnit[transportMethod as keyof typeof baseCostPerUnit] * distanceMultiplier);
  };

  const getTransportIcon = (method: string) => {
    switch (method) {
      case 'truck': return <Truck className="w-4 h-4" />;
      case 'rail': return <Route className="w-4 h-4" />;
      case 'air': return <Activity className="w-4 h-4" />;
      case 'sea': return <Package className="w-4 h-4" />;
      default: return <Truck className="w-4 h-4" />;
    }
  };

  const filteredMovements = mockStockMovements.filter(movement => {
    const matchesWarehouse = selectedWarehouse === 'all' || 
                           movement.fromWarehouse === selectedWarehouse || 
                           movement.toWarehouse === selectedWarehouse;
    const matchesStatus = selectedStatus === 'all' || movement.status === selectedStatus;
    return matchesWarehouse && matchesStatus;
  });

  const filteredWarehouses = mockWarehouses.filter(warehouse => {
    const matchesSearch = searchQuery === '' || 
                         warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         warehouse.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         warehouse.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00F5C4]/20 rounded-lg">
            <Warehouse className="w-6 h-6 text-[#00F5C4]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Warehouse Distribution</h2>
            <p className="text-slate-400">Monitor stock movement and distribution across locations</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowMapModal(true)}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center gap-2"
          >
            <Map className="w-4 h-4" />
            View Map
          </button>
          <button 
            onClick={() => setShowTransferModal(true)}
            className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors"
          >
            New Transfer
          </button>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex gap-2">
          {(['overview', 'movements', 'routes'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === mode
                  ? 'bg-[#00F5C4] text-slate-900'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Search and Filters */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search warehouses by name, location, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#00F5C4] focus:ring-1 focus:ring-[#00F5C4]"
                />
              </div>
            </div>
          </div>

          
          {/* Distribution Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Transfer Volume by Warehouse</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Bar dataKey="inbound" fill="#00F5C4" />
                  <Bar dataKey="outbound" fill="#f59e0b" />
                  <Bar dataKey="pending" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Warehouse Efficiency</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Line type="monotone" dataKey="efficiency" stroke="#00F5C4" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Warehouse Table */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">SR No</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Warehouse</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Utilization</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Inbound</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Outbound</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Pending</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredWarehouses.map((warehouse, index) => (
                    <tr 
                      key={warehouse.id} 
                      className="hover:bg-slate-700/50 transition-colors cursor-pointer"
                      onClick={() => handleWarehouseClick(warehouse)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Warehouse className="w-5 h-5 text-[#00F5C4] mr-3" />
                          <div>
                            <div className="text-sm font-medium text-white">{warehouse.name}</div>
                            <div className="text-sm text-slate-400">{warehouse.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{warehouse.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1 mr-3">
                            <div className="w-full bg-slate-600 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  warehouse.utilizationRate >= 80 ? 'bg-red-500' :
                                  warehouse.utilizationRate >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${warehouse.utilizationRate}%` }}
                              />
                            </div>
                          </div>
                          <span className={`text-sm font-medium ${
                            warehouse.utilizationRate >= 80 ? 'text-red-400' :
                            warehouse.utilizationRate >= 60 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {warehouse.utilizationRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-green-400">{warehouse.inboundTransfers}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-blue-400">{warehouse.outboundTransfers}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-yellow-400">{warehouse.pendingShipments}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => handleSendMail(warehouse, e)}
                            className="p-2 rounded-lg bg-slate-700 hover:bg-[#00F5C4]/20 text-slate-400 hover:text-[#00F5C4] transition-all"
                            title="Send mail to warehouse"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteWarehouse(warehouse, e)}
                            className="p-2 rounded-lg bg-slate-700 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                            title="Delete warehouse"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {viewMode === 'movements' && (
        <>
          {/* Filters */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                aria-label="Filter by warehouse"
              >
                <option value="all">All Warehouses</option>
                {mockWarehouses.map(wh => (
                  <option key={wh.id} value={wh.id}>{wh.name}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                aria-label="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-transit">In Transit</option>
                <option value="completed">Completed</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
          </div>

          {/* Stock Movements Table */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-4 text-slate-400 font-medium">Product</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Route</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Quantity</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Status</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Priority</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Transport</th>
                    <th className="text-left p-4 text-slate-400 font-medium">ETA</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Cost</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovements.map((movement) => (
                    <tr key={movement.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="text-white font-medium">{movement.productName}</div>
                          <div className="text-slate-400 text-sm">{movement.sku}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">
                            {mockWarehouses.find(w => w.id === movement.fromWarehouse)?.name.split(' ')[0]}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-[#00F5C4]" />
                          <span className="text-slate-400">
                            {mockWarehouses.find(w => w.id === movement.toWarehouse)?.name.split(' ')[0]}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">{movement.quantity.toLocaleString()}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(movement.status)}`}>
                          {movement.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`font-medium ${getPriorityColor(movement.priority)}`}>
                          {movement.priority}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-slate-400">
                          {getTransportIcon(movement.transportMethod)}
                          <span className="capitalize">{movement.transportMethod}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-white">{movement.estimatedArrival}</div>
                        {movement.actualArrival && (
                          <div className="text-slate-400 text-sm">Actual: {movement.actualArrival}</div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">${movement.cost.toLocaleString()}</div>
                      </td>
                      <td className="p-4">
                        <button className="p-1 hover:bg-slate-600 rounded transition-colors" aria-label="View details">
                          <Eye className="w-4 h-4 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {viewMode === 'routes' && (
        <>
          {/* Transfer Routes */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">Optimized Transfer Routes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-4 text-slate-400 font-medium">Route</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Monthly Volume</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Frequency</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Avg Transit Time</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Efficiency</th>
                    <th className="text-left p-4 text-slate-400 font-medium">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransferRoutes.map((route, index) => (
                    <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">
                            {mockWarehouses.find(w => w.id === route.from)?.name.split(' ')[0]}
                          </span>
                          <ArrowDownRight className="w-4 h-4 text-[#00F5C4]" />
                          <span className="text-slate-400">
                            {mockWarehouses.find(w => w.id === route.to)?.name.split(' ')[0]}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">{route.volume.toLocaleString()} units</div>
                      </td>
                      <td className="p-4">
                        <div className="text-white">{route.frequency}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-white">{route.avgTransitTime}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-2 rounded-full"
                              style={{ width: `${route.efficiency}%` }}
                            />
                          </div>
                          <span className="text-white font-medium">{route.efficiency}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {route.efficiency >= 90 ? (
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-400" />
                          )}
                          <span className={`font-medium ${route.efficiency >= 90 ? 'text-green-400' : 'text-red-400'}`}>
                            {route.efficiency >= 90 ? 'Optimal' : 'Needs Improvement'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-7xl h-[95vh] max-h-[1000px] border border-slate-700 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#00F5C4]/20 rounded-lg">
                  <Map className="w-6 h-6 text-[#00F5C4]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Your Supply Chain Map</h3>
                  <p className="text-slate-400">View your warehouses and active shipments in real-time</p>
                </div>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close map modal"
                title="Close map modal"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            {/* Map Content */}
            <div className="h-[calc(95vh-120px)]">
              <SupplierMap />
            </div>
          </div>
        </div>
      )}

      {/* Warehouse Details Modal */}
      {showWarehouseModal && selectedWarehouseDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] border border-slate-700 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#00F5C4]/20 rounded-lg">
                  <Warehouse className="w-6 h-6 text-[#00F5C4]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedWarehouseDetails.name}</h3>
                  <p className="text-slate-400">{selectedWarehouseDetails.location}</p>
                </div>
              </div>
              <button
                onClick={() => setShowWarehouseModal(false)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close warehouse details modal"
                title="Close warehouse details modal"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Warehouse Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Warehouse Information</h4>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Warehouse ID:</span>
                        <span className="text-white font-medium">{selectedWarehouseDetails.id}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Location:</span>
                        <span className="text-white">{selectedWarehouseDetails.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Coordinates:</span>
                        <span className="text-white text-sm">
                          {selectedWarehouseDetails.coordinates.lat.toFixed(4)}, {selectedWarehouseDetails.coordinates.lng.toFixed(4)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total Stock:</span>
                        <span className="text-blue-400 font-medium">{selectedWarehouseDetails.totalStock.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Capacity:</span>
                        <span className="text-purple-400 font-medium">{selectedWarehouseDetails.capacity.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Available Space:</span>
                        <span className="text-green-400 font-medium">
                          {(selectedWarehouseDetails.capacity - selectedWarehouseDetails.totalStock).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Utilization Rate:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                selectedWarehouseDetails.utilizationRate >= 80 ? 'bg-red-500' :
                                selectedWarehouseDetails.utilizationRate >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${selectedWarehouseDetails.utilizationRate}%` }}
                            />
                          </div>
                          <span className={`font-medium ${
                            selectedWarehouseDetails.utilizationRate >= 80 ? 'text-red-400' :
                            selectedWarehouseDetails.utilizationRate >= 60 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {selectedWarehouseDetails.utilizationRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <h5 className="text-white font-medium mb-3">Contact Information</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Manager:</span>
                        <span className="text-white text-sm">John Smith</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Phone:</span>
                        <span className="text-white text-sm">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Email:</span>
                        <span className="text-white text-sm">manager@warehouse.com</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Address:</span>
                        <span className="text-white text-sm">123 Storage Lane, Industrial Park</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Operating Hours:</span>
                        <span className="text-white text-sm">24/7</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transfer Statistics */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Transfer Statistics</h4>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div>
                        <div className="text-2xl font-bold text-green-400">{selectedWarehouseDetails.inboundTransfers}</div>
                        <div className="text-sm text-slate-400">Inbound</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">{selectedWarehouseDetails.outboundTransfers}</div>
                        <div className="text-sm text-slate-400">Outbound</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">{selectedWarehouseDetails.pendingShipments}</div>
                        <div className="text-sm text-slate-400">Pending</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Total Transfers:</span>
                        <span className="text-white font-medium">
                          {selectedWarehouseDetails.inboundTransfers + selectedWarehouseDetails.outboundTransfers}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Efficiency Rate:</span>
                        <span className="text-green-400 font-medium">
                          {Math.floor((selectedWarehouseDetails.outboundTransfers / (selectedWarehouseDetails.inboundTransfers + selectedWarehouseDetails.outboundTransfers)) * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Average Processing Time:</span>
                        <span className="text-white font-medium">~{Math.floor(Math.random() * 24 + 12)} hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="space-y-3">
                    {mockStockMovements.slice(0, 3).filter(m => m.fromWarehouse === selectedWarehouseDetails.id || m.toWarehouse === selectedWarehouseDetails.id).length > 0 ? 
                      mockStockMovements.slice(0, 3).filter(m => m.fromWarehouse === selectedWarehouseDetails.id || m.toWarehouse === selectedWarehouseDetails.id).map((movement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            movement.status === 'completed' ? 'bg-green-400' :
                            movement.status === 'in-transit' ? 'bg-blue-400' :
                            movement.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'
                          }`} />
                          <div>
                            <div className="text-white text-sm font-medium">{movement.productName}</div>
                            <div className="text-slate-400 text-xs">
                              {movement.fromWarehouse === selectedWarehouseDetails.id ? 'Outbound' : 'Inbound'} • {movement.quantity.toLocaleString()} units
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs font-medium ${getStatusColor(movement.status)}`}>
                            {movement.status.charAt(0).toUpperCase() + movement.status.slice(1)}
                          </div>
                          <div className="text-slate-400 text-xs">
                            {movement.estimatedArrival}
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8">
                        <div className="text-slate-400 text-sm">No recent activity found for this warehouse</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && warehouseToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Delete Warehouse</h3>
            </div>
            
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete <span className="text-white font-medium">{warehouseToDelete.name}</span>? 
              This action cannot be undone.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Create New Transfer</h2>
                  <p className="text-slate-400 mt-1">Schedule a stock transfer between warehouses</p>
                </div>
                <button 
                  onClick={() => setShowTransferModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close transfer modal"
                  title="Close transfer modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Product Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Product Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="product-name" className="block text-sm font-medium text-slate-300 mb-2">Product Name *</label>
                      <input
                        id="product-name"
                        type="text"
                        value={transferForm.productName}
                        onChange={(e) => handleTransferFormChange('productName', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="sku" className="block text-sm font-medium text-slate-300 mb-2">SKU *</label>
                      <input
                        id="sku"
                        type="text"
                        value={transferForm.sku}
                        onChange={(e) => handleTransferFormChange('sku', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                        placeholder="Enter SKU"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-slate-300 mb-2">Quantity *</label>
                      <input
                        id="quantity"
                        type="number"
                        value={transferForm.quantity}
                        onChange={(e) => handleTransferFormChange('quantity', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                        placeholder="Enter quantity"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Transfer Route */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Transfer Route</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="from-warehouse" className="block text-sm font-medium text-slate-300 mb-2">From Warehouse *</label>
                      <select
                        id="from-warehouse"
                        value={transferForm.fromWarehouse}
                        onChange={(e) => handleTransferFormChange('fromWarehouse', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                        required
                      >
                        <option value="">Select source warehouse</option>
                        {mockWarehouses.map(warehouse => (
                          <option key={warehouse.id} value={warehouse.id}>
                            {warehouse.name} ({warehouse.location})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="to-warehouse" className="block text-sm font-medium text-slate-300 mb-2">To Warehouse *</label>
                      <select
                        id="to-warehouse"
                        value={transferForm.toWarehouse}
                        onChange={(e) => handleTransferFormChange('toWarehouse', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                        required
                      >
                        <option value="">Select destination warehouse</option>
                        {mockWarehouses.map(warehouse => (
                          <option key={warehouse.id} value={warehouse.id}>
                            {warehouse.name} ({warehouse.location})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Transfer Details */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Transfer Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                      <select
                        id="priority"
                        value={transferForm.priority}
                        onChange={(e) => handleTransferFormChange('priority', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="transport" className="block text-sm font-medium text-slate-300 mb-2">Transport Method</label>
                      <select
                        id="transport"
                        value={transferForm.transportMethod}
                        onChange={(e) => handleTransferFormChange('transportMethod', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      >
                        <option value="truck">Truck</option>
                        <option value="rail">Rail</option>
                        <option value="air">Air</option>
                        <option value="sea">Sea</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="arrival-date" className="block text-sm font-medium text-slate-300 mb-2">Estimated Arrival *</label>
                      <input
                        id="arrival-date"
                        type="date"
                        value={transferForm.estimatedArrival}
                        onChange={(e) => handleTransferFormChange('estimatedArrival', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Cost Estimate */}
                {transferForm.quantity && transferForm.fromWarehouse && transferForm.toWarehouse && transferForm.transportMethod && (
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-lg font-semibold text-white mb-2">Cost Estimate</h4>
                    <div className="text-2xl font-bold text-[#00F5C4]">
                      ₹{calculateTransferCost(
                        parseInt(transferForm.quantity) || 0,
                        transferForm.transportMethod,
                        transferForm.fromWarehouse,
                        transferForm.toWarehouse
                      ).toLocaleString()}
                    </div>
                    <div className="text-slate-400 text-sm mt-1">
                      Based on {transferForm.quantity} units via {transferForm.transportMethod}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-slate-700/50">
              <div className="flex justify-between items-center">
                <div className="text-slate-400 text-sm">
                  * Required fields
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowTransferModal(false)}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTransferSubmit}
                    className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors"
                  >
                    Create Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
