import type { Checkout } from './checkout'
import type { Notification } from './notifications'

export type FunnelPageType =
  | 'GENERIC'
  | 'CHECKOUT'
  | 'LANDING_PAGE'
  | 'THANK_YOU'

export type FunnelPage = {
  id: string
  name: string
  path: string
  type: FunnelPageType
  content: Record<string, any> // JSON data
  previewImage?: string | null
  metadata?: Record<string, any> | null // JSON data for metadata
  createdAt: string
  updatedAt: string
  funnelId?: string | null
  checkoutId?: string | null
}

// Types for Funnel
export type Funnel = {
  id: string
  name: string
  description?: string | null
  subDomainName?: string | null
  createdAt: string
  updatedAt: string
  organizationId: string
  pages: FunnelPage[]
  checkouts: Checkout[]
  notifications: Notification[]
}
