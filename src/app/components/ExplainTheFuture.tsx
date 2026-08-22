import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  TrendingUp, 
  Cloud, 
  MapPin, 
  Zap,
  Eye,
  Brain,
  Activity,
  ArrowUp,
  ArrowDown,
  Package,
  DollarSign
} from 'lucide-react';

interface FuturePrediction {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'demand' | 'weather' | 'traffic' | 'inventory' | 'cost';
  timeframe: '2-hours' | '6-hours' | '24-hours' | '3-days';
  confidence: number;
  actionable: boolean;
  story: string;
  recommendations: string[];
  metrics: {
    current?: number;
    predicted?: number;
    unit?: string;
    change?: number;
  };
}

export function ExplainTheFuture() {
  const [predictions] = useState<FuturePrediction[]>([
    {
      id: '1',
      title: 'Weekend Demand Surge',
      description: 'Tomorrow demand will increase by 30% due to weekend trend',
      impact: 'high',
      category: 'demand',
      timeframe: '24-hours',
      confidence: 92,
      actionable: true,
      story: '📈 **The Weekend Wave is Coming**\n\nBased on historical patterns and current order trends, we\'re predicting a significant 30% surge in demand tomorrow. This isn\'t just a guess - our AI has analyzed 6 months of weekend data, current social media trends, and local events.\n\n**What\'s driving this?**\n• Three major local events scheduled\n• Weekend shopping patterns returning to pre-pandemic levels\n• Weather forecast showing perfect shopping conditions\n• Recent marketing campaign creating buzz\n\n**The Story:** Your customers are planning their weekend activities, and they need your products. By Friday evening, we expect to see order volumes spike, particularly in electronics and outdoor equipment categories.',
      recommendations: [
        'Pre-position additional inventory at Warehouse B',
        'Schedule 3 extra delivery drivers for tomorrow morning',
        'Extend warehouse operating hours by 2 hours',
        'Prepare surge pricing for high-demand items'
      ],
      metrics: {
        current: 100,
        predicted: 130,
        unit: 'orders/hr',
        change: 30
      }
    },
    {
      id: '2',
      title: 'Weather-Related Delay Risk',
      description: 'Heavy rain and thunderstorms expected in metro area',
      impact: 'high',
      category: 'weather',
      timeframe: '6-hours',
      confidence: 87,
      actionable: true,
      story: '🌧️ **Storm Clouds on the Horizon**\n\nThe weather service has upgraded their forecast - heavy thunderstorms are moving into the metro area within the next 6 hours. This isn\'t just light rain; we\'re talking about conditions that could seriously impact your delivery routes.\n\n**The Impact Story:**\n• I-95 and Highway 1 likely to experience flooding\n• Visibility drops to under 500 meters in heavy downpours\n• Wind gusts up to 45 mph could affect high-profile vehicles\n• Lightning may cause power outages at warehouse facilities\n\n**Why This Matters:** Last time we had similar conditions, delivery delays averaged 2.3 hours, and two routes had to be completely rerouted.',
      recommendations: [
        'Reroute vulnerable deliveries away from low-lying areas',
        'Load vehicles with weather-protective equipment',
        'Alert customers about potential delays via automated messages',
        'Prepare backup warehouse locations for emergency dispatch'
      ],
      metrics: {
        current: 95,
        predicted: 70,
        unit: '% on-time',
        change: -25
      }
    },
    {
      id: '3',
      title: 'Traffic Protest Disruption',
      description: 'Major protest expected downtown causing significant delays',
      impact: 'medium',
      category: 'traffic',
      timeframe: '2-hours',
      confidence: 78,
      actionable: true,
      story: '🚧 **The Downtown Disruption**\n\nSocial media monitoring and police reports indicate a major protest forming in the downtown core. This isn\'t just a small gathering - estimates suggest 2,000+ participants, and they\'re planning to block key intersections.\n\n**The Traffic Tale:**\n• Main Street and 5th Avenue will be completely blocked\n• Police are redirecting traffic to residential areas\n• Expect 45-60 minute delays on affected routes\n• Alternative routes are already becoming congested\n\n**The Ripple Effect:** This doesn\'t just affect downtown deliveries. The traffic backup will cascade through the entire delivery network, potentially causing delays across the city.',
      recommendations: [
        'Immediately reroute all downtown deliveries',
        'Use side streets with caution - increased local traffic expected',
        'Contact customers in affected areas with new ETAs',
        'Consider holding non-urgent deliveries until tomorrow'
      ],
      metrics: {
        current: 25,
        predicted: 65,
        unit: 'min delay',
        change: 40
      }
    },
    {
      id: '4',
      title: 'Inventory Shortage Warning',
      description: 'Electronics category approaching critical stock levels',
      impact: 'medium',
      category: 'inventory',
      timeframe: '3-days',
      confidence: 85,
      actionable: true,
      story: '📦 **The Electronics Crunch**\n\nYour electronics inventory is telling a story - and it\'s not a happy one. Current trends show you\'re burning through stock 40% faster than expected, and at this rate, you\'ll face critical shortages within 3 days.\n\n**The Inventory Narrative:**\n• Unexpected viral product driving surge in gadget orders\n• Supplier delays affecting restocking timeline\n• Competitor stockouts driving customers to your platform\n• Weekend demand surge will accelerate depletion\n\n**What This Means:** Without action, you could miss out on an estimated ₹45,000 in sales over the weekend. The good news? You still have time to act.',
      recommendations: [
        'Expedite electronics shipment from supplier - offer rush shipping',
        'Implement purchase limits on high-demand items to stretch inventory',
        'Cross-sell to alternative product categories',
        'Pre-order system for backordered items with discount incentives'
      ],
      metrics: {
        current: 2340,
        predicted: 0,
        unit: 'units',
        change: -100
      }
    },
    {
      id: '5',
      title: 'Fuel Price Optimization Window',
      description: 'Fuel prices dropping tomorrow - optimal for bulk deliveries',
      impact: 'low',
      category: 'cost',
      timeframe: '24-hours',
      confidence: 73,
      actionable: true,
      story: '⛽ **The Fuel Price Opportunity**\n\nHere\'s some good news for your bottom line! Global oil markets are trending downward, and local gas stations are expected to lower prices by tomorrow morning. This creates a perfect window for cost optimization.\n\n**The Cost Story:**\n• Expected price drop: ₹0.18 per gallon\n• Bulk delivery routes scheduled for tomorrow\n• Tanker trucks can fill up at lower rates\n• Monthly fuel budget could see 8% savings\n\n**The Strategic Advantage:** By timing your bulk deliveries and fuel purchases right, you could save approximately ₹1,200 this week alone. It\'s not just about saving money - it\'s about smart logistics.',
      recommendations: [
        'Schedule bulk deliveries for tomorrow morning',
        'Fuel all fleet vehicles tonight to lock in current prices',
        'Negotiate volume discounts with fuel suppliers',
        'Update fuel surcharge calculations for customer pricing'
      ],
      metrics: {
        current: 3.89,
        predicted: 3.71,
        unit: '₹/gallon',
        change: -4.6
      }
    }
  ]);

  const [selectedPrediction, setSelectedPrediction] = useState<FuturePrediction | null>(null);
  const [timeFilter, setTimeFilter] = useState<'all' | '2-hours' | '6-hours' | '24-hours' | '3-days'>('all');

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'demand': return TrendingUp;
      case 'weather': return Cloud;
      case 'traffic': return MapPin;
      case 'inventory': return Package;
      case 'cost': return DollarSign;
      default: return Activity;
    }
  };

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case '2-hours': return 'bg-purple-500/20 text-purple-400';
      case '6-hours': return 'bg-blue-500/20 text-blue-400';
      case '24-hours': return 'bg-green-500/20 text-green-400';
      case '3-days': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const filteredPredictions = timeFilter === 'all' 
    ? predictions 
    : predictions.filter(p => p.timeframe === timeFilter);

  const timeFilters = [
    { id: 'all', label: 'All Timeframes', count: predictions.length },
    { id: '2-hours', label: '2 Hours', count: predictions.filter(p => p.timeframe === '2-hours').length },
    { id: '6-hours', label: '6 Hours', count: predictions.filter(p => p.timeframe === '6-hours').length },
    { id: '24-hours', label: '24 Hours', count: predictions.filter(p => p.timeframe === '24-hours').length },
    { id: '3-days', label: '3 Days', count: predictions.filter(p => p.timeframe === '3-days').length }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Explain the Future</h3>
            <p className="text-xs text-slate-400">AI-powered predictive storytelling</p>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-400">Live Predictions</span>
          </div>
        </div>

        {/* Time Filters */}
        <div className="flex gap-2 overflow-x-auto">
          {timeFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setTimeFilter(filter.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                timeFilter === filter.id
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {filter.label}
              {filter.count > 0 && (
                <span className="ml-1 text-xs">({filter.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Predictions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {filteredPredictions.map(prediction => {
            const Icon = getCategoryIcon(prediction.category);
            return (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 cursor-pointer hover:bg-slate-800/70 transition-all"
                onClick={() => setSelectedPrediction(prediction)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-purple-400" />
                    <h4 className="text-white font-medium">{prediction.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getImpactColor(prediction.impact)}`}>
                      {prediction.impact}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getTimeframeColor(prediction.timeframe)}`}>
                      {prediction.timeframe}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-3">{prediction.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{prediction.confidence}% confidence</span>
                    </div>
                    {prediction.metrics.change && (
                      <div className={`flex items-center gap-1 ${
                        prediction.metrics.change > 0 ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {prediction.metrics.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        <span>{Math.abs(prediction.metrics.change)}{prediction.metrics.unit ? ` ${prediction.metrics.unit}` : ''}</span>
                      </div>
                    )}
                  </div>
                  {prediction.actionable && (
                    <div className="flex items-center gap-1 text-xs text-blue-400">
                      <Zap className="w-3 h-3" />
                      <span>Actionable</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Detailed Prediction Modal */}
      <AnimatePresence>
        {selectedPrediction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPrediction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{selectedPrediction.title}</h3>
                    <p className="text-slate-400">{selectedPrediction.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPrediction(null)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
                    aria-label="Close details"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* Story Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    The AI Story
                  </h4>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <p className="text-slate-300 whitespace-pre-line">{selectedPrediction.story}</p>
                  </div>
                </div>

                {/* Metrics */}
                {selectedPrediction.metrics && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-white mb-3">Key Metrics</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedPrediction.metrics.current !== undefined && (
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                          <p className="text-xs text-slate-500 mb-1">Current</p>
                          <p className="text-lg font-medium text-white">
                            {selectedPrediction.metrics.current}{selectedPrediction.metrics.unit}
                          </p>
                        </div>
                      )}
                      {selectedPrediction.metrics.predicted !== undefined && (
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                          <p className="text-xs text-slate-500 mb-1">Predicted</p>
                          <p className="text-lg font-medium text-purple-400">
                            {selectedPrediction.metrics.predicted}{selectedPrediction.metrics.unit}
                          </p>
                        </div>
                      )}
                      {selectedPrediction.metrics.change !== undefined && (
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                          <p className="text-xs text-slate-500 mb-1">Change</p>
                          <p className={`text-lg font-medium ${
                            selectedPrediction.metrics.change > 0 ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {selectedPrediction.metrics.change > 0 ? '+' : ''}{selectedPrediction.metrics.change}{selectedPrediction.metrics.unit ? ` ${selectedPrediction.metrics.unit}` : ''}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Recommended Actions
                  </h4>
                  <div className="space-y-2">
                    {selectedPrediction.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-blue-400 font-medium">{index + 1}</span>
                        </div>
                        <p className="text-slate-300 text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
