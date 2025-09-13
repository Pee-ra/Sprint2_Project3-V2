import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, user, roles, requiredRole }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ถ้ากำหนด roles มา → ตรวจว่ามี role ปัจจุบันหรือไม่
  if (Array.isArray(roles) && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  // ถ้ากำหนด requiredRole มา → ตรวจว่ามี role ปัจจุบันหรือไม่
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/403" replace />;
  }
  return <>{children}</>;
}
