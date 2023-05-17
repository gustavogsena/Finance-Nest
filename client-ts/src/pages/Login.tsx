import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FormLogin from '../components/FormLogin'
import FormSignIn from '../components/FormSignIn'

function Login() {
    const [criarUsuario, setCriarUsuario] = useState(false)

    useEffect(() => {
        setCriarUsuario(false)
    }, [])

    return (
        <>
            <Header setCriarUsuario={setCriarUsuario}/>
            <div className='px-4 md:p-11 bg-cinza-600 text-verde-600 h-[calc(100vh-90px)] flex justify-center items-center content-center flex-wrap'>
                {!criarUsuario ? <FormLogin /> : <FormSignIn />}
                {!criarUsuario && <span className='w-full text-center cursor-pointer' onClick={() => setCriarUsuario(true)}>Criar novo usuário</span>}
            </div >
        </>

    )
}

export default Login