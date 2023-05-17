import React, { useEffect, useState } from 'react'
import Select from '../components/Select'
import { RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { FormStatus, PartialPostEarning, PostEarning } from '../types'
import { resetEarningForm, updateEarningForm } from '../store/reducers/earningForm.slice'
import Textfield from '../components/Textfield'
import { useParams } from 'react-router-dom'
import { postEarning, putEarning } from '../store/reducers/earnings.slice'
import { resetFormStatus } from '../store/reducers/form.slice'

function FormEarning() {
    const dispatch = useDispatch()

    const assetTypes = [['Todos', ''], ['Ações', 'stockshare'], ['Fundos Imobiliarios', 'realestate']]
    const earningTypes = [['Rendimentos', 'income'], ['Dividendos', 'dividends'], ['Juros sobre capital', 'interest']]

    const [assetType, setAssetType] = useState('')


    const formStatus = useSelector<RootState, FormStatus>(state => state.form)
    const earningForm = useSelector<RootState, PostEarning>(state => state.earningForm)
    const assetsCode = useSelector<RootState, (string | number)[][]>(state => {
        let assetsCodeMap = [['', 0]]
        if (assetType !== '') {
            assetsCodeMap = assetsCodeMap.concat(state.assets.filter((item) => item.asset_type === assetType).map((asset) => [asset.asset_code.toUpperCase(), asset.asset_id]))
            return assetsCodeMap
        }
        assetsCodeMap = assetsCodeMap.concat(state.assets.map((asset) => [asset.asset_code.toUpperCase(), asset.asset_id]))
        return assetsCodeMap
    })


    const changeForm = (arg: Partial<PartialPostEarning>) => {
        const newEarning: PostEarning = {
            earning: {
                ...earningForm.earning,
                ...arg.earning
            },
            asset_id: arg.asset_id ? arg.asset_id : earningForm.asset_id,
            earning_id: earningForm.earning_id
        }
        dispatch(updateEarningForm(newEarning))
    }
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formStatus.edit) return dispatch(postEarning(earningForm))
        if (formStatus.edit) return dispatch(putEarning(earningForm))
    }

    useEffect(() => {
        changeForm({ asset_id: 0 })
    }, [])
    return (
        <>
            <h2 className='text-center text-4xl text-verde-300 pb-4'>Adicionar Provento</h2>

            <form
                onSubmit={(event) => submitForm(event)}
                className='flex flex-col justify-around gap-6 w-full px-4 text-verde-600 '>
                <div className='flex flex-col w-full'>
                    <Select
                        defaultOption='Tipo do ativo'
                        required={false}
                        options={assetTypes}
                        value={assetType}
                        disabled={formStatus.edit}
                        funcaoOnChange={data => {
                            dispatch(resetEarningForm())
                            setAssetType(data)
                        }}
                    />
                </div>
                <div className='flex items-end gap-3'>
                    <Select
                        defaultOption='Ativo'
                        options={assetsCode}
                        value={earningForm.asset_id}
                        disabled={formStatus.edit}
                        funcaoOnChange={data => changeForm({ asset_id: +data })}
                    />
                    <Textfield
                        id='data_provento'
                        type='date'
                        funcaoOnChange={(value) => changeForm({ earning: { earning_date: value } })}
                        value={earningForm.earning.earning_date}
                        label='Data do provento'
                    />
                </div>
                <div className='flex items-end gap-3'>
                    <Select
                        defaultOption='Selecione o tipo de provento'
                        options={earningTypes}
                        value={earningForm.earning.earning_type}
                        funcaoOnChange={data => changeForm({ earning: { earning_type: data } })}
                    />
                    <Textfield
                        id='valor_provento'
                        type='text'
                        funcaoOnChange={(value) => changeForm({ earning: { earning_value: value } })}
                        value={earningForm.earning.earning_value}
                        label='Valor recebido'
                    />
                </div>
                <button
                    className='py-3 px-7 shadow-lg self-center rounded-lg bg-cinza-600 text-black hover:text-white'
                    type='submit'>
                    {!formStatus.edit ? 'Adicionar provento' : "Editar provento"}
                </button>
            </form>
        </>

    )
}

export default FormEarning