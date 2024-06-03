import React from "react";
import { Button } from "@mui/material";
import PayPalIcon from "@mui/icons-material/Payment";

const PayPalButton: React.FC = () => {
  return (
    <Button
      variant="outlined"
      startIcon={<PayPalIcon />}
      sx={{
        backgroundColor: "#FFC439",
        color: "black",
        "&:hover": {
          backgroundColor: "#FFC439",
        },
        width: "100%",
        height: "40px",
      }}
    >
      PayPal
    </Button>
  );
};

export default PayPalButton;
