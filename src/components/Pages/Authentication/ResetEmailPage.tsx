import LoginPage, {
  Email,
  Password,
  InnerBox,
  Submit,
} from "@react-login-page/page10";

import LoginImg from "../../../assets/background.png";
import LoginInnerBgImg from "@react-login-page/page10/inner-bg.jpg";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Button from "@mui/material/Button";

export default function ResetEmailPage() {
  const { login } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login();
    navigate("/admin/dashboard");
  };
  const handleReset = (event: React.FormEvent) => {
    event.preventDefault();
    login();
    navigate("/admin/dashboard");
  };
  return (
    <LoginPage
      style={{
        height: 690,
        backgroundImage: `url(${LoginImg})`,
      }}
    >
      {/* Background Panels */}
      <InnerBox style={{ backgroundImage: `url(${LoginInnerBgImg})` }} />

      {/* Login Form */}
      <Email placeholder="Enter Username" name="userUserName" />
      <Password placeholder="Enter Password" name="userPassword" />
      <Button
        onClick={handleReset}
        style={{
          marginTop: "10px",
          background: "none",
          color: colors.grey[500],
          textTransform: "none",
          fontSize: "0.9rem",
          cursor: "pointer",
        }}
      >
        Forgot Password?
      </Button>
      <Submit keyname="submit" onClick={handleSubmit}>
        Submit
      </Submit>
    </LoginPage>
  );
}
