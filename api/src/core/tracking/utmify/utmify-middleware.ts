import { TrackingMiddleware } from './tracking-middleware';
import { UTMifyService } from './utmify-service';
import type { GatewayAdapter, TransactionPayload, TransactionResult } from '@/core/types/types';

/**
 * Implementação específica do middleware de tracking para UTMify
 * 
 * Esta classe estende o TrackingMiddleware para implementar
 * a integração específica com o serviço UTMify.
 */
export class UTMifyMiddleware extends TrackingMiddleware {
  private utmifyService: UTMifyService;

  constructor(
    gateway: GatewayAdapter,
    utmifyConfig: {
      apiToken: string;
      endpoint?: string;
    }
  ) {
    super(gateway);
    this.utmifyService = new UTMifyService(utmifyConfig);
  }

  /**
   * Implementação específica para tracking com UTMify
   */
  protected async trackTransaction(
    data: TransactionPayload,
    result: TransactionResult
  ): Promise<void> {
    // Extrai parâmetros de tracking do metadata, se existirem
    const trackingParams = this.extractTrackingParams(data);

    // Envia dados para o UTMify
    await this.utmifyService.trackTransaction(
      {
        id: result.transactionId,
        amount: data.amount,
        currency: data.currency || 'BRL',
        status: result.status,
        method: data.method,
        customer: data.customer,
        product: data.product,
      },
      trackingParams
    );
  }

  /**
   * Extrai parâmetros de tracking do payload da transação
   */
  private extractTrackingParams(data: TransactionPayload): Record<string, string> {
    const trackingParams: Record<string, string> = {};
    
    // Verifica se há metadata com parâmetros UTM
    if (data.metadata) {
      const utmFields = [
        'utm_source', 
        'utm_medium', 
        'utm_campaign', 
        'utm_content', 
        'utm_term'
      ];
      
      // Extrai apenas os campos UTM válidos
      for (const field of utmFields) {
        if (data.metadata[field]) {
          trackingParams[field] = String(data.metadata[field]);
        }
      }
      
      // Adiciona outros parâmetros de tracking que possam existir
      if (data.metadata.tracking) {
        Object.entries(data.metadata.tracking).forEach(([key, value]) => {
          if (typeof value === 'string') {
            trackingParams[key] = value;
          }
        });
      }
    }
    
    return trackingParams;
  }
}
