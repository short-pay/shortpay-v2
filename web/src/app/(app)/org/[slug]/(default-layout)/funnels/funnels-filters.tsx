'use client'

import { Filter, Loader2, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export function FunnelsFilters() {
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()
  const [isPendingFilterTransition, startTransition] = useTransition()

  const [name, setName] = useState(searchParams.get('nameFilter') ?? '')

  function handleFilter(event: FormEvent) {
    event.preventDefault()

    const params = new URLSearchParams(searchParams)
    params.set('nameFilter', name)

    startTransition(() => {
      router.push(`${path}?${params.toString()}`)
    })
  }

  function handleResetFilters() {
    setName('')

    const params = new URLSearchParams(searchParams)
    params.delete('nameFilter')

    router.push(`${path}?${params.toString()}`)
  }

  const hasFilters = name !== ''

  return (
    <form onSubmit={handleFilter} className="flex items-center gap-2">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search funnels..."
        className="h-8 w-auto"
      />

      <Separator orientation="vertical" className="h-6" />

      <Button type="submit" size="sm" variant="secondary">
        {isPendingFilterTransition ? (
          <Loader2 className="mr-2 size-3 animate-spin" />
        ) : (
          <Filter className="mr-2 size-3" />
        )}
        Filter
      </Button>

      <Button
        onClick={handleResetFilters}
        disabled={!hasFilters}
        type="button"
        size="sm"
        variant="outline"
      >
        <X className="mr-2 size-3" />
        Clear
      </Button>
    </form>
  )
}
