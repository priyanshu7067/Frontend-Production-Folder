import React, { useState } from "react";
import { TextField, MenuItem, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ReusableInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  error = false,
  helperText = "",
  startIcon = null,
  options = [],
  multiline = false,
  rows = 3,
  fullWidth = true,
  sx,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <TextField
      fullWidth={fullWidth}
      select={type === "select"}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={inputType}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      size="small"
      sx={{
        width: "100%",
        "& .MuiInputBase-input": {
          color: "#0f172a",
          fontSize: "13px",
        },
        "& .MuiInputBase-input.Mui-disabled": {
          color: "#64748b",
          WebkitTextFillColor: "#64748b",
          fontSize: "13px",
        },
        "& .MuiInputLabel-root": {
          color: "#64748b",
          fontSize: "13px",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: error ? "#ef4444" : "#0284c7",
        },
        "& .MuiInputLabel-root.Mui-disabled": {
          color: "#94a3b8",
          fontSize: "13px",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          "& fieldset": {
            borderColor: error ? "#ef4444" : "#e2e8f0",
          },
          "&:hover fieldset": {
            borderColor: error ? "#ef4444" : "#0284c7",
          },
          "&.Mui-focused fieldset": {
            borderColor: error ? "#ef4444" : "#0284c7",
          },
          "&.Mui-disabled fieldset": {
            borderColor: "#cbd5e1",
          },
        },
        "& .MuiOutlinedInput-root.Mui-disabled": {
          background: "#f8fafc",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#94a3b8",
          opacity: 1,
          fontSize: "13px",
        },
        "& .MuiSelect-select": {
          fontSize: "13px",
        },
        "& .MuiSvgIcon-root": {
          fontSize: "18px",
          color: "#64748b",
        },
        ...sx,
      }}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : null,
        endAdornment: isPassword ? (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      {...props}
    >
      {type === "select" &&
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default ReusableInput;
