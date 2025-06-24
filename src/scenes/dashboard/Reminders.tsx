import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const Reminders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const reminders = [
    { id: 1, text: "Doctor appointment", time: "10:00 AM" },
    { id: 2, text: "Team meeting", time: "2:00 PM" },
    { id: 3, text: "Submit project report", time: "5:00 PM" },
  ];

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
              fontSize: 28,
              backgroundColor: colors.redAccent[500],
              color: "#fff",
              borderRadius: "50%",
              padding: "6px",
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

        {/* Reminders List */}
        <List>
          {reminders.map((reminder, index) => (
            <Box key={reminder.id}>
              <ListItem
                disablePadding
                sx={{
                  py: 1,
                  px: 1.5,
                  borderRadius: 2,
                  cursor: "default",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? colors.primary[500]
                        : colors.grey[100],
                  },
                }}
              >
                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  fontWeight={600}
                >
                  {reminder.text}
                </Typography>
                <Typography
                  variant="body2"
                  color={theme.palette.text.secondary}
                  sx={{ minWidth: 70, textAlign: "right" }}
                >
                  {reminder.time}
                </Typography>
              </ListItem>
              {index < reminders.length - 1 && <Divider component="li" />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Reminders;
