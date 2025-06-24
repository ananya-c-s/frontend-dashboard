import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { tokens } from "../../theme";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useTheme, type Theme } from "@mui/material/styles";
import { Link } from "react-router-dom";
const appointments = [
  {
    name: "John Doe",
    time: "09:00 AM",
    status: "Confirmed",
  },
  {
    name: "Jane Smith",
    time: "10:30 AM",
    status: "Pending",
  },
  {
    name: "Ahmed Khan",
    time: "11:00 AM",
    status: "Cancelled",
  },
];

const statusColor = (status: string, theme: Theme) => {
  switch (status) {
    case "Confirmed":
      return theme.palette.success.main;
    case "Pending":
      return theme.palette.warning.main;
    case "Cancelled":
      return theme.palette.error.main;
    case "Rescheduled":
      return theme.palette.info.main;
    default:
      return theme.palette.grey[500];
  }
};

const CardAppointments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card
      elevation={6}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[400] : "#fff",
        height: "100%",

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
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            color={theme.palette.text.primary}
          >
            🗓️ Upcoming Appointments
          </Typography>
        </Box>

        <List dense>
          {appointments.map((appt, index) => (
            <Box
              key={index}
              sx={{ mb: index < appointments.length - 1 ? 1.5 : 0 }}
            >
              <ListItem
                alignItems="center"
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? colors.primary[600]
                      : "#ffffff",
                  borderRadius: 2,
                  px: 2,
                  boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? colors.primary[700]
                        : "#f5f5f5",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: colors.greenAccent[700],
                      width: 44,
                      height: 44,
                      boxShadow: `0 2px 6px rgba(0,0,0,0.2)`,
                    }}
                  >
                    <PersonOutlineIcon fontSize="medium" />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      fontWeight="300"
                      color={colors.grey[100]}
                    >
                      {appt.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color={theme.palette.text.secondary}
                      sx={{ mt: 0.3 }}
                    >
                      {appt.time}
                    </Typography>
                  }
                  sx={{ ml: 2 }}
                />

                <Chip
                  label={appt.status}
                  size="small"
                  sx={{
                    backgroundColor: statusColor(appt.status, theme),
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                    minWidth: 90,
                    boxShadow: `0 2px 8px rgba(0,0,0,0.15)`,
                  }}
                />
              </ListItem>
            </Box>
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
          See All Appointments for Today
        </Link>
      </CardContent>
    </Card>
  );
};

export default CardAppointments;
