import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/reducers/user.slice'
import Textfield from '../components/Textfield'

function FormLogin() {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const formSubmit = async (email: string, password: string) => {
        dispatch(userLogin({ email, password }))
    }

  /*   useEffect(() => {
        dispatch(userLogout())
    }, []) */
    return (
       
            <form
                className='bg-cinza-400 rounded-3xl p-6 mb-8 drop-shadow-lg flex flex-col justify-center grow-[1] max-w-[600px]'
                onSubmit={(event) => {
                    event.preventDefault()
                    formSubmit(email, password)
                }}>
                <Textfield
                    label='E-mail'
                    labelStyle='uppercase font-bold'
                    classStyle='mb-4 mx-auto max-w-[450px]'
                    id='email'
                    type='email'
                    value={email}
                    funcaoOnChange={(value) => setEmail(value)}
                />
                <Textfield
                    label='Password'
                    labelStyle='uppercase font-bold'
                    classStyle='mb-4 mx-auto max-w-[450px]'
                    id='password'
                    type='password'
                    value={password}
                    funcaoOnChange={(value) => setPassword(value)}
                />
                <button
                    className='mx-auto mt-6 py-2 px-8 rounded-lg bg-verde-300 text-white hover:bg-verde-600'
                    type='submit'>
                    Enviar
                </button>
            </form>

    )
}

export default FormLogin