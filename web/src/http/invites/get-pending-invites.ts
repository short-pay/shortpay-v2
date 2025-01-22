import { api } from '../api-client'
import { type roleTyped } from '@/@types/roles'

interface GetPendingInvitesResponse {
  invites: {
    organization: {
      name: string
    }
    id: string
    role: roleTyped
    email: string
    createdAt: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }[]
}
export async function getPendingInvites() {
  const result = await api
    .get('pending-invites')
    .json<GetPendingInvitesResponse>()
  return result
}
