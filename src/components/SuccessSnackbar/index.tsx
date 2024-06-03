import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface SuccessSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const SuccessSnackbar: React.FC<SuccessSnackbarProps> = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        sx={{
          width: "100%",
          bgcolor: "green",
          color: "black",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
