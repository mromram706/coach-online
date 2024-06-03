import React, { forwardRef } from "react";
import Navigation from "../Navigation";
import { useStore } from "../../store/store";
import SuccessSnackbar from "../SuccessSnackbar";
import LoginPopup from "../LoginPopup";
import { AppBar, Dialog, DialogContent, DialogTitle, Toolbar, Box } from "@mui/material";

const Header = forwardRef<HTMLHeadingElement, { onLocaleChange: (newLocale: string) => void }>(
  ({ onLocaleChange }, ref) => {
    const { registerSuccess, setRegisterSuccess, dialogOpen, setDialogOpen } = useStore();

    return (
      <AppBar position="fixed" ref={ref}>
        <Toolbar>
          <Navigation onLocaleChange={onLocaleChange} />
        </Toolbar>
        <SuccessSnackbar
          open={registerSuccess}
          onClose={() => setRegisterSuccess(false)}
          message="¡Registro exitoso!"
        />
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
          <DialogTitle></DialogTitle>
          <DialogContent>
            <LoginPopup handleClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </AppBar>
    );
  },
);

Header.displayName = "Header";

export default Header;
