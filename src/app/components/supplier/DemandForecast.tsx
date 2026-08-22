import { Brain, TrendingUp, TrendingDown, Calendar, Download, RefreshCw, Info, Zap, Target, AlertTriangle, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';
import { useState } from 'react';

interface ForecastData {
  period: string;
  actual?: number;
  predicted: number;
  confidence: number;
  factors: string[];
}

interface ProductForecast {
  sku: string;
  name: string;
  category: string;
  currentDemand: number;
  predictedDemand: number;
  accuracy: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  keyDrivers: string[];
  nextMonthForecast: number;
  nextQuarterForecast: number;
}

const mockForecastData: ForecastData[] = [
  { period: 'Jan', actual: 2400, predicted: 2300, confidence: 92, factors: ['Seasonal demand', 'Marketing campaign'] },
  { period: 'Feb', actual: 1398, predicted: 1500, confidence: 88, factors: ['Supply constraints', 'Weather impact'] },
  { period: 'Mar', actual: 3800, predicted: 3600, confidence: 95, factors: ['Product launch', 'Market expansion'] },
  { period: 'Apr', actual: 3908, predicted: 4100, confidence: 90, factors: ['Competitor shortage', 'Price optimization'] },
  { period: 'May', predicted: 4800, confidence: 87, factors: ['Seasonal peak', 'New customer segment'] },
  { period: 'Jun', predicted: 5200, confidence: 85, factors: ['Summer demand', 'Inventory buildup'] },
  { period: 'Jul', predicted: 4900, confidence: 83, factors: ['Market stabilization', 'Competitor activity'] },
  { period: 'Aug', predicted: 5100, confidence: 82, factors: ['Back to school', 'Supply chain improvements'] },
];

const mockProductForecasts: ProductForecast[] = [
  {
    sku: 'SKU-7845',
    name: 'Circuit Board A',
    category: 'Electronics',
    currentDemand: 120,
    predictedDemand: 340,
    accuracy: 94,
    trend: 'up',
    confidence: 91,
    keyDrivers: ['Tech product launches', 'IoT device adoption', 'Supply chain recovery'],
    nextMonthForecast: 380,
    nextQuarterForecast: 1200
  },
  {
    sku: 'SKU-2341',
    name: 'Brake Pads',
    category: 'Automotive',
    currentDemand: 450,
    predictedDemand: 480,
    accuracy: 89,
    trend: 'up',
    confidence: 87,
    keyDrivers: ['Vehicle fleet expansion', 'Safety regulations', 'Aftermarket growth'],
    nextMonthForecast: 510,
    nextQuarterForecast: 1650
  },
  {
    sku: 'SKU-9012',
    name: 'Steel Rods',
    category: 'Raw Materials',
    currentDemand: 2100,
    predictedDemand: 1900,
    accuracy: 92,
    trend: 'down',
    confidence: 88,
    keyDrivers: ['Construction slowdown', 'Alternative materials', 'Inventory optimization'],
    nextMonthForecast: 1850,
    nextQuarterForecast: 5400
  },
  {
    sku: 'SKU-5678',
    name: 'LED Bulbs',
    category: 'Electronics',
    currentDemand: 890,
    predictedDemand: 920,
    accuracy: 96,
    trend: 'up',
    confidence: 93,
    keyDrivers: ['Energy efficiency trends', 'Government incentives', 'Price reductions'],
    nextMonthForecast: 980,
    nextQuarterForecast: 3100
  }
];

const accuracyData = [
  { month: 'Jan', accuracy: 92 },
  { month: 'Feb', accuracy: 88 },
  { month: 'Mar', accuracy: 95 },
  { month: 'Apr', accuracy: 90 },
  { month: 'May', accuracy: 87 },
  { month: 'Jun', accuracy: 85 },
];

export default function DemandForecast() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [showConfidence, setShowConfidence] = useState(true);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-400" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-400/20 text-green-400';
    if (accuracy >= 80) return 'bg-yellow-400/20 text-yellow-400';
    return 'bg-red-400/20 text-red-400';
  };

  const handleExportForecast = () => {
    // Create CSV content for demand forecast report
    const csvHeaders = [
      'SKU',
      'Product Name',
      'Category',
      'Current Demand',
      'Predicted Demand',
      'Demand Change (%)',
      'Trend',
      'Accuracy (%)',
      'Confidence (%)',
      'Key Drivers',
      'Next Month Forecast',
      'Next Quarter Forecast'
    ];

    const csvRows = mockProductForecasts.map(product => {
      const demandChange = ((product.predictedDemand - product.currentDemand) / product.currentDemand * 100).toFixed(1);
      const keyDriversStr = product.keyDrivers.join('; ');
      
      return [
        product.sku,
        product.name,
        product.category,
        product.currentDemand,
        product.predictedDemand,
        demandChange + '%',
        product.trend,
        product.accuracy + '%',
        product.confidence + '%',
        `"${keyDriversStr}"`, // Wrap in quotes to handle commas
        product.nextMonthForecast,
        product.nextQuarterForecast
      ];
    });

    // Add forecast accuracy trend data
    const accuracyTrendHeaders = ['Month', 'Model Accuracy (%)'];
    const accuracyTrendRows = accuracyData.map(data => [
      data.month,
      data.accuracy + '%'
    ]);

    // Add time series forecast data
    const timeSeriesHeaders = ['Period', 'Actual Demand', 'Predicted Demand', 'Confidence (%)', 'Key Factors'];
    const timeSeriesRows = mockForecastData.map(data => [
      data.period,
      data.actual || 'N/A',
      data.predicted,
      data.confidence + '%',
      `"${data.factors.join('; ')}"` // Wrap in quotes to handle commas
    ]);

    // Combine all sections
    const csvContent = [
      'DEMAND FORECAST REPORT',
      `Generated: ${new Date().toLocaleString()}`,
      `Timeframe: ${selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)}`,
      '',
      'PRODUCT FORECASTS',
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(',')),
      '',
      'MODEL ACCURACY TREND',
      accuracyTrendHeaders.join(','),
      ...accuracyTrendRows.map(row => row.join(',')),
      '',
      'TIME SERIES FORECAST',
      timeSeriesHeaders.join(','),
      ...timeSeriesRows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `demand_forecast_${timestamp}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success feedback
    console.log('Demand forecast exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00F5C4]/20 rounded-lg">
            <Brain className="w-6 h-6 text-[#00F5C4]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Demand Forecast</h2>
            <p className="text-slate-400">Machine learning predictions for upcoming demand</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Model
          </button>
          <button 
            onClick={handleExportForecast}
            className="px-4 py-2 bg-[#00F5C4] text-slate-900 rounded-lg font-medium hover:bg-[#00D4A8] transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Forecast
          </button>
        </div>
      </div>

      {/* AI Features Banner */}
      <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-slate-900 rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Demand Forecasting - Future View
              </h3>
              <p className="text-slate-300">Advanced machine learning predicts demand with 95.2% accuracy</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">ACTIVE</span>
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-1">95.2%</div>
              <div className="text-sm text-slate-400">Forecast Accuracy</div>
              <div className="text-xs text-green-400 mt-2">↑ 2.3% vs last month</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
              <div className="text-2xl font-bold text-blue-400 mb-1">7-14</div>
              <div className="text-sm text-slate-400">Days Prediction Range</div>
              <div className="text-xs text-slate-500 mt-2">Advanced ML models</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
              <div className="text-2xl font-bold text-cyan-400 mb-1">2.4M</div>
              <div className="text-sm text-slate-400">Training Data Points</div>
              <div className="text-xs text-slate-500 mt-2">Real-time processing</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50">
              <div className="text-2xl font-bold text-green-400 mb-1">v3.2.1</div>
              <div className="text-sm text-slate-400">Model Version</div>
              <div className="text-xs text-slate-500 mt-2">Last trained: 2hrs ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Risk Prediction Alert */}
      <div className="bg-gradient-to-r from-red-900/30 to-orange-900/20 rounded-xl p-4 border border-red-500/30">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <div className="flex-1">
            <div className="text-white font-medium">Shortage Risk Prediction - Early Warning</div>
            <div className="text-slate-300 text-sm">AI predicts potential stockout for LED Bulbs in 72 hours • Recommended: Increase safety stock by 40%</div>
          </div>
          <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-bold hover:bg-red-500/30 transition-colors">
            View Risk Details
          </button>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Demand Forecast Overview</h3>
          <div className="flex gap-2">
            {(['week', 'month', 'quarter'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-[#00F5C4] text-slate-900'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockForecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="period" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#00F5C4"
              fill="#00F5C4"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.2}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#00F5C4] rounded-full" />
            <span className="text-slate-400 text-sm">Actual Demand</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#f59e0b] rounded-full" />
            <span className="text-slate-400 text-sm">Predicted Demand</span>
          </div>
        </div>
      </div>

      {/* Model Accuracy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Model Accuracy Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#00F5C4"
                strokeWidth={2}
                dot={{ fill: '#00F5C4' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Forecast Confidence</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Overall Confidence</span>
              <span className={`font-medium ${getConfidenceColor(87)}`}>87%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] h-2 rounded-full"
                style={{ width: '87%' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-slate-400 text-sm">High Confidence (&gt;90%)</div>
                <div className="text-white font-medium">42% of forecasts</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Medium Confidence (80-90%)</div>
                <div className="text-white font-medium">38% of forecasts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Forecasts */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Product-Level Forecasts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-4 text-slate-400 font-medium">Product</th>
                <th className="text-left p-4 text-slate-400 font-medium">Current vs Predicted</th>
                <th className="text-left p-4 text-slate-400 font-medium">Trend</th>
                <th className="text-left p-4 text-slate-400 font-medium">Accuracy</th>
                <th className="text-left p-4 text-slate-400 font-medium">Key Drivers</th>
                <th className="text-left p-4 text-slate-400 font-medium">Next Month</th>
                <th className="text-left p-4 text-slate-400 font-medium">Next Quarter</th>
              </tr>
            </thead>
            <tbody>
              {mockProductForecasts.map((product) => (
                <tr key={product.sku} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="text-white font-medium">{product.name}</div>
                      <div className="text-slate-400 text-sm">{product.sku}</div>
                      <div className="text-slate-500 text-xs">{product.category}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">Current:</span>
                        <span className="text-white font-medium">{product.currentDemand}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">Predicted:</span>
                        <span className="text-[#00F5C4] font-medium">{product.predictedDemand}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(product.trend)}
                      <span className="text-white capitalize">{product.trend}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccuracyColor(product.accuracy)}`}>
                        {product.accuracy}%
                      </span>
                      <div className="text-slate-400 text-xs">{product.confidence}% conf.</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {product.keyDrivers.slice(0, 2).map((driver, index) => (
                        <div key={index} className="text-slate-400 text-xs">
                          • {driver}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">{product.nextMonthForecast}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">{product.nextQuarterForecast.toLocaleString()}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
