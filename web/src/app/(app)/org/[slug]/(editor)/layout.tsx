export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="mx-auto w-full py-4">{children}</main>
}
