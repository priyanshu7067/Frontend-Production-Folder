import React from 'react'
import { AdminRoutes, AuthRoutes, UserRoutes } from '../constants/routes'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import UserDashBoard from '../screens/user/UserDashBoard'
import DashboardLayout from '../layout/DashboardLayout'
import ProfilePage from '../screens/user/ProfilePage'
import AdminDashboard from '../screens/admin/AdminDashboard'
import HomeSection from '../website/HomeSection'
import LoginPage from '../screens/AuthPages/LoginPage'
import AdminLogin from '../screens/AuthPages/AdminLogin'
import RegisterPage from '../screens/AuthPages/RegisterPage'
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
                    {/* <Route path={UserRoutes.PROFILE} element={<ProfilePage   />} /> */}
                </Route>

                <Route path={AdminRoutes.DASHBOARD} element={<DashboardLayout />}>
                    <Route index element={<AdminDashboard />} />
                    {/* <Route path="users" element={<Users />} /> */}
                </Route>
            </Routes>

        </>
    )
}

export default Authenticated
