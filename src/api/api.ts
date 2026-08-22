// API Configuration for Smart Supply Chain Platform
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Import types from components
interface VehicleAnalysis {
  vehicle_id: string;
  analysis_timestamp: string;
  health_scores: { [component: string]: number };
  overall_health_score: number;
  predictions: Array<{
    failure_probability: number;
    predicted_failure_type: string;
    days_until_failure: number;
    priority: string;
    confidence_score: number;
    recommended_actions: string[];
    estimated_cost: number;
    risk_factors: string[];
  }>;
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
    predictions: Array<{
      failure_probability: number;
      predicted_failure_type: string;
      days_until_failure: number;
      priority: string;
      confidence_score: number;
      recommended_actions: string[];
      estimated_cost: number;
      risk_factors: string[];
    }>;
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

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  detail?: string;
}

// Predictive Maintenance response types
export interface SimulateSensorDataResponse {
  sample_data: any[];
  vehicle_count: number;
  simulation_timestamp: string;
}

export interface CostSavingsResponse {
  total_annual_savings: {
    total_savings: number;
    direct_cost_savings: number;
    downtime_savings: number;
    efficiency_savings: number;
  };
  cost_comparisons: {
    emergency_repair_costs: number;
    preventive_maintenance_costs: number;
    total_savings: number;
  };
  downtime_analysis: {
    emergency_downtime_hours: number;
    preventive_downtime_hours: number;
    downtime_savings: number;
  };
  roi_analysis: {
    implementation_cost: number;
    annual_roi: number;
    payback_period_months: number;
  };
  breakdown_by_component: {
    [component: string]: {
      savings: number;
      percentage: number;
    };
  };
}

// API client class
class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      throw new Error((error as Error).message || 'Network error');
    }
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async verifyOtp(contact: string, otp: string) {
    return this.request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ contact, otp }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Organizations
  async getOrganizations() {
    return this.request('/organizations/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async createOrganization(orgData: any) {
    return this.request('/organizations/', {
      method: 'POST',
      body: JSON.stringify(orgData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getOrganization(orgId: number) {
    return this.request(`/organizations/${orgId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async updateOrganization(orgId: number, orgData: any) {
    return this.request(`/organizations/${orgId}`, {
      method: 'PUT',
      body: JSON.stringify(orgData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async deleteOrganization(orgId: number) {
    return this.request(`/organizations/${orgId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Drivers
  async getDrivers() {
    return this.request('/drivers/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async createDriver(driverData: any) {
    return this.request('/drivers/', {
      method: 'POST',
      body: JSON.stringify(driverData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getDriver(driverId: number) {
    return this.request(`/drivers/${driverId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Vehicles
  async getVehicles() {
    return this.request('/vehicles/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async createVehicle(vehicleData: any) {
    return this.request('/vehicles/', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getVehicle(vehicleId: number) {
    return this.request(`/vehicles/${vehicleId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Suppliers
  async getSuppliers() {
    return this.request('/suppliers/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async createSupplier(supplierData: any) {
    return this.request('/suppliers/', {
      method: 'POST',
      body: JSON.stringify(supplierData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getSupplier(supplierId: number) {
    return this.request(`/suppliers/${supplierId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Inventory
  async getInventory() {
    return this.request('/inventory/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async createInventoryItem(itemData: any) {
    return this.request('/inventory/', {
      method: 'POST',
      body: JSON.stringify(itemData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getLowStockItems() {
    return this.request('/inventory/low-stock', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getInventoryItem(itemId: number) {
    return this.request(`/inventory/${itemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Routes
  async getRoutes() {
    return this.request('/routes/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async createRoute(routeData: any) {
    return this.request('/routes/', {
      method: 'POST',
      body: JSON.stringify(routeData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getRoute(routeId: number) {
    return this.request(`/routes/${routeId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // AI Services
  async demandForecast(data: any) {
    return this.request('/ai/demand-forecast', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async disruptionPredict(data: any) {
    return this.request('/ai/disruption-predict', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async routeOptimize(data: any) {
    return this.request('/ai/route-optimize', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async naturalLanguageQuery(data: any) {
    return this.request('/ai/natural-language-query', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async aiRecommendations(data: any) {
    return this.request('/ai/recommendations', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async explainableAI(data: any) {
    return this.request('/ai/explainable-ai', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Analytics
  async getPlatformAnalytics(startDate: string, endDate: string) {
    return this.request(`/analytics/overview?start_date=${startDate}&end_date=${endDate}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getOrganizationAnalytics(orgId: number, startDate: string, endDate: string) {
    return this.request(`/analytics/organization/${orgId}?start_date=${startDate}&end_date=${endDate}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Alerts
  async getAlerts() {
    return this.request('/alerts/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async createAlert(alertData: any) {
    return this.request('/alerts/', {
      method: 'POST',
      body: JSON.stringify(alertData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async resolveAlert(alertId: string) {
    return this.request(`/alerts/${alertId}/resolve`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Computer Vision AI
  async analyzeImage(imageData: string, productId?: string, inspectionType?: string) {
    return this.request('/vision/analyze-image', {
      method: 'POST',
      body: JSON.stringify({
        image_data: imageData,
        product_id: productId,
        inspection_type: inspectionType || 'quality_control'
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async batchAnalysis(images: string[], batchId?: string, inspectionType?: string) {
    return this.request('/vision/batch-analysis', {
      method: 'POST',
      body: JSON.stringify({
        images: images,
        batch_id: batchId,
        inspection_type: inspectionType || 'quality_control'
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async generateQualityReport(analysisData: any, reportFormat?: string) {
    return this.request('/vision/generate-report', {
      method: 'POST',
      body: JSON.stringify({
        analysis_data: analysisData,
        report_format: reportFormat || 'json'
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getDefectTypes() {
    return this.request('/vision/defect-types', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getVisionAnalytics() {
    return this.request('/vision/analytics/summary', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getVisionHealth() {
    return this.request('/vision/health', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Predictive Maintenance
  async analyzeVehicleHealth(vehicleData: any): Promise<ApiResponse<VehicleAnalysis>> {
    return this.request('/maintenance/vehicle-health', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async analyzeFleet(fleetData: any): Promise<ApiResponse<FleetAnalysis>> {
    return this.request('/maintenance/fleet-analysis', {
      method: 'POST',
      body: JSON.stringify(fleetData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async scheduleMaintenance(scheduleData: any) {
    return this.request('/maintenance/schedule-maintenance', {
      method: 'POST',
      body: JSON.stringify(scheduleData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getCostSavingsSummary(): Promise<ApiResponse<CostSavingsResponse>> {
    return this.request('/maintenance/cost-savings-summary', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getFailureTypes() {
    return this.request('/maintenance/failure-types', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getMaintenanceAnalytics() {
    return this.request('/maintenance/analytics/summary', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getMaintenanceHealth() {
    return this.request('/maintenance/health', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  async getSimulateSensorData(vehicleCount: number = 10): Promise<ApiResponse<SimulateSensorDataResponse>> {
    return this.request(`/maintenance/simulate-sensor-data?vehicle_count=${vehicleCount}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient();
export default apiClient;
