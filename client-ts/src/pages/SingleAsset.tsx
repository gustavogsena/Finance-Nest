import React, { useEffect, useState } from 'react'
import { BasicAsset, Query } from '../types'
import StandardContainer from '../components/StandardContainer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import OperationContainer from '../components/OperationContainer'
import CollapseTitle from '../components/CollapseTitle'
import AssetInfoContainer from '../components/AssetInfoContainer'
import EarningsContainer from '../components/EarningsContainer'
import { getEarnings } from '../store/reducers/earnings.slice'

type SingleAssetType = {
    ativo: BasicAsset
}

function SingleAsset() {
    const dispatch = useDispatch()
    const query = useSelector<RootState, Query>(state => state.query)

    useEffect(() => {
        dispatch(getEarnings(query))
    }, [query])

    return (
        <StandardContainer>
            <AssetInfoContainer />
            <CollapseTitle title='Operações'>
                <OperationContainer />
            </CollapseTitle>
            <CollapseTitle title='Proventos'>
                <EarningsContainer />
            </CollapseTitle>
        </StandardContainer>
    )
}

export default SingleAsset