'use server'

import { getCurrentOrg } from '@/auth/auth'
import { createFunnel } from '@/http/funnels/create-funnel'
import { updateFunnel } from '@/http/funnels/update-funnel'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const funnelSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Por favor, inclua pelo menos 4 caracteres.' }),
  description: z.string().optional(),
  pages: z
    .array(
      z.object({
        name: z.string(),
        type: z.enum(['GENERIC', 'CHECKOUT', 'LANDING_PAGE', 'THANK_YOU']),
        content: z.any(),
      }),
    )
    .optional(),
})

export type FunnelSchema = z.infer<typeof funnelSchema>

export async function createFunnelAction(data: FormData) {
  const currentOrg = await getCurrentOrg()
  if (!currentOrg) {
    return {
      success: false,
      message: 'Organização não encontrada.',
      errors: null,
    }
  }

  const result = funnelSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { name, description, pages } = result.data

  // Garante que todas as páginas tenham `content`
  const sanitizedPages = pages?.map((page) => ({
    ...page,
    content: page.content ?? {}, // Adiciona valor padrão para content
  }))

  try {
    const response = await createFunnel({
      name,
      description,
      org: currentOrg!,
      pages: sanitizedPages,
    })

    revalidateTag('funnels')

    return {
      success: true,
      message: `Funil "${response.name}" criado com sucesso.`,
      errors: null,
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }

    console.error(err)
    return {
      success: false,
      message: 'Erro inesperado, tente novamente em alguns minutos.',
      errors: null,
    }
  }
}

export async function updateFunnelAction(data: FormData) {
  const result = funnelSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const funnelId = data.get('id') as string
  const { name, description } = result.data

  try {
    const response = await updateFunnel({
      id: funnelId,
      name,
      description,
    })

    return {
      success: true,
      message: `Funil "${response.name}" atualizado com sucesso.`,
      errors: null,
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }

    console.error(err)
    return {
      success: false,
      message: 'Erro inesperado, tente novamente em alguns minutos.',
      errors: null,
    }
  }
}
