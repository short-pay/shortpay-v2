import { z } from 'zod'

export const Role = z.enum(['OWNER', 'ADMIN', 'MEMBER', 'CUSTOMER', 'BILLING'])
export const SubscriptionType = z.enum(['FREE', 'BASIC', 'PRO'])
export const AccountProvider = z.enum(['GITHUB', 'GOOGLE'])
export const TokenType = z.enum(['PASSWORD_RECOVER'])
export const TransactionStatus = z.enum(['PENDING', 'SUCCESS', 'FAILED'])
export const PaymentMethod = z.enum(['PIX', 'CREDIT_CARD', 'BOLETO'])

export type Role = z.infer<typeof Role>
export type SubscriptionType = z.infer<typeof SubscriptionType>
export type AccountProvider = z.infer<typeof AccountProvider>
export type TokenType = z.infer<typeof TokenType>
export type TransactionStatus = z.infer<typeof TransactionStatus>
export type PaymentMethod = z.infer<typeof PaymentMethod>
