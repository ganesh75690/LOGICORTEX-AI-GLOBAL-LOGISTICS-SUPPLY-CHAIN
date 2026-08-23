import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Route, 
  ArrowLeft,
  Menu,
  CheckCircle2,
  XCircle,
  Activity,
  Shield,
  Loader2,
  TrendingUp,
  AlertCircle,
  Navigation,
  User,
  Package,
  Share2
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onAccept: () => void;
  onReview: () => void;
}

interface Incident {
  id: string;
  type: 'traffic' | 'road_closure' | 'delay' | 'vehicle' | 'destination' | 'obstruction' | 'connectivity' | 'exception';
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  detectedAt: string;
  affectedStops: number;
  estimatedDelay: number;
  driverSafety: 'safe' | 'caution' | 'at_risk';
}

interface AlternativeRoute {
  id: string;
  newSequence: string[];
  timeSaved: number;
  confidence: number;
  reasoning: string;
}

export function IncidentResponseScreen({ 
  onMenuToggle, 
  onBack,
  onAccept,
  onReview
}: Props) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [incident, setIncident] = useState<Incident | null>(null);
  const [alternativeRoute, setAlternativeRoute] = useState<AlternativeRoute | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);

  // Simulate incident detection and AI analysis
  useEffect(() => {
    const mockIncident: Incident = {
      id: 'INC-2024-001',
      type: 'traffic',
      severity: 'medium',
      location: 'Highway 101, Mile 42',
      detectedAt: '14:10',
      affectedStops: 3,
      estimatedDelay: 24,
      driverSafety: 'safe'
    };

    const mockAlternative: AlternativeRoute = {
      id: 'ALT-001',
      newSequence: ['Stop 1', 'Stop 3', 'Stop 2', 'Stop 4'],
      timeSaved: 18,
      confidence: 94,
      reasoning: 'Reordering stops minimizes delay while maintaining delivery priorities and time windows.'
    };

    // Simulate analysis steps
    const analysisSteps = [
      { progress: 20, message: 'Detecting incident type...' },
      { progress: 40, message: 'Analyzing impact on route...' },
      { progress: 60, message: 'Evaluating alternatives...' },
      { progress: 80, message: 'Calculating new ETA...' },
      { progress: 100, message: 'Generating response plan...' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < analysisSteps.length) {
        const step = analysisSteps[currentStep];
        setAnalysisProgress(step.progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setIncident(mockIncident);
        setAlternativeRoute(mockAlternative);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = () => {
    if (!incident) return 'text-zinc-400';
    switch (incident.severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
    }
  };

  const getSeverityBg = () => {
    if (!incident) return 'bg-zinc-500/10 border-zinc-500/30';
    switch (incident.severity) {
      case 'critical': return 'bg-red-500/10 border-red-500/30';
      case 'high': return 'bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'bg-blue-500/10 border-blue-500/30';
    }
  };

  const getSafetyColor = () => {
    if (!incident) return 'text-zinc-400';
    switch (incident.driverSafety) {
      case 'safe': return 'text-green-400';
      case 'caution': return 'text-yellow-400';
      case 'at_risk': return 'text-red-400';
    }
  };

  return (
    <div className="size-full flex flex-col bg-zinc-950">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Incident Response</h1>
            <p className="text-xs text-zinc-400">Autonomous Response Engine</p>
          </div>
        </div>
        <button 
          onClick={onMenuToggle}
          className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Analysis Progress */}
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 text-center"
          >
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">AI Analyzing Incident</h3>
            <p className="text-sm text-zinc-400 mb-4">
              {analysisProgress < 20 ? 'Detecting incident type...' :
               analysisProgress < 40 ? 'Analyzing impact on route...' :
               analysisProgress < 60 ? 'Evaluating alternatives...' :
               analysisProgress < 80 ? 'Calculating new ETA...' :
               'Generating response plan...'}
            </p>
            
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${analysisProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        {/* Incident Detected */}
        {!isAnalyzing && incident && (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-xl border ${getSeverityBg()} rounded-2xl p-4`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${getSeverityBg()} flex items-center justify-center`}>
                    <AlertTriangle className={`w-6 h-6 ${getSeverityColor()}`} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">INCIDENT DETECTED</h2>
                    <p className={`text-sm font-semibold ${getSeverityColor()}`}>
                      {incident.type.toUpperCase()} • {incident.severity.toUpperCase()}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-zinc-400">{incident.detectedAt}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-800/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-400 mb-1">Location</p>
                  <p className="text-sm text-white font-medium">{incident.location}</p>
                </div>
                <div className="bg-zinc-800/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-400 mb-1">Estimated Delay</p>
                  <p className="text-sm text-white font-medium">{incident.estimatedDelay} min</p>
                </div>
                <div className="bg-zinc-800/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-400 mb-1">Affected Stops</p>
                  <p className="text-sm text-white font-medium">{incident.affectedStops}</p>
                </div>
                <div className="bg-zinc-800/30 rounded-xl p-3">
                  <p className="text-xs text-zinc-400 mb-1">Driver Safety</p>
                  <p className={`text-sm font-medium ${getSafetyColor()}`}>
                    {incident.driverSafety === 'safe' ? '✓ Safe' :
                     incident.driverSafety === 'caution' ? '⚠ Caution' : '⚠ At Risk'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Incident Intelligence */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
            >
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Incident Intelligence
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
                  <span className="text-xs text-zinc-400">Current Location</span>
                  <span className="text-sm text-white">Mile 38, Highway 101</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
                  <span className="text-xs text-zinc-400">Affected Shipment</span>
                  <span className="text-sm text-white">SHP-20481</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
                  <span className="text-xs text-zinc-400">Remaining Stops</span>
                  <span className="text-sm text-white">4</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-zinc-400">Current ETA</span>
                  <span className="text-sm text-white">16:34 (original: 16:10)</span>
                </div>
              </div>
            </motion.div>

            {/* AI Response Analysis */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
            >
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                AI Response Analysis
              </h3>

              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
                  <span>Driver location safe for alternative routing</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
                  <span>Stop 3 can be delivered before Stop 2 without violating time windows</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
                  <span>Vehicle constraints compatible with alternative route</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5" />
                  <span>Safety conditions acceptable for rerouting</span>
                </div>
              </div>
            </motion.div>

            {/* New Mission Plan */}
            {alternativeRoute && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-cyan-500/10 to-green-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4"
              >
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  NEW MISSION PLAN
                </h3>

                {/* Original vs New Route */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-zinc-400 mb-2">Original</p>
                    <div className="space-y-1">
                      {['Stop 1', 'Stop 2', 'Stop 3', 'Stop 4'].map((stop, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                          <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                          <span>{stop}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-zinc-400 mb-2">Optimized</p>
                    <div className="space-y-1">
                      {alternativeRoute.newSequence.map((stop, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                          <span>{stop}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800/30 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Expected time saved</span>
                    <span className="text-lg font-bold text-green-400">+{alternativeRoute.timeSaved} min</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <TrendingUp className="w-3 h-3 text-cyan-400" />
                  <span>Route and stop sequence updated</span>
                </div>
              </motion.div>
            )}

            {/* AI Reasoning */}
            {alternativeRoute && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
              >
                <h3 className="text-sm font-semibold text-white mb-2">AI Reasoning</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {alternativeRoute.reasoning}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-zinc-800 rounded-full h-1.5">
                    <div 
                      className="bg-cyan-500 h-1.5 rounded-full"
                      style={{ width: `${alternativeRoute.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-cyan-400">{alternativeRoute.confidence}% confidence</span>
                </div>
              </motion.div>
            )}

            {/* System Notification */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
            >
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-cyan-400" />
                System Notification
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs text-zinc-400">Driver Mobile</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs text-zinc-400">Supplier Web</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs text-zinc-400">Admin Web</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
              </div>

              <div className="mt-4 p-3 bg-zinc-800/30 rounded-xl">
                <p className="text-xs text-zinc-300">
                  "Shipment SHP-20481 ETA changed from 16:20 to 16:34 due to road disruption."
                </p>
              </div>
            </motion.div>

            {/* Timeline Toggle */}
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className="w-full py-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl text-sm text-white transition-colors flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4 text-cyan-400" />
              {showTimeline ? 'Hide' : 'Show'} Incident Timeline
            </button>

            <AnimatePresence>
              {showTimeline && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
                >
                  <h3 className="text-sm font-semibold text-white mb-4">Incident Timeline</h3>
                  
                  <div className="space-y-3">
                    {[
                      { time: '14:10', event: 'Incident detected', icon: AlertCircle },
                      { time: '14:11', event: 'AI analyzed alternatives', icon: Activity },
                      { time: '14:12', event: 'New route generated', icon: Route },
                      { time: '14:12', event: 'Driver notified', icon: User },
                      { time: '14:13', event: 'Supplier notified', icon: Package },
                      { time: '14:14', event: 'Mission resumed', icon: CheckCircle2 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-16 text-xs text-zinc-400 pt-0.5">{item.time}</div>
                        <div className="flex-1 pb-3 border-l border-zinc-800 pl-3">
                          <div className="flex items-center gap-2">
                            <item.icon className="w-3 h-3 text-cyan-400" />
                            <span className="text-xs text-white">{item.event}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Action Buttons */}
      {!isAnalyzing && incident && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 border-t border-zinc-800/50 grid grid-cols-2 gap-3"
        >
          <button
            onClick={onReview}
            className="py-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl text-base font-medium text-white transition-colors"
          >
            Review
          </button>
          <button
            onClick={onAccept}
            className="py-4 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 rounded-2xl text-base font-semibold text-white transition-all"
          >
            Accept
          </button>
        </motion.div>
      )}
    </div>
  );
}