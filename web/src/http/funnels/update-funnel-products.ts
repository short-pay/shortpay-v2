import { api } from '../api-client'

interface UpdateFunnelProductsParams {
  funnelId: string
  products: string // Deve ser uma string JSON de um array de objetos contendo productId e recurring
}

export async function updateFunnelProducts({
  funnelId,
  products,

}: UpdateFunnelProductsParams): Promise<{ id: string; liveProducts: string }> {
  const response = await api
    .put(`funnels/${funnelId}/update-products`, {
      json: { products },
    })
    .json<{ id: string; liveProducts: string }>()

  return response
}