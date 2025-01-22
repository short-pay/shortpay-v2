'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createProduct } from '@/http/products/create-product'
import { updateProduct } from '@/http/products/update-product'

const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Por favor, inclua pelo menos 2 caracteres.' }),
  description: z
    .string()
    .min(10, { message: 'A descrição deve ter pelo menos 10 caracteres.' })
    .max(500, { message: 'A descrição não pode exceder 500 caracteres.' }),
  price: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) >= 0, {
      message: 'O preço deve ser um número positivo.',
    })
    .transform((value) => Number(value)),
})

export type ProductSchema = z.infer<typeof productSchema>

export async function createProductAction(data: FormData) {
  const currentOrg = await getCurrentOrg()
  if (!currentOrg) {
    return {
      success: false,
      message: 'Organização não encontrada.',
      errors: null,
    }
  }

  const result = productSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { name, description, price } = result.data

  try {
    await createProduct({
      name,
      description,
      price,
      organizationSlug: currentOrg!,
    })

    revalidateTag('products')
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

  return {
    success: true,
    message: 'Produto criado com sucesso.',
    errors: null,
  }
}

export async function updateProductAction(data: FormData) {
  const currentOrg = await getCurrentOrg()
  if (!currentOrg) {
    return {
      success: false,
      message: 'Organização não encontrada.',
      errors: null,
    }
  }

  const result = productSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { name, description, price } = result.data
  const productId = data.get('id') as string

  if (!productId) {
    return {
      success: false,
      message: 'ID do produto não fornecido.',
      errors: null,
    }
  }

  try {
    await updateProduct({
      id: productId,
      name,
      description,
      price,
      organizationSlug: currentOrg!,
    })

    revalidateTag('products')
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

  return {
    success: true,
    message: 'Produto atualizado com sucesso.',
    errors: null,
  }
}
