// src/payments/methods/method.factory.ts
import type { PaymentMethod } from './interfaces/method.interface'
import { PixMethod } from './implementations/pix.method'
import { CardMethod } from './implementations/card.method'
import { BoletoMethod } from './implementations/boleto.method'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PaymentMethodFactory {
  static create(methodName: string): PaymentMethod {
    switch (methodName) {
      case 'pix':
        return new PixMethod()
      case 'credit_card':
        return new CardMethod()
      case 'boleto':
        return new BoletoMethod()
      default:
        throw new Error(`Unsupported payment method: ${methodName}`)
    }
  }
}
