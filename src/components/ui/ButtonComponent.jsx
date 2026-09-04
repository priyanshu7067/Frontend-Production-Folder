import React from "react";
import { Button } from "@mui/material";

const ButtonComponent = ({
  children,
  variant = "primary",
  fullWidth = false,
  onClick,
  wrap = true,
  padding = "10px 20px",
  type = "button",
  disabled = false,
  startIcon,
  endIcon,
}) => {
  const styles = {
    primary: {
      background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
      color: "#ffffff",
      fontWeight: 600,
      boxShadow: "0 4px 14px 0 rgba(2, 132, 199, 0.25)",
      "&:hover": {
        background: "linear-gradient(135deg, #0369a1 0%, #0284c7 100%)",
        boxShadow: "0 6px 18px 0 rgba(2, 132, 199, 0.35)",
      },
    },
    secondary: {
      backgroundColor: "#0f172a",
      color: "#ffffff",
      fontWeight: 600,
      "&:hover": {
        backgroundColor: "#1e293b",
      },
    },
    outline: {
      border: "1.5px solid #0284c7",
      color: "#0284c7",
      fontWeight: 600,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "#f0f9ff",
        borderColor: "#0369a1",
      },
    },
    neon: {
      background: "#ffffff",
      border: "1.5px solid #0284c7",
      color: "#0284c7",
      fontWeight: 600,
      boxShadow: "0 2px 8px rgba(2, 132, 199, 0.15)",
      "&:hover": {
        background: "#0284c7",
        color: "#ffffff",
        boxShadow: "0 4px 14px rgba(2, 132, 199, 0.3)",
      },
      transition: "all 0.2s ease",
    },
  };

  return (
    <Button
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        textTransform: "none",
        borderRadius: "12px",
        fontSize: "14px",
        padding: padding || "10px 20px",
        whiteSpace: wrap ? "nowrap" : "normal",
        ...styles[variant],
        "&.Mui-disabled": {
          backgroundColor: "#e2e8f0",
          color: "#94a3b8",
          boxShadow: "none",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;