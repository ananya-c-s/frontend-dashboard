import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const QuickStatsCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    // Example: Quick Stats Card
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
        <Typography
          gutterBottom
          variant="h6"
          fontWeight="bold"
          color={theme.palette.text.primary}
        >
          📌 Quick Stats
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2">Total Today</Typography>
            <Typography variant="h5">25</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Confirmed</Typography>
            <Typography variant="h5" color="success.main">
              20
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Pending</Typography>
            <Typography variant="h5" color="warning.main">
              3
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Cancelled</Typography>
            <Typography variant="h5" color="error.main">
              2
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickStatsCard;
