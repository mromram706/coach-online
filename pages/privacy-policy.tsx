import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { styled, useTheme, Theme } from "@mui/material/styles";
import { useIntl } from "react-intl";

const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  maxWidth: "800px",
  width: "100%",
}));

const PrivacyPolicy: React.FC = () => {
  const intl = useIntl();

  return (
    <BackgroundBox>
      <ContentBox>
        <Typography variant="h4" gutterBottom>
          {intl.formatMessage({ id: "privacy.title" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "privacy.introduction" })}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "privacy.infoWeCollect" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "privacy.infoWeCollectDescription" })}
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              {intl.formatMessage({ id: "privacy.nameEmail" })}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {intl.formatMessage({ id: "privacy.usageInfo" })}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {intl.formatMessage({ id: "privacy.otherInfo" })}
            </Typography>
          </li>
        </ul>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "privacy.useOfInfo" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "privacy.useOfInfoDescription" })}
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              {intl.formatMessage({ id: "privacy.provideServices" })}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {intl.formatMessage({ id: "privacy.improveServices" })}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {intl.formatMessage({ id: "privacy.communicate" })}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {intl.formatMessage({ id: "privacy.legalObligations" })}
            </Typography>
          </li>
        </ul>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "privacy.protectInfo" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "privacy.protectInfoDescription" })}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "privacy.changesPolicy" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "privacy.changesPolicyDescription" })}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "privacy.contact" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "privacy.contactDescription" })}
        </Typography>
      </ContentBox>
    </BackgroundBox>
  );
};

export default PrivacyPolicy;
