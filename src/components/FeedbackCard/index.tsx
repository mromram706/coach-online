import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";

type FeedbackCardProps = {
  name: string;
  rating: number;
  comment: string;
};

const FeedbackCard: React.FC<FeedbackCardProps> = ({ name, rating, comment }) => {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <Box>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <Star key={i} />
          ))}
        {halfStars === 1 && <StarHalf />}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <StarBorder key={i} />
          ))}
      </Box>
    );
  };

  return (
    <Card
      sx={{
        marginBottom: 5,
        marginTop: 5,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Box display="flex" justifyContent="center" mb={1}>
          {renderStars()}
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center" }}>
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
