import { api } from '../api-client'

interface GetIntegrationsParams {
  slug: string
  search?: string
  status?: 'connected' | 'disconnected'
}

interface GetIntegrationsResponse {
  gateways: {
    id: string
    name: string
    provider: string
    description: string
    icon: string
    isGlobal: boolean
    domain: string
    isConnected: boolean
  }[]
}

export async function getIntegrationsToGateways({
  slug,
  search,
  status,
}: GetIntegrationsParams): Promise<GetIntegrationsResponse> {
  const queryParams = new URLSearchParams()

  if (search) {
    queryParams.append('search', search)
  }

  if (status) {
    queryParams.append('status', status)
  }

  const result = await api
    // .get(`gateways/${slug}?${queryParams.toString()}`, {
    .get(`gateways/${slug}`, {
      next: {
        tags: ['gateways'],
      },
    })
    .json<GetIntegrationsResponse>()

  console.log(result, 'Resultado do Integrations')

  return result
}
