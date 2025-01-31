import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, Suspense } from 'react'

import { getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'

import { ProductsFilters } from './products-filters'

export default async function ProductsLayout({
  children,
}: {
  children: ReactNode
}) {
  const slug = await getCurrentOrg()
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Suspense fallback={null}>
            <ProductsFilters />
          </Suspense>
          <Button size="sm" asChild>
            <Link href={`/org/${slug}`}>
              <PlusCircle className="mr-2 size-4" />
              Cadastrar Produtos
            </Link>
          </Button>
        </div>

        {children}
      </div>
    </>
  )
}
