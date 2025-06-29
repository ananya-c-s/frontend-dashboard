import { Grid, Box } from "@mui/material";

// Update the import path to match the actual filename, e.g. CardTodaysAppointments.tsx or CardAppointments.tsx
import CardAppointments from "../../dashboard/cards/TodaysAppointmentsCard";
import CardNotifications from "../../dashboard/cards/NotificationsCard";
import LabReports from "../../dashboard/cards/LabReportsCard";
import QuickStatsCard from "../../dashboard/cards/QuickStatsCard";
import PendingRequests from "../../dashboard/cards/PendingRequestsCard";
import Reminders from "../../dashboard/cards/Reminders";

const HomePage = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3} columns={12}>
        <Grid size={4}>
          <CardAppointments />
        </Grid>
        <Grid size={5}>
          <PendingRequests />
        </Grid>
        <Grid size={3}>
          <CardNotifications />
        </Grid>

        <Grid size={4}>
          <QuickStatsCard />
        </Grid>

        <Grid size={5}>
          <LabReports />
        </Grid>
        <Grid size={3}>
          <Reminders />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
