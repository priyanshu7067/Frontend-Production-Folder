import React from "react";
import { Button } from "@mui/material";

const ButtonComponent = ({
  children,
  variant = "primary",
  fullWidth = false,
  onClick,
}) => {
  const styles = {
    primary: {
      background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))",
      color: "#000",
      "&:hover": {
        opacity: 0.9,
      },
    },
    outline: {
      border: "1px solid rgba(34,211,238,0.4)",
      color: "#E5E7EB",
      "&:hover": {
        background: "rgba(255,255,255,0.06)",
      },
    },
     neon: {
      minWidth: "unset",
      // width: 24,
      // height: 24,
      // padding: 0,

      background: "#000",
      border: "1px solid rgba(34,211,238,0.4)",
      color: "#22d3ee",

      boxShadow: "0 0 8px rgba(34,211,238,0.3)",

      "&:hover": {
        background: "#22d3ee",
        color: "#000",
        transform: "scale(1.1)",
        boxShadow: "0 0 14px rgba(34,211,238,0.6)",
      },

      transition: "all 0.2s ease",
    },
  };

  return (
    <Button
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{
        textTransform: "none",
        borderRadius: "10px",
        fontSize: "13px",
        padding: "8px 14px",
        ...styles[variant],
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;