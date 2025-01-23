import { api } from '../api-client'

interface GetProductsParams {
  org: string
}

export interface GetResponseProduct {
products:{
  id: string
  name: string
  description?: string
  price: number
  currency: string
  imageUrls: string[]
  createdAt: string
  updatedAt: string
}[]
}

export async function getProducts({
  org,
}: GetProductsParams): Promise<GetResponseProduct> {
 
    const result = await api
      .get(`/products/${org}`)
      .json<GetResponseProduct>()

    return result

  }