import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const GoogleButton = styled(Button)({
  backgroundColor: "#DB4437",
  color: "white",
  "&:hover": {
    backgroundColor: "#C33A2C",
  },
  width: "100%",
  height: "40px",
});

export const RegisterButton = styled(Button)({
  backgroundColor: "#1976d2",
  color: "white",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
  width: "100%",
  height: "40px",
});

export const EmailLoginButton = styled(Button)({
  backgroundColor: "#4caf50",
  color: "white",
  "&:hover": {
    backgroundColor: "#388e3c",
  },
  width: "100%",
  height: "40px",
});
