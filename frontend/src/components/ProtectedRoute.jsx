import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // If user does not have permission, redirect to their default dashboard
    if (currentUser.role === "recruiter") return <Navigate to="/recruitment" replace />;
    if (currentUser.role === "enterprise") return <Navigate to="/enterprise" replace />;
    return <Navigate to="/career" replace />;
  }

  return <Outlet />;
}
