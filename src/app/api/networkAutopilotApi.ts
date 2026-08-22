/// <reference types="vite/client" />
import { NetworkAutopilotEvent, NetworkAutopilotStats } from '../types/networkAutopilot';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class NetworkAutopilotApi {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('smartchain_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/network-autopilot${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Get current autopilot status and recent events
  async getStatus(): Promise<{
    status: 'running' | 'stopped';
    stats: NetworkAutopilotStats;
    recentOptimizations: NetworkAutopilotEvent[];
    lastOptimization: string | null;
  }> {
    return this.request('/status');
  }

  // Start the autopilot system
  async startAutopilot(): Promise<{
    message: string;
    status: string;
    timestamp: string;
  }> {
    return this.request('/start', {
      method: 'POST',
    });
  }

  // Stop the autopilot system
  async stopAutopilot(): Promise<{
    message: string;
    status: string;
    timestamp: string;
  }> {
    return this.request('/stop', {
      method: 'POST',
    });
  }

  // Trigger manual optimization
  async triggerOptimization(): Promise<{
    message: string;
    optimization: NetworkAutopilotEvent;
    timestamp: string;
  }> {
    return this.request('/optimize', {
      method: 'POST',
    });
  }

  // Get optimization history with pagination
  async getOptimizationHistory(params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{
    optimizations: NetworkAutopilotEvent[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.type) searchParams.append('type', params.type);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.startDate) searchParams.append('startDate', params.startDate);
    if (params?.endDate) searchParams.append('endDate', params.endDate);

    const query = searchParams.toString();
    return this.request(`/history${query ? `?${query}` : ''}`);
  }

  // Get optimization statistics
  async getOptimizationStats(): Promise<{
    stats: {
      totalOptimizations: number;
      appliedOptimizations: number;
      applicationRate: string;
      byType: Array<{
        _id: string;
        count: number;
        avgOnTime: number;
        avgFuel: number;
        avgCost: number;
      }>;
    };
    performanceMetrics: {
      beforeOptimization: {
        avgDeliveryTime: number;
        fuelConsumption: number;
        costPerDelivery: number;
        onTimeDeliveryRate: number;
      };
      afterOptimization: {
        avgDeliveryTime: number;
        fuelConsumption: number;
        costPerDelivery: number;
        onTimeDeliveryRate: number;
      };
      improvements: {
        avgDeliveryTime: string;
        fuelConsumption: string;
        costPerDelivery: string;
        onTimeDeliveryRate: string;
      };
    } | null;
    trends: Array<{
      _id: {
        date: string;
        type: string;
      };
      count: number;
      avgOnTime: number;
      avgFuel: number;
    }>;
    timestamp: string;
  }> {
    return this.request('/stats');
  }

  // Get pending optimizations
  async getPendingOptimizations(): Promise<{
    pendingOptimizations: NetworkAutopilotEvent[];
    count: number;
  }> {
    return this.request('/pending');
  }

  // Apply optimization manually
  async applyOptimization(id: string, performanceMetrics?: any): Promise<{
    message: string;
    optimization: NetworkAutopilotEvent;
  }> {
    return this.request(`/apply/${id}`, {
      method: 'POST',
      body: JSON.stringify({ performanceMetrics }),
    });
  }

  // Reject optimization
  async rejectOptimization(id: string, reason: string): Promise<{
    message: string;
    optimization: NetworkAutopilotEvent;
  }> {
    return this.request(`/reject/${id}`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Get optimization details
  async getOptimizationDetails(id: string): Promise<NetworkAutopilotEvent> {
    return this.request(`/${id}`);
  }

  // Get optimization types summary
  async getOptimizationTypesSummary(): Promise<{
    types: Array<{
      _id: string;
      count: number;
      applied: number;
      rejected: number;
      pending: number;
      avgImpact: number;
      lastOptimization: string;
    }>;
    totalTypes: number;
  }> {
    return this.request('/types/summary');
  }

  // Get network efficiency metrics
  async getNetworkEfficiency(): Promise<{
    networkState: {
      totalDrivers: number;
      activeRoutes: number;
      completedRoutes: number;
      utilizationRate: string;
    };
    recentImpact: {
      optimizationsCount: number;
      totalImpact: {
        onTime: number;
        fuel: number;
        cost: number;
      };
      avgImpact: {
        onTime: string;
        fuel: string;
        cost: string;
      };
    };
    networkEfficiency: string;
    timestamp: string;
  }> {
    return this.request('/efficiency');
  }

  // Export optimization data
  async exportOptimizationData(params?: {
    format?: 'json' | 'csv';
    startDate?: string;
    endDate?: string;
    type?: string;
  }): Promise<any> {
    const searchParams = new URLSearchParams();
    if (params?.format) searchParams.append('format', params.format);
    if (params?.startDate) searchParams.append('startDate', params.startDate);
    if (params?.endDate) searchParams.append('endDate', params.endDate);
    if (params?.type) searchParams.append('type', params.type);

    const query = searchParams.toString();
    const response = await fetch(`${API_BASE_URL}/network-autopilot/export${query ? `?${query}` : ''}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    if (params?.format === 'csv') {
      return response.blob();
    }

    return response.json();
  }

  // Real-time event stream (using Server-Sent Events)
  getEventStream(): EventSource {
    const eventSource = new EventSource(`${API_BASE_URL}/network-autopilot/events`);
    return eventSource;
  }

  // WebSocket connection for real-time updates
  connectWebSocket(): WebSocket {
    const wsUrl = API_BASE_URL.replace('http', 'ws') + '/network-autopilot/ws';
    const ws = new WebSocket(`${wsUrl}?token=${this.token}`);
    
    return ws;
  }

  // Helper method to format time ago
  static formatTimeAgo(date: Date | string): string {
    const now = new Date();
    const past = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }

  // Helper method to format impact
  static formatImpact(impact: { onTime: number; fuel: number; cost: number }) {
    return {
      onTime: `+${impact.onTime}%`,
      fuel: impact.fuel >= 0 ? `+${impact.fuel}%` : `${impact.fuel}%`,
      cost: impact.cost >= 0 ? `+$${impact.cost}` : `$${impact.cost}`
    };
  }

  // Helper method to get event color
  static getEventColor(type: string): string {
    const colors: Record<string, string> = {
      rebalance: 'from-blue-500 to-blue-600',
      reroute: 'from-orange-500 to-orange-600',
      efficiency: 'from-green-500 to-green-600',
      congestion: 'from-yellow-500 to-yellow-600'
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  }

  // Helper method to get event icon
  static getEventIcon(type: string): string {
    const icons: Record<string, string> = {
      rebalance: 'truck',
      reroute: 'route',
      efficiency: 'package',
      congestion: 'alert-circle'
    };
    return icons[type] || 'brain';
  }
}

export default NetworkAutopilotApi;
