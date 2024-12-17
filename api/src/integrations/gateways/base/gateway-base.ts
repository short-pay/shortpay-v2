import type {
  GatewayInterface,
  CreateTransactionData,
  TransactionResponse,
  RefundResponse,
} from '../interfaces/gateway-interface'

export abstract class GatewayBase implements GatewayInterface {
  abstract createTransaction(
    data: CreateTransactionData,
  ): Promise<TransactionResponse>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  abstract handleWebhook(data: any): Promise<void>
  abstract refundTransaction(transactionId: string): Promise<RefundResponse>

  protected formatAmountToCents(amount: number): number {
    return Math.round(amount * 100)
  }
}
