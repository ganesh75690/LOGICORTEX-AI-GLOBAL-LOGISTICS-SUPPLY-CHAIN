import { BarChart3, TrendingUp, TrendingDown, Package, DollarSign, Truck, Clock, Activity, Download, Filter, Calendar, RefreshCw, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useState } from 'react';

interface AnalyticsMetric {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

interface PerformanceData {
  month: string;
  inventoryEfficiency: number;
  orderFulfillment: number;
  costSavings: number;
  supplierReliability: number;
  demandAccuracy: number;
}

interface CategoryPerformance {
  category: string;
  revenue: number;
  growth: number;
  efficiency: number;
  stockTurnover: number;
}

interface SupplierMetrics {
  name: string;
  reliability: number;
  costEffectiveness: number;
  deliveryTime: number;
  quality: number;
  volume: number;
}

interface TopProduct {
  sku: string;
  name: string;
  revenue: number;
  volume: number;
  growth: number;
  efficiency: number;
  profitMargin: number;
}

const mockMetrics: AnalyticsMetric[] = [
  {
    title: 'Inventory Efficiency',
    value: '87.3%',
    change: 5.2,
    trend: 'up',
    icon: <Package className="w-5 h-5" />,
    color: 'text-[#00F5C4]'
  },
  {
    title: 'Order Fulfillment Rate',
    value: '94.1%',
    change: 2.8,
    trend: 'up',
    icon: <Truck className="w-5 h-5" />,
    color: 'text-green-400'
  },
  {
    title: 'Cost Savings',
    value: '₹124.5K',
    change: 12.4,
    trend: 'up',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'text-blue-400'
  },
  {
    title: 'Avg Delivery Time',
    value: '2.8 days',
    change: -15.3,
    trend: 'up',
    icon: <Clock className="w-5 h-5" />,
    color: 'text-yellow-400'
  }
];

const performanceData: PerformanceData[] = [
  { month: 'Jan', inventoryEfficiency: 82, orderFulfillment: 89, costSavings: 45000, supplierReliability: 91, demandAccuracy: 85 },
  { month: 'Feb', inventoryEfficiency: 84, orderFulfillment: 91, costSavings: 52000, supplierReliability: 93, demandAccuracy: 87 },
  { month: 'Mar', inventoryEfficiency: 86, orderFulfillment: 92, costSavings: 78000, supplierReliability: 92, demandAccuracy: 90 },
  { month: 'Apr', inventoryEfficiency: 87, orderFulfillment: 94, costSavings: 95000, supplierReliability: 94, demandAccuracy: 88 },
  { month: 'May', inventoryEfficiency: 88, orderFulfillment: 93, costSavings: 88000, supplierReliability: 95, demandAccuracy: 91 },
  { month: 'Jun', inventoryEfficiency: 87, orderFulfillment: 94, costSavings: 124500, supplierReliability: 96, demandAccuracy: 93 },
];

const categoryPerformance: CategoryPerformance[] = [
  { category: 'Electronics', revenue: 450000, growth: 12.5, efficiency: 89, stockTurnover: 8.2 },
  { category: 'Automotive', revenue: 320000, growth: 8.3, efficiency: 92, stockTurnover: 6.8 },
  { category: 'Raw Materials', revenue: 280000, growth: -2.1, efficiency: 85, stockTurnover: 4.5 },
  { category: 'Industrial', revenue: 190000, growth: 15.7, efficiency: 91, stockTurnover: 7.1 },
];

const supplierMetrics: SupplierMetrics[] = [
  { name: 'TechComponents Inc', reliability: 94, costEffectiveness: 88, deliveryTime: 92, quality: 96, volume: 85 },
  { name: 'AutoParts Direct', reliability: 91, costEffectiveness: 92, deliveryTime: 88, quality: 89, volume: 78 },
  { name: 'LightTech Solutions', reliability: 88, costEffectiveness: 85, deliveryTime: 90, quality: 92, volume: 72 },
  { name: 'Steel Suppliers Inc', reliability: 93, costEffectiveness: 94, deliveryTime: 85, quality: 88, volume: 90 },
];

const topProducts: TopProduct[] = [
  { sku: 'SKU-7845', name: 'Circuit Board A', revenue: 125000, volume: 3400, growth: 18.2, efficiency: 91, profitMargin: 23.5 },
  { sku: 'SKU-2341', name: 'Brake Pads', revenue: 98000, volume: 5200, growth: 12.8, efficiency: 88, profitMargin: 19.2 },
  { sku: 'SKU-9012', name: 'Steel Rods', revenue: 87000, volume: 8900, growth: -5.3, efficiency: 85, profitMargin: 15.8 },
  { sku: 'SKU-5678', name: 'LED Bulbs', revenue: 76000, volume: 12400, growth: 22.1, efficiency: 94, profitMargin: 28.4 },
];

const COLORS = ['#00F5C4', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#10b981'];

export default function AnalyticsDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<string>('all');

  const handleExport = () => {
    // Create CSV content with all analytics data
    const csvContent = [
      // Header
      'Analytics Dashboard Export',
      `Generated: ${new Date().toLocaleString()}`,
      `Timeframe: ${selectedTimeframe}`,
      '',
      
      // Key Metrics
      'KEY METRICS',
      'Metric,Value,Change,Trend',
      ...mockMetrics.map(metric => 
        `"${metric.title}","${metric.value}","${metric.change}%","${metric.trend}"`
      ),
      '',
      
      // Performance Trends
      'PERFORMANCE TRENDS',
      'Month,Inventory Efficiency,Order Fulfillment,Cost Savings,Supplier Reliability,Demand Accuracy',
      ...performanceData.map(data => 
        `${data.month},${data.inventoryEfficiency}%,${data.orderFulfillment}%,${data.costSavings},${data.supplierReliability}%,${data.demandAccuracy}%`
      ),
      '',
      
      // Category Performance
      'CATEGORY PERFORMANCE',
      'Category,Revenue,Growth,Efficiency,Stock Turnover',
      ...categoryPerformance.map(cat => 
        `"${cat.category}",₹${cat.revenue},${cat.growth}%,${cat.efficiency}%,${cat.stockTurnover}`
      ),
      '',
      
      // Supplier Metrics
      'SUPPLIER METRICS',
      'Supplier,Reliability,Cost Effectiveness,Delivery Time,Quality,Volume',
      ...supplierMetrics.map(supplier => 
        `"${supplier.name}",${supplier.reliability}%,${supplier.costEffectiveness}%,${supplier.deliveryTime}%,${supplier.quality}%,${supplier.volume}%`
      ),
      '',
      
      // Top Products
      'TOP PRODUCTS',
      'SKU,Name,Revenue,Volume,Growth,Efficiency,Profit Margin',
      ...topProducts.map(product => 
        `${product.sku},"${product.name}",₹${product.revenue},${product.volume},${product.growth}%,${product.efficiency}%,${product.profitMargin}%`
      )
    ].join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics-export-${selectedTimeframe}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return <TrendingUp className="w-4 h-4 text-green-400" />;
    } else if (trend === 'down') {
      return <TrendingDown className="w-4 h-4 text-red-400" />;
    }
    return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change}%`;
  };

  const getChangeColor = (change: number) => {
    if (change >= 0) return 'text-green-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00F5C4]/20 rounded-lg">
            <BarChart3 className="w-6 h-6 text-[#00F5C4]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
            <p className="text-slate-400">Comprehensive insights into inventory efficiency and supply trends</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-2 bg-slate-800 rounded-lg p-1">
            {(['month', 'quarter', 'year'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-[#00F5C4] text-slate-900'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMetrics.map((metric, index) => (
          <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-slate-700 ${metric.color}`}>
                {metric.icon}
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(metric.trend, metric.change)}
                <span className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
                  {formatChange(metric.change)}
                </span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-slate-400 text-sm">{metric.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Line type="monotone" dataKey="inventoryEfficiency" stroke="#00F5C4" strokeWidth={2} />
              <Line type="monotone" dataKey="orderFulfillment" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="supplierReliability" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00F5C4] rounded-full" />
              <span className="text-slate-400 text-sm">Inventory Efficiency</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3b82f6] rounded-full" />
              <span className="text-slate-400 text-sm">Order Fulfillment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#f59e0b] rounded-full" />
              <span className="text-slate-400 text-sm">Supplier Reliability</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Cost Savings Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area
                type="monotone"
                dataKey="costSavings"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
              >
                {categoryPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Category Efficiency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="category" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="efficiency" fill="#00F5C4" />
              <Bar dataKey="stockTurnover" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Supplier Performance Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Supplier Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={supplierMetrics}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis dataKey="name" stroke="#94a3b8" />
              <PolarRadiusAxis stroke="#94a3b8" />
              <Radar name="Reliability" dataKey="reliability" stroke="#00F5C4" fill="#00F5C4" fillOpacity={0.6} />
              <Radar name="Quality" dataKey="quality" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Radar name="Cost Effectiveness" dataKey="costEffectiveness" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Top Performing Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-2 text-slate-400 font-medium text-sm">Product</th>
                  <th className="text-left p-2 text-slate-400 font-medium text-sm">Revenue</th>
                  <th className="text-left p-2 text-slate-400 font-medium text-sm">Growth</th>
                  <th className="text-left p-2 text-slate-400 font-medium text-sm">Efficiency</th>
                  <th className="text-left p-2 text-slate-400 font-medium text-sm">Margin</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-slate-700">
                    <td className="p-2">
                      <div>
                        <div className="text-white text-sm font-medium">{product.name}</div>
                        <div className="text-slate-400 text-xs">{product.sku}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-white text-sm">${product.revenue.toLocaleString()}</div>
                    </td>
                    <td className="p-2">
                      <div className={`text-sm font-medium ${getChangeColor(product.growth)}`}>
                        {formatChange(product.growth)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-white text-sm">{product.efficiency}%</div>
                    </td>
                    <td className="p-2">
                      <div className="text-white text-sm">{product.profitMargin}%</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#00F5C4]/10 to-[#00D4A8]/10 rounded-xl p-6 border border-[#00F5C4]/20">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-[#00F5C4]" />
          <h3 className="text-lg font-semibold text-white">AI-Powered Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Optimization Opportunity</h4>
            <p className="text-slate-400 text-sm">
              Electronics category shows 18% efficiency improvement potential through automated reordering.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Risk Alert</h4>
            <p className="text-slate-400 text-sm">
              Steel Suppliers Inc showing declining delivery performance. Consider diversification.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Growth Driver</h4>
            <p className="text-slate-400 text-sm">
              LED Bulbs demand growing 22% YoY. Recommend increasing safety stock by 35%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
