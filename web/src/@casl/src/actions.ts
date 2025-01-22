import { z } from 'zod'

export const actions = z.enum([
  'create',
  'read',
  'update',
  'delete',
  'manage',
  'invite',
  'transfer_ownership',
])

export type Action = z.infer<typeof actions>
