import React from "react";
import { Search, Bell } from "lucide-react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { IconButton, Avatar, Box, Typography, Chip } from "@mui/material";
import gif from "../../assets/spin.gif";
import { useAuth } from "../../context/AuthContext";

const DashboardHeader = ({ role, setOpen }) => {
  const {user} = useAuth();
  console.log(user, "gfayuehg")
  return (
    <header className="h-14 bg-[#020617]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-5">
      {/* 🔥 LEFT */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle (MUI) */}
        <IconButton
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            color: "#9CA3AF",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
          }}
        >
          <MenuOpenIcon fontSize="small" />
        </IconButton>

        {/* Title */}
        <div className="flex flex-col leading-tight">
          <span className="text-sm text-gray-200">
            {role === "admin" ? "Admin Panel" : "Dashboard"}
          </span>
        </div>
      </div>

      {/* 🔥 RIGHT (MUI BASED) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 1.5,
          height: 40,
          flexShrink: 0,
        }}
      >
        <IconButton
          size="small"
          sx={{
            position: "relative",
            color: "#9CA3AF",
            height: 36,
            width: 36,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
          }}
        >
          <Bell size={18} />

          <Box
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 6,
              height: 6,
              backgroundColor: "#22c55e",
              borderRadius: "50%",
            }}
          />
        </IconButton>

        <Box
          gap={1}
          sx={{
            height: 32,
            px: 1.5,
            borderRadius: "999px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar src={gif} alt="wallet" sx={{ width: 18, height: 18 }} />

          <Typography
            sx={{
              fontSize: "12px",
              color: "#E5E7EB",
              fontWeight: 500,
            }}
          >
            ${user?.wallets?.earningsWallet || 0}
          </Typography>
        </Box>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: 12,
            fontWeight: "bold",

            background:
              "linear-gradient(135deg, var(--primary-dark), var(--primary), #67e8f9)",
              border: "1px solid rgba(34, 211, 238, 0.4)",
backdropFilter: "blur(4px)",

            color: "#000",
            cursor: "pointer",
            transition: "all 0.25s ease",

            "&:hover": {
              transform: "scale(1.08)",
              boxShadow: "0 0 14px var(--primary-glow)",
            },
          }}
        >
          U
        </Avatar>
      </Box>
    </header>
  );
};

export default DashboardHeader;
