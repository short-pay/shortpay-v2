// import { unstable_noStore as noCache } from 'next/cache'

import { getCurrentOrg } from '@/auth/auth'
import { Dashboard } from '@/components/charts'
import { getIntegrationsToGateways } from '@/http/gateways/get-integrations-to-gateways'

export default async function OrganizationsPage() {
  const currentOrg = await getCurrentOrg()
  const integrations = await getIntegrationsToGateways({ slug: currentOrg! })
  console.log(integrations)
  return (
    <div className="space-y-4 py-4">
      <main className="mx-auto w-full max-w-[1200px]">
        <Dashboard />
      </main>
    </div>
  )
}
