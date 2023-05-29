import { useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { User } from '../types'
import { userLogout, userUploadPicture } from '../store/reducers/user.slice'

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

    async function onPictureSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const picture = event.target.files?.[0];
        if (picture !== undefined) {
            dispatch(userUploadPicture(picture))
        }
    }

    return (
        <header className='flex justify-between xl:px-24 px-3 text-verde-600 bg-cinza-100'>
            <div className='flex items-end cursor-pointer' onClick={setCriarUsuario ? undefined : () => navigate('/')}>
                <img src={logo} alt="Logo" className='h-[90px] p-3' />
                <h1 className='text-3xl hidden sm:block p-3'>Controle de Investimentos</h1>
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
                <input
                    type="file"
                    accept="image/jpeg"
                    id="select-picture"
                    className="hidden"
                    onChange={onPictureSelect}
                />
                <label htmlFor="select-picture" className={`cursor-pointer ${!user.isAuthenticated ? 'hidden' : ''}`} >
                    <img src={user.userPicture
                        ? `http://localhost:8080/${user.userPicture}`
                        : "/default-avatar.png"} alt="Logo" className='h-[80px] max-w-[80px] rounded-full' />
                </label>

            </div>
        </header >
    )
}


export default Header