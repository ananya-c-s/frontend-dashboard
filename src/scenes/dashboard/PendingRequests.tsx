import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const appointmentRequests = [
  {
    name: "Maria Gomez",
    time: "3:00 PM",
    type: "New",
  },
  {
    name: "Ethan Park",
    time: "10:00 AM",
    type: "Cancellation",
  },
  {
    name: "Priya Singh",
    time: "4:30 PM",
    type: "Reschedule",
  },
  {
    name: "Omar Ali",
    time: "1:45 PM",
    type: "New",
  },
];

const PendingRequests = () => {
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
      }}
    >
      <CardContent>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1.5} mb={2}>
          <NotificationsActiveIcon
            sx={{
              fontSize: 24,
              backgroundColor: colors.redAccent[500],
              color: "#fff",
              borderRadius: "50%",
              padding: "4px",
            }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            color={theme.palette.text.primary}
          >
            Appointment Requests
          </Typography>
        </Box>

        {/* Table */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 600, width: "2%" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentRequests.map((req, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? colors.primary[600]
                      : "#fdfdfd",
                }}
              >
                <TableCell>{req.name}</TableCell>
                <TableCell>{req.time}</TableCell>
                <TableCell>{req.type}</TableCell>
                <TableCell align="center">
                  <IconButton color="success">
                    <CheckCircleOutlineIcon />
                  </IconButton>
                  <IconButton color="error">
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PendingRequests;
