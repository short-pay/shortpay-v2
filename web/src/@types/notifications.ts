export type Notification = {
  id: string
  type: string
  message: string
  isRead: boolean
  createdAt: string
  funnelId?: string | null
}
