import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function publishPage(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/funnels/:funnelId/pages/:pageId/publish',
      {
        schema: {
          tags: ['Funnels'],
          summary: 'Publish or unpublish a page in a funnel',
          params: z.object({
            funnelId: z.string().uuid('Invalid funnel ID format'),
            pageId: z.string().uuid('Invalid page ID format'),
          }),
          body: z.object({
            isPublished: z.boolean(),
          }),
          response: {
            200: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { pageId } = request.params
        const { isPublished } = request.body

        await prisma.funnelPage.update({
          where: { id: pageId },
          data: { published: isPublished },
        })

        return reply.status(200).send({ message: 'Page updated successfully' })
      },
    )
}
