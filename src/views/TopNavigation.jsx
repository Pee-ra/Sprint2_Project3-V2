import { useState } from 'react';
import LogoSection from '../components/LogoSection';
import DesktopNavigation from '../components/DesktopNavigation';
import UserDropdown from '../components/UserDropdown';

import { Home, Package, Calculator, Shirt, User, BarChart3, Users, Settings, FileText, Truck } from 'lucide-react';

const customerNavigation = [
  { name: 'หน้าหลัก', view: 'dashboard', icon: Home },
  { name: 'จองบริการ', view: 'booking', icon: Shirt },
  { name: 'คำสั่งซื้อของฉัน', view: 'orders', icon: Package },
  { name: 'โปรไฟล์', view: 'profile', icon: User },
];

const adminNavigation = [
  { name: 'แดชบอร์ด', view: 'admin-dashboard', icon: BarChart3 },
  { name: 'คำสั่งซื้อ', view: 'admin-orders', icon: Package },
  { name: 'ลูกค้า', view: 'admin-customers', icon: Users },
];

export default function TopNavigation({ onNavigate, currentView = 'dashboard', user, onLogout, isAdmin = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = isAdmin ? adminNavigation : customerNavigation;

  const handleNavClick = (view) => {
    if (onNavigate) onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <LogoSection isAdmin={isAdmin} />
          <DesktopNavigation
            navigation={navigation}
            currentView={currentView}
            handleNavClick={handleNavClick}
            isAdmin={isAdmin}
          />
          <UserDropdown
            user={user}
            isAdmin={isAdmin}
            onLogout={onLogout}
            handleNavClick={handleNavClick}
          />
        </div>
      </div>
    </nav>
  );
}

