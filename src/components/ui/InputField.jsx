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
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      type={isPassword && !showPassword ? "password" : "text"}
      value={value}
      onChange={onChange}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          color: "#E5E7EB",
          background: "rgba(255,255,255,0.03)",
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.1)",
          },
          "&:hover fieldset": {
            borderColor: "#b76e79",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#7f9ca8",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#9CA3AF",
        },
      }}
      InputProps={{
        endAdornment: isPassword && (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              sx={{ color: "#9CA3AF" }}
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