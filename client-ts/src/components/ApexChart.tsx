import React from 'react'
import CollapseTitle from './CollapseTitle'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { ChartType } from '../types'

type ApexChartType = {
    series: ApexOptions['series'],
    options?: ApexOptions,
    type?: ChartType
    height?: string
}


function ApexChart({ series, options, type = 'bar', height = `400px` }: ApexChartType) {
    const defaultOptions = {
        chart: {
            type: type,
            height: 200
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    } as ApexOptions

    return (
        <ReactApexChart series={series} type={type} options={{ ...defaultOptions, ...options }} height={height} />
    )
}

export default ApexChart