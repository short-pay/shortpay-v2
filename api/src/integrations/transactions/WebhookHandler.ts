import { TransactionService } from './TransactionService'

export async function handleWebhook(provider: string, data: any) {
  const service = new TransactionService()

  switch (provider) {
    case 'orbitaPayV2Provider':
      if (data.status === 'SUCCESS') {
        await service.updateTransaction(data.transactionId, 'SUCCESS')
      }
      break
    case 'payoutProvider':
      if (data.payment_status === 'paid') {
        await service.updateTransaction(data.transactionId, 'SUCCESS')
      }
      break
    default:
      throw new Error(`Unhandled provider: ${provider}`)
  }
}
