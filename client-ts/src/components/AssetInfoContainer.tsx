import React from 'react'
import InfoContainerItem from './InfoContainerItem'
import { BasicAsset } from '../types'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../services/general.service'

function AssetInfoContainer() {
    const ativo = useSelector<RootState, BasicAsset>(state => state.singleAsset)

    return (
        <div className='bg-cinza-400 rounded-3xl p-6 mb-8'>
            <h2 className='text-center text-4xl text-verde-300 pb-4  flex justify-center'><img src={`${ativo.logourl}`} className='w-[52px] aspect-[32/27] pr-2'/>{ativo.asset_name}</h2>
            <h4 className='text-center text-4xl text-verde-300 pb-4'>{ativo.asset_code.toUpperCase()}</h4>
            <div className='flex w-full px-6 flex-wrap justify-around text-center text-verde-600'>
                <InfoContainerItem title='Total Descontado' value={`${formatCurrency(ativo.discounted_price)}`} />
                <InfoContainerItem title='Total Investido' value={`${formatCurrency(ativo.total_price)}`} />
                <InfoContainerItem title='Total Atual' value={`${formatCurrency(ativo.current_total)}`} />
                <InfoContainerItem title='Proventos (%)' value={`${formatCurrency(ativo.earnings_received)}`} boldValue={`(${((ativo.earnings_received) * 100 / ativo.total_price).toFixed(2)}%)`} />
                <InfoContainerItem title='Valorização (%)' value={`${formatCurrency(ativo.balance)}`} boldValue={`(${((ativo.balance) * 100 / ativo.total_price).toFixed(2)}%)`} />
                <InfoContainerItem title='Retorno (%)' value={`${formatCurrency(ativo.balance_with_earnings)}`} boldValue={`(${((ativo.balance_with_earnings) * 100 / ativo.total_price).toFixed(2)}%)`} />
            </div>
        </div>

    )
}

export default AssetInfoContainer