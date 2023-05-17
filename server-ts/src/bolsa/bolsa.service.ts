import { Injectable } from '@nestjs/common';

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

@Injectable()
export class BolsaService {

    async retornaTodasAcoes() {
        const todasAcoes = await fetch('https://brapi.dev/api/quote/list')
        const todasAcoesConvertidas = await todasAcoes.json()
        return todasAcoesConvertidas.stocks
    }

    async retornaAtivoProcurado(codigo: string) {
        const ativoProcurado = await fetch(`https://brapi.dev/api/quote/${codigo}`)
        const ativoProcuradoConvertido = await ativoProcurado.json()
        return ativoProcuradoConvertido.results
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
