import { api } from '../api-client'

interface PublishFunnelRequest {
  funnelId: string
  isPublished: boolean
}

interface PublishFunnelResponse {
  message: string
}

export async function publishFunnel({
  funnelId,
  isPublished,
}: PublishFunnelRequest): Promise<PublishFunnelResponse> {
  const result = await api
    .put(`funnels/${funnelId}/publish`, {
      json: {
        isPublished,
      },
    })
    .json<PublishFunnelResponse>()

  return result
}