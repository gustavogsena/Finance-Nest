import React from 'react'
import { Earning, PostEarning } from '../types'
import { AiOutlineEdit } from 'react-icons/ai'
import { CiTrash } from 'react-icons/ci'
import { useDispatch } from 'react-redux'
import { deleteEarning } from '../store/reducers/earnings.slice'
import { useNavigate } from 'react-router-dom'
import { formatCurrency, formatDate } from '../services'
import { updateEarningForm } from '../store/reducers/earningForm.slice'
import { updateFormEdit, updateFormType } from '../store/reducers/form.slice'


type EarningItemType = {
    earning: Earning
}
function EarningItem({ earning }: EarningItemType) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const editEarning = () => {
        const arg: PostEarning = {
            earning: {
                earning_date: formatDate(`${earning.earning_date}`) ,
                earning_type: earning.earning_type,
                earning_value: earning.earning_value
            },
            asset_id: earning.asset,
            earning_id: earning.earning_id
        }

        console.log(arg)
        dispatch(updateEarningForm(arg))
        dispatch(updateFormEdit(true))
        dispatch(updateFormType('earning'))

        navigate('/adicionar/editar')
    }

    return (
        <div

            className='bg-cinza-400 rounded-3xl py-4 px-6 mb-2 drop-shadow min-w-[100%] flex justify-between'
        >
            <span className='w-1/5 min-w-[130px]'>{new Date(earning.earning_date).toLocaleDateString()}</span>
            <span className='w-1/5 min-w-[130px] text-center'>{earning.asset_code.toUpperCase()}</span>
            <span className='w-1/5 min-w-[130px] text-center'>{earning.earning_type === 'income' ? "Rendimentos" : earning.earning_type === 'dividends' ? "Dividendos" : "JSCP"}</span>
            <span className='w-1/5 min-w-[130px] text-center'>{formatCurrency(earning.earning_value)}</span>
            <span
                className='w-[10%] self-center cursor-pointer flex justify-end text-black'
                onClick={() => editEarning()}
            >
                <AiOutlineEdit />
            </span>
            <span
                className='w-[10%] self-center cursor-pointer flex justify-end text-black'
                onClick={() => dispatch(deleteEarning(earning.earning_id))}
            >
                <CiTrash />
            </span>
        </div>
    )
}

export default EarningItem