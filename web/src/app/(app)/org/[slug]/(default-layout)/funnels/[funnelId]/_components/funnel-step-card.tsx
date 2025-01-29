'use client'

import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowDown, Mail } from 'lucide-react'
// import { createPortal } from 'react-dom'

interface FunnelPage {
  id: string
  name: string
  path: string
}

interface FunnelStepCardProps {
  funnelPage: FunnelPage
  index: number
  activePage: boolean
}

const FunnelStepCard: React.FC<FunnelStepCardProps> = ({
  activePage,
  funnelPage,
  index,
}) => {
  // const portal = document.getElementById('blur-page')

  return (
    <Draggable draggableId={funnelPage.id} index={index}>
      {/* {(provided, snapshot) => {
        const component = (
          <Card
            className="p-0 relative cursor-grab my-2"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <CardContent className="p-0 flex items-center gap-4 flex-row">
              <div className="h-14 w-14 bg-muted flex items-center justify-center">
                <Mail />
                <ArrowDown
                  size={18}
                  className="absolute -bottom-2 text-primary"
                />
              </div>
              {funnelPage.name}
            </CardContent>
            {activePage && (
              <div className="w-2 top-2 right-2 h-2 absolute bg-emerald-500 rounded-full" />
            )}
          </Card>
        )
        if (!portal) return component
        if (snapshot.isDragging) {
          return createPortal(component, portal)
        }
        return component
      }} */}

      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="my-2"
        >
          <Card className="p-0 relative cursor-grab">
            <CardContent className="p-2 flex items-center gap-4 flex-row">
              <div className="h-14 w-14 bg-muted flex items-center justify-center relative">
                <Mail />
                <ArrowDown
                  size={18}
                  className="absolute -bottom-2 text-primary"
                />
              </div>
              <span className="font-medium">{funnelPage.name}</span>
              {activePage && (
                <div className="w-2 top-2 right-2 h-2 absolute bg-emerald-500 rounded-full" />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  )
}

export default FunnelStepCard
