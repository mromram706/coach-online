import React, { useState, useEffect } from "react";
import { Box, Container, Typography, IconButton, useMediaQuery, useTheme } from "@mui/material";
import FeedbackCard from "../FeedbackCard";
import feedbacks from "../../../data/feedbacks.json";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import { useSwipeable } from "react-swipeable";

type FeedbackCarouselProps = {
  title?: string;
  description?: string;
};

const FeedbackCarousel: React.FC<FeedbackCarouselProps> = ({ title, description }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isWeb = useMediaQuery(theme.breakpoints.up("md"));
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    if (isMobile) {
      setSlidesToShow(1);
    } else if (isTablet) {
      setSlidesToShow(2);
    } else if (isWeb) {
      setSlidesToShow(3);
    }
  }, [isMobile, isTablet, isWeb]);

  const totalSlides = feedbacks.length;

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - slidesToShow) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: currentSlide < totalSlides - slidesToShow ? handleNext : () => {},
    onSwipedRight: currentSlide > 0 ? handlePrev : () => {},
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <Container sx={{ py: 4, padding: "0px" }}>
      {title && (
        <Box sx={{ textAlign: "center", mb: 4, mt: 9 }}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>
      )}
      <Box {...handlers} sx={{ position: "relative", overflow: "hidden", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.5s ease",
            transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
          }}
        >
          {feedbacks.map((feedback, index) => (
            <Box
              key={index}
              sx={{
                minWidth: `${100 / slidesToShow}%`,
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Box sx={{ maxWidth: 320, width: "100%" }}>
                <FeedbackCard {...feedback} />
              </Box>
            </Box>
          ))}
        </Box>
        <IconButton
          onClick={handlePrev}
          sx={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)" }}
          disabled={currentSlide === 0}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)" }}
          disabled={currentSlide >= totalSlides - slidesToShow}
        >
          <ArrowForwardIosNewIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default FeedbackCarousel;
