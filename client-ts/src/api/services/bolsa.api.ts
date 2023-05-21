import { FullStockRequestType } from "../../store/reducers/bolsa/types"
import api from "../api"

export const buscaAtivo = async (codigoAtivo: string): Promise<FullStockRequestType[] | void> => {
    if (codigoAtivo) {
        const resposta = await api.get(`/bolsa/${codigoAtivo}`)
        return resposta.data
    } 
}

export const getAllStocks = async () => {
    const stoksCode = await api.get('/bolsa/acoes');
    return stoksCode.data
}

export const getAllRealStates = async () => {
    const stoksCode = await api.get('/bolsa/fiis');
    return stoksCode.data
}