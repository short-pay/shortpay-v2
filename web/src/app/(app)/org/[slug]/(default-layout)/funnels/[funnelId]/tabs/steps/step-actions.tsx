'use client'

import { Button } from '@/components/ui/button'
import { deleteFunnelPage } from '@/http/funnel-pages/delete-funnel-page'
import { useMutation } from '@tanstack/react-query'
import { ArrowUpDown, Copy, Trash2, Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { queryClient } from '@/lib/react-query'

interface StepActionsProps {
  pageId: string
}

export function StepActions({ pageId }: StepActionsProps) {
  const { toast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteFunnelPage({ pageId }),
    onSuccess: () => {
      toast({
        title: 'Página excluída',
        description: 'A página foi excluída com sucesso.',
      })
      queryClient.invalidateQueries({ queryKey: ['funnels'] })
    },
    onError: () => {
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir a página. Tente novamente.',
        variant: 'destructive',
      })
    },
  })

  return (
    <div className="flex gap-2 justify-center">
      <Button variant="outline" size="sm" disabled>
        <Copy className="w-4 h-4 mr-2" />
        Duplicar
      </Button>
      <Button variant="outline" size="sm" disabled>
        <ArrowUpDown className="w-4 h-4 mr-2" />
        Mover
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-destructive"
        onClick={() => mutate()}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4 mr-2" />
        )}
        {isPending ? 'Excluindo...' : 'Excluir'}
      </Button>
    </div>
  )
}
