import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FormLogin from '../components/FormLogin'
import FormSignIn from '../components/FormSignIn'
import LoginBanner from '../components/LoginBanner'

function Register() {

    return (
        <div className='flex'>
            <LoginBanner />

            <FormSignIn />
        </div>

    )
}

export default Register