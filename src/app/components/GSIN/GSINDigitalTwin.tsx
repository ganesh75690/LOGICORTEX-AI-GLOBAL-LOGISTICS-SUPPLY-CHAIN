import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Factory, 
  Package, 
  Cpu, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Leaf, 
  Truck, 
  BarChart3, 
  Activity, 
  Clock, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { SupplierDigitalTwin } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 2
 * Supplier Digital Twin™ - Continuously updating digital representation
 */
export const GSINDigitalTwin: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [digitalTwin, setDigitalTwin] = useState<SupplierDigitalTwin | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'production' | 'machines' | 'quality' | 'employees' | 'financial' | 'sustainability'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getDigitalTwin();
        setDigitalTwin(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!digitalTwin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Factory className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Digital Twin...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-4 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Factory className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-slate-400">Production</span>
          </div>
          <div className="text-2xl font-bold text-white">{digitalTwin.model.production.efficiency}%</div>
          <div className="text-xs text-slate-400 mt-1">Efficiency</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-green-400" />
            <span className="text-sm text-slate-400">Inventory</span>
          </div>
          <div className="text-2xl font-bold text-white">{digitalTwin.model.inventory.turnoverRate}x</div>
          <div className="text-xs text-slate-400 mt-1">Turnover Rate</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-slate-400">Quality</span>
          </div>
          <div className="text-2xl font-bold text-white">{digitalTwin.model.quality.qualityScore}%</div>
          <div className="text-xs text-slate-400 mt-1">Quality Score</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-400">Capacity</span>
          </div>
          <div className="text-2xl font-bold text-white">{digitalTwin.model.capacity.utilization}%</div>
          <div className="text-xs text-slate-400 mt-1">Utilization</div>
        </div>
      </motion.div>

      {/* Twin Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#00F5C4]/20 to-[#00D4A8]/20 border border-[#00F5C4]/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Digital Twin Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300">Live synchronization active</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">Last Updated</div>
            <div className="text-lg font-bold text-white">{new Date(digitalTwin.lastUpdated).toLocaleTimeString()}</div>
          </div>
        </div>
      </motion.div>

      {/* Model Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-white">Employees</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{digitalTwin.model.employees.totalEmployees}</div>
          <div className="text-xs text-slate-400">Total Workforce</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-white">Financial</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{digitalTwin.model.financialStability.stabilityScore}%</div>
          <div className="text-xs text-slate-400">Stability Score</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-white">Sustainability</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{digitalTwin.model.carbonEmissions.reductionRate}%</div>
          <div className="text-xs text-slate-400">Reduction Rate</div>
        </div>
      </motion.div>
    </div>
  );

  const renderProduction = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Factory className="w-5 h-5 text-blue-400" />
          Production Model
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Current Capacity</div>
            <div className="text-2xl font-bold text-white">{digitalTwin.model.production.currentCapacity}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Efficiency</div>
            <div className="text-2xl font-bold text-green-400">{digitalTwin.model.production.efficiency}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Quality Rate</div>
            <div className="text-2xl font-bold text-purple-400">{digitalTwin.model.production.qualityRate}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Downtime</div>
            <div className="text-2xl font-bold text-red-400">{digitalTwin.model.production.downtime}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Throughput</div>
            <div className="text-2xl font-bold text-blue-400">{digitalTwin.model.production.throughput}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Trend</div>
            <div className={`text-2xl font-bold ${digitalTwin.model.production.trend === 'increasing' ? 'text-green-400' : digitalTwin.model.production.trend === 'decreasing' ? 'text-red-400' : 'text-slate-400'}`}>
              {digitalTwin.model.production.trend === 'increasing' ? <ArrowUp className="w-6 h-6 inline" /> : digitalTwin.model.production.trend === 'decreasing' ? <ArrowDown className="w-6 h-6 inline" /> : '-'}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderMachines = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Machine Fleet</h3>
      {digitalTwin.model.machines.map((machine, idx) => (
        <motion.div
          key={machine.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-blue-400" />
              <div>
                <h4 className="text-lg font-bold text-white">{machine.name}</h4>
                <div className="text-sm text-slate-400">{machine.type}</div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded text-sm font-medium ${
              machine.maintenanceStatus === 'Optimal' ? 'bg-green-500/20 text-green-400' :
              machine.maintenanceStatus === 'Due Soon' ? 'bg-yellow-500/20 text-yellow-400' :
              machine.maintenanceStatus === 'Overdue' ? 'bg-orange-500/20 text-orange-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {machine.maintenanceStatus}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-slate-400 mb-1">Utilization</div>
              <div className="text-lg font-bold text-white">{machine.utilization}%</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Efficiency</div>
              <div className="text-lg font-bold text-green-400">{machine.efficiency}%</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Performance</div>
              <div className="text-lg font-bold text-blue-400">{machine.performance}%</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Uptime</div>
              <div className="text-lg font-bold text-purple-400">{machine.uptime}%</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

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
              <Factory className="w-8 h-8 text-[#00F5C4]" />
              Supplier Digital Twin™
            </h1>
            <p className="text-slate-400 mt-1">Continuously updating digital representation</p>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#00F5C4] animate-spin" />
            <span className="text-sm text-slate-300">Live Sync</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6"
      >
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'production', label: 'Production', icon: Factory },
          { id: 'machines', label: 'Machines', icon: Cpu },
          { id: 'quality', label: 'Quality', icon: Shield },
          { id: 'employees', label: 'Employees', icon: Users },
          { id: 'financial', label: 'Financial', icon: DollarSign },
          { id: 'sustainability', label: 'Sustainability', icon: Leaf }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSection(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedSection === tab.id
                ? 'bg-[#00F5C4] text-slate-900 font-medium'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedSection === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderOverview()}
          </motion.div>
        )}
        {selectedSection === 'production' && (
          <motion.div
            key="production"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderProduction()}
          </motion.div>
        )}
        {selectedSection === 'machines' && (
          <motion.div
            key="machines"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderMachines()}
          </motion.div>
        )}
        {selectedSection !== 'overview' && selectedSection !== 'production' && selectedSection !== 'machines' && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
          >
            <Activity className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2 capitalize">{selectedSection} Module</h3>
            <p className="text-slate-400">This module will be implemented in the next phase.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
