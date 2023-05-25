import { BasicAsset, ChartDataType, ConsolidatedAssetItem, DataPriceType, HistoricalDevelopmentDataResponse, } from "../types";

export class Candle {
    private x: Date;
    private y: number[]

    constructor(date: number, open: number, high: number, low: number, close: number) {

        this.x = (new Date(date * 1000));
        this.y = [open, high, low, close]
    }
}
export class LineChartData {
    x: Date;
    y: number

    constructor(date: number | Date, close: number, unix: boolean = false) {

        this.x = unix && typeof date === 'number' ? (new Date(date * 1000)) : new Date(date);
        this.y = Number(close.toFixed(2))
    }
}
export class BarChartData {
    x: string | number;
    y: number 

    constructor(label: string | number, value: number) {
        this.x = label;
        this.y = Number(value.toFixed(2))
    }
}

export function createLineChartData(data: DataPriceType[]): Array<LineChartData> {
    const result = data
        .filter(item => item.close !== null)
        .map((item) => new LineChartData(item.date, item.close))

    return result
}

export function createHistoricalDevelopmentChartData(data: HistoricalDevelopmentDataResponse[]): Array<LineChartData>  {
    const result = data.map((item) => new LineChartData(item.date, item.value))
    return result
}

export function createPorcentageChartData(data: BasicAsset[], consolidated: ConsolidatedAssetItem): Array<BarChartData> {
    const porcentageChartData = data.map((asset) => {
        const porcentagemDaCarteira = asset.current_total * 100 / consolidated.current
        return new BarChartData(asset.asset_code.toUpperCase(), Number(porcentagemDaCarteira.toFixed(2)))
    })
    return porcentageChartData
}

export const createEarningsChartData = (data: BasicAsset[]): Array<BarChartData> => {
    const earningChartData = data
        .filter(item => item.earnings_received !== 0)
        .map((asset) => {
            return new BarChartData(asset.asset_code.toUpperCase(), Number(asset.earnings_received))
        })

    return earningChartData

}
