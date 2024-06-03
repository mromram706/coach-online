import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography, Divider, useTheme } from "@mui/material";
import { useStore } from "../../store/store";
import { useIntl } from "react-intl";
import PlanConfirmationDialog from "./PlanConfirmationDialog";
import { saveSubscription } from "../../lib/firestore";
import { logUserEvent } from "../../lib/analytics";
import { useRouter } from "next/router";
import { Plan } from "@/src/types/subscription";

type PlanCardProps = {
  plan: Plan;
  isPopular?: boolean;
  isCurrentPlan: boolean;
  isDisabled: boolean;
};

const PlanCard: React.FC<PlanCardProps> = ({ plan, isPopular, isCurrentPlan, isDisabled }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const user = useStore((state) => state.user);
  const intl = useIntl();
  const theme = useTheme();
  const router = useRouter();

  const handleSelectClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmSubscription = async () => {
    if (user) {
      logUserEvent("Plan", `Selected Plan: ${plan.name}`);
      const subscription = await saveSubscription(
        user.userId,
        plan.name,
        plan.planId,
        plan.perUserPerMonth,
      );
      useStore.getState().updateSubscription(subscription);
      router.push("/profile");
    } else {
      console.error("No user is logged in");
    }
  };

  const expirationDate = user?.subscription?.expirationDate
    ? new Date(user.subscription.expirationDate).toLocaleDateString()
    : null;

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        opacity: isDisabled && !isCurrentPlan ? 0.5 : 1,
      }}
    >
      <Card
        elevation={5}
        sx={{
          borderRadius: 3,
          position: "relative",
          backgroundColor: isPopular
            ? theme.palette.background.paper
            : theme.palette.background.default,
          border: isCurrentPlan ? `2px solid ${theme.palette.primary.main}` : "none",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom color="primary">
            {intl.formatMessage({ id: plan.name })}
          </Typography>
          {isCurrentPlan && (
            <Typography
              variant="caption"
              color="primary"
              sx={{
                display: "inline-block",
                padding: "2px 8px",
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 4,
                marginBottom: 2,
              }}
            >
              {intl.formatMessage({ id: "planCard.currentPlan" })}
            </Typography>
          )}
          {isDisabled && !isCurrentPlan && (
            <Typography variant="caption" color="textSecondary">
              {intl.formatMessage({ id: "planCard.superiorPlan" })}
            </Typography>
          )}
          <Divider />
          <Box display="flex" justifyContent="center" alignItems="baseline" mt={2}>
            <Typography variant="h3" color="secondary">
              {plan.price}
            </Typography>
            <Typography variant="h6" color="textSecondary" ml={1}>
              {intl.formatMessage({ id: "planCard.currency" })}
            </Typography>
          </Box>
          <Typography variant="body2" mt={1}>
            {plan.perUserPerMonth
              ? intl.formatMessage({ id: "planCard.perUserPerMonth" })
              : intl.formatMessage({ id: "planCard.perYear" })}
          </Typography>
          {!isDisabled && !isCurrentPlan && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSelectClick}
            >
              {intl.formatMessage({ id: "planCard.selectPlan" })}
            </Button>
          )}
        </CardContent>
        {isCurrentPlan && expirationDate && (
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              padding: "8px 16px",
              borderTop: `1px solid ${theme.palette.divider}`,
              textAlign: "center",
              marginTop: "auto",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {intl.formatMessage({ id: "planCard.expiresOn" })}: {expirationDate}
            </Typography>
          </Box>
        )}
      </Card>
      {isPopular && (
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: -10,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            padding: "4px 12px",
            borderRadius: "4px",
            fontWeight: "bold",
            zIndex: 10,
          }}
        >
          {intl.formatMessage({ id: "planCard.popular" })}
        </Box>
      )}
      <PlanConfirmationDialog
        open={dialogOpen}
        plan={plan}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmSubscription}
      />
    </Box>
  );
};

export default PlanCard;
