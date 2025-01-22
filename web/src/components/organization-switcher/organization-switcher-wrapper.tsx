import { getCurrentOrg, getCurrentSubscription } from '@/auth/auth'
import { getOrganizations } from '@/http/organizations/get-organizations'
import { OrganizationSwitcher } from './organization-switcher'

export async function OrganizationSwitcherWrapper() {
  const currentOrg = await getCurrentOrg()
  const { organizations } = await getOrganizations()
  const subscription = await getCurrentSubscription()

  const isFree = subscription === 'FREE'
  const isAdminInAnyOrg = organizations.some((org) => org.role === 'ADMIN')

  return (
    <OrganizationSwitcher
      organizations={organizations}
      currentOrg={currentOrg}
      isFree={isFree}
      isAdminInAnyOrg={isAdminInAnyOrg}
    />
  )
}
