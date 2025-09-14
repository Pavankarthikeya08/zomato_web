import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) return <Navigate to="/" replace />; // redirect to login form
  return children;
}

export default ProtectedRoute;
