import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  fullWidth = true,
  disabled = false,
  error = false,
  helperText = "",
  placeholder = "",
  name,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <TextField
      name={name}
      required={required}
      fullWidth={fullWidth}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      helperText={helperText}
      type={isPassword && showPassword ? "text" : type}
      value={value}
      onChange={onChange}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          color: "#0f172a",
          backgroundColor: "#ffffff",
          "& fieldset": {
            borderColor: error ? "#ef4444" : "#e2e8f0",
            borderWidth: "1px",
          },
          "&:hover fieldset": {
            borderColor: error ? "#ef4444" : "#0284c7",
          },
          "&.Mui-focused fieldset": {
            borderColor: error ? "#ef4444" : "#0284c7",
            borderWidth: "2px",
          },
          "&.Mui-disabled": {
            backgroundColor: "#f8fafc",
            color: "#64748b",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#64748b",
          "&.Mui-focused": {
            color: error ? "#ef4444" : "#0284c7",
          },
        },
        "& .MuiFormHelperText-root": {
          fontSize: "0.75rem",
          marginTop: "4px",
        },
      }}
      InputProps={{
        endAdornment: isPassword && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              sx={{ color: "#64748b", "&:hover": { color: "#0284c7" } }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputField;