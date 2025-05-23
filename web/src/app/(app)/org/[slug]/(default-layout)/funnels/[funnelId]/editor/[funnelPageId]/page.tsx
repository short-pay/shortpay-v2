// import { db } from '@/lib/db
import { EditorProvider } from '@/providers/editor/editor-provider'

import React from 'react'
import FunnelEditorNavigation from './_components/funnel-editor-navigation'
import FunnelEditorSidebar from './_components/funnel-editor-sidebar'
import FunnelEditor from './_components/funnel-editor'
import { data } from '@/utils/db'

interface EditorPageProps {
  params: {
    slug: string
    funnelId: string
    funnelPageId: string
  }
}

async function EditorPage({ params }: EditorPageProps) {
  // const funnelPageDetails = await db.funnelPage.findFirst({
  //   where: {
  //     id: params.funnelPageId,
  //   },
  // })
  // if (!funnelPageDetails) {
  //   return redirect(
  //     `/subaccount/${params.subaccountId}/funnels/${params.funnelId}`,
  //   )
  //

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
      <EditorProvider
      // subaccountId={params.slug}
      // funnelId={params.funnelId}
      // pageDetails={data}
      >
        <FunnelEditorNavigation
          funnelId={params.funnelId}
          funnelPageDetails={data}
          slug={params.slug}
        />
        <div className="h-full flex justify-center">
          <FunnelEditor funnelPageId={params.funnelPageId} />
        </div>

        <FunnelEditorSidebar slug={params.slug} />
      </EditorProvider>
    </div>
  )
}

export default EditorPage
