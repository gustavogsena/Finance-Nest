import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BasicAssetSortKeys } from '../types'
import { sortAlphabeticalOrder, sortAssetsAsc, sortAssetsDesc } from '../store/reducers/assets.slice'

function AssetBar() {
    const dispatch = useDispatch()
    const [sortDirection, setSortDirection] = useState<boolean>(true)
    const [sortAttribute, setSortAttribute] = useState<string>("current_total")

    const sort = (parameter: keyof BasicAssetSortKeys) => {
        if (sortDirection) {
            dispatch(sortAssetsDesc(parameter))
            setSortAttribute(parameter)
            setSortDirection(false)
        } else {
            dispatch(sortAssetsAsc(parameter))
            setSortAttribute(parameter)
            setSortDirection(true)
        }
    }
    const sortByAssetCode = () => {
        dispatch(sortAlphabeticalOrder(sortDirection))
        setSortAttribute("asset_code")
        setSortDirection(!sortDirection)
    }
    return (
        <div className='bg-verde-300 text-white rounded-3xl py-3 mb-2 w-fit min-w-[100%] h-full drop-shadow-lg px-6 flex justify-between'>
            <span className={`w-1/6 min-w-[130px] cursor-pointer ${sortAttribute === "asset_code" && 'text-orange-400'}`} onClick={() => sortByAssetCode()}>Código</span>
            <span className={`w-1/6 min-w-[130px] text-center cursor-pointer ${sortAttribute === "total_quantity" && 'text-orange-400'}`} onClick={() => sort("total_quantity")}>Quantidade</span>
            <span className={`w-1/6 min-w-[130px] text-center cursor-pointer ${sortAttribute === "discounted_average_price" && 'text-orange-400'}`} onClick={() => sort("discounted_average_price")}>Preço Ajustado</span>
            <span className={`w-1/6 min-w-[130px] text-center cursor-pointer ${sortAttribute === "average_price" && 'text-orange-400'}`} onClick={() => sort("average_price")}>Preço Médio</span>
            <span className={`w-1/6 min-w-[130px] text-center cursor-pointer ${sortAttribute === "current_price" && 'text-orange-400'}`} onClick={() => sort("current_price")}>Preço Atual</span>
            <span className={`w-1/6 min-w-[130px] text-center cursor-pointer ${sortAttribute === "discounted_price" && 'text-orange-400'}`} onClick={() => sort("discounted_price")}>Total Ajustado</span>
            <span className={`w-1/6 min-w-[130px] text-center cursor-pointer ${sortAttribute === "total_price" && 'text-orange-400'}`} onClick={() => sort("total_price")}>Total Investido</span>
            <span className={`w-1/6 min-w-[130px] text-center cursor-pointer ${sortAttribute === "current_total" && 'text-orange-400'}`} onClick={() => sort("current_total")}>Total Atual</span>

            <span className={`w-1/6 min-w-[130px] text-center cursor-pointer ${sortAttribute === "balance" && 'text-orange-400'}`} onClick={() => sort("balance")}>Valorização</span>
            <span className={`w-1/6 min-w-[130px] text-center cursor-pointer ${sortAttribute === "earnings_received" && 'text-orange-400'}`} onClick={() => sort("earnings_received")}>Proventos</span>
            <span className={`w-1/6 min-w-[130px] text-center cursor-pointer ${sortAttribute === "balance_with_earnings" && 'text-orange-400'}`} onClick={() => sort("balance_with_earnings")}>Retorno</span>

            <span className={`w-1/6 min-w-[130px] text-center cursor-pointer ${sortAttribute === "current_total" && 'text-orange-400'}`} onClick={() => sort("current_total")}>Composição</span>
        </div>
    )
}

export default AssetBar
