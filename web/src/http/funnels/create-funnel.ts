import { api } from '../api-client'

interface CreateFunnelRequest {
  name: string
  description?: string
  org: string
  pages?: {
    name: string
    type: 'GENERIC' | 'CHECKOUT' | 'LANDING_PAGE' | 'THANK_YOU'
    content: any
  }[]
}

interface CreateFunnelResponse {
  id: string
  name: string
  description?: string
}

export async function createFunnel({
  name,
  description,
  org,
  pages = [],
}: CreateFunnelRequest): Promise<CreateFunnelResponse> {
  const result = await api
    .post(`funnels/${org}`, {
      json: {
        name,
        description,
        pages,
      },
    })
    .json<CreateFunnelResponse>()

  return result
}
