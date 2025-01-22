import { api } from '../api-client'
import { type roleTyped } from '@/@types/roles'

interface GetInvitesResponse {
  invites: {
    id: string
    role: roleTyped
    email: string
    createdAt: string
    author: {
      id: string
      name: string | null
    } | null
  }[]
}
export async function getInvites(org: string) {
  const result = await api
    .get(`organizations/${org}/invites`, {
      next: {
        tags: [`${org}/invites`],
      },
    })
    .json<GetInvitesResponse>()
  return result
}
