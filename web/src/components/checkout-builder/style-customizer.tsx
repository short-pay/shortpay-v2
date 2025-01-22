import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { CustomizationSettings } from '@/app/(app)/org/[slug]/(default-layout)/create-checkout/checkout-form'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface StyleCustomizerProps {
  settings: CustomizationSettings
  onChange: (settings: CustomizationSettings) => void
}

export default function StyleCustomizer({
  settings,
  onChange,
}: StyleCustomizerProps) {
  const [contentOpen, setContentOpen] = useState(true)
  const [footerOpen, setFooterOpen] = useState(true)

  return (
    <div className="w-72 flex flex-col gap-4">
      <div className="bg-white rounded-lg shadow-sm">
        <button
          className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium"
          onClick={() => setContentOpen(!contentOpen)}
        >
          CONTEÚDO
          {contentOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {contentOpen && (
          <div className="p-4 border-t space-y-6">
            <div>
              <Label className="text-xs mb-2 block">
                Visual de inputs e botões
              </Label>
              <RadioGroup
                value={settings.inputStyle}
                onValueChange={(value: CustomizationSettings['inputStyle']) =>
                  onChange({ ...settings, inputStyle: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rectangular" id="rectangular" />
                  <Label htmlFor="rectangular">Retangular</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rounded" id="rounded" />
                  <Label htmlFor="rounded">Arredondado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oval" id="oval" />
                  <Label htmlFor="oval">Oval</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-2 block">
                  Texto do botão primário
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={settings.primaryButtonText}
                    onChange={(e) =>
                      onChange({
                        ...settings,
                        primaryButtonText: e.target.value,
                      })
                    }
                    className="w-10 h-10 p-0 border-none"
                  />
                  <Input
                    type="text"
                    value={settings.primaryButtonText}
                    onChange={(e) =>
                      onChange({
                        ...settings,
                        primaryButtonText: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs mb-2 block">
                  Fundo do botão primário
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={settings.primaryButtonBg}
                    onChange={(e) =>
                      onChange({ ...settings, primaryButtonBg: e.target.value })
                    }
                    className="w-10 h-10 p-0 border-none"
                  />
                  <Input
                    type="text"
                    value={settings.primaryButtonBg}
                    onChange={(e) =>
                      onChange({ ...settings, primaryButtonBg: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="primaryShadow"
                    checked={settings.primaryButtonShadow}
                    onCheckedChange={(checked) =>
                      onChange({
                        ...settings,
                        primaryButtonShadow: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="primaryShadow">
                    Sombra no botão primário
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="buttonPulse"
                    checked={settings.buttonPulse}
                    onCheckedChange={(checked) =>
                      onChange({ ...settings, buttonPulse: checked as boolean })
                    }
                  />
                  <Label htmlFor="buttonPulse">Efeito Pulsar</Label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <button
          className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium"
          onClick={() => setFooterOpen(!footerOpen)}
        >
          RODAPÉ
          {footerOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {footerOpen && (
          <div className="p-4 border-t space-y-6">
            <div>
              <Label className="text-xs mb-2 block">
                Texto do botão de finalizar compra
              </Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={settings.checkoutButtonText}
                  onChange={(e) =>
                    onChange({
                      ...settings,
                      checkoutButtonText: e.target.value,
                    })
                  }
                  className="w-10 h-10 p-0 border-none"
                />
                <Input
                  type="text"
                  value={settings.checkoutButtonText}
                  onChange={(e) =>
                    onChange({
                      ...settings,
                      checkoutButtonText: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label className="text-xs mb-2 block">
                Fundo do botão de finalizar compra
              </Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={settings.checkoutButtonBg}
                  onChange={(e) =>
                    onChange({ ...settings, checkoutButtonBg: e.target.value })
                  }
                  className="w-10 h-10 p-0 border-none"
                />
                <Input
                  type="text"
                  value={settings.checkoutButtonBg}
                  onChange={(e) =>
                    onChange({ ...settings, checkoutButtonBg: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="checkoutShadow"
                checked={settings.checkoutButtonShadow}
                onCheckedChange={(checked) =>
                  onChange({
                    ...settings,
                    checkoutButtonShadow: checked as boolean,
                  })
                }
              />
              <Label htmlFor="checkoutShadow">
                Sombra no botão finalizar compra
              </Label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
