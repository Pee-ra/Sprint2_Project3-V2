import { useState } from "react";
import  TopNavigation from "./views/TopNavigation.jsx";
import { LandingPage } from "./views/LandingPage.jsx";
import { Login } from "./views/Login.jsx";
import { BookingService } from "./views/BookingService.jsx";
import { MyOrders } from "./views/MyOrders.jsx";
import { Profile } from "./views/Profile.jsx";
import { DashboardView } from "./views/DashboardView.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");

  const handleLogin = (userData) => {
    setUser({ ...userData, role: "customer" });
    setIsAuthenticated(true);
    setCurrentPage("app");
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage("landing");
    setCurrentView("dashboard");
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  // Landing page
  if (currentPage === "landing") {
    return (
      <LandingPage
        onLogin={() => setCurrentPage("login")}
        // onRegister={() => setCurrentPage("register")}
        // onAdminLogin={() => setCurrentPage("admin-login")}
      />
    );
  }

  // Authentication screens
  if (currentPage === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setCurrentPage("register")}
        onBackToLanding={() => setCurrentPage("landing")}
      />
    );
  }

  const renderContent = () => {
    // Admin views
    if (user?.role === "admin") {
      switch (currentView) {
        case "admin-dashboard":
          return <AdminDashboard />;
        case "admin-services":
          return <AdminServices />;
        case "admin-orders":
          return <AdminOrders />;
        case "admin-customers":
          return <AdminCustomers />;
        default:
          return <AdminDashboard />;
      }
    }

    // Customer views
    switch (currentView) {
      case "booking":
        return (
          <BookingService
            onNavigateToPayment={() => handleNavigation("payment")}
            user={user}
          />
        );
      case "payment":
        return (
          <Payment onBack={() => handleNavigation("booking")} />
        );
      case "orders":
        return <MyOrders />;
      case "profile":
        return <Profile user={user} />;
      case "pricing":
        return (
          <PricingView 
            onNavigateToBooking={() => handleNavigation("booking")} 
          />
        );
      default:
        return (
          <DashboardView
            user={user}
            onNavigateToBooking={() => handleNavigation("booking")}
            onNavigateToTracking={() => handleNavigation("pickup-tracking")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation
        onNavigate={handleNavigation}
        currentView={currentView}
        user={user}
        onLogout={handleLogout}
        isAdmin={user?.role === "admin"}
      />

      <main className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}