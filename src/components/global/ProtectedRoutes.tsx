import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Adjust path

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
