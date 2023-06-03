import React from 'react'

function LoginBanner() {
    return (
        <div className='md:bg-login w-full max-w-[720px] h-screen bg-no-repeat text-white text-center px-3 absolute md:relative bg-login-screen bg-cover opacity-40 md:opacity-100 z-0'>
            <h1 className='text-4xl mb-3 mt-20 hidden md:block'>Controle de Investimentos</h1>
            <h3 className='text-2xl text-cinza-600 hidden md:block'>Gerencie seus investimentos</h3>
        </div>
    )
}

export default LoginBanner