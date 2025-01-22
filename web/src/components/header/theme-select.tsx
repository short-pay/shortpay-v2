'use client'

import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ThemeSelect() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[180px] border-none">
        <SelectValue placeholder="Selecione o tema" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <div className="flex items-center">
            <Sun className="mr-2 h-4 w-4" />
            <span>Claro</span>
          </div>
        </SelectItem>
        <SelectItem value="dark">
          <div className="flex items-center">
            <Moon className="mr-2 h-4 w-4" />
            <span>Escuro</span>
          </div>
        </SelectItem>
        <SelectItem value="system">
          <div className="flex items-center">
            <Laptop className="mr-2 h-4 w-4" />
            <span>Sistema</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
