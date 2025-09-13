import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LandingPage } from "./views/LandingPage.jsx";
import Login from "./views/login.jsx";
import { BookingService } from "./views/BookingService.jsx";
import { MyOrders } from "./views/MyOrders.jsx";
import { Profile } from "./views/Profile.jsx";
import { DashboardView } from "./views/DashboardView.jsx";
import { AdminDashboard } from "./views/AdminDashboard.jsx";
import { Register } from "./views/Register.jsx";
import AdminLogin from "./views/AdminLogin.jsx";
import { AdminOrders } from './views/AdminOrders.jsx';
import { AdminCustomers } from './views/AdminCustomers.jsx';
import { Layout } from './components/Layout';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Footer from './components/ui/Footer.jsx';
import { useLocation } from 'react-router-dom';
import Payment from './views/Payment.jsx';
import { AuthProvider, useAuth } from "./context/AuthContext.jsx"; // ✅ import

// Customer Layout wrapper
function CustomerLayout() {
  const location = useLocation();
  const { user, logout, booting } = useAuth();   // ✅ ใช้ context

  if (booting) return <div>Loading...</div>;

  const footerRoutes = ["/dashboard", "/booking"];

  return (
    // children ของ ProtectedRoute
    <ProtectedRoute user={user}>
      <Layout user={user} onLogout={logout} isAdmin={false} />
      {footerRoutes.includes(location.pathname) && <Footer />}
    </ProtectedRoute>
  );
}

// Admin Layout wrapper
function AdminLayout() {
  const { user, logout, booting } = useAuth();

  if (booting) return <div>Loading...</div>;

  return (
    <ProtectedRoute user={user} requiredRole={"admin"}>
      <Layout user={user} onLogout={logout} isAdmin={true} />
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>   {/* ✅ ครอบด้วย Provider */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Customer Protected Routes with Layout */}
          <Route path="/" element={<CustomerLayout />}>
            <Route path="dashboard" element={<DashboardView />} />
            <Route path="booking" element={<BookingService />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="profile" element={<Profile />} />
            <Route path="payment" element={<Payment />} />
          </Route>

          {/* Admin Protected Routes with Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
          </Route>

          {/* Catch all - redirect */}
          <Route path="*" element={<Navigate to="/" replace />} /> 
          {/* path อื่นไปที่/ */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}
