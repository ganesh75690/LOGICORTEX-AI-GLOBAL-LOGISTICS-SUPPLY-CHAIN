import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Users,
  Send,
  Phone,
  Video,
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Truck,
  Package,
  User,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Settings,
  Activity,
  Target,
  Calendar,
  Flag,
  Archive,
  Star,
  Eye,
  EyeOff,
  UserPlus,
  Shield,
  Lock,
  Key,
  Globe,
  Building2
} from 'lucide-react';
import { AdminInviteUsers } from './admin/AdminInviteUsers';

interface TeamMember {
  id: string;
  name: string;
  role: 'admin' | 'driver' | 'supplier' | 'logistics' | 'warehouse' | 'super_admin' | 'operations_manager' | 'supply_chain_analyst' | 'compliance_officer' | 'regional_manager';
  status: 'online' | 'busy' | 'offline' | 'away';
  location: string;
  currentTask: string;
  avatar: string;
  lastSeen: string;
  performance: number;
  contact: {
    phone: string;
    email: string;
  };
  permissions: {
    viewData: boolean;
    editData: boolean;
    approveActions: boolean;
    exportReports: boolean;
    manageSuppliers: boolean;
  };
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'alert' | 'update' | 'request';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'sent' | 'delivered' | 'read';
  attachments?: string[];
  mentions?: string[];
  channelId: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'team' | 'direct' | 'alert' | 'coordination';
  description: string;
  members: string[];
  lastActivity: string;
  unreadCount: number;
  isPinned: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  assignedBy: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  category: 'delivery' | 'pickup' | 'inventory' | 'maintenance' | 'coordination' | 'route-change';
  location?: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

interface CoordinationEvent {
  id: string;
  type: 'handoff' | 'pickup' | 'delivery' | 'emergency' | 'route-change';
  title: string;
  description: string;
  participants: string[];
  location: string;
  timestamp: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export function TeamCoordination() {
  const [activeTab, setActiveTab] = useState<'chat' | 'team' | 'tasks' | 'coordination' | 'analytics' | 'invite'>('chat');
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Smith',
      role: 'driver',
      status: 'online',
      location: 'En Route - I-95 North',
      currentTask: 'Delivery SH-2847',
      avatar: '👨‍✈️',
      lastSeen: 'Active now',
      performance: 94,
      contact: { phone: '+1-555-0123', email: 'john.smith@company.com' },
      permissions: { viewData: true, editData: false, approveActions: false, exportReports: false, manageSuppliers: false }
    },
    {
      id: '2',
      name: 'Sarah Chen',
      role: 'driver',
      status: 'busy',
      location: 'Warehouse A',
      currentTask: 'Loading SH-2848',
      avatar: '👩‍✈️',
      lastSeen: '5 min ago',
      performance: 91,
      contact: { phone: '+1-555-0124', email: 'sarah.chen@company.com' },
      permissions: { viewData: true, editData: false, approveActions: false, exportReports: false, manageSuppliers: false }
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'operations_manager',
      status: 'online',
      location: 'Distribution Center B',
      currentTask: 'Route Planning',
      avatar: '👨‍💼',
      lastSeen: 'Active now',
      performance: 88,
      contact: { phone: '+1-555-0125', email: 'mike.johnson@company.com' },
      permissions: { viewData: true, editData: true, approveActions: true, exportReports: true, manageSuppliers: false }
    },
    {
      id: '4',
      name: 'Lisa Wang',
      role: 'supply_chain_analyst',
      status: 'online',
      location: 'Supplier Office',
      currentTask: 'Order Processing',
      avatar: '👩‍💼',
      lastSeen: 'Active now',
      performance: 96,
      contact: { phone: '+1-555-0126', email: 'lisa.wang@supplier.com' },
      permissions: { viewData: true, editData: false, approveActions: false, exportReports: true, manageSuppliers: false }
    },
    {
      id: '5',
      name: 'Robert Davis',
      role: 'warehouse',
      status: 'away',
      location: 'Warehouse C',
      currentTask: 'Inventory Check',
      avatar: '👨‍🔧',
      lastSeen: '15 min ago',
      performance: 87,
      contact: { phone: '+1-555-0127', email: 'robert.davis@company.com' },
      permissions: { viewData: true, editData: true, approveActions: false, exportReports: false, manageSuppliers: false }
    },
    {
      id: '6',
      name: 'Emily Roberts',
      role: 'super_admin',
      status: 'online',
      location: 'HQ',
      currentTask: 'System Administration',
      avatar: '👩‍💼',
      lastSeen: 'Active now',
      performance: 98,
      contact: { phone: '+1-555-0128', email: 'emily.roberts@company.com' },
      permissions: { viewData: true, editData: true, approveActions: true, exportReports: true, manageSuppliers: true }
    },
    {
      id: '7',
      name: 'David Kim',
      role: 'compliance_officer',
      status: 'online',
      location: 'HQ',
      currentTask: 'Compliance Review',
      avatar: '👨‍💼',
      lastSeen: 'Active now',
      performance: 95,
      contact: { phone: '+1-555-0129', email: 'david.kim@company.com' },
      permissions: { viewData: true, editData: true, approveActions: true, exportReports: true, manageSuppliers: true }
    },
    {
      id: '8',
      name: 'Anna Martinez',
      role: 'regional_manager',
      status: 'online',
      location: 'Europe Office',
      currentTask: 'Regional Operations',
      avatar: '👩‍💼',
      lastSeen: 'Active now',
      performance: 92,
      contact: { phone: '+1-555-0130', email: 'anna.martinez@company.com' },
      permissions: { viewData: true, editData: true, approveActions: true, exportReports: true, manageSuppliers: false }
    }
  ]);

  const [channels] = useState<Channel[]>([
    {
      id: '1',
      name: 'General Team',
      type: 'team',
      description: 'General team communication and updates',
      members: ['1', '2', '3', '4', '5'],
      lastActivity: '2 min ago',
      unreadCount: 3,
      isPinned: true
    },
    {
      id: '2',
      name: 'Driver Coordination',
      type: 'coordination',
      description: 'Driver-to-driver coordination and route updates',
      members: ['1', '2'],
      lastActivity: '5 min ago',
      unreadCount: 1,
      isPinned: true
    },
    {
      id: '3',
      name: 'Emergency Alerts',
      type: 'alert',
      description: 'Critical alerts and emergency communications',
      members: ['1', '2', '3', '4', '5'],
      lastActivity: '1 hour ago',
      unreadCount: 0,
      isPinned: true
    },
    {
      id: '4',
      name: 'Supplier Updates',
      type: 'team',
      description: 'Supplier communications and inventory updates',
      members: ['3', '4', '5'],
      lastActivity: '30 min ago',
      unreadCount: 2,
      isPinned: false
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '3',
      senderName: 'Mike Johnson',
      content: 'Traffic jam detected on I-95. Suggesting alternative route for John.',
      timestamp: '2 min ago',
      type: 'alert',
      priority: 'high',
      status: 'read',
      channelId: '1'
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'John Smith',
      content: 'Thanks Mike! Taking the suggested route. ETA updated to 3:45 PM.',
      timestamp: '1 min ago',
      type: 'update',
      priority: 'medium',
      status: 'read',
      channelId: '1'
    },
    {
      id: '3',
      senderId: '4',
      senderName: 'Lisa Wang',
      content: 'New inventory shipment ready for pickup at Warehouse A.',
      timestamp: '5 min ago',
      type: 'request',
      priority: 'medium',
      status: 'delivered',
      channelId: '4'
    }
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Emergency Route Change',
      description: 'Reroute shipment SH-2847 due to traffic congestion',
      assignedTo: ['1'],
      assignedBy: '3',
      status: 'in-progress',
      priority: 'high',
      dueDate: 'Today, 4:00 PM',
      category: 'route-change',
      location: 'I-95 North',
      progress: 75,
      createdAt: '2 hours ago',
      updatedAt: '30 min ago'
    },
    {
      id: '2',
      title: 'Warehouse Pickup',
      description: 'Pick up inventory shipment from Supplier A',
      assignedTo: ['2'],
      assignedBy: '4',
      status: 'pending',
      priority: 'medium',
      dueDate: 'Today, 5:00 PM',
      category: 'pickup',
      location: 'Warehouse A',
      progress: 0,
      createdAt: '1 hour ago',
      updatedAt: '1 hour ago'
    },
    {
      id: '3',
      title: 'Vehicle Maintenance',
      description: 'Schedule maintenance for Truck #VIN-1234',
      assignedTo: ['5'],
      assignedBy: 'admin',
      status: 'pending',
      priority: 'low',
      dueDate: 'Tomorrow, 10:00 AM',
      category: 'maintenance',
      location: 'Service Center',
      progress: 0,
      createdAt: '3 hours ago',
      updatedAt: '3 hours ago'
    }
  ]);

  const [coordinationEvents] = useState<CoordinationEvent[]>([
    {
      id: '1',
      type: 'handoff',
      title: 'Delivery Handoff - SH-2847',
      description: 'Coordinate handoff from John to Sarah for final delivery segment',
      participants: ['1', '2'],
      location: 'Distribution Center B',
      timestamp: 'Today, 3:30 PM',
      status: 'scheduled',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'emergency',
      title: 'Emergency Route Coordination',
      description: 'Coordinate alternative routes due to major traffic incident',
      participants: ['1', '2', '3'],
      location: 'I-95 North',
      timestamp: 'Today, 2:15 PM',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: '3',
      type: 'pickup',
      title: 'Supplier Pickup Coordination',
      description: 'Coordinate pickup timing with Supplier A',
      participants: ['2', '4'],
      location: 'Warehouse A',
      timestamp: 'Today, 4:00 PM',
      status: 'scheduled',
      priority: 'medium'
    }
  ]);

  const tabs = [
    { id: 'chat' as const, name: 'Chat', icon: MessageSquare, count: channels.reduce((sum, ch) => sum + ch.unreadCount, 0) },
    { id: 'team' as const, name: 'Team', icon: Users, count: teamMembers.filter(m => m.status === 'online').length },
    { id: 'tasks' as const, name: 'Tasks', icon: Target, count: tasks.filter(t => t.status === 'pending').length },
    { id: 'coordination' as const, name: 'Coordination', icon: Activity, count: coordinationEvents.filter(e => e.status === 'in-progress').length },
    { id: 'analytics' as const, name: 'Analytics', icon: Activity, count: 0 },
    { id: 'invite' as const, name: 'Invite', icon: UserPlus, count: 0 }
  ];

  const sendMessage = () => {
    if (message.trim() && selectedChannel) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'admin',
        senderName: 'Admin',
        content: message,
        timestamp: 'Just now',
        type: 'text',
        priority: 'low',
        status: 'sent',
        channelId: selectedChannel.id
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-slate-500';
      default: return 'bg-slate-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedChannel 
    ? messages.filter(msg => msg.channelId === selectedChannel.id)
    : [];

  useEffect(() => {
    if (filteredChannels.length > 0 && !selectedChannel) {
      setSelectedChannel(filteredChannels[0]);
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-400" />
          Team Coordination Center
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Real-time collaboration</span>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-700/50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
              {tab.count > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex gap-4 overflow-hidden"
          >
            {/* Channels Sidebar */}
            <div className="w-64 bg-slate-800/50 rounded-lg border border-slate-700/50 flex flex-col">
              <div className="p-4 border-b border-slate-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search channels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <button className="w-full px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2 text-sm">
                  <Plus className="w-4 h-4" />
                  New Channel
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredChannels.map(channel => (
                  <div
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel)}
                    className={`p-3 cursor-pointer transition-all border-b border-slate-700/30 ${
                      selectedChannel?.id === channel.id
                        ? 'bg-blue-500/10 border-l-2 border-l-blue-400'
                        : 'hover:bg-slate-700/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          channel.type === 'alert' ? 'bg-red-500' :
                          channel.type === 'coordination' ? 'bg-orange-500' :
                          'bg-blue-500'
                        }`} />
                        <span className="text-white text-sm font-medium">{channel.name}</span>
                      </div>
                      {channel.unreadCount > 0 && (
                        <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                          {channel.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs mb-1">{channel.description}</p>
                    <p className="text-slate-500 text-xs">{channel.lastActivity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-800/50 rounded-lg border border-slate-700/50">
              {selectedChannel ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">{selectedChannel.name}</h3>
                        <p className="text-slate-400 text-sm">{selectedChannel.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                          aria-label="Start voice call"
                          title="Start voice call"
                        >
                          <Phone className="w-4 h-4 text-slate-400" />
                        </button>
                        <button 
                          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                          aria-label="Start video call"
                          title="Start video call"
                        >
                          <Video className="w-4 h-4 text-slate-400" />
                        </button>
                        <button 
                          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                          aria-label="More options"
                          title="More options"
                        >
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {currentMessages.map(msg => (
                      <div key={msg.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">👤</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white text-sm font-medium">{msg.senderName}</span>
                            <span className="text-slate-500 text-xs">{msg.timestamp}</span>
                            {msg.priority !== 'low' && (
                              <span className={`px-2 py-0.5 rounded text-xs ${getPriorityColor(msg.priority)}`}>
                                {msg.priority}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-300 text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                        aria-label="Attach file"
                      >
                        <Paperclip className="w-4 h-4 text-slate-400" />
                      </button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 bg-slate-900/50 border border-slate-600/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                      />
                      <button 
                        className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                        aria-label="Add emoji"
                      >
                        <Smile className="w-4 h-4 text-slate-400" />
                      </button>
                      <button 
                        className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                        aria-label="Voice message"
                      >
                        <Mic className="w-4 h-4 text-slate-400" />
                      </button>
                      <button
                        onClick={sendMessage}
                        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                        aria-label="Send message"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">Select a channel to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'team' && (
          <motion.div
            key="team"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map(member => (
                <div key={member.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-2xl">
                          {member.avatar}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${getStatusColor(member.status)}`} />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{member.name}</h3>
                        <p className="text-slate-400 text-sm">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500">Perf:</span>
                      <span className="text-xs font-medium text-green-400">{member.performance}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-xs">Status:</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        member.status === 'online' ? 'bg-green-500/20 text-green-400' :
                        member.status === 'busy' ? 'bg-red-500/20 text-red-400' :
                        member.status === 'away' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-xs">Location:</span>
                      <span className="text-xs text-slate-300">{member.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-xs">Current Task:</span>
                      <span className="text-xs text-blue-400">{member.currentTask}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-xs">Last Seen:</span>
                      <span className="text-xs text-slate-500">{member.lastSeen}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/50">
                    <button className="flex-1 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-1 text-sm">
                      <MessageSquare className="w-3 h-3" />
                      Chat
                    </button>
                    <button className="flex-1 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center justify-center gap-1 text-sm">
                      <Phone className="w-3 h-3" />
                      Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'tasks' && (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto space-y-4"
          >
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{task.title}</h3>
                      <p className="text-slate-400 text-sm mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={`px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded ${
                          task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          task.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                          task.status === 'blocked' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {task.status}
                        </span>
                        <span className="text-slate-400">Due: {task.dueDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-400 mb-1">{task.progress}%</div>
                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-400 rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {task.location && (
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300 text-sm">{task.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Assigned to:</span>
                      <div className="flex -space-x-2">
                        {task.assignedTo.slice(0, 3).map((assigneeId, index) => {
                          const member = teamMembers.find(m => m.id === assigneeId);
                          return member ? (
                            <div key={index} className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs border border-slate-600">
                              {member.avatar}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors text-sm">
                        View Details
                      </button>
                      <button className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'coordination' && (
          <motion.div
            key="coordination"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto space-y-4"
          >
            <div className="space-y-3">
              {coordinationEvents.map(event => (
                <div key={event.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{event.title}</h3>
                      <p className="text-slate-400 text-sm mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className={`px-2 py-1 rounded ${
                          event.type === 'emergency' ? 'bg-red-500/20 text-red-400' :
                          event.type === 'handoff' ? 'bg-blue-500/20 text-blue-400' :
                          event.type === 'pickup' ? 'bg-green-500/20 text-green-400' :
                          event.type === 'delivery' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          {event.type}
                        </span>
                        <span className={`px-2 py-1 rounded ${getPriorityColor(event.priority)}`}>
                          {event.priority}
                        </span>
                        <span className={`px-2 py-1 rounded ${
                          event.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          event.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                          event.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {event.status}
                        </span>
                        <span className="text-slate-400">{event.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Participants:</span>
                      <div className="flex -space-x-2">
                        {event.participants.map((participantId, index) => {
                          const member = teamMembers.find(m => m.id === participantId);
                          return member ? (
                            <div key={index} className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs border border-slate-600">
                              {member.avatar}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700/70 transition-colors text-sm">
                        View Details
                      </button>
                      <button className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm">
                        Coordinate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Team Efficiency</span>
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">87%</p>
                <p className="text-xs text-green-400 mt-1">+5% from last week</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Response Time</span>
                  <Clock className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-white">2.3 min</p>
                <p className="text-xs text-green-400 mt-1">-30s improvement</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Tasks Completed</span>
                  <Target className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white">142</p>
                <p className="text-xs text-green-400 mt-1">+12 this week</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Coordination Events</span>
                  <Activity className="w-4 h-4 text-orange-400" />
                </div>
                <p className="text-2xl font-bold text-white">28</p>
                <p className="text-xs text-yellow-400 mt-1">3 in progress</p>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
              <h3 className="text-white font-medium mb-4">Team Performance Overview</h3>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{member.name}</p>
                        <p className="text-slate-400 text-xs">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 text-sm font-medium">{member.performance}%</p>
                      <p className="text-slate-500 text-xs">Performance</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'invite' && (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto"
          >
            <AdminInviteUsers />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
