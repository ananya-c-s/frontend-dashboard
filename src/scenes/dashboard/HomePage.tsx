import { Grid, Box } from "@mui/material";

import CardAppointments from "../dashboard/CardTodaysAppointments";
import CardNotifications from "../dashboard/CardNotifications";
// import QuickStatsCard from "../dashboard/CardNotifications";
// import PatientStatus from "../dashboard/PatientStatus";
// import Reminders from "../dashboard/Reminders";

//import UpcomingAppointments from "../dashboard/UpcomingAppointments";
// import CardQuickLinks from "../dashboard/CardQuickLinks"
// import CardStats from "../dashboard/CardStats"
import PendingRequests from "../dashboard/PendingRequests";

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
        {/* <Grid size={4}>
          <QuickStatsCard />
        </Grid>

        <Grid size={6}>
          <PatientStatus />
        </Grid>
        <Grid size={12}>
          <Reminders />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default HomePage;
