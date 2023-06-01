import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { EditOperation, FormStatus, FullStockRequestType, PartialPostOperation, PostOperation, SingleStockRequestType } from '../types'
import { resetOperationForm, updateOperationForm } from '../store/reducers/operationForm.slice'
import { postOperation, putOperation } from '../store/reducers/operations.slice'
import { getMarketRealStates } from '../store/reducers/bolsa/bolsaRealState.slice'
import { getMarketStocks } from '../store/reducers/bolsa/bolsaStocks.slice'
import { searchMarketAsset } from '../store/reducers/bolsa/searchAsset.slice'
import Select from './Select'
import Datalist from './Datalist'
import Textfield from './Textfield'
import { resetFormStatus } from '../store/reducers/form.slice'

function FormOperacao() {
    const dispatch = useDispatch()
    const firstRender = useRef<boolean>(true)

    const assetTypes = [['Ações', 'stockshare'], ['Fundos Imobiliarios', 'realestate']]
    const operationTypes = [['Compra', 'bought'], ['Venda', 'sold']]

    const formStatus = useSelector<RootState, FormStatus>(state => state.form)
    const formOperation = useSelector<RootState, PostOperation>(state => state.operationForm)
    const stockshareOptions = useSelector<RootState, SingleStockRequestType[]>(state => state.bolsaStock)
    const realestateOptions = useSelector<RootState, SingleStockRequestType[]>(state => state.bolsaRealState)
    const searchAsset = useSelector<RootState, Partial<FullStockRequestType>>(state => state.searchAsset)

    const changeForm = (arg: Partial<PartialPostOperation>) => {
        dispatch(updateOperationForm(arg))
    }

    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formStatus.edit) return dispatch(postOperation(formOperation))
        if (formStatus.edit) {
            const editOperation: EditOperation = {
                operation: formOperation.operation,
                id: formOperation.operation_id
            }
            dispatch(resetFormStatus())
            return dispatch(putOperation(editOperation))
        }
    }

    useEffect(() => {
        if (!formStatus.edit) {
            dispatch(resetOperationForm())
            dispatch(resetFormStatus())
        }
    }, [])

    useEffect(() => {
        if (formOperation.asset.asset_code.length > 4) dispatch(searchMarketAsset(formOperation.asset.asset_code))
    }, [formOperation.asset.asset_code, dispatch])
    return (
        <>
            <h2 className='text-center text-4xl text-verde-300 pb-4'>Adicionar Operação</h2>

            <form
                onSubmit={event => submitForm(event)}
                className='flex flex-col justify-around gap-6 w-full px-4 text-verde-600 '>

                <div className='flex flex-col w-full'>
                    <Select
                        defaultOption='Selecione o tipo de ativo'
                        options={assetTypes}
                        value={formOperation.asset.asset_type}
                        disabled={formOperation.asset.asset_code ? true : false}
                        funcaoOnChange={data => changeForm({ asset: { asset_type: data } })}
                    />
                </div>
                {formOperation.asset.asset_type &&
                    <Datalist
                        disabled={formStatus.edit}
                        id='asset_list'
                        dataAssetsOptions={{ stockshare: stockshareOptions, realestate: realestateOptions }}
                        watch={formOperation.asset.asset_type}
                        value={formOperation.asset.asset_code}
                        funcaoOnChange={data => changeForm({ asset: { asset_code: data } })}
                    />
                }

                {formOperation.asset.asset_code.length >= 5 &&

                    <>
                        <div className='flex justify-center flex-col items-center'>

                            <img src={`${searchAsset.logourl}`} className='w-9 aspect-[32/27] pr-2' />
                            <span className='font-bold'>
                                {searchAsset.longName}
                            </span>
                            <span >
                                Preço de mercado: R${searchAsset.regularMarketPrice}
                            </span>
                        </div>
                        <div className='flex items-end gap-3'>
                            <Textfield
                                id='data_operacao'
                                type='date'
                                funcaoOnChange={(value) => changeForm({ operation: { operation_date: value } })}
                                value={formOperation.operation.operation_date}
                                label='Data da operacao'
                            />

                            <Select
                                defaultOption='Selecione o tipo da operacao'
                                options={operationTypes}
                                value={formOperation.operation.operation_type}
                                funcaoOnChange={data => changeForm({ operation: { operation_type: data } })}
                            />
                        </div>
                        <div className='flex items-end gap-3'>
                            <Textfield
                                id='quantidade_operada'
                                type='number'
                                funcaoOnChange={(value) => changeForm({ operation: { quantity: +value } })}
                                value={formOperation.operation.quantity}
                                placeholder='Insira a quantidade operada'
                                label='Quantidade'
                                min={0}
                                step={1}
                            />
                            <Textfield
                                id='preco_da_operacao'
                                type='number'
                                funcaoOnChange={(value) => changeForm({ operation: { operation_price: value } })}
                                value={formOperation.operation.operation_price}
                                placeholder='Insira o valor da operacao'
                                label='Valor da operacao'
                                min={0}
                                step={0.1}
                            />
                        </div>
                        <button
                            className='py-3 px-7 shadow-lg self-center rounded-lg bg-cinza-600 text-black hover:text-white'
                            type='submit'>
                            {!formStatus.edit ? 'Adicionar operação' : "Editar Operação"}
                        </button>
                    </>
                }
            </form>
        </>
    )
}

export default FormOperacao