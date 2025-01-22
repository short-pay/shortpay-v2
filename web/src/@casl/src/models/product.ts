import { z } from 'zod'

export const productSchema = z.object({
  __typename: z.literal('Product').default('Product'),
  id: z.string(),
  name: z.string(),
  price: z.number(),
  organizationId: z.string(),
})

export type Product = z.infer<typeof productSchema>
