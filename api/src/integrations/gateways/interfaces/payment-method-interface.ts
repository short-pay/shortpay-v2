export interface PaymentMethodInterface {
  process(data: PaymentData): Promise<PaymentResponse>
}

export interface PaymentData {
  amount: number
  currency: string
  description: string
  customer: {
    email: string
    name: string
  }
}

export interface PaymentResponse {
  success: boolean
  transactionId: string
  message?: string
}
