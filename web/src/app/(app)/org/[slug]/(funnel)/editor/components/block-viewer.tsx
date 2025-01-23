'use client'

import React, { createContext, useState, useContext, useRef } from 'react'
import { Monitor, Smartphone, Fullscreen, Tablet } from 'lucide-react'
import Link from 'next/link'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { ImperativePanelHandle } from 'react-resizable-panels'
import { themes, type Theme } from '@/themes/lib/const'
import { env } from '@/env/env'

// Types
type Mode = 'desktop' | 'mobile' | 'tablet'

interface BlockViewerConfig {
  primaryColor: string
  logo: string
  companyName: string
  securityBadgeEnabled: boolean
}

interface BlockViewerProps {
  name: string
  description: string
  config: BlockViewerConfig
}

interface BlockViewerContextType {
  mode: Mode
  setMode: (mode: Mode) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

interface BlockViewerToolbarProps {
  name: string
  resizablePanelRef: React.RefObject<ImperativePanelHandle | null>
}

// Context
const BlockViewerContext = createContext<BlockViewerContextType | undefined>(
  undefined,
)

function useBlockViewer(): BlockViewerContextType {
  const context = useContext(BlockViewerContext)
  if (!context) {
    throw new Error('useBlockViewer must be used within a BlockViewerProvider')
  }
  return context
}

// Toolbar Component
const BlockViewerToolbar = React.memo(function BlockViewerToolbar({
  name,
  resizablePanelRef,
}: BlockViewerToolbarProps): React.ReactElement {
  const { mode, setMode, theme, setTheme } = useBlockViewer()

  return (
    <div className="flex w-full items-center gap-4 md:pr-[14px]">
      {/* Select de Temas */}
      <Select value={theme} onValueChange={(value: Theme) => setTheme(value)}>
        <SelectTrigger className="w-[280px] sm:w-full">
          <SelectValue placeholder="Selecione um tema" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Temas</SelectLabel>
            {themes.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="ml-auto hidden items-center gap-2 md:flex">
        {/* ToggleGroup de Dispositivos */}
        <div className="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex">
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(value: Mode) => {
              if (value) {
                setMode(value)
                if (resizablePanelRef?.current) {
                  if (value === 'mobile') {
                    resizablePanelRef.current.resize(35)
                  } else if (value === 'tablet') {
                    resizablePanelRef.current.resize(70)
                  } else {
                    resizablePanelRef.current.resize(100)
                  }
                }
              }
            }}
          >
            <ToggleGroupItem
              value="desktop"
              className="h-[22px] w-[22px] min-w-0 rounded-sm p-0 flex items-center justify-center"
              title="Desktop"
            >
              <Monitor className="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="tablet"
              className="h-[22px] w-[22px] min-w-0 rounded-sm p-0 flex items-center justify-center"
              title="Tablet"
            >
              <Tablet className="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="mobile"
              className="h-[22px] w-[22px] min-w-0 rounded-sm p-0 flex items-center justify-center"
              title="Mobile"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <Separator orientation="vertical" className="h-4 mx-2" />
            <Button
              size="icon"
              variant="ghost"
              className="h-[22px] w-[22px] rounded-sm p-0 flex items-center justify-center"
              asChild
              title="Open in New Tab"
            >
              <Link
                href={`${env.NEXT_PUBLIC_VERCEL_URL}/view/themes/${theme}`}
                target="_blank"
              >
                <span className="sr-only">Open in New Tab</span>
                <Fullscreen className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </ToggleGroup>
        </div>
      </div>
    </div>
  )
})

// Display Component
const BlockViewerDisplay = React.memo(function BlockViewerDisplay({
  config,
  mode,
  resizablePanelRef,
}: {
  config: BlockViewerConfig
  mode: Mode
  resizablePanelRef: React.RefObject<ImperativePanelHandle | null>
}): React.ReactElement {
  const { theme } = useBlockViewer()

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex-1 w-full max-w-[1200px] mx-auto"
    >
      <ResizablePanel
        ref={resizablePanelRef}
        className="relative rounded-xl border bg-background h-[600px]"
        defaultSize={100}
        minSize={30}
      >
        <iframe
          src={`${env.NEXT_PUBLIC_VERCEL_URL}/view/themes/${theme}`}
          className="w-full h-full border-0"
          title="Preview do Bloco"
        />
      </ResizablePanel>
      <ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
      {/* Painel secundário oculto */}
      <ResizablePanel defaultSize={0} minSize={0} />
    </ResizablePanelGroup>
  )
})

// Main Component
export default function BlockViewer({
  name,
  config,
}: BlockViewerProps): React.ReactElement {
  const [mode, setMode] = useState<Mode>('desktop')
  const [theme, setTheme] = useState<Theme>('conversion')
  const resizablePanelRef = useRef<ImperativePanelHandle | null>(null)

  return (
    <BlockViewerContext.Provider value={{ mode, setMode, theme, setTheme }}>
      <div
        id={name}
        data-view="preview" // Adicionado para possíveis customizações futuras
        className="flex h-full flex-col items-stretch gap-4 p-4"
        style={
          {
            '--height': '930px', // Pode ser ajustado conforme necessário
          } as React.CSSProperties
        }
      >
        {/* Toolbar */}
        <BlockViewerToolbar name={name} resizablePanelRef={resizablePanelRef} />

        {/* Display */}
        <div className="flex-1">
          <BlockViewerDisplay
            config={config}
            mode={mode}
            resizablePanelRef={resizablePanelRef}
          />
        </div>
      </div>
    </BlockViewerContext.Provider>
  )
}
