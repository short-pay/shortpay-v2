// src/payments/providers/provider.factory.ts
import type { PaymentProvider } from './interfaces/provider.interface'
import { OrbitaPayProvider } from './implementations/orbitapay.provider'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PaymentProviderFactory {
  static create(
    providerName: string,
    secretKey: string,
    apiKey: string,
  ): PaymentProvider {
    switch (providerName) {
      case 'orbitaPayV2Provider':
        return new OrbitaPayProvider(secretKey, apiKey)
      // Adicione outros providers aqui
      default:
        throw new Error(`Unsupported provider: ${providerName}`)
    }
  }
}
