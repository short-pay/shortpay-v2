import { prisma } from '@/lib/prisma'
import { auth } from '@/http/middlewares/auth'
import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function getFunnelPages(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/funnels/:funnelId/pages',
      {
        schema: {
          tags: ['Funnel Pages'],
          summary: 'Fetch all pages for a funnel',
          params: z.object({
            funnelId: z.string().uuid('Invalid funnel ID format'),
          }),
          response: {
            200: z.object({
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
                  order: z.number(),
                  pathName: z.string().nullable(),
                  path: z.string(),
                  content: z.any(),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { funnelId } = request.params

        const pages = await prisma.funnelPage.findMany({
          where: { funnelId },
          orderBy: { order: 'asc' },
        })

        console.log({pages},'Funnel pages in api')

        return reply.status(200).send({
          pages,
        })
      },
    )
}