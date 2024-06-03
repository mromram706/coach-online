import React from "react";
import { Box, Typography, Link, Grid, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { useIntl } from "react-intl";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(4),
  color: theme.palette.common.white,
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const Footer: React.FC<{ footerRef: React.Ref<HTMLDivElement> }> = ({ footerRef }) => {
  const theme = useTheme();
  const intl = useIntl();
  const year = new Date().getFullYear();

  return (
    <FooterContainer ref={footerRef} theme={theme}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3} container justifyContent="center">
          <Box textAlign="center">
            <Typography variant="h6" style={{ color: theme.palette.common.white }}>
              {intl.formatMessage({ id: "footer.legal" })}
            </Typography>
            <FooterLink href="/privacy-policy">
              {intl.formatMessage({ id: "footer.privacyPolicy" })}
            </FooterLink>
            <br />
            <FooterLink href="/terms">
              {intl.formatMessage({ id: "footer.termsOfService" })}
            </FooterLink>
            <br />
            <FooterLink href="/cookies-policy">
              {intl.formatMessage({ id: "footer.cookiesPolicy" })}
            </FooterLink>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} container justifyContent="center">
          <Box textAlign="center">
            <Typography variant="h6" style={{ color: theme.palette.common.white }}>
              {intl.formatMessage({ id: "footer.contact" })}
            </Typography>
            <FooterLink href="/contactanos">
              {intl.formatMessage({ id: "footer.contactUs" })}
            </FooterLink>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} container justifyContent="center">
          <Box textAlign="center">
            <Typography variant="h6" style={{ color: theme.palette.common.white }}>
              {intl.formatMessage({ id: "footer.followUs" })}
            </Typography>
            <IconButton href="https://facebook.com" target="_blank">
              <Facebook style={{ color: theme.palette.common.white }} />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank">
              <Twitter style={{ color: theme.palette.common.white }} />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank">
              <Instagram style={{ color: theme.palette.common.white }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} container justifyContent="center">
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            style={{ color: theme.palette.common.white }}
          >
            {intl.formatMessage({ id: "footer.coachOnline" }, { year })}
          </Typography>
        </Grid>
      </Grid>
    </FooterContainer>
  );
};

export default Footer;
