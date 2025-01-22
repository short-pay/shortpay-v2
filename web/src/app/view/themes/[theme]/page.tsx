import dynamic from 'next/dynamic'

export default function ThemePage({ params }: { params: { theme: string } }) {
  const { theme } = params

  try {
    const ThemeComponent = dynamic(() => import(`@/themes/${theme}/index`))
    return (
      <div>
        <ThemeComponent />
      </div>
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return <div>Theme not found</div>
  }
}
