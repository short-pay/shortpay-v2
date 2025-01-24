import BlurPage from '@/components/global/blur-page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import FunnelSettings from './_components/funnel-settings'
import FunnelSteps from './_components/funnel-steps'
import { getFunnel } from '@/http/funnels/get-funnel'

type Props = {
  params: { funnelId: string; org: string }
}

export default async function FunnelPage({ params }: Props) {
  const { funnel } = await getFunnel(params.funnelId)
  if (!funnel) return redirect(`/org/${params.org}/funnels`)

  return (
    <BlurPage>
      <Link
        href={`/org/${params.org}/funnels`}
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
          <FunnelSteps
            funnel={funnel}
            slug={params.org}
            pages={funnel.pages}
            funnelId={params.funnelId}
          />
        </TabsContent>
        <TabsContent value="settings">
          <FunnelSettings
            slug={params.org}
            defaultData={{
              id: funnel.id,
              name: funnel.name,
              description: funnel.description || null,
              liveProducts: funnel.liveProducts || '',
              slug: params.org,
            }}
          />
        </TabsContent>
      </Tabs>
    </BlurPage>
  )
}
