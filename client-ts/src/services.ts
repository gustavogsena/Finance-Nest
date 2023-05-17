import { BasicAsset, ChartDataType, ConsolidatedAssetItem, } from "./types";

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