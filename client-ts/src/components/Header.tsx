import { useNavigate } from 'react-router-dom'
import coin from '../images/coins.png'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { User } from '../types'
import { userLogout } from '../store/reducers/user.slice'

type HeaderType = {
    setCriarUsuario?: (arg: boolean) => void
}

function Header({ setCriarUsuario }: HeaderType) {
    const user = useSelector<RootState, User>(state => state.user)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(userLogout())
    }

    const navigate = useNavigate()
    return (
        <header className='flex justify-between xl:px-24 px-0'>
            <div className='flex items-center' onClick={setCriarUsuario ? undefined : () => navigate('/')}>
                <img src={coin} alt="Logo" className='h-[90px] pr-3' />
                <h1 className='text-3xl hidden sm:block'>Controle de Investimentos</h1>
            </div>

            <div className='flex items-center'>
                <div className='pr-3'>
                    <p className='text-xl cursor-pointer'
                        onClick={setCriarUsuario ? () => setCriarUsuario(false) : undefined}
                    >
                        {user.isAuthenticated ? user.name : 'Login'}
                    </p>
                    {user.isAuthenticated && <button onClick={logout} className='text-base'>Sair</button>}

                </div>

                <img src={coin} alt="Logo" className='h-[90px]' />
            </div>
        </header >
    )
}


export default Header