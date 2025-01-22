import { z } from 'zod'

import { productSchema } from '../models/index'

export const productSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('read'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Product'), productSchema]),
])

export type ProductSubject = z.infer<typeof productSubject>
