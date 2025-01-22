import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

export default async function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  const auth = await isAuthenticated()

  if (!auth) {
    redirect('/auth/sign-in')
  }
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col gap-4">
          {children}
          {sheet}
        </div>
      </div>
    </>
  )
}
