import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface MinimalThemeProps {
  // Customizações que chegam do "BD"
  primaryColor?: string
  logoUrl?: string
  headerText?: string
  // Lista de produtos, etc.
  products?: {
    id: number
    name: string
    price: number
  }[]
}

export default function MinimalTheme({
  primaryColor = '#000',
  logoUrl,
  headerText = 'Checkout Minimal',
  products = [],
}: MinimalThemeProps) {
  /**
   * Usando Tailwind, a cor primária geralmente viraria uma classe,
   * mas para fins de DEMO, vou usar style inline para aplicar `primaryColor`.
   * Em produção, você pode usar outras abordagens:
   * - classes personalizadas
   * - CSS variables
   * - etc.
   */
  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      {/* Header */}
      <header
        className="w-full p-4 flex items-center"
        style={{ backgroundColor: primaryColor }}
      >
        {logoUrl && <Image src={logoUrl} alt="Logo" className="h-8 mr-4" />}
        <h1 className="text-white font-semibold">{headerText}</h1>
      </header>

      {/* Lista de produtos */}
      <main className="max-w-lg w-full p-4 mt-4 border rounded-md">
        <h2 className="text-lg font-bold mb-2">Seus Produtos</h2>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between p-2 border-b">
              <span>{product.name}</span>
              <span>R$ {product.price}</span>
            </li>
          ))}
        </ul>
      </main>

      {/* Botão de finalizar */}
      <button
        className={twMerge(
          'mt-4 px-6 py-2 rounded text-white',
          // caso queira mesclar background dinamicamente
        )}
        style={{ backgroundColor: primaryColor }}
      >
        Finalizar Compra
      </button>
    </div>
  )
}
