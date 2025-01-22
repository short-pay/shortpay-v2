import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth/auth'
import { Header } from '@/components/header'
import { getOrganizations } from '@/http/organizations/get-organizations'

import { OrganizationalStructureGrid } from './card-list'

export default async function Home() {
  const org = await getCurrentOrg()
  const getOrgs = await getOrganizations()
  const hasOrganizations = getOrgs.organizations.length > 0

  if (org && hasOrganizations) {
    redirect(`/org/${org}`)
  }

  return (
    <>
      <Header />
      <div className="space-y-4 py-4">
        <main className="mx-auto w-full max-w-[1200px] space-y-4">
          {hasOrganizations ? (
            <>
              <OrganizationalStructureGrid
                organizations={getOrgs.organizations}
              />
              {/* <Component /> */}
            </>
          ) : (
            redirect('/create-organization-v2')
          )}
        </main>
      </div>
    </>
  )
}
