import { ReactNode } from 'react'

export default async function FunnelPageLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col gap-4">
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </>
  )
}
