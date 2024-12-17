import { GatewayBase } from '../base/gateway-base'
import type {
  CreateTransactionData,
  TransactionResponse,
  RefundResponse,
} from '../interfaces/gateway-interface'
import { BoletoMethod } from '../methods/boleto-method'
import { CreditCardMethod } from '../methods/credit-card-method'
import { PixMethod } from '../methods/pix-method'

export class OrbitaPayV2Provider extends GatewayBase {
  private pixMethod = new PixMethod()
  private creditCardMethod = new CreditCardMethod()
  private boletoMethod = new BoletoMethod()

  async createTransaction(
    data: CreateTransactionData,
  ): Promise<TransactionResponse> {
    switch (data.method) {
      case 'pix':
        return this.pixMethod.process({
          amount: data.amount,
          currency: data.currency,
          description: data.description,
          customer: data.customer,
        })

      case 'credit_card':
        if (!data.cardToken) {
          throw new Error(
            'Card token is required for credit_card transactions.',
          )
        }
        return this.creditCardMethod.process({
          amount: data.amount,
          currency: data.currency,
          description: data.description,
          customer: data.customer,
          cardToken: data.cardToken,
          installments: data.installments || 1,
        })

      case 'boleto':
        return this.boletoMethod.process({
          amount: data.amount,
          currency: data.currency,
          description: data.description,
          customer: data.customer,
        })

      default:
        throw new Error(`Unsupported payment method: ${data.method}`)
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async handleWebhook(data: any): Promise<void> {
    console.log('Webhook recebido do OrbitaPayV2:', data)
    // Implemente aqui a lógica de processamento de notificações
    // Exemplo: atualizar o status da transação no banco
  }

  async refundTransaction(transactionId: string): Promise<RefundResponse> {
    console.log(`Reembolso solicitado para a transação: ${transactionId}`)
    // Simula um reembolso bem-sucedido
    return {
      success: true,
      message: `Reembolso processado com sucesso para ${transactionId}`,
    }
  }
}
