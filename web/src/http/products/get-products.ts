import { api } from '../api-client'

interface GetProductsParams {
  slug: string
  searchTerm?: string
  pageSize?: number
  pageIndex?: number
}

export interface GetResponseProduct {
  products: {
    id: string
    name: string
    description?: string
    price: number
    currency: string
    imageUrls: string[]
    createdAt: string
    updatedAt: string
  }[]
  totalCount: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export async function getProducts({
  pageIndex = 0,
  pageSize = 10,
  searchTerm = '',
  slug,
}: GetProductsParams): Promise<GetResponseProduct> {
  const result = await api
    .get(`products/${slug}`, {
      next: { tags: ['products'] },
      searchParams: {
        pageIndex,
        pageSize,
        searchTerm,
      },
    })
    .json<GetResponseProduct>()

  return result
}
