import { NotFoundError } from '@/http/_errors/not-found-error'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getFunnel(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/funnels/:id/details',
      {
        schema: {
          tags: ['Funnels'],
          summary: 'Get funnel details',
          params: z.object({
            id: z.string().uuid('Invalid funnel ID format'),
          }),
          querystring: z.object({
            published: z.boolean().optional(),
          }),
          response: {
            200: z.object({
              id: z.string(),
              name: z.string(),
              description: z.string().nullable(),
              pages: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  type: z.enum([
                    'GENERIC',
                    'CHECKOUT',
                    'LANDING_PAGE',
                    'THANK_YOU',
                  ]),
                  content: z.any(),
                  published: z.boolean(),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params
        const { published } = request.query

        const funnel = await prisma.funnel.findUnique({
          where: { id },
          include: {
            pages:
              published !== undefined
                ? {
                    where: { published },
                  }
                : true,
          },
        })

        if (!funnel) {
          throw new NotFoundError()
        }

        return reply.status(200).send(funnel)
      },
    )
}
