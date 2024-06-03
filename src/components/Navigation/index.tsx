import React from "react";
import { AppBar, Toolbar, useTheme, useMediaQuery, Box } from "@mui/material";
import UserSessionNav from "./UserSessionNav";
import MobileNav from "./MobileNav";
import WebNav from "./WebNav";
import TabletNav from "./TabletNav";
import NothingNav from "./NothingNav";
import { useStore } from "../../store/store";
import LanguageSwitcher from "../LanguageSwitcher";
import Logo from "../Logo"; // Importa el componente Logo

const Navigation: React.FC<{ onLocaleChange: (newLocale: string) => void }> = ({
  onLocaleChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:900px)");

  const { hasMounted, setMounted } = useStore();

  React.useEffect(() => {
    setMounted();
  }, []);

  if (!hasMounted) {
    return <NothingNav />;
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          width="100%"
        >
          {!isMobile && !isTablet && <Logo height={40} width={40} />}{" "}
          <Box flex={1} display="flex" alignItems="center" height="100%">
            {isMobile ? <MobileNav /> : isTablet ? <TabletNav /> : <WebNav />}
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <LanguageSwitcher onLocaleChange={onLocaleChange} />
            <UserSessionNav />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
