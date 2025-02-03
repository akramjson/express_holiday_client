import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../Store/Auth/authStore";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const rolePaths: { [key: string]: string } = {
  admin: "/dashboard",
  agent: "/agent",
  client: "/client",
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const { access_token, user } = useAuthStore();

  // If there's no access token, redirect to login
  if (!access_token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If we have a token but no user, redirect to setup
  if (access_token && !user) {
    // Only redirect to setup if we're not already there
    if (location.pathname !== "/setup") {
      return <Navigate to="/setup" state={{ from: location }} replace />;
    }
  }

  // If we have both token and user, check role permissions
  if (user) {
    const userRole = user?.role?.toLowerCase();
    const hasRequiredRole = allowedRoles
      .map((role) => role.toLowerCase())
      .includes(userRole || "");

    if (!hasRequiredRole) {
      // Redirect to their default dashboard based on role
      const defaultPath = rolePaths[userRole || ""] || "/";
      return <Navigate to={defaultPath} state={{ from: location }} replace />;
    }
  }

  // If all checks pass, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
