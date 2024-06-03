import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useStore } from "../../../src/store/store";

export const ErrorPopup: React.FC = () => {
  const isErrorPopupOpen = useStore((state) => state.isErrorPopupOpen);
  const errorMessage = useStore((state) => state.errorMessage);
  const setIsErrorPopupOpen = useStore((state) => state.setIsErrorPopupOpen);
  const setErrorMessage = useStore((state) => state.setErrorMessage);

  const handleClose = () => {
    setIsErrorPopupOpen(false);
    setErrorMessage("");
  };
  useEffect(() => {
    if (isErrorPopupOpen) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isErrorPopupOpen]);
  return (
    <Dialog
      open={isErrorPopupOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{errorMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ErrorPopup;
