import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Importa el icono de perfil
import { useIntl } from "react-intl";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

interface NavListProps {
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  color?: string;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit";
  onClick?: () => void;
}

const NavList: React.FC<NavListProps> = ({
  flexDirection = "row",
  color = "black",
  variant = "button",
  onClick = () => {},
  ...otherProps
}) => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Box style={{ display: "flex", flexDirection: flexDirection }}>
      <Link href="/" passHref>
        <IconButton onClick={onClick} sx={{ color: theme.palette.text.primary }}>
          <HomeIcon />
          <Typography sx={{ marginLeft: 1 }} variant={variant}>
            {intl.formatMessage({ id: "navigation.home" })}
          </Typography>
        </IconButton>
      </Link>
      <Link href="/profile" passHref>
        <IconButton onClick={onClick} sx={{ color: theme.palette.text.primary }}>
          <AccountCircleIcon />
          <Typography sx={{ marginLeft: 1 }} variant={variant}>
            {intl.formatMessage({ id: "navigation.profile" })}
          </Typography>
        </IconButton>
      </Link>
      <Link href="/conocenos" passHref>
        <IconButton onClick={onClick} sx={{ color: theme.palette.text.primary }}>
          <InfoIcon />
          <Typography sx={{ marginLeft: 1 }} variant={variant}>
            {intl.formatMessage({ id: "navigation.about" })}
          </Typography>
        </IconButton>
      </Link>
      <Link href="/subscripcion" passHref>
        <IconButton onClick={onClick} sx={{ color: theme.palette.text.primary }}>
          <SubscriptionsIcon />
          <Typography sx={{ marginLeft: 1 }} variant={variant}>
            {intl.formatMessage({ id: "navigation.services" })}
          </Typography>
        </IconButton>
      </Link>
      <Link href="/contactanos" passHref>
        <IconButton onClick={onClick} sx={{ color: theme.palette.text.primary }}>
          <ContactMailIcon />
          <Typography sx={{ marginLeft: 1 }} variant={variant}>
            {intl.formatMessage({ id: "navigation.contact" })}
          </Typography>
        </IconButton>
      </Link>
    </Box>
  );
};

export default NavList;
