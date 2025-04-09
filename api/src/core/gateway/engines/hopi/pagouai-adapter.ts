import type { TransactionResult } from '@/core/types/types'
import { HopiBaseAdapter } from './base-adapter'

import type { HopiTransactionResponse } from './@types/types'

export class PagouAiAdapter extends HopiBaseAdapter {
  protected parseTransactionResponse(
    data: HopiTransactionResponse,
  ): TransactionResult {
    return {
      success: true,
      transactionId: data.id,
      status: data.status,
      extraData: {
        pixQrCode: data.pix?.qr_code_base64,
        boletoUrl: data.boleto?.url,
      },
    }
  }
}
