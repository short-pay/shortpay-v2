import type {
  PaymentMethodInterface,
  PaymentData,
  PaymentResponse,
} from '../interfaces/payment-method-interface'

export class CreditCardMethod implements PaymentMethodInterface {
  async process(
    data: PaymentData & { cardToken: string; installments: number },
  ): Promise<PaymentResponse> {
    console.log('Processando pagamento com Cartão de Crédito...')

    // Simula chamada à API
    const transactionId = `card-${Date.now()}`

    return {
      success: true,
      transactionId,
      message: `Pagamento com cartão criado em ${data.installments} parcelas.`,
    }
  }
}
