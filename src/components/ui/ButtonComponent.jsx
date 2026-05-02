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
      border: "1px solid rgba(255,255,255,0.15)",
      color: "#E5E7EB",
      "&:hover": {
        background: "rgba(255,255,255,0.06)",
      },
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