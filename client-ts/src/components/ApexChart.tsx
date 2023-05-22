import React from 'react'
import CollapseTitle from './CollapseTitle'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { ChartType } from '../types'

type ApexChartType = {
    title: string,
    series: ApexOptions['series'],
    options?: ApexOptions,
    type?: ChartType
    className?: string,
    initialShow?: boolean,
}


function ApexChart({ title, className, series, options, initialShow = false, type = 'bar' }: ApexChartType) {
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
        <CollapseTitle title={title} className={className} initialShow={initialShow} >
            <ReactApexChart series={series} type={type} options={defaultOptions} height={`400px`} />
        </CollapseTitle >
    )
}

export default ApexChart