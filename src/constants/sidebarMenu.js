import { Children } from "react";
import { AdminRoutes, UserRoutes } from "./routes";

export const sidebarMenu = {
  user: [
    { name: "Dashboard", path: UserRoutes.DASHBOARD, icon: "dashboard" },
    { name: "All Incomes", path: UserRoutes.INCOME_CARDS, icon: "income" },
    { name: "Live Pricing", path: UserRoutes.LIVE_PRICING, icon: "live" },
    { name: "AI Trading Bot", path: UserRoutes.TRADING_BOT, icon: "bot" },
    { name: "Wallet Fund Transfer", icon: "Wallet" ,
       children: [
        {
          name: "Wallet Fund Transfer",
          path: UserRoutes.WALLET_FUND_TRANSFER,
        },
        {
          name: "Transfer History",
          path: UserRoutes.WALLET_FUND_TRANSFER_HISTORY,
        }

       ]
    },
    {
      name: "Withdrawal",
      icon: "history",
      children: [
        {
          name: "Withdrawal",
          path: UserRoutes.WITHDRAWAL,
        },
        {
          name: "Withdrawal History",
          path: UserRoutes.WITHDRAWAL_HISTORY,
        }
      ],
    },
    {
      name: "History",
      icon: "history",
      children: [
        {
          name: "Investment History",
          path: UserRoutes.INVESTMENT_HISTORY,
        },
        {
          name: "Level Income History",
          path: UserRoutes.LEVEL_INCOME_HISTORY,
        },
        {
          name: "AI Trading History",
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
    {
      name: "Teams",
      path: UserRoutes.TEAMS,
      icon: "users",
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
    { name: "All Users", path: AdminRoutes.ALL_USERS, icon: "users" },
    { name: "Block Withdrawal", path: AdminRoutes.BLOCK_USER_WITHDRAWAL, icon: "blockWithdrawal" },
    {
      name: "KYC",
      icon: "user",
      children: [
        {
          name: "All KYC Requests",
          path: AdminRoutes.USER_KYC_REQUESTS,
        },
        {
          name: "Approved Users",
          path: AdminRoutes.USER_APPROVED_KYC,
        },
        {
          name: "Rejected Requests",
          path: AdminRoutes.USER_REJECTED_KYC,
        },
      ],
    },
    {
      name: "Withdrawal History",
      icon: "income",
      children: [
        {
          name: "Pending Withdrawal",
          path: AdminRoutes.PENDING_WITHDRAWALS,
        },
        {
          name: "Approved Withdrawal",
          path: AdminRoutes.APPROVED_WITHDRAWALS,
        },
        {
          name: "Rejected Withdrawal",
          path: AdminRoutes.REJECTED_WITHDRAWALS,
        },
      ],
    },
    {
      name: "Income History",
      icon: "income",
      children: [
        {
          name: "Investment History",
          path: AdminRoutes.INVESTMENT_HISTORY,
        },
        {
          name: "Direct Income",
          path: AdminRoutes.DIRECT_INCOME,
        },
        {
          name: "Level Income",
          path: AdminRoutes.LEVEL_INCOME,
        },
        {
          name: "Promotion Bonus Income",
          path: AdminRoutes.PROMOTION_BONUS_INCOME_HISTORY,
        },
        {
          name: "Rank Income History",
          path: AdminRoutes.RANK_INCOME_HISTORY,
        }
      ],
    },
  ],
};