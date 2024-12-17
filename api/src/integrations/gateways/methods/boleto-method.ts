import type {
  PaymentMethodInterface,
  PaymentData,
  PaymentResponse,
} from '../interfaces/payment-method-interface'

export class BoletoMethod implements PaymentMethodInterface {
  async process(data: PaymentData): Promise<PaymentResponse> {
    console.log('Processando pagamento com Boleto...')

    // Simula chamada à API
    const transactionId = `boleto-${Date.now()}`

    return {
      success: true,
      transactionId,
      message: 'Boleto gerado com sucesso.',
    }
  }
}
