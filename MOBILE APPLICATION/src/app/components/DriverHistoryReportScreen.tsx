import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Clock, 
  Fuel, 
  Package, 
  Target, 
  Calendar, 
  ArrowUp, 
  ArrowDown,
  CheckCircle,
  AlertCircle,
  Zap,
  BarChart3,
  Activity,
  Award,
  Route,
  MapPin,
  Timer
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';
import { DecisionReplay } from './DecisionReplay';

interface TripHistory {
  id: string;
  date: string;
  time: string;
  route: string;
  stops: number;
  duration: string;
  status: 'on-time' | 'delayed';
  delayReason?: string;
  aiResolution?: string;
}

interface IssueLog {
  id: string;
  date: string;
  issue: string;
  resolution: string;
  time: string;
  impact: string;
}

interface Props {
  onMenuToggle: () => void;
  onBack?: () => void;
}

export function DriverHistoryReportScreen({ onMenuToggle, onBack }: Props) {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'custom'>('today');
  const [customStartDate, setCustomStartDate] = useState('2026-04-01');
  const [customEndDate, setCustomEndDate] = useState('2026-04-27');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  // Sample data
  const todayMetrics = {
    timeSaved: 18,
    fuelSaved: 120,
    deliveriesCompleted: 8,
    totalDeliveries: 9,
    onTimeRate: 92,
  };

  const weekMetrics = {
    timeSaved: 125,
    fuelSaved: 850,
    deliveriesCompleted: 42,
    totalDeliveries: 45,
    onTimeRate: 94,
  };

  const monthMetrics = {
    timeSaved: 485,
    fuelSaved: 3200,
    deliveriesCompleted: 186,
    totalDeliveries: 195,
    onTimeRate: 96,
  };

  // AI Decisions Data
  const aiDecisions = [
    {
      id: '1',
      timestamp: '2026-04-25T10:32:00',
      problem: 'Traffic delay detected on Highway 101',
      action: 'Route changed to alternative streets',
      result: 'Avoided 15 minute delay',
      impact: {
        timeSaved: 14,
        efficiency: 12,
        costReduction: 45
      },
      type: 'route' as const
    },
    {
      id: '2',
      timestamp: '2026-04-25T09:15:00',
      problem: 'Customer unavailable at scheduled time',
      action: 'Proactive call and reschedule',
      result: 'Delivery completed 2 hours later',
      impact: {
        timeSaved: 8,
        efficiency: 15,
        costReduction: 25
      },
      type: 'delivery' as const
    },
    {
      id: '3',
      timestamp: '2026-04-25T14:20:00',
      problem: 'Fleet optimization opportunity detected',
      action: 'Task swapped with nearby driver',
      result: 'Both routes completed faster',
      impact: {
        timeSaved: 10,
        efficiency: 18,
        costReduction: 35
      },
      type: 'fleet' as const
    }
  ];

  const customMetrics = {
    timeSaved: 342,
    fuelSaved: 2150,
    deliveriesCompleted: 127,
    totalDeliveries: 134,
    onTimeRate: 93,
  };

  const currentMetrics = timeRange === 'today' ? todayMetrics : 
                        timeRange === 'week' ? weekMetrics : 
                        timeRange === 'month' ? monthMetrics : customMetrics;

  const tripHistory: TripHistory[] = [
    {
      id: '1',
      date: 'Apr 27, 2026',
      time: '10:30 AM',
      route: 'Warehouse A → Customer B',
      stops: 4,
      duration: '45 min',
      status: 'on-time',
    },
    {
      id: '2',
      date: 'Apr 27, 2026',
      time: '9:15 AM',
      route: 'Hub Central → District C',
      stops: 3,
      duration: '38 min',
      status: 'delayed',
      delayReason: 'Heavy traffic on Main St',
      aiResolution: 'AI rerouted via Highway 101',
    },
    {
      id: '3',
      date: 'Apr 27, 2026',
      time: '8:00 AM',
      route: 'Depot → Zone D',
      stops: 5,
      duration: '52 min',
      status: 'on-time',
    },
    {
      id: '4',
      date: 'Apr 26, 2026',
      time: '2:45 PM',
      route: 'Customer E → Warehouse F',
      stops: 2,
      duration: '28 min',
      status: 'delayed',
      delayReason: 'Customer availability issue',
      aiResolution: 'AI rescheduled for next slot',
    },
    {
      id: '5',
      date: 'Apr 26, 2026',
      time: '1:20 PM',
      route: 'Point G → Hub H',
      stops: 4,
      duration: '41 min',
      status: 'on-time',
    },
    {
      id: '6',
      date: 'Apr 25, 2026',
      time: '11:00 AM',
      route: 'Center I → Location J',
      stops: 3,
      duration: '35 min',
      status: 'on-time',
    },
    {
      id: '7',
      date: 'Apr 24, 2026',
      time: '3:30 PM',
      route: 'Station K → Point L',
      stops: 6,
      duration: '58 min',
      status: 'delayed',
      delayReason: 'Weather conditions',
      aiResolution: 'AI adjusted route timing',
    },
    {
      id: '8',
      date: 'Apr 23, 2026',
      time: '9:45 AM',
      route: 'Hub M → District N',
      stops: 4,
      duration: '42 min',
      status: 'on-time',
    },
    {
      id: '9',
      date: 'Apr 22, 2026',
      time: '2:15 PM',
      route: 'Zone O → Warehouse P',
      stops: 5,
      duration: '48 min',
      status: 'on-time',
    },
    {
      id: '10',
      date: 'Apr 21, 2026',
      time: '10:00 AM',
      route: 'Point Q → Center R',
      stops: 3,
      duration: '33 min',
      status: 'delayed',
      delayReason: 'Vehicle maintenance',
      aiResolution: 'AI rescheduled deliveries',
    },
  ];

  const issueLogs: IssueLog[] = [
    {
      id: '1',
      date: 'Apr 27, 2026',
      issue: 'Delay at Stop 3',
      resolution: 'Resolved by AI rerouting',
      time: '9:15 AM',
      impact: 'Saved 12 min',
    },
    {
      id: '2',
      date: 'Apr 27, 2026',
      issue: 'Traffic detected on Route 7',
      resolution: 'AI suggested alternative route',
      time: '10:30 AM',
      impact: 'Saved 8 min',
    },
    {
      id: '3',
      date: 'Apr 26, 2026',
      issue: 'Customer not available',
      resolution: 'AI auto-rescheduled delivery',
      time: '2:45 PM',
      impact: 'Prevented 15 min delay',
    },
  ];

  const chartData = timeRange === 'today' 
    ? [
        { label: '8AM', deliveries: 2, onTime: 100 },
        { label: '10AM', deliveries: 3, onTime: 67 },
        { label: '12PM', deliveries: 4, onTime: 75 },
        { label: '2PM', deliveries: 2, onTime: 50 },
        { label: '4PM', deliveries: 3, onTime: 100 },
      ]
    : timeRange === 'week'
    ? [
        { label: 'Mon', deliveries: 8, onTime: 88 },
        { label: 'Tue', deliveries: 6, onTime: 92 },
        { label: 'Wed', deliveries: 9, onTime: 78 },
        { label: 'Thu', deliveries: 7, onTime: 95 },
        { label: 'Fri', deliveries: 8, onTime: 94 },
        { label: 'Sat', deliveries: 4, onTime: 100 },
        { label: 'Sun', deliveries: 3, onTime: 100 },
      ]
    : timeRange === 'month'
    ? [
        { label: 'Week 1', deliveries: 42, onTime: 95 },
        { label: 'Week 2', deliveries: 48, onTime: 92 },
        { label: 'Week 3', deliveries: 51, onTime: 94 },
        { label: 'Week 4', deliveries: 45, onTime: 98 },
      ]
    : [
        { label: 'Apr 1-7', deliveries: 28, onTime: 89 },
        { label: 'Apr 8-14', deliveries: 35, onTime: 94 },
        { label: 'Apr 15-21', deliveries: 32, onTime: 91 },
        { label: 'Apr 22-27', deliveries: 32, onTime: 96 },
      ];

  return (
    <div className="h-full bg-zinc-950 text-white flex flex-col">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                aria-label="Go back"
              >
                <ArrowDown className="w-4 h-4 text-white rotate-90" />
              </button>
            )}
            <div>
              <h1 className="text-lg font-semibold text-white">Performance Summary</h1>
              <p className="text-xs text-zinc-400">Driver History Report</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-zinc-300">Apr 27, 2026</span>
          </div>
        </div>
        
        {/* Time Range Toggle */}
        <div className="mt-3">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => setTimeRange('today')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                timeRange === 'today'
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeRange('week')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                timeRange === 'week'
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                timeRange === 'month'
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                timeRange === 'custom'
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Custom Range
            </button>
          </div>
          
          {/* Custom Date Picker */}
          {showCustomDatePicker && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-zinc-800 rounded-lg p-3 border border-zinc-700"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                    aria-label="Start date"
                    title="Select start date for custom range"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">End Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                    aria-label="End date"
                    title="Select end date for custom range"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  setTimeRange('custom');
                  setShowCustomDatePicker(false);
                }}
                className="w-full mt-3 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-medium text-white transition-colors"
              >
                Apply Custom Range
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          
          {/* Impact Metrics - BIG CARDS */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span className="text-xs text-green-400 font-medium">Time Saved</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">+{currentMetrics.timeSaved}</span>
                <span className="text-sm text-zinc-400">min</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUp className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400">vs avg</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Fuel className="w-5 h-5 text-blue-400" />
                <span className="text-xs text-blue-400 font-medium">Fuel Saved</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">₹{currentMetrics.fuelSaved}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUp className="w-3 h-3 text-blue-400" />
                <span className="text-xs text-blue-400">efficient routing</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-purple-400 font-medium">Deliveries</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">{currentMetrics.deliveriesCompleted}</span>
                <span className="text-sm text-zinc-400">/ {currentMetrics.totalDeliveries}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle className="w-3 h-3 text-purple-400" />
                <span className="text-xs text-purple-400">completed</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-cyan-400" />
                <span className="text-xs text-cyan-400 font-medium">On-Time Rate</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">{currentMetrics.onTimeRate}%</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Award className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-cyan-400">excellent</span>
              </div>
            </motion.div>
          </div>

          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Performance Trend</h3>
              <BarChart3 className="w-4 h-4 text-zinc-400" />
            </div>
            
            {/* Simple Chart Visualization */}
            <div className="space-y-3">
              {chartData.map((data, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 w-12">{data.label}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-zinc-800 rounded-full h-4 relative overflow-hidden">
                      <div 
                        className={`absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ${
                          timeRange === 'today' 
                            ? data.deliveries === 2 ? 'w-2/5' :
                            data.deliveries === 3 ? 'w-3/5' :
                            data.deliveries === 4 ? 'w-4/5' : 'w-full'
                            : timeRange === 'week'
                            ? data.deliveries === 3 ? 'w-3/10' :
                            data.deliveries === 4 ? 'w-4/10' :
                            data.deliveries === 6 ? 'w-6/10' :
                            data.deliveries === 7 ? 'w-7/10' :
                            data.deliveries === 8 ? 'w-8/10' :
                            data.deliveries === 9 ? 'w-9/10' : 'w-full'
                            : timeRange === 'month'
                            ? data.deliveries === 42 ? 'w-8/10' :
                            data.deliveries === 45 ? 'w-9/10' :
                            data.deliveries === 48 ? 'w-10/10' :
                            data.deliveries === 51 ? 'w-full' : 'w-4/5'
                            : data.deliveries === 28 ? 'w-7/10' :
                            data.deliveries === 32 ? 'w-8/10' :
                            data.deliveries === 35 ? 'w-9/10' : 'w-full'
                        }`}
                      />
                    </div>
                    <span className="text-xs text-zinc-300 w-8 text-right">{data.deliveries}</span>
                  </div>
                  <div className={`w-8 text-right text-xs font-medium ${
                    data.onTime === 100 ? 'text-green-400' : 
                    data.onTime >= 80 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {data.onTime}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trip History List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Trip History</h3>
              <Route className="w-4 h-4 text-zinc-400" />
            </div>
            
            <div className="space-y-3">
              {tripHistory.map((trip) => (
                <div key={trip.id} className="bg-zinc-800/50 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      <span className="text-xs text-zinc-300">{trip.date}</span>
                      <span className="text-zinc-500">•</span>
                      <Timer className="w-3 h-3 text-zinc-400" />
                      <span className="text-xs text-zinc-300">{trip.time}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        trip.status === 'on-time' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {trip.status === 'on-time' ? 'On time' : 'Delayed'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      <span className="text-xs text-zinc-300">{trip.route}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                      <span>{trip.stops} stops</span>
                      <span>•</span>
                      <span>{trip.duration}</span>
                    </div>
                    
                    {trip.aiResolution && (
                      <div className="mt-2 p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                        <div className="flex items-center gap-2">
                          <Zap className="w-3 h-3 text-cyan-400" />
                          <span className="text-xs text-cyan-400">{trip.aiResolution}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Issue & Resolution Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">AI Issue Resolution</h3>
              <Activity className="w-4 h-4 text-orange-400" />
            </div>
            
            <div className="space-y-3">
              {issueLogs.map((log) => (
                <div key={log.id} className="bg-zinc-800/30 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 text-orange-400" />
                      <span className="text-xs text-orange-400 font-medium">{log.issue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <Calendar className="w-3 h-3" />
                      <span>{log.date}</span>
                      <span>•</span>
                      <span>{log.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-zinc-300">{log.resolution}</span>
                  </div>
                  <div className="mt-1 text-right">
                    <span className="text-xs text-green-400 font-medium">{log.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Decisions Today */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <DecisionReplay decisions={aiDecisions} />
          </motion.div>

          {/* AI Insights Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">AI Insights Summary</h3>
                <p className="text-xs text-cyan-400">Intelligent optimization</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">Routes optimized</span>
                <span className="text-cyan-400 font-medium">{timeRange === 'today' ? 3 : 18}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">Total time saved</span>
                <span className="text-green-400 font-medium">+{currentMetrics.timeSaved} min</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">Efficiency improvement</span>
                <span className="text-purple-400 font-medium">+{timeRange === 'today' ? 18 : 22}%</span>
              </div>
            </div>
          </motion.div>

          {/* End Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="text-sm font-semibold text-white">Performance Summary</h3>
                <p className="text-xs text-zinc-300 mt-1">
                  You completed {currentMetrics.onTimeRate}% deliveries on time {timeRange === 'today' ? 'today' : 'this week'} 
                  with optimized routing and minimal delays.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
