import { BasicAsset, ChartDataType, ConsolidatedAssetItem, DataPriceType, } from "./types";

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

    constructor(date: number, close: number) {

        this.x = (new Date(date * 1000));
        this.y = Number(close.toFixed(2))
    }
}

export function createLineChartData(data: DataPriceType[]): Array<LineChartData> {
    const result = data
        .filter(item => item.close !== null)
        .map((item) => new LineChartData(item.date, item.close))

    return result
}


export function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

export const formatDate = (date: string) => {
    const data = new Date(date)
    const ano = data.getFullYear()
    const mes = padTo2Digits(data.getMonth() + 1)
    const dia = padTo2Digits(data.getDate())
    return `${ano}-${mes}-${dia}`
}

export const createEarningsTable = (data: BasicAsset[]): ChartDataType[] => {
    const proventosPorAtivo = data.map((asset) => {
        return [asset.asset_code.toUpperCase(), Number(asset.earnings_received)]
    })

    const curentData: Array<Array<string | number>> = [["Código", "Proventos"], ...proventosPorAtivo.filter((item) => Number(item[1]) > 0).sort((a, b) => Number(b[1]) - Number(a[1]))]
    return curentData

}
export const createPorcentageTable = (data: BasicAsset[], consolidated: ConsolidatedAssetItem) => {
    const porcentage = data.map((asset) => {
        const porcentagemDaCarteira = asset.current_total * 100 / consolidated.current
        return [asset.asset_code.toUpperCase(), porcentagemDaCarteira]
    })
    const cuurentData: Array<Array<string | number>> = [["Ativos", "Composição"], ...porcentage]
    return cuurentData
}

export const formatCurrency = (value: number) => {
    const currency = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)

    return currency
}