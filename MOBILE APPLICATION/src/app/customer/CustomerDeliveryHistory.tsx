import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Package,
  Search,
  Filter,
  Calendar,
  Menu,
  MapPin
} from 'lucide-react';

interface Props {
  onBack: () => void;
  onMenuToggle: () => void;
}

interface DeliveryHistoryItem {
  id: string;
  date: string;
  status: 'delivered' | 'delayed' | 'completed';
  verificationStatus: 'verified' | 'pending' | 'not_required';
  destination: string;
  confidence?: number;
}

export function CustomerDeliveryHistory({ onBack, onMenuToggle }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'delivered' | 'delayed'>('all');

  const historyItems: DeliveryHistoryItem[] = [
    {
      id: 'LX20481',
      date: '12 Aug 2026',
      status: 'delivered',
      verificationStatus: 'verified',
      destination: 'Home - 123 Sector 45, Gurugram',
      confidence: 98
    },
    {
      id: 'LX20479',
      date: '10 Aug 2026',
      status: 'delivered',
      verificationStatus: 'verified',
      destination: 'Office - Tech Park, Noida',
      confidence: 95
    },
    {
      id: 'LX20460',
      date: '05 Aug 2026',
      status: 'delayed',
      verificationStatus: 'verified',
      destination: 'Home - 123 Sector 45, Gurugram',
      confidence: 87
    },
    {
      id: 'LX20445',
      date: '02 Aug 2026',
      status: 'delivered',
      verificationStatus: 'verified',
      destination: 'Security Desk - Tower A, Delhi',
      confidence: 99
    },
    {
      id: 'LX20430',
      date: '28 Jul 2026',
      status: 'delivered',
      verificationStatus: 'verified',
      destination: 'Home - 123 Sector 45, Gurugram',
      confidence: 96
    }
  ];

  const filteredItems = historyItems.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: DeliveryHistoryItem['status']) => {
    switch (status) {
      case 'delivered': return 'text-green-400';
      case 'delayed': return 'text-yellow-400';
      case 'completed': return 'text-blue-400';
    }
  };

  const getStatusBg = (status: DeliveryHistoryItem['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/10 border-green-500/30';
      case 'delayed': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/10 border-blue-500/30';
    }
  };

  const getStatusLabel = (status: DeliveryHistoryItem['status']) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'delayed': return 'Delayed';
      case 'completed': return 'Completed';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/50 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">DELIVERY HISTORY</h1>
            <p className="text-xs text-zinc-400">View your past deliveries</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search shipments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <button className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center hover:border-cyan-500/50 transition-colors">
            <Filter className="w-5 h-5 text-zinc-400" />
          </button>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2"
        >
          {(['all', 'delivered', 'delayed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-zinc-900/50 text-zinc-400 border border-zinc-800/50 hover:border-zinc-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* History Items */}
        <div className="space-y-3">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className={`bg-zinc-900/50 backdrop-blur-xl border rounded-2xl p-4 ${getStatusBg(item.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">
                      SHIPMENT #{item.id}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                      {item.status === 'delayed' && (
                        <AlertTriangle className="w-3 h-3 text-yellow-400" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  <span className="text-xs text-zinc-400">{item.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-3 h-3 text-zinc-400" />
                <p className="text-xs text-zinc-300">{item.destination}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800/50">
                <div className="flex items-center gap-2">
                  {item.verificationStatus === 'verified' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">Verified</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-yellow-400">Pending</span>
                    </>
                  )}
                </div>
                {item.confidence && (
                  <div className="text-xs text-zinc-400">
                    Confidence: <span className="text-cyan-400 font-medium">{item.confidence}%</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Package className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-sm text-zinc-400">No deliveries found</p>
            <p className="text-xs text-zinc-500 mt-1">Try adjusting your search or filter</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}