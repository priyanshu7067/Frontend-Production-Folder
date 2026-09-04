export const drawerStyles = (open) => ({
  width: open ? 240 : 80,
  flexShrink: 0,

  "& .MuiDrawer-paper": {
    width: open ? 240 : 80,
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    boxShadow: "2px 0 12px rgba(15, 23, 42, 0.03)",
    transition: "all 0.3s ease",
    overflowX: "hidden",
  },
});

export const listItemStyles = (open, active) => ({
  mx: 1.5,
  my: 0.6,
  px: open ? 2 : 1.2,
  py: 1.1,
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: open ? "flex-start" : "center",
  position: "relative",
  cursor: "pointer",
  backgroundColor: active ? "#e0f2fe" : "transparent",
  border: active ? "1px solid #bae6fd" : "1px solid transparent",

  "&:hover": {
    backgroundColor: active ? "#e0f2fe" : "#f0f9ff",
    transform: "translateX(2px)",
  },

  transition: "all 0.2s ease",
});

export const iconStyles = (open, active) => ({
  minWidth: 0,
  mr: open ? 1.5 : 0,
  justifyContent: "center",
  color: active ? "#0284c7" : "#64748b",
  transition: "all 0.2s ease",
});

export const textStyles = (active) => ({
  "& .MuiTypography-root": {
    fontSize: "13px",
    fontWeight: active ? 600 : 500,
    color: active ? "#0284c7" : "#334155",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
  },
});