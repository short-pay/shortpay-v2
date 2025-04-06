import type {
  GatewayAdapter,
  TransactionPayload,
  TransactionResult,
} from '../../types/types'

export class ShieldAdapter implements GatewayAdapter {
  constructor(private config: { key: string; secret: string }) {}

  async createTransaction(
    data: TransactionPayload,
  ): Promise<TransactionResult> {
    if (data.method === 'CREDIT_CARD') {
      return {
        success: true,
        transactionId: 'shield-card-789',
        status: 'pending',
        extraData: {
          cardAuthorizationCode: 'AUTH123456',
        },
      }
    }

    throw new Error('Método não suportado em Shield')
  }
}
