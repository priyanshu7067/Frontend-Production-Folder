import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Auth from './Auth'
import Authenticated from './Authenticated'

const Navigation = () => {
    const token = localStorage.getItem('token')
    return (
        <>
            {!token ? <Authenticated /> : <Auth />}

        </>
    )
}

export default Navigation
