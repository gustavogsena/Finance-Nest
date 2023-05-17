import React, { useEffect, useState } from 'react'
import { RootState } from '../store'
import { BasicAsset, ChartDataType, ConsolidatedAsset, Query } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import InfoContainer from '../components/InfoContainer'
import AssetItem from '../components/AssetItem'
import PaginationArrows from '../components/PaginationArrows'
import { updateQuery, resetQuery } from '../store/reducers/query.slice'
import Grafico from '../components/Grafico'
import StandardContainer from '../components/StandardContainer'
import AssetBar from '../components/AssetBar'
import AssetContainer from '../components/AssetContainer'
import { createPorcentageTable } from '../services'

export default function FundosImobiliarios() {
  const dispatch = useDispatch()
  const [chartData, setChartData] = useState<ChartDataType[]>([])

  const consolidado = useSelector<RootState, ConsolidatedAsset>(state => state.consolidatedAssets)
  const realestate = useSelector<RootState, BasicAsset[]>(state => state.assets.filter(asset => asset.asset_type === 'realestate'))

  useEffect(() => {
    dispatch(resetQuery())
    setChartData(createPorcentageTable(realestate, consolidado.realestate))
  }, [consolidado])

  return (
    <StandardContainer>
      <InfoContainer title='Fundos Imobiliarios' data={consolidado.realestate} />
      <Grafico
        title='Composição'
        className='px-4 mb-8'
        options={{ backgroundColor: "#F9F9F9", legend: { position: 'none' } }}
        dados={chartData}
        chartType='ColumnChart' />
      <AssetContainer assets={realestate} consolidado={consolidado.realestate} />
    </StandardContainer>
  )
}
