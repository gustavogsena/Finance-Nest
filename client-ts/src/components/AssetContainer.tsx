import React from 'react'
import AssetBar from './AssetBar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { BasicAsset, ConsolidatedAssetItem, Query } from '../types'
import AssetItem from './AssetItem'
import PaginationArrows from './PaginationArrows'
import { updateQuery } from '../store/reducers/query.slice'
import { Tooltip } from 'react-tooltip'

type AssetContainerType = {
    assets: BasicAsset[],
    consolidado: ConsolidatedAssetItem
}

function AssetContainer({ assets, consolidado }: AssetContainerType) {
    const query = useSelector<RootState, Query>((state) => state.query)
    const dispatch = useDispatch()

    const changeQuery = (newQuery: Partial<Query>) => {
        dispatch(updateQuery(newQuery))
    }
    
    return (
        <div className=''>
            <div className='flex justify-between flex-col overflow-y-auto overflow-x-auto'>
                <AssetBar />
                {
                    assets.map((asset, index) => {
                        if (index >= query.offset && index < query.limit + query.offset) {
                            return (
                                <AssetItem asset={asset} consolidado={consolidado} key={asset.created_at.toLocaleString()} />
                            )
                        }
                    })
                }

            </div>
            <Tooltip id='asset_toltip'/>
            <PaginationArrows changeQueryFunction={changeQuery} count={assets?.length} query={query} />
        </div >
    )
}

export default AssetContainer