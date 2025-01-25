import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import FunnelSettings from './_components/funnel-settings'
import FunnelSteps from './_components/funnel-steps'
import { getFunnel } from '@/http/funnels/get-funnel'
import { getCurrentOrg } from '@/auth/auth'

interface FunnelPagePageProps {
  params: Promise<{ funnelId: string }>
}

export default async function FunnelPage({ params }: FunnelPagePageProps) {
  const { funnelId } = await params

  console.log({ funnelId })

  const org = await getCurrentOrg()

  const { funnel } = await getFunnel(funnelId)
  // if (!funnel) return redirect(`/org/${org}/funnels`)
  if (!funnel) return notFound()

  return (
    <div>
      <Link
        href={`/org/${org!}/funnels`}
        className="flex justify-between gap-4 mb-4 text-muted-foreground"
      >
        Back
      </Link>
      <h1 className="text-3xl mb-8">{funnel.name}</h1>
      <Tabs defaultValue="steps" className="w-full">
        <TabsList className="grid  grid-cols-2 w-[50%] bg-transparent ">
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="steps">
          <FunnelSteps funnel={funnel} slug={org!} pages={funnel.pages} />
        </TabsContent>
        <TabsContent value="settings">
          <FunnelSettings
            slug={org!}
            defaultData={{
              id: funnel.id,
              name: funnel.name,
              description: funnel.description || null,
              liveProducts: funnel.liveProducts || '',
              slug: org!,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
