import { color } from "framer-motion";

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
      right: "2px",
      top: "12%",
      height: "76%",
      width: "4px",
      borderRadius: "999px",

      /* 🔥 Gradient Glow Line */
      background:
        "linear-gradient(to bottom, transparent, var(--primary), #00f0ff, var(--primary), transparent)",

      /* ✨ Big Right Glow */
      boxShadow: `
        0 0 8px var(--primary),
        0 0 18px var(--primary),
        6px 0 22px rgba(0,255,255,0.7),
        10px 0 35px rgba(0,255,255,0.45)
      `,

      animation: "sidebarGlow 2.2s ease-in-out infinite",
    }
    : {},

  "&:hover": {
    transform: "translateX(4px) scale(1.01)",

    /* 🔥 Premium Teal Gradient Background */
    background: `
    linear-gradient(
      60deg,
      rgba(0, 255, 200, 0.06) 0%,
      rgba(0, 240, 255, 0.14) 35%,
      rgba(0, 180, 255, 0.18) 65%,
      rgba(0, 255, 200, 0.08) 100%
    )
  `,

    /* ✨ Glass Effect */
    backdropFilter: "blur(10px)",

    /* 🌟 Smooth Glow */
    boxShadow: `
  inset 0 0 14px rgba(0, 255, 255, 0.10),
  inset 0 0 28px rgba(135, 206, 250, 0.08),

  0 0 12px rgba(0, 191, 255, 0.18),
  0 0 24px rgba(135, 206, 250, 0.14),

  -4px 0 18px rgba(0, 255, 255, 0.22),
  -10px 0 32px rgba(135, 206, 250, 0.18),

  0 0 42px rgba(0, 180, 185, 0.10)
`,

    /* 🔥 Better Text Visibility */
    color: "#ffffff",

    "& .MuiListItemText-primary": {
      color: "#ffffff",
      fontWeight: 600,
      letterSpacing: "0.4px",
      textShadow: "0 0 10px rgba(0,255,255,0.35)",
    },

    "& svg": {
      color: "#7df9ff",
      filter: "drop-shadow(0 0 8px rgba(0,255,255,0.55))",
      transform: "scale(1.08)",
    },

    transition: "all 0.35s ease",
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