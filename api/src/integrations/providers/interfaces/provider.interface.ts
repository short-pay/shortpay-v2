// src/payments/providers/interfaces/provider.interface.ts
import type { TransactionPayload } from '../../interfaces/transaction.interface'

export interface PaymentProvider {
  // Nome do provedor, ex: "orbitapay"
  readonly providerName: string
  // Processa a transação depois de o payload ter sido preparado pelo método de pagamento
  processTransaction(payload: TransactionPayload): Promise<any>
}
