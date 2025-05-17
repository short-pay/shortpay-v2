import type { GatewayAdapter, TransactionPayload, TransactionResult } from '@/core/types/types'

/**
 * Classe base para adapters Shield
 * 
 * Esta classe implementa a funcionalidade básica do gateway Shield
 * e serve como base para white-labels como MASTER.
 */
export class ShieldBaseAdapter implements GatewayAdapter {
  constructor(
    protected config: {
      apiKey: string;
      secretKey: string;
      endpoint: string;
      metadata?: Record<string, any>;
    }
  ) {}

  /**
   * Cria uma transação no gateway Shield
   * 
   * @param data Dados da transação
   * @returns Resultado da transação
   */
  async createTransaction(
    data: TransactionPayload,
  ): Promise<TransactionResult> {
    const url = `${this.config.endpoint}/api/transactions`
    
    // Preparar payload conforme documentação do gateway Shield
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
      // Implementação da chamada à API do Shield
      const axios = (await import('axios')).default;
      const response = await axios.post(url, payload, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Secret-Key': this.config.secretKey,
          'Content-Type': 'application/json',
        },
        timeout: 15000, // 15 segundos de timeout
      });

      return this.parseTransactionResponse(response.data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          'Erro ao criar transação com Shield:',
          (error as any).response?.data || error.message,
        )
      } else {
        console.error(
          'Erro desconhecido ao criar transação com Shield',
        )
      }

      return {
        success: false,
        transactionId: '',
        status: 'failed',
        extraData: {
          errorMessage: error instanceof Error ? error.message : 'Erro desconhecido',
        },
      }
    }
  }

  /**
   * Mapeia os métodos de pagamento do sistema para os métodos aceitos pelo gateway Shield
   */
  protected mapPaymentMethod(method: string): string {
    const methodMap: Record<string, string> = {
      'PIX': 'pix',
      'CREDIT_CARD': 'credit',
      'BOLETO': 'boleto',
    }

    return methodMap[method] || 'pix'
  }

  /**
   * Converte a resposta do gateway Shield para o formato padrão do sistema
   */
  protected parseTransactionResponse(data: any): TransactionResult {
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
   * Mapeia os status de transação do gateway Shield para os status do sistema
   */
  protected mapTransactionStatus(status: string): 'pending' | 'paid' | 'failed' {
    const statusMap: Record<string, 'pending' | 'paid' | 'failed'> = {
      'approved': 'paid',
      'pending': 'pending',
      'processing': 'pending',
      'rejected': 'failed',
      'cancelled': 'failed',
    }

    return statusMap[status] || 'failed'
  }
}
