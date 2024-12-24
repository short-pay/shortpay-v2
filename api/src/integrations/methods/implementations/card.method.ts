// src/payments/methods/implementations/card.method.ts

import type { TransactionPayload } from '../../interfaces/transaction.interface'
import type { PaymentMethod } from '../interfaces/method.interface'

export class CardMethod implements PaymentMethod {
  readonly methodName = 'credit_card'

  preparePayload(payload: TransactionPayload): TransactionPayload {
    return {
      ...payload,
      card: {
        number: '4111111111111111',
        holderName: 'Test User',
        expirationMonth: '12',
        expirationYear: '2030',
        cvv: '123',
      },
      installments: 3,
    }
  }
}
