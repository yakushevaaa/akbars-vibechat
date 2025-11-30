import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Outlet />;
  }

  return <Navigate to="/auth/login" replace />;
};
