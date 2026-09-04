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
  ChevronDown,
} from "lucide-react";

import { sidebarMenu } from "../../constants/sidebarMenu";
import {
  drawerStyles,
  listItemStyles,
  iconStyles,
  textStyles,
} from "../../styles/sidebarStyles";
import Collapse from "@mui/material/Collapse";
import { MainContent } from "../../constants/mainContent";
import { useAuth } from "../../context/AuthContext";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

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
  blockWithdrawal: <RouteOff size={18} />,
  invest: <CurrencyExchangeIcon fontSize="small" />,
  topup: <PriceCheckIcon fontSize="small" />,
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

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={() => setOpen(false)}
      sx={drawerStyles(open)}
      ModalProps={{ keepMounted: true }}
    >
      <Box className="flex flex-col h-full bg-white text-slate-900 border-r border-slate-200">
        
        {/* LOGO BRAND HEADER */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-slate-100">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center font-bold text-base text-white shadow-xs">
              ₹
            </div>
            {open && (
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Finor Capital
              </span>
            )}
          </div>
        </div>

        {/* NAVIGATION LIST */}
        <List className="flex-1 overflow-y-auto no-scrollbar py-2">
          {menu.map((item, i) => {
            const isChild = Array.isArray(item.children);
            const isOpen = openMenu === item.name;
            const isActive =
              (location.pathname.split("/")[2] || location.pathname) === item.path;

            return (
              <Box key={i}>
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

                        {isChild && (
                          <ChevronDown
                            size={16}
                            style={{
                              transition: "0.2s",
                              color: "#64748b",
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          />
                        )}
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>

                {isChild && open && (
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child, idx) => {
                        const childActive =
                          (location.pathname.split("/")[2] || location.pathname) ===
                          child.path;

                        return (
                          <ListItemButton
                            key={idx}
                            onClick={() => {
                              navigate(child.path);
                              if (isMobile) setOpen(false);
                            }}
                            sx={{
                              ml: 4.5,
                              mr: 1.5,
                              my: 0.3,
                              py: 0.8,
                              borderRadius: "10px",
                              backgroundColor: childActive ? "#e0f2fe" : "transparent",
                              "&:hover": {
                                backgroundColor: "#f0f9ff",
                              },
                            }}
                          >
                            <ListItemText
                              primary={child.name}
                              sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "12px",
                                  fontWeight: childActive ? 600 : 400,
                                  color: childActive ? "#0284c7" : "#475569",
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

        <Divider sx={{ borderColor: "#e2e8f0" }} />

        {/* LOGOUT BUTTON */}
        <Box className="p-2">
          <Tooltip title={!open ? "Logout" : ""} placement="right">
            <ListItemButton
              onClick={() => logout()}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: "10px",
                display: "flex",
                justifyContent: open ? "flex-start" : "center",
                "&:hover": {
                  backgroundColor: "#fef2f2",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 0,
                  justifyContent: "center",
                  color: "#ef4444",
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
                      fontWeight: 600,
                      color: "#ef4444",
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
