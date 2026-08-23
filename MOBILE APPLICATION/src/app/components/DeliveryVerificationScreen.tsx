import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  FileText,
  Shield,
  ArrowLeft,
  Menu,
  Activity,
  User,
  Route,
  Loader2,
  Layers
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';
import { deliveryTruthFabricService, DeliveryTrustAssessment } from '../services/deliveryTruthFabricService';
import { evidenceAdapterRegistry } from '../services/evidenceAdapters';
import { offlineStorage } from '../services/offlineStorage';
import { deliveryTruthFabricAuditService } from '../services/deliveryTruthFabricAuditService';
import { supplierWebIntegrationService } from '../services/supplierWebIntegrationService';
import { adminWebIntegrationService } from '../services/adminWebIntegrationService';

interface Props {
  onMenuToggle: () => void;
  onBack: () => void;
  onComplete: () => void;
  shipmentId?: string;
  destination?: string;
}

interface VerificationSignal {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'failed';
  confidence: number;
  details: string;
}

interface DeliveryEvidence {
  type: 'gps' | 'timestamp' | 'driver' | 'pod' | 'route' | 'stop';
  status: 'verified' | 'pending' | 'failed';
  data: any;
}

export function DeliveryVerificationScreen({ 
  onMenuToggle, 
  onBack, 
  onComplete,
  shipmentId = 'SHP-20481',
  destination = 'Mumbai Distribution Center'
}: Props) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [signals, setSignals] = useState<VerificationSignal[]>([]);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [verificationState, setVerificationState] = useState<'verifying' | 'verified' | 'needs_review' | 'exception' | 'failed'>('verifying');
  const [evidence, setEvidence] = useState<DeliveryEvidence[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [podType, setPodType] = useState<'photo' | 'signature' | 'digital' | null>(null);
  const [trustAssessment, setTrustAssessment] = useState<DeliveryTrustAssessment | null>(null);
  const [usingDTF, setUsingDTF] = useState(true); // Toggle for DTF

  // Simulate verification process with DTF integration
  useEffect(() => {
    const runVerification = async () => {
      // Register default evidence adapters
      evidenceAdapterRegistry.registerDefaultAdapters();

      if (usingDTF) {
        // Use Delivery Truth Fabric™
        try {
          const assessment = await deliveryTruthFabricService.assessDeliveryTruth(
            shipmentId,
            shipmentId,
            'DRV-20481',
            'VH-20481',
            false // online mode
          );

          setTrustAssessment(assessment);
          setConfidenceScore(assessment.trustScore);
          setVerificationState(assessment.verificationStatus as any);

          // Log to audit service
          deliveryTruthFabricAuditService.logVerificationDecision(
            assessment,
            'DRV-20481',
            'VH-20481'
          );

          // Send to Supplier Web
          await supplierWebIntegrationService.sendVerificationResult(assessment, shipmentId);

          // Update progress
          setVerificationProgress(100);
          setIsVerifying(false);

          // Map DTF evidence to existing format
          setEvidence(
            Object.entries(assessment.evidenceSummary).map(([type, data]) => ({
              type: type.toLowerCase() as any,
              status: data.status === 'valid' ? 'verified' : 'pending',
              data: { description: data.description, confidence: data.confidence }
            }))
          );

        } catch (error) {
          console.error('DTF verification failed:', error);
          // Fallback to legacy verification
          runLegacyVerification();
        }
      } else {
        // Use legacy verification
        runLegacyVerification();
      }
    };

    const runLegacyVerification = () => {
      const verificationSteps = [
        { progress: 20, signal: { id: '1', name: 'GPS Match', status: 'verified' as const, confidence: 100, details: 'Driver within destination geofence' } },
        { progress: 40, signal: { id: '2', name: 'Stop Match', status: 'verified' as const, confidence: 99, details: 'Current stop matches assigned delivery' } },
        { progress: 60, signal: { id: '3', name: 'Time Match', status: 'verified' as const, confidence: 97, details: 'Arrival within expected time window' } },
        { progress: 80, signal: { id: '4', name: 'Route Match', status: 'verified' as const, confidence: 98, details: 'Route history consistent with plan' } },
        { progress: 90, signal: { id: '5', name: 'POD Evidence', status: 'verified' as const, confidence: 96, details: 'Valid proof of delivery recorded' } },
      ];

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < verificationSteps.length) {
          const step = verificationSteps[currentStep];
          setVerificationProgress(step.progress);
          setSignals(prev => [...prev, step.signal]);
          currentStep++;
        } else {
          clearInterval(interval);
          setIsVerifying(false);
          setConfidenceScore(98);
          setVerificationState('verified');
          
          // Initialize evidence
          setEvidence([
            { type: 'gps', status: 'verified', data: { latitude: 19.0760, longitude: 72.8777, accuracy: 5 } },
            { type: 'timestamp', status: 'verified', data: { arrival: '14:35', verification: '14:42', completion: '14:45' } },
            { type: 'driver', status: 'verified', data: { driverId: 'DRV-1048', authenticated: true } },
            { type: 'route', status: 'verified', data: { consistency: 98, deviations: 0 } },
            { type: 'stop', status: 'verified', data: { match: true, stopId: 'STP-001' } },
          ]);
        }
      }, 800);

      return () => clearInterval(interval);
    };

    runVerification();
  }, [usingDTF, shipmentId]);

  const handlePODSubmit = () => {
    if (!podType) return;
    
    // Simulate POD submission
    setEvidence(prev => 
      prev.map(e => 
        e.type === 'pod' 
          ? { ...e, status: 'verified', data: { type: podType, timestamp: new Date().toISOString() } }
          : e
      )
    );
  };

  const handleCompleteDelivery = () => {
    onComplete();
  };

  const handleReviewException = () => {
    // Handle exception review flow
    console.log('Reviewing exception');
  };

  const getVerificationColor = () => {
    switch (verificationState) {
      case 'verified': return 'text-green-400';
      case 'needs_review': return 'text-yellow-400';
      case 'exception': return 'text-orange-400';
      case 'failed': return 'text-red-400';
      default: return 'text-cyan-400';
    }
  };

  const getVerificationBg = () => {
    switch (verificationState) {
      case 'verified': return 'bg-green-500/10 border-green-500/30';
      case 'needs_review': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'exception': return 'bg-orange-500/10 border-orange-500/30';
      case 'failed': return 'bg-red-500/10 border-red-500/30';
      default: return 'bg-cyan-500/10 border-cyan-500/30';
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
            <h1 className="text-lg font-bold text-white">Delivery Verification</h1>
            <p className="text-xs text-zinc-400">AI-Powered Verification Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUsingDTF(!usingDTF)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              usingDTF 
                ? 'bg-cyan-500/20 text-cyn-400 border border-cyan-500/30' 
                : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            DTF
          </button>
          <button 
            onClick={onMenuToggle}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Shipment Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-zinc-400 mb-1">Shipment ID</p>
              <p className="text-lg font-bold text-white">{shipmentId}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getVerificationBg()} ${getVerificationColor()}`}>
              {verificationState.toUpperCase()}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-xs text-zinc-400">Destination</p>
                <p className="text-sm text-white">{destination}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-xs text-zinc-400">Arrival Time</p>
                <p className="text-sm text-white">14:35</p>
              </div>
            </div>

            {usingDTF && trustAssessment && (
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-xs text-zinc-400">Delivery Trust</p>
                  <p className="text-sm text-cyan-400 font-medium">{trustAssessment.trustScore} / 100</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-xs text-zinc-400">GPS Status</p>
                <p className="text-sm text-green-400">✓ Verified</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Route className="w-4 h-4 text-cyan-400" />
              <div>
                <p className="text-xs text-zinc-400">Stop Status</p>
                <p className="text-sm text-green-400">✓ Match</p>
              </div>
            </div>
          </div>

          {usingDTF && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-800/50">
              <Shield className="w-3 h-3 text-cyan-400" />
              <p className="text-xs text-zinc-400">DELIVERY TRUTH FABRIC™ ACTIVE</p>
            </div>
          )}
        </motion.div>

        {/* Verification Progress */}
        {isVerifying && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Verifying Delivery</h3>
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
            </div>
            
            <div className="w-full bg-zinc-800 rounded-full h-2 mb-4">
              <motion.div 
                className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${verificationProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="space-y-2">
              {signals.map((signal, index) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-white">{signal.name}</span>
                  </div>
                  <span className="text-xs text-zinc-400">{signal.confidence}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Confidence Score */}
        {!isVerifying && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-xl border ${getVerificationBg()} rounded-2xl p-6`}
          >
            <div className="text-center mb-6">
              <p className="text-xs text-zinc-400 mb-2">DELIVERY CONFIDENCE SCORE</p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="text-6xl font-bold text-white mb-2"
              >
                {confidenceScore}%
              </motion.div>
              <p className={`text-sm font-semibold ${getVerificationColor()}`}>
                {verificationState === 'verified' ? 'HIGH CONFIDENCE' : 
                 verificationState === 'needs_review' ? 'MEDIUM CONFIDENCE' :
                 verificationState === 'exception' ? 'LOW CONFIDENCE' : 'INSUFFICIENT EVIDENCE'}
              </p>
            </div>

            {/* Confidence Breakdown */}
            <div className="space-y-3 mb-6">
              {signals.map((signal) => (
                <div key={signal.id} className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">{signal.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-zinc-800 rounded-full h-1.5">
                      <div 
                        className="bg-cyan-500 h-1.5 rounded-full"
                        style={{ width: `${signal.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-white w-8 text-right">{signal.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Explanation */}
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl transition-colors"
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white">Why is this delivery verified?</span>
            </button>

            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-3 bg-zinc-800/30 rounded-xl"
                >
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Delivery verified because the driver arrived inside the destination geofence, 
                    the assigned stop matches the shipment, the route history is consistent, 
                    and valid proof of delivery was recorded.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Proof of Delivery Collection */}
        {!isVerifying && verificationState === 'verified' && !evidence.find(e => e.type === 'pod' && e.status === 'verified') && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
          >
            <h3 className="text-sm font-semibold text-white mb-4">Proof of Delivery</h3>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => setPodType('photo')}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                  podType === 'photo' ? 'bg-cyan-500/20 border border-cyan-500/50' : 'bg-zinc-800/50 hover:bg-zinc-700/50'
                }`}
              >
                <Camera className="w-6 h-6 text-cyan-400" />
                <span className="text-xs text-white">Photo</span>
              </button>
              
              <button
                onClick={() => setPodType('signature')}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                  podType === 'signature' ? 'bg-cyan-500/20 border border-cyan-500/50' : 'bg-zinc-800/50 hover:bg-zinc-700/50'
                }`}
              >
                <FileText className="w-6 h-6 text-cyan-400" />
                <span className="text-xs text-white">Signature</span>
              </button>
              
              <button
                onClick={() => setPodType('digital')}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                  podType === 'digital' ? 'bg-cyan-500/20 border border-cyan-500/50' : 'bg-zinc-800/50 hover:bg-zinc-700/50'
                }`}
              >
                <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                <span className="text-xs text-white">Digital</span>
              </button>
            </div>

            <button
              onClick={handlePODSubmit}
              disabled={!podType}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-xl text-sm font-medium text-white transition-colors"
            >
              Submit Proof
            </button>
          </motion.div>
        )}

        {/* Exception Actions */}
        {!isVerifying && (verificationState === 'needs_review' || verificationState === 'exception' || verificationState === 'failed') && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Delivery verification requires attention</h3>
                <p className="text-xs text-zinc-400">
                  {verificationState === 'needs_review' ? 'Additional review recommended for verification.' :
                   verificationState === 'exception' ? 'Exception detected during verification process.' :
                   'Insufficient evidence for verification.'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleReviewException}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-white transition-colors"
              >
                Review
              </button>
              <button
                onClick={() => setPodType('photo')}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-white transition-colors"
              >
                Add Proof
              </button>
              <button
                onClick={handleReviewException}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium text-white transition-colors"
              >
                Report Issue
              </button>
              <button
                onClick={handleReviewException}
                className="w-full py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-xl text-sm font-medium text-cyan-400 transition-colors"
              >
                Contact Operations
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Complete Button */}
      {!isVerifying && verificationState === 'verified' && evidence.find(e => e.type === 'pod' && e.status === 'verified') && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-t border-zinc-800/50"
        >
          <button
            onClick={handleCompleteDelivery}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Complete Delivery
          </button>
        </motion.div>
      )}
    </div>
  );
}