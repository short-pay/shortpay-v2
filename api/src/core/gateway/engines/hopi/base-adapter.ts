import type {
  GatewayAdapter,
  TransactionPayload,
  TransactionResult,
} from '@/core/types/types'
import axios from 'axios'

import type { HopiTransactionResponse } from './@types/types'

export abstract class HopiBaseAdapter implements GatewayAdapter {
  constructor(protected config: { token: string; endpoint: string }) {}

  async createTransaction(
    data: TransactionPayload,
  ): Promise<TransactionResult> {
    const url = `${this.config.endpoint}/transactions`
    const authHeader = `Basic ${Buffer.from(`${this.config.token}:`).toString('base64')}`

    const payload = {
      amount: data.amount,
      currency: data.currency || 'BRL',
      payment_method: data.method.toLowerCase(),
      customer: {
        name: data.customer.name,
        document: data.customer.document,
        email: data.customer.email,
        phone: data.customer.phone,
      },
      ...data.paymentData,
    }

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      })

      return this.parseTransactionResponse(
        response.data as HopiTransactionResponse,
      )
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          'Erro ao criar transação com white-label HOPI:',
          (error as any).response?.data || error.message,
        )
      } else {
        console.error(
          'Erro desconhecido ao criar transação com white-label HOPI',
        )
      }
      return {
        success: false,
        transactionId: '',
        status: 'failed',
      }
    }
  }

  protected abstract parseTransactionResponse(
    data: HopiTransactionResponse,
  ): TransactionResult
}
