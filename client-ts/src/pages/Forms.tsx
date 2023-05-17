import React, { useState } from 'react'
import StandardContainer from '../components/StandardContainer'
import FormOperacao from '../components/FormOperacao'
import Select from '../components/Select'
import { RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { FormStatus, NewEarning, PartialPostEarning, PartialPostOperation, PostEarning } from '../types'
import { resetOperationForm, updateOperationForm } from '../store/reducers/operationForm.slice'
import { resetEarningForm, updateEarningForm } from '../store/reducers/earningForm.slice'
import Textfield from '../components/Textfield'
import FormEarning from '../components/FormEarning'
import { updateFormEdit, updateFormType } from '../store/reducers/form.slice'

function Forms() {
    const dispatch = useDispatch()
    const formStatus = useSelector<RootState, string>(state => state.form.type)

    const changeForms = (changeTo: string) => {
        dispatch(updateFormType(changeTo))
        dispatch(updateFormEdit(false))
        dispatch(resetEarningForm())
        dispatch(resetOperationForm())
    }

    return (
        <StandardContainer>
            <div>
                <span onClick={() => changeForms('operation')} className={`p-3 mx-3 bg-verde-300 text-white rounded-md w-[100px] ${formStatus !== 'operation' && 'opacity-30'}`}>Operações</span>
                <span onClick={() => changeForms('earning')} className={`p-3 mx-3 bg-verde-300 text-white rounded-md w-[100px] ${formStatus !== 'earning' && 'opacity-30'}`}>Proventos</span>
            </div>

            <div className='bg-cinza-400 rounded-3xl py-6 mb-8 drop-shadow-lg'>

                {formStatus === 'operation' && <FormOperacao />}
                {formStatus === 'earning' && <FormEarning />}
            </div>

        </StandardContainer >

    )
}

export default Forms