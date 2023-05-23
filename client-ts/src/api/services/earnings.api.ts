
import { Earning, EarningResponseType, EarningsByMonth, PostEarning, Query } from "../../types"
import api from "../api"


export const getEarningsApi = async (query?: Query): Promise<EarningResponseType> => {
  const resposta = await api.get(`/earning`, {
    params: query
  })
  return resposta.data
}
export const postEarningsApi = async (earning: PostEarning): Promise<Earning> => {
  const resposta = await api.post(`/earning`, earning)
  return resposta.data
}

export const putEarningsApi = async (earning: PostEarning): Promise<Earning> => {
  const resposta = await api.put(`/earning/${earning.earning_id}`, earning.earning)
  return resposta.data
}

export const deleteEarningApi = async (earningId: number): Promise<Earning> => {
  const resposta = await api.delete(`/earning/${earningId}`)
  return resposta.data
}


export const getEarningsByMonthApi = async (query?: Query): Promise<EarningsByMonth[]> => {
  const resposta = await api.get(`earning/consolidated/`, {
    params: query
  })
  return resposta.data
}