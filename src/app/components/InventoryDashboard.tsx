import { Package, TrendingDown, TrendingUp, AlertTriangle, Warehouse, Brain, Zap, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'motion/react';

interface InventoryItem {
  sku: string;
  name: string;
  warehouse: string;
  current: number;
  optimal: number;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const mockInventory: InventoryItem[] = [
  { sku: 'SKU-7845', name: 'Electronics - Circuit Board A', warehouse: 'Warehouse B', current: 120, optimal: 1000, status: 'critical', trend: 'down' },
  { sku: 'SKU-2341', name: 'Automotive - Brake Pads', warehouse: 'Warehouse A', current: 450, optimal: 800, status: 'warning', trend: 'down' },
  { sku: 'SKU-9012', name: 'Industrial - Steel Rods', warehouse: 'Warehouse C', current: 2100, optimal: 2000, status: 'healthy', trend: 'up' },
  { sku: 'SKU-5678', name: 'Packaging - Cardboard Boxes', warehouse: 'Warehouse A', current: 5200, optimal: 5000, status: 'healthy', trend: 'stable' },
  { sku: 'SKU-3456', name: 'Electronics - USB Cables', warehouse: 'Warehouse B', current: 340, optimal: 600, status: 'warning', trend: 'down' },
];

const warehouseData = [
  { name: 'Warehouse A', capacity: 85, items: 1247 },
  { name: 'Warehouse B', capacity: 62, items: 893 },
  { name: 'Warehouse C', capacity: 91, items: 2104 },
  { name: 'Distribution Center', capacity: 78, items: 1567 },
];

export function InventoryDashboard() {
  const getStatusConfig = (status: InventoryItem['status']) => {
    switch (status) {
      case 'healthy': return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', icon: '✓' };
      case 'warning': return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: '⚠' };
      case 'critical': return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: '!' };
    }
  };

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 90) return '#ef4444';
    if (capacity >= 70) return '#eab308';
    return '#22c55e';
  };

  return (
    <div className="space-y-4 h-full overflow-hidden">
      {/* Warehouse Capacity Overview */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700/50">
        <div className="flex items-center gap-3 mb-8">
          <Warehouse className="w-7 h-7 text-blue-400" />
          <h2 className="text-2xl font-semibold text-white">Warehouse Capacity</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={warehouseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={16} />
            <YAxis stroke="#94a3b8" fontSize={16} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Bar dataKey="capacity" radius={[16, 16, 0, 0]}>
              {warehouseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getCapacityColor(entry.capacity)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-4 gap-6 mt-8">
          {warehouseData.map((wh, idx) => (
            <motion.div
              key={wh.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-4 rounded-lg bg-slate-800/50 border border-slate-700/30"
            >
              <div className="text-3xl font-bold" style={{ color: getCapacityColor(wh.capacity) }}>
                {wh.capacity}%
              </div>
              <div className="text-sm text-slate-400">{wh.items} items</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Recommendations & Inventory Status - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Recommendations Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-blue-400" />
            <h2 className="text-base font-semibold text-white">AI Recommendations</h2>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[180px]">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-semibold text-blue-400">Route Optimization</span>
              </div>
              <p className="text-xs text-slate-300 mb-2">Switch Route R002 to Highway 280 to avoid congestion</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-400">Save 2h 15m</span>
                <span className="text-xs text-slate-500">94% confidence</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span className="text-xs font-semibold text-purple-400">Inventory Alert</span>
              </div>
              <p className="text-xs text-slate-300 mb-2">Restock SKU-7845 at Warehouse B - critical levels</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-yellow-400">Priority: High</span>
                <span className="text-xs text-slate-500">87% confidence</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-xs font-semibold text-green-400">Cost Reduction</span>
              </div>
              <p className="text-xs text-slate-300 mb-2">Consolidate shipments to Delhi region</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-400">Save 15% costs</span>
                <span className="text-xs text-slate-500">92% confidence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Status Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-purple-400" />
              <h2 className="text-base font-semibold text-white">Inventory Status</h2>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="text-xs text-red-400">
                  {mockInventory.filter(i => i.status === 'critical').length} Critical
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <span className="text-xs text-yellow-400">
                  {mockInventory.filter(i => i.status === 'warning').length} Warning
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[180px]">
            {mockInventory.map((item, idx) => {
              const config = getStatusConfig(item.status);
              const percentage = (item.current / item.optimal) * 100;
              const TrendIcon = item.trend === 'up' ? TrendingUp : item.trend === 'down' ? TrendingDown : null;

              return (
                <motion.div
                  key={item.sku}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-3 rounded-lg border ${config.bg} ${config.border} backdrop-blur-sm`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${config.bg} border ${config.border} flex items-center justify-center text-sm flex-shrink-0`}>
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white truncate">{item.name}</span>
                            {TrendIcon && <TrendIcon className={`w-3 h-3 ${config.color}`} />}
                          </div>
                          <div className="text-xs text-slate-500">{item.sku} • {item.warehouse}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-white">
                            {item.current} / {item.optimal}
                          </div>
                          <div className={`text-xs ${config.color}`}>
                            {percentage.toFixed(0)}%
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: idx * 0.05 + 0.2, duration: 0.8 }}
                          className={`h-full ${
                            item.status === 'critical' ? 'bg-red-500' :
                            item.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
