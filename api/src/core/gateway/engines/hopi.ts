import type {
  GatewayAdapter,
  TransactionPayload,
  TransactionResult,
} from '../../types/types'

export class HopiAdapter implements GatewayAdapter {
  constructor(private config: { token: string; endpoint: string }) {}

  async createTransaction(
    data: TransactionPayload,
  ): Promise<TransactionResult> {
    // Simulação simples — substitua com chamada real
    if (data.method === 'PIX') {
      return {
        success: true,
        transactionId: 'hopi-pix-123',
        status: 'pending',
        extraData: {
          pixQrCode: 'hopi-qr-base64',
        },
      }
    }

    if (data.method === 'BOLETO') {
      return {
        success: true,
        transactionId: 'hopi-boleto-456',
        status: 'pending',
        extraData: {
          boletoUrl: 'https://hopi.com/boleto/456',
        },
      }
    }

    throw new Error('Método não suportado em Hopi')
  }
}
