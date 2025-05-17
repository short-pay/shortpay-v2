import type { GatewayAdapter, TransactionPayload, TransactionResult } from '@/core/types/types'

/**
 * Middleware para integração com serviços de tracking
 * 
 * Esta classe abstrata serve como base para implementações específicas
 * de serviços de tracking, como o UTMify.
 */
export abstract class TrackingMiddleware implements GatewayAdapter {
  constructor(
    protected gateway: GatewayAdapter
  ) {}

  async createTransaction(
    data: TransactionPayload,
  ): Promise<TransactionResult> {
    // Executa a transação no gateway original
    const result = await this.gateway.createTransaction(data);

    // Se a transação foi bem-sucedida, envia os dados para o serviço de tracking
    if (result.success) {
      try {
        // Implementação específica de cada serviço de tracking
        await this.trackTransaction(data, result);
      } catch (error) {
        // Apenas loga o erro, não afeta o fluxo principal
        console.error('Erro ao processar tracking:', error);
      }
    }

    // Retorna o resultado original da transação
    return result;
  }

  /**
   * Método abstrato que deve ser implementado por cada serviço de tracking
   */
  protected abstract trackTransaction(
    data: TransactionPayload,
    result: TransactionResult
  ): Promise<void>;
}
