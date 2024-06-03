import { Card, Typography, useMediaQuery } from "@mui/material";
import { FeatureHome } from "../../types/index.js";
import { useTheme } from "@mui/material/styles";

type FeatureTitleProps = {
  featureHome: FeatureHome;
};

const FeatureTitle: React.FC<FeatureTitleProps> = ({ featureHome: feature }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (isSmallScreen) {
    return null;
  }

  return (
    <Card
      sx={{
        p: 2,
        background: theme.palette.gradient.main,
        textAlign: "center",
      }}
    >
      <Typography variant="h2">{feature.title}</Typography>
    </Card>
  );
};

export default FeatureTitle;
