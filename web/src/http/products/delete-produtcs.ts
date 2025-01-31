import { api } from '../api-client'

interface DeleteProductsRequest {
  productId: string
  slug: string
}

type DeleteProductsResponse = void

export async function deleteProducts({
  productId,
  slug,
}: DeleteProductsRequest): Promise<DeleteProductsResponse> {
  await api.delete(`organizations/${slug}/products/${productId}`)
}
