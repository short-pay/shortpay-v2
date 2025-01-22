import { z } from 'zod'
import { gatewayTransactionSchema } from '../models/index'

export const gatewayTransactionSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('read'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('GatewayTransaction'), gatewayTransactionSchema]),
])

export type GatewayTransactionSubject = z.infer<
  typeof gatewayTransactionSubject
>
