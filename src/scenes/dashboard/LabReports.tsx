import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useTheme, type Theme } from "@mui/material/styles";
import { tokens } from "../../theme";

interface LabReport {
  patientName: string;
  testName: string;
  date: string;
  status: "Normal" | "Abnormal" | "Pending";
}

const labReports: LabReport[] = [
  {
    patientName: "Alice Johnson",
    testName: "Complete Blood Count (CBC)",
    date: "2025-06-20",
    status: "Normal",
  },
  {
    patientName: "Bob Smith",
    testName: "Chest X-Ray",
    date: "2025-06-22",
    status: "Abnormal",
  },
];

const statusColor = (status: LabReport["status"], theme: Theme) => {
  switch (status) {
    case "Normal":
      return theme.palette.success.main;
    case "Abnormal":
      return theme.palette.error.main;
    case "Pending":
      return theme.palette.warning.main;
    default:
      return theme.palette.grey[500];
  }
};

const LabReports = () => {
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
          <ScienceIcon
            sx={{
              fontSize: 28,
              backgroundColor: colors.blueAccent[600],
              borderRadius: "50%",
              padding: "6px",
              color: "#fff",
            }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            color={colors.grey[100]}
            sx={{ letterSpacing: 0.5 }}
          >
            Recent Lab Reports
          </Typography>
        </Box>

        {/* List of Reports */}
        <List dense>
          {labReports.map((report, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor: colors.primary[400],
                borderRadius: 2,
                mb: index < labReports.length - 1 ? 1.5 : 0,
                px: 2,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: colors.blueAccent[700],
                    width: 44,
                    height: 44,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  <ScienceIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    {report.patientName}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      variant="body2"
                      color={colors.greenAccent[200]}
                      sx={{ mt: 0.3 }}
                    >
                      {report.testName}
                    </Typography>
                  </>
                }
                sx={{ flex: 3, ml: 2 }}
              />

              <Chip
                label={report.status}
                size="small"
                sx={{
                  backgroundColor: statusColor(report.status, theme),
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.7,
                  minWidth: 80,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  mr: 2,
                }}
                icon={
                  report.status === "Normal" ? (
                    <CheckCircleOutlineIcon />
                  ) : report.status === "Abnormal" ? (
                    <ReportProblemOutlinedIcon />
                  ) : undefined
                }
              />

              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none" }}
                  onClick={() =>
                    alert(`Viewing report for ${report.patientName}`)
                  }
                >
                  View
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  sx={{ textTransform: "none" }}
                  onClick={() =>
                    alert(`Marked report for ${report.patientName} as reviewed`)
                  }
                >
                  Mark Reviewed
                </Button>
              </Stack>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default LabReports;
