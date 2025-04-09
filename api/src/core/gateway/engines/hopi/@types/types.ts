export type HopiTransactionResponse = {
  id: string
  status: 'pending' | 'paid' | 'failed'
  pix?: {
    qr_code_base64?: string
    qr_code_image_base64?: string
  }
  boleto?: {
    url?: string
  }
  links?: {
    boleto_url?: string
  }
}
