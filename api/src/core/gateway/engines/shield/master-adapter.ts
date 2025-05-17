import type { GatewayAdapter, TransactionPayload, TransactionResult } from '@/core/types/types'
import { ShieldBaseAdapter } from './base-adapter'

/**
 * Adapter para o gateway MASTER (white-label da Shield)
 * 
 * Este adapter implementa a interface GatewayAdapter para processar transações
 * através do gateway MASTER, que é uma white-label da Shield.
 */
export class MasterAdapter extends ShieldBaseAdapter {
  constructor(
    config: {
      apiKey: string;
      secretKey: string;
      endpoint: string;
    }
  ) {
    super(config)
  }

  /**
   * Cria uma transação no gateway MASTER
   * 
   * @param data Dados da transação
   * @returns Resultado da transação
   */
  async createTransaction(
    data: TransactionPayload,
  ): Promise<TransactionResult> {
    try {
      // Adiciona informações específicas do MASTER ao metadata
      const enhancedData = {
        ...data,
        metadata: {
          ...data.metadata,
          gateway_provider: 'MASTER'
        }
      }

      // Utiliza o método da classe base para processar a transação
      return await super.createTransaction(enhancedData)
    } catch (error: unknown) {
      console.error(
        'Erro ao criar transação com MASTER:',
        error instanceof Error ? error.message : 'Erro desconhecido',
      )

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
}
