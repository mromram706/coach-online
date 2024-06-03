import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FeedbackCarousel from "../src/components/FeedbackCarousel";
import { useStore } from "../src/store/store";
import FeatureCard from "../src/components/FeatureCard";
import { FeatureHome } from "../src/types/index.js";
import { useIntl } from "react-intl";
import ReactPageScroller, { ReactPageScrollerRef } from "@/src/components/ReactPageScroller";
import { useRouter } from "next/router";
import Footer from "../src/components/Footer";
import PageContent from "@/src/components/PageContent";
import FloatingMessage from "../src/components/FloatingMessage";
import FloatingTopMessage from "../src/components/FloatingTopMessage";

const IndexPage: React.FC = () => {
  const featuresHome: FeatureHome[] = useStore((state) => state.featuresHome);
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const intl = useIntl();
  const router = useRouter();
  const [showFloatingMessage, setShowFloatingMessage] = useState(true);
  const scrollerRef = useRef<ReactPageScrollerRef>(null);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const handlePageChange = (page: number) => {
    if (page === featuresHome.length) {
      setShowFloatingMessage(false);
    } else {
      setShowFloatingMessage(true);
    }

    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleSubscriptionClick = () => {
    router.push("/subscripcion");
  };

  const topMessage = intl.formatMessage({
    id: "index.topMessage",
    defaultMessage:
      "ÚNETE A NOSOTROS Y TRANSFORMA TU VIDA CON NUESTROS ENTRENAMIENTOS PERSONALIZADOS.",
  });

  const handleArrowClick = () => {
    if (scrollerRef.current) {
      scrollerRef.current.goToPage(currentPage + 1);
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <ReactPageScroller ref={scrollerRef} pageOnChange={handlePageChange}>
        {featuresHome.map((featureHome, index) => (
          <Box
            key={featureHome.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
              maxWidth: "100%",
              position: "relative",
            }}
          >
            <FeatureCard
              featureHome={{
                ...featureHome,
                title: intl.formatMessage({ id: featureHome.title }),
                description: intl.formatMessage({
                  id: featureHome.description,
                }),
              }}
            />
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
            maxWidth: "100%",
            position: "relative",
          }}
        >
          <PageContent>{undefined}</PageContent>
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
              mt: 9,
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            <Typography variant="h4" gutterBottom>
              {intl.formatMessage({ id: "index.feedbackTitle" })}
            </Typography>
            <Typography variant="body1">
              {intl.formatMessage({ id: "index.feedbackDescription" })}
            </Typography>
          </Box>

          <FeedbackCarousel />
          <Box
            sx={{
              width: "100%",
              color: "white",
              textAlign: "center",
              py: 2,
              zIndex: 1000,
              mt: 2,
            }}
          >
            <Typography variant="h6">Comienza el cambio</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubscriptionClick}
              sx={{ mt: 1 }}
            >
              Suscribirse
            </Button>
          </Box>
          <Box
            sx={{
              width: "100%",
              position: "relative",
            }}
          >
            <Footer footerRef={null} />
          </Box>
        </Box>
      </ReactPageScroller>
      {showFloatingMessage && <FloatingMessage onClick={handleSubscriptionClick} />}
      {!(isMobile || currentPage === featuresHome.length) && (
        <FloatingTopMessage message={topMessage} />
      )}
      {currentPage < featuresHome.length && (
        <Box
          sx={{
            position: "fixed",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            cursor: "pointer",
          }}
          onClick={handleArrowClick}
        >
          <ArrowBackIosNewIcon
            sx={{
              transform: "rotate(270deg)",
              color: "#FFFFFF",
              fontSize: "2rem",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default IndexPage;
