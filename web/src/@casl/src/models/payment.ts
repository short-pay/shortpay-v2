import { z } from 'zod'

export const paymentSchema = z.object({
  __typename: z.literal('Payment').default('Payment'),
  id: z.string().uuid(),
  amount: z.number(),
  currency: z.string(),
  method: z.enum(['PIX', 'CREDIT_CARD', 'BOLETO']),
  status: z.enum(['PENDING', 'SUCCESS', 'FAILED']).default('PENDING'),
  organizationId: z.string(),
})

export type Payment = z.infer<typeof paymentSchema>
