'use client'

import { Filter, Loader2, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

export function IntegrationsFilters() {
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()
  const [isPendingFilterTransition, startTransition] = useTransition()

  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [status, setStatus] = useState(searchParams.get('status') ?? 'All')

  function handleFilter(event: FormEvent) {
    event.preventDefault()

    const params = new URLSearchParams(searchParams)
    if (search) {
      params.set('q', search)
    } else {
      params.delete('q')
    }

    if (status && status !== 'All') {
      params.set('status', status)
    } else {
      params.delete('status')
    }

    startTransition(() => {
      router.push(`${path}?${params.toString()}`)
    })
  }

  function handleResetFilters() {
    setSearch('')
    setStatus('All')

    router.push(path)
  }

  const hasFilters = searchParams.toString() !== ''

  return (
    <form onSubmit={handleFilter} className="flex items-center gap-2">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search integrations..."
        className="h-9 w-[200px]"
      />

      <Separator orientation="vertical" className="h-6" />

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="h-9 w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="connected">Connected</SelectItem>
          <SelectItem value="disconnected">Disconnected</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" size="sm" variant="secondary">
        {isPendingFilterTransition ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Filter className="mr-2 h-4 w-4" />
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
        <X className="mr-2 h-4 w-4" />
        Clear
      </Button>
    </form>
  )
}
