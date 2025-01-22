import { z } from 'zod'
import { paymentSchema } from '../models/index'

export const paymentSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('read'),
    z.literal('update'),
    z.literal('delete'),
    // "refund" se quiser uma action extra
  ]),
  z.union([z.literal('Payment'), paymentSchema]),
])

export type PaymentSubject = z.infer<typeof paymentSubject>
