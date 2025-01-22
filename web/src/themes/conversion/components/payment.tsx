import React from 'react'
import { CreditCard, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'

interface PaymentInfoProps {
  primaryColor: string
  complete: boolean
  onComplete: () => void
}

function Header({ complete }: { complete: boolean }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <CreditCard className="w-5 h-5" />
      <h2 className="text-lg font-medium">FORMAS DE PAGAMENTO</h2>
      {complete && <Check className="w-5 h-5 text-green-500 ml-auto" />}
    </div>
  )
}

function Content({ primaryColor, complete, onComplete }: PaymentInfoProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(complete)
    // Adicione aqui a lógica de validação do pagamento
    onComplete()
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Para finalizar seu pedido escolha uma forma de pagamento
      </p>
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>CARTÃO DE CRÉDITO</Label>
          <div className="flex gap-2">
            {['visa', 'mastercard', 'elo', 'amex', 'hipercard', 'diners'].map(
              (card) => (
                <Image
                  key={card}
                  src={`/placeholder.svg?height=30&width=45`}
                  alt={card}
                  className="size-12 object-contain"
                />
              ),
            )}
          </div>
          <div>
            <Label htmlFor="cardName">Nome igual consta em seu cartão</Label>
            <Input
              id="cardName"
              type="text"
              placeholder="Nome igual consta em seu cartão"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="0000 0000 0000 0000"
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="expiry">Validade</Label>
              <Select>
                <SelectTrigger id="expiry">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <SelectItem key={month} value={month.toString()}>
                      {month.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="year">Ano</Label>
              <Select>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(
                    { length: 10 },
                    (_, i) => new Date().getFullYear() + i,
                  ).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="Código de Segurança"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="installments">Parcelas</Label>
            <Select>
              <SelectTrigger id="installments">
                <SelectValue placeholder="Selecione o número de parcelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Em 1x de R$ 139,90</SelectItem>
                <SelectItem value="2">Em 2x de R$ 69,95</SelectItem>
                <SelectItem value="3">Em 3x de R$ 46,63</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <h3 className="font-medium text-green-800 mb-2">
            PARABÉNS VOCÊ TEM UMA OFERTA ESPECIAL
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Mensagem oferecendo o produto determinada pelo lojista no ato do
            cadastro
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Produto"
                className="size-20 object-cover rounded"
              />
              <div>
                <p className="font-medium">Nome do produto</p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 line-through">R$ 120,00</span>
                  <span className="text-primary font-medium">R$ 80,00</span>
                </div>
              </div>
            </div>
            <Button variant="secondary">GARANTIR OFERTA</Button>
          </div>
        </div>

        <Button
          className="w-full"
          style={{ backgroundColor: primaryColor }}
          onClick={handleSubmit}
        >
          Pagar em 1x de R$ 139,90
        </Button>

        <RadioGroup defaultValue="credit">
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pix" id="pix" />
              <Label htmlFor="pix">PIX</Label>
            </div>
            <span className="text-xs px-2 py-1 bg-black text-white rounded">
              10% de desconto
            </span>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="boleto" id="boleto" />
              <Label htmlFor="boleto">BOLETO</Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

const PaymentInfo = { Header, Content }
export default PaymentInfo
