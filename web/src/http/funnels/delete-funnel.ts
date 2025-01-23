import { api } from '../api-client'

interface DeleteFunnelResponse {
  message: string
}

export async function deleteFunnel(funnelId: string): Promise<DeleteFunnelResponse> {
  const result = await api
    .delete(`funnels/${funnelId}`)
    .json<DeleteFunnelResponse>()

  return result
}