import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type FloatingTopMessageProps = {
  message: string;
};

const FloatingTopMessage: React.FC<FloatingTopMessageProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        width: "100%",
        backgroundColor: theme.palette.transparente.light,
        color: theme.palette.primary.contrastText,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 1,
        boxShadow: theme.shadows[4],
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default FloatingTopMessage;
