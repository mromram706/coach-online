import { Box, border, margin, width } from "@mui/system";
import React from "react";

type PageContentProps = {
  children: React.ReactNode;
  footerHeight?: string;
  headerHeight?: string;
};

const PageContent: React.FC<PageContentProps> = ({ children, footerHeight, headerHeight }) => {
  return (
    <Box>
      <Box
        sx={{
          marginTop: { headerHeight },
          minHeight: `calc(100vh - ${footerHeight}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url(/images/parallax_background.webp)",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            width: "100%",
            padding: "0 20px",
            boxSizing: "border-box",
            marginTop: { headerHeight },
          }}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                style: {
                  maxWidth: "900px",
                  ...child.props.style,
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                },
              });
            }
            return child;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default PageContent;
