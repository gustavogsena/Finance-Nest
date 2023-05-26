import React from 'react'
import { Operation, PostOperation, User } from '../types'
import { AiOutlineEdit } from 'react-icons/ai'
import { CiTrash } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { searchMarketAsset } from '../store/reducers/bolsa/searchAsset.slice'
import { useNavigate } from 'react-router-dom'
import { editOperationForm } from '../store/reducers/operationForm.slice'
import { deleteOperation } from '../store/reducers/operations.slice'
import { updateFormEdit, updateFormType } from '../store/reducers/form.slice'
import { formatCurrency, formatDate } from '../services/general.service'

type OperationItemType = {
    data: Operation
}

function OperationItem({ data }: OperationItemType) {
    const form = useSelector<RootState, PostOperation>(state => state.operationForm)
    const user = useSelector<RootState, User>(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const editOperation = () => {
        const arg: PostOperation = {
            operation: {
                operation_type: data.operation_type,
                quantity: data.quantity,
                operation_price: data.operation_price,
                operation_date: formatDate(data.operation_date)
            },
            asset: {
                asset_code: data.asset_code,
                asset_name: '',
                asset_type: data.asset_type
            },
            operation_id: data.operation_id
        }
        dispatch(editOperationForm(arg))
        dispatch(updateFormEdit(true))
        dispatch(updateFormType('operation'))
        dispatch(searchMarketAsset(data.asset_code))

        navigate('/adicionar/editar')
    }


    return (
        <div
            className='bg-cinza-400 rounded-3xl py-4 mb-2 w-fit min-w-full h-full drop-shadow px-6 flex justify-between'>
            <span className='w-[calc(100%/7)] min-w-[130px] first-letter:border-r-2 border-cinza-600'>{new Date(data.operation_date).toLocaleDateString()}</span>
            <span className='w-[calc(100%/7)] min-w-[130px] text-center'>{data.asset_code.toUpperCase()}</span>
            <span className='w-[calc(100%/7)] min-w-[130px] text-center'>{data.operation_type === 'bought' ? 'Compra' : 'Venda'}</span>
            <span className='w-[calc(100%/7)] min-w-[130px] text-center'>{data.quantity}</span>
            <span className='w-[calc(100%/7)] min-w-[130px] text-center'>{formatCurrency(data.operation_price)}</span>
            <span className='w-[calc(100%/7)] min-w-[130px] text-center'>{formatCurrency(data.volume)}</span>
            <span
                className='w-[calc(100%/14)] self-center cursor-pointer flex justify-end text-black min-w-[65px]'
                onClick={() => editOperation()}
            >
                <AiOutlineEdit />
            </span>
            <span
                className='w-[calc(100%/14)] self-center cursor-pointer flex justify-end text-black min-w-[65px]'
                onClick={() => dispatch(deleteOperation(data.operation_id))}
            >
                <CiTrash />
            </span>
        </div>
    )
}

export default OperationItem
