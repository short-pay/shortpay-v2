import { z } from "zod";

export const roleSchema = z.enum([
  'OWNER',
  'ADMIN',
  'MEMBER',
  'CUSTOMER',
  'BILLING',
])

export type roleTyped = z.infer<typeof roleSchema>