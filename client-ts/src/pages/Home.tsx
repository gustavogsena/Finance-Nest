import React, { useEffect, useState } from 'react'
import Grafico from '../components/Grafico';
import Radar from '../components/Radar';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ConsolidatedAsset } from '../types';
import InfoContainer from '../components/InfoContainer';
import StandardContainer from '../components/StandardContainer';

export const data2 = [
    ["data", "Valor Total"],
    ["11/02/23", 3000],
    ["13/02/23", 10000],
    ["15/02/23", 8000],
    ["11/02/23", 15000],
    ["13/02/23", 16000],
    ["15/02/23", 14850],
    ["11/02/23", 18000],
    ["13/02/23", 19563],
    ["15/02/23", 20000]
];

export const options = {
    title: "My Daily Activities",
};

function Home() {
    const [pieChartData, setPieChartData] = useState<Array<Array<string | number>>>([])

    const consolidado = useSelector<RootState, ConsolidatedAsset>(state => state.consolidatedAssets)

    useEffect(() => {
        setPieChartData(() => {
            let newData: Array<Array<string | number>> = [["Ativos", "Composição da carteira"]]
            newData = [["Ativos", "Composição da carteira"], ['Fundos Imobiliarios', consolidado.realestate.current], ['Acoes', consolidado.stockshare.current], ['Renda Fixa', 0]]
            return newData
        })
    }, [consolidado])

    return (
        <StandardContainer>
            <InfoContainer title='Meus Investimentos' data={consolidado.total} />

            <div className='flex justify-between'>
        
                <Grafico
                    initialShow={true}
                    dados={data2}
                    chartType='LineChart'
                    height='200px'
                    className='w-4/6 mr-4 mb-8'
                    title='Evolução de Patrimônio'
                    options={{
                        legend: "none",
                        backgroundColor: '#F9F9F9',
                        height: 200
                    }} />

                <Grafico
                    initialShow={true}
                    dados={pieChartData}
                    chartType='PieChart'
                    height='200px'
                    className='w-2/6 ml-4 mb-8'
                    title='Composição da Carteira'
                    options={{
                        colors: ['#000', "#666", "#ccc"],
                        backgroundColor: '#F9F9F9',
                        height: 200
                    }} />

            </div>

            <Radar />

        </StandardContainer>
    )
}

export default Home
