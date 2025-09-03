import { BrowserRouter as Router, Routes, Route, Navigate ,Outlet } from 'react-router-dom';
import { useState } from "react";
import { LandingPage } from "./views/LandingPage.jsx";
import  Login  from "./views/Login.jsx";
import { BookingService } from "./views/BookingService.jsx";
import { MyOrders } from "./views/MyOrders.jsx";
import { Profile } from "./views/Profile.jsx";
import { DashboardView } from "./views/DashboardView.jsx";
import { AdminDashboard } from "./views/AdminDashboard.jsx";
import { Register } from "./views/Register.jsx";
import  AdminLogin  from "./views/AdminLogin.jsx";
import { AdminOrders } from './views/AdminOrders.jsx';
import { AdminCustomers } from './views/AdminCustomers.jsx';
import { Layout } from './components/Layout';
import  ProtectedRoute  from "./components/ProtectedRoute.jsx";
import Footer from './components/ui/Footer.jsx';
import { useLocation } from 'react-router-dom';
import Payment from './views/Payment.jsx';


// Protected Route component


// Customer Layout wrapper
function CustomerLayout({ user, onLogout }) {
  const location = useLocation();

  // path ที่ต้องการให้แสดง footer
  const footerRoutes = ["/dashboard", "/booking"];

  return (
    <ProtectedRoute user={user} requiredRole="customer">
      <Layout user={user} onLogout={onLogout} isAdmin={false} />

      {/* render เนื้อหาหน้า */}

      {/* render footer เฉพาะบาง path */}
      {footerRoutes.includes(location.pathname) && <Footer />}
    </ProtectedRoute>
  );
}



// Admin Layout wrapper
function AdminLayout({ user, onLogout }) {
  return (
    <ProtectedRoute user={user} requiredRole="admin">
      <Layout user={user} onLogout={onLogout} isAdmin={true} />
      <Outlet />
    </ProtectedRoute>
  );
}


export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser({ ...userData, role: "customer" });
  };

  const handleAdminLogin = (userData) => {
    setUser({ ...userData, role: "admin" });
  };

  const handleRegister = (userData) => {
    setUser({ ...userData, role: "customer" });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/admin" element={<AdminLogin onLogin={handleAdminLogin} />} />

        {/* Customer Protected Routes with Layout */}
        <Route path="/" element={<CustomerLayout user={user} onLogout={handleLogout} />}>
          <Route path="dashboard" element={<DashboardView user={user} />} />
          <Route path="booking" element={<BookingService user={user} />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="profile" element={<Profile user={user} />} />
          <Route path="payment" element={<Payment user={user} />}  />
        </Route>

        {/* Admin Protected Routes with Layout */}
        <Route path="/admin" element={<AdminLayout user={user} onLogout={handleLogout} />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />

        </Route>

        {/* Redirect based on user role */}
        <Route 
          path="/app" 
          element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Catch all - redirect to appropriate page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}