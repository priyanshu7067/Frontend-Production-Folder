import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Auth from './Auth'
import Authenticated from './Authenticated'
import { getToken } from '../utils/authStorage'
import { useAuth } from '../context/AuthContext'

const Navigation = () => {
    const {user} = useAuth();
    console.log(user)
    const token = getToken()
    console.log(token)
    return (
        <>
            {token ? <Authenticated /> : <Auth />}

        </>
    )
}

export default Navigation
