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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
} from "@mui/material";
import { useState, useMemo } from "react";
import { tokens } from "../../../theme";

interface WaitlistEntry {
  id: number;
  patientName: string;
  requestedDateTime: string;
  priority: "High" | "Medium" | "Low";
  status: "waiting" | "notified" | "booked";
}

const initialWaitlist: WaitlistEntry[] = [
  {
    id: 1,
    patientName: "John Doe",
    requestedDateTime: "2025-07-01T10:00:00",
    priority: "High",
    status: "waiting",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    requestedDateTime: "2025-07-02T14:00:00",
    priority: "Medium",
    status: "waiting",
  },
  {
    id: 3,
    patientName: "Alice Johnson",
    requestedDateTime: "2025-07-01T11:30:00",
    priority: "Low",
    status: "notified",
  },
];

export default function WaitlistManagementPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDark = theme.palette.mode === "dark";

  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(initialWaitlist);

  // Filter and sorting states
  const [searchName, setSearchName] = useState("");
  const [sortKey, setSortKey] = useState<"priority" | "requestedDateTime">(
    "priority"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Handle moving patient from waitlist to booked
  const handleBookPatient = (id: number) => {
    setWaitlist((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, status: "booked" } : entry
      )
    );
  };

  // Handle notifying patient (placeholder)
  const handleNotifyPatient = (id: number) => {
    setWaitlist((prev) =>
      prev.map((entry) =>
        entry.id === id && entry.status === "waiting"
          ? { ...entry, status: "notified" }
          : entry
      )
    );
    alert("Notification sent to patient (placeholder).");
  };

  // Filter + sort the waitlist for display
  const filteredSortedWaitlist = useMemo(() => {
    const filtered = waitlist.filter((entry) =>
      entry.patientName.toLowerCase().includes(searchName.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortKey === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        // sortKey === "requestedDateTime"
        return sortOrder === "asc"
          ? new Date(a.requestedDateTime).getTime() -
              new Date(b.requestedDateTime).getTime()
          : new Date(b.requestedDateTime).getTime() -
              new Date(a.requestedDateTime).getTime();
      }
    });

    return filtered;
  }, [waitlist, searchName, sortKey, sortOrder]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 600, color: colors.greenAccent[400], mb: 3 }}
      >
        Waitlist Management
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search Patient"
          variant="outlined"
          size="small"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            label="Sort By"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="requestedDateTime">Requested Date</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel>Order</InputLabel>
          <Select
            label="Order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Paper
        elevation={3}
        sx={{
          backgroundColor: isDark ? colors.primary[400] : "#fff",
          borderRadius: 3,
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
          overflowX: "auto",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: colors.grey[100] }}>
                  Patient Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.grey[100] }}>
                  Requested Date & Time
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.grey[100] }}>
                  Priority
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: colors.grey[100] }}>
                  Status
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: colors.grey[100] }}
                  align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredSortedWaitlist.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="text.secondary">
                      No patients found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSortedWaitlist.map((entry) => {
                  const dateObj = new Date(entry.requestedDateTime);
                  const dateStr = dateObj.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });
                  const timeStr = dateObj.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  });

                  return (
                    <TableRow key={entry.id} hover>
                      <TableCell>{entry.patientName}</TableCell>
                      <TableCell>
                        {dateStr} at {timeStr}
                      </TableCell>
                      <TableCell>{entry.priority}</TableCell>
                      <TableCell
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          color:
                            entry.status === "waiting"
                              ? colors.blueAccent[400]
                              : entry.status === "notified"
                              ? colors.redAccent[400]
                              : colors.greenAccent[400],
                        }}
                      >
                        {entry.status}
                      </TableCell>
                      <TableCell align="right">
                        {entry.status !== "booked" && (
                          <>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              sx={{ mr: 1 }}
                              onClick={() => handleBookPatient(entry.id)}
                            >
                              Book
                            </Button>
                            {entry.status === "waiting" && (
                              <Button
                                variant="outlined"
                                color="warning"
                                size="small"
                                onClick={() => handleNotifyPatient(entry.id)}
                              >
                                Notify
                              </Button>
                            )}
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
