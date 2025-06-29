import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme, type Theme } from "@mui/material/styles";
import { tokens } from "../../../theme";
import { Link } from "react-router-dom";

const notifications = [
  {
    message: "Appointment with Sarah Lee has been rescheduled.",
    type: "info",
  },
  {
    message: "No-show alert: Patient John Doe missed 9:00 AM slot.",
    type: "warning",
  },
  {
    message: "System maintenance scheduled at 9 PM tonight.",
    type: "success",
  },
];

const iconByType = {
  info: <InfoOutlinedIcon fontSize="small" />,
  warning: <PriorityHighIcon fontSize="small" />,
  success: <CheckCircleOutlineIcon fontSize="small" />,
};

const colorByType = (type: string, theme: Theme) => {
  switch (type) {
    case "info":
      return theme.palette.info.main;
    case "warning":
      return theme.palette.warning.main;
    case "success":
      return theme.palette.success.main;
    default:
      return theme.palette.grey[500];
  }
};

const CardNotifications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card
      elevation={6}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[400] : "#fff",
        borderRadius: 3,
        boxShadow: `0 8px 16px rgba(0,0,0,0.15)`,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.04)",
          boxShadow: `0 12px 24px rgba(0,0,0,0.25)`,
        },
      }}
    >
      <CardContent>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <NotificationsActiveIcon
            sx={{
              fontSize: 24,
              backgroundColor: colors.redAccent[500],
              color: "#fff",
              borderRadius: "50%",
              padding: "5px",
            }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            color={theme.palette.text.primary}
          >
            Notifications & Alerts
          </Typography>
        </Box>

        {/* Notifications List */}
        <List dense>
          {notifications.map((notif, index) => (
            <ListItem
              key={index}
              alignItems="center"
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.primary[600]
                    : "#ffffff",
                borderRadius: 2,
                mb: 1.2,
                px: 2,
                py: 1.1,
                boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? colors.primary[700]
                      : "#f9f9f9",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: colorByType(notif.type, theme),
                    color: "#fff",
                    width: 32,
                    height: 32,
                  }}
                >
                  {iconByType[notif.type as keyof typeof iconByType]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color={theme.palette.text.primary}
                    fontWeight={500}
                  >
                    {notif.message}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <Link
          to="/admin/appointments/today"
          style={{
            textDecoration: "underline",
            color: colors.grey[100],
            cursor: "pointer",
            display: "inline-block",
            fontWeight: "200",
          }}
        >
          See All Notifications
        </Link>
      </CardContent>
    </Card>
  );
};

export default CardNotifications;
