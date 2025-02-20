import { PaymentConfig } from "./interfaces/provider.interface";
import { StripeProvider } from "./implementations/stripe.provider";
import { GenericPaymentProvider } from "./implementations/generic.provider";

export class PaymentProviderFactory {
    static providers: Record<string, any> = {};

    static register(providerName: string, providerClass: any) {
        this.providers[providerName.toLowerCase()] = providerClass;
    }

    static create(providerName: string, providerEndpoint: string, config: PaymentConfig) {
        if (Object.keys(this.providers).length === 0) {
            this.initializeProviders();
        }

        const ProviderClass = this.providers[providerName.toLowerCase()];
        if (!ProviderClass) {
            throw new Error(`Provedor de pagamento '${providerName}' não registrado`);
        }
        return new ProviderClass(config, providerName, providerEndpoint);
    }

    private static initializeProviders() {
        this.register("orbitaPayV2", GenericPaymentProvider);
        this.register("stripe", StripeProvider);
    }
}
