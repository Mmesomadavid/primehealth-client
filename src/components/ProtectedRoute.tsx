import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type ProtectedRouteProps = {
  role: "OWNER" | "DOCTOR";
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const auth = useContext(AuthContext);

  if (!auth) return null;

  // If user not logged in
  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If user role does not match
  if (auth.user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  // If ok, render children routes
  return <Outlet />;
};

export default ProtectedRoute;
