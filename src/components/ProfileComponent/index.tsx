import React, { useEffect } from "react";
import { Box, Typography, Fade, Grid } from "@mui/material";
import { useStore } from "../../store/store";
import { User } from "../../types/user";
import { getColor } from "../../utils/colorUtils";
import Skeleton from "@mui/material/Skeleton";
import CardBasico, { CardBasicoSkeleton } from "./CardBasico";
import CardFisico, { CardFisicoSkeleton } from "./CardFisico";
import CardDireccion from "../CardDireccion";
import { CardDireccionSkeleton } from "../CardDireccion/CardDireccionSkeleton";
import SubscriptionCard from "./SubscriptionCard";
import { useIntl } from "react-intl";

const ProfileComponent: React.FC = () => {
  const user: User | null = useStore((state) => state.user);
  const plans = useStore((state) => state.plans);
  const loading = useStore((state) => state.loading);
  const intl = useIntl();

  useEffect(() => {
    if (user !== undefined) {
      useStore.getState().setLoading(false);
    }
  }, [user]);

  if (!user || loading) {
    return (
      <Box minHeight="100vh" p={2}>
        <Typography variant="h4" gutterBottom>
          {intl.formatMessage({ id: "profile.title" })}
        </Typography>
        <Fade in={true}>
          <Box>
            <CardBasicoSkeleton />
            <CardDireccionSkeleton />
            <CardFisicoSkeleton />
          </Box>
        </Fade>
      </Box>
    );
  }

  const initialLetter = user.name ? user.name[0].toUpperCase() : "A";
  const colorLetter = getColor(initialLetter);

  return (
    <Box minHeight="100vh" p={2}>
      <Typography variant="h4" gutterBottom>
        {intl.formatMessage({ id: "profile.title" })}
      </Typography>
      <Fade in={true}>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CardBasico user={user} initialLetter={initialLetter} colorLetter={colorLetter} />
            </Grid>
            <Grid item xs={12} md={6}>
              <SubscriptionCard subscription={user.subscription || null} plans={plans} />
            </Grid>
          </Grid>
          <Box mt={3}>
            <CardDireccion />
          </Box>
          <Box mt={3}>
            <CardFisico />
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default ProfileComponent;
