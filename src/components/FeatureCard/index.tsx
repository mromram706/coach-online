import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FeatureHome } from "../../types/index.js";
import FeatureTitle from "./FeatureTitle";
import FeatureImageDescription from "./FeatureImageDescription";
import { useTheme } from "@mui/material/styles";

type FeatureCardProps = {
  featureHome: FeatureHome;
  style?: React.CSSProperties;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ featureHome, style }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const theme = useTheme();

  return (
    <div ref={ref} style={style}>
      <motion.div
        initial={{ x: -900, opacity: 0 }}
        animate={{ x: inView ? 0 : -900, opacity: inView ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ background: theme.palette.transparente.main }}
      >
        <FeatureImageDescription featureHome={featureHome} />
      </motion.div>
      <motion.div
        initial={{ x: 900, opacity: 0 }}
        animate={{ x: inView ? 0 : 900, opacity: inView ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ background: theme.palette.gradient.main }}
      >
        <FeatureTitle featureHome={featureHome} />
      </motion.div>
    </div>
  );
};

export default FeatureCard;
