import type { PaymentMethod } from '@prisma/client'

type PixPaymentData = {
  expires_in?: number
}

type BoletoPaymentData = {
  due_date?: string
}

type CreditCardPaymentData = {
  card_number: string
  holder_name: string
  exp_month: string
  exp_year: string
  cvv: string
}

type PaymentDataByMethod = {
  PIX: PixPaymentData
  BOLETO: BoletoPaymentData
  CREDIT_CARD: CreditCardPaymentData
}

export interface TransactionPayload<M extends PaymentMethod = PaymentMethod> {
  method: M
  amount: number
  currency?: string
  customer: {
    name: string
    document: string
    email?: string
    phone?: string
  }
  paymentData: PaymentDataByMethod[M]
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
