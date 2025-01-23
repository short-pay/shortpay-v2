import type { Checkout } from '@/@types/checkout'
import { api } from '../api-client'
import type { Notification } from '@/@types/notifications'

interface GetFunnelResponse {
  funnel: {
    liveProducts: string
    id: string
    name: string
    description: string | null
    type: 'GENERIC' | 'CHECKOUT' | 'LANDING_PAGE' | 'THANK_YOU' // Adicionado
    subDomainName: string | null
    organizationId: string
    createdAt: string
    updatedAt: string
    published?: boolean
    checkouts: Checkout[] // Adicionado
    notifications: Notification[] // Adicionado
    pages: {
      id: string
      name: string
      path: string
      type: 'GENERIC' | 'CHECKOUT' | 'LANDING_PAGE' | 'THANK_YOU'
      content: Record<string, any>
      pathName?: string
      order?: number
      published: boolean
      createdAt: string
      updatedAt: string
    }[]
  }
}

export async function getFunnel(
  funnelId: string,
  published?: boolean,
): Promise<GetFunnelResponse> {
  const searchParams: Record<string, string> = {}

  if (typeof published !== 'undefined') {
    searchParams.published = String(published)
  }

  const result = await api
    .get(`funnels/${funnelId}/details`, {
      searchParams,
    })
    .json<GetFunnelResponse>()

  return result
}
