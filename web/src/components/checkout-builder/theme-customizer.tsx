import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ThemeCustomizerProps {
  theme: {
    background: string
    text: string
    primary: string
    secondary: string
  }
  onChange: (newTheme: any) => void
}

export default function ThemeCustomizer({
  theme,
  onChange,
}: ThemeCustomizerProps) {
  const handleColorChange = (key: string, value: string) => {
    onChange({ ...theme, [key]: value })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personalizar Cores</h3>
      {Object.entries(theme).map(([key, value]) => (
        <div key={key}>
          <Label
            htmlFor={key}
            className="block text-sm font-medium mb-1 capitalize"
          >
            {key}
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              type="color"
              id={key}
              value={value}
              onChange={(e) => handleColorChange(key, e.target.value)}
              className="w-10 h-10 p-0 border-none"
            />
            <Input
              type="text"
              value={value}
              onChange={(e) => handleColorChange(key, e.target.value)}
              className="flex-grow"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
