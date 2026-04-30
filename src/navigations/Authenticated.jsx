import React from 'react'
import { AdminRoutes, UserRoutes } from '../constants/routes'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import UserDashBoard from '../screens/user/UserDashBoard'
import DashboardLayout from '../layout/DashboardLayout'
import ProfilePage from '../screens/user/ProfilePage'
import AdminDashboard from '../screens/admin/AdminDashboard'
import HomeSection from '../website/HomeSection'
const Authenticated = () => {
    return (
        <>
            <Routes>

                {/* 🔥 Landing page add kar */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomeSection />} />
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
