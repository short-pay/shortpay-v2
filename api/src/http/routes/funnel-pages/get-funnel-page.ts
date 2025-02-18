import { prisma } from '@/lib/prisma'
import { auth } from '@/http/middlewares/auth'
import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { BadRequestError } from '@/http/_errors/bad-request-error'

export async function getFunnelPage(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/funnels/:id/page',
      {
        schema: {
          tags: ['Funnel Pages'],
          summary: 'Fetch all pages for a funnel',
          params: z.object({
            id: z.string(),
          }),
          response: {
            200: z.object({
              page: z.object({
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
            }),
          },
        },
      },
      async (request) => {
        const { id } = request.params

        const page = await prisma.funnelPage.findUnique({
          where: { id },
        })

        if (!page) {
               throw new BadRequestError('Page not found')
             }

        return { page }
      },
    )
}