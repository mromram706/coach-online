import React from "react";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useIntl } from "react-intl";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type LoginPopupProps = {
  handleClose: () => void;
};

const LoginPopup: React.FC<LoginPopupProps> = ({ handleClose }) => {
  const intl = useIntl();
  const matches = useMediaQuery("(min-width:850px)");
  const theme = useTheme();

  return (
    <Grid container spacing={matches ? 10 : 5}>
      <Grid item xs={12} sm={6}>
        <Box
          bgcolor={theme.palette.background.paper}
          padding={matches ? "20px" : "10px"}
          width="100%"
          boxSizing="border-box"
          overflow="auto"
        >
          <Typography variant="h6" color="textPrimary">
            {intl.formatMessage({ id: "login.title" })}
          </Typography>
          <LoginForm handleClose={handleClose} />
          <Box marginTop="20px">
            <Typography variant="body2" color="textSecondary">
              {intl.formatMessage({ id: "login.terms" })}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box
          bgcolor={theme.palette.background.paper}
          padding={matches ? "20px" : "10px"}
          width="100%"
          boxSizing="border-box"
          overflow="auto"
        >
          <Typography variant="h6" color="textPrimary">
            {intl.formatMessage({ id: "register.title" })}
          </Typography>
          <RegisterForm handleClose={handleClose} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPopup;
