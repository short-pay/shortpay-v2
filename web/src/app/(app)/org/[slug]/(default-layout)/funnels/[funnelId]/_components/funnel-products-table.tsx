'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { updateFunnelProducts } from '@/http/funnels/update-funnel-products'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  description?: string
  imageUrls: string[] // usado em <Image />
  price: number // valor numérico
  currency: string // tipo de moeda, ex: "USD", "BRL"
  createdAt: string
  updatedAt: string
}

interface FunnelProductsTableProps {
  products: Product[]
  defaultData: {
    id: string
    liveProducts: string // JSON com [{ productId: string }]
    slug: string
  }
}

const FunnelProductsTable: React.FC<FunnelProductsTableProps> = ({
  products,
  defaultData,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // O liveProducts é um array de objetos com { productId }, se você não precisa de 'recurring'
  const [liveProducts, setLiveProducts] = useState<{ productId: string }[]>(
    // converte a string JSON em array
    JSON.parse(defaultData.liveProducts || '[]'),
  )

  // Salva/atualiza os produtos do funil
  const handleSaveProducts = async () => {
    setIsLoading(true)
    await updateFunnelProducts({
      funnelId: defaultData.id,
      products: JSON.stringify(liveProducts),
    })
    setIsLoading(false)
    router.refresh() // Atualiza a rota após salvar
  }

  // Adiciona ou remove o produto selecionado em liveProducts
  const handleToggleProduct = (product: Product) => {
    const alreadySelected = liveProducts.some((p) => p.productId === product.id)
    if (alreadySelected) {
      // se já existe, remove
      setLiveProducts((prev) => prev.filter((p) => p.productId !== product.id))
    } else {
      // se não existe, adiciona
      setLiveProducts((prev) => [...prev, { productId: product.id }])
    }
  }

  return (
    <>
      <Table className="bg-card border-[1px] border-border rounded-md">
        <TableHeader className="rounded-md">
          <TableRow>
            <TableHead>Live</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            {/* Se não vai mostrar nada sobre recorrência, pode remover esta coluna */}
            <TableHead>Interval</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium truncate">
          {products.map((product) => {
            const isChecked = liveProducts.some(
              (item) => item.productId === product.id,
            )

            return (
              <TableRow key={product.id}>
                <TableCell>
                  <Input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={isChecked}
                    onChange={() => handleToggleProduct(product)}
                  />
                </TableCell>

                <TableCell>
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <Image
                      alt="Product Image"
                      height={60}
                      width={60}
                      src={product.imageUrls[0]}
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </TableCell>

                <TableCell>{product.name}</TableCell>

                {/* Removido default_price. Se não tiver nada sobre interval, deixar fixo ou remover */}
                <TableCell>One-time</TableCell>

                <TableCell className="text-right">
                  {/* Exibe preço e moeda */}
                  {product.currency} {product.price}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Button
        disabled={isLoading}
        onClick={handleSaveProducts}
        className="mt-4"
      >
        Save Products
      </Button>
    </>
  )
}

export default FunnelProductsTable
