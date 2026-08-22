// Driver Management Types

export interface Driver {
  id: string;
  organization_id: string;
  supplier_id?: string; // Optional - driver can belong to org only or org + supplier
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  license_number: string;
  vehicle_type: 'truck' | 'van' | 'motorcycle' | 'other';
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface Supplier {
  id: string;
  organization_id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface DriverAssignment {
  driver_id: string;
  organization_id: string;
  supplier_id?: string;
  assigned_by: string; // User ID who made the assignment
  assigned_at: string;
}

export interface DriverInvite {
  id: string;
  organization_id: string;
  supplier_id?: string; // Optional - can invite for specific supplier
  role: 'driver';
  name: string;
  contact: string;
  contact_address: string;
  token: string;
  status: 'pending' | 'joined' | 'expired';
  created_at: string;
  invite_link: string;
  invited_by: string; // User ID who sent the invite
}

// Role-based permissions
export interface UserPermissions {
  canInviteDrivers: boolean;
  canAssignToSupplier: boolean;
  canReassignDrivers: boolean;
  canDisableAccounts: boolean;
  canViewAllDrivers: boolean;
  canManageOwnDrivers: boolean;
}

export const getPermissionsForRole = (role: 'admin' | 'supplier', supplierId?: string): UserPermissions => {
  if (role === 'admin') {
    return {
      canInviteDrivers: true,
      canAssignToSupplier: true,
      canReassignDrivers: true,
      canDisableAccounts: true,
      canViewAllDrivers: true,
      canManageOwnDrivers: true,
    };
  }
  
  // Supplier permissions
  return {
    canInviteDrivers: true,
    canAssignToSupplier: false, // Suppliers can't assign to other suppliers
    canReassignDrivers: false, // Suppliers can't reassign across suppliers
    canDisableAccounts: false, // Suppliers can't disable accounts
    canViewAllDrivers: false, // Suppliers can only view their own drivers
    canManageOwnDrivers: true, // Suppliers can manage their own drivers
  };
};
