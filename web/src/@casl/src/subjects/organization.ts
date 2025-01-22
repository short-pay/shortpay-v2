import { z } from 'zod'
import { organizationSchema } from '../models/index'

export const organizationSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('delete'),
    z.literal('get'),
    z.literal('update'),
    z.literal('create'),
    z.literal('transfer_ownership'),
  ]),
  z.union([z.literal('Organization'), organizationSchema]),
])

export type OrganizationSubject = z.infer<typeof organizationSubject>
