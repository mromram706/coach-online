import React, { useEffect } from "react";
import { logPageView } from "../../lib/analytics";
import SubscriptionsHeader from "./Header";
import PlansGrid from "./PlansGrid";
import FeatureComparisonTable from "./FeatureComparisonTable";
import { SubscriptionsProps, Plan } from "../../types/subscription";
import { Container, Paper, Divider, Typography } from "@mui/material";
import { useIntl } from "react-intl";

const transformPlansToFeatures = (plans: Plan[]) => {
  const featureMap: { [key: string]: boolean[] } = {};

  plans.forEach((plan, planIndex) => {
    plan.features.forEach((feature) => {
      if (!featureMap[feature.name]) {
        featureMap[feature.name] = Array(plans.length).fill(false);
      }
      featureMap[feature.name][planIndex] = true;
    });
  });

  return Object.keys(featureMap).map((featureName) => ({
    name: featureName,
    availableIn: featureMap[featureName],
  }));
};

const Subscriptions: React.FC<SubscriptionsProps> = ({ plans }) => {
  const intl = useIntl();

  useEffect(() => {
    logPageView(window.location.pathname);
  }, []);

  const transformedFeatures = transformPlansToFeatures(plans);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <SubscriptionsHeader />
        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" align="center" gutterBottom>
          {intl.formatMessage({ id: "subscriptions.findPerfectPlan" })}{" "}
          <strong>{intl.formatMessage({ id: "subscriptions.exclusiveBenefits" })}</strong>.
        </Typography>
        <PlansGrid plans={plans} />
        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" align="center" gutterBottom>
          {intl.formatMessage({ id: "subscriptions.allPlansInclude" })}{" "}
          <strong>{intl.formatMessage({ id: "subscriptions.support247" })}</strong>{" "}
          {intl.formatMessage({ id: "subscriptions.andAccess" })}{" "}
          <strong>{intl.formatMessage({ id: "subscriptions.regularUpdates" })}</strong>.
          {intl.formatMessage({ id: "subscriptions.ourExperts" })}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom sx={{ mt: 2 }}>
          {intl.formatMessage({ id: "subscriptions.whyChooseUs" })}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {intl.formatMessage({ id: "subscriptions.moreThanService" })}{" "}
          <em>{intl.formatMessage({ id: "subscriptions.trustPartner" })}</em>{" "}
          {intl.formatMessage({ id: "subscriptions.committedToSuccess" })}
          {intl.formatMessage({ id: "subscriptions.ourPlans" })}{" "}
          <strong>{intl.formatMessage({ id: "subscriptions.flexibility" })}</strong>{" "}
          {intl.formatMessage({ id: "subscriptions.and" })}{" "}
          <strong>{intl.formatMessage({ id: "subscriptions.efficiency" })}</strong>,{" "}
          {intl.formatMessage({ id: "subscriptions.achieveGoals" })}.
        </Typography>
        <FeatureComparisonTable features={transformedFeatures} />
        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" align="center" gutterBottom>
          {intl.formatMessage({ id: "subscriptions.dontWaitMore" })}{" "}
          <strong>{intl.formatMessage({ id: "subscriptions.joinUs" })}</strong>{" "}
          {intl.formatMessage({ id: "subscriptions.andEnjoy" })}
          {intl.formatMessage({ id: "subscriptions.communityBenefits" })}.
        </Typography>
        <Typography variant="h6" align="center" gutterBottom sx={{ mt: 2 }}>
          {intl.formatMessage({ id: "subscriptions.additionalBenefits" })}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {intl.formatMessage({ id: "subscriptions.subscribeToAccess" })}
          {intl.formatMessage({ id: "subscriptions.moreTools" })}.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Subscriptions;
