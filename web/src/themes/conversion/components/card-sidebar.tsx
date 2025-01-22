import React from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function CartSidebar() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium mb-6">SEU CARRINHO</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt="Produto de Exemplo"
            width={80}
            height={80}
            className="size-20 object-cover rounded"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">Produto de Exemplo</h3>
                <p className="text-sm text-gray-500">Preto</p>
                <p className="text-sm text-gray-500">Listrado</p>
              </div>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  -
                </Button>
                <span className="w-8 text-center">1</span>
                <Button variant="outline" size="icon">
                  +
                </Button>
              </div>
              <span className="font-medium">R$ 100,00</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt="Produto de Exemplo"
            width={80}
            height={80}
            className="size-20 object-cover rounded"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">Produto de Exemplo</h3>
                <p className="text-sm text-gray-500">Preto</p>
                <p className="text-sm text-gray-500">Listrado</p>
              </div>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  -
                </Button>
                <span className="w-8 text-center">1</span>
                <Button variant="outline" size="icon">
                  +
                </Button>
              </div>
              <span className="font-medium">R$ 39,90</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Produtos</span>
            <span>R$ 139,90</span>
          </div>
          <div className="flex justify-between">
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
  )
}
