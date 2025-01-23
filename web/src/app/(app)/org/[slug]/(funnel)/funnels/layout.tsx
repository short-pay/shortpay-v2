import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, Suspense } from 'react'

import { getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'

import { FunnelsFilters } from './funnels-filters'

export default async function Layout({ children }: { children: ReactNode }) {
  const slug = await getCurrentOrg()

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Funnels</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Suspense fallback={null}>
                <FunnelsFilters />
              </Suspense>
              <Button size="sm" asChild>
                <Link href={`/org/${slug}/create-funnel`}>
                  <PlusCircle className="mr-2 size-4" />
                  Create Funnel
                </Link>
              </Button>
            </div>

            {children}
          </div>
        </div>
      </div>
    </>
  )
}
