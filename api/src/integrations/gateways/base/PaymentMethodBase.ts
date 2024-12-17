import type {
  PaymentMethodInterface,
  PaymentData,
  PaymentResponse,
} from '../interfaces/payment-method-interface'

export abstract class PaymentMethodBase implements PaymentMethodInterface {
  abstract process(data: PaymentData): Promise<PaymentResponse>
}
