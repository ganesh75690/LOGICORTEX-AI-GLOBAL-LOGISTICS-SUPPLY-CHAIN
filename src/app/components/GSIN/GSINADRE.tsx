import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Truck, 
  MapPin, 
  BarChart3, 
  Thermometer, 
  Wind, 
  Calendar, 
  Target, 
  Shield, 
  Zap, 
  LineChart, 
  Building2, 
  Car, 
  SunCloud, 
  Gauge 
} from 'lucide-react';
import { GSINEngine } from './GSINEngine';
import { AutonomousDeliveryRealityEngine } from '../../types/gsin';

/**
 * GLOBAL SUPPLIER INTELLIGENCE NETWORK (GSIN™) - Module 7
 * Autonomous Delivery Reality Engine (ADRE™) - AI continuously understands real delivery environments
 */
export const GSINADRE: React.FC = () => {
  const engineRef = useRef<GSINEngine | null>(null);
  const [adre, setAdre] = useState<AutonomousDeliveryRealityEngine | null>(null);
  const [selectedSection, setSelectedSection] = useState<'overview' | 'predictions' | 'risks' | 'strategies'>('overview');

  useEffect(() => {
    if (!engineRef.current) {
      try {
        engineRef.current = new GSINEngine();
        const data = engineRef.current.getADRE();
        setAdre(data);
      } catch (error) {
        console.error('Error initializing GSIN engine:', error);
      }
    }
  }, []);

  if (!adre) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-[#00F5C4] animate-pulse mx-auto mb-4" />
          <div className="text-slate-400 text-lg">Initializing Autonomous Delivery Reality Engine...</div>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Environmental Intelligence */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Environmental Intelligence
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Gate Delays</div>
            <div className="text-2xl font-bold text-white">{adre.environmentalIntelligence.gateDelays.averageDelay}m</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Security Check Time</div>
            <div className="text-2xl font-bold text-white">{adre.environmentalIntelligence.securityCheckTime.averageCheckTime}m</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Dock Wait Time</div>
            <div className="text-2xl font-bold text-white">{adre.environmentalIntelligence.dockAvailability.averageWaitTime}m</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Historical Success</div>
            <div className="text-2xl font-bold text-green-400">{adre.environmentalIntelligence.historicalDeliverySuccess.successRate}%</div>
          </div>
        </div>
      </motion.div>

      {/* Historical Learning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#00F5C4]" />
          Historical Learning
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Total Deliveries</div>
            <div className="text-2xl font-bold text-white">{adre.historicalLearning.totalDeliveries}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Success Rate</div>
            <div className="text-2xl font-bold text-green-400">{Math.round((adre.historicalLearning.successfulDeliveries / adre.historicalLearning.totalDeliveries) * 100)}%</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Average Delay</div>
            <div className="text-2xl font-bold text-orange-400">{adre.historicalLearning.averageDelay}m</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Learning Velocity</div>
            <div className="text-2xl font-bold text-purple-400">{adre.historicalLearning.learningVelocity}%</div>
          </div>
        </div>
      </motion.div>

      {/* Confidence Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-white">Overall Confidence</span>
          </div>
          <div className="text-3xl font-bold text-[#00F5C4]">{adre.confidenceMetrics.overallConfidence}%</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-white">Prediction Confidence</span>
          </div>
          <div className="text-3xl font-bold text-purple-400">{adre.confidenceMetrics.predictionConfidence}%</div>
        </div>
      </motion.div>
    </div>
  );

  const renderPredictions = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Real-Time Predictions</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Best Arrival Time</div>
            <div className="text-2xl font-bold text-white">{adre.realTimePredictions.bestArrivalTime}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Expected Waiting Time</div>
            <div className="text-2xl font-bold text-orange-400">{adre.realTimePredictions.expectedWaitingTime}m</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">On-Time Probability</div>
            <div className="text-2xl font-bold text-green-400">{adre.realTimePredictions.onTimeProbability}%</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-2">Best Delivery Window</div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-sm text-white">Start: {adre.realTimePredictions.bestDeliveryWindow.start}</div>
              <div className="text-sm text-white">End: {adre.realTimePredictions.bestDeliveryWindow.end}</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-2">Prediction Confidence</div>
            <div className="text-3xl font-bold text-[#00F5C4]">{adre.realTimePredictions.confidence}%</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <h4 className="text-md font-bold text-white mb-3">Execution Recommendations</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">Departure Time</div>
            <div className="text-sm font-bold text-white">{adre.executionRecommendations.departureTime}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Route Recommendation</div>
            <div className="text-sm font-bold text-white">{adre.executionRecommendations.routeRecommendation}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Alternative Route Available</div>
            <div className="text-sm font-bold text-white">{adre.executionRecommendations.alternativeRouteAvailable ? 'Yes' : 'No'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Communication Timing</div>
            <div className="text-sm font-bold text-white">{adre.executionRecommendations.communicationTiming.join(', ')}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderRisks = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Risk Assessment</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Overall Risk</div>
            <div className={`text-3xl font-bold ${
              adre.riskAssessment.overallRisk === 'Critical' ? 'text-red-400' :
              adre.riskAssessment.overallRisk === 'High' ? 'text-orange-400' :
              adre.riskAssessment.overallRisk === 'Medium' ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {adre.riskAssessment.overallRisk}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Risk Probability</div>
            <div className="text-3xl font-bold text-white">{adre.riskAssessment.riskProbability}%</div>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full ${
              adre.riskAssessment.riskProbability > 70 ? 'bg-red-500' :
              adre.riskAssessment.riskProbability > 40 ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
            style={{ width: `${adre.riskAssessment.riskProbability}%` }}
          />
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-2">Risk Factors</div>
          <div className="space-y-2">
            {adre.riskAssessment.riskFactors.map((factor, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${
                    factor.severity === 'Critical' ? 'text-red-400' :
                    factor.severity === 'High' ? 'text-orange-400' :
                    factor.severity === 'Medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`} />
                  <span className="text-sm text-white">{factor.type}</span>
                </div>
                <div className="text-sm text-slate-400">{factor.probability}%</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderStrategies = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Alternative Strategies</h3>
      {adre.alternativeStrategies.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-12 text-center"
        >
          <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Alternative Strategies</h3>
          <p className="text-slate-400">AI will generate alternative strategies when risks are detected.</p>
        </motion.div>
      ) : (
        adre.alternativeStrategies.map((strategy, idx) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-bold text-white">{strategy.name}</h4>
                <p className="text-sm text-slate-400 mt-1">{strategy.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Success Probability</div>
                <div className="text-2xl font-bold text-green-400">{strategy.successProbability}%</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Complexity</div>
                <div className="text-sm font-bold text-white">{strategy.implementationComplexity}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Estimated Cost</div>
                <div className="text-sm font-bold text-white">${strategy.estimatedCost.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Time Impact</div>
                <div className="text-sm font-bold text-white">{strategy.timeImpact}m</div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#00F5C4]" />
              Autonomous Delivery Reality Engine™
            </h1>
            <p className="text-slate-400 mt-1">AI continuously understands real delivery environments</p>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">AI-Powered Reality Engine</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6"
      >
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'predictions', label: 'Predictions', icon: Target },
          { id: 'risks', label: 'Risks', icon: AlertTriangle },
          { id: 'strategies', label: 'Strategies', icon: Shield }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSection(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedSection === tab.id
                ? 'bg-[#00F5C4] text-slate-900 font-medium'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedSection === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderOverview()}
          </motion.div>
        )}
        {selectedSection === 'predictions' && (
          <motion.div
            key="predictions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderPredictions()}
          </motion.div>
        )}
        {selectedSection === 'risks' && (
          <motion.div
            key="risks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderRisks()}
          </motion.div>
        )}
        {selectedSection === 'strategies' && (
          <motion.div
            key="strategies"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderStrategies()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
