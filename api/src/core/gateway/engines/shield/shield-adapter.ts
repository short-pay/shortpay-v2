import type { GatewayAdapter, TransactionPayload, TransactionResult } from '@/core/types/types'
import { ShieldBaseAdapter } from './base-adapter'
import { MasterAdapter } from './master-adapter'

/**
 * Adapter para o gateway Shield
 * 
 * Este adapter implementa a interface GatewayAdapter para processar transações
 * através do gateway Shield e suas white-labels.
 */
export class ShieldAdapter implements GatewayAdapter {
  private delegate: GatewayAdapter

  constructor(
    config: {
      apiKey: string;
      secretKey: string;
      endpoint: string;
      domain?: string;
      metadata?: Record<string, any>;
    }
  ) {
    const domain = config.domain?.toLowerCase()

    if (domain?.includes('master')) {
      // Usar o adapter específico para MASTER
      this.delegate = new MasterAdapter(config)
    } else {
      // Usar o adapter base da Shield para outros casos
      this.delegate = new ShieldBaseAdapter(config)
    }
  }

  /**
   * Cria uma transação no gateway Shield ou suas white-labels
   * 
   * @param data Dados da transação
   * @returns Resultado da transação
   */
  async createTransaction(
    data: TransactionPayload,
  ): Promise<TransactionResult> {
    return this.delegate.createTransaction(data)
  }
}
