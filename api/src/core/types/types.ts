import type { PaymentMethod } from '@prisma/client'

export interface TransactionPayload {
  method: PaymentMethod
  amount: number
  currency?: string
  customer: {
    name: string
    document: string
    email?: string
  }
  paymentData: any
}

export interface TransactionResult {
  success: boolean
  transactionId: string
  status: 'pending' | 'paid' | 'failed'
  extraData?: Record<string, any>
}

export interface GatewayAdapter {
  createTransaction(data: TransactionPayload): Promise<TransactionResult>
}
