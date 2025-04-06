import type {
  GatewayAdapter,
  TransactionPayload,
  TransactionResult,
} from '../../types/types'

export class PaymakerAdapter implements GatewayAdapter {
  constructor(private config: { apiKey: string; secretKey: string }) {}

  async createTransaction(
    data: TransactionPayload,
  ): Promise<TransactionResult> {
    // Aqui você chama a API real do Paymaker com this.config
    if (data.method === 'PIX') {
      return {
        success: true,
        transactionId: 'abc123',
        status: 'pending',
        extraData: {
          pixQrCode: 'qrcode_base64',
        },
      }
    }

    throw new Error('Método de pagamento não suportado pela Paymaker')
  }
}
