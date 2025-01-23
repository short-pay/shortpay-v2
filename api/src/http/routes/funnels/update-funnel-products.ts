import { NotFoundError } from '@/http/_errors/not-found-error'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function updateFunnelProducts(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/funnels/:funnelId/update-products',
      {
        schema: {
          tags: ['Funnels'],
          summary: 'Update products associated with a funnel',
          security: [{ bearerAuth: [] }],
          params: z.object({
            funnelId: z.string().uuid('Invalid funnel ID format'),
          }),
          body: z.object({
            products: z.string().refine((data) => {
              try {
                const parsed = JSON.parse(data)
                return Array.isArray(parsed)
              } catch {
                return false
              }
            }, 'Products must be a valid JSON array of product IDs'),
          }),
          response: {
            200: z.object({
              id: z.string(),
              liveProducts: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { funnelId } = request.params
        const { products } = request.body

        // Validate the funnel existence
        const funnel = await prisma.funnel.findUnique({
          where: { id: funnelId },
        })

        if (!funnel) {
          throw new NotFoundError()
        }

        // Update the funnel products
        const updatedFunnel = await prisma.funnel.update({
          where: { id: funnelId },
          data: {
            liveProducts: products,
          },
        })

        return reply.status(200).send({
          id: updatedFunnel.id,
          liveProducts: updatedFunnel.liveProducts ?? '',
        })
      },
    )
}
