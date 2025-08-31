import { Navigate } from "react-router-dom";



export default function ProtectedRoute({ children, user, requiredRole }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }
  
  return <>{children}</>;
}