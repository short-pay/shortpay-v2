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
  pathName?: string
  order?: number
  published?: boolean
  content: string // JSON data
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
  type: 'GENERIC' | 'CHECKOUT' | 'LANDING_PAGE' | 'THANK_YOU'
  description?: string | null
  subDomainName?: string | null
  published?: boolean
  createdAt: string
  updatedAt: string
  organizationId: string
  pages: FunnelPage[]
  checkouts: Checkout[]
  notifications: Notification[]
}
