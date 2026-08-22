import { Driver, DriverInvite, DriverAssignment } from '../types/driver';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Get auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Admin API endpoints
export const adminDriverService = {
  // Get all drivers in the organization
  getAllDrivers: async (): Promise<Driver[]> => {
    const response = await fetch(`${API_BASE_URL}/admin/drivers`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch drivers');
    }
    
    return response.json();
  },

  // Invite a new driver
  inviteDriver: async (driverData: {
    name: string;
    email: string;
    phone: string;
    supplier_id?: string;
  }): Promise<DriverInvite> => {
    const response = await fetch(`${API_BASE_URL}/admin/drivers/invite`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(driverData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to invite driver');
    }
    
    return response.json();
  },

  // Reassign driver to different supplier or org-only
  reassignDriver: async (driverId: string, supplierId?: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/admin/drivers/${driverId}/reassign`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ supplier_id: supplierId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to reassign driver');
    }
  },

  // Toggle driver status (active/inactive)
  toggleDriverStatus: async (driverId: string, status: 'active' | 'inactive'): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/admin/drivers/${driverId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update driver status');
    }
  },

  // Get driver assignments
  getDriverAssignments: async (): Promise<DriverAssignment[]> => {
    const response = await fetch(`${API_BASE_URL}/admin/drivers/assignments`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch driver assignments');
    }
    
    return response.json();
  },
};

// Supplier API endpoints
export const supplierDriverService = {
  // Get only drivers assigned to this supplier
  getMyDrivers: async (supplierId: string): Promise<Driver[]> => {
    const response = await fetch(`${API_BASE_URL}/supplier/drivers`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch drivers');
    }
    
    return response.json();
  },

  // Invite a driver for this supplier
  inviteDriver: async (driverData: {
    name: string;
    email: string;
    phone: string;
  }): Promise<DriverInvite> => {
    const response = await fetch(`${API_BASE_URL}/supplier/drivers/invite`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(driverData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to invite driver');
    }
    
    return response.json();
  },

  // Assign driver to delivery (supplier-specific)
  assignDriverToDelivery: async (driverId: string, deliveryId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/supplier/drivers/${driverId}/assign-delivery`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ delivery_id: deliveryId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to assign driver to delivery');
    }
  },

  // Get driver availability
  getDriverAvailability: async (driverId: string): Promise<{
    available: boolean;
    next_available_time?: string;
    current_delivery?: string;
  }> => {
    const response = await fetch(`${API_BASE_URL}/supplier/drivers/${driverId}/availability`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch driver availability');
    }
    
    return response.json();
  },
};

// Common driver operations
export const driverService = {
  // Get current driver profile (for drivers themselves)
  getProfile: async (): Promise<Driver> => {
    const response = await fetch(`${API_BASE_URL}/driver/profile`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch driver profile');
    }
    
    return response.json();
  },

  // Update driver profile
  updateProfile: async (profileData: Partial<Driver>): Promise<Driver> => {
    const response = await fetch(`${API_BASE_URL}/driver/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update driver profile');
    }
    
    return response.json();
  },

  // Accept driver invitation
  acceptInvitation: async (token: string, profileData: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    license_number: string;
    vehicle_type: string;
  }): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/driver/accept-invitation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        ...profileData,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to accept invitation');
    }
  },
};

// Utility functions
export const driverUtils = {
  // Check if user has permission for driver operation
  hasPermission: (
    userRole: 'admin' | 'supplier' | 'driver',
    operation: 'invite' | 'reassign' | 'disable' | 'view_all' | 'manage_own',
    targetSupplierId?: string,
    userSupplierId?: string
  ): boolean => {
    switch (userRole) {
      case 'admin':
        return true; // Admin has all permissions
      
      case 'supplier':
        switch (operation) {
          case 'invite':
          case 'manage_own':
            return true;
          case 'reassign':
          case 'disable':
          case 'view_all':
            return false;
          default:
            return false;
        }
      
      case 'driver':
        return operation === 'manage_own';
      
      default:
        return false;
    }
  },

  // Format driver name
  formatDriverName: (driver: Driver): string => {
    return `${driver.first_name} ${driver.last_name}`;
  },

  // Check if driver is available for assignment
  isDriverAvailable: (driver: Driver): boolean => {
    return driver.status === 'active';
  },

  // Get driver status color
  getDriverStatusColor: (status: string): string => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'inactive':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      default:
        return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
    }
  },
};
