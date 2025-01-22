import { z } from 'zod'

export const checkoutSchema = z.object({
  __typename: z.literal('Checkout').default('Checkout'),
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
})

export type Checkout = z.infer<typeof checkoutSchema>
