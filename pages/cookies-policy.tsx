import React from "react";
import { Container, Typography, Box, Paper, Link } from "@mui/material";
import { styled } from "@mui/system";
import { useIntl } from "react-intl";

const BackgroundContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
  minHeight: "100vh",
}));

const CookiesPolicy = () => {
  const intl = useIntl();

  return (
    <BackgroundContainer>
      <Container component={Paper} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {intl.formatMessage({ id: "cookies.title" })}
        </Typography>
        <Typography variant="body1" paragraph>
          {intl.formatMessage({ id: "cookies.introduction" })}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "cookies.whatAreCookies" })}
        </Typography>
        <Typography variant="body1" paragraph>
          {intl.formatMessage({ id: "cookies.whatAreCookiesDescription" })}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "cookies.howWeUseCookies" })}
        </Typography>
        <Typography variant="body1" paragraph>
          {intl.formatMessage({ id: "cookies.howWeUseCookiesDescription" })}
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>{intl.formatMessage({ id: "cookies.necessaryCookies" })}:</strong>{" "}
              {intl.formatMessage({ id: "cookies.necessaryCookiesDescription" })}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>{intl.formatMessage({ id: "cookies.functionalityCookies" })}:</strong>{" "}
              {intl.formatMessage({ id: "cookies.functionalityCookiesDescription" })}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>{intl.formatMessage({ id: "cookies.performanceCookies" })}:</strong>{" "}
              {intl.formatMessage({ id: "cookies.performanceCookiesDescription" })}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>{intl.formatMessage({ id: "cookies.advertisingCookies" })}:</strong>{" "}
              {intl.formatMessage({ id: "cookies.advertisingCookiesDescription" })}
            </Typography>
          </li>
        </ul>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "cookies.manageCookies" })}
        </Typography>
        <Typography variant="body1" paragraph>
          {intl.formatMessage({ id: "cookies.manageCookiesDescription" })}{" "}
          <Link href="https://www.aboutcookies.org" target="_blank" rel="noopener">
            AboutCookies.org
          </Link>
          .
        </Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "cookies.changesPolicy" })}
        </Typography>
        <Typography variant="body1" paragraph>
          {intl.formatMessage({ id: "cookies.changesPolicyDescription" })}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "cookies.contact" })}
        </Typography>
        <Typography variant="body1" paragraph>
          {intl.formatMessage({ id: "cookies.contactDescription" })}
        </Typography>
      </Container>
    </BackgroundContainer>
  );
};

export default CookiesPolicy;
