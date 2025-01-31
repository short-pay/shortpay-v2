'use client'
// import { unstable_noStore } from 'next/cache'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import type { Funnel, FunnelPage } from '@/@types/funnels'
import { FunnelPageForm } from '../../form-funnel-page'
import {
  Check, ExternalLink,
  LucideEdit
} from 'lucide-react'
import Link from 'next/link'
import FunnelPagePlaceholder from '@/components/icons/funnel-page-placeholder'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import StepCard from './step-card'
import {
  DragDropContext,
  Droppable,
  type DragStart,
  type DropResult,
} from 'react-beautiful-dnd'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { useEffect, useState } from 'react'
import { useModal } from '@/providers/modal-provider'
import { Badge } from '@/components/ui/badge'
import { StepActions } from './step-actions'

export interface StepsProps {
  funnel: Funnel
  slug: string
}

export default function Steps({ funnel, slug }: StepsProps) {
  const { setOpen } = useModal()
  const {id: funnelId, pages} = funnel

  // Estado para controlar quais páginas estão sendo exibidas
  const [pagesState, setPagesState] = useState<FunnelPage[]>(pages)
  const [clickedPage, setClickedPage] = useState<FunnelPage | undefined>()

useEffect(() => {
  // Corrigindo a sincronização do estado
  setPagesState(prev => {
    // Mantém as páginas existentes quando possível
    const mergedPages = pages.map(newPage => 
      prev.find(p => p.id === newPage.id) || newPage
    )
    return mergedPages
  })

  if (!clickedPage && pages.length > 0) {
    setClickedPage(pages[0])
  }
}, [pages])

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

    // Reordenando localmente com splice "tradicional"
    const updatedPages = [...pagesState]
    const [removed] = updatedPages.splice(source.index, 1)
    updatedPages.splice(destination.index, 0, removed)

    // Ajusta a propriedade 'order'
    const finalPages = updatedPages.map((page, idx) => ({
      ...page,
      order: idx,
    }))

    setPagesState(finalPages)
  }
  // unstable_noStore()


  // TODO: (feat): adicionar funcão de atualização, melhorar responsividade
  
  return (
    <Card className="self-start h-[620px]">
      <CardContent className="p-0 flex lg:!flex-row flex-col h-full gap-2">
        <AlertDialog>
          {/* ASIDE ESQUERDA */}
          <aside className="flex-[0.3] bg-background p-6 flex flex-col justify-between">
            <ScrollArea className="h-full overflow-y-auto">
              <div className="flex gap-4 items-center mb-4">
                <Check />
                <span className="font-medium">Funnel Steps</span>
              </div>

              {pagesState.length ? (
                <DragDropContext
                  onDragEnd={onDragEnd}
                  onDragStart={onDragStart}
                >
                  <Droppable 
                    droppableId="funnels" 
                    direction="vertical" 
                    isDropDisabled={false} 
                    isCombineEnabled={false}
                  >
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        onClick={(e) => {
                          // Desseleciona apenas se clicar no container principal
                          if (e.target === e.currentTarget) {
                            setClickedPage(undefined)
                          }
                        }}
                      >
                        {pagesState.map((page, idx) => (
                          <div
                            className="relative"
                            key={page.id}
                            onClick={(e) => {
                              e.stopPropagation()
                              setClickedPage(page)
                            }}
                          >
                            <StepCard
                              funnelPage={page}
                              index={idx}
                              activePage={page.id === clickedPage?.id}
                            />
                          </div>
                        ))}
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

            {/* Botões lado a lado */}
            <div className="mt-4 flex gap-2">
              <Button
                className="w-full"
                onClick={() => {
                  setOpen(
                    <CustomModal
                      title="Create New Funnel Page"
                      subheading="Start creating a new step in your funnel"
                    >
                      <FunnelPageForm
                        isUpdating={false}
                        initialData={undefined}
                      />
                    </CustomModal>,
                  )
                }}
              >
                Create New Step
              </Button>

              <Button
                className="w-full"
                variant="outline"
                disabled={!clickedPage}
                onClick={() => {
                  if (!clickedPage) return
                  setOpen(
                    <CustomModal
                      title="Edit Funnel Page"
                      subheading="Modify your existing funnel step"
                    >
                      <FunnelPageForm
                        isUpdating
                        initialData={{
                          id: clickedPage.id,
                          name: clickedPage.name,
                          pathName: clickedPage.pathName || '',
                          content: clickedPage.content || {},
                          order: clickedPage.order ?? 0,
                          funnelId: funnel.id,
                          type: clickedPage.type,
                        }}
                      />
                    </CustomModal>,
                  )
                }}
              >
                Edit Step
              </Button>
            </div>
          </aside>

          {/* ASIDE DIREITA */}
          <aside className="flex-[0.7] bg-muted p-4">
            {pagesState.length && clickedPage ? (
              <Card className="h-full flex justify-between flex-col">
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Page name</p>
                  <CardTitle>{clickedPage.name}</CardTitle>

                  <CardDescription className="flex flex-col gap-4 mt-4">
                    {/* Preview e link da página */}

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="border-2 rounded-lg sm:w-80 w-full overflow-clip">
                        <Link
                          href={`/org/${slug}/funnels/${funnelId}/editor/${clickedPage.id}`}
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
                          href={`${process.env.NEXT_PUBLIC_SCHEME}${funnel.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${clickedPage.pathName}`}
                          className="group flex items-center justify-start p-2 gap-2 hover:text-primary transition-colors duration-200"
                        >
                          <ExternalLink size={15} />
                          <div className="w-64 overflow-hidden overflow-ellipsis">
                            {process.env.NEXT_PUBLIC_SCHEME}
                            {funnel.subDomainName}.
                            {process.env.NEXT_PUBLIC_DOMAIN}/
                            {clickedPage.pathName}
                          </div>
                        </Link>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Status:</span>
                          <Badge
                            variant={
                              clickedPage.published ? 'default' : 'secondary'
                            }
                          >
                            {clickedPage.published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Type:</span>
                          <Badge variant="outline">{clickedPage.type}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Form de criação/edição da página (inline, se quiser manter) */}
                  {/* <FunnelPageForm
                      isUpdating
                      initialData={{
                        id: clickedPage.id,
                        name: clickedPage.name,
                        pathName: clickedPage.pathName || '',
                        content: clickedPage.content || {},
                        order: clickedPage.order ?? 0,
                        funnelId,
                        type: clickedPage.type,
                      }}
                    /> */}

                  {/* Métricas */}
                  <div className="bg-background p-6 rounded-lg text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      Métricas em breve
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Estamos trabalhando para trazer métricas valiosas para
                      esta página do funil.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-md backdrop-filter backdrop-blur-sm bg-opacity-50">
                        <h4 className="font-medium">Visualizações</h4>
                        <p className="text-2xl text-muted-foreground">--</p>
                      </div>
                      <div className="p-4 border rounded-md backdrop-filter backdrop-blur-sm bg-opacity-50">
                        <h4 className="font-medium">Taxa de Conversão</h4>
                        <p className="text-2xl text-muted-foreground">--%</p>
                      </div>
                    </div>
                  </div>

                  {/* Ações Rápidas */}
                  <StepActions pageId={clickedPage.id} />
                </CardContent>
              </Card>
            ) : (
              <div className="h-[600px] flex items-center justify-center text-muted-foreground">
                Create a page to view page settings.
              </div>
            )}
          </aside>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
