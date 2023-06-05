import React, { useState } from 'react'
import fiis from '../images/fiis.png'
import { RadarType } from '../types'
import { calculateDiferencePercentage, formatCurrency } from '../services/general.service'
import { IoMdArrowUp, IoMdArrowDown } from 'react-icons/io';

type RadarItemType = {
    asset: RadarType
}

function RadarItem({ asset }: RadarItemType) {
    const [percentage, setPercentage] = useState(calculateDiferencePercentage(asset.current_value, asset.previous_close_value))

    return (
        <div className='w-full drop-shadow-sm flex p-5 min-w-[225px] lg:w-1/4 bg-cinza-500 rounded-xl lg:mx-6 lg:first:ml-2 lg:last:mr-2 flex-wrap'>
            <div className='flex w-full justify-between'>
                <div className='flex justify-start items-center'>
                    <img src={asset.logo_url} alt='Ativo' className='h-[30px] pr-3' />
                    <p><b>{asset.asset_code.toUpperCase()}</b></p>
                </div>

                <div className='flex items-center'>
                    <span className={percentage > 0 ? 'text-verde-200' : 'text-vermelho-500'}>{percentage}%</span>
                    <span>{percentage > 0 ? <IoMdArrowUp className='text-verde-200 text-xl' /> : <IoMdArrowDown className='text-vermelho-500 text-xl' />}</span>
                </div>
            </div>
            <div className='flex justify-between w-full pt-3'>
                <span>Ontem: {formatCurrency(asset.previous_close_value)}</span>
                <span className='text-end'>Hoje: {formatCurrency(asset.current_value)}</span>
            </div>
        </div>
    )
}

export default RadarItem
