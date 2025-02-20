import type { PaymentConfig, PaymentProvider } from '../interfaces/provider.interface'
import type { TransactionPayload } from '../../interfaces/transaction.interface'

export class StripeProvider implements PaymentProvider {
  readonly providerName = 'stripeProvider'
  private secretKey: string
  private apiKey: string

  constructor(config: PaymentConfig) {
    this.secretKey = config.secret_key
    this.apiKey = config.api_key
  }

  async processTransaction(payload: TransactionPayload): Promise<any> {
    console.log(`Mocking a transaction for Stripe with payload:`, payload)
    console.log(this.secretKey)
    console.log(this.apiKey)

    return {
      status: 'success',
      transactionId: 'txn_123456789',
      amount: payload.amount
    }
  }
}
