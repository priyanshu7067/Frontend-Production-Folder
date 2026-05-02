import React from 'react'
import Auth from './Auth'
import Authenticated from './Authenticated'
import { getToken } from '../utils/authStorage'

const Navigation = () => {
    const token = getToken()
    return (
        <>
            {token ? <Authenticated /> : <Auth />}

        </>
    )
}

export default Navigation
