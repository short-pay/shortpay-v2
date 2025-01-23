import { api } from '../api-client'

interface UpdateFunnelRequest {
  id: string
  name?: string
  description?: string
  pages?: {
    id?: string
    name: string
    type: 'GENERIC' | 'CHECKOUT' | 'LANDING_PAGE' | 'THANK_YOU'
    content: any
  }[]
}

interface UpdateFunnelResponse {
  id: string
  name: string
  description?: string
}

export async function updateFunnel({
  id,
  name,
  description,
  pages = [],
}: UpdateFunnelRequest): Promise<UpdateFunnelResponse> {
  const result = await api
    .put(`funnels/${id}`, {
      json: {
        name,
        description,
        pages,
      },
    })
    .json<UpdateFunnelResponse>()

  return result
}