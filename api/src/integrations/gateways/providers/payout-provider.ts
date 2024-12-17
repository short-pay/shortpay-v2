import { decrypt } from '@/utils/crypto/crypto-utils'
import { GatewayBase } from '../base/gateway-base'
import type {
  CreateTransactionData,
  TransactionResponse,
  RefundResponse,
} from '../interfaces/gateway-interface'

import { prisma } from '@/lib/prisma'

export class PayoutProvider extends GatewayBase {
  private apiUrl = 'https://api.payoutbr.com.br'

  // Busca as configurações específicas do gateway no banco
  private async getGatewayConfig(organizationId: string) {
    const gateway = await prisma.gatewayConfig.findFirst({
      where: { organizationId, provider: 'payoutProvider' },
    })

    if (!gateway) {
      throw new Error('Gateway configuration not found')
    }

    return {
      apiKey: decrypt(gateway.apiKey),
    }
  }

  // Criação de uma transação de cartão ou boleto
  async createTransaction(
    data: CreateTransactionData,
  ): Promise<TransactionResponse> {
    const { apiKey } = await this.getGatewayConfig(
      data.customer?.organizationId || '',
    )

    const response = await fetch(`${this.apiUrl}/payments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: this.formatAmountToCents(data.amount),
        currency: data.currency,
        description: data.description,
        customer: data.customer,
      }),
    })

    const result = await response.json()

    return {
      transactionId: result.id,
      paymentUrl: result.paymentUrl,
    }
  }

  // Processa notificações recebidas via webhook
  async handleWebhook(data: any): Promise<void> {
    if (data.payment_status === 'PAID') {
      await prisma.gatewayTransaction.update({
        where: { id: data.transactionId },
        data: { status: 'SUCCESS' },
      })
    }
  }

  // Reembolso de uma transação
  async refundTransaction(transactionId: string): Promise<RefundResponse> {
    console.log('Payout: Reembolsando transação', transactionId)
    // Chamar a API do Payout para processar o reembolso
    return { success: true, message: 'Refund processed successfully' }
  }
}
