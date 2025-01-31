import { api } from '../api-client'

interface CreateFunnelPageRequest {
  funnelId: string
  name: string
  pathName?: string
  order: number
  type: 'GENERIC' | 'CHECKOUT' | 'LANDING_PAGE' | 'THANK_YOU'
  content?: any
}

interface CreateFunnelPageResponse {
  id: string
  name: string
  type: string
  order: number
}

export async function createFunnelPage({
  funnelId,
  name,
  pathName,
  order,
  type,
  content = {},
}: CreateFunnelPageRequest): Promise<CreateFunnelPageResponse> {
  const response = await api
    .post(`funnels/${funnelId}/pages`, {
      json: {
        name,
        pathName,
        order,
        type,
        content,
      },
    })
    .json<CreateFunnelPageResponse>()

  console.log(response, 'response fetch create page')

  return response
}
