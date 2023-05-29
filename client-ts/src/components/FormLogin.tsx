import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/reducers/user.slice'
import Textfield from '../components/Textfield'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'

function FormLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const formSubmit = async (email: string, password: string) => {
        dispatch(userLogin({ email, password }))
    }

    return (
        <div className='text-verde-600 h-screen w-full flex justify-center items-center content-center flex-col z-20 px-5'>
            <div className='text-3xl mb-8 flex flex-col items-center text-center'>
                <img className='mb-6' src={logo} alt='Logo' />
                <h2>Fazer login na minha conta!</h2>
            </div>
            <form
                className='w-full'
                onSubmit={(event) => {
                    event.preventDefault()
                    formSubmit(email, password)
                }}>
                <Textfield
                    /* label='E-mail'
                    labelStyle='uppercase font-bold' */
                    classStyle='mb-8 mx-auto w-full sm:w-4/5 max-w-[600px] text-verde-600'
                    placeholder='E-mail'
                    id='email'
                    type='email'
                    value={email}
                    funcaoOnChange={(value) => setEmail(value)}
                />
                <Textfield
                    /* label='Password'
                    labelStyle='uppercase font-bold' */
                    classStyle='mb-8 mx-auto w-full sm:w-4/5 max-w-[600px] text-verde-600'
                    placeholder='Senha'
                    id='password'
                    type='password'
                    value={password}
                    funcaoOnChange={(value) => setPassword(value)}
                />
                <div className='flex flex-col items-center text-verde-600 text-xl'>
                    <Link to='/register'>
                        Quero criar uma nova conta
                    </Link>
                    <button
                        className='mx-auto mt-6 p-3 rounded-lg bg-verde-300 text-white hover:bg-verde-600 text-center w-full sm:w-4/5 max-w-[600px]'
                        type='submit'>
                        Login
                    </button>
                </div>

            </form>

        </div>


    )
}

export default FormLogin