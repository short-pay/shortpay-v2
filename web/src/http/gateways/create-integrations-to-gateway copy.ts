import { api } from '../api-client'

interface CreateIntegrationRequest {
  slug: string
  provider: string
  description?: string
  apiKey: string
  secretKey: string
  publicKey?: string | null
  webhookSecret?: string | null
  installmentFee?: number
}

interface CreateIntegrationResponse {
  id: string
  provider: string
}

export async function createIntegrationToGateway(
  data: CreateIntegrationRequest,
) {
  const result = await api
    .post(`gateways/${data.slug}`, {
      json: {
        provider: data.provider,
        description: data.description,
        apiKey: data.apiKey,
        secretKey: data.secretKey,
        publicKey: data.publicKey,
        webhookSecret: data.webhookSecret,
        installmentFee: data.installmentFee,
      },
    })
    .json<CreateIntegrationResponse>()

  return result
}
