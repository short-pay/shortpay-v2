import { z } from 'zod'

export const gatewayTransactionSchema = z.object({
  __typename: z.literal('GatewayTransaction').default('GatewayTransaction'),
  id: z.string().uuid(),
  amount: z.number(),
  status: z.string().default('PENDING'),
  method: z.enum(['PIX', 'CREDIT_CARD', 'BOLETO']),
})

export type GatewayTransaction = z.infer<typeof gatewayTransactionSchema>
