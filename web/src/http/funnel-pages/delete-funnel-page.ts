import { api } from '../api-client'

interface DeleteFunnelPageRequest {
  pageId: string
}

interface DeleteFunnelPageResponse {
  message: string
}

export async function deleteFunnelPage({
  pageId,
}: DeleteFunnelPageRequest): Promise<DeleteFunnelPageResponse> {
  const result = await api
    .delete(`funnelsPage/${pageId}`)
    .json<DeleteFunnelPageResponse>()

  return result
}
