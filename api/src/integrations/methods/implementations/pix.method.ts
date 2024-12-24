// src/payments/methods/implementations/pix.method.ts

import type { TransactionPayload } from '../../interfaces/transaction.interface'
import type { PaymentMethod } from '../interfaces/method.interface'

export class PixMethod implements PaymentMethod {
  readonly methodName = 'pix'

  preparePayload(payload: TransactionPayload): TransactionPayload {
    return {
      ...payload,
      pix: { expiresInDays: 10 },
    }
  }
}
