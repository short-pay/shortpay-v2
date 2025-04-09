import { prisma } from '@/lib/prisma'
import type { TransactionPayload } from '../types/types'
import { engineFactory } from './engines/factory'

export async function createTransaction(
  gatewayConfigId: string,
  payload: TransactionPayload,
) {
  const config = await prisma.gatewayConfig.findUnique({
    where: { id: gatewayConfigId },
    include: { Gateway: true },
  })

  if (!config) throw new Error('GatewayConfig não encontrado')

  const engineName = config.Gateway.engine
  const Adapter = engineFactory[engineName]
  if (!Adapter) throw new Error(`Engine '${engineName}' não suportada`)

  const adapter = new Adapter({
    apiKey: config.apiKey,
    secretKey: config.secretKey,
    publicKey: config.publicKey,
    webhookSecret: config.webhookSecret,
  })

  const result = await adapter.createTransaction(payload)

  // Salvar no banco
  await prisma.gatewayTransaction.create({
    data: {
      amount: payload.amount,
      currency: payload.currency || 'BRL',
      method: payload.method,
      status: result.success ? 'SUCCESS' : 'FAILED',
      gatewayConfigId: config.id,
      organizationId: config.organizationId,
      externalId: result.transactionId,
      metadata: result.extraData || {},
    },
  })

  return result
}
