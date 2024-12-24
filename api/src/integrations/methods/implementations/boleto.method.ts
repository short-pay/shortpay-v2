// src/payments/methods/implementations/boleto.method.ts

import type { TransactionPayload } from '../../interfaces/transaction.interface'
import type { PaymentMethod } from '../interfaces/method.interface'

export class BoletoMethod implements PaymentMethod {
  readonly methodName = 'boleto'

  preparePayload(payload: TransactionPayload): TransactionPayload {
    return {
      ...payload,
      boleto: { expiresInDays: 5 },
    }
  }
}
