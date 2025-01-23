import { api } from '../api-client'

export interface UpdateFunnelPagesOrderParams {
  funnelId: string
  pages: { id: string; order: number }[]
}

export async function updateFunnelPagesOrder({
  funnelId,
  pages,
}: UpdateFunnelPagesOrderParams): Promise<void> {
  await api.put(`funnels/${funnelId}/pages/order`, {
    json: { pages },
  })
}
