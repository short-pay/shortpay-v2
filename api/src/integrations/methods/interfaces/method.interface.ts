// src/payments/methods/interfaces/method.interface.ts

import type { TransactionPayload } from '@/integrations/interfaces/transaction.interface'

export interface PaymentMethod {
  // Nome do método, ex: "pix", "credit_card", "boleto"
  readonly methodName: string
  // Prepara e retorna um novo payload ajustado para o método de pagamento específico
  preparePayload(payload: TransactionPayload): TransactionPayload
}
