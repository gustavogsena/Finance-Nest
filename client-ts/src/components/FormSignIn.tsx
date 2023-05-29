import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userCreate } from '../store/reducers/user.slice'
import Textfield from '../components/Textfield'
import { RootState } from '../store'
import { UserForm } from '../types'
import { updateUserForm } from '../store/reducers/userForm.slice'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'

function FormSignIn() {
    const dispatch = useDispatch()
    const newUserForm = useSelector<RootState, UserForm>(state => state.userForm)
    const [confirmPassword, setConfirmPassword] = useState('')
    const formSubmit = () => {
        if (newUserForm.password !== confirmPassword) {
            return alert('Senhas nao batem')
        }
        dispatch(userCreate(newUserForm))
    }
    const changeForm = (arg: Partial<UserForm>) => {
        dispatch(updateUserForm(arg))
    }
    return (
        <div className='text-verde-600 h-screen w-full flex justify-center items-center content-center flex-col z-20 px-5'>
            <div className='text-3xl mb-8 flex flex-col items-center text-center'>
                <img className='mb-6' src={logo} alt='Logo' />
                <h2>Quero fazer uma nova conta!</h2>
            </div>
            <form
                className='w-full'
                onSubmit={(event) => {
                    event.preventDefault()
                    formSubmit()
                }}>
                <Textfield
                    placeholder='Nome'
                    classStyle='mb-8 mx-auto w-full sm:w-4/5 max-w-[600px] text-verde-600'
                    id='name'
                    type='text'
                    value={newUserForm.name}
                    funcaoOnChange={(value) => changeForm({ name: value })}
                />
                <Textfield
                    placeholder='Sobrenome'
                    classStyle='mb-8 mx-auto w-full sm:w-4/5 max-w-[600px] text-verde-600'
                    id='surname'
                    type='text'
                    value={newUserForm.surname}
                    funcaoOnChange={(value) => changeForm({ surname: value })}
                />
                <Textfield
                    placeholder='E-mail'
                    classStyle='mb-8 mx-auto w-full sm:w-4/5 max-w-[600px] text-verde-600'
                    id='email'
                    type='email'
                    value={newUserForm.email}
                    funcaoOnChange={(value) => changeForm({ email: value })}
                />
                <Textfield
                    placeholder='Senha'
                    classStyle='mb-8 mx-auto w-full sm:w-4/5 max-w-[600px] text-verde-600'
                    id='password'
                    type='password'
                    value={newUserForm.password}
                    funcaoOnChange={(value) => changeForm({ password: value })}
                />
                <Textfield
                    placeholder='Confirmar Senha'
                    classStyle='mb-8 mx-auto w-full sm:w-4/5 max-w-[600px] text-verde-600'
                    id='password'
                    type='password'
                    value={confirmPassword}
                    funcaoOnChange={(value) => setConfirmPassword(value)}
                />
                <div className='flex flex-col items-center text-verde-600 text-xl'>
                    <Link to='/login'>
                        Retornar ao login
                    </Link>
                    <button
                        className='mx-auto mt-6 p-3 rounded-lg bg-verde-300 text-white hover:bg-verde-600 text-center w-full sm:w-4/5 max-w-[600px]'
                        type='submit'>
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormSignIn