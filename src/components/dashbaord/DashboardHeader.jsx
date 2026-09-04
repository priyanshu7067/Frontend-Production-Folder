import React from "react";
import { Bell } from "lucide-react";
import { IconButton, Avatar, Box, Typography } from "@mui/material";
import gif from "../../assets/spin.gif";
import { useAuth } from "../../context/AuthContext";
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { formatINR } from "../../utils/helper";

const DashboardHeader = ({ role, setOpen }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 shadow-xs flex items-center justify-between px-3 md:px-6 sticky top-0 z-30">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <IconButton
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            color: "#0284c7",
            "&:hover": { backgroundColor: "#f0f9ff" },
          }}
        >
          <ViewSidebarIcon fontSize="medium" />
        </IconButton>

        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold text-slate-900">
            {role === "admin" ? "Admin Management" : "Finor Dashboard"}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Welcome back, {user?.name || user?.email || "Investor"}
          </span>
        </div>
      </div>

      {/* RIGHT */}
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
            color: "#64748b",
            height: 38,
            width: 38,
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            "&:hover": { backgroundColor: "#f0f9ff", color: "#0284c7" },
          }}
        >
          <Bell size={18} />
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 6,
              height: 6,
              backgroundColor: "#10b981",
              borderRadius: "50%",
            }}
          />
        </IconButton>

        {/* INR EARNINGS WALLET BADGE */}
        <Box
          sx={{
            height: 36,
            px: 1.5,
            borderRadius: "12px",
            backgroundColor: "#f0f9ff",
            border: "1px solid #bae6fd",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <div className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center">
            ₹
          </div>

          <Typography
            sx={{
              fontSize: "13px",
              color: "#0f172a",
              fontWeight: 700,
            }}
          >
            {formatINR(user?.wallets?.earningsWallet || 0)}
          </Typography>
        </Box>

        {/* USER AVATAR */}
        <Avatar
          sx={{
            width: 36,
            height: 36,
            fontSize: 13,
            fontWeight: "bold",
            background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
            border: "2px solid #ffffff",
            boxShadow: "0 2px 8px rgba(2, 132, 199, 0.2)",
            color: "#ffffff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          src={user?.kyc?.memberPhoto?.imageUrl}
        >
          {user?.name?.[0] || "U"}
        </Avatar>
      </Box>
    </header>
  );
};

export default DashboardHeader;
