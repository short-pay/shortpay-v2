'use client'
import { useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SidebarMenuItemProps {
  title: string
  children?: React.ReactNode
}

function SidebarMenuItem({ title, children }: SidebarMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
        {title}
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </CollapsibleTrigger>

      <CollapsibleContent>
        <SidebarGroupContent className="p-4 space-y-4">
          {children}
        </SidebarGroupContent>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function EditorSidebar() {
  return (
    <Sidebar className="w-64 border-r">
      <SidebarHeader className="p-4 border-b">
        <Button variant={'ghost'}>
          <Link href={'/'} className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Sair do construtor
          </Link>
        </Button>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarMenuItem title="Barra de avisos">
          <div className="flex items-center justify-between">
            <h2 className="text-sm">Ativar</h2>
            <Switch />
          </div>
          <div className="space-y-2">
            <label className="text-sm  block">Texto da barra de avisos</label>
            <Input className="text-sm" placeholder="Digite sua mensagem" />
          </div>
          <div className="space-y-2">
            <label className="text-sm  block">Fundo da barra de avisos</label>
            <div className="flex gap-2">
              <div className="w-8 h-8  rounded border" />
              <Input className="text-sm" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm  block">
              Mensagem de barra de avisos
            </label>
            <Select defaultValue="paragraph">
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paragraph">Paragraph</SelectItem>
                <SelectItem value="heading">Heading</SelectItem>
                <SelectItem value="h2">h2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm  block">Tamanho da margem</label>
            <Select defaultValue="medium">
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequena</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SidebarMenuItem>

        <SidebarMenuItem title="Carrinho">
          <div className="space-y-2">
            <label className="text-sm  block">Exibir carrinho</label>
            <Select defaultValue="always">
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="always">Sempre aberto</SelectItem>
                <SelectItem value="toggle">Com botão de toggle</SelectItem>
                <SelectItem value="hidden">Oculto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm ">Exibir cupom de desconto</h2>
            <Switch />
          </div>
        </SidebarMenuItem>

        <SidebarMenuItem title="Conteúdo">
          <div className="space-y-2">
            <label className="text-sm  block">Visual de inputs e botões</label>
            <Select defaultValue="rounded">
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rounded">Arredondado</SelectItem>
                <SelectItem value="square">Quadrado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SidebarMenuItem>

        <SidebarMenuItem title="Rodapé">
          <div className="flex items-center justify-between">
            <h2 className="text-sm ">Exibir rodapé</h2>
            <Switch />
          </div>
        </SidebarMenuItem>

        <SidebarMenuItem title="Escassez">
          <div className="flex items-center justify-between">
            <h2 className="text-sm ">Ativar contador</h2>
            <Switch />
          </div>
        </SidebarMenuItem>

        <SidebarMenuItem title="Configurações">
          <div className="space-y-2">
            <label className="text-sm  block">Idioma</label>
            <Select defaultValue="pt">
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SidebarMenuItem>

        <SidebarMenuItem title="Provas sociais">
          <div className="flex items-center justify-between">
            <h2 className="text-sm ">Exibir avaliações</h2>
            <Switch />
          </div>
        </SidebarMenuItem>

        <SidebarMenuItem title="CSS Personalizado">
          <div className="space-y-2">
            <label className="text-sm  block">CSS adicional</label>
            <textarea
              className="w-full h-32 text-sm border rounded-md p-2 resize-none"
              placeholder="Digite seu CSS personalizado aqui..."
            />
          </div>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  )
}
