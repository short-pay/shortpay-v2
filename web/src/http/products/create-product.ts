import { revalidateTag } from 'next/cache'

import { api } from '../api-client'

interface CreateProductRequest {
  name: string
  description: string
  price: number
  organizationSlug: string
}

type CreateProductResponse = void

export async function createProduct({
  name,
  description,
  price,
  organizationSlug,
}: CreateProductRequest): Promise<CreateProductResponse> {
  revalidateTag('products')

  await api.post(`${organizationSlug}/products`, {
    json: {
      name,
      description,
      price,
    },
  })
}
