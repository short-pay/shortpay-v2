export type Checkout = {
  id: string
  name: string
  description?: string | null
  content: Record<string, any>
  previewImage?: string | null
  currency: string
  createdAt: string
  updatedAt: string
  funnelId?: string | null
}
