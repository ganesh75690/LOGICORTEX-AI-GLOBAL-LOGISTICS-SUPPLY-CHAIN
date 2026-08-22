import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  MessageSquare, 
  Users, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Vote,
  History,
  Play,
  Plus,
  ChevronRight,
  ChevronDown,
  Zap,
  Target,
  Activity,
  Settings,
  X
} from 'lucide-react';
import { DebateEngine } from './DebateEngine';
import {
  Debate,
  DebateMessage,
  Agent,
  AgentAnalysis,
  DebateStatus,
  AgentType
} from '../../types/multiAgentDebate';

/**
 * Multi-Agent AI Debate Dashboard
 * Enterprise UI for AI-powered collaborative decision making
 */
export const MultiAgentDebateDashboard: React.FC = () => {
  const debateEngineRef = React.useRef<DebateEngine | null>(null);
  const [currentDebate, setCurrentDebate] = useState<Debate | null>(null);
  const [debateHistory, setDebateHistory] = useState<Debate[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'debate' | 'history' | 'analytics'>('overview');
  const [selectedMessage, setSelectedMessage] = useState<DebateMessage | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentDetailTab, setAgentDetailTab] = useState<'overview' | 'performance' | 'analysis' | 'collaboration'>('overview');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize debate engine once
    if (!debateEngineRef.current) {
      try {
        debateEngineRef.current = new DebateEngine();
        const agentList = debateEngineRef.current.getAgents();
        console.log('Agents loaded:', agentList);
        setAgents(agentList.map(agent => agent.getAgent()));
        setDebateHistory(debateEngineRef.current.getDebateHistory());
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing agents:', error);
        setIsInitialized(true);
      }
    }
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-slate-400">Loading Multi-Agent Debate Engine...</div>
      </div>
    );
  }

  const startNewDebate = async () => {
    if (!debateEngineRef.current) return;
    
    setIsRunning(true);
    const problem = {
      title: 'Supply Chain Cost Optimization',
      description: 'Analyze opportunities to reduce operational costs while maintaining service quality',
      category: 'cost_optimization',
      severity: 'high',
      context: 'Current operational costs are 12% above budget with opportunities for optimization across transportation, inventory, and operations',
      stakeholders: ['operations', 'finance', 'customers', 'suppliers'],
      milestones: []
    };

    const debate = await debateEngineRef.current.startDebate(problem);
    setCurrentDebate(debate);
    setDebateHistory(debateEngineRef.current.getDebateHistory());
    setIsRunning(false);
    setActiveTab('debate');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] rounded-xl p-6 text-slate-900"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Multi-Agent AI Debate Engine
          </h2>
          <div className="flex gap-2">
            <button className="bg-slate-900/20 hover:bg-slate-900/30 px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
        <p className="text-slate-800 mb-4">
          Enterprise-grade AI decision intelligence with specialized agents collaborating on complex supply chain decisions
        </p>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Active Agents</div>
            <div className="text-2xl font-bold">{agents.length}</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Debates Completed</div>
            <div className="text-2xl font-bold">{debateHistory.length}</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Avg Consensus</div>
            <div className="text-2xl font-bold">
              {debateHistory.length > 0 
                ? Math.round(debateHistory.reduce((sum, d) => sum + d.voting.consensus.consensusScore, 0) / debateHistory.length)
                : 0}%
            </div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Agent Accuracy</div>
            <div className="text-2xl font-bold">87%</div>
          </div>
        </div>
      </motion.div>

      {/* Agent Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Users className="w-5 h-5 text-[#00F5C4]" />
          Specialized AI Agents
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`bg-slate-700/30 border rounded-lg p-4 transition cursor-pointer ${
                selectedAgent?.id === agent.id
                  ? 'border-[#00F5C4] bg-[#00F5C4]/10'
                  : 'border-slate-600 hover:border-[#00F5C4]'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">{agent.avatar}</div>
                <div>
                  <div className="font-semibold text-white text-sm">{agent.name}</div>
                  <div className="text-xs text-slate-400 capitalize">{agent.role}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Confidence</span>
                  <span className="text-[#00F5C4] font-medium">{agent.confidence}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Weight</span>
                  <span className="text-white font-medium">{agent.weight}</span>
                </div>
                <div className="text-xs text-slate-400 mt-2">{agent.specialty}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Selected Agent Details */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedAgent.avatar}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedAgent.name}</h3>
                  <p className="text-slate-400 capitalize">{selectedAgent.role}</p>
                  <p className="text-sm text-[#00F5C4] mt-1">{selectedAgent.specialty}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedAgent(null);
                  setAgentDetailTab('overview');
                }}
                className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Detail Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'overview' as const, label: 'Overview', icon: Users },
                { id: 'performance' as const, label: 'Performance', icon: BarChart3 },
                { id: 'analysis' as const, label: 'Analysis', icon: Brain },
                { id: 'collaboration' as const, label: 'Collaboration', icon: MessageSquare }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAgentDetailTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    agentDetailTab === tab.id
                      ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 font-semibold'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {agentDetailTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-sm text-slate-400 mb-2">Confidence Level</div>
                    <div className="text-3xl font-bold text-[#00F5C4]">{selectedAgent.confidence}%</div>
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-2 rounded-full"
                        style={{ width: `${selectedAgent.confidence}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-sm text-slate-400 mb-2">Voting Weight</div>
                    <div className="text-3xl font-bold text-white">{selectedAgent.weight}</div>
                    <div className="text-xs text-slate-400 mt-2">Influence in consensus</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-sm text-slate-400 mb-2">Risk Tolerance</div>
                    <div className="text-3xl font-bold text-white capitalize">{selectedAgent.characteristics.riskTolerance}</div>
                    <div className="text-xs text-slate-400 mt-2">Decision-making approach</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Characteristics</h4>
                    <div className="space-y-3">
                      <div className="bg-slate-700/30 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Time Horizon</div>
                        <div className="text-sm font-medium text-white capitalize">{selectedAgent.characteristics.timeHorizon}</div>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-3">
                        <div className="text-xs text-slate-400 mb-1">Priority Factors</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedAgent.characteristics.priority.map((priority, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-[#00F5C4]/20 text-[#00F5C4] rounded-full"
                            >
                              {priority}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Recent Performance</h4>
                    <div className="space-y-3">
                      <div className="bg-slate-700/30 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Participation Rate</span>
                          <span className="text-sm font-medium text-[#00F5C4]">100%</span>
                        </div>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Success Rate</span>
                          <span className="text-sm font-medium text-white">{(85 + Math.random() * 10).toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Influence Score</span>
                          <span className="text-sm font-medium text-white">{(selectedAgent.weight * 10).toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {agentDetailTab === 'performance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-sm text-slate-400 mb-2">Total Debates</div>
                    <div className="text-2xl font-bold text-white">{Math.floor(Math.random() * 50) + 20}</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-sm text-slate-400 mb-2">Successful Predictions</div>
                    <div className="text-2xl font-bold text-[#00F5C4]">{Math.floor(Math.random() * 30) + 15}</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-sm text-slate-400 mb-2">Avg Accuracy</div>
                    <div className="text-2xl font-bold text-white">{(selectedAgent.confidence - 5 + Math.random() * 10).toFixed(1)}%</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="text-sm text-slate-400 mb-2">Challenge Success</div>
                    <div className="text-2xl font-bold text-white">{(60 + Math.random() * 30).toFixed(0)}%</div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Performance Trends</h4>
                  <div className="space-y-3">
                    {['Last 7 Days', 'Last 30 Days', 'Last 90 Days'].map((period, index) => (
                      <div key={period} className="flex items-center gap-4">
                        <span className="text-sm text-slate-400 w-24">{period}</span>
                        <div className="flex-1 bg-slate-600 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-3 rounded-full"
                            style={{ width: `${70 + Math.random() * 25}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-white">{(70 + Math.random() * 25).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Strengths</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {getAgentStrengths(selectedAgent.type).map((strength, index) => (
                      <div key={index} className="bg-slate-600/30 rounded-lg p-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#00F5C4]" />
                        <span className="text-sm text-white">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {agentDetailTab === 'analysis' && (
              <div className="space-y-6">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Analysis Focus Areas</h4>
                  <div className="space-y-3">
                    {getAgentAnalysisAreas(selectedAgent.type).map((area, index) => (
                      <div key={index} className="bg-slate-600/30 rounded-lg p-3">
                        <div className="font-medium text-white mb-2">{area.title}</div>
                        <div className="text-sm text-slate-400">{area.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Typical Analysis Pattern</h4>
                  <div className="space-y-2">
                    {[
                      'Identify key factors and constraints',
                      'Assess risks and opportunities',
                      'Calculate cost and time estimates',
                      'Evaluate environmental impact',
                      'Generate recommendation with confidence score',
                      'Provide supporting evidence and metrics'
                    ].map((step, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 rounded-full bg-[#00F5C4]/20 text-[#00F5C4] flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-slate-300">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Decision Criteria</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedAgent.characteristics.priority.map((criterion, index) => (
                      <div key={index} className="bg-slate-600/30 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{criterion}</span>
                          <span className="text-xs text-[#00F5C4]">{(80 + Math.random() * 15).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-2 rounded-full"
                            style={{ width: `${80 + Math.random() * 15}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {agentDetailTab === 'collaboration' && (
              <div className="space-y-6">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Collaboration Style</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-600/30 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Role Type</div>
                      <div className="text-sm font-medium text-white capitalize">{selectedAgent.role}</div>
                    </div>
                    <div className="bg-slate-600/30 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Challenge Frequency</div>
                      <div className="text-sm font-medium text-white">{selectedAgent.role === 'challenger' ? 'High' : 'Moderate'}</div>
                    </div>
                    <div className="bg-slate-600/30 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Response Rate</div>
                      <div className="text-sm font-medium text-white">{(90 + Math.random() * 8).toFixed(0)}%</div>
                    </div>
                    <div className="bg-slate-600/30 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Consensus Builder</div>
                      <div className="text-sm font-medium text-white">{selectedAgent.role === 'synthesizer' ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Strongest Collaborations</h4>
                  <div className="space-y-3">
                    {getCollaboratingAgents(selectedAgent.type).map((collab, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-600/30 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{collab.avatar}</div>
                          <div>
                            <div className="font-medium text-white">{collab.name}</div>
                            <div className="text-xs text-slate-400">{collab.type}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-[#00F5C4]">{collab.score}%</div>
                          <div className="text-xs text-slate-400">Collaboration Score</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Recent Debate Contributions</h4>
                  <div className="space-y-3">
                    {[
                      { type: 'analysis', count: Math.floor(Math.random() * 20) + 10 },
                      { type: 'challenge', count: Math.floor(Math.random() * 10) + 5 },
                      { type: 'response', count: Math.floor(Math.random() * 15) + 8 },
                      { type: 'vote', count: Math.floor(Math.random() * 25) + 15 }
                    ].map((contribution, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-slate-300 capitalize">{contribution.type}</span>
                        <span className="text-sm font-medium text-white">{contribution.count} contributions</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        <button
          onClick={startNewDebate}
          disabled={isRunning}
          className="bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-[#00F5C4] rounded-xl p-6 text-center transition group disabled:opacity-50"
        >
          <Play className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-[#00F5C4] transition" />
          <div className="font-semibold text-slate-300 group-hover:text-[#00F5C4]">Start New Debate</div>
          <div className="text-sm text-slate-500">Initiate multi-agent analysis</div>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className="bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-purple-400 rounded-xl p-6 text-center transition group"
        >
          <History className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-purple-400 transition" />
          <div className="font-semibold text-slate-300 group-hover:text-purple-400">Debate History</div>
          <div className="text-sm text-slate-500">View past decisions</div>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className="bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-orange-400 rounded-xl p-6 text-center transition group"
        >
          <BarChart3 className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-orange-400 transition" />
          <div className="font-semibold text-slate-300 group-hover:text-orange-400">Analytics</div>
          <div className="text-sm text-slate-500">Performance metrics</div>
        </button>
      </motion.div>
    </div>
  );

  const renderDebate = () => (
    <div className="space-y-6">
      {currentDebate ? (
        <>
          {/* Debate Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{currentDebate.title}</h2>
                <p className="text-slate-400">{currentDebate.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentDebate.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  currentDebate.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {currentDebate.status}
                </span>
                {currentDebate.status === 'active' && (
                  <div className="animate-spin w-5 h-5 border-2 border-[#00F5C4] border-t-transparent rounded-full"></div>
                )}
              </div>
            </div>

            {/* Problem Details */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-700/30 rounded-lg p-3">
                <div className="text-xs text-slate-400 mb-1">Category</div>
                <div className="text-sm font-medium text-white capitalize">{currentDebate.problem.category}</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3">
                <div className="text-xs text-slate-400 mb-1">Severity</div>
                <div className="text-sm font-medium text-white capitalize">{currentDebate.problem.severity}</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3">
                <div className="text-xs text-slate-400 mb-1">Deadline</div>
                <div className="text-sm font-medium text-white">
                  {new Date(currentDebate.problem.timeline.deadline).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Consensus Score */}
            {currentDebate.status === 'completed' && (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Consensus Score</span>
                  <span className="text-2xl font-bold text-[#00F5C4]">
                    {Math.round(currentDebate.voting.consensus.consensusScore)}%
                  </span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-2 rounded-full"
                    style={{ width: `${currentDebate.voting.consensus.consensusScore}%` }}
                  />
                </div>
                <div className="text-sm text-slate-400 mt-2">
                  Agreement Level: <span className="text-white capitalize">{currentDebate.voting.consensus.agreementLevel}</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Debate Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <MessageSquare className="w-5 h-5 text-[#00F5C4]" />
              Debate Timeline
            </h3>
            <div className="space-y-4">
              {currentDebate.messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`border border-slate-700/30 rounded-lg p-4 hover:border-[#00F5C4] transition cursor-pointer ${
                    selectedMessage?.id === message.id ? 'border-[#00F5C4] bg-slate-700/30' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getAgentAvatar(message.agentType)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-white">{getAgentName(message.agentType)}</div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            message.messageType === 'analysis' ? 'bg-blue-500/20 text-blue-400' :
                            message.messageType === 'challenge' ? 'bg-orange-500/20 text-orange-400' :
                            message.messageType === 'response' ? 'bg-purple-500/20 text-purple-400' :
                            message.messageType === 'vote' ? 'bg-green-500/20 text-green-400' :
                            message.messageType === 'consensus' ? 'bg-[#00F5C4]/20 text-[#00F5C4]' :
                            'bg-slate-600/30 text-slate-400'
                          }`}>
                            {message.messageType}
                          </span>
                          <span className="text-xs text-slate-400">
                            {Math.round(message.confidence)}% confidence
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-slate-300">{message.content.message}</div>
                      {message.content.data && (
                        <div className="mt-2 text-xs text-slate-400">
                          {JSON.stringify(message.content.data).substring(0, 100)}...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final Decision */}
          {currentDebate.decision && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-[#00F5C4]/20 to-[#00D4A8]/20 border border-[#00F5C4]/30 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <CheckCircle className="w-5 h-5 text-[#00F5C4]" />
                Final Decision
              </h3>
              <div className="text-white mb-4">{currentDebate.decision.finalDecision}</div>
              <div className="text-sm text-slate-300 mb-2">{currentDebate.decision.implementationPlan}</div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Financial Impact</div>
                  <div className="text-lg font-bold text-white">${Math.round(currentDebate.decision.estimatedImpact.financial).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Timeline</div>
                  <div className="text-lg font-bold text-white">{currentDebate.decision.estimatedImpact.operational}h</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Sustainability</div>
                  <div className="text-lg font-bold text-[#00F5C4]">{Math.round(currentDebate.decision.estimatedImpact.environmental)}%</div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <div className="text-center py-12 text-slate-400">
          <Brain className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <p className="text-lg">No active debate</p>
          <p className="text-sm">Start a new debate to see AI agents collaborate on decisions</p>
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <History className="w-5 h-5 text-[#00F5C4]" />
          Debate History
        </h3>
        {debateHistory.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No debate history available
          </div>
        ) : (
          <div className="space-y-3">
            {debateHistory.map((debate) => (
              <div
                key={debate.id}
                className="border border-slate-700/30 rounded-lg p-4 hover:border-[#00F5C4] transition cursor-pointer"
                onClick={() => setCurrentDebate(debate)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{debate.title}</div>
                    <div className="text-sm text-slate-400">{debate.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      debate.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {debate.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      {Math.round(debate.voting.consensus.consensusScore)}% consensus
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <BarChart3 className="w-5 h-5 text-[#00F5C4]" />
          Agent Performance Analytics
        </h3>
        <div className="space-y-4">
          {agents.map((agent) => (
            <div key={agent.id} className="border border-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">{agent.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{agent.name}</div>
                  <div className="text-sm text-slate-400">{agent.specialty}</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Confidence</div>
                  <div className="text-sm font-medium text-[#00F5C4]">{agent.confidence}%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Influence</div>
                  <div className="text-sm font-medium text-white">{(agent.weight * 10).toFixed(1)}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Success Rate</div>
                  <div className="text-sm font-medium text-white">{(85 + Math.random() * 10).toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Participation</div>
                  <div className="text-sm font-medium text-white">100%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const getAgentAvatar = (type: AgentType): string => {
    const avatars: { [key in AgentType]: string } = {
      demand: '📊',
      inventory: '📦',
      finance: '💰',
      route: '🚚',
      risk: '⚠️',
      procurement: '🛒',
      sustainability: '🌱',
      operations: '⚙️'
    };
    return avatars[type] || '🤖';
  };

  const getAgentName = (type: AgentType): string => {
    const names: { [key in AgentType]: string } = {
      demand: 'Demand Analyzer',
      inventory: 'Inventory Optimizer',
      finance: 'Financial Analyst',
      route: 'Route Optimizer',
      risk: 'Risk Manager',
      procurement: 'Procurement Specialist',
      sustainability: 'Sustainability Officer',
      operations: 'Operations Manager'
    };
    return names[type] || 'AI Agent';
  };

  const getAgentStrengths = (type: AgentType): string[] => {
    const strengths: { [key in AgentType]: string[] } = {
      demand: [
        'Advanced demand forecasting',
        'Customer behavior analysis',
        'Market trend identification',
        'Seasonal pattern recognition'
      ],
      inventory: [
        'Optimal stock level calculation',
        'Warehouse capacity optimization',
        'Reorder point automation',
        'Stockout prevention'
      ],
      finance: [
        'Cost-benefit analysis',
        'ROI calculation',
        'Budget optimization',
        'Financial risk assessment'
      ],
      route: [
        'Dynamic route optimization',
        'Traffic pattern analysis',
        'Fuel efficiency planning',
        'Delivery time estimation'
      ],
      risk: [
        'Risk identification',
        'Mitigation strategy development',
        'Contingency planning',
        'Compliance monitoring'
      ],
      procurement: [
        'Supplier evaluation',
        'Cost negotiation',
        'Quality assurance',
        'Supply chain diversification'
      ],
      sustainability: [
        'Carbon footprint calculation',
        'Energy efficiency analysis',
        'Waste reduction strategies',
        'Green technology assessment'
      ],
      operations: [
        'Process optimization',
        'Workflow automation',
        'Resource allocation',
        'Efficiency improvement'
      ]
    };
    return strengths[type] || [];
  };

  const getAgentAnalysisAreas = (type: AgentType): any[] => {
    const areas: { [key in AgentType]: any[] } = {
      demand: [
        { title: 'Market Demand Analysis', description: 'Analyzes historical demand patterns, seasonal trends, and market conditions to forecast future demand' },
        { title: 'Customer Behavior', description: 'Studies customer purchasing patterns, preferences, and satisfaction metrics' },
        { title: 'Competitive Analysis', description: 'Evaluates competitor activities and market positioning' }
      ],
      inventory: [
        { title: 'Stock Level Optimization', description: 'Calculates optimal inventory levels based on demand forecasts and lead times' },
        { title: 'Warehouse Management', description: 'Optimizes storage layout and picking processes' },
        { title: 'Reorder Point Calculation', description: 'Determines optimal reorder points to prevent stockouts' }
      ],
      finance: [
        { title: 'Cost Analysis', description: 'Analyzes operational costs and identifies optimization opportunities' },
        { title: 'ROI Calculation', description: 'Calculates return on investment for various initiatives' },
        { title: 'Budget Planning', description: 'Develops and monitors budget allocations' }
      ],
      route: [
        { title: 'Route Optimization', description: 'Calculates optimal delivery routes considering traffic, distance, and time windows' },
        { title: 'Transportation Planning', description: 'Plans efficient transportation strategies' },
        { title: 'Delivery Estimation', description: 'Estimates delivery times and reliability' }
      ],
      risk: [
        { title: 'Risk Assessment', description: 'Identifies and evaluates potential risks across the supply chain' },
        { title: 'Mitigation Planning', description: 'Develops strategies to mitigate identified risks' },
        { title: 'Contingency Planning', description: 'Creates backup plans for critical scenarios' }
      ],
      procurement: [
        { title: 'Supplier Evaluation', description: 'Assesses supplier performance and reliability' },
        { title: 'Cost Optimization', description: 'Identifies cost reduction opportunities in procurement' },
        { title: 'Quality Assurance', description: 'Ensures quality standards are met across suppliers' }
      ],
      sustainability: [
        { title: 'Carbon Footprint', description: 'Calculates and tracks carbon emissions across operations' },
        { title: 'Energy Efficiency', description: 'Identifies opportunities to reduce energy consumption' },
        { title: 'Waste Reduction', description: 'Develops strategies to minimize waste generation' }
      ],
      operations: [
        { title: 'Process Optimization', description: 'Identifies inefficiencies and suggests improvements' },
        { title: 'Workflow Automation', description: 'Recommends automation opportunities' },
        { title: 'Resource Allocation', description: 'Optimizes resource distribution across operations' }
      ]
    };
    return areas[type] || [];
  };

  const getCollaboratingAgents = (type: AgentType): any[] => {
    const avatars: { [key in AgentType]: string } = {
      demand: '📊',
      inventory: '📦',
      finance: '💰',
      route: '🚚',
      risk: '⚠️',
      procurement: '🛒',
      sustainability: '🌱',
      operations: '⚙️'
    };

    const names: { [key in AgentType]: string } = {
      demand: 'Demand Analyzer',
      inventory: 'Inventory Optimizer',
      finance: 'Financial Analyst',
      route: 'Route Optimizer',
      risk: 'Risk Manager',
      procurement: 'Procurement Specialist',
      sustainability: 'Sustainability Officer',
      operations: 'Operations Manager'
    };

    // Return 3 random agents excluding the current one
    const allTypes: AgentType[] = ['demand', 'inventory', 'finance', 'route', 'risk', 'procurement', 'sustainability', 'operations'];
    const otherTypes = allTypes.filter(t => t !== type);
    const selectedTypes = otherTypes.sort(() => Math.random() - 0.5).slice(0, 3);

    return selectedTypes.map(t => ({
      type: t,
      name: names[t],
      avatar: avatars[t],
      score: Math.floor(70 + Math.random() * 25)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Multi-Agent AI Debate Engine</h1>
        <p className="text-slate-400">Enterprise-grade AI decision intelligence with specialized collaborative agents</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'overview' as const, label: 'Overview', icon: Users },
          { id: 'debate' as const, label: 'Active Debate', icon: MessageSquare },
          { id: 'history' as const, label: 'History', icon: History },
          { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 font-semibold'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/30'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isRunning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700">
              <div className="animate-spin w-12 h-12 border-4 border-[#00F5C4] border-t-transparent rounded-full mx-auto mb-4"></div>
              <div className="text-lg font-semibold mb-2 text-white">Debate in Progress</div>
              <div className="text-slate-400">AI agents are analyzing and collaborating...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'debate' && renderDebate()}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default MultiAgentDebateDashboard;
