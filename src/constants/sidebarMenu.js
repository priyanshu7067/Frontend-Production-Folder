import { Children } from "react";
import { AdminRoutes, UserRoutes } from "./routes";

export const sidebarMenu = {
  user: [
    { name: "Dashboard", path: UserRoutes.DASHBOARD, icon: "dashboard" },
    { name: "Live Pricing", path: UserRoutes.LIVE_PRICING, icon: "live" },
    { name: "Trading Bot", path: UserRoutes.TRADING_BOT, icon: "bot" },
    { name: "History",
      icon: "chart",
      children: [
        {
          name: "Level Income History",
          path: UserRoutes.LEVEL_INCOME_HISTORY,
        },
        {
          name: "Trading History",
          path: UserRoutes.TRADE_HISTORY,
        },
        {
          name: "Rank Royality History",
          path: UserRoutes.RANK_ROYALITY_HISTORY,
        },
        {
          name: "Promotion Bonus History",
          path: UserRoutes.PROMOTION_BONUS_HISTORY,
        },
        {
          name: "Refferal Income History",
          path: UserRoutes.REFFERAL_INCOME_HISTORY,
        },
      ],
    },
    { name: "Teams",
      path: UserRoutes.TEAMS,
      icon: "chart",
      children: [
        {
          name: "My Direct Team",
          path: UserRoutes.DIRECT_TEAMS,
        },
        {
          name: "My Teams",
          path: UserRoutes.MY_TEAMS,
        },
      ],

    },
    { name: "Profile", path: UserRoutes.PROFILE, icon: "user" },
    { name: "KYC", path: UserRoutes.KYC_PAGE, icon: "user" },

  ],

  admin: [
    { name: "Dashboard", path: AdminRoutes.DASHBOARD, icon: "dashboard" },
    { name: "All Users", path: "/admin/users", icon: "users" },
    { name: "Analytics", path: "/admin/analytics", icon: "chart" },
  ],
};