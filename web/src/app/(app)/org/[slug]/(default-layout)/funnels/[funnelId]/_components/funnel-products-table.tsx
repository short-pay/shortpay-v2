'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { updateFunnelProducts } from '@/http/funnels/update-funnel-products'

interface Product {
  id: string
  name: string
  description?: string
  imageUrls: string[]
  price: number
  currency: string
  createdAt: string
  updatedAt: string
}

interface FunnelProductsTableProps {
  products: Product[]
  defaultData: {
    id: string
    liveProducts: string
    slug: string
  }
}

export function FunnelProductsTable({
  products,
  defaultData,
}: FunnelProductsTableProps) {
  const router = useRouter()
  const [liveProducts, setLiveProducts] = useState<{ productId: string }[]>(
    JSON.parse(defaultData.liveProducts || '[]'),
  )

  const { mutate, isPending } = useMutation({
    mutationKey: ['funnels'],
    mutationFn: () =>
      updateFunnelProducts({
        funnelId: defaultData.id,
        products: JSON.stringify(liveProducts),
      }),
    onSuccess: () => {
      router.refresh()
    },
  })

  const handleToggleProduct = (productId: string) => {
    setLiveProducts((prev) =>
      prev.some((p) => p.productId === productId)
        ? prev.filter((p) => p.productId !== productId)
        : [...prev, { productId }],
    )
  }

  return (
    <div className="space-y-4">
      <Table className="bg-card border border-border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Live</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox
                  checked={liveProducts.some((p) => p.productId === product.id)}
                  onCheckedChange={() => handleToggleProduct(product.id)}
                />
              </TableCell>
              <TableCell>
                {product.imageUrls[0] ? (
                  <Image
                    src={product.imageUrls[0]}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="object-cover rounded-md"
                  />
                ) : (
                  <div className="w-[60px] h-[60px] bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: product.currency,
                }).format(product.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={() => mutate()} disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Products'}
      </Button>
    </div>
  )
}

export default FunnelProductsTable
