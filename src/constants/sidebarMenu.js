import { AdminRoutes, UserRoutes } from "./routes";

export const sidebarMenu = {
  user: [
    { name: "Dashboard", path: UserRoutes.DASHBOARD, icon: "dashboard" },
    { name: "Live Pricing", path: UserRoutes.LIVE_PRICING, icon: "live" },
    { name: "Trading Bot", path: UserRoutes.TRADING_BOT, icon: "bot" },
    { name: "Analytics", path: "/user/analytics", icon: "chart" },
    { name: "Settings", path: "/user/settings", icon: "settings" },
    { name: "Profile", path: UserRoutes.PROFILE, icon: "user" },
    { name: "Forget Password", path: UserRoutes.PROFILE, icon: "user" },
    { name: "KYC", path: UserRoutes.KYC_PAGE, icon: "user" },

  ],

  admin: [
    { name: "Dashboard", path: AdminRoutes.DASHBOARD, icon: "dashboard" },
    { name: "All Users", path: "/admin/users", icon: "users" },
    { name: "Analytics", path: "/admin/analytics", icon: "chart" },
  ],
};