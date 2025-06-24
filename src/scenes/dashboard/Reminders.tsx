import { Card, CardContent, Typography, Box } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const Reminders = () => {
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
            Reminders
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Reminders;
