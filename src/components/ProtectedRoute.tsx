import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type ProtectedRouteProps = {
  role: "OWNER" | "DOCTOR";
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const auth = useContext(AuthContext);

  if (!auth) return null;

  if (auth.isLoading) return null;

  if (!auth.isAuthenticated || !auth.user) {
    return <Navigate to="/" replace />;
  }

  if (auth.user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
