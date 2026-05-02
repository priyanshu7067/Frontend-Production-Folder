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
  options = [], // for select
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

        /* ✅ Input text */
        "& .MuiInputBase-input": {
          color: "#ffffff",
        },

        /* ✅ Label */
        "& .MuiInputLabel-root": {
          color: "#94a3b8",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#22d3ee",
        },

        /* ✅ Border */
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.2)",
          },
          "&:hover fieldset": {
            borderColor: "#22d3ee",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#22d3ee",
          },
        },

        /* ✅ Placeholder */
        "& .MuiInputBase-input::placeholder": {
          color: "#64748b",
          opacity: 1,
        },

        /* ✅ Icons */
        "& .MuiSvgIcon-root": {
          color: "#94a3b8",
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
