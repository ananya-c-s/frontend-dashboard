import { Card, useTheme } from "@mui/material";
import type { CardProps } from "@mui/material";
import { tokens } from "../../theme";

interface CardWrapperProps extends CardProps {
  children: React.ReactNode;
}

const CardWrapper = ({ children, sx, ...rest }: CardWrapperProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Card
      elevation={6}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[400] : "#fff",
        borderRadius: 3,
        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.04)",
          boxShadow: `0 12px 24px rgba(0,0,0,0.25)`,
        },
        ...sx, // allow override if needed
      }}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default CardWrapper;
