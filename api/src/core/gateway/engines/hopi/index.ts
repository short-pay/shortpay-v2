import { PagouAiAdapter } from './pagouai-adapter'
import { OrbitaPayAdapter } from './orbita-pay-adapter'
import type {
  GatewayAdapter,
  TransactionPayload,
  TransactionResult,
} from '@/core/types/types'

export class HopiAdapter implements GatewayAdapter {
  private delegate: GatewayAdapter

  constructor(config: { token: string; endpoint: string; domain?: string }) {
    const domain = config.domain?.toLowerCase()

    if (domain?.includes('pagou.ai')) {
      this.delegate = new PagouAiAdapter(config)
    } else if (domain?.includes('orbitapay')) {
      this.delegate = new OrbitaPayAdapter(config)
    } else {
      throw new Error(`White-label HOPI não suportado: ${domain}`)
    }
  }

  async createTransaction(
    data: TransactionPayload,
  ): Promise<TransactionResult> {
    return this.delegate.createTransaction(data)
  }
}
