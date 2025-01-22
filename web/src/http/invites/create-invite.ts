import { api } from '../api-client'
import { type roleTyped } from '@/@types/roles'
interface CreateInviteRequest {
  org: string
  email: string
  role: roleTyped
}
type CreateInviteResponse = void
export async function createInvite({
  org,
  email,
  role,
}: CreateInviteRequest): Promise<CreateInviteResponse> {
  await api.post(`organizations/${org}/invites`, {
    json: {
      email,
      role,
    },
  })
}
