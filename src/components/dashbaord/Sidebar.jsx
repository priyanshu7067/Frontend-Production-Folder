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
  HistoryIcon,
  BanknoteArrowUp,
  Wallet2Icon,
  RouteOff,
} from "lucide-react";

import { sidebarMenu } from "../../constants/sidebarMenu";
import {
  drawerStyles,
  listItemStyles,
  iconStyles,
  textStyles,
} from "../../styles/sidebarStyles";
import { ChevronDown } from "lucide-react";
import Collapse from "@mui/material/Collapse";
import { MainContent } from "../../constants/mainContent";
import { useAuth } from "../../context/AuthContext";

const iconMap = {
  dashboard: <LayoutDashboard size={18} />,
  users: <Users size={18} />,
  user: <User size={18} />,
  chart: <BarChart size={18} />,
  settings: <User size={18} />,
  profile: <User size={18} />,
  bot: <Bot size={18} />,
  live: <ChartCandlestick size={18} />,
  history: <HistoryIcon size={18} />,
  income: <BanknoteArrowUp size={18} />,
  Wallet: <Wallet2Icon size={18} />,
  blockWithdrawal: <RouteOff size={18} />
};

const Sidebar = ({ open, setOpen }) => {
  const [openMenu, setOpenMenu] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { logout, user } = useAuth();
  const role = user?.role === "admin" ? "admin" : "user";
  const menu = sidebarMenu[role] || [];

  // const handleLogout = () => {
  //   localStorage.clear();
  //   navigate("/login");
  // };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={() => setOpen(false)}
      sx={drawerStyles(open)}
      ModalProps={{ keepMounted: true }}
    >
      {/* 🔥 FULL HEIGHT FLEX */}
      <Box className="flex flex-col h-full">
        {/* 🔥 TOP */}
        <div className="px-4 py-3 flex items-center justify-center border-r border-[#076b7c]" >
          <img
            src={MainContent.logo}
            alt="logo"
            className={`${open ? "h-16" : "h-8"} object-contain`}
          />
        </div>

        {/* 🔥 MENU */}
        <List className="flex-1 overflow-y-auto no-scrollbar  border-r  border-[#076b7c]">
          {menu.map((item, i) => {
            const isChild = Array.isArray(item.children);
             const isOpen = openMenu === item.name;

            const isActive =
              (location.pathname.split("/")[2] || location.pathname) === item.path;

            return (
              <Box key={i}>
                {/* 🔥 PARENT ITEM */}
                <Tooltip title={!open ? item.name : ""} placement="right">
                  <ListItemButton
                    onClick={() => {
                      if (isChild) {
                        setOpenMenu(isOpen ? null : item.name);
                      } else {
                        navigate(item.path);
                        if (isMobile) setOpen(false);
                      }
                    }}
                    sx={listItemStyles(open, isActive)}
                  >
                    <ListItemIcon sx={iconStyles(open, isActive)}>
                      {iconMap[item.icon]}
                    </ListItemIcon>

                    {open && (
                      <>
                        <ListItemText
                          primary={item.name}
                          sx={textStyles(isActive)}
                        />

                        {/* 🔥 DROPDOWN ICON */}
                        {isChild && (
                          <ChevronDown
                            size={16}
                            style={{
                              transition: "0.3s",
                              color: "#9CA3AF",
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          />
                        )}
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>

                {/* 🔥 CHILDREN */}
                {isChild && open && (
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child, idx) => {
                        const childActive = (location.pathname.split("/")[2] || location.pathname) === child.path;

                        return (
                          <ListItemButton
                            key={idx}
                            onClick={() => {
                              navigate(child.path);
                              if (isMobile) setOpen(false);
                            }}
                            sx={{
                              ml: open ? 5 : 2,
                              py: 0.5,
                              mr: 2,
                              // mx: 1,
                              border: childActive ? "1px solid rgba(34, 211, 238, 0.35)" : "none",
                              // width: "fit-content",
                              borderRadius: "10px",
                              background: childActive
                                ? "linear-gradient(90deg, rgba(34, 211, 238, 0.35), transparent)"
                                : "transparent",

                              "&:hover": {
                                background: "rgba(255,255,255,0.05)",
                              },
                            }}
                          >
                            <ListItemText
                              primary={child.name}
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "12px",
                                  color: childActive ? "#fff" : "#9CA3AF",
                                },
                              }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>

        {/* 🔥 DIVIDER */}
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* 🔥 LOGOUT */}
        <Box className="p-2 border-r border-[#076b7c]">
          <Tooltip title={!open ? "Logout" : ""} placement="right">
            <ListItemButton
              onClick={() => logout()}
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
