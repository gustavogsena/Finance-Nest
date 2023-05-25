
import { FullStockQuery, FullStockRequestType } from "../types"
import api from "./api"



export const buscaAtivo = async (codigoAtivo: string, query?: FullStockQuery): Promise<FullStockRequestType[]> => {
    const defaultQuery = {fundamental: true}
    if (codigoAtivo) {
        const resposta = await api.get(`/bolsa/${codigoAtivo}`, { params: query ? query : defaultQuery})
        return resposta.data
    }
    return []
}

export const getAllStocks = async () => {
    const stoksCode = await api.get('/bolsa/acoes');
    return stoksCode.data
}

export const getAllRealStates = async () => {
    const stoksCode = await api.get('/bolsa/fiis');
    return stoksCode.data
}