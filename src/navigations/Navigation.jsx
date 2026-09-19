import React from 'react'
import Auth from './Auth'
import Authenticated from './Authenticated'
import { getToken } from '../utils/authStorage'
import { useAuth } from '../context/AuthContext'

const Navigation = () => {
    const {isAuthenticated} = useAuth();
    const token = getToken()
    return (
        <>
            {(token && isAuthenticated) ? <Authenticated /> : <Auth />}

        </>
    )
}

export default Navigation
