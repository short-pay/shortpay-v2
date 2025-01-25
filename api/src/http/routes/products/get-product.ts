import { NotFoundError } from '@/http/_errors/not-found-error'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function getProduct(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/products/:id/details',
      {
        schema: {
          tags: ['Products'],
          summary: 'Get details of a product',
          security: [{ bearerAuth: [] }],
          params: z.object({
            id: z.string().uuid(),
          }),
        },
      },
      async (request, reply) => {
        const { id } = request.params

        const product = await prisma.product.findUnique({
          where: { id },
        })

        if (!product) {
          throw new NotFoundError('Product not found.')
        }

        return reply.status(200).send(product)
      },
    )
}
