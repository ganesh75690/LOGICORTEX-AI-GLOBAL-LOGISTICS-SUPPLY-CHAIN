import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe2, 
  Shield, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  MapPin, 
  Building2, 
  FileText, 
  TreePine, 
  Award, 
  Truck, 
  Zap, 
  Eye, 
  Play, 
  Pause, 
  RefreshCw, 
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Globe,
  Navigation,
  Scan,
  Layers,
  Database,
  Network,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface DigitalTwinSimulation {
  shipmentId: string;
  shipmentName: string;
  origin: string;
  destination: string;
  currentStage: 'preparation' | 'in_transit' | 'border_clearance' | 'inspection' | 'customs_validation' | 'environmental_check' | 'certification_review' | 'final_approval';
  progress: number;
  complianceScore: number;
  predictions: {
    borderDelay: number;
    inspectionProbability: number;
    customsRejection: number;
    missingDocs: number;
    clearanceTime: number;
  };
  issues: SimulationIssue[];
  aiRecommendations: string[];
}

interface SimulationIssue {
  stage: string;
  type: 'missing_document' | 'invalid_data' | 'regulation_violation' | 'environmental_non_compliance' | 'certification_gap';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  solution: string;
  impact: string;
}

const ComplianceDigitalTwin = () => {
  const [selectedSimulation, setSelectedSimulation] = useState<DigitalTwinSimulation | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const simulations: DigitalTwinSimulation[] = [
    {
      shipmentId: 'SHP-001',
      shipmentName: 'Electronic Components - Mumbai to Los Angeles',
      origin: 'Mumbai, India',
      destination: 'Los Angeles, USA',
      currentStage: 'customs_validation',
      progress: 75,
      complianceScore: 94,
      predictions: {
        borderDelay: 0,
        inspectionProbability: 8,
        customsRejection: 2,
        missingDocs: 0,
        clearanceTime: 24
      },
      issues: [],
      aiRecommendations: [
        'All documentation is complete and valid. High probability of smooth customs clearance.',
        'Continue with current timeline. No immediate action required.'
      ]
    },
    {
      shipmentId: 'SHP-002',
      shipmentName: 'Electronic Components - Shanghai to Hamburg',
      origin: 'Shanghai, China',
      destination: 'Hamburg, Germany',
      currentStage: 'border_clearance',
      progress: 60,
      complianceScore: 72,
      predictions: {
        borderDelay: 2,
        inspectionProbability: 25,
        customsRejection: 15,
        missingDocs: 1,
        clearanceTime: 48
      },
      issues: [
        {
          stage: 'certification_review',
          type: 'missing_document',
          severity: 'critical',
          description: 'CE Certificate expired on 2024-07-15',
          solution: 'Renew CE Certificate immediately from notified body',
          impact: 'High probability of customs rejection'
        }
      ],
      aiRecommendations: [
        'URGENT: Renew CE Certificate before shipment reaches EU border.',
        'Estimated delay: 5-7 days for certificate renewal.',
        'Consider alternative route if certificate cannot be renewed in time.'
      ]
    },
    {
      shipmentId: 'SHP-003',
      shipmentName: 'Industrial Equipment - Dubai to London',
      origin: 'Dubai, UAE',
      destination: 'London, UK',
      currentStage: 'preparation',
      progress: 25,
      complianceScore: 65,
      predictions: {
        borderDelay: 3,
        inspectionProbability: 35,
        customsRejection: 20,
        missingDocs: 1,
        clearanceTime: 72
      },
      issues: [
        {
          stage: 'preparation',
          type: 'missing_document',
          severity: 'high',
          description: 'Origin Certificate not uploaded',
          solution: 'Submit Origin Certificate before departure',
          impact: 'UK customs requires Origin Certificate for industrial equipment'
        }
      ],
      aiRecommendations: [
        'Obtain Origin Certificate from issuing authority.',
        'Submit certificate 3-5 days before departure to avoid delays.',
        'Digital format preferred for faster processing.'
      ]
    },
    {
      shipmentId: 'SHP-004',
      shipmentName: 'Medical Devices - India to USA',
      origin: 'Mumbai, India',
      destination: 'Los Angeles, USA',
      currentStage: 'certification_review',
      progress: 50,
      complianceScore: 78,
      predictions: {
        borderDelay: 1,
        inspectionProbability: 15,
        customsRejection: 10,
        missingDocs: 0,
        clearanceTime: 36
      },
      issues: [
        {
          stage: 'certification_review',
          type: 'regulation_violation',
          severity: 'medium',
          description: 'FDA declaration may not meet new September 2024 requirements',
          solution: 'Update FDA declaration to include new required fields',
          impact: 'May require additional inspection or documentation'
        }
      ],
      aiRecommendations: [
        'Review FDA declaration against new requirements.',
        'Update documentation if needed before September 2024.',
        'Contact FDA or compliance expert for guidance.'
      ]
    }
  ];

  const stages = [
    { id: 'preparation', label: 'Preparation', icon: Database },
    { id: 'in_transit', label: 'In Transit', icon: Truck },
    { id: 'border_clearance', label: 'Border Clearance', icon: Shield },
    { id: 'inspection', label: 'Inspection', icon: Scan },
    { id: 'customs_validation', label: 'Customs Validation', icon: Building2 },
    { id: 'environmental_check', label: 'Environmental Check', icon: TreePine },
    { id: 'certification_review', label: 'Certification Review', icon: Award },
    { id: 'final_approval', label: 'Final Approval', icon: CheckCircle }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'preparation': return 'from-blue-500 to-blue-600';
      case 'in_transit': return 'from-cyan-500 to-cyan-600';
      case 'border_clearance': return 'from-purple-500 to-purple-600';
      case 'inspection': return 'from-orange-500 to-orange-600';
      case 'customs_validation': return 'from-red-500 to-red-600';
      case 'environmental_check': return 'from-green-500 to-green-600';
      case 'certification_review': return 'from-yellow-500 to-yellow-600';
      case 'final_approval': return 'from-emerald-500 to-emerald-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const runSimulation = (simulation: DigitalTwinSimulation) => {
    setIsSimulating(true);
    setSimulationProgress(0);
    
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Globe2 className="w-6 h-6 text-cyan-400" />
            Compliance Digital Twin™
          </h2>
          <p className="text-slate-400">Simulate customs clearance, border inspection, and regulatory verification</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-400">AI Simulation Engine</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Simulations */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-cyan-400" />
          Active Digital Twin Simulations
        </h3>
        <div className="space-y-4">
          {simulations.map((simulation, idx) => (
            <motion.div
              key={simulation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedSimulation(simulation)}
              className="p-4 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-slate-400">{simulation.shipmentId}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      simulation.complianceScore >= 90 ? 'bg-green-500/20 text-green-400' :
                      simulation.complianceScore >= 75 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {simulation.complianceScore}% Compliant
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{simulation.shipmentName}</h4>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {simulation.origin}
                    </span>
                    <Navigation className="w-3 h-3" />
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {simulation.destination}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => runSimulation(simulation)}
                    disabled={isSimulating}
                    className="flex items-center gap-2 px-3 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Play className="w-4 h-4" />
                    {isSimulating && selectedSimulation?.shipmentId === simulation.shipmentId ? 'Simulating...' : 'Run Simulation'}
                  </button>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Simulation Progress</span>
                  <span className="text-sm text-white font-medium">{simulation.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full transition-all"
                    style={{ width: `${simulation.progress}%` }}
                  />
                </div>
              </div>

              {/* Stage Progress */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {stages.map((stage, stageIdx) => {
                  const isCurrentStage = stage.id === simulation.currentStage;
                  const isPastStage = stages.findIndex(s => s.id === simulation.currentStage) > stageIdx;
                  return (
                    <div
                      key={stage.id}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border whitespace-nowrap ${
                        isCurrentStage ? `bg-gradient-to-r ${getStageColor(stage.id)} text-white border-transparent` :
                        isPastStage ? 'bg-slate-700 text-slate-400 border-slate-600' :
                        'bg-slate-800 text-slate-500 border-slate-700'
                      }`}
                    >
                      <stage.icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{stage.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Predictions */}
              <div className="grid grid-cols-5 gap-3 mt-4">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Border Delay</div>
                  <div className="text-lg font-bold text-white">{simulation.predictions.borderDelay} days</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Inspection Prob.</div>
                  <div className="text-lg font-bold text-white">{simulation.predictions.inspectionProbability}%</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Rejection Prob.</div>
                  <div className="text-lg font-bold text-white">{simulation.predictions.customsRejection}%</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Missing Docs</div>
                  <div className="text-lg font-bold text-white">{simulation.predictions.missingDocs}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Clearance Time</div>
                  <div className="text-lg font-bold text-white">{simulation.predictions.clearanceTime}h</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Simulation Details Modal */}
      <AnimatePresence>
        {selectedSimulation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSimulation(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Globe2 className="w-6 h-6 text-cyan-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedSimulation.shipmentName}</h3>
                    <p className="text-sm text-slate-400">{selectedSimulation.shipmentId}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSimulation(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Simulation Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Current Stage</div>
                  <div className="text-lg font-bold text-white capitalize">{selectedSimulation.currentStage.replace('_', ' ')}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Compliance Score</div>
                  <div className={`text-lg font-bold ${
                    selectedSimulation.complianceScore >= 90 ? 'text-green-400' :
                    selectedSimulation.complianceScore >= 75 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {selectedSimulation.complianceScore}%
                  </div>
                </div>
              </div>

              {/* Detailed Predictions */}
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-cyan-400" />
                  AI Predictions
                </h4>
                <div className="grid grid-cols-5 gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selectedSimulation.predictions.borderDelay}</div>
                    <div className="text-xs text-slate-400">Border Delay (days)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selectedSimulation.predictions.inspectionProbability}%</div>
                    <div className="text-xs text-slate-400">Inspection Prob.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selectedSimulation.predictions.customsRejection}%</div>
                    <div className="text-xs text-slate-400">Rejection Prob.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selectedSimulation.predictions.missingDocs}</div>
                    <div className="text-xs text-slate-400">Missing Docs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{selectedSimulation.predictions.clearanceTime}h</div>
                    <div className="text-xs text-slate-400">Clearance Time</div>
                  </div>
                </div>
              </div>

              {/* Detected Issues */}
              {selectedSimulation.issues.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    Detected Issues
                  </h4>
                  <div className="space-y-2">
                    {selectedSimulation.issues.map((issue, idx) => (
                      <div key={idx} className={`p-3 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-medium text-white">{issue.type.replace('_', ' ')}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            issue.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                            issue.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                            issue.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-1">{issue.description}</p>
                        <p className="text-xs text-slate-400 mb-1">Stage: {issue.stage}</p>
                        <p className="text-xs text-green-400">Solution: {issue.solution}</p>
                        <p className="text-xs text-slate-500">Impact: {issue.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Recommendations */}
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  AI Recommendations
                </h4>
                <div className="space-y-2">
                  {selectedSimulation.aiRecommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-slate-600/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-white">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Run Full Simulation
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComplianceDigitalTwin;