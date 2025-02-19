import { PaymentConfig } from "./interfaces/provider.interface";

export class PaymentProviderFactory {
    static providers: Record<string, any> = {}

    static register(providerName: string, providerClass: any) {
      this.providers[providerName.toLowerCase()] = providerClass
    }
  
    static create(providerName: string, config: PaymentConfig) {
      const ProviderClass = this.providers[providerName.toLowerCase()]
      if (!ProviderClass) {
        throw new Error(`Provedor de pagamento '${providerName}' não registrado`)
      }
      return new ProviderClass(config)
    }
}
