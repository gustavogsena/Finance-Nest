import React, { useEffect, useState } from 'react'
import Grafico from '../components/Grafico';
import Radar from '../components/Radar';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ConsolidatedAsset } from '../types';
import InfoContainer from '../components/InfoContainer';
import StandardContainer from '../components/StandardContainer';
import ApexChart from '../components/ApexChart';
import { getInvestedDevelopmentHistoricalData } from '../api/assets.api';
import { LineChartData, createHistoricalDevelopmentChartData, createLineChartData } from '../services/chart.service';

export const data2 = [
    { x: new Date("01/02/23"), y: 3000 },
    { x: new Date("02/02/23"), y: 10000 },
    { x: new Date("03/02/23"), y: 8000 },
    { x: new Date("04/02/23"), y: 15000 },
    { x: new Date("05/02/23"), y: 16000 },
    { x: new Date("07/02/23"), y: 14850 },
    { x: new Date("09/02/23"), y: 18000 },
    { x: new Date("11/02/23"), y: 19563 },
    { x: new Date("12/02/23"), y: 20000 }
];

export const options = {
    title: "My Daily Activities",
};

function Home() {
    const [pieChartData, setPieChartData] = useState<number[]>([])
    const [lineChartData, setLineChartData] = useState<LineChartData[]>([])

    const consolidado = useSelector<RootState, ConsolidatedAsset>(state => state.consolidatedAssets)

    useEffect(() => {
        setPieChartData([consolidado.realestate.current, consolidado.stockshare.current])

        getInvestedDevelopmentHistoricalData()
        .then((result) => {
                const data = createHistoricalDevelopmentChartData(result)
                setLineChartData(data)
        })
    }, [consolidado])

    return (
        <StandardContainer>
            <InfoContainer title='Meus Investimentos' data={consolidado.total} />

            <div className='flex justify-between flex-wrap'>

                <ApexChart
                    className='w-full md:w-[60%] mr-4 mb-8'
                    series={[{ name: 'Evolução', data: lineChartData }]}
                    title='Evolução Patrimônio Investido'
                    type='line'
                    initialShow={true}
                    height='300px' />

                <ApexChart
                    className='w-full md:w-[35%] mb-8'
                    series={pieChartData}
                    options={{
                        labels: ['Fundos Imobiliarios', 'Acoes'],
                        legend: { show: true, position: 'bottom' },
                        responsive: [{
                            breakpoint: 768,
                            options: {
                                legend: { position: 'right' }
                            }
                        }]
                    }}
                    title='Composição'
                    type='pie'
                    initialShow={true}

                    height='300px' />

            </div>

            <Radar />

        </StandardContainer>
    )
}

export default Home
