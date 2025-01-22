'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
// import { createCheckout } from '@/http/create-checkout'

const checkoutSchema = z.object({
  productId: z.string({ message: 'ID do produto inválido.' }),
  integrationId: z.string({ message: 'ID da integração inválido.' }),
  quantity: z.coerce
    .number()
    .int()
    .positive({ message: 'A quantidade deve ser um número positivo.' })
    .default(1),
  context: z.enum(['SINGLE_PRODUCT', 'CHECKOUT'], {
    invalid_type_error: 'Contexto inválido.',
  }),
})

export type CheckoutSchema = z.infer<typeof checkoutSchema>

export async function createCheckoutAction(data: FormData) {
  const currentOrg = getCurrentOrg()
  if (!currentOrg) {
    return {
      success: false,
      message: 'Organização não encontrada.',
      errors: null,
    }
  }

  const result = checkoutSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { productId, integrationId, quantity, context } = result.data

  try {
    // const response = await createCheckout({
    //   productId,
    //   integrationId,
    //   quantity,
    //   context,
    //   organizationSlug: currentOrg,
    // })

    revalidateTag('checkouts')

    return {
      success: true,
      message: 'Checkout criado com sucesso.',
      errors: null,
      data: response,
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
