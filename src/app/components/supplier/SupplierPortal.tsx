import { SupplierDashboard } from './SupplierDashboard';

export interface User {
  email: string;
  name: string;
}

interface SupplierPortalProps {
  onLogout?: () => void;
}

export function SupplierPortal({ onLogout }: SupplierPortalProps = {}) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback: clear localStorage and redirect to login
      localStorage.removeItem('smartchain_user');
      window.location.href = '/login';
    }
  };

  return <SupplierDashboard onLogout={handleLogout} />;
}
