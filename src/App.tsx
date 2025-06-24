import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { Routes, Route, Navigate } from "react-router-dom"; // ⬅️ Add Navigate
import HomePage from "./scenes/dashboard/HomePage";
import Layout from "./scenes/global/Layout";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Redirect root path to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Main layout and nested routes */}
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<HomePage />} />
            {/* Add other nested routes here */}
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
