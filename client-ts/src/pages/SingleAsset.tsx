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
import ApexChart from '../components/ApexChart'
import { buscaAtivo } from '../api/services/bolsa.api'
import { LineChartData, createLineChartData } from '../services'


function SingleAsset() {
    const dispatch = useDispatch()
    const query = useSelector<RootState, Query>(state => state.query)
    const singleAsset = useSelector<RootState, BasicAsset>(state => state.singleAsset)
    const [chartData, setChartData] = useState<LineChartData[]>([])

    useEffect(() => {
        dispatch(getEarnings(query))
    }, [query])

    useEffect(() => {
        buscaAtivo(singleAsset.asset_code, { interval: '1d', range: '1y' })
            .then(([result]) => {
                if (result.historicalDataPrice) { 
                    const data = createLineChartData(result.historicalDataPrice)
                    if (data) {
                        setChartData(data)
                    }
                }
            })
    }, [])

    return (
        <StandardContainer>
            <AssetInfoContainer />
            <ApexChart series={[{ name: 'Fechamento', data: chartData }]} title='Cotação' type='line' />
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