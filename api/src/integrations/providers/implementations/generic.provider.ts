// src/payments/providers/implementations/generic.provider.ts
import type { PaymentConfig, PaymentProvider } from '../interfaces/provider.interface'
import type { TransactionPayload } from '../../interfaces/transaction.interface'
import axios from 'axios'

export class GenericPaymentProvider implements PaymentProvider {
  readonly providerName: string
  private secretKey: string
  private apiKey: string
  private endpoint: string

  constructor(config: PaymentConfig, providerName: string, endpoint: string) {
    this.providerName = providerName
    this.secretKey = config.secret_key
    this.apiKey = config.api_key
    this.endpoint = endpoint
  }

  async processTransaction(payload: TransactionPayload): Promise<any> {
    const authHeader = `Basic ${Buffer.from(`${this.secretKey}:${this.apiKey}`).toString('base64')}`

    const response = await axios.post(this.endpoint, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    })

    return response.data
  }
}
