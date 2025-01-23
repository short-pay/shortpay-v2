import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function publishFunnel(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/funnels/:id/publish',
      {
        schema: {
          tags: ['Funnels'],
          summary: 'Publish or unpublish a funnel',
          params: z.object({
            id: z.string().uuid('Invalid funnel ID format'),
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
        const { id } = request.params
        const { isPublished } = request.body

        await prisma.funnel.update({
          where: { id },
          data: { published: isPublished },
        })

        return reply
          .status(200)
          .send({ message: 'Funnel updated successfully' })
      },
    )
}
