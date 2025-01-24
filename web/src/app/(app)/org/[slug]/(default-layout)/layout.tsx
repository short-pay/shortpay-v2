import { Header } from '@/components/header'

export default function OrgLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  return (
    <div>
      <Header />
      {/* <Tabs /> */}

      <main className="mx-auto w-full max-w-[1200px] py-4">
        {children}
        {sheet}
      </main>
    </div>
  )
}
