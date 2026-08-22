import { Bot, Brain, Zap, TrendingUp, Package, Navigation, AlertTriangle, CheckCircle, XCircle, Users, Shield, DollarSign, Leaf, MessageSquare, Clock, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'processing';
  decisionsToday: number;
  accuracy: number;
  currentTask: string;
  icon: any;
  color: string;
}

interface AgentOpinion {
  agentId: string;
  agentName: string;
  opinion: string;
  confidence: number;
  stance: 'support' | 'oppose' | 'neutral';
}

interface AIDebate {
  id: string;
  decisionRequired: string;
  status: 'analyzing' | 'debating' | 'consensus' | 'pending_approval';
  opinions: AgentOpinion[];
  consensusScore: number;
  finalRecommendation: string;
  recommendationConfidence: number;
  reasoning: string;
}

interface DecisionHistory {
  id: string;
  decision: string;
  recommendation: string;
  confidence: number;
  outcome: 'approved' | 'modified' | 'rejected';
  date: string;
}

const agents: Agent[] = [
  {
    id: 'A1',
    name: 'Supply Agent',
    role: 'Supplier capacity, availability, inventory analysis',
    status: 'active',
    decisionsToday: 847,
    accuracy: 96.3,
    currentTask: 'Analyzing supplier capacity',
    icon: Package,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'A2',
    name: 'Risk Agent',
    role: 'Operational risks, failure probability, disruptions',
    status: 'processing',
    decisionsToday: 234,
    accuracy: 94.7,
    currentTask: 'Analyzing failure probability',
    icon: AlertTriangle,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'A3',
    name: 'Cost Agent',
    role: 'Budget, transportation cost, optimization',
    status: 'active',
    decisionsToday: 1203,
    accuracy: 91.8,
    currentTask: 'Optimizing transportation costs',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'A4',
    name: 'Sustainability Agent',
    role: 'Carbon impact, environmental factors',
    status: 'active',
    decisionsToday: 456,
    accuracy: 97.2,
    currentTask: 'Calculating carbon efficiency',
    icon: Leaf,
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'A5',
    name: 'Security Agent',
    role: 'Compliance, data security, operational safety',
    status: 'idle',
    decisionsToday: 189,
    accuracy: 95.1,
    currentTask: 'Standby mode',
    icon: Shield,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'A6',
    name: 'Learning Engine',
    role: 'Continuous model improvement and adaptation',
    status: 'processing',
    decisionsToday: 2341,
    accuracy: 98.4,
    currentTask: 'Training on new data',
    icon: Brain,
    color: 'from-violet-500 to-purple-500'
  }
];

const aiDebates: AIDebate[] = [
  {
    id: 'DEBATE001',
    decisionRequired: 'Should we switch from Supplier A to Supplier B?',
    status: 'consensus',
    opinions: [
      {
        agentId: 'A1',
        agentName: 'Supply Agent',
        opinion: 'Supplier B has higher production capacity (85% vs 72%)',
        confidence: 92,
        stance: 'support'
      },
      {
        agentId: 'A2',
        agentName: 'Risk Agent',
        opinion: 'Supplier B reduces failure probability by 60%',
        confidence: 88,
        stance: 'support'
      },
      {
        agentId: 'A3',
        agentName: 'Cost Agent',
        opinion: 'Supplier B increases cost by 8%',
        confidence: 95,
        stance: 'oppose'
      },
      {
        agentId: 'A4',
        agentName: 'Sustainability Agent',
        opinion: 'Supplier B has better carbon efficiency (-15% emissions)',
        confidence: 87,
        stance: 'support'
      },
      {
        agentId: 'A5',
        agentName: 'Security Agent',
        opinion: 'Supplier B meets all compliance requirements',
        confidence: 94,
        stance: 'support'
      }
    ],
    consensusScore: 87,
    finalRecommendation: 'Move 40% allocation to Supplier B',
    recommendationConfidence: 91,
    reasoning: 'Higher resilience with acceptable cost impact. 4 out of 5 agents support.'
  },
  {
    id: 'DEBATE002',
    decisionRequired: 'Should we implement route optimization for North America region?',
    status: 'debating',
    opinions: [
      {
        agentId: 'A3',
        agentName: 'Cost Agent',
        opinion: 'Projected cost savings of 12%',
        confidence: 89,
        stance: 'support'
      },
      {
        agentId: 'A2',
        agentName: 'Risk Agent',
        opinion: 'New routes have moderate risk due to weather patterns',
        confidence: 76,
        stance: 'oppose'
      },
      {
        agentId: 'A4',
        agentName: 'Sustainability Agent',
        opinion: 'Will reduce carbon footprint by 8%',
        confidence: 91,
        stance: 'support'
      }
    ],
    consensusScore: 65,
    finalRecommendation: 'Pending analysis',
    recommendationConfidence: 0,
    reasoning: 'Agents currently debating trade-offs between cost savings and risk.'
  }
];

const decisionHistory: DecisionHistory[] = [
  {
    id: 'DH001',
    decision: 'Activate backup supplier for Asia Pacific region',
    recommendation: 'Proceed with Supplier C as backup',
    confidence: 94,
    outcome: 'approved',
    date: '2 hours ago'
  },
  {
    id: 'DH002',
    decision: 'Implement dynamic pricing for shipping',
    recommendation: 'Delay implementation pending cost analysis',
    confidence: 72,
    outcome: 'modified',
    date: '5 hours ago'
  },
  {
    id: 'DH003',
    decision: 'Switch to all-electric fleet for city deliveries',
    recommendation: 'Proceed with gradual transition over 12 months',
    confidence: 88,
    outcome: 'approved',
    date: '1 day ago'
  }
];

const decisionLogs = [
  { 
    id: 'D001', 
    time: '2m ago', 
    agent: 'Route Optimizer', 
    action: 'Suggests Route B for Truck-7', 
    confidence: 94,
    reasoning: 'Traffic congestion detected on Route A, ETA would increase by 45 minutes',
    status: 'executed',
    collaborators: ['Disruption Detector']
  },
  { 
    id: 'D002', 
    time: '5m ago', 
    agent: 'Inventory Manager', 
    action: 'Auto-order 500 units SKU-7845', 
    confidence: 89,
    reasoning: 'Stock levels at 15%, demand spike predicted for next 72 hours',
    status: 'executed',
    collaborators: ['Demand Predictor']
  },
  { 
    id: 'D003', 
    time: '8m ago', 
    agent: 'Resource Allocator', 
    action: 'Reassign Driver-12 to Zone 3', 
    confidence: 91,
    reasoning: 'Zone 3 experiencing driver shortage, Driver-12 has optimal availability',
    status: 'executed',
    collaborators: ['Route Optimizer']
  },
  { 
    id: 'D004', 
    time: '12m ago', 
    agent: 'Disruption Detector', 
    action: 'Issue weather alert for Route R002', 
    confidence: 87,
    reasoning: 'Heavy rainfall detected in Chennai area, visibility reduced to 200m',
    status: 'alert',
    collaborators: ['Route Optimizer', 'Resource Allocator']
  },
  { 
    id: 'D005', 
    time: '15m ago', 
    agent: 'Demand Predictor', 
    action: 'Increase forecast for Region 4', 
    confidence: 92,
    reasoning: 'Historical patterns show 40% increase during festival season',
    status: 'executed',
    collaborators: ['Inventory Manager']
  }
];

const collaborationFlow = [
  { 
    step: 1, 
    trigger: 'Disruption Detector detects traffic',
    involved: ['Disruption Detector', 'Route Optimizer'],
    decision: 'Route Optimizer analyzes alternatives',
    outcome: 'Route B suggested with 94% confidence'
  },
  { 
    step: 2, 
    trigger: 'Demand Predictor forecasts spike',
    involved: ['Demand Predictor', 'Inventory Manager'],
    decision: 'Inventory Manager calculates reorder needs',
    outcome: 'Auto-order placed for 500 units'
  },
  { 
    step: 3, 
    trigger: 'Weather alert issued',
    involved: ['Disruption Detector', 'Resource Allocator', 'Route Optimizer'],
    decision: 'Resource Allocator reroutes vehicles',
    outcome: '3 trucks successfully diverted'
  }
];

export function MultiAgentAI() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedDebate, setSelectedDebate] = useState<string | null>(null);
  const [showCouncilView, setShowCouncilView] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500 animate-pulse';
      case 'idle': return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-6 h-6 text-purple-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-ping" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Multi-Agent AI System</h2>
            <p className="text-xs text-slate-400">Autonomous decision-making network</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-400">{agents.filter(a => a.status === 'active').length}/{agents.length}</div>
            <div className="text-xs text-slate-400">Agents Active</div>
          </div>
          <button
            onClick={() => setShowCouncilView(!showCouncilView)}
            className="flex items-center gap-2 px-3 py-2 bg-[#00F5C4]/10 border border-[#00F5C4]/30 rounded-lg text-[#00F5C4] text-sm hover:bg-[#00F5C4]/20 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            AI Council
          </button>
        </div>
      </div>

      {/* AUTONOMOUS DECISION COUNCIL™ */}
      {showCouncilView && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 space-y-4"
        >
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#00F5C4]" />
                Autonomous Decision Council™
              </h3>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-xs text-slate-400 hover:text-white"
              >
                {showHistory ? 'Hide History' : 'Decision History'}
              </button>
            </div>

            {/* AI Council Discussion */}
            {selectedDebate && (() => {
              const debate = aiDebates.find(d => d.id === selectedDebate);
              if (!debate) return null;
              return (
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <div className="text-sm text-slate-400 mb-1">Decision Required</div>
                    <div className="text-white font-medium">{debate.decisionRequired}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        debate.status === 'consensus' ? 'bg-green-500/20 text-green-400' :
                        debate.status === 'debating' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {debate.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Agent Opinions */}
                  <div className="space-y-2">
                    <div className="text-sm text-slate-400 mb-2">Agent Opinions</div>
                    {debate.opinions.map((opinion, idx) => (
                      <div key={idx} className={`p-3 rounded-lg border ${
                        opinion.stance === 'support' ? 'bg-green-500/10 border-green-500/30' :
                        opinion.stance === 'oppose' ? 'bg-red-500/10 border-red-500/30' :
                        'bg-slate-700/30 border-slate-600/30'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">{opinion.agentName}</span>
                          <span className="text-xs text-slate-400">{opinion.confidence}% confidence</span>
                        </div>
                        <div className="text-xs text-slate-300">{opinion.opinion}</div>
                      </div>
                    ))}
                  </div>

                  {/* Consensus & Recommendation */}
                  {debate.status === 'consensus' && (
                    <div className="bg-[#00F5C4]/10 rounded-lg p-4 border border-[#00F5C4]/30">
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-slate-400 mb-1">Consensus Score</div>
                          <div className="text-lg font-bold text-[#00F5C4]">{debate.consensusScore}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">Recommendation Confidence</div>
                          <div className="text-lg font-bold text-[#00F5C4]">{debate.recommendationConfidence}%</div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="text-xs text-slate-400 mb-1">Final Recommendation</div>
                        <div className="text-white font-medium">{debate.finalRecommendation}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-xs text-slate-400 mb-1">Reasoning</div>
                        <div className="text-sm text-slate-300">{debate.reasoning}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-[#00F5C4] text-slate-900 rounded-lg text-sm font-medium hover:bg-[#00D4A8] transition-colors">
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Approve
                        </button>
                        <button className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors">
                          Modify
                        </button>
                        <button className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors">
                          <XCircle className="w-4 h-4 inline mr-1" />
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Debate Selection */}
            <div className="grid grid-cols-2 gap-2">
              {aiDebates.map((debate) => (
                <button
                  key={debate.id}
                  onClick={() => setSelectedDebate(debate.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedDebate === debate.id
                      ? 'bg-[#00F5C4]/10 border-[#00F5C4]/50'
                      : 'bg-slate-800/30 border-slate-600/30 hover:bg-slate-700/40'
                  }`}
                >
                  <div className="text-sm font-medium text-white mb-1">{debate.decisionRequired}</div>
                  <div className="text-xs text-slate-400">{debate.status.toUpperCase()}</div>
                </button>
              ))}
            </div>

            {/* Decision History */}
            {showHistory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                <div className="text-sm text-slate-400 mb-2">Decision History</div>
                <div className="space-y-2">
                  {decisionHistory.map((decision) => (
                    <div key={decision.id} className="p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white font-medium">{decision.decision}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          decision.outcome === 'approved' ? 'bg-green-500/20 text-green-400' :
                          decision.outcome === 'modified' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {decision.outcome.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mb-1">{decision.recommendation}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Confidence: {decision.confidence}%</span>
                        <span className="text-slate-500">{decision.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {agents.map((agent, idx) => {
          const Icon = agent.icon;
          const isSelected = selectedAgent === agent.id;

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
              className={`relative p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                isSelected
                  ? 'bg-slate-700/50 border-purple-500/50'
                  : 'bg-slate-800/30 border-slate-700/30 hover:bg-slate-700/40'
              }`}
            >
              {/* Gradient Background */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${agent.color} rounded-full blur-3xl opacity-20`} />

              {/* Status Indicator */}
              <div className="absolute top-3 right-3">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
              </div>

              {/* Content */}
              <div className="relative">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-sm font-semibold text-white mb-1">{agent.name}</h3>
                <p className="text-xs text-slate-400 mb-3">{agent.role}</p>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Decisions Today</span>
                    <span className="text-white font-semibold">{agent.decisionsToday.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Accuracy</span>
                    <span className="text-green-400 font-semibold">{agent.accuracy}%</span>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-700/50">
                  <div className="text-xs text-slate-400 mb-1">Current Task</div>
                  <div className="text-xs text-white font-medium">{agent.currentTask}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Decision Logs with Confidence Scores */}
      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="text-sm font-semibold text-white">AI Decision Logs</h3>
          <div className="ml-auto px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-xs text-yellow-400">
            Auto-Decision Mode: ON
          </div>
        </div>

        <div className="space-y-3">
          {decisionLogs.map((decision) => (
            <motion.div
              key={decision.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-3 rounded-lg border ${
                decision.status === 'executed'
                  ? 'bg-green-500/5 border-green-500/20'
                  : 'bg-yellow-500/5 border-yellow-500/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  decision.status === 'executed' ? 'bg-green-400' : 'bg-yellow-400'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{decision.time}</span>
                      <span className="text-xs text-purple-400">{decision.agent}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-slate-500">Confidence:</div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        decision.confidence >= 90 ? 'bg-green-500/20 text-green-400' :
                        decision.confidence >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {decision.confidence}%
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-white mb-2">{decision.action}</div>
                  <div className="text-xs text-slate-400 mb-2">{decision.reasoning}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Collaborators:</span>
                    {decision.collaborators.map((collaborator, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded bg-slate-800/50 border border-slate-600/50 text-blue-400">
                        {collaborator}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Collaboration Flow Visualization */}
      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Agent Collaboration Flow</h3>
          <div className="ml-auto px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs text-purple-400">
            Active Collaborations: 3
          </div>
        </div>

        <div className="space-y-4">
          {collaborationFlow.map((flow, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Connection Line */}
              {idx < collaborationFlow.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent" />
              )}

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {flow.step}
                </div>
                <div className="flex-1 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                  <div className="mb-2">
                    <div className="text-xs text-purple-400 font-medium mb-1">Trigger:</div>
                    <div className="text-sm text-white">{flow.trigger}</div>
                  </div>
                  <div className="mb-2">
                    <div className="text-xs text-blue-400 font-medium mb-1">Involved Agents:</div>
                    <div className="flex gap-1">
                      {flow.involved.map((agent, agentIdx) => (
                        <span key={agentIdx} className="text-xs px-2 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">
                          {agent}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="text-xs text-green-400 font-medium mb-1">Decision:</div>
                    <div className="text-sm text-white">{flow.decision}</div>
                  </div>
                  <div>
                    <div className="text-xs text-yellow-400 font-medium mb-1">Outcome:</div>
                    <div className="text-sm text-green-400">{flow.outcome}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/50">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">4,270</div>
          <div className="text-xs text-slate-400">Decisions Today</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">96.1%</div>
          <div className="text-xs text-slate-400">Avg Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">2.3s</div>
          <div className="text-xs text-slate-400">Avg Response</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">100%</div>
          <div className="text-xs text-slate-400">Autonomous</div>
        </div>
      </div>
    </div>
  );
}
