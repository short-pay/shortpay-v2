import { z } from 'zod'
import { checkoutSchema } from '../models/index'

export const checkoutSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('read'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Checkout'), checkoutSchema]),
])

export type CheckoutSubject = z.infer<typeof checkoutSubject>
