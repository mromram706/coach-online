import React from "react";
import { Drawer, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavListButton from "./NavList";
import Logo from "../Logo";

const TabletNav: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" height="100%">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Logo height={40} width={40} /> {/* Ajusta el logo aquí */}
      </Box>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ style: { width: "300px" } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            backgroundColor: "primary.main",
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="close drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Logo height={40} width={40} /> {/* Añade el logo aquí */}
        </Box>
        <NavListButton flexDirection="column" color="black" onClick={handleDrawerToggle} />
      </Drawer>
    </>
  );
};

export default TabletNav;
