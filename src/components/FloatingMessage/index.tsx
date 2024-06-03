import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

type FloatingMessageProps = {
  onClick: () => void;
};

// Componente FloatingMessage
const FloatingMessage: React.FC<FloatingMessageProps> = ({ onClick }) => {
  const intl = useIntl();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        color: "white",
        textAlign: "center",
        padding: "10px 0",
        zIndex: 1000,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        sx={{ mb: 2 }}
      >
        <Typography variant="h6">{intl.formatMessage({ id: "index.startChange" })}</Typography>
      </Button>
    </Box>
  );
};

export default FloatingMessage;
