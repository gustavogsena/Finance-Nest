
import { BasicAsset, ConsolidatedAsset, HistoricalDevelopmentDataResponse } from "../types"
import api from "./api"

export const getAssetsApi = async (): Promise<BasicAsset[]> => {
  const response = await api.get(`/assets`)
  return response.data
}

export const getConsolidatedAssetsApi = async (): Promise<ConsolidatedAsset> => {
  const response = await api.get(`/assets/consolidated`)
  return response.data
}

export const getInvestedDevelopmentHistoricalData = async (): Promise<HistoricalDevelopmentDataResponse[]> => {
  const response = await api.get(`/assets/development`)
  return response.data
}



