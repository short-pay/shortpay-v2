import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { EditorSidebar } from './editor/components/editor-sidebar'

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <EditorSidebar />
      <main className="mx-auto w-full py-4">
        <SidebarTrigger className="ml-4" />
        {children}
      </main>
    </SidebarProvider>
  )
}
