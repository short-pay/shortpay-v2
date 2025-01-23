import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getFunnels(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/funnels',
      {
        schema: {
          tags: ['Funnels'],
          summary: 'List all funnels for an organization',
          querystring: z.object({
            organizationId: z.string().uuid('Invalid organization ID format'),
          }),
          response: {
            200: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().nullable(),
              }),
            ),
          },
        },
      },
      async (request, reply) => {
        const { organizationId } = request.query

        const funnels = await prisma.funnel.findMany({
          where: { organizationId },
          select: {
            id: true,
            name: true,
            description: true,
          },
        })

        return reply.status(200).send(funnels)
      },
    )
}
