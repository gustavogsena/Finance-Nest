import React, { useEffect, useState } from 'react'
import StandardContainer from '../components/StandardContainer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { BasicAsset, ConsolidatedAsset, EarningResponseType, Query } from '../types'
import EarningsContainer from '../components/EarningsContainer'
import { resetQuery } from '../store/reducers/query.slice'
import { getEarnings } from '../store/reducers/earnings.slice'
import QueryOptions from '../components/QueryOptions'
import EarningsInfoContainer from '../components/EarningsInfoContainer'
import ApexChart from '../components/ApexChart'
import { BarChartData, createEarningsChartData } from '../services/chart.service'
import CollapseTitle from '../components/CollapseTitle'

function Proventos() {
    const dispatch = useDispatch()
    const [chartData, setChartData] = useState<BarChartData[]>([])
    const consolidado = useSelector<RootState, ConsolidatedAsset>(state => state.consolidatedAssets)
    const assets = useSelector<RootState, BasicAsset[]>(state => state.assets)
    const earnings = useSelector<RootState, EarningResponseType>(state => state.earnings)
    const query = useSelector<RootState, Query>(state => state.query)

    useEffect(() => {
        dispatch(resetQuery())
    }, [])

    useEffect(() => {
        setChartData(createEarningsChartData(assets))
    }, [assets])

    useEffect(() => {
        dispatch(getEarnings(query))
    }, [query])

    return (
        <StandardContainer>
            <EarningsInfoContainer />
            <QueryOptions title='' orderBy='earning_date' />
            <CollapseTitle className='mb-8' title='Proventos Recebidos' initialShow={false} >
                <ApexChart series={[{ data: chartData, name: 'Provento(R$)' }]} options={{
                    chart: {
                        type: 'bar'
                    },
                    xaxis: {
                        type: 'category'
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    }
                }} type='bar' height='300px' />
            </CollapseTitle>


            <EarningsContainer />


        </StandardContainer>
    )
}

export default Proventos