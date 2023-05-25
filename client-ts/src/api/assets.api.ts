
import { BasicAsset, ConsolidatedAsset } from "../types"
import api from "./api"


export const getAssetsApi = async (): Promise<BasicAsset[]> => {
  const resposta = await api.get(`/assets`)
  return resposta.data
}

export const getConsolidatedAssetsApi = async (): Promise<ConsolidatedAsset> => {
  const resposta = await api.get(`/assets/consolidated`)
  return resposta.data
}



