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
import { buscaAtivo } from '../api/bolsa.api'
import { useParams } from 'react-router-dom'
import { LineChartData, createLineChartData } from '../services/chart.service'
import { getOperations } from '../store/reducers/operations.slice'


function SingleAsset() {
    const dispatch = useDispatch()
    const params = useParams()
    const query = useSelector<RootState, Query>(state => state.query)
    const singleAsset = useSelector<RootState, BasicAsset>(state => state.singleAsset)
    const [chartData, setChartData] = useState<LineChartData[]>([])


    useEffect(() => {
        dispatch(getEarnings(query))
        dispatch(getOperations(query))
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
            <CollapseTitle className='w-2/3' title='Cotação' initialShow={false} >
                <ApexChart series={[{ name: 'Fechamento', data: chartData }]} type='line' />
            </CollapseTitle>
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