import React, { useEffect, useState } from 'react'
import { RootState } from '../store'
import { BasicAsset, ChartDataType, ConsolidatedAsset, Query } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import InfoContainer from '../components/InfoContainer'
import { resetQuery } from '../store/reducers/query.slice'
import Grafico from '../components/Grafico'
import StandardContainer from '../components/StandardContainer'
import AssetContainer from '../components/AssetContainer'
import { BarChartData, createBarChartData, createPorcentageTable } from '../services'
import ApexChart from '../components/ApexChart'

export default function FundosImobiliarios() {
  const dispatch = useDispatch()
  const [chartData, setChartData] = useState<BarChartData[]>([])

  const consolidado = useSelector<RootState, ConsolidatedAsset>(state => state.consolidatedAssets)
  const realestate = useSelector<RootState, BasicAsset[]>(state => state.assets.filter(asset => asset.asset_type === 'realestate'))

  useEffect(() => {
    dispatch(resetQuery())
    setChartData(createBarChartData(realestate, consolidado.realestate))
  }, [consolidado])

  return (
    <StandardContainer>
      <InfoContainer title='Fundos Imobiliarios' data={consolidado.realestate} />
      <ApexChart className='mr-4 mb-8' series={[{ data: chartData }]} title='Composição' options={{
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
      }} type='bar' initialShow={true} height='250px' />
      <AssetContainer assets={realestate} consolidado={consolidado.realestate} />
    </StandardContainer>
  )
}
