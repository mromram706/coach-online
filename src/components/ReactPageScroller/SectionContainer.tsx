import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  height?: number;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({ children, height = 100 }) => {
  return (
    <div
      style={{
        height: `${height}%`,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default SectionContainer;
