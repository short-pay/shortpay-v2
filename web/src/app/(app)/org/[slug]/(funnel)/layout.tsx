export default function FunnelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="mx-auto w-full max-w-[1200px] py-4">{children}</main>
}
