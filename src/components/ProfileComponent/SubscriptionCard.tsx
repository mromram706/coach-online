import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  List,
  ListItem,
  Box,
  Divider,
} from "@mui/material";
import { Subscription, Plan } from "../../types/subscription";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { differenceInDays } from "date-fns";

type SubscriptionCardProps = {
  subscription: Subscription | null;
  plans: Plan[];
};

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, plans }) => {
  const router = useRouter();
  const intl = useIntl();

  const handleUpgrade = () => {
    router.push("/subscripcion");
  };

  const currentPlan = plans.find((plan) => plan.planId === subscription?.planId);
  const allFeatures = plans.reduce((acc, plan) => {
    plan.features.forEach((feature) => {
      if (!acc.includes(feature.name)) {
        acc.push(feature.name);
      }
    });
    return acc;
  }, [] as string[]);

  const isLastPlan = currentPlan && currentPlan.planId === plans[plans.length - 1].planId;

  const renderSubscriptionDetails = () => {
    const expirationDate = new Date(subscription!.expirationDate);
    const daysRemaining = differenceInDays(expirationDate, new Date());

    return (
      <>
        <Typography variant="h5" gutterBottom textAlign="center">
          {intl.formatMessage({ id: currentPlan!.name })}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}>
                {intl.formatMessage({ id: "planConfirmationDialog.features" })}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <List>
                    {allFeatures
                      .slice(0, Math.ceil(allFeatures.length / 2))
                      .map((feature, index) => (
                        <ListItem key={index} sx={{ justifyContent: "flex-start" }}>
                          {currentPlan!.features.some((f) => f.name === feature) ? (
                            <>
                              <CheckIcon sx={{ color: "green", mr: 1 }} />
                              <Typography>{intl.formatMessage({ id: feature })}</Typography>
                            </>
                          ) : (
                            <>
                              <CloseIcon sx={{ color: "text.disabled", mr: 1 }} />
                              <Typography color="text.disabled">
                                {intl.formatMessage({ id: feature })}
                              </Typography>
                            </>
                          )}
                        </ListItem>
                      ))}
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <List>
                    {allFeatures.slice(Math.ceil(allFeatures.length / 2)).map((feature, index) => (
                      <ListItem key={index} sx={{ justifyContent: "flex-start" }}>
                        {currentPlan!.features.some((f) => f.name === feature) ? (
                          <>
                            <CheckIcon sx={{ color: "green", mr: 1 }} />
                            <Typography>{intl.formatMessage({ id: feature })}</Typography>
                          </>
                        ) : (
                          <>
                            <CloseIcon sx={{ color: "text.disabled", mr: 1 }} />
                            <Typography color="text.disabled">
                              {intl.formatMessage({ id: feature })}
                            </Typography>
                          </>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="body1">
                  {intl.formatMessage({ id: "profile.expirationDate" })}:{" "}
                  {expirationDate.toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  {intl.formatMessage({ id: "profile.daysRemaining" })}: {daysRemaining}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        {!isLastPlan && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleUpgrade}>
              {intl.formatMessage({ id: "profile.updatePlanMessage" })}
            </Button>
          </Box>
        )}
      </>
    );
  };

  const renderNoSubscriptionDetails = () => (
    <>
      <Typography variant="h6" gutterBottom textAlign="center">
        {intl.formatMessage({ id: "profile.noSubscription" })}
      </Typography>
      <Box>
        <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}>
            {intl.formatMessage({ id: "planConfirmationDialog.features" })}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <List>
                {allFeatures.slice(0, Math.ceil(allFeatures.length / 2)).map((feature, index) => (
                  <ListItem key={index} sx={{ justifyContent: "flex-start" }}>
                    <CloseIcon sx={{ color: "text.disabled", mr: 1 }} />
                    <Typography color="text.disabled">
                      {intl.formatMessage({ id: feature })}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={6}>
              <List>
                {allFeatures.slice(Math.ceil(allFeatures.length / 2)).map((feature, index) => (
                  <ListItem key={index} sx={{ justifyContent: "flex-start" }}>
                    <CloseIcon sx={{ color: "text.disabled", mr: 1 }} />
                    <Typography color="text.disabled">
                      {intl.formatMessage({ id: feature })}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleUpgrade}>
              {intl.formatMessage({ id: "profile.updatePlanMessage" })}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        {subscription ? renderSubscriptionDetails() : renderNoSubscriptionDetails()}
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
