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

const TermsOfService: React.FC = () => {
  const intl = useIntl();

  return (
    <BackgroundBox>
      <ContentBox>
        <Typography variant="h4" gutterBottom>
          {intl.formatMessage({ id: "terms.title" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "terms.introduction" })}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "terms.acceptance" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "terms.acceptanceDescription" })}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "terms.modifications" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "terms.modificationsDescription" })}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "terms.usage" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "terms.usageDescription" })}
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              {intl.formatMessage({ id: "terms.contentChanges" })}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">{intl.formatMessage({ id: "terms.cookies" })}</Typography>
          </li>
          <li>
            <Typography variant="body1">
              {intl.formatMessage({ id: "terms.noWarranty" })}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">{intl.formatMessage({ id: "terms.atOwnRisk" })}</Typography>
          </li>
        </ul>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "terms.intellectualProperty" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "terms.intellectualPropertyDescription" })}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {intl.formatMessage({ id: "terms.contact" })}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {intl.formatMessage({ id: "terms.contactDescription" })}
        </Typography>
      </ContentBox>
    </BackgroundBox>
  );
};

export default TermsOfService;
