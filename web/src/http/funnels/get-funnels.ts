import type { Funnel } from '@/@types/funnels'
import { api } from '../api-client'

// interface Funnel {
//   id: string
//   name: string
//   description: string | null
//   published: boolean
// }

export interface GetFunnelsResponse {
  funnels: Funnel[]
  totalPages: number
  totalItems: number
}

interface GetFunnelsParams {
  slug: string
  page: number
  size: number
  searchTerm?: string
}

export async function getFunnels({
  slug,
  page,
  size,
  searchTerm = '',
}: GetFunnelsParams): Promise<GetFunnelsResponse> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(searchTerm ? { searchTerm } : {}),
  })

  const result = await api
    .get(`funnels/${slug}`, {
      next: { tags: ['funnels'] },
      searchParams: queryParams,
    })
    .json<GetFunnelsResponse>()

  return result
}
