import React from "react";
import { Typography, Box } from "@mui/material";
import { useIntl } from "react-intl";

const SubscriptionsHeader: React.FC = () => {
  const intl = useIntl();

  return (
    <Box textAlign="center" mb={4}>
      <Typography variant="h2" gutterBottom color="primary">
        {intl.formatMessage({ id: "subscriptionsHeader.title" })}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {intl.formatMessage({ id: "subscriptionsHeader.subtitle" })}
      </Typography>
    </Box>
  );
};

export default SubscriptionsHeader;
