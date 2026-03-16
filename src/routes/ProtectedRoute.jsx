import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  // still checking localStorage → show nothing yet
  // prevents flickering between login and dashboard
  if (loading) return null;

  // no user → not logged in → send to login
  if (!user) return <Navigate to="/login" replace />;

  // role required but user doesn't have it
  // e.g. hr trying to access super_admin only page
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // all checks passed → render the actual page
  return children;
};

export default ProtectedRoute;
