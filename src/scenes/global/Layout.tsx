import { Outlet } from "react-router-dom";
import Sidebar from "./SidebarComponent";
import Topbar from "./Topbar";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box display="flex" height="100vh" width="100vw">
      <Sidebar role="admin" />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <Topbar />
        <Box flexGrow={1} p={2} overflow="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
