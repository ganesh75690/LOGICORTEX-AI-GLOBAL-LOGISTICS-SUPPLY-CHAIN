import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Globe, 
  Play, 
  Clock, 
  Target, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TreePine, 
  Search, 
  Filter, 
  Eye, 
  X,
  ChevronRight,
  Zap,
  BarChart3,
  Building2,
  Truck,
  Ship,
  Plane,
  Activity,
  Shield,
  Award,
  Layers
} from 'lucide-react';

interface SimulationResult {
  country: string;
  region: string;
  requiredDocuments: string[];
  estimatedCustomsTime: string;
  potentialRestrictions: string[];
  complianceScore: number;
  environmentalRequirements: string[];
  tradeRisks: string[];
  aiRecommendations: string[];
  confidence: number;
  bestRoute: string;
  estimatedCost: string;
}

const MultiCountryComplianceSimulator = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SimulationResult | null>(null);

  const countries = [
    { id: 'usa', name: 'United States', region: 'North America', flag: '🇺🇸' },
    { id: 'uk', name: 'United Kingdom', region: 'Europe', flag: '🇬🇧' },
    { id: 'germany', name: 'Germany', region: 'Europe', flag: '🇩🇪' },
    { id: 'france', name: 'France', region: 'Europe', flag: '🇫🇷' },
    { id: 'china', name: 'China', region: 'Asia', flag: '🇨🇳' },
    { id: 'japan', name: 'Japan', region: 'Asia', flag: '🇯🇵' },
    { id: 'singapore', name: 'Singapore', region: 'Asia', flag: '🇸🇬' },
    { id: 'australia', name: 'Australia', region: 'Oceania', flag: '🇦🇺' },
    { id: 'uae', name: 'United Arab Emirates', region: 'Middle East', flag: '🇦🇪' },
    { id: 'india', name: 'India', region: 'Asia', flag: '🇮🇳' }
  ];

  const products = [
    { id: 'electronics', name: 'Electronic Components' },
    { id: 'medical', name: 'Medical Devices' },
    { id: 'industrial', name: 'Industrial Equipment' },
    { id: 'automotive', name: 'Automotive Parts' },
    { id: 'chemical', name: 'Chemical Products' }
  ];

  const routes = [
    { id: 'air', name: 'Air Freight', icon: Plane },
    { id: 'sea', name: 'Sea Freight', icon: Ship },
    { id: 'ground', name: 'Ground Freight', icon: Truck }
  ];

  const runSimulation = () => {
    if (!selectedCountry || !selectedProduct || !selectedRoute) return;

    setIsSimulating(true);
    setSimulationResults([]);

    // Simulate AI processing
    setTimeout(() => {
      const results: SimulationResult[] = countries
        .filter(c => c.id !== selectedCountry)
        .map(country => generateSimulationResult(country));
      
      setSimulationResults(results);
      setIsSimulating(false);
    }, 2000);
  };

  const generateSimulationResult = (country: any): SimulationResult => {
    const complianceScore = Math.floor(Math.random() * 25) + 75;
    const customsTime = Math.floor(Math.random() * 48) + 12;
    
    return {
      country: country.name,
      region: country.region,
      requiredDocuments: [
        'Commercial Invoice',
        'Packing List',
        'Bill of Lading',
        'Origin Certificate',
        'Insurance Certificate'
      ],
      estimatedCustomsTime: `${customsTime} hours`,
      potentialRestrictions: complianceScore < 85 ? ['Additional inspection required', 'Product testing needed'] : [],
      complianceScore,
      environmentalRequirements: [
        'Carbon footprint declaration',
        'Material safety data sheets',
        'Packaging compliance certificate'
      ],
      tradeRisks: complianceScore < 90 ? ['Moderate inspection probability', 'Documentation delays possible'] : [],
      aiRecommendations: [
        'Ensure all documentation is complete and accurate',
        'Consider using certified customs broker',
        'Monitor regulatory updates for destination country'
      ],
      confidence: Math.floor(Math.random() * 10) + 85,
      bestRoute: selectedRoute === 'air' ? 'Direct flight recommended' : 'Major port routing suggested',
      estimatedCost: `$${Math.floor(Math.random() * 5000) + 1000}`
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 75) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <MapPin className="w-6 h-6 text-lime-400" />
            Multi-Country Compliance Simulator™
          </h2>
          <p className="text-slate-400">Simulate shipping to different countries with AI predictions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-400">AI Simulation Engine</span>
          </div>
        </div>
      </div>

      {/* Simulation Configuration */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-lime-400" />
          Simulation Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Origin Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select origin country</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>{country.flag} {country.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Product Type</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select product type</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Shipping Route</label>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select shipping route</option>
              {routes.map(route => (
                <option key={route.id} value={route.id}>{route.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={runSimulation}
          disabled={!selectedCountry || !selectedProduct || !selectedRoute || isSimulating}
          className="w-full px-4 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSimulating ? (
            <>
              <Activity className="w-4 h-4 animate-spin" />
              Running Simulation...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run Multi-Country Simulation
            </>
          )}
        </button>
      </div>

      {/* Simulation Results */}
      {simulationResults.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-lime-400" />
            Simulation Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {simulationResults.map((result, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedResult(result)}
                className="p-4 rounded-lg border border-slate-700/50 hover:border-lime-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-lime-400" />
                    <div>
                      <h4 className="text-base font-semibold text-white">{result.country}</h4>
                      <p className="text-xs text-slate-400">{result.region}</p>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(result.complianceScore)}`}>
                    {result.complianceScore}%
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Customs Time</span>
                    <span className="text-white">{result.estimatedCustomsTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Documents</span>
                    <span className="text-white">{result.requiredDocuments.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Est. Cost</span>
                    <span className="text-white">{result.estimatedCost}</span>
                  </div>
                </div>

                {result.potentialRestrictions.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-orange-400 mb-2">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{result.potentialRestrictions.length} restriction(s)</span>
                  </div>
                )}

                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${getScoreBackground(result.complianceScore)}`}
                    style={{ width: `${result.complianceScore}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Result Details Modal */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedResult(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-lime-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedResult.country}</h3>
                    <p className="text-sm text-slate-400">{selectedResult.region}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Compliance Score</div>
                  <div className={`text-2xl font-bold ${getScoreColor(selectedResult.complianceScore)}`}>
                    {selectedResult.complianceScore}%
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">AI Confidence</div>
                  <div className="text-2xl font-bold text-purple-400">{selectedResult.confidence}%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Estimated Customs Time</div>
                  <div className="text-sm text-white">{selectedResult.estimatedCustomsTime}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-xs text-slate-400 mb-1">Estimated Cost</div>
                  <div className="text-sm text-white">{selectedResult.estimatedCost}</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  Required Documents
                </h4>
                <div className="space-y-2">
                  {selectedResult.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {doc}
                    </div>
                  ))}
                </div>
              </div>

              {selectedResult.potentialRestrictions.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    Potential Restrictions
                  </h4>
                  <div className="space-y-2">
                    {selectedResult.potentialRestrictions.map((restriction, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-orange-500/10 rounded border border-orange-500/30">
                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-white">{restriction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-green-400" />
                  Environmental Requirements
                </h4>
                <div className="space-y-2">
                  {selectedResult.environmentalRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-white">
                      <TreePine className="w-4 h-4 text-green-400" />
                      {req}
                    </div>
                  ))}
                </div>
              </div>

              {selectedResult.tradeRisks.length > 0 && (
                <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-400" />
                    Trade Risks
                  </h4>
                  <div className="space-y-2">
                    {selectedResult.tradeRisks.map((risk, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-red-500/10 rounded border border-red-500/30">
                        <Shield className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-white">{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  AI Recommendations
                </h4>
                <div className="space-y-2">
                  {selectedResult.aiRecommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-slate-600/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-white">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                <div className="text-xs text-slate-400 mb-1">Best Route</div>
                <div className="text-sm text-white">{selectedResult.bestRoute}</div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors flex items-center justify-center gap-2">
                  <Target className="w-4 h-4" />
                  Plan Shipment
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

export default MultiCountryComplianceSimulator;