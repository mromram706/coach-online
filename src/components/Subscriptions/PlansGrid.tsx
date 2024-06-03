import React, { useEffect } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import PlanCard from "./PlanCard";
import { useStore } from "../../store/store";
import { Plan } from "@/src/types/subscription";

type PlansGridProps = {
  plans: Plan[];
};

const PlansGrid: React.FC<PlansGridProps> = ({ plans }) => {
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.loading);

  useEffect(() => {
    if (user !== undefined) {
      useStore.getState().setLoading(false);
    }
  }, [user]);

  const currentPlanId = user?.subscription?.planId;

  return (
    <Box mt={4}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {plans.map((plan, index) => {
            const isCurrentPlan = plan.planId === currentPlanId;
            const currentPlanIndex = plans.findIndex((p) => p.planId === currentPlanId);
            const isDisabled = currentPlanId ? currentPlanIndex >= index : false;

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={plan.planId}>
                <PlanCard
                  plan={plan}
                  isPopular={index === 2}
                  isCurrentPlan={isCurrentPlan}
                  isDisabled={isDisabled && !isCurrentPlan} // Ensure the current plan is not disabled
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default PlansGrid;
