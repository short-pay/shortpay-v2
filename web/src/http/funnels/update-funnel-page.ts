import { api } from '../api-client'

interface UpdateFunnelPageRequest {
  id: string
  funnelId: string
  name?: string
  pathName?: string
  order?: number
  type?: 'GENERIC' | 'CHECKOUT' | 'LANDING_PAGE' | 'THANK_YOU'
  content?: any
}

interface UpdateFunnelPageResponse {
  id: string
  name: string
  type: string
  order: number
}

export async function updateFunnelPage({
  id,
  funnelId,
  name,
  pathName,
  order,
  type,
  content = {},
}: UpdateFunnelPageRequest): Promise<UpdateFunnelPageResponse> {
  const response = await api
    .put(`funnels/${funnelId}/pages/${id}`, {
      json: {
        name,
        pathName,
        order,
        type,
        content,
      },
    })
    .json<UpdateFunnelPageResponse>()

  return response
}
