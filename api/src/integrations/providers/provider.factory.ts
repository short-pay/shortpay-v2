import { PaymentConfig } from "./interfaces/provider.interface";
import { OrbitaPayProvider } from "./implementations/orbitapay.provider";
import { StripeProvider } from "./implementations/stripe.provider";

export class PaymentProviderFactory {
    static providers: Record<string, any> = {};

    static register(providerName: string, providerClass: any) {
        this.providers[providerName.toLowerCase()] = providerClass;
    }

    static create(providerName: string, config: PaymentConfig) {
        if (Object.keys(this.providers).length === 0) {
            this.initializeProviders();
        }

        const ProviderClass = this.providers[providerName.toLowerCase()];
        if (!ProviderClass) {
            throw new Error(`Provedor de pagamento '${providerName}' não registrado`);
        }
        return new ProviderClass(config);
    }

    private static initializeProviders() {
        this.register("orbitaPayV2", OrbitaPayProvider);
        this.register("stripe", StripeProvider);
    }
}
