import type { GatewayAdapter, TransactionPayload, TransactionResult } from '@/core/types/types'
import axios from 'axios'

/**
 * Adapter para o gateway MASTER
 * 
 * Implementa a interface GatewayAdapter para processar transações
 * através do gateway MASTER.
 */
export class MasterAdapter implements GatewayAdapter {
  constructor(
    private config: {
      apiKey: string;
      secretKey: string;
      endpoint: string;
    }
  ) {}

  async createTransaction(
    data: TransactionPayload,
  ): Promise<TransactionResult> {
    const url = `${this.config.endpoint}/api/transactions`
    
    // Preparar payload conforme documentação do gateway MASTER
    const payload = {
      amount: data.amount,
      currency: data.currency || 'BRL',
      payment_type: this.mapPaymentMethod(data.method),
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
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Secret-Key': this.config.secretKey,
          'Content-Type': 'application/json',
        },
      })

      return this.parseTransactionResponse(response.data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          'Erro ao criar transação com MASTER:',
          (error as any).response?.data || error.message,
        )
      } else {
        console.error(
          'Erro desconhecido ao criar transação com MASTER',
        )
      }

      return {
        success: false,
        transactionId: '',
        status: 'failed',
      }
    }
  }

  /**
   * Mapeia os métodos de pagamento do sistema para os métodos aceitos pelo gateway MASTER
   */
  private mapPaymentMethod(method: string): string {
    const methodMap: Record<string, string> = {
      'PIX': 'pix',
      'CREDIT_CARD': 'credit',
      'BOLETO': 'boleto',
    }

    return methodMap[method] || 'pix'
  }

  /**
   * Converte a resposta do gateway MASTER para o formato padrão do sistema
   */
  private parseTransactionResponse(data: any): TransactionResult {
    return {
      success: data.status === 'approved' || data.status === 'pending',
      transactionId: data.transaction_id,
      status: this.mapTransactionStatus(data.status),
      extraData: {
        pixQrCode: data.pix?.qr_code,
        pixCopiaECola: data.pix?.code,
        boletoUrl: data.boleto?.url,
        cardAuthorizationCode: data.credit?.authorization_code,
      },
    }
  }

  /**
   * Mapeia os status de transação do gateway MASTER para os status do sistema
   */
  private mapTransactionStatus(status: string): 'pending' | 'success' | 'failed' {
    const statusMap: Record<string, 'pending' | 'success' | 'failed'> = {
      'approved': 'success',
      'pending': 'pending',
      'processing': 'pending',
      'rejected': 'failed',
      'cancelled': 'failed',
    }

    return statusMap[status] || 'failed'
  }
}
