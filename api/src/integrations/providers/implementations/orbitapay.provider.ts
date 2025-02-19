// src/payments/providers/implementations/orbitapay.provider.ts
import type { PaymentConfig, PaymentProvider } from '../interfaces/provider.interface'
import type { TransactionPayload } from '../../interfaces/transaction.interface'
import axios from 'axios'
import { env } from '@/env'

export class OrbitaPayProvider implements PaymentProvider {
  readonly providerName = 'orbitaPayV2Provider'
  private secretKey: string
  private apiKey: string

  constructor(config: PaymentConfig) {
    this.secretKey = config.secret_key
    this.apiKey = config.api_key
  }

  async processTransaction(payload: TransactionPayload): Promise<any> {
    const authHeader = `Basic ${Buffer.from(`${this.secretKey}:${this.apiKey}`).toString('base64')}`
    const endpoint = env.ORBITA_PAY_ENDPOINT

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
