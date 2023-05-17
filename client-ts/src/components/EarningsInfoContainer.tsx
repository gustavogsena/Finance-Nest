import React from 'react'
import InfoContainerItem from './InfoContainerItem'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { ConsolidatedAsset } from '../types'
import { formatCurrency } from '../services'

function EarningsInfoContainer() {
    const consolidado = useSelector<RootState, ConsolidatedAsset>(state => state.consolidatedAssets)
    
    return (
        <div className='bg-cinza-400 rounded-3xl p-6 mb-8'>
            <h2 className='text-center text-4xl text-verde-300 pb-4'>Proventos</h2>

            <div className='flex w-full flex-wrap justify-between text-center text-verde-600'>
                <InfoContainerItem title='Proventos totais (%)' value={`${formatCurrency(consolidado.total.earnings)} (${(consolidado.total.earnings * 100 / consolidado.total.price).toFixed(2)}%)`} />
                <InfoContainerItem title='Proventos Ações' value={`${formatCurrency(consolidado.stockshare.earnings)} (${(consolidado.stockshare.earnings * 100 / consolidado.stockshare.price).toFixed(2)}%)`} />
                <InfoContainerItem title='Proventos FIIs' value={`${formatCurrency(consolidado.realestate.earnings)} (${(consolidado.realestate.earnings * 100 / consolidado.realestate.price).toFixed(2)}%)`} />
            </div>
        </div>
    )
}

export default EarningsInfoContainer