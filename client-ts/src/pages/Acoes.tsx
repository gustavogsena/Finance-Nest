import React, { useEffect, useState } from 'react'
import InfoContainer from '../components/InfoContainer'
import { RootState } from '../store'
import { BasicAsset, ChartDataType, ConsolidatedAsset } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { resetQuery } from '../store/reducers/query.slice'
import Grafico from '../components/Grafico'
import StandardContainer from '../components/StandardContainer'
import AssetContainer from '../components/AssetContainer'
import { createPorcentageTable } from '../services'

export default function Acoes() {
    const dispatch = useDispatch()
    const [chartData, setChartData] = useState<ChartDataType[]>([])
    const consolidado = useSelector<RootState, ConsolidatedAsset>(state => state.consolidatedAssets)
    const assets = useSelector<RootState, BasicAsset[]>(state => state.assets.filter((asset) => asset.asset_type === 'stockshare' && asset.total_quantity !== 0))

useEffect(() => {
    dispatch(resetQuery())
    setChartData(createPorcentageTable(assets, consolidado.stockshare))
}, [consolidado, assets, dispatch])

return (
    <StandardContainer>
        <InfoContainer title='Ações' data={consolidado.stockshare} />
        <Grafico
            title='Composição'
            className='px-4 mb-8'
            options={{ backgroundColor: "#F9F9F9", legend: { position: 'none' } }}
            dados={chartData}
            chartType='ColumnChart' />
        <AssetContainer assets={assets} consolidado={consolidado.stockshare} />
    </StandardContainer >
)
}
