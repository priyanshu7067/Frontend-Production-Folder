import React from 'react'
import { AdminRoutes, AuthRoutes, UserRoutes } from '../constants/routes'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import UserDashBoard from '../screens/user/UserDashBoard'
import DashboardLayout from '../layout/DashboardLayout'
// import ProfilePage from '../screens/user/ProfilePage'
import AdminDashboard from '../screens/admin/AdminDashboard'
import HomeSection from '../website/HomeSection'
import LoginPage from '../screens/AuthPages/LoginPage'
import AdminLogin from '../screens/AuthPages/AdminLogin'
import RegisterPage from '../screens/AuthPages/RegisterPage'
import KycPage from '../screens/user/KycPage'
import LivePricing from '../screens/user/LivePricing'
import TradingBot from '../screens/user/TradingBot'
import UserKycRequests from '../screens/admin/kyc/UserKycRequest'
import UserRejectedKyc from '../screens/admin/kyc/UserRejectedKyc'
import UserApprovedKyc from '../screens/admin/kyc/UserApprovedKyc'
import ProfilePage from '../screens/user/ProfilePage'
import LevelIncomeHistory from '../screens/user/history/LevelIncome'
import MyTeams from '../screens/user/Teams/MyTeams'
import DirectTeam from '../screens/user/Teams/DirectTeam'
import TradeHistory from '../screens/user/history/TradeHistory'
import PromotionIncome from '../screens/user/history/PromotionIncome'
import RefferalIncome from '../screens/user/history/RefferalIncome'
import Rank_RoyalityBonus from '../screens/user/history/Rank_RoyalityBonus'
const Authenticated = () => {
    return (
        <>
            <Routes>

                {/* 🔥 Landing page add kar */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomeSection />} />
                </Route>
                <Route>
                    <Route path={AuthRoutes.LOGIN} element={<LoginPage />} />
                    <Route path={AuthRoutes.ADMIN_LOGIN} element={<AdminLogin />} />
                    <Route path={AuthRoutes.REGISTER} element={<RegisterPage />} />
                </Route>

                <Route path={UserRoutes.DASHBOARD} element={<DashboardLayout />}>
                    <Route index element={<UserDashBoard />} />
                    <Route path={UserRoutes.KYC_PAGE} element={<KycPage />} />
                    <Route path={UserRoutes.PROFILE} element={<ProfilePage   />} />
                    <Route path={UserRoutes.LIVE_PRICING} element={<LivePricing   />} />
                    <Route path={UserRoutes.TRADING_BOT} element={<TradingBot   />} />
                    <Route path={UserRoutes.LEVEL_INCOME_HISTORY} element={<LevelIncomeHistory   />} />
                    <Route path={UserRoutes.TRADE_HISTORY} element={<TradeHistory   />} />
                    <Route path={UserRoutes.PROMOTION_BONUS_HISTORY} element={<PromotionIncome   />} />
                    <Route path={UserRoutes.REFFERAL_INCOME_HISTORY} element={<RefferalIncome   />} />
                    <Route path={UserRoutes.RANK_ROYALITY_HISTORY} element={<Rank_RoyalityBonus   />} />
                    <Route path={UserRoutes.MY_TEAMS} element={<MyTeams   />} />
                    <Route path={UserRoutes.DIRECT_TEAMS} element={<DirectTeam   />} />
                </Route>

                <Route path={AdminRoutes.DASHBOARD} element={<DashboardLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path={AdminRoutes.USER_KYC_REQUESTS} element={<UserKycRequests />} />
                    <Route path={AdminRoutes.USER_REJECTED_KYC} element={<UserRejectedKyc />} />
                    <Route path={AdminRoutes.USER_APPROVED_KYC} element={<UserApprovedKyc />} />
                    {/* <Route path="users" element={<Users />} /> */}
                </Route>
            </Routes>

        </>
    )
}

export default Authenticated
