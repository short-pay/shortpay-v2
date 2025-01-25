'use client'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { queryClient } from '@/lib/react-query'
import ModalProvider from '@/providers/modal-provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  )
}
