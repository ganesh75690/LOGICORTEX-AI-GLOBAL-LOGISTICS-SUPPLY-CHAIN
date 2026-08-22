import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Search, 
  Clock, 
  Network, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Plus,
  Filter,
  Target,
  BarChart3,
  History,
  Lightbulb,
  ArrowRight,
  X,
  Zap,
  Activity,
  MessageSquare,
  Database,
  Settings
} from 'lucide-react';
import { CognitiveMemoryEngine } from './CognitiveMemoryEngine';
import {
  CognitiveMemory,
  Incident,
  Decision,
  Outcome,
  Lesson,
  MemorySearchQuery,
  CaseRecommendation,
  MemoryTimeline,
  KnowledgeGraph,
  MemoryAnalytics,
  MemoryType
} from '../../types/cognitiveMemory';

/**
 * Cognitive Memory Dashboard
 * Enterprise UI for organizational knowledge management and AI learning
 */
export const CognitiveMemoryDashboard: React.FC = () => {
  const memoryEngineRef = useRef<CognitiveMemoryEngine | null>(null);
  const [memories, setMemories] = useState<CognitiveMemory[]>([]);
  const [analytics, setAnalytics] = useState<MemoryAnalytics | null>(null);
  const [timeline, setTimeline] = useState<MemoryTimeline[]>([]);
  const [knowledgeGraph, setKnowledgeGraph] = useState<KnowledgeGraph | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'search' | 'timeline' | 'graph' | 'recommendations'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<CognitiveMemory | null>(null);
  const [caseRecommendation, setCaseRecommendation] = useState<CaseRecommendation | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize memory engine
    if (!memoryEngineRef.current) {
      try {
        memoryEngineRef.current = new CognitiveMemoryEngine();
        setMemories(memoryEngineRef.current.getAllMemories());
        setAnalytics(memoryEngineRef.current.getAnalytics());
        setTimeline(memoryEngineRef.current.getMemoryTimeline());
        setKnowledgeGraph(memoryEngineRef.current.getKnowledgeGraph());
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing Cognitive Memory Engine:', error);
        setIsInitialized(true);
      }
    }
  }, []);

  const handleSearch = () => {
    if (!memoryEngineRef.current || !searchQuery) return;

    const query: MemorySearchQuery = {
      query: searchQuery,
      minSimilarity: 0.3,
      limit: 10
    };

    const results = memoryEngineRef.current.searchMemories(query);
    setSearchResults(results);
  };

  const handleCaseRecommendation = () => {
    if (!memoryEngineRef.current || !searchQuery) return;

    const recommendation = memoryEngineRef.current.getCaseRecommendations(searchQuery);
    setCaseRecommendation(recommendation);
    setActiveTab('recommendations');
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-slate-400">Loading Cognitive Memory Engine...</div>
      </div>
    );
  }

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
            Cognitive Memory Engine
          </h2>
          <div className="flex gap-2">
            <button className="bg-slate-900/20 hover:bg-slate-900/30 px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
        <p className="text-slate-800 mb-4">
          Organizational knowledge management system that learns from every decision and disruption
        </p>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Total Memories</div>
            <div className="text-2xl font-bold">{analytics?.totalMemories || 0}</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Success Rate</div>
            <div className="text-2xl font-bold">{analytics?.successRate.toFixed(1) || 0}%</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Avg Resolution</div>
            <div className="text-2xl font-bold">{Math.round(analytics?.averageResolutionTime || 0)}h</div>
          </div>
          <div className="bg-slate-900/10 rounded-lg p-4">
            <div className="text-sm text-slate-700">Knowledge Score</div>
            <div className="text-2xl font-bold">92%</div>
          </div>
        </div>
      </motion.div>

      {/* Memory Type Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Database className="w-5 h-5 text-[#00F5C4]" />
          Memory Distribution
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {analytics?.memoriesByType && (
            <>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-sm text-slate-400">Incidents</span>
                </div>
                <div className="text-2xl font-bold text-white">{analytics.memoriesByType.incident}</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-slate-400">Decisions</span>
                </div>
                <div className="text-2xl font-bold text-white">{analytics.memoriesByType.decision}</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-400">Outcomes</span>
                </div>
                <div className="text-2xl font-bold text-white">{analytics.memoriesByType.outcome}</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-slate-400">Lessons</span>
                </div>
                <div className="text-2xl font-bold text-white">{analytics.memoriesByType.lesson}</div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        <button
          onClick={() => setActiveTab('search')}
          className="bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-[#00F5C4] rounded-xl p-6 text-center transition group"
        >
          <Search className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-[#00F5C4] transition" />
          <div className="font-semibold text-slate-300 group-hover:text-[#00F5C4]">Search Memories</div>
          <div className="text-sm text-slate-500">Find similar cases</div>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className="bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-purple-400 rounded-xl p-6 text-center transition group"
        >
          <Clock className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-purple-400 transition" />
          <div className="font-semibold text-slate-300 group-hover:text-purple-400">Memory Timeline</div>
          <div className="text-sm text-slate-500">View history</div>
        </button>

        <button
          onClick={() => setActiveTab('graph')}
          className="bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-orange-400 rounded-xl p-6 text-center transition group"
        >
          <Network className="w-8 h-8 mx-auto mb-2 text-slate-400 group-hover:text-orange-400 transition" />
          <div className="font-semibold text-slate-300 group-hover:text-orange-400">Knowledge Graph</div>
          <div className="text-sm text-slate-500">Explore connections</div>
        </button>
      </motion.div>

      {/* Recent Memories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <History className="w-5 h-5 text-[#00F5C4]" />
          Recent Memories
        </h3>
        <div className="space-y-3">
          {memories.slice(-5).reverse().map((memory) => (
            <div
              key={memory.id}
              onClick={() => setSelectedMemory(memory)}
              className="border border-slate-700/30 rounded-lg p-4 hover:border-[#00F5C4] transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getMemoryIcon(memory.type)}
                  <div>
                    <div className="font-semibold text-white">{memory.title}</div>
                    <div className="text-sm text-slate-400 capitalize">{memory.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    {memory.createdAt.toLocaleDateString()}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderSearch = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Search className="w-5 h-5 text-[#00F5C4]" />
          Semantic Memory Search
        </h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for similar incidents, decisions, or lessons..."
            className="flex-1 px-4 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:border-[#00F5C4] focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Search
          </button>
          <button
            onClick={handleCaseRecommendation}
            className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-600 transition"
          >
            Get Recommendations
          </button>
        </div>
      </motion.div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold mb-4 text-white">Search Results</h3>
          <div className="space-y-3">
            {searchResults.map((result, index) => (
              <div
                key={index}
                onClick={() => setSelectedMemory(result.memory)}
                className="border border-slate-700/30 rounded-lg p-4 hover:border-[#00F5C4] transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getMemoryIcon(result.memory.type)}
                    <div>
                      <div className="font-semibold text-white">{result.memory.title}</div>
                      <div className="text-sm text-slate-400 capitalize">{result.memory.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#00F5C4]">
                      {(result.similarity * 100).toFixed(0)}% similar
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      result.relevance === 'highly_relevant' ? 'bg-green-500/20 text-green-400' :
                      result.relevance === 'relevant' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-slate-600/30 text-slate-400'
                    }`}>
                      {result.relevance}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-slate-400 mb-2">{result.memory.description}</div>
                <div className="flex gap-2">
                  {result.matchReasons.map((reason, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-slate-600/30 text-slate-300 rounded-full">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Clock className="w-5 h-5 text-[#00F5C4]" />
          Memory Timeline
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700"></div>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-10">
                <div className={`absolute left-2 w-4 h-4 rounded-full ${
                  item.memory.type === 'incident' ? 'bg-red-500' :
                  item.memory.type === 'decision' ? 'bg-blue-500' :
                  item.memory.type === 'outcome' ? 'bg-green-500' :
                  'bg-yellow-500'
                }`}></div>
                <div
                  onClick={() => setSelectedMemory(item.memory)}
                  className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getMemoryIcon(item.memory.type)}
                      <div>
                        <div className="font-medium text-white">{item.memory.title}</div>
                        <div className="text-xs text-slate-400 capitalize">{item.memory.type}</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      {item.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm text-slate-300">{item.memory.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderGraph = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Network className="w-5 h-5 text-[#00F5C4]" />
          Knowledge Graph
        </h3>
        <div className="bg-slate-700/30 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <Network className="w-16 h-16 mx-auto mb-4 text-slate-600" />
            <p className="text-slate-400">Knowledge Graph Visualization</p>
            <p className="text-sm text-slate-500 mt-2">
              {knowledgeGraph?.nodes.length || 0} nodes, {knowledgeGraph?.edges.length || 0} connections
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {knowledgeGraph?.nodes.slice(0, 8).map((node, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedMemory(node.data)}
                  className="bg-slate-600/30 rounded-lg p-2 hover:bg-slate-600/50 transition cursor-pointer"
                >
                  <div className="text-xs text-white truncate">{node.label}</div>
                  <div className="text-xs text-slate-400 capitalize">{node.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      {caseRecommendation && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <Lightbulb className="w-5 h-5 text-[#00F5C4]" />
              Case Recommendations
            </h3>
            <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
              <div className="text-sm text-slate-400 mb-2">Current Situation</div>
              <div className="text-white">{caseRecommendation.currentIncident}</div>
            </div>
            <div className="bg-gradient-to-r from-[#00F5C4]/20 to-[#00D4A8]/20 border border-[#00F5C4]/30 rounded-lg p-4 mb-4">
              <div className="text-sm text-slate-400 mb-2">Overall Recommendation</div>
              <div className="text-white mb-2">{caseRecommendation.overallRecommendation}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Confidence:</span>
                <span className="text-[#00F5C4] font-bold">{(caseRecommendation.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          </motion.div>

          {/* Similar Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold mb-4 text-white">Similar Historical Cases</h3>
            <div className="space-y-4">
              {caseRecommendation.similarCases.map((caseItem, index) => (
                <div
                  key={index}
                  className="border border-slate-700/30 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <div>
                        <div className="font-semibold text-white">{caseItem.incident.title}</div>
                        <div className="text-sm text-slate-400">{caseItem.incident.description}</div>
                      </div>
                    </div>
                    <span className="text-[#00F5C4] font-bold">{(caseItem.similarity * 100).toFixed(0)}% similar</span>
                  </div>
                  {caseItem.decision && (
                    <div className="bg-slate-700/30 rounded-lg p-3 mb-2">
                      <div className="text-sm text-slate-400 mb-1">Decision Taken</div>
                      <div className="text-white text-sm">{caseItem.decision.action.description}</div>
                    </div>
                  )}
                  {caseItem.outcome && (
                    <div className="bg-slate-700/30 rounded-lg p-3">
                      <div className="text-sm text-slate-400 mb-1">Outcome</div>
                      <div className={`text-sm font-medium ${
                        caseItem.outcome.outcomeStatus === 'success' ? 'text-green-400' :
                        caseItem.outcome.outcomeStatus === 'partial' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {caseItem.outcome.outcomeStatus}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recommended Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold mb-4 text-white">Recommended Actions</h3>
            <div className="space-y-3">
              {caseRecommendation.recommendedActions.map((action, index) => (
                <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-medium">{action.action}</div>
                    <span className="text-[#00F5C4] text-sm">{(action.confidence * 100).toFixed(0)}% confidence</span>
                  </div>
                  <div className="text-sm text-slate-400 mb-2">Source: {action.source}</div>
                  <div className="text-sm text-slate-300">{action.reasoning}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lessons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold mb-4 text-white">Relevant Lessons</h3>
            <div className="space-y-3">
              {caseRecommendation.lessons.map((lesson, index) => (
                <div key={index} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <div className="font-semibold text-white">{lesson.title}</div>
                  </div>
                  <div className="text-sm text-slate-300 mb-2">{lesson.lesson}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Effectiveness:</span>
                    <span className="text-yellow-400 font-medium">{lesson.effectiveness}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );

  const getMemoryIcon = (type: MemoryType) => {
    const icons = {
      incident: <AlertTriangle className="w-5 h-5 text-red-400" />,
      decision: <Target className="w-5 h-5 text-blue-400" />,
      outcome: <CheckCircle className="w-5 h-5 text-green-400" />,
      lesson: <Lightbulb className="w-5 h-5 text-yellow-400" />
    };
    return icons[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Cognitive Memory Engine</h1>
        <p className="text-slate-400">Organizational knowledge management and AI learning from past decisions</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'overview' as const, label: 'Overview', icon: Database },
          { id: 'search' as const, label: 'Search', icon: Search },
          { id: 'timeline' as const, label: 'Timeline', icon: Clock },
          { id: 'graph' as const, label: 'Knowledge Graph', icon: Network },
          { id: 'recommendations' as const, label: 'Recommendations', icon: Lightbulb }
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

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'search' && renderSearch()}
        {activeTab === 'timeline' && renderTimeline()}
        {activeTab === 'graph' && renderGraph()}
        {activeTab === 'recommendations' && renderRecommendations()}
      </div>

      {/* Memory Detail Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getMemoryIcon(selectedMemory.type)}
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedMemory.title}</h3>
                      <p className="text-sm text-slate-400 capitalize">{selectedMemory.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMemory(null)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="text-white mb-4">{selectedMemory.description}</div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Created</div>
                    <div className="text-sm text-white">{selectedMemory.createdAt.toLocaleDateString()}</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Created By</div>
                    <div className="text-sm text-white">{selectedMemory.createdBy}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedMemory.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-slate-600/30 text-slate-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CognitiveMemoryDashboard;
