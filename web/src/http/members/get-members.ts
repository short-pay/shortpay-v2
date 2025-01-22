import { api } from '../api-client'
import { type roleTyped } from '@/@types/roles'

interface GetMembersResponse {
  members: {
    id: string
    userId: string
    role: roleTyped
    name: string | null
    email: string
    avatarUrl: string | null
  }[]
}

export async function getMembers(org: string) {
  const result = await api
    .get(`organizations/${org}/members`, {
      next: {
        tags: [`${org}/members`],
      },
    })
    .json<GetMembersResponse>()

  return result
}
