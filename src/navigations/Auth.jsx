import React from 'react'
import LoginPage from '../screens/AuthPages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import { AuthRoutes } from '../constants/routes'
import HomeSection from '../website/HomeSection'
import MainLayout from '../layout/MainLayout'
import RegisterPage from '../screens/AuthPages/RegisterPage'
import AdminLogin from '../screens/AuthPages/AdminLogin'
const Auth = () => {
    return (
        <>
            <Routes>
                <Route path={AuthRoutes.LOGIN} element={<LoginPage />} />
                <Route path={AuthRoutes.ADMIN_LOGIN} element={<AdminLogin />} />
                <Route path={AuthRoutes.REGISTER} element={<RegisterPage />} />
                <Route element={<MainLayout />}>
                    <Route path={AuthRoutes.WEBSITE} element={<HomeSection />} />
                </Route>
            </Routes>

        </>
    )
}

export default Auth
