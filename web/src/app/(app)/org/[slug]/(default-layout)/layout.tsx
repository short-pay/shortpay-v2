import { Header } from '@/components/header'

export default function OrgLayout({
  children,
  sheetIntegration,
}: Readonly<{
  children: React.ReactNode
  sheetIntegration: React.ReactNode
}>) {
  return (
    <div>
      <Header />
      {/* <Tabs /> */}

      <main className="mx-auto w-full max-w-[1200px] py-4">
        {children}
        {sheetIntegration}
      </main>
    </div>
  )
}
