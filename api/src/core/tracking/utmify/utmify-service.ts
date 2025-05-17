import type { GatewayAdapter, TransactionPayload, TransactionResult } from '@/core/types/types'
import axios from 'axios'

/**
 * Serviço de integração com UTMify
 * 
 * Responsável por enviar dados de tracking para a plataforma UTMify
 * após a criação bem-sucedida de uma transação.
 */
export class UTMifyService {
  constructor(
    private config: {
      apiToken: string;
      endpoint?: string;
    }
  ) {}

  /**
   * Envia dados de uma transação para o UTMify
   * 
   * @param transaction Dados da transação
   * @param trackingParams Parâmetros de tracking (UTM)
   * @returns Resultado do envio
   */
  async trackTransaction(
    transaction: {
      id: string;
      amount: number;
      currency: string;
      status: string;
      method: string;
      customer?: {
        name?: string;
        email?: string;
        document?: string;
        phone?: string;
      };
      product?: {
        id?: string;
        name?: string;
        price?: number;
      };
    },
    trackingParams: {
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      utm_content?: string;
      utm_term?: string;
      [key: string]: string | undefined;
    }
  ): Promise<{ success: boolean; message?: string }> {
    // Se não houver token configurado, retorna sem erro mas não envia
    if (!this.config.apiToken) {
      console.log('UTMify: Nenhum token configurado, ignorando tracking');
      return { success: false, message: 'No API token configured' };
    }

    const endpoint = this.config.endpoint || 'https://api.utmify.com.br/api-credentials/orders';
    
    try {
      const payload = {
        body: {
          id: transaction.id,
          status: this.mapTransactionStatus(transaction.status),
          payment_method: transaction.method,
          currency: transaction.currency,
          value: transaction.amount,
        },
        customer: transaction.customer ? {
          name: transaction.customer.name,
          email: transaction.customer.email,
          document: transaction.customer.document,
          phone: transaction.customer.phone,
        } : undefined,
        product: transaction.product ? {
          id: transaction.product.id,
          name: transaction.product.name,
          price: transaction.product.price,
        } : undefined,
        trackingParameters: trackingParams
      };

      const response = await axios.post(endpoint, payload, {
        headers: {
          'x-api-token': this.config.apiToken,
          'Content-Type': 'application/json',
        },
      });

      console.log('UTMify: Tracking enviado com sucesso', response.data);
      return { success: true };
    } catch (error) {
      console.error('UTMify: Erro ao enviar tracking', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Mapeia os status de transação do sistema para os status aceitos pelo UTMify
   */
  private mapTransactionStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'pending': 'pending',
      'paid': 'paid',
      'failed': 'failed',
    };

    return statusMap[status] || 'pending';
  }
}
