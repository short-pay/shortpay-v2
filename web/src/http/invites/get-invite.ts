import { api } from '../api-client'
import { type roleTyped } from '@/@types/roles'

interface GetInviteResponse {
  invite: {
    id: string
    role: roleTyped
    email: string
    createdAt: string
    organization: {
      name: string
    }
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }
}
export async function getInvite(inviteId: string) {
  const result = await api.get(`invites/${inviteId}`).json<GetInviteResponse>()
  return result
}
