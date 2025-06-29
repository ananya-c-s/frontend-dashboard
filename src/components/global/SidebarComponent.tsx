import { useState } from "react";
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import User from "../../assets/user.png";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import TodayIcon from "@mui/icons-material/Today";
import QueueIcon from "@mui/icons-material/Queue";
// import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
// import SendIcon from "@mui/icons-material/Send";
// import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (title: string) => void;
}

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
  return (
    <MenuItem
      active={selected === title}
      component={<Link to={to} />}
      icon={icon}
      onClick={() => setSelected(title)}
    >
      {title}
    </MenuItem>
  );
};

// Define menus outside the component (no export needed here unless used elsewhere)
const patientMenu = [
  { label: "Home", icon: <HomeOutlinedIcon />, route: "/dashboard" },
  {
    label: "Accept Appointment Requests",
    icon: <AssignmentTurnedInIcon />,
    route: "/appointments/requests",
  },
  {
    label: "My Appointments",
    icon: <CalendarMonthIcon />,
    route: "/appointments/today",
  },
  {
    label: "Waitlist Status",
    icon: <HourglassBottomIcon />,
    route: "/waitlist",
  },
  {
    label: "Notifications",
    icon: <NotificationsActiveIcon />,
    route: "/notifications",
  },
  { label: "Profile", icon: <PersonOutlineIcon />, route: "/profile" },
  { label: "Logout", icon: <LogoutIcon />, route: "/logout" },
];

const adminMenu = [
  { label: "Home", icon: <HomeOutlinedIcon />, route: "/admin/dashboard" },
  {
    label: "Appointment Requests",
    icon: <AssignmentTurnedInIcon />,
    route: "/admin/appointments",
  },
  {
    label: "Today's Appointments",
    icon: <TodayIcon />,
    route: "/admin/appointments/today",
  },

  { label: "Manage Waitlist", icon: <QueueIcon />, route: "/admin/waitlist" },
  // {
  //   label: "Patient Records",
  //   icon: <PeopleOutlineIcon />,
  //   route: "/admin/patients",
  // },
  // {
  //   label: "Send Notification",
  //   icon: <SendIcon />,
  //   route: "/admin/notifications",
  // },
  // {
  //   label: "System Status",
  //   icon: <SettingsInputComponentIcon />,
  //   route: "/admin/system",
  // },
  { label: "Logout", icon: <LogoutIcon />, route: "/admin/logout" },
];

const SidebarComponent = ({
  role = "patient",
}: {
  role?: "patient" | "admin";
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Home");

  // Select menu based on role
  const menuToRender = role === "admin" ? adminMenu : patientMenu;

  return (
    <Box
      sx={{
        height: "100vh",
        minHeight: "100vh",
        backgroundColor: `${colors.primary[700]} !important`,

        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
        },
        [`& .${menuClasses.button}`]: {
          color: `${colors.grey[100]} !important`,
          "&:hover": {
            backgroundColor: `${colors.primary[800]} !important`, // Darker hover color
            color: `${colors.grey[100]} !important`, // Prevent text turning white or grey
          },
        },
      }}
    >
      <Sidebar collapsed={isCollapsed} rootStyles={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              color: colors.grey[400],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Menu
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px" textAlign="center">
              <Box display="flex" justifyContent="center">
                <img
                  src={User}
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  style={{ borderRadius: "50%", cursor: "pointer" }}
                />
              </Box>
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ mt: "10px" }}
              >
                Anna S.
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                Sr Software Engineer
              </Typography>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "2%"}>
            {menuToRender.map(({ label, route, icon }) => (
              <Item
                key={label}
                title={label}
                to={route}
                icon={icon}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;
