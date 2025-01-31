'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useParams } from 'next/navigation'
import { getFunnel } from '@/http/funnels/get-funnel'

import Steps from './tabs/steps'

// import FunnelSettings from './_components/funnel-settings'
import { useQuery } from '@tanstack/react-query'
import FunnelSettings from './_components/funnel-settings'

export default function FunnelPage() {
  const { slug: org, funnelId } = useParams<{
    slug: string
    funnelId: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: ['funnels'],
    queryFn: () => getFunnel(funnelId),
  })
  const funnel = data?.funnel

  // const { pages } = await getFunnelPages(funnelId)

  if (isLoading) return <h1>Carregando</h1>
  // if (!funnel) return notFound()
  // if (!funnel) return redirect(`/org/${org}/funnels`)

  return (
    <div className="px-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-10 justify-between">
          {/* <Link
            href={`/org/${org!}/funnels`}
            className="flex justify-between gap-4 mb-4 text-muted-foreground"
          >
            Back
          </Link> */}
          <div className="flex flex-col">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
              Funil de Vendas
            </h2>
            <p className="leading-7">
              Gerencie as etapas do seu funil de vendas
            </p>
          </div>
        </div>
        {/* <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <a
            href={`/api/videos/${clientId}/download/video`}
            target="_blank"
            rel="noreferrer"
          >
            <VideoIcon className="mr-2 h-4 w-4" />
            <span>Download MP4</span>
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href={`/api/videos/${clientId}/download/audio`}
            target="_blank"
            rel="noreferrer"
          >
            <Music2 className="mr-2 h-4 w-4" />
            <span>Download MP3</span>
          </a>
        </Button>
      </div> */}
      </div>

      <Tabs defaultValue="steps" className="space-y-4">
        <TabsList>
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="steps">
          {isLoading ? (
            <h1>Carregando</h1>
          ) : (
            <Steps funnel={funnel!} slug={org!} />
          )}
        </TabsContent>
        <TabsContent value="settings">
          <FunnelSettings
            slug={org!}
            defaultData={{
              id: funnel!.id,
              name: funnel!.name,
              description: funnel!.description || null,
              liveProducts: funnel!.liveProducts || '',
              slug: org!,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
