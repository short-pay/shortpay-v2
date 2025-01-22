import { api } from '../api-client'

interface UpdateProductRequest {
  id: string
  name: string
  description: string
  price: number
  organizationSlug: string
}

type UpdateProductResponse = void

export async function updateProduct({
  id,
  name,
  description,
  price,
  organizationSlug,
}: UpdateProductRequest): Promise<UpdateProductResponse> {
  await api.put(`organizations/${organizationSlug}/products/${id}`, {
    json: {
      name,
      description,
      price,
    },
  })
}
