import { z } from 'zod'

export const roleSchema = z.union([
  z.literal('OWNER'),
  z.literal('ADMIN'),
  z.literal('MEMBER'),
  z.literal('CUSTOMER'),
  z.literal('BILLING'),
])

export type Role = z.infer<typeof roleSchema>
