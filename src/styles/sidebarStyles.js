export const drawerStyles = (open) => ({
  width: open ? 240 : 80,
  flexShrink: 0,

  "& .MuiDrawer-paper": {
    width: open ? 240 : 80,

    background: `
      linear-gradient(
        180deg,
        rgba(2,6,23,1) 0%,
        rgba(2,6,23,0.95) 100%
      )
    `,

    borderRight: "1px solid rgba(255,255,255,0.05)",

    backdropFilter: "blur(12px)",

    transition: "all 0.3s ease",
    overflowX: "hidden",
  },
});

export const listItemStyles = (open, active) => ({
  mx: 1.5,
  my: 0.8,
  px: open ? 2 : 1.2,
  py: 1.2,
  borderRadius: "14px",

  display: "flex",
  alignItems: "center",
  justifyContent: open ? "flex-start" : "center",

  position: "relative",
  cursor: "pointer",

  background: active
    ? "linear-gradient(90deg, rgba(34, 211, 238, 0.35), transparent)"
    : "transparent",

  border: active
    ? "1px solid rgba(34, 211, 238, 0.35)"
    : "1px solid transparent",

  boxShadow: active
    ? "0 0 18px rgba(34, 211, 238, 0.35))"
    : "none",

  "&::before": active
    ? {
      content: '""',
      position: "absolute",
      left: 0,
      top: "20%",
      height: "60%",
      width: "3px",
      background: "var(--accent-primary)",
      borderRadius: "4px",
    }
    : {},

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

  color: active
    ? "var(--text-primary)"
    : "var(--text-secondary)",

  filter: active
    ? "drop-shadow(0 0 10px rgba(183,110,121,0.8))"
    : "none",

  transition: "all 0.25s ease",
});

export const textStyles = (active) => ({
  "& .MuiTypography-root": {
    fontSize: "13px",
    fontWeight: active ? 600 : 400,

    color: active
      ? "var(--text-primary)"
      : "var(--text-secondary)",

    letterSpacing: "0.4px",

    whiteSpace: "nowrap",
    opacity: active ? 1 : 0.8,

    transition: "all 0.25s ease",
  },
});