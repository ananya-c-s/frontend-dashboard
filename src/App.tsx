import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/Pages/DashboardSidebar/HomePage";
import Layout from "./components/global/Layout";

import AppointmentRequestsPage from "./components/Pages/DashboardSidebar/AppointmentRequestsPage";
import TodayAppointmentsPage from "./components/Pages/DashboardSidebar/TodayAppointmentsPage";
import WaitlistManagementPage from "./components/Pages/DashboardSidebar/WaitlistManagementPage";
import LogoutPage from "./components/Pages/Authentication/LogoutPage";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/global/ProtectedRoutes";
import LoginUserPage from "./components/Pages/Authentication/LoginUserPage";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Public Login Route */}
            <Route path="/" element={<LoginUserPage />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<HomePage />} />
              <Route
                path="appointments"
                element={<AppointmentRequestsPage />}
              />
              <Route
                path="appointments/today"
                element={<TodayAppointmentsPage />}
              />
              <Route path="waitlist" element={<WaitlistManagementPage />} />
              <Route path="logout" element={<LogoutPage />} />
            </Route>

            {/* Redirect unknown URLs to login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
