import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { FeatureHome } from "../../types/index.js";
import LocalImage from "../ImageComponents/LocalImage";

const FeatureImageDescription: React.FC<{ featureHome: FeatureHome }> = ({ featureHome }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", width: "100%" }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: isSmallScreen ? "56.25%" : "75%", // Maintain aspect ratio (16:9 for small screens, 4:3 for larger screens)
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <LocalImage
              src={featureHome.image}
              alt={featureHome.title}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: isSmallScreen ? "center" : "left",
          }}
        >
          <Box sx={{ color: theme.palette.text.primary, maxWidth: "90%" }}>
            <h2>{featureHome.title}</h2>
            <p>{featureHome.description}</p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeatureImageDescription;
