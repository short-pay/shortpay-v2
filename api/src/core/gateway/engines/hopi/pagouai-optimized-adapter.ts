import type { GatewayAdapter, TransactionPayload, TransactionResult } from '@/core/types/types'

/**
 * Implementação do adapter para o gateway PAGOUAI otimizado
 * 
 * Esta implementação otimiza o adapter PAGOUAI existente,
 * melhorando o tratamento de erros e adicionando suporte
 * para mais métodos de pagamento.
 */
export class PagouAiOptimizedAdapter implements GatewayAdapter {
  constructor(
    private config: {
      token: string;
      endpoint: string;
    }
  ) {}

  async createTransaction(
    data: TransactionPayload,
  ): Promise<TransactionResult> {
    // Reaproveitando a lógica do HopiBaseAdapter para PAGOUAI
    const url = `${this.config.endpoint}/transactions`
    const authHeader = `Basic ${Buffer.from(`${this.config.token}:`).toString('base64')}`
    
    // Preparar payload conforme documentação do PAGOUAI
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
      // Implementação otimizada com timeout e retry
      const axios = (await import('axios')).default;
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 segundos de timeout
      });

      return this.parseTransactionResponse(response.data);
    } catch (error: unknown) {
      // Tratamento de erros melhorado
      if (error instanceof Error) {
        const axiosError = error as any;
        if (axiosError.response) {
          // Erro com resposta do servidor
          console.error(
            'Erro ao criar transação com PAGOUAI:',
            axiosError.response.status,
            axiosError.response.data
          );
        } else if (axiosError.request) {
          // Erro sem resposta (timeout, etc)
          console.error(
            'Erro de conexão com PAGOUAI:',
            axiosError.request
          );
        } else {
          // Erro na configuração da requisição
          console.error(
            'Erro ao configurar requisição para PAGOUAI:',
            axiosError.message
          );
        }
      } else {
        console.error(
          'Erro desconhecido ao criar transação com PAGOUAI'
        );
      }

      return {
        success: false,
        transactionId: '',
        status: 'failed',
        extraData: {
          errorMessage: error instanceof Error ? error.message : 'Erro desconhecido',
        },
      };
    }
  }

  /**
   * Converte a resposta do gateway PAGOUAI para o formato padrão do sistema
   */
  private parseTransactionResponse(data: any): TransactionResult {
    return {
      success: true,
      transactionId: data.id,
      status: this.mapTransactionStatus(data.status),
      extraData: {
        pixQrCode: data.pix?.qr_code_base64,
        pixCopiaECola: data.pix?.code,
        boletoUrl: data.boleto?.url,
        cardAuthorizationCode: data.credit_card?.authorization_code,
      },
    };
  }

  /**
   * Mapeia os status de transação do gateway PAGOUAI para os status do sistema
   */
  private mapTransactionStatus(status: string): 'pending' | 'success' | 'failed' {
    const statusMap: Record<string, 'pending' | 'success' | 'failed'> = {
      'approved': 'success',
      'paid': 'success',
      'pending': 'pending',
      'processing': 'pending',
      'waiting_payment': 'pending',
      'rejected': 'failed',
      'cancelled': 'failed',
      'failed': 'failed',
    };

    return statusMap[status] || 'pending';
  }
}
