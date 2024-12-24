import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { NotFoundError } from '@/http/_errors/not-found-error'

export async function getCheckout(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/checkouts/:id',
      {
        schema: {
          tags: ['Checkouts'],
          summary: 'Retrieve a specific checkout by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid('Invalid checkout ID format'),
          }),
          response: {
            200: z.object({
              id: z.string(),
              name: z.string(),
              description: z.string().nullable(),
              theme: z.string(),
              orderBump: z.boolean(),
              currency: z.string(),
              convertedAmount: z.number().nullable(),
              organizationId: z.string(),
              createdAt: z.coerce.date(),
              updatedAt: z.coerce.date(),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params

        const checkout = await prisma.checkout.findUnique({
          where: { id },
          include: {
            organization: true,
          },
        })

        if (!checkout) {
          throw new NotFoundError('Checkout not found.')
        }

        return reply.status(200).send(checkout)
      },
    )
}
