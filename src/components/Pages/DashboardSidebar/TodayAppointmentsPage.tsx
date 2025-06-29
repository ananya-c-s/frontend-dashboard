import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  status: "pending" | "accepted" | "declined" | "urgent-declined";
}

const allAppointments: Appointment[] = [
  {
    id: 1,
    appointmentTime: "2025-06-26T09:00:00",
    appointmentType: "Follow-up",
    notes: "Chest pain discussion",
    status: "accepted",
  },
  {
    id: 2,
    appointmentTime: "2025-06-26T13:30:00",
    appointmentType: "Initial",
    notes: "Migraine evaluation",
    status: "pending",
  },
  {
    id: 3,
    appointmentTime: "2025-06-25T10:00:00",
    appointmentType: "Follow-up",
    notes: "Not today's appointment",
    status: "pending",
  },
];

export default function TodayAppointmentsPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDark = theme.palette.mode === "dark";

  const today = new Date();

  // Filter accepted appointments for today
  const acceptedAppointments = allAppointments.filter((appt) => {
    const apptDate = new Date(appt.appointmentTime);
    return (
      appt.status === "accepted" &&
      apptDate.getFullYear() === today.getFullYear() &&
      apptDate.getMonth() === today.getMonth() &&
      apptDate.getDate() === today.getDate()
    );
  });

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle pagination page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginate accepted appointments
  const paginatedAppointments = acceptedAppointments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatDateTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const chipColors = {
    accepted: { color: colors.greenAccent[300] },
    declined: { color: colors.redAccent[300] },
    pending: { color: colors.blueAccent[300] },
    "urgent-declined": { color: "#ff1744" },
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 600, color: colors.greenAccent[400], mb: 3 }}
      >
        Today's Accepted Appointments
      </Typography>

      <Paper
        elevation={3}
        sx={{
          backgroundColor: isDark ? colors.primary[400] : "#fff",
          borderRadius: 3,
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: colors.grey[100] }}>
                  Time
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.grey[100] }}>
                  Type
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.grey[100] }}>
                  Notes
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.grey[100] }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography color="text.secondary">
                      No accepted appointments for today.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedAppointments.map((appt) => (
                  <TableRow key={appt.id} hover>
                    <TableCell>
                      {formatDateTime(appt.appointmentTime)}
                    </TableCell>
                    <TableCell>{appt.appointmentType}</TableCell>
                    <TableCell>{appt.notes}</TableCell>
                    <TableCell>
                      <Chip
                        label={appt.status.toUpperCase()}
                        sx={{
                          color: chipColors[appt.status].color,
                          borderColor: chipColors[appt.status].color,
                          borderWidth: 1,
                          borderStyle: "solid",
                          fontWeight: "bold",
                        }}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={acceptedAppointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            bgcolor: isDark ? colors.primary[700] : colors.primary[100],
            color: isDark ? colors.grey[100] : colors.grey[800],
          }}
        />
      </Paper>
    </Box>
  );
}
