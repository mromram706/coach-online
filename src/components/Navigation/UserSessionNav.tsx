import React from "react";
import { Button, Box, Avatar, Skeleton } from "@mui/material";
import Link from "next/link";
import { useIntl } from "react-intl";
import { useStore } from "../../store/store";
import { signOut } from "../../lib/auth";
import { getColor } from "../../utils/colorUtils";

const UserSessionNav: React.FC = () => {
  const { user, loading, setSession, setDialogOpen } = useStore();
  const intl = useIntl();

  const handleLogoutClick = async () => {
    try {
      await signOut();
      setSession(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (user === null) {
    return (
      <Button color="inherit" onClick={() => setDialogOpen(true)}>
        {intl.formatMessage({ id: "navigation.login" })}
      </Button>
    );
  }

  if (loading) {
    return (
      <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "right" }}>
        <Skeleton variant="circular" width={45} height={45} />
      </Box>
    );
  }

  const initialLetter = user.name ? user.name[0].toUpperCase() : "A";
  const colorLetter = getColor(initialLetter);

  return (
    <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "right" }}>
      <Button color="inherit" onClick={handleLogoutClick}>
        {intl.formatMessage({ id: "navigation.logout" })}
      </Button>
      <Link href="/profile" passHref>
        <Button>
          <Avatar
            src={user.photoURL}
            alt={user.name}
            sx={{ bgcolor: user.photoURL ? "inherit" : colorLetter }}
          >
            {user.photoURL ? null : initialLetter}
          </Avatar>
        </Button>
      </Link>
    </Box>
  );
};

export default UserSessionNav;
