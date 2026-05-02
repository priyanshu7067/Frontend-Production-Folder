import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  BarChart,
  Bot,
  ChartCandlestick,
  LogOut,
} from "lucide-react";

import { sidebarMenu } from "../../constants/sidebarMenu";
import {
  drawerStyles,
  listItemStyles,
  iconStyles,
  textStyles,
} from "../../styles/sidebarStyles";
import { MainContent } from "../../constants/mainContent";

const iconMap = {
  dashboard: <LayoutDashboard size={18} />,
  users: <Users size={18} />,
  user: <User size={18} />,
  chart: <BarChart size={18} />,
  settings: <User size={18} />,
  profile: <User size={18} />,
  bot: <Bot size={18} />,
  live: <ChartCandlestick size={18} />,
};

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const role = location.pathname.startsWith("/admin") ? "admin" : "user";
  const menu = sidebarMenu[role] || [];

  const handleLogout = () => {
    // 👉 yaha apna logout logic lagao (token clear etc)
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={() => setOpen(false)}
      sx={drawerStyles(open)}
      ModalProps={{ keepMounted: true }}
    >
      {/* 🔥 FULL HEIGHT FLEX */}
      <Box className="flex flex-col h-full  ">

        {/* 🔥 TOP */}
        <div className="px-4 py-3 flex items-center justify-center " >
          <img
            src={MainContent.logo}
            alt="logo"
            className={`${open ? "h-16" : "h-8"} object-contain`}
          />
        </div>

        {/* 🔥 MENU */}
        <List className="flex-1">
          {menu.map((item, i) => {
            const active = (location.pathname?.split("/")[2] || location.pathname) === item.path;
            // console.log(location.pathname?.split("/")[2] || location.pathname);

            return (
              <Tooltip key={i} title={!open ? item.name : ""} placement="right">
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setOpen(false);
                  }}
                  sx={listItemStyles(open, active)}
                >
                  <ListItemIcon sx={iconStyles(open, active)}>
                    {iconMap[item.icon]}
                  </ListItemIcon>

                  {open && (
                    <ListItemText
                      primary={item.name}
                      sx={textStyles(active)}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>

        {/* 🔥 DIVIDER */}
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* 🔥 LOGOUT */}
        <Box className="p-2">
          <Tooltip title={!open ? "Logout" : ""} placement="right">
            <ListItemButton
              onClick={handleLogout}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: "12px",
                display: "flex",
                justifyContent: open ? "flex-start" : "center",

                "&:hover": {
                  background:
                    "linear-gradient(90deg, rgba(183,110,121,0.15), rgba(127,156,168,0.15))",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 0,
                  justifyContent: "center",
                  color: "#f87171", // 🔥 subtle red
                }}
              >
                <LogOut size={18} />
              </ListItemIcon>

              {open && (
                <ListItemText
                  primary="Logout"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#f87171",
                    },
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </Box>

      </Box>
    </Drawer>
  );
};

export default Sidebar;