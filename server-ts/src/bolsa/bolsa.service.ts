import { Injectable } from '@nestjs/common';
import axios from 'axios';




@Injectable()
export class BolsaService {

    async retornaTodasAcoes() {
        const todasAcoes = await axios.get('https://brapi.dev/api/quote/list')
        return todasAcoes.data.stocks
    }

    async retornaAtivoProcurado(codigo: string, query: SingleStockQuery = {}): Promise<FullStockRequestType[]> {
        const baseQuery = Object.keys(query).length > 0 ? query : { fundamental: true }
        const ativoProcurado = await axios.get(`https://brapi.dev/api/quote/${codigo}`, { params: baseQuery })
        return ativoProcurado.data.results
    }

    async filterFundosImobiliarios(data: Ativos[]) {
        const listaFII = data.filter((item) => {
            const hasFII = item.name.includes('FII')
            const hasFIA = item.name.includes('FIA')
            return hasFII || hasFIA
        })
        return listaFII
    }

    async getAcoesSemFracionados(data: Ativos[]) {
        const listaSemFracionados = data.filter((item) => {
            return item.stock[item.stock.length - 1] !== 'F'
        }).filter((ativos) => {
            const hasFII = ativos.name.includes('FII');
            return !hasFII
        }).filter((ativosSemFII) => {
            const hasFIA = ativosSemFII.name.includes('FIA');
            return !hasFIA
        })
        return listaSemFracionados
    }

}

export type Ativos = {
    stock: string;
    name: string;
    close: number;
    change: number;
    volume: number;
    market_cap: number;
    logo: string;
    sector: string;
}

export type FullStockRequestType = {
    "symbol": string
    "shortName": string,
    "longName": string
    "currency": string
    "regularMarketPrice": number,
    "regularMarketDayHigh": number,
    "regularMarketDayLow": number,
    "regularMarketDayRange": string
    "regularMarketChange": number,
    "regularMarketChangePercent": number,
    "regularMarketTime": Date
    "marketCap": number,
    "regularMarketVolume": number,
    "regularMarketPreviousClose": number,
    "regularMarketOpen": number,
    "averageDailyVolume10Day": number,
    "averageDailyVolume3Month": number,
    "fiftyTwoWeekLowChange": number,
    "fiftyTwoWeekRange": "9.31 - 10.49",
    "fiftyTwoWeekHighChange": number,
    "fiftyTwoWeekHighChangePercent": number,
    "fiftyTwoWeekLow": number,
    "fiftyTwoWeekHigh": number,
    "twoHundredDayAverage": number,
    "twoHundredDayAverageChange": number,
    "twoHundredDayAverageChangePercent": number
    "priceEarnings": number | null,
    "earningsPerShare": number | null,
    "logourl": string,
    "validRange"?: Range[],
    "historicalDataPrice"?: DataPriceType[],
    "dividendsData"?: DividendsData
}

export type DataPriceType = {
    "date": number,
    "open": number,
    "high": number,
    "low": number,
    "close": number,
    "volume": number,
    "adjustedClose": number
}

export type SingleStockQuery = {
    range?: Range,
    interval?: Range,
    fundamental?: boolean,
    dividends?: boolean
}


export type SingleStockRequestType = {
    change: number
    close: number
    logo: string
    market_cap: number | null
    name: string
    sector: string
    stock: string
    volume: number
}

export type Range = '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max'

export type DividendsData = {
    cashDividends: CashDividends[],
    stockDividends: StockDividends[],
    subscriptions: Subscriptions[]
}

export type CashDividends = {
    "assetIssued": string,
    "paymentDate": string,
    "rate": number,
    "relatedTo": string,
    "approvedOn": string,
    "isinCode": string,
    "label": string,
    "lastDatePrior": string,
    "remarks": string
}

export type StockDividends = {
    "assetIssued": string,
    "factor": number,
    "approvedOn": string,
    "isinCode": string,
    "label": string,
    "lastDatePrior": string,
    "remarks": string
}

export type Subscriptions = {
    "assetIssued": string,
    "percentage": number,
    "priceUnit": number,
    "tradingPeriod": string,
    "subscriptionDate": string,
    "approvedOn": string,
    "isinCode": string,
    "label": string,
    "lastDatePrior": string,
    "remarks": string
}