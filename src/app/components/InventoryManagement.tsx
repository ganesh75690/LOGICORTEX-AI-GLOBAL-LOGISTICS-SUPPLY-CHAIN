import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  RefreshCw, 
  Settings, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Warehouse,
  Truck,
  Clock,
  BarChart3,
  Eye,
  Edit3,
  Search,
  Download,
  Filter,
  Plus,
  X
} from 'lucide-react';

interface InventoryItem {
  id: string;
  product: string;
  warehouse: string;
  currentStock: number;
  minThreshold: number;
  recommendedRestock: number;
  urgency: 'low' | 'medium' | 'high';
  lastUpdated: string;
  dateAdded: string;
  category: string;
  supplier: string;
  unitPrice: number;
  totalValue: number;
  turnoverRate: number;
  forecastDemand: number;
}

interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  utilization: number;
  totalItems: number;
  lowStockItems: number;
  manager: string;
  status: 'active' | 'maintenance';
}

interface StockMovement {
  id: string;
  product: string;
  type: 'in' | 'out' | 'transfer';
  quantity: number;
  from: string;
  to: string;
  timestamp: string;
  reason: string;
  approvedBy: string;
}

export function InventoryManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'warehouses' | 'movements'>('overview');
  
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: '1',
      product: 'SKU-1234 - Electronics',
      warehouse: 'Warehouse A',
      currentStock: 45,
      minThreshold: 100,
      recommendedRestock: 150,
      urgency: 'high',
      lastUpdated: '1 hour ago',
      dateAdded: '2024-01-15',
      category: 'Electronics',
      supplier: 'TechCorp Inc.',
      unitPrice: 125.50,
      totalValue: 5647.50,
      turnoverRate: 8.5,
      forecastDemand: 180
    },
    {
      id: '2',
      product: 'SKU-5678 - Clothing',
      warehouse: 'Warehouse B',
      currentStock: 230,
      minThreshold: 150,
      recommendedRestock: 200,
      urgency: 'medium',
      lastUpdated: '3 hours ago',
      dateAdded: '2024-02-20',
      category: 'Clothing',
      supplier: 'Fashion Ltd.',
      unitPrice: 45.75,
      totalValue: 10522.50,
      turnoverRate: 6.8,
      forecastDemand: 150
    },
    {
      id: '3',
      product: 'SKU-9012 - Furniture',
      warehouse: 'Warehouse C',
      currentStock: 12,
      minThreshold: 25,
      recommendedRestock: 50,
      urgency: 'high',
      lastUpdated: '30 minutes ago',
      dateAdded: '2024-03-10',
      category: 'Furniture',
      supplier: 'HomeComfort Co.',
      unitPrice: 289.99,
      totalValue: 3479.88,
      turnoverRate: 2.1,
      forecastDemand: 30
    },
    {
      id: '4',
      product: 'SKU-3456 - Food Items',
      warehouse: 'Warehouse A',
      currentStock: 450,
      minThreshold: 200,
      recommendedRestock: 300,
      urgency: 'low',
      lastUpdated: '2 hours ago',
      dateAdded: '2024-01-05',
      category: 'Food',
      supplier: 'FreshFoods Inc.',
      unitPrice: 12.50,
      totalValue: 5625.00,
      turnoverRate: 12.4,
      forecastDemand: 500
    }
  ]);

  const [warehouses] = useState<Warehouse[]>([
    {
      id: '1',
      name: 'Warehouse A',
      location: 'New York, NY',
      capacity: 10000,
      utilization: 78,
      totalItems: 7800,
      lowStockItems: 12,
      manager: 'John Smith',
      status: 'active'
    },
    {
      id: '2',
      name: 'Warehouse B',
      location: 'Los Angeles, CA',
      capacity: 8500,
      utilization: 65,
      totalItems: 5525,
      lowStockItems: 8,
      manager: 'Sarah Johnson',
      status: 'active'
    },
    {
      id: '3',
      name: 'Warehouse C',
      location: 'Chicago, IL',
      capacity: 12000,
      utilization: 82,
      totalItems: 9840,
      lowStockItems: 15,
      manager: 'Mike Davis',
      status: 'active'
    }
  ]);

  const [stockMovements] = useState<StockMovement[]>([
    {
      id: '1',
      product: 'SKU-1234 - Electronics',
      type: 'in',
      quantity: 150,
      from: 'Supplier',
      to: 'Warehouse A',
      timestamp: '2 hours ago',
      reason: 'Scheduled restock',
      approvedBy: 'Admin'
    },
    {
      id: '2',
      product: 'SKU-5678 - Clothing',
      type: 'out',
      quantity: 45,
      from: 'Warehouse B',
      to: 'Store #123',
      timestamp: '3 hours ago',
      reason: 'Customer order fulfillment',
      approvedBy: 'System'
    },
    {
      id: '3',
      product: 'SKU-9012 - Furniture',
      type: 'transfer',
      quantity: 25,
      from: 'Warehouse C',
      to: 'Warehouse A',
      timestamp: '5 hours ago',
      reason: 'Demand redistribution',
      approvedBy: 'Manager'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(inventoryItems);
  const [warehouseSearchTerm, setWarehouseSearchTerm] = useState('');
  const [filteredWarehouses, setFilteredWarehouses] = useState(warehouses);
  const [movementSearchTerm, setMovementSearchTerm] = useState('');
  const [filteredMovements, setFilteredMovements] = useState(stockMovements);
  const [showFilters, setShowFilters] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadOptions, setDownloadOptions] = useState({
    format: 'csv',
    dateFrom: '',
    dateTo: '',
    includeHeaders: true
  });
  const [filters, setFilters] = useState({
    category: 'all',
    warehouse: 'all',
    urgency: 'all',
    stockLevel: 'all'
  });

  // Add Product Form State
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [productForm, setProductForm] = useState({
    product: '',
    warehouse: 'Warehouse A',
    currentStock: 0,
    minThreshold: 100,
    recommendedRestock: 200,
    urgency: 'medium' as 'low' | 'medium' | 'high',
    category: 'Electronics',
    supplier: '',
    unitPrice: 0
  });

  const handleRestock = (itemId: string, quantity: number) => {
    setInventoryItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, currentStock: item.currentStock + quantity, lastUpdated: 'Just now' }
        : item
    ));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFiltersAndSearch(term, filters);
  };

  const applyFiltersAndSearch = (searchTerm: string, currentFilters: typeof filters) => {
    let filtered = inventoryItems.filter(item => {
      // Search filter
      const matchesSearch = !searchTerm || 
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.warehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.urgency.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = currentFilters.category === 'all' || item.category === currentFilters.category;

      // Warehouse filter
      const matchesWarehouse = currentFilters.warehouse === 'all' || item.warehouse === currentFilters.warehouse;

      // Urgency filter
      const matchesUrgency = currentFilters.urgency === 'all' || item.urgency === currentFilters.urgency;

      // Stock status filter
      let matchesStockStatus = currentFilters.stockLevel === 'all';
      if (currentFilters.stockLevel === 'low') {
        matchesStockStatus = item.currentStock < item.minThreshold;
      } else if (currentFilters.stockLevel === 'normal') {
        matchesStockStatus = item.currentStock >= item.minThreshold;
      }

      return matchesSearch && matchesCategory && matchesWarehouse && matchesUrgency && matchesStockStatus;
    });

    setFilteredItems(filtered);
  };

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFiltersAndSearch(searchTerm, newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: 'all',
      warehouse: 'all',
      urgency: 'all',
      stockLevel: 'all'
    };
    setFilters(defaultFilters);
    applyFiltersAndSearch(searchTerm, defaultFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all').length;
  };

  const handleWarehouseSearch = (term: string) => {
    setWarehouseSearchTerm(term);
    const filtered = warehouses.filter(warehouse =>
      warehouse.name.toLowerCase().includes(term.toLowerCase()) ||
      warehouse.location.toLowerCase().includes(term.toLowerCase()) ||
      warehouse.manager.toLowerCase().includes(term.toLowerCase()) ||
      warehouse.status.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredWarehouses(filtered);
  };

  const handleMovementSearch = (term: string) => {
    setMovementSearchTerm(term);
    const filtered = stockMovements.filter(movement =>
      movement.product.toLowerCase().includes(term.toLowerCase()) ||
      movement.type.toLowerCase().includes(term.toLowerCase()) ||
      movement.quantity.toString().includes(term) ||
      movement.from.toLowerCase().includes(term.toLowerCase()) ||
      movement.to.toLowerCase().includes(term.toLowerCase()) ||
      movement.timestamp.toLowerCase().includes(term.toLowerCase()) ||
      movement.reason.toLowerCase().includes(term.toLowerCase()) ||
      movement.approvedBy.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMovements(filtered);
  };

  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const executeDownload = () => {
    const { format, dateFrom, dateTo, includeHeaders } = downloadOptions;
    
    // Filter items by date range if specified
    let itemsToExport = filteredItems;
    if (dateFrom || dateTo) {
      itemsToExport = filteredItems.filter(item => {
        // For demo purposes, we'll use a simple date comparison
        // In real app, you'd parse actual dates from item.lastUpdated
        const itemDate = new Date(); // Placeholder - would use actual item date
        const fromDate = dateFrom ? new Date(dateFrom) : new Date('1970-01-01');
        const toDate = dateTo ? new Date(dateTo) : new Date('2100-12-31');
        return itemDate >= fromDate && itemDate <= toDate;
      });
    }

    if (format === 'csv') {
      const headers = includeHeaders ? 
        ['Sr. No.', 'Product', 'Category', 'Warehouse', 'Date Added', 'Current Stock', 'Min Threshold', 'Unit Price', 'Total Value', 'Turnover Rate', 'Forecast Demand', 'Urgency', 'Supplier'] : [];
      
      const csvContent = [
        ...(headers.length > 0 ? [headers.join(',')] : []),
        ...itemsToExport.map((item, index) => [
          index + 1,
          item.product,
          item.category,
          item.warehouse,
          item.dateAdded,
          item.currentStock.toString(),
          item.minThreshold.toString(),
          item.unitPrice.toString(),
          item.totalValue.toString(),
          item.turnoverRate.toString(),
          item.forecastDemand.toString(),
          item.urgency,
          item.supplier
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inventory-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const jsonData = itemsToExport.map((item, index) => ({
        srNo: index + 1,
        product: item.product,
        category: item.category,
        warehouse: item.warehouse,
        dateAdded: item.dateAdded,
        currentStock: item.currentStock,
        minThreshold: item.minThreshold,
        unitPrice: item.unitPrice,
        totalValue: item.totalValue,
        turnoverRate: item.turnoverRate,
        forecastDemand: item.forecastDemand,
        urgency: item.urgency,
        supplier: item.supplier,
        lastUpdated: item.lastUpdated
      }));

      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inventory-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else if (format === 'excel') {
      // For Excel, we'll create a CSV that can be opened in Excel
      // In real app, you'd use a library like xlsx or exceljs
      const headers = includeHeaders ? 
        ['Sr. No.', 'Product', 'Category', 'Warehouse', 'Date Added', 'Current Stock', 'Min Threshold', 'Unit Price', 'Total Value', 'Turnover Rate', 'Forecast Demand', 'Urgency', 'Supplier'] : [];
      
      const csvContent = [
        ...(headers.length > 0 ? [headers.join('\t')] : []),
        ...itemsToExport.map((item, index) => [
          index + 1,
          item.product,
          item.category,
          item.warehouse,
          item.dateAdded,
          item.currentStock.toString(),
          item.minThreshold.toString(),
          item.unitPrice.toString(),
          item.totalValue.toString(),
          item.turnoverRate.toString(),
          item.forecastDemand.toString(),
          item.urgency,
          item.supplier
        ].join('\t'))
      ].join('\n'); // Use tab for Excel

      const blob = new Blob([csvContent], { type: 'text/tab-separated-values' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inventory-report-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }

    setShowDownloadModal(false);
  };

  // Update filtered items when inventory items change
  useEffect(() => {
    applyFiltersAndSearch(searchTerm, filters);
  }, [inventoryItems]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showFilters && event.target instanceof Element) {
        const filterContainer = event.target.closest('.filter-container');
        if (!filterContainer) {
          setShowFilters(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilters]);

  const tabs = [
    { id: 'overview' as const, name: 'Overview', icon: BarChart3, count: 0 },
    { id: 'items' as const, name: 'Inventory Items', icon: Package, count: inventoryItems.filter(i => i.urgency === 'high').length },
    { id: 'warehouses' as const, name: 'Warehouses', icon: Warehouse, count: warehouses.filter(w => w.lowStockItems > 10).length },
    { id: 'movements' as const, name: 'Stock Movements', icon: Truck, count: stockMovements.length }
  ];

  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventoryItems.filter(item => item.currentStock < item.minThreshold).length;
  const totalWarehouses = warehouses.length;
  const avgUtilization = warehouses.reduce((sum, wh) => sum + wh.utilization, 0) / warehouses.length;

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-green-400" />
          Inventory Management System
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Real-time tracking</span>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-700/50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? 'text-green-400 border-b-2 border-green-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
              {tab.count > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Total Value</span>
                  <Package className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-white">₹{totalInventoryValue.toLocaleString()}</p>
                <p className="text-xs text-green-400 mt-1">+12.5% from last month</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Low Stock Items</span>
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-white">{lowStockItems}</p>
                <p className="text-xs text-yellow-400 mt-1">Requires attention</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Warehouses</span>
                  <Warehouse className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">{totalWarehouses}</p>
                <p className="text-xs text-blue-400 mt-1">{avgUtilization.toFixed(1)}% utilization</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Total Items</span>
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white">{inventoryItems.length}</p>
                <p className="text-xs text-purple-400 mt-1">Across all warehouses</p>
              </div>
            </div>

            {/* Recent Movements */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">Recent Stock Movements</h3>
              <div className="space-y-3">
                {stockMovements.slice(0, 3).map(movement => (
                  <div key={movement.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        movement.type === 'in' ? 'bg-green-500/20' :
                        movement.type === 'out' ? 'bg-red-500/20' :
                        'bg-blue-500/20'
                      }`}>
                        {movement.type === 'in' ? <TrendingUp className="w-4 h-4 text-green-400" /> :
                         movement.type === 'out' ? <TrendingDown className="w-4 h-4 text-red-400" /> :
                         <Truck className="w-4 h-4 text-blue-400" />}
                      </div>
                      <div>
                        <p className="text-white text-sm">{movement.product}</p>
                        <p className="text-slate-400 text-xs">{movement.quantity} units • {movement.timestamp}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      movement.type === 'in' ? 'bg-green-500/20 text-green-400' :
                      movement.type === 'out' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {movement.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'items' && (
          <motion.div
            key="items"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Search and Actions Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search inventory items..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative filter-container">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 border rounded-lg transition-all flex items-center gap-2 relative ${
                      getActiveFiltersCount() > 0 
                        ? 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30' 
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {getActiveFiltersCount() > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center text-xs text-white font-bold">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </button>
                  
                  {/* Filter Dropdown */}
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 left-0 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 p-4"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">Filter Options</h4>
                          <button
                            onClick={clearFilters}
                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            Clear All
                          </button>
                        </div>

                        {/* Category Filter */}
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Category</label>
                          <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                            aria-label="Filter by category"
                            title="Filter by category"
                          >
                            <option value="all">All Categories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Food">Food</option>
                            <option value="Machinery">Machinery</option>
                          </select>
                        </div>

                        {/* Warehouse Filter */}
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Warehouse</label>
                          <select
                            value={filters.warehouse}
                            onChange={(e) => handleFilterChange('warehouse', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                            aria-label="Filter by warehouse"
                            title="Filter by warehouse"
                          >
                            <option value="all">All Warehouses</option>
                            <option value="Warehouse A">Warehouse A</option>
                            <option value="Warehouse B">Warehouse B</option>
                            <option value="Warehouse C">Warehouse C</option>
                          </select>
                        </div>

                        {/* Urgency Filter */}
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Urgency</label>
                          <select
                            value={filters.urgency}
                            onChange={(e) => handleFilterChange('urgency', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                            aria-label="Filter by urgency"
                            title="Filter by urgency"
                          >
                            <option value="all">All Urgencies</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>

                        {/* Stock Status Filter */}
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Stock Status</label>
                          <select
                            value={filters.stockLevel}
                            onChange={(e) => handleFilterChange('stockLevel', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                            aria-label="Filter by stock status"
                            title="Filter by stock status"
                          >
                            <option value="all">All Stock Levels</option>
                            <option value="low">Low Stock</option>
                            <option value="normal">Normal Stock</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setProductForm({
                      product: '',
                      warehouse: 'Warehouse A',
                      currentStock: 0,
                      minThreshold: 100,
                      recommendedRestock: 200,
                      urgency: 'medium',
                      category: 'Electronics',
                      supplier: '',
                      unitPrice: 0
                    });
                    setShowAddProductForm(true);
                  }}
                  className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download CSV
                </button>
              </div>
            </div>

            {/* Table Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-xs text-slate-500 mb-1">Total Items</p>
                <p className="text-xl font-bold text-white">{filteredItems.length}</p>
                {searchTerm && (
                  <p className="text-xs text-slate-500 mt-1">of {inventoryItems.length} total</p>
                )}
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-xs text-slate-500 mb-1">Low Stock Items</p>
                <p className="text-xl font-bold text-red-400">
                  {filteredItems.filter(item => item.currentStock < item.minThreshold).length}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-xs text-slate-500 mb-1">Total Value</p>
                <p className="text-xl font-bold text-purple-400">
                  ₹{filteredItems.reduce((sum, item) => sum + item.totalValue, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <p className="text-xs text-slate-500 mb-1">High Urgency</p>
                <p className="text-xl font-bold text-red-400">
                  {filteredItems.filter(item => item.urgency === 'high').length}
                </p>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
              {filteredItems.length === 0 ? (
                <div className="p-12 text-center">
                  <Package className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg font-medium mb-2">No items found</p>
                  <p className="text-slate-500 text-sm">
                    {searchTerm ? `No results for "${searchTerm}"` : 'No inventory items available'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => handleSearch('')}
                      className="mt-4 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-center p-4 text-sm font-medium text-slate-400">Sr. No.</th>
                        <th className="text-left p-4 text-sm font-medium text-slate-400">Product</th>
                        <th className="text-left p-4 text-sm font-medium text-slate-400">Category</th>
                        <th className="text-left p-4 text-sm font-medium text-slate-400">Warehouse</th>
                        <th className="text-center p-4 text-sm font-medium text-slate-400">Date Added</th>
                        <th className="text-center p-4 text-sm font-medium text-slate-400">Current Stock</th>
                        <th className="text-center p-4 text-sm font-medium text-slate-400">Min Threshold</th>
                        <th className="text-center p-4 text-sm font-medium text-slate-400">Unit Price</th>
                        <th className="text-center p-4 text-sm font-medium text-slate-400">Total Value</th>
                        <th className="text-center p-4 text-sm font-medium text-slate-400">Turnover</th>
                        <th className="text-center p-4 text-sm font-medium text-slate-400">Forecast</th>
                        <th className="text-center p-4 text-sm font-medium text-slate-400">Urgency</th>
                        <th className="text-center p-4 text-sm font-medium text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="p-4 text-center text-slate-400 font-medium text-sm">
                          {index + 1}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                              <Package className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{item.product}</p>
                              <p className="text-slate-400 text-xs">{item.supplier}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-4 text-slate-300 text-sm">{item.warehouse}</td>
                        <td className="p-4 text-center text-blue-400 text-sm">{item.dateAdded}</td>
                        <td className="p-4 text-center">
                          <span className={`font-medium ${
                            item.currentStock < item.minThreshold ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {item.currentStock}
                          </span>
                        </td>
                        <td className="p-4 text-center text-yellow-400 font-medium">{item.minThreshold}</td>
                        <td className="p-4 text-center text-blue-400 font-medium">₹{item.unitPrice}</td>
                        <td className="p-4 text-center text-purple-400 font-medium">
                          ₹{item.totalValue.toLocaleString()}
                        </td>
                        <td className="p-4 text-center">
                          <span className="text-green-400 text-sm font-medium">{item.turnoverRate}/mo</span>
                        </td>
                        <td className="p-4 text-center text-blue-400 text-sm font-medium">{item.forecastDemand}</td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.urgency === 'high' ? 'bg-red-500/20 text-red-400' :
                            item.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {item.urgency}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            {item.currentStock < item.minThreshold && (
                              <button
                                onClick={() => handleRestock(item.id, item.recommendedRestock)}
                                className="px-2 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors flex items-center gap-1 text-xs"
                                title={`Restock ${item.recommendedRestock} units`}
                              >
                                <RefreshCw className="w-3 h-3" />
                                Restock
                              </button>
                            )}
                            <button 
                              className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                            <button 
                              className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors"
                              title="Edit Item"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'warehouses' && (
          <motion.div
            key="warehouses"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Warehouse Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search warehouses..."
                value={warehouseSearchTerm}
                onChange={(e) => handleWarehouseSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all"
              />
              {warehouseSearchTerm && (
                <button
                  onClick={() => handleWarehouseSearch('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              )}
            </div>

            {/* Search Results Summary */}
            {warehouseSearchTerm && (
              <div className="text-sm text-slate-400">
                Found {filteredWarehouses.length} warehouse{filteredWarehouses.length !== 1 ? 's' : ''} matching "{warehouseSearchTerm}"
              </div>
            )}

            {/* Warehouse Table */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Sr. No.</th>
                      <th className="text-left p-4 text-sm font-medium text-slate-400">Warehouse</th>
                      <th className="text-left p-4 text-sm font-medium text-slate-400">Location</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Manager</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Status</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Capacity</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Utilization</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Total Items</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Low Stock</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(warehouseSearchTerm ? filteredWarehouses : warehouses).map((warehouse, index) => (
                      <motion.tr
                        key={warehouse.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="p-4 text-center text-slate-400 font-medium text-sm">
                          {index + 1}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                              <Warehouse className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{warehouse.name}</p>
                              <p className="text-slate-400 text-xs">{warehouse.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300 text-sm">{warehouse.location}</td>
                        <td className="p-4 text-slate-300 text-sm">{warehouse.manager}</td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            warehouse.status === 'active' ? 'bg-green-500/20 text-green-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {warehouse.status}
                          </span>
                        </td>
                        <td className="p-4 text-center text-blue-400 font-medium">{warehouse.capacity.toLocaleString()}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center gap-2">
                            <span className="text-orange-400 font-medium">{warehouse.utilization}%</span>
                            <div className="w-full bg-slate-700/50 rounded-full h-2">
                              <div 
                                className="h-2 bg-orange-400 rounded-full transition-all"
                              style={{ width: `${warehouse.utilization}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center text-purple-400 font-medium">{warehouse.totalItems.toLocaleString()}</td>
                        <td className="p-4 text-center text-red-400 font-medium">{warehouse.lowStockItems}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                              title="View Details"
                              aria-label="View warehouse details"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                            <button 
                              className="p-2 bg-slate-700/50 text-slate-400 rounded-lg hover:text-white hover:bg-slate-700/50 transition-colors"
                              title="Manage Warehouse"
                              aria-label="Manage warehouse"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          
          {/* No Results for Warehouses */}
          {warehouseSearchTerm && (warehouseSearchTerm ? filteredWarehouses : warehouses).length === 0 && (
            <div className="p-12 text-center">
              <Warehouse className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-lg font-medium mb-2">No warehouses found</p>
              <p className="text-slate-500 text-sm">
                No warehouses match "{warehouseSearchTerm}"
              </p>
              <button
                onClick={() => handleWarehouseSearch('')}
                className="mt-4 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
          </motion.div>
        )}

        {activeTab === 'movements' && (
          <motion.div
            key="movements"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Stock Movements Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search stock movements..."
                value={movementSearchTerm}
                onChange={(e) => handleMovementSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all"
              />
              {movementSearchTerm && (
                <button
                  onClick={() => handleMovementSearch('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              )}
            </div>

            {/* Search Results Summary */}
            {movementSearchTerm && (
              <div className="text-sm text-slate-400">
                Found {filteredMovements.length} movement{filteredMovements.length !== 1 ? 's' : ''} matching "{movementSearchTerm}"
              </div>
            )}

            {/* Stock Movements Table */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Sr. No.</th>
                      <th className="text-left p-4 text-sm font-medium text-slate-400">Product</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Type</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Quantity</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">From/To</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Timestamp</th>
                      <th className="text-left p-4 text-sm font-medium text-slate-400">Reason</th>
                      <th className="text-center p-4 text-sm font-medium text-slate-400">Approved By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(movementSearchTerm ? filteredMovements : stockMovements).map((movement, index) => (
                      <motion.tr
                        key={movement.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="p-4 text-center text-slate-400 font-medium text-sm">
                          {index + 1}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              movement.type === 'in' ? 'bg-green-500/20' :
                              movement.type === 'out' ? 'bg-red-500/20' :
                              'bg-blue-500/20'
                            }`}>
                              {movement.type === 'in' ? <TrendingUp className="w-4 h-4 text-green-400" /> :
                               movement.type === 'out' ? <TrendingDown className="w-4 h-4 text-red-400" /> :
                               <Truck className="w-4 h-4 text-blue-400" />}
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{movement.product}</p>
                              <p className="text-slate-400 text-xs">{movement.quantity} units</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            movement.type === 'in' ? 'bg-green-500/20 text-green-400' :
                            movement.type === 'out' ? 'bg-red-500/20 text-red-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {movement.type}
                          </span>
                        </td>
                        <td className="p-4 text-center text-slate-300 font-medium">{movement.quantity}</td>
                        <td className="p-4 text-center text-slate-300 text-sm">
                          {movement.type === 'transfer' ? (
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-blue-400" />
                              <span>{movement.from} → {movement.to}</span>
                            </div>
                          ) : (
                            movement.type === 'in' ? movement.from : movement.to
                          )}
                        </td>
                        <td className="p-4 text-center text-slate-300 text-sm">{movement.timestamp}</td>
                        <td className="p-4 text-slate-300 text-sm">{movement.reason}</td>
                        <td className="p-4 text-center text-blue-400 font-medium text-sm">{movement.approvedBy}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          
            {/* No Results for Stock Movements */}
            {movementSearchTerm && (movementSearchTerm ? filteredMovements : stockMovements).length === 0 && (
              <div className="p-12 text-center">
                <Truck className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 text-lg font-medium mb-2">No movements found</p>
                <p className="text-slate-500 text-sm">
                  No movements match "{movementSearchTerm}"
                </p>
                <button
                  onClick={() => handleMovementSearch('')}
                  className="mt-4 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all"
                >
                  Clear Search
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDownloadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 max-w-md w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Export Inventory Data</h3>
                    <p className="text-slate-400 text-sm">Choose export options and download format</p>
                  </div>
                  <button
                    onClick={() => setShowDownloadModal(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Format Selection */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Export Format</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'csv', label: 'CSV', desc: 'Excel compatible' },
                      { value: 'json', label: 'JSON', desc: 'Data format' },
                      { value: 'excel', label: 'Excel', desc: 'Tab separated' }
                    ].map(format => (
                      <button
                        key={format.value}
                        onClick={() => setDownloadOptions(prev => ({ ...prev, format: format.value as any }))}
                        className={`p-3 rounded-lg border transition-all text-center ${
                          downloadOptions.format === format.value
                            ? 'bg-green-500/20 border-green-500/30 text-green-400'
                            : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                        }`}
                      >
                        <div className="font-medium text-sm">{format.label}</div>
                        <div className="text-xs opacity-70">{format.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Date Range (Optional)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">From</label>
                      <input
                        type="date"
                        value={downloadOptions.dateFrom}
                        onChange={(e) => setDownloadOptions(prev => ({ ...prev, dateFrom: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400/50"
                        aria-label="From date"
                        title="From date"
                        placeholder="Select start date"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">To</label>
                      <input
                        type="date"
                        value={downloadOptions.dateTo}
                        onChange={(e) => setDownloadOptions(prev => ({ ...prev, dateTo: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400/50"
                        aria-label="To date"
                        title="To date"
                        placeholder="Select end date"
                      />
                    </div>
                  </div>
                </div>

                {/* Include Headers */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Include Headers</label>
                  <button
                    onClick={() => setDownloadOptions(prev => ({ ...prev, includeHeaders: !prev.includeHeaders }))}
                    className={`w-12 h-6 rounded-full transition-all ${
                      downloadOptions.includeHeaders ? 'bg-green-500' : 'bg-slate-600'
                    }`}
                    aria-label="Toggle include headers"
                    title={downloadOptions.includeHeaders ? 'Headers included' : 'Headers excluded'}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-all transform ${
                      downloadOptions.includeHeaders ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                {/* Export Summary */}
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                  <div className="text-sm text-slate-300">
                    <p>• {filteredItems.length} items will be exported</p>
                    {searchTerm && <p>• Filtered by: "{searchTerm}"</p>}
                    {getActiveFiltersCount() > 0 && <p>• {getActiveFiltersCount()} filter(s) applied</p>}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowDownloadModal(false)}
                    className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/70 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeDownload}
                    className="flex-1 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Product Form Modal */}
      <AnimatePresence>
        {showAddProductForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddProductForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Add New Product</h2>
                    <p className="text-sm text-slate-400 mt-1">Enter product details to add to inventory</p>
                  </div>
                  <button 
                    onClick={() => setShowAddProductForm(false)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Close Add Product Form"
                    aria-label="Close Add Product Form"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={productForm.product}
                      onChange={(e) => setProductForm({...productForm, product: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="e.g., SKU-1234 - Electronics"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="warehouse-select" className="block text-sm font-medium text-slate-300 mb-2">Warehouse *</label>
                    <select
                      id="warehouse-select"
                      value={productForm.warehouse}
                      onChange={(e) => setProductForm({...productForm, warehouse: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      required
                    >
                      <option value="Warehouse A">Warehouse A</option>
                      <option value="Warehouse B">Warehouse B</option>
                      <option value="Warehouse C">Warehouse C</option>
                      <option value="Warehouse D">Warehouse D</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Current Stock *</label>
                    <input
                      type="number"
                      value={productForm.currentStock}
                      onChange={(e) => setProductForm({...productForm, currentStock: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Min Threshold *</label>
                    <input
                      type="number"
                      value={productForm.minThreshold}
                      onChange={(e) => setProductForm({...productForm, minThreshold: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="100"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Recommended Restock *</label>
                    <input
                      type="number"
                      value={productForm.recommendedRestock}
                      onChange={(e) => setProductForm({...productForm, recommendedRestock: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="200"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="urgency-level" className="block text-sm font-medium text-slate-300 mb-2">Urgency Level *</label>
                    <select
                      id="urgency-level"
                      value={productForm.urgency}
                      onChange={(e) => setProductForm({...productForm, urgency: e.target.value as 'low' | 'medium' | 'high'})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="category-select" className="block text-sm font-medium text-slate-300 mb-2">Category *</label>
                    <select
                      id="category-select"
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      required
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Raw Materials">Raw Materials</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Food">Food</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Supplier</label>
                    <input
                      type="text"
                      value={productForm.supplier}
                      onChange={(e) => setProductForm({...productForm, supplier: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="Supplier name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Unit Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.unitPrice}
                      onChange={(e) => setProductForm({...productForm, unitPrice: parseFloat(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="0.00"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-700/50">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowAddProductForm(false)}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const newItem: InventoryItem = {
                        id: Date.now().toString(),
                        product: productForm.product,
                        warehouse: productForm.warehouse,
                        currentStock: productForm.currentStock,
                        minThreshold: productForm.minThreshold,
                        recommendedRestock: productForm.recommendedRestock,
                        urgency: productForm.urgency,
                        lastUpdated: 'Just now',
                        dateAdded: new Date().toISOString().split('T')[0],
                        category: productForm.category,
                        supplier: productForm.supplier || 'Unknown',
                        unitPrice: productForm.unitPrice,
                        totalValue: productForm.currentStock * productForm.unitPrice,
                        turnoverRate: 0,
                        forecastDemand: productForm.recommendedRestock
                      };
                      setInventoryItems(prev => [...prev, newItem]);
                      setShowAddProductForm(false);
                    }}
                    className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
