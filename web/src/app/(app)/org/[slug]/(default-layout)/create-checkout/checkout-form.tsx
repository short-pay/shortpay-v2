'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Monitor, Smartphone } from 'lucide-react'
import StyleCustomizer from '@/components/checkout-builder/style-customizer'
import CheckoutPreview from '@/components/checkout-builder/checkout-preview'
import Link from 'next/link'

export type CustomizationSettings = {
  inputStyle: 'rectangular' | 'rounded' | 'oval'
  buttonShadow: boolean
  buttonPulse: boolean
  primaryButtonText: string
  primaryButtonBg: string
  primaryButtonShadow: boolean
  checkoutButtonText: string
  checkoutButtonBg: string
  checkoutButtonShadow: boolean
}

const defaultSettings: CustomizationSettings = {
  inputStyle: 'rectangular',
  buttonShadow: false,
  buttonPulse: false,
  primaryButtonText: '#FFFFFF',
  primaryButtonBg: '#F30168',
  primaryButtonShadow: false,
  checkoutButtonText: '#FFFFFF',
  checkoutButtonBg: '#2BBA00',
  checkoutButtonShadow: false,
}

export function CheckoutCreator() {
  const [settings, setSettings] =
    useState<CustomizationSettings>(defaultSettings)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>(
    'desktop',
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Sair do construtor
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Tema</span>
              <input
                type="text"
                value="Conversion"
                readOnly
                className="text-sm border rounded px-2 py-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
            <Button
              variant="default"
              className="bg-[#E4006D] hover:bg-[#c80061]"
            >
              SALVAR
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        <StyleCustomizer settings={settings} onChange={setSettings} />
        <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
          <CheckoutPreview
            settings={settings}
            isMobile={previewMode === 'mobile'}
          />
        </div>
      </div>
    </div>
  )
}
