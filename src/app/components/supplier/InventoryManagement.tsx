import { Package, TrendingUp, TrendingDown, Search, MoreVertical, Target, X, CheckCircle, TrendingDown as TrendDown, ArrowUp, ArrowDown, Loader2, Download, Plus, Calculator, GitBranch, Trash2, Eye, Settings } from 'lucide-react';
import { useState } from 'react';

interface Warehouse {
  id: string;
  name: string;
  location: string;
  totalCapacity: number;
  currentStock: number;
  utilizationRate: number;
  contactInfo: {
    manager: string;
    email: string;
    phone: string;
  };
}

interface ProductStock {
  sku: string;
  name: string;
  category: string;
  warehouses: {
    warehouseId: string;
    warehouseName: string;
    currentStock: number;
    minStock: number;
    maxStock: number;
    reorderPoint: number;
    status: 'optimal' | 'low' | 'critical' | 'overstock';
  }[];
  totalStock: number;
  totalDemand: number;
  trend: 'up' | 'down' | 'stable';
}

interface ProductForm {
  sku: string;
  name: string;
  category: string;
  description: string;
  price: number;
  supplier: string;
  leadTime: number;
  unit: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  warehouses: {
    warehouseId: string;
    currentStock: number;
    minStock: number;
    maxStock: number;
    reorderPoint: number;
  }[];
}

const mockWarehouses: Warehouse[] = [
  { 
    id: 'WH001', 
    name: 'North Warehouse', 
    location: 'Chicago, IL', 
    totalCapacity: 10000, 
    currentStock: 7500, 
    utilizationRate: 75,
    contactInfo: {
      manager: 'Sarah Johnson',
      email: 'sarah.johnson@warehouse.com',
      phone: '(312) 555-0101'
    }
  },
  { 
    id: 'WH002', 
    name: 'South Warehouse', 
    location: 'Austin, TX', 
    totalCapacity: 8000, 
    currentStock: 6200, 
    utilizationRate: 77.5,
    contactInfo: {
      manager: 'Michael Chen',
      email: 'michael.chen@warehouse.com',
      phone: '(512) 555-0202'
    }
  },
  { 
    id: 'WH003', 
    name: 'West Warehouse', 
    location: 'Los Angeles, CA', 
    totalCapacity: 12000, 
    currentStock: 9800, 
    utilizationRate: 81.7,
    contactInfo: {
      manager: 'Emily Rodriguez',
      email: 'emily.rodriguez@warehouse.com',
      phone: '(213) 555-0303'
    }
  },
  { 
    id: 'WH004', 
    name: 'East Warehouse', 
    location: 'New York, NY', 
    totalCapacity: 9000, 
    currentStock: 5400, 
    utilizationRate: 60,
    contactInfo: {
      manager: 'David Kim',
      email: 'david.kim@warehouse.com',
      phone: '(212) 555-0404'
    }
  }
];

const mockProductStocks: ProductStock[] = [
  {
    sku: 'SKU-7845',
    name: 'Circuit Board A',
    category: 'Electronics',
    warehouses: [
      { warehouseId: 'WH001', warehouseName: 'North Warehouse', currentStock: 450, minStock: 200, maxStock: 800, reorderPoint: 250, status: 'optimal' },
      { warehouseId: 'WH002', warehouseName: 'South Warehouse', currentStock: 180, minStock: 150, maxStock: 600, reorderPoint: 200, status: 'low' },
      { warehouseId: 'WH003', warehouseName: 'West Warehouse', currentStock: 620, minStock: 300, maxStock: 900, reorderPoint: 350, status: 'optimal' },
    ],
    totalStock: 1250,
    totalDemand: 340,
    trend: 'up'
  },
  {
    sku: 'SKU-2341',
    name: 'Brake Pads',
    category: 'Automotive',
    warehouses: [
      { warehouseId: 'WH001', warehouseName: 'North Warehouse', currentStock: 280, minStock: 250, maxStock: 600, reorderPoint: 300, status: 'low' },
      { warehouseId: 'WH004', warehouseName: 'East Warehouse', currentStock: 450, minStock: 200, maxStock: 500, reorderPoint: 250, status: 'optimal' },
    ],
    totalStock: 730,
    totalDemand: 480,
    trend: 'up'
  },
  {
    sku: 'SKU-9012',
    name: 'Steel Rods',
    category: 'Raw Materials',
    warehouses: [
      { warehouseId: 'WH002', warehouseName: 'South Warehouse', currentStock: 2800, minStock: 1000, maxStock: 3000, reorderPoint: 1200, status: 'optimal' },
      { warehouseId: 'WH003', warehouseName: 'West Warehouse', currentStock: 1700, minStock: 1500, maxStock: 2500, reorderPoint: 1600, status: 'low' },
    ],
    totalStock: 4500,
    totalDemand: 1900,
    trend: 'down'
  }
];

export default function InventoryManagement() {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCardMenu, setActiveCardMenu] = useState<string | null>(null);
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
  const [showOptimizationModal, setShowOptimizationModal] = useState(false);
  const [showCostOptimizationModal, setShowCostOptimizationModal] = useState(false);
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [isApplyingOptimization, setIsApplyingOptimization] = useState(false);
  const [optimizationApplied, setOptimizationApplied] = useState(false);
  const [showImplementationDetails, setShowImplementationDetails] = useState(false);
  const [implementationData, setImplementationData] = useState<any>(null);
  const [showWarehouseDetails, setShowWarehouseDetails] = useState(false);
  const [selectedWarehouseDetails, setSelectedWarehouseDetails] = useState<Warehouse | null>(null);

  const handleApplyOptimization = async () => {
    setIsApplyingOptimization(true);
    
    // Simulate optimization application process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsApplyingOptimization(false);
    setOptimizationApplied(true);
    
    // Close the optimization modal after a short delay
    setTimeout(() => {
      setShowOptimizationModal(false);
      setOptimizationApplied(false);
    }, 2000);
  };

  const handleExportAnalysis = async (format: 'pdf' | 'excel') => {
    // Simulate export process
    console.log(`Exporting analysis as ${format.toUpperCase()}`);
    
    // Create sample data for export
    const analysisData = {
      title: 'Smart Distribution Optimization Analysis',
      date: new Date().toLocaleDateString(),
      metrics: {
        efficiency: '+15%',
        costReduction: '-23%',
        deliveryTime: '-2.3d',
        monthlySavings: '₹45.2K'
      },
      warehouses: [
        { name: 'Mumbai Central', efficiency: 92, utilization: 78 },
        { name: 'Pune West', efficiency: 88, utilization: 85 },
        { name: 'Nashik Industrial', efficiency: 95, utilization: 72 },
        { name: 'Thane Logistics', efficiency: 90, utilization: 80 }
      ],
      categories: [
        { name: 'Electronics', savings: '₹12,500' },
        { name: 'Clothing', savings: '₹8,200' },
        { name: 'Food & Beverages', savings: '₹15,300' },
        { name: 'Furniture', savings: '₹6,800' }
      ],
      costBreakdown: {
        storage: { current: '₹18,500', optimized: '₹14,200', savings: '₹4,300' },
        labor: { current: '₹22,000', optimized: '₹18,500', savings: '₹3,500' },
        transportation: { current: '₹15,800', optimized: '₹12,100', savings: '₹3,700' }
      }
    };

    // Simulate file download
    const dataStr = JSON.stringify(analysisData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `optimization-analysis-${format}-${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : 'pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show success message
    alert(`Analysis exported successfully as ${format.toUpperCase()}!`);
  };

  const handleImplementAllOptimizations = async () => {
    // Simulate implementation process with progress
    const steps = [
      'Updating warehouse configurations...',
      'Reallocating inventory stocks...',
      'Optimizing transportation routes...',
      'Implementing cost-saving measures...',
      'Finalizing system integration...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Step ${i + 1}: ${steps[i]}`);
    }
    
    // Prepare implementation data for modal
    const successData = {
      title: '✅ ALL OPTIMIZATIONS IMPLEMENTED SUCCESSFULLY!',
      implementedChanges: [
        'Warehouse distribution optimized across all 4 locations',
        'Inventory reallocation completed for Electronics, Clothing, Food & Beverages, Furniture',
        'Transportation routes optimized for 23% cost reduction',
        'Labor processes streamlined for 15% efficiency gain',
        'Storage configurations updated for maximum utilization'
      ],
      monthlySavings: [
        { item: 'Storage costs', amount: '₹4,300' },
        { item: 'Labor costs', amount: '₹3,500' },
        { item: 'Transportation', amount: '₹3,700' }
      ],
      totalSavings: '₹11,500',
      performanceImprovements: [
        'Delivery time reduced by 2.3 days',
        'Overall efficiency increased by 15%',
        'Warehouse utilization optimized',
        'System integration completed'
      ],
      nextSteps: [
        'Monitor performance over next 30 days',
        'Review savings in monthly reports',
        'Adjust parameters as needed',
        'Schedule follow-up analysis'
      ],
      completionTime: new Date().toLocaleString()
    };
    
    setImplementationData(successData);
    setShowImplementationDetails(true);
    setShowCostOptimizationModal(false);
  };

  const handleWarehouseClick = (warehouse: Warehouse) => {
    setSelectedWarehouseDetails(warehouse);
    setShowWarehouseDetails(true);
  };
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductStock | null>(null);
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);
  const [productForm, setProductForm] = useState<ProductForm>({
    sku: '',
    name: '',
    category: 'Electronics',
    description: '',
    price: 0,
    supplier: '',
    leadTime: 7,
    unit: 'pieces',
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    warehouses: mockWarehouses.map(wh => ({
      warehouseId: wh.id,
      currentStock: 0,
      minStock: 100,
      maxStock: 1000,
      reorderPoint: 200
    }))
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400 bg-green-400/20';
      case 'low': return 'text-yellow-400 bg-yellow-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      case 'overstock': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-400" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const filteredProducts = mockProductStocks.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    if (selectedWarehouse === 'all') return matchesSearch && matchesCategory;
    
    return matchesSearch && matchesCategory && 
           product.warehouses.some(w => w.warehouseId === selectedWarehouse);
  });

  const handleExportReport = () => {
    // Create CSV content for inventory report
    const csvHeaders = [
      'SKU',
      'Product Name',
      'Category',
      'Total Stock',
      'Total Demand',
      'Trend',
      'Warehouse',
      'Current Stock',
      'Min Stock',
      'Max Stock',
      'Reorder Point',
      'Status'
    ];

    const csvRows = filteredProducts.flatMap(product => 
      product.warehouses.map(warehouse => [
        product.sku,
        product.name,
        product.category,
        product.totalStock,
        product.totalDemand,
        product.trend,
        warehouse.warehouseName,
        warehouse.currentStock,
        warehouse.minStock,
        warehouse.maxStock,
        warehouse.reorderPoint,
        warehouse.status
      ])
    );

    // Convert to CSV string
    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `inventory_report_${timestamp}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success feedback
    console.log('Inventory report exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Inventory Management</h2>
          <p className="text-slate-400">Monitor stock levels across all warehouses</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportReport}
            className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors"
          >
            Export Report
          </button>
          <button 
            onClick={() => setShowBulkUpdateModal(true)}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
          >
            Bulk Update
          </button>
        </div>
      </div>

      {/* AI Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Auto Restocking Suggestions */}
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 rounded-xl p-6 border border-blue-500/30 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">Auto Restocking</h3>
              <p className="text-xs text-blue-400">AI Recommendations</p>
            </div>
            <button 
              onClick={() => setActiveCardMenu(activeCardMenu === 'restocking' ? null : 'restocking')}
              className="p-1 hover:bg-blue-500/20 rounded transition-colors"
              aria-label="Toggle auto restocking menu"
            >
              <MoreVertical className="w-4 h-4 text-blue-400" />
            </button>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            AI-powered recommendations for when and where to restock based on live demand patterns
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">LED Bulbs</span>
              <span className="text-blue-400 font-medium">Order 500 units</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Circuit Boards</span>
              <span className="text-green-400 font-medium">Optimal stock</span>
            </div>
          </div>
          <button 
            onClick={() => setShowSuggestionsModal(true)}
            className="w-full px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-bold hover:bg-blue-500/30 transition-colors"
          >
            View All Suggestions
          </button>
          
          {/* Dropdown Menu */}
          {activeCardMenu === 'restocking' && (
            <div className="absolute top-2 right-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-xl z-10">
              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors rounded-t-lg">
                View Detailed Analytics
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors">
                Configure Settings
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors">
                Export Recommendations
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors rounded-b-lg">
                Schedule Reports
              </button>
            </div>
          )}
        </div>

        {/* Smart Warehouse Distribution */}
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 rounded-xl p-6 border border-green-500/30 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">Smart Distribution</h3>
              <p className="text-xs text-green-400">Auto-Balance</p>
            </div>
            <button 
              onClick={() => setActiveCardMenu(activeCardMenu === 'distribution' ? null : 'distribution')}
              className="p-1 hover:bg-green-500/20 rounded transition-colors"
              aria-label="Distribution menu options"
            >
              <MoreVertical className="w-4 h-4 text-green-400" />
            </button>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            Automatically balances inventory across all locations to minimize costs and maximize availability
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Cost Savings</span>
              <span className="text-green-400 font-medium">23% reduction</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Efficiency</span>
              <span className="text-green-400 font-medium">+15% improved</span>
            </div>
          </div>
          <button 
            onClick={() => {
              setShowOptimizationModal(true);
              setIsOptimizing(true);
              setOptimizationProgress(0);
              // Simulate optimization progress
              const interval = setInterval(() => {
                setOptimizationProgress(prev => {
                  if (prev >= 100) {
                    clearInterval(interval);
                    setIsOptimizing(false);
                    return 100;
                  }
                  return prev + 10;
                });
              }, 300);
            }}
            className="w-full px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-bold hover:bg-green-500/30 transition-colors"
          >
            Optimize Now
          </button>
          
          {/* Dropdown Menu */}
          {activeCardMenu === 'distribution' && (
            <div className="absolute top-2 right-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-xl z-10">
              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors rounded-t-lg">
                Run Optimization
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors">
                View Distribution Map
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors">
                Configure Rules
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors rounded-b-lg">
                Performance Metrics
              </button>
            </div>
          )}
        </div>

        {/* Cost Optimization Engine */}
        <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/20 rounded-xl p-6 border border-yellow-500/30 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">Cost Optimization</h3>
              <p className="text-xs text-yellow-400">Smart Savings</p>
            </div>
            <button 
              onClick={() => setActiveCardMenu(activeCardMenu === 'optimization' ? null : 'optimization')}
              className="p-1 hover:bg-yellow-500/20 rounded transition-colors"
              aria-label="Cost optimization menu options"
            >
              <MoreVertical className="w-4 h-4 text-yellow-400" />
            </button>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            AI finds the cheapest supply and distribution plans with up to 23% cost savings
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Monthly Savings</span>
              <span className="text-yellow-400 font-medium">₹12,450</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">ROI</span>
              <span className="text-yellow-400 font-medium">342%</span>
            </div>
          </div>
          <button 
            onClick={() => setShowCostOptimizationModal(true)}
            className="w-full px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-bold hover:bg-yellow-500/30 transition-colors"
          >
            Optimize Costs
          </button>
          
          {/* Dropdown Menu */}
          {activeCardMenu === 'optimization' && (
            <div className="absolute top-2 right-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-xl z-10">
              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors rounded-t-lg">
                Run Cost Analysis
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors">
                View Savings Report
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors">
                Configure Parameters
              </button>
              <button 
                onClick={() => handleExportAnalysis('pdf')}
                className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors rounded-b-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Analysis
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Warehouse Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockWarehouses.map((warehouse) => (
          <div 
            key={warehouse.id} 
            className="bg-slate-800 rounded-xl p-4 border border-slate-700 cursor-pointer hover:border-[#00F5C4] hover:bg-slate-800/80 transition-all"
            onClick={() => handleWarehouseClick(warehouse)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-white font-semibold">{warehouse.name}</h3>
                <p className="text-slate-400 text-sm">{warehouse.location}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-slate-500">
                    <span className="font-medium">Manager:</span> {warehouse.contactInfo.manager}
                  </p>
                  <p className="text-xs text-slate-500">
                    <span className="font-medium">Email:</span> {warehouse.contactInfo.email}
                  </p>
                  <p className="text-xs text-slate-500">
                    <span className="font-medium">Phone:</span> {warehouse.contactInfo.phone}
                  </p>
                </div>
              </div>
              <Package className="w-5 h-5 text-[#00F5C4]" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Utilization</span>
                <span className="text-white font-medium">{warehouse.utilizationRate}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-2 rounded-full"
                  style={{ width: `${warehouse.utilizationRate}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>{warehouse.currentStock.toLocaleString()} / {warehouse.totalCapacity.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Actions */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 flex-1">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#00F5C4]"
              />
            </div>
          </div>
          <label htmlFor="warehouse-select" className="sr-only">Select Warehouse</label>
          <select
            id="warehouse-select"
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
          >
            <option value="all">All Warehouses</option>
            {mockWarehouses.map(wh => (
              <option key={wh.id} value={wh.id}>{wh.name}</option>
            ))}
          </select>
          <label htmlFor="category-select" className="sr-only">Select Category</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Automotive">Automotive</option>
            <option value="Raw Materials">Raw Materials</option>
          </select>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setProductForm({
                sku: '',
                name: '',
                category: 'Electronics',
                description: '',
                price: 0,
                supplier: '',
                leadTime: 7,
                unit: 'pieces',
                weight: 0,
                dimensions: {
                  length: 0,
                  width: 0,
                  height: 0
                },
                warehouses: mockWarehouses.map(wh => ({
                  warehouseId: wh.id,
                  currentStock: 0,
                  minStock: 100,
                  maxStock: 1000,
                  reorderPoint: 200
                }))
              });
              setShowProductForm(true);
            }}
            className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Product Stock Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-4 text-slate-400 font-medium w-12">Sr No</th>
                <th className="text-left p-4 text-slate-400 font-medium">Product</th>
                <th className="text-left p-4 text-slate-400 font-medium">Total Stock</th>
                <th className="text-left p-4 text-slate-400 font-medium">Demand</th>
                <th className="text-left p-4 text-slate-400 font-medium">Trend</th>
                <th className="text-left p-4 text-slate-400 font-medium">Warehouse Status</th>
                <th className="text-left p-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.sku} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 text-white font-medium">
                    {index + 1}
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-white font-medium">{product.name}</div>
                      <div className="text-slate-400 text-sm">{product.sku}</div>
                      <div className="text-slate-500 text-xs">{product.category}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">{product.totalStock.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">{product.totalDemand.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(product.trend)}
                      <span className="text-white capitalize">{product.trend}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {product.warehouses.map((warehouse) => (
                        <div key={warehouse.warehouseId} className="flex items-center gap-2">
                          <span className="text-slate-400 text-sm">{warehouse.warehouseName.split(' ')[0]}:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(warehouse.status)}`}>
                            {warehouse.currentStock} ({warehouse.status})
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="relative">
                      <button 
                        onClick={() => setActiveActionMenu(activeActionMenu === product.sku ? null : product.sku)}
                        className="p-1 hover:bg-slate-600 rounded transition-colors"
                        aria-label="More options"
                        title="More options"
                      >
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>
                      
                      {/* Action Dropdown Menu */}
                      {activeActionMenu === product.sku && (
                        <div className="absolute top-8 right-0 w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-lg shadow-xl z-10">
                          <button 
                            onClick={() => {
                              console.log(`View details for ${product.name}`);
                              setActiveActionMenu(null);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors rounded-t-lg flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          <button 
                            onClick={() => {
                              setEditingProduct(product);
                              setProductForm({
                                sku: product.sku,
                                name: product.name,
                                category: product.category,
                                description: '',
                                price: 0,
                                supplier: '',
                                leadTime: 7,
                                unit: 'pieces',
                                weight: 0,
                                dimensions: {
                                  length: 0,
                                  width: 0,
                                  height: 0
                                },
                                warehouses: product.warehouses.map(wh => ({
                                  warehouseId: wh.warehouseId,
                                  currentStock: wh.currentStock,
                                  minStock: wh.minStock,
                                  maxStock: wh.maxStock,
                                  reorderPoint: wh.reorderPoint
                                }))
                              });
                              setActiveActionMenu(null);
                              setShowProductForm(true);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors flex items-center gap-2"
                          >
                            <Settings className="w-4 h-4" />
                            Edit Product
                          </button>
                          <button 
                            onClick={() => {
                              console.log(`Reorder ${product.name}`);
                              setActiveActionMenu(null);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Reorder Stock
                          </button>
                          <button 
                            onClick={() => {
                              console.log(`Generate report for ${product.name}`);
                              setActiveActionMenu(null);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-white hover:bg-slate-700/50 transition-colors flex items-center gap-2"
                          >
                            <Calculator className="w-4 h-4" />
                            Generate Report
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete ${product.name}? This action cannot be undone.`)) {
                                console.log(`Deleted ${product.name}`);
                                setActiveActionMenu(null);
                              }
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-400/20 transition-colors rounded-b-lg flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Product
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View All Suggestions Modal */}
      {showSuggestionsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-0">
          <div className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full h-full max-h-[100vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Restocking Recommendations</h2>
                  <p className="text-slate-400 mt-1">Smart suggestions based on demand patterns and inventory levels</p>
                </div>
                <button 
                  onClick={() => setShowSuggestionsModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close suggestions modal"
                  title="Close suggestions modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {[
                  { sku: 'LED-001', name: 'LED Bulbs', priority: 'high', action: 'Order 500 units', reason: 'Low stock detected', savings: '₹2,340' },
                  { sku: 'CB-7845', name: 'Circuit Board A', priority: 'medium', action: 'Order 200 units', reason: 'Seasonal demand increase', savings: '₹1,890' },
                  { sku: 'BP-2341', name: 'Brake Pads', priority: 'low', action: 'Monitor levels', reason: 'Optimal stock', savings: '₹0' },
                  { sku: 'SR-9012', name: 'Steel Rods', priority: 'high', action: 'Reduce order by 300 units', reason: 'Overstock detected', savings: '₹4,200' },
                  { sku: 'WL-5678', name: 'Wireless Sensors', priority: 'medium', action: 'Order 150 units', reason: 'New project demand', savings: '₹980' },
                ].map((item, index) => (
                  <div key={index} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.priority === 'high' ? 'bg-red-400/20 text-red-400' :
                            item.priority === 'medium' ? 'bg-yellow-400/20 text-yellow-400' :
                            'bg-green-400/20 text-green-400'
                          }`}>
                            {item.priority} priority
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-1">SKU: {item.sku}</p>
                        <p className="text-slate-300 text-sm">{item.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 font-semibold">{item.action}</p>
                        <p className="text-green-400 text-sm mt-1">Save {item.savings}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">
                        Apply Recommendation
                      </button>
                      <button className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-600 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-slate-700/50">
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors">
                  Apply All Recommendations
                </button>
                <button className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors">
                  Export Report
                </button>
                <button 
                  onClick={() => setShowSuggestionsModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Distribution Optimization Modal */}
      {showOptimizationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-0">
          <div className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full h-full max-h-[100vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Smart Distribution Optimization</h2>
                  <p className="text-slate-400 mt-1">AI-powered warehouse distribution balancing</p>
                </div>
                <button 
                  onClick={() => setShowOptimizationModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close optimization modal"
                  title="Close optimization modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              {isOptimizing ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Optimizing Distribution...</h3>
                    <p className="text-slate-400">Analyzing warehouse capacity and demand patterns</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-green-400 font-medium">{optimizationProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-400 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${optimizationProgress}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Analyzing current inventory levels...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {optimizationProgress > 33 && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {optimizationProgress <= 33 && <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />}
                      <span>Calculating optimal distribution...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {optimizationProgress > 66 && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {optimizationProgress <= 66 && <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />}
                      <span>Generating optimization plan...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Optimization Complete!</h3>
                    <p className="text-slate-400">Your warehouse distribution has been optimized</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-400">Efficiency</span>
                      </div>
                      <p className="text-2xl font-bold text-white">+15%</p>
                      <p className="text-xs text-green-400">Improved</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendDown className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-400">Costs</span>
                      </div>
                      <p className="text-2xl font-bold text-white">-23%</p>
                      <p className="text-xs text-green-400">Reduction</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-400">Delivery Time</span>
                      </div>
                      <p className="text-2xl font-bold text-white">-2.3d</p>
                      <p className="text-xs text-green-400">Faster</p>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <h4 className="text-white font-medium mb-3">Recommended Actions</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-slate-300">Move 300 units from North to West Warehouse</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm text-slate-300">Increase South Warehouse capacity by 15%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-sm text-slate-300">Rebalance inventory across all locations</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-700/50">
              <div className="flex gap-3">
                {!isOptimizing && (
                  <>
                    <button 
                      onClick={handleApplyOptimization}
                      disabled={isApplyingOptimization || optimizationApplied}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                        isApplyingOptimization 
                          ? 'bg-yellow-500/20 text-yellow-400 cursor-not-allowed'
                          : optimizationApplied
                          ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                    >
                      {isApplyingOptimization ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Applying...
                        </>
                      ) : optimizationApplied ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Applied Successfully
                        </>
                      ) : (
                        'Apply Optimization'
                      )}
                    </button>
                    <button 
                      onClick={() => setShowDetailedReport(true)}
                      className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
                    >
                      View Detailed Report
                    </button>
                  </>
                )}
                <button 
                  onClick={() => setShowOptimizationModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                  {isOptimizing ? 'Cancel' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cost Optimization Modal */}
      {showCostOptimizationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-0">
          <div className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full h-full max-h-[100vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Cost Optimization Analysis</h2>
                  <p className="text-slate-400 mt-1">AI-powered cost reduction opportunities</p>
                </div>
                <button 
                  onClick={() => setShowCostOptimizationModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close cost optimization modal"
                  title="Close cost optimization modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/20 rounded-xl p-6 border border-yellow-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Potential Savings</h3>
                    <ArrowDown className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-3xl font-bold text-yellow-400">₹12,450</p>
                      <p className="text-sm text-slate-400">Monthly savings potential</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">342%</p>
                      <p className="text-sm text-slate-400">Return on investment</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Cost Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Monthly Cost</span>
                      <span className="text-white font-medium">₹45,230</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Optimized Monthly Cost</span>
                      <span className="text-green-400 font-medium">₹32,780</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-700">
                      <span className="text-slate-400">Total Savings</span>
                      <span className="text-yellow-400 font-bold">₹12,450</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Optimization Opportunities</h3>
                {[
                  { category: 'Supplier Negotiations', savings: '₹5,200', difficulty: 'Medium', impact: 'High', description: 'Renegotiate contracts with top 3 suppliers' },
                  { category: 'Warehouse Consolidation', savings: '₹3,800', difficulty: 'Low', impact: 'Medium', description: 'Consolidate West and North warehouse operations' },
                  { category: 'Shipping Routes', savings: '₹2,150', difficulty: 'Low', impact: 'Medium', description: 'Optimize delivery routes and carriers' },
                  { category: 'Inventory Holding', savings: '₹1,300', difficulty: 'High', impact: 'Low', description: 'Reduce safety stock levels for fast-moving items' },
                ].map((opportunity, index) => (
                  <div key={index} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">{opportunity.category}</h4>
                        <p className="text-slate-400 text-sm">{opportunity.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-400 font-bold">{opportunity.savings}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        opportunity.difficulty === 'Low' ? 'bg-green-400/20 text-green-400' :
                        opportunity.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                        'bg-red-400/20 text-red-400'
                      }`}>
                        {opportunity.difficulty}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        opportunity.impact === 'High' ? 'bg-blue-400/20 text-blue-400' :
                        opportunity.impact === 'Medium' ? 'bg-purple-400/20 text-purple-400' :
                        'bg-gray-400/20 text-gray-400'
                      }`}>
                        {opportunity.impact} Impact
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-slate-700/50">
              <div className="flex gap-3">
                <button 
                  onClick={handleImplementAllOptimizations}
                  className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg font-medium hover:bg-yellow-500/30 transition-colors"
                >
                  Implement All Optimizations
                </button>
                <button 
                  onClick={() => handleExportAnalysis('excel')}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Analysis
                </button>
                <button 
                  onClick={() => setShowCostOptimizationModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <p className="text-slate-400 mt-1">
                    {editingProduct ? 'Update product information and inventory settings' : 'Enter complete product details and warehouse information'}
                  </p>
                </div>
                <button 
                  onClick={() => setShowProductForm(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close product form"
                  title="Close product form"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Product SKU *</label>
                    <input
                      type="text"
                      value={productForm.sku}
                      onChange={(e) => setProductForm({...productForm, sku: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="e.g., SKU-1234"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="e.g., Circuit Board A"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">Category *</label>
                    <select
                      id="category"
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      required
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Raw Materials">Raw Materials</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4] h-20 resize-none"
                      placeholder="Enter product description..."
                    />
                  </div>
                </div>
                
                {/* Supplier & Pricing */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Supplier & Pricing</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Supplier *</label>
                    <input
                      type="text"
                      value={productForm.supplier}
                      onChange={(e) => setProductForm({...productForm, supplier: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="e.g., TechCorp Industries"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Unit Price (₹) *</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: parseFloat(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Lead Time (days) *</label>
                    <input
                      type="number"
                      value={productForm.leadTime}
                      onChange={(e) => setProductForm({...productForm, leadTime: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="7"
                      min="1"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="unit-of-measurement" className="block text-sm font-medium text-slate-300 mb-2">Unit of Measurement *</label>
                    <select
                      id="unit-of-measurement"
                      value={productForm.unit}
                      onChange={(e) => setProductForm({...productForm, unit: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      required
                    >
                      <option value="pieces">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="liters">Liters</option>
                      <option value="meters">Meters</option>
                      <option value="boxes">Boxes</option>
                    </select>
                  </div>
                </div>
                
                {/* Physical Properties */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Physical Properties</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Weight (kg) *</label>
                    <input
                      type="number"
                      value={productForm.weight}
                      onChange={(e) => setProductForm({...productForm, weight: parseFloat(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Length (cm)</label>
                      <input
                        type="number"
                        value={productForm.dimensions.length}
                        onChange={(e) => setProductForm({
                          ...productForm, 
                          dimensions: {...productForm.dimensions, length: parseFloat(e.target.value) || 0}
                        })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                        placeholder="0"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Width (cm)</label>
                      <input
                        type="number"
                        value={productForm.dimensions.width}
                        onChange={(e) => setProductForm({
                          ...productForm, 
                          dimensions: {...productForm.dimensions, width: parseFloat(e.target.value) || 0}
                        })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                        placeholder="0"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Height (cm)</label>
                      <input
                        type="number"
                        value={productForm.dimensions.height}
                        onChange={(e) => setProductForm({
                          ...productForm, 
                          dimensions: {...productForm.dimensions, height: parseFloat(e.target.value) || 0}
                        })}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                        placeholder="0"
                        step="0.1"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Warehouse Settings */}
                <div className="space-y-4 lg:col-span-2">
                  <h3 className="text-lg font-semibold text-white mb-4">Warehouse Inventory Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {productForm.warehouses.map((warehouse, index) => {
                      const warehouseInfo = mockWarehouses.find(wh => wh.id === warehouse.warehouseId);
                      return (
                        <div key={warehouse.warehouseId} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                          <h4 className="font-medium text-white mb-3">{warehouseInfo?.name}</h4>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Current Stock</label>
                                <input
                                  type="number"
                                  value={warehouse.currentStock}
                                  onChange={(e) => {
                                    const newWarehouses = [...productForm.warehouses];
                                    newWarehouses[index].currentStock = parseInt(e.target.value) || 0;
                                    setProductForm({...productForm, warehouses: newWarehouses});
                                  }}
                                  className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-[#00F5C4]"
                                  placeholder="0"
                                  min="0"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Min Stock</label>
                                <input
                                  type="number"
                                  value={warehouse.minStock}
                                  onChange={(e) => {
                                    const newWarehouses = [...productForm.warehouses];
                                    newWarehouses[index].minStock = parseInt(e.target.value) || 0;
                                    setProductForm({...productForm, warehouses: newWarehouses});
                                  }}
                                  className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-[#00F5C4]"
                                  placeholder="100"
                                  min="0"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Max Stock</label>
                                <input
                                  type="number"
                                  value={warehouse.maxStock}
                                  onChange={(e) => {
                                    const newWarehouses = [...productForm.warehouses];
                                    newWarehouses[index].maxStock = parseInt(e.target.value) || 0;
                                    setProductForm({...productForm, warehouses: newWarehouses});
                                  }}
                                  className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-[#00F5C4]"
                                  placeholder="1000"
                                  min="0"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1">Reorder Point</label>
                                <input
                                  type="number"
                                  value={warehouse.reorderPoint}
                                  onChange={(e) => {
                                    const newWarehouses = [...productForm.warehouses];
                                    newWarehouses[index].reorderPoint = parseInt(e.target.value) || 0;
                                    setProductForm({...productForm, warehouses: newWarehouses});
                                  }}
                                  className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-[#00F5C4]"
                                  placeholder="200"
                                  min="0"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-700/50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowProductForm(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Product form submitted:', productForm);
                    // Here you would typically save the product
                    setShowProductForm(false);
                  }}
                  className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Update Modal */}
      {showBulkUpdateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Bulk Inventory Update</h2>
                  <p className="text-slate-400 mt-1">Update multiple products across warehouses simultaneously</p>
                </div>
                <button 
                  onClick={() => setShowBulkUpdateModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close bulk update modal"
                  title="Close bulk update modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Update Type Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Select Update Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button className="p-4 bg-slate-800 border border-slate-600 rounded-lg hover:border-[#00F5C4] transition-colors text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <Package className="w-5 h-5 text-[#00F5C4]" />
                        <span className="font-medium text-white">Stock Levels</span>
                      </div>
                      <p className="text-sm text-slate-400">Update current stock quantities</p>
                    </button>
                    <button className="p-4 bg-slate-800 border border-slate-600 rounded-lg hover:border-[#00F5C4] transition-colors text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <Settings className="w-5 h-5 text-[#00F5C4]" />
                        <span className="font-medium text-white">Reorder Points</span>
                      </div>
                      <p className="text-sm text-slate-400">Adjust minimum stock thresholds</p>
                    </button>
                    <button className="p-4 bg-slate-800 border border-slate-600 rounded-lg hover:border-[#00F5C4] transition-colors text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="w-5 h-5 text-[#00F5C4]" />
                        <span className="font-medium text-white">Pricing</span>
                      </div>
                      <p className="text-sm text-slate-400">Update product prices</p>
                    </button>
                    <button className="p-4 bg-slate-800 border border-slate-600 rounded-lg hover:border-[#00F5C4] transition-colors text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <GitBranch className="w-5 h-5 text-[#00F5C4]" />
                        <span className="font-medium text-white">Warehouse Transfer</span>
                      </div>
                      <p className="text-sm text-slate-400">Move stock between warehouses</p>
                    </button>
                  </div>
                </div>

                {/* Product Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Select Products</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <label key={product.sku} className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#00F5C4] bg-slate-700 border-slate-600 rounded focus:ring-[#00F5C4] focus:ring-2"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-white">{product.name}</div>
                          <div className="text-sm text-slate-400">{product.sku} • {product.category}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">{product.totalStock.toLocaleString()} units</div>
                          <div className="text-xs text-slate-400">Total stock</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Update Values */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Update Values</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="bulk-operation" className="block text-sm font-medium text-slate-300 mb-2">Operation</label>
                      <select 
                        id="bulk-operation"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                      >
                        <option value="add">Add to existing</option>
                        <option value="subtract">Subtract from existing</option>
                        <option value="multiply">Multiply by factor</option>
                        <option value="set">Set to specific value</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Value</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
                        placeholder="Enter value"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-700/50">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-slate-400">
                  <span className="font-medium">{filteredProducts.length}</span> products available for update
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBulkUpdateModal(false)}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      console.log('Bulk update initiated');
                      setShowBulkUpdateModal(false);
                    }}
                    className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors"
                  >
                    Apply Updates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Report Modal */}
      {showDetailedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Smart Distribution Optimization Report</h2>
                  <p className="text-slate-400 mt-1">Comprehensive analysis and recommendations</p>
                </div>
                <button 
                  onClick={() => setShowDetailedReport(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close detailed report"
                  title="Close detailed report"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {/* Executive Summary */}
              <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Executive Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">+15%</p>
                    <p className="text-sm text-slate-400">Efficiency Gain</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">-23%</p>
                    <p className="text-sm text-slate-400">Cost Reduction</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">-2.3d</p>
                    <p className="text-sm text-slate-400">Delivery Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">₹45.2K</p>
                    <p className="text-sm text-slate-400">Monthly Savings</p>
                  </div>
                </div>
              </div>

              {/* Warehouse Analysis */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Warehouse Distribution Analysis</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Mumbai Central', efficiency: 92, utilization: 78, recommendation: 'Increase electronics stock by 15%' },
                    { name: 'Pune West', efficiency: 88, utilization: 85, recommendation: 'Optimize fast-moving items placement' },
                    { name: 'Nashik Industrial', efficiency: 95, utilization: 72, recommendation: 'Add more storage capacity' },
                    { name: 'Thane Logistics', efficiency: 90, utilization: 80, recommendation: 'Improve picking process flow' }
                  ].map((warehouse, index) => (
                    <div key={index} className="bg-slate-900/50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-white">{warehouse.name}</h4>
                          <p className="text-sm text-slate-400">Current Performance</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-400">{warehouse.efficiency}%</p>
                          <p className="text-xs text-slate-400">Efficiency</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Utilization Rate</span>
                          <span className="text-white">{warehouse.utilization}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full"
                            style={{ width: `${warehouse.utilization}%` }}
                          />
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-3">
                          <p className="text-sm text-blue-300">
                            <strong>Recommendation:</strong> {warehouse.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Category Optimization */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Product Category Optimization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { category: 'Electronics', current: 1200, optimized: 1380, savings: '₹12,500', actions: 'Reallocate from Nashik to Mumbai' },
                    { category: 'Clothing', current: 800, optimized: 920, savings: '₹8,200', actions: 'Increase Pune West capacity' },
                    { category: 'Food & Beverages', current: 1500, optimized: 1650, savings: '₹15,300', actions: 'Optimize temperature zones' },
                    { category: 'Furniture', current: 400, optimized: 460, savings: '₹6,800', actions: 'Dedicated storage area' }
                  ].map((category, index) => (
                    <div key={index} className="bg-slate-900/50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-white">{category.category}</h4>
                        <span className="text-green-400 font-bold">{category.savings}</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Current Stock</span>
                          <span className="text-white">{category.current}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Optimized Stock</span>
                          <span className="text-green-400">{category.optimized}</span>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2 mt-2">
                          <p className="text-xs text-yellow-300">{category.actions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Cost Breakdown Analysis</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-3">Storage Costs</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Current Monthly</span>
                          <span className="text-white">₹18,500</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Optimized Monthly</span>
                          <span className="text-green-400">₹14,200</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-green-400">Savings</span>
                          <span className="text-green-400">₹4,300</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-3">Labor Costs</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Current Monthly</span>
                          <span className="text-white">₹22,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Optimized Monthly</span>
                          <span className="text-green-400">₹18,500</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-green-400">Savings</span>
                          <span className="text-green-400">₹3,500</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-3">Transportation</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Current Monthly</span>
                          <span className="text-white">₹15,800</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Optimized Monthly</span>
                          <span className="text-green-400">₹12,100</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-green-400">Savings</span>
                          <span className="text-green-400">₹3,700</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Implementation Timeline */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Implementation Timeline</h3>
                <div className="space-y-3">
                  {[
                    { phase: 'Phase 1', duration: 'Week 1-2', tasks: 'Warehouse reorganization, Staff training' },
                    { phase: 'Phase 2', duration: 'Week 3-4', tasks: 'System integration, Process optimization' },
                    { phase: 'Phase 3', duration: 'Week 5-6', tasks: 'Performance monitoring, Fine-tuning' },
                    { phase: 'Phase 4', duration: 'Week 7-8', tasks: 'Full implementation, Results validation' }
                  ].map((phase, index) => (
                    <div key={index} className="flex items-center gap-4 bg-slate-900/50 rounded-lg p-4">
                      <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-white">{phase.phase}</h4>
                            <p className="text-sm text-slate-400">{phase.tasks}</p>
                          </div>
                          <span className="text-sm text-green-400 bg-green-400/10 px-2 py-1 rounded">
                            {phase.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Risk Assessment & Mitigation</h3>
                <div className="space-y-3">
                  {[
                    { risk: 'Supply Chain Disruption', probability: 'Medium', impact: 'High', mitigation: 'Diversify supplier base, Maintain safety stock' },
                    { risk: 'System Integration Issues', probability: 'Low', impact: 'Medium', mitigation: 'Phased rollout, Comprehensive testing' },
                    { risk: 'Staff Resistance to Change', probability: 'Medium', impact: 'Medium', mitigation: 'Training programs, Incentive alignment' },
                    { risk: 'Demand Forecast Errors', probability: 'Low', impact: 'Medium', mitigation: 'AI-powered forecasting, Regular review cycles' }
                  ].map((risk, index) => (
                    <div key={index} className="bg-slate-900/50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-white">{risk.risk}</h4>
                        <div className="flex gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            risk.probability === 'High' ? 'bg-red-500/20 text-red-400' :
                            risk.probability === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {risk.probability} Probability
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            risk.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                            risk.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {risk.impact} Impact
                          </span>
                        </div>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                        <p className="text-sm text-blue-300">
                          <strong>Mitigation:</strong> {risk.mitigation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-700/50">
              <div className="flex gap-3 justify-between">
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium hover:bg-blue-500/30 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export PDF
                  </button>
                  <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium hover:bg-green-500/30 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Excel
                  </button>
                </div>
                <button 
                  onClick={() => setShowDetailedReport(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
                >
                  Close Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Implementation Details Modal */}
      {showImplementationDetails && implementationData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{implementationData.title}</h2>
                  <p className="text-slate-400 mt-1">Implementation completed successfully</p>
                </div>
                <button 
                  onClick={() => setShowImplementationDetails(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close implementation details"
                  title="Close implementation details"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {/* Implemented Changes */}
              <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  📊 Implemented Changes
                </h3>
                <ul className="space-y-2">
                  {implementationData.implementedChanges.map((change: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-green-300">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Monthly Savings */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  💰 Monthly Savings Achieved
                </h3>
                <div className="space-y-3">
                  {implementationData.monthlySavings.map((saving: any, index: number) => (
                    <div key={index} className="flex justify-between items-center bg-slate-900/50 rounded-lg p-3">
                      <span className="text-slate-300">{saving.item}</span>
                      <span className="text-green-400 font-bold">{saving.amount} savings</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-600 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Total Monthly Savings</span>
                      <span className="text-green-400 font-bold text-xl">{implementationData.totalSavings}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Improvements */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  ⚡ Performance Improvements
                </h3>
                <ul className="space-y-2">
                  {implementationData.performanceImprovements.map((improvement: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-green-300">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ArrowUp className="w-5 h-5 text-blue-400" />
                  🎯 Next Steps
                </h3>
                <ul className="space-y-2">
                  {implementationData.nextSteps.map((step: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-blue-300">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Completion Time */}
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Implementation completed at:</span>
                  <span className="text-white font-medium">{implementationData.completionTime}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-700/50">
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => handleExportAnalysis('pdf')}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium hover:bg-blue-500/30 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
                <button 
                  onClick={() => setShowImplementationDetails(false)}
                  className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium hover:bg-green-500/30 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warehouse Details Modal */}
      {showWarehouseDetails && selectedWarehouseDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedWarehouseDetails.name}</h2>
                  <p className="text-slate-400 mt-1">Warehouse Details & Analytics</p>
                </div>
                <button 
                  onClick={() => setShowWarehouseDetails(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close warehouse details"
                  title="Close warehouse details"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {/* Warehouse Overview */}
              <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-400" />
                  Warehouse Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white font-medium">{selectedWarehouseDetails.location}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Warehouse ID</p>
                    <p className="text-white font-medium">{selectedWarehouseDetails.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Total Capacity</p>
                    <p className="text-white font-medium">{selectedWarehouseDetails.totalCapacity.toLocaleString()} units</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Current Stock</p>
                    <p className="text-white font-medium">{selectedWarehouseDetails.currentStock.toLocaleString()} units</p>
                  </div>
                </div>
              </div>

              {/* Utilization Metrics */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Utilization Metrics
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Current Utilization</span>
                      <span className="text-white font-medium">{selectedWarehouseDetails.utilizationRate}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          selectedWarehouseDetails.utilizationRate >= 90 
                            ? 'bg-red-500' 
                            : selectedWarehouseDetails.utilizationRate >= 70 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${selectedWarehouseDetails.utilizationRate}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {selectedWarehouseDetails.utilizationRate >= 90 
                        ? 'Critical - Near capacity' 
                        : selectedWarehouseDetails.utilizationRate >= 70 
                        ? 'Moderate - Monitor closely' 
                        : 'Optimal - Good capacity available'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance Analytics */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  Performance Analytics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Avg. Processing Time</p>
                    <p className="text-2xl font-bold text-white">2.4h</p>
                    <p className="text-xs text-green-400">-12% vs last month</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Order Accuracy</p>
                    <p className="text-2xl font-bold text-white">98.5%</p>
                    <p className="text-xs text-green-400">+2.3% improvement</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <p className="text-slate-400 text-sm mb-1">Staff Efficiency</p>
                    <p className="text-2xl font-bold text-white">87%</p>
                    <p className="text-xs text-yellow-400">+5% this quarter</p>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-400" />
                  Recent Activities
                </h3>
                <div className="space-y-3">
                  {[
                    { time: '2 hours ago', activity: 'Received 250 units of Electronics', status: 'completed' },
                    { time: '5 hours ago', activity: 'Shipped 180 units to Mumbai Central', status: 'completed' },
                    { time: '1 day ago', activity: 'Inventory audit completed', status: 'completed' },
                    { time: '2 days ago', activity: 'Storage area reorganization', status: 'in-progress' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 bg-slate-900/50 rounded-lg p-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.activity}</p>
                        <p className="text-slate-400 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Top Products by Volume
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Electronics', volume: 1250, percentage: 45 },
                    { name: 'Clothing', volume: 890, percentage: 32 },
                    { name: 'Food & Beverages', volume: 420, percentage: 15 },
                    { name: 'Furniture', volume: 200, percentage: 8 }
                  ].map((product, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-white text-sm w-24">{product.name}</span>
                      <div className="flex-1">
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full"
                            style={{ width: `${product.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-slate-400 text-sm w-16 text-right">{product.volume}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-700/50">
              <div className="flex gap-3 justify-end">
                <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium hover:bg-blue-500/30 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
                <button 
                  onClick={() => setShowWarehouseDetails(false)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
