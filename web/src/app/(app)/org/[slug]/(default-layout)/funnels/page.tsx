'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2, PlusCircle } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { Button } from '@/components/ui/button'

import { FunnelsFilters } from './funnels-filters'

import { FunnelsPagination } from './funnels-pagination'
import { FunnelItemActions } from './funnel-item-actions'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getFunnels } from '@/http/funnels/get-funnels'
import Link from 'next/link'

export default function FunnelsPage() {
  const { slug } = useParams<{ slug: string }>()

  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)
  const size = parseInt(searchParams.get('size') || '10', 10)
  const searchTerm = searchParams.get('searchTerm') || ''

  const { data, isLoading } = useQuery({
    queryKey: ['funnels', page, size, searchTerm],
    queryFn: () => getFunnels({ slug, page, size, searchTerm }),
  })

  return (
    <>
      <div className="flex items-center justify-between">
        <Suspense fallback={null}>
          <FunnelsFilters />
        </Suspense>
        <Button size="sm" asChild>
          <Link href={`/org/${slug}/create-funnel`}>
            <PlusCircle className="mr-2 size-4" />
            Create Funnel
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
        {isLoading ? (
          <div className="flex h-24 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.funnels?.length && data?.funnels.length > 0 ? (
                data?.funnels.map((funnel) => (
                  <TableRow key={funnel.id}>
                    <TableCell>
                      <Link href={`/org/${slug}/funnels/${funnel.id}`}>
                        {funnel.name}
                      </Link>
                    </TableCell>
                    <TableCell>{funnel.description || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge
                        variant={funnel.published ? 'default' : 'secondary'}
                      >
                        {funnel.published ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <FunnelItemActions funnelId={funnel.id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No funnels found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <Suspense fallback={null}>
        <FunnelsPagination
          pageCount={data?.totalPages || 1}
          pageIndex={page - 1}
          pageSize={size}
        />
      </Suspense>
    </>
  )
}
