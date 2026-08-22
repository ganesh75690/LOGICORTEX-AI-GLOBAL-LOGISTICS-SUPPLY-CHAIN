import { Package, Clock, MapPin, TrendingUp, AlertTriangle, CheckCircle, Calendar, Truck, Calculator, RefreshCw, Search, X } from 'lucide-react';
import { useState } from 'react';

interface RestockRecommendation {
  id: string;
  sku: string;
  productName: string;
  category: string;
  currentStock: number;
  recommendedOrderQuantity: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  urgency: 'immediate' | 'within-3-days' | 'within-week' | 'within-month';
  targetWarehouse: {
    id: string;
    name: string;
    location: string;
    currentCapacity: number;
    maxCapacity: number;
  };
  supplier: {
    name: string;
    leadTime: string;
    reliability: number;
    costPerUnit: number;
  };
  totalCost: number;
  expectedDeliveryDate: string;
  stockoutRisk: number;
  demandForecast: number;
  optimalOrderDate: string;
}

interface RestockTimeline {
  date: string;
  actions: {
    time: string;
    action: string;
    product: string;
    warehouse: string;
    status: 'pending' | 'in-progress' | 'completed';
  }[];
}

const mockRecommendations: RestockRecommendation[] = [
  {
    id: 'REC001',
    sku: 'SKU-5678',
    productName: 'LED Bulbs',
    category: 'Electronics',
    currentStock: 45,
    recommendedOrderQuantity: 500,
    priority: 'critical',
    urgency: 'immediate',
    targetWarehouse: {
      id: 'WH001',
      name: 'North Warehouse',
      location: 'Chicago, IL',
      currentCapacity: 7500,
      maxCapacity: 10000
    },
    supplier: {
      name: 'LightTech Solutions',
      leadTime: '2-3 days',
      reliability: 94,
      costPerUnit: 12.50
    },
    totalCost: 6250,
    expectedDeliveryDate: '2024-04-27',
    stockoutRisk: 85,
    demandForecast: 920,
    optimalOrderDate: '2024-04-24'
  },
  {
    id: 'REC002',
    sku: 'SKU-2341',
    productName: 'Brake Pads',
    category: 'Automotive',
    currentStock: 180,
    recommendedOrderQuantity: 300,
    priority: 'high',
    urgency: 'within-3-days',
    targetWarehouse: {
      id: 'WH004',
      name: 'East Warehouse',
      location: 'New York, NY',
      currentCapacity: 5400,
      maxCapacity: 9000
    },
    supplier: {
      name: 'AutoParts Direct',
      leadTime: '3-5 days',
      reliability: 91,
      costPerUnit: 45.00
    },
    totalCost: 13500,
    expectedDeliveryDate: '2024-04-29',
    stockoutRisk: 65,
    demandForecast: 480,
    optimalOrderDate: '2024-04-25'
  },
  {
    id: 'REC003',
    sku: 'SKU-7845',
    productName: 'Circuit Board A',
    category: 'Electronics',
    currentStock: 150,
    recommendedOrderQuantity: 350,
    priority: 'medium',
    urgency: 'within-week',
    targetWarehouse: {
      id: 'WH003',
      name: 'West Warehouse',
      location: 'Los Angeles, CA',
      currentCapacity: 9800,
      maxCapacity: 12000
    },
    supplier: {
      name: 'TechComponents Inc',
      leadTime: '5-7 days',
      reliability: 88,
      costPerUnit: 125.00
    },
    totalCost: 43750,
    expectedDeliveryDate: '2024-05-02',
    stockoutRisk: 45,
    demandForecast: 340,
    optimalOrderDate: '2024-04-26'
  }
];

const mockTimeline: RestockTimeline[] = [
  {
    date: 'Today',
    actions: [
      { time: '09:00', action: 'Place order', product: 'LED Bulbs (500 units)', warehouse: 'North Warehouse', status: 'pending' },
      { time: '11:00', action: 'Place order', product: 'Brake Pads (300 units)', warehouse: 'East Warehouse', status: 'pending' },
      { time: '14:00', action: 'Supplier confirmation', product: 'LightTech Solutions', warehouse: '-', status: 'pending' }
    ]
  },
  {
    date: 'Tomorrow',
    actions: [
      { time: '10:00', action: 'Order processing', product: 'LED Bulbs', warehouse: 'North Warehouse', status: 'in-progress' },
      { time: '15:00', action: 'Shipment dispatch', product: 'Brake Pads', warehouse: 'East Warehouse', status: 'pending' }
    ]
  },
  {
    date: '2024-04-26',
    actions: [
      { time: 'All day', action: 'Transit to warehouse', product: 'LED Bulbs', warehouse: 'North Warehouse', status: 'in-progress' }
    ]
  },
  {
    date: '2024-04-27',
    actions: [
      { time: '10:00', action: 'Expected delivery', product: 'LED Bulbs', warehouse: 'North Warehouse', status: 'pending' },
      { time: '14:00', action: 'Quality check', product: 'LED Bulbs', warehouse: 'North Warehouse', status: 'pending' }
    ]
  }
];

export default function RestockingPlanner() {
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');
  const [showTimeline, setShowTimeline] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [approvedOrders, setApprovedOrders] = useState<Set<string>>(new Set());
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<RestockRecommendation | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'high': return 'bg-orange-400/20 text-orange-400 border-orange-400/30';
      case 'medium': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'low': return 'bg-green-400/20 text-green-400 border-green-400/30';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'text-red-400';
      case 'within-3-days': return 'text-orange-400';
      case 'within-week': return 'text-yellow-400';
      case 'within-month': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <RefreshCw className="w-4 h-4 text-yellow-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const filteredRecommendations = mockRecommendations.filter(rec => {
    const matchesPriority = selectedPriority === 'all' || rec.priority === selectedPriority;
    const matchesWarehouse = selectedWarehouse === 'all' || rec.targetWarehouse.id === selectedWarehouse;
    const matchesSearch = searchTerm === '' || 
                         rec.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rec.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rec.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rec.supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPriority && matchesWarehouse && matchesSearch;
  });

  const totalEstimatedCost = filteredRecommendations.reduce((sum, rec) => sum + rec.totalCost, 0);

  const handleApproveOrder = (recommendation: RestockRecommendation) => {
    setSelectedOrder(recommendation);
    setShowApprovalDialog(true);
  };

  const confirmApproveOrder = () => {
    if (!selectedOrder) return;
    
    setApprovedOrders(prev => new Set(prev).add(selectedOrder.id));
    
    // In a real application, this would make an API call to approve the order
    console.log('Order approved:', {
      id: selectedOrder.id,
      product: selectedOrder.productName,
      sku: selectedOrder.sku,
      quantity: selectedOrder.recommendedOrderQuantity,
      supplier: selectedOrder.supplier.name,
      totalCost: selectedOrder.totalCost,
      warehouse: selectedOrder.targetWarehouse.name,
      orderDate: new Date().toISOString()
    });

    setShowApprovalDialog(false);
    setSelectedOrder(null);
  };

  const handleApproveAll = () => {
    if (filteredRecommendations.length === 0) return;
    
    // For now, we'll use a simple confirmation for bulk approval
    // In a real app, you might want a separate dialog for bulk approval
    if (confirm(`Approve ${filteredRecommendations.length} orders totaling ₹${totalEstimatedCost.toLocaleString()}?`)) {
      const allRecommendationIds = filteredRecommendations.map(rec => rec.id);
      setApprovedOrders(new Set(allRecommendationIds));
      
      // In a real application, this would make API calls to approve all orders
      console.log('All orders approved:', filteredRecommendations.map(rec => ({
        id: rec.id,
        product: rec.productName,
        quantity: rec.recommendedOrderQuantity,
        totalCost: rec.totalCost
      })));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00F5C4]/20 rounded-lg">
            <Calculator className="w-6 h-6 text-[#00F5C4]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Restocking Planner</h2>
            <p className="text-slate-400">AI-powered recommendations for optimal inventory replenishment</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Recalculate
          </button>
          <button 
            onClick={handleApproveAll}
            className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors"
          >
            Approve All
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Critical Items</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white">3</div>
          <div className="text-xs text-slate-500">Require immediate action</div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Investment</span>
            <Package className="w-4 h-4 text-[#00F5C4]" />
          </div>
          <div className="text-2xl font-bold text-white">₹{totalEstimatedCost.toLocaleString()}</div>
          <div className="text-xs text-slate-500">Across all recommendations</div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Avg Lead Time</span>
            <Clock className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">4.2 days</div>
          <div className="text-xs text-slate-500">Weighted average</div>
        </div>
        
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Stockout Risk</span>
            <TrendingUp className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white">65%</div>
          <div className="text-xs text-slate-500">Without action</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, SKUs, categories, or suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#00F5C4]"
              />
            </div>
          </div>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <select
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#00F5C4]"
            aria-label="Filter by warehouse"
          >
            <option value="all">All Warehouses</option>
            <option value="WH001">North Warehouse</option>
            <option value="WH002">South Warehouse</option>
            <option value="WH003">West Warehouse</option>
            <option value="WH004">East Warehouse</option>
          </select>
          
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition-colors"
          >
            {showTimeline ? 'Hide' : 'Show'} Timeline
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommendations */}
        <div className="lg:col-span-2 space-y-4">
          {filteredRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{recommendation.productName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(recommendation.priority)}`}>
                      {recommendation.priority}
                    </span>
                    <span className={`text-sm font-medium ${getUrgencyColor(recommendation.urgency)}`}>
                      {recommendation.urgency.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-slate-400 text-sm mb-3">{recommendation.sku} • {recommendation.category}</div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-slate-400 text-xs mb-1">Current Stock</div>
                      <div className="text-white font-medium">{recommendation.currentStock}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs mb-1">Order Quantity</div>
                      <div className="text-[#00F5C4] font-medium">{recommendation.recommendedOrderQuantity}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs mb-1">Total Cost</div>
                      <div className="text-white font-medium">₹{recommendation.totalCost.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs mb-1">Stockout Risk</div>
                      <div className="text-red-400 font-medium">{recommendation.stockoutRisk}%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">Target: {recommendation.targetWarehouse.name} ({recommendation.targetWarehouse.location})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">Supplier: {recommendation.supplier.name} • {recommendation.supplier.leadTime} lead time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">Order by: {recommendation.optimalOrderDate} • Delivery: {recommendation.expectedDeliveryDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => handleApproveOrder(recommendation)}
                  disabled={approvedOrders.has(recommendation.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    approvedOrders.has(recommendation.id)
                      ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      : 'bg-[#00F5C4] text-slate-900 hover:bg-[#00D4A8]'
                  }`}
                >
                  {approvedOrders.has(recommendation.id) ? 'Approved' : 'Approve Order'}
                </button>
                <button className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors">
                  Modify Quantity
                </button>
                <button className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors">
                  Postpone
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        {showTimeline && (
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Restocking Timeline</h3>
            <div className="space-y-4">
              {mockTimeline.map((day, index) => (
                <div key={day.date} className="relative">
                  {index < mockTimeline.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-600" />
                  )}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-[#00F5C4] rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-slate-900 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium mb-2">{day.date}</div>
                      <div className="space-y-2">
                        {day.actions.map((action, actionIndex) => (
                          <div key={actionIndex} className="bg-slate-700/50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              {getStatusIcon(action.status)}
                              <span className="text-slate-300 text-sm">{action.time}</span>
                            </div>
                            <div className="text-white text-sm">{action.action}</div>
                            <div className="text-slate-400 text-xs">{action.product} {action.warehouse !== '-' && `• ${action.warehouse}`}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Approval Dialog */}
      {showApprovalDialog && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Confirm Order Approval</h2>
                  <p className="text-slate-400 mt-1">Review order details before approving</p>
                </div>
                <button 
                  onClick={() => {
                    setShowApprovalDialog(false);
                    setSelectedOrder(null);
                  }}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close approval dialog"
                  title="Close approval dialog"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Product Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Product Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Product Name</div>
                      <div className="text-white font-medium">{selectedOrder.productName}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">SKU</div>
                      <div className="text-white font-medium">{selectedOrder.sku}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Category</div>
                      <div className="text-white font-medium">{selectedOrder.category}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Priority</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedOrder.priority)}`}>
                        {selectedOrder.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Order Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Current Stock</div>
                      <div className="text-white font-medium">{selectedOrder.currentStock} units</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Recommended Order</div>
                      <div className="text-[#00F5C4] font-medium">{selectedOrder.recommendedOrderQuantity} units</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Total Cost</div>
                      <div className="text-white font-medium">₹{selectedOrder.totalCost.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Stockout Risk</div>
                      <div className="text-red-400 font-medium">{selectedOrder.stockoutRisk}%</div>
                    </div>
                  </div>
                </div>

                {/* Supplier & Warehouse */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Supplier & Warehouse</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Supplier</div>
                      <div className="text-white font-medium">{selectedOrder.supplier.name}</div>
                      <div className="text-slate-400 text-sm">Lead Time: {selectedOrder.supplier.leadTime}</div>
                      <div className="text-slate-400 text-sm">Reliability: {selectedOrder.supplier.reliability}%</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Target Warehouse</div>
                      <div className="text-white font-medium">{selectedOrder.targetWarehouse.name}</div>
                      <div className="text-slate-400 text-sm">{selectedOrder.targetWarehouse.location}</div>
                      <div className="text-slate-400 text-sm">Capacity: {selectedOrder.targetWarehouse.currentCapacity.toLocaleString()} / {selectedOrder.targetWarehouse.maxCapacity.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Optimal Order Date</div>
                      <div className="text-white font-medium">{selectedOrder.optimalOrderDate}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Expected Delivery</div>
                      <div className="text-white font-medium">{selectedOrder.expectedDeliveryDate}</div>
                    </div>
                  </div>
                </div>

                {/* Demand Forecast */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Demand Forecast</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Demand Forecast</div>
                      <div className="text-white font-medium">{selectedOrder.demandForecast} units</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Urgency</div>
                      <span className={`text-sm font-medium ${getUrgencyColor(selectedOrder.urgency)}`}>
                        {selectedOrder.urgency.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-slate-700/50">
              <div className="flex justify-between items-center">
                <div className="text-slate-400">
                  <div className="text-sm">Total Investment: <span className="text-white font-medium">₹{selectedOrder.totalCost.toLocaleString()}</span></div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowApprovalDialog(false);
                      setSelectedOrder(null);
                    }}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmApproveOrder}
                    className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors"
                  >
                    Approve Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
