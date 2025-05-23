'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createFunnelPage } from '@/http/funnel-pages/create-funnel-page'
import { updateFunnelPage } from '@/http/funnel-pages/update-funnel-page'
import { revalidateTag } from 'next/cache'

const funnelPageSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: 'O nome da página deve ter pelo menos 3 caracteres.' }),
  pathName: z.string().optional(),
  funnelId: z.string(),
  order: z.coerce
    .number()
    .min(0, { message: 'A ordem precisa ser maior ou igual a 0.' }),
  type: z.enum(['GENERIC', 'CHECKOUT', 'LANDING_PAGE', 'THANK_YOU']),
  content: z.any().optional(),
})

export type FunnelPageSchema = z.infer<typeof funnelPageSchema>

/**
 * Action to create a new funnel page
 */
export async function createFunnelPageAction(data: FormData) {
  const parsedData = funnelPageSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, pathName, funnelId, order, type, content } = parsedData.data

  try {
    await createFunnelPage({
      name,
      pathName,
      funnelId,
      order,
      type,
      content,
    })

    revalidateTag('funnelsPages')
    return {
      success: true,
      message: `Página "${name}" criada com sucesso!`,
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
      message: 'Erro inesperado. Tente novamente mais tarde.',
      errors: null,
    }
  }
}

/**
 * Action to update an existing funnel page
 */
export async function updateFunnelPageAction(data: FormData) {
  const parsedData = funnelPageSchema.safeParse(Object.fromEntries(data))

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { id, name, pathName, funnelId, order, type, content } = parsedData.data

  try {
    const response = await updateFunnelPage({
      id: id!,
      name,
      pathName,
      funnelId,
      order,
      type,
      content,
    })

    return {
      success: true,
      message: `Página "${response.name}" atualizada com sucesso!`,
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
      message: 'Erro inesperado. Tente novamente mais tarde.',
      errors: null,
    }
  }
}
