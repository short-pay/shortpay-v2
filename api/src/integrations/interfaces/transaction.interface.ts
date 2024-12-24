// src/payments/interfaces/transaction.interface.ts

export interface CustomerDocument {
  number: string
  type: string // "cpf" ou "cnpj"
}

export interface Customer {
  document: CustomerDocument
  id?: string
  name: string
  email: string
  phone: string
  externalRef?: string
}

export interface TransactionItem {
  tangible: boolean
  title: string
  unitPrice: number // centavos
  quantity: number
  externalRef: string
}

export interface TransactionPayload {
  customer: Customer
  amount: number // em centavos
  paymentMethod: string // ex: "pix", "credit_card", "boleto"
  items: TransactionItem[]
  postbackUrl: string
  metadata?: string
  traceable?: boolean
  ip?: string

  // Campos opcionais que poderão ser adicionados pelos métodos
  pix?: { expiresInDays: number }
  boleto?: { expiresInDays: number }
  card?: {
    id?: string
    hash?: string
    number?: string
    holderName?: string
    expirationMonth?: string
    expirationYear?: string
    cvv?: string
  }
  installments?: number
}
