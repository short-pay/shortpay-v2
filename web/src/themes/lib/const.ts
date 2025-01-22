export type Theme = 'conversion' | 'minimal' | 'boca'

export interface ThemeProps {
  label: string
  value: Theme
}

export const themes: ThemeProps[] = [
  {
    label: 'Conversion',
    value: 'conversion',
  },
  {
    label: 'Minimal',
    value: 'minimal',
  },
  {
    label: 'Boca',
    value: 'boca',
  },
]
