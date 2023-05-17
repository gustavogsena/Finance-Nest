
import { Query, OperationsResponse, PostOperation, EditOperation } from "../../types"
import api from "../api"


export const getOperationsApi = async (query: Query): Promise<OperationsResponse> => {
  const resposta = await api.get(`/operation`, {
    params: query
  })
  return resposta.data
}
export const postOperationApi = async (operation: PostOperation): Promise<PostOperation> => {
  const resposta = await api.post(`/operation`, operation)
  return resposta.data
}
export const putOperationApi = async (operation: EditOperation): Promise<PostOperation> => {
  const resposta = await api.put(`/operation/${operation.id}`, operation.operation)
  return resposta.data
}
export const deleteOperationApi = async (operationId: number): Promise<PostOperation> => {
  const resposta = await api.delete(`/operation/${operationId}`)
  return resposta.data
}