'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/http/products/get-products'

import { FunnelForm } from '@/components/forms/funnel-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import FunnelProductsTable from './funnel-products-table'

interface FunnelSettingsProps {
  slug: string
  defaultData: {
    id: string
    name: string
    description: string | null
    liveProducts?: string | null
    slug: string
  }
}

export default function FunnelSettings({
  slug,
  defaultData,
}: FunnelSettingsProps) {
  console.log(slug)
  // 1) React Query Hook
  const { data, isLoading, isError } = useQuery({
    // O `queryKey` deve ser um array único que identifique a requisição.
    // Aqui uso 'products' e o `slug` para cada organização.
    queryKey: ['products', slug],
    queryFn: () => getProducts({ org: slug }),
    // Você pode incluir opções como: refetchInterval, staleTime, etc.
  })

  // 2) Se a requisição der certo, `data` será do tipo: { products: any[] }, baseado em getProducts.
  // Aqui extraio `products` (ou retorno um array vazio como fallback).
  const products = data?.products ?? []

  console.log({ products }, 'produtos')

  return (
    <div className="flex gap-4 flex-col xl:!flex-row">
      <Card className="flex-1 flex-shrink">
        <CardHeader>
          <CardTitle>Funnel Products</CardTitle>
          <CardDescription>
            Select the products and services you wish to sell on this funnel.
            You can sell one-time and recurring products too.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* 3) Três condições principais: carregando, erro e sucesso */}
          {isLoading ? (
            <p>Loading products...</p>
          ) : isError ? (
            <p>Failed to load products. Please try again.</p>
          ) : products.length > 0 ? (
            <FunnelProductsTable
              defaultData={{
                id: defaultData.id,
                liveProducts: defaultData.liveProducts || '', // força string
                slug: defaultData.slug,
              }}
              products={products}
            />
          ) : (
            'No products found. Add products to start selling.'
          )}
        </CardContent>
      </Card>

      <FunnelForm
        isUpdating={true}
        initialData={{
          ...defaultData,
          description: defaultData.description || undefined,
        }}
      />
    </div>
  )
}
