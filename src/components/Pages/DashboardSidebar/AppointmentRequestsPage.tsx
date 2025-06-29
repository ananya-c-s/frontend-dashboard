import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Chip,
  useTheme,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import { tokens } from "../../../theme";

interface Appointment {
  id: number;
  appointmentTime: string;
  appointmentType: string;
  notes: string;
  status: "pending" | "accepted" | "declined";
}

const sampleAppointments: Appointment[] = [
  {
    id: 1,
    appointmentTime: "2025-06-25T10:30:00",
    appointmentType: "Initial",
    notes: "Follow-up for blood test results",
    status: "pending",
  },
  {
    id: 2,
    appointmentTime: "2025-06-26T14:00:00",
    appointmentType: "Follow-up",
    notes: "Discussion of MRI results",
    status: "pending",
  },
  {
    id: 3,
    appointmentTime: "2025-06-27T09:00:00",
    appointmentType: "Initial",
    notes: "Consultation about allergy symptoms",
    status: "pending",
  },
  {
    id: 4,
    appointmentTime: "2025-06-28T11:00:00",
    appointmentType: "Follow-up",
    notes: "Review of blood pressure readings",
    status: "pending",
  },
  {
    id: 5,
    appointmentTime: "2025-06-29T13:30:00",
    appointmentType: "Initial",
    notes: "General check-up",
    status: "pending",
  },
  {
    id: 6,
    appointmentTime: "2025-06-30T10:00:00",
    appointmentType: "Follow-up",
    notes: "Discussing medication side effects",
    status: "pending",
  },
  {
    id: 7,
    appointmentTime: "2025-07-01T15:00:00",
    appointmentType: "Initial",
    notes: "Diet and nutrition consultation",
    status: "pending",
  },
  {
    id: 8,
    appointmentTime: "2025-07-02T09:30:00",
    appointmentType: "Follow-up",
    notes: "Skin allergy test results",
    status: "pending",
  },
  {
    id: 9,
    appointmentTime: "2025-07-03T14:00:00",
    appointmentType: "Initial",
    notes: "Back pain assessment",
    status: "pending",
  },
  {
    id: 10,
    appointmentTime: "2025-07-04T11:00:00",
    appointmentType: "Follow-up",
    notes: "Physical therapy progress",
    status: "pending",
  },
  {
    id: 11,
    appointmentTime: "2025-07-05T16:00:00",
    appointmentType: "Initial",
    notes: "Mental health screening",
    status: "pending",
  },
  {
    id: 12,
    appointmentTime: "2025-07-06T10:30:00",
    appointmentType: "Follow-up",
    notes: "Lab test discussion",
    status: "pending",
  },
];

export default function AppointmentRequestsPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDark = theme.palette.mode === "dark";

  const [appointments, setAppointments] =
    useState<Appointment[]>(sampleAppointments);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleStatusChange = (
    id: number,
    newStatus: "accepted" | "declined"
  ) => {
    const updated = appointments
      .map((appt) => (appt.id === id ? { ...appt, status: newStatus } : appt))
      .filter((appt) => appt.status === "pending"); // Keep only pending appointments
    setAppointments(updated);
    // Reset page to first page if necessary
    setPage(0);
  };

  const formatDateTime = (iso: string) => {
    const date = new Date(iso);
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return { dateStr, timeStr };
  };

  // Dynamic colors based on theme
  const textPrimary = isDark ? colors.grey[100] : colors.primary[100];
  const textSecondary = isDark ? colors.grey[300] : colors.grey[500];
  const chipColors = {
    accepted: {
      color: isDark ? colors.greenAccent[300] : "#276749",
      borderColor: isDark ? colors.greenAccent[400] : "#48bb78",
    },
    declined: {
      color: isDark ? colors.redAccent[300] : "#9b2c2c",
      borderColor: isDark ? colors.redAccent[400] : "#f56565",
    },
    pending: {
      color: isDark ? colors.blueAccent[300] : "#2b6cb0",
      borderColor: isDark ? colors.blueAccent[900] : "#4299e1",
    },
  };

  // Pagination handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice appointments for pagination
  const paginatedAppointments = appointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: colors.greenAccent[400],
          mb: 3,
        }}
      >
        Appointment Requests
      </Typography>

      {/* Appointments Table */}
      <Paper
        elevation={3}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? colors.primary[400] : "#fff",
          borderRadius: 3,
          boxShadow: `0 8px 16px rgba(0,0,0,0.15)`,
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: textPrimary, fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: textPrimary, fontWeight: "bold" }}>
                  Type
                </TableCell>
                <TableCell sx={{ color: textPrimary, fontWeight: "bold" }}>
                  Notes
                </TableCell>
                <TableCell sx={{ color: textPrimary, fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: textPrimary, fontWeight: "bold" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedAppointments.map((appt) => {
                const { dateStr, timeStr } = formatDateTime(
                  appt.appointmentTime
                );
                return (
                  <TableRow key={appt.id} hover>
                    <TableCell>
                      <Typography fontWeight="bold" color={textPrimary}>
                        {dateStr}
                      </Typography>
                      <Typography variant="caption" color={textSecondary}>
                        {timeStr}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: textPrimary }}>
                      {appt.appointmentType}
                    </TableCell>
                    <TableCell sx={{ color: textPrimary }}>
                      {appt.notes}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={appt.status.toUpperCase()}
                        variant="outlined"
                        sx={{
                          color: chipColors[appt.status].color,
                          borderColor: chipColors[appt.status].borderColor,
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        sx={{ mr: 1 }}
                        disabled={appt.status !== "pending"}
                        onClick={() => handleStatusChange(appt.id, "accepted")}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        disabled={appt.status !== "pending"}
                        onClick={() => handleStatusChange(appt.id, "declined")}
                      >
                        Decline
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {paginatedAppointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No appointments found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 12]}
          component="div"
          count={appointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            bgcolor: isDark ? colors.primary[400] : "#fff",
            color: isDark ? colors.grey[100] : colors.grey[500],
          }}
        />
      </Paper>
    </Box>
  );
}
