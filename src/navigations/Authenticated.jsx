import React from "react";
import { AdminRoutes, AuthRoutes, UserRoutes } from "../constants/routes";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import UserDashBoard from "../screens/user/UserDashBoard";
import DashboardLayout from "../layout/DashboardLayout";
import AdminDashboard from "../screens/admin/AdminDashboard";
import HomeSection from "../website/HomeSection";
import KycPage from "../screens/user/KycPage";
import LivePricing from "../screens/user/LivePricing";
import TradingBot from "../screens/user/TradingBot";
import UserKycRequests from "../screens/admin/kyc/UserKycRequest";
import UserRejectedKyc from "../screens/admin/kyc/UserRejectedKyc";
import UserApprovedKyc from "../screens/admin/kyc/UserApprovedKyc";
import ProfilePage from "../screens/user/ProfilePage";
import LevelIncomeHistory from "../screens/user/history/LevelIncome";
import MyTeams from "../screens/user/Teams/MyTeams";
import DirectTeam from "../screens/user/Teams/DirectTeam";
import TradeHistory from "../screens/user/history/TradeHistory";
import PromotionIncome from "../screens/user/history/PromotionIncome";
import RefferalIncome from "../screens/user/history/RefferalIncome";
import Rank_RoyalityBonus from "../screens/user/history/Rank_RoyalityBonus";
import { useAuth } from "../context/AuthContext";
import AllUsers from "../screens/admin/AllUsers";
import AllIncomeCards from "../screens/user/AllIncomeCards";
import InvestmentHistory from "../screens/user/history/InvestmentHistory";
import WithdrawalPage from "../screens/user/WithdrawalPage";
import WalletTransfer from "../screens/user/WalletTransfer";
import AITradeBotHistoryDetail from "../screens/user/history/AITradeBotHistoryDetail";
import AdminInvestmentHistory from "../screens/admin/incomeHistory/AdminInvestmentHistory";
import AdminDirectIncome from "../screens/admin/incomeHistory/AdminDirectIncome";
import AdminLevelIncome from "../screens/admin/incomeHistory/AdminLevelIncome";
import AdminPromotionBonusIncome from "../screens/admin/incomeHistory/AdminPromotionBonusIncome";
import AdminRankIncome from "../screens/admin/incomeHistory/AdminRankIncome";
import AdminWithdrawalHistory from "../screens/admin/withdrawal/AdminWithdrawalHistory";
import WalletTransferHistory from "../screens/user/history/WalletTransferHistory";
import WithdrawalHistory from "../screens/user/history/WithdrawalHistory";
const Authenticated = () => {
  const { user } = useAuth();
  return (
    <>
      <Routes>
        {/* 🔥 Landing page add kar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeSection />} />
        </Route>

        {user?.role === "admin" ? (
          <Route path={AdminRoutes.DASHBOARD} element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route
              path={AdminRoutes.USER_KYC_REQUESTS}
              element={<UserKycRequests />}
            />
            <Route
              path={AdminRoutes.USER_REJECTED_KYC}
              element={<UserRejectedKyc />}
            />
            <Route
              path={AdminRoutes.USER_APPROVED_KYC}
              element={<UserApprovedKyc />}
            />
            <Route
              path={AdminRoutes.ALL_USERS}
              element={<AllUsers />}
            />
            <Route
              path={AdminRoutes.INVESTMENT_HISTORY}
              element={<AdminInvestmentHistory />}
            />
            <Route
              path={AdminRoutes.DIRECT_INCOME}
              element={<AdminDirectIncome />}
            />
            <Route
              path={AdminRoutes.LEVEL_INCOME}
              element={<AdminLevelIncome />}
            />
            <Route
              path={AdminRoutes.PROMOTION_BONUS_INCOME_HISTORY}
              element={<AdminPromotionBonusIncome />}
            />
            <Route
              path={AdminRoutes.RANK_INCOME_HISTORY}
              element={<AdminRankIncome />}
            />
            <Route
              path={AdminRoutes.WITHDRAWAL_HISTORY}
              element={<AdminWithdrawalHistory />}
            />
            {/* <Route path="users" element={<Users />} /> */}
          </Route>
        ) : (
          <Route path={UserRoutes.DASHBOARD} element={<DashboardLayout />}>
            <Route index element={<UserDashBoard />} />
            <Route path={UserRoutes.KYC_PAGE} element={<KycPage />} />
            <Route path={UserRoutes.PROFILE} element={<ProfilePage />} />
            <Route path={UserRoutes.LIVE_PRICING} element={<LivePricing />} />
            <Route path={UserRoutes.TRADING_BOT} element={<TradingBot />} />
            <Route
              path={UserRoutes.LEVEL_INCOME_HISTORY}
              element={<LevelIncomeHistory />}
            />
            <Route path={UserRoutes.TRADE_HISTORY} element={<TradeHistory />} />
            <Route
              path={UserRoutes.PROMOTION_BONUS_HISTORY}
              element={<PromotionIncome />}
            />
            <Route
              path={UserRoutes.REFFERAL_INCOME_HISTORY}
              element={<RefferalIncome />}
            />
            <Route
              path={UserRoutes.RANK_ROYALITY_HISTORY}
              element={<Rank_RoyalityBonus />}
            />
            <Route
              path={UserRoutes.INVESTMENT_HISTORY}
              element={<InvestmentHistory />}
            />
            <Route
              path={UserRoutes.AITRADE_BOT_HISTORY_DETAIL}
              element={<AITradeBotHistoryDetail />}
            />
            <Route path={UserRoutes.MY_TEAMS} element={<MyTeams />} />
            <Route path={UserRoutes.DIRECT_TEAMS} element={<DirectTeam />} />
            <Route path={UserRoutes.INCOME_CARDS} element={<AllIncomeCards />} />
            <Route path={UserRoutes.WITHDRAWAL} element={<WithdrawalPage />} />
            <Route path={UserRoutes.WALLET_FUND_TRANSFER} element={<WalletTransfer />} />
            <Route path={UserRoutes.WALLET_FUND_TRANSFER_HISTORY} element={<WalletTransferHistory />} />
            <Route path={UserRoutes.WITHDRAWAL_HISTORY} element={<WithdrawalHistory />} />
          </Route>
        )}
      </Routes>
    </>
  );
};

export default Authenticated;
