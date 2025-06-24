import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme"; // Adjust if your theme path differs

const mockAppointments = [
  {
    id: 1,
    time: "09:00 AM",
    clientName: "John Doe",
    service: "General Consultation",
    status: "Confirmed",
    staff: "Dr. Smith",
  },
  {
    id: 2,
    time: "11:30 AM",
    clientName: "Jane Smith",
    service: "Dental Cleaning",
    status: "Pending",
    staff: "Dr. Adams",
  },
  {
    id: 3,
    time: "02:00 PM",
    clientName: "Alice Johnson",
    service: "Physiotherapy",
    status: "Completed",
    staff: "Therapist Lee",
  },
];

const TodayAppointments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data (replace with real API call)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
        color={theme.palette.text.primary}
      >
        Today's Appointments
      </Typography>

      <Card
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? colors.primary[400] : "#fff",
          borderRadius: 3,
          boxShadow: `0 8px 16px rgba(0,0,0,0.1)`,
          overflowX: "auto",
        }}
      >
        <CardContent>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="200px"
            >
              <CircularProgress />
            </Box>
          ) : appointments.length === 0 ? (
            <Typography
              variant="body1"
              color={theme.palette.text.secondary}
              textAlign="center"
            >
              No appointments scheduled for today.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Client Name</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Staff</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appt) => (
                    <TableRow key={appt.id} hover>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>{appt.clientName}</TableCell>
                      <TableCell>{appt.service}</TableCell>
                      <TableCell
                        sx={{
                          color:
                            appt.status === "Confirmed"
                              ? colors.greenAccent[600]
                              : appt.status === "Pending"
                              ? colors.orangeAccent[500]
                              : appt.status === "Completed"
                              ? colors.blueAccent[600]
                              : colors.redAccent[600],
                          fontWeight: "600",
                        }}
                      >
                        {appt.status}
                      </TableCell>
                      <TableCell>{appt.staff}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => alert(`Viewing details for ${appt.clientName}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => alert(`Editing appointment #${appt.id}`)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TodayAppointments;
