import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { styled, useTheme, Theme } from "@mui/material/styles";
import { Facebook, Twitter, Instagram, LocationOn, Phone, Email } from "@mui/icons-material";
import { useIntl } from "react-intl";

const StyledContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
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

const StyledForm = styled("form")(({ theme }: { theme: Theme }) => ({
  width: "100%",
  marginTop: theme.spacing(2),
}));

const StyledSubmitButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(2),
}));

const ContactInfo = styled(Box)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(4),
  width: "100%",
}));

const SocialMedia = styled(Box)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
}));

const Contactanos: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const theme = useTheme();
  const intl = useIntl();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Formulario enviado:", { nombre, email, mensaje });
  };

  return (
    <StyledContainer theme={theme}>
      <Typography variant="h2" component="h1" gutterBottom>
        {intl.formatMessage({ id: "contactanos.title" })}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {intl.formatMessage({ id: "contactanos.description" })}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {intl.formatMessage({ id: "contactanos.form.instructions" })}
      </Typography>
      <StyledForm theme={theme} onSubmit={handleSubmit}>
        <TextField
          id="nombre"
          label={intl.formatMessage({ id: "contactanos.form.name" })}
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="email"
          label={intl.formatMessage({ id: "contactanos.form.email" })}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          id="mensaje"
          label={intl.formatMessage({ id: "contactanos.form.message" })}
          value={mensaje}
          onChange={(event) => setMensaje(event.target.value)}
          margin="normal"
          fullWidth
          multiline
          rows={4}
          required
        />
        <StyledSubmitButton theme={theme} type="submit" variant="contained" color="primary">
          {intl.formatMessage({ id: "contactanos.form.submit" })}
        </StyledSubmitButton>
      </StyledForm>
      <ContactInfo theme={theme}>
        <Typography variant="h6" gutterBottom>
          {intl.formatMessage({ id: "contactanos.info.title" })}
        </Typography>
        <Divider />
        <Grid container spacing={2} alignItems="center" marginTop={2}>
          <Grid item>
            <LocationOn color="primary" />
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {intl.formatMessage({ id: "contactanos.info.address" })}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" marginTop={2}>
          <Grid item>
            <Phone color="primary" />
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {intl.formatMessage({ id: "contactanos.info.phone" })}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" marginTop={2}>
          <Grid item>
            <Email color="primary" />
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {intl.formatMessage({ id: "contactanos.info.email" })}
            </Typography>
          </Grid>
        </Grid>
      </ContactInfo>
      <SocialMedia theme={theme}>
        <IconButton href="https://facebook.com/coachonline" target="_blank" color="primary">
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com/coachonline" target="_blank" color="primary">
          <Twitter />
        </IconButton>
        <IconButton href="https://instagram.com/coachonline" target="_blank" color="primary">
          <Instagram />
        </IconButton>
      </SocialMedia>
    </StyledContainer>
  );
};

export default Contactanos;
