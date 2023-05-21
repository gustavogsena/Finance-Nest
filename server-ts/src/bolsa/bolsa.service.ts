import { Injectable } from '@nestjs/common';
import axios from 'axios';

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
    "logourl": string
}


@Injectable()
export class BolsaService {

    async retornaTodasAcoes() {
        const todasAcoes = await axios.get('https://brapi.dev/api/quote/list')
        return todasAcoes.data.stocks
    }

    async retornaAtivoProcurado(codigo: string): Promise<FullStockRequestType[]> {
        const ativoProcurado = await axios.get(`https://brapi.dev/api/quote/${codigo}`, { params: { fundamental: true } })
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
