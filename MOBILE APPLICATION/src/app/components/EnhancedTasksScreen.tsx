import { Package, MapPin, Clock, CheckCircle2, Circle, AlertCircle, Menu, ArrowLeft, Navigation, Zap, Phone, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { MobileStatusBar } from './MobileStatusBar';

interface Task {
  id: string;
  address: string;
  customer: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'current' | 'completed' | 'failed';
  eta: string;
  packages: number;
  notes?: string;
  phone?: string;
  photoRequired?: boolean;
  signatureRequired?: boolean;
  riskLevel?: 'low' | 'medium' | 'high';
}

interface Props {
  onMenuToggle: () => void;
  onBack?: () => void;
}

export function EnhancedTasksScreen({ onMenuToggle, onBack }: Props) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      address: '1234 Oak St, Apt 5B',
      customer: 'Sarah Johnson',
      priority: 'high',
      status: 'completed',
      eta: 'Completed',
      packages: 2,
      phone: '+91 98765 43210',
      photoRequired: true,
      signatureRequired: true,
    },
    {
      id: '2',
      address: '5678 Elm Ave',
      customer: 'Michael Chen',
      priority: 'high',
      status: 'current',
      eta: '2 min away',
      packages: 1,
      notes: 'Call on arrival',
      phone: '+91 87654 32109',
      photoRequired: false,
      signatureRequired: true,
      riskLevel: 'medium',
    },
    {
      id: '3',
      address: '9012 Pine Rd',
      customer: 'Emma Davis',
      priority: 'medium',
      status: 'pending',
      eta: '12 min',
      packages: 3,
      phone: '+91 76543 21098',
      photoRequired: true,
      signatureRequired: false,
      riskLevel: 'high',
    },
    {
      id: '4',
      address: '3456 Maple Dr',
      customer: 'Robert Wilson',
      priority: 'low',
      status: 'pending',
      eta: '25 min',
      packages: 1,
      notes: 'Leave at door',
      phone: '+91 65432 10987',
      photoRequired: false,
      signatureRequired: false,
    },
    {
      id: '5',
      address: '7890 Cedar Ln',
      customer: 'Lisa Anderson',
      priority: 'medium',
      status: 'pending',
      eta: '35 min',
      packages: 2,
      phone: '+91 54321 09876',
      photoRequired: true,
      signatureRequired: true,
      riskLevel: 'low',
    },
  ]);

  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [completionSteps, setCompletionSteps] = useState({
    photoTaken: false,
    signatureCollected: false,
    customerNotified: false,
  });

  const completeTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setShowCompleteModal(true);
      setCompletionSteps({
        photoTaken: false,
        signatureCollected: false,
        customerNotified: false,
      });
    }
  };

  const markAsCompleted = () => {
    if (selectedTask) {
      setTasks(prev => prev.map(task =>
        task.id === selectedTask.id ? { ...task, status: 'completed' as const, eta: 'Completed' } : 
        task.status === 'pending' && task.id !== selectedTask.id ? { ...task, status: 'current' as const } : task
      ));
      
      // Move to next task automatically
      const nextTask = tasks.find(t => t.status === 'pending' && t.id !== selectedTask.id);
      if (nextTask) {
        setTasks(prev => prev.map(task =>
          task.id === nextTask.id ? { ...task, status: 'current' as const } : task
        ));
      }
      
      setShowCompleteModal(false);
      setSelectedTask(null);
    }
  };

  const failTask = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status: 'failed' as const } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500/10 border-red-500/30';
      case 'medium': return 'bg-orange-500/10 border-orange-500/30';
      default: return 'transparent';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2;
      case 'current': return AlertCircle;
      case 'failed': return AlertCircle;
      default: return Circle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'current': return 'text-cyan-400';
      case 'failed': return 'text-red-400';
      default: return 'text-zinc-600';
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const currentTask = tasks.find(t => t.status === 'current');

  return (
    <div className="h-full bg-zinc-950 text-white overflow-y-auto overflow-x-hidden">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900/80 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
            )}
            <button 
              onClick={onMenuToggle}
              className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
              title="Menu"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>
            <h2 className="font-semibold text-cyan-400">Smart Tasks</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-bold text-white">{completedTasks}/{tasks.length}</p>
              <p className="text-xs text-zinc-400">Completed</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 pb-20">
        {/* Current Task Focus */}
        {currentTask && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-sm font-semibold text-cyan-300">Current Stop</span>
              </div>
              <span className="text-xs text-cyan-400">{currentTask.eta}</span>
            </div>
            
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-1">{currentTask.customer}</h3>
                <p className="text-sm text-zinc-400 mb-2">{currentTask.address}</p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Package className="w-3 h-3 text-zinc-500" />
                    <span className="text-zinc-300">{currentTask.packages} package{currentTask.packages > 1 ? 's' : ''}</span>
                  </div>
                  {currentTask.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-zinc-500" />
                      <span className="text-zinc-300">{currentTask.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* One-Tap Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => completeTask(currentTask.id)}
                className="py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark Delivered
              </button>
              <button
                onClick={() => failTask(currentTask.id)}
                className="py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl font-semibold text-red-400 transition-all"
              >
                Failed Delivery
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-3">
              {currentTask.phone && (
                <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-medium text-zinc-300 transition-colors flex items-center justify-center gap-1">
                  <Phone className="w-3 h-3" />
                  Call Customer
                </button>
              )}
              {currentTask.photoRequired && (
                <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-medium text-zinc-300 transition-colors flex items-center justify-center gap-1">
                  <Camera className="w-3 h-3" />
                  Take Photo
                </button>
              )}
              <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-medium text-zinc-300 transition-colors flex items-center justify-center gap-1">
                <Navigation className="w-3 h-3" />
                Navigate
              </button>
            </div>
          </motion.div>
        )}

        {/* Progress Overview */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Today's Deliveries</h1>
          <p className="text-sm text-zinc-400">{pendingTasks} pending • {tasks.filter(t => t.status === 'failed').length} failed</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-zinc-400 mb-2">
            <span>Daily Progress</span>
            <span>{Math.round((completedTasks / tasks.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedTasks / tasks.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-cyan-400">{pendingTasks}</p>
            <p className="text-xs text-zinc-400">Pending</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-purple-400">
              {tasks.filter(t => t.status === 'current').length}
            </p>
            <p className="text-xs text-zinc-400">Current</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-400">{completedTasks}</p>
            <p className="text-xs text-zinc-400">Done</p>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task, idx) => {
            if (task.status === 'current') return null; // Skip current task as it's shown above
            const StatusIcon = getStatusIcon(task.status);

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-xl p-4 border ${getRiskColor(task.riskLevel)} ${
                  task.status === 'completed'
                    ? 'bg-zinc-900/50 border border-zinc-800'
                    : task.status === 'failed'
                    ? 'bg-red-500/10 border border-red-500/30'
                    : 'bg-zinc-900/80 border border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <StatusIcon
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getStatusColor(task.status)}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`text-sm font-semibold ${
                        task.status === 'completed' ? 'text-zinc-500 line-through' : 
                        task.status === 'failed' ? 'text-red-400' : 
                        'text-white'
                      }`}>
                        {task.customer}
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                        task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {task.priority}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      <p className={`text-xs ${
                        task.status === 'completed' ? 'text-zinc-600' : 'text-zinc-400'
                      }`}>
                        {task.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span className="text-zinc-400">{task.eta}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3 text-zinc-500" />
                        <span className="text-zinc-400">{task.packages} pkg{task.packages > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {task.notes && (
                      <div className="mt-2 px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-300">
                        Note: {task.notes}
                      </div>
                    )}

                    {/* Requirements */}
                    <div className="flex items-center gap-2 mt-2">
                      {task.photoRequired && (
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                          <Camera className="w-3 h-3" />
                          <span>Photo</span>
                        </div>
                      )}
                      {task.signatureRequired && (
                        <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Signature</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {task.status === 'pending' && (
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-medium text-white transition-colors">
                      Navigate
                    </button>
                    <button
                      onClick={() => completeTask(task.id)}
                      className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-xs font-semibold text-white transition-colors"
                    >
                      Complete
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompleteModal && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCompleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Complete Delivery</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 ${completionSteps.photoTaken ? 'bg-green-500 border-green-500' : 'border-zinc-600'} flex items-center justify-center`}>
                    {completionSteps.photoTaken && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-zinc-300">Photo taken</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 ${completionSteps.signatureCollected ? 'bg-green-500 border-green-500' : 'border-zinc-600'} flex items-center justify-center`}>
                    {completionSteps.signatureCollected && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-zinc-300">Signature collected</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 ${completionSteps.customerNotified ? 'bg-green-500 border-green-500' : 'border-zinc-600'} flex items-center justify-center`}>
                    {completionSteps.customerNotified && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-zinc-300">Customer notified</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowCompleteModal(false)}
                  className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={markAsCompleted}
                  className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-semibold text-white transition-colors"
                >
                  Confirm Complete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
