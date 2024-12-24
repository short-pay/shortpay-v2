import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function getProducts(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/products',
      {
        schema: {
          tags: ['Products'],
          summary: 'List all products for an organization',
          security: [{ bearerAuth: [] }],
          querystring: z.object({
            organizationId: z.string().uuid(),
          }),
        },
      },
      async (request, reply) => {
        const { organizationId } = request.query

        const products = await prisma.product.findMany({
          where: { organizationId },
        })

        return reply.status(200).send(products)
      },
    )
}
