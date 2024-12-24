import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

import { NotFoundError } from '@/http/_errors/not-found-error'
import { auth } from '@/http/middlewares/auth'

export async function createProduct(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/products',
      {
        schema: {
          tags: ['Products'],
          summary: 'Create a new product',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string().min(1, 'Name is required'),
            description: z.string().optional(),
            price: z.number().positive('Price must be a positive number'),
            currency: z.enum(['BRL', 'USD', 'EUR']),
            organizationId: z.string(),
            imageUrls: z.array(z.string()).optional(),
          }),
        },
      },
      async (request, reply) => {
        const {
          name,
          description,
          price,
          currency,
          organizationId,
          imageUrls,
        } = request.body

        const organization = await prisma.organization.findUnique({
          where: { id: organizationId },
        })
        if (!organization) {
          throw new NotFoundError('Organization not found.')
        }

        const product = await prisma.product.create({
          data: {
            name,
            description,
            price,
            currency,
            imageUrls,
            organizationId,
          },
        })

        return reply.status(201).send(product)
      },
    )
}
