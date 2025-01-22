'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomizationSettings } from '@/app/(app)/org/[slug]/(default-layout)/create-checkout/checkout-form'
import {
  Minus,
  Plus,
  Trash2,
  User,
  MapPin,
  CreditCard,
  Info,
} from 'lucide-react'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CheckoutPreviewProps {
  settings: CustomizationSettings
  isMobile: boolean
}

export default function CheckoutPreview({
  settings,
  isMobile,
}: CheckoutPreviewProps) {
  const getInputClassName = () => {
    const base = 'w-full border bg-white h-12'
    switch (settings.inputStyle) {
      case 'rounded':
        return `${base} rounded-lg`
      case 'oval':
        return `${base} rounded-full`
      default:
        return `${base} rounded-none`
    }
  }

  const getButtonClassName = (isCheckout: boolean = false) => {
    const base = 'w-full py-3 px-4 text-center transition-all h-12'
    const style =
      settings.inputStyle === 'rectangular'
        ? 'rounded-none'
        : settings.inputStyle === 'rounded'
          ? 'rounded-lg'
          : 'rounded-full'
    const shadow = isCheckout
      ? settings.checkoutButtonShadow
        ? 'shadow-lg'
        : ''
      : settings.primaryButtonShadow
        ? 'shadow-lg'
        : ''
    const pulse = settings.buttonPulse ? 'animate-pulse' : ''

    return `${base} ${style} ${shadow} ${pulse}`
  }

  return (
    <div className={`grid ${isMobile ? '' : 'grid-cols-[1fr_350px]'} gap-6`}>
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-medium">INFORMAÇÕES PESSOAIS</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Utilizaremos seu e-mail para: identificar seu perfil, histórico de
            compra, notificação de pedidos e carrinho de compras.
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                className={getInputClassName()}
                placeholder="Ex: seu-email@gmail.com"
              />
            </div>
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                className={getInputClassName()}
                placeholder="Informe seu primeiro nome"
              />
            </div>
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                className={getInputClassName()}
                placeholder="000.000.000-00"
              />
            </div>
            <div>
              <Label htmlFor="phone">Celular/WhatsApp</Label>
              <Input
                id="phone"
                className={getInputClassName()}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-medium">ENDEREÇO DE ENTREGA</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Agora precisamos do seu endereço para entrega.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  className={getInputClassName()}
                  placeholder="00000-000"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                className={getInputClassName()}
                placeholder="Informe seu endereço sem número"
              />
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-4">
              <div>
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  className={getInputClassName()}
                  placeholder="100"
                />
              </div>
              <div>
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  className={getInputClassName()}
                  placeholder="Informe seu complemento"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                className={getInputClassName()}
                placeholder="Informe seu bairro"
              />
            </div>
            <div>
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                className={getInputClassName()}
                placeholder="Informe seu estado"
              />
            </div>
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                className={getInputClassName()}
                placeholder="Informe sua cidade"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-medium">FORMAS DE PAGAMENTO</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Para finalizar seu pedido escolha uma forma de pagamento
          </p>

          <div className="space-y-4">
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-medium">CARTÃO DE CRÉDITO</h3>
              </div>
              <div className="flex gap-2 mb-6">
                <Image
                  src="/placeholder.svg"
                  alt="Visa"
                  width={40}
                  height={25}
                  className="object-contain"
                />
                <Image
                  src="/placeholder.svg"
                  alt="Mastercard"
                  width={40}
                  height={25}
                  className="object-contain"
                />
                <Image
                  src="/placeholder.svg"
                  alt="Elo"
                  width={40}
                  height={25}
                  className="object-contain"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="card-name">
                    Nome igual consta em seu cartão
                  </Label>
                  <Input id="card-name" className={getInputClassName()} />
                </div>
                <div>
                  <Label htmlFor="card-number">Número do Cartão</Label>
                  <Input
                    id="card-number"
                    className={getInputClassName()}
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="expiry-month">Validade</Label>
                    <Select>
                      <SelectTrigger className={getInputClassName()}>
                        <SelectValue placeholder="Mês" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (month) => (
                            <SelectItem
                              key={month}
                              value={month.toString().padStart(2, '0')}
                            >
                              {month.toString().padStart(2, '0')}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="expiry-year">Ano</Label>
                    <Select>
                      <SelectTrigger className={getInputClassName()}>
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
                    <div className="relative">
                      <Input
                        id="cvv"
                        className={getInputClassName()}
                        placeholder="000"
                      />
                      <Info className="w-4 h-4 absolute right-3 top-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="installments">Parcelas</Label>
                  <Select>
                    <SelectTrigger className={getInputClassName()}>
                      <SelectValue placeholder="Selecione o número de parcelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Em 1x de R$ 139,90</SelectItem>
                      <SelectItem value="2">Em 2x de R$ 69,95</SelectItem>
                      <SelectItem value="3">Em 3x de R$ 46,63</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">
                    PARABÉNS! VOCÊ TEM UMA OFERTA ESPECIAL
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Mensagem oferecendo o produto determinado pelo lojista até o
                    ato do cadastro
                  </p>
                  <div className="flex gap-4 items-start">
                    <Image
                      src="/placeholder.svg"
                      alt="Produto Especial"
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium">Nome do produto</h5>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm line-through text-gray-500">
                          R$ 99,90
                        </span>
                        <span className="text-lg font-medium text-green-600">
                          R$ 89,90
                        </span>
                      </div>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Selecione a variação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Azul celeste</SelectItem>
                          <SelectItem value="red">Vermelho</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <button className="px-4 py-2 bg-[#E4006D] text-white rounded-lg text-sm">
                      GARANTIR OFERTA
                    </button>
                  </div>
                </div>

                <button
                  className={getButtonClassName(true)}
                  style={{
                    backgroundColor: '#2BBA00',
                    color: '#FFFFFF',
                  }}
                >
                  Pagar em 1x de R$ 139,90
                </button>
              </div>
            </div>

            <button className="w-full p-4 border rounded-lg text-left">
              PIX
              <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                10% de desconto
              </span>
            </button>

            <button className="w-full p-4 border rounded-lg text-left">
              BOLETO
            </button>
          </div>
        </section>
      </div>

      <div className="bg-white p-6 rounded-xl h-fit">
        <h2 className="font-medium mb-6 pb-4 border-b">SEU CARRINHO</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Image
              src="/placeholder.svg"
              alt="Produto"
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Produto de Exemplo</h3>
                  <p className="text-sm text-gray-600">Preto | Listrado</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 border rounded-lg">
                  <button className="p-2 hover:bg-gray-50">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">1</span>
                  <button className="p-2 hover:bg-gray-50">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="font-medium">R$ 100,00</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Image
              src="/placeholder.svg"
              alt="Produto"
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Produto de Exemplo</h3>
                  <p className="text-sm text-gray-600">Preto | Listrado</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 border rounded-lg">
                  <button className="p-2 hover:bg-gray-50">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">1</span>
                  <button className="p-2 hover:bg-gray-50">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="font-medium">R$ 39,90</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            <div className="flex justify-between text-sm">
              <span>Produtos</span>
              <span>R$ 139,90</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Descontos</span>
              <span>R$ 0,00</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>R$ 139,90</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
