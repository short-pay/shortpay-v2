import { api } from '../api-client'

interface ReorderPagesRequest {
  funnelId: string
  pages: {
    id: string
    order: number
  }[]
}

interface ReorderPagesResponse {
  message: string
}

export async function reorderPages({
  funnelId,
  pages,
}: ReorderPagesRequest): Promise<ReorderPagesResponse> {
  const result = await api
    .put(`funnels/${funnelId}/pages/reorder`, {
      json: pages,
    })
    .json<ReorderPagesResponse>()

  return result
}