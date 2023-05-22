import React, { useState } from 'react'
import { Chart, ChartWrapperOptions, GoogleChartWrapperChartType, GoogleDataTableColumn } from 'react-google-charts';
import CollapseTitle from './CollapseTitle';
import { ChartDataType } from '../types';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface GraficoInterface {
    dados: ChartDataType[]
    title: string
    chartType?: GoogleChartWrapperChartType
    height?: string
    width?: string
    options?: ChartWrapperOptions["options"]
    className?: string
    chartClassName?: string
    diffData?: { old: any, new: any },
    initialShow?: boolean
}

function Grafico({ dados, options, className, diffData, initialShow = false, chartClassName, title, height = '100%', width = '100%', chartType = "LineChart" }: GraficoInterface) {
    const [show, setShow] = useState(initialShow)


    return (
        <CollapseTitle title={title} className={className} initialShow={initialShow}>
            <Chart
                diffdata={diffData}
                className={chartClassName}
                chartType={chartType}
                width={width}
                height={height}
                data={dados}
                options={options}
            />
        </CollapseTitle>
    )
}

export default Grafico
