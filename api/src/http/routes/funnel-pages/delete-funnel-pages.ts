import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function deleteFunnelPages(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/funnelsPage/:id',
      {
        schema: {
          tags: ['Funnel Pages'],
          summary: 'Delete a pages',
          params: z.object({
            id: z.string().uuid('Invalid funnel ID format'),
          }),
          response: {
            200: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params

        await prisma.funnelPage.delete({ where: { id } })

        return reply
          .status(200)
          .send({ message: 'Funnel deleted successfully' })
      },
    )
}
