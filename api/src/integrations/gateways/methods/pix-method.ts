import type {
  PaymentMethodInterface,
  PaymentData,
  PaymentResponse,
} from '../interfaces/payment-method-interface'

export class PixMethod implements PaymentMethodInterface {
  async process(data: PaymentData): Promise<PaymentResponse> {
    // Lógica específica para Pix
    console.log('Processando pagamento PIX...')

    // Simula chamada à API
    const transactionId = `pix-${Date.now()}`

    return {
      success: true,
      transactionId,
      message: 'Pagamento PIX criado com sucesso.',
    }
  }
}
