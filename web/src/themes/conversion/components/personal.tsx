'use client'
import React, { useState } from 'react'
import { User, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface PersonalInfoProps {
  primaryColor: string
  onComplete: () => void
}

function Header({ complete }: { complete: boolean }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <User className="w-5 h-5" />
      <h2 className="text-lg font-medium">INFORMAÇÕES PESSOAIS</h2>
      {complete && <Check className="w-5 h-5 text-green-500 ml-auto" />}
    </div>
  )
}

function Content({ primaryColor, onComplete }: PersonalInfoProps) {
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica de validação
    // Por enquanto, vamos apenas verificar se todos os campos estão preenchidos
    if (cpf && name && email && phone) {
      onComplete()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-gray-600">
        Utilizaremos seu e-mail para: Identificar seu perfil, histórico de
        compra, notificação de pedidos e carrinho de compras.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            type="text"
            placeholder="Informe seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="Ex: seu.e-mail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone">Celular/WhatsApp</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          style={{ backgroundColor: primaryColor }}
        >
          CONTINUAR
        </Button>
      </div>
    </form>
  )
}

const PersonalInfo = { Header, Content }
export default PersonalInfo
