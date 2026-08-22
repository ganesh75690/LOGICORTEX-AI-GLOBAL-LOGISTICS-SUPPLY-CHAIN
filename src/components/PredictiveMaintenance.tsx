import React, { useState, useEffect } from 'react';
import './PredictiveMaintenance.css';
import apiClient, { CostSavingsResponse } from '../api/api';

interface SensorData {
  vehicle_id: string;
  mileage: number;
  engine_temperature: number;
  oil_pressure: number;
  battery_voltage: number;
  fuel_consumption: number;
  brake_wear: number;
  tire_pressure: number;
  engine_rpm: number;
  speed: number;
  acceleration: number;
  vibration_level: number;
  coolant_level: number;
}

interface HealthScore {
  [component: string]: number;
}

interface Prediction {
  failure_probability: number;
  predicted_failure_type: string;
  days_until_failure: number;
  priority: string;
  confidence_score: number;
  recommended_actions: string[];
  estimated_cost: number;
  risk_factors: string[];
}

interface VehicleAnalysis {
  vehicle_id: string;
  analysis_timestamp: string;
  health_scores: HealthScore;
  overall_health_score: number;
  predictions: Prediction[];
  recommendations: string[];
  cost_analysis: {
    emergency_repair_cost: number;
    preventive_maintenance_cost: number;
    potential_savings: number;
    total_savings: number;
    roi_percentage: number;
  };
  next_maintenance_due: {
    date: string;
    days_until: number;
    type: string;
  };
  risk_level: string;
  ai_confidence: number;
}

interface FleetAnalysis {
  fleet_analysis_id: string;
  timestamp: string;
  total_vehicles: number;
  analyzed_vehicles: number;
  fleet_health_score: number;
  high_risk_vehicles: Array<{
    vehicle_id: string;
    risk_level: string;
    predictions: Prediction[];
  }>;
  total_cost_savings: number;
  fleet_insights: {
    average_fleet_health: number;
    high_risk_percentage: number;
    common_failure_types: Array<[string, number]>;
    maintenance_backlog: number;
    estimated_fleet_savings: number;
  };
  optimized_schedule: {
    total_maintenance_items: number;
    estimated_total_cost: number;
    critical_items: any[];
    high_priority_items: any[];
  };
  budget_recommendations: {
    recommended_monthly_budget: number;
    emergency_reserve_fund: number;
    annual_maintenance_budget: number;
    roi_projection: number;
  };
  roi_projection: {
    implementation_cost: number;
    monthly_savings: number;
    payback_period_months: number;
    annual_roi: number;
    three_year_roi: number;
  };
}

const PredictiveMaintenance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'fleet' | 'analytics'>('single');
  const [vehicleData, setVehicleData] = useState<SensorData>({
    vehicle_id: 'VEH-001',
    mileage: 75000,
    engine_temperature: 95,
    oil_pressure: 35,
    battery_voltage: 12.6,
    fuel_consumption: 12.5,
    brake_wear: 45,
    tire_pressure: 32,
    engine_rpm: 2000,
    speed: 65,
    acceleration: 2.1,
    vibration_level: 3.2,
    coolant_level: 0.85
  });
  
  const [analysisResult, setAnalysisResult] = useState<VehicleAnalysis | null>(null);
  const [fleetResult, setFleetResult] = useState<FleetAnalysis | null>(null);
  const [costSavings, setCostSavings] = useState<CostSavingsResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzingFleet, setIsAnalyzingFleet] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sampleVehicles, setSampleVehicles] = useState<SensorData[]>([]);

  useEffect(() => {
    generateSampleData();
    fetchCostSavings();
  }, []);

  const generateSampleData = async (): Promise<void> => {
    try {
      const response = await apiClient.getSimulateSensorData(10);
      if (response.success && response.data) {
        setSampleVehicles(response.data.sample_data);
      }
    } catch (err) {
      console.error('Failed to generate sample data:', err);
    }
  };

  const fetchCostSavings = async (): Promise<void> => {
    try {
      const response = await apiClient.getCostSavingsSummary();
      if (response.success && response.data) {
        setCostSavings(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch cost savings:', err);
    }
  };

  const analyzeVehicle = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await apiClient.analyzeVehicleHealth(vehicleData);
      
      if (response.success && response.data) {
        setAnalysisResult(response.data);
      } else {
        setError('Vehicle analysis failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to analyze vehicle. Please check your connection.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeFleet = async () => {
    if (sampleVehicles.length === 0) return;

    setIsAnalyzingFleet(true);
    setError(null);

    try {
      const response = await apiClient.analyzeFleet({
        vehicles: sampleVehicles,
        analysis_type: 'comprehensive'
      });
      
      if (response.success && response.data) {
        setFleetResult(response.data);
      } else {
        setError('Fleet analysis failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to analyze fleet. Please check your connection.');
    } finally {
      setIsAnalyzingFleet(false);
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return '#F44336';
      case 'high': return '#FF5722';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="predictive-maintenance-container">
      <div className="header-section">
        <h1 className="main-title">
          🔧 Predictive Maintenance AI
        </h1>
        <p className="subtitle">
          Cost-saving AI-powered vehicle maintenance system
        </p>
      </div>

      {/* Cost Savings Summary */}
      {costSavings && (
        <div className="cost-savings">
          <h2 className="cost-savings-title">
            💰 Annual Cost Savings: {formatCurrency(costSavings.total_annual_savings.total_savings)}
          </h2>
          <div className="cost-savings-grid">
            <div>
              <strong>Direct Savings:</strong> {formatCurrency(costSavings.total_annual_savings.direct_cost_savings)}
            </div>
            <div>
              <strong>Downtime Savings:</strong> {formatCurrency(costSavings.total_annual_savings.downtime_savings)}
            </div>
            <div>
              <strong>Efficiency Savings:</strong> {formatCurrency(costSavings.total_annual_savings.efficiency_savings)}
            </div>
            <div>
              <strong>ROI:</strong> {costSavings.roi_analysis.annual_roi.toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          onClick={() => setActiveTab('single')}
          className={`tab-button ${activeTab === 'single' ? 'active' : ''}`}
        >
          Single Vehicle
        </button>
        <button
          onClick={() => setActiveTab('fleet')}
          className={`tab-button ${activeTab === 'fleet' ? 'active' : ''}`}
        >
          Fleet Management
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
        >
          Analytics Dashboard
        </button>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {activeTab === 'single' && (
        <div className="content-grid">
          {/* Vehicle Input */}
          <div>
            <h2 className="section-title">
              🚗 Vehicle Sensor Data
            </h2>
            
            <div className="vehicle-data-card">
              <div className="vehicle-form-grid">
                <div>
                  <label className="form-label" htmlFor="vehicle-id-input">
                    Vehicle ID:
                  </label>
                  <input
                    id="vehicle-id-input"
                    type="text"
                    value={vehicleData.vehicle_id}
                    onChange={(e) => setVehicleData({...vehicleData, vehicle_id: e.target.value})}
                    className="form-input"
                  />
                </div>
                
                <div className="input-row">
                  <div>
                    <label className="form-label-small" htmlFor="mileage-input">
                      Mileage (km):
                    </label>
                    <input
                      id="mileage-input"
                      type="number"
                      value={vehicleData.mileage}
                      onChange={(e) => setVehicleData({...vehicleData, mileage: Number(e.target.value)})}
                      className="form-input-small"
                    />
                  </div>
                  
                  <div>
                    <label className="form-label-small" htmlFor="engine-temp-input">
                      Engine Temp (°C):
                    </label>
                    <input
                      id="engine-temp-input"
                      type="number"
                      value={vehicleData.engine_temperature}
                      onChange={(e) => setVehicleData({...vehicleData, engine_temperature: Number(e.target.value)})}
                      className="form-input-small"
                    />
                  </div>
                  
                  <div>
                    <label className="form-label-small" htmlFor="oil-pressure-input">
                      Oil Pressure (PSI):
                    </label>
                    <input
                      id="oil-pressure-input"
                      type="number"
                      value={vehicleData.oil_pressure}
                      onChange={(e) => setVehicleData({...vehicleData, oil_pressure: Number(e.target.value)})}
                      className="form-input-small"
                    />
                  </div>
                  
                  <div>
                    <label className="form-label-small" htmlFor="battery-voltage-input">
                      Battery Voltage (V):
                    </label>
                    <input
                      id="battery-voltage-input"
                      type="number"
                      step="0.1"
                      value={vehicleData.battery_voltage}
                      onChange={(e) => setVehicleData({...vehicleData, battery_voltage: Number(e.target.value)})}
                      className="form-input-small"
                    />
                  </div>
                  
                  <div>
                    <label className="form-label-small" htmlFor="fuel-consumption-input">
                      Fuel Consumption (L/100km):
                    </label>
                    <input
                      id="fuel-consumption-input"
                      type="number"
                      step="0.1"
                      value={vehicleData.fuel_consumption}
                      onChange={(e) => setVehicleData({...vehicleData, fuel_consumption: Number(e.target.value)})}
                      className="form-input-small"
                    />
                  </div>
                  
                  <div>
                    <label className="form-label-small" htmlFor="brake-wear-input">
                      Brake Wear (%):
                    </label>
                    <input
                      id="brake-wear-input"
                      type="number"
                      value={vehicleData.brake_wear}
                      onChange={(e) => setVehicleData({...vehicleData, brake_wear: Number(e.target.value)})}
                      className="form-input-small"
                    />
                  </div>
                </div>
                
                <button
                  onClick={analyzeVehicle}
                  disabled={isAnalyzing}
                  className="analyze-button"
                >
                  {isAnalyzing ? '🔄 Analyzing...' : '🔍 Analyze Vehicle Health'}
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div>
            <h2 className="section-title">
              📊 Health Analysis Results
            </h2>
            
            {analysisResult ? (
              <div className="results-card">
                {/* Overall Health */}
                <div className="result-item">
                  <h3 className="result-label">Overall Vehicle Health</h3>
                  <div className="analytics-value" style={{
                    color: getHealthColor(analysisResult.overall_health_score)
                  }}>
                    {analysisResult.overall_health_score.toFixed(1)}%
                  </div>
                  <div className="result-value">
                    Risk Level: <span className={`risk-${analysisResult.risk_level.toLowerCase()}`}>
                      {analysisResult.risk_level.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Component Health Scores */}
                <div className="results-grid">
                  <h3 className="result-label">Component Health</h3>
                  <div className="results-grid">
                    {Object.entries(analysisResult.health_scores).map(([component, score]) => (
                      <div key={component} className="component-health-item">
                        <span className="component-name">{component}:</span>
                        <div className="component-score-container">
                          <div className="health-bar-container">
                            <div 
                              className="health-bar"
                              style={{
                                width: `${score}%`,
                                backgroundColor: getHealthColor(score)
                              }} 
                            />
                          </div>
                          <span className="health-score-text" style={{ color: getHealthColor(score) }}>
                            {score.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Predictions */}
                <div className="result-item">
                  <h3 className="result-label">
                    AI Predictions ({analysisResult.predictions.length})
                  </h3>
                  {analysisResult.predictions.length > 0 ? (
                    <div className="predictions-container">
                      {analysisResult.predictions.map((prediction, index) => (
                        <div
                          key={index}
                          className="prediction-item"
                          style={{
                            borderLeftColor: getRiskColor(prediction.priority)
                          }}
                        >
                          <div className="prediction-title">
                            {prediction.predicted_failure_type.replace('_', ' ').toUpperCase()}
                          </div>
                          <div className="prediction-details">
                            Failure Risk: {(prediction.failure_probability * 100).toFixed(1)}% | 
                            Days Until: {prediction.days_until_failure} | 
                            Cost: {formatCurrency(prediction.estimated_cost)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="risk-low">✅ No immediate failures predicted</p>
                  )}
                </div>

                {/* Cost Analysis */}
                <div className="result-item">
                  <h3 className="result-label">Cost Analysis</h3>
                  <div className="cost-analysis-container">
                    <div className="cost-row">
                      <span>Emergency Repair Cost:</span>
                      <span className="cost-emergency">
                        {formatCurrency(analysisResult.cost_analysis.emergency_repair_cost)}
                      </span>
                    </div>
                    <div className="cost-row">
                      <span>Preventive Maintenance Cost:</span>
                      <span className="cost-preventive">
                        {formatCurrency(analysisResult.cost_analysis.preventive_maintenance_cost)}
                      </span>
                    </div>
                    <div className="cost-row">
                      <span>Potential Savings:</span>
                      <span className="cost-savings">
                        {formatCurrency(analysisResult.cost_analysis.potential_savings)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Next Maintenance */}
                <div className="result-item">
                  <h3 className="result-label">Next Maintenance Due</h3>
                  <div className="maintenance-info">
                    {new Date(analysisResult.next_maintenance_due.date).toLocaleDateString()} 
                    <span className="maintenance-days">
                      ({analysisResult.next_maintenance_due.days_until} days)
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔧</div>
                <p>Enter vehicle data and click "Analyze" to see AI predictions</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'fleet' && (
        <div>
          <div className="fleet-section">
            <button
              onClick={analyzeFleet}
              disabled={isAnalyzingFleet || sampleVehicles.length === 0}
              className="analyze-button"
            >
              {isAnalyzingFleet ? '🔄 Analyzing Fleet...' : `📊 Analyze ${sampleVehicles.length} Vehicles`}
            </button>
          </div>

          {fleetResult ? (
            <div className="fleet-grid">
              {/* Fleet Overview */}
              <div>
                <h3 className="section-title">
                  📊 Fleet Overview
                </h3>
                <div className="fleet-overview-card">
                  <div className="fleet-health-display">
                    <div className="fleet-health-score" style={{
                      color: getHealthColor(fleetResult.fleet_health_score)
                    }}>
                      {fleetResult.fleet_health_score.toFixed(1)}%
                    </div>
                    <div className="fleet-health-label">Average Fleet Health</div>
                  </div>
                  
                  <div className="fleet-stats-grid">
                    <div className="fleet-stat-row">
                      <span>Total Vehicles:</span>
                      <span className="fleet-stat-value">{fleetResult.total_vehicles}</span>
                    </div>
                    <div className="fleet-stat-row">
                      <span>High Risk Vehicles:</span>
                      <span className="fleet-stat-high-risk">
                        {fleetResult.high_risk_vehicles.length}
                      </span>
                    </div>
                    <div className="fleet-stat-row">
                      <span>Total Savings:</span>
                      <span className="fleet-stat-savings">
                        {formatCurrency(fleetResult.total_cost_savings)}
                      </span>
                    </div>
                    <div className="fleet-stat-row">
                      <span>Maintenance Backlog:</span>
                      <span className="fleet-stat-value">
                        {fleetResult.fleet_insights.maintenance_backlog}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget Recommendations */}
              <div>
                <h3 className="section-title">
                  💰 Budget Recommendations
                </h3>
                <div className="budget-recommendations-card">
                  <div className="budget-item-grid">
                    <div>
                      <strong>Monthly Budget:</strong>
                      <div className="budget-value-monthly">
                        {formatCurrency(fleetResult.budget_recommendations.recommended_monthly_budget)}
                      </div>
                    </div>
                    <div>
                      <strong>Emergency Reserve:</strong>
                      <div className="budget-value-emergency">
                        {formatCurrency(fleetResult.budget_recommendations.emergency_reserve_fund)}
                      </div>
                    </div>
                    <div>
                      <strong>Annual ROI:</strong>
                      <div className="budget-value-roi">
                        {fleetResult.budget_recommendations.roi_projection.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <strong>Payback Period:</strong>
                      <div className="budget-value-payback">
                        {fleetResult.roi_projection.payback_period_months.toFixed(1)} months
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* High Risk Vehicles */}
              {fleetResult.high_risk_vehicles.length > 0 && (
                <div className="high-risk-vehicles-section">
                  <h3 className="section-title">
                    ⚠️ High Risk Vehicles
                  </h3>
                  <div className="high-risk-vehicles-grid">
                    {fleetResult.high_risk_vehicles.map((vehicle, index) => (
                      <div key={index} className="high-risk-vehicle-card" style={{
                        borderColor: getRiskColor(vehicle.risk_level)
                      }}>
                        <div className="vehicle-id-header">
                          {vehicle.vehicle_id}
                        </div>
                        <div className="vehicle-risk-info">
                          Risk Level: <span className={`risk-${vehicle.risk_level.toLowerCase()}`}>
                            {vehicle.risk_level.toUpperCase()}
                          </span>
                        </div>
                        <div className="vehicle-issues-count">
                          Issues: {vehicle.predictions.length}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-state">
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📊</div>
              <p>Click "Analyze Fleet" to see comprehensive fleet analysis</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && costSavings && (
        <div>
          <h2 className="section-title">
            📈 Cost Savings Analytics
          </h2>
          
          <div className="analytics-grid">
            {/* Cost Comparison */}
            <div className="analytics-card">
              <h3 className="result-label">Cost Comparison</h3>
              <div className="fleet-stats-grid">
                <div className="fleet-stat-row">
                  <span>Emergency Repairs:</span>
                  <span className="cost-emergency">
                    {formatCurrency(costSavings.cost_comparisons.emergency_repair_costs)}
                  </span>
                </div>
                <div className="fleet-stat-row">
                  <span>Preventive Maintenance:</span>
                  <span className="cost-preventive">
                    {formatCurrency(costSavings.cost_comparisons.preventive_maintenance_costs)}
                  </span>
                </div>
                <div className="fleet-stat-row" style={{ fontWeight: 'bold', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                  <span>Total Savings:</span>
                  <span className="cost-savings">
                    {formatCurrency(costSavings.cost_comparisons.total_savings)}
                  </span>
                </div>
              </div>
            </div>

            {/* Downtime Analysis */}
            <div className="analytics-card">
              <h3 className="result-label">Downtime Reduction</h3>
              <div className="fleet-stats-grid">
                <div className="fleet-stat-row">
                  <span>Emergency Downtime:</span>
                  <span className="cost-emergency">
                    {costSavings.downtime_analysis.emergency_downtime_hours}h
                  </span>
                </div>
                <div className="fleet-stat-row">
                  <span>Preventive Downtime:</span>
                  <span className="cost-preventive">
                    {costSavings.downtime_analysis.preventive_downtime_hours}h
                  </span>
                </div>
                <div className="fleet-stat-row" style={{ fontWeight: 'bold', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                  <span>Downtime Savings:</span>
                  <span className="cost-savings">
                    {formatCurrency(costSavings.downtime_analysis.downtime_savings)}
                  </span>
                </div>
              </div>
            </div>

            {/* ROI Analysis */}
            <div className="analytics-card">
              <h3 className="result-label">ROI Analysis</h3>
              <div className="fleet-stats-grid">
                <div className="fleet-stat-row">
                  <span>Implementation Cost:</span>
                  <span className="budget-value-emergency">
                    {formatCurrency(costSavings.roi_analysis.implementation_cost)}
                  </span>
                </div>
                <div className="fleet-stat-row">
                  <span>Payback Period:</span>
                  <span className="budget-value-payback">
                    {costSavings.roi_analysis.payback_period_months.toFixed(1)} months
                  </span>
                </div>
                <div className="fleet-stat-row" style={{ fontWeight: 'bold', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                  <span>Annual ROI:</span>
                  <span className="budget-value-roi">
                    {costSavings.roi_analysis.annual_roi.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Component Breakdown */}
          <div className="result-item" style={{ marginTop: '30px' }}>
            <h3 className="result-label">Savings by Component</h3>
            <div className="analytics-card">
              <div className="analytics-grid">
                {Object.entries(costSavings.breakdown_by_component).map(([component, data]: [string, any]) => (
                  <div key={component} className="analytics-card">
                    <div className="vehicle-id-header" style={{ textTransform: 'capitalize' }}>
                      {component}
                    </div>
                    <div className="analytics-value">
                      {formatCurrency(data.savings)}
                    </div>
                    <div className="analytics-label">
                      {data.percentage}% of total
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictiveMaintenance;
