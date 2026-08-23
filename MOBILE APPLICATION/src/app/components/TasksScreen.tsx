import { Package, MapPin, Clock, CheckCircle2, Circle, AlertCircle, Menu, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { MobileStatusBar } from './MobileStatusBar';

interface Task {
  id: string;
  address: string;
  customer: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'current' | 'completed';
  eta: string;
  packages: number;
  notes?: string;
}

interface Props {
  onMenuToggle: () => void;
  onBack?: () => void;
}

export function TasksScreen({ onMenuToggle, onBack }: Props) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      address: '1234 Oak St, Apt 5B',
      customer: 'Sarah Johnson',
      priority: 'high',
      status: 'completed',
      eta: 'Completed',
      packages: 2,
    },
    {
      id: '2',
      address: '5678 Elm Ave',
      customer: 'Michael Chen',
      priority: 'high',
      status: 'current',
      eta: '2:15 PM',
      packages: 1,
      notes: 'Call on arrival',
    },
    {
      id: '3',
      address: '9012 Pine Rd',
      customer: 'Emma Davis',
      priority: 'medium',
      status: 'pending',
      eta: '2:45 PM',
      packages: 3,
    },
    {
      id: '4',
      address: '3456 Maple Dr',
      customer: 'Robert Wilson',
      priority: 'low',
      status: 'pending',
      eta: '3:20 PM',
      packages: 1,
      notes: 'Leave at door',
    },
    {
      id: '5',
      address: '7890 Cedar Ln',
      customer: 'Lisa Anderson',
      priority: 'medium',
      status: 'pending',
      eta: '4:00 PM',
      packages: 2,
    },
  ]);

  const completeTask = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, status: 'completed' as const } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      default:
        return 'text-green-400';
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

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
            <h2 className="font-semibold text-cyan-400">Tasks</h2>
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Today's Deliveries</h1>
          <p className="text-sm text-zinc-400">{pendingTasks} pending</p>
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
            const StatusIcon = task.status === 'completed' ? CheckCircle2 :
                             task.status === 'current' ? AlertCircle : Circle;

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-xl p-4 ${
                  task.status === 'completed'
                    ? 'bg-zinc-900/50 border border-zinc-800'
                    : task.status === 'current'
                    ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/50'
                    : 'bg-zinc-900/80 border border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <StatusIcon
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      task.status === 'completed' ? 'text-green-400' :
                      task.status === 'current' ? 'text-cyan-400' :
                      'text-zinc-600'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`text-sm font-semibold ${
                        task.status === 'completed' ? 'text-zinc-500 line-through' : 'text-white'
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
                  </div>
                </div>

                {task.status === 'current' && (
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

        {/* AI Optimization Suggestion */}
        <div className="mt-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-start gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-1">AI Suggestion</h3>
                <p className="text-xs text-zinc-400">
                  Swapping stops #3 and #4 can save 6 minutes and avoid traffic
                </p>
              </div>
            </div>
            <button className="w-full py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-xs font-semibold text-purple-300 transition-colors">
              Apply Optimization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
