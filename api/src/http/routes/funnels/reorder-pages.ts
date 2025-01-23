import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function reorderPages(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/funnels/:funnelId/pages/reorder',
      {
        schema: {
          tags: ['Funnels'],
          summary: 'Reorder funnel pages',
          params: z.object({
            funnelId: z.string().uuid('Invalid funnel ID format'),
          }),
          body: z.array(
            z.object({
              id: z.string().uuid('Invalid page ID format'),
              order: z.number(),
            }),
          ),
          response: {
            200: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { funnelId } = request.params
        const pages = request.body

        // Verifica se o funil existe
        const funnel = await prisma.funnel.findUnique({
          where: { id: funnelId },
        })
        if (!funnel) {
          return reply.status(404).send({ message: 'Funnel not found' })
        }
        // TODO:
        // Atualiza a ordem das páginas
        await prisma.$transaction(
          pages.map((page) =>
            prisma.funnelPage.update({
              where: { id: page.id },
              data: { order: page.order },
            }),
          ),
        )

        return reply
          .status(200)
          .send({ message: 'Pages reordered successfully' })
      },
    )
}
