import { api } from '../api-client'
import { type roleTyped } from '@/@types/roles'

interface UpdateMemberRequest {
  org: string
  memberId: string
  role: roleTyped
}
export async function updateMember({
  org,
  memberId,
  role,
}: UpdateMemberRequest) {
  await api.put(`organizations/${org}/members/${memberId}`, {
    json: { role },
  })
}
