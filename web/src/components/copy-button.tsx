'use client'

import { ComponentProps, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from './ui/button'

export interface CopyButtonProps extends ComponentProps<typeof Button> {
  textToCopy: string
}

export function CopyButton({ textToCopy, ...props }: CopyButtonProps) {
  // Permite que a ref seja inicializada como null e depois receba um Timeout
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [wasCopiedRecently, setWasCopiedRecently] = useState(false)

  function handleCopy() {
    // Se já existir um timeout programado, limpa antes de criar outro
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current)
    }

    // Copia o texto para a área de transferência
    navigator.clipboard.writeText(textToCopy)

    setWasCopiedRecently(true)

    // Define um novo timeout de 2s para remover o "estado de copiado"
    copyTimeoutRef.current = setTimeout(() => {
      setWasCopiedRecently(false)
    }, 2000)
  }

  return (
    <Button
      {...props}
      data-highlight={wasCopiedRecently}
      onClick={handleCopy}
      className={twMerge(
        'data-[highlight=true]:border-emerald-500 data-[highlight=true]:bg-emerald-500 data-[highlight=true]:text-white data-[highlight=true]:transition-none',
        props.className,
      )}
    >
      {wasCopiedRecently ? 'Copiado!' : props.children}
    </Button>
  )
}
