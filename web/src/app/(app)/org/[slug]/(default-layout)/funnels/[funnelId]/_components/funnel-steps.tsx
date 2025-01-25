'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useModal } from '@/providers/modal-provider'

// Componentes/Icons
import { FunnelPageForm } from '@/app/(app)/org/[slug]/(default-layout)/funnels/[funnelId]/form-funnel-page'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from '@/components/ui/use-toast'
import FunnelPagePlaceholder from '@/components/icons/funnel-page-placeholder'
import { Check, ExternalLink, LucideEdit } from 'lucide-react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import FunnelStepCard from './funnel-step-card'

// Tipagens
import type { Funnel, FunnelPage } from '@/@types/funnels'

// React Beautiful DnD
import {
  DragDropContext,
  DropResult,
  DragStart,
  Droppable,
} from 'react-beautiful-dnd'

// React Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

import CustomModal from '@/components/global/custom-modal'
import { updateFunnelPagesOrder } from '@/http/funnels/update-funnel-pages-order'

type Props = {
  funnel: Funnel
  slug: string
  pages: FunnelPage[]
}

const FunnelSteps = ({ funnel, pages, slug }: Props) => {
  const queryClient = useQueryClient()
  const { setOpen } = useModal()

  const funnelId = funnel.id

  console.log(funnelId, 'funnel Id Dentro de steps')

  // Estado para controlar quais páginas estão sendo exibidas
  const [pagesState, setPagesState] = useState<FunnelPage[]>(pages)
  const [clickedPage, setClickedPage] = useState<FunnelPage | undefined>(
    pages[0],
  )

  // --------------------------------------------
  // Mutation para atualizar ordem das páginas
  // --------------------------------------------
  const updatePagesOrderMutation = useMutation({
    mutationFn: updateFunnelPagesOrder,
    onSuccess: () => {
      // Se você tiver um useQuery(['funnelPages', funnelId]) em algum lugar
      // ele será atualizado após a invalidation
      queryClient.invalidateQueries({ queryKey: ['funnelPages', funnelId] })
      toast({
        title: 'Success',
        description: 'Saved page order',
      })
    },
    onError: (error) => {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Could not save page order',
      })
    },
  })

  // Se quiser lidar com update de página individual (nome, path, etc.):
  // const updatePageMutation = useMutation({
  //   mutationFn: updateFunnelPage,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['funnelPages', funnelId])
  //     toast({
  //       title: 'Success',
  //       description: 'Page updated successfully',
  //     })
  //   },
  //   onError: (error) => {
  //     console.error(error)
  //     toast({
  //       variant: 'destructive',
  //       title: 'Failed',
  //       description: 'Could not update page',
  //     })
  //   },
  // })

  // E também para criar página:
  // const createPageMutation = useMutation({
  //   mutationFn: createFunnelPage,
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries(['funnelPages', funnelId])
  //     toast({
  //       title: 'Success',
  //       description: `Page ${data.name} created successfully`,
  //     })
  //   },
  //   onError: (error) => {
  //     console.error(error)
  //     toast({
  //       variant: 'destructive',
  //       title: 'Failed',
  //       description: 'Could not create page',
  //     })
  //   },
  // })

  // --------------------------------------------
  // FUNÇÕES DE DRAG & DROP
  // --------------------------------------------
  const onDragStart = (event: DragStart) => {
    // current chosen page
    const { draggableId } = event
    const value = pagesState.find((page) => page.id === draggableId)
    // Você pode fazer alguma lógica custom aqui se quiser
  }

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source } = dropResult

    // Se não houver destino ou se a posição não mudou, não faz nada
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return
    }

    // Reordena localmente
    const newPageOrder = [...pagesState]
      .toSpliced(source.index, 1)
      .toSpliced(destination.index, 0, pagesState[source.index])
      .map((page, idx) => {
        return { ...page, order: idx }
      })

    setPagesState(newPageOrder)

    // Envia a nova ordem para o backend via mutation
    updatePagesOrderMutation.mutate({
      funnelId,
      pages: newPageOrder.map((p) => ({
        id: p.id,
        order: p.order,
      })),
    })
  }

  // --------------------------------------------
  // RENDER
  // --------------------------------------------
  return (
    <AlertDialog>
      <div className="flex border-[1px] lg:!flex-row flex-col ">
        {/* ASIDE ESQUERDA */}
        <aside className="flex-[0.3] bg-background p-6 flex flex-col justify-between">
          <ScrollArea className="h-full">
            <div className="flex gap-4 items-center">
              <Check />
              Funnel Steps
            </div>
            {pagesState.length ? (
              <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <Droppable
                  droppableId="funnels"
                  direction="vertical"
                  key="funnels"
                >
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {pagesState.map((page, idx) => (
                        <div
                          className="relative"
                          key={page.id}
                          onClick={() => setClickedPage(page)}
                        >
                          <FunnelStepCard
                            funnelPage={page}
                            index={idx}
                            key={page.id}
                            activePage={page.id === clickedPage?.id}
                          />
                        </div>
                      ))}
                      {/* Necessário para que o react-beautiful-dnd funcione direito */}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                No Pages
              </div>
            )}
          </ScrollArea>

          {/* Botão de criar/editar */}
          <Button
            className="mt-4 w-full"
            onClick={() => {
              setOpen(
                <CustomModal
                  title=" Create or Update a Funnel Page"
                  subheading="Funnel Pages allow you to create step by step processes for customers to follow"
                >
                  <FunnelPageForm
                    isUpdating={Boolean(clickedPage?.id)}
                    initialData={
                      clickedPage
                        ? {
                            id: clickedPage.id,
                            name: clickedPage.name,
                            pathName: clickedPage.pathName || '',
                            content: clickedPage.content || {},
                            order: clickedPage.order ?? 0,
                            funnelId: funnel.id,
                            type: clickedPage.type,
                          }
                        : undefined
                    }
                  />
                </CustomModal>,
              )
            }}
          >
            Create New Steps
          </Button>
        </aside>

        {/* ASIDE DIREITA */}
        <aside className="flex-[0.7] bg-muted p-4">
          {pages.length ? (
            <Card className="h-full flex justify-between flex-col">
              <CardHeader>
                <p className="text-sm text-muted-foreground">Page name</p>
                <CardTitle>{clickedPage?.name}</CardTitle>
                <CardDescription className="flex flex-col gap-4">
                  {/* Preview e link da página */}
                  <div className="border-2 rounded-lg sm:w-80 w-full overflow-clip">
                    <Link
                      href={`/subaccount/${slug}/funnels/${funnelId}/editor/${clickedPage?.id}`}
                      className="relative group"
                    >
                      <div className="cursor-pointer group-hover:opacity-30 w-full">
                        <FunnelPagePlaceholder />
                      </div>
                      <LucideEdit
                        size={50}
                        className="!text-muted-foreground absolute top-1/2 left-1/2 opacity-0 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-100"
                      />
                    </Link>

                    <Link
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_SCHEME}${funnel.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${clickedPage?.pathName}`}
                      className="group flex items-center justify-start p-2 gap-2 hover:text-primary transition-colors duration-200"
                    >
                      <ExternalLink size={15} />
                      <div className="w-64 overflow-hidden overflow-ellipsis">
                        {process.env.NEXT_PUBLIC_SCHEME}
                        {funnel.subDomainName}.{process.env.NEXT_PUBLIC_DOMAIN}/
                        {clickedPage?.pathName}
                      </div>
                    </Link>
                  </div>

                  {/* Form de criação/edição da página */}
                  <FunnelPageForm
                    isUpdating={Boolean(clickedPage?.id)}
                    initialData={
                      clickedPage
                        ? {
                            id: clickedPage.id,
                            name: clickedPage.name,
                            pathName: clickedPage.pathName || '',
                            content: clickedPage.content || {},
                            order: clickedPage.order ?? 0,
                            funnelId,
                            type: clickedPage.type,
                          }
                        : undefined
                    }
                  />
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="h-[600px] flex items-center justify-center text-muted-foreground">
              Create a page to view page settings.
            </div>
          )}
        </aside>
      </div>
    </AlertDialog>
  )
}

export default FunnelSteps
