import { motion } from 'motion/react';
import { Bell, TrendingUp, Clock, Package, Zap, Menu, ArrowLeft } from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';
import { OfflineStatusIndicator } from './OfflineStatusIndicator';

interface Props {
  onStartDelivery: () => void;
  onMenuToggle: () => void;
  onBack?: () => void;
  onViewSyncStatus?: () => void;
}

export function DashboardHomeScreen({ onStartDelivery, onMenuToggle, onBack, onViewSyncStatus }: Props) {
  return (
    <div className="h-full bg-zinc-950 overflow-y-auto overflow-x-hidden">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Hi, Ganesh 👋
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm text-green-400 font-medium">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onViewSyncStatus}
              className="w-12 h-12 rounded-full bg-zinc-900/95 backdrop-blur-lg border border-zinc-800 flex items-center justify-center relative shadow-xl hover:border-cyan-500/50 transition-colors"
              title="View sync status"
            >
              <OfflineStatusIndicator />
            </button>
            <button className="w-12 h-12 rounded-full bg-zinc-900 border border-cyan-500/30 flex items-center justify-center relative" title="Notifications">
              <Bell className="w-5 h-5 text-white" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <button 
              onClick={onMenuToggle}
              className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center"
              title="Menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white mb-1">
                Delay Predicted at Stop 3
              </h3>
              <p className="text-xs text-orange-300">
                +12 min delay expected due to traffic
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/50 rounded-2xl p-4"
          >
            <Package className="w-6 h-6 text-cyan-400 mb-2" />
            <p className="text-3xl font-bold text-white mb-1">8</p>
            <p className="text-xs text-cyan-300">Deliveries</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-2xl p-4"
          >
            <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-3xl font-bold text-white mb-1">92%</p>
            <p className="text-xs text-green-300">On-time</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-2xl p-4"
          >
            <Clock className="w-6 h-6 text-purple-400 mb-2" />
            <p className="text-3xl font-bold text-white mb-1">+18</p>
            <p className="text-xs text-purple-300">Min Saved</p>
          </motion.div>
        </div>

        {/* AI Recommendation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/50 rounded-2xl p-5"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-white">AI Recommendation</h3>
                <span className="px-2 py-0.5 bg-cyan-500/20 rounded text-[10px] font-medium text-cyan-300">
                  92% confident
                </span>
              </div>
              <p className="text-sm text-zinc-300 mb-2">
                Switch to Route B to save 15 minutes
              </p>
              <p className="text-xs text-zinc-400">
                Alternative route avoids heavy traffic on Main St
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-sm font-semibold text-white transition-colors">
              Apply Route
            </button>
            <button className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-zinc-300 transition-colors">
              Dismiss
            </button>
          </div>
        </motion.div>

        {/* Start Delivery Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onStartDelivery}
          className="w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-2xl text-lg font-bold text-white shadow-lg shadow-cyan-500/25 transition-all"
        >
          Start Delivery
        </motion.button>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-400 mb-1">Total Distance</p>
            <p className="text-xl font-bold text-white">42.3 km</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-400 mb-1">Estimated Time</p>
            <p className="text-xl font-bold text-white">3h 20m</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
