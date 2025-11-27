import { Navigate } from "react-router-dom";

export default function useAuth(Component) {
  return function ProtectedRoute(props) {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };
}
