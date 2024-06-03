import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Link,
  useTheme,
} from "@mui/material";
import { useIntl } from "react-intl";

const CookieConsent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const theme = useTheme();
  const intl = useIntl();

  useEffect(() => {
    const savedAnalytics = localStorage.getItem("analytics_cookies");
    const savedMarketing = localStorage.getItem("marketing_cookies");

    if (savedAnalytics) setAnalytics(savedAnalytics === "true");
    if (savedMarketing) setMarketing(savedMarketing === "true");

    setConsentGiven(!!(savedAnalytics && savedMarketing));
  }, []);

  const acceptAllCookies = () => {
    setAnalytics(true);
    setMarketing(true);
    localStorage.setItem("analytics_cookies", "true");
    localStorage.setItem("marketing_cookies", "true");
    setConsentGiven(true);
    setOpen(false);
  };

  const savePreferences = () => {
    localStorage.setItem("analytics_cookies", analytics.toString());
    localStorage.setItem("marketing_cookies", marketing.toString());
    setConsentGiven(true);
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {!consentGiven && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            bgcolor: "background.paper",
            boxShadow: 3,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1300,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="body1">
            {intl.formatMessage({ id: "cookieConsent.message" })}{" "}
            <Button variant="text" color="primary" onClick={handleOpen}>
              {intl.formatMessage({ id: "cookieConsent.customize" })}
            </Button>
          </Typography>
          <Box>
            <Button variant="outlined" color="primary" onClick={handleOpen} sx={{ mr: 1 }}>
              {intl.formatMessage({ id: "cookieConsent.settings" })}
            </Button>
            <Button variant="contained" color="primary" onClick={acceptAllCookies}>
              {intl.formatMessage({ id: "cookieConsent.acceptAll" })}
            </Button>
          </Box>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{intl.formatMessage({ id: "cookieConsent.settingsTitle" })}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            {intl.formatMessage({ id: "cookieConsent.description" })}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={analytics} onChange={() => setAnalytics(!analytics)} />}
              label={intl.formatMessage({ id: "cookieConsent.analytics" })}
            />
            <Typography variant="body2" sx={{ ml: 4, mb: 2 }}>
              {intl.formatMessage({ id: "cookieConsent.analyticsDescription" })}
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={marketing} onChange={() => setMarketing(!marketing)} />}
              label={intl.formatMessage({ id: "cookieConsent.marketing" })}
            />
            <Typography variant="body2" sx={{ ml: 4, mb: 2 }}>
              {intl.formatMessage({ id: "cookieConsent.marketingDescription" })}
            </Typography>
          </FormGroup>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {intl.formatMessage({ id: "cookieConsent.moreInfo" })}{" "}
            <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              {intl.formatMessage({ id: "cookieConsent.privacyPolicy" })}
            </Link>
            .
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {intl.formatMessage({ id: "cookieConsent.cancel" })}
          </Button>
          <Button onClick={savePreferences} color="primary">
            {intl.formatMessage({ id: "cookieConsent.savePreferences" })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CookieConsent;
