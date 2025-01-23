import { prisma } from '@/lib/prisma'
import { auth } from '@/http/middlewares/auth'
import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function updateFunnelPagesOrderRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/funnels/:funnelId/pages/order',
      {
        schema: {
          tags: ['Funnel Pages'],
          summary: 'Update the order of funnel pages',
          params: z.object({
            funnelId: z.string().uuid('Invalid funnel ID format'),
          }),
          body: z.object({
            pages: z.array(
              z.object({
                id: z.string(),
                order: z.number().min(0, 'The order must be a positive number'),
              }),
            ),
          }),
          response: {
            200: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { funnelId } = request.params
        const { pages } = request.body

        const funnel = await prisma.funnel.findUnique({
          where: { id: funnelId },
        })

        if (!funnel) {
          return reply.status(404).send({
            message: 'Funnel not found',
          })
        }

        const updateOperations = pages.map((page) =>
          prisma.funnelPage.update({
            where: { id: page.id },
            data: { order: page.order },
          }),
        )

        await prisma.$transaction(updateOperations)

        return reply.status(200).send({
          message: 'Order updated successfully',
        })
      },
    )
}