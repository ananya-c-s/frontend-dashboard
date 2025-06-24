import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";

const data = [
  { id: "Confirmed", label: "Confirmed", value: 20, color: "#4caf50" }, // green
  { id: "Pending", label: "Pending", value: 20, color: "#ff9800" }, // orange
  { id: "Cancelled", label: "Cancelled", value: 4, color: "#f44336" }, // red
];

const QuickStatsCard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Background color adapts to theme mode
  const textColor = theme.palette.mode === "dark" ? "#e0e0e0" : "#333";

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
      <CardContent
        sx={{
          color: textColor,
        }}
      >
        {/* Heading */}
        <Typography
          variant="h6"
          fontWeight="bold"
          color={colors.grey[100]}
          sx={{ letterSpacing: 0.5, mb: 2 }}
        >
          Recent Lab Reports
        </Typography>

        {/* Flex layout for chart and details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Donut Chart */}
          <Box sx={{ height: 180, width: 180 }}>
            <ResponsivePie
              data={data}
              colors={(d) => d.data.color}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              innerRadius={0.65}
              padAngle={1}
              cornerRadius={3}
              activeOuterRadiusOffset={6}
              enableArcLabels={false}
              enableArcLinkLabels={false}
              borderWidth={2}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              isInteractive={true}
              animate={true}
              theme={{
                labels: {
                  text: {
                    fontSize: 14,
                    fontWeight: 600,
                  },
                },
                tooltip: {
                  container: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: 14,
                  },
                },
              }}
            />
          </Box>

          {/* Details Section */}
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Details
            </Typography>
            {data.map(({ id, value, color }) => (
              <Box
                key={id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1.5,
                  px: 1,
                  borderRadius: 1,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                }}
              >
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    backgroundColor: color,
                    borderRadius: "50%",
                    mr: 1.5,
                  }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{ flexGrow: 1, color: textColor }}
                >
                  {id}
                </Typography>
                <Typography variant="subtitle1" fontWeight="600" color={color}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickStatsCard;
