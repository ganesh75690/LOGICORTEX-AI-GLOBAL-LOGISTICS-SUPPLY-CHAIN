import { useState } from 'react';
import { TrendingUp, Package, AlertTriangle, BarChart3, Calendar, X, CheckCircle, Clock, DollarSign, Truck, User, Brain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { askAI } from '../../ai';

const demandForecast = [
  { month: 'Jan', actual: 2400, predicted: 2300 },
  { month: 'Feb', actual: 1398, predicted: 1500 },
  { month: 'Mar', actual: 3800, predicted: 3600 },
  { month: 'Apr', actual: 3908, predicted: 4100 },
  { month: 'May', predicted: 4800 },
  { month: 'Jun', predicted: 5200 },
];

const inventoryTrend = [
  { date: 'Week 1', level: 4500 },
  { date: 'Week 2', level: 4200 },
  { date: 'Week 3', level: 3800 },
  { date: 'Week 4', level: 3200 },
  { date: 'Week 5', level: 2800 },
  { date: 'Week 6', level: 2400 },
];

interface ProductInsight {
  sku: string;
  name: string;
  currentDemand: number;
  predictedDemand: number;
  trend: 'up' | 'down' | 'stable';
  recommendedOrder: number;
  leadTime: string;
  stockLevel: number;
  minStock: number;
  maxStock: number;
}

const mockProducts: ProductInsight[] = [
  { sku: 'SKU-7845', name: 'Circuit Board A', currentDemand: 120, predictedDemand: 340, trend: 'up', recommendedOrder: 500, leadTime: '3-5 days', stockLevel: 150, minStock: 200, maxStock: 800 },
  { sku: 'SKU-2341', name: 'Brake Pads', currentDemand: 450, predictedDemand: 480, trend: 'up', recommendedOrder: 300, leadTime: '2-3 days', stockLevel: 180, minStock: 250, maxStock: 600 },
  { sku: 'SKU-9012', name: 'Steel Rods', currentDemand: 2100, predictedDemand: 1900, trend: 'down', recommendedOrder: 0, leadTime: '7-10 days', stockLevel: 4500, minStock: 1000, maxStock: 5000 },
  { sku: 'SKU-5678', name: 'LED Bulbs', currentDemand: 890, predictedDemand: 920, trend: 'up', recommendedOrder: 200, leadTime: '1-2 days', stockLevel: 45, minStock: 100, maxStock: 400 },
];

const lowStockAlerts = [
  { id: 'ALERT001', sku: 'SKU-5678', productName: 'LED Bulbs', currentStock: 45, minStock: 100, urgency: 'critical', timeAgo: '2 hours ago', impact: 'Potential stockout in 3 days' },
  { id: 'ALERT002', sku: 'SKU-2341', productName: 'Brake Pads', currentStock: 180, minStock: 250, urgency: 'high', timeAgo: '5 hours ago', impact: 'Low stock buffer detected' },
  { id: 'ALERT003', sku: 'SKU-7845', productName: 'Circuit Board A', currentStock: 150, minStock: 200, urgency: 'medium', timeAgo: '1 day ago', impact: 'Stock below optimal level' },
];

const restockingPlans = [
  { 
    id: 'PLAN001', 
    sku: 'SKU-5678', 
    productName: 'LED Bulbs', 
    orderQuantity: 500, 
    urgency: 'critical',
    estimatedCost: '₹45,000',
    supplier: 'Lighting Solutions Ltd',
    expectedDelivery: '2024-04-25',
    reason: 'Critical stock level - immediate replenishment required'
  },
  { 
    id: 'PLAN002', 
    sku: 'SKU-2341', 
    productName: 'Brake Pads', 
    orderQuantity: 300, 
    urgency: 'high',
    estimatedCost: '₹78,000',
    supplier: 'Auto Parts Co.',
    expectedDelivery: '2024-04-24',
    reason: 'High demand trend - maintain safety stock'
  },
  { 
    id: 'PLAN003', 
    sku: 'SKU-7845', 
    productName: 'Circuit Board A', 
    orderQuantity: 500, 
    urgency: 'medium',
    estimatedCost: '₹1,20,000',
    supplier: 'Electronics Manufacturing',
    expectedDelivery: '2024-04-26',
    reason: 'Demand spike predicted - proactive ordering'
  },
];

const warehouseDistribution = [
  { id: 'WH001', name: 'Mumbai Warehouse', capacity: 10000, currentStock: 7500, utilization: 75, region: 'West' },
  { id: 'WH002', name: 'Delhi Warehouse', capacity: 8000, currentStock: 6200, utilization: 78, region: 'North' },
  { id: 'WH003', name: 'Bangalore Warehouse', capacity: 12000, currentStock: 8900, utilization: 74, region: 'South' },
  { id: 'WH004', name: 'Kolkata Warehouse', capacity: 6000, currentStock: 4800, utilization: 80, region: 'East' },
];

export function SupplierInterface() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showRestockingModal, setShowRestockingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    visible: boolean;
  }>({ message: '', type: 'info', visible: false });

  // Supplier AI state
  const [supplierAIAnswer, setSupplierAIAnswer] = useState('');
  const [supplierAILoading, setSupplierAILoading] = useState(false);

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error') => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handlePlaceOrder = (product: any) => {
    setSelectedProduct(product);
    setShowOrderModal(true);
  };

  const handleApproveRestocking = (plan: any) => {
    setSelectedPlan(plan);
    setShowRestockingModal(true);
  };

  const handleSupplierAI = async () => {
    console.log("Supplier AI button clicked!");
    if (supplierAILoading) return;
    setSupplierAILoading(true);
    
    console.log("Calling askAI for supplier analysis...");
    const response = await askAI(
      "Analyze supplier performance and suggest improvements for delivery efficiency and cost reduction"
    );
    console.log("Supplier AI response:", response);
    setSupplierAIAnswer(response);
    setSupplierAILoading(false);
  };

  const handleConfirmOrder = () => {
    setShowOrderModal(false);
    showNotification(`Order placed for ${selectedProduct?.name}! Order ID: ORD-${Date.now()}`, 'success');
  };

  const handleApprovePlan = () => {
    setShowRestockingModal(false);
    showNotification(`Restocking plan approved for ${selectedPlan?.productName}! Plan ID: PLAN-${Date.now()}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">₹284K</div>
          <div className="text-sm text-blue-200">Monthly Revenue</div>
          <div className="text-xs text-blue-300 mt-2">+18.3% vs last month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-bold mb-1">1,247</div>
          <div className="text-sm text-purple-200">Active Orders</div>
          <div className="text-xs text-purple-300 mt-2">+12% vs last week</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8" />
            <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
          </div>
          <div className="text-3xl font-bold mb-1">97.8%</div>
          <div className="text-sm text-green-200">On-Time Delivery</div>
          <div className="text-xs text-green-300 mt-2">Target: 95%</div>
        </motion.div>
      </div>

      {/* Supplier AI Assistant */}
      <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl p-6 border border-indigo-500/30">
        <div className="flex items-start gap-3 mb-4">
          <Brain className="w-6 h-6 text-indigo-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Supplier AI Assistant</h3>
            <p className="text-sm text-slate-400 mb-4">
              Get AI-powered insights for supplier performance optimization and cost reduction
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSupplierAI}
            disabled={supplierAILoading}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            {supplierAILoading ? 'Analyzing...' : 'AI Supplier Insight'}
          </button>
          <span className="text-xs text-slate-400">
            Click to get supplier performance analysis and optimization recommendations
          </span>
        </div>

        {supplierAIAnswer && (
          <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="text-sm text-slate-400 mb-2">AI Analysis:</div>
            <div className="text-white whitespace-pre-line">{supplierAIAnswer}</div>
          </div>
        )}
      </div>

      {/* Demand Forecast Chart */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">6-Month Demand Forecast</h2>
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs text-blue-400">AI-Powered</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={demandForecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              name="Actual Demand"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#8b5cf6"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#8b5cf6', r: 4 }}
              name="Predicted Demand"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Inventory Level Trend */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Inventory Depletion Trend</h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-xs text-red-400">Reorder Recommended</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={inventoryTrend}>
            <defs>
              <linearGradient id="inventoryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area
              type="monotone"
              dataKey="level"
              stroke="#f59e0b"
              strokeWidth={3}
              fill="url(#inventoryGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Product Insights & Recommendations */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">AI Reorder Recommendations</h2>
        </div>
        <div className="space-y-4">
          {mockProducts.map((product, idx) => {
            const demandChange = ((product.predictedDemand - product.currentDemand) / product.currentDemand * 100);
            const isUrgent = product.recommendedOrder > 0;

            return (
              <motion.div
                key={product.sku}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-lg border backdrop-blur-sm ${
                  isUrgent
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : 'bg-slate-800/30 border-slate-700/30'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">{product.name}</div>
                    <div className="text-xs text-slate-500">{product.sku}</div>
                  </div>
                  {isUrgent && (
                    <div className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-xs text-yellow-400 font-medium">
                      Action Required
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Current Demand</div>
                    <div className="text-lg font-bold text-white">{product.currentDemand}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Predicted Demand</div>
                    <div className={`text-lg font-bold ${
                      demandChange > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {product.predictedDemand}
                      <span className="text-xs ml-2">
                        ({demandChange > 0 ? '+' : ''}{demandChange.toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                </div>

                {isUrgent ? (
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-slate-400">AI Recommendation</div>
                      <div className="text-xs text-slate-500">Lead Time: {product.leadTime}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-400">Order Quantity</div>
                        <div className="text-xl font-bold text-blue-400">{product.recommendedOrder} units</div>
                      </div>
                      <button 
                        onClick={() => handlePlaceOrder(product)}
                        className="px-4 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black text-sm font-medium rounded-lg hover:from-[#00D4A8] hover:to-[#00B896] transition-all"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-green-400 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    Stock levels optimal - No action needed
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-xl p-6 border border-red-500/30">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Low Stock Alerts</h3>
            <p className="text-sm text-slate-400 mb-4">
              AI-powered inventory monitoring with real-time alerts
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {lowStockAlerts.map((alert, idx) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-lg border ${
                alert.urgency === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                alert.urgency === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                'bg-yellow-500/10 border-yellow-500/30'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-semibold text-white">{alert.productName}</div>
                  <div className="text-xs text-slate-400">{alert.sku}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  alert.urgency === 'critical' ? 'bg-red-500/20 text-red-400' :
                  alert.urgency === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {alert.urgency.toUpperCase()}
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-400">Current Stock: {alert.currentStock}</div>
                <div className="text-xs text-slate-400">Min Required: {alert.minStock}</div>
              </div>
              <div className="text-xs text-orange-400 mb-1">{alert.impact}</div>
              <div className="text-xs text-slate-500">{alert.timeAgo}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Restocking Plans */}
      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-start gap-3 mb-4">
          <BarChart3 className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Restocking Plans</h3>
            <p className="text-sm text-slate-400 mb-4">
              Automated restocking recommendations based on demand forecasts
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {restockingPlans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-white">{plan.productName}</div>
                  <div className="text-xs text-slate-400">{plan.sku}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  plan.urgency === 'critical' ? 'bg-red-500/20 text-red-400' :
                  plan.urgency === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {plan.urgency.toUpperCase()}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
                <div>
                  <div className="text-slate-400">Order Quantity</div>
                  <div className="text-white font-medium">{plan.orderQuantity} units</div>
                </div>
                <div>
                  <div className="text-slate-400">Estimated Cost</div>
                  <div className="text-green-400 font-medium">{plan.estimatedCost}</div>
                </div>
                <div>
                  <div className="text-slate-400">Supplier</div>
                  <div className="text-white font-medium">{plan.supplier}</div>
                </div>
                <div>
                  <div className="text-slate-400">Expected Delivery</div>
                  <div className="text-blue-400 font-medium">{plan.expectedDelivery}</div>
                </div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded border border-slate-600/50">
                <div className="text-xs text-slate-400 mb-1">AI Reasoning:</div>
                <div className="text-sm text-white">{plan.reason}</div>
              </div>
              <button 
                onClick={() => handleApproveRestocking(plan)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg py-2 px-4 hover:from-blue-600 hover:to-cyan-600 transition-all"
              >
                Approve Restocking Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Warehouse Distribution View */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/30">
        <div className="flex items-start gap-3 mb-4">
          <Package className="w-6 h-6 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Warehouse Distribution Overview</h3>
            <p className="text-sm text-slate-400 mb-4">
              Real-time inventory distribution across all warehouse locations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-medium text-white mb-4">Utilization by Region</div>
            <div className="space-y-3">
              {warehouseDistribution.map((warehouse, idx) => (
                <div key={warehouse.id} className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm font-medium text-white">{warehouse.name}</div>
                      <div className="text-xs text-slate-400">{warehouse.region}</div>
                    </div>
                    <div className={`text-sm font-bold ${
                      warehouse.utilization >= 80 ? 'text-red-400' :
                      warehouse.utilization >= 70 ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {warehouse.utilization}%
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Stock: {warehouse.currentStock.toLocaleString()}</span>
                    <span>Capacity: {warehouse.capacity.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${warehouse.utilization}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full ${
                        warehouse.utilization >= 80 ? 'bg-red-500' :
                        warehouse.utilization >= 70 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-white mb-4">Regional Performance</div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">Total Stock</span>
                  <span className="text-sm font-bold text-white">
                    {warehouseDistribution.reduce((acc, wh) => acc + wh.currentStock, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Total Capacity</span>
                  <span>{warehouseDistribution.reduce((acc, wh) => acc + wh.capacity, 0).toLocaleString()}</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">Average Utilization</span>
                  <span className="text-sm font-bold text-yellow-400">
                    {Math.round(warehouseDistribution.reduce((acc, wh) => acc + wh.utilization, 0) / warehouseDistribution.length)}%
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Optimal range: 60-80% utilization
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">Available Space</span>
                  <span className="text-sm font-bold text-green-400">
                    {warehouseDistribution.reduce((acc, wh) => acc + (wh.capacity - wh.currentStock), 0).toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Ready for new inventory
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Modal */}
      <AnimatePresence>
        {showOrderModal && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-slate-900 rounded-xl p-6 max-w-2xl w-full mx-4 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Place Order</h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                  <h3 className="text-lg font-semibold text-white mb-2">{selectedProduct.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">SKU:</span>
                      <span className="text-white ml-2">{selectedProduct.sku}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Lead Time:</span>
                      <span className="text-white ml-2">{selectedProduct.leadTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-white font-medium mb-2">Order Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Quantity</span>
                        <span className="text-blue-400 font-bold">{selectedProduct.recommendedOrder} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Unit Price</span>
                        <span className="text-green-400">₹{(selectedProduct.recommendedOrder * 45).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Total Cost</span>
                        <span className="text-green-400 font-bold text-lg">₹{(selectedProduct.recommendedOrder * 45).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-white font-medium mb-2">Demand Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Current Demand</span>
                        <span className="text-white">{selectedProduct.currentDemand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Predicted Demand</span>
                        <span className="text-white">{selectedProduct.predictedDemand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Stock Level</span>
                        <span className="text-white">{selectedProduct.stockLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Min Stock</span>
                        <span className="text-white">{selectedProduct.minStock}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                  <h4 className="text-white font-medium mb-2">AI Recommendation</h4>
                  <p className="text-slate-300 text-sm">
                    Based on demand analysis and current stock levels, immediate ordering is recommended to prevent stockouts and maintain optimal inventory levels.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="flex-1 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black font-medium rounded-lg hover:from-[#00D4A8] hover:to-[#00B896] transition-all"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Approve Restocking Plan Modal */}
      <AnimatePresence>
        {showRestockingModal && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-slate-900 rounded-xl p-6 max-w-3xl w-full mx-4 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Approve Restocking Plan</h2>
                <button
                  onClick={() => setShowRestockingModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                  <h3 className="text-lg font-semibold text-white mb-2">{selectedPlan.productName}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">SKU:</span>
                      <span className="text-white ml-2">{selectedPlan.sku}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Urgency:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                        selectedPlan.urgency === 'critical' ? 'bg-red-500/20 text-red-400' :
                        selectedPlan.urgency === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {selectedPlan.urgency.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-slate-400 text-xs mb-1">Order Quantity</div>
                    <div className="text-white font-bold text-lg">{selectedPlan.orderQuantity} units</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-slate-400 text-xs mb-1">Estimated Cost</div>
                    <div className="text-green-400 font-bold text-lg">{selectedPlan.estimatedCost}</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-slate-400 text-xs mb-1">Supplier</div>
                    <div className="text-white font-bold text-sm">{selectedPlan.supplier}</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-slate-400 text-xs mb-1">Expected Delivery</div>
                    <div className="text-blue-400 font-bold text-sm">{selectedPlan.expectedDelivery}</div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-2">AI Reasoning</h4>
                  <p className="text-slate-300 text-sm">{selectedPlan.reason}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-400" />
                      Delivery Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Shipping Method</span>
                        <span className="text-white">Standard Ground</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Tracking Available</span>
                        <span className="text-green-400">Yes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Insurance</span>
                        <span className="text-green-400">Included</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-400" />
                      Supplier Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Rating</span>
                        <span className="text-yellow-400">⭐ 4.8/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Response Time</span>
                        <span className="text-green-400">&lt; 2 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Quality Score</span>
                        <span className="text-green-400">98%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Benefits of This Plan
                  </h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Prevents potential stockouts with {selectedPlan.urgency} priority</li>
                    <li>• Optimized cost with {selectedPlan.estimatedCost} investment</li>
                    <li>• Reliable delivery from {selectedPlan.supplier}</li>
                    <li>• AI-validated based on demand forecasts</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
                <button
                  onClick={() => setShowRestockingModal(false)}
                  className="flex-1 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Reject Plan
                </button>
                <button
                  onClick={handleApprovePlan}
                  className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
                >
                  Approve Plan
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {notification.visible && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-50 max-w-sm"
          >
            <div className={`px-4 py-3 rounded-lg border shadow-lg flex items-center gap-3 ${
              notification.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
              notification.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' :
              notification.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
              'bg-blue-500/20 border-blue-500/30 text-blue-400'
            }`}>
              <div className="flex-shrink-0">
                {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'info' && <BarChart3 className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification(prev => ({ ...prev, visible: false }))}
                className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
