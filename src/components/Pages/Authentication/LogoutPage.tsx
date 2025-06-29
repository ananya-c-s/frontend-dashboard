import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication tokens or user data here
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    // Add any other logout logic here, e.g., API logout call

    // Redirect to login page after logout
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  return null; // or a simple loading message while redirecting
}
