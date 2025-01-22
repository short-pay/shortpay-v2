import { api } from '../api-client'
import { type roleTyped } from '@/@types/roles'

interface GetMembershipResponse {
  membership: {
    id: string
    role: roleTyped
    organizationId: string
    userId: string
  }
}

export async function getMembership(org: string) {
  const result = await api
    .get(`organization/${org}/membership`)
    .json<GetMembershipResponse>()

  return result
}
