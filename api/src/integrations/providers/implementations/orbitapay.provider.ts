// src/payments/providers/implementations/orbitapay.provider.ts
import type { PaymentProvider } from '../interfaces/provider.interface'
import type { TransactionPayload } from '../../interfaces/transaction.interface'
import axios from 'axios'

export class OrbitaPayProvider implements PaymentProvider {
  readonly providerName = 'orbitaPayV2Provider'
  private secretKey: string
  private apiKey: string

  constructor(secretKey: string, apiKey: string) {
    this.secretKey = secretKey
    this.apiKey = apiKey
  }

  async processTransaction(payload: TransactionPayload): Promise<any> {
    const authHeader = `Basic ${Buffer.from(`${this.secretKey}:${this.apiKey}`).toString('base64')}`
    const endpoint = 'https://api.dashboard.orbitapay.com.br/v1/transactions'

    const response = await axios.post(endpoint, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    })

    return response.data
  }
}
