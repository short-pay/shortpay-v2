import { api } from '../api-client'

export interface FunnelPage {
  pages: {
    id: string
    name: string
    path: string
    pathName: string
    order: number
    type: 'GENERIC' | 'CHECKOUT' | 'LANDING_PAGE' | 'THANK_YOU'
    content: any
    metadata: any
    published: boolean
  }[]
}

export async function getFunnelPages(funnelId: string): Promise<FunnelPage> {
  const result = await api
    .get(`funnels/${funnelId}/pages`, {
      next: { tags: ['funnelsPages'] },
    })
    .json<FunnelPage>()

  return result
}
