import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

import { NotFoundError } from '@/http/_errors/not-found-error'
import { convertCurrency } from '@/http/services/currency-converter'
import { auth } from '@/http/middlewares/auth'

export async function createCheckout(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/checkouts',
      {
        schema: {
          tags: ['Checkouts'],
          summary: 'Create a customizable checkout',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string().min(1, 'Name is required'),
            description: z.string().optional(),
            theme: z.string().default('default'),
            orderBump: z.boolean().default(false),
            currency: z
              .string()
              .length(3, 'Currency must be 3 letters')
              .transform((val) => val.toUpperCase()),
            amount: z.number().positive('Amount must be a positive number'),
            organizationId: z.string().uuid('Invalid organization ID format'),
          }),
          response: {
            201: z.object({
              id: z.string(),
              name: z.string(),
              currency: z.string(),
              convertedAmount: z.number(),
              organizationCurrency: z.string(),
            }),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const {
          name,
          description,
          theme,
          orderBump,
          currency,
          amount,
          organizationId,
        } = request.body

        // Verifica se a organização já possui um checkout
        const existingCheckout = await prisma.checkout.findFirst({
          where: { organizationId },
        })

        if (existingCheckout) {
          return reply.status(400).send({
            message: 'This organization already has a checkout.',
          })
        }

        // Busca a moeda padrão da organização
        const organization = await prisma.organization.findUnique({
          where: { id: organizationId },
          select: { currency: true },
        })

        if (!organization) {
          throw new NotFoundError('Organization not found.')
        }

        const organizationCurrency = organization.currency

        // Converte o valor para a moeda padrão da organização
        let convertedAmount = amount
        if (currency !== organizationCurrency) {
          try {
            convertedAmount = await convertCurrency(
              amount,
              currency,
              organizationCurrency,
            )
          } catch (error) {
            console.error('❌ Currency conversion failed:', error)
            return reply.status(500).send({
              message: 'Currency conversion failed. Please try again later.',
            })
          }
        }

        // Cria o checkout no banco
        const checkout = await prisma.checkout.create({
          data: {
            name,
            description,
            theme,
            orderBump,
            currency,
            convertedAmount,
            organizationId,
          },
        })

        return reply.status(201).send({
          id: checkout.id,
          name: checkout.name,
          currency,
          convertedAmount,
          organizationCurrency,
        })
      },
    )
}
