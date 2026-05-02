export const drawerStyles = (open) => ({
  width: open ? 240 : 80,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: open ? 240 : 80,
    background: "var(--bg-main)",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    transition: "all 0.3s ease",
    
  },
});

export const listItemStyles = (open, active) => ({
  mx: 2,
  my: 1,
  px: open ? 1.5 : 1,
  py: 0.5,
  borderRadius: "12px",
  display: "flex",
  justifyContent: open ? "flex-start" : "center",

  background: active ? "var(--sidebar-active)" : "transparent",

  borderLeft: active
    ? "3px solid var(--accent-primary)"
    : "3px solid transparent",

  boxShadow: active
    ? "0 0 12px rgba(183,110,121,0.25)"
    : "none",

  "&:hover": {
    background: "var(--sidebar-hover)",
    transform: "translateX(4px)",
  },

  transition: "all 0.25s ease",
});

export const iconStyles = (open, active) => ({
  minWidth: 0,
  mr: open ? 1.5 : 0,
  justifyContent: "center",

  color: active ? "var(--accent-primary)" : "#9CA3AF",

  filter: active
    ? "drop-shadow(0 0 6px rgba(183,110,121,0.6))"
    : "none",

  transition: "all 0.2s ease",
});

export const textStyles = (active) => ({
  "& .MuiTypography-root": {
    fontSize: "13px",
    fontWeight: active ? 500 : 400,
    color: active ? "#ffffff" : "#9CA3AF",
    letterSpacing: "0.3px",

    transition: "all 0.2s ease",
  },
});