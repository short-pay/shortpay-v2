import { api } from '../api-client'

export interface FunnelPage {
  id: string
  name: string
  type: 'GENERIC' | 'CHECKOUT' | 'LANDING_PAGE' | 'THANK_YOU'
  content: any
  order: number
  pathName: string
  path: string
}

export async function getFunnelPages(funnelId: string): Promise<FunnelPage[]> {
  const response = await api
    .get(`funnels/${funnelId}/pages`)
    .json<{ pages: FunnelPage[] }>()

  return response.pages
}
