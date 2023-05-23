import React from 'react'
import { ConsolidatedAssetItem } from '../types'
import InfoContainerItem from './InfoContainerItem'
import { formatCurrency } from '../services'

type InfoContainerType = {
    data: ConsolidatedAssetItem,
    title: string,
    vendas?: boolean
}


function InfoContainer({ data, title, vendas = false }: InfoContainerType) {
    return (
        <div className='bg-cinza-400 rounded-3xl p-6 mb-8'>
            <h2 className='text-center text-4xl text-verde-300 pb-4'>{title}</h2>

            <div className='flex w-full flex-wrap justify-between text-center text-verde-600'>
                <InfoContainerItem title='Total Descontado' value={formatCurrency(data.discounted_price)} />
                <InfoContainerItem title='Total Investido' value={formatCurrency(data.price)} />
                <InfoContainerItem title='Total Atual' value={formatCurrency(data.current)} />
                <InfoContainerItem title='Proventos (%)' value={`${formatCurrency(data.earnings)} (${((data.earnings) * 100 / data.price).toFixed(2)}%)`} />
                <InfoContainerItem title='Valorização (%)' value={`${formatCurrency(data.balance)} (${((data.balance) * 100 / data.price).toFixed(2)}%)`} />
                <InfoContainerItem title='Retorno (%)' value={`${formatCurrency(data.discounted_balance)} (${((data.discounted_balance) * 100 / data.price).toFixed(2)}%)`} />
                {
                    vendas &&
                        <>
                            <InfoContainerItem title='Vendido (%)' value={`${formatCurrency(data.sold_balance)} (${((data.sold_balance) * 100 / data.price).toFixed(2)}%)`} />

                            <InfoContainerItem title='Retorno com Vendas (%)' value={`${formatCurrency(data.total_sold_balance)} (${((data.total_sold_balance) * 100 / data.price).toFixed(2)}%)`} />
                        </> 
                }
            </div>
        </div >
    )
}

export default InfoContainer