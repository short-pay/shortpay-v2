import { api } from '../api-client'

interface GetFunnelResponse {
  id: string
  name: string
  description: string | null
  pages: {
    id: string
    name: string
    type: 'GENERIC' | 'CHECKOUT' | 'LANDING_PAGE' | 'THANK_YOU'
    content: any
    published: boolean
  }[]
}

export async function getFunnel(funnelId: string, published?: boolean): Promise<GetFunnelResponse> {
  const searchParams: Record<string, string> = {}

  if (typeof published !== 'undefined') {
    searchParams.published = String(published)
  }

  const result = await api
    .get(`funnels/${funnelId}`, {
      searchParams,
    })
    .json<GetFunnelResponse>()

  return result
}
