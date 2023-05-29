import React from 'react'
import { BasicAsset, ConsolidatedAssetItem } from '../types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateQuery } from '../store/reducers/query.slice'
import { updateSingleAsset } from '../store/reducers/singleAsset.slice'
import { formatCurrency } from '../services/general.service'
import { Tooltip } from 'react-tooltip'

type AssetItem = {
    asset: BasicAsset,
    consolidado: ConsolidatedAssetItem
}

function AssetItem({ asset, consolidado }: AssetItem) {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const navigateToSingleAsset = () => {
        dispatch(updateQuery({ assetId: asset.asset_id }))
        dispatch(updateSingleAsset(asset))
        navigate(`/asset/${asset.asset_code}`)
    }


    return (
        <div
            className='bg-cinza-400 rounded-3xl py-4 mb-2 w-fit drop-shadow min-w-full h-full px-6 flex justify-between relative'
            data-tooltip-id='asset_toltip' data-tooltip-content={asset.asset_name} data-tooltip-float={true}>
            <span className='w-1/6 min-w-[130px] flex cursor-pointer' onClick={() => navigateToSingleAsset()}><img src={`${asset.logourl}`} className='w-[30px] pr-2' />{asset.asset_code.toUpperCase()}</span>
            <span className='w-1/6 min-w-[130px] text-center'>{asset.total_quantity}</span>
            <span className='w-1/6 min-w-[130px] text-center'>{formatCurrency(asset.discounted_average_price)}</span>
            <span className='w-1/6 min-w-[130px] text-center'>{formatCurrency(asset.average_price)}</span>
            <span className='w-1/6 min-w-[130px] text-center'>{formatCurrency(asset.current_price)}</span>
            <span className='w-1/6 min-w-[130px] text-center'>{formatCurrency(asset.discounted_price)}</span>
            <span className='w-1/6 min-w-[130px] text-center'>{formatCurrency(asset.total_price)}</span>
            <span className='w-1/6 min-w-[130px] text-center'>{formatCurrency(asset.current_total)}</span>
            <span className='w-1/6 min-w-[130px] text-center'>{formatCurrency(asset.balance)}</span>
            <span className='w-1/6 min-w-[130px] text-center'>{formatCurrency(asset.earnings_received)}</span>
            <span className='w-1/6 min-w-[130px] text-center'>{formatCurrency(asset.balance_with_earnings)}</span>

            <span className='w-1/6 min-w-[130px] text-center'>{(asset.current_total * 100 / consolidado.current).toFixed(2)}%</span>
           
        </div>
    )
}

export default AssetItem
