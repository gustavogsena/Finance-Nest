import React from 'react'
import InfoContainerItem from './InfoContainerItem'
import { BasicAsset } from '../types'
import { RootState } from '../store'
import { useSelector } from 'react-redux'

type InfoAssetContainerType = {
    ativo: BasicAsset
}


function AssetInfoContainer() {
    const ativo = useSelector<RootState, BasicAsset>(state => state.singleAsset)

    return (
        <div className='bg-cinza-400 rounded-3xl p-6 mb-8'>
            <h2 className='text-center text-4xl text-verde-300 pb-4  flex justify-center'><img src={`${ativo.logourl}`} className='w-[52px] aspect-[32/27] pr-2'/>{ativo.asset_name}</h2>
            <h4 className='text-center text-4xl text-verde-300 pb-4'>{ativo.asset_code.toUpperCase()}</h4>
            <div className='flex w-full px-6 flex-wrap justify-around text-center text-verde-600'>
                <InfoContainerItem title='Total Descontado' value={`R$ ${ativo.discounted_price.toFixed(2)}`} />
                <InfoContainerItem title='Total Investido' value={`R$ ${ativo.total_price.toFixed(2)}`} />
                <InfoContainerItem title='Total Atual' value={`R$ ${ativo.current_total.toFixed(2)}`} />
                <InfoContainerItem title='Proventos (%)' value={` R$ ${Number(ativo.earnings_received).toFixed(2)} (${((ativo.earnings_received) * 100 / ativo.total_price).toFixed(2)}%)`} />
                <InfoContainerItem title='Valorização (%)' value={`R$ ${(ativo.balance).toFixed(2)} (${((ativo.balance) * 100 / ativo.total_price).toFixed(2)}%)`} />
                <InfoContainerItem title='Retorno (%)' value={`R$ ${(ativo.balance_with_earnings).toFixed(2)} (${((ativo.balance_with_earnings) * 100 / ativo.total_price).toFixed(2)}%)`} />
            </div>
        </div>

    )
}

export default AssetInfoContainer