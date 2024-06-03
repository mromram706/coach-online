import React from "react";
import { Container, Typography, Box, Link, Grid, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useGoogleMaps } from "../src/context/GoogleMapsContext";
import { googleMapsConfig } from "../src/config/googleMapsConfig";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HistoryIcon from "@mui/icons-material/History";
import MissionIcon from "@mui/icons-material/Flag";
import VisionIcon from "@mui/icons-material/Visibility";
import ValueIcon from "@mui/icons-material/Star";
import Image from "next/image";
import { useIntl } from "react-intl";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
}));

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 0,
  paddingBottom: "70.25%",
  borderRadius: "8px",
  overflow: "hidden",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const ConocenosPage: React.FC = () => {
  const theme = useTheme();
  const { loaded } = useGoogleMaps();
  const intl = useIntl();

  return (
    <StyledContainer theme={theme}>
      <Typography variant="h2" component="h1" gutterBottom>
        {intl.formatMessage({ id: "conocenos.title" })}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {intl.formatMessage({ id: "conocenos.description" })}
      </Typography>
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12} md={6}>
          <StyledBox>
            <Image
              src="/images/imagen_conocenos_1.webp"
              alt="Conócenos"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover", objectPosition: "center", borderRadius: "8px" }}
              priority
            />
          </StyledBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Section theme={theme}>
            <Typography variant="h4" component="h2" gutterBottom>
              <HistoryIcon /> {intl.formatMessage({ id: "conocenos.history.title" })}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {intl.formatMessage({ id: "conocenos.history.description" })}
            </Typography>
          </Section>
        </Grid>
      </Grid>
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12} md={6}>
          <Section theme={theme}>
            <Typography variant="h4" component="h2" gutterBottom>
              <MissionIcon /> {intl.formatMessage({ id: "conocenos.mission.title" })}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>{intl.formatMessage({ id: "conocenos.mission.description.mission" })}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>{intl.formatMessage({ id: "conocenos.mission.description.vision" })}</strong>
            </Typography>
          </Section>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledBox>
            <Image
              src="/images/imagen_conocenos_2.webp"
              alt="Misión y Visión"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover", objectPosition: "center", borderRadius: "8px" }}
              priority
            />
          </StyledBox>
        </Grid>
      </Grid>
      <Section theme={theme}>
        <Typography variant="h4" component="h2" gutterBottom>
          <ValueIcon /> {intl.formatMessage({ id: "conocenos.values.title" })}
        </Typography>
        <Box component="ul" sx={{ paddingLeft: 2, marginTop: theme.spacing(3) }}>
          <li>
            <Typography variant="body1" gutterBottom>
              <strong>{intl.formatMessage({ id: "conocenos.values.innovation" })}</strong>
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom>
              <strong>{intl.formatMessage({ id: "conocenos.values.quality" })}</strong>
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom>
              <strong>{intl.formatMessage({ id: "conocenos.values.commitment" })}</strong>
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom>
              <strong>{intl.formatMessage({ id: "conocenos.values.integrity" })}</strong>
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom>
              <strong>{intl.formatMessage({ id: "conocenos.values.sustainability" })}</strong>
            </Typography>
          </li>
        </Box>
      </Section>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            <LocationOnIcon /> {intl.formatMessage({ id: "conocenos.location.title" })}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <LocationOnIcon /> {intl.formatMessage({ id: "conocenos.location.address" })}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {intl.formatMessage({ id: "conocenos.location.postalCode" })}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {intl.formatMessage({ id: "conocenos.location.city" })}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <PhoneIcon /> {intl.formatMessage({ id: "conocenos.contact.phone" })}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <EmailIcon /> {intl.formatMessage({ id: "conocenos.contact.email" })}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: "100%", height: "200px", mt: 3, mb: 3 }}>
            {loaded && (
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                title="Nosotros Ubicación"
                src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsConfig.apiKey}&q=P.º de la Estación, 44, 23008 Jaén`}
                allowFullScreen
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Typography variant="body1" gutterBottom sx={{ mt: 3 }}>
        {intl.formatMessage({ id: "conocenos.contact.link" })}{" "}
        <Link href="/contactanos">{intl.formatMessage({ id: "conocenos.contact.link" })}</Link>.
      </Typography>
    </StyledContainer>
  );
};

export default ConocenosPage;
