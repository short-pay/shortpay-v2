export interface GatewayInterface {
  createTransaction(data: CreateTransactionData): Promise<TransactionResponse>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  handleWebhook(data: any): Promise<void>
  refundTransaction(transactionId: string): Promise<RefundResponse>
}

export interface CreateTransactionData {
  amount: number
  currency: string
  description: string
  method: 'pix' | 'credit_card' | 'boleto'
  cardToken?: string
  installments?: number
  customer: {
    email: string
    name: string
  }
}

export interface TransactionResponse {
  transactionId: string
  paymentUrl?: string
  qrCode?: string
}

export interface RefundResponse {
  success: boolean
  message?: string
}
