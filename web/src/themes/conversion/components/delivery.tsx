'use client'

import React, { useState } from 'react'
import { Truck, Check, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface DeliveryInfoProps {
  primaryColor: string
  onComplete: () => void
}

function Header({ complete }: { complete: boolean }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <Truck className="w-5 h-5" />
      <h2 className="text-lg font-medium">ENDEREÇO DE ENTREGA</h2>
      {complete && <Check className="w-5 h-5 text-green-500 ml-auto" />}
    </div>
  )
}

function Content({ primaryColor, onComplete }: DeliveryInfoProps) {
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [shippingMethod, setShippingMethod] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = e.target.value.replace(/\D/g, '')
    setCep(newCep)

    if (newCep.length === 8) {
      setIsLoading(true)
      try {
        const response = await fetch(`https://viacep.com.br/ws/${newCep}/json/`)
        const data = await response.json()
        if (!data.erro) {
          setAddress(data.logradouro)
          setNeighborhood(data.bairro)
          setState(data.uf)
          setCity(data.localidade)
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      cep &&
      address &&
      number &&
      neighborhood &&
      state &&
      city &&
      shippingMethod
    ) {
      onComplete()
    }
  }

  const isAddressComplete =
    cep && address && number && neighborhood && state && city

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-gray-600">
        Agora precisamos do seu endereço para entrega.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="cep">CEP</Label>
          <div className="relative">
            <Input
              id="cep"
              type="text"
              placeholder="00000-000"
              value={cep}
              onChange={handleCepChange}
              className="mt-1 pr-10"
              maxLength={8}
            />
            {isLoading && (
              <Loader2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 animate-spin" />
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            type="text"
            placeholder="Informe seu endereço sem número"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="number">Número</Label>
            <Input
              id="number"
              type="text"
              placeholder="100"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="complement">Complemento</Label>
            <Input
              id="complement"
              type="text"
              placeholder="Informe seu complemento"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            type="text"
            placeholder="Informe seu bairro"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            type="text"
            placeholder="Informe seu estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            type="text"
            placeholder="Informe sua cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1"
          />
        </div>
        {isAddressComplete && (
          <div className="space-y-2">
            <Label>Forma de Envio</Label>
            <RadioGroup
              value={shippingMethod}
              onValueChange={setShippingMethod}
            >
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Frete Grátis</Label>
                </div>
                <span className="text-sm">10 a 20 dias</span>
                <span className="font-medium">Grátis</span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">Frete Expresso</Label>
                </div>
                <span className="text-sm">10 a 20 dias</span>
                <span className="font-medium">R$ 27,90</span>
              </div>
            </RadioGroup>
          </div>
        )}
        <Button
          type="submit"
          className="w-full"
          style={{ backgroundColor: primaryColor }}
          disabled={!isAddressComplete || !shippingMethod}
        >
          CONTINUAR
        </Button>
      </div>
    </form>
  )
}

const DeliveryInfo = { Header, Content }
export default DeliveryInfo
