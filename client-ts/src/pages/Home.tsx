import React, { useEffect, useState } from 'react'
import Radar from '../components/Radar';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ConsolidatedAsset } from '../types';
import InfoContainer from '../components/InfoContainer';
import StandardContainer from '../components/StandardContainer';
import ApexChart from '../components/ApexChart';
import { getInvestedDevelopmentHistoricalData } from '../api/assets.api';
import { LineChartData, createHistoricalDevelopmentChartData, createLineChartData } from '../services/chart.service';
import { listenRadarUpdates } from '../api/radar.api';
import toast from 'react-simple-toasts';

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
            }).catch(e => { throw new Error('Falha ao carregar histórico de preços') })

    }, [consolidado])


    return (
        <StandardContainer>
            <InfoContainer title='Meus Investimentos' data={consolidado.total} />

            <div className='flex justify-between flex-wrap'>
                <div className='w-full lg:w-[62%] bg-cinza-400 rounded-3xl px-6 py-4 mb-8 flex flex-col'>
                    <h3 className='text-center text-2xl text-verde-300 p-4 uppercase'>Evolução Patrimônio Investido</h3>

                    <ApexChart
                        series={[{ name: 'Evolução', data: lineChartData }]}
                        type='line'
                        height='300px' />
                </div>

                <div className='w-full lg:w-[35%] bg-cinza-400 rounded-3xl px-6 py-4 mb-8 flex flex-col'>
                    <h3 className='text-center text-2xl text-verde-300 p-4 uppercase'>Composição da carteira</h3>
                    <ApexChart
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
                        type='pie'
                        height='300px' />
                </div>


            </div>

            <Radar />

        </StandardContainer>
    )
}

export default Home
