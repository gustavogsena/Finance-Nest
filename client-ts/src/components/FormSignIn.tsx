import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userCreate} from '../store/reducers/user.slice'
import Textfield from '../components/Textfield'
import { RootState } from '../store'
import { UserForm } from '../types'
import { updateUserForm } from '../store/reducers/userForm.slice'

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
        <form
            className='bg-cinza-400 rounded-3xl p-6 mb-8 drop-shadow-lg flex flex-col justify-center grow-[1] max-w-[600px] text-center'
            onSubmit={(event) => {
                event.preventDefault()
                formSubmit()
            }}>
            <h3 className='uppercase mb-4 font-bold underline text-xl'>Criar nova Conta</h3>
            <Textfield
                label='Nome'
                labelStyle='uppercase font-bold'
                classStyle='mb-4 mx-auto max-w-[450px]'
                id='name'
                type='text'
                value={newUserForm.name}
                funcaoOnChange={(value) => changeForm({ name: value })}
            />
            <Textfield
                label='Sobrenome'
                labelStyle='uppercase font-bold'
                classStyle='mb-4 mx-auto max-w-[450px]'
                id='surname'
                type='text'
                value={newUserForm.surname}
                funcaoOnChange={(value) => changeForm({ surname: value })}
            />
            <Textfield
                label='E-mail'
                labelStyle='uppercase font-bold'
                classStyle='mb-4 mx-auto max-w-[450px]'
                id='email'
                type='email'
                value={newUserForm.email}
                funcaoOnChange={(value) => changeForm({ email: value })}
            />
            <Textfield
                label='Password'
                labelStyle='uppercase font-bold'
                classStyle='mb-4 mx-auto max-w-[450px]'
                id='password'
                type='password'
                value={newUserForm.password}
                funcaoOnChange={(value) => changeForm({ password: value })}
            />
            <Textfield
                label='Confirm Password'
                labelStyle='uppercase font-bold'
                classStyle='mb-4 mx-auto max-w-[450px]'
                id='password'
                type='password'
                value={confirmPassword}
                funcaoOnChange={(value) => setConfirmPassword(value)}
            />
            <button
                className='mx-auto mt-6 py-2 px-8 rounded-lg bg-verde-300 text-white hover:bg-verde-600'
                type='submit'>
                Criar
            </button>
        </form>
    )
}

export default FormSignIn